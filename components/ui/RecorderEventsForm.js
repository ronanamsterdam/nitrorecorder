'use strict';

import React, { Component, PropTypes } from 'react';
import res from '../../constants/res';

import {
  eventsformStyle,
  eventsUlStyle,
  eventslistyle,
  eventsInputStyle,
  eventsFormLabelStyle} from './styles/app-styles';

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
        <li style={eventslistyle}>
          <input
            style={eventsInputStyle}
            type='checkbox'
            id={this.props.data.key}
            placeholder='input something...'
            onChange={::this.handleChange}
            checked={this.props.data.value} />
          <label
            style={this.props.labelStyle || {}}
            onClick={::this.handleChange} >
            {this.props.data.text}
          </label>
        </li>
      );
  }
}

export default class RecorderForm extends Component {

  static propTypes = {
    callback:           PropTypes.func.isRequired,
    eventsToTrack:     PropTypes.array.isRequired
  }

  __fields__ = [
    {
      key: 'click',
      text: 'click',
      value: false
    },
    {
      key: 'keyup',
      text: 'keyup',
      value: false
    },
    {
      key: 'contextmenu',
      text: 'contextmenu',
      value: false
    },
    {
      key: 'change',
      text: 'change',
      value: false
    }
  ]

  componentWillMount() {}

  componentWillReceiveProps() {

  }

  childInputStateUpdate(field) {
    this.props.callback(field.key);
  }

  processCallbackExecution() {
    if(!this.props.callback) {throw Error('{SR} 😡 No callback passed to form! Damn! ')}
  }

  _mapFieldValues() {

    this.__fields__ = this.__fields__.map((field)=>{
      field.value = !!(this.props.eventsToTrack.indexOf(field.key) > -1);
      return field;
    });
  }

  render() {
    this._mapFieldValues();

    return (
      <div
        style={eventsformStyle}
        className='scenario-recorder-form'>
        <span
          style={eventsFormLabelStyle}>
          Tracking Events
        </span>
        <ul
          style={eventsUlStyle}>
          {this.__fields__.map(field =>
            {
             return <InputFiled
              key={field.key}
              data={field}
              onUpdate={::this.childInputStateUpdate} />
            }
          )}
        </ul>
      </div>
    );
  }
}
