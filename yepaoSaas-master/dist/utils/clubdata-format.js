
import moment from './npm/moment';

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

// 俱乐部 首页
export function formatClubList(list, clubList) {
  list.forEach(item => {
    clubList.push({
      activeId: item.id,
      titleImg: item.pic_url,
      deadline: this.formatDifferentTypesDate(item.end_time),
      status: FORMATCLUBSTATU[item.state],
      title: item.title ? item.title : '',
      totalPeople: item.num,
      nowPeople: item.reserveNum
    });
  })
  return clubList
}

export const FORMATCLUBSTATU = {
  'start' : '已开始',
  'ready' : '预售中',
  'end' : '已结束',
  'join': '已参加'
}

// 俱乐部 动态
export function formatClubDynamicsList(list, clubList) {
  list.forEach(item => {
    clubList.push({
      id: item.id,
      title: item.title,
      titleImg: item.pic_url,
      content: item.content,
      time: moment(item.create_time).format('YYYY-MM-DD'),
      author: item.author ? '作者：' + item.author : '',
      isGoodSelected: true
    });
  })
  return clubList
}

// 俱乐部动态详情
export function formatClubDynamicsListDetail(item) {
  return {
    title: item.title,
    author: item.author ? '作者：' + item.author : '',
    introduction: item.summary,
    poster: item.pic_url,
    contents: [
      {
        styleClass: 'section-title',
        content: '内容详情',
      },
      {
        content: item.content,
      }
    ]

  }
}

// 会员活动 详情
export function formatClubDetail(item) {
  return {
    titleImg: item.pic_url,
    endTime: moment(item.end_time).format('x'),
    startTime: moment(item.start_time).format('x'),
    timeTitle: FORMATTIMETITLE[item.state],
    state: item.state,
    title: item.title,
    introduction: item.summary,
    nowNum: 2,
    totalNum: item.num,

    cards: item.cards ? this.formatClubDetailCards(item.cards) : [],
    activitiesDetails: item.content
  }
}
export function formatClubDetailCards(list) {
  return list.map((item,x) => this.formatClubDetailCardsItem(item,x))
}
export function formatClubDetailCardsItem(item,x) {
  return {
    cardName: '项目' + CHNNUMCHANGE[x+1] + '：' + item.prj_name,
    originalPrice: item.price/100,
    currentPrice: item.act_price/100,
    cardId: item.prj_id,
    actPrice: item.act_price/100,
    actId: item.act_id,
    cardType: item.prj_type
  }
}
export const CHNNUMCHANGE = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '7': '七',
  '8': '八',
  '9': '九',
  '10': '十'
}
export const FORMATTIMETITLE = {
  'start': '距离结束时间还剩',
  'ready': '距离开始时间还剩',
  'end': '活动已结束',
  'join': '距离结束时间还剩'
}
