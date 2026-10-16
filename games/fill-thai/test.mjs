import fs from 'node:fs';
import assert from 'node:assert/strict';
class Element {
  children = []; dataset = {}; handlers = {}; value = '0';
  classList = { add() {} };
  addEventListener(event, handler) { this.handlers[event] = handler; }
  replaceChildren(...children) { this.children = children; }
  append(...children) { this.children.push(...children); }
  setAttribute() {} focus() {}
  get firstElementChild() { return this.children[0]; }
}
const elements = new Map();
const get = id => { if (!elements.has(id)) elements.set(id, new Element()); return elements.get(id); };
globalThis.document = { getElementById: get, createElement: () => new Element() };
const load = path => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
globalThis.fetch = async path => ({ ok: true, json: async () => load(path) });
let scheduled;
globalThis.setTimeout = handler => { scheduled = handler; return 1; };
globalThis.clearTimeout = () => { scheduled = null; };
const { makePool, alphabets } = await import('./script.js');
await new Promise(resolve => setImmediate(resolve));
assert.equal(get('start').disabled, false);
const mother = load('../../data/vocab-lessons.json').flatMap(l => l.words).find(w => w.thai === 'แม่');
const words = load('../../data/vocabulary.json').concat([{ th: mother.thai, ja: '母', thaiReading: mother.roman }]);
for (let level = 0; level < 4; level++) {
  const pool = makePool(words, level);
  assert.ok(pool.length >= 8);
  for (const q of pool) {
    assert.ok(alphabets[level].includes(q.answer));
    assert.equal(q.masked.replace('＿', q.answer), q.th);
    assert.ok(q.thaiReading);
    assert.match(q.english, /^[a-z /]+$/);
  }
  get('level').value = String(level); get('start').handlers.click();
  const seen = new Set();
  for (let index = 0; index < 8; index++) {
    const q = pool.find(q => q.masked === get('word').textContent && q.english === get('meaning').textContent);
    assert.ok(q); seen.add(q.th);
    assert.equal(get('feedback').children.length, 0);
    const wrong = index === 0;
    const button = get('choices').children.find(b => wrong ? b.dataset.letter !== q.answer : b.dataset.letter === q.answer);
    button.handlers.click();
    assert.equal(get('feedback').children[1].textContent, `Pronunciation: ${q.thaiReading}`);
    assert.ok(get('choices').children.every(b => b.disabled));
    // Repeated clicks cannot change a locked answer.
    button.handlers.click();
    if (wrong) {
      assert.equal(get('next').hidden, false); assert.equal(scheduled, null);
      get('next').handlers.click();
    } else { assert.equal(typeof scheduled, 'function'); scheduled(); }
  }
  assert.equal(seen.size, 8);
  assert.equal(get('score').textContent, '7 / 8 correct');
  assert.equal(get('result').hidden, false);
  assert.equal(get('review').children.length, 1);
  console.log(`Level ${level + 1}: pool, eight unique questions, hidden pronunciation, answer locking, progression and result passed`);
}
