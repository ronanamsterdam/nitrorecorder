'use strict';

import coreReducerInitialStateSchema from './coreReducerInitialStateSchema';
import specReducerItemSchema from '../reducerItems/specReducerItemSchema';
import res from '../../constants/res';

export default function specsReducerInitialStateSchema() {

  let reducerId = res.reducerTypeNames.specs,
      ids   = [0],
      byId  =  {
        0 : specReducerItemSchema(0)
      };

  return coreReducerInitialStateSchema({
    reducerId,
    ids,
    byId
  });
}