// my projects
// to add a new one just copy one of these and change the details
const projects = [
  {
    title: 'Greenhouse Automation System',
    type: 'IoT System',
    category: 'iot',
    image: 'assets/greenhouse.jpg',
    github: 'https://github.com/abdullah-alhar/green-house',
    desc: 'Arduino Uno based automation system using a DHT11 sensor and soil moisture sensor to maintain optimal growing conditions. If temperature exceeds 30°C, the cooling fan activates automatically. When soil moisture drops below 400, the water pump turns on; once it reaches 700, the pump shuts off, maintaining precise hydration without manual intervention.',
    tags: ['Arduino Uno', 'DHT11', 'Soil Sensor', 'IoT', 'Automation']
  },
  {
    title: 'Smart Gate System',
    type: 'IoT System',
    category: 'iot',
    image: 'assets/smart-gate.jpg',
    github: 'https://github.com/abdullah-alhar/smart-home',
    desc: "ESP32-based smart gate controller using a 433MHz RF receiver to capture and store the rolling-gate remote's signal in EEPROM memory. Once stored, the gate can be triggered from anywhere in the world via a mobile app. The app sends a command over Wi-Fi to the ESP32 (connected to home network), which replays the 433MHz signal to the RF transmitter, locking or unlocking the gate remotely.",
    tags: ['ESP32', '433MHz RF', 'EEPROM', 'Wi-Fi', 'Mobile App']
  },
  {
    title: 'Student Course Registration System',
    type: 'Web App',
    badge: 'OOP Concepts',
    category: 'web',
    image: 'assets/course-reg.jpg',
    github: 'https://github.com/abdullah-alhar/student-registration',
    desc: 'A full-stack MVC web application built with Java & Spring Boot for a university OOP module exhibition. Supports three user roles (Admin, Student and Lecturer), each with a dedicated dashboard. Features include course creation and enrollment, room & schedule management, and a payment slip upload system. Uses a custom file-based storage layer (no external database) with full CRUD operations implemented in pure OOP design principles.',
    tags: ['Java', 'Spring Boot', 'Thymeleaf', 'MVC', 'OOP', 'File Storage']
  }
];

const projectsGrid = document.getElementById('projects-grid');

projects.forEach(project => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.dataset.category = project.category;

  let tagsHtml = '';
  project.tags.forEach(tag => {
    tagsHtml += `<span class="tag">${tag}</span>`;
  });

  card.innerHTML = `
    <div class="project-img">
      <img src="${project.image}" alt="${project.title}" loading="lazy">
      <div class="project-overlay">
        <a href="${project.github}" target="_blank"><i class="fa-brands fa-github"></i> View Code</a>
      </div>
    </div>
    <div class="project-body">
      <div class="project-top">
        <span class="project-type">${project.type}</span>
        ${project.badge ? `<span class="project-badge">${project.badge}</span>` : ''}
        <a href="${project.github}" target="_blank" class="project-git" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
      </div>
      <h3>${project.title}</h3>
      <p>${project.desc}</p>
      <div class="tech-tags">${tagsHtml}</div>
    </div>
  `;

  projectsGrid.appendChild(card);
});

// filter buttons (all / iot / web)
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const cards = document.querySelectorAll('.project-card');
    const shown = [];

    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        shown.push(card);
      } else {
        card.classList.add('hidden');
      }
    });

    if (window.gsap) {
      gsap.fromTo(shown, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, overwrite: true });
      ScrollTrigger.refresh();
    }
  });
});

// certificates
const certificates = [
  {
    title: 'Code Night - N3:GO Excellence Award',
    issuer: 'SLIIT Mozilla Campus Club',
    date: 'Aug 2026',
    image: 'assets/certificates/code-night.jpg',
    winner: true
  },
  {
    title: 'Git & GitHub 101 Workshop',
    issuer: 'Software Engineering Student Community, SLIIT',
    date: 'Feb 2026',
    image: 'assets/certificates/git-github.jpg'
  },
  {
    title: 'Python for Beginners',
    issuer: 'CSE Department, University of Moratuwa (CODL)',
    date: 'Jan 2025',
    image: 'assets/certificates/python.jpg',
    verify: 'https://open.uom.lk/verify'
  },
  {
    title: 'Web Design for Beginners',
    issuer: 'IT Department, University of Moratuwa (CODL)',
    image: 'assets/certificates/web-design.jpg',
    verify: 'https://open.uom.lk/verify'
  }
];

const certGrid = document.getElementById('cert-grid');

certificates.forEach(cert => {
  const card = document.createElement('div');
  card.className = cert.winner ? 'cert-card anim winner' : 'cert-card anim';

  card.innerHTML = `
    <div class="cert-img" data-lightbox="${cert.image}" data-caption="${cert.title}">
      ${cert.winner ? '<span class="winner-badge"><i class="fa-solid fa-trophy"></i> Winner</span>' : ''}
      <img src="${cert.image}" alt="${cert.title} certificate" loading="lazy">
      <span class="zoom-icon"><i class="fa-solid fa-magnifying-glass-plus"></i></span>
    </div>
    <div class="cert-body">
      <h4>${cert.title}</h4>
      <p class="cert-issuer">${cert.issuer}</p>
      <div class="cert-bottom">
        <span class="cert-date">${cert.date ? `<i class="fa-regular fa-calendar"></i>${cert.date}` : ''}</span>
        ${cert.verify ? `<a href="${cert.verify}" target="_blank" class="cert-verify">Verify <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
      </div>
    </div>
  `;

  certGrid.appendChild(card);
});

// click a certificate to see it big
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

document.querySelectorAll('[data-lightbox]').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.dataset.lightbox;
    lightboxCaption.textContent = item.dataset.caption;
    lightbox.classList.add('open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
}

lightbox.addEventListener('click', e => {
  // close when clicking outside the image
  if (e.target !== lightboxImg) {
    closeLightbox();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

function openMenu() {
  navLinks.classList.add('open');
  hamburger.querySelector('i').className = 'fa-solid fa-xmark';
}

function closeMenu() {
  navLinks.classList.remove('open');
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
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

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
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

function drawGrid() {
  // stop drawing when the hero is off screen, saves battery
  if (window.scrollY > hero.offsetHeight) {
    running = false;
    return;
  }

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

  requestAnimationFrame(drawGrid);
}

function startGrid() {
  if (!running && window.scrollY <= hero.offsetHeight) {
    running = true;
    requestAnimationFrame(drawGrid);
  }
}
startGrid();

// animations with gsap
if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  // hero text comes in after the splash screen
  gsap.from('.intro', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    delay: 1.9,
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
    ease: 'power2.out'
  });
}

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
    showStatus('Something went wrong. Please try again in a bit.', 'error');
  }

  submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
  submitBtn.disabled = false;
});

// footer year
document.getElementById('year').textContent = new Date().getFullYear();
