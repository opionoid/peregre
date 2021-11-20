import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Reveal } from 'react-genie'
import { ReactGenieAnimations, Animation } from 'react-genie-styled-components'
import styled from 'styled-components'
import { AppNavigation } from './components/common/AppNavigation'
import { ROUTE } from './constants'
import { CharacterPage } from './pages/character'
import { NewsPage } from './pages/news'
import { RulesPage } from './pages/rules'
import { StoriesPage } from './pages/stories'
import { TopPage } from './pages/top'
import { PrivacyPage } from './pages/privacy'
import { TermsPage } from './pages/terms'
import { AppFooter } from './components/common/AppFooter'
import { StoryPage } from './pages/stories/_id'
import { Suspense } from 'react'

function App() {
  return (
    <>
      <ReactGenieAnimations />
      <RecoilRoot>
        <Router>
          <Suspense fallback={<p>読み込み中</p>}>
            <AppNavigation />
            <Reveal animation={Animation.FadeInUp}>
              <Body>
                <Switch>
                  <Route exact path={ROUTE.rules} component={RulesPage} />
                  <Route exact path={ROUTE.character} component={CharacterPage} />
                  <Route exact path={ROUTE.stories} component={StoriesPage} />
                  <Route path={`${ROUTE.stories}/:id`} component={StoryPage} />
                  <Route exact path={ROUTE.news} component={NewsPage} />
                  <Route exact path={ROUTE.privacy} component={PrivacyPage} />
                  <Route exact path={ROUTE.terms} component={TermsPage} />
                  <Route exact path={ROUTE.top} component={TopPage} />
                  <Route component={TopPage} />
                </Switch>
                <AppFooter />
              </Body>
            </Reveal>
          </Suspense>
        </Router>
      </RecoilRoot>
    </>
  )
}

const Body = styled.div`
  padding-top: 7.875rem;
`

export default App
