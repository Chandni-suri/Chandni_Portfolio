// Apply saved theme BEFORE paint to avoid flash
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();

// ---------- Year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Theme toggle ----------
(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');

  function apply(theme) {
    root.setAttribute('data-theme', theme);

    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }

  toggle.addEventListener('click', function () {
    var current =
      root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

    apply(current);
  });
})();

// ---------- Scroll reveal ----------
(function () {
  var els = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  els.forEach(function (el, i) {
    el.style.transitionDelay = Math.min(i, 6) * 60 + 'ms';
    io.observe(el);
  });
})();

// ---------- Back to top ----------
(function () {
  var btn = document.getElementById('toTop');

  function update() {
    if (window.scrollY > 400) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();

  btn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();