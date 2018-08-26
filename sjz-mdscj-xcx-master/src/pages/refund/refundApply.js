import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import * as types from '../../types';
import {authAction} from '../../actions';
import {dateFormat} from '../../utils/filter';

import { enumRefundType, enumRefundReason } from '../../constant';

const { array, func, object } = PropTypes;

class Template extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  state = {
  };

  onLoad (query) {
    const { orderNo } = query;
    this.props.setViewConfig({
      title: '申请退款'
    });
    this.props.getOrderDetail(orderNo);
  }

  bindPickerChange ({detail, target}) {
    const value = +detail.value; // 当前数组index
    const field = target.dataset.field; // 哪个数组
    const params = {
      [`${field}Index`]: value,
      [field]: field.indexOf('refundType') > -1 ? enumRefundType[value].key : enumRefundReason[value].key
    };
    this.props.changeValue(params);
  }

  handleChangeValue ({detail, target}) {
    const field = target.dataset.field;
    const params = {
      [field]: detail.value
    };
    this.props.changeValue(params);
  }

  // 申请退款
  handleBtnRefund () {
    this.props.handleSubmitRefund();
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
  ({orderDetail, refund}) => ({
    detail: orderDetail.detail,
    dataRefunds: refund.dataRefunds
  }),
  (dispatch) => ({
    setViewConfig (config) {
      dispatch({
        type: types.UPDATE_VIEW_CONFIG,
        payload: config
      });
    },
    getOrderDetail (orderNo) {
      dispatch(authAction({
        type: types.ORDER_DETAIL_REQUEST,
        payload: {
          orderNo: orderNo
        }
      }));
    },
    changeValue (payload) {
      dispatch({type: types.REFUND_CHANGE_END, payload });
    },
    handleSubmitRefund () {
      dispatch({type: types.REFUND_SUBMIT_REQUEST});
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

