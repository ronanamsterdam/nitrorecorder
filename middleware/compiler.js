'use strict';

import { PARSE_TO_CLIENT_SPEC } from '../constants/SpecActionTypes';
import jtc from 'jtc';
import { valueIsDefined } from '../utils';

let beautify = require('js-beautify').js_beautify;

// parses an object of valid format for compiler -> ATS magic happens here
// the tree is being build
function parseFromClient(reducerId, state, scopedCollection) {

  function scopeToReducer(parentReducerId, parentReduerItemId, childReducerId) {

    if(Array.isArray(childReducerId) && childReducerId.length) {
      let resultAccumulator = [];
      for (var i = childReducerId.length - 1; i >= 0; i--) {
        resultAccumulator = [...resultAccumulator, ...scopeToReducer(parentReducerId, parentReduerItemId, childReducerId[i])];
      }

      return resultAccumulator;
    }
    else {
      if (state[childReducerId]) {
        let processReducer = state[childReducerId];
        if (processReducer.ids.length) {
          let result = {}
            for(let key in processReducer.byId) {
              let reducerItem = processReducer.byId[key];
              if(reducerItem.parentReducerId === parentReducerId && reducerItem.parentId === parentReduerItemId) {
                result[reducerItem.id] = reducerItem;
              }
            }

          return parseFromClient(processReducer.reducerId, state, result);
        } else {
          return [];
        }
      } else {
        throw Error('Unknown childReducerId :' + childReducerId);
      }
    }
  }

  let returnObj = [];

  if(state[reducerId]) {
    let processReducer = state[reducerId];

    let processCollection = scopedCollection || processReducer.byId;

    for (let key in processCollection) {

      let dataToParse = processCollection[key];

      let parsedObj = {};

      if(!dataToParse.type || !dataToParse.data) {throw Error('No type!');}

      parsedObj[dataToParse.type] = {};

      let typeObj = parsedObj[dataToParse.type];

      for (let key in dataToParse.data) {
        typeObj[key] = dataToParse.data[key];
      }

      //process children here?
      if (valueIsDefined(dataToParse.childReducerId)) {
        let childrenObj = scopeToReducer(processReducer.reducerId, dataToParse.id, dataToParse.childReducerId);
         if(childrenObj.length) {
           typeObj.body = dataToParse.body || typeObj.body || [];
           typeObj.body = [...dataToParse.blockStart, ...typeObj.body, ...childrenObj, ...dataToParse.blockEnd];
         }
      }

      returnObj = returnObj || [];
      returnObj = [...returnObj,parsedObj];
    }
  } else {
    return;
  }

  return returnObj;
}

function startParsing(store) {

  let state = store.getState();

  if(state.specActions.ids.length && !state.specSteps.ids.length) {
    console.warn("{NR} 😨 Hey you have some actions added but no steps -> they are not gonna be added to end spec.");
    console.info("{NR} 😉 Use it(...) block to fix that");
  }

  let userLoadedDescriptor = !!state.srState.userLoadedDescriptor.length && state.srState.userLoadedDescriptor[0];
  console.warn('{NR} 😨 Parsing started...');

  let result = parseFromClient('specs', state);

  let jtcResult = jtc(result, userLoadedDescriptor);

  console.info('{NR}{FROM JTC} 😎 JTW RETURN SPEC \n %c ' + beautify(jtcResult), 'color: #AF2AC2');

  console.info('{NR} 😅 Parsing end! Yayy!');
}

export default store => next => action => {
    if (action.type === PARSE_TO_CLIENT_SPEC) {
      Promise.resolve().then(() => startParsing(store));
    }

    return next(action);
}