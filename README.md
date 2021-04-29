# peregre

TRPG アプリケーション: Peregre をカスタマイズ／改善の提案をしてくださる方向けの説明書。

## バグ報告／実装要望／改善点の提案

このページの上部タブにある「Issues」から、緑色のボタン「NewIssue」を押してください。タイトルと内容さえあればラベル付けなどはこちらで行います。

## カスタマイズ

パソコンさえあれば（プログラミングの知識がなくともある程度）カスタマイズ可能です！

必要なものは

- GitHub アカウント（ソースコードをコピーするために用います）
- VSCode（ソースコードを編集するために使います）
- yarn（既存のプログラムを動作させるのに用います、ここはちょっと調べてみてください！）
- ホスティングサービス（Web サイトを誰からでも閲覧できるようにします）

作業の流れとしては

1. Zip ファイルをダウンロードする（か clone なり fork なりする）
1. ソースコードを下記を参考にして書き換える
1. VScode のメニューで Terminal を選んで開く
1. `yarn build` というコマンドを Terminal で書き込んで Enter ボタンを押す
1. ソースコード内の `build` というフォルダの中身全てをコピーする
1. `build`フォルダをホスティングサービスに入れる

ホスティングサービスによっては GitHub の URL だけを要求される場合があります。その場合、手順 1 を

- ソースコードを fork する（ここはちょっと調べてみてください。GitHub Desktop というアプリがとても使いやすいです）
- フォークしたソースコードを GitHub Desktop に追加する

に変更して、手順 5,6 を無視して、GitHub Desktop が提示するがままに ボタンを押していけばホスティングされます。（ご自身の GitHub のマイページに fork したものが表示されているはずなので、その URL をホスティングサービスに投げれば大丈夫です）

<details>
<summary>エンジニア向け</summary>

適当にこの辺り叩けば OK です！

- 基本コマンド

```
yarn
yarn start
yarn storybook
yarn test -w
```

- util コマンド

|:-:|:-:|
|`yarn generate-component`|Foo.tsx, Foo.stories.tsx, Foo.spec.tsx を自動生成します。|
|`yarn csv2json`|武器とアビリティの json データを csv から生成します。|

- ドキュメント

|:-:|:-:|
|仕様書|`(root)/doc/Specification.md`|
|コーディングルール|`(root)/doc/RULES.md`|

</details>

### 武器／アビリティをカスタマイズしたい！

`src/data/csv` に武器／アビリティデータがあるため、それを Excel / Numbers などに取り込んだ上でデータの中身を上書きしてください。その後 Terminal で `yarn csv2json` を行い、全ての作業が終われば前述のように `yarn build` をしてください。

アイコンを変更したい場合、`src/assets/icons` にアイコンを追加した上で同じ階層にある `index.ts` に `import 好きな半角英数名 from './取り込んだファイルの名前.svg'` と `export default { 先程の半角英数名 }` を書き加えてください。

アビリティの成功率を上書きしたい場合、`src/components/character/CharacterMaking.tsx` の中にある `successRate: 3.1 * Math.max(getRD(i) % 4, getRD(i) % 3, 1.5)` の行を変更してください（getRD(i) はランダムな整数を返します）。たとえば成功率を 75% に固定したいときは `successRate: 0.75` としてください。

<details>
<summary>エンジニア向け</summary>

data の型は全て `src/interfaces` に格納されています。csv のデータは全て `string` であるため `dirty` のプレフィックスがついており、マッピングは `src/components/character/CharacterMaking.tsx` で行っています。項目を増やしたい場合は上記ファイルに加えて `src/components/character/CharacterSheet.tsx` も編集してください。

武器やアビリティデータ（というよりキャラクターページ）は NPC リストとは独立しています。NPC リストのデータは `pages/stories/\[story\]/data.json` に存在します。

</detail>

### フォントをカスタマイズしたい！

`src/index.css` でベースのスタイルを定義しています。
特殊なケースでは（Hero やナビゲーション）ではフォントを上書きしています。

<details>
<summary>なぜクラスを当てないのですか</summary>

フォントはアプリケーション内で一貫させるべきで、
あらゆる箇所で ${font.body} を取り入れるよりはリセット css の中で書き換えてしまったほうが煩雑にならず、特殊なケースでの上書きも容易だと考えたためです。ただし拡張によって性質の違うものをアプリ内に混在させる必要がある場合はこの限りではありません。

</detail>
