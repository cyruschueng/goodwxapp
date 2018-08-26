import wx, { Component, PropTypes } from 'labrador-immutable';
import Immutable from 'seamless-immutable';
import { connect } from 'labrador-redux';
import * as types from '../../types';
import {authAction} from '../../actions';
import {dateFormat} from '../../utils/filter';

const { array, func, object } = PropTypes;

class Template extends Component {
  static propTypes = {
  };

  static defaultProps = {
    dataDetails: []
  };

  state = {
    isSHowBtnRefundCancel: false
  };

  onLoad (query) {
    const { id, orderNo, returnRefundNo, type } = query;
    this.setState({
      id, orderNo, returnRefundNo, type
    });
    this.props.setViewConfig({
      title: '退款详情'
    });
    this.props.getRefundDetails({
      orderItemId: id,
      type: type,
      page: 0,
      size: 999
    });
  }

  onUpdate() {
  }

  handleRefundCancel () {
    const { orderNo, returnRefundNo } = this.state;
    const params = {
      orderNo,
      returnRefundNo
    }
    this.props.handleRefundCancel(params);
  }

  formSubmit (e) {
    const formID = e.detail.formId;
    console.log(formID);
    if (formID !== 'the formId is a mock one') {
      this.props.submitFormId(formID);
    }
  }
}

export default connect(
  ({refund}) => ({
    dataDetails: refund.dataRefundDetails
  }),
  (dispatch) => ({
    setViewConfig (config) {
      dispatch({
        type: types.UPDATE_VIEW_CONFIG,
        payload: config
      });
    },
    getRefundDetails (payload) {
      dispatch(authAction({type: types.REFUND_DETAIL_REQUEST, payload}));
    },
    handleRefundCancel (payload) {
      dispatch({type: types.REFUND_CANCEL_REQUEST, payload});
    },
    submitFormId (formId) {
      dispatch({
        type: types.FORM_ID_SAVE_REQUEST,
        payload: {
          formId
        }
      })
    }
  })
)(Template);

