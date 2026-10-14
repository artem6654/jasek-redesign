/* Dom Pogrzebowy Jasek — progressive enhancement only. The site works without JS. */
(function () {
  'use strict';

  /* Sticky header border on scroll */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Desktop dropdowns (disclosure pattern) */
  var toggles = Array.prototype.slice.call(document.querySelectorAll('.nav__toggle'));
  function closeAll(except) {
    toggles.forEach(function (t) {
      if (t === except) return;
      t.setAttribute('aria-expanded', 'false');
      var m = document.getElementById(t.getAttribute('aria-controls'));
      if (m) m.hidden = true;
    });
  }
  toggles.forEach(function (t) {
    var menu = document.getElementById(t.getAttribute('aria-controls'));
    t.addEventListener('click', function () {
      var open = t.getAttribute('aria-expanded') === 'true';
      closeAll(t);
      t.setAttribute('aria-expanded', String(!open));
      menu.hidden = open;
    });
    t.parentElement.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && t.getAttribute('aria-expanded') === 'true') {
        closeAll(); t.focus();
      }
    });
    t.parentElement.addEventListener('focusout', function (e) {
      if (!t.parentElement.contains(e.relatedTarget)) { t.setAttribute('aria-expanded', 'false'); menu.hidden = true; }
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav')) closeAll();
  });

  /* Mobile menu (modal dialog) */
  var dialog = document.getElementById('mobile-menu');
  var openBtn = document.querySelector('[data-menu-open]');
  var closeBtn = document.querySelector('[data-menu-close]');
  var outside = ['main', '.site-footer', '.topbar', '.site-header', '.callbar', '.skip-link'];
  function setInert(on) {
    outside.forEach(function (sel) {
      var el = document.querySelector(sel);
      if (!el) return;
      if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert');
    });
  }
  function openMenu() {
    dialog.hidden = false;
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    setInert(true);
    closeBtn.focus();
  }
  function closeMenu() {
    dialog.hidden = true;
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    setInert(false);
    openBtn.focus();
  }
  if (dialog && openBtn && closeBtn) {
    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeMenu(); return; }
      if (e.key !== 'Tab') return;
      var f = dialog.querySelectorAll('a[href], button:not([disabled])');
      var visible = Array.prototype.filter.call(f, function (el) { return el.offsetParent !== null; });
      var first = visible[0], last = visible[visible.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    dialog.querySelectorAll('.mobile-nav button[aria-controls]').forEach(function (b) {
      b.addEventListener('click', function () {
        var sub = document.getElementById(b.getAttribute('aria-controls'));
        var open = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', String(!open));
        sub.hidden = open;
      });
    });
    // Close when following an in-page link
    dialog.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (a) closeMenu();
    });
    window.matchMedia('(min-width: 75em)').addEventListener('change', function (mq) {
      if (mq.matches && !dialog.hidden) closeMenu();
    });
  }

  /* ---------- Motion (skipped entirely when the user prefers reduced motion) ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canObserve = 'IntersectionObserver' in window;
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  if (reduce || !canObserve) {
    $$('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var vh = window.innerHeight;
    var belowFold = function (el) { return el.getBoundingClientRect().top > vh * 0.92; };

    // Groups whose children appear one after another.
    var groups = '.steps-grid, .services-feature, .services-list, .check-list, .articles, .branches, .facts, .related, .gallery, .service-index, .closing__phones, .footer-top, .docs-strip ul';
    $$(groups).forEach(function (g) {
      g.classList.remove('reveal');
      $$(':scope > *', g).forEach(function (child, i) {
        if (!belowFold(child)) return;
        child.classList.add('reveal');
        child.style.setProperty('--i', String(i % 4));
      });
    });
    // Single blocks.
    $$('.section-head, .split > div, .docs-strip, .situation, .note, .toc, .help-box, .contact-card, .closing__grid > div:first-child, .prose > h2, .prose > p, .prose > ul, .service-group > .section-head').forEach(function (el) {
      if (!el.classList.contains('reveal') && belowFold(el)) el.classList.add('reveal');
    });
    // Photo curtains.
    $$('.card__media, .branch__media, .split__media:not(.mosaic), .mosaic > figure, .gallery figure').forEach(function (fig, i) {
      if (!belowFold(fig)) return;
      fig.classList.remove('reveal');
      fig.classList.add('img-reveal');
      if (fig.parentElement.classList.contains('mosaic')) fig.style.setProperty('--i', String(i % 3));
    });
    // Already-visible elements must not flash: only below-the-fold elements were tagged above.
    $$('.reveal').forEach(function (el) { if (!belowFold(el)) el.classList.add('is-visible'); });
    document.documentElement.classList.add('motion');

    // Count-up for plain numbers in fact lists (e.g. 1980, 11, 24 h).
    var countUp = function (dt) {
      var m = dt.textContent.trim().match(/^(\d+)(.*)$/);
      if (!m) return;
      var end = parseInt(m[1], 10), suffix = m[2];
      var start = end > 1000 ? end - 60 : 0;
      var t0 = null, dur = 1600;
      dt.setAttribute('aria-label', dt.textContent.trim()); // stable value for assistive tech
      var step = function (t) {
        if (!t0) t0 = t;
        var p = Math.min(1, (t - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 4);
        dt.textContent = Math.round(start + (end - start) * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        // Curtained photos are fully clipped, so their (unclipped) parent is observed instead.
        if (el.__figs) el.__figs.forEach(function (f) { f.classList.add('is-visible'); });
        if (el.classList.contains('reveal')) {
          el.classList.add('is-visible');
          $$('dt', el).forEach(countUp);
        }
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    var observed = [];
    var watch = function (el) { if (observed.indexOf(el) < 0) { observed.push(el); io.observe(el); } };
    $$('.reveal:not(.is-visible)').forEach(watch);
    $$('.img-reveal').forEach(function (fig) {
      var host = fig.parentElement;
      (host.__figs = host.__figs || []).push(fig);
      watch(host);
    });

    // Gentle parallax for hero photographs.
    var para = $$('.hero__media img, .page-hero__media img');
    if (para.length) {
      var ticking = false;
      var update = function () {
        ticking = false;
        para.forEach(function (el) {
          var r = el.closest('figure').getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          var shift = Math.max(-24, Math.min(24, -r.top * 0.06));
          el.style.translate = '0 ' + shift.toFixed(1) + 'px';
        });
      };
      window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
      window.addEventListener('resize', function () { vh = window.innerHeight; }, { passive: true });
    }
  }

  /* Cookie consent: Complianz handles `.cmplz-show-banner`. In this static preview it is not installed. */
  document.querySelectorAll('[data-consent-manage]').forEach(function (b) {
    if (!window.cmplz_set_cookie && !document.getElementById('cmplz-cookiebanner-container')) {
      b.closest('li').hidden = true;
    }
  });

  /* Callback form — accessible client-side validation.
     NOTE: the static preview has no backend. In WordPress this form is rendered by
     Contact Form 7 (already installed on jasek.pl). We never fake a success message. */
  var form = document.getElementById('callback-form');
  if (form) {
    var status = document.getElementById('form-status');
    var rules = [
      { el: form.elements.name, err: 'f-name-err', ok: function (v) { return v.trim().length >= 2; } },
      { el: form.elements.phone, err: 'f-phone-err', ok: function (v) { return v.replace(/\D/g, '').length >= 9; } },
      { el: form.elements.consent, err: 'f-consent-err', ok: function () { return form.elements.consent.checked; } },
    ];
    function check(r) {
      var valid = r.ok(r.el.value);
      r.el.setAttribute('aria-invalid', valid ? 'false' : 'true');
      document.getElementById(r.err).hidden = valid;
      return valid;
    }
    rules.forEach(function (r) {
      r.el.addEventListener('blur', function () { if (r.el.getAttribute('aria-invalid')) check(r); });
      r.el.addEventListener('change', function () { if (r.el.getAttribute('aria-invalid')) check(r); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      rules.forEach(function (r) { if (!check(r) && !firstInvalid) firstInvalid = r.el; });
      if (firstInvalid) {
        status.hidden = false;
        status.className = 'form-status form-status--error';
        status.textContent = 'Formularz zawiera błędy. Prosimy poprawić zaznaczone pola.';
        firstInvalid.focus();
        return;
      }
      status.hidden = false;
      status.className = 'form-status';
      status.textContent = 'To jest podgląd projektu – formularz nie jest jeszcze podłączony i wiadomość nie została wysłana. W pilnej sprawie prosimy dzwonić: Gliwice 32 231 13 47, Zabrze 32 271 79 63.';
      status.focus();
    });
  }
})();
