'use strict';

import React, { PropTypes, Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SpecRecorderActions from '../../actions/SpecRecorderActions';

import RecorderEventsBinder from './RecorderEventsBinder';
import RecorderUI from '../ui/RecorderUI';

class Recorder extends Component {

  componentWillMount() {};

  componentWillUnmount() {};

  static propTypes = {
  //NO POPS ZONE
  };

  render() {
    return (
        <div className='nitro-recorder-root'>
          <RecorderEventsBinder/>
          <RecorderUI/>
        </div>
    );
  };
}

function mapState(state) {
  return {
    state: state
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(SpecRecorderActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(Recorder);