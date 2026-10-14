// Verified company data — source: www.jasek.pl (/kontakt/, /o-firmie/, /transport-zmarlych/,
// /prosektorium/, /kremacja/, /zasilek-pogrzebowy/ …), audited 13.10.2026.
// Nothing here is invented: every fact is quoted or paraphrased from the live site.

export const SITE = {
  name: 'Dom Pogrzebowy Jasek',
  legalName: 'Firma Pogrzebowa Jasek',
  url: 'https://www.jasek.pl',
  founded: '1980',
  vehicles: '11',
  vatId: '6311024112',
  lang: {
    pl: 'https://www.jasek.pl/',
    de: 'https://www.jasek.pl/de/',
    en: 'https://www.jasek.pl/en/',
  },
  flowerShop: 'https://www.kwiaciarniajasek.pl/',
};

export const BRANCHES = [
  {
    id: 'gliwice',
    city: 'Gliwice',
    label: 'Oddział w Gliwicach',
    labelShort: 'Gliwice',
    street: 'ul. Zygmunta Starego 49',
    postcode: '44-100',
    phone24: '32 231 13 47',
    phoneDuty: '+48 663 311 347',
    phoneExtra: '32 279 04 12',
    phoneExtraLabel: 'tel./fax',
    email: 'gliwice@jasek.pl',
    hoursWeek: '8:00–16:00',
    hoursSat: '8:00–13:00',
    map: 'https://www.google.com/maps/search/?api=1&query=Dom+Pogrzebowy+Jasek%2C+Zygmunta+Starego+49%2C+44-100+Gliwice',
    img: 'siedziba-gliwice',
    imgAlt: 'Budynek Domu Pogrzebowego Jasek przy ul. Zygmunta Starego 49 w Gliwicach',
    note: 'Siedziba firmy: dwie sale pożegnań, chłodnie i prosektorium.',
  },
  {
    id: 'zabrze',
    city: 'Zabrze',
    label: 'Oddział w Zabrzu',
    labelShort: 'Zabrze',
    street: 'ul. Wolności 209',
    postcode: '41-800',
    phone24: '32 271 79 63',
    phoneDuty: '+48 695 599 169',
    phoneExtra: '32 271 31 59',
    phoneExtraLabel: 'tel./fax',
    email: 'gliwice@jasek.pl',
    hoursWeek: '8:00–16:00',
    hoursSat: '8:00–13:00',
    map: 'https://www.google.com/maps/search/?api=1&query=Dom+Pogrzebowy+Jasek%2C+Wolno%C5%9Bci+209%2C+41-800+Zabrze',
    img: 'zabrze-biuro',
    imgAlt: 'Biuro obsługi klienta Domu Pogrzebowego Jasek w Zabrzu',
    note: 'Sala pożegnań, chłodnie oraz kwiaciarnia przy ul. Wolności 209.',
  },
];

// Image catalogue: name -> intrinsic size of the "lg" variant (for width/height attrs)
export const IMAGES = {
  'team': [1024, 674], 'sala-gliwice': [1024, 674], 'sala-gliwice-2': [1024, 674],
  'sala-gliwice-3': [1024, 674], 'sala-zabrze': [1024, 683], 'siedziba-gliwice': [1024, 683],
  'siedziba-lotnicze': [1400, 788], 'zabrze-biuro': [1024, 768], 'zabrze-wejscie': [1024, 678],
  'karawan': [1400, 934], 'karawan-2': [1400, 934], 'flota': [1400, 934], 'urny': [1024, 673],
  'asortyment': [1024, 768], 'kwiaty': [1024, 768], 'odziez': [1024, 683], 'muzyka': [1074, 715],
  'kamieniarstwo': [380, 570], 'chlodnie': [1024, 674], 'biuro-gliwice': [1024, 673],
};

// Services. `group` drives the /uslugi/ index; `featured` = shown with photo on the homepage.
export const SERVICES = [
  {
    slug: 'organizacja-pogrzebu', title: 'Organizacja pogrzebu', group: 'ceremonia', featured: true,
    short: 'Przejmujemy formalności i przygotowanie ceremonii – z poszanowaniem Państwa woli i możliwości finansowych.',
    img: 'biuro-gliwice', imgAlt: 'Biuro obsługi rodzin w Domu Pogrzebowym Jasek w Gliwicach',
  },
  {
    slug: 'kremacja', title: 'Kremacja', group: 'ceremonia', featured: true,
    short: 'Organizujemy kremację i pochówek urny. Od 2007 roku współpracujemy z pierwszym i największym krematorium w regionie.',
    img: 'urny', imgAlt: 'Ekspozycja urn w Domu Pogrzebowym Jasek',
  },
  {
    slug: 'sala-pozegnan', title: 'Sala pożegnań', group: 'ceremonia', featured: true,
    short: 'Własne kaplice w Gliwicach i Zabrzu – miejsce na spokojne pożegnanie w skupieniu i modlitwie.',
    img: 'sala-gliwice', imgAlt: 'Jasna sala pożegnań z rzędami krzeseł w Domu Pogrzebowym Jasek',
  },
  {
    slug: 'transport-zmarlych', title: 'Transport zmarłych', group: 'opieka', featured: true,
    short: 'Całodobowy przewóz osoby zmarłej z miejsca zgonu. 11 samochodów pogrzebowych do przewozów w kraju i za granicą.',
    img: 'karawan', imgAlt: 'Samochód pogrzebowy Domu Pogrzebowego Jasek przed siedzibą firmy',
  },
  {
    slug: 'miedzynarodowy-transport-zwlok', title: 'Międzynarodowy transport zwłok', group: 'opieka',
    short: 'Sprowadzenie osoby zmarłej z zagranicy lub przewóz za granicę – wraz z dokumentami i kontaktem z konsulatem.',
    img: 'karawan-2', imgAlt: 'Samochód pogrzebowy przystosowany do przewozów międzynarodowych',
  },
  {
    slug: 'chlodnie', title: 'Chłodnie', group: 'opieka',
    short: 'Własne chłodnie w Gliwicach i Zabrzu, w których osoba zmarła godnie oczekuje na ostatnie pożegnanie.',
    img: 'siedziba-lotnicze', imgAlt: 'Widok z lotu ptaka na siedzibę Domu Pogrzebowego Jasek',
  },
  {
    slug: 'prosektorium', title: 'Prosektorium', group: 'opieka',
    short: 'Własne prosektorium z salą sekcyjną, stanowiskiem do balsamacji i ubieralnią.',
    img: 'chlodnie', imgAlt: 'Wjazd do prosektorium Domu Pogrzebowego Jasek w Gliwicach',
  },
  {
    slug: 'kamieniarstwo', title: 'Kamieniarstwo', group: 'oprawa',
    short: 'Nagrobki, płyty i sarkofagi we współpracy z renomowanymi zakładami kamieniarskimi.',
  },
  {
    slug: 'kwiaty', title: 'Kwiaty', group: 'oprawa',
    short: 'Wieńce, wiązanki i palmy z kwiatów żywych i jedwabnych – z własnej kwiaciarni w Zabrzu.',
    img: 'kwiaty', imgAlt: 'Wiązanka pogrzebowa z białych i fioletowych kwiatów',
  },
  {
    slug: 'odziez-zalobna', title: 'Odzież żałobna', group: 'oprawa',
    short: 'Odzież dla osoby zmarłej i dla rodziny – dostępna na miejscu i na zamówienie.',
    img: 'odziez', imgAlt: 'Wybór odzieży żałobnej w salonie Domu Pogrzebowego Jasek',
  },
  {
    slug: 'oprawa-muzyczna', title: 'Oprawa muzyczna', group: 'oprawa',
    short: 'Trąbka, orkiestra lub śpiew śpiewaczki operowej – muzyka dobrana do powagi ceremonii.',
    img: 'muzyka', imgAlt: 'Dłonie organisty na klawiaturze organów',
  },
  {
    slug: 'asortyment', title: 'Asortyment', group: 'oprawa',
    short: 'Trumny z wielu gatunków drewna, urny, relikwiarze, krzyże i wieńce.',
    img: 'asortyment', imgAlt: 'Sala wystawowa z trumnami w Domu Pogrzebowym Jasek',
  },
];

export const GROUPS = {
  ceremonia: { title: 'Organizacja i ceremonia', lead: 'Wszystko, co wiąże się z przygotowaniem pogrzebu i pożegnania.' },
  opieka: { title: 'Przewóz i opieka nad osobą zmarłą', lead: 'Całodobowy odbiór, własne chłodnie i prosektorium, przewozy krajowe i międzynarodowe.' },
  oprawa: { title: 'Oprawa i asortyment', lead: 'Kwiaty, odzież, muzyka, trumny i urny oraz usługi kamieniarskie.' },
};

export const svc = (slug) => SERVICES.find((s) => s.slug === slug);
