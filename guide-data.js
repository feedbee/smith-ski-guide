const white = 'https://www.whitesport.pl';
const blackcomb = 'https://www.blackcomb-shop.pl';
const whiteMask = white + '/gogle/gogle-smith-4d-mag-';
const whiteHelmet = white + '/kaski/kask-smith-';
const mck = 'https://mcksport.pl';
const smith = 'https://www.smithoptics.com/en-us/products/4d-mag-replacement-lens';

const lensCatalog = [
  { id: 'green', name: 'Sun Green Mirror', min: 9, family: 'Солнце', tint: '#30ac86', variant: '46910580130030' },
  { id: 'black', name: 'Sun Black', min: 12, family: 'Солнце', tint: '#84949e', variant: '46910580097262', price: 49900, whiteSlug: 'chromapop-sun-black-lens' },
  { id: 'sun-blue', name: 'Sun Blue Mirror', min: 12, family: 'Солнце', tint: '#3597d5', variant: '46910580031726', price: 49900, whiteSlug: 'chromapop-sun-blue-lens' },
  { id: 'platinum', name: 'Sun Platinum Mirror', min: 13, family: 'Солнце', tint: '#91a9b9', variant: '46910580195566' },
  { id: 'gold', name: 'Sun Black Gold Mirror', min: 13, family: 'Солнце', tint: '#d6a039', variant: '46910580228334' },
  { id: 'sun-red', name: 'Sun Red Mirror', min: 16, family: 'Солнце', tint: '#ef8054', variant: '46910580162798' },
  { id: 'photo-red', name: 'Photochromic Red Mirror', min: 20, max: 40, family: 'Фотохром', tint: '#e77855', variant: '46910580523246', price: 69900, whiteSlug: 'chromapop-photochromic-red-mirror-lens' },
  { id: 'every-green', name: 'Everyday Green Mirror', min: 23, family: 'Переменная облачность', tint: '#4caf82', variant: '46910580293870', price: 49900, whiteSlug: 'chromapop-everyday-green-mirror-lens' },
  { id: 'every-blue', name: 'Everyday Blue Mirror', min: 23, family: 'Переменная облачность', tint: '#4c95c7', variant: '46910580064494' },
  { id: 'rose-gold', name: 'Everyday Rose Gold Mirror', min: 23, family: 'Переменная облачность', tint: '#d59277', variant: '46910580359406', price: 44900, whiteSlug: 'chromapop-everyday-rose-gold-mirror-lens' },
  { id: 'every-red', name: 'Everyday Red Mirror', min: 25, family: 'Переменная облачность', tint: '#f08e6f', variant: '46910580261102', price: 49900, whiteSlug: 'chromapop-everyday-red-mirror-lens' },
  { id: 'photo-rose', name: 'Photochromic Rose Flash', min: 30, max: 50, family: 'Фотохром', tint: '#d18eb5', variant: '46910580490478', price: 59900, whiteSlug: 'chromapop-photochromic-rose-flash-lens' },
  { id: 'storm-rose', name: 'Storm Rose Flash', min: 50, family: 'Пасмурно', tint: '#db8bb9', variant: '47235863445742', price: 39900, whiteSlug: 'chromapop-storm-rose-flash-biala-oprawa', note: 'Белая окантовка' },
  { id: 'storm-blue', name: 'Storm Blue Sensor Mirror', min: 55, family: 'Плоский свет', tint: '#7badf0', variant: '46910580424942', price: 59900, whiteSlug: 'chromapop-storm-blue-sensor-mirror-lens' },
  { id: 'storm-yellow', name: 'Storm Yellow Flash', min: 65, family: 'Снегопад', tint: '#ddb940', variant: '46910580392174', whiteSlug: 'chromapop-storm-yellow-flash-lens' },
  { id: 'clear', name: 'Clear', min: 89, family: 'Вечернее освещение', tint: '#a1b6c2', variant: '46910580556014', price: 24900, whiteSlug: 'clear-lens' }
];

const offers = [
  { id: 'method-dusk', model: 'Method Pro MIPS', variant: 'Matte Dusk', price: 53800, shop: 'Blackcomb', sizes: ['M'], url: blackcomb + '/kask-smith-method-pro-mips-matte-dusk/' },
  { id: 'method-white', model: 'Method Pro MIPS', variant: 'Matte Black 2026', price: 55900, shop: 'WhiteSport', sizes: ['XL'], url: white + '/kaski/kask-smith-method-pro-mips-matte-black-2026', local: true },
  { id: 'method-ironwood', model: 'Method Pro MIPS', variant: 'Matte Ironwood 2026', price: 55900, shop: 'WhiteSport', sizes: ['S', 'M'], url: whiteHelmet + 'method-pro-mips-matte-ironwood-2026', local: true },
  { id: 'method-cactus', model: 'Method Pro MIPS', variant: 'Matte Cactus Zine 2026', price: 56900, shop: 'WhiteSport', sizes: ['M'], url: whiteHelmet + 'method-pro-mips-matte-cactus-zine-2026', local: true },
  { id: 'method-grey', model: 'Method Pro MIPS', variant: 'Matte Cirrus Grey 2027', price: 71900, shop: 'WhiteSport', sizes: ['L', 'XL'], url: whiteHelmet + 'method-pro-mips-matte-cirrus-grey-2027', local: true },
  { id: 'method-ski', model: 'Method Pro MIPS', variant: 'Matte Black', price: 59100, shop: 'Skisport', sizes: ['S', 'L', 'XL'], note: '55–59 см — предзаказ на 16 декабря. L указан продавцом как 59–61 см.', url: 'https://skisport.pl/smith-method-pro-mips-kask-narciarski-czarny-25315' },
  { id: 'method-hardloop', model: 'Method Pro MIPS', variant: 'Цвет по карточке', price: 61511, shop: 'Hardloop', sizes: ['S', 'M', 'L'], url: 'https://www.hardloop.pl/oferta/67548-smith-method-pro-mips-kask-narciarski' },
  { id: 'method-mck', model: 'Method Pro MIPS', variant: 'Matte Black 2027', price: 66900, shop: 'MCK Sport', indexed: true, note: 'Цена в действующем каталоге; карточка товара не открылась.', url: mck + '/tag-produktu/kask-narciarski-smith/', local: true },
  { id: 'method-white27', model: 'Method Pro MIPS', variant: 'Matte Black 2027', price: 68900, shop: 'WhiteSport', sizes: ['M', 'XL'], url: white + '/kaski/kask-smith-method-pro-mips-matte-black-2027', local: true },
  { id: 'vantage-thistle', model: 'Vantage 2 MIPS', variant: 'Matte Dusk Thistle 2026', price: 86900, shop: 'WhiteSport', sizes: ['S', 'M'], url: whiteHelmet + 'vantage-2-mips-matte-dusk-thistle-2026', local: true },
  { id: 'vantage-ironwood', model: 'Vantage 2 MIPS', variant: 'Matte Ironwood / Bandit 2026', price: 86900, shop: 'WhiteSport', sizes: ['M', 'L'], url: whiteHelmet + 'vantage-2-mips-matte-ironwood-bandit-2026', local: true },
  { id: 'vantage-mystic', model: 'Vantage 2 MIPS', variant: 'Matte Mystic Gold Dust 2026', price: 86900, shop: 'WhiteSport', sizes: ['L'], url: whiteHelmet + 'vantage-2-mips-matte-mystic-gold-dust-2026', local: true },
  { id: 'vantage-xl', model: 'Vantage 2 MIPS', variant: 'Matte White 2026', price: 92900, shop: 'WhiteSport', sizes: ['XL'], url: white + '/kaski/kask-smith-vantage-2-mips-matte-white-2026', local: true },
  { id: 'vantage-mck', model: 'Vantage 2 MIPS', variant: 'Matte Black 2026', price: 92900, shop: 'MCK Sport', sizes: ['M', 'L', 'XL'], indexed: true, url: mck + '/gdzie-nas-znajdziesz/', local: true },
  { id: 'vantage-black', model: 'Vantage 2 MIPS', variant: 'Matte Black 2026', price: 98900, shop: 'WhiteSport', sizes: ['M', 'L', 'XL'], url: white + '/kaski/kask-smith-vantage-2-mips-matte-black-2026', local: true },
  { id: 'vantage-violet', model: 'Vantage 2 MIPS', variant: 'Black / Ultraviolet / Emerald', price: 98900, shop: 'WhiteSport', sizes: ['S', 'L'], url: white + '/kaski/kask-smith-vantage-2-mips-matte-black-ultraviolet-emerald-city-2026', local: true },
  { id: 'vantage-ski', model: 'Vantage 2 MIPS', variant: 'Matte Black', price: 99000, shop: 'Skisport', sizes: ['S', 'M', 'L', 'XL'], url: 'https://skisport.pl/smith-vantage-2-mips-kask-narciarski-czarny-31606' },
  { id: 'vantage-sport', model: 'Vantage 2 MIPS', variant: 'Matte White', price: 99999, shop: 'Sportano', url: 'https://sportano.pl/p/796921/kask-narciarski-smith-vantage-2-mips-matte-white', local: true },
  { id: 'vantage-bc', model: 'Vantage 2 MIPS', variant: 'Black / Ultraviolet / Emerald', price: 100200, shop: 'Blackcomb', sizes: ['S'], url: blackcomb + '/kask-smith-vantage-2-mips-matte-black-ultraviolet-emerald-city/' },
  { id: 'g-platinum', model: '4D MAG', variant: 'White Vapor', price: 89900, shop: 'WhiteSport', lenses: ['platinum', 'storm-rose'], url: whiteMask + 'white-vapor-chromapop-sun-platinum-mirror-dodatkowa-szyba-chromapop-storm-rose-flash', local: true },
  { id: 'g-coyote', model: '4D MAG', variant: 'Coyote Pow Hunter', price: 99900, shop: 'WhiteSport', lenses: ['gold', 'storm-blue'], url: whiteMask + 'coyote-pow-hunter-chromapop-sun-black-gold-mirror-dodatkowa-szyba-chromapop-storm-blue-sensor', local: true },
  { id: 'g-crimson', model: '4D MAG', variant: 'Crimson', price: 99900, shop: 'WhiteSport', lenses: ['every-red', 'storm-yellow'], url: whiteMask + 'crimson-chromapop-everyday-red-mirror-dodatkowa-szyba-chromapop-storm-yellow-flash', local: true },
  { id: 'g-terra', model: '4D MAG', variant: 'Terra Flow', price: 99900, shop: 'WhiteSport', lenses: ['every-red', 'storm-blue'], url: whiteMask + 'terra-flow-chromapop-everyday-red-mirror-dodatkowa-szyba-chromapop-storm-blue-sensor', local: true },
  { id: 'g-true-blue', model: '4D MAG', variant: 'True Blue Glitch', price: 99900, shop: 'WhiteSport', lenses: ['every-blue', 'storm-blue'], url: whiteMask + 'true-blue-glitch-chromapop-everyday-blue-mirror-dodatkowa-szyba-chromapop-storm-blue-sensor', local: true },
  { id: 'g-ac-markus', model: '4D MAG', variant: 'AC Markus Eder', price: 109900, shop: 'WhiteSport', lenses: ['black', 'storm-blue'], url: whiteMask + 'ac-markus-eder-chromapop-sun-black-dodatkowa-szyba-chromapop-storm-blue-sensor', local: true },
  { id: 'g-photo', model: '4D MAG', variant: 'Black Photochromic 2026', price: 129900, shop: 'WhiteSport', lenses: ['photo-red', 'storm-rose'], url: whiteMask + 'black-chromapop-photochromic-red-mirror-dodatkowa-szyba-chromapop-storm-rose-flash-2026', local: true },
  { id: 'g-mck-white', model: '4D MAG', variant: 'White Vapor 2022', price: 100000, shop: 'MCK Sport', lenses: ['every-green', 'storm-rose'], url: mck + '/gdzie-nas-znajdziesz/', indexed: true, local: true },
  { id: 'g-gold', model: '4D MAG', variant: 'Chalk Space Invader', price: 107700, shop: 'Blackcomb', lenses: ['gold', 'storm-blue'], url: blackcomb + '/gogle-smith-4d-mag-chalk-space-invader-chromapop-sun-black-gold-mirro/' },
  { id: 'g-mck-black', model: '4D MAG', variant: 'Black 2026', price: 112900, shop: 'MCK Sport', lenses: ['sun-red', 'storm-yellow'], url: mck + '/gdzie-nas-znajdziesz/', indexed: true, local: true },
  { id: 'g-red', model: '4D MAG', variant: 'Black', price: 123100, shop: 'Blackcomb', lenses: ['sun-red', 'storm-yellow'], url: blackcomb + '/gogle-smith-4d-mag-black-chromapop-sun-red-mirror1/' },
  { id: 'g-rose', model: '4D MAG', variant: 'White Vapor', price: 123100, shop: 'Blackcomb', lenses: ['rose-gold', 'storm-rose'], url: blackcomb + '/gogle-smith-4d-mag-white-vapor-chromapop-everyday-rose-gold-mirror/' },
  { id: 'g-white', model: '4D MAG', variant: 'Black 2026', price: 129900, shop: 'WhiteSport', lenses: ['every-red', 'storm-yellow'], url: white + '/gogle/gogle-smith-4d-mag-black-chromapop-everyday-red-mirror-dodatkowa-szyba-chromapop-storm-yellow-flash-2026', local: true },
  { id: 'g-wro', model: '4D MAG', variant: 'Gold', price: 130300, shop: 'Wrosport', lenses: ['gold', 'storm-blue'], url: 'https://wrosport.pl/gogle/gogle-smith-4d-mag-chromapop-zlote.html' },
  { id: 'g-narty', model: '4D MAG', variant: 'Terra Flow 2023', price: 130320, shop: 'NartyWarszawa', lenses: ['every-red'], url: 'https://www.nartywarszawa.pl/gogle-smith-4d-mag-terra-flow-2023-chromapop-everyday-red-mirrors2.html?id=32522', local: true }
].sort((a, b) => a.price - b.price);
