import styled from 'styled-components';
import { color } from './assets/style';
import { CharacterPage } from './pages/character';

function App() {
  return (
    <AppStyle>
      {/** TODO: rooting */}
      <CharacterPage />
    </AppStyle>
  );
}

const AppStyle = styled.div`
  img {
    color: ${color.fontInHighContrast};

    &:active {
      color: ${color.accent};
    }
  }

  /*
   * typography
   *   注) table は定義していない
   */
  body {
    font: 16px/1.7 -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // ハイフン
    -ms-hyphenate-limit-chars: 6 3 2;
    -ms-hyphenate-limit-zone: 8%;
    -ms-hyphenate-limit-last: always;
    // 特殊な文字
    font-variant-ligatures: common-ligatures;
    font-variant-caps: all-small-caps;
    font-kerning: none;

    @media screen and (min-width: 60em) {
      body {
        font-size: 1.125rem;
      }
    }

    @media screen and (min-width: 120em) {
      body {
        font-size: 1.375rem;
      }
    }
  }

  // 要素のフォントサイズ
  h1 {
    font-size: calc(0.5rem + 2.8vmin);
    line-height: 1;
    font-variant-numeric: lining-nums;
  }
  h2 {
    font-size: calc(0.5rem + 2.5vmin);
    line-height: 1.1;
    font-variant-numeric: lining-nums;
  }
  h3 {
    font-size: calc(0.5rem + 2.3vmin);
    line-height: 1.2;
    font-variant-numeric: lining-nums;
  }
  h4, h5, h6 { 
    font-size: calc(0.5rem + 2.1vmin);
    line-height: 1.3;
    font-variant-numeric: lining-nums;
  }
  p {
    font-size: 1rem;
    margin-bottom: 1.7em;
    font-variant-numeric: oldstyle-nums;
  }

  p + p {
    text-indent: 1.5em;
    margin-top: 0;
  }
  
  // サンクンキャップ
  article p:first-of-type::first-letter {
    initial-letter: 3 2;
  }

  // フルーロン
  hr {
    height: 1em;
    border: 0;
    background: url('src/assets/icons/F__fleuron.svg') center no-repeat;
    background-size: contain;
  }

  // リストの初期化
  ol {
    padding-left: 0;
    margin-left: 0;
    list-style: none;
    counter-reset: initialized-list;
  }

  ol li::before {
    counter-increment: initialized-list;
    content: counter(initialized-list);
    margin-left: -1.5em;
    margin-right: 1em;
  }

  // リンク 
  a {
    text-decoration: none;
    border-bottom: 1px solid #e0c3ac;
  }

  @supports (text-decoration-skip: ink) {
    a {
      text-decoration: underline solid #e0c3ac;
      text-decoration-skip: ink;
      border-bottom: 0;
    }
  }

  // 上つき文字／下つき文字
  sub {
    font-feature-settings: "subs" 1;
  }
  @supports(font-variant-position: sub) {
    sub {
      font-feature-settings: normal;
      font-variant-position: sub;
    }
  }
  @supports((font-variant-position: sub) or (font-feature-settings: "subs" 1)) {
    sub {
      vertical-align: baseline;
      font-size: inherit;
    }
  }
  sup {
    font-feature-settings: "sups" 1;
  }
  @supports(font-variant-position: super) {
    sup {
      font-feature-settings: normal;
      font-variant-position: super;
    }
  }
  @supports((font-variant-position: super) or (font-feature-settings: "sups" 1)) {
    sup {
      vertical-align: baseline;
      font-size: inherit;
    }
  }

  // 約物
  blockquote {
    text-align: center;
    position: relative;
  }
  blockquote::before {
    content: '&ldquo';
    margin-left: -0.6ch;
  }
  blockquote::after {
    content: '.&rdquo';
    margin-right: -1.1ch;
  }

  // 記事レイアウト
  article {
    max-width: 38em;
    margin-left: auto;
    margin-right: auto;
  }
  aside {
    margin: 1em;

    @media only screen and (min-width: 60em) {
      width: 10em;
      float: left;
      margin-left: -11em;
      margin-top: 0;
    }

    @media only screen and (min-width: 49em) {
      width: 10em;
      float: left;
      margin-left: -5em;
      margin-top: 0;
    }
  }
`

export default App;
