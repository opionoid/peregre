import { Link } from "react-router-dom"
import { color } from "src/assets/style"
import { ROUTE } from "src/constants"
import styled, { css } from "styled-components"

export const TopPage: React.VFC = () => {
  return (
    <Top>
      {/** TODO: HeroはCanvasにする v2.0 */}
      <Hero>
        <Title>Peregre</Title>
      </Hero>
      <div>
        <Wave xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <Parallax>
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(254, 248, 231, 0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(254, 248, 231, 0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(254, 248, 231, 0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill={color.background} />
          </Parallax>
        </Wave>
      </div>
      <article>
        <section>
          <TitleH2>目指すは、廃都ラトリス</TitleH2>
          <p>あなたたちは、あるときは鍛冶屋として、またあるときは水売りとして、呪いを解くため巡礼の旅に出る。目指すは忌まわしき廃都ラトリス。神に触れようとしたため裁きを受けたとされる地は、いまなお人々に罰を与え続けているという。</p>
        </section>
        <hr />
          <Aphorism>
            かねて種に水はあり、朽ちて湖へ還る。<br />芽生えし者よ、空を恐れたまえ。
          </Aphorism>
        <hr />
        <section>
          <TitleH2Right>ROGUELITE<br/>TRPG</TitleH2Right>
          <ImageAndText>
            <TextRight>遊ぶたび、新たな巡礼者として旅路を行く。そのだれもが異なる器と異なる技術を持ち、紡がれる物語もまた、それぞれ変化していくことだろう。</TextRight>
          </ImageAndText>
        </section>
        <NavSection>
          <TitleH2Center>旅が、はじまる</TitleH2Center>
          <NavLinks>
            <Link to={ROUTE.rules}>
              <NavLinkToRules>RULES</NavLinkToRules>
            </Link>
            <Link to={ROUTE.character}>
              <NavLinkToCharacter>Character</NavLinkToCharacter>
            </Link>
          </NavLinks>
        </NavSection>
        <section>
        </section>
      </article>
    </Top>
  )
}

const Top = styled.div`
  margin-top: -8em;
  padding: 0;
`

const Hero = styled.div`
  width: 100%;
  height: 80vh;
  background: url('winter.jpg') center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Title = styled.h1`
  color: ${color.fontInHighContrast};
  font-size: calc(6rem + 2.0vmin);
  text-shadow: 2px 1px ${color.font};
`
const Wave = styled.svg`
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: 1em;
  height: 8em;
  margin-top: -16em;
`
const Parallax = styled.g`
> use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
> use:nth-child(1) {
  animation-delay: -4s;
  animation-duration: 7s;
}
> use:nth-child(2) {
  animation-delay: -6.6s;
  animation-duration: 10s;
}
> use:nth-child(3) {
  animation-delay: -8.8s;
  animation-duration: 13s;
}
> use:nth-child(4) {
  animation-delay: -10s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% { 
    transform: translate3d(85px,0,0);
  }
}
`
const Aphorism = styled.p`
  font-family: 'New Tegomin';
  font-size: 1.125rem;
  text-indent: 0;
  text-align: center;
`

/**
 * TODO: 以下はタイトルにマージンを持たせているが
 * セクションに持たせるのが正しいし、タイトルも共通部分を切り出すべき
 */
const TitleH2 = styled.h2`
  margin-top: 2.25em;
  font-family: 'Shippori Mincho';
  font-weight: 500;
`
const TitleH2Right = styled.h2`
  margin-top: 3.375em;
  font-family: 'Shippori Mincho';
  font-weight: 500;
  text-align: end;
  line-height: 1.4;
`
const TitleH2Center = styled.h2`
  font-family: 'Shippori Mincho';
  font-weight: 500;
  text-align: center;
`
const ImageAndText = styled.div`
  margin-top: -3.375em;
  display: flex;
  min-height: 15.657em;
  justify-content: end;
  background: url('winter.jpg') left no-repeat;
  background-size: cover;
  background-size: 66% auto;
  //border-radius: 12em 0 0 1em;
`
const TextRight = styled.p`
  width: 24em;
  height: fit-content;
  padding: 2.25em;
  padding-right: 0;
  margin: 4.5em 0 0 auto;
  background-color: ${color.background}; //rgba(254, 248, 231, 0.8);
  backdrop-filter: blur(6px) grayscale(1);
`
const NavSection = styled.section`
  width: 100vw;
  margin-left: calc(-0.5 * (100vw - 38em));
  color: ${color.fontInHighContrast};
  background-color: ${color.backgroundHighContrast};
  padding: 3.375em 0;
  margin-top: 6.75em;
`
const NavLinks = styled.div`
  width: 38em;
  margin: 0 auto;
`
const NavLinkCss = css`
  color: ${color.fontInHighContrast};
  font-size: 2.25rem;
`
/** TODO: いい感じの背景画像とホバーエフェクト */
/** 種から芽が出て伸びるみたいなよくあるやつがいい */
const NavLinkToRules = styled.div`
  ${NavLinkCss};
  margin-top: 2.25em;
`

const NavLinkToCharacter = styled.div`
  ${NavLinkCss};
  margin: 2.25rem auto 0 0;
  text-align: end;
`