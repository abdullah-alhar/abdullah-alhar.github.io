// abdullah-alhar.github.io scripts
// sections in order: main, navigation, projects, certificates, effects, contact

// ========== main: shared settings and footer year ==========

// people who asked their system for less motion get no animations
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollBehavior = reduceMotion ? 'auto' : 'smooth';

// footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ========== navigation: mobile menu, navbar on scroll, back-to-top ==========

// mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

function openMenu() {
  navLinks.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.querySelector('i').className = 'fa-solid fa-xmark';
}

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.querySelector('i').className = 'fa-solid fa-bars';
}

hamburger.addEventListener('click', () => {
  if (navLinks.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// close it when clicking outside
document.addEventListener('click', e => {
  if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
  }
});

// stuff that happens on scroll
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('progress-bar');
const toTop = document.getElementById('to-top');
const sections = document.querySelectorAll('section');
const menuLinks = document.querySelectorAll('.nav-link');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;

  // border under navbar after scrolling a bit
  navbar.classList.toggle('scrolled', current > 50);

  // hide navbar going down, show going up (not when the menu is open)
  if (!navLinks.classList.contains('open')) {
    if (current > 400 && current > lastScroll) {
      navbar.classList.add('hide');
    } else {
      navbar.classList.remove('hide');
    }
  }
  lastScroll = current;

  // progress bar
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (current / pageHeight) * 100 + '%';

  // back to top button
  toTop.classList.toggle('show', current > 600);

  // highlight the link of the section you are on
  let currentSection = '';
  sections.forEach(section => {
    if (current >= section.offsetTop - 200) {
      currentSection = section.id;
    }
  });
  menuLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
  });

  startGrid();
});

toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: scrollBehavior });
});

// ========== projects: project filter and "show more" ==========

// project cards are written straight into index.html (#projects-grid)
// so search engines can read them without running JavaScript

// filter buttons (all / web / ai / iot)
// iot projects stay hidden under "All" until "show more" is clicked
const filterBtns = document.querySelectorAll('.filter-btn');
const moreBtn = document.getElementById('more-projects');
let filter = 'all';
let showMore = false;

function showProjects() {
  const cards = document.querySelectorAll('.project-card');
  const shown = [];

  cards.forEach(card => {
    const category = card.dataset.category;
    const visible = filter === 'all' ? (showMore || category !== 'iot') : category === filter;
    if (visible) {
      if (card.classList.contains('hidden')) shown.push(card);
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });

  moreBtn.classList.toggle('hidden', filter !== 'all');
  moreBtn.innerHTML = showMore
    ? 'Show less <i class="fa-solid fa-arrow-up"></i>'
    : 'Show more projects <i class="fa-solid fa-arrow-down"></i>';

  return shown;
}

function animateIn(cards) {
  if (window.gsap && !reduceMotion) {
    gsap.fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, overwrite: true, clearProps: 'transform' });
    ScrollTrigger.refresh();
  }
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    filter = btn.dataset.filter;
    showMore = false;
    showProjects();
    animateIn([...document.querySelectorAll('.project-card:not(.hidden)')]);
  });
});

moreBtn.addEventListener('click', () => {
  showMore = !showMore;
  animateIn(showProjects());
  if (!showMore) document.getElementById('projects').scrollIntoView({ behavior: scrollBehavior });
});

showProjects();

// ========== certificates: certificate lightbox ==========

// certificates are written straight into index.html (#cert-grid)

// click a certificate (or press Enter on it) to see it big
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
let lastFocused = null;

function openLightbox(item) {
  lastFocused = item;
  lightboxImg.src = item.dataset.lightbox;
  lightboxImg.alt = item.dataset.caption + ' certificate';
  lightboxCaption.textContent = item.dataset.caption;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  lightboxClose.focus();
}

function closeLightbox() {
  if (!lightbox.classList.contains('open')) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll('[data-lightbox]').forEach(item => {
  item.addEventListener('click', () => openLightbox(item));
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(item);
    }
  });
});

lightbox.addEventListener('click', e => {
  // close when clicking outside the image
  if (e.target !== lightboxImg) {
    closeLightbox();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeMenu();
  }
  // the close button is the only thing to focus while the lightbox is open
  if (e.key === 'Tab' && lightbox.classList.contains('open')) {
    e.preventDefault();
    lightboxClose.focus();
  }
});

// ========== effects: hero dots and gsap animations ==========

// dots background in the hero
// dots near the mouse get bigger and brighter
const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');
const hero = document.getElementById('home');
const spacing = 36;
let w, h;
let mouseX = -1000;
let mouseY = -1000;
let running = false;

function resizeCanvas() {
  // multiply by devicePixelRatio so its not blurry on retina screens
  const dpr = window.devicePixelRatio || 1;
  w = canvas.offsetWidth;
  h = canvas.offsetHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resizeCanvas();
window.addEventListener('resize', () => {
  resizeCanvas();
  if (reduceMotion) drawDots();
});

if (!reduceMotion) {
  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
}

function drawDots() {
  ctx.clearRect(0, 0, w, h);

  for (let x = spacing / 2; x < w; x += spacing) {
    for (let y = spacing / 2; y < h; y += spacing) {
      const dist = Math.hypot(x - mouseX, y - mouseY);
      const near = Math.max(0, 1 - dist / 180);

      ctx.beginPath();
      ctx.arc(x, y, 1 + near * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79, 195, 247, ${0.12 + near * 0.6})`;
      ctx.fill();
    }
  }
}

function drawGrid() {
  // stop drawing when the hero is off screen, saves battery
  if (window.scrollY > hero.offsetHeight) {
    running = false;
    return;
  }
  drawDots();
  requestAnimationFrame(drawGrid);
}

function startGrid() {
  if (reduceMotion) return;
  if (!running && window.scrollY <= hero.offsetHeight) {
    running = true;
    requestAnimationFrame(drawGrid);
  }
}

if (reduceMotion) {
  drawDots();
} else {
  startGrid();
}

// animations with gsap (skipped for people who asked for less motion)
if (window.gsap && !reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);

  // hero text comes in after the splash screen
  gsap.from('.intro', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    // straight away if the splash was skipped on a repeat visit
    delay: document.documentElement.classList.contains('no-splash') ? 0.1 : 1.9,
    ease: 'power3.out'
  });

  gsap.utils.toArray('.anim').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  gsap.utils.toArray('.anim-left').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  gsap.from('.project-card', {
    scrollTrigger: { trigger: '#projects-grid', start: 'top 85%' },
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
    clearProps: 'transform'
  });
}

// ========== contact: contact form (emailjs) ==========

// contact form (sends with emailjs)
// keys are from emailjs.com dashboard, the public key is ok to be public
const EMAILJS_PUBLIC_KEY = 'CF26LEWDzslEP4lLr';
const EMAILJS_SERVICE_ID = 'service_6n56kus';
const EMAILJS_TEMPLATE_ID = 'template_tl4ykz2'; // email that comes to me
const EMAILJS_AUTOREPLY_ID = 'template_tkhneqg'; // thank you email to the sender

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const form = document.getElementById('contact-form');
const statusText = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
let lastSent = '';

function showStatus(text, type) {
  statusText.textContent = text;
  statusText.className = 'form-status ' + type;
}

form.addEventListener('submit', async e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // hidden field, only bots fill this
  if (document.getElementById('website').value !== '') {
    showStatus("Thanks! Your message was sent, I'll get back to you soon.", 'success');
    form.reset();
    return;
  }

  if (!name || !email || !message) {
    showStatus('Please fill in all fields.', 'error');
    return;
  }

  // stop the same message being sent twice
  if (message === lastSent) {
    showStatus('You already sent this message.', 'error');
    return;
  }

  submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
  submitBtn.disabled = true;
  statusText.textContent = '';

  const params = {
    name: name,
    email: email,
    message: message,
    time: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
  };

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);

    // the thank you email, if this one fails its not a big deal so dont show an error
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTOREPLY_ID, params).catch(err => console.log(err));

    lastSent = message;
    showStatus("Thanks " + name + "! Your message was sent, check your inbox for a confirmation.", 'success');
    form.reset();
  } catch (err) {
    console.log(err);
    showStatus("Your message didn't send. Check your internet connection and try again, or message me on LinkedIn.", 'error');
  }

  submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
  submitBtn.disabled = false;
});
