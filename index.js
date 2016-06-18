'use strict';

import React from 'react';
import { render } from 'react-dom';
import RecorderRoot from './containers/RecorderRoot';

function renderRecorder() {
  return Promise.resolve().then( _ => {
    // strangely enough -> this check makes rendering possible
    // if exported as a function. @todo: Investigate
    if(!document.getElementById('RecorderRoot')) {
      console.info('{NR} 😨 Adding Recorder Root to DOM... ');
      let RecorderRoot = document.createElement('div');
      RecorderRoot.id = 'RecorderRoot';
      document.body.appendChild(RecorderRoot);
      console.info('{NR} 😀 Recorder Root added!');
    }

    render(
      <RecorderRoot />,
        document.getElementById('RecorderRoot')
    );
  });
}

export default renderRecorder();
