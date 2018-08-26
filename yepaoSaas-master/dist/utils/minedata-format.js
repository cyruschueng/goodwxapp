
import moment from './npm/moment';
import { flattenDeep, groupBy } from './npm/lodash-wx';

export const FORMATNUMTOCHNESE = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '7': '日',
}

// 私教会员
export function formatPrivateMemberList(list) {
  return list.map(item => this.formatPrivateMemberListItem(item))
}
export function formatPrivateMemberListItem(item) {
  return {
    memId: item.id,
    name: item.mem_name,
    headimg: item.app_head ? item.app_head : '../../../images/icon/default_headimg.png',
    period: {
      last: item.remain_times ? item.remain_times : 0,
      total: item.buy_times ? item.buy_times : 0
    },
    cardName: item.card_name ? item.card_name : ''
  }
}

// 私教会员 -- 资料登记
export function formatMemInfoRegistCards(list) {
  return list.map(item => this.formatMemInfoRegistCardsItem(item))
}
export function formatMemInfoRegistCardsItem(item) {
  return item.card_name
}

// 判断 日期 属于 今天 昨天 不是今年
export function formatDifferentTypesDate(oldStr) {
  // +timeStr 
  var newStr = '';
  var nowStr = moment().format('YYYY-MM-DD');

  var isBeforeToday = moment(oldStr).isBefore(nowStr);
  var isBeforeThisYear = moment(oldStr).isBefore(nowStr, 'year');

  if (isBeforeToday) {
    newStr = moment(oldStr).format('MM-DD');
  } else {
    newStr = moment(oldStr).format('HH:mm');
  }
  if (isBeforeThisYear) {
    newStr = moment(oldStr).format('YYYY-MM-DD');
  }
  console.log('newStr ... ' + newStr);
  return newStr;
}

// 课程训练
export function formatCourseTraining(item) {
  var courseTrainingList = [];
  courseTrainingList = [
    {
      id: 0,
      title: '热身',
      open: true,
      courseList: item.warmUpMediaList
    },
    {
      id: 1,
      title: '正式训练',
      open: false,
      courseList: item.officialMediaList
    },
    {
      id: 2,
      title: '拉伸',
      open: false,
      courseList: item.stretchMediaList
    }
  ]
  var videoUrlsBrowse = [];
  videoUrlsBrowse.push(item.warmUpMediaList);
  videoUrlsBrowse.push(item.officialMediaList);
  videoUrlsBrowse.push(item.stretchMediaList);

  videoUrlsBrowse = flattenDeep(videoUrlsBrowse);

  return {
    courseTrainingList: courseTrainingList,
    videoUrlsBrowse: videoUrlsBrowse
  }
}


/**课程共享 */
export function formatShareCourseList(list) {
  return list.map(item => this.formatShareCourseListItem(item))
}
export function formatShareCourseListItem(item) {
  return {
    id: item.ptId,
    title: '教练' + item.teacherName + '的课程共享',
    time: item.create_date ? this.formatDifferentTypesDate(item.create_date) : ''
  }
}

// 课程共享 详情
export function formatShareCourseDetails(list) {
  var newList = [];
  var videoList = [];
  list.forEach(item => {
    newList.push({
      ishidden: false,
      time: this.formatDifferentTypesDate(item.courseShare.create_date),
      details: item.mediaUrlList
    })
    videoList.push(item.mediaUrlList);
  })
  videoList = flattenDeep(videoList);

  return {
    courseList: newList,
    videoList: videoList
  }
}

// 资料移交
export function formatInfoTransfer(list) {
  return list.map(item => this.formatInfoTransferItem(item))
}
export function formatInfoTransferItem(item) {
  return {
    checked: false,
    name: item.mem_name,
    gender: FORMATGENDER[item.sex],
    memId: item.mem_id
  }
}
export const FORMATGENDER = {
  'male': 'boy',
  'female': 'girl',
}
// 选择会籍 移交
export function formatInfoTransferSelectMem(list) {
  return list.map(item => this.formatInfoTransferSelectMemItem(item))
}
export function formatInfoTransferSelectMemItem(item) {
  return {
    id: item.mem_id,
    name: item.mem_name,
    headimg: item.appHeadString ? '../../images/icon/default_headimg.png' : item.appHeadString,
    tel: 'tel: ' + this.formatHidPhone(item.phone),
    realTel: item.phone
  }
}
// 电话隐藏 格式转换
export function formatHidPhone(phone) {
   return phone.slice(0, 3) + '****' + phone.slice(7)
}

// 客户跟踪 
export function formatCustTrackingDeal(list) {
  return list.map(item => this.formatCustTrackingDealItem(item))
}
export function formatCustTrackingDealItem(item) {
  return {
    headimg: item.appHeadString != 'null' ? item.appHeadString : '../../../images/icon/default_headimg.png',
    name: item.mem_name,
    cardType: item.card_name,
    remainNum: this.formatCustTrackingDeaDays(item),
    gender: FORMATGENDER[item.sex],
    phonecall: item.phone
  }
}
export function formatCustTrackingDeaDays(item) {
  if (item.remain_days) {
    return '剩余天数：' + item.remain_days;
  } else if (item.past_days) {
    return '过期天数：' + item.past_days;
  }
}
// 意向
export function formatCustTrackingIntention(list, memIdentity) {
  return list.map(item => this.formatCustTrackingIntentionItem(item, memIdentity))
}
export function formatCustTrackingIntentionItem(item, memIdentity) {
  return {
    headimg: item.appHeadString != 'null' ? item.appHeadString : '../../../images/icon/default_headimg.png',
    title: '【' + MEMIDCHANGE[memIdentity] +'跟单】' + item.mem_name,
    text: item.content ? item.content : '暂无跟单', 
    memId: item.id ? item.id : ''
  }
}
export const MEMIDCHANGE = {
  'pt' : '教练',
  'mc' : '会籍'
}

// 意向详情
export function formatCustTrackingIntentionDetail(item) {
  return {
    memId: item.id,
    custHeadimg: item.appHeadString != 'null' ? item.appHeadString : '../../../images/icon/default_headimg.png',
    custName: item.mem_name,
    custGender: FORMATGENDER[item.sex],
    custPhone: item.phone,
    custBirth: item.birthday,
    fitnessPurpose: item.fit_purpose,
    intentionCard: item.wants,
    fitnessTime: item.checkin_times,
    address: item.addr,
    remarks: item.remark,
    followList: item.mainList != 'null' ? this.formatCustTrackingIntentionDetailFollowList(item.mainList) : []
  }
}

// 跟单任务 跟单列表
export function formatCustTrackingIntentionDetailFollowList(list) {
  return list.map((item,num) => this.formatCustTrackingIntentionDetailFollowListItem(item,num,list.length))
}
export function formatCustTrackingIntentionDetailFollowListItem(item,num,length) {
  return {
    time: moment(item.op_time).format('MM-DD'),
    title: '第' + (length-num) + '次跟单',
    content: item.content ? item.content : '',
    followMan: '跟单人：' + item.mc_name
  }
}

// 跟单 -- 预付定金
export function formatCustTrackingIntentionDetailPrepayList(list) {
  return list.map(item => this.formatCustTrackingIntentionDetailPrepayListItem(item))
}
export function formatCustTrackingIntentionDetailPrepayListItem(item) {
  return {
    prePrice: item.pay_amt,
    deductiblePrice: item.user_amt,
    isUsed: CTIDPSTATE[item.state]
  }
}
// 001 002已
export const CTIDPSTATE = {
  '001' : '未使用',
  '002' : '已使用',
}

// 我的订单
export function formatMyOrderList(list) {
  return list.map(item => this.formatMyOrderListItem(item))
}
export function formatMyOrderListItem(item) {
  return {
    orderName: ORDERTYPE[item.order_type] + ' （' + item.card_name + '）',
    orderTime: moment(item.order_time).format('YYYY-MM-DD hh:mm'),
    orderId: item.id,
    price: item.ca_amt/100,
    orderStatus: ORDERSTATE[item.state]
  }
}

export const ORDERSTATE = {
  '001' : '已完成',
  '002' : '未付款',
  '003' : '已取消',
}
export const ORDERTYPE = {
  '购卡' : '会员卡购买',
  '购课' : '课程购买',
}