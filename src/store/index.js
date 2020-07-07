import thunk from 'redux-thunk';
import reducer from './reducer';
import { createStore, compose, applyMiddleware } from 'redux';

import * as actions from './actions';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export { actions };
export default createStore(reducer, composeEnhancer(applyMiddleware(thunk)));