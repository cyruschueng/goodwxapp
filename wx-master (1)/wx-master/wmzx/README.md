# 微信小程序

### 说明：

信用卡还款功能。

### 数据接口:

待定

### 目录结构：

- images — 存放项目图片文件
- pages — 存放项目页面文件
- utils — 存放公用文件
- template — 存放项目模板文件
- wxParse — 存放wxParse库文件

### 开发环境：

微信web开发者工具 v1.01.17.171020

###  页面名称：

    "pages/index/index",   //首页
    "pages/Promotion center/Promotion center",  //推广中心
    "pages/account/account",  //账户
     
    "pages/login/login", //登陆
    "pages/regist/regist", //注册
    "pages/pwd/pwd",  //找回密码，修改密码，设置支付密码
    "pages/article/article",  //文章页面
    
    "pages/card/card",   //信用卡管理
    "pages/add/add",  //添加信用卡
    "pages/helpCenter/helpCenter",  //帮助中心
    
    "pages/wallet/wallet",  //钱包
    "pages/profits/profits",   //分润列表
    "pages/bill/bill",  //账单
    "pages/security/security",  //账户安全
    
    "pages/about/about",  //关于公司
    "pages/grade/grade",  //合作伙伴
    "pages/music/music",  //待用
    
    "pages/realName/realName",  //实名认证列表
    "pages/WithdrawalList/WithdrawalList",  //提现列表
    "pages/detailOrder/detailOrder",  //账单详细列表
    
    "pages/myCard/myCard",  //我的银行卡
    "pages/treaty/treaty",  //借款协议
    "pages/smartBill/smartBill",  //智能账单和申请还款
    "pages/membership/membership"  //下级会员列表


###  本地存储：
    uid：用户账号id，
    realName：真实姓名，
    userData：个人详情，
    userBankName：储蓄卡银行名称，
    userBanId:储蓄卡银行卡号，
    mer:注册的类型，
    phone：用户注册的手机号，
    display：判断是否实名认证的bool，
    cardList：信用卡详情列表，
    cardId:处理后的信用卡号，
    borrowList：订单列表，
    num：正在还款笔数，
    money：正在还款总金额，
    mothTotalMoney：累计交易金额，
    nickNmae：微信昵称，
    avatarUrl：微信头像链接，
    method：判断是进入申请还款还是智能账单的bool，
    detailOrder：详细的账单列表，
    status：订单状态，
    detailOrderCardNUm：账单银行卡号，
    detailOrderIndex：选择查看账单的序号，
    member：下级会员人数，
    access：判断是进入找回密码。修改密码，还是设置支付页面，
    memberList：下级会员详细情况，
    imgNav1，imgNav2：首页功能区，
    order：判断进入那个等级的会员详情页面，
    repayMoney：此次借款的金额，
    repayDate：此次借款希望还款天数，
    listIndex：申请还款的信用卡详情





