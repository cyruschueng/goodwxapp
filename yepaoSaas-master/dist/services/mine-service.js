import Promise from '../utils/npm/bluebird.min';
import * as appConfig from '../app-config';
import * as AuthService from 'auth-service';
import {
  wxJsonBackendPostRequestP as jsonPostRequest
}
  from 'wx-request-promise';

import {
  wxJsonBackendGetRequestP as jsonGetRequest
}
  from 'wx-request-promise';

import {
  wxUrlencodedBackenPostRequestP as urlencodePostRequest
}
  from 'wx-request-promise';

import {
  wxUrlencodedBackenGetRequestP as urlencodeGetRequest
}
  from 'wx-request-promise';



// 会员认证
export function queryCertificationMember(phone) {
  return jsonGetRequest('yp-xcx-login', {
    custName: appConfig.custName,
    phone: phone
  })
}

// 我是教练 -- 私教会员  
export function queryMyMembers() {
  return jsonGetRequest('yp-xcx-pt-getMem', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId
  })
}

// 我是教练 -- 客户资料登记 -- 选择会员 
export function queryRegisterCustSelectList(telName) {
  return jsonGetRequest('yp-xcx-pt-getNoPtMem', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    telName: telName
  })
}

// 我是教练 -- 客户资料登记 -- 加入任务列表
export function uploadRegisterCust(memId, content) {
  return urlencodePostRequest('yp-xcx-pt-registerMem', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId,
    memId: memId,
    content: content
  })
}
// 我是教练 -- 资料移交 yp-xcx-pt-queryMember
export function queryCoachMemberList() {
  return jsonGetRequest('yp-xcx-pt-queryMember', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId
  })
}
// 我是教练 -- 资料移交 -- 查找移交的教练
export function queryPtList(telName) {
  return jsonGetRequest('yp-xcx-pt-queryPT', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId,
    telName: telName
  })
}
// 我是教练 -- 资料移交 -- 确定移交
export function uploadCoachChangeConfirm(ptId, ids) {
  return urlencodePostRequest('yp-xcx-pt-changeToPT', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    ptId: ptId,
    ids: ids
  })
}

// 我是教练 -- 客户跟踪 -- 成交
export function queryCoachCustTrackDeal() {
  return jsonGetRequest('yp-xcx-pt-getTodayDeal', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId,
  })
}
// 我是教练 -- 客户跟踪 -- 快到期
export function queryCoachCustTrackAlreadyDeadline() {
  return jsonGetRequest('yp-xcx-pt-getCloseToDeadline', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId
  })
}
// 我是教练 -- 客户跟踪 -- 已到期
export function queryCoachCustTrackIntention() {
  return jsonGetRequest('yp-xcx-pt-getAlreadyDeadline', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId
  })
}

// 我是教练 -- 客户跟踪 -- 意向
export function queryCoachTrackIntention(dic) {
  dic.custName = appConfig.custName;
  dic.gym = AuthService.getMemberInfo().gym;
  dic.myId = AuthService.getMemberInfo().memId;
  return jsonGetRequest('yp-xcx-pt-getPotentialMem', dic)
}
// 我是教练 -- 意向 -- 意向详情
export function queryCoachTrackIntentionDetails(memId) {
  return jsonGetRequest('yp-xcx-pt-potentialMemDetail', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId,
    memId: memId
  })
}
// 我是教练-- 意向 -- 意向详情 -- 跟单
export function uploadCoachTrackIntentionFollow(memId, merchandiseContent, nextContent) {
  return urlencodePostRequest('yp-xcx-pt-executeMerchandise', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId,
    memId: memId,
    merchandiseContent: merchandiseContent,
    nextContent: nextContent
  })
}

// 定制课程 memId 私教会员ID ptId 教练ID
export function queryCourseCustomization(customizeDateString, memId) {
  return jsonGetRequest('yp-xcx-pt-getCourseCustomization', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    ptId: AuthService.getMemberInfo().memId,
    memId: memId,
    customizeDateString: customizeDateString
  })
}

// 存入 定制的 课程
export function uploadCourseCustomization(customizeDateString, memId, customizeLevel, customizeParts, courseCustomizationId) {
  return urlencodePostRequest('yp-xcx-pt-saveCourseCustomization', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    ptId: AuthService.getMemberInfo().memId,
    memId: memId,
    customizeDateString: customizeDateString,
    customizeLevel: customizeLevel,
    customizeParts: customizeParts,
    courseCustomizationId: courseCustomizationId
  })
}

// 查看定制的课程
export function queryCourseCustomizationDetail(customizeDateString, memId) {
  return jsonGetRequest('yp-xcx-pt-getCourseCustomizationDetail', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    ptId: AuthService.getMemberInfo().memId,
    memId: memId,
    customizeDateString: customizeDateString
  })
}

// 共享定制的课程
export function uploadShareCourse(shareCourseIds, memId) {
  return urlencodePostRequest('yp-xcx-pt-shareCourse', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    ptId: AuthService.getMemberInfo().memId,
    memId: memId,
    shareCourseIds: shareCourseIds
  })
}

/**我是会籍 */
// 资料登记 获取意向卡
export function queryGymUsableCards() {
  return jsonGetRequest('yp-xcx-mc-getGymUsableCards', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
  })
}

// 资料登记 保存信息 memId
export function uploadMcRegisterMem(cust) {
  return urlencodePostRequest('yp-xcx-mc-registerMem', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    mcId: AuthService.getMemberInfo().memId,
    memName: cust.memName,
    sex: cust.sex,
    birthday: cust.birthday,
    phone: cust.phone,
    fitPurpose: cust.fitPurpose,
    intentionCard: cust.intentionCard,
    checkinTimes: cust.checkinTimes,
    userType: cust.userType,
    addr: cust.address,
    remark: cust.remark
  })
}

// 资料移交
export function queryMems() {
  return jsonGetRequest('yp-xcx-mc-queryMember', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId
  })
}

// 资料移交 -- 选择人员
export function queryMcs(telName) {
  return jsonGetRequest('yp-xcx-mc-queryMC', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId,
    telName: telName
  })
}

// 资料移交 -- 确定移交
export function uploadInfoTransferConfirm(mcId, ids) {
  return urlencodePostRequest('yp-xcx-mc-changeToMC', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    mcId: mcId,
    ids: ids
  })
}

// 客户跟踪 -- 成交
export function queryCustTrackDeal() {
  return jsonGetRequest('yp-xcx-mc-getTodayDeal', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId
  })
}

// 客户跟踪 -- 快到期
export function queryCustTrackCloseDeadline() {
  return jsonGetRequest('yp-xcx-mc-getCloseToDeadline', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId
  })
}

// 客户跟踪 -- 已到期
export function queryCustTrackAlreadyDeadline() {
  return jsonGetRequest('yp-xcx-mc-getAlreadyDeadline', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId
  })
}

// 客户跟踪 -- 意向
export function queryCustTrackIntention(dic) {
  dic.custName = appConfig.custName;
  dic.gym = AuthService.getMemberInfo().gym;
  dic.myId = AuthService.getMemberInfo().memId;
  return jsonGetRequest('yp-xcx-mc-getPotentialMem', dic)
}

// 客户跟踪 -- 意向 -- 意向详情
export function queryCustTrackIntentionDetails(memId) {
  return jsonGetRequest('yp-xcx-mc-potentialMemDetail', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId,
    memId: memId
  })
}
// 客户跟踪-- 意向 -- 意向详情 -- 跟单
export function uploadCustTrackIntentionFollow(memId, merchandiseContent, nextContent) {
  return urlencodePostRequest('yp-xcx-mc-executeMerchandise', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId,
    memId: memId,
    merchandiseContent: merchandiseContent,
    nextContent: nextContent
  })
}
// 客户跟踪-- 意向 -- 意向详情 -- 预付定金 查询
export function queryCustTrackIntentionPrepay(memId) {
  return jsonGetRequest('yp-xcx-mc-getPrefeeList', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    memId: memId
  })
}

// 客户跟踪-- 意向 -- 意向详情 -- 预付 设置提交
export function uploadCustTrackIntentionPrepay(memId,payAmt,userAmt) {
  return urlencodePostRequest('yp-xcx-mc-savePrefee', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId,
    memId: memId,
    payAmt: payAmt,
    userAmt: userAmt
  })
}


/** 课程共享 */
// 获取 课程共享 列表
export function queryShareCourse() {
  return jsonGetRequest('yp-xcx-getShareCourseList', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    memId: AuthService.getMemberInfo().memId
  })
}
// 课程共享 详情
export function queryShareCourseDetail(ptId) {
  return jsonGetRequest('yp-xcx-getShareCourseDetail', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    ptId: ptId,
    memId: AuthService.getMemberInfo().memId,
  })
}

// 我的订单
export function queryMyOrderList() {
  return jsonGetRequest('yp-xcx-getMyOrders', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    myId: AuthService.getMemberInfo().memId
  })
}