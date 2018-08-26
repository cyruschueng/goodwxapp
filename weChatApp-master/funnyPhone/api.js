/**
 * Created by songyongming on 2017/4/17.
 */
var system = require('./utils/system.js')
var utils = require('./utils/util.js')
var wc = require('./utils/wcache.js')

function wuser(cat,page,search, successCB,failCB) {
  var key = 'cache_wuserlist_cat_'+cat;
  if(wc.get(key) && !search && page==1){
    successCB(wc.get(key));
  }else{
    system.myRequest('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/wusers',
      {
        cat: cat,
        page: page,
        search:search,
      },successCB,failCB,(!search && page==1?key:''),600);
  }
}

function sharelist(cat,page, successCB,failCB) {
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/share/sharelist',
    {
      cat: cat,
      page: page,
    },successCB,failCB);
}

function template(cat,type,page, successCB,failCB) {
  var key = 'cache_templatelist_cat_'+cat+'_type_'+type;
  if(wc.get(key) &&  page==1){
    successCB(wc.get(key));
  }else{
    system.myRequest('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/templates',
      {
        cat: cat,
        type:type,
        page: page,
      },successCB,failCB,(page==1?key:''),600);
  }
}
function zhuangxlist(cat,type,page,search, successCB,failCB) {
  var key = 'cache_zhuangxlist_cat_'+cat+'_type_'+type;
  if(wc.get(key) && !search && page==1){
    successCB(wc.get(key));
  }else{
    system.myRequest('https://api.maiyizhi.cn/index.php?r=api/zhuangx/zhuangxslist',
      {
        cat: cat,
        type:type,
        page: page,
        search:search
      },successCB,failCB,(!search && page==1?key:''),600);
  }
}
function templatePay(type,id, successCB,failCB) {
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/templatepay',
    {
      type:type,
      id: id,
    },successCB,failCB);
}
function zhuangxinfo(id, successCB,failCB) {

  var key = 'cache_zhuangxinfo_'+id;
  if(wc.get(key)){
    successCB(wc.get(key));
  }else{
    system.myRequest('https://api.maiyizhi.cn/index.php?r=api/zhuangx/zhuangxsinfo',
      {
        id: id,
      },successCB,failCB,key,1200);
  }
}
function zhuangxadd(id, successCB,failCB) {
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/zhuangx/zhuangxsadd',
    {
      id: id,
    },successCB,failCB);
}
function xiezi(text,ziti,size,color,linewidth,lineheight, successCB,failCB) {
  system.myRequest('https://'+utils.randdomDomain()+'.maiyizhi.cn/producter/php/frontend/web/index.php?r=data/default/xiezi',
    {
      text: text,
      ziti:ziti,
      size:size,
      color:color,
      linewidth:linewidth,
      lineheight:lineheight
    },successCB,failCB);
}
function bianLian(originalUrl,modelType, successCB,failCB) {
  system.myRequest('https://'+utils.randdomDomain()+'.maiyizhi.cn/producter/php/frontend/web/index.php?r=TencentAI/default/index',
    {
      imgUrl: originalUrl,
      type:modelType,
    },successCB,failCB);
}
function getQiniuAvatar(avatar, successCB,failCB) {
  if(avatar.indexOf('maiyizhi.cn')!=-1){
    successCB({"avatar":avatar})
  }else{
    system.myRequest('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/getqiniuavatar',
      {
        avatar:avatar,
      },successCB,failCB);
  }
}

function random(successCB,failCB) {
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/random',
    {},successCB,failCB);
}

/* 获取静态信息 */
function getStaticApi(key,successCB) {
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/common/staticSource',{key: key},successCB);
}

/* 获取七牛token */
function getQiniuTokenApi(bucket,successCB) {
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/upload/gettoken',{bucket: bucket},successCB);
}


function getUrl(url,successCB,failCB){
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/geturl',
    {url:url},successCB,failCB);
}

function getPayParamsApi(open_id, user_name,avatar,price,post_id,successCB) {
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/hongbao/prepay',{user_id:open_id,user_name:user_name,avatar:avatar,price:price,post_id:post_id},successCB);
}
function pay(open_id, price,title,successCB) {
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/pay',{user_id:open_id,price:price,title:title},successCB);
}
function tixian(open_id, amount,formId,successCB,failCB) {
  console.log(failCB)
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/hongbao/tixian',{user_id:open_id,amount:amount,formId:formId},successCB,failCB);
}
/* 登录 */
function getLoginApi(jscode, rawData, signature, encryptedData, iv, successCB) {
  var data = {
    jscode: jscode,
    rawData:rawData,
    signature,signature,
    encryptedData:encryptedData,
    iv:iv
  }
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/login',data,successCB);
}
function newHongbaoitem(user,pic,video,min,max,desc,formId,successCB,failCB) {
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/hongbao/newhongbaoitem', {
    user:user,
    pic:pic,
    video:video,
    min:min,
    max:max,
    desc:desc,
    formId:formId
  },successCB,failCB);
}

function newSharelist(user,pics,content,formId,successCB,failCB) {
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/share/newsharelist', {
    user:user,
    pics:pics,
    content:content,
    formId:formId
  },successCB,failCB);
}
function profile(user_name,avatar,successCB,failCB) {
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/profile', {
    user_name:user_name,
    avatar:avatar,
  },successCB,failCB);
}
function ScreenshotDeal(pic,systeminfo,cat,title,time,has_pay,dianliang,yunyingshang,successCB,failCB) {
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/screenshotDeal', {
    pic:pic,
    systeminfo:systeminfo,
    cat:cat,
    time:time,
    has_pay:has_pay,
    title:title,
    dianliang,dianliang,
    yunyingshang,yunyingshang
  },successCB,failCB);
}
function Newduser(user,successCB) {
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/hongbao/newduser', {
    user:user
  },successCB);
}

function Hongbaoiteminfo(id,successCB,failCB){
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/hongbao/hongbaoiteminfo', {
    id:id
  },successCB,failCB);
}

function mingxi(page,successCB){
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/hongbao/mingxi', {
    page:page
  },successCB);
}

function getUser(successCB,failCB){
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/userinfo', {
  },successCB,failCB);
}

function init(successCB,failCB){
  var key = 'cache_init';
  if(wc.get(key)){
    successCB(wc.get(key));
  }else{
    system.myRequest('https://data.maiyizhi.cn/producter/php/frontend/web/index.php?r=data/default/index', {
    },successCB,failCB,key,200);
  }
}
function tiaozhuan(key,successCB,failCB){
  var keys = 'cache_tiaozhuan_'+key;
  if(wc.get(keys)){
    successCB(wc.get(keys));
  }else{
    system.myRequest('https://data.maiyizhi.cn/producter/php/frontend/web/index.php?r=data/default/tiaozhuan', {
      key:key
    },successCB,failCB,keys,2000);
  }
}

function sendPayTemplate(touser,template_id,page,form_id,data,color,emphasis_keyword,successCB,failCB){
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/hongbao/sendpaytemplate', {
    touser:touser,
    template_id:template_id,
    page:page,
    form_id:form_id,
    data:data,
    color:color,
    emphasis_keyword:emphasis_keyword
  },successCB,failCB);
}

function woshishui(data,select,successCB,failCB){
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/woshishui', {
    data:data,
    select:select
  },successCB,failCB);
}

function cover(url,successCB){
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/cover', {
    url:url
  },successCB);
}

function tousu(id,type,successCB){
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/hongbao/tousu', {
    id:id,
    type:type
  },successCB);
}
function zanshare(id,successCB){
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/share/zanshare', {
    id:id
  },successCB);
}

function saveformids(formids,successCB){
  system.myRequest('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/saveformids', {
    formids:formids
  },successCB);
}

function getIcons(successCB){
  var key = 'cache_avatar_icons';
  if(wc.get(key)){
    successCB(wc.get(key));
  }else{
    system.myRequest('https://data.maiyizhi.cn/producter/php/frontend/web/index.php?r=data/default/avataricons', {}, successCB,null,key,7200);
  }
}

function zhuangxgif(apiurl,gifData,successCB) {
  system.myRequest(apiurl,gifData,successCB);
}

function login(sucess,fail,title){
  var that= this
  var app = getApp()
  console.log(app)
  if(!title){
    title = '授权登录失败，部分功能将不能使用，是否重新登录？'
  }
  var user = app.globalData.user;
  if(utils.isEmptyObject(user)){
    wx.login({
      success: function (code) {
        var code = code.code;
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            var rawData = encodeURIComponent(res.rawData);
            var signature = res.signature || '';
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            that.getLoginApi(code, rawData, signature, encryptedData, iv, function (info) {
              var _user={'openid':info.user_id,'user_name':info.user_name,'avatar':info.user_avatar,'unionid':info.unionid};
              wx.setStorageSync("user",_user)
              app.globalData.user = _user
              sucess(_user)
            })
          },
          fail: function (res) {
            wx.showModal({
              title: '提示',
              content: title,
              showCancel: true,
              cancelText: "否",
              confirmText: "是",
              success: function (info) {
                if (info.confirm) {
                  if (wx.openSetting) {
                    wx.openSetting({
                      success: (res) => {
                        if (res.authSetting["scope.userInfo"]) {
                          wx.getUserInfo({
                            success: function (res) {
                              console.log(res)
                              var rawData = encodeURIComponent(res.rawData);
                              var signature = res.signature || '';
                              var encryptedData = res.encryptedData;
                              var iv = res.iv;
                              that.getLoginApi(code, rawData, signature, encryptedData, iv, function (info) {
                                console.log(res)
                                var _user={'openid':info.user_id,'user_name':info.user_name,'avatar':info.user_avatar,'unionid':info.unionid};
                                wx.setStorageSync("user",_user)
                                app.globalData.user = _user
                                sucess(_user)
                              })
                            }
                          })
                        } else {
                          fail()
                        }
                      },
                      fail: function () {
                        fail()
                      }
                    })
                  } else {
                    fail()
                  }
                }else{
                  fail()
                }
              }
            })
          }
        })
      },
      fail: function (res) {
        fail()
      }
    })
  }else{
    sucess(user)
  }
}

function sticker(originalUrl, modelType, successCB, failCB) {
  system.myRequest('https://'+utils.randdomDomain()+'.maiyizhi.cn/producter/php/frontend/web/index.php?r=TencentAI/default/sticker',
    {
      imgUrl: originalUrl,
      type: modelType,
    }, successCB, failCB);
}
function decoration(originalUrl, modelType, successCB, failCB) {
  system.myRequest('https://'+utils.randdomDomain()+'.maiyizhi.cn/producter/php/frontend/web/index.php?r=TencentAI/default/decoration',
    {
      imgUrl: originalUrl,
      type: modelType,
    }, successCB, failCB);
}
function cosmetic(originalUrl, modelType, successCB, failCB) {
  system.myRequest('https://'+utils.randdomDomain()+'.maiyizhi.cn/producter/php/frontend/web/index.php?r=TencentAI/default/cosmetic',
    {
      imgUrl: originalUrl,
      type: modelType,
    }, successCB, failCB);
}
function peopleFilter(originalUrl, modelType,type, successCB, failCB) {
  system.myRequest('https://'+utils.randdomDomain()+'.maiyizhi.cn/producter/php/frontend/web/index.php?r=TencentAI/default/imgfilter',
    {
      imgUrl: originalUrl,
      type: modelType,
      model: type,
    }, successCB, failCB);
}
function flower(originalUrl, modelType, successCB, failCB) {
  
  system.myRequest('https://' + utils.randdomDomain() +'.maiyizhi.cn/producter/php/frontend/web/index.php?r=distinguishPic/default/response',
    {
      path: originalUrl,
    }, successCB, failCB);
}
function pet(originalUrl, modelType,successCB, failCB) {
  system.myRequest('https://' + utils.randdomDomain() +'.maiyizhi.cn/producter/php/frontend/web/index.php?r=distinguishPic/default/response',
    {
      path: originalUrl,
    }, successCB, failCB);
}

function baipishulist(cat,page,search, successCB,failCB) {
  var key = 'cache_baipishulist_cat_'+cat;
  if(wc.get(key) && !search && page==1){
    successCB(wc.get(key));
  }else{
    system.myRequest('https://api.maiyizhi.cn/index.php?r=api/baipishu/baipishulist',
      {
        cat: cat,
        page: page,
        search:search
      },successCB,failCB,(!search && page==1?key:''),600);
  }
}
function baipishuInfo(id, successCB,failCB) {
  var key = 'cache_baipishuinfo_'+id;
  if(wc.get(key)){
    successCB(wc.get(key));
  }else{
    system.myRequest('https://api.maiyizhi.cn/index.php?r=api/baipishu/baipishusinfo',
      {
        id: id,
      },successCB,failCB,key,1200);
  }
}

module.exports = {
  wuser:wuser,
  getStaticApi:getStaticApi,
  template:template,
  woshishui:woshishui,
  getUrl:getUrl,
  tousu:tousu,
  getQiniuTokenApi: getQiniuTokenApi,
  random:random,
  sendPayTemplate:sendPayTemplate,
  getPayParamsApi:getPayParamsApi,
  getLoginApi:getLoginApi,
  newHongbaoitem:newHongbaoitem,
  Hongbaoiteminfo:Hongbaoiteminfo,
  init:init,
  tiaozhuan:tiaozhuan,
  Newduser:Newduser,
  login:login,
  tixian:tixian,
  mingxi:mingxi,
  sharelist:sharelist,
  zanshare:zanshare,
  newSharelist:newSharelist,
  getUser:getUser,
  xiezi:xiezi,
  profile:profile,
  ScreenshotDeal:ScreenshotDeal,
  getQiniuAvatar:getQiniuAvatar,
  cover:cover,
  zhuangxlist:zhuangxlist,
  zhuangxinfo:zhuangxinfo,
  zhuangxadd:zhuangxadd,
  bianLian:bianLian,
  saveformids:saveformids,
  zhuangxgif:zhuangxgif,
  pay:pay,
  templatePay:templatePay,
  sticker:sticker,
  getIcons:getIcons,
  decoration:decoration,
  cosmetic:cosmetic,
  peopleFilter:peopleFilter,
  flower:flower,
  pet:pet,
  baipishulist:baipishulist,
  baipishuInfo:baipishuInfo,
}
