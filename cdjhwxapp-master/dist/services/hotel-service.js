import Promise from '../utils/npm/bluebird.min';
import * as appConfig from '../app-config';
import {
  wxJsonBackendPostRequestP as jsonPostRequest
}
from 'wx-request-promise';

import {
  wxJsonBackendGetRequestP as jsonGetRequest
}
from 'wx-request-promise';

import {
  wxUploadP as uploadImage
}
from 'wx-upload-service';

import {
  wxUrlencodedBackenPostRequestP as urlencodePostRequest
}
from 'wx-request-promise';


// 首页
export function queryHotelHome (hotelId) {
  return jsonGetRequest('home/toHome', {
    hotelId: appConfig.hotelId
  })
}

// 宴会厅
export function queryBallroomsList () {
  return jsonGetRequest('hall/hallList', {
    hotelId: appConfig.hotelId
  })
}
export function queryBallroomDetails (hallId) {
  return jsonGetRequest('hall/hallDetail', {
    hallId: hallId
  })
}
// 宴会厅评论
export function queryBallroomComment (hallId) {
  return jsonGetRequest('comment/getHallCom', {
    hallId: hallId
  })
}
// 预约看场
export function uploadAppointmentDate(dateString, hallId, customer, tel) {
  return urlencodePostRequest('appointment/submitApp', {
    dateString: dateString,
    hallId: hallId,
    customer: customer,
    tel: tel
  })
}

// 菜品
export function queryDishesList () {
  return jsonGetRequest('combo/comboList', {
    hotelId: appConfig.hotelId
  })
}
export function queryDishesDetails (comboId) {
  return jsonGetRequest('combo/comboDetail', {
    comboId: comboId
  })
}
// 菜品评论
export function queryDishesComment (comboId) {
  return jsonGetRequest('comment/getComboCom', {
    comboId: comboId
  })
}

// 宴会庆典
export function queryCelebrationList () {
  return jsonGetRequest('celebration/celebrationList', {
    hotelId: appConfig.hotelId
  })
}
export function queryCelebrationDetails (celebrationId) {
  return jsonGetRequest('celebration/celebrationDetail', {
    celebrationId: celebrationId
  })
}
// 庆典图片
export function queryCelebrationDetailPics(celebrationId) {
  return jsonGetRequest('celebration/celebrationPicture', {
    celebrationId: celebrationId
  })
}
// 庆典视频
export function queryCelebrationDetailMedia(celebrationId) {
  return jsonGetRequest('celebration/celebrationMedia', {
    celebrationId: celebrationId
  })
}
// 庆典评论
export function queryCelebrationComment (celebrationId) {
  return jsonGetRequest('comment/getCeleCom', {
    celebrationId: celebrationId
  })
}

// 婚礼人才
export function queryTalentList (reservedDate) {
  return jsonGetRequest('talent/talentList', {
    hotelId: appConfig.hotelId,
    reservedDateString: reservedDate
  })
}
export function queryTalentDetails (talentId, reservedDate) {
  return jsonGetRequest('talent/talentDetail', {
    talentId: talentId,
    reservedDateString: reservedDate
  })
}
// 人才时间 检查
export function queryTalentVerify(talentId, reservedDateString, startTimeString, endTimeString){
  return jsonGetRequest('talent/pickTalentVerify' ,{
    talentId: talentId,
    reservedDateString: reservedDateString,
    startTimeString: startTimeString,
    endTimeString: endTimeString
  })
}

// 人才对比 获取同类型人才
export function queryTalentSameTypeList (talentId, reservedDate) {
  return jsonGetRequest('talent/compareTalentList', {
    talentId: talentId,
    reservedDateString: reservedDate
  })
}
// 人才评论
export function queryTalentComment (talentId) {
  return jsonGetRequest('comment/getTalentCom', {
    talentId: talentId
  })
}
// 更多图片
export function queryTalentMorePic (talentId) {
  return jsonGetRequest('picture/getTalentPictures', {
    talentId: talentId
  })
}
// 更多视频
export function queryTalentMoreVideo(talentId) {
  return jsonGetRequest('media/getTalentMedias', {
    talentId: talentId
  })
}

// 消息
export function queryMessageList () {
  return jsonGetRequest('message/messageList', {
    hotelId: appConfig.hotelId
  })
}
export function queryMessageDetails (messageId) {
  return jsonGetRequest('message/messageDetail', {
    messageId: messageId
  })
}

// 档期查询
export function queryScheduleList(year, month, hallId) {
  return jsonGetRequest('calendar/reservedCal',{
    hallId: hallId,
    year: year,
    month: month
  })
}

// 历史订单
export function queryHistoryOrderList (openId) {
  return jsonGetRequest('order/histOrderList', {
    openId: openId
  })
}

// 待付款
export function queryUnpaidOrderList (openId) {
  return jsonGetRequest('order/unpaidOrderList', {
    openId: openId
  })
}

// 付尾款
export function queryAppointmentList (openId) {
  return jsonGetRequest('order/reservedOrderList', {
    openId: openId
  })
}

// 待评价
export function queryPendingCommentList (openId) {
  return jsonGetRequest('order/allpaidOrderList', {
    openId: openId
  })
}
// 关闭订单 
export function uploadCloseUppayOrder (orderid) {
  return jsonGetRequest('order/closeUnpaidOrderList', {
    orderId: orderid
  })
}

// 评价 提交
export function uploadComment(comtdata) {
  return urlencodePostRequest('comment/submitComment', comtdata)
}

// 上传评价图片
export function uploadCommentImg(paths) {
  return uploadImage({
    path: paths
  })
}

// 意见反馈 提交
export function uploadFeedback(name, content) {
  return urlencodePostRequest('optionAdvice/submitOpad', {
    hotelid: appConfig.hotelId,
    weixinName: name,
    commentContent: content
  })
}

// 查询 当日 是否被预订
export function queryIsReserved(dateString, hallId) {
  return jsonGetRequest('calendar/reservedCal2', {
    dateString: dateString,
    hallId: hallId
  })
}

// 我的界面 获取 背景图
export function queryProfileBgImg() {
  return jsonGetRequest('home/mineBg', {})
}

