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
