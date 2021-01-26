import { CssBaseline, Container } from '@material-ui/core';
import {Navbar, MainBody} from './components';
import {Provider} from 'react-redux';
import {store} from './components/store/store';

function App() {

  return (
    <div>
      <Provider store={store}>
        <CssBaseline />
        <Navbar />
        <MainBody />
      </Provider>
    </div>
  );
}

export default App;
