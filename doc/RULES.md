## Directories

- \_\_snapshots: 自動生成
- \_\_stories: storybook 記載，階層は src に従う
- \_\_tests: 現状は unit テストのみ．階層は src に従う
- assets: style, icon, animation の配置
- components: pages, common, actor の配置
- pages: PAGE_NAME.tsx を配置．小さいアプリなのでコンポーネントは全て上に押し込んでここにディレクトリは作らない

## デザイン

- styled-components
- インタラクティブなコンポーネントにはニューモフィズムらしい影をつける（押せるものは上へ膨らみ押したものは下に凹む）
- インタラクティブなコンポーネントの色は（ニューモフィズムとは異なり）高いコントラストを用いる
- 非インタラクティブなコンポーネントは全て同じ平面上に置く

## コーディング規約

### 命名

- variable: lowerCamelCase
- css 変数：lowerCamelCase
- 定数: MACRO_CASE
- function: lowerCamelCase
- FunctionalComponent: UpperCamelCase

- HTML: Html

### import 順

1. React
2. styled-component
3. libraries
4. util
5. components
6. data

### HTML

- 基本的に適切なマークアップだけでスクリーンリーダーに対応し、残りを WAI-ARIA で埋める
- WAI-ARIA を意識するが、適切な実装がわからない場合はコメントだけつけておき aria, role 等を用いない

### CSS

- コントラストの低い組み合わせを文字に対して用いない
- 低いコントラストで境界を区別させる場合、両方の色が同じだとしても区別できるよう配慮する
- 状態を持つコンポーネントに対しては、色だけで状態を区別させない
- .-hidden や .-selected のような状態を表すクラスは用いず、:aria-hidden 等で対応する
- ボタンなどインタラクティブな要素はなるべく固定のサイズにする
- 非インタラクティブな要素はレスポンシブにする
- 基本的に色、余白は変数を用いる
- 絶対的な一貫性のため、フォントは直接要素に指定し他の箇所で上書きしない
- 例外的に、大きめのフォントとそれに紐づく余白 rem と vmin を合わせて大きさを定める
- 緊張感を持たせたい場面でのみ grid を用い、かつ grid の幅は不均一にする

### storybook

- Default しかないもののみに Default と名付ける
