import React from 'react'
import { Link } from 'react-router-dom'
import { useToggle } from 'react-use'
import { color } from 'src/assets/style'
import { ROUTE } from 'src/constants'
import styled, { css } from 'styled-components'

export interface IAppNavigationProps {}

export const AppNavigation: React.VFC<IAppNavigationProps> = () => {
  const [expanded, toggleHamburger] = useToggle(false)
  const handleClick = React.useCallback(() => toggleHamburger(), [toggleHamburger])
  const close = React.useCallback(() => toggleHamburger(false), [toggleHamburger])

  /** Chrome では Link に text-decoration: none を直接指定しない限り消えない（Safariは消える） */
  return (
    <nav>
    <AppNavigationWrapper className={expanded ? '-expanded' : ''}>
      <Top>
        <Link className="link" to={ROUTE.top} onClick={close} style={{ textDecoration: 'none' }}>
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
          <Link className="link" to={ROUTE.rules} onClick={close} style={{ textDecoration: 'none' }}>
            RULES
          </Link>
        </Item>
        <Item aria-hidden={!expanded}>
          <Link className="link" to={ROUTE.character} onClick={close} style={{ textDecoration: 'none' }}>
            CHARACTER
          </Link>
        </Item>
        <Item aria-hidden={!expanded}>
          <Link className="link" to={ROUTE.stories} onClick={close} style={{ textDecoration: 'none' }}>
            STORIES
          </Link>
        </Item>
        <Item aria-hidden={!expanded}>
          <Link className="link" to={ROUTE.news} onClick={close} style={{ textDecoration: 'none' }}>
            NEWS
          </Link>
        </Item>
      </Links>
      <Config aria-hidden={!expanded}>
        <Link className="link" to={ROUTE.config} onClick={close} style={{ textDecoration: 'none' }}>
          Config
        </Link>
      </Config>
    </AppNavigationWrapper>
    </nav>
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
  list-style: none;
  position: fixed;
  backdrop-filter: blur(4px) grayscale(0.03);
  z-index: 100;
  margin-top: 0;

  @media screen and (max-width: 46em) {
    display: block;
    width: 100%;
    border: 0;
    margin: 0;
    height: 3.8125em;

    &.-expanded {
      min-height: 99vh;
      background-color: rgba(254, 248, 231, 0.86);
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
  &:hover {
    > a.link {
      color: ${color.fontInHighContrast};
      border-bottom: 0;
      background-color: ${color.backgroundHighContrast};
    }
  }

  > a.link {
    font-size: 1.125em;
    display: block;
    padding: 0.85em 1.7em;
    color: ${color.font};
    border-bottom: 0;
    font-family: 'Helvetica Neue' sans-serif;

    @media screen and (max-width: 46em) {
      width: 100%;
      padding: 0.85em 0;
    }
  }
`
const Top = styled.li`
  ${ItemCss};
  font-style: italic;
  position: relative;

  @media screen and (max-width: 46em) {
    margin-bottom: 25vh;
    padding-right: 4em;
    width: calc(100% - 4em);
  }
`
const HamburgerMenu = styled.button`
  display: none;

  @media screen and (max-width: 46em) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 4rem;
    height: 61px;
    border: 0;
    border-bottom: 1px solid ${color.accent};
    color: inherit;
    font-size: 1.125em;
    padding: 1.115em 1.5em;
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
    margin-top: 2.25em;
    &[aria-hidden='true'] {
      display: none;
    }
  }
`
