var host = 'xcx.icarplus.net'
// 登录接口
var login_url = `https://${host}/lsmon-server/rest/cust/custApp/custLogin`
// 注册接口
var register_url = `https://${host}/lsmon-server/rest/cust/custApp/register`
// 图形验证码接口
var imageVerifyCode_url = `https://${host}/lsmon-server/rest/authImage/getImageVerifyCode`
// 手机验证码接口
var phoneCodeToFront_url = `https://${host}/lsmon-server/rest/channel/smsApp/getPhoneCodeToFront`
// 获取车型接口
var getCarType_url = `https://${host}/lsmon-server/rest/yzc/app/driver/getCarType`
// 获取费用接口
var getCarStylePrice_url = `https://${host}/lsmon-server/rest/yzc/app/driver/getCarStylePrice`
// 发布行程接口
var submitCharterOrder_url = `https://${host}/lsmon-server/rest/hydiy/charter/order/submitCharterOrder`
// 附近车辆接口
var getLocation_url = `https://${host}/lsmon-server/rest/hydiy/charter/driver/getLocation`
// 百度地图接口
var baiduMap_url = 'https://api.map.baidu.com/geocoder/v2/'
// 找车接口
var findCarAndDriver_url = `https://${host}/lsmon-server/rest/hydiy/charter/order/findCarAndDriver`
// 取消行程接口
// var cancelOrder_url=`https://${host}/lsmon-server/rest/yzc/app/driver/canceIOrder`
// 判断乘客取消订单是否需要付款接口
var isNeedPay_url = `https://${host}/lsmon-server/rest/yzc/app/order/isNeedPay`
// 乘客免费取消执行中的订单接口
var custFreeCancelOrderAfterExecute_url = `https://${host}/lsmon-server/rest/yzc/app/order/custFreeCancelOrderAfterExecute`
// 乘客收费执行中的订单接口
var custNotFreeCancelOrderAfterExecute_url = `https://${host}/lsmon-server/rest/yzc/app/order/custNotFreeCancelOrderAfterExecute`
// 获取客户执行中订单详情
var getCustExcOrderInfo_url = `https://${host}/lsmon-server/rest/yzc/app/driver/getCustExcOrderInfo`
// 车辆距离乘客位置
var getCarDistance_url = `https://${host}/lsmon-server/rest/yzc/app/driver/getCarDistance`
// 车辆客户端实时位置查询
var getCarInformation_url = `https://${host}/lsmon-server/rest/yzc/app/driver/getCarInformation`
// 腾讯地图API
var qqMap_url = 'https://apis.map.qq.com/ws/direction/v1/driving/'
// 腾讯地图api  获取位置描述
var qqMap_getLocalDatail_url = 'https://apis.map.qq.com/ws/geocoder/v1/'
// 获取乘客订单列表
var qryNewMyOrderList_url = `https://${host}/lsmon-server/rest/orderapp/myOrder/qryNewMyOrderList`
// 客户端执行中订单查询
var kURLgetCustOrderStatus_url = `https://${host}/lsmon-server/rest/yzc/app/driver/getCustOrderStatus`
// 查询待指派订单接口
var qrytAssignOrderDet_url = `https://${host}/lsmon-server/rest/yzc/app/order/qrytAssignOrderDet`
// 查询订单费用明细
var getOrderCostDetail_url = `https://${host}/lsmon-server/rest/yzc/app/order/getOrderCostDetail`
// 客户端查看订单费用明细
var qrytOrderDet_url = `https://${host}/lsmon-server/rest/yzc/app/order/qrytOrderDet`
// 支付宝/银联/微信支付
var netPayOrder_url = `https://${host}/lsmon-server/rest/yzc/app/driver/netPayOrder`
// 电子账户钱包查询
var queryAccountWallet_url = `https://${host}/lsmon-server/rest/yzc/app/driver/queryAccountWallet`
// 行程订单查询
var getOrderList_ur = `https://${host}/lsmon-server/rest/yzc/app/driver/getOrderList`
// 钱包查询new
var queryAccountWallet_new_url = `https://${host}/lsmon-server/rest/assist/appimg/queryAccountWallet`
// 客户端取消订单
var custCancelOrderBeforeFindDriver_url = `https://${host}/lsmon-server/rest/yzc/app/order/custCancelOrderBeforeFindDriver`
// 电子账户头像上传
// var addAcctHeadImage_url=`https://${host}/lsmon-server/rest/yzc/app/driver/addAcctHeadImage`
var addAcctHeadImage_url = `https://${host}/lsmon-server/rest/cust/custApp/addAcctHeadImage`
// 头像信息查询
var getAcctInfo_url = `https://${host}/lsmon-server/rest/cust/custApp/getAcctInfo`
// 获取用户信息
var getUserInfoDetail_url = `https://${host}/lsmon-server/rest/yzc/app/driver/getUserInfoDetail`
// 获取乘客取消原因列表
var getCustCancelReasonList_url = `https://${host}/lsmon-server/rest/yzc/app/order/getCustCancelReasonList`
// 显示头像
var showHeadImage_url = `https://${host}/lsmon-server/rest/attachApp/qryAttachInfo?id=`
// 高德地图
var gaodeMap_url = 'https://restapi.amap.com/v3/geocode/regeo'
// 提交订单投诉内容接口
var putComplaintDetail_url = `https://${host}/lsmon-server/rest/yzc/app/passengerComplaint/putComplaintDetail`
// 查看投诉处理结果接口
var queryComplaintDetail_url = `https://${host}/lsmon-server/rest/yzc/app/passengerComplaint/queryComplaintDetail`
// 客户端获取订单评价选项接口
var qrytEvaluateList_url = `https://${host}/lsmon-server/rest/yzc/app/order/qrytEvaluateList`
// 客户端提交评价接口
var submitEvaluateList_url = `https://${host}/lsmon-server/rest/yzc/app/order/submitEvaluateList`
// 客户端执行中订单查询
var getCustOrderStatus_url = `https://${host}/lsmon-server/rest/yzc/app/driver/getCustOrderStatus`
module.exports = {
  // 服务器地址
  host: host,
  //登录接口
  login_url: login_url,
  // 注册接口
  register_url: register_url,
  // 图形验证码接口
  imageVerifyCode_url: imageVerifyCode_url,
  // 手机验证码接口
  phoneCodeToFront_url: phoneCodeToFront_url,
  // 获取车型接口
  getCarType_url: getCarType_url,
  // 获取费用接口
  getCarStylePrice_url: getCarStylePrice_url,
  // 发布行程接口
  submitCharterOrder_url: submitCharterOrder_url,
  // 附近车辆接口
  getLocation_url: getLocation_url,
  // 百度地图接口
  baiduMap_url: baiduMap_url,
  // 找车接口
  findCarAndDriver_url: findCarAndDriver_url,
  // 取消行程接口
  // cancelOrder_url:cancelOrder_url
  // 判断乘客取消订单是否需要付款接口
  isNeedPay_url: isNeedPay_url,
  // 乘客免费取消执行中的订单接口
  custFreeCancelOrderAfterExecute_url: custFreeCancelOrderAfterExecute_url,
  // 乘客收费取消执行中的订单接口
  custNotFreeCancelOrderAfterExecute_url: custNotFreeCancelOrderAfterExecute_url,
  // 获取客户执行中订单详情
  getCustExcOrderInfo_url: getCustExcOrderInfo_url,
  // 车辆距离乘客位置
  getCarDistance_url: getCarDistance_url,
  // 车辆客户端实时位置查询
  getCarInformation_url: getCarInformation_url
  // 腾讯地图API
  , qqMap_url: qqMap_url
  // 腾讯地图api 获取位置描述
  , qqMap_getLocalDatail_url: qqMap_getLocalDatail_url
  // 获取乘客订单列表
  , qryNewMyOrderList_url: qryNewMyOrderList_url
  // 客户端执行中订单查询
  , kURLgetCustOrderStatus_url: kURLgetCustOrderStatus_url
  // 查询待指派订单接口
  , qrytAssignOrderDet_url: qrytAssignOrderDet_url
  // 查询订单费用明细
  , getOrderCostDetail_url: getOrderCostDetail_url
  // 客户端查看订单费用明细
  , qrytOrderDet_url: qrytOrderDet_url
  // 支付宝/银联/微信支付
  , netPayOrder_url: netPayOrder_url
  // 电子账户钱包查询
  , queryAccountWallet_url: queryAccountWallet_url
  // 行程订单查询
  , getOrderList_ur: getOrderList_ur
  // 钱包查询new
  , queryAccountWallet_new_url: queryAccountWallet_new_url
  // 客户端取消订单
  , custCancelOrderBeforeFindDriver_url: custCancelOrderBeforeFindDriver_url
  // 电子账户头像上传
  , addAcctHeadImage_url: addAcctHeadImage_url
  // 头像信息查询
  , getAcctInfo_url: getAcctInfo_url
  // 获取用户信息
  , getUserInfoDetail_url: getUserInfoDetail_url
  // 获取乘客订单列表
  , getCustCancelReasonList_url: getCustCancelReasonList_url
  // 显示头像
  , showHeadImage_url: showHeadImage_url
  // 高德地图
  , gaodeMap_url: gaodeMap_url
  // 提交订单投诉内容接口
  , putComplaintDetail_url: putComplaintDetail_url
  // 查看投诉处理结果接口
  , queryComplaintDetail_url: queryComplaintDetail_url
  // 客户端获取订单评价选项接口
  , qrytEvaluateList_url: qrytEvaluateList_url
  // 客户端提交评价接口
  , submitEvaluateList_url: submitEvaluateList_url
  // 客户端执行中订单查询
  , getCustOrderStatus_url: getCustOrderStatus_url
}