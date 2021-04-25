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

### storybook

- Default しかないもののみに Default と名付ける
