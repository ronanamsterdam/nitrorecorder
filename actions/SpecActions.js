'use strict';

import * as types from '../constants/SpecActionTypes';

export function addStep(args = {}) {
  return (dispatch, getState) => {

    let currentSpecId = getState().specs.ids.length ? getState().specs.ids[0] : 0;

    dispatch({
      type: types.ADD_SPEC_STEP,
      specId: currentSpecId,
      text: args.text
    });
  };
}

export function addSpec(args = {}) {
  return (dispatch, getState) => {

    let currentSpecId = getState().specs.ids.length ? getState().specs.ids[0] : 0;

    dispatch({
      type: types.ADD_SPEC,
      specId: currentSpecId
    });
  };
}