import { Reveal } from 'react-genie'
import { Animation } from 'react-genie-styled-components'
import { Link } from 'react-router-dom'
import { color } from 'src/assets/style'
import { ROUTE } from 'src/constants'
import styled, { css } from 'styled-components'

export const TopPage: React.VFC = () => {
  return (
    <Top id="top">
      {/** TODO: HeroはCanvasにする v2.0 */}
      <Hero>
        <Title>Peregre</Title>
      </Hero>
      <div>
        <Wave
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <Parallax>
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(254, 248, 231, 0.7)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(254, 248, 231, 0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(254, 248, 231, 0.3)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              fill="rgb(254, 248, 231)"
            />
          </Parallax>
        </Wave>
      </div>
      <article>
        <Reveal animation={Animation.FadeInUp}>
          <section>
            <TitleH2>妖異を祓え</TitleH2>
            <p>
              妖異を祓える異能のものがいる。彼らは神官、巡礼者、祓い士、神主など、さまざまな呼び名でひっそりと平穏を保ってきた。
              しかし彼らもまた妖異に近い存在。あるときふと、隣にいるものが何かに憑かれているかも、と思う時がある。
            </p>
          </section>
        </Reveal>
        <Reveal animation={Animation.FadeInUp}>
          <hr />
          <Aphorism>
            かねて種に水はあり、朽ちて湖へ還る。
            <br />
            芽生えし者よ、空を恐れたまえ。
          </Aphorism>
          <hr />
        </Reveal>
        <Reveal animation={Animation.FadeInUp}>
          <section>
            <TitleH2Right>
              散らばってしまった
              <br />
              運命
            </TitleH2Right>
            <ImageAndText>
              <TextRight>
                妖異を祓うものが、妖異に取り込まれたり、協力したり、あるいはより冷徹になったり。
                みなの関係性がほつれては結びつき、結びついてはほつれていく。
                誰もが最善の結末を望んでいたが、今はもう、どこへ向かえばよいか分からない。
              </TextRight>
            </ImageAndText>
          </section>
        </Reveal>
        <Reveal animation={Animation.FadeInUp}>
          <NavSection>
            <TitleH2Center>旅が、はじまる</TitleH2Center>
            <NavLinks>
              {/** Chrome対策 */}
              <Link to={ROUTE.rules} style={{ textDecoration: 'none' }}>
                <NavLinkToRules>
                  RULES
                  <span />
                </NavLinkToRules>
              </Link>
              <Link to={ROUTE.character} style={{ textDecoration: 'none' }}>
                <NavLinkToCharacter>CHARACTER</NavLinkToCharacter>
              </Link>
            </NavLinks>
          </NavSection>
        </Reveal>
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
  font-size: calc(5rem + 2.6vmin);
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
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
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
      transform: translate3d(-90px, 0, 0);
    }
    100% {
      transform: translate3d(85px, 0, 0);
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
 * セクションに持たせるのが正しい
 */
const TitleH2 = styled.h2`
  margin-top: 2.25em;
`
const TitleH2Right = styled.h2`
  margin-top: 3.375em;
  text-align: end;
  line-height: 1.4;
`
const TitleH2Center = styled.h2`
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
  margin-left: min(calc(-0.5 * (100vw - 38em)), -2em);
  color: ${color.fontInHighContrast};
  background-color: ${color.backgroundHighContrast};
  padding: 6.375em 0 11em;
  margin-top: 9.75em;
`
const NavLinks = styled.div`
  width: 100%;
  max-width: min(38em, calc(100% - 48px));
  margin: 0 auto;
`
const NavLinkCss = css`
  display: block;
  color: ${color.fontInHighContrast};
  font-size: 2.25rem;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid ${color.backgroundHighContrast};
  transition: all 0.3s ease-out;
  background-size: cover;
  background-size: 1% 1%;

  &:hover {
    transform-origin: left;
    border-color: ${color.background};
    background-size: 20% auto;
    letter-spacing: 0.2em; // 可読性を下げるしあんまりいいアニメーションじゃない
  }
`
const NavLinkToRules = styled.div`
  ${NavLinkCss};
  margin-top: 2.25em;
`
const NavLinkToCharacter = styled.div`
  ${NavLinkCss};
  margin: 2.25rem auto 0 0;
  text-align: end;
`
