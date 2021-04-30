import React from 'react'
import { Link } from 'react-router-dom'
import { useToggle } from 'react-use'
import { color } from 'src/assets/style'
import { ROUTE } from 'src/constants'
import styled, { css } from 'styled-components'

export interface IAppNavigationProps {}

export const AppNavigation: React.VFC<IAppNavigationProps> = () => {
  const [expanded, toggleHamburger] = useToggle(false)
  const handleClick = () => toggleHamburger()

  /* TODO: FIXME: ルーティング前に走る
  const hamburgerRef = React.useRef(null)
  useClickAway(hamburgerRef, () => {
    toggleHamburger(false)
  })
  */

  return (
    <AppNavigationWrapper className={expanded ? '-expanded' : ''}>
      <Top>
        <Link className="link" to={ROUTE.top}>
          Peregre
        </Link>
        <HamburgerMenu
          aria-expanded={expanded}
          onClick={handleClick}
        >
          {expanded ? 'χ' : 'ξ'}
        </HamburgerMenu>
      </Top>
      <Links>
        <Item aria-hidden={!expanded}>
          <Link className="link" to={ROUTE.rules}>
            RULES
          </Link>
        </Item>
        <Item aria-hidden={!expanded}>
          <Link className="link" to={ROUTE.character}>
            CHARACTER
          </Link>
        </Item>
        <Item aria-hidden={!expanded}>
          <Link className="link" to={ROUTE.stories}>
            STORIES
          </Link>
        </Item>
        <Item aria-hidden={!expanded}>
          <Link className="link" to={ROUTE.news}>
            NEWS
          </Link>
        </Item>
      </Links>
      <Config aria-hidden={!expanded}>
        <Link className="link" to={ROUTE.config}>
          Config
        </Link>
      </Config>
    </AppNavigationWrapper>
  )
}

const AppNavigationWrapper = styled.ul`
  width: 100%;
  text-decoration: none;
  display: flex;
  text-align: center;
  justify-content: space-between;
  padding-inline-start: 0;
  height: fit-content;
  border-bottom: 1px solid ${color.accent};
  position: fixed;
  backdrop-filter: blur(4px) grayscale(0.03);

  @media screen and (max-width: 46em) {
    display: block;
    width: 100%;
    border: 0;
    margin: 0;
    height: 3.8125em;

    &.-expanded {
      min-height: 95vh;
      background-color: rgba(254, 248, 231, 0.7);
    }
  }
`
const Links = styled.div`
  display: flex;

  @media screen and (max-width: 46em) {
    display: block;
    width: 100%;
  }
`

const ItemCss = css`
  display: block;
  font-size: 1.125em;
  padding: 0.85em 1.7em;
  cursor: pointer;

  @media screen and (max-width: 46em) {
    width: 100%;
    padding: 0.85em 0;
  }

  &:hover {
    background-color: ${color.backgroundHighContrast};
    color: ${color.fontInHighContrast};

    > a.link {
      color: ${color.fontInHighContrast};
      border-bottom: 0;
    }
  }

  > a.link {
    color: ${color.font};
    border-bottom: 0;
    font-family: 'Helvetica Neue' sans-serif;
  }
`
const Top = styled.li`
  ${ItemCss};
  font-style: italic;
  position: relative;

  @media screen and (max-width: 46em) {
    margin-bottom: 2.25rem;
    padding-right: 2.25em;
    width: calc(100% - 2.25em);
  }
`
const HamburgerMenu = styled.button`
  display: none;

  @media screen and (max-width: 46em) {
    display: block;
    position: absolute;
    top: -2px;
    right: -2px;
    border: 0;
    border-bottom: 1px solid ${color.accent};
    color: inherit;
    font-size: 1.125em;
    padding: 0.86em 1.53em;
    background-color: inherit;
    cursor: pointer;

    &:hover {
      background-color: ${color.accent};
    }
  }
`
const Item = styled.li`
  ${ItemCss};

  @media screen and (max-width: 46em) {
    &[aria-hidden='true'] {
      display: none;
    }
  }
`
const Config = styled.li`
  ${ItemCss};
  font-style: italic;

  @media screen and (max-width: 46em) {
    margin-top: 2.25rem;
    &[aria-hidden='true'] {
      display: none;
    }
  }
`
