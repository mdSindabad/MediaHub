import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import {homeReducer, movieReducer, searchReducer, tvReducer} from './reducers';

const rootReducer = combineReducers({
    home: homeReducer,
    search: searchReducer,
    movie: movieReducer,
    tv: tvReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));