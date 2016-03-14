'use strict';

import { combineReducers } from 'redux';
import specActions from './specActions';
import specSteps from './specSteps';
import specs from './specs';

import srState from './srState';

const SpecRecorderReducer = combineReducers({
  specs,
  specSteps,
  specActions,
  srState
  });

export default SpecRecorderReducer;