// pages/index2/index2.js
const app = getApp()
const api = require('../../api.js');
const util = require('../../utils/util.js');
const upload = require('../../utils/upload.js');
var data = require('../../utils/data.js');
// const config = require('../../utils/config.js').config;
const {extend,Tab} = require('../../zanui-weapp/dist/index');
Page(extend({}, Tab, {



   
    /**
     * 页面的初始数据
     */
    data: {
        fontSize: '44.8418',
        imageUrl: '../statics/bizhi_0.jpg',
        imgIndex: 0,
        tapImage: "../../styles/hair/dongwu/dongwu_1.png",
        textShow: true,
        lockShow: '',
        scrollHeight: '100vh',
        buttonShow: true,
        isSure: false,
        /*false*/
        datas: [],
        hairImage: [],
        trueIndex: 0,
        buttonName: '换发型',
        image: '../statics/bizhi_0.jpg',
        coverSwitchStart: 0,
        coverSwitchEnd: 0,
        changeHair: false,
        selectedId:'dongwu',
        current:{
            selectedId:'dongwu',
            index:0,
        },
        tab1: {
            list: [{
                    id: 'bodian',
                    title: '波点'
                },
                {
                    id: 'dongwu',
                    title: '动物'
                },
                {
                    id: 'faxing',
                    title: '发型'
                },
                {
                    id: 'jieri',
                    title: '节日'
                },
                {
                    id: 'shenghuo',
                    title: '生活'
                },
                {
                    id: 'love',
                    title: 'love'
                },
                {
                    id: 'wenlu',
                    title: '纹路'
                }
            ],
            selectedId: 'dongwu',
            scroll: true,
            height: 1000
        }
    },
  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;

    this.setData({
      [`${componentId}.selectedId`]: selectedId
    });
    this.setData({
        selectedId:selectedId,
      datas: data.data[selectedId],
      hairImage: data.hair[selectedId]
    })
    console.log(this.data.datas[0])
  },
    onShareAppMessage: function() {
        return {
            title: '给你的手机换个发型吧',
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        
        this.setData({
            datas: data.data.dongwu,
            hairImage: data.hair.dongwu
          
        });
      
        if (options.url != undefined) {
            var url = options.url;
            wx.hideToast();
            that.setData({
                // image: `url('${pic.url}?imageView2/1/w/375/h/812')`,
                image: url,
                imageUrl: url,
                textShow: false,
                buttonShow: false
            });
        }
        wx.getSystemInfo({
            success: function(res) {
                // console.log(res);
                // console.log(res.model);
                if (res.model === 'iPhone X') {
                    that.setData({
                        fontSize: '30'
                    })
                } else {
                    that.setData({
                        fontSize: (res.windowHeight - 160) / 1454 * 100
                    })
                }
            }
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },
    //改变系统背景图片
     changeBgImage() {
        var that = this;

        var index = that.data.imgIndex;
        // console.log("imgIndex"+that.data.imgIndex)
        // console.log(index)
         wx.showActionSheet({
            itemList: ['上传图片','随机来一个'],
            success: function(res) {
                if(res.tapIndex==0){
                    that.onTapImage();
                } else if(res.tapIndex ===1){

        if (that.data.imgIndex < 8) {
            index = that.data.imgIndex + 1;
            that.setData({
                imgIndex: index,
            });
            that.setData({

                imageUrl: "../statics/bizhi_" + index + ".jpg",
                image: "../statics/bizhi_" + index + ".jpg"
            })


        } else {
            index = 0;
            that.setData({
                imgIndex: index,
            });
            that.setData({
                imageUrl: "../statics/bizhi_" + index + ".jpg",
                image: "../statics/bizhi_" + index + ".jpg"
            })
        };
                 }
            }
        })

    },
  
  

    confirm() {

        var that = this;

        if (that.data.imageUrl === '') {

        } else
        if (that.data.imageUrl !== '' && that.data.tapImage !== "") {
            wx.navigateTo({
                url: '../image/image?imageUrl=' + that.data.imageUrl + '&tapImage=' + that.data.tapImage,
            });
        } else if (that.data.textShow === false) {
            wx.getSystemInfo({
                success: function(res) {
                    if (res.model === 'iPhone X') {
                        that.setData({
                            fontSize: '40.8418'
                        })
                    }
                }
            });
            that.setData({
                isSure: true,
                // buttonName: '生成图片',
                // scrollHeight: '83vh',
                buttonShow: true
            });
        }
    },

    tapFigure(e) {
        var that = this;
        that.setData({
            tapImage: '',
            buttonShow: false
        });
        console.log
        
        setTimeout(function() {
            var cs ="current.selectedId";
            var ci = "current.index";
            that.setData({
                tapImage: that.data.hairImage[e.currentTarget.dataset.index],
                trueIndex: e.currentTarget.dataset.index,
                [cs]:that.data.selectedId,
                [ci]:e.currentTarget.dataset.index
            });

        }, 200)
    },
    onTapImage() {
        var that = this;
        var width = 0;
        wx.chooseImage({
            count: 1,
            sourceType: ['album', 'camera'],
            success: res => {
                let path = res.tempFilePaths[0];
                wx.redirectTo({
                    url: '/pages/cutInside/cutInside?url=' + path
                })
            }
        })
    },
    showHair() {
        var that = this;
        that.setData({
            changeHair: !that.data.changeHair
        })
    },
    stop() {}
}));