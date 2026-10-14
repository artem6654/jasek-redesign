import { SITE, BRANCHES, SERVICES, svc } from '../data.mjs';
import { page, icon, img, urgentPanel, branchCard, serviceCard, closingCta, orgLd } from '../layout.mjs';

const featured = SERVICES.filter((s) => s.featured);
const others = SERVICES.filter((s) => !s.featured);

const body = `
<section class="hero" aria-labelledby="hero-title">
  <div class="container hero__grid">
    <div>
      <p class="eyebrow">Dom Pogrzebowy w Gliwicach i Zabrzu</p>
      <h1 id="hero-title">Pomożemy Państwu godnie pożegnać bliską osobę</h1>
      <p class="lead">Od ${SITE.founded} roku organizujemy pogrzeby w Gliwicach i Zabrzu. Jesteśmy dostępni całą dobę – zajmiemy się przewozem osoby zmarłej, formalnościami i przygotowaniem ceremonii.</p>
      ${urgentPanel()}
      <div class="hero__actions">
        <a class="btn btn--outline" href="/organizacja-pogrzebu/">${icon('doc')}Co zrobić, gdy ktoś umrze?</a>
        <a class="link-arrow" href="#uslugi">Nasze usługi ${icon('arrow')}</a>
      </div>
    </div>
    <figure class="hero__media">
      <picture>
        <source type="image/webp" srcset="/assets/img/hero-lilies-480.webp 480w, /assets/img/hero-lilies-720.webp 720w, /assets/img/hero-lilies-1024.webp 1024w" sizes="(min-width: 60em) 45vw, 100vw">
        <img src="/assets/img/hero-lilies-1024.jpg" width="1024" height="1024" alt="" fetchpriority="high" decoding="async">
      </picture>
    </figure>
  </div>
</section>

<section class="section section--surface" id="pierwsze-kroki" aria-labelledby="steps-title">
  <div class="container">
    <div class="section-head section-head--split reveal">
      <div>
        <p class="eyebrow">Pierwsze kroki</p>
        <h2 id="steps-title">Co zrobić, gdy ktoś umrze?</h2>
      </div>
      <p>Wiemy, że to chwila, w której trudno zebrać myśli. Poniżej znajdą Państwo najważniejsze kroki – w zależności od tego, gdzie nastąpił zgon. W każdej sytuacji mogą Państwo do nas zadzwonić o dowolnej porze.</p>
    </div>
    <div class="steps-grid reveal">
      <article class="step-card">
        <p class="step-card__kicker">Sytuacja 1</p>
        <h3>Zgon w domu</h3>
        <ol>
          <li><span>Należy wezwać <strong>lekarza</strong> opiekującego się zmarłym lub lekarza pogotowia – wystawi kartę zgonu.</span></li>
          <li><span><strong>Prosimy zadzwonić do nas</strong> – po przyjęciu zlecenia przyjedziemy po osobę zmarłą.</span></li>
          <li><span>Przewieziemy zmarłego do <strong>naszej chłodni</strong>, gdzie pozostanie do dnia pogrzebu.</span></li>
        </ol>
      </article>
      <article class="step-card">
        <p class="step-card__kicker">Sytuacja 2</p>
        <h3>Zgon w szpitalu</h3>
        <ol>
          <li><span>Lekarz szpitalny wystawia <strong>kartę zgonu</strong>.</span></li>
          <li><span>Z kartą zgonu prosimy <strong>przyjść do naszego biura</strong> w Gliwicach lub Zabrzu.</span></li>
          <li><span>Wszystkie dalsze formalności i organizację pochówku <strong>przejmujemy na siebie</strong>.</span></li>
        </ol>
      </article>
      <article class="step-card">
        <p class="step-card__kicker">Sytuacja 3</p>
        <h3>Zgon w miejscu publicznym</h3>
        <ol>
          <li><span>Należy wezwać <strong>pogotowie ratunkowe</strong> – lekarz wystawi protokół lub kartę zgonu.</span></li>
          <li><span><strong>Prosimy zadzwonić do nas</strong> – nasi pracownicy przyjadą po osobę zmarłą.</span></li>
          <li><span>Zmarły zostanie przewieziony do <strong>naszej chłodni</strong>.</span></li>
        </ol>
      </article>
      <article class="step-card">
        <p class="step-card__kicker">Sytuacja 4</p>
        <h3>Zgon wskutek wypadku</h3>
        <ol>
          <li><span>Do pochowania potrzebna jest karta zgonu oraz <strong>zezwolenie prokuratora</strong>.</span></li>
          <li><span>Na wniosek prokuratora zmarły jest przewożony do <strong>zakładu medycyny sądowej</strong>.</span></li>
          <li><span><strong>Prosimy o kontakt</strong> – pomożemy w dalszych formalnościach i organizacji pogrzebu.</span></li>
        </ol>
      </article>
    </div>
    <div class="docs-strip reveal">
      <h3>${icon('doc')}Dokumenty do aktu zgonu</h3>
      <ul>
        <li>karta zgonu wystawiona przez lekarza</li>
        <li>dowód osobisty osoby zmarłej</li>
        <li>paszport osoby zmarłej, jeśli go posiadała</li>
      </ul>
      <div class="docs-strip__links">
        <a class="link-arrow" href="/organizacja-pogrzebu/">Pełny poradnik ${icon('arrow')}</a>
        <a class="link-arrow" href="/zasilek-pogrzebowy/">Zasiłek pogrzebowy ${icon('arrow')}</a>
      </div>
    </div>
  </div>
</section>

<section class="section" id="oddzialy" aria-labelledby="branches-title">
  <div class="container">
    <div class="section-head section-head--split reveal">
      <div>
        <p class="eyebrow">Oddziały</p>
        <h2 id="branches-title">Nasze domy pogrzebowe</h2>
      </div>
      <p>Zapraszamy do biur w Gliwicach i Zabrzu. Telefonicznie jesteśmy dostępni całą dobę, również w niedziele i święta.</p>
    </div>
    <div class="branches">
      ${BRANCHES.map((b) => branchCard(b)).join('')}
    </div>
  </div>
</section>

<section class="section section--sand" id="uslugi" aria-labelledby="services-title">
  <div class="container">
    <div class="section-head section-head--split reveal">
      <div>
        <p class="eyebrow">Usługi</p>
        <h2 id="services-title">Kompleksowa organizacja pożegnania</h2>
      </div>
      <p>Świadczymy pełen zakres usług pogrzebowych, kremacyjnych i cmentarnych – od całodobowego odbioru osoby zmarłej po oprawę ceremonii i usługi kamieniarskie.</p>
    </div>
    <div class="services-feature reveal">
      ${featured.map((s) => serviceCard(s)).join('')}
    </div>
    <ul class="services-list reveal" aria-label="Pozostałe usługi">
      ${others.map((s) => `<li><a href="/${s.slug}/"><strong>${s.title}</strong><span>${s.short}</span>${icon('arrow')}</a></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section" id="o-nas" aria-labelledby="about-title">
  <div class="container split">
    <figure class="split__media reveal">
      ${img('team', 'Pracownicy Domu Pogrzebowego Jasek przed budynkiem firmy w Gliwicach')}
    </figure>
    <div class="reveal">
      <p class="eyebrow">O firmie</p>
      <h2 id="about-title">Rodzinna firma z Gliwic, działająca od ${SITE.founded} roku</h2>
      <p class="lead">Firma Pogrzebowa Jasek powstała w ${SITE.founded} roku przy ul. Zygmunta Starego w Gliwicach. Od początku stawiamy na profesjonalizm, godność i kulturę obsługi – oraz rozsądne ceny.</p>
      <p>W trudnej chwili otaczamy opieką rodzinę zmarłego i pomagamy we wszystkich formalnościach związanych z pogrzebem. Firmą kierują Beata Jasek, jej syn Martin oraz Krzysztof Wąs.</p>
      <dl class="facts">
        <div><dt>${SITE.founded}</dt><dd>rok założenia firmy</dd></div>
        <div><dt>${SITE.vehicles}</dt><dd>samochodów pogrzebowych</dd></div>
        <div><dt>2</dt><dd>oddziały: Gliwice i Zabrze</dd></div>
        <div><dt>24 h</dt><dd>telefon dyżurny, 7 dni w tygodniu</dd></div>
      </dl>
      <a class="link-arrow" href="/o-firmie/">Poznaj naszą historię ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section section--dark" aria-labelledby="support-title">
  <div class="container support-grid">
    <div class="reveal">
      <p class="eyebrow">Formalności</p>
      <h2 id="support-title">Nie zostawiamy Państwa z formalnościami</h2>
      <p class="lead" style="color:var(--c-on-dark-muted)">Załatwiamy formalności pogrzebowe zgodnie z Państwa życzeniem, a organizację pogrzebu dostosowujemy do możliwości finansowych rodziny.</p>
      <a class="btn btn--light" href="/zasilek-pogrzebowy/">Zasiłek pogrzebowy – co warto wiedzieć</a>
    </div>
    <ul class="check-list reveal">
      <li>Załatwianie formalności pogrzebowych i pośrednictwo w sprawach z Kościołem</li>
      <li>Możliwość ceremonii prowadzonej przez świeckiego mistrza ceremonii</li>
      <li>Rozliczenie zasiłku pogrzebowego bezpośrednio w naszym biurze</li>
      <li>Nekrologi, klepsydry i tabliczki</li>
      <li>Pomoc prawna w sprawach świadczeń ZUS, KRUS, WBE i MSWIA należnych po osobach zmarłych</li>
      <li>Pomoc w sprawach odszkodowań oraz postępowań spadkowych i podatkowych</li>
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="hall-title">
  <div class="container split split--media-right">
    <div class="split__media mosaic reveal">
      <figure>${img('sala-gliwice', 'Jasna sala pożegnań w Gliwicach z rzędami krzeseł dla rodziny')}</figure>
      <figure>${img('sala-gliwice-2', 'Sala pożegnań w Gliwicach – widok w stronę miejsca ceremonii', { sizes: '(min-width: 60em) 25vw, 50vw' })}</figure>
      <figure>${img('sala-zabrze', 'Sala pożegnań w Zabrzu', { sizes: '(min-width: 60em) 25vw, 50vw' })}</figure>
    </div>
    <div class="reveal">
      <p class="eyebrow">Sala pożegnań</p>
      <h2 id="hall-title">Spokojne miejsce na ostatnie pożegnanie</h2>
      <p class="lead">Dysponujemy własnymi salami pożegnań w Gliwicach i Zabrzu. Pozwalają one rodzinie pożegnać bliską osobę w skupieniu i modlitwie, przed rozpoczęciem ceremonii pogrzebowej.</p>
      <p>Każda z kaplic ma odmienny wystrój i wyposażenie. Organizujemy w nich również różaniec i pożegnanie. Na miejscu znajdują się nasze własne chłodnie.</p>
      <a class="link-arrow" href="/sala-pozegnan/">Zobacz sale pożegnań ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section section--surface" aria-labelledby="guide-title">
  <div class="container">
    <div class="section-head section-head--split reveal">
      <div>
        <p class="eyebrow">Poradnik</p>
        <h2 id="guide-title">Informacje, które pomagają przejść przez formalności</h2>
      </div>
      <p>Zebraliśmy odpowiedzi na pytania, które rodziny zadają nam najczęściej.</p>
    </div>
    <div class="articles reveal">
      <article class="article-card">
        <p class="article-card__tag">Organizacja pogrzebu</p>
        <h3><a href="/organizacja-pogrzebu/">Jak uporać się z formalnościami po śmierci bliskiej osoby?</a></h3>
        <p>Co zrobić, gdy zgon nastąpił w domu, w szpitalu, w miejscu publicznym lub wskutek wypadku.</p>
        <span class="card__more" aria-hidden="true">Czytaj ${icon('arrow')}</span>
      </article>
      <article class="article-card">
        <p class="article-card__tag">Zasiłek pogrzebowy</p>
        <h3><a href="/zasilek-pogrzebowy/">Skąd wziąć środki na zorganizowanie pogrzebu?</a></h3>
        <p>Komu przysługuje zasiłek pogrzebowy i jakie dokumenty są potrzebne w ZUS i KRUS.</p>
        <span class="card__more" aria-hidden="true">Czytaj ${icon('arrow')}</span>
      </article>
      <article class="article-card">
        <p class="article-card__tag">Kremacja</p>
        <h3><a href="/kremacja/">Kremacja – jak wygląda i czym się różni od tradycyjnego pochówku?</a></h3>
        <p>Historia kremacji, stanowisko Kościoła i praktyczne zalety tej formy pochówku.</p>
        <span class="card__more" aria-hidden="true">Czytaj ${icon('arrow')}</span>
      </article>
    </div>
  </div>
</section>

${closingCta()}
`;

export default page({
  path: '/',
  title: 'Dom Pogrzebowy Jasek – zakład pogrzebowy Gliwice, Zabrze | Całodobowo',
  description: 'Kompleksowe usługi pogrzebowe w Gliwicach i Zabrzu od 1980 roku. Telefon całodobowy, formalności, organizacja pogrzebu, kremacja, transport zmarłych, własne sale pożegnań i chłodnie.',
  body,
  ld: [orgLd()],
});
