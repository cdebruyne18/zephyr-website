// Email signup endpoint (Vercel function at /api/subscribe). Adds the email to Shopify customers, subscribed to email
// marketing and tagged, using the Admin API from the server so no captcha or Shopify page is involved.
//
// Vercel environment variables (Project → Settings → Environment Variables), from a Dev Dashboard app with the
// read_customers and write_customers scopes, installed on the store:
//   SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET   (exchanged for a 24-hour token with the client credentials grant)
//   or SHOPIFY_ADMIN_TOKEN                      (a ready-made Admin API token, if you have one instead)
//   SHOPIFY_SHOP (optional)                     defaults to 6jwzsw-z6.myshopify.com

const SHOP = process.env.SHOPIFY_SHOP || '6jwzsw-z6.myshopify.com';
const API_VERSION = '2026-10';
const TAGS = ['newsletter', 'prelaunch-2026', 'website'];
const ALLOWED_ORIGINS = [/^https:\/\/(www\.)?zephyrarchive\.com$/, /^https:\/\/[a-z0-9-]+\.vercel\.app$/, /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let cachedToken = null;
let tokenExpiresAt = 0;

async function accessToken() {
  if (process.env.SHOPIFY_ADMIN_TOKEN) return process.env.SHOPIFY_ADMIN_TOKEN;
  if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken;
  const response = await fetch(`https://${SHOP}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.SHOPIFY_CLIENT_ID,
      client_secret: process.env.SHOPIFY_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  });
  if (!response.ok) throw new Error(`token request failed: ${response.status} ${await response.text()}`);
  const data = await response.json();
  cachedToken = data.access_token;
  // Refresh a few minutes before Shopify's 24-hour expiry.
  tokenExpiresAt = Date.now() + Math.max(0, (data.expires_in || 86399) - 300) * 1000;
  return cachedToken;
}

async function admin(query, variables) {
  const response = await fetch(`https://${SHOP}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': await accessToken() },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.errors) throw new Error(`Admin API error: ${response.status} ${JSON.stringify(data.errors || data)}`);
  return data.data;
}

const CONSENT = { marketingState: 'SUBSCRIBED', marketingOptInLevel: 'SINGLE_OPT_IN' };

async function subscribe(email) {
  const created = await admin(
    `mutation ($input: CustomerInput!) { customerCreate(input: $input) { customer { id } userErrors { field message } } }`,
    { input: { email, tags: TAGS, emailMarketingConsent: CONSENT } },
  );
  const errors = created.customerCreate.userErrors;
  if (!errors.length) return 'created';
  if (!errors.some((e) => /taken/i.test(e.message))) throw new Error(`customerCreate: ${JSON.stringify(errors)}`);

  // Already a customer: subscribe them and add the tags.
  const found = await admin(`query ($q: String!) { customers(first: 1, query: $q) { nodes { id } } }`, { q: `email:"${email}"` });
  const id = found.customers.nodes[0]?.id;
  if (!id) throw new Error('existing customer not found');
  const updated = await admin(
    `mutation ($input: CustomerEmailMarketingConsentUpdateInput!, $id: ID!, $tags: [String!]!) {
      customerEmailMarketingConsentUpdate(input: $input) { userErrors { field message } }
      tagsAdd(id: $id, tags: $tags) { userErrors { field message } }
    }`,
    { input: { customerId: id, emailMarketingConsent: CONSENT }, id, tags: TAGS },
  );
  const updateErrors = [...updated.customerEmailMarketingConsentUpdate.userErrors, ...updated.tagsAdd.userErrors];
  if (updateErrors.length) throw new Error(`update existing: ${JSON.stringify(updateErrors)}`);
  return 'updated';
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.some((pattern) => pattern.test(origin))) {
    return res.status(403).json({ ok: false, error: 'Forbidden' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  // Hidden field that people never see; bots that fill it in get a quiet success and nothing is saved.
  if (body.company) return res.status(200).json({ ok: true });

  const email = String(body.email || '').trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
  }

  try {
    await subscribe(email);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('subscribe failed:', error.message);
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again.' });
  }
};
