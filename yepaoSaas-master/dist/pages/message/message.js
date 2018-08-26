// pages/fitnessCircle/fitnessCircle.js

import * as AuthService from '../../services/auth-service';
import * as messageService from '../../services/message-service';
import * as messagedata from '../../utils/messagedata-format';
import moment from '../../utils/npm/moment';

  /**
   * 页面的初始数据
   */
let pageOptions = {

  data: {
    emptyText: '暂无消息',
    emptyIcon: '../../images/bg_img/no_data.png',

    articleItems: [],

    isCertificationMem: false,
    is_modal_Hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow() {
    this.getCertifiMem();
    if (this.data.isCertificationMem) {
      // 获取消息列表
      this.getMessageList();
    }
  },
  getCertifiMem(that) {
    if (AuthService.getMemberInfo()) {
      this.setData({
        isCertificationMem: true
      })
      console.log('*已认证会员*');
    } else {
      console.log('*未认证会员*');
    }
  },
  getMessageList() {
    messageService.quaryMessage('load').then((result) => {
 
      this.setData({
        articleItems: messagedata.formatMessageList(result.result)
      })

      result.result.forEach(item => {
        if (item.totalNum < 0) {
          wx.hideTabBarRedDot({
            index: 2
          });
        }
      })

    }).catch((error) => {
      console.log(error);
    })
  },

  bindArticleCellTap(e) {

    if (!this.data.isCertificationMem) {
      this.setData({
        is_modal_Hidden: false
      })
    } else {
      wx.navigateTo({
        url: 'messageDetails?mesgtype=' + e.currentTarget.dataset.mesgtype + '&title=' + e.currentTarget.dataset.title,
      })
    }

  }
}

Page(pageOptions)