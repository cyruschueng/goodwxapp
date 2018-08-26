// pages/home/home.js

import * as AuthService from '../../services/auth-service';
import * as messageService from '../../services/message-service';

  /**
   * 页面的初始数据
   */
let pageOptions = {

  data: {
    isCertificationMem: false,
    is_modal_Hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.getCertifiMem()) {
      // 检查是否有新消息，有则在消息底部显示红点
      this.getClubNewMessage();
    }
  },
  getCertifiMem() {
    if (AuthService.getMemberInfo()) {
      this.setData({
        isCertificationMem: true
      })
      console.log('*已认证会员*');
      return true;
    } else {
      console.log('*未认证会员*');
      return false;
    }
  },
  bindNavigatorTap(e) {
    if (this.getCertifiMem()) {
      wx.navigateTo({
        url: e.currentTarget.id,
      })
    } else {
      this.setData({
        is_modal_Hidden: false
      })
    }
  },
  getClubNewMessage() {

    messageService.quaryMessage('noload').then((result) => {

      result.result.forEach(item => {
        if (item.totalNum > 0) {
          wx.showTabBarRedDot({
            index: 2
          })
        }
      })

    }).catch((error) => {
      console.log(error);
    })

  }

}

Page(pageOptions)