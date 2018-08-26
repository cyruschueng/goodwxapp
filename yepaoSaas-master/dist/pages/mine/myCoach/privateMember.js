//privateMember.js
//获取应用实例

import * as minedata from '../../../utils/minedata-format';
import * as mineService from '../../../services/mine-service';

const app = getApp()

Page({
  data: {
    emptyText: '暂无私教会员',
    emptyIcon: '../../../images/bg_img/no_data.png',

    privateMemberList: []
  },
  onLoad: function () {



    
    this.getMyMembers();
    
  },

  // 取数据
  getMyMembers () {

    mineService.queryMyMembers().then((result) => {

      console.log('queryMyMembers *** ' + JSON.stringify(result) );
      if (result.rs == 'Y') {
        this.setData({
          privateMemberList: minedata.formatPrivateMemberList(result.result)
        })
      }

    }).catch((error) => {
      console.log(error);
    })

  },

  bindPrivateMemberTap (e) {
    var id = e.currentTarget.id;

    wx.navigateTo({
      url: 'courseCustom?memid=' + id,
    })

  }

})
