import { _request } from './_request'

exports.getSessionId = code => {
  return _request({
    url: '/signin/login',
    data: { code }
  })
}
/**
 * 专题列表
 */
exports.specialShow = ({ id, provinceId, cityId }) => {
  return _request({
    url:'/leader/specialmerchandise',
    data:{
      communityId: id,
      provinceId,
      cityId
    }
  })
}
/**
 *   商品分类列表  ten
 */
exports.jsGlobal = () => {
  return _request({
    url:'/api/jsglobal',
    data:{
      ver: '2.0.0'
    }
  })
}

/**
 * 商品分类展示
 */
exports.categorymerchandise = ({ id, cityId, provinceId, categoryId, page, limit }) => {
  return _request({
    url:'/merchandise/categorymerchandise',
    data:{
      communityId: id,
      cityId,
      provinceId,
      categoryId,
      p: page,
      size: limit
    }
  })
}
/**
 * 更多商品展示
 */
exports.specialtopicdetail = ({ id, cityId, provinceId, categoryId, specialTopicId }) => {
  return _request({
    url:'/merchandise/specialtopicdetail',
    data:{
      communityId: id,
      cityId,
      provinceId,
      specialTopicId
    }
  })
}
/**
 * 今日热卖商品
 */
exports.promotion = ({ id, type, page, limit }) => {
  return _request({
    url:'/merchandise/promotion',
    data:{
      communityId: id,
      p: page,
      size: limit
    }
  })
}
/**
 * 修改修改甄选师资料
 */

exports.updateinfo = ({avatar, nickname, description }) => {
  return _request({
    url:'/user/updateinfo',
    data:{
      avatar,
      nickname,
      description
    }
  })
}
/**
 * 今日特卖商品
 */
exports.promotion = ({id, type }) => {
  return _request({
    url:'/merchandise/promotion',
    data:{
      communityId: id,
      type
    }
  })
}
/**
 * 商品搜索功能
 */

exports.searchRequest = ({ communityId, keyword, cityId, provinceId }) => {
  return _request({
    url:"/merchandise/search",
    data:{
      communityId,
      keyword,
      cityId,
      provinceId
    }
  })
}

/*
 * 今日特卖商品
 */
exports.promotion = ({id, type }) => {
  return _request({
    url:'/merchandise/promotion',
    data:{
      communityId: id,
      type
    }
  })
}
