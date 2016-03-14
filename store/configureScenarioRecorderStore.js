'use strict';

import { createStore, compose, applyMiddleware} from 'redux';
import { persistState } from 'redux-devtools';

import { localStorageKey } from '../constants/StoreConfigValues';

import SpecRecorderReducer from '../reducers/specRecorderReducer';
import DevTools from '../containers/DevTools';

import thunk from 'redux-thunk';
import compiler from '../middleware/compiler';

const finalCreateStore = compose(
  applyMiddleware(thunk, compiler),
  DevTools.instrument(),
  persistState(localStorageKey)
)(createStore);

export default function configureScenarioRecorderStore(initialState) {
  const store = finalCreateStore(SpecRecorderReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers/specRecorderReducer', () =>
      store.replaceReducer(require('../reducers/specRecorderReducer'))
    );
  }

  return store;
}