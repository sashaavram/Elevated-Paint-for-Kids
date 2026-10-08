// "Paint Pals": the app's own sticker art. One style for all of them: thick
// round outlines, flat bright colors, rosy cheeks. Every picture also has a
// coloring-page version (same lines, white insides) made by toColoring().

const INK = "#3b2b4f";
const CHEEK = '<g stroke="none" fill="#fb7185" opacity=".55">';

const wrap = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="480" height="480">` +
  `<g stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">${body}</g></svg>`;

const eye = (x, y, r = 4) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}" stroke="none"/><circle cx="${x + r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.38}" fill="#fff" stroke="none"/>`;
const cheeks = (x1, x2, y, r = 4.5) => `${CHEEK}<circle cx="${x1}" cy="${y}" r="${r}"/><circle cx="${x2}" cy="${y}" r="${r}"/></g>`;
const smile = (x, y, w = 8) => `<path d="M${x - w} ${y} q${w} ${w * 0.8} ${w * 2} 0" fill="none"/>`;

const ART = {
  lion: [
    "roar",
    [...Array(12)].map((_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return `<circle cx="${(60 + Math.cos(a) * 38).toFixed(1)}" cy="${(60 + Math.sin(a) * 38).toFixed(1)}" r="13" fill="#f59e0b"/>`;
    }).join("") +
      `<circle cx="60" cy="60" r="40" fill="#f59e0b" stroke="none"/>` +
      `<circle cx="38" cy="38" r="9" fill="#fcd34d"/><circle cx="82" cy="38" r="9" fill="#fcd34d"/>` +
      `<circle cx="60" cy="62" r="29" fill="#fcd34d"/>` +
      `<ellipse cx="60" cy="74" rx="13" ry="9" fill="#fff7d6"/>` +
      eye(49, 57) + eye(71, 57) +
      `<path d="M55 67 h10 l-5 5 z" fill="${INK}"/><path d="M60 72 v4" fill="none"/><path d="M52 78 q8 6 16 0" fill="none"/>` +
      cheeks(41, 79, 70),
  ],
  elephant: [
    "toot toot",
    `<rect x="52" y="82" width="14" height="24" rx="5" fill="#a5b4fc"/><rect x="84" y="82" width="14" height="24" rx="5" fill="#a5b4fc"/>` +
      `<path d="M104 70 q10 4 7 14" fill="none"/>` +
      `<ellipse cx="74" cy="72" rx="34" ry="24" fill="#a5b4fc"/>` +
      `<circle cx="42" cy="54" r="24" fill="#a5b4fc"/>` +
      `<path d="M24 60 C12 70 12 88 20 98 C25 103 32 99 29 93 C23 84 25 74 34 68 Z" fill="#a5b4fc"/>` +
      `<ellipse cx="56" cy="54" rx="14" ry="19" fill="#c7d2fe"/>` +
      eye(36, 48) + cheeks(30, 30, 60, 4),
  ],
  giraffe: [
    "",
    `<rect x="40" y="80" width="9" height="30" rx="4" fill="#fcd34d"/><rect x="54" y="82" width="9" height="28" rx="4" fill="#fcd34d"/>` +
      `<rect x="70" y="82" width="9" height="28" rx="4" fill="#fcd34d"/><rect x="82" y="80" width="9" height="30" rx="4" fill="#fcd34d"/>` +
      `<path d="M36 76 q-10 4 -8 16" fill="none"/>` +
      `<ellipse cx="64" cy="78" rx="30" ry="15" fill="#fcd34d"/>` +
      `<path d="M74 72 L80 30 L92 30 L90 74 Z" fill="#fcd34d"/>` +
      `<g fill="#d97706" stroke="none"><circle cx="54" cy="76" r="5"/><circle cx="70" cy="82" r="4"/><circle cx="46" cy="84" r="3.5"/><circle cx="84" cy="56" r="4"/><circle cx="84" cy="42" r="3"/></g>` +
      `<path d="M84 16 L82 6 M94 16 L96 6" fill="none"/><circle cx="82" cy="6" r="3.5" fill="#d97706"/><circle cx="96" cy="6" r="3.5" fill="#d97706"/>` +
      `<ellipse cx="74" cy="20" rx="6" ry="3.5" fill="#fcd34d" transform="rotate(-25 74 20)"/>` +
      `<ellipse cx="92" cy="25" rx="16" ry="11" fill="#fcd34d"/>` +
      `<ellipse cx="102" cy="29" rx="7" ry="6" fill="#fde68a"/>` +
      eye(90, 22, 3.5) + cheeks(86, 86, 30, 3.5),
  ],
  monkey: [
    "ooh ooh ah ah",
    `<circle cx="28" cy="58" r="12" fill="#a16207"/><circle cx="92" cy="58" r="12" fill="#a16207"/>` +
      `<circle cx="28" cy="58" r="6" fill="#fcd9b6"/><circle cx="92" cy="58" r="6" fill="#fcd9b6"/>` +
      `<circle cx="60" cy="56" r="32" fill="#a16207"/>` +
      `<path d="M38 64 C38 42 52 44 60 52 C68 44 82 42 82 64 C82 80 72 86 60 86 C48 86 38 80 38 64 Z" fill="#fcd9b6"/>` +
      `<path d="M54 25 q6 -12 12 0" fill="none"/>` +
      eye(50, 58) + eye(70, 58) +
      `<circle cx="56" cy="68" r="1.6" fill="${INK}" stroke="none"/><circle cx="64" cy="68" r="1.6" fill="${INK}" stroke="none"/>` +
      smile(60, 75, 9) + cheeks(44, 76, 72),
  ],
  cat: [
    "meow",
    `<path d="M84 104 C104 104 112 84 102 74 C98 70 92 73 95 78 C102 88 98 96 82 96 Z" fill="#fb923c"/>` +
      `<path d="M34 110 C30 82 40 68 60 68 C80 68 90 82 86 110 Z" fill="#fb923c"/>` +
      `<ellipse cx="60" cy="94" rx="13" ry="13" fill="#fed7aa"/>` +
      `<ellipse cx="47" cy="108" rx="9" ry="5" fill="#fed7aa"/><ellipse cx="73" cy="108" rx="9" ry="5" fill="#fed7aa"/>` +
      `<path d="M34 48 L36 14 L58 32 Z" fill="#fb923c"/><path d="M86 48 L84 14 L62 32 Z" fill="#fb923c"/>` +
      `<path d="M40 38 L41 24 L50 32 Z M80 38 L79 24 L70 32 Z" fill="#fda4af" stroke="none"/>` +
      `<circle cx="60" cy="48" r="28" fill="#fb923c"/>` +
      `<ellipse cx="50" cy="46" rx="3.6" ry="5" fill="${INK}" stroke="none"/><ellipse cx="70" cy="46" rx="3.6" ry="5" fill="${INK}" stroke="none"/>` +
      `<path d="M56 54 h8 l-4 4 z" fill="#fb7185"/><path d="M60 58 q-5 5 -9 1 M60 58 q5 5 9 1" fill="none"/>` +
      `<path d="M40 56 H26 M40 61 L28 65 M80 56 H94 M80 61 L92 65" fill="none" stroke-width="2.5"/>` +
      cheeks(44, 76, 56, 4),
  ],
  dog: [
    "woof woof",
    `<path d="M36 112 C32 88 42 76 60 76 C78 76 88 88 84 112 Z" fill="#d6a26b"/>` +
      `<ellipse cx="60" cy="98" rx="12" ry="11" fill="#fff1d6"/>` +
      `<circle cx="60" cy="48" r="28" fill="#d6a26b"/>` +
      `<ellipse cx="34" cy="50" rx="10" ry="21" fill="#92400e" transform="rotate(18 34 50)"/>` +
      `<ellipse cx="86" cy="50" rx="10" ry="21" fill="#92400e" transform="rotate(-18 86 50)"/>` +
      `<ellipse cx="60" cy="61" rx="14" ry="10" fill="#fff1d6"/>` +
      `<path d="M56 65 q4 9 8 0 Z" fill="#fb7185"/>` +
      `<ellipse cx="60" cy="56" rx="5" ry="3.5" fill="${INK}"/><path d="M60 59 v3 M53 63 q7 5 14 0" fill="none"/>` +
      eye(50, 44) + eye(70, 44) +
      `<rect x="42" y="74" width="36" height="7" rx="3.5" fill="#ef4444"/><circle cx="60" cy="84" r="4.5" fill="#fcd34d"/>`,
  ],
  bunny: [
    "",
    `<ellipse cx="60" cy="98" rx="25" ry="18" fill="#f1f5f9"/>` +
      `<ellipse cx="47" cy="28" rx="9" ry="24" fill="#f1f5f9"/><ellipse cx="73" cy="28" rx="9" ry="24" fill="#f1f5f9"/>` +
      `<ellipse cx="47" cy="28" rx="4" ry="16" fill="#fda4af" stroke="none"/><ellipse cx="73" cy="28" rx="4" ry="16" fill="#fda4af" stroke="none"/>` +
      `<circle cx="60" cy="64" r="25" fill="#f1f5f9"/>` +
      eye(51, 60) + eye(69, 60) +
      `<path d="M57 68 h6 l-3 3 z" fill="#fb7185"/><path d="M60 71 q-4 4 -8 1 M60 71 q4 4 8 1" fill="none"/>` +
      `<rect x="56.5" y="73" width="7" height="6" rx="1" fill="#fff" stroke-width="2"/>` +
      cheeks(45, 75, 70),
  ],
  pig: [
    "oink oink",
    `<path d="M32 34 L30 12 L50 26 Z M88 34 L90 12 L70 26 Z" fill="#f9a8d4"/>` +
      `<circle cx="60" cy="60" r="36" fill="#f9a8d4"/>` +
      `<ellipse cx="60" cy="70" rx="15" ry="11" fill="#f472b6"/>` +
      `<ellipse cx="55" cy="70" rx="2.5" ry="4" fill="${INK}" stroke="none"/><ellipse cx="65" cy="70" rx="2.5" ry="4" fill="${INK}" stroke="none"/>` +
      eye(46, 52) + eye(74, 52) + smile(60, 86, 7) + cheeks(36, 84, 66, 5),
  ],
  duck: [
    "quack quack",
    `<ellipse cx="66" cy="80" rx="36" ry="22" fill="#fde047"/>` +
      `<path d="M58 76 q22 -12 34 6 q-16 12 -34 -6 Z" fill="#facc15"/>` +
      `<circle cx="44" cy="46" r="20" fill="#fde047"/>` +
      `<path d="M26 46 C14 46 12 54 16 56 C22 58 28 56 30 52 Z" fill="#fb923c"/>` +
      eye(42, 41) + cheeks(50, 50, 52, 4) +
      `<path d="M8 100 q8 -6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 V114 H8 Z" fill="#7dd3fc"/>`,
  ],
  fish: [
    "blub blub",
    `<path d="M86 60 L110 40 L108 80 Z" fill="#0ea5e9"/>` +
      `<path d="M46 40 Q60 16 74 40 Z" fill="#0ea5e9"/>` +
      `<path d="M18 60 C34 30 76 28 92 60 C76 92 34 90 18 60 Z" fill="#38bdf8"/>` +
      `<path d="M60 36 q10 24 0 48" fill="none"/>` +
      `<circle cx="38" cy="54" r="8" fill="#fff"/>` + eye(39, 54, 4) + smile(32, 68, 5) + cheeks(48, 48, 66, 4) +
      `<circle cx="14" cy="34" r="4" fill="#e0f2fe" stroke-width="2.5"/><circle cx="8" cy="20" r="2.5" fill="#e0f2fe" stroke-width="2.5"/>`,
  ],
  turtle: [
    "",
    `<ellipse cx="38" cy="84" rx="9" ry="7" fill="#a3e635"/><ellipse cx="82" cy="84" rx="9" ry="7" fill="#a3e635"/>` +
      `<path d="M18 74 L8 78 L18 82 Z" fill="#a3e635"/>` +
      `<circle cx="102" cy="66" r="13" fill="#a3e635"/>` +
      `<path d="M20 78 C20 38 100 38 100 78 Z" fill="#4ade80"/>` +
      `<path d="M50 52 L60 46 L70 52 L70 64 L60 70 L50 64 Z" fill="#22c55e"/>` +
      `<path d="M50 52 L36 50 M70 52 L84 50 M50 64 L34 70 M70 64 L86 70 M60 46 V40 M60 70 V78" fill="none" stroke-width="3"/>` +
      `<rect x="16" y="74" width="88" height="9" rx="4.5" fill="#16a34a"/>` +
      eye(104, 62, 3.5) + `<path d="M98 70 q5 4 10 0" fill="none"/>`,
  ],
  "teddy bear": [
    "",
    `<ellipse cx="60" cy="96" rx="26" ry="20" fill="#b45309"/><ellipse cx="60" cy="98" rx="14" ry="12" fill="#fcd34d"/>` +
      `<ellipse cx="32" cy="88" rx="8" ry="12" fill="#b45309" transform="rotate(30 32 88)"/><ellipse cx="88" cy="88" rx="8" ry="12" fill="#b45309" transform="rotate(-30 88 88)"/>` +
      `<circle cx="34" cy="24" r="12" fill="#b45309"/><circle cx="86" cy="24" r="12" fill="#b45309"/>` +
      `<circle cx="34" cy="24" r="6" fill="#fcd34d"/><circle cx="86" cy="24" r="6" fill="#fcd34d"/>` +
      `<circle cx="60" cy="46" r="30" fill="#b45309"/>` +
      `<ellipse cx="60" cy="58" rx="14" ry="11" fill="#fde68a"/>` +
      `<ellipse cx="60" cy="53" rx="5" ry="3.5" fill="${INK}"/><path d="M60 56 v4 M53 61 q7 5 14 0" fill="none"/>` +
      eye(48, 42) + eye(72, 42) + cheeks(40, 80, 56) +
      `<path d="M60 76 L46 70 V84 Z M60 76 L74 70 V84 Z" fill="#ef4444"/><circle cx="60" cy="77" r="4" fill="#ef4444"/>`,
  ],
  owl: [
    "hoo hoo",
    `<path d="M26 26 L38 34 H82 L94 26 L96 78 C96 98 78 108 60 108 C42 108 24 98 24 78 Z" fill="#a78bfa"/>` +
      `<ellipse cx="60" cy="84" rx="20" ry="20" fill="#ddd6fe"/>` +
      `<path d="M26 66 C14 78 18 96 30 98 C34 88 34 76 26 66 Z M94 66 C106 78 102 96 90 98 C86 88 86 76 94 66 Z" fill="#7c3aed"/>` +
      `<circle cx="45" cy="52" r="13" fill="#fff"/><circle cx="75" cy="52" r="13" fill="#fff"/>` +
      eye(45, 52, 6) + eye(75, 52, 6) +
      `<path d="M55 62 h10 l-5 9 z" fill="#fb923c"/>` +
      `<ellipse cx="50" cy="109" rx="7" ry="4" fill="#fb923c"/><ellipse cx="70" cy="109" rx="7" ry="4" fill="#fb923c"/>`,
  ],
  butterfly: [
    "",
    `<path d="M56 50 C40 8 8 14 12 40 C14 56 36 58 56 54 Z" fill="#f472b6"/>` +
      `<path d="M64 50 C80 8 112 14 108 40 C106 56 84 58 64 54 Z" fill="#f472b6"/>` +
      `<path d="M56 60 C36 62 18 78 26 94 C36 106 52 86 56 66 Z" fill="#c084fc"/>` +
      `<path d="M64 60 C84 62 102 78 94 94 C84 106 68 86 64 66 Z" fill="#c084fc"/>` +
      `<circle cx="32" cy="34" r="7" fill="#fde047"/><circle cx="88" cy="34" r="7" fill="#fde047"/>` +
      `<circle cx="38" cy="82" r="5" fill="#fde047"/><circle cx="82" cy="82" r="5" fill="#fde047"/>` +
      `<path d="M56 30 Q48 14 40 10 M64 30 Q72 14 80 10" fill="none"/>` +
      `<ellipse cx="60" cy="62" rx="6" ry="30" fill="#6d28d9"/>` +
      `<circle cx="60" cy="34" r="9" fill="#6d28d9"/>` +
      `<circle cx="57" cy="33" r="1.8" fill="#fff" stroke="none"/><circle cx="63" cy="33" r="1.8" fill="#fff" stroke="none"/>`,
  ],
  frog: [
    "ribbit",
    `<ellipse cx="60" cy="92" rx="30" ry="20" fill="#4ade80"/>` +
      `<ellipse cx="34" cy="108" rx="12" ry="5" fill="#22c55e"/><ellipse cx="86" cy="108" rx="12" ry="5" fill="#22c55e"/>` +
      `<ellipse cx="60" cy="96" rx="16" ry="12" fill="#bbf7d0"/>` +
      `<circle cx="40" cy="38" r="14" fill="#4ade80"/><circle cx="80" cy="38" r="14" fill="#4ade80"/>` +
      `<ellipse cx="60" cy="58" rx="38" ry="24" fill="#4ade80"/>` +
      `<circle cx="40" cy="36" r="8" fill="#fff"/><circle cx="80" cy="36" r="8" fill="#fff"/>` +
      eye(41, 37, 4.5) + eye(81, 37, 4.5) +
      `<path d="M38 60 q22 16 44 0" fill="none"/>` + cheeks(32, 88, 58, 5),
  ],
  dinosaur: [
    "stomp stomp",
    `<path d="M40 62 L46 48 L54 60 L60 44 L68 58 L76 46 L80 62 Z" fill="#fb923c"/>` +
      `<rect x="42" y="78" width="12" height="26" rx="5" fill="#4ade80"/><rect x="70" y="78" width="12" height="26" rx="5" fill="#4ade80"/>` +
      `<path d="M88 72 C100 74 110 70 114 60 C110 80 100 88 86 86 Z" fill="#4ade80"/>` +
      `<ellipse cx="62" cy="76" rx="30" ry="20" fill="#4ade80"/>` +
      `<path d="M38 74 C30 66 28 50 30 38 L42 38 C42 50 44 60 50 66 Z" fill="#4ade80"/>` +
      `<ellipse cx="30" cy="32" rx="18" ry="12" fill="#4ade80"/>` +
      `<g fill="#22c55e" stroke="none"><circle cx="60" cy="72" r="5"/><circle cx="74" cy="80" r="4"/><circle cx="50" cy="84" r="3.5"/></g>` +
      eye(26, 29, 3.5) + `<path d="M14 36 q6 4 12 2" fill="none"/>` + cheeks(34, 34, 36, 3.5),
  ],
  house: [
    "",
    `<rect x="78" y="16" width="12" height="24" fill="#b91c1c"/>` +
      `<rect x="22" y="52" width="76" height="56" fill="#fde68a"/>` +
      `<path d="M12 56 L60 16 L108 56 Z" fill="#ef4444"/>` +
      `<path d="M50 108 V80 a10 10 0 0 1 20 0 V108 Z" fill="#a16207"/><circle cx="65" cy="94" r="2" fill="${INK}" stroke="none"/>` +
      `<rect x="30" y="64" width="16" height="16" fill="#bae6fd"/><rect x="74" y="64" width="16" height="16" fill="#bae6fd"/>` +
      `<path d="M38 64 V80 M30 72 H46 M82 64 V80 M74 72 H90" fill="none" stroke-width="2.5"/>` +
      `<circle cx="60" cy="40" r="7" fill="#bae6fd"/>`,
  ],
  castle: [
    "",
    `<path d="M10 108 V36 H16 V42 H22 V36 H28 V42 H34 V36 H36 V108 Z" fill="#c4b5fd"/>` +
      `<path d="M84 108 V36 H86 V42 H92 V36 H98 V42 H104 V36 H110 V108 Z" fill="#c4b5fd"/>` +
      `<path d="M36 108 V50 H44 V56 H52 V50 H60 V56 H68 V50 H76 V56 H84 V50 V108 Z" fill="#ddd6fe"/>` +
      `<path d="M48 108 V88 a12 12 0 0 1 24 0 V108 Z" fill="#92400e"/>` +
      `<path d="M60 50 V18" fill="none"/><path d="M60 18 L78 24 L60 30 Z" fill="#f43f5e"/>` +
      `<path d="M18 62 a5 5 0 0 1 10 0 V74 H18 Z M92 62 a5 5 0 0 1 10 0 V74 H92 Z M55 66 a5 5 0 0 1 10 0 V76 H55 Z" fill="#fde047"/>`,
  ],
  car: [
    "beep beep",
    `<path d="M8 84 V68 L22 62 L36 40 H78 L94 62 L110 68 V84 Z" fill="#ef4444"/>` +
      `<path d="M42 46 H56 V62 H30 Z" fill="#bae6fd"/><path d="M62 46 H76 L88 62 H62 Z" fill="#bae6fd"/>` +
      `<circle cx="104" cy="72" r="4" fill="#fde047"/>` +
      `<circle cx="32" cy="86" r="13" fill="${INK}"/><circle cx="88" cy="86" r="13" fill="${INK}"/>` +
      `<circle cx="32" cy="86" r="5.5" fill="#e5e7eb"/><circle cx="88" cy="86" r="5.5" fill="#e5e7eb"/>`,
  ],
  "fire truck": [
    "wee woo",
    `<rect x="10" y="44" width="70" height="38" rx="4" fill="#ef4444"/>` +
      `<path d="M80 82 V50 H96 L110 66 V82 Z" fill="#ef4444"/><path d="M86 56 H95 L104 66 H86 Z" fill="#bae6fd"/>` +
      `<rect x="14" y="30" width="62" height="10" fill="#e5e7eb"/><path d="M24 30 V40 M36 30 V40 M48 30 V40 M60 30 V40" fill="none" stroke-width="3"/>` +
      `<rect x="88" y="38" width="10" height="8" rx="2" fill="#38bdf8"/>` +
      `<rect x="18" y="54" width="22" height="14" rx="2" fill="#fde047"/><rect x="48" y="54" width="22" height="14" rx="2" fill="#fde047"/>` +
      `<circle cx="30" cy="86" r="12" fill="${INK}"/><circle cx="92" cy="86" r="12" fill="${INK}"/>` +
      `<circle cx="30" cy="86" r="5" fill="#e5e7eb"/><circle cx="92" cy="86" r="5" fill="#e5e7eb"/>`,
  ],
  rocket: [
    "blast off",
    `<path d="M48 90 L52 112 L60 102 L68 112 L72 90 Z" fill="#fb923c"/><path d="M54 90 L57 104 L60 98 L63 104 L66 90 Z" fill="#fde047" stroke="none"/>` +
      `<path d="M40 70 L22 92 L28 100 L42 88 Z M80 70 L98 92 L92 100 L78 88 Z" fill="#ef4444"/>` +
      `<path d="M60 6 C78 22 82 50 78 90 H42 C38 50 42 22 60 6 Z" fill="#f1f5f9"/>` +
      `<path d="M60 6 C68 13 73 22 76 32 H44 C47 22 52 13 60 6 Z" fill="#ef4444"/>` +
      `<circle cx="60" cy="54" r="11" fill="#38bdf8"/><circle cx="56" cy="50" r="3" fill="#fff" stroke="none"/>`,
  ],
  doll: [
    "",
    `<circle cx="32" cy="40" r="11" fill="#a16207"/><circle cx="88" cy="40" r="11" fill="#a16207"/>` +
      `<circle cx="60" cy="38" r="26" fill="#a16207"/>` +
      `<rect x="42" y="98" width="8" height="12" fill="#fcd9b6"/><rect x="70" y="98" width="8" height="12" fill="#fcd9b6"/>` +
      `<path d="M44 66 L28 84 M76 66 L92 84" fill="none" stroke-width="7" stroke="${INK}"/><path d="M44 66 L28 84 M76 66 L92 84" fill="none" stroke-width="3" stroke="#fcd9b6"/>` +
      `<path d="M46 62 H74 L88 102 H32 Z" fill="#f472b6"/>` +
      `<path d="M50 62 L60 70 L70 62" fill="#fff"/>` +
      `<circle cx="60" cy="44" r="20" fill="#fcd9b6"/>` +
      `<path d="M40 40 C42 24 78 24 80 40 C72 32 50 32 40 40 Z" fill="#a16207"/>` +
      `<path d="M68 22 L80 16 L80 30 Z M68 22 L56 16 L56 30 Z" fill="#fde047"/>` +
      eye(53, 46, 3.5) + eye(67, 46, 3.5) + smile(60, 54, 5) + cheeks(47, 73, 52, 3.5) +
      `<ellipse cx="45" cy="111" rx="7" ry="4" fill="#ef4444"/><ellipse cx="75" cy="111" rx="7" ry="4" fill="#ef4444"/>`,
  ],
  sun: [
    "",
    [...Array(10)].map((_, i) => {
      const a = (i / 10) * Math.PI * 2;
      const p = (r, da) => `${(60 + Math.cos(a + da) * r).toFixed(1)} ${(60 + Math.sin(a + da) * r).toFixed(1)}`;
      return `<path d="M${p(52, 0)} L${p(30, 0.22)} L${p(30, -0.22)} Z" fill="#fb923c"/>`;
    }).join("") +
      `<circle cx="60" cy="60" r="32" fill="#fde047"/>` + eye(50, 54) + eye(70, 54) + smile(60, 66, 9) + cheeks(42, 78, 64, 5),
  ],
  rainbow: [
    "",
    ["#ef4444", "#fb923c", "#fde047", "#4ade80", "#38bdf8", "#a78bfa"].map((c, i) => {
      const r1 = 52 - i * 7;
      const r2 = r1 - 7;
      return `<path d="M${60 - r1} 86 A${r1} ${r1} 0 0 1 ${60 + r1} 86 H${60 + r2} A${r2} ${r2} 0 0 0 ${60 - r2} 86 Z" fill="${c}"/>`;
    }).join("") +
      `<path d="M2 96 C2 84 14 80 20 86 C22 76 38 76 38 88 C46 88 46 100 38 100 H8 C2 100 2 96 2 96 Z" fill="#fff"/>` +
      `<path d="M82 96 C82 84 94 80 100 86 C102 76 118 76 118 88 C120 92 120 100 112 100 H88 C82 100 82 96 82 96 Z" fill="#fff"/>`,
  ],
  tree: [
    "",
    `<path d="M50 112 L53 72 H67 L70 112 Z" fill="#a16207"/>` +
      `<path d="M30 74 C12 72 10 50 24 44 C20 26 40 14 54 22 C62 8 88 12 90 30 C108 32 112 58 96 66 C98 80 80 86 70 78 C62 86 40 86 30 74 Z" fill="#4ade80"/>` +
      `<circle cx="42" cy="46" r="5" fill="#ef4444"/><circle cx="74" cy="38" r="5" fill="#ef4444"/><circle cx="82" cy="60" r="5" fill="#ef4444"/><circle cx="54" cy="64" r="5" fill="#ef4444"/>`,
  ],
  flower: [
    "",
    `<rect x="57" y="68" width="6" height="46" rx="3" fill="#16a34a"/>` +
      `<path d="M60 96 C48 84 32 88 30 98 C42 104 54 102 60 96 Z" fill="#4ade80"/>` +
      [...Array(6)].map((_, i) => {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        return `<circle cx="${(60 + Math.cos(a) * 24).toFixed(1)}" cy="${(46 + Math.sin(a) * 24).toFixed(1)}" r="15" fill="#f472b6"/>`;
      }).join("") +
      `<circle cx="60" cy="46" r="17" fill="#fde047"/>` + eye(54, 43, 3) + eye(66, 43, 3) + smile(60, 50, 5),
  ],
  boat: [
    "toot toot",
    `<path d="M60 14 V78" fill="none"/>` +
      `<path d="M62 18 L96 70 H62 Z" fill="#f1f5f9"/><path d="M58 30 L30 70 H58 Z" fill="#fbbf24"/>` +
      `<path d="M14 78 H106 L94 98 H26 Z" fill="#3b82f6"/>` +
      `<circle cx="44" cy="88" r="3.5" fill="#fff"/><circle cx="60" cy="88" r="3.5" fill="#fff"/><circle cx="76" cy="88" r="3.5" fill="#fff"/>` +
      `<path d="M4 104 q8 -6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 V116 H4 Z" fill="#7dd3fc"/>`,
  ],
  star: [
    "twinkle twinkle",
    `<path d="M60 8 L74 42 L112 44 L82 68 L92 106 L60 84 L28 106 L38 68 L8 44 L46 42 Z" fill="#fde047"/>` +
      eye(52, 56) + eye(68, 56) + smile(60, 66, 7) + cheeks(44, 76, 66, 4.5),
  ],
};

/** Coloring-page version: keep the lines and eyes, make every colored area white. */
export function toColoring(svg) {
  return svg
    .replace(/fill="#(?!3b2b4f)[0-9a-f]{3,6}"/gi, 'fill="#fff"')
    .replace(/stroke="#(?!3b2b4f)[0-9a-f]{3,6}"/gi, 'stroke="#fff"')
    .replace(/opacity="[^"]*"/g, 'opacity="0"');
}

export const PAINT_PALS = Object.entries(ART).map(([name, [sound, body]]) => ({ name, sound, svg: wrap(body) }));
export const COLORING_PALS = PAINT_PALS.map((p) => ({ name: p.name, sound: p.sound, svg: toColoring(p.svg) }));
