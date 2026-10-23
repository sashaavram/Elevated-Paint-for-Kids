import { test } from "node:test";
import assert from "node:assert/strict";
import { parseRequest, layoutScene, describe, buildIndex, MAGIC_IDEAS } from "../public/magic.js";

const index = buildIndex();
const names = (p) => p.items.map((it) => `${it.count} ${it.entry.name}`);

test("reads counts, scenes and plurals", () => {
  const p = parseRequest("three ducks on the farm", index);
  assert.deepEqual(names(p), ["3 duck"]);
  assert.equal(p.scene, "meadow");
  assert.equal(describe(p), "Three ducks outside!");
});

test("prefers the app's own Paint Pals art", () => {
  const p = parseRequest("a lion in the jungle", index);
  assert.equal(p.items[0].entry.kind, "image");
  assert.equal(p.scene, "jungle");
});

test("matches multi-word things and kid words", () => {
  assert.deepEqual(names(parseRequest("a fire truck and a teddy bear", index)), ["1 fire truck", "1 teddy bear"]);
  assert.deepEqual(names(parseRequest("my kitty and 2 puppies", index)), ["1 cat", "2 dog"]);
  assert.deepEqual(names(parseRequest("a trex", index)), ["1 T rex"]);
  assert.deepEqual(names(parseRequest("lots of butterflies", index)), ["5 butterfly"]);
});

test("snow is a place, a snowman is a thing", () => {
  const p = parseRequest("a snowman in the snow", index);
  assert.deepEqual(names(p), ["1 snowman"]);
  assert.equal(p.scene, "snow");
});

test("coloring pages, colors and unknown words", () => {
  const p = parseRequest("a red dinosaur coloring page with a zorblax", index);
  assert.equal(p.coloring, true);
  assert.equal(p.color, "#ff3b30");
  assert.deepEqual(p.unknown, ["zorblax"]);
  assert.ok(p.items[0].entry.coloringSvg);
});

test("never places more than 8 things, sky things go up top", () => {
  const p = parseRequest("100 cats and a sun", index);
  const placed = layoutScene(p.items, 1600, 1000);
  assert.equal(placed.length, 8);
  const sun = placed.find((x) => x.entry.name === "sun");
  const cat = placed.find((x) => x.entry.name === "cat");
  assert.ok(!sun, "the cats used up all 8 spots");
  const two = layoutScene(parseRequest("a cat and a sun", index).items, 1600, 1000);
  assert.ok(two.find((x) => x.entry.name === "sun").y < two.find((x) => x.entry.name === "cat").y);
  assert.ok(cat);
});

test("every idea button makes something", () => {
  for (const [, idea] of MAGIC_IDEAS) {
    const p = parseRequest(idea, index);
    assert.ok(p.items.length > 0, idea);
    assert.deepEqual(p.unknown, [], idea);
  }
});
