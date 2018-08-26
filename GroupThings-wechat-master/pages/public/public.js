var app = getApp();
const utils = require('../../utils/util');
const basePath = app.globalData.basePath;
const imgPath = app.globalData.imgPath;
Page({
  data:{

  },
  toNewHandle(e){
    utils.toAddHandle(e)
  }
})