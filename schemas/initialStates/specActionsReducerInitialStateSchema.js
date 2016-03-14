'use strict';

import coreReducerInitialStateSchema from './coreReducerInitialStateSchema';
import res from '../../constants/res';

export default function specActionsReducerInitialStateSchema() {

  let reducerId   =  res.reducerTypeNames.specActions,
      subStepIds  =  [];

  return coreReducerInitialStateSchema({
    reducerId,
    subStepIds
  });
}