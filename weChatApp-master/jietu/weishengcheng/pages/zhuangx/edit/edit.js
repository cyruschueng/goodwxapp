var api = require('../../../api.js')
var util = require('../../../utils/util.js')
var common = require('../../../utils/common.js')
var Zan = require('../../../zanui/index')
var upload = require('../../../utils/upload.js')
import { $wuxDialog } from '../../../wux/wux'
var item={}
var content = []
var contentItem
var app = getApp()
var id
var avatarOrImage
var zitis=['仿宋','黑体','楷体','宋体','微软雅黑']
var tips_name = 'has_show_zhuangx_ad'

Page(Object.assign({}, Zan.Toast, {
  data: {
    pickerIndex:[],
    disabled:true,
    date:[],
    time:[],
    buttonText:'生成图片',
    avatar:[],
    lb: [
      "cur",
      "r1",
      "r2",
      "l1",
      "l2"
    ]
  },
  afterAvatarChoose: function (localPic) {
    var that = this;
    if (avatarOrImage == "avatar") {
      var avatarIndex = that.data.avatarIndex;
    } else if (avatarOrImage == "image") {
      var avatarIndex = that.data.imageindex;
    }
    if (avatarIndex>=0) {
      contentItem[avatarIndex]["value"] = 'http://icons.maiyizhi.cn/uploading.png';
    }
    that.setData({
      contentItem: contentItem
    })

    this.setData({ disabled: true });
    upload.uploadSingleB({path: localPic, state: 1}, function (pic) {
      if(pic){
        if (avatarIndex>=0) {
          contentItem[avatarIndex]["value"] = pic.url;
        }
        that.setData({
          contentItem: contentItem
        })
      }else{
        that.showZanToast('上传失败，请稍后再试呢');
      }
      that.setData({ disabled: false });
    });
  },
  avatarMenu:function(e){
    avatarOrImage = "avatar";
    var avatarIndex = e.currentTarget.dataset.avatarindex;
    this.setData({
      avatarIndex: avatarIndex
    })
    // console.log("avatarIndex",avatarIndex);
    var that  = this;
    wx.showActionSheet({
      itemList: ['选择系统人物', '从相册选择','选择我自己','随机来一个'],
      success: function(res) {
        if(res.tapIndex==1){
          wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            count:1,
            success: function (res) {
              wx.navigateTo({
                url:"../cutInside/cutInside?src="+res.tempFilePaths[0]+"&width="+contentItem[avatarIndex].width+"&height="+contentItem[avatarIndex].height
              })

              /*contentItem[avatarIndex]["value"] = 'http://icons.maiyizhi.cn/uploading.png';
              that.setData({
                contentItem: contentItem
              })
              that.setData({ disabled: true });
              upload.uploadSingleB({path: res.tempFilePaths[0], state: 1}, function (pic) {
                if(pic){
                  contentItem[avatarIndex]["value"] = pic.url;
                  that.setData({
                    contentItem: contentItem
                  })
                }else{
                  that.showZanToast('上传失败，请稍后再试呢');
                }
                that.setData({ disabled: false });
              });*/

            }
          })
        }else if(res.tapIndex==0){
          wx.navigateTo({
            url: "/pages/selectUser/selectUser?from=zhuangx"
          })
        }else if(res.tapIndex==2){
          api.login(function (user) {
            api.getQiniuAvatar(user.avatar,function (res) {
              if (contentItem[avatarIndex+1]&&contentItem[avatarIndex+1].type=="user_name") {
                contentItem[avatarIndex+1]["value"] = user.user_name
              }
              if (contentItem[avatarIndex].width == contentItem[avatarIndex].height) {
                contentItem[avatarIndex]["value"] = res.avatar
              } else {
                wx.navigateTo({
                  url:"../cutInside/cutInside?src="+util.replaceQiniuHttps(res.avatar)+"&width="+contentItem[avatarIndex].width+"&height="+contentItem[avatarIndex].height
                })
              }
              that.setData({
                contentItem: contentItem
              })
            },function () {
              that.showZanToast('头像加载失败，请重新上传哦');
            })
          },function () {

          },'必须授权登录之后才能操作呢，是否重新授权登录？')
        }else if(res.tapIndex==3){
          api.random(function(res) {
            if (contentItem[avatarIndex+1]&&contentItem[avatarIndex+1].type=="user_name") {
              contentItem[avatarIndex+1]["value"] = res.user.name
            }
            if (contentItem[avatarIndex].width == contentItem[avatarIndex].height) {
              contentItem[avatarIndex]["value"] = res.user.avatar
            } else {
              wx.navigateTo({
                url:"../cutInside/cutInside?src="+util.replaceQiniuHttps(res.user.avatar)+"&width="+contentItem[avatarIndex].width+"&height="+contentItem[avatarIndex].height
              })
            }
            that.setData({
              contentItem: contentItem
            })
          });
        }
      },
      fail: function(res) {
      }
    })
  },
  imageMenu:function(e){
    avatarOrImage = "image";
    var imageindex = e.currentTarget.dataset.imageindex;
    this.setData({
      imageindex: imageindex
    })
    var that  = this;

    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count:1,
      success: function (res) {
        wx.navigateTo({
          url:"../cutInside/cutInside?src="+res.tempFilePaths[0]+"&width="+contentItem[imageindex].width+"&height="+contentItem[imageindex].height
        })
        /*contentItem[imageindex]["value"] = 'http://icons.maiyizhi.cn/uploading.png';
        that.setData({
          contentItem: contentItem
        })
        that.setData({ disabled: true });
        upload.uploadSingleB({path: res.tempFilePaths[0], state: 1}, function (pic) {
          if(pic){
            contentItem[imageindex]["value"] = pic.url;
            that.setData({
              contentItem: contentItem
            })
          }else{
            that.showZanToast('上传失败，请稍后再试呢');
          }
          that.setData({ disabled: false });
        });*/
      }
    })
  },
  pickerChange: function(e) {
    console.log(e)
    this.data.pickerIndex[e.target.dataset.name] = e.detail.value
    if (contentItem[e.target.dataset.name].options[e.detail.value].name == "自定义") {
      var selfDefine = true;
    } else {
      var selfDefine = false;
    }
    this.setData({
      selfDefine: selfDefine,
      pickerIndex: this.data.pickerIndex
    })

    var that = this;
    contentItem.forEach(function (element, index, array) {
      if (element.relate) {
        let relate = element.relate;
        let selectIndex;
        let anotherArray = array.filter(function (anotherElement, anotherIndex, anotherArray) {
          if (anotherElement.title==relate) {
            selectIndex = anotherIndex;
            return(anotherElement);
          }
        })

        if (anotherArray[0].type=='select'&&anotherArray[0].options[e.detail.value[selectIndex]]) {
          contentItem[index].value = anotherArray[0].options[e.detail.value[selectIndex]].value?anotherArray[0].options[e.detail.value[selectIndex]].value:anotherArray[0].options[e.detail.value[selectIndex]].name;
          that.setData({
            contentItem: contentItem
          })
        }
      }
    })
  },
  bindDateChange: function(e) {
    this.data.date[e.target.dataset.name] = e.detail.value
    contentItem[e.target.dataset.name].value = e.detail.value
    this.setData({
      date: this.data.date
    })
  },
  inputBlur: function (e) {
    contentItem[e.target.id].value = e.detail.value
  },
  bindTimeChange: function(e) {
    let time = [];
    time[e.target.dataset.name] = e.detail.value
    this.setData({
      time: time
    })
  },
  onShow:function () {
    var zhuangx_clipImageUrl  = wx.getStorageSync('zhuangx_clipImageUrl');
    if(!util.isEmptyObject(zhuangx_clipImageUrl)){
      this.afterAvatarChoose(zhuangx_clipImageUrl)
      wx.removeStorage({
        key: 'zhuangx_clipImageUrl',
        success: function(res) {
        }
      })
    }

    var zhuangx_user  = wx.getStorageSync('zhuangx_user');
    if(!util.isEmptyObject(zhuangx_user)){
      var avatarIndex = this.data.avatarIndex
      if (avatarIndex>=0) {
        if (contentItem[avatarIndex+1]&&contentItem[avatarIndex+1].type=="user_name") {
          contentItem[avatarIndex+1]["value"] = zhuangx_user.user_name
        }
        if (contentItem[avatarIndex].width == contentItem[avatarIndex].height) {
          contentItem[avatarIndex]["value"] = zhuangx_user.avatar
        } else {
          wx.navigateTo({
            url:"../cutInside/cutInside?src="+util.replaceQiniuHttps(zhuangx_user.avatar)+"&width="+contentItem[avatarIndex].width+"&height="+contentItem[avatarIndex].height
          })
        }
        this.setData({
          contentItem: contentItem
        })
      }

      wx.removeStorage({
        key: 'zhuangx_user',
        success: function(res) {
        }
      })
    }
  },
  nofityRedirect:function (e) {
    var res = e.currentTarget.dataset;
    console.log(res)
    wx.setStorageSync(tips_name,1)

    if(res.appid){
      if(wx.navigateToMiniProgram){
        wx.navigateToMiniProgram({
          appId: res.appid,
        })
      }
    }else {
      if (res.istab) {
        wx.switchTab({
          url: res.path
        })
      } else {
        wx.redirectTo({
          url: res.path
        })
      }
    }
  },
  onLoad: function (options) {
    app.globalData.system_info = wx.getSystemInfoSync();
    var that = this;
    if(getCurrentPages().length==1){
      that.setData({
        homeLinkText: '去首页看看'
      })
    }else{
      that.setData({
        homeLinkText: '回到首页'
      })
    }
    //if(getCurrentPages().length==1){
    if(!wx.getStorageSync(tips_name)) {
      api.tiaozhuan('zhuangx_edit', function (res) {
        that.setData({
          notifyImage: res.image,
          notifyText: res.text,
          notifyPath: res.path,
          notifyIstab: res.istab,
          notifyAppid: res.appid
        })
      }, function (re) {
      });
      //}
    }
    if(options.scene){
      id = decodeURIComponent(options.scene);
      api.login(function (_user) {
        that.getData(id);
      },function () {
        that.getData(id);
      },'必须授权登录之后才能操作呢，是否重新授权登录？')
    }else{
      item = wx.getStorageSync('current_zhuangx_template');
      wx.setNavigationBarTitle({
        title: item.name
      });
      this.commonPart();
    }
  },

  getData: function (id) {
    var that = this;
    wx.showNavigationBarLoading();
    wx.showToast({
      title: 'Loading……',
      duration:20000,
      icon: 'loading'
    });
    api.zhuangxinfo(id, function(res) {
      item = res;
      if(item.cat_str&&item.cat_str=='测一测'){
        that.setData({
          buttonText:'测一测'
        })
      }
      wx.setNavigationBarTitle({
        title: res.name
      });
      that.commonPart();
      that.setData({
        disabled: false
      })

      wx.hideNavigationBarLoading();
      wx.hideToast();
    },function(){
      wx.hideNavigationBarLoading();
      wx.hideToast();
      that.showZanToast('数据不存在或者被删除');
      setTimeout(function(){
        wx.navigateTo({
          url: "/pages/zhuangx/list/list?type=1"
        })
      },1500);
    });
  },

  commonPart: function () {
    console.log("item",item);
    var that = this;
    // console.log(item.content)
    if(typeof(item.content)=='string'){
      item.content = JSON.parse(util.decode(util.decode(util.decode(item.content))));
    }
    console.log(item.content);

    content = item.content.slice();
    if (content[0].target) {
      var select = content[0].target.url;
    }

    contentItem = content[0].items;
    if (content[0].title) {
      wx.setNavigationBarTitle({
        title: content[0].title
      });
    }

    if (content.length > 1) {
      if (content.length < 5) {
        if (content.length == 2) {
          content = content.concat(content ,content);
        } else {
          content = content.concat(content);
        }
      }

      var lb = that.data.lb.slice(0, 4);
      for (let i = 0; i < content.length - 5; i++) {
        lb.push("l1");
      }
      lb.push("l2");
    }

    var previewWidth = content[0].preview.width;
    var previewHeight = content[0].preview.height;
    var size = util.getSize(previewWidth,previewHeight,400,app.globalData.system_info)
console.log(size)
    this.getUserInfo();
    id=item.id;

    this.setData({
      content:content,
      contentItem:contentItem,
      size:size,
      lb:lb,
      select:select
    })
  },

  getUserInfo: function () {
    var that = this;
    var need_login=false;
    var nameIndexs = [];
    var avatarIndexs = [];
    //item.preview = JSON.parse(util.decode(util.decode(util.decode(item.preview))));
    //item.target = JSON.parse(util.decode(util.decode(util.decode(item.target))));
    //如果模板里面包含 user_name 或者avatar的 就需要登录
    contentItem.forEach(function (element, index, array) {
      if(element.type=='user_name'){
        if(!element.value){
          need_login = true
          nameIndexs.push(index)
        }
      }

      if (element.type=='avatar') {
        if(!element.value){
          need_login = true
          avatarIndexs.push(index)
        }
      }
    });

    if(need_login){
      api.login(function (user) {
        wx.showNavigationBarLoading();
        api.getQiniuAvatar(user.avatar,function (res) {
          wx.hideNavigationBarLoading();
          for (let i = 0; i < nameIndexs.length; i++) {
            if (nameIndexs[i]>=0) {
              contentItem[nameIndexs[i]]["value"] = user.user_name
            }
          }
          console.log(res.avatar)
          for (let j = 0; j < avatarIndexs.length; j++) {
            if (avatarIndexs[j]>=0) {
              contentItem[avatarIndexs[j]]["value"] = res.avatar
            }
          }
          that.setData({
            contentItem : contentItem
          })

        },function () {
          that.showZanToast('头像加载失败，请重新上传哦');
        })
      },function () {
      },'必须授权登录之后才能操作呢，是否重新授权登录？')
    }
  },
  preview:function (e) {
    console.log(e)
    let formId = e.detail.formId;
    util.dealFormIds(formId);
    util.previewSingalPic(e.target.dataset.src);
  },
  textWatermark:function(element,value){
    var _url='';
    var gravity=element.gravity;
    var _size = element.size;
    if(element.font&&zitis.indexOf(element.font)!=-1){
      _size = _size*20
    }
    var _urlSuffix = '/fill/'+util.urlSafe(util.encode(element.color))+'/fontsize/'+_size+'/gravity/'+gravity+'/dx/'+element.dx+'/dy/';
    if(element.lineLenght){
      var _arr = util.spliteByLength(value,0,element.lineLenght)
      if(element.lineHeight){
        for (var i = 0; i < _arr.length; i++) {
          _url += '/text/'+util.urlSafe(util.encode(_arr[i]))+_urlSuffix+(element.dy+element.lineHeight*i);
          if(element.font){
            _url += '/font/'+util.urlSafe(util.encode(element.font))
          }
        };
      }else{
        _url += '/text/'+util.urlSafe(util.encode(_arr.join('\r\n')))+_urlSuffix+(element.dy);
        if(element.font){
          _url += '/font/'+util.urlSafe(util.encode(element.font))
        }
      }

      return _url;
    }else{
      _url += '/text/'+util.urlSafe(util.encode(value)) +_urlSuffix+element.dy;
      if(element.font){
        _url += '/font/'+util.urlSafe(util.encode(element.font))
      }
      return _url;
    }
  },
  formSubmit:function(e){
    var that = this;
    if(!common.checkPay(item.id,item.price,'开通VIP，才能使用这个功能哦',this,$wuxDialog,function () {
        wx.setStorageSync('pay'+item.id,1);
        api.templatePay('zhuangx',item.id);
        that.submit(e);
      })
    ){
      return;
    }
    that.submit(e);
  },
  submit:function (e) {
    var that = this;
    console.log(item)
    console.log(contentItem)

    let formId = e.detail.formId;
    util.dealFormIds(formId);
    let formIds = app.globalData.gloabalFomIds
    api.saveformids(JSON.stringify(formIds), function () {
      app.globalData.gloabalFomIds = []
    });

    var tips_name='has_show_zhuangx_preview_tip';
    var pic_url = that.data.select+'?watermark/3';
    var loadingStr = '生成中……';
    if(item.cat_str&&item.cat_str=='测一测'){
      loadingStr = '计算中……';
    }
    if (content[0].apiurl) {
      wx.showToast({
        title: loadingStr,
        duration:20000,
        icon: 'loading'
      });
      let gifData = {};
      contentItem.forEach(function (element, index, array) {
        gifData[element.name] =  e.detail.value[index];
      })
      api.zhuangxgif(content[0].apiurl, gifData, function (res) {
        api.zhuangxadd(id, function(res) {});
        util.downloadAndPreview(res.url,item.name,"/pages/zhuangx/edit/edit?scene="+item.id,'生成中...')
        //util.showPreviewTip(tips_name,'长按图片来保存哦',res.url)
        wx.hideToast();
      })
    }else {
      if(content[0].targets){
        var targetsValue = content[0].targets.value;
        var _idx = parseInt(Math.random()*(targetsValue.length),10);
        pic_url = targetsValue[_idx]+'?watermark/3';
        //util.showPreviewTip(tips_name,'长按图片来保存哦',targetsValue[_idx]);
      }
      var error = false;
      console.log("pic_url",pic_url);
      var tasks=[];
      console.log("contentItem",contentItem);
      contentItem.forEach(function (element, index, array) {
        var value='';
        if(element.type=='select'&&element.options[e.detail.value[index]]){
          value = element.options[e.detail.value[index]].value?element.options[e.detail.value[index]].value:element.options[e.detail.value[index]].name;
          value = (value + "").replace(/ /g, "");
        }else if(element.type=='avatar'){
          if (!element.value) {
            value = "";
          } else {
            value = element.value.replace(/ /g, "");
          }
        }else if(element.type=='random'){
          var _idx = parseInt(Math.random()*(element.value.length),10);
          value = element.value[_idx];
          console.log(value)
        }else if (element.relate) {
          let relate = element.relate;
          let selectIndex;
          let anotherArray = array.filter(function (anotherElement, anotherIndex, anotherArray) {
            if (anotherElement.title==relate) {
              selectIndex = anotherIndex;
              return(anotherElement);
            }
          })

          if (anotherArray[0].type=='select'&&anotherArray[0].options[e.detail.value[selectIndex]]) {
            value = (anotherArray[0].options[e.detail.value[selectIndex]].value?anotherArray[0].options[e.detail.value[selectIndex]].value:anotherArray[0].options[e.detail.value[selectIndex]].name) + "";
          } else {
            value = anotherArray[0].value + "";
          }
          value = value.replace(/ /g, "");
        }else{
          console.log(e.detail.value)
          console.log(index)
          value = e.detail.value[index].replace(/ /g, "");
        }
        console.log(value)
        if(!value){
          error = true;
          that.showZanToast(element.title+'必填哦');
          return;
        }else{
          var gravity=element.gravity;
          if(element.type=='select'&&element.options[e.detail.value[index]]){
            value = (element.prefix?element.prefix:'')+(element.options[e.detail.value[index]].value?element.options[e.detail.value[index]].value:element.options[e.detail.value[index]].name)+(element.suffix?element.suffix:'');
          }else if(element.type=='avatar'){
            value = element.value;
          }else if(element.type=='random'){

          }else if (element.relate) {
            let relate = element.relate;
            let selectIndex;
            let anotherArray = array.filter(function (anotherElement, anotherIndex, anotherArray) {
              if (anotherElement.title==relate) {
                selectIndex = anotherIndex;
                return(anotherElement);
              }
            })

            if (anotherArray[0].type=='select'&&anotherArray[0].options[e.detail.value[selectIndex]]) {
              value = anotherArray[0].options[e.detail.value[selectIndex]].value?anotherArray[0].options[e.detail.value[selectIndex]].value:anotherArray[0].options[e.detail.value[selectIndex]].name;
            } else {
              value = anotherArray[0].value;
            }
            value = (element.prefix?element.prefix:'')+value+(element.suffix?element.suffix:'');
          }else{
            value = (element.prefix?element.prefix:'')+e.detail.value[index]+(element.suffix?element.suffix:'');
            console.log(value)
          }
          value = value + "";
          value = value.replace(/ /g, "")
          console.log(value);

          if(element.font&&zitis.indexOf(element.font)!=-1){
            pic_url += that.textWatermark(element,value);
          }else if(element.font){
            tasks.push(
              new Promise(function(resolve) {
                console.log(element)
                api.xiezi(value,element.font,element.size,element.color.replace(/#/, ""),element.lineWidth?element.lineWidth:0,element.lineHeight?element.lineHeight:0,function (res) {
                  resolve('/image/'+util.urlSafe(util.encode(res.preview+(element.rotate?'?imageMogr2/rotate/'+element.rotate:'')))+'/gravity/'+gravity+'/dx/'+element.dx+'/dy/'+element.dy);
                },function () {
                  var _urlSuffix = '/fill/'+util.urlSafe(util.encode(element.color))+'/fontsize/'+element.size*20+'/gravity/'+gravity+'/dx/'+element.dx+'/dy/';
                  resolve('/text/'+util.urlSafe(util.encode(value)) +_urlSuffix+element.dy);
                })
              })
            );
          }else if(element.type=='avatar'||element.type=='image'){
            console.log(util.getThumbnailUrl(element.value,element.width,element.height,element.radiusx?element.radiusx:0,element.radiusy?element.radiusy:0))
            pic_url += '/image/'+util.urlSafe(util.encode(util.getThumbnailUrl(element.value,element.width,element.height,element.radiusx?element.radiusx:0,element.radiusy?element.radiusy:0)))+'/gravity/'+gravity+'/dx/'+element.dx+'/dy/'+element.dy
          }else{
            pic_url += that.textWatermark(element,value);
          }
        }
      });

      if(!error){
        api.zhuangxadd(id, function(res) {});
        if(tasks.length){
          wx.showNavigationBarLoading()
          Promise.all(tasks).then(function (result) {
            result.forEach(function (element, index, array) {
              pic_url+=element;
            });
            wx.hideNavigationBarLoading();
            console.log(pic_url)
            if(item.cat_str&&item.cat_str=='表情'){
              util.showPreviewTip(tips_name,'长按表情发送给朋友哦',pic_url)
            }else{
              util.downloadAndPreview(pic_url,item.name,"/pages/zhuangx/edit/edit?scene="+item.id,loadingStr)
            }
            //util.showPreviewTip(tips_name,'长按图片来保存哦',pic_url)
          });

        }else{
          console.log(pic_url)
          if(item.cat_str&&item.cat_str=='表情'){
            util.showPreviewTip(tips_name,'长按图片来保存哦',pic_url)
          }else{
            util.downloadAndPreview(pic_url,item.name,"/pages/zhuangx/edit/edit?scene="+item.id,loadingStr)
          }
          //util.showPreviewTip(tips_name,'长按图片来保存哦',pic_url)
        }
      }
    }

    wx.removeStorageSync('zhuangx_'+id)
  },

  touchstart: function (e) {
    var that = this;
    util.lunTouchstart(e , that);
  },

  touchmove: function (e) {
    var that = this;
    util.lunTouchmove(e , that);
  },

  touchend: function (e) {
    var that = this;
    util.lunTouchend(e , that);
  },
  scrollLeft: function (e) {
    var that = this;
    if (e.detail) {
      let formId = e.detail.formId;
      util.dealFormIds(formId);
    }
    util.lunScrollLeft(content , that);
    contentItem = this.data.contentItem;
    this.getUserInfo();
  },
  scrollRight: function (e) {
    var that = this;
    if (e.detail) {
      let formId = e.detail.formId;
      util.dealFormIds(formId);
    }
    util.lunScrollRight(content , that);
    contentItem = this.data.contentItem;
    this.getUserInfo();
  }
}));
