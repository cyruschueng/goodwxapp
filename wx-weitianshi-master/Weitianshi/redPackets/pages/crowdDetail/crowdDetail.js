var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
let RP = require('../../../utils/model/redPackets.js');
let rp = new RP.redPackets();
Page({
  data: {
    packetlist: app.globalData.picUrl.packetlist,
    packetover: app.globalData.picUrl.packetover,
    imgUrls: app.globalData.picUrl.meifaguo,
  },
  onLoad: function (options) {
    let groupId = options.groupId;
    this.setData({
      groupId: groupId
    })
    app.initPage(this);
    // 群里红包信息
    rp.groupInsideHB.call(this, groupId);
  },
  // 领取红包
  getHB(e) {
    console.log(1)
    let uniqueId = e.currentTarget.dataset.uniqueid;
    let user_id = e.currentTarget.dataset.id;
    let status = e.currentTarget.dataset.status;
    if (status == 0) {
      app.href("/pages/my/sharePage/sharePage?user_id=" + user_id + "&&share_id=" + user_id + "&&unique_id=" + uniqueId + '&&is_redPackets=' + true);
    } else {
      app.href('/redPackets/pages/openedHB/openedHB?unique_id=' + uniqueId);
    }
  },
  // 加载更多
  loadMore(){
    let currentPage = this.data.currentPage;
    let page_end = this.data.page_end;
    let groupId = this.data.groupId;
    if (page_end == true) {
      return app.errorHide(this, '没有更多了');
    }
    currentPage++;
    this.setData({
      currentPage
    })
    rp.groupInsideHB.call(this, groupId, currentPage);
  }
}) 