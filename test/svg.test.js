import { test } from "node:test";
import assert from "node:assert/strict";
import { extractSvg, sanitizeSvg } from "../lib/svg.js";

test("extractSvg pulls the svg out of surrounding text", () => {
  const text = 'Here you go!\n```svg\n<svg viewBox="0 0 10 10"><circle r="3"/></svg>\n```';
  assert.equal(extractSvg(text), '<svg viewBox="0 0 10 10"><circle r="3"/></svg>');
  assert.equal(extractSvg("no picture"), null);
});

test("sanitizeSvg strips scripts, handlers, and outside links", () => {
  const dirty =
    '<svg viewBox="0 0 10 10" onload="alert(1)"><script>alert(2)</script>' +
    '<image href="https://evil.example/x.png"/><foreignObject><div>hi</div></foreignObject>' +
    '<rect fill="url(https://evil.example/p)" width="5" height="5"/>' +
    '<circle fill="url(#g)" r="2"/><a href="javascript:alert(3)"><rect/></a></svg>';
  const clean = sanitizeSvg(dirty);
  assert.ok(clean.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'));
  for (const bad of ["onload", "<script", "<image", "foreignObject", "evil.example", "javascript:", "<a "]) {
    assert.ok(!clean.includes(bad), `still contains ${bad}: ${clean}`);
  }
  assert.ok(clean.includes('fill="url(#g)"'), "keeps in-document gradient references");
});

test("sanitizeSvg rejects non-svg and huge input", () => {
  assert.equal(sanitizeSvg(null), null);
  assert.equal(sanitizeSvg("<div>no</div>"), null);
  assert.equal(sanitizeSvg("<svg>" + "x".repeat(300_000) + "</svg>"), null);
});
