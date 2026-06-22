'use strict';

// --- Config ---
const SCROLL_THRESHOLD = 60;

// --- DOM Elements ---
const navbar      = document.getElementById('navbar');
const menuToggle  = document.getElementById('menu-toggle');
const mobileMenu  = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
const expandBtns  = document.querySelectorAll('.expand-btn');
const contactForm = document.getElementById('contact-form');

// --- Utilities ---
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// --- Navbar scroll state ---
function handleNavbarScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
}

// --- Mobile menu ---
function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

// --- Step expand/collapse ---
function handleStepExpand(btn) {
  const targetId  = btn.getAttribute('data-target');
  const panel     = document.getElementById(targetId);
  if (!panel) return;

  const isExpanded = btn.getAttribute('aria-expanded') === 'true';

  if (isExpanded) {
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Learn more +';
  } else {
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = 'Show less −';
  }
}

// --- Contact form ---
function validateForm(form) {
  let valid = true;
  const fields = form.querySelectorAll('[required]');

  fields.forEach(field => {
    field.classList.remove('error');
    const empty = !field.value.trim();
    const badEmail = field.type === 'email' && field.value && !field.value.includes('@');

    if (empty || badEmail) {
      field.classList.add('error');
      valid = false;
    }
  });

  return valid;
}

function handleFormSubmit(e) {
  e.preventDefault();
  const form      = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  if (!validateForm(form)) return;

  submitBtn.textContent = 'Sending…';
  submitBtn.disabled    = true;

  // Replace with real endpoint: Formspree, HubSpot, Cal.com embed, etc.
  setTimeout(() => {
    submitBtn.textContent = 'Sent! We\'ll be in touch soon.';
    form.reset();
  }, 1200);
}

// --- GTM / tracking hooks (no-op stubs — replace with real calls) ---
function trackSectionView(sectionId) {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({ event: 'section_view', section: sectionId });
  }
}

function trackCtaClick(label) {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({ event: 'cta_click', label });
  }
}

function initSectionTracking() {
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trackSectionView(entry.target.id);
        }
      });
    },
    { threshold: 0.3 }
  );
  sections.forEach(section => observer.observe(section));
}

// --- Event Listeners ---
window.addEventListener('scroll', debounce(handleNavbarScroll, 10));

menuToggle.addEventListener('click', toggleMobileMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

expandBtns.forEach(btn => {
  btn.addEventListener('click', () => handleStepExpand(btn));
});

document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', () => trackCtaClick(btn.textContent.trim()));
});

if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}

// --- Init ---
function init() {
  handleNavbarScroll();
  initSectionTracking();
}

document.addEventListener('DOMContentLoaded', init);

/* Animated rotating headline */
(function () {
  const list = document.querySelector(".rotator__list");
  if (!list) return;

  const items = list.children;          // 3 phrases + clone of phrase 1
  const HOLD  = 2200;                    // ms each phrase stays fully visible
  const SLIDE = 600;                     // ms slide duration
  const EASE  = "cubic-bezier(0.22, 1, 0.36, 1)";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let step  = items[0].offsetHeight;     // one line in px = the slide distance
  let index = 0;

  function advance() {
    index++;
    list.style.transition = "transform " + SLIDE + "ms " + EASE;
    list.style.transform  = "translateY(" + (-index * step) + "px)";

    if (index === items.length - 1) {    // landed on the clone
      setTimeout(function () {
        list.style.transition = "none";
        index = 0;
        list.style.transform = "translateY(0)";
      }, SLIDE);
    }
  }

  window.addEventListener("resize", function () {
    step = items[0].offsetHeight;
    list.style.transition = "none";
    list.style.transform = "translateY(" + (-index * step) + "px)";
  });

  setInterval(advance, HOLD + SLIDE);
})();

/* Vertical dial — each notch reveals its card (section 2) */
(function () {
  const dial = document.querySelector(".pain-dial");
  if (!dial) return;

  const steps = Array.prototype.slice.call(dial.querySelectorAll(".dial-step"));
  const cards = Array.prototype.slice.call(dial.querySelectorAll(".dial-card"));
  const thumb = dial.querySelector(".dial-thumb");
  if (!steps.length || !cards.length) return;

  const DWELL = 4000; // ms each card stays before auto-advancing
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0, timer = null;

  function moveThumb() {
    const s = steps[index];
    thumb.style.height = s.offsetHeight + "px";
    thumb.style.transform = "translateY(" + s.offsetTop + "px)";
  }
  function select(i) {
    index = i;
    steps.forEach(function (s, k) { s.classList.toggle("is-active", k === i); s.setAttribute("aria-selected", k === i); });
    cards.forEach(function (c, k) { c.classList.toggle("is-active", k === i); });
    moveThumb();
  }
  function next() { select((index + 1) % steps.length); }
  function play() { if (reduce) return; clearInterval(timer); timer = setInterval(next, DWELL); }
  function stop() { clearInterval(timer); }

  steps.forEach(function (s, k) {
    s.addEventListener("click", function () { select(k); play(); });
    s.addEventListener("mouseenter", function () { select(k); });
  });
  dial.addEventListener("mouseenter", stop);
  dial.addEventListener("mouseleave", play);
  window.addEventListener("resize", moveThumb);
  window.addEventListener("load", moveThumb);

  select(0);
  play();
})();
