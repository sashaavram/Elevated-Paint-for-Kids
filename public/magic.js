// Magic Pencil: turns a child's words ("three ducks on the farm") into a picture
// made from the app's own stickers and backgrounds. No AI, no internet, no keys.

import { STICKER_CATEGORIES } from "./stamps.js";
import { PAINT_PALS, COLORING_PALS } from "./art.js";

// Words kids use -> the sticker name in the catalog.
const SYNONYMS = {
  kitten: "cat", kitty: "cat", kittycat: "cat", puppy: "dog", doggy: "dog", doggie: "dog", pup: "dog",
  rabbit: "bunny", bunnie: "bunny", pony: "horse", horsey: "horse", piggy: "pig", piglet: "pig", lamb: "sheep",
  hen: "chicken", ducky: "duck", duckling: "duck", bird: "parrot", birdie: "parrot", bug: "ladybug",
  ladybird: "ladybug", froggy: "frog", toad: "frog", croc: "crocodile", alligator: "crocodile", gator: "crocodile",
  hippopotamus: "hippo", rhinoceros: "rhino", ape: "gorilla", cheetah: "leopard", jaguar: "leopard",
  dino: "dinosaur", trex: "T rex", "t rex": "T rex", "t-rex": "T rex", tyrannosaurus: "T rex", dragonfly: "butterfly",
  fishy: "fish", "goldfish": "fish", nemo: "tropical fish", jelly: "jellyfish", seashell: "shell", starfish: "star",
  teddy: "teddy bear", "teddy bear": "teddy bear", dolly: "doll", baby: "baby", mommy: "mom", mama: "mom", mum: "mom",
  mummy: "mom", mother: "mom", daddy: "dad", papa: "dad", father: "dad", granny: "grandma", nana: "grandma",
  grandmother: "grandma", grandfather: "grandpa", grandad: "grandpa", granddad: "grandpa", child: "kid",
  queen: "princess", king: "prince", robots: "robot", present: "present", gift: "present", balloons: "balloon",
  home: "house", cottage: "house", firetruck: "fire truck", "fire engine": "fire truck", firefighter: "fire truck",
  police: "police car", cop: "police car", taxicab: "taxi", cab: "taxi", lorry: "truck", digger: "tractor",
  bike: "bicycle", motorbike: "motorcycle", plane: "airplane", aeroplane: "airplane", jet: "airplane",
  spaceship: "rocket", ufo: "flying saucer", alien: "flying saucer", choo: "train", boat: "boat", sailboat: "sailboat",
  flowers: "flower", rose: "rose", sunflower: "sunflower", sunshine: "sun", sunny: "sun", stars: "star",
  clouds: "cloud", raining: "rain", snowflakes: "snowflake", love: "heart", planet: "planet",
  world: "earth", cake: "birthday cake", birthday: "birthday cake", icecream: "ice cream", "ice cream": "ice cream",
  lolly: "lollipop", candy: "lollipop", sweets: "lollipop", cookies: "cookie", biscuit: "cookie",
};

// Words that pick a background.
const SCENES = {
  jungle: "jungle", rainforest: "jungle", forest: "jungle", woods: "jungle", safari: "meadow",
  sea: "ocean", ocean: "ocean", underwater: "ocean", water: "ocean", lake: "ocean", pond: "ocean",
  beach: "beach", sand: "beach", seaside: "beach",
  night: "night", nighttime: "night", space: "night", sky: "meadow", dark: "night",
  snow: "snow", winter: "snow", snowy: "snow", christmas: "snow",
  road: "road", street: "road", city: "road", town: "road", race: "road",
  farm: "meadow", meadow: "meadow", garden: "meadow", park: "meadow", grass: "meadow", field: "meadow", outside: "meadow",
};

const COLORS = {
  red: "#ff3b30", orange: "#ff9500", yellow: "#ffcc00", green: "#34c759", blue: "#007aff", purple: "#af52de",
  pink: "#ff2d92", brown: "#7a4a2a", black: "#000000", white: "#ffffff",
};

const NUMBERS = {
  a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  couple: 2, few: 3, some: 3, many: 5, lots: 5, lot: 5, bunch: 4,
};

const COLORING_WORDS = new Set(["coloring", "colouring", "outline", "outlines"]);

// Things that belong up in the sky.
const SKY = new Set([
  "sun", "moon", "star", "shining star", "cloud", "sun and cloud", "rain", "rainbow", "airplane", "helicopter",
  "rocket", "flying saucer", "kite", "balloon", "eagle", "parrot", "bee", "butterfly", "planet", "earth",
  "snowflake", "sparkles", "bubbles", "dragon", "fairy",
]);

const MAX_ITEMS = 8;

/** Every drawable thing by lowercase name. Paint Pals win over emoji with the same name. */
export function buildIndex() {
  const index = new Map();
  for (const cat of STICKER_CATEGORIES) {
    if (cat.letters) continue;
    for (const [value, name, sound] of cat.stickers) {
      const key = name.toLowerCase();
      if (!index.has(key)) index.set(key, { name, sound, kind: "emoji", value });
    }
  }
  PAINT_PALS.forEach((pal, i) => {
    index.set(pal.name.toLowerCase(), {
      name: pal.name, sound: pal.sound, kind: "image", svg: pal.svg, coloringSvg: COLORING_PALS[i].svg,
    });
  });
  return index;
}

function singular(word) {
  if (word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (/(ches|shes|xes|sses)$/.test(word)) return word.slice(0, -2);
  if (word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

function lookup(phrase, index) {
  for (const candidate of [phrase, singular(phrase)]) {
    // Kid words first ("kitty" -> the Paint Pals cat), then the catalog name itself.
    const syn = SYNONYMS[candidate];
    if (syn && index.has(syn.toLowerCase())) return index.get(syn.toLowerCase());
    if (index.has(candidate)) return index.get(candidate);
  }
  return null;
}

/**
 * Reads a request like "3 red cars on the road at night".
 * Returns { items: [{ entry, count }], scene, coloring, color, unknown: [words] }.
 */
export function parseRequest(text, index = buildIndex()) {
  const words = String(text ?? "").toLowerCase().replace(/[^a-z0-9\s'-]/g, " ").split(/\s+/).filter(Boolean);
  const result = { items: [], scene: null, coloring: false, color: null, unknown: [] };
  const IGNORE = new Set(["the", "and", "with", "in", "on", "at", "of", "to", "my", "me", "draw", "make", "please",
    "picture", "page", "big", "little", "small", "happy", "cute", "funny", "under", "by", "near", "is", "are", "it",
    "i", "want", "can", "you", "for", "time", "who", "that", "has", "having", "plus", "too", "also", "go", "going"]);
  let pendingCount = null;

  for (let i = 0; i < words.length; ) {
    let matched = false;
    // Longest phrase first, so "fire truck" beats "fire" and "teddy bear" beats "bear".
    for (let len = Math.min(3, words.length - i); len >= 1; len--) {
      const phrase = words.slice(i, i + len).join(" ");
      const entry = lookup(phrase, index);
      if (entry) {
        const count = Math.min(pendingCount ?? 1, MAX_ITEMS);
        const existing = result.items.find((it) => it.entry === entry);
        if (existing) existing.count = Math.min(existing.count + count, MAX_ITEMS);
        else result.items.push({ entry, count });
        pendingCount = null;
        i += len;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    const word = words[i];
    if (/^\d+$/.test(word)) pendingCount = Math.max(1, Number(word));
    else if (word in NUMBERS) pendingCount = NUMBERS[word];
    else if (word in COLORS) result.color = COLORS[word];
    else if (COLORING_WORDS.has(word) || (word === "color" && words[i + 1] === "in")) result.coloring = true;
    else if (word in SCENES) result.scene ??= SCENES[word];
    else if (!IGNORE.has(word) && word.length > 1) result.unknown.push(word);
    i++;
  }
  return result;
}

/**
 * Places the things on a canvas of size w x h: sky things up high, everything else
 * along the ground, spaced out evenly. Returns [{ entry, x, y, size, flip }].
 */
export function layoutScene(items, w, h) {
  const all = [];
  for (const { entry, count } of items) for (let n = 0; n < count; n++) all.push(entry);
  const placed = all.slice(0, MAX_ITEMS);
  const sky = placed.filter((e) => SKY.has(e.name.toLowerCase()));
  const ground = placed.filter((e) => !SKY.has(e.name.toLowerCase()));
  // Sized from the short side of the paper, and never wider than each one's share of the row.
  const base = Math.min(w, h);
  const sizeFor = (n) => Math.round(Math.min(base * (n <= 1 ? 0.5 : n === 2 ? 0.4 : n <= 4 ? 0.3 : 0.24), (w / n) * 0.95));
  const out = [];
  const row = (list, yFrac, scale) => {
    const size = Math.round(sizeFor(list.length) * scale);
    list.forEach((entry, i) => {
      const x = (w * (i + 1)) / (list.length + 1);
      const wobble = list.length > 2 ? (i % 2 ? -1 : 1) * h * 0.04 : 0;
      out.push({ entry, x, y: h * yFrac + wobble, size, flip: i % 2 === 1 });
    });
  };
  row(sky, ground.length ? 0.2 : 0.45, ground.length ? 0.75 : 1);
  row(ground, sky.length ? 0.66 : 0.55, 1);
  return out;
}

/** A short sentence to say back: "Three ducks on the farm!" */
export function describe(parsed) {
  const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];
  const parts = parsed.items.map(({ entry, count }) =>
    count > 1 ? `${words[count] ?? count} ${pluralize(entry.name)}` : `${/^[aeiou]/i.test(entry.name) ? "an" : "a"} ${entry.name}`);
  const list = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}` : parts[0] ?? "";
  const where = { jungle: " in the jungle", ocean: " under the sea", beach: " at the beach", night: " at night",
    snow: " in the snow", road: " on the road", meadow: " outside" }[parsed.scene] ?? "";
  const text = (list || "A new background") + where + "!";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function pluralize(name) {
  if (/(fish|sheep|deer|bison|shrimp|squid)$/.test(name)) return name;
  if (/(s|sh|ch|x)$/.test(name)) return name + "es";
  if (/[^aeiou]y$/.test(name)) return name.slice(0, -1) + "ies";
  return name + "s";
}

export const MAGIC_IDEAS = [
  ["🦁", "a lion in the jungle"], ["🦆", "three ducks on the farm"], ["🚒", "a fire truck on the road"],
  ["🐠", "fish under the sea"], ["🏰", "a princess and a castle at night"], ["🦕", "a dinosaur coloring page"],
  ["🐶", "a dog and a cat"], ["🚀", "a rocket and stars at night"], ["⛄", "a snowman in the snow"],
  ["🐘", "an elephant and a giraffe"], ["🧸", "a teddy bear and a doll"], ["🏠", "a house with a tree and a sun"],
  ["🐢", "a turtle at the beach"], ["🦋", "butterflies and flowers in the garden"], ["🚂", "a train and a bus"],
  ["🐸", "a frog coloring page"],
];
