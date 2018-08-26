function fixedPrice (price, count = 1) {
  return price / 100;
}
export function price (priceSummary) {
  if (priceSummary) {
    const {minSkuPrice, maxSkuPrice} = priceSummary;
    if (minSkuPrice === maxSkuPrice) {
      return fixedPrice(minSkuPrice);
    } else if (minSkuPrice && maxSkuPrice) {
      return `${fixedPrice(minSkuPrice)} - ${fixedPrice(maxSkuPrice)}`;
    } else if (minSkuPrice) {
      return fixedPrice(minSkuPrice);
    } else if (maxSkuPrice) {
      return fixedPrice(maxSkuPrice);
    }
  }

  return '';
}

export function qnParser(url = '', width = '', height = '') {
  let thumbnail = '';
  let gravityCrop = '';
  let q = '/quality/90';
  let targetUrl = '';

  if (!url || url && (url.indexOf('img-prod.kkkd.com') === -1 || url.indexOf('imageView2') > -1 || url.indexOf('imageMogr2') > -1) || ~url.indexOf('?')) {
    targetUrl = url;
  } else {
    if (width || height) {
      thumbnail = `/thumbnail/${width}x${height}`;
    }
    targetUrl = `${url}?imageMogr2/auto-orient/strip${gravityCrop}${thumbnail}${q}/interlace/1`;
  }
  return targetUrl;
}

function to2 (num) {
  if (num < 10) {
    return 0 + '' + num;
  }
  return '' + num;
}

export function dateFormat (dt, format) {
  var date = new Date(dt);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var sec = date.getSeconds();
  var res = '';
  res = format.replace('yyyy', year)
        .replace('MM', to2(month))
        .replace('dd', to2(day))
        .replace('hh', to2(hours))
        .replace('mm', to2(minutes))
        .replace('ss', to2(sec))
        .replace('yy', (year + '').substring(2));
  return res;
}

export function statusToString(_statusStr) {
  var $status = {
    CANCELLED: '已取消',
    PAID: '已支付',
    SHIPPED: '已发货',
    SUBMITTED: '已下单,待支付',
    FINISHED: '已完成',
    CLOSED: '订单关闭',
    WAIT_SHIPPING: '已付款，等待卖家发货',
    APPLYING: '退款申请中',
    REJECTED: '卖家已拒绝',
    AGREED: '卖家已同意',
    REFUNDING: '退款中',
    REFUND_FINISHED: '退货退款完成',
    RETURN: '退货',
    REFUND: '退款',
    GOODSRETURN: '退款退货',
    NOSENDONTIME: '没有按时发货',
    AGREETWOSIDE: '协商一致退款',
    NOSTOCK: '缺货',
    NOTWANT: '我不想要了',
    REORDER: '拍错了，多拍',
    OTHER: '其他',
    WAIT: '待成团',
    ACTIVE: '组团中',
    SUCCESS: '组团成功',
    FAILED: '组团失败',
    WAIT_PLATFORM_APPROVE: '等待平台核准'
  };
  return $status[_statusStr ? _statusStr.toUpperCase() : '未知状态'];
}