'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';

import Recorder from '../components/core/Recorder';

import configureScenarioRecorderStore from '../store/configureScenarioRecorderStore';


export default class RecorderRoot extends Component {
  render() {
    const store = configureScenarioRecorderStore();

    return (
      <div>
        <Provider store={store}>
          <div>
            <Recorder />
            <div>
              <DevTools />
            </div>
          </div>
        </Provider>
      </div>
    );
  }
}