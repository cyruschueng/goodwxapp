const api_host = "https://toutiao.goldensoftcn.com/api/";
let get_sessionKey = api_host + "applogin/login";
let article_list = api_host + "ApiArticle/list";
let article_detail = api_host + "ApiArticle/detail";
let comment_list = api_host + "ApiMessage/list";
let comment_creat = api_host + "ApiMessage/CreateComment";
let comment_delete = api_host + "ApiMessage/DelComment";
let comment_operation = api_host + "Praise/PraiseOperation";
let get_coupletType = api_host + "Couplet/typelist";
let get_couplet = api_host + "Couplet/list";
let creat_couplet = api_host + "Couplet/CreateCouplet";
let pay_redPacket = api_host + "Pay/DownOrder";
let get_serviceFee = api_host + "Pay/CaculateServiceFee";
let grab_redPacket = api_host + "Bonus/GrabPackage";
let get_isOpenRed = api_host + "Bonus/IsOpenRed";
let get_bonusIndexData = api_host + "Bonus/BonusIndex";
let get_bonusDetailList = api_host + "Bonus/BonusDetailList";
let get_giveOutRecord = api_host + "Bonus/AlreadyGiveOut";
let get_grabRecord = api_host + "Bonus/AlreadyOpen";
let withdraw_money = api_host + "Pay/EnterprisePay";
let get_userBalance = api_host + "Bonus/UserBalance";
let get_serviceFeeExplain = api_host + "Bonus/ServiceFeeExplain";
let UploadVoice = api_host + "Bonus/UploadFileNew";
let get_showInfo = api_host + "Bonus/ShowBonus";
let get_serviceMsg = api_host + "follow/GetCustomerServiceMsg";
export { 
  get_sessionKey,//获取sessionKey
  article_list,  //文章列表
  article_detail,  //文章详情
  comment_list, //评论列表
  comment_creat,//发表评论
  comment_delete,//删除评论
  comment_operation,//评论点赞、取消点赞
  get_coupletType,//获取对联类型
  get_couplet,//获取对联列表
  creat_couplet,//自定义对联
  pay_redPacket,//生成并发送红包
  get_serviceFee,//获取服务费
  grab_redPacket,//拆红包
  get_isOpenRed,//验证当前用户是否已经拆过红包
  get_bonusIndexData,//获取拆红包主页的数据
  get_bonusDetailList,//红包已领取记录列表
  get_giveOutRecord,//已发出红包统计
  get_grabRecord,//已领取红包统计
  withdraw_money,//余额提现
  get_userBalance,//用户账户余额
  get_serviceFeeExplain,//服务费声明
  UploadVoice,//语音上传服务器
  get_showInfo,//获取晒红包所需的信息
  get_serviceMsg,//获取客户推送消息
  }