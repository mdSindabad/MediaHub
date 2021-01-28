import { CssBaseline } from '@material-ui/core';
import {Navbar, MainBody} from './components';
import {Provider} from 'react-redux';
import {store} from './components/store/store';
import { Footer } from './components/pages';

function App() {

  return (
    <div>
      <Provider store={store}>
        <CssBaseline />
        <Navbar />
        <MainBody />
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
