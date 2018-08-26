let extConfig = wx.getExtConfigSync? wx.getExtConfigSync(): {}

const API_ROOT = extConfig.host || `https://v1.driver.quchuxing.com.cn`

const api = require('./apiUtils')

import { _apiPOST, _apiGET, _apiPUT, _apiDELETE } from './apiUtils'

const REQUEST_TYPE = ['GET','POST','PUT','DELETE']

// 假数据 周边的行程/travel/nearbyPeople
export const getFakeData = (options) => _apiPOST(`${API_ROOT}/travel/nearbyPeople`, options)

// 获取地理位置
export const getLocationText = (options) => _apiPOST(`${API_ROOT}/travel/reverseGeocoding`, options)

// export const postUnlockByNetWorking = (options) => _apiPOST(`${API_ROOT}/locks/unlock_by_networking`, options)
export const postWechatLogin = (options) => _apiPOST(`${API_ROOT}/weapp/login`, options)

// travel/nearby/person 附近的人（车主 乘客）
export const postNearbyOfPeople = (options) => _apiPOST(`${API_ROOT}/travel/nearby/person`, options)

// 检测用户是否登录
export const postFindLogin = (options) => _apiPOST(`${API_ROOT}/checkUser`, options)

// 登录注册 login_weixinapp
export const postLogin = (options) => _apiPOST(`${API_ROOT}/login_weixinapp`, options)

// 获取验证码
export const postSendCaptcha = (options) => _apiPOST(`${API_ROOT}/sendCaptcha`,options)

// 车主最近行程
export const postRecentTrip = (options) => _apiPOST(`${API_ROOT}/travel/latestOne`,options)

// 检测是否有家庭地址和公司地址 driver/address/searchAddressWeapp
export const getSearchAddress = (options) => _apiPOST(`${API_ROOT}/driver/address/searchAddressWeapp`, options)

// 添加公司/家地址
export const postHomeAndCompanyAddress = (options) => _apiPOST(`${API_ROOT}/driver/address/changeAddressWeapp`, options)

// 车主发布行程 /travel/createlv2
export const postCompanyJonrey = (options) => _apiPOST(`${API_ROOT}/travel/createlv2`, options)

// 路径规划 /travel/pathPlanning
export const getLine = (options) => _apiPOST(`${API_ROOT}/travel/pathPlanning`, options)
// 不穿token的线路规划
export const getLineV1 = (options) => _apiPOST(`${API_ROOT}/travel/pathPlanninglv1`, options)

// 个人主页
export const getUserInfo = (options) => _apiPOST(`${API_ROOT}/driver/personalInfo`, options)

// 附近群列表
export const getNearTheGroup = (options) => _apiPOST(`${API_ROOT}/driver/group/nearby`, options)

// 创建群
export const creatGroup = (options) => _apiPOST(`${API_ROOT}/driver/group/creatGroup`, options)

// 支付完成之后查看该订单详情 /travel/travelInfo_Driver
export const getOrderInfo = (options) => _apiPOST(`${API_ROOT}/travel/travelInfo_Driver`, options)

// 加入附近的群 driver/group/joinGroup
export const postJoinGroup = (options) => _apiPOST(`${API_ROOT}/driver/group/joinGroup`, options)

// 我的群 driver/group/myGroup
export const getMyGroupList = (options) => _apiPOST(`${API_ROOT}/driver/group/myGroup`, options)

// 群详情 driver/group/groupInfo
export const getGroupInfo = (options) => _apiPOST(`${API_ROOT}/driver/group/groupInfo`, options)

// /driver/group/detailGroup 家公司群内详情信息
export const getGroupDetails = (options) => _apiPOST(`${API_ROOT}/driver/group/detailGroup`, options)

// driver/group/detailGrouph 会议群内详细信息
export const getMeetingGroupDetails = (options) => _apiPOST(`${API_ROOT}/driver/group/detailGrouph`, options)

// /driver/upload/audit_weapp 车主认证
export const postCarInfo = (options) => _apiPOST(`${API_ROOT}/driver/upload/audit`, options)

// travel/detaillv2 车主查看已订座乘客
export const getBookedPeople = (options) => _apiPOST(`${API_ROOT}/travel/detaillv2`, options)

// attention/changAttention 关注
export const postAttention = (options) => _apiPOST(`${API_ROOT}/attention/changAttention`, options)

// attention/attentionList
export const getAttentionList = (options) => _apiPOST(`${API_ROOT}/attention/attentionList`, options)

// 车主 完成行程 /travel/finalylv1
export const updateTravel = (options) => _apiPOST(`${API_ROOT}/travel/finalylv1`, options)

// 发车 /travel/departurelv1
export const startCar = (options) => _apiPOST(`${API_ROOT}/travel/departurelv1`, options)

// 上传司机头像 /driver/detail/picture
export const updateHeaderImg = (options) => _apiPOST(`${API_ROOT}/driver/detail/picture`, options)

// 修改个人信息 /driver/detail/changelv1
export const updateUserInfo = (options) => _apiPOST(`${API_ROOT}/driver/detail/change_weapp`, options)

// 钱包信息 driver/money
export const getMoneyDetails = (options) => _apiPOST(`${API_ROOT}/driver/money`, options)

// 提交提现账号 /driver/moneylv2
export const postMoneylv = (options) => _apiPOST(`${API_ROOT}/driver/saveAlipay`, options)

///travel/invite 邀请乘客上车
export const sharePropleUpCar = (options) => _apiPOST(`${API_ROOT}/travel/invite`, options)

// 车主取消行程 /travel/cancel
export const deleteTravel = (options) => _apiPOST(`${API_ROOT}/travel/cancel`, options)

// 删除已完成行程 /travel/history/delete
export const deleteOverTravel = (options) => _apiPOST(`${API_ROOT}/travel/history/delete`, options)
// 分享行程详情
export const shareTravelDetails = (options) => _apiPOST(`${API_ROOT}/travel/shareTravelDetail`, options)

// 点赞 /feed/travelLike
export const postLike = (options) => _apiPOST(`${API_ROOT}/feed/travelLike`, options)

// 取消点赞 /feed/travelUnlike
export const deleteLike = (options) => _apiPOST(`${API_ROOT}/feed/travelUnlike`, options)

// 行程分享 /feed/travelShare
export const shareTravel = (options) => _apiPOST(`${API_ROOT}/feed/travelShare`, options)

// 车主抢单接口 /travel/driverSeckill
export const driverGrabAsingle = (options) => _apiPOST(`${API_ROOT}/travel/driverSeckill`, options)
