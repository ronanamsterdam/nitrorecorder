'use strict';

import * as types from '../constants/SpecActionTypes';
import res from '../constants/res';

export function addUserAction(args = {}) {
  if (!args.actionType) { throw Error("{SR} 😡 No action type? C'mon man?!")}
  return (dispatch, getState) => {
    let currentStepId   = 0,
        parentReducerId = res.reducerTypeNames.specSteps,
        state           = getState(),
        actionType      = args.actionType,
        selector        = args.selector,
        text            = args.text;

    if (state.specActions.subStepIds.length && state.specActions.byId[state.specActions.subStepIds[0]].isSubStepOpened) {
      currentStepId = state.specActions.subStepIds[0];
      //refer to it self since subSteps are part of specActions reducer -> coz the order matters
      parentReducerId = res.reducerTypeNames.specActions;
    } else if(state.specSteps.ids.length) {
      currentStepId = state.specSteps.ids[0];
    }

    dispatch({
      type:           types.ADD_USER_ACTION,
      specStepId:     currentStepId,
      actionType,
      parentReducerId,
      selector,
      text
    });
  };
}

export function updateCurrentUserAction(selector, text) {
  return (dispatch, getState) => {

    let currentActionId = 0,
        state           = getState();

    if(state.specActions.ids.length) {
      currentActionId = state.specActions.ids[0];
    }

    dispatch({
      type:           types.UPDATE_CURRENT_USER_ACTION,
      currentActionId,
      selector,
      text
    });
  };
}

export function addSubStep(args = {}) {
  return (dispatch, getState) => {

    let currentStepId = getState().specSteps.ids.length ? getState().specSteps.ids[0] : 0;

    dispatch({
      type:         types.ADD_SPEC_SUBSTEP_STEP,
      specStepId:   currentStepId,
      actionType:   res.actionTypeNames.subStep,
    });
  };
}

export function closeSubStep() {
  return (dispatch, getState) => {

    let state             = getState(),
        currentActionId,
        lastActionType,
        lastActionIsReturn = false;

    //todo - kinda unneeded check but let it be for time being
    if (state.specActions.ids.length) {
      currentActionId = state.specActions.ids.length ? state.specActions.ids[0] : 0;
      lastActionType = state.specActions.byId[currentActionId].type;
      lastActionIsReturn = lastActionType === res.actionTypeNames.subStep ? false : true;
    }

    dispatch({
      type:               types.CLOSE_SPEC_SUBSTEP_STEP,
      currentActionId,
      lastActionIsReturn
    });
  };
}

export function addExpectAction(args = {}) {
  return (dispatch, getState) => {
    let currentStepId   = 0,
        parentReducerId = res.reducerTypeNames.specSteps,
        state           = getState();

    if (state.specActions.subStepIds.length && state.specActions.byId[state.specActions.subStepIds[0]].isSubStepOpened) {
      currentStepId = state.specActions.subStepIds[0];
      //refer to it self since subSteps are part of specActions reducer -> coz the order matters
      parentReducerId = res.reducerTypeNames.specActions;
    } else if(state.specSteps.ids.length) {
      currentStepId = state.specSteps.ids[0];
    }

    dispatch({
      type:             types.ADD_EXPECT_ACTION,
      specStepId:       currentStepId,
      actionType:       res.actionTypeNames.expect,
      expectCondition:  args.expectCondition,
      toBeCallback:     args.toBe,
      successCondition: args.successCondition,
      assertMessage:    args.assertMessage,
      parentReducerId
    });
  };
}