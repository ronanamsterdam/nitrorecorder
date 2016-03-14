'use strict';

import React from 'react';
import { render } from 'react-dom';
import RecorderRoot from './containers/RecorderRoot';

function renderRecorder() {
  //when being used as extension
  if(!document.getElementById('RecorderRoot')) {
    console.info('{NR} 😨 Adding Recorder Root to DOM... ');
    let RecorderRoot = document.createElement('div');
    RecorderRoot.id = 'RecorderRoot';
    document.body.appendChild(RecorderRoot);
    console.info('{NR} 😀 Recorder Root added!');
  }

  return render(
  <RecorderRoot />,
    document.getElementById('RecorderRoot')
  );
}

export default renderRecorder();