'use strict';

import * as SpecActions from './SpecActions';
import * as StepActions from './StepActions';
import * as SrStateActions from './SrStateActions';

export default Object.assign(StepActions, SpecActions, SrStateActions);