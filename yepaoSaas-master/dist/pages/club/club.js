// pages/club/club.js

import * as AuthService from '../../services/auth-service';
import * as clubService from '../../services/club-service';
import * as clubdata from '../../utils/clubdata-format';

  /**
   * 页面的初始数据
   */
let pageOptions = {

  data: {
    swiperImgUrls: [],

    clubList: [],
    clubListPageIndex: 1,

    isCertificationMem: false,
    is_modal_Hidden: true,

    loadMoreHidden: true,
    loadMoreRemaindHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow: function (options) {
    this.getCertifiMem();
    if (this.data.isCertificationMem) {
      // 获取 活动列表
      this.getClubList('load');
    }
  },
  onUnload: function (options) {
    this.setData({
      clubList: [],
      clubListPageIndex: 1
    })
  },
  onHide: function (options) {
    this.setData({
      clubList: [],
      clubListPageIndex: 1
    })
  },
  getCertifiMem() {
    if (AuthService.getMemberInfo()) {
      this.setData({
        isCertificationMem: true
      })
      console.log('*已认证会员*');
    } else {
      console.log('*未认证会员*');
    }
  },

  // 上拉触底 加载
  onReachBottom: function (options) {
    console.log('到底啦！！');

    var clubListPageIndex = this.data.clubListPageIndex;
    clubListPageIndex ++;
    this.setData({
      clubListPageIndex: clubListPageIndex,
      loadMoreHidden: false
    })

    if (this.data.isCertificationMem) {
      this.getClubList('noload');
    }
  },

  // 查询推荐活动
  getClubList(noload) {
    clubService.quaryClubList(this.data.clubListPageIndex, 'N', noload).then((result) => {
      this.setData({
        clubList: clubdata.formatClubList(result.result, this.data.clubList),
        swiperImgUrls: result.clubImages
      })
    }).catch((error) => {
      console.log(error);
      this.setData({
        loadMoreHidden: true,
        loadMoreRemaindHidden: false
      })
    })
  },

  bindMemberActivitiesTap(e) {
    if (this.data.isCertificationMem) {
      wx.navigateTo({
        url: 'memberActivities',
      })
    } else {
      this.setData({
        is_modal_Hidden: false
      })
    }
  },
  bindClubDynamicsTap(e) {
    if (this.data.isCertificationMem) {
      wx.navigateTo({
        url: 'clubDynamics',
      })
    } else {
      this.setData({
        is_modal_Hidden: false
      })
    }
  },

  bindClubCellTap(e) {
    if (this.data.isCertificationMem) {
      wx.navigateTo({
        url: 'memberActivitiesDetails?activeId=' + e.currentTarget.id,
      })
    } else {
      this.setData({
        is_modal_Hidden: false
      })
    }
  }
}

Page(pageOptions)