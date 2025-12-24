import 'the-new-css-reset/css/reset.css';
import '../styles/style.css';

(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) i(t);
  new MutationObserver((t) => {
    for (const o of t)
      if (o.type === 'childList')
        for (const c of o.addedNodes)
          c.tagName === 'LINK' && c.rel === 'modulepreload' && i(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(t) {
    const o = {};
    return (
      t.integrity && (o.integrity = t.integrity),
      t.referrerPolicy && (o.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : t.crossOrigin === 'anonymous'
          ? (o.credentials = 'omit')
          : (o.credentials = 'same-origin'),
      o
    );
  }
  function i(t) {
    if (t.ep) return;
    t.ep = !0;
    const o = s(t);
    fetch(t.href, o);
  }
})();
const u = document.querySelectorAll('[data-copy]');
u.forEach((r) => {
  const e = r.getAttribute('data-copy'),
    s = r.getAttribute('data-feedback'),
    i = s ? document.getElementById(s) : null;
  e &&
    r.addEventListener('click', async (t) => {
      t.preventDefault();
      try {
        (await navigator.clipboard.writeText(e),
          i &&
            (i.classList.remove('is-hidden'),
            i.classList.add('is-visible'),
            setTimeout(() => {
              (i.classList.remove('is-visible'), i.classList.add('is-hidden'));
            }, 2e3)));
      } catch (o) {
        console.warn('Clipboard copy failed.', o);
      }
    });
});
const n = document.querySelectorAll('.section'),
  f = window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  d = Array.from(document.querySelectorAll('.rail-nav a[href^="#"]')),
  l = new Map();
d.forEach((r) => {
  const e = r.getAttribute('href');
  e && l.set(e, r);
});
if (!f && 'IntersectionObserver' in window) {
  const r = new IntersectionObserver(
    (e, s) => {
      e.forEach((i) => {
        if (i.isIntersecting) {
          const t = i.target;
          (t.classList.contains('is-visible') ||
            window.setTimeout(() => {
              t.classList.add('is-visible');
            }, 120),
            s.unobserve(i.target));
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
  );
  n.forEach((e) => r.observe(e));
} else n.forEach((r) => r.classList.add('is-visible'));
const h = document.querySelectorAll('[data-anchor], .section'),
  v = (r) => {
    const e = r.getAttribute('data-anchor') || r.id;
    return e ? (e.startsWith('#') ? e : `#${e}`) : null;
  },
  a = (r) => {
    if (!r) return;
    d.forEach((s) => s.classList.remove('is-active'));
    const e = l.get(r);
    e && e.classList.add('is-active');
  };
if ('IntersectionObserver' in window) {
  const r = new IntersectionObserver(
    (e) => {
      const s = e.filter((t) => t.isIntersecting);
      if (!s.length) return;
      s.sort((t, o) => o.intersectionRatio - t.intersectionRatio);
      const i = v(s[0].target);
      a(i);
    },
    { threshold: [0.4, 0.55, 0.7] },
  );
  h.forEach((e) => r.observe(e));
} else a('#top');
const p = document.querySelectorAll('a[href^="#"]');
p.forEach((r) => {
  r.addEventListener('click', () => {
    const e = r.getAttribute('href');
    if (!e || e === '#' || e === '#top') return;
    const s = document.querySelector(e);
    s && s.classList.contains('section') && s.classList.add('is-visible');
  });
});
