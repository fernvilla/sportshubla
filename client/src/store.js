import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loadState } from './localStorage';
import rootReducer from './reducers';

const persistedState = loadState();
const middleware = [thunk];
const store = createStore(rootReducer, persistedState, compose(applyMiddleware(...middleware)));

export default store;
