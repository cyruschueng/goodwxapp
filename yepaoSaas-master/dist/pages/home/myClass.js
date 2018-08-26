// pages/home/myClass.js

import * as homedata from '../../utils/homedata-format';
import * as homeService from '../../services/home-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyText: '暂无约课',
    emptyIcon: '../../images/bg_img/no_data.png',

    myclassList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  
    this.getMyClass();
  
  },

  getMyClass() {
    
    homeService.queryMyClass().then((result) => {

      console.log('queryMyClass *** ' + JSON.stringify(result));
      if (result.rs == 'Y') {
        this.setData({
          myclassList: homedata.formatMyClass(result.result)
        })
      }

    }).catch((error) => {
      console.log(error);
    })
  },
  bindClassStatusTap(e) {

    var orderId = e.currentTarget.dataset.orderid;
    var index = e.currentTarget.id;
    var myclassList = this.data.myclassList;

    homeService.uploadCancelMyClass(orderId).then((result) => {

      console.log('uploadCancelMyClass *** ' + JSON.stringify(result));
      if (result.errCode == 0) {
        myclassList[index].classStatus = '已取消';
        this.setData({
          myclassList: myclassList
        })
      } else {
        wx.showModal({
          title: '取消失败',
          content: result.errMsg,
        })
      }

    }).catch((error) => {
      console.log(error);
    })

  }
  
})