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

const slider = document.querySelector('#vlt');
const lensButtons = [...document.querySelectorAll('.lens')];
function updateLens() {
  const value = Number(slider.value);
  const nearest = lensButtons.reduce((best, lens) =>
    Math.abs(Number(lens.dataset.vlt) - value) < Math.abs(Number(best.dataset.vlt) - value) ? lens : best
  );
  document.querySelector('#vlt-value').value = value + '%';
  document.querySelector('#lens-result').textContent =
    'Ближайшая линза — ' + nearest.querySelector('strong').textContent + ' (' + nearest.dataset.vlt + '%).';
  lensButtons.forEach(lens => lens.setAttribute('aria-pressed', String(lens === nearest)));
}
slider.addEventListener('input', updateLens);
lensButtons.forEach(lens => lens.addEventListener('click', () => {
  slider.value = lens.dataset.vlt;
  updateLens();
}));
updateLens();

const helmet = document.querySelector('#helmet');
const goggles = document.querySelector('#with-goggles');
const total = document.querySelector('#total');
const pln = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' });
function updateTotal() {
  const grosz = Number(helmet.value) + (goggles.checked ? 130320 : 0);
  total.value = pln.format(grosz / 100);
}
document.querySelector('#kit').addEventListener('change', updateTotal);
updateTotal();

const mapContainer = document.querySelector('#map');
if (window.L) {
  const shops = [
    { name: 'NartyWarszawa', address: 'Mangalia 4', coordinates: [52.1869, 21.0468] },
    { name: 'Sportano Targówek', address: 'Malborska 47', coordinates: [52.3057, 21.0783] }
  ];
  mapContainer.replaceChildren();
  const map = L.map(mapContainer, { scrollWheelZoom: false });
  const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  const markers = shops.map(shop => L.marker(shop.coordinates, { title: shop.name, alt: shop.name })
    .addTo(map).bindPopup('<strong>' + shop.name + '</strong><br>' + shop.address));
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
