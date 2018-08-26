

// 在线购卡
export function formatBuyMemCard(list) {
  return list.map(item => this.formatBuyMemCardItem (item))
}
export function formatBuyMemCardItem(item) {
  return {
    cardId: item.id ? item.id : '',
    bgimg: item.picUrlString ? item.picUrlString : '',
    carPrice: item.fee ? +item.fee : 0,
    carName: item.card_name ? item.card_name : '',
    checked: false
  }
}

// 在线支付
export function formatOnlinePaymentForCard(item) {
  return {
    cardType: CARDFORMAT[item.card_type],
    orderId: item.xcx_order_id, //订单ID
    orderNo: item.indent_no, //订单号
    userCardId: item.user_card_id,
    price: item.ca_amt,
    finalPrice: item.ca_amt, //暂时,后面要计算定金抵扣的情况
    vouchers: item.pre_fee == '无定金抵扣' ? item.pre_fee :  this.formatOnlinePaymentForCardVouchers(item.pre_fee) ,
    preFeeId: ''
  }
}
export function formatOnlinePaymentForCardVouchers(list) {
  return list.map(item => this.formatOnlinePaymentForCardVouchersItem(item))
}
export function formatOnlinePaymentForCardVouchersItem(item) {
  return {
    preFeeId: item.id,
    price: item.user_amt,
    name: item.pay_amt + '抵' + item.user_amt,
    checked: false
  }
}

// 会员卡 类型 转换
export const CARDFORMAT = {
  '001': '时间卡',
  '002': '储值卡',
  '003': '次卡',
  '005': '体验券',
  '006': '私教卡'
}

// 我的会员卡
export function formatMyMemCard(list) {
  return list.map(item => this.formatMyMemCardItem(item))
}
export function formatMyMemCardItem(item) {
  return {
    cardId: item.id ? item.id : '', 
    bgimg: item.picUrlString ? item.picUrlString : '',
    carType: item.cardTypeString ? item.cardTypeString : '',
    carName: item.card_name ? item.card_name : ''
  }
}

// 会员卡详情
export function formatMyMemCardDetails(item) {
  return {
    bgimg: item.picUrlString ? item.picUrlString : '',
    carPrice: item.real_amt ? item.real_amt / 100 : '',
    carName: item.card_name ? item.card_name : '',
    carType: CARDFORMAT[item.card_type],
    timeLeft: item.days ? item.days : '',
    effectiveTime: item.deadline ? item.deadline : '',
    openingTime: item.active_time ? item.active_time : ''
  }
}

// 私人教练 buy_times,remain_times,teacherName,teacherPhone,remainDays,card_name
export function formatPersonalTrainer(list) {
  return list.map(item => this.formatPersonalTrainerItem(item))
}
export function formatPersonalTrainerItem(item) {
  return {
    headImg: item.picUrlString ? item.picUrlString : '../../images/icon/default_headimg.png',
    coachName: item.teacherName ? item.teacherName : '',
    className: item.card_name ? item.card_name : '',
    remainTimes: item.remain_times ? item.remain_times : 0,
    buyTimes: item.buy_times ? item.buy_times : 0,
    remainDays: item.remainDays ? item.remainDays : 0,
    telephone: item.teacherPhone ? item.teacherPhone : 0
  }
}

// 推荐课程
export function formatRecommendCourse(list) {
  return list.map(item => this.formatRecommendCourseItem(item))
}
export function formatRecommendCourseItem(item) {
  return {
    cardId: item.id,
    headimg: item.headUrlString != 'null' ? item.headUrlString : '../../images/icon/default_headimg.png',
    courseName: item.card_name ? item.card_name : '',
    price: item.app_amt ? item.app_amt : 0,
    courseTime: item.times ? item.times : 0
  }
}

// 推荐课程购买
export function formatOnlinePaymentForClass(item) {
  return {
    headimg: item.headUrlString ? item.headUrlString : '',
    courseName: item.card_name,
    price: item.fee,
    courseTime: item.times,
    coachName: '请选择教练',
    classType: CARDFORMAT[item.card_type],
    orderId: item.xcx_order_id,
    orderNo: item.indent_no,
    cardId: item.user_card_id,
    checked: true
  }
}

// 教练列表
export function formatCoachList(list) {
  return list.map(item => this.formatCoachListItem(item))
}
export function formatCoachListItem(item) {
  return {
    coachId: item.id,
    name: item.pt_name,
    headimg: item.appHeadString == 'null' ? '../../images/icon/default_headimg.png' : item.appHeadString,
    tel: 'tel: ' + item.phone
  }
}

// 课程表
export function formatClassSchedule(list) {
  return list.map(item => this.formatClassScheduleItem(item))
}
export function formatClassScheduleItem(item) {
  return {
    planId: item.plan_id ? item.plan_id : 0,
    planDetailId: item.plan_detail_id ? item.plan_detail_id : 0,
    headimg: item.privateTeacher.appHeadString != 'null' ? item.privateTeacher.appHeadString : '../../images/icon/default_headimg.png',
    className: item.plan_name ? item.plan_name : '',
    classTime: item.start_time + '-' + item.end_time,
    teacherName: item.privateTeacher ? item.privateTeacher.name : '',
    teacherScore: ['star', 'star', 'star', 'star', 'star'],
    allowSignUp: item.remainNum ? item.remainNum : 0,
    reserveFlag: item.reserveFlag ? item.reserveFlag : ''
  }
}

// 课程表详情
export function formatClassScheduleDetail(item) {
  return {
    titleImg: item.plan.picUrlString,
    className: item.plan.plan_name,
    classTime: item.plan.lesson_time + ' ' + item.plan.start_time + '-' + item.plan.end_time,
    classPepoNum: item.remainNum,
    classDetail: item.plan.summary,
    address: item.plan.addr_name,
    coachHeadImg: item.privateTeacher.appHeadString != 'null' ? item.privateTeacher.appHeadString : '../../images/icon/default_headimg.png',
    coachName: item.privateTeacher.name,
    coachIntroduction: item.privateTeacher.summary,
    reserveFlag: item.reserveFlag
  }
}

// 我的约课
export function formatMyClass(list) {
  return list.map(item => this.formatMyClassItem(item))
}
export function formatMyClassItem(item) {
  return {
    orderId: item.order_id,
    headimg: item.appHeadString == 'null' ? '../../images/icon/default_headimg.png' : item.appHeadString,
    className: item.plan_name, 
    classType: '团',
    teacherName: item.pt_name,
    classTime: item.lesson_time + ' ' + item.start_time + '-' + item.end_time,
    classStatus: CLASSSTATUSFORMAT[item.state]
  }
}
export const CLASSSTATUSFORMAT = {
  '001': '取消团课',
  '002': '已取消',
  '003': '已完成'
}

// 获取 gym list
export function formatGYMList(list) {
  return list.map(item => this.formatGYMListItem(item))
}
export function formatGYMListItem(item) {
  return {
    gymId: item.gym_id,
    name: item.gym_name,
    gym: item.gym,
    checked: false
  }
}