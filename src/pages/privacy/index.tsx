import { Reveal } from 'react-genie'
import { Animation } from 'react-genie-styled-components'
import styled from 'styled-components'

const EFFECTIVE_DATE = '2021年11月14日'

export const PrivacyPage: React.VFC = () => {
  return (
    <Privacy>
      <h1>PRIVACY POLICY</h1>
      <Reveal animation={Animation.FadeInUp}>
        <hr />
        <section>
          <h2>取得する情報と取得方法</h2>
          <p>Peregre（以下「当サイト」）は、{EFFECTIVE_DATE}時点では一切の情報を取得していませんが、将来的に以下の目的のため Google Analytics を導入します。導入した際は当ページを改定するとともに、ニュースにてお知らせいたします。</p>
          <ul>
            <li>武器・スキル・アビリティの選択回数から人気を把握するため、これらを収集します。</li>
            <li>コンフィグの選択回数から標準でONにしたほうがよい項目を把握するため、これらを収集します。</li>
            <li>個人を特定する情報は含まれません。</li>
          </ul>
          <h2>クッキー・ローカルストレージの利用</h2>
          <p>当サイトはクッキーを利用しておりませんが、ローカルストレージを、コンフィグ情報の保存のため利用しております。</p>
          <details>
            <summary>ローカルストレージとは</summary>
            <p>ローカルストレージとは、ウェブサイトが個人のコンピュータやスマートフォンなどのデバイス上でデータを保存、または取得できるようにする業界標準の技術です。保存や取得はブラウザごとに行われます。</p>
          </details>
          <h2>プライバシーポリシーの改定</h2>
          <p>ニュースページにてお知らせします。</p>
          <h2>お問い合わせ</h2>
          <p>お問い合わせページにて受け付けております。</p>
        </section>
      </Reveal>
    </Privacy>
  )
}

const Privacy = styled.article`
  margin-bottom: 9em;
  &::before {
    content: '';
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    background-image: url('https://picsum.photos/1200/1200');
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    width: 100%;
    height: 100vh;
    filter: opacity(0.1) grayscale(0.1) blur(4px) sepia(1);
  }
`
