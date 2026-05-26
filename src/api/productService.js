// api/productService.js
// Datos locales cargados desde las BDs (BD_Snacks, BD_Juguetes, BD_Aseo_Cuidado,
// BD_Collares_Traillas, BD_Comederos_Bebederos, BD_Transporte)
// Las imágenes de alimentos viven en /images/ (carpeta public del proyecto).

// ─── ALIMENTOS (imágenes reales) ────────────────────────────────────────────
const FOOD_DATA = [
  // PRD001
  { id: 'PRD001-1kg',   name: 'Alimento Premium PRD001 1 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '1 kg',   price: 18900, stock: 30, description: 'Alimento balanceado premium para perros adultos. Fórmula completa con proteínas de alta calidad.', image: '/images/PRD001-1kg.jpg' },
  { id: 'PRD001-3kg',   name: 'Alimento Premium PRD001 3 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '3 kg',   price: 42900, stock: 25, description: 'Alimento balanceado premium para perros adultos. Fórmula completa con proteínas de alta calidad.', image: '/images/PRD001-3kg.jpg' },
  { id: 'PRD001-7kg',   name: 'Alimento Premium PRD001 7 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '7 kg',   price: 85900, stock: 20, description: 'Alimento balanceado premium para perros adultos. Fórmula completa con proteínas de alta calidad.', image: '/images/PRD001-7kg.jpg' },
  { id: 'PRD001-15kg',  name: 'Alimento Premium PRD001 15 kg',  category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '15 kg',  price: 159900, stock: 15, description: 'Alimento balanceado premium para perros adultos. Fórmula completa con proteínas de alta calidad.', image: '/images/PRD001-15kg.jpg' },
  // PRD002
  { id: 'PRD002-15kg',  name: 'Alimento Premium PRD002 15 kg',  category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '15 kg',  price: 149900, stock: 12, description: 'Nutrición avanzada para perros de razas medianas y grandes. Alto contenido en proteínas y omega 3.', image: '/images/PRD002-15kg.jpg' },
  // PRD003
  { id: 'PRD003-3kg',   name: 'Alimento Premium PRD003 3 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Gatos', weight: '3 kg',   price: 38900, stock: 20, description: 'Fórmula especial para gatos adultos. Rica en taurina y nutrientes esenciales para su salud.', image: '/images/PRD003-3kg.jpg' },
  { id: 'PRD003-7kg',   name: 'Alimento Premium PRD003 7 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Gatos', weight: '7 kg',   price: 79900, stock: 15, description: 'Fórmula especial para gatos adultos. Rica en taurina y nutrientes esenciales para su salud.', image: '/images/PRD003-7kg.jpg' },
  { id: 'PRD003-15kg',  name: 'Alimento Premium PRD003 15 kg',  category: 'Alimentos', categoryId: 'food', petType: 'Gatos', weight: '15 kg',  price: 145900, stock: 10, description: 'Fórmula especial para gatos adultos. Rica en taurina y nutrientes esenciales para su salud.', image: '/images/PRD003-15kg.jpg' },
  // PRD004
  { id: 'PRD004-1kg',   name: 'Alimento Premium PRD004 1 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '1 kg',   price: 21900, stock: 30, description: 'Croquetas premium para cachorros. Apoya el desarrollo óseo y muscular en etapa de crecimiento.', image: '/images/PRD004-1kg.jpg' },
  { id: 'PRD004-3kg',   name: 'Alimento Premium PRD004 3 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '3 kg',   price: 49900, stock: 20, description: 'Croquetas premium para cachorros. Apoya el desarrollo óseo y muscular en etapa de crecimiento.', image: '/images/PRD004-3kg.jpg' },
  { id: 'PRD004-7kg',   name: 'Alimento Premium PRD004 7 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '7 kg',   price: 98900, stock: 18, description: 'Croquetas premium para cachorros. Apoya el desarrollo óseo y muscular en etapa de crecimiento.', image: '/images/PRD004-7kg.jpg' },
  { id: 'PRD004-15kg',  name: 'Alimento Premium PRD004 15 kg',  category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '15 kg',  price: 179900, stock: 10, description: 'Croquetas premium para cachorros. Apoya el desarrollo óseo y muscular en etapa de crecimiento.', image: '/images/PRD004-15kg.jpg' },
  // PRD005
  { id: 'PRD005-1kg',   name: 'Alimento Premium PRD005 1 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Gatos', weight: '1 kg',   price: 19900, stock: 25, description: 'Alimento completo para gatos castrados. Controla el peso y cuida el tracto urinario.', image: '/images/PRD005-1kg.jpg' },
  { id: 'PRD005-3kg',   name: 'Alimento Premium PRD005 3 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Gatos', weight: '3 kg',   price: 45900, stock: 20, description: 'Alimento completo para gatos castrados. Controla el peso y cuida el tracto urinario.', image: '/images/PRD005-3kg.jpg' },
  { id: 'PRD005-7kg',   name: 'Alimento Premium PRD005 7 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Gatos', weight: '7 kg',   price: 89900, stock: 15, description: 'Alimento completo para gatos castrados. Controla el peso y cuida el tracto urinario.', image: '/images/PRD005-7kg.jpg' },
  { id: 'PRD005-15kg',  name: 'Alimento Premium PRD005 15 kg',  category: 'Alimentos', categoryId: 'food', petType: 'Gatos', weight: '15 kg',  price: 169900, stock: 8, description: 'Alimento completo para gatos castrados. Controla el peso y cuida el tracto urinario.', image: '/images/PRD005-15kg.jpg' },
  // PRD006
  { id: 'PRD006-1kg',   name: 'Alimento Premium PRD006 1 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '1 kg',   price: 22900, stock: 20, description: 'Fórmula hipocalórica para perros con sobrepeso. Ingredientes naturales, sin colorantes artificiales.', image: '/images/PRD006-1kg.jpg' },
  { id: 'PRD006-3kg',   name: 'Alimento Premium PRD006 3 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '3 kg',   price: 52900, stock: 18, description: 'Fórmula hipocalórica para perros con sobrepeso. Ingredientes naturales, sin colorantes artificiales.', image: '/images/PRD006-3kg.jpg' },
  { id: 'PRD006-7kg',   name: 'Alimento Premium PRD006 7 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '7 kg',   price: 99900, stock: 12, description: 'Fórmula hipocalórica para perros con sobrepeso. Ingredientes naturales, sin colorantes artificiales.', image: '/images/PRD006-7kg.jpg' },
  { id: 'PRD006-15kg',  name: 'Alimento Premium PRD006 15 kg',  category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '15 kg',  price: 185900, stock: 8, description: 'Fórmula hipocalórica para perros con sobrepeso. Ingredientes naturales, sin colorantes artificiales.', image: '/images/PRD006-15kg.jpg' },
  // PRD007
  { id: 'PRD007-1kg',   name: 'Alimento Premium PRD007 1 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '1 kg',   price: 25900, stock: 20, description: 'Alimento para perros senior. Apoya articulaciones, refuerza sistema inmune y mejora movilidad.', image: '/images/PRD007-1kg - copia.jpg' },
  { id: 'PRD007-6lb',   name: 'Alimento Premium PRD007 6 lb',   category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '6 lb',   price: 48900, stock: 15, description: 'Alimento para perros senior. Apoya articulaciones, refuerza sistema inmune y mejora movilidad.', image: '/images/PRD007-6lb.jpg' },
  { id: 'PRD007-18lb',  name: 'Alimento Premium PRD007 18 lb',  category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '18 lb',  price: 109900, stock: 10, description: 'Alimento para perros senior. Apoya articulaciones, refuerza sistema inmune y mejora movilidad.', image: '/images/PRD007-18lb.jpg' },
  { id: 'PRD007-40lb',  name: 'Alimento Premium PRD007 40 lb',  category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '40 lb',  price: 219900, stock: 6, description: 'Alimento para perros senior. Apoya articulaciones, refuerza sistema inmune y mejora movilidad.', image: '/images/PRD007-40lb.jpg' },
  // PRD008
  { id: 'PRD008-6lb',   name: 'Alimento Premium PRD008 6 lb',   category: 'Alimentos', categoryId: 'food', petType: 'Gatos', weight: '6 lb',   price: 52900, stock: 15, description: 'Nutrición holística para gatos con ingredientes naturales. Sin granos, alto contenido proteico.', image: '/images/PRD008-6lb.jpg' },
  { id: 'PRD008-20lb',  name: 'Alimento Premium PRD008 20 lb',  category: 'Alimentos', categoryId: 'food', petType: 'Gatos', weight: '20 lb',  price: 145900, stock: 10, description: 'Nutrición holística para gatos con ingredientes naturales. Sin granos, alto contenido proteico.', image: '/images/PRD008-20lb.jpg' },
  { id: 'PRD008-40lb',  name: 'Alimento Premium PRD008 40 lb',  category: 'Alimentos', categoryId: 'food', petType: 'Gatos', weight: '40 lb',  price: 269900, stock: 6, description: 'Nutrición holística para gatos con ingredientes naturales. Sin granos, alto contenido proteico.', image: '/images/PRD008-40lb.jpg' },
  // PRD009
  { id: 'PRD009-1kg',   name: 'Alimento Premium PRD009 1 kg',   category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '1 kg',   price: 28900, stock: 20, description: 'Alimento premium para razas pequeñas. Croquetas de tamaño reducido, fácil masticación.', image: '/images/PRD009-1kg.jpg' },
  { id: 'PRD009-6lb',   name: 'Alimento Premium PRD009 6 lb',   category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '6 lb',   price: 55900, stock: 15, description: 'Alimento premium para razas pequeñas. Croquetas de tamaño reducido, fácil masticación.', image: '/images/PRD009-6lb.jpg' },
  { id: 'PRD009-18lb',  name: 'Alimento Premium PRD009 18 lb',  category: 'Alimentos', categoryId: 'food', petType: 'Perros', weight: '18 lb',  price: 129900, stock: 10, description: 'Alimento premium para razas pequeñas. Croquetas de tamaño reducido, fácil masticación.', image: '/images/PRD009-18lb.jpg' },
]

// ─── SNACKS ──────────────────────────────────────────────────────────────────
const SNACKS_DATA = [
  { id: 'SK-DB25-2',   name: 'Dental Bone 2.5" x 2 uds',              category: 'Snacks', categoryId: 'snacks', price: 8900,   stock: 50, description: 'Snack dental comestible y digerible. Aliento fresco y dientes limpios. Reduce tártaro y placa.', image: null },
  { id: 'SK-DB25-12',  name: 'Dental Bone 2.5" x 12 uds',             category: 'Snacks', categoryId: 'snacks', price: 38000,  stock: 30, description: 'Snack dental comestible y digerible. Aliento fresco y dientes limpios. Reduce tártaro y placa.', image: null },
  { id: 'SK-DB25-60',  name: 'Dental Bone 2.5" x 60 uds',             category: 'Snacks', categoryId: 'snacks', price: 148000, stock: 15, description: 'Snack dental comestible y digerible. Aliento fresco y dientes limpios. Reduce tártaro y placa.', image: null },
  { id: 'SK-DB3-1',    name: 'Dental Bone 3" x 1 ud',                 category: 'Snacks', categoryId: 'snacks', price: 5900,   stock: 50, description: 'Snack dental comestible y digerible. Aliento fresco y dientes limpios. Reduce tártaro y placa.', image: null },
  { id: 'SK-DB3-5',    name: 'Dental Bone 3" x 5 uds',                category: 'Snacks', categoryId: 'snacks', price: 22900,  stock: 40, description: 'Snack dental comestible y digerible. Aliento fresco y dientes limpios. Reduce tártaro y placa.', image: null },
  { id: 'SK-DB3-30',   name: 'Dental Bone 3" x 30 uds',               category: 'Snacks', categoryId: 'snacks', price: 88000,  stock: 20, description: 'Snack dental comestible y digerible. Aliento fresco y dientes limpios. Reduce tártaro y placa.', image: null },
  { id: 'SK-DB4-1',    name: 'Dental Bone 4" x 1 ud',                 category: 'Snacks', categoryId: 'snacks', price: 6900,   stock: 50, description: 'Snack dental comestible y digerible. Aliento fresco y dientes limpios. Reduce tártaro y placa.', image: null },
  { id: 'SK-DB4-3',    name: 'Dental Bone 4" x 3 uds',                category: 'Snacks', categoryId: 'snacks', price: 16900,  stock: 40, description: 'Snack dental comestible y digerible. Aliento fresco y dientes limpios. Reduce tártaro y placa.', image: null },
  { id: 'SK-DB4-16',   name: 'Dental Bone 4" x 16 uds',               category: 'Snacks', categoryId: 'snacks', price: 65000,  stock: 20, description: 'Snack dental comestible y digerible. Aliento fresco y dientes limpios. Reduce tártaro y placa.', image: null },
  { id: 'SK-GN3',      name: 'Gnawlers Chicken Flavor 3" x 2 uds',    category: 'Snacks', categoryId: 'snacks', price: 9900,   stock: 40, description: 'Hueso masticable sabor a pollo natural. 100% natural y digerible. Reduce sarro y placa dental.', image: null },
  { id: 'SK-GN45',     name: 'Gnawlers Chicken Flavor 4.5" x 2 uds',  category: 'Snacks', categoryId: 'snacks', price: 12900,  stock: 35, description: 'Hueso masticable sabor a pollo natural. 100% natural y digerible. Reduce sarro y placa dental.', image: null },
  { id: 'SK-GN8',      name: 'Gnawlers Chicken Flavor 8" x 1 ud',     category: 'Snacks', categoryId: 'snacks', price: 14900,  stock: 30, description: 'Hueso masticable sabor a pollo natural. 100% natural y digerible. Reduce sarro y placa dental.', image: null },
  { id: 'SK-SARES',    name: 'Snack Apetit Res y Perejil 200g',        category: 'Snacks', categoryId: 'snacks', price: 12900,  stock: 25, description: 'Snack horneado con perejil natural y sabor a res. Mejora el aliento. La clorofila neutraliza olores.', image: null },
  { id: 'SK-SAROL',    name: 'Snack Apetit Rollitos 150g',             category: 'Snacks', categoryId: 'snacks', price: 10900,  stock: 25, description: 'Textura crocante que ayuda a limpiar los dientes y ejercitar la mandíbula. 100% horneado natural.', image: null },
  { id: 'SK-SAPO',     name: 'Snack Apetit Pollo y Zanahoria 200g',   category: 'Snacks', categoryId: 'snacks', price: 12900,  stock: 25, description: 'Snack horneado con pollo y zanahoria natural. Mejora la salud de la piel y brillo del pelo.', image: null },
  { id: 'SK-SAMC',     name: 'Snack Apetit Multicereal 200g',          category: 'Snacks', categoryId: 'snacks', price: 11900,  stock: 25, description: 'Ideal para vegetarianos o alérgicos a la proteína animal. Controla el sobrepeso. Con cereales.', image: null },
  { id: 'SK-SAES',     name: 'Snack Apetit Espirales 150g',            category: 'Snacks', categoryId: 'snacks', price: 10900,  stock: 25, description: 'Con fibra natural y sabor a caramelo. Opción saludable y divertida para mascotas juguetonas.', image: null },
  { id: 'SK-PAZ250',   name: 'Galletas Pazzy Bolsa 250g',              category: 'Snacks', categoryId: 'snacks', price: 13900,  stock: 25, description: 'Galletas horneadas 100% naturales. Avena, harina integral, hígados de pollo, huevos y panela.', image: null },
  { id: 'SK-PAZ500MX', name: 'Galletas Pazzy Maxi Caja 500g',          category: 'Snacks', categoryId: 'snacks', price: 24900,  stock: 20, description: 'Galletas horneadas 100% naturales. ~38 galletas grandes. Ideales para razas grandes.', image: null },
  { id: 'SK-PAZ500MN', name: 'Galletas Pazzy Mini Caja 500g',          category: 'Snacks', categoryId: 'snacks', price: 22900,  stock: 20, description: 'Galletas horneadas 100% naturales. ~85 galletas mini. Para perros medianos y pequeños.', image: null },
  { id: 'SK-RANCH',    name: 'Snack Natural Carne Enrollada Ranchero', category: 'Snacks', categoryId: 'snacks', price: 28900,  stock: 20, description: 'Snack natural de carne enrollada. Ideal para adiestramiento de cachorros y adultos.', image: null },
  { id: 'SK-HIGAD',    name: 'Snack Natural Galletas de Hígado 500g',  category: 'Snacks', categoryId: 'snacks', price: 32000,  stock: 15, description: 'Galletas de hígado en tarro. Ideales para adiestramiento. Presentación en tarro para mayor frescura.', image: null },
  { id: 'SK-ORRES',    name: 'Oreja de Res Natural x 1 ud',            category: 'Snacks', categoryId: 'snacks', price: 7900,   stock: 30, description: 'Snack natural 100% deshidratado. Oreja de res. Alto contenido proteico. Natural y sin aditivos.', image: null },
  { id: 'SK-ORCERD',   name: 'Oreja de Cerdo Natural x 1 ud',          category: 'Snacks', categoryId: 'snacks', price: 6900,   stock: 30, description: 'Snack natural 100% deshidratado. Oreja de cerdo. Alto contenido proteico. Natural y sin aditivos.', image: null },
  { id: 'SK-PULMO',    name: 'Pulmón de Res Natural 60g',              category: 'Snacks', categoryId: 'snacks', price: 8900,   stock: 25, description: 'Snack natural 100% deshidratado. Pulmón de res. Alto contenido proteico. Ideal para premiar.', image: null },
  { id: 'SK-HURES',    name: 'Hueso de Res Natural x 1 ud',            category: 'Snacks', categoryId: 'snacks', price: 8500,   stock: 25, description: 'Hueso natural de res para masticar. Limpia los dientes y ejercita los músculos.', image: null },
  { id: 'SK-HUCER',    name: 'Hueso de Cerdo Natural x 1 ud',          category: 'Snacks', categoryId: 'snacks', price: 7500,   stock: 25, description: 'Hueso natural de cerdo para masticar. Limpia los dientes y ejercita los músculos.', image: null },
]

// ─── JUGUETES ────────────────────────────────────────────────────────────────
const JUGUETES_DATA = [
  { id: 'JU-CHK-UB-S',  name: 'Chuckit Ultra Ball S',                category: 'Juguetes', categoryId: 'juguetes', price: 32000, stock: 15, description: 'Pelota de goma natural ultra resistente. Alta rebotabilidad. Compatible con lanzador Chuckit.', image: null },
  { id: 'JU-CHK-UB-M',  name: 'Chuckit Ultra Ball M',                category: 'Juguetes', categoryId: 'juguetes', price: 38000, stock: 12, description: 'Pelota de goma natural ultra resistente. Alta rebotabilidad. Compatible con lanzador Chuckit.', image: null },
  { id: 'JU-CHK-LAN',   name: 'Chuckit Sport Lanzador de Pelotas',   category: 'Juguetes', categoryId: 'juguetes', price: 42000, stock: 12, description: 'Lanzador de pelotas para mayor alcance sin agacharse. Compatible con pelotas Chuckit. Mango ergonómico.', image: null },
  { id: 'JU-CHK-IND',   name: 'Chuckit Indoor Roller',               category: 'Juguetes', categoryId: 'juguetes', price: 28000, stock: 15, description: 'Diseñada para juego en interiores. Rueda en vez de rebotar. No daña muebles ni paredes.', image: null },
  { id: 'JU-VIN-S',     name: 'Juguete Vinilo con Sonido S',         category: 'Juguetes', categoryId: 'juguetes', price: 15900, stock: 20, description: 'Juguete de vinilo resistente con sonido. Estimula el juego activo. No tóxico.', image: null },
  { id: 'JU-VIN-M',     name: 'Juguete Vinilo con Sonido M',         category: 'Juguetes', categoryId: 'juguetes', price: 18900, stock: 20, description: 'Juguete de vinilo resistente con sonido. Estimula el juego activo. No tóxico.', image: null },
  { id: 'JU-LAT-S',     name: 'Juguete Látex con Sonido S',          category: 'Juguetes', categoryId: 'juguetes', price: 12900, stock: 20, description: 'Juguete de látex suave con sonido. Ideal para cachorros. Material suave para encías sensibles.', image: null },
  { id: 'JU-PEL-S',     name: 'Juguete Peluche S (10-14 cm)',        category: 'Juguetes', categoryId: 'juguetes', price: 15900, stock: 20, description: 'Peluche suave relleno con algodón. Ideal para cachorros y mascotas que gustan de compañía.', image: null },
  { id: 'JU-PEL-M',     name: 'Juguete Peluche M (20 cm)',           category: 'Juguetes', categoryId: 'juguetes', price: 19900, stock: 15, description: 'Peluche suave relleno con algodón. Ideal para cachorros y mascotas que gustan de compañía.', image: null },
  { id: 'JU-FID-S',     name: 'Juguete Masticable FIDO S Nylon',     category: 'Juguetes', categoryId: 'juguetes', price: 22900, stock: 15, description: 'Nylon ultra resistente para masticadores fuertes. Satisface instinto de morder. Limpia los dientes.', image: null },
  { id: 'JU-FID-M',     name: 'Juguete Masticable FIDO M Nylon',     category: 'Juguetes', categoryId: 'juguetes', price: 28900, stock: 15, description: 'Nylon ultra resistente para masticadores fuertes. Satisface instinto de morder. Limpia los dientes.', image: null },
  { id: 'JU-GAT-VAR',   name: 'Varita para Gatos con Plumas',        category: 'Juguetes', categoryId: 'juguetes', price: 18900, stock: 20, description: 'Varita con plumas y accesorios intercambiables. Estimula instinto cazador. Juego interactivo dueño-gato.', image: null },
  { id: 'JU-GAT-CAT',   name: 'Catnip Hierba Gatera 30g',            category: 'Juguetes', categoryId: 'juguetes', price: 12900, stock: 20, description: 'Hierba gatera 100% natural. Estimulación y euforia en gatos. Completamente segura e inocua.', image: null },
  { id: 'JU-RAS-S',     name: 'Rascador Cartón Corrugado S + Catnip',category: 'Juguetes', categoryId: 'juguetes', price: 15900, stock: 15, description: 'Cartón corrugado resistente para raspar y morder. Incluye catnip. Protege los muebles del hogar.', image: null },
]

// ─── ASEO Y CUIDADO ──────────────────────────────────────────────────────────
const ASEO_DATA = [
  { id: 'AC-RC-LAV5',    name: 'Arena Royal Cat Lavanda 5 Kg',              category: 'Aseo y Cuidado', categoryId: 'aseo', price: 22900,  stock: 20, description: 'Bentonita 100% natural y no tóxica. Control de olores de larga duración. Fragancia lavanda natural.', image: null },
  { id: 'AC-RC-LAV10',   name: 'Arena Royal Cat Lavanda 10 Kg',             category: 'Aseo y Cuidado', categoryId: 'aseo', price: 38900,  stock: 15, description: 'Bentonita 100% natural y no tóxica. Control de olores de larga duración. Fragancia lavanda natural.', image: null },
  { id: 'AC-NC-4',       name: 'Arena Neoclean Tradicional 4.15 Kg',        category: 'Aseo y Cuidado', categoryId: 'aseo', price: 18900,  stock: 20, description: 'Bentonita de sodio 100%. Superabsorbente. Encapsula líquidos fácilmente. No contiene tóxicos.', image: null },
  { id: 'AC-ML-4T',      name: 'Arena Mimi Litter Sílica 4 Lb Tarro',      category: 'Aseo y Cuidado', categoryId: 'aseo', price: 32900,  stock: 15, description: 'Sílica de última generación. Millones de microporos absorben humedad y malos olores. Biodegradable.', image: null },
  { id: 'AC-ECO-TFU',    name: 'Arena Eco Clean Tofu Cat Litter 2.85 Kg',  category: 'Aseo y Cuidado', categoryId: 'aseo', price: 28900,  stock: 15, description: 'Tofu biodegradable. Microporos absorbentes. Elimina humedad y malos olores. Amigable con el medio ambiente.', image: null },
  { id: 'AC-SV-NJU',     name: 'Savic Sanitario Nestor Jumbo 66.5x48.5cm', category: 'Aseo y Cuidado', categoryId: 'aseo', price: 92000,  stock: 8,  description: 'Arenero cubierto extra grande para razas grandes. Puerta plegable fácil limpieza. Filtro carbón activado.', image: null },
  { id: 'AC-SV-OSC',     name: 'Savic Sanitario Oscar 50x37x39cm',          category: 'Aseo y Cuidado', categoryId: 'aseo', price: 58000,  stock: 10, description: 'Arenero cubierto desmontable. Puerta plegable extraíble. Filtro carbón integrado. Montaje en segundos.', image: null },
  { id: 'AC-PM-GIA',     name: 'Petmate Giant Litter Pan 88.1x50.1cm',      category: 'Aseo y Cuidado', categoryId: 'aseo', price: 68000,  stock: 8,  description: 'Bandeja extra grande de laterales altos. Evita dispersión de arena. Alta resistencia a manchas y olores.', image: null },
  { id: 'AC-HP-TOA60',   name: 'Toallas Entrenadoras Hushpet 60x45cm',      category: 'Aseo y Cuidado', categoryId: 'aseo', price: 12900,  stock: 25, description: 'Tecnología polímeros 100% más absorbentes. 6 capas de protección. Antibacteriano. Biodegradable.', image: null },
  { id: 'AC-HP-PAN-XS',  name: 'Pañales Desechables Hushpet XXS',           category: 'Aseo y Cuidado', categoryId: 'aseo', price: 14900,  stock: 20, description: 'Para hembras en calor, incontinencia, cachorros o viajes. Indicador de humedad. Barrera anti-fugas.', image: null },
  { id: 'AC-HP-PAN-S',   name: 'Pañales Desechables Hushpet S',             category: 'Aseo y Cuidado', categoryId: 'aseo', price: 16900,  stock: 20, description: 'Para hembras en calor, incontinencia, cachorros o viajes. Indicador de humedad. Barrera anti-fugas.', image: null },
  { id: 'AC-HP-PAN-M',   name: 'Pañales Desechables Hushpet M',             category: 'Aseo y Cuidado', categoryId: 'aseo', price: 18900,  stock: 15, description: 'Para hembras en calor, incontinencia, cachorros o viajes. Indicador de humedad. Barrera anti-fugas.', image: null },
  { id: 'AC-HP-PANO',    name: 'Paños Húmedos Antibacterial Floral 80 pc',  category: 'Aseo y Cuidado', categoryId: 'aseo', price: 12900,  stock: 20, description: 'Toallas húmedas con antibacterial. Aroma floral. 80 unidades. Para limpieza rápida y cuidado diario.', image: null },
]

// ─── COLLARES Y TRAILLAS ─────────────────────────────────────────────────────
const COLLARES_DATA = [
  { id: 'CT-RET-XS',       name: 'Traílla Retráctil Runner XS (hasta 8 kg)',    category: 'Collares y Traillas', categoryId: 'collares', price: 28900, stock: 20, description: 'Traílla retráctil con freno seguro. Longitud máxima 3 metros. Para perros hasta 8 kg.', image: null },
  { id: 'CT-RET-S',        name: 'Traílla Retráctil Runner S (hasta 15 kg)',    category: 'Collares y Traillas', categoryId: 'collares', price: 35900, stock: 15, description: 'Traílla retráctil con freno seguro. Longitud máxima 4 metros. Para perros hasta 15 kg.', image: null },
  { id: 'CT-RET-M',        name: 'Traílla Retráctil Runner M (hasta 20 kg)',    category: 'Collares y Traillas', categoryId: 'collares', price: 42900, stock: 12, description: 'Traílla retráctil con freno seguro. Longitud máxima 5 metros. Para perros hasta 20 kg.', image: null },
  { id: 'CT-RET-L',        name: 'Traílla Retráctil Runner L (hasta 50 kg)',    category: 'Collares y Traillas', categoryId: 'collares', price: 55900, stock: 10, description: 'Traílla retráctil con freno seguro. Longitud máxima 5 metros. Para perros hasta 50 kg.', image: null },
  { id: 'CT-NEO-COL-L',    name: 'Collar Classic Neopreno Azul L',              category: 'Collares y Traillas', categoryId: 'collares', price: 32000, stock: 15, description: 'Collar reflectivo en neopreno. Resistente y cómodo. Material suave que no irrita la piel.', image: null },
  { id: 'CT-NEO-COL-M',    name: 'Collar Classic Neopreno Azul M',              category: 'Collares y Traillas', categoryId: 'collares', price: 28000, stock: 15, description: 'Collar reflectivo en neopreno. Resistente y cómodo. Material suave que no irrita la piel.', image: null },
  { id: 'CT-NEO-TRA-L',    name: 'Traílla Classic Neopreno Azul L (152 cm)',    category: 'Collares y Traillas', categoryId: 'collares', price: 35000, stock: 15, description: 'Traílla fija reflectiva en neopreno. 152 cm de largo. Reflectivo para mayor visibilidad nocturna.', image: null },
  { id: 'CT-NEO-ARNES-L',  name: 'Arnés Classic Neopreno Azul L',               category: 'Collares y Traillas', categoryId: 'collares', price: 45000, stock: 12, description: 'Arnés reflectivo en neopreno. Distribuye presión uniformemente. No presiona tráquea.', image: null },
  { id: 'CT-TEF-COL-S',    name: 'Collar Elegance Teflón Azul S',               category: 'Collares y Traillas', categoryId: 'collares', price: 35000, stock: 12, description: 'Collar en teflón. Resistente al agua. Fácil de limpiar. Muy duradero. Hebilla metálica segura.', image: null },
  { id: 'CT-TEF-ARNES-M',  name: 'Arnés Elegance Teflón Azul M',                category: 'Collares y Traillas', categoryId: 'collares', price: 48000, stock: 10, description: 'Arnés en teflón. Resistente al agua. Fácil de limpiar. Distribución uniforme de presión.', image: null },
  { id: 'CT-NYL-COL-S',    name: 'Collar Nylon Ajustable S',                    category: 'Collares y Traillas', categoryId: 'collares', price: 22000, stock: 20, description: 'Collar fabricado en nylon de alta calidad. Capas dobles. Alta resistencia. Completamente ajustable.', image: null },
  { id: 'CT-MET-25',       name: 'Collar Metálico de Ahogo 0.25cm x 50cm',     category: 'Collares y Traillas', categoryId: 'collares', price: 25000, stock: 15, description: 'Cadena metálica alta calidad soldada con argón. Cromada. No se empaña ni oxida.', image: null },
  { id: 'CT-LAZ-M',        name: 'Collar en Lazo Slip M',                       category: 'Collares y Traillas', categoryId: 'collares', price: 15000, stock: 20, description: 'Collar tipo slip para entrenamiento. Ajuste automático al cuello. Material nylon resistente.', image: null },
]

// ─── COMEDEROS Y BEBEDEROS ───────────────────────────────────────────────────
const COMEDEROS_DATA = [
  { id: 'CB-SV-CEN025', name: 'Savic Comedero Cena Cachorros 0.25 Lt',     category: 'Comederos y Bebederos', categoryId: 'comederos', price: 18900,  stock: 20, description: 'Comedero plástico para cachorros. Gomas en la base antideslizante. Fácil de limpiar.', image: null },
  { id: 'CB-SV-CEN175', name: 'Savic Comedero Cena 1.75 Lt',               category: 'Comederos y Bebederos', categoryId: 'comederos', price: 28900,  stock: 15, description: 'Comedero plástico antideslizante para mascotas. Gomas en base. Muy fácil de limpiar. Duradero.', image: null },
  { id: 'CB-SV-DEL',    name: 'Savic Comedero Delice 3 - 1.2 Lt',          category: 'Comederos y Bebederos', categoryId: 'comederos', price: 28900,  stock: 15, description: 'Comedero plástico premium con goma antideslizante integrada en la base. Alta calidad.', image: null },
  { id: 'CB-SV-PB',     name: 'Savic Comedero Perfil Bajo',                 category: 'Comederos y Bebederos', categoryId: 'comederos', price: 24900,  stock: 12, description: 'Diseño de perfil bajo con surcos. Ideal para perros de hocico corto (bulldog) y gatos nariz corta.', image: null },
  { id: 'CB-SV-ENI20',  name: 'Savic Comedero Interactivo Enigma 20',       category: 'Comederos y Bebederos', categoryId: 'comederos', price: 75000,  stock: 8,  description: 'Evita que la mascota engulla comida rápido. Reduce dilatación estomacal. Estimula concentración.', image: null },
  { id: 'CB-PM-FF',     name: 'Petmate Fresh Flow Bebedero Fuente 3.2 Lt',  category: 'Comederos y Bebederos', categoryId: 'comederos', price: 115000, stock: 10, description: 'Fuente eléctrica con agua filtrada en circulación. Filtro de carbón elimina olores.', image: null },
  { id: 'CB-PM-GW36',   name: 'Petmate Gravity Waterer 3.6 Lt',             category: 'Comederos y Bebederos', categoryId: 'comederos', price: 58000,  stock: 12, description: 'Bebedero automático por gravedad. Botella transparente para ver nivel del agua.', image: null },
  { id: 'CB-PM-GF3',    name: 'Petmate Gravity Feeder Comedero 3 Lb',       category: 'Comederos y Bebederos', categoryId: 'comederos', price: 42000,  stock: 12, description: 'Alimentador automático por gravedad. Carga superior fácil. Botella transparente.', image: null },
  { id: 'CB-LX-532',    name: 'Lixit Botella Agua Boquilla Ancha 532ml',   category: 'Comederos y Bebederos', categoryId: 'comederos', price: 22900,  stock: 15, description: 'Botella para perros de razas pequeñas. Sistema reducción de goteo. Tubo acero inox.', image: null },
  { id: 'CB-LX-AG',     name: 'Lixit Botella Antigoteo 1.3 Lt Microban',   category: 'Comederos y Bebederos', categoryId: 'comederos', price: 28900,  stock: 12, description: 'Tratada con Microban para prevenir crecimiento de bacterias. Sistema reducción de goteo patentado.', image: null },
  { id: 'CB-VA-FLR',    name: 'Fuente Agua Automática Tipo Flor 2.4 Lt',   category: 'Comederos y Bebederos', categoryId: 'comederos', price: 85000,  stock: 10, description: 'Agua limpia, filtrada y oxigenada. Diseño en forma de fuente tipo flor. Anti-derrame. Antipolvo.', image: null },
  { id: 'CB-PM-PR',     name: 'Petmate Portion Right Comedero Programable', category: 'Comederos y Bebederos', categoryId: 'comederos', price: 165000, stock: 8,  description: 'Pantalla LCD. Programable: 1, 2 o 3 comidas por día. Recipiente transparente. Tazón desmontable.', image: null },
]

// ─── TRANSPORTE ──────────────────────────────────────────────────────────────
const TRANSPORTE_DATA = [
  { id: 'TR-PM-VKU200', name: 'Huacal Vari Kennel Ultra #200 (hasta 15 kg)',   category: 'Transporte', categoryId: 'transporte', price: 185000, stock: 8,  description: 'Ideal para entrenar y viajar. Plástico alta resistencia. Ventilación 360°. Cumple requisitos aerolíneas.', image: null },
  { id: 'TR-PM-VKU300', name: 'Huacal Vari Kennel Ultra #300 (hasta 25 kg)',   category: 'Transporte', categoryId: 'transporte', price: 225000, stock: 6,  description: 'Ideal para entrenar y viajar. Plástico alta resistencia. Ventilación 360°. Cumple requisitos aerolíneas.', image: null },
  { id: 'TR-PM-VKU400', name: 'Huacal Vari Kennel Ultra #400 (hasta 35 kg)',   category: 'Transporte', categoryId: 'transporte', price: 285000, stock: 5,  description: 'Ideal para entrenar y viajar. Plástico alta resistencia. Ventilación 360°. Cumple requisitos aerolíneas.', image: null },
  { id: 'TR-PM-VKF200', name: 'Huacal Vari Kennel Fashion #200 (hasta 15 kg)', category: 'Transporte', categoryId: 'transporte', price: 192000, stock: 6,  description: 'Viaja con estilo. Plástico ecológico alta resistencia. Ranura para cinturón de seguridad.', image: null },
  { id: 'TR-SV-TRO2',   name: 'Huacal Trotter 2 Savic (hasta 7 kg)',           category: 'Transporte', categoryId: 'transporte', price: 128000, stock: 8,  description: 'Para gatos y perros pequeños. Ranuras de ventilación. Máximo confort. Cumple normas IATA.', image: null },
  { id: 'TR-SV-DIS',    name: 'Huacal Discovery Savic (hasta 5 kg)',            category: 'Transporte', categoryId: 'transporte', price: 98000,  stock: 10, description: 'Caja de transporte para animales pequeños, gatos y cachorros. Ranuras de ventilación óptima.', image: null },
  { id: 'TR-JRP-BT',    name: 'Bolso Transportador Jarapets 46x26x27 cm',      category: 'Transporte', categoryId: 'transporte', price: 85000,  stock: 12, description: 'Diseño exclusivo. Ventilación adecuada. Bolsillo para aperitivos. Cumple regulaciones aerolíneas.', image: null },
  { id: 'TR-JRP-MO',    name: 'Morral + Bolso Transportador con Ruedas',        category: 'Transporte', categoryId: 'transporte', price: 145000, stock: 8,  description: 'Morral y bolso combinado con ruedas y manija graduable. Cargaderas para usar como morral.', image: null },
  { id: 'TR-PM-NAV',    name: 'Petmate Navigator Jaula Metálica (hasta 41 kg)',  category: 'Transporte', categoryId: 'transporte', price: 245000, stock: 5,  description: 'Jaula perfecta para razas grandes. Construcción metálica resistente. Ideal para entrenamiento y viaje.', image: null },
  { id: 'TR-JRP-REF',   name: 'Refugio Portable Jarapets (hasta 10 kg)',         category: 'Transporte', categoryId: 'transporte', price: 75000,  stock: 10, description: 'Se instala en segundos. Plegable en funda de transporte. Lona resistente al agua. Ventanas en 4 lados.', image: null },
  { id: 'TR-PM-FORRO',  name: 'Forro Protector Silla de Carro',                  category: 'Transporte', categoryId: 'transporte', price: 45000,  stock: 15, description: 'Protector impermeable para asiento trasero de carro. Evita suciedad y pelo. Fácil instalación.', image: null },
]

// ─── CATEGORÍAS ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'food',       name: 'Alimentos' },
  { id: 'snacks',     name: 'Snacks' },
  { id: 'juguetes',   name: 'Juguetes' },
  { id: 'aseo',       name: 'Aseo y Cuidado' },
  { id: 'collares',   name: 'Collares y Traillas' },
  { id: 'comederos',  name: 'Comederos y Bebederos' },
  { id: 'transporte', name: 'Transporte' },
]

// Todos los productos juntos (excepto alimentos, que tienen su endpoint propio)
const ALL_PRODUCTS = [
  ...SNACKS_DATA,
  ...JUGUETES_DATA,
  ...ASEO_DATA,
  ...COLLARES_DATA,
  ...COMEDEROS_DATA,
  ...TRANSPORTE_DATA,
]

// ─── SERVICIO ────────────────────────────────────────────────────────────────
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

export const productService = {
  getAll: async (params = {}) => {
    await delay()
    let results = [...ALL_PRODUCTS]
    if (params.category) results = results.filter((p) => p.categoryId === params.category)
    if (params.search)   results = results.filter((p) => p.name.toLowerCase().includes(params.search.toLowerCase()))
    return results
  },

  getById: async (id) => {
    await delay()
    const all = [...FOOD_DATA, ...ALL_PRODUCTS]
    const product = all.find((p) => p.id === id)
    if (!product) throw new Error('Producto no encontrado')
    return product
  },

  create: async (data) => {
    await delay()
    const newProduct = { ...data, id: `custom-${Date.now()}` }
    ALL_PRODUCTS.push(newProduct)
    return newProduct
  },

  update: async (id, data) => {
    await delay()
    const idx = ALL_PRODUCTS.findIndex((p) => p.id === id)
    if (idx !== -1) ALL_PRODUCTS[idx] = { ...ALL_PRODUCTS[idx], ...data }
    return ALL_PRODUCTS[idx]
  },

  remove: async (id) => {
    await delay()
    const idx = ALL_PRODUCTS.findIndex((p) => p.id === id)
    if (idx !== -1) ALL_PRODUCTS.splice(idx, 1)
    return { success: true }
  },

  getAllFood: async (params = {}) => {
    await delay()
    let results = [...FOOD_DATA]
    if (params.search) results = results.filter((f) => f.name.toLowerCase().includes(params.search.toLowerCase()))
    return results
  },

  getFoodById: async (id) => {
    await delay()
    const food = FOOD_DATA.find((f) => f.id === id)
    if (!food) throw new Error('Alimento no encontrado')
    return food
  },

  getCategories: async () => {
    await delay()
    return CATEGORIES
  },
}
