// Shopify Buy Button: a Buy now button on each hat page and one shared cart, opened from the header cart icon.
// The storefront access token is Shopify's public, read-only key for the Buy Button sales channel.
(function () {
  // Sales are paused until Shopify Payments is connected: Buy now becomes Get notified, the cart icon is hidden,
  // and the Buy Button SDK is not loaded. Set to false to turn sales back on.
  const SALES_PAUSED = true;
  if (SALES_PAUSED) {
    document.documentElement.classList.add('sales-paused');
    document.querySelectorAll('.product-buy').forEach((mount) => {
      mount.innerHTML = '<a class="product-cta" href="index.html#stay-in-the-loop">Get notified</a>';
    });
    return;
  }

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
})();
