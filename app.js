const root = document.documentElement;
const themeButton = document.querySelector('#theme');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
try {
  const saved = localStorage.getItem('smith-theme');
  if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
} catch {}
function isDark() {
  return root.dataset.theme ? root.dataset.theme === 'dark' : systemTheme.matches;
}
function updateThemeButton() {
  themeButton.setAttribute('aria-pressed', String(isDark()));
}
themeButton.addEventListener('click', () => {
  root.dataset.theme = isDark() ? 'light' : 'dark';
  try { localStorage.setItem('smith-theme', root.dataset.theme); } catch {}
  updateThemeButton();
});
systemTheme.addEventListener('change', updateThemeButton);
updateThemeButton();

const pln = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' });
const money = grosz => pln.format(grosz / 100);
const lensById = new Map(lensCatalog.map(lens => [lens.id, lens]));
const lensRange = lens => lens.max ? lens.min + '–' + lens.max + '%' : lens.min + '%';
const lensShopUrl = lens => white + '/gogle/szyby-do-gogli/szyby-do-gogli-smith-4d-mag-' + lens.whiteSlug;

const replacementOffers = [
  ...lensCatalog.filter(lens => lens.price).map(lens => ({
    id: lens.id, lens: lens.id, price: lens.price, shop: 'WhiteSport', url: lensShopUrl(lens)
  })),
  ...mckLenses
].sort((a, b) => a.price - b.price);
const replacementById = new Map(replacementOffers.map(offer => [offer.id, offer]));
const replacementLinks = id => replacementOffers.filter(offer => offer.lens === id)
  .map(offer => `<a href="${offer.url}">${offer.shop} · ${money(offer.price)}</a>`).join('');

function colorRank(offer) {
  if (offer.color === 'Матовый чёрный') return 0;
  if (offer.color === 'Серый') return 1;
  if (offer.color.startsWith('Чёрный')) return 2;
  if (offer.color.startsWith('Тёмно-синий')) return 3;
  return 4;
}

const colorFilter = document.querySelector('#color-filter');
const colorModel = document.querySelector('#color-model');
const colorShop = document.querySelector('#color-shop');
const colorSize = document.querySelector('#color-size');
const colorGallery = document.querySelector('#helmet-colors');

function renderColors() {
  const eligible = helmetInventory.filter(offer => (
    (!colorFilter.value || colorRank(offer) <= (colorFilter.value === 'black' ? 0 : 3)) &&
    (!colorModel.value || offer.model === colorModel.value) &&
    (!colorShop.value || offer.shop === colorShop.value) &&
    (!colorSize.value || offer.sizes.includes(colorSize.value))
  )).sort((a, b) => colorRank(a) - colorRank(b) || a.price - b.price);
  document.querySelector('#color-count').textContent = 'Подходящих вариантов: ' + eligible.length + '.';
  colorGallery.innerHTML = eligible.length ? eligible.map(offer => `<article class="card helmet-color">
    <a href="${offer.url}" aria-label="${offer.model}, ${offer.variant}, карточка ${offer.shop}"><img src="${offer.photo}" alt="${offer.model} — ${offer.variant}" width="460" height="460" loading="lazy"></a>
    <div><p class="eyebrow">${offer.model}</p><h3>${offer.variant}</h3>
    ${offer.color ? `<p class="source">${offer.color}</p>` : ''}
    <p class="source">Онлайн: ${offer.sizes.join(', ')}</p>
    <a class="color-price" href="${offer.url}"><span>${offer.shop}</span><strong>${money(offer.price)}</strong></a></div></article>`).join('')
    : '<p>По выбранным параметрам шлемов в наличии нет.</p>';
}
[colorFilter, colorModel, colorShop, colorSize].forEach(filter => filter.addEventListener('change', renderColors));
renderColors();

const chart = document.querySelector('#lens-chart');
const slider = document.querySelector('#vlt');
const chartRows = document.querySelector('#lens-rows');
const lensCards = document.querySelector('#lens-cards');

chartRows.innerHTML = lensCatalog.map(lens => {
  const width = lens.max ? lens.max - lens.min : 0;
  return `<div class="chart-row" data-lens="${lens.id}">
    <a href="#lens-${lens.id}" class="chart-label"><img src="assets/lenses/${lens.id}.png" alt="" width="48" height="36" loading="lazy"><span>${lens.name}</span><b>${lensRange(lens)}</b></a>
    <div class="chart-track" aria-hidden="true"><i class="chart-mark ${width ? 'span' : 'point'}" style="--start:${lens.min}%;--span:${width}%;--tint:${lens.tint}"></i></div>
  </div>`;
}).join('');

lensCards.innerHTML = lensCatalog.map(lens => `<article id="lens-${lens.id}" class="card lens-card">
  <button type="button" data-chart-lens="${lens.id}" aria-label="Показать ${lens.name}, VLT ${lensRange(lens)} на графике"><img src="assets/lenses/${lens.id}.png" alt="" width="300" height="300" loading="lazy"></button>
  <div><h4>${lens.name}</h4><p><strong>${lensRange(lens)} VLT</strong> · ${lens.family}${lens.note ? ' · ' + lens.note : ''}</p>
  ${replacementLinks(lens.id) || '<span class="source">Отдельная цена в Польше не подтверждена</span>'}
  <a class="source" href="${smith}?variant=${lens.variant}">Артикул Smith</a></div></article>`).join('');

function updateLens() {
  const value = Number(slider.value);
  const distance = lens => Math.max(lens.min - value, value - (lens.max ?? lens.min), 0);
  const nearest = Math.min(...lensCatalog.map(distance));
  const matched = lensCatalog.filter(lens => distance(lens) === nearest);
  chart.style.setProperty('--cursor', value + '%');
  document.querySelector('#vlt-value').value = value + '%';
  document.querySelector('#lens-result').textContent = (nearest ? 'Ближе всего к указателю: ' : 'На указателе: ') +
    matched.map(lens => lens.name + ' (' + lensRange(lens) + ')').join(', ') + '.';
  chartRows.querySelectorAll('.chart-row').forEach(row => {
    row.classList.toggle('is-match', matched.includes(lensById.get(row.dataset.lens)));
  });
}
slider.addEventListener('input', updateLens);
lensCards.addEventListener('click', event => {
  const button = event.target.closest('[data-chart-lens]');
  if (!button) return;
  const lens = lensById.get(button.dataset.chartLens);
  slider.value = lens.min;
  updateLens();
  slider.focus();
});
updateLens();

const sizeFilter = document.querySelector('#size');
const localFilter = document.querySelector('#local-only');
const offerShop = document.querySelector('#offer-shop');
const dealTables = document.querySelector('#deal-tables');
const models = ['Method Pro MIPS', 'Vantage 2 MIPS', '4D MAG'];
const helmet = document.querySelector('#helmet');
const goggles = document.querySelector('#kit-goggles');
const extraLens = document.querySelector('#extra-lens');
const offerById = new Map(offers.map(offer => [offer.id, offer]));

function offerDetails(offer) {
  if (!offer.lenses) return (offer.sizes ? offer.sizes.join(', ') : 'Размер уточнить') + (offer.note ? ' · ' + offer.note : '');
  return offer.lenses.map(id => {
    const lens = lensById.get(id);
    return `<a href="#lens-${id}">${lens.name}</a> (${lensRange(lens)})`;
  }).join(' + ') + (offer.lenses.length === 1 ? ' · запасную уточнить' : '');
}

function fillSelect(select, choices, emptyLabel) {
  const previous = select.value;
  const wasInitialized = select.options.length > 0;
  select.replaceChildren(...choices.map(({ id, label }) => new Option(label, id)), new Option(emptyLabel, ''));
  if (wasInitialized && [...select.options].some(option => option.value === previous)) select.value = previous;
}

function renderOffers() {
  const shown = offers.filter(offer => (!localFilter.checked || offer.local) && (!offerShop.value || offer.shop === offerShop.value) &&
    (!sizeFilter.value || offer.model === '4D MAG' || offer.sizes?.includes(sizeFilter.value)));
  const confirmed = shown;
  document.querySelector('#deal-highlights').innerHTML = models.map(model => {
    const cheapest = confirmed.find(offer => offer.model === model);
    return `<article class="card pad offer highlight"><h3>${model}</h3>${cheapest
      ? `<strong>${money(cheapest.price)}</strong><p>${cheapest.shop} · ${cheapest.variant}${cheapest.sizes ? ' · ' + cheapest.sizes.join(', ') : ''}</p><a href="${cheapest.url}">Открыть предложение</a>`
      : '<p>Подтверждённых предложений по фильтру нет.</p>'}</article>`;
  }).join('');
  dealTables.innerHTML = models.map(model => {
    const matching = shown.filter(offer => offer.model === model);
    return `<section class="deal-group"><h3>${model}</h3>${matching.length ? `<ul class="deal-list">${matching.map(offer =>
      `<li class="card deal-row">
      <div><a class="deal-shop" href="${offer.url}">${offer.shop}</a><span class="deal-variant">${offer.variant}</span></div>
      <div class="deal-details">${offerDetails(offer)}</div>
      <div class="deal-price"><strong>${money(offer.price)}</strong><span>${offer.local ? 'Магазин в Варшаве · уточнить остаток' : 'Онлайн'}</span></div>
      </li>`).join('')}</ul>` : '<p>Нет предложений по этим фильтрам.</p>'}</section>`;
  }).join('');
  document.querySelector('#offers-count').textContent =
    'Предложений: ' + shown.length + ' · с подтверждённой ценой: ' + confirmed.length + '.';
  const options = items => items.map(offer => ({
    id: offer.id, label: offer.model + ' · ' + offer.shop + ' · ' + offer.variant +
      (offer.sizes ? ' (' + offer.sizes.join(', ') + ')' : '') + ' — ' + money(offer.price)
  }));
  fillSelect(helmet, options(confirmed.filter(offer => offer.model !== '4D MAG')), 'Без шлема');
  fillSelect(goggles, options(confirmed.filter(offer => offer.model === '4D MAG')), 'Без маски');
  const matchingLenses = replacementOffers.filter(offer => !offerShop.value || offer.shop === offerShop.value);
  dealTables.insertAdjacentHTML('beforeend', `<section class="deal-group"><h3>Отдельные линзы 4D MAG</h3>
    <ul class="deal-list">${matchingLenses.map(offer => `<li class="card deal-row">
      <a class="deal-shop" href="${offer.url}">${offer.shop}</a>
      <div class="deal-details"><a href="#lens-${offer.lens}">${lensById.get(offer.lens).name}</a></div>
      <div class="deal-price"><strong>${money(offer.price)}</strong></div>
    </li>`).join('')}</ul></section>`);
  const previousLens = extraLens.value;
  fillSelect(extraLens, matchingLenses.map(offer => ({
    id: offer.id, label: lensById.get(offer.lens).name + ' · ' + offer.shop + ' — ' + money(offer.price)
  })), 'Без дополнительной линзы');
  if (!matchingLenses.some(offer => offer.id === previousLens)) extraLens.value = '';
  updateTotal();
}

function updateTotal() {
  const selected = [offerById.get(helmet.value), offerById.get(goggles.value)];
  const lensOffer = replacementById.get(extraLens.value);
  const lens = lensById.get(lensOffer?.lens);
  const grosz = selected.reduce((sum, offer) => sum + (offer?.price ?? 0), lensOffer?.price ?? 0);
  document.querySelector('#total').value = money(grosz);
  const items = selected.filter(Boolean).map(offer => offer.model + ' · ' + offer.shop);
  if (lens) items.push(lens.name + ' · ' + lensOffer.shop);
  document.querySelector('#kit-detail').textContent = items.length ? items.join(' + ') : 'Комплект пока пуст.';
  const duplicate = document.querySelector('#duplicate-lens');
  duplicate.hidden = !selected[1]?.lenses.includes(lens?.id);
  duplicate.textContent = duplicate.hidden ? '' : 'Эта линза уже указана в комплектации маски.';
}

document.querySelector('#kit').addEventListener('change', updateTotal);
sizeFilter.addEventListener('change', renderOffers);
localFilter.addEventListener('change', renderOffers);
offerShop.addEventListener('change', renderOffers);
document.querySelectorAll('[data-offer-shop]').forEach(button => button.addEventListener('click', () => {
  offerShop.value = button.dataset.offerShop;
  renderOffers();
  document.querySelector('#offers').scrollIntoView();
}));
renderOffers();

const mapContainer = document.querySelector('#map');
if (window.L) {
  const shops = [
    { name: 'NartyWarszawa', address: 'Mangalia 4', coordinates: [52.1869, 21.0468] },
    { name: 'Sportano Targówek', address: 'Malborska 47', coordinates: [52.3057, 21.0783] },
    { name: 'MCK Sport', address: 'al. 3 Maja 2', coordinates: [52.2351085, 21.0350186] },
    { name: 'WhiteSport', address: 'Ząbkowska 22/24/26, lok. 145', coordinates: [52.2538267, 21.0424706] }
  ];
  mapContainer.replaceChildren();
  const map = L.map(mapContainer, { scrollWheelZoom: false });
  const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  const markers = shops.map(shop => L.marker(shop.coordinates, { title: shop.name, alt: shop.name })
    .addTo(map).bindPopup('<strong>' + shop.name + '</strong><br>' + shop.address + '<br><a href="https://www.openstreetmap.org/?mlat=' + shop.coordinates[0] + '&amp;mlon=' + shop.coordinates[1] + '#map=18/' + shop.coordinates.join('/') + '">Адрес на OpenStreetMap</a>'));
  map.fitBounds(shops.map(shop => shop.coordinates), { padding: [35, 35], maxZoom: 13 });
  document.querySelectorAll('[data-store]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      const marker = markers[Number(button.dataset.store)];
      map.setView(marker.getLatLng(), 15);
      marker.openPopup();
      mapContainer.scrollIntoView({ block: 'nearest' });
    });
  });
  tiles.once('tileerror', () => {
    const note = document.createElement('p');
    note.setAttribute('role', 'status');
    note.textContent = 'Часть карты не загрузилась. Адреса и контакты доступны рядом.';
    mapContainer.after(note);
  });
} else {
  mapContainer.querySelector('p').textContent = 'Карта недоступна. Адреса и контакты доступны рядом.';
}
