# 移行マップ

## 正規配置

今後の正規配置は以下に寄せる。

| 表示名 | 現在 | 移行先 |
| --- | --- | --- |
| ホーム | `index.html` | `index.html` |
| リアン | `word-order.html`, `style.css`, `script.js` | `games/rian/` |
| アクソーン　タイ | `thai-letter-memory/` | `games/akson-thai/` |
| フックタイカムサップ | `vocab-practice.html`, `vocab-practice.css`, `vocab-practice.js` | `games/phuk-thai-kham-sap/` |
| ジャム　アクソーン　タイ | `C:\Users\DPU\Documents\Thai-script-game` | `games/jam-akson-thai/` |

## 正規URL

旧URLは将来の必須互換対象にしない。
公開時に案内するURLは以下へ統一する。

```text
/
/games/rian/
/games/akson-thai/
/games/phuk-thai-kham-sap/
/games/jam-akson-thai/
```

## 共通ファイルの配置

| 種類 | 移行先 | 備考 |
| --- | --- | --- |
| テーマCSS | `assets/css/theme.css` | 色、背景、フォント、基本変数 |
| 共通UI CSS | `assets/css/components.css` | ボタン、カード、バナー、結果画面、ナーリー吹き出し |
| ナーリー完成画像 | `assets/images/nari/chibi/` | 公開で使うPNG |
| ナーリー作業素材 | `assets/images/nari/source/` | source、contact sheet、preview |
| バナー | `assets/images/banners/` | ホーム誘導バナー |
| スクリーンショット | `assets/images/screenshots/` | ゲーム選択カード |
| 共通データ | `data/` | JSON化した語彙、文字、お題 |
| 共通JS | `shared/` | 小さなユーティリティだけ |

## Stage 4a の状況

共有先へコピー済みの公開アセット:

```text
assets/images/banners/nari-adventure-link-banner.png
assets/images/screenshots/word-order.png
assets/images/screenshots/letter-memory.png
assets/images/screenshots/thai-script.png
assets/images/nari/chibi/chibi-cheer.png
assets/images/nari/chibi/chibi-idea.png
assets/images/nari/chibi/chibi-surprised.png
assets/images/nari/chibi/chibi-thinking.png
assets/images/nari/chibi/chibi-wink.png
```

追加済みの共通CSS:

```text
assets/css/theme.css
assets/css/components.css
```

旧コピー元の画像やCSSは削除しない。
まず新URL側だけを共有アセット参照へ寄せる。

## Stage 5 の状況

既存ゲームJSからデータ候補をJSONへコピー済み。
この段階では、ゲーム本体はまだJSONを読み込まない。

```text
data/vocabulary.json
data/word-order-challenges.json
data/word-order-levels.json
data/thai-letters.json
data/vocab-lessons.json
data/jam-akson-thai.json
data/nari-comments.json
```

共有JS候補を追加済み。
この段階では、既存ゲームにはまだ接続しない。

```text
shared/random.js
shared/dom.js
shared/storage.js
shared/nari-feedback.js
```

`games/phuk-thai-kham-sap/` は `data/vocab-lessons.json` を読み込む形へ移行済み。
読み込みに失敗した場合は、埋め込みのフォールバックLessonで動作する。

## Stage 5c のコード整理

挙動を変えない低リスクな整理として、インライン資産を外部ファイルへ分離済み。

```text
assets/css/home.css
games/jam-akson-thai/style.css
games/jam-akson-thai/script.js
```

ホームの巨大な `<style>` は `assets/css/home.css` へ移動。
`games/jam-akson-thai/index.html` の `<style>` と `<script>` は、それぞれ `style.css` と `script.js` へ移動。
旧リポジトリ側の `Thai-script-game` は変更していない。

## 移行ルール

- Stage 3ではコピー移行から始め、動作確認後に旧ファイル削除を検討する。
- 各ゲームは1つずつ移す。
- 画像パスとCSSパスの変更は、移したゲームだけで完結させる。
- `localStorage` キーは当面維持する。
- `Thai-script-game` は最終的にこのリポジトリへ統合する。
- 作業用画像は削除せず、まず `assets/images/nari/source/` に集約する。

## Stage 3 の推奨順

1. `games/phuk-thai-kham-sap/` - Stage 3でコピー移行済み。旧ファイルはまだ残す。
2. `games/rian/` - Stage 3bでコピー移行済み。旧ファイルはまだ残す。
3. `games/akson-thai/` - Stage 3cでコピー移行済み。旧ファイルはまだ残す。
4. `games/jam-akson-thai/` - Stage 3dでコピー統合済み。元リポジトリはまだ残す。

最初にフックタイカムサップを移す理由は、構成が `html/css/js` の3ファイルで分かれており、画像参照も少ないため。
