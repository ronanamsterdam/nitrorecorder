'use strict';

import coreReducerItemSchema from './coreReducerItemSchema';

import { valueIsDefined } from '../../utils';

import res from '../../constants/res';

export default function specActionsSubStepActionReducerItemSchema(args = {}) {

  if(!valueIsDefined(args.id) ||
     !valueIsDefined(args.type) ||
     !valueIsDefined(args.parentId)) {
    throw Error('{SR} Not a valid schema args bro!');
  }

  let id              = args.id || 0,
      type            = args.type,
      parentId        = args.parentId,
      parentReducerId = res.reducerTypeNames.specSteps,
      childReducerId  = res.reducerTypeNames.specActions,
      isSubStepOpened = true;

      return coreReducerItemSchema({
        id,
        type,
        parentId,
        parentReducerId,
        childReducerId,
        isSubStepOpened
      });
}