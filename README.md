# peregre

TRPG アプリケーション: Peregre をカスタマイズ／改善の提案をしてくださる方向けの説明書。

## バグ報告／実装要望／改善点の提案

このページの上部タブにある「Issues」から、緑色のボタン「NewIssue」を押してください。タイトルと内容さえあればラベル付けなどはこちらで行います。

## 基本情報

### コマンド

| command | 内容 |
|:-:|:-:|
|`yarn`||
|`yarn start`||
|`yarn storybook`||
|`yarn test`||
|`yarn generate-component`|Foo.tsx, Foo.stories.tsx, Foo.spec.tsx を自動生成します。|
|`yarn csv2json`|武器とアビリティの json データを csv から生成します。|

### ドキュメント

|ドキュメント|パス|
|:-:|:-:|
|仕様書|`(root)/doc/Specification.md`|
|コーディングルール|`(root)/doc/RULES.md`|

## カスタマイズ

### 武器／アビリティ

`src/data/csv` に武器／アビリティデータがあるため、それを Excel / Numbers などに取り込んだ上でデータの中身を上書きしてください。その後  `yarn csv2json` を叩けば完了です。もし既存のデータを残すならデータの変換パスを `package.json` の `scripts` を編集してください。

アイコンを変更したい場合、`src/assets/icons` にアイコンを追加した上で同じ階層にある `index.ts` に `import 好きな半角英数名 from './取り込んだファイルの名前.svg'` と `export default { 先程の半角英数名 }` を書き加えてください。

アビリティの成功率を上書きしたい場合、`src/components/character/CharacterMaking.tsx` の中にある `successRate: 3.1 * Math.max(getRD(i) % 4, getRD(i) % 3, 1.5)` の行を変更してください（getRD(i) はランダムな整数を返します）。たとえば成功率を 75% に固定したいときは `successRate: 0.75` としてください。

data の型は全て `src/interfaces` に格納されています。csv のデータは全て `string` であるため `dirty` のプレフィックスがついており、マッピングは `src/components/character/CharacterMaking.tsx` で行っています。項目を増やしたい場合は上記ファイルに加えて `src/components/character/CharacterSheet.tsx` も編集してください。

武器やアビリティデータ（というよりキャラクターページ）は NPC リストとは独立しています。NPC リストのデータは `pages/stories/\[story\]/data.json` に存在します。

### タイポグラフィ

`src/index.css` でベースのスタイルを定義しています。
特殊なケースでは（Hero やナビゲーション）ではフォントを上書きしています。

<details>
<summary>なぜクラスを当てないのですか</summary>

フォントはアプリケーション内で一貫させるべきで、
あらゆる箇所で ${font.body} を取り入れるよりはリセット css の中で書き換えてしまったほうが煩雑にならず、特殊なケースでの上書きも容易だと考えたためです。ただし拡張によって性質の違うものをアプリ内に混在させる必要がある場合はこの限りではありません。

</detail>
