// Shopify Buy Button: a Buy now button on each hat page and one shared cart, opened from the header cart icon.
// The storefront access token is Shopify's public, read-only key for the Buy Button sales channel.
(function () {
  // Launch times (Eastern). The early access page (<body data-access="early">) opens at EARLY_ACCESS_OPENS; the
  // hat pages open at PUBLIC_LAUNCH. Until then each Buy now spot shows a disabled "opens" button and the SDK and
  // cart are not loaded. This only gates the website; Shopify's sales channels must be gated too (see README).
  const EARLY_ACCESS_OPENS = '2026-11-11T16:00:00-05:00';
  const PUBLIC_LAUNCH = '2026-11-12T16:00:00-05:00';
  // Master switch while Shopify Payments isn't connected: keeps buying off even after the launch times.
  const SALES_PAUSED = false;

  const isEarly = document.body.dataset.access === 'early';
  const opensAt = Date.parse(isEarly ? EARLY_ACCESS_OPENS : PUBLIC_LAUNCH);
  const closedText = isEarly ? 'Opens 11.11 at 4PM ET' : 'Drops 11.12 at 4PM ET';

  function showClosed(text) {
    document.querySelectorAll('.product-buy').forEach((mount) => {
      mount.innerHTML = `<button class="product-cta" type="button" disabled>${text}</button>`;
    });
  }

  // Current time from the server's Date header, so changing the device clock doesn't open sales early.
  // On localhost only, ?now=<ISO time> previews any moment, e.g. ?now=2026-11-12T16:01:00-05:00.
  async function currentTime() {
    const local = ['localhost', '127.0.0.1'].includes(location.hostname);
    const preview = local && Date.parse(new URLSearchParams(location.search).get('now') || '');
    if (preview) return preview;
    try {
      const response = await fetch(location.pathname, { method: 'HEAD', cache: 'no-store' });
      const serverTime = Date.parse(response.headers.get('date') || '');
      if (serverTime) return serverTime;
    } catch {}
    return Date.now();
  }

  currentTime().then((now) => {
    if (now < opensAt) {
      showClosed(closedText);
      // Reopen on its own if the page is left open past the launch time.
      const wait = opensAt - now;
      if (wait < 2 ** 31 - 1) setTimeout(() => location.reload(), wait + 1000);
      return;
    }
    if (SALES_PAUSED) {
      showClosed('Coming soon');
      return;
    }
    document.documentElement.classList.add('sales-open');
    startShop();
  });

  function startShop() {
  const SHOP = {
    domain: '6jwzsw-z6.myshopify.com',
    storefrontAccessToken: '7abe7bd8b798d62a907f0c1d5015c142',
  };
  // data-shopify-product value on the page -> Shopify product ID.
  const PRODUCTS = {
    'hat-01': '8097212792915',
    'hat-02': '8097213251667',
  };
  const SDK_URL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  const MONEY_FORMAT = '%24%7B%7Bamount%7D%7D';

  // Buy Button renders inside iframes, so the site's CSS can't reach it; these mirror styles.css.
  const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
  const NAVY = '#3b4967';
  const RED = '#a24857';
  const PAPER = '#faf9f6';
  const button = {
    'font-family': FONT,
    'font-size': '14px',
    'letter-spacing': '.06em',
    'text-transform': 'uppercase',
    'padding-top': '15px',
    'padding-bottom': '15px',
    'border-radius': '0',
    color: PAPER,
    'background-color': NAVY,
    ':hover': { color: PAPER, 'background-color': RED },
    ':focus': { 'background-color': RED },
  };

  const cartLink = document.querySelector('[data-cart-toggle]');
  const cartCount = document.querySelector('[data-cart-count]');
  let ui = null;

  function updateCount(cart) {
    const items = (cart && cart.model && cart.model.lineItems) || [];
    const count = items.reduce((total, item) => total + (item.quantity || 0), 0);
    if (cartCount) {
      cartCount.textContent = String(count);
      cartCount.hidden = count === 0;
    }
    cartLink?.setAttribute('aria-label', count ? `Cart, ${count} ${count === 1 ? 'item' : 'items'}` : 'Cart');
  }

  const options = {
    product: {
      contents: { img: false, title: false, price: false },
      text: { button: 'Buy now' },
      styles: {
        product: {
          'max-width': '100%',
          'margin-left': '0',
          'margin-bottom': '0',
          '@media (min-width: 601px)': { 'max-width': '100%', 'margin-left': '0', 'margin-bottom': '0' },
        },
        button: Object.assign({ width: '100%' }, button),
        buttonWrapper: { 'margin-top': '0' },
      },
      // createComponent returns nothing, so swap out the placeholder once Shopify's button has drawn.
      events: {
        afterRender: (product) => product.node?.closest('.product-buy')?.querySelector('.product-cta')?.remove(),
      },
    },
    cart: {
      // Go to Shopify checkout in the same tab instead of a popup window.
      popup: false,
      text: { title: 'Cart', total: 'Subtotal', button: 'Checkout' },
      styles: {
        button,
        title: { color: NAVY, 'font-family': FONT },
        close: { color: NAVY, ':hover': { color: RED } },
        subtotalText: { color: NAVY, 'font-family': FONT },
        subtotal: { color: NAVY, 'font-family': FONT },
        notice: { color: NAVY, 'font-family': FONT },
      },
      events: { afterRender: updateCount },
    },
    // Each hat has a single variant, which Shopify would otherwise label "Default" in the cart.
    lineItem: {
      contents: { variantTitle: false },
      styles: {
        title: { color: NAVY, 'font-family': FONT },
        price: { color: NAVY, 'font-family': FONT },
        quantityInput: { color: NAVY },
        quantityIncrement: { color: NAVY },
        quantityDecrement: { color: NAVY },
      },
    },
  };

  function openCart() {
    if (!ui) return;
    if (typeof ui.openCart === 'function') ui.openCart();
    else ui.components?.cart?.[0]?.open?.();
  }

  // The cart icon does nothing until the cart is ready, rather than jumping the page. Shopify closes the
  // cart on any click in the page, so open it after this click has finished bubbling.
  cartLink?.addEventListener('click', (event) => {
    event.preventDefault();
    setTimeout(openCart, 0);
  });

  function init() {
    const client = window.ShopifyBuy.buildClient(SHOP);
    window.ShopifyBuy.UI.onReady(client).then((readyUi) => {
      ui = readyUi;
      const mounts = [...document.querySelectorAll('[data-shopify-product]')];
      mounts.forEach((mount) => {
        const id = PRODUCTS[mount.dataset.shopifyProduct];
        if (!id) return;
        const node = document.createElement('div');
        mount.append(node);
        ui.createComponent('product', { id, node, moneyFormat: MONEY_FORMAT, options });
      });
      // Pages without a product still need the cart so the header icon can open it.
      if (!mounts.length) ui.createComponent('cart', { moneyFormat: MONEY_FORMAT, options });
    });
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = SDK_URL;
  script.onload = init;
  document.head.append(script);
  }
})();
