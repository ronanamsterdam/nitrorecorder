'use strict';

import React, { PropTypes, Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SpecRecorderActions from '../../actions/SpecRecorderActions';

import res from '../../constants/res';

class RecorderEventsBinder extends Component {

  static propTypes      = {};

  __buf_input__         = null;
  __buf_input_value__   = null;

  __root__              = null;

  constructor(props, context) {
    super(props, context);

    //because bind() always creates a new obj
    this.clickHandler             = ::this.onClick;
    this.changeHandler            = ::this.onChangeEvent;
    this.contextMenuOpenHandler   = ::this.onContextMenuOpen;
  };

  componentWillMount() {
    this.__root__ = document.getElementById(res.rootId);

    document.body.addEventListener('click', this.clickHandler);
    document.body.addEventListener('keyup', this.changeHandler);
    document.body.addEventListener('contextmenu', this.contextMenuOpenHandler);
    document.body.addEventListener('change', this.changeHandler);
  };

  componentWillUnmount(){
    this._resetState();
    document.body.removeEventListener('click', this.clickHandler);
    document.body.removeEventListener('keyup', this.changeHandler);
    document.body.removeEventListener('contextmenu', this.contextMenuOpenHandler);
    document.body.removeEventListener('change', this.changeHandler);
  };

  onContextMenuOpen(e) {
    if(e && e.isTrusted && this.props.eventsToTrack.indexOf(e.type) > -1) {
      let dataFtHook = e.type && e.target && this._getTestHook(e.target);

      this.props.actions.addUserAction({
        actionType: res.actionTypeNames.contextmenu,
        selector:   this._getSelectorValue(e.target, dataFtHook)
      });
    }
  }

  onClick(e) {
    //checking if elements does not belongs to {NR} app
    if(e.path.includes(this.__root__)){return;}

    let dataFtHook = e &&
      e.isTrusted &&
      this.props.eventsToTrack.indexOf(e.type) > -1 &&
      e.target && this._getTestHook(e.target)
      || false;
    if(dataFtHook) {
      this._resetState();

      this.props.actions.addUserAction({
        actionType: res.actionTypeNames.click,
        selector:   this._getSelectorValue(e.target, dataFtHook)
      });
    } else {
      console.warn('{NR} 🤔 Hm.. No element to bind to or not a user generated action..');
    }
  };

  onChangeEvent(e) {
    //checking if elements does not belongs to {NR} app
    if(e.path.includes(this.__root__)){return;}

    let dataFtHook = e &&
      e.isTrusted &&
      this.props.eventsToTrack.indexOf(e.type) > -1 &&
      e.target && this.props.changeTypesToTrack.indexOf(e.target.type) > -1 &&
      this._getTestHook(e.target)
      || false;

    if(dataFtHook) {
      let dataFtTargetEl = e.target;

      let dataFtSelectorValue = this._getSelectorValue(dataFtTargetEl, dataFtHook);

      let inputCurrentValue = dataFtTargetEl.value;
      if(this.__buf_input__ !== dataFtTargetEl) {
        this.__buf_input__ = dataFtTargetEl;
        this.__buf_input_value__ = dataFtTargetEl.value;
        this.props.actions.addUserAction({
          actionType: res.actionTypeNames.input,
          selector:   dataFtSelectorValue,
          text:       inputCurrentValue
        });
      } else {
        if (this.__buf_input_value__ !== dataFtTargetEl.value) {
          this.__buf_input_value__ = dataFtTargetEl.value;
          this.props.actions.updateCurrentUserAction(dataFtSelectorValue, inputCurrentValue);
        } //else -> nothing to update
      }
    } else {
      console.warn('{NR} 🤔 Hm.. No element to bind to or not a user generated action..');
    }
  };

  _resetState() {
    if(this.__buf_input__) {this.__buf_input__ = null;}
    if(this.__buf_input_value__) {this.__buf_input_value__ = null;}
  };

  _getSelectorValue(el, dataFtHook) {
      let dataFtAttrValue = el.getAttribute(dataFtHook) ? ['=',el.getAttribute(dataFtHook)].join('') : '';

      return dataFtHook && ['[',dataFtHook,dataFtAttrValue,']'].join('');
  };

  _getAttributeNames(attributes) {
    let returnArr = [];
    for (let key in attributes) {
     returnArr.push(attributes[key].name);
    }
    return returnArr;
  };

  _getTestHook(el) {
    if(this.props.testHooksToTrack.length) {
      for (var i = this.props.testHooksToTrack.length - 1; i >= 0; i--) {
        let bindHook = this.props.testHooksToTrack[i];
        if (!el.attributes) {return false;}

        if (this._getAttributeNames(el.attributes).indexOf(bindHook) > -1) {
          return bindHook;
        }
      };
    } else { return false; }
  };

  render() {
    //since there's no UI stuff going on, but react requires a render method
    return false;
  };
}

function mapState(state) {
  return {
    testHooksToTrack:     state.srState.testHooksToTrack,
    changeTypesToTrack:   state.srState.changeTypesToTrack,
    eventsToTrack:        state.srState.userActionTypesImTracking
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(SpecRecorderActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(RecorderEventsBinder);