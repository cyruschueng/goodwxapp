import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import Orders from '../../components/orders/orders';
import SwitchTab from '../../components/switchTab/switchTab';
import * as types from '../../types';
import {authAction} from '../../actions';

const { array, func } = PropTypes;

const statusKey = ['', 'SUBMITTED', 'WAIT_SHIPPING', 'SHIPPED', 'FINISHED', 'RETURN'];

class Order extends Component {
  static propTypes = {
    orders: array,
    getAllOrders: func
  };
  static defaultProps = {
    orders: []
  };

  constructor (props) {
    super(props);
  }

  onUpdate () {
    console.log('update');
  }

  onLoad ({ type }) {
    this.props.setViewConfig({
      title: '订单管理'
    });

    if (type) {
      const index = statusKey.indexOf(type); 
      if (index > -1) {
        this.props.switchOrderType(index);
      } else {
        this.props.switchOrderType(0);
      }
    } else {
      this.props.switchOrderType(0);
    }
    // this.props.getAllOrders();
  }

  children () {
    return {
      orders: {
        component: Orders,
        props: {
          list: this.props.orders
        }
      },
      switchTab: {
        component: SwitchTab,
        props: {
          switchEvent: this.props.switchOrderType,
          tabs: ['全部', '待付款', '待发货', '待收货', '已完成', '退款/售后']
        }
      }
    };
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
  ({order}) => ({
    orders: order.list
  }),
  (dispatch) => ({
    getAllOrders () {
      dispatch(authAction({
        type: types.ORDER_GET_REQUEST
      }));
    },
    switchOrderType (index) {
      // index: 当前点击的tab的索引
      dispatch(authAction({
        type: types.ORDER_TYPE_CHANGE_REQUEST,
        payload: {
          index: index,
          switchEvent: this.switchEvent
        }
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
)(Order);
