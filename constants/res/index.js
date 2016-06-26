'use strict';

export default {
  rootId:         'NRRoot',
  ui: {
    addStep:      'it(...)',
    openSubStep:  'open  .then(...)',
    closeSubStep: 'close .then(...)',
    addExpect:    'expect(...)',
    addWait:      'waitForEl(...)',
    addTestHook:  'test hook',
    addLog:       'log(...)',
    addCapture:   'capture(...)',
    addNavigate:  'navigateTo(...)',
    addCustom:    'custom(...)',
    addDescriptor:'load descriptor',
    parse:        '➡ ︎generate spec',
    close:        'close',
  },

  reducerTypeNames: {
    specs:        'specs',
    specSteps:    'specSteps',
    specActions:  'specActions',
    unknown:      'unknownReducer'
  },

  //those types are gonna be used by compiler descriptor
  reducerItemsCompilerType: {
    specs:      'describe',
    specSteps:  'step'
  },

  //those types are gonna be used by compiler descriptor
  actionTypeNames: {
    click:        'click',
    input:        'input',
    log:          'log',
    capture:      'capture',
    navigate:     'navigate',
    custom:       'custom',
    contextmenu:  'contextmenu',
    expect:       'expect',
    subStep:      'subStep',
    wait:         'wait'
  },

  //add action labels
  addActionForm: {
    inputPlaceholder: 'write something bro...',
    customCode:       'custom code',
    htmlProp:         'html property to track',
    captureFile:      'captured file name',
    logMessage:       'log message',
    navigatewaitFor:  'selector to wait for',
    navigateToUrl:    'url to navigate to',
    waitForGone:      'wait for gone? {true|false}',
    selector:         'selector',
    expectCondition:  'expect condition',
    expectToBe:       'toBe callback name',
    expectSuccess:    'success condition',
    expectAssertMsg:  'assert message',
    descriptionText:  'description text'
  }
};