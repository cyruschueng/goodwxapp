import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import * as types from '../../types';
import {authAction} from '../../actions';
import {dateFormat} from '../../utils/filter';

const { array, func, object } = PropTypes;

class OrderDetail extends Component {
  static propTypes = {
    detail: object,
    getOrderDetail: func
  };

  static defaultProps = {
    detail: {}
  };

  state = {
    canCancel: false,
    canPay: false,
    canSure: false
  };

  onLoad (options) {
    this.props.setViewConfig({
      title: '订单详情'
    });
    this.props.getOrderDetail(options.orderNo);
  }

  onUpdate() {
    let statusText = '';
    let packageStatusText = '';
    let status = this.props.detail.status || '';
    let createTime = null;
    let paidTime = null;
    let shippedTime = null;
    if (status === 'WAIT_SHIPPING') {
      packageStatusText = '待发货';
    } else if (status === 'WAIT' || status === 'SUBMITTED') {
      packageStatusText = '待付款';
    } else if (status !== 'WAIT' &&
      status !== 'SUBMITTED' &&
      status !== 'FINISHED' &&
      status !== 'CLOSED' &&
      status !== 'CANCELLED' &&
      status !== 'WAIT_SHIPPIN') {
      try {
        packageStatusText = '待收货，' +
          this.props.detail.packages[0].logistics.logisticsCompany +
          '：' +
          this.props.detail.packages[0].logistics.logisticsOrderNo;
      } catch (e) {
        packageStatusText = '待收货';
      }
    } else if (status === 'FINISHED') {
      try {
        packageStatusText = '交易成功，' +
          this.props.detail.packages[0].logistics.logisticsCompany +
          '：' +
          this.props.detail.packages[0].logistics.logisticsOrderNo;
      } catch (e) {
        packageStatusText = '交易成功，';
      }
    } else if (status === 'CLOSED') {
      packageStatusText = '已关闭';
    } else if (status === 'CANCELLED') {
      packageStatusText = '已取消';
    } else if (status === 'WAIT_SHIPPING') {
      packageStatusText = '已付款，等待发货';
    }
    if (this.props.detail.createdAt) {
      createTime = dateFormat(this.props.detail.createdAt, 'yyyy-MM-dd hh:mm:ss')
    }
    if (this.props.detail.paidAt) {
      paidTime = dateFormat(this.props.detail.paidAt, 'yyyy-MM-dd hh:mm:ss')
    }
    if (this.props.detail.shippedAt) {
      shippedTime = dateFormat(this.props.detail.shippedAt, 'yyyy-MM-dd hh:mm:ss')
    }
    this.setState({
      packageStatusText: packageStatusText,
      createTime: createTime,
      paidTime,
      shippedTime
    });

    // update state
    this.setCancelStatus(status);
    this.setPayStatus(status);
    this.setSureOrderStatus(status);
  }

  setCancelStatus (status) {
    console.log('----function invoke----');
    console.log(this.state.operation);
    if (status === 'SUBMITTED') {
      this.setState({canCancel: true});
    } else {
      this.setState({canCancel: false});
    }
  }

  setPayStatus (status) {
    if (status === 'SUBMITTED') {
      this.setState({canPay: true});
    } else {
      this.setState({canPay: false});
    }
  }

  setSureOrderStatus (status) {
    if (status === 'SHIPPED') {
      this.setState({canSure: true});
    } else {
      this.setState({canSure: false});
    }
  }

  handleDetailPay (event) {
    this.props.payInDetail(event.target.dataset.orderNo);
  }

  handleDetailCancel (event) {
    this.props.cancelInDetail(event.target.dataset.orderNo);
  }

  handleDetailSign (event) {
    this.props.signInDetail(event.target.dataset.orderNo);
  }

  handleRefundApply () {
    const { detail: { orderNo }} = this.props;
    wx.navigateTo({
      url: `/pages/refund/refundApply?orderNo=${orderNo}`
    });
  }

  handleRefundDetails (event) {
    const { detail: { orderNo, orderItems }} = this.props;
    const index = event.target.dataset.index;

    const id = orderItems[index].orderItem.id;
    const returnRefundNo = orderItems[index].returnRefundNo;
    const returnRefundType = orderItems[index].returnRefundType;

    wx.navigateTo({
      url: `/pages/refund/refundDetail?id=${id}&orderNo=${orderNo}&returnRefundNo=${returnRefundNo}&type=${returnRefundType}`
    });
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
  ({orderDetail}) => ({
    detail: orderDetail.detail
  }),
  (dispatch) => ({
    getOrderDetail (orderNo) {
      dispatch(authAction({
        type: types.ORDER_DETAIL_REQUEST,
        payload: {
          orderNo: orderNo
        }
      }));
    },
    payInDetail (orderNo) {
      dispatch(authAction({
        type: types.PAY_REQUEST,
        payload: {
          orderNo: orderNo
        }
      }));
    },
    cancelInDetail (orderNo) {
      dispatch(authAction({
        type: types.ORDER_DETAIL_CANCEL_REQUEST,
        payload: orderNo
      }));
    },
    signInDetail (orderNo) {
      dispatch(authAction({
        type: types.ORDER_DETAIL_SIGN_REQUEST,
        payload: orderNo
      }));
    },
    setViewConfig (config) {
      dispatch({
        type: types.UPDATE_VIEW_CONFIG,
        payload: config
      });
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
)(OrderDetail);

