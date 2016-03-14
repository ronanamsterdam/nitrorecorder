'use strict';

import * as types from '../constants/SpecActionTypes';

import {valueIsDefined} from '../utils';

export function parseToClientSpec() {
  return (dispatch) => {

    dispatch({
      type: types.PARSE_TO_CLIENT_SPEC
    });
  };
}

export function addTestHookToTrack(args = {}) {
  return (dispatch) => {
    if(!args.hookToAdd) { console.warn("%c {SR} 😤 Hey bro! Where's the hookToAdd value? I'm aint adding nothing. 😕 ", 'color: red'); return;}

    dispatch({
      type:       types.ADD_TEST_HOOK_TO_TRACK,
      hookToAdd:  args.hookToAdd
    });
  };
}

export function addTrackableEvent(eventType) {
  return (dispatch) => {
    dispatch({
      type:       types.ADD_TRACKABLE_EVENT,
      eventType:  eventType
    });
  };
}

export function removeTrackableEvent(eventType) {
  return (dispatch) => {
    dispatch({
      type:       types.REMOVE_TRACKABLE_EVENT,
      eventType:  eventType
    });
  };
}

export function addDescriptor(fileInput) {
  return (dispatch) => {
    function fileInputChangeListener(inputChangeEvent) {
      if(inputChangeEvent.target.files[0]) {
        let file = inputChangeEvent.target.files[0];
        let reader = new FileReader();

        reader.onloadend = (e) => {
          try {
            let newDescriptor = JSON.parse(e.target.result);

            for(let key in newDescriptor) {
              let newDescriptorItem = newDescriptor[key];
              if(!newDescriptorItem.spec || !valueIsDefined(newDescriptorItem.spec.start) || !valueIsDefined(newDescriptorItem.spec.end)){
                throw Error("{SR} 😤 Boy! That's aint a valid descriptor!");
              }
            }

            dispatch({
              type:                 types.ADD_DESCRIPTOR,
              userLoadedDescriptor: newDescriptor
            });
          } catch(e) {
            console.error("{SR} 😤 Well something went wrong when I tried to parse that bro! Make sure that's a valid JSON file! " + (e.massage || e));
          }

          //because that's how you clear the FileList :/
          inputChangeEvent.target.value = '';
        };

        reader.onerror = () => {
          console.error('{SR} 😤 Well something when I tried to load that file bro!');
        };

        reader.readAsText(file);
      }

      fileInput.removeEventListener('change', fileInputChangeListener);
    };

    if(fileInput) {
      fileInput.addEventListener('change', fileInputChangeListener);
    }
  };
}