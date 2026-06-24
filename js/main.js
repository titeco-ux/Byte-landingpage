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

// --- Booking modal (name/email gate -> Google calendar) ---
const BOOKING_URL = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1iDDrNFrD8QfgCNfShhvebpr0jzQH2of4gnWwSyvstKcQoJyuwdpNYy5Z7T0iWRsXAEd82kbHB';
const bookingModal = document.getElementById('booking-modal');
const bookingForm  = document.getElementById('booking-form');
let bookingTrigger = null;

function openBookingModal(trigger) {
  if (!bookingModal) return;
  bookingTrigger = trigger || null;
  bookingModal.hidden = false;
  document.body.classList.add('modal-open');
  const firstInput = bookingModal.querySelector('input');
  if (firstInput) setTimeout(() => firstInput.focus(), 50);
}

function closeBookingModal() {
  if (!bookingModal) return;
  bookingModal.hidden = true;
  document.body.classList.remove('modal-open');
  if (bookingTrigger && typeof bookingTrigger.focus === 'function') bookingTrigger.focus();
}

document.querySelectorAll('.js-book').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    closeMobileMenu();
    openBookingModal(el);
  });
});

if (bookingModal) {
  bookingModal.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeBookingModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !bookingModal.hidden) closeBookingModal();
  });
}

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(bookingForm)) return;
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Opening calendar…';
    submitBtn.disabled = true;
    trackCtaClick('booking_modal_submit');
    window.open(BOOKING_URL, '_blank', 'noopener');
    closeBookingModal();
    setTimeout(() => {
      submitBtn.textContent = 'Continue to calendar →';
      submitBtn.disabled = false;
      bookingForm.reset();
    }, 600);
  });
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
  const dials = document.querySelectorAll(".pain-dial");
  if (!dials.length) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DWELL = 4000; // ms each card stays before auto-advancing

  dials.forEach(function (dial) {
    const steps = Array.prototype.slice.call(dial.querySelectorAll(".dial-step"));
    const cards = Array.prototype.slice.call(dial.querySelectorAll(".dial-card"));
    const thumb = dial.querySelector(".dial-thumb");
    if (!steps.length || !cards.length) return;

    let index = 0, timer = null;

    const horizontal = dial.classList.contains("pain-dial--horizontal");
    function moveThumb() {
      const s = steps[index];
      if (horizontal) {
        thumb.style.width = s.offsetWidth + "px";
        thumb.style.transform = "translateX(" + s.offsetLeft + "px)";
      } else {
        thumb.style.height = s.offsetHeight + "px";
        thumb.style.transform = "translateY(" + s.offsetTop + "px)";
      }
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
  });
})();

/* Testimonials carousel (section 5) */
(function () {
  const track = document.getElementById("testimonials-track");
  if (!track) return;
  const carousel = track.closest(".testimonials-carousel");
  const btns = carousel.querySelectorAll(".carousel-btn");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timer = null;

  function step() {
    const card = track.querySelector(".testimonial-card");
    if (!card) return track.clientWidth;
    const cs = getComputedStyle(track);
    const gap = parseFloat(cs.columnGap || cs.gap) || 0;
    return card.offsetWidth + gap;
  }
  function go(dir) {
    const max = track.scrollWidth - track.clientWidth;
    let target = track.scrollLeft + dir * step();
    if (dir > 0 && track.scrollLeft >= max - 2) target = 0;   // loop to start
    else if (dir < 0 && track.scrollLeft <= 2) target = max;  // loop to end
    track.scrollTo({ left: target, behavior: "smooth" });
  }
  function play() { if (reduce) return; clearInterval(timer); timer = setInterval(function () { go(1); }, 5000); }
  function stop() { clearInterval(timer); }

  btns.forEach(function (b) {
    b.addEventListener("click", function () { go(parseInt(b.getAttribute("data-dir"), 10)); play(); });
  });
  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", play);

  play();
})();

/* Tech stack tabs — sliding panels + color invert per tab (section 5) */
(function () {
  const section = document.querySelector(".section-techstack");
  const tabs = Array.prototype.slice.call(document.querySelectorAll(".stack-tab"));
  const panels = Array.prototype.slice.call(document.querySelectorAll(".stack-panel"));
  if (!section || !tabs.length || !panels.length) return;

  function select(i) {
    // Keep the section on the light theme for every tab (no color flip)
    section.classList.add("theme-light");
    section.classList.remove("theme-bright");

    tabs.forEach(function (t, k) {
      const on = k === i;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.setAttribute("tabindex", on ? "0" : "-1");
    });
    panels.forEach(function (p, k) {
      const on = k === i;
      // Reset display first so re-selecting a panel restarts its slide-in animation
      p.classList.remove("is-active");
      p.hidden = !on;
      if (on) {
        // force reflow so the animation re-triggers, then activate
        void p.offsetWidth;
        p.classList.add("is-active");
      }
    });
  }

  tabs.forEach(function (t, k) {
    t.addEventListener("click", function () { select(k); });
    t.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); select((k + 1) % tabs.length); tabs[(k + 1) % tabs.length].focus(); }
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); const p = (k - 1 + tabs.length) % tabs.length; select(p); tabs[p].focus(); }
    });
  });

  select(0);
})();

/* Molecular networks wrapped on an invisible rotating globe (CTA + tech stack) */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const D2R = Math.PI / 180;

  // default bonds for the CTA hub (two people + tech clusters)
  const CTA_EDGES = [
    [0,1],[0,2],[0,3],[0,4],[1,2],[2,3],[3,5],[4,5],
    [1,6],[2,7],[3,8],[5,9],[4,10],
    [0,11],
    [11,12],[11,13],[11,14],[11,15],[11,16],[12,13],[14,15],
    [10,17],[4,17],[8,18],[13,18],[18,19],[19,20],[7,20],[3,20],
    [5,21],[15,21],[9,22],[12,22],[21,22],[2,23],[5,23],[10,24],[1,24],[17,24]
  ];

  function initGlobe(hub) {
    const canvas = hub.querySelector("canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const nodes = Array.prototype.slice.call(hub.querySelectorAll(".hub-node")).map(function (el) {
      return { el: el, lon: parseFloat(el.dataset.lon) * D2R, lat: parseFloat(el.dataset.lat) * D2R, sx: 0, sy: 0, z: 0 };
    });
    const edges = hub.dataset.edges
      ? hub.dataset.edges.split(",").map(function (s) { return s.split("-").map(Number); })
      : CTA_EDGES;
    const bond = (getComputedStyle(hub).getPropertyValue("--bond").trim() || "242, 183, 5");
    const spin = parseFloat(hub.dataset.spin || "0.00018");
    const rFactor = parseFloat(hub.dataset.radius || "0.336");

    let w = 0, h = 0, cx = 0, cy = 0, R = 0, pxr = 1;

    function resize() {
      pxr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = hub.getBoundingClientRect();
      w = rect.width; h = rect.height;
      if (!w || !h) return;
      canvas.width = Math.round(w * pxr);
      canvas.height = Math.round(h * pxr);
      ctx.setTransform(pxr, 0, 0, pxr, 0, 0);
      cx = w / 2; cy = h / 2;
      R = Math.min(w, h) * rFactor;
    }

    function frame(t) {
      const rot = t * spin;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const theta = n.lon + rot;
        const cosLat = Math.cos(n.lat);
        const x = cosLat * Math.sin(theta);
        const y = Math.sin(n.lat);
        const z = cosLat * Math.cos(theta);
        n.sx = cx + x * R;
        n.sy = cy - y * R;
        n.z = z;
        const depth = (z + 1) / 2;
        n.el.style.left = n.sx + "px";
        n.el.style.top = n.sy + "px";
        n.el.style.setProperty("--s", (0.5 + 0.6 * depth).toFixed(3));
        n.el.style.opacity = (0.12 + 0.88 * depth).toFixed(3);
        n.el.style.zIndex = String(Math.round(depth * 100));
      }
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.2;
      for (let e = 0; e < edges.length; e++) {
        const a = nodes[edges[e][0]], b = nodes[edges[e][1]];
        if (!a || !b) continue;
        const vis = ((a.z + 1) / 2 + (b.z + 1) / 2) / 2;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.strokeStyle = "rgba(" + bond + ", " + (0.06 + 0.34 * vis).toFixed(3) + ")";
        ctx.stroke();
      }
      if (!reduce) requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", function () { resize(); if (reduce) frame(0); });
    if (reduce) frame(0);
    else requestAnimationFrame(frame);
  }

  Array.prototype.slice.call(document.querySelectorAll("[data-globe]")).forEach(initGlobe);
})();

/* How We Work — one-card carousel (01 -> 02 -> 03, auto-advancing) */
(function () {
  const root = document.getElementById("how-steps");
  if (!root) return;
  const track = root.querySelector(".steps-track");
  const slides = Array.prototype.slice.call(root.querySelectorAll(".step"));
  const dots = Array.prototype.slice.call(root.querySelectorAll(".steps-dot"));
  const prevBtn = root.querySelector("[data-step-prev]");
  const nextBtn = root.querySelector("[data-step-next]");
  if (!track || slides.length < 2) return;

  const DWELL = 4500; // ms each card stays before auto-advancing
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;
  let timer = null;

  function render() {
    slides.forEach(function (s, i) {
      s.classList.toggle("is-active", i === index);
    });
    dots.forEach(function (d, i) {
      d.classList.toggle("is-active", i === index);
      d.setAttribute("aria-selected", i === index ? "true" : "false");
    });
  }

  function go(i) {
    index = (i + slides.length) % slides.length;
    render();
  }

  function start() {
    if (reduce) return;
    stop();
    timer = setInterval(function () { go(index + 1); }, DWELL);
  }
  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  dots.forEach(function (d, i) {
    d.addEventListener("click", function () { go(i); start(); });
  });
  if (prevBtn) prevBtn.addEventListener("click", function () { go(index - 1); start(); });
  if (nextBtn) nextBtn.addEventListener("click", function () { go(index + 1); start(); });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);

  render();
  start();
})();
