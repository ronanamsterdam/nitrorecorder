'use strict';

import coreReducerItemSchema from './coreReducerItemSchema';

import res from '../../constants/res';

export default function specReducerItemSchema(id) {

  let type            = res.reducerItemsCompilerType.specs,
      childReducerId  = res.reducerTypeNames.specSteps,
      data = {
        text:               'dis is a mocked spec description text',
        slug:               'thatIsASpecMehtod'
      },
      blockStart = [{
        beforeAll: {}
      }],
      blockEnd = [{
        afterAll: {}
      }];

      return coreReducerItemSchema({
        id,
        type,
        childReducerId,
        data,
        blockStart,
        blockEnd
      });
}