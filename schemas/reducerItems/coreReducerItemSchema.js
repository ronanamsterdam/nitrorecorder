'use strict';

import { valueIsDefined } from '../../utils';

export default function coreReducerItemSchema(chemaProps) {

      if(!valueIsDefined(chemaProps.id) || !valueIsDefined(chemaProps.type)) {
        throw Error('Not a valid schema bro!');
      }

      return Object.assign({
        id:                   0,
        type:                 'notype',
        parentId:             null,
        parentReducerId:      null,
        childReducerId:       null,
        data:                 {},

        blockStart:           [],
        blockEnd:             [],

        body:                 null
      },chemaProps);
}