'use strict';

import { ADD_SPEC } from '../constants/SpecActionTypes';
import specReducerItemSchema from '../schemas/reducerItems/specReducerItemSchema';
import specsReducerInitialStateSchema from '../schemas/initialStates/specsReducerInitialStateSchema';

import res from "../constants/res";

const initialState = specsReducerInitialStateSchema();

export default function byId(state = initialState, action, idToAdd = 0) {
  switch (action.type) {
    case ADD_SPEC:

      let returnObj = specReducerItemSchema(idToAdd);

      return {...state,
      [returnObj.id]: returnObj};

    default:
      return state;
  }
}

function ids(state = initialState.ids, action, idToAdd = 0) {
  switch (action.type) {
    case ADD_SPEC:
      return [idToAdd, ...state];
    default:
      return state;
  }
}

export default function specs(state = initialState, action) {
  switch (action.type) {
    case ADD_SPEC:
      let idToAdd = state.ids.length ? state.ids[0] + 1 : 0;

      return {
        byId:             byId(state.byId, action, idToAdd),
        ids:              ids(state.ids, action, idToAdd),
        reducerId:        res.reducerTypeNames.specs
      };

    default:
      return state;
  }
}