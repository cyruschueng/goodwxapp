let env = () => {
  let env = 'test'
  return env
}

let baseUrl = {
  local: '//api.shot.test.vb.com.cn',
  userurl: 'http://111.231.53.151:8088/shunde/user/',
  despurl: 'http://111.231.53.151:8088/shunde/dept/'
}
// let lunaUrl = {
//   online: '//luna.visualbusiness.cn/luna-web',
//   test: '//luna-test.visualbusiness.cn/luna-web',
//   local: '//luna-test.visualbusiness.cn/luna-web',
//   pre: '//luna-pre.visualbusiness.cn/luna-web'
// }
// let showUrl = {
//   local: 'http://localhost:8083',
//   online: '//api.show.vb.com.cn',
//   test: '//api.show.test.vb.com.cn',
//   pre: '//api.show.pre.visualbusiness.cn'
// }

var bucket = {
  local: 'panopublictest',
  dev: 'panopublictest',
  test: 'panopublictest',
  online: 'panopublic',
  pre: 'panopublic'
}
// 万象优图的路径
var resourPicShow = {
  local: '//panoresourcestest-10002033.picsh.myqcloud.com',
  dev: '//panoresourcestest-10002033.picsh.myqcloud.com',
  test: '//panoresourcestest-10002033.picsh.myqcloud.com',
  pre: '//cimg1.visualbusiness.cn',
  online: '//cimg1.visualbusiness.cn'
}
// bucket 的直接路径
var resourPicFact = {
  local: '//panoresourcestest-10002033.file.myqcloud.com',
  dev: '//panoresourcestest-10002033.file.myqcloud.com',
  test: '//panoresourcestest-10002033.file.myqcloud.com',
  pre: '//panoresources-10002033.file.myqcloud.com',
  online: '//panoresources-10002033.file.myqcloud.com'
}

var skyPicBucket = {
  local: '//panomedias-10002033.image.myqcloud.com',
  dev: '//panomedias-10002033.image.myqcloud.com',
  test: '//panomedias-10002033.image.myqcloud.com',
  pre: '//panomedias-10002033.image.myqcloud.com',
  online: '//panomedias-10002033.image.myqcloud.com'
}
export function getSkyImageUrl (params) {
  return `${skyPicBucket[env()]}/skyPatchimg/${params.id}/skypatch.jpg`
}

var previewUrl = '//pano.shunde.vizen.cn/album/src/single.html?panoId='

const myBucket = bucket[env()]
const resourPicShowUrl = resourPicShow[env()]
const resourPicFactUrl = resourPicFact[env()]
const baseWebUrl = () => {
  return location.origin + location.pathname
}

export { env, previewUrl, baseWebUrl }
export { baseUrl, myBucket, resourPicShowUrl, resourPicFactUrl }

/**
 * api permission
 */
const apiUri = {
  /**
   * 是否已登录
   */
  islogon: '/shunde/user/islogon',
  /**
   * 专题登录token
   */
  getUserToken: '/shunde/user/getLoginToken',
  /**
   * 登录
   */
  login: '/shunde/user/login',
  /**
   * uri权限
   */
  getUserPermissions: '/shunde/user/userPermissions',
  /**
   * 注册
   */
  register: '/shunde/user/regist',
  /**
   * 部门列表
   */
  departmentList: '/shunde/dept/list',
  /**
   * 短信验证码
   */
  getPassWord: '/shunde/user/sendCode',
  /**
   * 重设密码
   */
  resetPassWord: '/shunde/user/resetPwd',
  /**
   * 用户信息
   */
  getUserInfo: '/shunde/user/info',
  /**
   * 更新密码
   */
  updatePassword: '/shunde/user/updatePwd',
  /**
   * 新增用户
   */
  createUser: '/shunde/user/createUser',
  /**
   * 用户列表
   */
  getUserList: '/shunde/user/list',
  /**
   * 删除用户
   */
  deleteUser: '/shunde/user/delete',
  /**
   * 更新用户信息
   */
  updateUser: '/shunde/user/update',
  /**
   * 申请权限
   */
  userApply: '/shunde/user/apply',
  /**
   * 权限审批
   */
  managerAudit: '/shunde/user/audit',
  /**
   * 退出
   */
  userLoginOut: '/shunde/user/logout',
  /**
   * cos存储获取签名
   */
  getSignature: '/shunde/inner/upload/sign',
  /**
   * 获取专题token
   */
  getToken: '/shunde/user/getLoginToken',
  /**
   * 保存无人机图片
   */
  droneAutoStitch: '/shunde/pano/droneAutoStitch',
  /**
   * 获取无人机素材图片
   */
  getPatchIds: '/shunde/pano/getPatchIds',
  /**
   * 保存无人机补天图片
   */
  saveSkypatch: '/shunde/pano/saveSkypatch',
  /**
   * 无人机  更新状态--退回重新选择补天图片
   */
  updateStatus: '/shunde/pano/updateStatus',
  /**
   * 无人机  补天融合拼接-融合完成会进入待入库
   */
  startPatch2: '/shunde/pano/startPatch2',
  /**
   * 上传全景图单张瓦片
   */
  updatePanoStitchPic: '/shunde/pano/updatePanoStitchPic',
  /**
   * 批量上传全景图瓦片
   */
  submitAllPanoPic: '/shunde/pano/submitAllPanoPic',
  /**
   * 删除全景图单张瓦片
   */
  deleteOnePanoStitchPic: '/shunde/pano/deleteOnePanoStitchPic',
  /**
   * 全景批量删除-待处理、已入库中
   */
  deletePanoInfoBatch: '/shunde/pano/deletePanoInfoBatch',
  /**
   * 获取单张全景信息-待拼接
   * /shunde/pano/getPanoStitch/{panoId}
   */
  getPanoStitch: '/shunde/pano/getPanoStitch/{panoId}',
  /**
   * 全景批量删除-待拼接
   */
  deletePanoStitchBatch: '/shunde/pano/deletePanoStitchBatch',
  /**
   * 删除单个全景-待拼接
   */
  deletePanoStitch: '/shunde/pano/deletePanoStitch/{panoId}',
  /**
   * 批量发起全景拼接
   */
  processPanoBatch: '/shunde/pano/processBatch',
  /**
   * 全景发起拼接
   */
  processPano: '/shunde/pano/process',
  /**
   * 获取发布列表--草稿箱
   */
  getPublishDrafts: '/shunde/pano/getPanoInfoList',
  /**
   * 获取发布列表---已发布
   */
  getPublishedList: '/shunde/pano/getPanoInfoList',
  /**
   * 获取发布列表-已删除
   */
  getPublishDelete: '/shunde/pano/getPanoInfoList',
  /**
   * 获取全景列表-待入库
   */
  getPanoInfoList: '/shunde/pano/getPanoInfoList',
  /**
   * 获取全景列表-已入库
   */
  getPanoInfoListFinish: '/shunde/pano/getPanoInfoList',
  /**
   * 获取全景信息-待处理、已入库
   */
  getPanoInfo: '/shunde/pano/getPanoInfo/{panoId}',
  /**
   * 更新全景名称
   */
  updatePanoName: '/shunde/pano/updatePanoName',
  /**
   * 待处理、已入库全景更改名字
   */
  updatePanoInfoName: '/shunde/pano/updatePanoInfoName',
  /**
   * 用获取全景列表-待拼接
   */
  getPanoStitchList: '/shunde/pano/getPanoStitchList',
  /**
   * 全景单个删除-待处理、已入库中
   */
  deletePanoInfo: '/shunde/pano/deletePanoInfo/{panoId}',
  /**
   * 新建全景
   */
  ceatePano: '/shunde/pano/ceatePano',
  /**
   * 保存入库单
   */
  savePanoInfo: '/shunde/pano/savePanoInfo',
  /**
   * 搜索poilist  分页
   */
  getPanoInfoListByPoi: '/shunde/pano/getPanoInfoListByPoi',
  /**
   * 新建poi
   */
  createPoi: '/shunde/poi/createPoi',
  /**
   * 获取异常点
   */
  getErrorPois: '/shunde/poi/searchErrorPoiPage',
  /**
   * 搜索poilist
   */
  searchPoi: '/shunde/poi/searchPoi',
  /**
   * 删除poi
   */
  deletePoi: '/shunde/poi/deletePoi',
  /**
   * 更新poi
   */
  updatePoi: '/shunde/poi/updatePoi',
  /**
   * 搜索poi
   */
  searchPoiPage: '/shunde/poi/searchPoiPage',
  /**
   * 搜索poi后台排序
   */
  searchPoiPageForPano: '/shunde/poi/searchPoiPageForPano',
  /**
   * 上传2：1全景图前申请panoId
   */
  generatePanoId: '/shunde/pano/generatePanoId',
  /**
   * 2:1全景图上传完成通知
   */
  finishUploadPano: '/shunde/pano/finishUploadPano',
  /**
   * 新建标签
   */
  createTag: '/shunde/tag/createTag',
  /**
   * 搜索标签
   */
  searchTag: '/shunde/tag/searchTag',
  /**
   * 搜索地区列表
   */
  commonzone: '/shunde/commonzone/pulldown/zone',
  /**
   * 三维数据列表
   */
  getThreeDData: '/shunde/threeDimensional/list',
  /**
   * 更新单条三维数据
   */
  changeThreeDData: '/shunde/threeDimensional/update',
  /**
   * 全景信息统计
   */
  getPanoInfoCensus: '/shunde/space/panoInfoStatistics',
  /**
   * 根据网格获取poi信息
   */
  getPoiList: '/shunde/space/getGridPanoIndex',
  /**
   * poi排序
   */
  poiListSort: '/shunde/space/adjustmentPanoIndex',
  /**
   * 主网格marker点获取
   */
  getMarkerList: '/shunde/space/getAroundPano',
  /**
   * 全景访问量埋点地址
   * */
  panoStatistics: '/shunde/stat/reportViewPano',
  /**
   * 搜索全景网格的tag标签
   * */
  searchPanoTag: '/shunde/tag/searchPanoTag'
}
export { apiUri }
