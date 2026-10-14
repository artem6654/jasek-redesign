import { SITE, BRANCHES, SERVICES, GROUPS, svc } from '../data.mjs';
import { page, icon, img, breadcrumbs, helpBox, branchCard, serviceCard, closingCta, related, orgLd, tel } from '../layout.mjs';

const T = (t) => `${t} | Dom Pogrzebowy Jasek – Gliwice, Zabrze`;

/* ---------- Templates ---------- */

// Article with sticky aside (help box + optional table of contents).
function articlePage({ path, title, metaTitle, description, eyebrow, lead, heroImg, heroAlt, trail, content, toc = null, gallery = [], relatedSlugs = [], ld = [] }) {
  const hero = `
<header class="page-hero${heroImg ? ' page-hero--media' : ''}">
  <div class="container${heroImg ? ' page-hero__grid' : ''}">
    <div>
      ${breadcrumbs(trail)}
      ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
      <h1>${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
    </div>
    ${heroImg ? `<figure class="page-hero__media">${img(heroImg, heroAlt, { eager: true, sizes: '(min-width: 60em) 42vw, 100vw' })}</figure>` : ''}
  </div>
</header>`;

  const tocHtml = toc
    ? `<nav class="toc" aria-labelledby="toc-title"><h2 id="toc-title">Na tej stronie</h2><ol>${toc.map(([id, label]) => `<li><a href="#${id}">${label}</a></li>`).join('')}</ol></nav>`
    : '';

  gallery = gallery.filter(([n]) => n !== heroImg);
  const galleryHtml = gallery.length
    ? `<h2 id="galeria">Galeria</h2><div class="gallery">${gallery.map(([n, alt]) => `<figure>${img(n, alt, { sizes: '(min-width: 64em) 22rem, (min-width: 40em) 45vw, 100vw' })}</figure>`).join('')}</div>`
    : '';

  const body = `
${hero}
<div class="container layout">
  <div class="prose">
    ${content}
    ${galleryHtml}
  </div>
  <div class="layout__aside">
    <div class="layout__aside-inner">
      ${tocHtml}
      ${helpBox()}
    </div>
  </div>
</div>
${relatedSlugs.length ? related(relatedSlugs) : ''}
${closingCta()}`;

  return { path, html: page({ path, title: T(metaTitle || title), description, body, trail, ld, ogImage: 'hero-lilies-1024.jpg' }) };
}

const servicesTrail = (title, slug) => [{ label: 'Usługi', href: '/uslugi/' }, { label: title, href: `/${slug}/` }];
const guideTrail = (title, slug) => [{ label: 'Poradnik', href: '/informacje-pogrzebowe/' }, { label: title, href: `/${slug}/` }];

function servicePage(slug, opts) {
  const s = svc(slug);
  return articlePage({
    path: `/${slug}/`,
    title: opts.title || s.title,
    metaTitle: opts.metaTitle,
    eyebrow: opts.eyebrow || 'Usługi',
    lead: opts.lead || s.short,
    heroImg: opts.heroImg === undefined ? s.img : opts.heroImg,
    heroAlt: opts.heroAlt || s.imgAlt,
    trail: opts.trail || servicesTrail(s.title, slug),
    description: opts.description || s.short,
    content: opts.content,
    gallery: opts.gallery || [],
    toc: opts.toc || null,
    relatedSlugs: opts.related || [],
  });
}

/* ---------- Pages ---------- */

const pages = [];

// Organizacja pogrzebu — main guide
pages.push(articlePage({
  path: '/organizacja-pogrzebu/',
  title: 'Co zrobić, gdy ktoś umrze?',
  metaTitle: 'Organizacja pogrzebu – co zrobić, gdy ktoś umrze',
  eyebrow: 'Poradnik · Organizacja pogrzebu',
  lead: 'Dla większości z nas wiadomość o śmierci bliskiej osoby jest traumatycznym przeżyciem. Trudno wtedy racjonalnie myśleć i podejmować decyzje. Poniżej zebraliśmy informacje, które pomogą w pierwszym etapie organizacji pogrzebu.',
  description: 'Co zrobić po śmierci bliskiej osoby – zgon w domu, w szpitalu, w miejscu publicznym lub wskutek wypadku. Dokumenty i formalności. Telefon całodobowy: Gliwice 32 231 13 47, Zabrze 32 271 79 63.',
  trail: guideTrail('Organizacja pogrzebu', 'organizacja-pogrzebu'),
  toc: [['w-domu', 'Zgon w domu'], ['w-szpitalu', 'Zgon w szpitalu'], ['w-miejscu-publicznym', 'Zgon w miejscu publicznym'], ['wypadek', 'Zgon wskutek wypadku'], ['dokumenty', 'Potrzebne dokumenty'], ['w-czym-pomagamy', 'W czym pomagamy']],
  content: `
    <div class="note"><p><strong>Najważniejsze:</strong> w każdej sytuacji mogą Państwo zadzwonić do nas o dowolnej porze dnia i nocy – ${BRANCHES.map((b) => `${b.city}: <a href="${tel(b.phone24)}">${b.phone24}</a>`).join(', ')}. Wyjaśnimy, co należy zrobić, i przyjedziemy po osobę zmarłą.</p></div>

    <section class="situation" aria-labelledby="w-domu">
      <h2 id="w-domu">Jeżeli zgon nastąpił w domu</h2>
      <ol>
        <li>W pierwszej kolejności należy wezwać lekarza opiekującego się zmarłym lub lekarza pogotowia. Lekarz wystawia protokół zgonu lub <strong>kartę zgonu</strong>. Karta zgonu jest podstawowym dokumentem stwierdzającym przyczynę zgonu i jest niezbędna do uzyskania skróconego aktu zgonu w Urzędzie Stanu Cywilnego.</li>
        <li>Po wystawieniu dokumentu należy zadbać o przewiezienie osoby zmarłej z domu do chłodni przez zakład pogrzebowy. Wystarczy zadzwonić pod nasz całodobowy numer <a href="${tel(BRANCHES[0].phone24)}">${BRANCHES[0].phone24}</a> – po przyjęciu zlecenia nasi pracownicy przyjadą po osobę zmarłą.</li>
        <li>Osoba zmarła zostanie przewieziona do naszej własnej chłodni, gdzie pozostanie do czasu pogrzebu.</li>
      </ol>
    </section>

    <section class="situation" aria-labelledby="w-szpitalu">
      <h2 id="w-szpitalu">Jeżeli zgon nastąpił w szpitalu</h2>
      <p>Lekarz opiekujący się zmarłym pacjentem wystawia kartę zgonu, z którą należy udać się do naszego biura w Gliwicach lub Zabrzu. Wszelkie dalsze formalności oraz zadania związane z organizacją pochówku przejmujemy na siebie.</p>
    </section>

    <section class="situation" aria-labelledby="w-miejscu-publicznym">
      <h2 id="w-miejscu-publicznym">Jeżeli zgon nastąpił w miejscu publicznym</h2>
      <ol>
        <li>W pierwszej kolejności należy wezwać lekarza pogotowia ratunkowego, który wystawi protokół zgonu lub kartę zgonu.</li>
        <li>Następnie prosimy zadzwonić pod nasz całodobowy numer – po przyjęciu zlecenia nasi pracownicy przyjadą po osobę zmarłą.</li>
        <li>Osoba zmarła zostanie przewieziona do naszej własnej chłodni.</li>
      </ol>
    </section>

    <section class="situation" aria-labelledby="wypadek">
      <h2 id="wypadek">Jeżeli zgon nastąpił wskutek wypadku</h2>
      <p>Jeżeli zgon nastąpił wskutek wypadku lub zachodzi uzasadnione podejrzenie, że jego przyczyną mogło być przestępstwo, do pochowania zwłok – oprócz karty zgonu – wymagane jest <strong>zezwolenie prokuratora</strong>.</p>
      <p>Zwłoki osób zmarłych w miejscach publicznych przewozi się na wniosek właściwego organu (najczęściej prokuratora) do zakładu medycyny sądowej w celu ustalenia przyczyny zgonu. Od wielu lat współpracujemy na terenie Gliwic i Zabrza z Prokuraturą Rejonową.</p>
    </section>

    <h2 id="dokumenty">Potrzebne dokumenty</h2>
    <h3>Do rejestracji aktu zgonu</h3>
    <ul>
      <li>karta zgonu wystawiona przez lekarza,</li>
      <li>dowód osobisty osoby zmarłej,</li>
      <li>paszport osoby zmarłej, o ile go posiadała.</li>
    </ul>
    <h3>Do wypłaty zasiłku pogrzebowego (ZUS, KRUS)</h3>
    <ul>
      <li>akt zgonu,</li>
      <li>legitymacja ubezpieczonego (wydana przez ZUS lub KRUS) albo zaświadczenie z zakładu pracy,</li>
      <li>dowód osobisty osoby zmarłej oraz członka rodziny, na którego będą wystawiane faktury.</li>
    </ul>
    <p><a class="link-arrow" href="/zasilek-pogrzebowy/">Więcej o zasiłku pogrzebowym ${icon('arrow')}</a></p>

    <h2 id="w-czym-pomagamy">W czym pomagamy</h2>
    <p>Świadczymy pełen zakres usług pogrzebowych, kremacyjnych i cmentarnych:</p>
    <ul>
      <li>całodobowy odbiór osoby zmarłej z miejsca zgonu,</li>
      <li>załatwianie wszelkich formalności pogrzebowych zgodnie z życzeniem rodziny,</li>
      <li>organizacja pogrzebu dostosowana do możliwości finansowych,</li>
      <li>pośrednictwo w załatwianiu formalności z Kościołem oraz możliwość udziału świeckiego mistrza ceremonii,</li>
      <li>trumny, urny, krzyże, relikwiarze, palmy i wieńce,</li>
      <li>tabliczki, nekrologi i klepsydry,</li>
      <li>kosmetyka pośmiertna,</li>
      <li>organizacja różańca i pożegnania we własnej kaplicy,</li>
      <li>kremacja, ekshumacja, pełen zakres usług cmentarnych i kamieniarskich,</li>
      <li>przewóz zwłok w kraju i za granicą, przewóz uczestników autokarem lub mikrobusem,</li>
      <li>usługi muzyczne i fotograficzne, organizacja styp, odzież żałobna.</li>
    </ul>`,
  relatedSlugs: ['transport-zmarlych', 'sala-pozegnan', 'kremacja', 'chlodnie'],
}));

// Zasiłek pogrzebowy
pages.push(articlePage({
  path: '/zasilek-pogrzebowy/',
  title: 'Zasiłek pogrzebowy',
  eyebrow: 'Poradnik',
  lead: 'Środki na zorganizowanie pogrzebu zapewnia państwo w formie zasiłku pogrzebowego. Rozliczenie zasiłku może nastąpić bezpośrednio w naszym biurze.',
  description: 'Zasiłek pogrzebowy z ZUS i KRUS – komu przysługuje i jakie dokumenty są potrzebne. Rozliczenie zasiłku bezpośrednio w Domu Pogrzebowym Jasek w Gliwicach i Zabrzu.',
  trail: guideTrail('Zasiłek pogrzebowy', 'zasilek-pogrzebowy'),
  toc: [['komu', 'Komu przysługuje zasiłek'], ['akt-zgonu', 'Dokumenty do aktu zgonu'], ['dokumenty-zus', 'Dokumenty do zasiłku']],
  content: `
    <h2 id="komu">Komu przysługuje zasiłek?</h2>
    <p>Jeżeli koszty pogrzebu poniósł członek rodziny osoby zmarłej, przysługuje mu zasiłek w pełnej wysokości. Jeżeli koszty pogrzebu pokryła inna osoba, przysługuje jej zwrot faktycznie poniesionych kosztów.</p>
    <p>Rozliczenie zasiłku może nastąpić bezpośrednio u nas – nie trzeba wykładać całej kwoty z własnych środków. Szczegóły chętnie wyjaśnimy telefonicznie lub w biurze.</p>
    <div class="note"><p>Aktualną wysokość zasiłku oraz szczegółowe warunki jego wypłaty określają ZUS i KRUS.</p></div>

    <h2 id="akt-zgonu">Dokumenty potrzebne do rejestracji aktu zgonu</h2>
    <ul>
      <li>karta zgonu wystawiona przez lekarza,</li>
      <li>dowód osobisty osoby zmarłej,</li>
      <li>paszport osoby zmarłej, o ile go posiadała.</li>
    </ul>

    <h2 id="dokumenty-zus">Dokumenty potrzebne do pobrania zasiłku pogrzebowego (ZUS i KRUS)</h2>
    <ul>
      <li>akt zgonu,</li>
      <li>legitymacja ubezpieczonego (wydana przez ZUS lub KRUS) lub zaświadczenie z zakładu pracy,</li>
      <li>dowód osobisty osoby zmarłej oraz członka rodziny, na którego będą wystawiane faktury.</li>
    </ul>

    <h2>Pomoc w innych świadczeniach</h2>
    <p>Proponujemy również specjalistyczną pomoc prawną w zakresie świadczeń ZUS, KRUS, WBE i MSWIA należnych po osobach zmarłych, odszkodowań dla osób uczestniczących w wypadkach oraz związanych z nimi postępowań spadkowych i podatkowych.</p>`,
  relatedSlugs: ['organizacja-pogrzebu'],
}));

// Kremacja
pages.push(servicePage('kremacja', {
  lead: 'Od wielu lat zajmujemy się organizacją kremacji. Od 2007 roku współpracujemy z pierwszym i największym krematorium w regionie. Na Państwa życzenie przejmiemy wszelkie formalności związane z kremacją oraz pochówkiem.',
  description: 'Kremacja zmarłych – Gliwice, Zabrze. Organizacja kremacji i pochówku urny, formalności, szeroki wybór urn. Dom Pogrzebowy Jasek, telefon całodobowy.',
  content: `
    <h2>Kremacja – tradycja i współczesność</h2>
    <p>Pierwsze współczesne europejskie krematorium uruchomiono w 1873 roku w Mediolanie. W 1963 roku Kościół katolicki dopuścił kremację i wydał oświadczenie o zgodności tej formy pochówku z wiarą rzymskokatolicką. Od tego czasu kremacja przeżywa swój prawdziwy renesans.</p>
    <h2>Dlaczego rodziny wybierają kremację?</h2>
    <ul>
      <li><strong>Oszczędność miejsca</strong> – urna zajmuje znacznie mniejszą powierzchnię niż trumna. Na wielu cmentarzach zaczyna brakować miejsc, a coraz więcej osób decyduje się na groby rodzinne.</li>
      <li><strong>Czynnik ekonomiczny</strong> – kremacja oraz pochówek w grobie rodzinnym są zazwyczaj tańsze.</li>
    </ul>
    <h2>Urny i relikwiarze</h2>
    <p>W naszej ofercie znajduje się duży wybór urn z drewna, ceramiki, kamienia, mosiądzu, kompozytu, aluminium oraz blachy. Dysponujemy również relikwiarzami.</p>`,
  gallery: [['urny', 'Ekspozycja urn w Domu Pogrzebowym Jasek']],
  related: ['organizacja-pogrzebu', 'sala-pozegnan', 'asortyment', 'kamieniarstwo'],
}));

// Sala pożegnań
pages.push(servicePage('sala-pozegnan', {
  lead: 'Dom Pogrzebowy Jasek dysponuje salami pożegnań w Gliwicach i Zabrzu. Własne kaplice pozwalają rodzinie godnie i w spokoju pożegnać bliską osobę – w skupieniu i modlitwie, przed rozpoczęciem ceremonii pogrzebowej.',
  heroImg: 'sala-gliwice',
  description: 'Sale pożegnań w Gliwicach i Zabrzu – własne kaplice pogrzebowe Domu Pogrzebowego Jasek. Różaniec i pożegnanie przed ceremonią, własne chłodnie.',
  toc: [['gliwice', 'Sala pożegnań w Gliwicach'], ['zabrze', 'Sala pożegnań w Zabrzu']],
  content: `
    <p>Każda z kaplic ma odmienny wystrój i wyposażenie. Organizujemy w nich różaniec i pożegnanie. W obu oddziałach dysponujemy również własnymi chłodniami.</p>
    <h2 id="gliwice">Sala pożegnań w Gliwicach</h2>
    <p>${BRANCHES[0].street}, ${BRANCHES[0].postcode} ${BRANCHES[0].city}. W budynku Domu Pogrzebowego znajdują się dwie sale pożegnań.</p>
    <div class="gallery">
      <figure>${img('sala-gliwice', 'Jasna sala pożegnań z rzędami krzeseł', { sizes: '(min-width: 40em) 20rem, 100vw' })}</figure>
      <figure>${img('sala-gliwice-2', 'Sala pożegnań w Gliwicach – widok w stronę katafalku', { sizes: '(min-width: 40em) 20rem, 100vw' })}</figure>
      <figure>${img('sala-gliwice-3', 'Trumna z kompozycją kwiatową w sali pożegnań', { sizes: '(min-width: 40em) 20rem, 100vw' })}</figure>
    </div>
    <h2 id="zabrze">Sala pożegnań w Zabrzu</h2>
    <p>${BRANCHES[1].street}, ${BRANCHES[1].postcode} ${BRANCHES[1].city}.</p>
    <div class="gallery">
      <figure>${img('sala-zabrze', 'Sala pożegnań w Zabrzu z roślinami i kwiatami', { sizes: '(min-width: 40em) 20rem, 100vw' })}</figure>
      <figure>${img('zabrze-wejscie', 'Wejście do Domu Pogrzebowego Jasek w Zabrzu', { sizes: '(min-width: 40em) 20rem, 100vw' })}</figure>
    </div>`,
  related: ['organizacja-pogrzebu', 'oprawa-muzyczna', 'kwiaty', 'chlodnie'],
}));

// Transport zmarłych
pages.push(servicePage('transport-zmarlych', {
  lead: 'Zapewniamy transport osób zmarłych z szacunkiem i godnością – całodobowo, z miejsca zgonu, na terenie kraju i za granicą.',
  metaTitle: 'Transport zmarłych – Gliwice, Zabrze',
  description: 'Transport zmarłych i przewóz zwłok – Gliwice, Zabrze, Knurów. Całodobowo, 11 samochodów pogrzebowych, przewozy krajowe i międzynarodowe.',
  content: `
    <p>Dysponujemy karawanami pogrzebowymi przystosowanymi do przewożenia osób zmarłych z zachowaniem najwyższych standardów – również na długich trasach międzynarodowych. Usługa obejmuje transport zmarłych na terenie kraju oraz transport międzynarodowy.</p>
    <h2>Samochody pogrzebowe</h2>
    <p>Wizytówką firmy zawsze były luksusowe karawany. Obecnie Firma Pogrzebowa Jasek posiada <strong>${SITE.vehicles} samochodów – limuzyn pogrzebowych</strong> przystosowanych do przewozu zwłok w kraju i za granicą, m.in. marek Jaguar, Cadillac, Chrysler i Mercedes. Do obsługi pogrzebów posiadamy także autobusy i mikrobusy do przewozu uczestników uroczystości.</p>
    <h2>Transport międzynarodowy</h2>
    <p>Międzynarodowy transport zmarłych polega na przewiezieniu ciała z zagranicy do Polski (lub z Polski za granicę) oraz dopełnieniu formalności związanych z przewozem i dokumentacją.</p>
    <p><a class="link-arrow" href="/miedzynarodowy-transport-zwlok/">Szczegóły transportu międzynarodowego ${icon('arrow')}</a></p>`,
  gallery: [['karawan', 'Samochód pogrzebowy marki Jaguar przed siedzibą firmy'], ['karawan-2', 'Samochód pogrzebowy marki Mercedes'], ['flota', 'Samochody pogrzebowe w garażu Domu Pogrzebowego Jasek']],
  related: ['miedzynarodowy-transport-zwlok', 'chlodnie', 'organizacja-pogrzebu'],
}));

// Międzynarodowy transport
pages.push(servicePage('miedzynarodowy-transport-zwlok', {
  lead: 'Gdy śmierć bliskiej osoby następuje poza granicami kraju, organizujemy sprowadzenie zmarłego do Polski lub przewóz za granicę – wraz ze wszystkimi formalnościami.',
  eyebrow: 'Usługi · Transport',
  description: 'Międzynarodowy transport zwłok – sprowadzenie zmarłego z zagranicy do Polski i przewóz za granicę. Dokumenty, konsulaty, transport lądowy i lotniczy. Dom Pogrzebowy Jasek, Gliwice, Zabrze.',
  toc: [['zakres', 'Zakres usługi'], ['standardy', 'Przepisy i standardy'], ['opiekun', 'Indywidualny opiekun']],
  content: `
    <p>Międzynarodowy transport zmarłych to złożony proces logistyczny i formalny. Wymaga specjalistycznych środków transportu, znajomości przepisów prawa międzynarodowego i krajowego, procedur konsularnych – oraz empatycznego podejścia do rodziny. Współpracujemy ze znanymi w Unii Europejskiej firmami funeralnymi i wykonujemy przewozy z całej Europy, także lotnicze.</p>
    <h2 id="zakres">Zakres usługi</h2>
    <ul>
      <li>organizacja transportu zwłok z zagranicy do Polski lub z Polski za granicę,</li>
      <li>pozyskanie wymaganych dokumentów (akty zgonu, zaświadczenia lekarskie, zezwolenia konsularne, dokumenty celne),</li>
      <li>kontakt i współpraca z ambasadami i konsulatami,</li>
      <li>przygotowanie ciała do transportu (balsamacja, kosmetyka pośmiertna, odpowiednie zabezpieczenie),</li>
      <li>trumny hermetyczne lub inne wymagane przez kraj docelowy,</li>
      <li>przechowywanie ciała w chłodni do momentu transportu,</li>
      <li>transport lądowy karawanem pogrzebowym oraz transport lotniczy w przypadku dalszych kierunków,</li>
      <li>pomoc w organizacji pogrzebu po przewiezieniu ciała do Polski.</li>
    </ul>
    <h2 id="standardy">Przepisy i standardy</h2>
    <p>Każdy transport realizujemy zgodnie z międzynarodowymi standardami i przepisami prawa, m.in. konwencją wiedeńską, przepisami sanitarnymi WHO, wymogami międzynarodowych lotnisk oraz wymogami celnymi.</p>
    <h2 id="opiekun">Indywidualny opiekun</h2>
    <p>Sprowadzenie osoby zmarłej z zagranicy to nie tylko logistyka, ale przede wszystkim osobisty dramat rodziny. Dlatego każdej rodzinie przypisujemy indywidualnego opiekuna, który czuwa nad przebiegiem formalności i pozostaje w stałym kontakcie z bliskimi. Działamy 24 godziny na dobę, 7 dni w tygodniu.</p>`,
  related: ['transport-zmarlych', 'chlodnie', 'prosektorium', 'organizacja-pogrzebu'],
}));

// Chłodnie
pages.push(servicePage('chlodnie', {
  lead: 'Dom Pogrzebowy Jasek posiada własne chłodnie w Gliwicach oraz Zabrzu. Dają one pewność, że ciało bliskiej osoby będzie godnie oczekiwać na ostatnie pożegnanie.',
  description: 'Własne chłodnie Domu Pogrzebowego Jasek w Gliwicach (41 miejsc) i Zabrzu (21 miejsc). Całodobowy odbiór osoby zmarłej.',
  content: `
    <dl class="facts">
      <div><dt>41</dt><dd>miejsc w chłodni w Gliwicach</dd></div>
      <div><dt>21</dt><dd>miejsc w chłodni w Zabrzu</dd></div>
    </dl>
    <p>Po przyjęciu zlecenia nasi pracownicy przyjeżdżają po osobę zmarłą o każdej porze i przewożą ją do własnej chłodni, gdzie pozostaje do czasu pogrzebu.</p>`,
  related: ['prosektorium', 'transport-zmarlych', 'sala-pozegnan'],
}));

// Prosektorium
pages.push(servicePage('prosektorium', {
  lead: 'Od wielu lat posiadamy własne, profesjonalne prosektorium wyposażone w nowoczesne chłodnie, salę sekcyjną, stanowisko do balsamacji zwłok oraz ubieralnię.',
  description: 'Własne prosektorium Domu Pogrzebowego Jasek w Gliwicach – sala sekcyjna, balsamacja, kosmetyka pośmiertna, ubieralnia i nowoczesne chłodnie.',
  content: `
    <p>Na miejscu przygotowujemy osobę zmarłą do pochówku – zapewniamy kosmetykę pośmiertną i ubranie. Nowoczesne chłodnie mieszczą 41 miejsc w Gliwicach i 21 w Zabrzu.</p>
    <p>Od wielu lat współpracujemy na terenie Gliwic i Zabrza z Miejskim Ośrodkiem Pomocy Społecznej oraz Prokuraturą Rejonową.</p>`,
  related: ['chlodnie', 'odziez-zalobna', 'transport-zmarlych'],
}));

// Kamieniarstwo
pages.push(servicePage('kamieniarstwo', {
  heroImg: null,
  lead: 'Prowadzimy działalność kompleksową. Współpracujemy z renomowanymi zakładami kamieniarskimi, które oferują szeroki wybór nagrobków, płyt i sarkofagów.',
  description: 'Usługi kamieniarskie – nagrobki z granitu i lastryko, demontaż i montaż nagrobków do pogrzebu, renowacja. Dom Pogrzebowy Jasek, Gliwice, Zabrze.',
  content: `
    <h2>Wykonujemy</h2>
    <ul>
      <li>stawianie nowych nagrobków (granit, lastryko),</li>
      <li>demontaż i montaż nagrobków do pogrzebu,</li>
      <li>renowację i czyszczenie,</li>
      <li>podnoszenie nagrobków,</li>
      <li>budowę piwniczek,</li>
      <li>obudowy drewniane.</li>
    </ul>`,
  related: ['kremacja', 'asortyment', 'organizacja-pogrzebu'],
}));

// Kwiaty
pages.push(servicePage('kwiaty', {
  lead: 'Kompozycje kwiatowe są symbolem pożegnania i jedną z najważniejszych ozdób ceremonii pogrzebowej. Zawsze staramy się jak najlepiej dostosować do Państwa oczekiwań.',
  description: 'Wieńce, wiązanki i palmy pogrzebowe z kwiatów żywych i jedwabnych. Kwiaciarnia Jasek w Zabrzu, ul. Wolności 209.',
  content: `
    <p>Oferujemy wieńce, wiązanki i palmy – zarówno z kwiatów żywych, jak i jedwabnych.</p>
    <h2>Kwiaciarnia Jasek w Zabrzu</h2>
    <p>Zapraszamy do Kwiaciarni Jasek w centrum Zabrza, przy ul. Wolności 209. W ofercie są wieńce, palmy, stroiki oraz bukiety okolicznościowe. Rozwijamy nasze umiejętności, biorąc udział w warsztatach i kursach prowadzonych przez światowych florystów.</p>
    <p><a class="link-arrow" href="${SITE.flowerShop}" target="_blank" rel="noopener">Oferta kwiaciarni: kwiaciarniajasek.pl ${icon('external')}<span class="visually-hidden"> (otwiera się w nowym oknie)</span></a></p>`,
  related: ['sala-pozegnan', 'oprawa-muzyczna', 'odziez-zalobna'],
}));

// Odzież żałobna
pages.push(servicePage('odziez-zalobna', {
  lead: 'Ceremonia pogrzebowa wymaga godnego wyglądu. Oferujemy szeroki wybór odzieży dla osoby zmarłej, a także dla rodziny pogrążonej w żałobie.',
  description: 'Odzież żałobna damska i męska oraz odzież dla osoby zmarłej – na miejscu i na zamówienie. Dom Pogrzebowy Jasek, Gliwice, Zabrze.',
  content: `
    <p>Pożegnanie bliskiej osoby to trudny moment, w którym ciężko o szukanie odpowiednich ubrań i spędzanie wielu godzin w sklepach. Dysponujemy dużym wyborem odzieży damskiej i męskiej w różnych rozmiarach – dostępnej na miejscu i na zamówienie.</p>
    <p>Aby poznać szczegóły, zapraszamy do kontaktu telefonicznego lub osobistego w jednym z naszych oddziałów.</p>`,
  related: ['asortyment', 'kwiaty', 'organizacja-pogrzebu'],
}));

// Oprawa muzyczna
pages.push(servicePage('oprawa-muzyczna', {
  lead: 'Aby nadać ceremonii pogrzebowej uroczysty wydźwięk, proponujemy wyjątkową oprawę muzyczną.',
  description: 'Oprawa muzyczna pogrzebu – trąbka, orkiestra, śpiew śpiewaczki operowej. Dom Pogrzebowy Jasek, Gliwice, Zabrze.',
  content: `
    <p>Proponujemy trąbkę, orkiestrę lub śpiew śpiewaczki operowej. Dokładamy starań, aby odpowiednio dobrana muzyka oddawała powagę tej smutnej, a zarazem podniosłej ceremonii.</p>
    <p>Oferujemy także usługi fotograficzne.</p>`,
  related: ['sala-pozegnan', 'kwiaty', 'organizacja-pogrzebu'],
}));

// Asortyment
pages.push(servicePage('asortyment', {
  eyebrow: 'Asortyment',
  trail: [{ label: 'Asortyment', href: '/asortyment/' }],
  lead: 'Oferujemy szeroki wybór trumien – tradycyjnych i nowoczesnych – wykonanych z najwyższej jakości drewna, a także urny, relikwiarze, krzyże i wieńce.',
  description: 'Trumny z drewna dębowego, sosnowego, olchy i modrzewia, urny z drewna, ceramiki, kamienia i mosiądzu, relikwiarze, krzyże. Dom Pogrzebowy Jasek, Gliwice, Zabrze.',
  content: `
    <h2>Trumny</h2>
    <p>Mamy w ofercie trumny w różnych odcieniach, matowe i z połyskiem, wykonane z drewna dębowego, sosnowego, olchy, modrzewia i wielu innych gatunków. Zapewniamy bogaty wybór obić oraz okuć do wszystkich trumien. Sprowadzamy trumny od największych producentów z Polski i z zagranicy.</p>
    <h2>Urny i relikwiarze</h2>
    <p>Posiadamy duży wybór urn z drewna, ceramiki, kamienia, mosiądzu, kompozytu, aluminium oraz blachy. Dysponujemy również relikwiarzami.</p>
    <h2>Pozostały asortyment</h2>
    <p>Krzyże, palmy i wieńce, tabliczki, nekrologi i klepsydry, a także odzież żałobna.</p>`,
  gallery: [['asortyment', 'Sala wystawowa z trumnami'], ['urny', 'Ekspozycja urn'], ['zabrze-biuro', 'Salon obsługi klienta z ekspozycją urn w Zabrzu']],
  related: ['kremacja', 'odziez-zalobna', 'kwiaty'],
}));

// Organizacja pogrzebu is the guide; services index:
{
  const body = `
<header class="page-hero">
  <div class="container">
    ${breadcrumbs([{ label: 'Usługi', href: '/uslugi/' }])}
    <p class="eyebrow">Usługi</p>
    <h1>Usługi pogrzebowe, kremacyjne i cmentarne</h1>
    <p class="lead">Od całodobowego odbioru osoby zmarłej, przez formalności i przygotowanie ceremonii, po usługi kamieniarskie. Wszystko w jednym miejscu – w Gliwicach i Zabrzu.</p>
  </div>
</header>
<div class="container" style="padding-block:clamp(3rem,2rem + 4vw,6rem)">
  ${Object.entries(GROUPS).map(([key, g]) => `
  <section class="service-group" aria-labelledby="g-${key}">
    <div class="section-head section-head--split">
      <h2 id="g-${key}">${g.title}</h2>
      <p>${g.lead}</p>
    </div>
    <div class="service-index">
      ${SERVICES.filter((s) => s.group === key).map((s) => serviceCard(s, { sizes: '(min-width: 64em) 33vw, (min-width: 40em) 50vw, 100vw' })).join('')}
    </div>
  </section>`).join('')}
</div>
${closingCta()}`;
  pages.push({ path: '/uslugi/', html: page({ path: '/uslugi/', title: T('Usługi pogrzebowe'), description: 'Organizacja pogrzebu, transport zmarłych, kremacja, sala pożegnań, chłodnie, prosektorium, kamieniarstwo, kwiaty, odzież żałobna i oprawa muzyczna – Gliwice, Zabrze.', body, trail: [{ label: 'Usługi', href: '/uslugi/' }] }) });
}

// Informacje pogrzebowe (guide hub)
{
  const items = [
    ['organizacja-pogrzebu', 'Organizacja pogrzebu', 'Co zrobić, gdy odchodzi ktoś z bliskich? Jak uporać się z formalnościami i jak postąpić, gdy zgon nastąpił wskutek wypadku lub w miejscu publicznym?'],
    ['zasilek-pogrzebowy', 'Zasiłek pogrzebowy', 'Skąd wziąć środki na zorganizowanie pogrzebu bliskiej osoby? Komu przysługuje zasiłek i jakie dokumenty są potrzebne?'],
    ['kremacja', 'Kremacja zmarłych', 'Historia kremacji, stanowisko Kościoła katolickiego i praktyczne zalety tej formy pochówku.'],
    ['miedzynarodowy-transport-zwlok', 'Sprowadzenie zmarłego z zagranicy', 'Jak przebiega międzynarodowy transport zwłok i jakie dokumenty są wymagane.'],
  ];
  const body = `
<header class="page-hero">
  <div class="container">
    ${breadcrumbs([{ label: 'Poradnik', href: '/informacje-pogrzebowe/' }])}
    <p class="eyebrow">Informacje pogrzebowe</p>
    <h1>Poradnik dla rodzin</h1>
    <p class="lead">Wiadomość o śmierci bliskiej osoby to szok. Zebraliśmy najważniejsze informacje, które pomogą w pierwszych dniach – krok po kroku.</p>
  </div>
</header>
<section class="section" aria-label="Artykuły">
  <div class="container">
    <div class="articles" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,20rem),1fr))">
      ${items.map(([slug, t, d]) => `
      <article class="article-card">
        <h2 style="font-size:var(--fs-h3)"><a href="/${slug}/" style="text-decoration:none">${t}</a></h2>
        <p>${d}</p>
        <span class="card__more" aria-hidden="true">Czytaj ${icon('arrow')}</span>
      </article>`).join('')}
    </div>
  </div>
</section>
${closingCta()}`;
  pages.push({ path: '/informacje-pogrzebowe/', html: page({ path: '/informacje-pogrzebowe/', title: T('Informacje pogrzebowe – poradnik'), description: 'Poradnik: organizacja pogrzebu, zasiłek pogrzebowy, kremacja, transport zmarłego z zagranicy. Dom Pogrzebowy Jasek, Gliwice, Zabrze.', body, trail: [{ label: 'Poradnik', href: '/informacje-pogrzebowe/' }] }) });
}

// O firmie
pages.push(articlePage({
  path: '/o-firmie/',
  title: 'Profesjonalizm, godność, kultura i rozsądne ceny',
  metaTitle: 'O firmie',
  eyebrow: 'O firmie',
  lead: `Od początku istnienia Firma Pogrzebowa Jasek stawia na wysoką jakość usług. W tak trudnej chwili, jaką jest odejście bliskiej osoby, otaczamy rodzinę opieką i pomagamy we wszystkich formalnościach związanych z pogrzebem.`,
  heroImg: 'team',
  heroAlt: 'Pracownicy Domu Pogrzebowego Jasek przed budynkiem firmy w Gliwicach',
  description: 'Firma Pogrzebowa Jasek – od 1980 roku w Gliwicach. Dom Pogrzebowy przy ul. Zygmunta Starego 49 i oddział w Zabrzu. Historia, zespół i zakres usług.',
  trail: [{ label: 'O firmie', href: '/o-firmie/' }],
  toc: [['historia', 'Historia'], ['ludzie', 'Ludzie'], ['wspolpraca', 'Współpraca'], ['pomoc-prawna', 'Pomoc prawna']],
  content: `
    <h2 id="historia">Historia</h2>
    <p>Firma Pogrzebowa Jasek powstała w ${SITE.founded} roku przy ul. Zygmunta Starego 27 w Gliwicach. Przez ten czas zdobyła uznanie zarówno w kraju, jak i za granicą. Od 2010 roku działamy jako Dom Pogrzebowy przy ul. Zygmunta Starego 49.</p>
    <p>W nowo wybudowanym obiekcie poszerzyliśmy zakres usług. Posiadamy chłodnie na 41 osób, dwie własne sale pożegnań, nowoczesną salę sekcyjną oraz pomieszczenia do przygotowania zmarłych do pochówku.</p>
    <dl class="facts">
      <div><dt>${SITE.founded}</dt><dd>rok założenia firmy</dd></div>
      <div><dt>2010</dt><dd>otwarcie Domu Pogrzebowego przy ul. Zygmunta Starego 49</dd></div>
      <div><dt>${SITE.vehicles}</dt><dd>samochodów pogrzebowych</dd></div>
      <div><dt>2</dt><dd>oddziały: Gliwice i Zabrze</dd></div>
    </dl>
    <h2 id="ludzie">Ludzie</h2>
    <p>Podstawą właściwego funkcjonowania firmy są przede wszystkim ludzie. Firmą zarządzają Beata Jasek, jej syn Martin oraz Krzysztof Wąs.</p>
    <h2 id="wspolpraca">Współpraca</h2>
    <p>Od wielu lat współpracujemy na terenie Gliwic i Zabrza z Miejskim Ośrodkiem Pomocy Społecznej i Prokuraturą Rejonową. Wykonujemy międzynarodowe przewozy zwłok z całej Europy oraz przewozy lotnicze, współpracując ze znanymi w Unii Europejskiej firmami funeralnymi.</p>
    <h2 id="pomoc-prawna">Pomoc prawna</h2>
    <p>Proponujemy specjalistyczną pomoc prawną w zakresie:</p>
    <ul>
      <li>świadczeń ZUS, KRUS, WBE i MSWIA należnych po osobach zmarłych,</li>
      <li>odszkodowań dla osób uczestniczących w wypadkach,</li>
      <li>związanych z nimi postępowań spadkowych i podatkowych.</li>
    </ul>
    <p><a class="link-arrow" href="/uslugi/">Zobacz pełen zakres usług ${icon('arrow')}</a></p>`,
  gallery: [['siedziba-gliwice', 'Dom Pogrzebowy Jasek w Gliwicach'], ['siedziba-lotnicze', 'Siedziba firmy z lotu ptaka'], ['zabrze-biuro', 'Biuro w Zabrzu'], ['biuro-gliwice', 'Biuro obsługi rodzin w Gliwicach']],
}));

// Kontakt
{
  const b0 = BRANCHES[0];
  const body = `
<header class="page-hero">
  <div class="container">
    ${breadcrumbs([{ label: 'Kontakt', href: '/kontakt/' }])}
    <p class="eyebrow">Kontakt</p>
    <h1>Jesteśmy do Państwa dyspozycji całą dobę</h1>
    <p class="lead">W sprawach pilnych prosimy zawsze dzwonić – telefon odbieramy o każdej porze, również w nocy, w niedziele i święta.</p>
  </div>
</header>
<section class="section" aria-labelledby="oddzialy-title">
  <div class="container">
    <h2 id="oddzialy-title" class="visually-hidden">Oddziały</h2>
    <div class="branches">${BRANCHES.map((b, i) => branchCard(b, { headingLevel: 3, eager: i === 0 })).join('')}</div>
  </div>
</section>
<section class="section section--sand" aria-labelledby="form-title">
  <div class="container split" style="align-items:start">
    <div>
      <p class="eyebrow">Prośba o kontakt</p>
      <h2 id="form-title">Wolą Państwo, abyśmy oddzwonili?</h2>
      <p class="lead">Prosimy zostawić numer telefonu – oddzwonimy w godzinach pracy biura i odpowiemy na Państwa pytania.</p>
      <p>W sprawach pilnych, zwłaszcza gdy trzeba odebrać osobę zmarłą, prosimy o kontakt telefoniczny: ${BRANCHES.map((b) => `${b.city} <a href="${tel(b.phone24)}">${b.phone24}</a>`).join(', ')}.</p>
    </div>
    <div class="contact-card">
      <form class="form" id="callback-form" novalidate aria-describedby="form-note">
        <p id="form-note" class="hint" style="margin:0;color:var(--c-muted);font-size:var(--fs-sm)">Pola oznaczone <span aria-hidden="true">*</span><span class="visually-hidden">gwiazdką</span> są wymagane.</p>
        <div class="form__row form__row--2">
          <div class="field">
            <label for="f-name">Imię i nazwisko <span class="req" aria-hidden="true">*</span></label>
            <input id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="f-name-err">
            <p class="field__error" id="f-name-err" hidden>Prosimy podać imię i nazwisko.</p>
          </div>
          <div class="field">
            <label for="f-phone">Telefon <span class="req" aria-hidden="true">*</span></label>
            <input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required aria-describedby="f-phone-hint f-phone-err">
            <p class="hint" id="f-phone-hint">Np. 600 123 456</p>
            <p class="field__error" id="f-phone-err" hidden>Prosimy podać poprawny numer telefonu (min. 9 cyfr).</p>
          </div>
        </div>
        <fieldset class="field">
          <legend>Który oddział?</legend>
          <div class="choice-group">
            <div class="choice"><input type="radio" id="f-b-any" name="branch" value="dowolny" checked><label for="f-b-any">Bez znaczenia</label></div>
            <div class="choice"><input type="radio" id="f-b-gl" name="branch" value="gliwice"><label for="f-b-gl">Gliwice</label></div>
            <div class="choice"><input type="radio" id="f-b-zb" name="branch" value="zabrze"><label for="f-b-zb">Zabrze</label></div>
          </div>
        </fieldset>
        <div class="field">
          <label for="f-msg">W czym możemy pomóc? <span class="hint" style="font-weight:400">(opcjonalnie)</span></label>
          <textarea id="f-msg" name="message" rows="4"></textarea>
        </div>
        <div class="field">
          <div class="consent">
            <input type="checkbox" id="f-consent" name="consent" required aria-describedby="f-consent-err">
            <label for="f-consent" style="font-weight:400">Wyrażam zgodę na przetwarzanie moich danych w celu odpowiedzi na zapytanie. Administratorem danych jest ${SITE.legalName}, ${b0.street}, ${b0.postcode} ${b0.city}. Więcej w <a href="/privacy-policy/">polityce prywatności</a>. <span class="req" aria-hidden="true">*</span></label>
          </div>
          <p class="field__error" id="f-consent-err" hidden>Zgoda jest potrzebna, abyśmy mogli oddzwonić.</p>
        </div>
        <div>
          <button class="btn btn--primary" type="submit">Poproś o kontakt</button>
        </div>
        <div class="form-status" id="form-status" role="status" aria-live="polite" tabindex="-1" hidden></div>
      </form>
    </div>
  </div>
</section>
${closingCta({ title: 'W pilnej sprawie prosimy dzwonić', text: 'Telefon całodobowy odbieramy o każdej porze. Przyjedziemy po osobę zmarłą i wyjaśnimy kolejne kroki.' })}`;
  pages.push({ path: '/kontakt/', html: page({ path: '/kontakt/', title: T('Kontakt'), description: 'Dom Pogrzebowy Jasek – Gliwice, ul. Zygmunta Starego 49, tel. 32 231 13 47 (całodobowo). Zabrze, ul. Wolności 209, tel. 32 271 79 63 (całodobowo). Biuro pon.–pt. 8–16, sob. 8–13.', body, trail: [{ label: 'Kontakt', href: '/kontakt/' }], ld: [orgLd()] }) });
}

// Polityka prywatności (content from the live site; see README → legal review)
pages.push(articlePage({
  path: '/privacy-policy/',
  title: 'Polityka prywatności i cookies',
  eyebrow: 'Informacje prawne',
  description: 'Polityka prywatności i plików cookies serwisu www.jasek.pl.',
  trail: [{ label: 'Polityka prywatności i cookies', href: '/privacy-policy/' }],
  content: `
    <div class="note"><p><strong>Uwaga dla właściciela strony:</strong> treść przeniesiona z obecnej strony. Przed publikacją wymaga weryfikacji prawnej (m.in. uzupełnienia informacji o formularzu kontaktowym).</p></div>
    <h2>1. Informacje ogólne</h2>
    <p>Niniejsza Polityka Prywatności i Cookies określa zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies na stronie internetowej www.jasek.pl (dalej: „Strona”), zgodnie z wymogami Consent Mode v2 oraz obowiązującymi przepisami prawa, w tym Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO).</p>
    <h2>2. Administrator danych osobowych</h2>
    <p>Administratorem danych osobowych jest ${SITE.legalName.toUpperCase()} z siedzibą pod adresem: ul. Zygmunta Starego 49, 44-100 Gliwice, NIP: ${SITE.vatId} (dalej: „Administrator”).</p>
    <h2>3. Zakres zbieranych danych</h2>
    <ul><li>adres IP użytkownika,</li><li>dane przeglądarki i urządzenia,</li><li>informacje uzyskane za pośrednictwem plików cookies lub innych technologii śledzących.</li></ul>
    <h2>4. Cele przetwarzania danych</h2>
    <ul><li>zapewnienie prawidłowego funkcjonowania Strony,</li><li>analiza statystyk ruchu na Stronie,</li><li>personalizacja treści i reklam (po uzyskaniu odpowiedniej zgody).</li></ul>
    <h2>5. Pliki cookies i Consent Mode v2</h2>
    <p>Strona wykorzystuje pliki cookies w celu zapewnienia jej prawidłowego działania oraz w celach analitycznych i marketingowych. Przed zapisaniem plików cookies na urządzeniu użytkownika uzyskujemy jego zgodę za pośrednictwem banera cookie. Użytkownik może zarządzać swoimi preferencjami w ustawieniach przeglądarki lub bezpośrednio na Stronie. W przypadku braku zgody niektóre funkcje Strony mogą być ograniczone.</p>
    <h2>6. Udostępnianie danych</h2>
    <p>Dane osobowe mogą być udostępniane podmiotom trzecim wyłącznie w zakresie niezbędnym do realizacji celów przetwarzania, w tym dostawcom usług analitycznych i reklamowych, zgodnie z obowiązującymi przepisami prawa.</p>
    <h2>7. Prawa użytkownika</h2>
    <p>Użytkownik ma prawo do dostępu do swoich danych, ich sprostowania, usunięcia („prawo do bycia zapomnianym”), ograniczenia przetwarzania, przenoszenia danych oraz wniesienia sprzeciwu wobec przetwarzania.</p>
    <h2>8. Zmiany w Polityce</h2>
    <p>Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce. O zmianach użytkownicy będą informowani poprzez publikację nowej wersji Polityki na Stronie.</p>
    <h2>9. Kontakt</h2>
    <p>W przypadku pytań dotyczących niniejszej Polityki lub przetwarzania danych osobowych prosimy o kontakt: <a href="mailto:gliwice@jasek.pl">gliwice@jasek.pl</a>.</p>`,
}));

export default pages;
