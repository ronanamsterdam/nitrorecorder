'use strict';

import coreReducerItemSchema from './coreReducerItemSchema';

import { valueIsDefined } from '../../utils';

export default function specActionsWaitActionReducerItemSchema(args = {}) {

  if(!valueIsDefined(args.id) ||
     !valueIsDefined(args.type) ||
     !valueIsDefined(args.parentId) ||
     !valueIsDefined(args.parentReducerId) ||
     !valueIsDefined(args.data)) {
    throw Error('{SR} Not a valid schema args bro!');
  }

  let id              = args.id || 0,
      type            = args.type,
      parentId        = args.parentId,
      parentReducerId = args.parentReducerId,
      data            = args.data;

      return coreReducerItemSchema({
        id,
        type,
        parentId,
        parentReducerId,
        data
      });
}