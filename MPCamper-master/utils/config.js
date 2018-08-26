
const conf = require('../conf.js');
const API_BASE = conf.baseDomain
var ERROR_DATA_IS_NULL = "获取数据为空，请重试";

const CONFIG = {
        APP_KEY: {
                AmapKey: "580186a553d30b077a830ac2a9ca6ba7"
        },
        API_URL: {
                GET_INDEX: API_BASE,
                GET_CamperCarAll: API_BASE + 'motorHomesCar/getCamperCarAll.ashx',//住房车列表 (首页)
                GET_CamperCarInfo: API_BASE + 'motorHomesCar/getCamperCarInfo.ashx',//住房车详情
                GET_CampOwerData: API_BASE + 'home/getCampOwerData.ashx', //营地列表（营地）
                GET_CampOwerInfo: API_BASE + 'home/getCampOwerInfo.ashx', //营地详情


                // 124、住房车提交订单
                POST_CamperOrder: API_BASE + 'motorHomesCar/postCamperOrder.ashx',

                // memberguid 会员id
                // bookingPersonName 预定人
                // bookingPersonPhone 预定人手机号
                // carGuid 车型id
                // bTime 预定开始日期2017- 09 - 22
                // eTime  预定结束日期2017- 09 - 22
                // currencyAmount-1 不用电子币支付抵扣
                // totalMoney 总金额
                // invoice  0 不需要邮费 1 需要邮费（不填默认为0）

                GET_MyOrderData: API_BASE + 'motorHomesCar/getMyOrderData.ashx',// 125、住房车我的订单（我的）

                GET_IsCamperOrder: API_BASE + 'motorHomesCar/IsCamperOrder.ashx',// 126、住房车订单验证是否可以支付（支付前调用）
                // 127、住房车订单详情接口
                GET_CamperOrderInfo: API_BASE + 'motorHomesCar/getCamperOrderInfo.ashx',

                //55、删除订单接口
               // orderGuid 订单id
                // type1 房车订单  2 活动订单 3住房车订单
                // orderNo  订单号 必传
                GET_DelMyOrder: API_BASE + 'mydata/delMyOrder.ashx',
                
                //56、确认取车/还车/入住接口
                GET_UpMyOrder: API_BASE + 'mydata/upMyOrder.ashx',
                // orderStatus订单状态3 待取车(待消费) 4 已取车待还车/ 入住 6 已消费  7 已取消  8 关闭订单
                // orderGuid1 订单id
                // type1 房车订单  2 活动订单 3 住房车
                // orderNo 订单号必填
                


                //  130、开锁接口  参数：  memberguid 会员id   deviceId  锁设备id（二维码中获取）
                GET_OpenMotorHomesCar: API_BASE + 'motorHomesCar/openMotorHomesCar.ashx',

                GET_WxPay: API_BASE + 'mydata/postWxPay.ashx',

                //126、住房车订单验证是否可以支付（支付前调用）memberguid 会员id           orderNo 订单号	
                GET_IsCamperOrder: API_BASE + 'motorHomesCar/IsCamperOrder.ashx',

                // 133、添加发票信息接口
                GET_AddInvoiceInfo: API_BASE + 'motorHomesCar/AddInvoiceInfo.ashx',
                // 传入参数：
                // orderGuid 订单id 
                // headerType   0 企业抬头 1 个人/非企业单位
                // headerTitle   抬头
                // number   纳锐人识别号
                // invoiceFee  发票费用
                // remarks  备注
                // addressee  收件人
                // contactNumber 联系电话
                // detailedAddress 收件详细地址



                //119、图形验证码获取 参数： mark = 1
                GET_SecurityCode: API_BASE + 'SecurityCode.aspx',

                //发送验证码 
                // phone = 18670339102 & mark=9
                // mark 1  支付密码发送 2 第三方登陆授权注册获取验证码  3 商家注册/商家修改手机号修改第二步  4 微信注册 5商家修改手机号(第一步)  6找回密码发送验证码 9 微信版绑定
                GET_SendPhoneCode: API_BASE + 'mydata/SendPhoneCode.ashx',
    
                GET_CamperRecommend: API_BASE + 'motorHomesCar/getCamperRecommend.ashx',

                //根据code获取openid
                GET_WxOpenId: API_BASE + 'wechat/getWxOpenId.ashx',
                // flag: 0：微信网页版 1 小程序
                // code：微信授权码

                GET_MemberInfoByUnionid: API_BASE + 'wechat/getMemberInfoByUnionid.ashx',
                // flag: 0：微信网页版 1 小程序
                // unionid

                //152、根据微信用户信息 获取unionid及判断微信用户是否已绑定房车行账号
                GET_WeChatLoginInfo: API_BASE + 'wechat/postWeChatLoginInfo.ashx',
                //传入参数： jsonData：微信返回的数据

                //绑定手机号
                GET_BindWxPhone: API_BASE + 'wechat/bindWxPhone.ashx',
                // flag: 0：微信网页版 1 小程序
                // openid：
                // unionid 
                // mobile 手机号
                // code 验证码

      
               // 129、二维码操作类型接口
                GET_QrCodeType: API_BASE + 'qrcode/getQrCodeType.ashx',
                // 129、开锁接口
                GET_openMotorHomesCar: API_BASE + 'motorHomesCar/openMotorHomesCar.ashx',
                // memberguid 会员id
                // deviceId  锁设备id（二维码中获取）

                //提交意见反馈接口
                POST_SuggestData: API_BASE + 'seting/suggest.ashx',

        },

        //文字提示
        TEST_HINT: {
                ERROR_DATA_IS_NULL: ERROR_DATA_IS_NULL
        }
}

module.exports = CONFIG;
