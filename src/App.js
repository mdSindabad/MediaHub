import { CssBaseline, Container } from '@material-ui/core';
import {Navbar, MainBody} from './components';

function App() {

  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Container>
        <MainBody />
      </Container>
    </div>
  );
}

export default App;
