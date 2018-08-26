import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import * as types from '../../types';
import {authAction} from '../../actions';
import {dateFormat} from '../../utils/filter';

const { array, func, object } = PropTypes;

class Template extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  state = {
  };

  onLoad (options) {
    this.props.setViewConfig({
      title: '申请退款'
    });
  }
}

export default connect(
  ({refund}) => ({
  }),
  (dispatch) => ({
    setViewConfig (config) {
      dispatch({
        type: types.UPDATE_VIEW_CONFIG,
        payload: config
      });
    }
  })
)(Template);

