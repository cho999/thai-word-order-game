const marks = /[\u0e31\u0e34-\u0e3a\u0e47-\u0e4e]/u;
let maskSequence = 0;

export function maskedWord(question, mode, fontFamily) {
  const size = 64, baseline = 88, padding = 16;
  const context = document.createElement('canvas').getContext('2d');
  context.font = `${size}px ${fontFamily}`;
  const measure = text => context.measureText(text);
  const word = question.th, position = question.position, letter = question.answer;
  let start = position;
  if (marks.test(letter)) while (start > 0 && marks.test(word[start])) start--;
  const base = word[start], baseMetrics = measure(base);
  let x = padding + measure(word.slice(0, start)).width;
  let width = Math.max(measure(letter).width, baseMetrics.width);
  let top = baseline - baseMetrics.actualBoundingBoxAscent - 1;
  let bottom = baseline + baseMetrics.actualBoundingBoxDescent + 1;

  if (marks.test(letter)) {
    width = baseMetrics.width;
    if (/[ุู]/u.test(letter)) {
      top = baseline + baseMetrics.actualBoundingBoxDescent + 1;
      bottom = baseline + measure(base + letter).actualBoundingBoxDescent + 1;
    } else if (mode === 2) {
      let end = start + 1;
      while (end < word.length && marks.test(word[end])) end++;
      const cluster = word.slice(start, end);
      top = baseline - measure(cluster).actualBoundingBoxAscent - 1;
      bottom = baseline - measure(cluster.replace(letter, '')).actualBoundingBoxAscent - 1;
    } else {
      top = baseline - measure(base + letter).actualBoundingBoxAscent - 1;
      bottom = baseline - baseMetrics.actualBoundingBoxAscent - 1;
    }
  }
  // Keep the intact syllable's shaping. Only the selected glyph's region is hidden.
  const wordWidth = measure(word).width + padding * 2;
  const svg = (tag, attrs = {}, text) => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
    if (text) node.textContent = text;
    return node;
  };
  const id = `question-mask-${++maskSequence}`;
  const result = svg('svg', {viewBox: `0 0 ${wordWidth} 132`, class: 'masked-word', 'aria-hidden': 'true', focusable: 'false'});
  result.style.width = `${wordWidth / size}em`;
  const defs = svg('defs');
  const mask = svg('mask', {id, maskUnits: 'userSpaceOnUse', x: '0', y: '0', width: String(wordWidth), height: '132'});
  const hideX = marks.test(letter) ? x - 1 : x - baseMetrics.actualBoundingBoxLeft - 1;
  const hideWidth = marks.test(letter) ? width + 2 : baseMetrics.actualBoundingBoxLeft + baseMetrics.actualBoundingBoxRight + 2;
  mask.append(svg('rect', {width: String(wordWidth), height: '132', fill: 'white'}),
    svg('rect', {x: String(hideX), y: String(top), width: String(hideWidth), height: String(Math.max(1, bottom - top)), fill: 'black'}));
  defs.append(mask);
  result.append(defs, svg('text', {x: String(padding), y: String(baseline), 'font-size': String(size), fill: 'currentColor', mask: `url(#${id})`}, word));
  // An SVG outline replaces the unsupported underscore + combining-mark sequence.
  const slotHeight = Math.max(9, bottom - top - 4);
  result.append(svg('rect', {x: String(x + 2), y: String(top + 2), width: String(Math.max(8, width - 4)), height: String(slotHeight), rx: '3', class: 'missing-slot'}));
  return result;
}
