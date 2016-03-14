'use strict';

import { ADD_USER_ACTION, ADD_EXPECT_ACTION, ADD_SPEC_SUBSTEP_STEP, CLOSE_SPEC_SUBSTEP_STEP, UPDATE_CURRENT_USER_ACTION } from '../constants/SpecActionTypes';

import specActionsReducerInitialStateSchema from '../schemas/initialStates/specActionsReducerInitialStateSchema';
import specActionsUserActionReducerItemSchema from '../schemas/reducerItems/specActionsUserActionReducerItemSchema';
import specActionsWaitActionReducerItemSchema from '../schemas/reducerItems/specActionsWaitActionReducerItemSchema';
import specActionsSubStepActionReducerItemSchema from '../schemas/reducerItems/specActionsSubStepActionReducerItemSchema';
import specActionsExpectActionReducerItemSchema from '../schemas/reducerItems/specActionsExpectActionReducerItemSchema';

import res from '../constants/res';

const initialState = specActionsReducerInitialStateSchema();

function byId(state = initialState.byId, action, idToAdd = 0) {
  let returnObj;

  switch (action.type) {
    case ADD_USER_ACTION:
      //click and input goes here
      returnObj = specActionsUserActionReducerItemSchema({
        id:               idToAdd,
        type:             action.actionType,
        parentId:         action.specStepId,
        parentReducerId:  action.parentReducerId || res.reducerTypeNames.specSteps,
        data: {
          selector:       action.selector || '[data-ft=this-is-some-none-existing-selector-bro]',
          text:           action.text,
          isReturn:       false
        }
      });

      return {...state,
        [returnObj.id]: returnObj};

    case ADD_EXPECT_ACTION:

      returnObj = specActionsExpectActionReducerItemSchema({
        id:                 idToAdd,
        type:               action.actionType,
        parentId:           action.specStepId,
        parentReducerId:    action.parentReducerId || res.reducerTypeNames.specSteps,
        childReducerId:     null,
        data: {
          expectCondition:  action.expectCondition  || 'here',
          toBeCallback:     action.toBeCallback     || 'shouldBe',
          successCondition: action.successCondition || 'some-condition',
          assertMessage:    action.assertMessage    || "But it's not here, so shame on you!",
          isReturn:         false
        }
      });

      return {...state,
        [returnObj.id]: returnObj};

    case ADD_SPEC_SUBSTEP_STEP:

      returnObj = specActionsSubStepActionReducerItemSchema({
        id:               idToAdd,
        type:             action.actionType,
        parentId:         action.specStepId
      });

      return {...state,
        [returnObj.id]: returnObj};

    default:
      return state;
  }
}

function ids(state = initialState.ids, action, idToAdd = 0) {
  switch (action.type) {
    case ADD_USER_ACTION:
    case ADD_EXPECT_ACTION:
    case ADD_SPEC_SUBSTEP_STEP:
      return [idToAdd, ...state];
    default:
      return state;
  }
}

function subStepIds(state = initialState.subStepIds, action, idToAdd = 0) {
  switch (action.type) {
    case ADD_SPEC_SUBSTEP_STEP:
      return [idToAdd, ...state];
    default:
      return state;
  }
}

export default function specActions(state = initialState, action) {

  switch (action.type) {
    case ADD_USER_ACTION:
    case ADD_EXPECT_ACTION:
    case ADD_SPEC_SUBSTEP_STEP:
      let idToAdd = state.ids.length ? state.ids[0] + 1 : 0;

      return {
        byId:             byId(state.byId, action, idToAdd),
        ids:              ids(state.ids, action, idToAdd),
        subStepIds:       subStepIds(state.subStepIds, action, idToAdd),
        reducerId:        res.reducerTypeNames.specActions
      };

    case CLOSE_SPEC_SUBSTEP_STEP:

      if(state.subStepIds.length
        && state.byId[action.currentActionId]) {

        state.byId[state.subStepIds[0]].isSubStepOpened   = false;
        state.byId[action.currentActionId].data.isReturn  = action.lastActionIsReturn;
      }

      return Object.assign({},state);

    case UPDATE_CURRENT_USER_ACTION:
    //todo -> add type comparison
      if(state.ids.length
        && state.byId[action.currentActionId]) {

        state.byId[action.currentActionId].data.text      = action.text;
        state.byId[action.currentActionId].data.selector  = action.selector;
      }

      return Object.assign({},state);

    default:
      return state;
  }
}