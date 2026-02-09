const typingEl = document.getElementById('typing');
const words = [
  'Minecraft Server Developer',
  'Discord Bot Engineer',
  'Full-Stack Web Builder'
];
let wordIndex = 0;
let charIndex = 0;
let typingForward = true;

function typeLoop() {
  const currentWord = words[wordIndex];

  if (typingForward) {
    charIndex++;
    if (charIndex === currentWord.length) {
      typingForward = false;
      setTimeout(typeLoop, 1200);
      typingEl.textContent = currentWord;
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      typingForward = true;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  typingEl.textContent = currentWord.substring(0, charIndex);
  setTimeout(typeLoop, typingForward ? 90 : 40);
}

typeLoop();

const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

const sections = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.2 }
);
sections.forEach((section) => observer.observe(section));

const tabs = document.querySelectorAll('.tab');
const categoryBlocks = document.querySelectorAll('[data-category]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.dataset.category;

    categoryBlocks.forEach((block) => {
      const matches = block.dataset.category === category;
      block.style.display = matches ? 'block' : 'none';
      if (matches) {
        block.animate(
          [
            { opacity: 0, transform: 'translateY(12px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          { duration: 300, easing: 'ease-out' }
        );
      }
    });
  });
});

const cards = document.querySelectorAll('.project-card');

cards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  });
});

const reviewTrack = document.getElementById('reviewTrack');
const reviewCards = Array.from(document.querySelectorAll('.review-card'));
const reviewDots = document.getElementById('reviewDots');
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');
let reviewIndex = 0;

function renderDots() {
  reviewDots.innerHTML = '';
  reviewCards.forEach((_, index) => {
    const dot = document.createElement('button');
    if (index === reviewIndex) dot.classList.add('active');
    dot.addEventListener('click', () => {
      reviewIndex = index;
      updateReviews();
    });
    reviewDots.appendChild(dot);
  });
}

function updateReviews() {
  reviewTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
  renderDots();
}

prevBtn.addEventListener('click', () => {
  reviewIndex = (reviewIndex - 1 + reviewCards.length) % reviewCards.length;
  updateReviews();
});

nextBtn.addEventListener('click', () => {
  reviewIndex = (reviewIndex + 1) % reviewCards.length;
  updateReviews();
});

updateReviews();

const backToTop = document.getElementById('backToTop');
const progressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${progress}%`;
  backToTop.classList.toggle('show', scrollTop > 500);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const API_BASE = window.APP_CONFIG && window.APP_CONFIG.apiBase ? window.APP_CONFIG.apiBase : '';

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  formStatus.textContent = 'Sending...';

  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.message || 'Something went wrong');

    formStatus.textContent = result.message;
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = error.message;
  }
});

const copyDiscord = document.getElementById('copyDiscord');
const copyStatus = document.getElementById('copyStatus');

copyDiscord.addEventListener('click', async () => {
  const discordLink = 'https://discord.com/users/980838325885747211';
  try {
    await navigator.clipboard.writeText(discordLink);
    copyStatus.textContent = 'Discord link copied to clipboard.';
  } catch (error) {
    copyStatus.textContent = 'Copy failed. Please copy manually.';
  }
});

const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hidden'), 600);
});

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = Array.from({ length: 60 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    speed: Math.random() * 0.6 + 0.2
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(72, 185, 255, 0.55)';

  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    p.y -= p.speed;
    if (p.y < -10) {
      p.y = canvas.height + 10;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
drawParticles();
