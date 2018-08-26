import * as types from '../../types';
import { select, call, put, take, fork } from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import * as services from '../../services/order';
import { getKey } from '../../services/pay';
import {dateFormat, statusToString} from '../../utils/filter';

const statusKey = ['', 'SUBMITTED', 'WAIT_SHIPPING', 'SHIPPED', 'FINISHED', 'RETURN'];

function *getAllOrders () {
  while (true) {
    try {
      yield take(types.ORDER_GET_REQUEST);
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: {}
      }});
      const res = yield call(services.getOrderList);
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: false
      }});
      yield put({
        type: types.ORDER_GET_SUCCESS,
        payload: res.data.data
      });
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function *cancelOrder () {
  while (true) {
    try {
      const {payload} = yield take(types.ORDER_CANCEL_REQUEST);
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: {}
      }});
      const res = yield call(services.cancelOrder, payload.list[payload.index].orderNo);
      if (res.data) {
        yield put({
          type: types.ORDER_CANCEL_SUCCESS,
          payload: payload
        });
        yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
          pageLoading: false
        }});
        wx.showToast({
          title: '取消订单成功！',
          icon: 'success',
          duration: 1500
        });
      } else {
        wx.showToast({
          title: res.msg,
          duration: 1500
        });
        console.error(res.details);
      }
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function *deleteOrder () {
  while (true) {
    try {
      const {payload} = yield take(types.ORDER_DELETE_REQUEST);
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: {}
      }});
      const res = yield call(services.deleteOrder, payload.list[payload.index].orderNo);
      if (res.data) {
        yield put({
          type: types.ORDER_DELETE_SUCCESS,
          payload: payload
        });
        yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
          pageLoading: false
        }});
        wx.showToast({
          title: '删除订单成功！',
          icon: 'success',
          duration: 1500
        });
      } else {
        wx.showToast({
          title: res.msg,
          duration: 1500
        });
        console.error(res.details);
      }
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

// 确认收货
function *signOrder () {
  while (true) {
    try {
      const {payload} = yield take(types.ORDER_SIGN_REQUEST);
      console.log('----orderNo----');
      console.log(payload);
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: {}
      }});
      const res = yield call(services.signOrder, payload.list[payload.index].orderNo);
      if (res.data) {
        yield put({
          type: types.ORDER_SIGN_SUCCESS,
          payload: payload
        });
        yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
          pageLoading: false
        }});
        wx.showToast({
          title: '收货成功！',
          icon: 'success',
          duration: 1500
        });
        setTimeout(function() {
          wx.navigateTo({
            url: '/pages/order/list'
          });
        }, 3000);
      } else {
        wx.showToast({
          title: res.msg,
          duration: 1500
        });
        console.error(res.details);
      }
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function *changeOrderType ({payload}) {
  try {
    const statusKey = ['', 'SUBMITTED', 'WAIT_SHIPPING', 'SHIPPED', 'FINISHED', 'RETURN'];
    yield put({type: types.SWITCH_TAB_SUCCESS, payload: {
      index: payload.index
    }});
    yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
      pageLoading: {}
    }});
    const orderType = statusKey[payload.index];
    const res = yield call(services.getOrderList, orderType);
    yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
      pageLoading: false
    }});
    yield put({
      type: types.ORDER_TYPE_CHANGE_SUCCESS,
      payload: {
        data: res.data,
        index: payload.index
      }
    });
  } catch (e) {
    if (e && e.type !== 'API_ERROR') {
      throw e;
    }
  }
}

function *getPreOrderDetail () {
  while (true) {
    try {
      const {payload = {}} = yield take(types.ORDER_PRE_DETAIL_REQUEST);
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {pageLoading: {}}});
      const res = yield call(
        services.submitOrder,
        true,
        payload
      );
      // 优惠券逻辑
      let productIds = [];
      let shopIds = [];
      for (let i = 0, len = res.data.orderBOs.length; i < len; i++) {
        shopIds.push(res.data.orderBOs[i].shopId);
        for (let j = 0, lenJ = res.data.orderBOs[i].orderItems.length; j < lenJ; j++) {
          productIds.push(res.data.orderBOs[i].orderItems[j].orderItem.productId);
        }
      };

      const productPrice = res.data.totalPromotionAmount;
      const freightPrice = res.data.totalOrginalLogisticAmount;
      let paramsCoupon = {
        productPrice,
        freightPrice,
        productIds: productIds,
        shopIds: shopIds
      };
      paramsCoupon.promotionType = payload.promotionType;
      if (payload.promotionType === 'TUAN') {
        paramsCoupon.groupId = parseInt(payload.groupId);
        paramsCoupon.isGroupHead = payload.groupOrderNo ? 0 : 1;
      }
      const resCoupons = yield call(services.getCouponList, paramsCoupon);
      const dataCoupons = {
        list: resCoupons.data,
        num: resCoupons.data.length
      };
      if (dataCoupons.list.length) {
        dataCoupons.list.sort(function (value1, value2) {
          return parseInt(value2.profitFee) - parseInt(value1.profitFee);
        });
      }
      dataCoupons.list = dataCoupons.list.map(item => {
        if (item.type !== 3) {
          item.profitFee_show = (item.profitFee / 100).toFixed(2);
        } else {
          item.profitFee_show = (item.profitFee / 10).toFixed(1);
        }
        if (item.couponRuleVO.fullFee !== 1) {
          item.couponRuleVO.fullFee_show = `满${(item.couponRuleVO.fullFee / 100) || 0}元可用`;
        } else {
          item.couponRuleVO.fullFee_show = '无门槛使用';
        }
        item.startTime_show = dateFormat(item.startTime, 'yyyy.MM.dd hh:mm:ss');
        item.endTime_show = dateFormat(item.endTime, 'yyyy.MM.dd hh:mm:ss');

        return item;
      });

      dataCoupons.list = dataCoupons.list.filter(item => {
        // 满减金额判断
        if (item.type !== 2 && productPrice < item.couponRuleVO.fullFee) {
          return false;
        }
        // 邮费优惠券
        if (item.type === 2 && freightPrice< item.couponRuleVO.fullFee) {
          return false;
        }
        return true;
      });

      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {pageLoading: false}});
      yield put({type: types.ORDER_PRE_DETAIL_SUCCESS, payload: res.data});
      yield put({type: types.COUPONS_ORDERS_GET_SUCCESS, payload: dataCoupons});
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function *submitPageInit () {
  while (true) {
    try {
      const {payload = {}} = yield take(types.ORDER_PRE_DETAIL_INIT_START);
      
      console.log('this is init take');

      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {pageLoading: {}}});
      if (!payload.userAddressId) {
        let addressList = yield select(state => state.address.list);
        if (!addressList || addressList.length === 0) {
          yield put({type: types.ADDRESS_LIST_REQUEST});
          yield take(types.ADDRESS_LIST_SUCCESS);
          addressList = yield select(state => state.address.list);
        }

        if (!addressList || addressList.length === 0) {
          wx.navigateTo({url: '/pages/address/detail'});

          yield take(types.ADDRESS_SAVE_SUCCESS);

          yield put({type: types.ADDRESS_LIST_REQUEST});
          yield take(types.ADDRESS_LIST_SUCCESS);
          addressList = yield select(state => state.address.list);
        }

        let defaultAddressIndex = 0;
        for (let i = 0; i < addressList.length; i++) {
          if (addressList[i].isDefault) {
            defaultAddressIndex = i;
            break;
          }
        }

        payload.userAddressId = addressList[defaultAddressIndex].id;
      }
      yield put({type: types.ORDER_PRE_DETAIL_REQUEST, payload});
      yield take(types.ORDER_PRE_DETAIL_SUCCESS);

      yield put({type: types.ORDER_PRE_DETAIL_INIT_END});
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: false
      }});
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function *getNextPage () {
  while(true) {
    try {
      const {payload} = yield take(types.ORDER_NEXTPAGE_REQUEST);
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: {}
      }});
      const res = yield call(services.getOrderList, statusKey[payload.index], payload.page, payload.size);
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: false
      }});
      yield put({
        type: types.ORDER_NEXTPAGE_SUCCESS,
        payload: res.data.data
      });
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function *submitOrder () {
  while (true) {
    try {
      const {payload = {}} = yield take(types.ORDER_SUBMIT_REQUEST);

      const dataCoupons = yield select(state => state.order.dataCoupons.selectedData);
      const preOrderDetail = yield select(state => state.order.preOrderDetail);
      const maxPayAmount = 50000 * 100; // 最大付款金额为5w

      if (preOrderDetail.totalFinalAmount >= maxPayAmount) {
        wx.showToast({
          title: '最大支付金额为5万，请更改订单后重试~',
          duration: 2000,
          mask: true
        });
      } else {
        yield put({type: types.UPDATE_VIEW_CONFIG, payload: {pageLoading: true}});

        let params = {
          ...payload
        };
        
        if (dataCoupons.couponNo) {
          params.promotion = {
            couponIds: [{
              couponChannelType: dataCoupons.couponChannelType,
              couponCode: dataCoupons.couponCode,
              couponNo: dataCoupons.couponNo
            }]
          }
        }
        const res = yield call(
          services.submitOrder,
          false,
          params
        );

        yield put({type: types.UPDATE_VIEW_CONFIG, payload: {pageLoading: false}});

        const orderNo = res.data.orderBOs[0].orderNo;
        yield put({type: types.ORDER_SUBMIT_SUCCESS, payload: res.data});

        const paramsPay = {
          orderNo
        };

        if (payload.promotionType === 'TUAN') {
          paramsPay.promotionType = 'TUAN';
          paramsPay.groupOrderNo = res.data.orderBOs[0].promotion.groupOrderNo;
        }
        yield put({type: types.PAY_REQUEST, payload: paramsPay});
      }


    } catch (e) {
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {pageLoading: false}});
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function pay (payParams) {
  return new Promise(resolve => {
    payParams.complete = function (payRes) {
      return resolve(payRes);
    };
    wx.requestPayment(payParams);
  });
}

function *requestPayment () {
  while (true) {
    try {
      const {payload: {orderNo, promotionType, groupOrderNo}} = yield take(types.PAY_REQUEST);

      yield put({
        type: types.UPDATE_VIEW_CONFIG, payload: {
          pageLoading: true
        }
      });

      const payParams = yield call(getKey, orderNo);

      yield put({
        type: types.UPDATE_VIEW_CONFIG, payload: {
          pageLoading: false
        }
      });

      let payRes = yield call(pay, payParams);

      const {errMsg} = payRes;
      let toastMsg = '';
      let redirectUrl = '/pages/order/list';
      if (promotionType === 'TUAN' && groupOrderNo) {
        redirectUrl = `/pages/groupDetail/index?groupOrderNo=${groupOrderNo}`;
      }

      if (/cancel/i.test(errMsg)) {
        toastMsg = '取消支付';
        wx.navigateTo({url: redirectUrl});
        yield put({type: types.ORDER_GET_REQUEST});
        yield put({type: types.PAY_CANCEL});
        yield put({type: types.SWITCH_TAB_SUCCESS, payload: {
          index: 0
        }});
      } else if (/fail/i.test(errMsg)) {
        toastMsg = '支付失败';
        wx.navigateTo({url: redirectUrl});
        yield put({type: types.ORDER_GET_REQUEST});
        yield put({type: types.PAY_FAILURE});
        yield put({type: types.SWITCH_TAB_SUCCESS, payload: {
          index: 0
        }});
      } else if (/ok/i.test(errMsg)) {
        toastMsg = '支付成功';
        console.log('redirectUrl', redirectUrl);
        yield put({type: types.PAY_SUCCESS});
        wx.navigateTo({url: redirectUrl});
        // yield put({type: types.ORDER_GET_REQUEST});
        // yield put({type: types.SWITCH_TAB_SUCCESS, payload: {
        //   index: 0
        // }});
      }

      wx.showToast({title: toastMsg});

    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function *getQunId () {
  while (true) {
    try {
      const { payload } = yield take(types.QUNID_REQUEST);
      const res = yield call(services.getQunId, payload);
      if (res.status === 1) {
        res.data = res.data || {};
        yield put({type: types.QUNID_SUCCESS, payload: res.data.openGId});
      }
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function *getAllGroupOrders () {
  while (true) {
    try {
      yield take(types.ORDER_GROUP_GET_REQUEST);
      
      const { tabIndex } = yield select(state => state.order.dataTemp);
      const { data, page, size } = yield select(state => state.order.dataOrderGroups);
      const status = [undefined, 'ACTIVE', 'SUCCESS', 'FAILED'][tabIndex];
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {pageLoading: {}}});

      const params = {
        page,
        size,
        status
      };
      const res = yield call(services.getOrderGroupList, params);

      res.data.page += 1;
      res.data.data = data.concat(res.data.data);

      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {pageLoading: false}});
      yield put({type: types.ORDER_GROUP_GET_SUCCESS, payload: res.data});
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function *changeOrderGroupTabs () {
  while (1) {
    yield take(types.ORDER_GROUP_TYPE_CHANGE_REQUEST);
    
    yield put({type: types.ORDER_GROUP_GET_REQUEST});
  }
}

function *changeSelectedCoupons () {
  while (1) {
    const { payload: { query } } =  yield take(types.COUPONS_SELECTED_CHANGE_REQUEST);
    const dataCoupons = yield select(state => state.order.dataCoupons.selectedData);

    let params = {
      ...query
    };
    
    if (dataCoupons.couponNo) {
      params.promotion = {
        couponIds: [{
          couponChannelType: dataCoupons.couponChannelType,
          couponCode: dataCoupons.couponCode,
          couponNo: dataCoupons.couponNo
        }]
      }
    }

    yield put({type: types.ORDER_PRE_DETAIL_REQUEST, payload: params});
  }
}

export default function * () {
  yield fork(getAllOrders);
  yield fork(cancelOrder);
  yield fork(deleteOrder);
  yield fork(signOrder);
  yield fork(getPreOrderDetail);
  yield fork(submitPageInit);
  yield fork(submitOrder);
  yield fork(getNextPage);
  yield fork(requestPayment);
  yield fork(getQunId);
  yield fork(getAllGroupOrders);
  yield fork(changeSelectedCoupons);
  yield fork(changeOrderGroupTabs);
  yield takeLatest(types.ORDER_TYPE_CHANGE_REQUEST, changeOrderType);
}
