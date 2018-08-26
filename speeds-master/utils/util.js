import Auth from 'auth';
import API from 'api';

const Util = {}

Util.tapBanner = function(weapp, banner){
    if (weapp.appid) {
        wx.navigateToMiniProgram({
            appId: weapp.appid,
            path: weapp.path,
            envVersion: weapp.version,
            success(res) {
                // 打开成功
                console.log('跳转成功');
            }
        })
    } else if(weapp.mp){
        wx.setClipboardData({
            data: weapp.mp,
            success: function (res) {
                wx.showModal({
                    title: '公众号复制成功',
                    content: '请粘贴微信搜索框查找并关注！',
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm) {
                            // console.log(url)
                        }
                    }
                });
            }
        });
    }else{
        wx.previewImage({
            current: banner,
            urls: [banner]
        })
    }
}

Util.wxacodeActions = function(myself=false){
    let itemList = ['生成我的专属小程序码', '看看我朋友的步数'];
    if(myself){
        itemList = ['查看我的专属小程序码']
    }

    wx.showActionSheet({
        itemList: itemList,
        success: function(res) {
            if(res.tapIndex == 0){
                Util.createWxacode();
            }else if(res.tapIndex == 1){
                Util.createWxacode('navigateTo');
            }
        },
        fail: function(res) {
            console.log(res.errMsg)
        }
    })
}

Util.createWxacode = function(action='previewImage'){
    
    let wxacode = getApp().globalData.wxacode;

    if(API.token() && wxacode){
        if(action=='navigateTo'){
            wx.navigateTo({
                url: '/pages/index/timeline?scene='+Auth.openid()
            });
        }else{
            wx.previewImage({
                current: wxacode,
                urls: [wxacode]
            });
        }
    }else{
        let args    ={};
        Auth.checkSession().then(code=>{
            if(code){
                args.code = code;
            }
            Auth.checkOrGetUserInfo().then(user_res=>{
                if(user_res.iv){
                    args.iv = user_res.iv;
                    args.encrypted_data = user_res.encryptedData;
                }else{
                    args.scene = user_res.openid
                }

                // console.log(args);

                API.createWxacode(args).then(res=>{
                    console.log(res);
                    if(res.user){
                        API.storageUser(res);
                    }

                    getApp().globalData.wxacode = res.wxacode;

                    if(action=='navigateTo'){
                        wx.navigateTo({
                            url: '/pages/index/timeline?scene='+Auth.openid()
                        });
                    }else{
                        wx.previewImage({
                            current: res.wxacode,
                            urls: [res.wxacode]
                        });
                    }
                },err=>{
                    console.log(err);
                });
            },err=>{
                console.log(err);
            });
        }, err=>{
            console.log(err);
        });
    }
}

Util.getGroupPhones = function(args){
    console.log("args", args);

    return new Promise(function(resolve, reject) {
        API.getGroupPhones(args).then(res=>{
            console.log("GroupPhones", res);
            
            if(res.user){
                API.storageUser(res);
            }

            let data = {};

            if(res.share_user){
                data.shareUser  = res.share_user;
            }

            data.phoneList  = res.phones;
            if(res.gid){
                data.gid    = res.gid;
                getApp().globalData.gid = res.gid;
            }

            resolve(data);
        },err=>{
            reject(err);
        });
    })
}

Util.uuid = function(len, radix){

  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;
 
  if (len) {
   // Compact form
   for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
  } else {
   // rfc4122, version 4 form
   var r;
 
   // rfc4122 requires these characters
   uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
   uuid[14] = '4';
 
   // Fill in random data. At i==19 set the high bits of clock sequence as
   // per rfc4122, sec. 4.1.5
   for (i = 0; i < 36; i++) {
    if (!uuid[i]) {
     r = 0 | Math.random()*16;
     uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
    }
   }
  }
 
  return uuid.join('');
}

module.exports = Util