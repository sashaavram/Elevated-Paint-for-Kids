import { test } from "node:test";
import assert from "node:assert/strict";
import { regionMask } from "../public/fill.js";

// 10x10 white image with a black square outline from (2,2) to (7,7)
function picture() {
  const w = 10, h = 10;
  const px = new Uint8ClampedArray(w * h * 4).fill(255);
  for (let i = 2; i <= 7; i++) {
    for (const [x, y] of [[i, 2], [i, 7], [2, i], [7, i]]) {
      const p = (y * w + x) * 4;
      px[p] = px[p + 1] = px[p + 2] = 0;
    }
  }
  return { px, w, h };
}

test("fill stays inside a closed outline (plus a 1px edge)", () => {
  const { px, w, h } = picture();
  const mask = regionMask(px, w, h, 5, 5, [255, 0, 0]);
  assert.equal(mask[5 * w + 5], 1);
  assert.equal(mask[3 * w + 3], 1);
  assert.equal(mask[2 * w + 4], 1, "grows onto the line edge");
  assert.equal(mask[0], 0, "outside is untouched");
  assert.equal(mask[1 * w + 4], 0, "does not leak past the line");
});

test("filling outside covers the outside only", () => {
  const { px, w, h } = picture();
  const mask = regionMask(px, w, h, 0, 0, [0, 0, 255]);
  assert.equal(mask[0], 1);
  assert.equal(mask[9 * w + 9], 1);
  assert.equal(mask[5 * w + 5], 0);
});

test("filling with the same color does nothing", () => {
  const { px, w, h } = picture();
  assert.equal(regionMask(px, w, h, 5, 5, [255, 255, 255]), null);
  assert.equal(regionMask(px, w, h, -1, 5, [1, 2, 3]), null);
});
