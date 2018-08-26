const { imgDirUrl, getMatchListUrl, hostUrl } = require('../../../../../../config');
const { NetRequest, showTips } = require('../../../../../../utils/util.js');
const LoadList = require('../../../../../../utils/loadlist');
const resList = new LoadList(getMatchListUrl, 'matchList');
Page({
  data: {
    hasMore: resList.hasMore,
    isLoading: resList.isLoading,
    hostUrl,
    matchList: []
  },

  onLoad(){
    resList.init(null)
  },


  onPullDownRefresh() {
    resList.onPullDownRefresh();
  },

  onReachBottom() {
    resList.onReachBottom();
  }
})