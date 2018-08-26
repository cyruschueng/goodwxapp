var api = require('../../api.js')
var util = require('../../utils/util.js')
var Zan = require('../../zanui/index');
var app = getApp()

Page(Object.assign({}, Zan.Toast, {
    data: {
        select:'a',
        data: [{
            zuo: '',
            you: ''
        }],

        lb: [
          "cur",
          "r1",
          "r2",
          "l1",
          "l2"
        ],
        clubs:[
          {
            target: {url: 'a'}
          },
          {
            target: {url: 'b'}
          },
          {
            target: {url: 'c'}
          },
          {
            target: {url: 'd'}
          },
          {
            target: {url: 'e'}
          }
        ],
        index: true
    },
    onShow: function () {
        var _data = wx.getStorageSync('woshishui');
        // var _select = wx.getStorageSync('woshishui_select');
        if(_data){
            this.setData({
                data:_data
            })
        }
        // if(_select){
        //     this.setData({
        //         select:_select
        //     })
        // }
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
    scrollLeft: function () {
      var that = this;
      var clubs = this.data.clubs;
      util.lunScrollLeft(clubs , that);
    },
    scrollRight: function () {
      var that = this;
      var clubs = this.data.clubs;
      util.lunScrollRight(clubs , that);
    },

    // select:function(e){
    //   console.log("select",e);
    //     this.setData({
    //         select:e.currentTarget.id
    //     })
    //     wx.setStorageSync('woshishui_select', e.currentTarget.id);
    // },

    onShareAppMessage: function () {
        return {
            title: '一键生成我们是谁',
            path: "/pages/woshishui/woshishui"
        }
    },
    addLine: function () {
        this.setData({
            data: this.data.data.concat({
                zuo: '',
                you: ''
            })
        })
    },
    bindInput: function (e) {
        console.log(e)
        var id = e.target.id;
        var value = e.detail.value;
        this.data.data[id][e.target.dataset.idx] = value;
        wx.setStorageSync('woshishui', this.data.data);
    },
    deleteLine: function (e) {
        var index = e.target.dataset.lineindex;
        var newdata = this.data.data;
        newdata.splice(index, 1);
        this.setData({
            data: newdata
        });
        wx.setStorageSync('woshishui', this.data.data);
    },
    formSubmit:function (e) {
        var dataSet = e.detail.value;
        var that = this;
        var arr = [];
        var error = false
        this.data.data.forEach(function (element, index, array) {
            console.log(element)
            if (element.zuo&&element.you) {
                if(element.zuo.length>16||element.you.length>16){
                    error = true;
                    that.showZanToast('文字内容最多16个字哦');
                    return;
                }else{
                    arr.push([element.zuo,element.you])
                }
            }else if(!element.zuo&&!element.you){
             /* error = true;
              that.showZanToast('左右边的文字内容都要填哦');
              return;*/
            }else{
                error = true;
                that.showZanToast('左右边的文字内容都要填哦');
                return;
            }
        });
        console.log(arr)
        if(!error){
            wx.showNavigationBarLoading()
            wx.showToast({
                title: 'Loading……',
                duration:2000,
                icon: 'loading'
            })
            api.woshishui(encodeURIComponent(JSON.stringify(arr)),that.data.select,function (res) {
                wx.hideToast()
                wx.hideNavigationBarLoading();
                console.log(res)

              var tips_name='has_show_woshishui_tip'
              //util.showPreviewTip(tips_name,'长按图片来保存哦',res.url)
              util.downloadAndPreview(res.url, '一键生成我们是谁',"/pages/woshishui/woshishui",'生成中...')
            },function () {
                wx.hideToast()
                wx.hideNavigationBarLoading();
                that.showZanToast('生成失败 请稍后再试！');
                return;
            })
        }
        //util.previewSingalPic('http://www.maiyizhi.cn/index.php?r=common/temp/yy&data='+encodeURIComponent(JSON.stringify(arr)));
    },
    onReady: function () {
    }
}));
