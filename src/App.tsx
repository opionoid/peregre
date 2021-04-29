import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AppNavigation } from './components/common/AppNavigation'
import { ROUTE } from './constants'
import { CharacterPage } from './pages/character'
import { NewsPage } from './pages/news'
import { RulesPage } from './pages/rules'
import { StoriesPage } from './pages/stories'

function App() {
  return (
    <Router>
      <AppNavigation />
      <Route exact path={ROUTE.rules} component={RulesPage} />
      <Route exact path={ROUTE.character} component={CharacterPage} />
      <Route exact path={ROUTE.stories} component={StoriesPage} />
      <Route exact path={ROUTE.news} component={NewsPage} />
      <Route path={ROUTE.top} />
    </Router>
  )
}

export default App
