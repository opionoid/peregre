import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { ROUTE } from './constants'
import { CharacterPage } from './pages/character'
import { NewsPage } from './pages/news'
import { RulesPage } from './pages/rules'
import { StoriesPage } from './pages/stories'

function App() {
  return (
    <Router>
      <Link to={ROUTE.rules}>RULES</Link>
      <Link to={ROUTE.character}>CHARACTER</Link>
      <Link to={ROUTE.stories}>STORIES</Link>
      <Link to={ROUTE.news}>NEWS</Link>
      <Route exact path={ROUTE.rules} component={RulesPage} />
      <Route exact path={ROUTE.character} component={CharacterPage} />
      <Route exact path={ROUTE.stories} component={StoriesPage} />
      <Route exact path={ROUTE.news} component={NewsPage} />
    </Router>
  )
}

export default App
