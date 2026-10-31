// Local interaction demo: no service, network request, or persistent storage.
const form = document.querySelector('#notification-form');
const email = document.querySelector('#email');
const button = document.querySelector('#notify-button');
const status = document.querySelector('#signup-status');

if (form && email && button && status) {
  button.disabled = false;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    email.value = '';
    status.textContent = 'Preview complete. No signup was sent or saved.';
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
