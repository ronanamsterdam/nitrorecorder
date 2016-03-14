'use strict';

import { ADD_SPEC_STEP, ADD_SPEC } from '../constants/SpecActionTypes';
import specStepsReducerInitialStateSchema from '../schemas/initialStates/specStepsReducerInitialStateSchema';
import specStepReducerItemSchema from '../schemas/reducerItems/specStepReducerItemSchema';

import res from '../constants/res';

const initialState = specStepsReducerInitialStateSchema();

function byId(state = initialState, action, idToAdd = 0) {
  switch (action.type) {
    case ADD_SPEC_STEP:

      let returnObj = specStepReducerItemSchema({
        id:       idToAdd,
        parentId: action.specId,
        data: {
          text:           action.text || 'a small new step for test, but a huge step for mankind...'
        },
      });

      return {...state,
        [returnObj.id]: returnObj};

    default:
      return state;
  }
}

function ids(state = initialState.ids, action, idToAdd = 0) {
  switch (action.type) {
    case ADD_SPEC_STEP:

    return [idToAdd, ...state];
  default:
    return state;
  }
}

export default function specSteps(state = initialState, action) {

  switch (action.type) {
    case ADD_SPEC_STEP:
      let idToAdd = state.ids.length ? state.ids[0] + 1 : 0;

      return {
        byId:             byId(state.byId, action, idToAdd),
        ids:              ids(state.ids, action, idToAdd),
        reducerId:        res.reducerTypeNames.specSteps
      };

    default:
      return state;
  }
}