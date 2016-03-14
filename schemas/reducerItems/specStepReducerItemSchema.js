'use strict';

import coreReducerItemSchema from './coreReducerItemSchema';

import { valueIsDefined } from '../../utils';
import res from '../../constants/res';

export default function specStepReducerItemSchema(args = {}) {

  if(!valueIsDefined(args.parentId)) {
    throw Error('{SR} Not a valid schema args bro!');
  }

  let id              = args.id || 0,
      type            = res.reducerItemsCompilerType.specSteps,
      parentId        = args.parentId,
      parentReducerId = res.reducerTypeNames.specs,
      childReducerId  = res.reducerTypeNames.specActions,
      data            = args.data,
      blockStart      = [{
                        stepStart: {}
                      }],
      blockEnd        = [{
                        stepEnd:   {},
                      }];

      return coreReducerItemSchema({
        id,
        type,
        parentId,
        parentReducerId,
        childReducerId,
        data,
        blockStart,
        blockEnd
      });
}