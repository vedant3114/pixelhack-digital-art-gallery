const counter = document.getElementById("counter");
let current = 0;

const interval = setInterval(() => {
  if (current <= 100) {
    counter.textContent = `${current}%`;
    current++;
  } else {
    clearInterval(interval);
    // Redirect after loading completes
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  }
}, 30);

// Test image loading
const img = new Image();
img.src = "./img/image1.jpg";
img.onload = function() {
  console.log("Image loaded successfully");
};
img.onerror = function() {
  console.error("Failed to load image");
};


/* ================================
   PAGE TRANSITION & LINK FADE
================================ */
const pageTransition = document.getElementById('page-transition');

function transitionToPage(url) {
  pageTransition.classList.remove('pointer-events-none', 'opacity-0');
  pageTransition.classList.add('opacity-100');

  setTimeout(() => window.location.href = url, 700); // Match Tailwind duration-700
}

// Apply transition to all internal links
document.querySelectorAll("a[href$='.html']").forEach(link => {
  if (!link.hasAttribute('target')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      transitionToPage(link.href);
    });
  }
});

// Fade-in on page show
window.addEventListener('pageshow', () => {
  pageTransition.classList.add('pointer-events-none', 'opacity-0');
  pageTransition.classList.remove('opacity-100');
});

/* ================================
   MOBILE MENU TOGGLE
================================ */
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  document.addEventListener('click', e => {
    if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  });
}

/* ================================
   BACK TO TOP BUTTON
================================ */
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.remove('opacity-0', 'invisible');
      backToTopButton.classList.add('opacity-100', 'visible');
    } else {
      backToTopButton.classList.add('opacity-0', 'invisible');
      backToTopButton.classList.remove('opacity-100', 'visible');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ================================
   CUSTOM CURSOR + TRAIL + RIPPLE
================================ */
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

function createTrail(x, y, className) {
  const trail = document.createElement('div');
  trail.className = className;
  trail.style.left = `${x}px`;
  trail.style.top = `${y}px`;
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), className.includes('alt') ? 1200 : 1000);
}

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (cursor) cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
  createTrail(mouseX - 6, mouseY - 6, 'cursor-trail');
  createTrail(mouseX - 4 + (Math.random() * 8 - 4), mouseY - 4 + (Math.random() * 8 - 4), 'cursor-trail-alt');
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  if (cursorFollower) cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effects
document.querySelectorAll('button, a, .artwork-hover, .liquid-btn, .select-hover')
  .forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor?.classList.add('hover');
      cursorFollower?.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor?.classList.remove('hover');
      cursorFollower?.classList.remove('hover');
    });
  });

// Ripple on click
document.addEventListener('click', e => {
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.width = ripple.style.height = '40px';
  ripple.style.left = `${e.clientX - 20}px`;
  ripple.style.top = `${e.clientY - 20}px`;
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

/* ================================
   PARTICLE CANVAS BACKGROUND
================================ */
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 80;
  const mouse = { x: -100, y: -100 };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.speedY = Math.random() * 1.5 - 0.75;
      this.hue = Math.random() * 360;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

      const dx = mouse.x - this.x, dy = mouse.y - this.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        const angle = Math.atan2(dy, dx);
        this.speedX -= Math.cos(angle) * force * 0.05;
        this.speedY -= Math.sin(angle) * force * 0.05;
      }
      this.hue = (this.hue + 0.5) % 360;
    }
    draw() {
      ctx.save();
      ctx.shadowColor = `hsla(${this.hue},100%,70%,0.8)`;
      ctx.shadowBlur = 20;
      ctx.fillStyle = `hsla(${this.hue},100%,70%,0.8)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    particles = [];
    for (let i=0;i<particleCount;i++) particles.push(new Particle());
  }

  function connectParticles() {
    for (let a=0;a<particles.length;a++) {
      for (let b=a+1;b<particles.length;b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.strokeStyle = `hsla(240,100%,80%,${1-dist/100})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
}

/* ================================
   INTERSECTION OBSERVER & AOS
================================ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('animate-fadein', 'scaleup-appear');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('section').forEach(sec => observer.observe(sec));

// Lazy load fallback
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    const fallbackSeed = this.src.split('/').pop().split('?')[0].replace(/[^a-zA-Z0-9]/g, '-');
    this.src = `https://picsum.photos/seed/${fallbackSeed}/600/600.jpg`;
  });
});

// Initialize AOS if loaded
if (window.AOS) AOS.init({ duration: 1000, once: true });

/* ================================
   ARTWORK HOVER + RIPPLE
================================ */
const artworkCards = document.querySelectorAll('.artwork-hover');
artworkCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const ripple = document.createElement('div');
    ripple.className = 'absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl animate-pulse';
    ripple.style.zIndex = '10';
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);
  });
});
Array.from(artworkCards).sort(() => 0.5 - Math.random()).slice(0,4)
  .forEach(card => card.classList.add('animate-liquid'));

/* ================================
   SEARCH & PAGINATION INTERACTIONS
================================ */
document.querySelectorAll('input[type="text"]').forEach(input => {
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') console.log('Searching for:', e.target.value);
  });
});

const paginationButtons = document.querySelectorAll('nav button');
paginationButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    paginationButtons.forEach(b => b.classList.remove('bg-indigo-600','text-white'));
    btn.classList.add('bg-indigo-600','text-white');
    const mainContent = document.querySelector('main > div.max-w-6xl');
    if (mainContent) {
      mainContent.style.opacity = '0.5';
      setTimeout(() => { mainContent.style.opacity = '1'; }, 500);
    }
  });
});

/* ================================
   STARFIELD BACKGROUND
================================ */
function createStarfield() {
  const starsContainer = document.createElement('div');
  starsContainer.style.position = 'fixed';
  starsContainer.style.top = '0';
  starsContainer.style.left = '0';
  starsContainer.style.width = '100%';
  starsContainer.style.height = '100%';
  starsContainer.style.pointerEvents = 'none';
  starsContainer.style.zIndex = '-1';

  for (let i=0;i<50;i++) {
    const star = document.createElement('div');
    const size = Math.random() * 3;
    Object.assign(star.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: '#f0f0f0',
      borderRadius: '50%',
      top: `${Math.random()*100}%`,
      left: `${Math.random()*100}%`,
      opacity: Math.random()*0.5 + 0.2,
      animation: `pulse ${Math.random()*5+5}s infinite alternate`
    });
    starsContainer.appendChild(star);
  }
  document.body.appendChild(starsContainer);
}
createStarfield();

/* ================================
   CAROUSELS
================================ */
const images = ['./img/image1.jpg', './img/image2.jpg', './img/image3.jpg', './img/image4.jpg', './img/image5.jpg' , './img/image6.jpg', './img/image7.jpg', './img/image8.jpg', './img/image9.jpg'];
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

function updateCarousel(index) {
  const newImg = document.createElement('img');
  newImg.src = images[index];
  newImg.className = 'w-full h-full object-cover absolute inset-0 transform translate-x-full transition-transform duration-700';
  const currentImg = carousel.querySelector('img');
  if (currentImg) {
    currentImg.style.zIndex = '10';
    currentImg.classList.add('translate-x-0', 'transition-transform', 'duration-700');
  }
  carousel.appendChild(newImg);
  requestAnimationFrame(() => {
    newImg.classList.remove('translate-x-full');
    newImg.classList.add('translate-x-0');
    if (currentImg) currentImg.classList.add('-translate-x-full');
  });
  setTimeout(() => { if (currentImg) carousel.removeChild(currentImg); }, 700);
}
prevBtn?.addEventListener('click', () => { currentIndex = (currentIndex - 1 + images.length) % images.length; updateCarousel(currentIndex); });
nextBtn?.addEventListener('click', () => { currentIndex = (currentIndex + 1) % images.length; updateCarousel(currentIndex); });
setInterval(() => { currentIndex = (currentIndex + 1) % images.length; updateCarousel(currentIndex); }, 5000);



document.querySelectorAll('.slider-container').forEach((container, sliderIndex) => {
  let currentIndex = 0;
  const carousel = container.querySelector('.carousel');
  const prevBtn = container.querySelector('.prevSlide');
  const nextBtn = container.querySelector('.nextSlide');

  function updateCarousel(index) {
    const newImg = document.createElement('img');
    newImg.src = images[index];
    newImg.className = 'w-full h-full object-cover absolute inset-0 transform translate-x-full transition-transform duration-700';

    const currentImg = carousel.querySelector('img');
    if (currentImg) {
      currentImg.style.zIndex = '10';
      currentImg.classList.add('translate-x-0', 'transition-transform', 'duration-700');
    }

    carousel.appendChild(newImg);
    requestAnimationFrame(() => {
      newImg.classList.remove('translate-x-full');
      newImg.classList.add('translate-x-0');
      if (currentImg) currentImg.classList.add('-translate-x-full');
    });

    setTimeout(() => {
      if (currentImg) carousel.removeChild(currentImg);
    }, 700);
  }

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel(currentIndex);
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel(currentIndex);
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel(currentIndex);
  }, 5000);
});