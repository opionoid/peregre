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
`

export default App;
