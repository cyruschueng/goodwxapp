import { Component, PropTypes } from 'labrador';
import { connect } from 'labrador-redux';
import * as types from '../../types';
import Immutable from 'seamless-immutable';
import {authAction} from '../../actions';

const { array, func, number } = PropTypes;

class Orders extends Component {
  static propTypes = {
    list: array,
    cancel: number,
    cancelOrder: func
  };

  static defaultProps = {
    list: []
  };

  constructor(props) {
    super(props);
  }

  onUpdate (props) {
  }

  handleCancelOrder (event) {
    this.props.cancelOrder(event);
  }

  handleDeleteOrder (event) {
    this.props.deleteOrder(event);
  }

  handlePayOrder ({target}) {
    const { orderIndex } = target.dataset;
    const { list } = this.props;
    const itemOrder = list[orderIndex];
    const { orderNo, promotion = {} } = itemOrder;
    const params = {
      orderNo
    };

    if (promotion.promotionType === 'TUAN' && promotion.groupOrderNo) {
      params.groupOrderNo = promotion.groupOrderNo;
      params.promotionType = 'TUAN';
    }
    this.props.payOrder(params);
  }

  handleSignOrder (event) {
    this.props.signOrder(event);
  }

  handleNextPage () {
    console.log('bind finished');
    this.props.nextPage();
  }

}

// export default Orders;

export default connect(
  ({order, switchTab}) => ({
      list: order.list,
      index: switchTab.index
  }),
  (dispatch) => ({
    cancelOrder (event) {
      dispatch(authAction({
        type: types.ORDER_CANCEL_REQUEST,
        payload: {
          index: event.target.dataset.orderIndex,
          list: this.list
        }
      }));
    },
    deleteOrder (event) {
      dispatch(authAction({
        type: types.ORDER_DELETE_REQUEST,
        payload: {
          index: event.target.dataset.orderIndex,
          list: this.list
        }
      }));
    },
    payOrder (payload) {
      dispatch(authAction({
        type: types.PAY_REQUEST,
        payload
      }));
    },
    // 确认收货
    signOrder (event) {
      dispatch(authAction({
        type: types.ORDER_SIGN_REQUEST,
        payload: {
          index: event.target.dataset.orderIndex,
          list: this.list
        }
      }));
    },
    // 下一页
    nextPage () {
      if (this.list.length % 5 === 0) {
        dispatch(authAction({
          type: types.ORDER_NEXTPAGE_REQUEST,
          payload: {
            index: this.index,
            page: this.list.length / 5,
            size: 5
          }
        }));
      }
    }
  })
)(Orders);
