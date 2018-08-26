let { makeImageUrl, hostUrl } = require('../../../../config');
let { NetRequest, showTips } = require('../../../../utils/util');
const app = getApp();
Page({
  data: {
    item: {},
    disabled: false,
    btnText: '生成照片'
  },

  onLoad(params){
    let self = this;
    let { pid = 0 } = params;   //默认为发光的瓶子
    app.getUserInfo(userInfo => {
      app.getSpecialList((err, fnList) => {
        console.log(err);
        if (err) return showTips('获取失败,稍后重试！');
        let item = fnList.filter(item => -item.id === -pid)[0];
        let title = item.title;
        wx.setNavigationBarTitle({ title });  //设置导航标题
        self.setData({ item });
      });
    });
    

  },

  preImg(url) {
    wx.previewImage({
      urls: [url],
    })
  },

  submit(e){
    let self = this;
    let { value } = e.detail;
    let { item } = self.data;
    for(let formName in value){
      value[formName] = value[formName].trim();
      if (!value[formName]) return showTips('请填写文字！');
    }

    self.setData({
      disabled: true,
      btnText: '生成中...'
    });

    let data = { pid: item.id};
    Object.assign(data, value);
    NetRequest({
      url: makeImageUrl,
      data,
      success(res){
        let { statusCode, data } = res;   //data为base64
        //return console.log(res);
        if(-statusCode === -200){
          let imgUrl = hostUrl + data;
          wx.downloadFile({   //图片下载本地后才开始请求
            url: imgUrl,
            success(res){
              console.log(res);
              let tempFilePath = res.tempFilePath;
              wx.navigateTo({
                url: '../../../common/previewimage/index?url=' + tempFilePath
              })
            },
            fail(res){
              //console.log(res);
            },
            complete(){
              self.setData({
                disabled: false,
                btnText: '生成照片'
              });
            }
          });
          
        }else{
          self.setData({
            disabled: false,
            btnText: '生成照片'
          });
          wx.showToast({
            title: '生成失败,稍后重试',
          });
        }
      },
      fail(err){
        self.setData({
          disabled: false,
          btnText: '生成照片'
        });
        wx.showToast({
          title: '生成失败,稍后重试   ',
        });
      }
    });

  },

  onShareAppMessage() {
    return {
      title: '一起制作炫酷文字吧'
    }
  }

})