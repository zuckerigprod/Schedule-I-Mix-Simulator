export interface Product {
  id: string; name: string; basePrice: number; type: string; icon: string; defaultEffects: string[]
}
export interface Ingredient {
  id: string; name: string; price: number; effect: string; icon: string
}
export interface EffectData {
  name: string; displayName: string; tier: number; addBase: number
  mapX: number; mapY: number; description: string; descriptionRu: string
}
export interface Customer {
  id: number; name: string; slug: string; location: string; preferredEffects: string[]; standards: string
}

const products: Product[] = [
  { id:'ogkush', name:'OG Kush', basePrice:35, type:'weed', icon:'ogkush icon (none).png', defaultEffects:['Calming'] },
  { id:'sourdiesel', name:'Sour Diesel', basePrice:35, type:'weed', icon:'sourdiesel icon (none).png', defaultEffects:['Refreshing'] },
  { id:'greencrack', name:'Green Crack', basePrice:35, type:'weed', icon:'greencrack icon (none).png', defaultEffects:['Energizing'] },
  { id:'granddaddypurple', name:'Granddaddy Purple', basePrice:35, type:'weed', icon:'granddaddypurple icon (none).png', defaultEffects:['Sedating'] },
  { id:'meth', name:'Meth', basePrice:70, type:'meth', icon:'meth icon (none).png', defaultEffects:[] },
  { id:'cocaine', name:'Cocaine', basePrice:150, type:'cocaine', icon:'cocaine icon (none).png', defaultEffects:[] },
  { id:'shroom', name:'Shroom', basePrice:65, type:'shroom', icon:'shroom icon (none).png', defaultEffects:[] },
]

const ingredients: Ingredient[] = [
  { id:'cuke', name:'Cuke', price:2, effect:'Energizing', icon:'Cuke_Icon.png' },
  { id:'banana', name:'Banana', price:2, effect:'Gingeritis', icon:'Banana__Icon.png' },
  { id:'paracetamol', name:'Paracetamol', price:3, effect:'Sneaky', icon:'paracetamol_Icon.png' },
  { id:'donut', name:'Donut', price:3, effect:'CalorieDense', icon:'Donut_Icon.png' },
  { id:'viagor', name:'Viagor', price:4, effect:'TropicThunder', icon:'Viagra icon.png' },
  { id:'mouthwash', name:'Mouth Wash', price:4, effect:'Balding', icon:'Mouth wash_Icon.png' },
  { id:'flumedicine', name:'Flu Medicine', price:5, effect:'Sedating', icon:'FluMedicine_Icon.png' },
  { id:'gasoline', name:'Gasoline', price:5, effect:'Toxic', icon:'Gasoline_Icon.png' },
  { id:'energydrink', name:'Energy Drink', price:6, effect:'Athletic', icon:'EnergyDrink__Icon.png' },
  { id:'motoroil', name:'Motor Oil', price:6, effect:'Slippery', icon:'Motor Oil_Icon.png' },
  { id:'megabean', name:'Mega Bean', price:7, effect:'Foggy', icon:'MegaBean__Icon.png' },
  { id:'chili', name:'Chili', price:7, effect:'Spicy', icon:'Chili__Icon.png' },
  { id:'battery', name:'Battery', price:8, effect:'BrightEyed', icon:'Battery__Icon.png' },
  { id:'iodine', name:'Iodine', price:8, effect:'Jennerising', icon:'Iodine_Icon.png' },
  { id:'addy', name:'Addy', price:9, effect:'ThoughtProvoking', icon:'Addy__Icon.png' },
  { id:'horsesemen', name:'Horse Semen', price:9, effect:'LongFaced', icon:'HorseSemen__Icon.png' },
]

const effects: Record<string, EffectData> = {
  Calming:{name:'Calming',displayName:'Calming',tier:1,addBase:0.10,mapX:1.030,mapY:0.020,description:'Induces a slight calmness.',descriptionRu:'Вызывает лёгкое спокойствие.'},
  Euphoric:{name:'Euphoric',displayName:'Euphoric',tier:1,addBase:0.18,mapX:0.000,mapY:1.070,description:'Induces mild euphoria.',descriptionRu:'Вызывает лёгкую эйфорию.'},
  Focused:{name:'Focused',displayName:'Focused',tier:1,addBase:0.16,mapX:-1.040,mapY:0.050,description:'Focuses the mind.',descriptionRu:'Концентрирует разум.'},
  Munchies:{name:'Munchies',displayName:'Munchies',tier:1,addBase:0.12,mapX:0.030,mapY:-1.030,description:'Makes the user hungry.',descriptionRu:'Вызывает голод.'},
  Paranoia:{name:'Paranoia',displayName:'Paranoia',tier:1,addBase:0.00,mapX:-1.160,mapY:-1.060,description:'Induces paranoia.',descriptionRu:'Вызывает паранойю.'},
  Refreshing:{name:'Refreshing',displayName:'Refreshing',tier:1,addBase:0.14,mapX:-1.130,mapY:1.140,description:'Slightly energizes.',descriptionRu:'Слегка бодрит.'},
  Smelly:{name:'Smelly',displayName:'Smelly',tier:1,addBase:0.00,mapX:1.270,mapY:-1.120,description:'Unbearably smelly.',descriptionRu:'Ужасная вонь.'},
  CalorieDense:{name:'CalorieDense',displayName:'Calorie-Dense',tier:2,addBase:0.28,mapX:1.110,mapY:1.150,description:'Immediate weight gain.',descriptionRu:'Мгновенный набор веса.'},
  Disorienting:{name:'Disorienting',displayName:'Disorienting',tier:2,addBase:0.00,mapX:-0.590,mapY:2.060,description:'Unpredictable movement.',descriptionRu:'Дезориентация.'},
  Energizing:{name:'Energizing',displayName:'Energizing',tier:2,addBase:0.22,mapX:-2.140,mapY:0.570,description:'Increases energy.',descriptionRu:'Повышает энергию.'},
  Gingeritis:{name:'Gingeritis',displayName:'Gingeritis',tier:2,addBase:0.20,mapX:-0.592,mapY:-2.000,description:'Turns user ginger.',descriptionRu:'Превращает в рыжего.'},
  Sedating:{name:'Sedating',displayName:'Sedating',tier:2,addBase:0.26,mapX:2.100,mapY:-0.400,description:'Heavy sleepiness.',descriptionRu:'Сильная сонливость.'},
  Sneaky:{name:'Sneaky',displayName:'Sneaky',tier:2,addBase:0.24,mapX:0.770,mapY:-1.970,description:'Silent footsteps.',descriptionRu:'Бесшумные шаги.'},
  Toxic:{name:'Toxic',displayName:'Toxic',tier:2,addBase:0.00,mapX:2.210,mapY:0.690,description:'Liver damage, vomiting.',descriptionRu:'Повреждает печень, рвота.'},
  Athletic:{name:'Athletic',displayName:'Athletic',tier:3,addBase:0.32,mapX:-2.230,mapY:-0.580,description:'Can only run.',descriptionRu:'Может только бегать.'},
  Balding:{name:'Balding',displayName:'Balding',tier:3,addBase:0.30,mapX:-0.140,mapY:-2.990,description:'Causes balding.',descriptionRu:'Вызывает облысение.'},
  Foggy:{name:'Foggy',displayName:'Foggy',tier:3,addBase:0.36,mapX:0.510,mapY:2.220,description:'Cloud of fog.',descriptionRu:'Облако тумана.'},
  Laxative:{name:'Laxative',displayName:'Laxative',tier:3,addBase:0.00,mapX:-2.070,mapY:1.530,description:'Uncontrollable diarrhea.',descriptionRu:'Неконтролируемая диарея.'},
  Seizure:{name:'Seizure',displayName:'Seizure-Inducing',tier:3,addBase:0.00,mapX:-1.670,mapY:-2.090,description:'Instant seizure.',descriptionRu:'Мгновенный припадок.'},
  Slippery:{name:'Slippery',displayName:'Slippery',tier:3,addBase:0.34,mapX:2.040,mapY:-1.660,description:'Reduces traction.',descriptionRu:'Скользкость.'},
  Spicy:{name:'Spicy',displayName:'Spicy',tier:3,addBase:0.38,mapX:1.990,mapY:1.750,description:'Eyes turn blue.',descriptionRu:'Глаза голубеют.'},
  BrightEyed:{name:'BrightEyed',displayName:'Bright-Eyed',tier:4,addBase:0.40,mapX:3.030,mapY:-0.040,description:'Eyes emit light.',descriptionRu:'Глаза светятся.'},
  Glowing:{name:'Glowing',displayName:'Glowing',tier:4,addBase:0.48,mapX:1.400,mapY:2.590,description:'Bioluminescence.',descriptionRu:'Биолюминесценция.'},
  Jennerising:{name:'Jennerising',displayName:'Jennerising',tier:4,addBase:0.42,mapX:-1.450,mapY:-3.050,description:'Inverts gender.',descriptionRu:'Инвертирует пол.'},
  Lethal:{name:'Lethal',displayName:'Lethal',tier:4,addBase:0.00,mapX:-3.200,mapY:0.060,description:'Total organ failure.',descriptionRu:'Отказ всех органов.'},
  Schizophrenic:{name:'Schizophrenic',displayName:'Schizophrenic',tier:4,addBase:0.00,mapX:2.270,mapY:-2.710,description:'Hallucinations.',descriptionRu:'Галлюцинации.'},
  ThoughtProvoking:{name:'ThoughtProvoking',displayName:'Thought-Provoking',tier:4,addBase:0.44,mapX:-2.620,mapY:-1.540,description:'Head size increases.',descriptionRu:'Голова увеличивается.'},
  TropicThunder:{name:'TropicThunder',displayName:'Tropic Thunder',tier:4,addBase:0.46,mapX:3.000,mapY:-1.130,description:'Inverts skin color.',descriptionRu:'Инвертирует цвет кожи.'},
  AntiGravity:{name:'AntiGravity',displayName:'Anti-Gravity',tier:5,addBase:0.54,mapX:0.960,mapY:-2.960,description:'Weakens gravity.',descriptionRu:'Ослабляет гравитацию.'},
  Cyclopean:{name:'Cyclopean',displayName:'Cyclopean',tier:5,addBase:0.56,mapX:-1.510,mapY:2.470,description:'Merges eyes into one.',descriptionRu:'Глаза сливаются в один.'},
  Electrifying:{name:'Electrifying',displayName:'Electrifying',tier:5,addBase:0.50,mapX:-3.050,mapY:1.310,description:'Arcs of electricity.',descriptionRu:'Дуги электричества.'},
  Explosive:{name:'Explosive',displayName:'Explosive',tier:5,addBase:0.00,mapX:2.380,mapY:2.600,description:'User explodes.',descriptionRu:'Взрыв.'},
  LongFaced:{name:'LongFaced',displayName:'Long-Faced',tier:5,addBase:0.52,mapX:-0.200,mapY:2.930,description:'Head and neck increase.',descriptionRu:'Голова и шея увеличиваются.'},
  Shrinking:{name:'Shrinking',displayName:'Shrinking',tier:5,addBase:0.60,mapX:-3.260,mapY:-0.890,description:'Shrinks the user.',descriptionRu:'Уменьшает.'},
  Zombifying:{name:'Zombifying',displayName:'Zombifying',tier:5,addBase:0.58,mapX:2.960,mapY:1.170,description:'Turns into a zombie.',descriptionRu:'Превращает в зомби.'},
}

const customers: Customer[] = [
  {id:1,name:"Alison Knight",slug:"alison-knight",location:"Suburbia",preferredEffects:[],standards:"High"},
  {id:2,name:"Anna Chesterfield",slug:"anna-chesterfield",location:"Docks",preferredEffects:["Refreshing","Tropic Thunder","Toxic"],standards:"Moderate"},
  {id:3,name:"Austin Steiner",slug:"austin-steiner",location:"Northtown",preferredEffects:["Calorie-Dense","Euphoric","Munchies"],standards:"Low"},
  {id:4,name:"Beth Penn",slug:"beth-penn",location:"Northtown",preferredEffects:["Schizophrenic","Lethal","Seizure-Inducing"],standards:"Low"},
  {id:5,name:"Billy Kramer",slug:"billy-kramer",location:"Docks",preferredEffects:["Spicy","Schizophrenic","Long-Faced"],standards:"Moderate"},
  {id:6,name:"Carl Bundy",slug:"carl-bundy",location:"Suburbia",preferredEffects:["Glowing","Athletic","Disorienting"],standards:"High"},
  {id:7,name:"Charles Rowland",slug:"charles-rowland",location:"Westville",preferredEffects:["Sedating","Disorienting","Foggy"],standards:"Low"},
  {id:8,name:"Chloe Bowers",slug:"chloe-bowers",location:"Northtown",preferredEffects:["Euphoric","Shrinking","Munchies"],standards:"Low"},
  {id:9,name:"Chris Sullivan",slug:"chris-sullivan",location:"Suburbia",preferredEffects:["Sneaky","Euphoric","Electrifying"],standards:"High"},
  {id:10,name:"Cranky Frank",slug:"cranky-frank",location:"Docks",preferredEffects:["Laxative","Toxic","Tropic Thunder"],standards:"Moderate"},
  {id:11,name:"Dean Webster",slug:"dean-webster",location:"Westville",preferredEffects:["Glowing","Laxative","Spicy"],standards:"Low"},
  {id:12,name:"Dennis Kennedy",slug:"dennis-kennedy",location:"Suburbia",preferredEffects:["Athletic","Focused","Bright-Eyed"],standards:"High"},
  {id:13,name:"Donna Martin",slug:"donna-martin",location:"Northtown",preferredEffects:["Refreshing","Lethal","Munchies"],standards:"Low"},
  {id:14,name:"Doris Lubbin",slug:"doris-lubbin",location:"Westville",preferredEffects:["Spicy","Tropic Thunder","Balding"],standards:"Low"},
  {id:15,name:"Elizabeth Homley",slug:"elizabeth-homley",location:"Downtown",preferredEffects:["Sedating","Tropic Thunder","Toxic"],standards:"Moderate"},
  {id:16,name:"Eugene Buckley",slug:"eugene-buckley",location:"Downtown",preferredEffects:["Schizophrenic","Toxic","Calming"],standards:"Moderate"},
  {id:17,name:"Fiona Hancock",slug:"fiona-hancock",location:"Uptown",preferredEffects:["Lethal","Thought-Provoking","Tropic Thunder"],standards:"High"},
  {id:18,name:"Genghis Barn",slug:"genghis-barn",location:"Docks",preferredEffects:["Electrifying","Gingeritis","Athletic"],standards:"Very Low"},
  {id:19,name:"George Greene",slug:"george-greene",location:"Westville",preferredEffects:["Energizing","Focused","Thought-Provoking"],standards:"Low"},
  {id:20,name:"Geraldine Poon",slug:"geraldine-poon",location:"Northtown",preferredEffects:["Balding","Long-Faced","Sedating"],standards:"Very Low"},
  {id:21,name:"Greg Figgle",slug:"greg-figgle",location:"Downtown",preferredEffects:["Euphoric","Tropic Thunder","Toxic"],standards:"Very Low"},
  {id:22,name:"Hank Stevenson",slug:"hank-stevenson",location:"Suburbia",preferredEffects:["Sneaky","Toxic","Schizophrenic"],standards:"High"},
  {id:23,name:"Harold Colt",slug:"harold-colt",location:"Suburbia",preferredEffects:["Foggy","Spicy","Jennerising"],standards:"High"},
  {id:24,name:"Herbert Bleuball",slug:"herbert-bleuball",location:"Uptown",preferredEffects:["Slippery","Foggy","Explosive"],standards:"High"},
  {id:25,name:"Jack Knight",slug:"jack-knight",location:"Suburbia",preferredEffects:["Shrinking","Thought-Provoking","Lethal"],standards:"High"},
  {id:26,name:"Jackie Stevenson",slug:"jackie-stevenson",location:"Suburbia",preferredEffects:[],standards:"High"},
  {id:27,name:"Javier Perez",slug:"javier-perez",location:"Docks",preferredEffects:[],standards:"Moderate"},
  {id:28,name:"Jeff Gilmore",slug:"jeff-gilmore",location:"Downtown",preferredEffects:["Sedating","Long-Faced","Laxative"],standards:"Moderate"},
  {id:29,name:"Jen Heard",slug:"jen-heard",location:"Uptown",preferredEffects:["Disorienting","Energizing","Sneaky"],standards:"High"},
  {id:30,name:"Jennifer Rivera",slug:"jennifer-rivera",location:"Downtown",preferredEffects:["Shrinking","Slippery","Toxic"],standards:"Moderate"},
  {id:31,name:"Jeremy Wilkinson",slug:"jeremy-wilkinson",location:"Suburbia",preferredEffects:["Balding","Slippery","Calorie-Dense"],standards:"High"},
  {id:32,name:"Jerry Montero",slug:"jerry-montero",location:"Westville",preferredEffects:["Gingeritis","Smelly","Thought-Provoking"],standards:"Low"},
  {id:33,name:"Jessi Waters",slug:"jessi-waters",location:"Northtown",preferredEffects:["Energizing","Paranoia","Sneaky"],standards:"Very Low"},
  {id:34,name:"Joyce Ball",slug:"joyce-ball",location:"Westville",preferredEffects:["Euphoric","Thought-Provoking","Calorie-Dense"],standards:"Low"},
  {id:35,name:"Karen Kennedy",slug:"karen-kennedy",location:"Suburbia",preferredEffects:[],standards:"High"},
  {id:36,name:"Kathy Henderson",slug:"kathy-henderson",location:"Northtown",preferredEffects:["Athletic","Energizing","Focused"],standards:"Low"},
  {id:37,name:"Keith Wagner",slug:"keith-wagner",location:"Westville",preferredEffects:["Slippery","Sneaky","Tropic Thunder"],standards:"Very Low"},
  {id:38,name:"Kevin Oakley",slug:"kevin-oakley",location:"Downtown",preferredEffects:[],standards:"Moderate"},
  {id:39,name:"Kim Delaney",slug:"kim-delaney",location:"Westville",preferredEffects:["Shrinking","Jennerising","Focused"],standards:"Low"},
  {id:40,name:"Kyle Cooley",slug:"kyle-cooley",location:"Northtown",preferredEffects:["Calming","Munchies","Smelly"],standards:"Low"},
  {id:41,name:"Lily Turner",slug:"lily-turner",location:"Uptown",preferredEffects:[],standards:"High"},
  {id:42,name:"Lisa Gardener",slug:"lisa-gardener",location:"Docks",preferredEffects:["Laxative","Schizophrenic","Anti-Gravity"],standards:"Moderate"},
  {id:43,name:"Louis Fourier",slug:"louis-fourier",location:"Downtown",preferredEffects:["Shrinking","Seizure-Inducing","Paranoia"],standards:"Moderate"},
  {id:44,name:"Lucy Pennington",slug:"lucy-pennington",location:"Downtown",preferredEffects:["Calorie-Dense","Euphoric","Glowing"],standards:"Moderate"},
  {id:45,name:"Ludwig Meyer",slug:"ludwig-meyer",location:"Northtown",preferredEffects:["Euphoric","Refreshing","Energizing"],standards:"Low"},
  {id:46,name:"Mac Cooper",slug:"mac-cooper",location:"Docks",preferredEffects:["Focused","Spicy","Long-Faced"],standards:"Moderate"},
  {id:47,name:"Marco Barone",slug:"marco-barone",location:"Docks",preferredEffects:["Sneaky","Long-Faced","Refreshing"],standards:"Moderate"},
  {id:48,name:"Meg Cooley",slug:"meg-cooley",location:"Westville",preferredEffects:["Sneaky","Slippery","Thought-Provoking"],standards:"Low"},
  {id:49,name:"Melissa Wood",slug:"melissa-wood",location:"Docks",preferredEffects:["Anti-Gravity","Refreshing","Slippery"],standards:"Moderate"},
  {id:50,name:"Michael Boog",slug:"michael-boog",location:"Uptown",preferredEffects:["Jennerising","Calming","Schizophrenic"],standards:"High"},
  {id:51,name:"Mick Lubbin",slug:"mick-lubbin",location:"Northtown",preferredEffects:["Euphoric","Bright-Eyed","Sneaky"],standards:"Low"},
  {id:52,name:"Mrs. Ming",slug:"mrs-ming",location:"Northtown",preferredEffects:["Gingeritis","Shrinking","Electrifying"],standards:"Low"},
  {id:53,name:"Pearl Moore",slug:"pearl-moore",location:"Uptown",preferredEffects:["Schizophrenic","Gingeritis","Explosive"],standards:"High"},
  {id:54,name:"Peggy Myers",slug:"peggy-myers",location:"Northtown",preferredEffects:["Bright-Eyed","Refreshing","Energizing"],standards:"Low"},
  {id:55,name:"Peter File",slug:"peter-file",location:"Northtown",preferredEffects:["Focused","Refreshing","Sneaky"],standards:"Low"},
  {id:56,name:"Philip Wentworth",slug:"philip-wentworth",location:"Downtown",preferredEffects:["Refreshing","Shrinking","Foggy"],standards:"Moderate"},
  {id:57,name:"Randy Caulfield",slug:"randy-caulfield",location:"Downtown",preferredEffects:[],standards:"Moderate"},
  {id:58,name:"Ray Hoffman",slug:"ray-hoffman",location:"Uptown",preferredEffects:[],standards:"High"},
  {id:59,name:"Sam Thompson",slug:"sam-thompson",location:"Northtown",preferredEffects:["Munchies","Athletic","Smelly"],standards:"Low"},
  {id:60,name:"Tobias Wentworth",slug:"tobias-wentworth",location:"Uptown",preferredEffects:["Lethal","Disorienting","Spicy"],standards:"High"},
  {id:61,name:"Trent Sherman",slug:"trent-sherman",location:"Westville",preferredEffects:["Athletic","Balding","Calorie-Dense"],standards:"Low"},
  {id:62,name:"Walter Cussler",slug:"walter-cussler",location:"Uptown",preferredEffects:["Schizophrenic","Calming","Balding"],standards:"High"},
]

export const tierColors: Record<number, string> = {
  1: '#8bc34a', 2: '#ffeb3b', 3: '#ff9800', 4: '#f44336', 5: '#e040fb',
}

// Resolve display name (like "Calorie-Dense") to internal key (like "CalorieDense")
const displayToKey: Record<string, string> = {}
for (const [key, e] of Object.entries(effects)) {
  displayToKey[e.displayName] = key
  displayToKey[e.name] = key
}
export function resolveEffectKey(displayName: string): string {
  return displayToKey[displayName] || displayName
}

export function getEffectDisplayName(key: string): string {
  return effects[key]?.displayName || key
}

export function useGameData() {
  return { products, ingredients, effects, customers, tierColors, resolveEffectKey, getEffectDisplayName }
}
