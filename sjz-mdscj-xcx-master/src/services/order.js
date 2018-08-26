import request from '../utils/request';

let orderPageConfig = {
  page: 0,
  size: 5
};

export function getOrderList (orderType = '', page = 0, size = 5) {
  // {page: 0, size: 5}
  let postData = {
    page,
    size
  };
  if (orderType) {
    if (orderType === 'RETURN') {
      postData.searchReturnRefund = true;
    } else {
      postData.status = orderType;
    }
  }
  return request.post('trade/b/order/list', postData);
  // return new Promise(resolve => {
  //     resolve(require('../datas/orders.js'));
  // });
}

export function getOrderGroupList (params) {
  return request.get('trade/b/groupOrder/mine/list', params);
}

// 取消订单
export function cancelOrder (orderNo) {
  // http://qf-restapi.mdscj.com/trade/b/order/cancel/orderNo
  return request.post(`trade/b/order/cancel/${orderNo}`);
}

// 删除订单
export function deleteOrder (orderNo) {
  // http://qf-restapi.mdscj.com/trade/b/order/cancel/orderNo
  return request.post(`trade/b/order/delete-order/${orderNo}`);
}

// 确认收货
export function signOrder (orderNo) {
  // http://qf-restapi.mdscj.com/trade/b/order/cancel/orderNo
  return request.post(`trade/b/order/sign/${orderNo}`);
}

// 获取订单详情
export function getOrderDetail (orderNo) {
  console.log('----in service orderNo----');
  console.log(orderNo);
  console.log(`trade/b/order/detail/${orderNo}`);
  // http://qf-restapi.mdscj.com/trade/b/order/detail/orderNo
  // return new Promise( resolve => {
  //     resolve(require('../datas/orderDetail.js'));
  // });
  return request.get(`trade/b/order/detail/${orderNo}`);
}

// 获取不同类别的商品
export function changeOrderType (orderType) {
  // http://qf-restapi.mdscj.com/trade/b/order/list
  return new Promise(resolve => {
    resolve(require('../datas/orders.js'));
  });
}

// 支付订单
export function submitOrder (preSubmit, { 
  shopId, productId, promotionType, 
  skuId, quantity, userAddressId, promotion = {}, groupOrderNo = undefined,
  remarkText, cardId, fromChannel, openGid= '',  groupId
} = payload) {
  let params = {
    preSubmit,
    cartSubmit: false,
    promotion,
    shopRequests: {
      [shopId]: {
        shopId: shopId,
        promotion: {
          groupOrderNo
        },
        type: 'DANBAO',
        skus: [{
          productId,
          skuId,
          quantity,
          promotionType,
          source: '',
          fromChannel,
          openGid
        }],
        userAddressId,
        remark: preSubmit ? null : {
          remarkText,
          cardId
        }
      }
    }
  };
  if (promotionType === 'TUAN') {
    params.shopRequests[shopId].promotion.groupId = groupId;
  }

  return request.post('trade/b/order/submit', params);
  // return require('../datas/preOrderDetail');
}

// 提交退款申请
export function refundSubmit (params) {
  return request.post(`trade/b/order/returnRefund/submit`, params);
}

// 获取退款状态详情
export function refundDetails (params) {
  return request.post(`trade/b/order/returnRefund/action`, params);
}

// 取消退款申请
export function refundCancel (params) {
  return request.post(`trade/b/order/returnRefund/cancel/${params}`);
}

// 获取小程序群ID
export function getQunId (params) {
  return request.post(`trade/xcx/gid`, params);
}

// 获取优惠券列表
export function getCouponList (params) {
  return request.post(`promotion/coupon/list`, params);
}
