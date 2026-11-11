// Email signup: sends the form to Shopify's customer form in the background, the same list as the store's own
// signup, so visitors stay on this site. This requires Shopify's hCaptcha to be off for contact forms (Online Store >
// Preferences > Spam protection); with it on, Shopify silently drops these. Shopify's reply can't be read from another
// site, so a completed request is treated as success.
const form = document.querySelector('#notification-form');
const email = document.querySelector('#email');
const button = document.querySelector('#notify-button');
const status = document.querySelector('#signup-status');

if (form && email && button && status) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    button.disabled = true;
    status.textContent = 'Signing you up…';
    try {
      await fetch(form.action, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(new FormData(form)) });
      form.reset();
      status.textContent = 'You’re on the list. We’ll email you when the Founders Drop goes live.';
    } catch {
      status.textContent = 'Something went wrong. Please try again.';
    } finally {
      button.disabled = false;
    }
  });

  email.addEventListener('input', () => {
    status.textContent = '';
  });
}

// The original flat artwork rotates in CSS perspective; it is not a 3D mesh. The logo links home; rotation
// pauses on hover or keyboard focus (styles.css) and stays off when the visitor prefers reduced motion.
const rotor = document.querySelector('#emblem-rotor');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (rotor) {
  const updateMotion = () => rotor.classList.toggle('is-animated', !reducedMotion.matches);
  reducedMotion.addEventListener('change', updateMotion);
  updateMotion();
}

// Product gallery: thumbnails, arrows, and the counter are built from the slides in the HTML.
document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const slides = [...gallery.querySelectorAll('.gallery-slide')];
  const stage = gallery.querySelector('[data-gallery-stage]');
  const thumbs = gallery.querySelector('[data-gallery-thumbs]');
  const prev = gallery.querySelector('[data-gallery-prev]');
  const next = gallery.querySelector('[data-gallery-next]');
  const count = gallery.querySelector('[data-gallery-count]');
  if (!slides.length || !stage || !thumbs) return;

  let current = 0;
  const buttons = slides.map((slide, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-thumb';
    button.setAttribute('aria-label', `Show photo ${index + 1} of ${slides.length}`);
    const image = slide.querySelector('img');
    if (image) {
      const thumb = document.createElement('img');
      thumb.src = image.getAttribute('src');
      thumb.alt = '';
      thumb.loading = 'lazy';
      button.append(thumb);
    } else {
      button.textContent = String(index + 1);
    }
    button.addEventListener('click', () => show(index));
    thumbs.append(button);
    return button;
  });

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    buttons.forEach((button, i) => button.setAttribute('aria-current', String(i === current)));
    if (count) count.textContent = `${current + 1} / ${slides.length}`;
  }

  if (slides.length > 1) {
    prev?.removeAttribute('hidden');
    next?.removeAttribute('hidden');
    prev?.addEventListener('click', () => show(current - 1));
    next?.addEventListener('click', () => show(current + 1));
    gallery.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') show(current - 1);
      if (event.key === 'ArrowRight') show(current + 1);
    });
    let startX = null;
    stage.addEventListener('touchstart', (event) => { startX = event.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', (event) => {
      if (startX === null) return;
      const distance = event.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(distance) > 40) show(current + (distance < 0 ? 1 : -1));
    });
  } else {
    thumbs.hidden = true;
  }

  gallery.classList.add('is-ready');
  show(0);

  // Full-screen viewer: click the photo (or the expand button) to see it larger and step through the same photos.
  const images = slides.map((slide) => slide.querySelector('img'));
  if (!images.some(Boolean) || typeof HTMLDialogElement !== 'function') return;

  const chevron = (d) => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
  const viewer = document.createElement('dialog');
  viewer.className = 'lightbox';
  viewer.setAttribute('aria-label', gallery.getAttribute('aria-label') || 'Photos');
  viewer.innerHTML = `
    <figure class="lightbox-figure"><img class="lightbox-image" alt=""></figure>
    <button class="lightbox-close" type="button" aria-label="Close">${chevron('M6 6l12 12M18 6L6 18')}</button>
    <button class="gallery-arrow gallery-arrow--prev lightbox-arrow" type="button" aria-label="Previous photo">${chevron('M15 5l-7 7 7 7')}</button>
    <button class="gallery-arrow gallery-arrow--next lightbox-arrow" type="button" aria-label="Next photo">${chevron('M9 5l7 7-7 7')}</button>
    <p class="gallery-count lightbox-count" aria-live="polite"></p>`;
  document.body.append(viewer);
  const big = viewer.querySelector('.lightbox-image');
  const bigCount = viewer.querySelector('.lightbox-count');
  viewer.querySelectorAll('.lightbox-arrow').forEach((arrow) => { arrow.hidden = slides.length < 2; });

  function render() {
    const image = images[current];
    big.src = image.getAttribute('src');
    big.alt = image.alt;
    bigCount.textContent = `${current + 1} / ${slides.length}`;
  }
  // Moves the gallery too, skipping any slide that has no photo yet.
  function step(direction) {
    let index = current;
    do { index = (index + direction + slides.length) % slides.length; } while (!images[index] && index !== current);
    show(index);
    render();
  }
  function open() {
    if (!images[current]) return;
    render();
    document.documentElement.classList.add('has-lightbox');
    viewer.showModal();
  }

  const expand = document.createElement('button');
  expand.type = 'button';
  expand.className = 'gallery-expand';
  expand.setAttribute('aria-label', 'View photo larger');
  expand.innerHTML = chevron('M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7');
  stage.append(expand);
  expand.addEventListener('click', open);
  stage.addEventListener('click', (event) => { if (event.target.closest('.gallery-slide img')) open(); });

  viewer.querySelector('.lightbox-close').addEventListener('click', () => viewer.close());
  viewer.querySelector('.gallery-arrow--prev').addEventListener('click', () => step(-1));
  viewer.querySelector('.gallery-arrow--next').addEventListener('click', () => step(1));
  // Clicking the empty area around the photo closes the viewer.
  viewer.addEventListener('click', (event) => { if (event.target === viewer || event.target.classList.contains('lightbox-figure')) viewer.close(); });
  viewer.addEventListener('keydown', (event) => {
    if (slides.length < 2) return;
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
  });
  viewer.addEventListener('close', () => document.documentElement.classList.remove('has-lightbox'));
  let viewerStartX = null;
  viewer.addEventListener('touchstart', (event) => { viewerStartX = event.touches[0].clientX; }, { passive: true });
  viewer.addEventListener('touchend', (event) => {
    if (viewerStartX === null || slides.length < 2) return;
    const distance = event.changedTouches[0].clientX - viewerStartX;
    viewerStartX = null;
    if (Math.abs(distance) > 40) step(distance < 0 ? 1 : -1);
  });
});
