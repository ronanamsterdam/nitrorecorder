'use strict';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import res from '../../constants/res';

import {
  actionformStyle,
  actionButtonStyle,
  actionFloatRightButton,
  actionUlStyle,
  actionListyle,
  actionInputStyle,
  actionFormLabelStyle} from './styles/app-styles';

class InputFiled extends Component {
  static propTypes = {
    labelStyle: PropTypes.object,
    onUpdate:   PropTypes.func.isRequired
  };

  handleChange(e) {
    this.props.onUpdate({key: this.props.data.key, value: e.target.value})
  }

  render () {
    return (
        <li style={actionListyle}>
          <label style={this.props.labelStyle}>
            {this.props.data.text}
          </label>
          <input
            style={actionInputStyle}
            type='text'
            id={this.props.data}
            placeholder='write something bro...'
            onChange={::this.handleChange}/>
        </li>
      );
  }
}

export default class RecorderForm extends Component {

  static propTypes = {
    fields:             PropTypes.array.isRequired,
    callback:           PropTypes.func.isRequired,
    buttonLabel:        PropTypes.string.isRequired,
    showToggleCallback: PropTypes.func.isRequired,
    uiRoot:             PropTypes.object.isRequired
  }

  __style__ = actionformStyle

  __fields__ = {}

  componentWillMount() {}

  componentDidMount() {
    //getting height of root ui
    var uiRootEl = ReactDOM.findDOMNode(this.props.uiRoot);
    var uiRootHeight = uiRootEl.getClientRects()[0].height + 1;
    this.__style__ = Object.assign({},this.__style__, {bottom: uiRootHeight + "px"});
    this.setState({});
  }

  componentWillReceiveProps() {}

  childInputStateUpdate(field) {
    this.__fields__[field.key] = field.value
  }

  processCallbackExecution() {
    if(!this.props.callback) {throw Error('{SR} 😡 No callback passed to form! Damn! ')}
    this.props.callback(this.__fields__);
    this.props.showToggleCallback();
  }

  _setPredefinedValues() {
    this.__fields__ = {};
    this.props.fields.map(field => {
      if(field.value) {
        this.__fields__[field.key] = field.value;
      }
    });
  }

  render() {
    this._setPredefinedValues();

    return (
      <div
        style={this.__style__}
        className='nitro-recorder-form'>
        <span
          style={actionFormLabelStyle}>
          Add Action
        </span>
        <ul
          style={actionUlStyle}>
          {this.props.fields.map(field =>
            {
             return field.nonPrintalbe ? null : <InputFiled
              key={field.key}
              data={field}
              onUpdate={::this.childInputStateUpdate} />
            }
          )}
        </ul>
        <button
          style={actionButtonStyle}
          onClick={::this.processCallbackExecution}>
          add {this.props.buttonLabel}
        </button>
        <button
          style={actionFloatRightButton}
          onClick={::this.props.showToggleCallback}>
          {res.ui.close}
        </button>
      </div>
    );
  }
}
