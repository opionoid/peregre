
import React from 'react'
import { Link } from 'react-router-dom'
import { color, space } from 'src/assets/style'
import { ROUTE } from 'src/constants'
import styled from 'styled-components'

export interface IAppFooterProps { }

export const AppFooter: React.VFC<IAppFooterProps> = () => {
  return (
    <footer>
      <FooterItem>
        <p>©︎ 2021, ことれの</p>
        <LinkList>
          <ListItem>
            <Link to={ROUTE.terms}>利用規約</Link>
          </ListItem>
          <ListItem>
            <Link to={ROUTE.privacy}>プライバシーポリシー</Link>
          </ListItem>
          <ListItem>
            <Link to="/">お問い合わせ</Link>
          </ListItem>
        </LinkList>
      </FooterItem>
    </footer>
  )
}

const FooterItem = styled.div`
  width: 100%;
  padding: 1.125em 0;
  background-color: ${color.backgroundHighContrast};
  text-align: center;
  color: ${color.fontInHighContrast};
`
const LinkList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  column-gap: ${space.m}
`
const ListItem = styled.li`
  & > *,
  & > *:visited {
    color: ${color.fontInHighContrast};
    text-decoration: none;
    border: 0;
  }
`
