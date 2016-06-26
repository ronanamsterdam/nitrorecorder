'use strict';

import React from 'react';
import { render } from 'react-dom';
import RecorderRoot from './containers/RecorderRoot';

import res from './constants/res';

function renderRecorder() {
  return Promise.resolve().then( _ => {
    // strangely enough -> this check makes rendering possible
    // if exported as a function. @todo: Investigate
    if(!document.getElementById(res.rootId)) {
      console.info('{NR} 😨 Adding NR Root to DOM... ');
      let NRRoot = document.createElement('div');
      NRRoot.id = res.rootId;
      document.body.appendChild(NRRoot);
      console.info('{NR} 😀 NR Root added!');
    }

    render(
      <RecorderRoot />,
        document.getElementById(res.rootId)
    );
  });
}

export default renderRecorder();
