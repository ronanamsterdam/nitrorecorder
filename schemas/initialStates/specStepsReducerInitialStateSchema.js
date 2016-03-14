'use strict';

import coreReducerInitialStateSchema from './coreReducerInitialStateSchema';
import res from '../../constants/res';

export default function specStepsReducerInitialStateSchema() {

  let reducerId = res.reducerTypeNames.specSteps;

  return coreReducerInitialStateSchema({
    reducerId
  });
}