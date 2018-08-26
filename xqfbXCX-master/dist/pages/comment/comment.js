// pages/comment/comment.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';
import { Base64 } from '../../utils/urlsafe-base64'
import moment from '../../utils/npm/moment';
import * as uploadCommentImg from '../../services/wx-upload-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    uploadImgUrls:[],
    uploadImgNums: 0,
    uploadImgBtnHidden: false,

    titleTime: '',
    // 评分星星
    scoringItems: [
      {
        itemId: 0,
        title: '诚实守信',
        icons: ['', '', '', '', ''],
        score: 0
      },
      {
        itemId: 1,
        title: '职业形象',
        icons: ['', '', '', '', ''],
        score: 0
      },
      {
        itemId: 2,
        title: '业务技能',
        icons: ['', '', '', '', ''],
        score: 0
      },
      {
        itemId: 3,
        title: '服务态度',
        icons: ['', '', '', '', ''],
        score: 0
      },
      {
        itemId: 4,
        title: '宾客反响',
        icons: ['', '', '', '', ''],
        score: 0
      }
    ],
    commentText: '',

    commentEditList: []
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var res = wx.getSystemInfoSync()

    let commentqs = Base64.decode(options.comment)
    let commentqsObj = JSON.parse(commentqs)
    console.log('***onLoad... ' + JSON.stringify(commentqsObj))

    this.setData({
      orderid: commentqsObj.id,
      windowWidth: res.windowWidth,
      commentlist: commentqsObj,
      commentEditList: hoteldata.formatCommentEditList(commentqsObj.hall, commentqsObj.combo, commentqsObj.celebration, commentqsObj.talent),
      titleTime: moment(commentqsObj.reservedDate).format('YYYY-MM-DD')
    })

    console.log('commentlist .. ' + JSON.stringify(this.data.commentEditList))



  },

  bindUploadImgTap (e) {

    var comtid = e.currentTarget.dataset.comtid;
    var commentEditList = this.data.commentEditList;
    var comts = commentEditList[comtid];

    var uploadImgUrls = comts.uploadImgUrls;
    var uploadImgNums = comts.uploadImgNums;
    var uploadImgBtnHidden = comts.uploadImgBtnHidden;

    console.log('comts= ' + JSON.stringify(comts));

    var me = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // console.log(res.tempFilePaths);

        comts.uploadImgNums = comts.uploadImgNums + res.tempFilePaths.length;
        comts.uploadImgUrls = comts.uploadImgUrls.concat(res.tempFilePaths);
        if (comts.uploadImgNums >= 4) {
          comts.uploadImgViewHeight = ((me.data.windowWidth * 0.225) * ((comts.uploadImgNums / 4)+1)) + 10;
          console.log(comts.uploadImgNums / 4);

        } else {
          comts.uploadImgViewHeight = (me.data.windowWidth * 0.225) ;
        }
        
        console.log(comts.uploadImgViewHeight);

        if (uploadImgNums >= 9) {
          comts.uploadImgBtnHidden = true;
        }
        me.setData({
          commentEditList: commentEditList,
        });
        console.log(comts.uploadImgUrls);

      }
    })

    
  },
  bindCellStarIconTap (e) {
    var comtid = e.currentTarget.dataset.comtid;
    var talentid = e.currentTarget.dataset.talentid;
    var index = e.currentTarget.dataset.index;

    // console.log('comtid = ' + comtid);
    // console.log('talentid = ' + talentid);
    // console.log('index = ' + index);

    var commentEditList = this.data.commentEditList;
    if (talentid != null) {
      commentEditList[comtid].talentlist[talentid].icons = this.changeStartIcons(commentEditList[comtid].talentlist[talentid].icons, index);
      commentEditList[comtid].talentlist[talentid].score = 5 - index;
    } else {
      commentEditList[comtid].icons = this.changeStartIcons(commentEditList[comtid].icons, index);
      commentEditList[comtid].score = 5 - index;
    }

    this.setData({
      commentEditList: commentEditList
    })

    console.log('commentEditList ... ' + JSON.stringify(commentEditList));

  },
  bindStarIconTap(e) {

    var itemId = e.currentTarget.dataset.itemid;
    var index = e.currentTarget.id;

    var scoringItems = this.data.scoringItems;
    scoringItems[itemId].icons = this.changeStartIcons(scoringItems[itemId].icons, index);
    scoringItems[itemId].score = 5 - index;
    
    this.setData({
      scoringItems: scoringItems
    })

  },
  changeStartIcons(icons, index) {
    var startRed = 'choosed';
    var start = '';
    var score = 0;
    icons.forEach((arc, i) => {
      if (i >= index) {
        icons[i] = startRed;
        score = 5-index;
      } else {
        icons[i] = start;
      }
    })
    return icons;
  },

  bindTextInput(e) {
    console.log(e.detail.value)
    this.setData({
      commentText: e.detail.value
    })

    var comtid = e.currentTarget.dataset.comtid;
    var commentEditList = this.data.commentEditList;
    commentEditList[comtid].commentText = e.detail.value;

    this.setData({
      commentEditList: commentEditList
    })

  },
  bindCommitBtnTap () {

    var text = this.data.commentText;
    var imgs = this.data.uploadImgUrls;
    var oneScore = this.data.scoringItems[0].score;
    var twoScore = this.data.scoringItems[1].score;
    var threeScore = this.data.scoringItems[2].score;
    var fourScore = this.data.scoringItems[3].score;

    console.log('text = ' + text);
    console.log('imgs = ' + JSON.stringify(imgs));
    console.log('oneScore = ' + oneScore);
    console.log('twoScore = ' + twoScore);
    console.log('threeScore = ' + threeScore);
    console.log('fourScore = ' + fourScore);

    if (!this.getIsCommentText()) {
      wx.showModal({
        title: '',
        content: '您忍心留下空白吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      // 数据处理
      this.getCommentData()

    }

    // 数据处理
    // this.getCommentData()

  },
  // 判断是否 全部填写文字 是否全部打分
  getIsCommentText(){
    var commentEditList = this.data.commentEditList;
    var scoringItems = this.data.scoringItems;
    var istext = true;
    for (var i = 0; i < commentEditList.length; i++) {
      if (commentEditList[i].commentText == '') {
        istext = false
      }
      if (commentEditList[i].score == 0 && commentEditList[i].title != '婚礼人才') {
        istext = false
      }
      if (commentEditList[i].title == '婚礼人才') {
        for (var k = 0; k < commentEditList[i].talentlist.length; k++) { 
          if (commentEditList[i].talentlist[k].score == 0) {
            istext = false
          }
        }
      }
    }
    for (var j = 0; j < scoringItems.length; j++) {
      if (scoringItems[j].score == 0) {
        istext = false
      }
    }
    return istext;
  },
  getCommentData () {
    
    console.log('comment = ' + JSON.stringify(this.data.commentEditList));
    console.log('scoringItems = ' + JSON.stringify(this.data.scoringItems));

    var orderId = this.data.orderid;
    var openId = wx.getStorageSync('openid').val;
    var nickName = wx.getStorageSync('userinfo').nickName;
    var headImg = wx.getStorageSync('userinfo').avatarUrl;

    var coments = hoteldata.formatUploadComment(this.data.commentEditList, orderId, openId, nickName, this.data.scoringItems, headImg);

    console.log('coments .. ' + JSON.stringify(coments));

    HotelDataService.uploadComment(coments).then((result) => {
      // console.log("success = " + JSON.stringify(result.hotel));
      console.log("uploadComment success...");

      // 回退
      wx.showToast({
        title: '评论成功！',
        icon: 'success',
        duration: 2000,
        success: function (res) {
          // wx.navigateBack({
          //   delta: 1
          // })
          wx.switchTab({
            url: '../hotel/hotel',
          })
        }
      })

    }).catch((error) => {
      console.log(error);
    })
    

    //循环 上传图片
    // this.data.commentEditList.forEach((comts,i) => {

    //   if (comts.uploadImgUrls.length > 0) {
        
        // HotelDataService.uploadCommentImg(comts.uploadImgUrls).then((result) => {
          
        //   console.log("uploadImgUrls success = " + JSON.stringify(result));

        // }).catch((error) => {
        //   console.log(error);
        // })

        // this.wxUploadP({ path: comts.uploadImgUrls }, i);
        
        // console.log('imgurl = ' + imgurl);

      // }

    // })
    

    

  },

  wxUploadP(data,comindex) {
    var that = this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
    var newUrls = '';

    var commentEditList = this.data.commentEditList;

    wx.uploadFile({
      url: 'http://192.168.1.18:9003/picture/upload',
      filePath: data.path[i],
      name: 'uploadFile',//这里根据自己的实际情况改
      formData: null,
      success: (res) => {

        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
        if (+res.statusCode >= 200 && +res.statusCode < 400) {

          success++;
          console.log(i);

          //替换commentEditList图片
          commentEditList[comindex].uploadImgUrls[i] = res.data
          that.setData({
            commentEditList: commentEditList
          })
          
          return res.data
        } else {
          console.log(" failed: " + JSON.stringify(res.data))
          // wx.hideLoading()
          return res.data
        }

      },
      fail: (res) => {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: (res) => {
        console.log(i);
        i++;

        console.log(" complete: " + JSON.stringify(res.data))

        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);

          // return resolve(res.data)
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;

          return that.wxUploadP(data);
        }

      }
    })
  }

})