/* ============================================================
   SPLASH SCREEN
   ============================================================ */
/* The splash screen animation is now fully controlled by CSS keyframes */

/* ============================================================
   NAV — hamburger toggle
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ============================================================
   NAV — hide on scroll down, show on scroll up
   ============================================================ */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 300 && current > lastScroll) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastScroll = current;
});

/* Typewriter removed — hero now uses static role text */

/* ============================================================
   HERO — animated grid canvas background
   ============================================================ */
const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');
let w, h;

function resizeCanvas() {
  w = canvas.width = canvas.offsetWidth;
  h = canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const spacing = 36;
let mouseX = -1000, mouseY = -1000;

window.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

function drawGrid() {
  ctx.clearRect(0, 0, w, h);
  for (let x = 0; x < w; x += spacing) {
    for (let y = 0; y < h; y += spacing) {
      const dist = Math.hypot(x - mouseX, y - mouseY);
      const proximity = Math.max(0, 1 - dist / 180);
      const radius = 1 + proximity * 2;
      const alpha = 0.15 + proximity * 0.5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79, 195, 247, ${alpha})`;
      ctx.fill();
    }
  }
  requestAnimationFrame(drawGrid);
}
drawGrid();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealTargets = document.querySelectorAll(
  '.about-text, .about-image-wrap, .skill-category, .project-card, .edu-item, .contact-form'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

/* ============================================================
   CONTACT FORM — FormSubmit.co Integration
   ============================================================ */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = form.querySelector('#name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    status.textContent = 'Please fill in all fields.';
    status.style.color = 'var(--text-dim)';
    return;
  }

  // Update UI while sending
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  status.textContent = '';

  // Use FormSubmit.co for backend-less email sending
  fetch("https://formsubmit.co/ajax/abdullahbinalhar@gmail.com", {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      message: message
    })
  })
  .then(response => response.json())
  .then(data => {
    if(data.success) {
      status.textContent = 'Message sent successfully!';
      status.style.color = '#4ade80'; // Success green
      form.reset();
    } else {
      status.textContent = 'Error sending message. Please try again.';
      status.style.color = '#f87171'; // Error red
    }
  })
  .catch(error => {
    status.textContent = 'Network error. Please try again.';
    status.style.color = '#f87171'; // Error red
  })
  .finally(() => {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  });
});
