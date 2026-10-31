// Email signup: sends the form to Shopify in the background, the same way the store's own signup works, so
// subscribers land in Shopify's customer list. Shopify's reply can't be read from another site, so a completed
// request is treated as success.
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

// The original flat artwork rotates in CSS perspective; it is not a 3D mesh.
const motionButton = document.querySelector('#logo-motion');
const rotor = document.querySelector('#emblem-rotor');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (motionButton && rotor) {
  let paused = reducedMotion.matches;

  function updateMotion() {
    const stopped = paused || reducedMotion.matches;
    rotor.classList.toggle('is-animated', !reducedMotion.matches);
    rotor.classList.toggle('is-paused', stopped);
    motionButton.disabled = reducedMotion.matches;
    const label = reducedMotion.matches ? 'Logo rotation off — reduced motion enabled' : stopped ? 'Start logo rotation' : 'Pause logo rotation';
    motionButton.setAttribute('aria-label', label);
    motionButton.title = label;
  }

  motionButton.addEventListener('click', () => {
    paused = !paused;
    updateMotion();
  });
  reducedMotion.addEventListener('change', () => {
    paused = reducedMotion.matches;
    updateMotion();
  });
  updateMotion();
}

const story = document.querySelector('#story');
document.querySelectorAll('[data-open-story]').forEach((link) => {
  link.addEventListener('click', () => {
    if (story) story.open = true;
  });
});
// Product pages link to index.html#story; open it on arrival.
if (story && window.location.hash === '#story') story.open = true;

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
});

// Footer links are placeholders until their pages exist.
document.querySelectorAll('[data-placeholder-link]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});
