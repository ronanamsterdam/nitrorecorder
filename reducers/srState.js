'use strict';

import { PARSE_TO_CLIENT_SPEC, ADD_TEST_HOOK_TO_TRACK, ADD_INPUT_TYPE_TO_TRACK, ADD_DESCRIPTOR, ADD_TRACKABLE_EVENT, REMOVE_TRACKABLE_EVENT } from '../constants/SpecActionTypes';

const initialState = {
  testHooksToTrack:           ['data-ft'],
  changeTypesToTrack:         ['text', 'textarea', 'select-one'],
  userActionTypesImTracking:  ['click','keyup', 'contextmenu', 'change'],
  userLoadedDescriptor:       []
};

function testHooksToTrack(state = initialState.testHooksToTrack, action) {
  switch (action.type) {
    case ADD_TEST_HOOK_TO_TRACK:
      return [action.hookToAdd, ...state];
    default:
      return state;
  }
}

function changeTypesToTrack(state = initialState.testHooksToTrack, action) {
  switch (action.type) {
    case ADD_INPUT_TYPE_TO_TRACK:
      return [action.inputTypeToAdd, ...state];
    default:
      return state;
  }
}

function userLoadedDescriptor(state = initialState.userLoadedDescriptor, action) {
  switch (action.type) {
    case ADD_DESCRIPTOR:
      //yes there's always only one descriptor allowed
      //don't see a reason right now to support multiple ones
      return [action.userLoadedDescriptor];
    default:
      return state;
  }
}

function userActionTypesImTracking(state = initialState.userActionTypesImTracking, action) {
  switch (action.type) {
    case ADD_TRACKABLE_EVENT:

      return [action.eventType, ...state];
    case REMOVE_TRACKABLE_EVENT:
      let index = state.indexOf(action.eventType);
      let returnState = state;
      if(index > -1) {
        returnState = [
          ...state.slice(0,index),
          ...state.slice(index+1,state.length)
          ];
      }
      return returnState;
    default:
      return state;
  }
}


export default function srState(state = initialState, action) {
  switch (action.type) {
    case PARSE_TO_CLIENT_SPEC:
      //todo -> may be do smthng here? or no'
      return state;

    case ADD_TEST_HOOK_TO_TRACK:
      return {
        testHooksToTrack:           testHooksToTrack(state.testHooksToTrack, action),
        changeTypesToTrack:         state.changeTypesToTrack,
        userActionTypesImTracking:  state.userActionTypesImTracking,
        userLoadedDescriptor:       state.userLoadedDescriptor
      };

    case ADD_INPUT_TYPE_TO_TRACK:
      return {
        testHooksToTrack:           state.testHooksToTrack,
        changeTypesToTrack:         changeTypesToTrack(state.changeTypesToTrack, action),
        userActionTypesImTracking:  state.userActionTypesImTracking,
        userLoadedDescriptor:       state.userLoadedDescriptor
      };

    case ADD_DESCRIPTOR:
      return {
        testHooksToTrack:           state.testHooksToTrack,
        changeTypesToTrack:         state.changeTypesToTrack,
        userActionTypesImTracking:  state.userActionTypesImTracking,
        userLoadedDescriptor:       userLoadedDescriptor(state.userLoadedDescriptor, action)
      };

    case ADD_TRACKABLE_EVENT:
    case REMOVE_TRACKABLE_EVENT:
      return {
        testHooksToTrack:           state.testHooksToTrack,
        changeTypesToTrack:         state.changeTypesToTrack,
        userActionTypesImTracking:  userActionTypesImTracking(state.userActionTypesImTracking, action),
        userLoadedDescriptor:       state.userLoadedDescriptor
      };

    default:
      return state;
  }
}