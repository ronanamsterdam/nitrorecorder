'use strict';

import React, { PropTypes, Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SpecRecorderActions from '../../actions/SpecRecorderActions';

import { DevToolsActionCreators } from '../../containers/DevTools';

import RecorderForm from './RecorderForm';
import RecorderEventsForm from './RecorderEventsForm';

import res from '../../constants/res';

import {
  uiHolderStyleVisible,
  uiButtonStyle,
  uiHolderStyleNotVisible,
  uiButtonWithInputInsideAndLabelStyle,
  uiHiddenInputStyle,
  uiLabelInButtonStyle,
  uiMarginTop10,
  uiFormLabelStyle} from './styles/app-styles';

// this is how to get styles in here
require('./styles/core.ui.css');

class RecorderUI extends Component {

  static propTypes = {};

  __fields__ = [];

  __callback__ = () => {};

  __buttonLabel__ = '';

  __uiRootBoundingRect__ = {}

  constructor() {
   super();

   //because bind() always creates a new obj
   this.keydownHandler = ::this.handleKeyDown;

   this.state = {
                  uiVisible: true,
                  showForm: false,
                  isSubStepOpened: false
                };
  }

  componentWillMount() {
    window.addEventListener('keydown', this.keydownHandler);
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownHandler);
  };

  matchVisibilityKeys(event) {

    let key = {
        "name":     "h",
        "ctrl":     false,
        "meta":     false,
        "shift":    false,
        "alt":      true,
        "sequence": "\b"
    };

    var charCode = event.keyCode || event.which;
    var char = String.fromCharCode(charCode);
    return key.name.toUpperCase() === char.toUpperCase()
      && key.alt === event.altKey
      && key.ctrl === event.ctrlKey
      && key.meta === event.metaKey
      && key.shift === event.shiftKey;
  };

  handleKeyDown(e) {
    //visibility hot keys operation
    if (this.matchVisibilityKeys(e)) {
      e.preventDefault();
      this.setState({
              uiVisible: !this.state.uiVisible,
              showForm: false })
    }
  }

  onExecuteCallback() {
    this.__callback__();
  }

  onProcessButtonAction(fieldsSchema, cb, buttonLabel, setShowFormStateTo = true) {
    let bufFields =  fieldsSchema
   //todo - figure-out a better way to check to avoid multiple sets
    if(this.__fields__ !== bufFields) {
      this.__fields__ = bufFields;
      this.__callback__ = (args) => cb(args);
      //todo - should be in state
      this.__buttonLabel__ = buttonLabel;
      this.setState({ showForm: setShowFormStateTo });
    }
  }

  onParseSpec(e) {
    this.props.actions.parseToClientSpec();
  }

  onAddStep(e) {
    this.onProcessButtonAction([
                  {
                    key:  'text',
                    text: res.addActionForm.descriptionText
                  }
                   ],
                   this.props.actions.addStep,
                   res.ui.addStep);
  }

  onAddExpect() {
    this.onProcessButtonAction([
                  {
                    key:  'expectCondition',
                    text: res.addActionForm.expectCondition
                  },
                  {
                    key:  'toBe',
                    text: res.addActionForm.expectToBe
                  },
                  {
                    key:  'successCondition',
                    text: res.addActionForm.expectSuccess
                  },
                  {
                    key:  'assertMessage',
                    text: res.addActionForm.expectAssertMsg
                  }
                   ],
                   this.props.actions.addExpectAction,
                   res.ui.addExpect);
  }

  onAddWait() {
        this.onProcessButtonAction([
                  {
                    key:          'actionType',
                    value:        res.actionTypeNames.wait,
                    nonPrintalbe: true
                  },
                  {
                    key:  'selector',
                    text: res.addActionForm.selector
                  },
                  {
                    key:    'text',
                    text:   res.addActionForm.waitForGone,
                    value:  'false'
                  }
                   ],
                   this.props.actions.addUserAction,
                   res.ui.addWait);
  }

  onAddSubStep() {
    if(this.isSubStepOpened()) {
      this.props.actions.closeSubStep();
    } else {
      this.props.actions.addSubStep();
    }
  }

  onAddNavigate() {
        this.onProcessButtonAction([
                  {
                    key:          'actionType',
                    value:        res.actionTypeNames.navigate,
                    nonPrintalbe: true
                  },
                  {
                    key:  'text',
                    text: res.addActionForm.navigateToUrl
                  },
                  {
                    key:  'selector',
                    text: res.addActionForm.navigatewaitFor
                  }
                   ],
                   this.props.actions.addUserAction,
                   res.ui.addNavigate);
  }

  onAddLog() {
        this.onProcessButtonAction([
                  {
                    key:          'actionType',
                    value:        res.actionTypeNames.log,
                    nonPrintalbe: true
                  },
                  {
                    key:  'text',
                    text: res.addActionForm.logMessage
                  }
                   ],
                   this.props.actions.addUserAction,
                   res.ui.addLog);
  }

  onAddCapture() {
        this.onProcessButtonAction([
                  {
                    key:          'actionType',
                    value:        res.actionTypeNames.capture,
                    nonPrintalbe: true
                  },
                  {
                    key:  'text',
                    text: res.addActionForm.captureFile
                  }
                   ],
                   this.props.actions.addUserAction,
                   res.ui.addCapture);
  }

  onAddCustom() {
        this.onProcessButtonAction([
                  {
                    key:          'actionType',
                    value:        res.actionTypeNames.custom,
                    nonPrintalbe: true
                  },
                  {
                    key:  'text',
                    text: res.addActionForm.customCode
                  }
                   ],
                   this.props.actions.addUserAction,
                   res.ui.addCustom);
  }

  onAddTestHook() {
        this.onProcessButtonAction([
                  {
                    key:  'hookToAdd',
                    text: res.addActionForm.htmlProp
                  }
                   ],
                   this.props.actions.addTestHookToTrack,
                   res.ui.addTestHook);
  }

  onAddDescriptor(e) {
      let fileInput = document.getElementById(e.target.htmlFor);
      this.props.actions.addDescriptor(fileInput);
  }

  onAddRemoveEventToTrack(eventType) {
    if(this.props.eventsToTrack.indexOf(eventType) > -1) {
      this.props.actions.removeTrackableEvent(eventType)
    } else {
      this.props.actions.addTrackableEvent(eventType)
    }
  }

  showFormToggle() {
    this.setState({ showForm: !this.state.showForm });
  }

  isSubStepOpened() {
    let subStep = this.props.specActions.subStepIds.length && this.props.specActions.byId[this.props.specActions.subStepIds[0]];

    return subStep && subStep.isSubStepOpened;
  }

  render() {

    return (
      <div className='nitro-recorder-ui'
        style={ this.state.uiVisible ? uiHolderStyleVisible : uiHolderStyleNotVisible }>
        <span
          style={uiFormLabelStyle}>
          Toolbar ( hide shortcuts: alt+h or ctrl+h  | change position on screen: ctrl+q )
        </span>
        { this.state.showForm ?
          <RecorderForm
            fields={this.__fields__}
            callback={::this.__callback__}
            buttonLabel={this.__buttonLabel__}
            showToggleCallback={::this.showFormToggle}
            uiRoot={this}/>
          : null }
        <div>
          <button
          style={uiButtonStyle}
          onClick={this::this.onAddStep}>
            {res.ui.addStep}
          </button>
          <button
          style={uiButtonStyle}
          onClick={this::this.onAddSubStep}>
            {::this.isSubStepOpened() ? res.ui.closeSubStep : res.ui.openSubStep}
          </button>
        </div>

        <div style={uiMarginTop10}>
          <button
          style={uiButtonStyle}
          onClick={this::this.onAddExpect}>
            {res.ui.addExpect}
          </button>
          <button
          style={uiButtonStyle}
          onClick={this::this.onAddWait}>
            {res.ui.addWait}
          </button>
          <button
          style={uiButtonStyle}
          onClick={this::this.onAddNavigate}>
            {res.ui.addNavigate}
          </button>
          <button
          style={uiButtonStyle}
          onClick={this::this.onAddLog}>
            {res.ui.addLog}
          </button>
          <button
          style={uiButtonStyle}
          onClick={this::this.onAddCapture}>
            {res.ui.addCapture}
          </button>
          <button
          style={uiButtonStyle}
          onClick={this::this.onAddCustom}>
            {res.ui.addCustom}
          </button>
        </div>
        <div style={uiMarginTop10}>
          <button
            style={uiButtonWithInputInsideAndLabelStyle}>
            <input
            type='file'
            id='descriptor-upload'
            style={uiHiddenInputStyle}>
            </input>
            <label
              htmlFor='descriptor-upload'
              onClick={this::this.onAddDescriptor}
              style={uiLabelInButtonStyle}>
                {res.ui.addDescriptor}
              </label>
          </button>
          <button
          style={uiButtonStyle}
          onClick={this::this.onAddTestHook}>
            {res.ui.addTestHook}
          </button>
          <button
          style={uiButtonStyle}
          onClick={this::this.onParseSpec}>
            {res.ui.parse}
          </button>
        </div>
        <RecorderEventsForm
        callback={::this.onAddRemoveEventToTrack}
        eventsToTrack={this.props.eventsToTrack}
        uiRoot={this}/>
      </div>
    );
  };
}

function mapState(state) {
  return {
    specActions:    state.specActions,
    eventsToTrack:  state.srState.userActionTypesImTracking
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(SpecRecorderActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(RecorderUI);
