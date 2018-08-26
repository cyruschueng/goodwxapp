/**
 * 小程序配置文件
 */


var host = "a.welife001.com"

var config = {

  // 下面的地址配合云端 Server 工作
  host,

  updateTsUrl: `https://${host}/back/configuration/detail/update_ts`,

  wxloginUrl: `https://${host}/wxlogin`,

  configUrl: `https://${host}/back/configuration/json?type=1`,

  memberJoinUrl: `https://${host}/memberJoin`,

  gidBindCheckUrl: `https://${host}/gidBindCheck`,

  groupBindCheckUrl: `https://${host}/groupBindCheck`,

  roleListUrl: `https://${host}/getRoleList`,

  notifyCheckUrl: `https://${host}/notify/check`,

  feedbackAnswerUrl: `https://${host}/feedback/answer`,

  feedbackLikeUrl: `https://${host}/feedback/like`,

  feedbackRateUrl: `https://${host}/feedback/rate`,

  feedbackCommentUrl: `https://${host}/feedback/comment`,

  notifyAcceptUrl: `https://${host}/notify/accept`,

  delNotifyUrl: `https://${host}/delNotify`,

  notifyFeedbackUrl: `https://${host}/notify/feedback`,


   //下面是添加作业相关的
  ClassByImprintUrl: `https://${host}/getClassByImprint`,

  addNotifyWithFileUrl: `https://${host}/notify/create_image`,

  addNotifyWithTextUrl: `https://${host}/notify/create_text`,

  notifyCopyUrl: `https://${host}/notify/copy`,

  notifyUploadFileUrl: `https://${host}/notify/uploadImage`,

  NameByImprintUrl: `https://${host}/notify/getNameByImprint`,
  //授权关联
  associateUrl: `https://${host}/associate`,
   

  CurrentUserWithMemberInfoUrl: `https://${host}/getCurrentUserWithMemberInfo`,
  
  ClassByGidUrl: `https://${host}/getClassByGid`,
  

  //下面是作业分享相关的

  notifiesQueryUrl: `https://${host}/notify/query`,

  updateClassUrl: `https://${host}/update/class`,

  createMemberUrl: `https://${host}/createMember`,

  editTimetableUrl: `https://${host}/editTimetable`,

  userInfoUrl: `https://${host}/userInfo`,
  
  unAssociateUrl: `https://${host}/unAssociate`,

  updatePhoneUrl: `https://${host}/updatePhone`,

  updateUserInfoUrl: `https://${host}/updateUserInfo`,

  MembersByCidUrl: `https://${host}/getMembersByCid`,

  editClassUrl: `https://${host}/edit/class`,

  delClassUrl: `https://${host}/back/class/del`,


  memberByIdUrl: `https://${host}/getMemberById`,

  updateMemberUrl: `https://${host}/updateMember`,

  classByIdUrl: `https://${host}/getClassById`,

  ClassMemberCountUrl: `https://${host}/getClassMemberCount`,

  delMemberUrl: `https://${host}/delMember`,

  createMemberUrl: `https://${host}/createMember`,
  
  LikeUrl: `https://${host}/getLike`,

  mainNotifiesUrl: `https://${host}/notify/notifies`,



  msgInfoUrl: `https://${host}/msgInfo`,

  UserInfoUrl: `https://${host}/UserInfo`,

  unBindUrl: `https://${host}/back/member/unbind`,

  groupInitUrl: `https://${host}/groupInit`,


  getUserInfoUrl: `https://${host}/getUserInfo`,

  getGroupInfoUrl: `https://${host}/getGroupInfo`,
  

   RatedUrl: `https://${host}/getRated`,

   DialogUrl: `https://${host}/getDialog`,

   feedbackCommentUrl: `https://${host}/feedback/comment`,

   systemInfoUrl: `https://${host}/getSystemInfo`,


   timeTableUrl: `https://${host}/getTimeTable`,

   createClassUrl: `https://${host}/create/class`,
  
   
   createAlbumUrl: `https://${host}/createAlbum`,

   getAlbumsUrl: `https://${host}/getAlbums`,

   getPhotosUrl: `https://${host}/getPhotos`,

   uploadPhotoUrl: `https://${host}/uploadPhoto`,

   delAlbumUrl: `https://${host}/delAlbum`,

   delPhotoUrl: `https://${host}/delPhoto`,

   setCoverUrl: `https://${host}/setCover`,

   
   aliyunOssUrl: `http://campus002.oss-cn-beijing.aliyuncs.com/{url}`,

   aliyunVideoOssPreUrl: `http://campussharevideo.oss-cn-beijing.aliyuncs.com/`,
   aliyunImageOssPreUrl: `http://campus002.oss-cn-beijing.aliyuncs.com/`,

   aliyunVideoCoverExt: `?x-oss-process=video/snapshot,t_20000,f_jpg,w_500,h_500`,

   aliyunOss100Url: `http://campus002.oss-cn-beijing.aliyuncs.com/{{url}}?x-oss-process=image/resize,w_100,h_100,m_fill/auto-orient,1/quality,q_100/interlace,1/format,jpg`,

   putFormidUrl: `https://${host}/addFormId`,

   getConfigJsonValue: `https://${host}/getConfigJsonValue`,
   
   createMusicAlbumUrl: `https://${host}/createMusicAlbum`,

   updateConfigUrl: `https://${host}/config_update`,

   createRemarkUrl: `https://${host}/notify/remark`,

   unfeedbackTipMsgUrl: `https://${host}/unfeedbackTipMsg`,
   remindedMsgUrl: `https://${host}/notify/reminded`,
  
  // 登录地址，用于建立会话
  loginUrl: `https://${host}/login`,

  // 测试的请求地址，用于测试会话
  requestUrl: `https://${host}/testRequest`,

  // 用code换取openId
  openIdUrl: `https://${host}/openid`,

  // 测试的信道服务接口
  tunnelUrl: `https://${host}/tunnel`,

  // 生成支付订单的接口
  paymentUrl: `https://${host}/payment`,

  // 发送模板消息接口
  templateMessageUrl: `https://${host}/templateMessage`,

  // 上传文件接口
  uploadFileUrl: `https://${host}/upload`,

  // 下载示例图片接口
  downloadExampleUrl: `https://${host}/static/weapp.jpg`
};

module.exports = config
