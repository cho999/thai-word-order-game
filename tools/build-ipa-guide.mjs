import fs from 'node:fs';
import { readings, provenance, letterNames } from './ipa-data.mjs';
const escape = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const rows=Object.keys(readings).sort((a,b)=>a.localeCompare(b,'th')).map(thai=> {
  const p=provenance[thai];
  const note=p.kind==='composed'?'Combined from the linked dictionary words.':p.kind==='alternatives'?'Two alternative pronouns.':p.kind==='spelling-variant'?'Nonstandard spelling of ราเม็ง; pronunciation follows that dictionary lemma.':p.kind==='dictionary-letter-name'?'Full word from the dictionary name of ฮ.':'';
  const ipa=letterNames[thai] || readings[thai];
  return `<tr><td lang="th">${thai}</td><td class="ipa-text">${escape(ipa)}</td><td>${p.sources.map((url,i)=>`<a href="${escape(url)}">Wiktionary${p.sources.length>1?' '+(i+1):''}</a>`).join(' · ')}${note?`<small>${note}</small>`:''}</td></tr>`;
}).join('\n');
const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>IPA and Thai tones | Nari's Thai Adventure</title>
<meta name="description" content="Read Thai IPA and five tone marks, with word-by-word Wiktionary pronunciation sources.">
<link rel="stylesheet" href="assets/css/theme.css"><link rel="stylesheet" href="assets/css/ipa.css"></head>
<body class="nari-theme"><main class="ipa-page">
<a href="index.html">← Back to games</a><h1>IPA and Thai tones / IPA・声調記号</h1>
<p>Thai pronunciation is shown in the International Phonetic Alphabet (IPA). Each complete syllable carries its tone, including the mid tone. Dictionary words follow the pronunciation shown in the linked Wiktionary entries, checked on 16 October 2026. If an entry lists multiple pronunciations, the first standard form is used. Letter cards use the full alphabet name.</p>
<p>タイ語の読みをIPA（国際音声記号）で示しています。中声を含め、各音節の末尾に声調記号を付けています。単語は下のWiktionaryの発音欄を参照し、例文は単語の読みを組み合わせています。</p>
<table><thead><tr><th>Tone / 声調</th><th>IPA tone letters</th><th>Example</th></tr></thead><tbody>
<tr><td>Mid / 中声</td><td>˧</td><td class="ipa-text">แมว mɛːw˧</td></tr>
<tr><td>Low / 低声</td><td>˨˩</td><td class="ipa-text">ไก่ kaj˨˩</td></tr>
<tr><td>Falling / 下降声</td><td>˥˩</td><td class="ipa-text">พ่อ pʰɔː˥˩</td></tr>
<tr><td>High / 高声</td><td>˦˥</td><td class="ipa-text">ม้า maː˦˥</td></tr>
<tr><td>Rising / 上昇声</td><td>˩˩˦</td><td class="ipa-text">หมา maː˩˩˦</td></tr>
</tbody></table>
<p>ː marks a long vowel; ʰ marks aspiration; ʔ marks a glottal stop; ◌̚ marks an unreleased final stop; ◌̯ marks the non-syllabic part of a diphthong; . separates syllables. t͡ɕ and tɕ are two ways to write the same affricate. The symbol j means a “y” sound, not English “j”. The symbols ɯ, ɤ, ɛ, ɔ and ŋ represent distinct sounds, not English spelling.</p>
<p>Individual consonant or vowel sounds such as /k/ or /aː/ have no inherent tone. Practice syllables are built from their consonant class, vowel and syllable type. They are spelling exercises, and are not all dictionary words. Short open practice syllables include a final ʔ. The separate vowel lab uses the same IPA conventions.</p>
<p>Sources: <a href="https://www.internationalphoneticassociation.org/content/ipa-chart">International Phonetic Association chart</a>; <a href="https://seasite.niu.edu/thai/selfassessment/module1/tone_chart.htm">Northern Illinois University: Thai tone rules</a>. Tone contours here follow Wiktionary’s teaching notation; actual pitch varies between speakers and contexts.</p>
<h2>Dictionary readings / 単語ごとの出典</h2><p>Pronunciation data adapted from Wiktionary contributors under <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. Source links identify each contributing page. Formatting changes remove enclosing slashes; compound phrases are marked below.</p>
<label for="ipa-search">Find Thai or IPA / タイ語・IPAで検索</label><input id="ipa-search" type="search" placeholder="หมา or maː" autocomplete="off">
<div class="table-scroll"><table id="ipa-dictionary"><thead><tr><th>Thai</th><th>IPA with tones</th><th>Source</th></tr></thead><tbody>${rows}</tbody></table></div>
</main><script src="shared/ipa-guide.js"></script></body></html>\n`;
fs.writeFileSync('pronunciation.html',html);
const bundle='output/classifiers-emoji-quest/';
fs.copyFileSync('assets/css/ipa.css',bundle+'ipa.css');
fs.copyFileSync('shared/ipa-guide.js',bundle+'ipa-guide.js');
fs.writeFileSync(bundle+'pronunciation.html',html.replace('assets/css/theme.css','theme.css').replace('assets/css/ipa.css','ipa.css').replace('shared/ipa-guide.js','ipa-guide.js'));
