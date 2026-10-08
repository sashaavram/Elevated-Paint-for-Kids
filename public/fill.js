// Paint-bucket fill. Looks at what you can see (background + painting) to find
// the area, then paints that area onto the drawing layer.

const TOLERANCE = 100; // sum of RGB differences still counted as "the same color"

export function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Returns a mask (1 = fill) of the region connected to (sx, sy), or null if nothing to do. */
export function regionMask(pixels, w, h, sx, sy, fillRgb) {
  sx = Math.floor(sx);
  sy = Math.floor(sy);
  if (sx < 0 || sy < 0 || sx >= w || sy >= h) return null;
  const start = (sy * w + sx) * 4;
  const r0 = pixels[start], g0 = pixels[start + 1], b0 = pixels[start + 2];
  if (Math.abs(r0 - fillRgb[0]) + Math.abs(g0 - fillRgb[1]) + Math.abs(b0 - fillRgb[2]) < 12) return null;

  const same = (i) => {
    const p = i * 4;
    return Math.abs(pixels[p] - r0) + Math.abs(pixels[p + 1] - g0) + Math.abs(pixels[p + 2] - b0) <= TOLERANCE;
  };

  const mask = new Uint8Array(w * h);
  const stack = [sx, sy];
  while (stack.length) {
    const y = stack.pop();
    let x = stack.pop();
    let i = y * w + x;
    while (x > 0 && !mask[i - 1] && same(i - 1)) { x--; i--; }
    let up = false;
    let down = false;
    for (; x < w && !mask[i] && same(i); x++, i++) {
      mask[i] = 1;
      if (y > 0) {
        const a = i - w;
        if (!mask[a] && same(a)) { if (!up) { stack.push(x, y - 1); up = true; } } else up = false;
      }
      if (y < h - 1) {
        const b = i + w;
        if (!mask[b] && same(b)) { if (!down) { stack.push(x, y + 1); down = true; } } else down = false;
      }
    }
  }

  // Grow by one pixel so the soft edges of lines don't leave a white halo.
  const grown = mask.slice();
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (mask[i]) continue;
      if ((x > 0 && mask[i - 1]) || (x < w - 1 && mask[i + 1]) || (y > 0 && mask[i - w]) || (y < h - 1 && mask[i + w])) {
        grown[i] = 1;
      }
    }
  }
  return grown;
}

export function floodFill(paintCtx, seeCtx, x, y, hex, w, h) {
  const rgb = hexToRgb(hex);
  const seen = seeCtx.getImageData(0, 0, w, h).data;
  const mask = regionMask(seen, w, h, x, y, rgb);
  if (!mask) return false;
  const img = paintCtx.getImageData(0, 0, w, h);
  const out = img.data;
  for (let i = 0; i < mask.length; i++) {
    if (!mask[i]) continue;
    const p = i * 4;
    out[p] = rgb[0];
    out[p + 1] = rgb[1];
    out[p + 2] = rgb[2];
    out[p + 3] = 255;
  }
  paintCtx.putImageData(img, 0, 0);
  return true;
}
