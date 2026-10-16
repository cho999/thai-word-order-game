# IPA pronunciation migration — 2026-10-16

Thai teaching content now uses IPA and explicit tone letters. Japanese romaji in the Japanese side of Rian is unchanged. Existing word IDs and localStorage keys are retained.

## Conventions

- Dictionary readings follow English Wiktionary's Thai pronunciation tables: mid ˧, low ˨˩, falling ˥˩, high ˦˥, rising ˩˩˦.
- Long vowels use ː; aspiration uses ʰ; final stop non-release uses ◌̚; diphthongs retain Wiktionary's non-syllabic mark ◌̯.
- Each whole syllable has a tone. Isolated consonant/vowel phonemes have no inherent tone. Alphabet names are whole syllables, so their readings have tones.
- Broad, isolated syllable pronunciations are teaching forms; pitch and reduction can vary in connected speech.
- For dictionary entries with multiple pronunciations, use the first slash-enclosed, tone-bearing form. Alphabet cards use the full name, not just the single-letter name. Proto-language etymologies are excluded.
- Synthetic spelling exercises follow consonant class and live/dead syllable rules. They are not presented as dictionary-attested words. Short open syllables end in ʔ.
- Falling-word distractors change IPA sounds or one complete tone contour. These are synthetic wrong answers; only the target word's correct pronunciation is dictionary-backed. Combining marks are preserved.

## Evidence and exceptions

- `data/ipa-sources.json`: retrieved IPA alternatives, request status and source URL for each lookup. Empty 404 entries record unsuccessful exact-phrase lookups, not invented pronunciations.
- `data/ipa-readings.json`: selected readings and provenance (dictionary, composition, spelling variant, or alternatives).
- `pronunciation.html`: learner-facing guide and word-by-word source links. Dictionary-derived pronunciation data is attributed to Wiktionary contributors under CC BY-SA 4.0.
- Phrases such as ขับรถ, เล่นไพ่ and ได้ไหม use component dictionary entries. Sentence readings combine attested words rather than estimating tones from the former romanization.
- ภาษาไทย redirects to ไทย on English Wiktionary, so its full reading is explicitly composed from ภาษา and ไทย. นกฮูก redirects to ฮูก, so the full owl word is taken from the dictionary's full name of ฮ.
- Thai Wiktionary lists ราเมน as a nonstandard spelling of ราเม็ง. The existing spelling is retained, with the lemma's /raː˧.meŋ˧/ pronunciation and a note in the source guide.
- The incomplete open-syllable spelling กื is corrected to กือ in the letter game. The short-vowel lab's diphthongs use the same ia̯ / ɯa̯ / ua̯ convention as the rest of the materials.
- Historical update entries still mention the romanization used at that time. Game titles/brand names retain their spelling. Home-card screenshots and their legacy copies were refreshed from the IPA version.

## Maintenance and checks

Run from the repository root:

```text
node tools/fetch-thai-ipa.mjs  # optional network lookup; cached, paced, stops on HTTP 429
node tools/migrate-ipa.mjs    # apply verified readings to JS/JSON and active UI text
node tools/build-ipa-guide.mjs
node tools/check-ipa.mjs
```

`check-ipa.mjs` checks explicit tones, representative dictionary readings, consistency between embedded and JSON data, generated syllables from all 44 consonants and 11 vowel patterns, JavaScript syntax, and local page dependencies. It does not prove linguistic correctness by itself; source records provide the pronunciation evidence.

References: [Wiktionary](https://en.wiktionary.org/), [International Phonetic Association](https://www.internationalphoneticassociation.org/content/ipa-chart), [Northern Illinois University tone rules](https://seasite.niu.edu/thai/selfassessment/module1/tone_chart.htm).
