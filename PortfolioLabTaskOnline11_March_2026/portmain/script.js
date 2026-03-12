/* ═══════════════════════════════════════════════
   M. A. SHAHRIAR RAHMAN SOUMIK — PORTFOLIO JS
═══════════════════════════════════════════════ */

'use strict';

/* ── 1. DARK / LIGHT MODE ─────────────────────── */
function applyTheme(theme, save) {
  document.documentElement.setAttribute('data-theme', theme);
  var icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
  if (save) localStorage.setItem('portfolio-theme', theme);
}

var savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme, false);

document.getElementById('theme-toggle').addEventListener('click', function () {
  var current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark', true);
});

/* ── 2. PROJECT DATA ──────────────────────────── */
var projects = [
  {
    id: 1,
    title: 'Delivery Driver',
    category: 'game',
    categoryLabel: 'Game',
    description: 'A 2D top-down delivery game built in Unity. Navigate through traffic and obstacles to deliver packages on time. Features physics-based driving, multiple levels, and a scoring system.',
    tags: ['Unity', 'C#', 'Game Dev', '2D'],
    emoji: '🚗',
    link: 'https://github.com/codesbysoumik/Delivery-Driver'
  },
  {
    id: 2,
    title: 'Silicon Source POS',
    category: 'app',
    categoryLabel: 'Desktop App',
    description: 'A smart Point-of-Sale system for a tech retail store built with C# as an OOP2 course project. Features inventory management, sales tracking, billing, and customer records.',
    tags: ['C#', '.NET', 'OOP', 'WinForms'],
    emoji: '🖥',
    link: 'https://github.com/Shadipto/OOP2-Project-Silicon-Source'
  },
  {
    id: 3,
    title: 'Employee Management System',
    category: 'app',
    categoryLabel: 'Desktop App',
    description: 'A Java-based Employee Management System that handles employee records, department assignment, payroll calculation, attendance tracking, and report generation.',
    tags: ['Java', 'OOP', 'JDBC', 'MySQL'],
    emoji: '👔',
    link: 'https://github.com/codesbysoumik/EmployeeManagementSystem'
  }
];

/* ── 3. RENDER PROJECT CARDS ──────────────────── */
function renderProjects(filter) {
  var grid = document.getElementById('projects-grid');
  if (!grid) return;

  var filtered = (!filter || filter === 'all')
    ? projects
    : projects.filter(function (p) { return p.category === filter; });

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted);font-size:.85rem;grid-column:1/-1;padding:2rem 0;">No projects in this category yet.</p>';
    return;
  }

  filtered.forEach(function (project, i) {
    var tagsHTML = project.tags.map(function (t) {
      return '<span class="card-tag">' + t + '</span>';
    }).join('');

    var card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.category = project.category;
    card.style.animationDelay = (i * 0.1) + 's';
    card.innerHTML =
      '<div class="card-image-placeholder">' + project.emoji + '</div>' +
      '<div class="card-body">' +
        '<span class="card-category">' + project.categoryLabel + '</span>' +
        '<h3 class="card-title">' + project.title + '</h3>' +
        '<p class="card-desc">' + project.description + '</p>' +
        '<div class="card-tags">' + tagsHTML + '</div>' +
        '<a href="' + project.link + '" class="card-link" target="_blank" rel="noopener">View on GitHub</a>' +
      '</div>';

    grid.appendChild(card);
  });
}

renderProjects('all');

/* ── 4. FILTER BUTTONS ────────────────────────── */
var filterBar = document.getElementById('filter-bar');
if (filterBar) {
  filterBar.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
}

/* ── 5. FORM VALIDATION ───────────────────────── */
var form = document.getElementById('contact-form');

function validateField(fieldId, errorId) {
  var field = document.getElementById(fieldId);
  var errEl = document.getElementById(errorId);
  if (!field || !errEl) return true;
  var val = field.value.trim();
  var msg = '';

  if (fieldId === 'name') {
    if (!val) msg = 'Name is required.';
    else if (val.length < 2) msg = 'Name must be at least 2 characters.';
  } else if (fieldId === 'email') {
    if (!val) msg = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) msg = 'Enter a valid email address.';
  } else if (fieldId === 'subject') {
    if (!val) msg = 'Subject is required.';
    else if (val.length < 3) msg = 'Subject is too short.';
  } else if (fieldId === 'message') {
    if (!val) msg = 'Message cannot be empty.';
    else if (val.length < 10) msg = 'Message must be at least 10 characters.';
  }

  errEl.textContent = msg;
  if (msg) { field.classList.add('error'); } else { field.classList.remove('error'); }
  return msg === '';
}

var fields = [
  { field: 'name',    error: 'name-error' },
  { field: 'email',   error: 'email-error' },
  { field: 'subject', error: 'subject-error' },
  { field: 'message', error: 'message-error' }
];

fields.forEach(function (f) {
  var el = document.getElementById(f.field);
  if (!el) return;
  el.addEventListener('blur', function () { validateField(f.field, f.error); });
  el.addEventListener('input', function () {
    if (el.classList.contains('error')) validateField(f.field, f.error);
  });
});

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var allValid = fields.every(function (f) { return validateField(f.field, f.error); });
    if (!allValid) return;

    var btnText    = document.getElementById('btn-text');
    var btnSending = document.getElementById('btn-sending');
    var btnEl      = document.getElementById('submit-btn');
    var success    = document.getElementById('form-success');

    btnText.classList.add('hidden');
    btnSending.classList.remove('hidden');
    btnEl.disabled = true;

    setTimeout(function () {
      btnSending.classList.add('hidden');
      btnText.classList.remove('hidden');
      btnEl.disabled = false;
      form.reset();
      success.classList.remove('hidden');
      setTimeout(function () { success.classList.add('hidden'); }, 5000);
    }, 1800);
  });
}

/* ── 6. TYPING ANIMATION ──────────────────────── */
var phrases = ['clean web apps.', 'intuitive UIs.', 'Unity 2D games.', 'smart desktop tools.', 'elegant solutions.'];
var typedEl = document.getElementById('typed-text');
var pIdx = 0, cIdx = 0, isDeleting = false;

function typeLoop() {
  if (!typedEl) return;
  var phrase = phrases[pIdx];
  if (!isDeleting) {
    cIdx++;
    typedEl.textContent = phrase.slice(0, cIdx);
    if (cIdx === phrase.length) { setTimeout(function () { isDeleting = true; typeLoop(); }, 2000); return; }
    setTimeout(typeLoop, 90);
  } else {
    cIdx--;
    typedEl.textContent = phrase.slice(0, cIdx);
    if (cIdx === 0) { isDeleting = false; pIdx = (pIdx + 1) % phrases.length; setTimeout(typeLoop, 400); return; }
    setTimeout(typeLoop, 55);
  }
}
typeLoop();

/* ── 7. SCROLL-TO-TOP ─────────────────────────── */
var scrollBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', function () {
  if (!scrollBtn) return;
  scrollBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
if (scrollBtn) {
  scrollBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

/* ── 8. STICKY NAV ────────────────────────────── */
var header = document.getElementById('site-header');
window.addEventListener('scroll', function () {
  if (header) header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── 9. MOBILE HAMBURGER ──────────────────────── */
var hamburger  = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

/* ── 10. ACTIVE NAV ON SCROLL ─────────────────── */
var sections = document.querySelectorAll('section[id]');
var navLinks  = document.querySelectorAll('.nav-link');
if (sections.length && navLinks.length) {
  new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (l) { l.style.color = ''; });
        var a = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
        if (a) a.style.color = 'var(--accent)';
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' }).observe && sections.forEach(function (s) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.style.color = ''; });
          var a = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
          if (a) a.style.color = 'var(--accent)';
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' }).observe(s);
  });
}
