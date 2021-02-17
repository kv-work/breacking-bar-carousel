import {
  createStore, compose, Store,
} from 'redux';

import rootReducer, { State } from './reducer';

const store = createStore(rootReducer);

export default store;
