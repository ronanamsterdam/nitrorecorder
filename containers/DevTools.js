'use strict';

import React from 'react';
import { ActionCreators, createDevTools } from 'redux-devtools';
import LogMonitor from '../redux-devtools-log-monitor-save-load';
import DockMonitor from 'redux-devtools-dock-monitor';

import { localStorageKey } from '../constants/StoreConfigValues';

import {valueIsDefined} from '../utils'

export const DevToolsActionCreators = ActionCreators;

var validateLoad = (newState) => {
  return !(
      !valueIsDefined(newState.monitorState) ||
      !valueIsDefined(newState.actionsById) ||
      !valueIsDefined(newState.nextActionId) ||
      !valueIsDefined(newState.stagedActionIds) ||
      !valueIsDefined(newState.skippedActionIds) ||
      !valueIsDefined(newState.currentStateIndex) ||
      !valueIsDefined(newState.computedStates)
      );
}

export default createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'>
    <LogMonitor persistentStateLocalStoreKey={'redux-dev-session-'+localStorageKey}
                loadValidationCb={validateLoad}/>
  </DockMonitor>
);
