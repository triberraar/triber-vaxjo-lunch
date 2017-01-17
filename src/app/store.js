import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// import the root reducer
import { rootReducer } from './reducers/rootReducer';

// create an object for the default data
const defaultState = {
};


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

export const store = createStore(rootReducer, defaultState, composeEnhancers(
  applyMiddleware(thunk),
));
