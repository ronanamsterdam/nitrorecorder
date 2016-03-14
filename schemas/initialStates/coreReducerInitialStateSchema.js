'use strict';

import { valueIsDefined } from '../../utils';

import res from '../../constants/res';

export default function coreReducerInitialStateSchema(chemaProps) {

      if(!valueIsDefined(chemaProps.reducerId)) {
        throw Error('Not a valid schema bro!');
      }

      return Object.assign({
        ids:        [],
        byId:       {},
        reducerId:  res.reducerTypeNames.unknown
      },chemaProps);
}