import request from '../utils/request';

export function getKey (orderNo, payChannel = 'WXPAY_LAPP') {
  return request.post('trade/payment/pay', {
    orderNo,
    payChannel
  }).then((res) => {
    const payParams = res.data.credential;
    payParams.nonceStr = payParams.noncestr;
    delete payParams.noncestr;
    
    return payParams;
  });
}
