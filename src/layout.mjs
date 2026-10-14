import { SITE, BRANCHES, SERVICES, IMAGES } from './data.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const tel = (p) => {
  let d = p.replace(/[^0-9+]/g, '');
  if (!d.startsWith('+')) d = '+48' + d.replace(/^0+/, '');
  return 'tel:' + d;
};

const ICONS = {
  phone: '<path d="M5 3.5h3.2l1.6 4.2-2.1 1.4a12 12 0 0 0 7.2 7.2l1.4-2.1 4.2 1.6V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5Z"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="1"/><path d="m4 6.5 8 6 8-6"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  doc: '<path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4M9.5 12h6M9.5 15.5h6"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
};
export const icon = (n) =>
  `<svg class="icon icon--${n}" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</svg>`;

/** Responsive <img> for a catalogue photo. */
export const img = (name, alt, { sizes = '(min-width: 64em) 50vw, 100vw', eager = false, cls = '' } = {}) => {
  const [w, h] = IMAGES[name];
  const sm = Math.min(640, w);
  return `<img src="/assets/img/${name}-lg.webp" srcset="/assets/img/${name}-sm.webp ${sm}w, /assets/img/${name}-lg.webp ${w}w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"${cls ? ` class="${cls}"` : ''}>`;
};

const NAV = [
  {
    label: 'Usługi', href: '/uslugi/', id: 'uslugi',
    children: [
      ...SERVICES.filter((s) => s.slug !== 'asortyment').map((s) => ({ label: s.title, href: `/${s.slug}/` })),
    ],
    all: { label: 'Wszystkie usługi', href: '/uslugi/' },
  },
  {
    label: 'Poradnik', href: '/informacje-pogrzebowe/', id: 'poradnik',
    children: [
      { label: 'Co zrobić, gdy ktoś umrze?', href: '/organizacja-pogrzebu/' },
      { label: 'Zasiłek pogrzebowy', href: '/zasilek-pogrzebowy/' },
      { label: 'Kremacja – informacje', href: '/kremacja/' },
      { label: 'Sprowadzenie zmarłego z zagranicy', href: '/miedzynarodowy-transport-zwlok/' },
    ],
    all: { label: 'Wszystkie informacje', href: '/informacje-pogrzebowe/' },
  },
  { label: 'Asortyment', href: '/asortyment/' },
  { label: 'O firmie', href: '/o-firmie/' },
  { label: 'Kontakt', href: '/kontakt/' },
];

const brand = (variant = 'dark') => `
  <a class="brand" href="/" ${variant === 'dark' ? 'aria-label="Dom Pogrzebowy Jasek – strona główna"' : ''}>
    <img class="brand__mark" src="/assets/img/logo-mark-${variant}.png" width="64" height="103" alt="">
    <span class="brand__text"${variant === 'dark' ? ' aria-hidden="true"' : ''}>
      <span class="brand__name">Jasek</span>
      <span class="brand__sub">Dom Pogrzebowy<span class="brand__sub-cities"> · Gliwice, Zabrze</span></span>
    </span>
  </a>`;

const langSwitch = () => `
  <ul class="lang">
    <li><a href="${SITE.lang.pl}" hreflang="pl" lang="pl" aria-current="true"><abbr title="Polski" style="text-decoration:none">PL</abbr></a></li>
    <li><a href="${SITE.lang.de}" hreflang="de" lang="de"><abbr title="Deutsch" style="text-decoration:none">DE</abbr></a></li>
    <li><a href="${SITE.lang.en}" hreflang="en" lang="en"><abbr title="English" style="text-decoration:none">EN</abbr></a></li>
  </ul>`;

const desktopNav = (path) => `
  <nav class="nav" aria-label="Menu główne">
    <ul class="nav__list">
      ${NAV.map((item) => {
        if (!item.children) {
          return `<li><a class="nav__link" href="${item.href}"${path === item.href ? ' aria-current="page"' : ''}>${item.label}</a></li>`;
        }
        return `<li>
          <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="sub-${item.id}">${item.label}${icon('chevron')}</button>
          <ul class="nav__sub" id="sub-${item.id}" hidden>
            ${item.children.map((c) => `<li><a href="${c.href}"${path === c.href ? ' aria-current="page"' : ''}>${c.label}</a></li>`).join('')}
            <li class="nav__sub-all"><a href="${item.all.href}">${item.all.label}</a></li>
          </ul>
        </li>`;
      }).join('')}
    </ul>
  </nav>`;

const mobileNav = () => `
  <div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>
    <div class="container mobile-menu__head">
      ${brand('dark')}
      <button class="menu-toggle" type="button" data-menu-close>${icon('close')}<span>Zamknij</span></button>
    </div>
    <div class="container mobile-menu__body">
      <div class="mobile-menu__urgent on-dark">
        <p>Dyżur telefoniczny – całą dobę, 7 dni w tygodniu</p>
        ${BRANCHES.map((b) => `<a class="btn btn--light" href="${tel(b.phone24)}">${icon('phone')}<span>${b.labelShort}: ${b.phone24}</span></a>`).join('')}
      </div>
      <nav aria-label="Menu główne (mobilne)">
        <ul class="mobile-nav">
          <li><a href="/organizacja-pogrzebu/">Co zrobić, gdy ktoś umrze?${icon('arrow')}</a></li>
          ${NAV.map((item) => {
            if (!item.children) return `<li><a href="${item.href}">${item.label}${icon('arrow')}</a></li>`;
            return `<li>
              <button type="button" aria-expanded="false" aria-controls="m-sub-${item.id}">${item.label}${icon('chevron')}</button>
              <ul id="m-sub-${item.id}" hidden>
                ${item.children.map((c) => `<li><a href="${c.href}">${c.label}</a></li>`).join('')}
                <li><a href="${item.all.href}"><strong>${item.all.label}</strong></a></li>
              </ul>
            </li>`;
          }).join('')}
        </ul>
      </nav>
      <div>
        <p class="eyebrow" id="m-lang">Wersja językowa</p>
        <nav aria-labelledby="m-lang">${langSwitch()}</nav>
      </div>
    </div>
  </div>`;

export const breadcrumbs = (trail) => `
  <nav class="breadcrumbs" aria-label="Okruszki">
    <ol>
      <li><a href="/">Strona główna</a></li>
      ${trail.map((t, i) => (i === trail.length - 1 ? `<li><span aria-current="page">${t.label}</span></li>` : `<li><a href="${t.href}">${t.label}</a></li>`)).join('')}
    </ol>
  </nav>`;

const breadcrumbLd = (trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ label: 'Strona główna', href: '/' }, ...trail].map((t, i) => ({
    '@type': 'ListItem', position: i + 1, name: t.label, item: SITE.url + t.href,
  })),
});

export const orgLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': SITE.url + '/#organization',
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url + '/',
  foundingDate: SITE.founded,
  logo: SITE.url + '/wp-content/uploads/2016/06/Jasek-logo.png',
  vatID: SITE.vatId,
  department: BRANCHES.map((b) => ({
    '@type': 'LocalBusiness',
    '@id': `${SITE.url}/kontakt/#${b.id}`,
    name: `${SITE.name} – ${b.label}`,
    telephone: tel(b.phone24).replace('tel:', ''),
    email: b.email,
    address: {
      '@type': 'PostalAddress', streetAddress: b.street.replace('ul. ', 'ul. '),
      postalCode: b.postcode, addressLocality: b.city, addressCountry: 'PL',
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '16:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '13:00' },
    ],
    hasMap: b.map,
  })),
});

/**
 * Full HTML document.
 */
export const page = ({ path, title, description, body, trail = null, ld = [], ogImage = 'hero-lilies-1024.jpg', bodyClass = '' }) => {
  const canonical = SITE.url + path;
  const lds = [...ld, ...(trail ? [breadcrumbLd(trail)] : [])];
  const isHome = path === '/';
  return `<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
${isHome ? `<link rel="alternate" hreflang="pl" href="${SITE.lang.pl}">
<link rel="alternate" hreflang="de" href="${SITE.lang.de}">
<link rel="alternate" hreflang="en" href="${SITE.lang.en}">
<link rel="alternate" hreflang="x-default" href="${SITE.lang.pl}">` : ''}
<meta property="og:locale" content="pl_PL">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.url}/assets/img/${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f7f4ee">
<link rel="icon" href="/assets/img/logo-mark-dark.png" type="image/png">
<link rel="preload" href="/assets/fonts/newsreader-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/source-sans-3-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/main.min.css">
<script>document.documentElement.classList.add('js')</script>
<script src="/assets/js/main.js" defer></script>
${lds.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
<div class="progress" aria-hidden="true"></div>
<a class="skip-link" href="#main">Przejdź do treści</a>

<div class="topbar" role="region" aria-label="Kontakt całodobowy">
  <div class="container">
    <p class="topbar__note"><span class="pulse" aria-hidden="true"></span><span class="topbar__long">Dyżur telefoniczny całą dobę, 7 dni w tygodniu</span><span class="topbar__short">Dyżur całodobowy, 7 dni w tygodniu</span></p>
    <ul class="topbar__phones" aria-label="Telefony całodobowe">
      ${BRANCHES.map((b) => `<li>${b.labelShort}: <a href="${tel(b.phone24)}">${b.phone24}</a></li>`).join('')}
    </ul>
    <nav aria-label="Wersja językowa">${langSwitch()}</nav>
  </div>
</div>

<header class="site-header" id="top">
  <div class="container site-header__inner">
    ${brand('dark')}
    ${desktopNav(path)}
    <a class="btn btn--primary header-cta" href="/organizacja-pogrzebu/">Co zrobić, gdy ktoś umrze?</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-open>${icon('menu')}<span>Menu</span></button>
  </div>
</header>
${mobileNav()}

<main id="main" tabindex="-1">
${body}
</main>

<footer class="site-footer on-dark">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        ${brand('light')}
        <p>Firma Pogrzebowa Jasek działa od ${SITE.founded} roku. Zapewniamy pełen zakres usług pogrzebowych, kremacyjnych i cmentarnych w Gliwicach i Zabrzu.</p>
      </div>
      ${BRANCHES.map((b) => `
      <div class="footer-branch">
        <h2>${b.label}</h2>
        <address>
          <span>${b.street}<br>${b.postcode} ${b.city}</span>
          <a class="big" href="${tel(b.phone24)}">${b.phone24}</a>
          <span>całodobowo · dyżur: <a href="${tel(b.phoneDuty)}">${b.phoneDuty}</a></span>
          <span>${b.phoneExtraLabel}: <a href="${tel(b.phoneExtra)}">${b.phoneExtra}</a></span>
          <a href="mailto:${b.email}">${b.email}</a>
          <span>Biuro: pon.–pt. ${b.hoursWeek}, sob. ${b.hoursSat}</span>
        </address>
      </div>`).join('')}
      <div>
        <h2>Usługi</h2>
        <ul class="footer-list">
          ${['organizacja-pogrzebu', 'kremacja', 'sala-pozegnan', 'transport-zmarlych', 'miedzynarodowy-transport-zwlok', 'kwiaty'].map((s) => {
            const x = SERVICES.find((v) => v.slug === s);
            return `<li><a href="/${x.slug}/">${x.title}</a></li>`;
          }).join('')}
          <li><a href="/uslugi/">Wszystkie usługi</a></li>
        </ul>
      </div>
      <div>
        <h2>Informacje</h2>
        <ul class="footer-list">
          <li><a href="/organizacja-pogrzebu/">Co zrobić, gdy ktoś umrze?</a></li>
          <li><a href="/zasilek-pogrzebowy/">Zasiłek pogrzebowy</a></li>
          <li><a href="/informacje-pogrzebowe/">Poradnik</a></li>
          <li><a href="/o-firmie/">O firmie</a></li>
          <li><a href="/kontakt/">Kontakt</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p style="margin:0">© ${new Date().getFullYear()} ${SITE.legalName} · NIP ${SITE.vatId}</p>
      <ul>
        <li><a href="/privacy-policy/">Polityka prywatności i cookies</a></li>
        <li><button type="button" class="cmplz-show-banner" data-consent-manage>Zarządzaj zgodą na cookies</button></li>
        <li><a href="${SITE.lang.de}" hreflang="de" lang="de">Deutsch</a></li>
        <li><a href="${SITE.lang.en}" hreflang="en" lang="en">English</a></li>
      </ul>
    </div>
  </div>
</footer>

<nav class="callbar" aria-label="Telefon całodobowy">
  ${BRANCHES.map((b) => `<a href="${tel(b.phone24)}" aria-label="Zadzwoń całodobowo – ${b.label}: ${b.phone24}">${icon('phone')}<span><small>24 h · ${b.labelShort}</small><strong>${b.phone24}</strong></span></a>`).join('')}
</nav>
</body>
</html>
`;
};

/* ---------- Reusable blocks ---------- */

export const urgentPanel = () => `
  <div class="urgent">
    <p class="urgent__head"><span class="pulse" aria-hidden="true"></span>Telefon całodobowy – odbieramy o każdej porze</p>
    <div class="urgent__phones">
      ${BRANCHES.map((b) => `
      <a class="urgent__phone" href="${tel(b.phone24)}">
        <span><small>${b.label}</small><strong>${b.phone24}</strong></span>
        <span class="icon-wrap" aria-hidden="true">${icon('phone')}</span>
      </a>`).join('')}
    </div>
  </div>`;

export const helpBox = () => `
  <aside class="help-box on-dark" aria-labelledby="help-title">
    <h2 id="help-title">Potrzebują Państwo pomocy teraz?</h2>
    <p>Odbieramy telefon całą dobę. Przyjedziemy po osobę zmarłą i pomożemy w formalnościach.</p>
    ${BRANCHES.map((b) => `
    <a class="help-box__phone" href="${tel(b.phone24)}">
      <span><small>${b.label}</small><strong>${b.phone24}</strong></span>${icon('phone')}
    </a>`).join('')}
  </aside>`;

export const branchCard = (b, { headingLevel = 3, eager = false } = {}) => `
  <article class="branch" id="${b.id}" aria-labelledby="branch-${b.id}">
    <figure class="branch__media">${img(b.img, b.imgAlt, { sizes: '(min-width: 56em) 50vw, 100vw', eager })}</figure>
    <div class="branch__body">
      <div>
        <p class="eyebrow" style="margin-bottom:.5rem">${b.city}</p>
        <h${headingLevel} id="branch-${b.id}">${b.label}</h${headingLevel}>
        <p style="margin:.5rem 0 0;color:var(--c-muted)">${b.note}</p>
      </div>
      <a class="branch__phone-main" href="${tel(b.phone24)}">
        <small>Telefon całodobowy</small><strong>${b.phone24}</strong>
      </a>
      <dl>
        <div>${icon('pin')}<dt>Adres</dt><dd>${b.street}, ${b.postcode} ${b.city}</dd></div>
        <div>${icon('phone')}<dt>Pozostałe telefony</dt><dd>Numer dyżurowy: <a href="${tel(b.phoneDuty)}">${b.phoneDuty}</a><br>${b.phoneExtraLabel}: <a href="${tel(b.phoneExtra)}">${b.phoneExtra}</a></dd></div>
        <div>${icon('clock')}<dt>Biuro czynne</dt><dd>pon.–pt. ${b.hoursWeek}<br>sobota ${b.hoursSat}</dd></div>
        <div>${icon('mail')}<dt>E-mail</dt><dd><a href="mailto:${b.email}">${b.email}</a></dd></div>
      </dl>
      <div class="branch__actions">
        <a class="btn btn--outline" href="${b.map}" target="_blank" rel="noopener">${icon('pin')}Jak dojechać<span class="visually-hidden"> do oddziału ${b.city} (Mapy Google, nowe okno)</span></a>
      </div>
    </div>
  </article>`;

export const serviceCard = (s, { sizes = '(min-width: 72em) 25vw, (min-width: 40em) 50vw, 100vw', hl = 3 } = {}) => `
  <article class="card">
    ${s.img ? `<figure class="card__media">${img(s.img, s.imgAlt, { sizes })}</figure>` : ''}
    <h${hl} class="card__title"><a href="/${s.slug}/">${s.title}</a></h${hl}>
    <p>${s.short}</p>
    <span class="card__more" aria-hidden="true">Dowiedz się więcej ${icon('arrow')}</span>
  </article>`;

export const closingCta = ({ title = 'Jesteśmy z Państwem o każdej porze', text = 'Wystarczy jeden telefon. Przyjedziemy po osobę zmarłą, wyjaśnimy kolejne kroki i zajmiemy się formalnościami.' } = {}) => `
  <section class="section section--dark closing" aria-labelledby="closing-title">
    <div class="container closing__grid">
      <div>
        <p class="eyebrow">Kontakt całodobowy</p>
        <h2 id="closing-title">${title}</h2>
        <p class="lead" style="color:var(--c-on-dark-muted);max-width:34rem">${text}</p>
        <p style="color:var(--c-on-dark-muted);margin:0">Biura w Gliwicach i Zabrzu: pon.–pt. 8:00–16:00, sobota 8:00–13:00. <a href="/kontakt/">Wszystkie dane kontaktowe</a></p>
      </div>
      <div class="closing__phones">
        ${BRANCHES.map((b) => `
        <a class="closing__phone" href="${tel(b.phone24)}">
          <span><small>${b.label} · 24 h</small><strong>${b.phone24}</strong></span>${icon('phone')}
        </a>`).join('')}
      </div>
    </div>
  </section>`;

export const related = (slugs, title = 'Zobacz również') => `
  <section class="section section--tight section--sand" aria-labelledby="related-title">
    <div class="container">
      <h2 id="related-title" style="font-size:var(--fs-h3)">${title}</h2>
      <ul class="related">
        ${slugs.map((s) => {
          const x = SERVICES.find((v) => v.slug === s) || { title: s.title, slug: s.slug };
          return `<li><a href="/${x.slug}/">${x.title}${icon('arrow')}</a></li>`;
        }).join('')}
      </ul>
    </div>
  </section>`;
