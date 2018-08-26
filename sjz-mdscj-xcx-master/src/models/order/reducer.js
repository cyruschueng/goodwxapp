import * as types from '../../types';
import Immutable from 'seamless-immutable';

export function dataTemp (state = Immutable({
  qunId: '1',
  tabIndex: 0,
  isLoading: false
}), {type, payload}) {
  switch (type) {
    case types.DATA_REDUCER_CLEAR: {
      return Immutable.merge(state, {
        qunId: '1',
        tabIndex: 0,
        isLoading: false
      });
    }
    case types.QUNID_SUCCESS: {
      return Immutable.merge(state, {
        qunId: payload
      });
    }
    case types.ORDER_GROUP_TYPE_CHANGE_REQUEST: {
      return Immutable.merge(state, {...payload});
    }
    case types.ORDER_GROUP_GET_REQUEST: {
      return Immutable.merge(state, {
        isLoading: true
      });
    }
    case types.ORDER_GROUP_GET_FAILURE:
    case types.ORDER_GROUP_GET_SUCCESS: {
      return Immutable.merge(state, {
        isLoading: false
      });
    }
    default: 
      return state;
  }
}

export function list (state = Immutable([]), {type, payload}) {
    let copy = null;
    switch (type) {
      case types.ORDER_GET_SUCCESS:
        return Immutable(payload);
        break;
      case types.ORDER_DETAIL_SIGN_SUCCESS:
        {
          copy = Immutable.asMutable(state);
          let middle = null;
          let index = 0;
          copy.some((value, index, thisArr) => {
            if (copy[index].orderNo === payload) {
              index = index;
              middle = Immutable.set(value, 'status', 'FINISHED');
              return true;
            }
          });
          copy.splice(index, 1, middle);
          return Immutable(copy);
        }
      case types.ORDER_DETAIL_CANCEL_SUCCESS:
        {
          copy = Immutable.asMutable(state);
          let middle = null;
          let index = 0;
          copy.some((value, index, thisArr) => {
            if (copy[index].orderNo === payload) {
              index = index;
              middle = Immutable.set(value, 'status', 'CANCELLED');
              return true;
            }
          });
          copy.splice(index, 1, middle);
          return Immutable(copy);
        }
      case types.ORDER_NEXTPAGE_SUCCESS:
        return state.concat(payload);
        break;
      case types.ORDER_CANCEL_SUCCESS:
        // 取消成功，更新props的list
        copy = Immutable.asMutable(payload, {deep: true});
        copy.list[copy.index].status = 'CANCELLED';
        return Immutable(copy.list);
        break;
      case types.ORDER_SIGN_SUCCESS:
        // 取消成功，更新props的list
        copy = Immutable.asMutable(payload, {deep: true});
        copy.list[copy.index].status = 'CANCELLED';
        return Immutable(copy.list);
        break;
      case types.ORDER_DELETE_SUCCESS:
        // 取消成功，更新props的list
        copy = Immutable.asMutable(payload, {deep: true});
        copy.list.splice(copy.index, 1);
        return Immutable(copy.list);
        break;
      case types.ORDER_TYPE_CHANGE_SUCCESS:
        console.log('----order change succes in order----');
        return payload.data.data;
        break;
      default:
        return state;
    }
}

export function isPreOrderReady (state = false, {type}) {
  switch (type) {
    case types.DATA_REDUCER_CLEAR:
    case types.ORDER_PRE_DETAIL_INIT_START:
      return false;
    case types.ORDER_PRE_DETAIL_INIT_END:
      return true;
    default:
      return state;
  }
}

export function preOrderDetail (state = Immutable({}), {type, payload}) {
  switch (type) {
    case types.DATA_REDUCER_CLEAR: {
      return Immutable({});
    }
    case types.ORDER_PRE_DETAIL_REQUEST:
      if (payload.userAddressId) {
        return state;
      } else {
        return Immutable({});
      }
    case types.ORDER_PRE_DETAIL_SUCCESS:
      return Immutable(payload);
    default:
      return state;
  }
}

export function dataOrderGroups (state = Immutable({
  page: 0,
  data: [],
  size: 10,
  totalItem: 0
}), {type, payload}) {
  switch (type) {
    case types.ORDER_GROUP_TYPE_CHANGE_REQUEST: {
      return Immutable.merge(state, {
        totalItem: 0, 
        page: 0,
        data: []
      });
    }
    case types.ORDER_GROUP_GET_SUCCESS: {
      const { page, data, totalItem } = payload; 
      return Immutable.merge(state, {
        page,
        totalItem,
        data
      });
    }
    default: return state;
  } 
}

export function dataCoupons (state = Immutable({
  paramsCoupon: {},
  list: [],
  num: 0,
  selectedData: {}
}), { type, payload }) {
  switch (type) {
    case types.DATA_REDUCER_CLEAR: {
      return Immutable({
        paramsCoupon: {},
        list: [],
        num: 0,
        selectedData: {}
      });
    }
    case types.ORDER_ADDRESS_UPDATE_REQUEST: {
      return Immutable.merge(state, {
        selectedData: {}
      });
    }
    case types.COUPONS_SELECTED_CHANGE_REQUEST: {
      const { selectedData } = state;
      console.log('payload', payload);
      if (selectedData.couponNo === payload.coupons.couponNo) {
        return Immutable.merge(state, {
          selectedData: {}
        });
      } else {
        return Immutable.merge(state, {
          selectedData: payload.coupons
        });
      }
    }
    case types.COUPONS_ORDERS_GET_SUCCESS: {
      return Immutable.merge(state, {
        ...payload
      });
    }
    default: return state;
  }
}