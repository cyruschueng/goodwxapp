export const TERMS_URL = 'https://imgcdn.youhaodongxi.com/misc/yhdx-terms.html'

export const TELPHONE_RE = /^1\d{10}$/

// 0.甄选师 1.vip 2.正常
export const USER_ROLE = {
  HERO: 0,
  VIP: 1,
  NORMAL: 2
}
//  1.正常  2.完成  3.取消  4.撤销  5.支付
export const ORDER_STATUS = {
  NORMAL: 1,
  DONE: 2,
  CANCELED: 3,
  REVOKED: 4,
  PAID: 5,
  SUPPORTING: 6
}
// 0.所有订单  1.待付款  2.待发货  3.待收货  4.待评价  5.售后
export const ORDER_TYPE = {
  ALL: 0,
  WAIT_PAY: 1,
  WAIT_DELIVERY: 2,
  WAIT_RECEIVE: 3,
  WAIT_EVALUATE: 4,
  SALE_SUPPORT: 5
}
// 0:报名甄选师; 1:推广群二维码; 2:转发到自己的群; 3:甄选师没有建群; 4:甄选师未认领本群; 5:签到; 6:群管理页面;
export const WEAPP_ENTRY_TYPE = {
  APPLY_HERO: 0,
  GROUP_QRCODE: 1,
  FORWARD_TO_GROUP: 2,
  GROUP_NO_CREATE: 3,
  GROUP_NO_CLAIM: 4,
  GROUP_HOME: 5,
  GROUP_MANAGE: 6,
}

export const COUPON = {
  // uselimit 1:通用卷  2: 满减卷
  TYPE: {
    GENERAL: 1,
    FULL_MINUS: 2
  },
  // usertype 1: 新用户 2: 老用户
  LABEL: {
    NEW: 1,
    OLD: 2
  },
  // validtype 1: 截止日期, 2: 时间区间, 3: 长期有效
  EXPIRE: {
    END: 1,
    BETWEEN: 2,
    FOREVER: 3,
  },
  STATUS: {
    EXPIRED: 1,
    USED: 2
  }
}

export const DAILY_SIGN = {
  PRIZE_TYPE: {
    TICKET: 1,
    COIN: 2
  },
  STATUS: {
    UNSIGN: 0,
    SIGNED: 1
  }
}

export const MERCH_TYPE_STATUS = {
  NO_LIMIT: 0,
  DISCOUNT_COUNTDOWN: 2
}

export const EXPRESS_STATUS = {
  UNEXPRESS: 1,
  EXPRESSING: 2,
  EXPRESS_END: 3
}
