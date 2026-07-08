# タイ語学習ゲーム整理計画

## 目的

ナーリーのタイ語学習ゲーム群を、今後の追加・公開・紹介に耐えられる構造へ整理する。
現在は個人利用段階なので、旧URL互換よりも将来の保守性を優先する。

## 現在動いているゲーム

| 表示名 | 現在の場所 | 現在の公開上の扱い | 主な構成 |
| --- | --- | --- | --- |
| ホーム | `index.html` | `thai-word-order-game/` | HTML内にCSS直書き |
| リアン | `word-order.html`, `style.css`, `script.js` | `thai-word-order-game/word-order.html` | 語彙・お題データが `script.js` に直書き |
| アクソーン　タイ | `thai-letter-memory/` | `thai-word-order-game/thai-letter-memory/` | 文字レベルデータが `thai-letter-memory/script.js` に直書き |
| フックタイカムサップ | `vocab-practice.html`, `vocab-practice.css`, `vocab-practice.js` | `thai-word-order-game/vocab-practice.html` | Lesson語彙と進捗保存が `vocab-practice.js` に直書き |
| ジャム　アクソーン　タイ | sibling repo `C:\Users\DPU\Documents\Thai-script-game` | `Thai-script-game/` | `index.html` 1ファイル内にHTML/CSS/JS/データが混在 |

## 現状の主な問題

- 共通テーマCSSが4か所に重複している。
- ナーリー画像が `thai-letter-memory/assets/chibi/` に置かれ、全体アセットなのに個別ゲーム配下に見える。
- 公開用画像、生成元画像、contact sheet、preview画像が同じ周辺に混在している。
- 語彙、文字、語順お題、ナーリーコメントがJSへ直書きされている。
- `Thai-script-game` だけ別リポジトリで、共通CSSや共通画像の更新が二重管理になる。
- ホームのリンク先が外部URLとローカル相対URLで混ざっている。

## 追跡済みファイル

```text
index.html
word-order.html
style.css
script.js
vocab-practice.html
vocab-practice.css
vocab-practice.js
thai-letter-memory/index.html
thai-letter-memory/style.css
thai-letter-memory/script.js
assets/banners/nari-adventure-link-banner.png
assets/screens/word-order.png
assets/screens/letter-memory.png
assets/screens/thai-script.png
thai-letter-memory/assets/chibi/chibi-cheer.png
thai-letter-memory/assets/chibi/chibi-idea.png
thai-letter-memory/assets/chibi/chibi-surprised.png
thai-letter-memory/assets/chibi/chibi-thinking.png
thai-letter-memory/assets/chibi/chibi-wink.png
```

## 未追跡ファイルの扱い

現在の主な未追跡ファイルは、ナーリーの追加表情・生成元・contact sheet・バナープレビュー。
削除はすぐ行わず、まず以下に分類する。

```text
assets/images/nari/chibi/        # 公開で使う完成PNG
assets/images/nari/source/       # source/contact sheet/previewなど作業用
assets/images/banners/           # 公開で使うバナー
assets/images/screenshots/       # ホームカード用スクショ
```

## 目標構造

```text
thai-word-order-game/
  index.html
  assets/
    css/
      theme.css
      components.css
    images/
      nari/
        chibi/
        source/
      banners/
      screenshots/
  data/
    thai-letters.json
    vocabulary.json
    word-order-challenges.json
    vocab-lessons.json
    nari-comments.json
  shared/
    dom.js
    random.js
    storage.js
    nari-feedback.js
  games/
    rian/
      index.html
      style.css
      script.js
    akson-thai/
      index.html
      style.css
      script.js
    phuk-thai-kham-sap/
      index.html
      style.css
      script.js
    jam-akson-thai/
      index.html
      style.css
      script.js
  docs/
    refactor-plan.md
```

## 正規URL案

旧URL互換は必須ではないため、最終的には以下を正規とする。

```text
/
/games/rian/
/games/akson-thai/
/games/phuk-thai-kham-sap/
/games/jam-akson-thai/
```

`Thai-script-game` は最終的にこのリポジトリへ統合する候補。
統合後、別リポジトリは案内ページかアーカイブ扱いにできる。

## 移行ステージ

### Stage 1: 棚卸しと計画

今回のステージ。調査とこの文書の作成だけを行う。
コード移動、URL変更、削除は行わない。

### Stage 2: 新フォルダ構造の追加

空の新構造を作り、ホームから新しいゲームURLへ向ける準備をする。
この段階では旧ファイルを残し、コピー中心で進める。

対象候補:

```text
games/
assets/css/
assets/images/
data/
shared/
```

Stage 2で作成した対応表は `docs/migration-map.md` に置く。
正規URLは `/games/.../` に統一し、`Thai-script-game` は最終的にこのリポジトリへ統合する方針とする。
旧URL維持は必須条件にしない。

### Stage 3: ゲーム配置の移行

4ゲームを `games/` 配下へ移す。
まずは中身を大きく書き換えず、パス修正だけで動かす。

優先順:

1. `vocab-practice` -> `games/phuk-thai-kham-sap/`
2. `word-order` -> `games/rian/`
3. `thai-letter-memory` -> `games/akson-thai/`
4. `Thai-script-game` -> `games/jam-akson-thai/`

### Stage 4: 共通CSSと画像整理

重複しているテーマ部分を `assets/css/theme.css` へ切り出す。
ボタン、カード、バナー、ナーリー吹き出し、結果画面を `assets/css/components.css` へ切り出す。
ナーリー画像は `assets/images/nari/` へ集約する。

### Stage 5: データ分離

JS直書きデータをJSONへ移す。
最初は `fetch()` で読むだけにし、複雑なビルド手順は入れない。

候補:

```text
data/vocabulary.json
data/word-order-challenges.json
data/thai-letters.json
data/vocab-lessons.json
data/nari-comments.json
```

### Stage 6: 共有JS切り出し

小さく安全な関数から共有する。

候補:

```text
shared/random.js       # shuffle, sample
shared/dom.js          # selector helper
shared/storage.js      # localStorage wrapper
shared/nari-feedback.js
```

ゲーム本体のロジックは急に統合しない。

Stage 5では先にJSONと共有JS候補だけを追加し、既存ゲームの実行経路には接続しない。
読み込み方式の変更は、次のステージで1ゲームずつ行う。

### Stage 7: 動作確認と公開

ローカルで4ゲームの主要導線を確認する。
確認後にGitHubへpushし、Pagesの公開URLを確認する。

最低確認項目:

- ホームから4ゲームへ移動できる
- 各ゲームからホームへ戻れる
- 各ゲームで1ラウンド開始できる
- 結果画面でナーリー画像が表示される
- CSSと画像の404がない
- 進捗保存が壊れていない

## リスクと対策

- パス変更による画像404: 1ゲームずつ移し、ローカルサーバーで確認する。
- JSON化による読み込み失敗: 先に静的ファイル配置だけ行い、後でデータ読み込みへ移る。
- `localStorage` キー変更による進捗消失: 既存キーは維持するか、移行コードを入れる。
- 別リポジトリ統合時の履歴分断: 必要なら元リポジトリURLを記録し、統合コミットに明記する。
- 未追跡素材の誤削除: Stage 4までは削除せず、sourceフォルダへ退避する。

## 次に行うこと

Stage 2に進む前に、以下を確認する。

- `Thai-script-game` をこのリポジトリへ統合してよいか。
- 旧URLは残さず、新URLを正規にしてよいか。
- 作業用画像もGit管理に含めるか、公開用だけGit管理にするか。
- まずコピー移行にするか、即移動にするか。
