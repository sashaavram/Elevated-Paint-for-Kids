// Sticker catalog. Each sticker is [emoji, spoken name, optional sound word].
// Emoji render in full color with the system emoji font (Segoe UI Emoji on Windows).

export const STICKER_CATEGORIES = [
  {
    id: "pets",
    icon: "🐶",
    name: "Pets and farm animals",
    stickers: [
      ["🐶", "dog", "woof woof"], ["🐱", "cat", "meow"], ["🐰", "bunny"], ["🐹", "hamster"],
      ["🐭", "mouse", "squeak"], ["🐮", "cow", "moo"], ["🐷", "pig", "oink oink"], ["🐴", "horse", "neigh"],
      ["🐑", "sheep", "baa"], ["🐐", "goat", "meh eh eh"], ["🐔", "chicken", "cluck cluck"], ["🐤", "chick", "peep peep"],
      ["🦆", "duck", "quack quack"], ["🐓", "rooster", "cock a doodle doo"], ["🦃", "turkey", "gobble gobble"], ["🐕", "puppy", "woof"],
      ["🐈", "kitty", "purr"], ["🐢", "turtle"], ["🦜", "parrot", "hello hello"], ["🐝", "bee", "buzz"],
    ],
  },
  {
    id: "jungle",
    icon: "🦁",
    name: "Jungle animals",
    stickers: [
      ["🦁", "lion", "roar"], ["🐯", "tiger", "grrr"], ["🐒", "monkey", "ooh ooh ah ah"], ["🦍", "gorilla"],
      ["🐘", "elephant", "toot"], ["🦒", "giraffe"], ["🦓", "zebra"], ["🦛", "hippo"],
      ["🦏", "rhino"], ["🐊", "crocodile", "snap snap"], ["🐍", "snake", "hiss"], ["🦜", "parrot", "squawk"],
      ["🦩", "flamingo"], ["🐆", "leopard"], ["🦥", "sloth"], ["🐸", "frog", "ribbit"],
      ["🦋", "butterfly"], ["🐞", "ladybug"], ["🦎", "lizard"], ["🌴", "palm tree"],
    ],
  },
  {
    id: "wild",
    icon: "🐻",
    name: "Wild and forest animals",
    stickers: [
      ["🐻", "bear", "grrr"], ["🐼", "panda"], ["🐨", "koala"], ["🦊", "fox"],
      ["🐺", "wolf", "awoo"], ["🦝", "raccoon"], ["🦌", "deer"], ["🦔", "hedgehog"],
      ["🦉", "owl", "hoo hoo"], ["🦅", "eagle"], ["🐿️", "squirrel"], ["🦫", "beaver"],
      ["🦘", "kangaroo", "boing boing"], ["🦬", "bison"], ["🐧", "penguin"], ["🐻‍❄️", "polar bear"],
      ["🦙", "llama"], ["🐫", "camel"], ["🦡", "badger"], ["🐌", "snail"],
    ],
  },
  {
    id: "ocean",
    icon: "🐳",
    name: "Ocean animals",
    stickers: [
      ["🐳", "whale", "splash"], ["🐬", "dolphin", "click click"], ["🐟", "fish", "blub blub"], ["🐠", "tropical fish"],
      ["🐡", "puffer fish"], ["🦈", "shark"], ["🐙", "octopus"], ["🦀", "crab", "pinch pinch"],
      ["🦞", "lobster"], ["🦐", "shrimp"], ["🦑", "squid"], ["🦭", "seal", "ark ark"],
      ["🪼", "jellyfish"], ["🐚", "shell"], ["🪸", "coral"], ["🐢", "sea turtle"],
    ],
  },
  {
    id: "magic",
    icon: "🦄",
    name: "Dinosaurs and magic",
    stickers: [
      ["🦕", "dinosaur", "stomp stomp"], ["🦖", "T rex", "roar"], ["🐉", "dragon"], ["🦄", "unicorn"],
      ["🧚", "fairy"], ["🧜", "mermaid"], ["🧞", "genie"], ["🧙", "wizard"],
      ["🪄", "magic wand", "ta da"], ["🔮", "crystal ball"], ["👑", "crown"], ["💎", "gem"],
      ["🏆", "trophy"], ["🌟", "shining star"], ["✨", "sparkles"], ["🫧", "bubbles"],
    ],
  },
  {
    id: "houses",
    icon: "🏠",
    name: "Houses and places",
    stickers: [
      ["🏠", "house"], ["🏡", "house with garden"], ["🏘️", "houses"], ["🏰", "castle"],
      ["🏯", "palace"], ["⛺", "tent"], ["🛖", "hut"], ["🏫", "school"],
      ["🏥", "hospital"], ["🏪", "shop"], ["🏢", "office building"], ["⛪", "church"],
      ["🕌", "mosque"], ["🛕", "temple"], ["🗼", "tower"], ["🎡", "ferris wheel"],
      ["🎠", "carousel"], ["⛲", "fountain"], ["🏝️", "island"], ["🌋", "volcano"],
    ],
  },
  {
    id: "dolls",
    icon: "🧸",
    name: "Dolls, toys and people",
    stickers: [
      ["🧸", "teddy bear"], ["🪆", "nesting doll"], ["🎎", "dolls"], ["👸", "princess"],
      ["🤴", "prince"], ["🧚‍♀️", "fairy doll"], ["🤖", "robot", "beep boop"], ["🪀", "yo-yo"],
      ["🪁", "kite"], ["🎈", "balloon", "pop"], ["🧩", "puzzle"], ["🪅", "piñata"],
      ["🎁", "present"], ["⚽", "ball"], ["👧", "girl"], ["👦", "boy"],
      ["👶", "baby", "goo goo"], ["👩", "mom"], ["👨", "dad"], ["👵", "grandma"],
      ["👴", "grandpa"], ["🧒", "kid"],
    ],
  },
  {
    id: "cars",
    icon: "🚗",
    name: "Cars and vehicles",
    stickers: [
      ["🚗", "car", "beep beep"], ["🚕", "taxi"], ["🚙", "jeep"], ["🏎️", "race car", "vroom vroom"],
      ["🚓", "police car", "nee naw"], ["🚑", "ambulance", "nee naw"], ["🚒", "fire truck", "wee woo"], ["🚌", "bus"],
      ["🚐", "van"], ["🛻", "pickup truck"], ["🚚", "truck", "honk honk"], ["🚜", "tractor"],
      ["🚲", "bicycle", "ring ring"], ["🛵", "scooter"], ["🏍️", "motorcycle", "vroom"], ["🚂", "train", "choo choo"],
      ["🚁", "helicopter"], ["✈️", "airplane", "zoom"], ["🚀", "rocket", "blast off"], ["🛸", "flying saucer"],
      ["⛵", "sailboat"], ["🚤", "speedboat"], ["🚢", "ship", "toot toot"], ["🛴", "kick scooter"],
    ],
  },
  {
    id: "nature",
    icon: "🌈",
    name: "Nature and sky",
    stickers: [
      ["🌳", "tree"], ["🌲", "pine tree"], ["🌴", "palm tree"], ["🌵", "cactus"],
      ["🌷", "tulip"], ["🌻", "sunflower"], ["🌹", "rose"], ["🌼", "flower"],
      ["🍄", "mushroom"], ["🍀", "clover"], ["🍁", "leaf"], ["🌈", "rainbow"],
      ["☀️", "sun"], ["🌙", "moon"], ["⭐", "star"], ["☁️", "cloud"],
      ["⛅", "sun and cloud"], ["🌧️", "rain"], ["❄️", "snowflake"], ["⛄", "snowman"],
      ["🌍", "earth"], ["🪐", "planet"], ["❤️", "heart"], ["🌊", "wave"],
    ],
  },
  {
    id: "food",
    icon: "🍎",
    name: "Yummy food",
    stickers: [
      ["🍎", "apple"], ["🍌", "banana"], ["🍓", "strawberry"], ["🍉", "watermelon"],
      ["🍇", "grapes"], ["🍒", "cherries"], ["🍊", "orange"], ["🥕", "carrot"],
      ["🥦", "broccoli"], ["🌽", "corn"], ["🍕", "pizza"], ["🍔", "burger"],
      ["🍦", "ice cream"], ["🍩", "donut"], ["🍪", "cookie"], ["🎂", "birthday cake"],
      ["🧁", "cupcake"], ["🍭", "lollipop"], ["🥞", "pancakes"], ["🥐", "croissant"],
    ],
  },
  {
    id: "abc",
    icon: "🔤",
    name: "Letters and numbers",
    letters: true,
    stickers: [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"].map((ch) => [ch, ch]),
  },
];

// Outline drawings for coloring in with the paint bucket. Black lines, white
// insides, every area closed so the fill stays put. viewBox is 0 0 100 100.
const O = 'fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="400" height="400"><g ${O}>${body}</g></svg>`;

export const OUTLINES = [
  ["house", svg(`<rect x="20" y="45" width="60" height="45"/><path d="M12 48 L50 14 L88 48 Z"/><rect x="42" y="64" width="16" height="26"/><rect x="26" y="54" width="12" height="12"/><rect x="62" y="54" width="12" height="12"/><rect x="66" y="20" width="9" height="16"/>`)],
  ["castle", svg(`<rect x="22" y="40" width="56" height="52"/><path d="M10 92 V28 H16 V34 H22 V28 H28 V92 Z"/><path d="M72 92 V28 H78 V34 H84 V28 H90 V92 Z"/><path d="M40 92 V74 A10 10 0 0 1 60 74 V92 Z"/><path d="M50 40 V12"/><path d="M50 12 L64 17 L50 22 Z"/><rect x="34" y="50" width="9" height="11"/><rect x="57" y="50" width="9" height="11"/>`)],
  ["car", svg(`<path d="M8 66 V52 L22 48 L34 32 H64 L78 48 L92 52 V66 Z"/><path d="M38 36 H50 V48 H28 Z"/><path d="M55 36 H62 L72 48 H55 Z"/><circle cx="28" cy="68" r="10"/><circle cx="72" cy="68" r="10"/><circle cx="28" cy="68" r="4"/><circle cx="72" cy="68" r="4"/>`)],
  ["bus", svg(`<rect x="8" y="26" width="84" height="48" rx="6"/><rect x="14" y="32" width="14" height="14"/><rect x="32" y="32" width="14" height="14"/><rect x="50" y="32" width="14" height="14"/><rect x="70" y="32" width="16" height="30"/><circle cx="26" cy="76" r="9"/><circle cx="74" cy="76" r="9"/>`)],
  ["tree", svg(`<rect x="43" y="60" width="14" height="32"/><path d="M50 8 C72 8 86 24 84 42 C82 58 68 64 50 64 C32 64 18 58 16 42 C14 24 28 8 50 8 Z"/><circle cx="36" cy="34" r="5"/><circle cx="62" cy="28" r="5"/><circle cx="58" cy="48" r="5"/>`)],
  ["flower", svg(`<path d="M50 56 V94"/><path d="M50 80 C38 70 26 74 24 82 C34 86 44 84 50 80 Z"/><circle cx="50" cy="18" r="13"/><circle cx="70" cy="32" r="13"/><circle cx="62" cy="54" r="13"/><circle cx="38" cy="54" r="13"/><circle cx="30" cy="32" r="13"/><circle cx="50" cy="38" r="11"/>`)],
  ["sun", svg(`<path d="M50 4 L56 22 L44 22 Z M50 96 L44 78 L56 78 Z M4 50 L22 44 L22 56 Z M96 50 L78 56 L78 44 Z M17 17 L33 26 L26 33 Z M83 83 L67 74 L74 67 Z M83 17 L74 33 L67 26 Z M17 83 L26 67 L33 74 Z"/><circle cx="50" cy="50" r="24"/><circle cx="42" cy="45" r="2.5"/><circle cx="58" cy="45" r="2.5"/><path d="M40 56 Q50 66 60 56" fill="none"/>`)],
  ["fish", svg(`<path d="M10 50 C24 26 58 22 74 50 C58 78 24 74 10 50 Z"/><path d="M72 50 L94 32 V68 Z"/><path d="M36 30 Q46 14 58 32" /><circle cx="26" cy="46" r="4"/><path d="M42 40 Q50 50 42 60" fill="none"/>`)],
  ["cat", svg(`<path d="M18 40 L22 8 L42 26 H58 L78 8 L82 40 C88 70 72 90 50 90 C28 90 12 70 18 40 Z"/><ellipse cx="38" cy="50" rx="6" ry="8"/><ellipse cx="62" cy="50" rx="6" ry="8"/><path d="M45 64 H55 L50 70 Z"/><path d="M50 70 Q44 78 38 74 M50 70 Q56 78 62 74 M30 64 H8 M30 70 L10 76 M70 64 H92 M70 70 L90 76" fill="none"/>`)],
  ["dog", svg(`<path d="M28 30 C10 26 6 50 12 66 C18 70 24 62 26 54 Z"/><path d="M72 30 C90 26 94 50 88 66 C82 70 76 62 74 54 Z"/><path d="M26 34 C30 18 70 18 74 34 C80 58 72 88 50 88 C28 88 20 58 26 34 Z"/><circle cx="40" cy="46" r="4"/><circle cx="60" cy="46" r="4"/><ellipse cx="50" cy="62" rx="8" ry="6"/><path d="M50 68 V74 M42 76 Q50 82 58 76" fill="none"/>`)],
  ["butterfly", svg(`<path d="M48 44 C30 6 4 14 10 38 C14 52 34 52 48 48 Z"/><path d="M52 44 C70 6 96 14 90 38 C86 52 66 52 52 48 Z"/><path d="M48 52 C30 56 14 70 22 84 C32 94 46 76 48 58 Z"/><path d="M52 52 C70 56 86 70 78 84 C68 94 54 76 52 58 Z"/><ellipse cx="50" cy="54" rx="5" ry="26"/><path d="M48 30 Q42 16 36 12 M52 30 Q58 16 64 12" fill="none"/>`)],
  ["elephant", svg(`<ellipse cx="56" cy="56" rx="34" ry="24"/><path d="M28 50 C20 46 14 54 16 66 C18 78 14 86 8 88 C16 94 26 86 26 72 Z"/><path d="M40 40 C24 26 18 48 26 58 C30 62 38 60 40 52 Z"/><rect x="34" y="74" width="12" height="18"/><rect x="66" y="74" width="12" height="18"/><circle cx="30" cy="46" r="3"/><path d="M90 52 Q96 56 94 62" fill="none"/>`)],
  ["rocket", svg(`<path d="M50 6 C66 20 70 44 66 70 H34 C30 44 34 20 50 6 Z"/><circle cx="50" cy="38" r="9"/><path d="M34 54 L18 72 L22 84 L34 70 Z"/><path d="M66 54 L82 72 L78 84 L66 70 Z"/><path d="M40 70 L44 90 L50 80 L56 90 L60 70 Z"/>`)],
  ["star", svg(`<path d="M50 6 L62 36 L94 38 L69 58 L78 90 L50 72 L22 90 L31 58 L6 38 L38 36 Z"/>`)],
  ["heart", svg(`<path d="M50 88 C20 66 6 50 8 32 C10 16 30 8 42 18 C46 21 48 24 50 28 C52 24 54 21 58 18 C70 8 90 16 92 32 C94 50 80 66 50 88 Z"/>`)],
  ["teddy bear", svg(`<circle cx="24" cy="22" r="11"/><circle cx="76" cy="22" r="11"/><circle cx="50" cy="44" r="30"/><ellipse cx="50" cy="56" rx="13" ry="10"/><circle cx="38" cy="38" r="4"/><circle cx="62" cy="38" r="4"/><ellipse cx="50" cy="52" rx="5" ry="3.5"/><path d="M44 62 Q50 67 56 62" fill="none"/><path d="M26 74 C26 94 74 94 74 74"/>`)],
  ["balloon", svg(`<ellipse cx="50" cy="38" rx="26" ry="32"/><path d="M45 69 L55 69 L50 75 Z"/><path d="M50 75 C40 84 60 88 50 98" fill="none"/>`)],
  ["cloud", svg(`<path d="M24 74 C8 74 6 54 22 50 C20 34 40 26 50 38 C56 24 80 26 80 44 C96 44 98 74 78 74 Z"/>`)],
  ["snail", svg(`<path d="M8 84 H86 C92 84 94 76 88 72 L80 66 V40 H72 V66 H20 C12 66 6 76 8 84 Z"/><circle cx="46" cy="50" r="24"/><circle cx="46" cy="50" r="14"/><circle cx="46" cy="50" r="5"/><circle cx="76" cy="36" r="3"/><path d="M76 40 V34 M84 40 L88 30" fill="none"/>`)],
  ["owl", svg(`<path d="M22 22 L32 30 H68 L78 22 L80 70 C80 88 64 94 50 94 C36 94 20 88 20 70 Z"/><circle cx="38" cy="44" r="11"/><circle cx="62" cy="44" r="11"/><circle cx="38" cy="44" r="4"/><circle cx="62" cy="44" r="4"/><path d="M46 56 L54 56 L50 64 Z"/><path d="M34 70 Q42 76 50 70 Q58 76 66 70 Q58 86 50 82 Q42 86 34 70 Z"/>`)],
];
