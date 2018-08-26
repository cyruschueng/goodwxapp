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

import {
  wxJsonBackendGetRequestPNoLoading as jsonGetRequestNoload
}
  from 'wx-request-promise';

// 俱乐部 首页 forMem: 传Y查询会员活动 ,传N查询首页的活动
export function quaryClubList(pageNum, forMem, noload) {

  if (noload == 'noload') {
    return jsonGetRequestNoload('yp-xcx-getActivePageInfo', {
      custName: appConfig.custName,
      gym: AuthService.getMemberInfo().gym,
      memId: AuthService.getMemberInfo().memId,
      pageNum: pageNum,
      forMem: forMem
    })
  } else {
    return jsonGetRequest('yp-xcx-getActivePageInfo', {
      custName: appConfig.custName,
      gym: AuthService.getMemberInfo().gym,
      memId: AuthService.getMemberInfo().memId,
      pageNum: pageNum,
      forMem: forMem
    })
  }
}

// 俱乐部动态
export function queryClubArticleList(pageNum) {
  return jsonGetRequest('yp-xcx-getArticlePageInfo', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    pageNum: pageNum,
  })
}

// 会员活动 详情 /yp-xcx-getActiveDetail
export function queryClubActiveDetail(activeId, gym) {
  var newDic = {
    custName: appConfig.custName,
    gym: gym ? gym : AuthService.getMemberInfo().gym,
    activeId: activeId,
  }
  if (AuthService.getMemberInfo()) {
    newDic.memId = AuthService.getMemberInfo().memId
  }
  return jsonGetRequest('yp-xcx-getActiveDetail', newDic)
}

// 俱乐部动态 文章 详情 getArticleDetail?
export function queryClubArticleDetail(articleId, gym) {
  return jsonGetRequest('yp-xcx-getArticleDetail', {
    custName: appConfig.custName,
    gym: gym ? gym : AuthService.getMemberInfo().gym,
    articleId: articleId,
  })
}