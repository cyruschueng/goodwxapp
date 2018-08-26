// pages/notify/notify.js
import { AppBase } from "../../app/AppBase";
import { PostApi } from "../../apis/post.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    //options.group_id=1;
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({ group_id: options.group_id });

    var that=this;

  }

  onShow() {
    var that = this;
    super.onShow();

    var postApi = new PostApi();
    var data = this.Base.getMyData();
    var json = {
      group_id: this.Base.options.group_id,
      operation: "N"
    };
    postApi.list(json, (list) => {
      that.Base.setMyData({ list: list });
    });
  }

  sendNotice(e) {

    wx.navigateTo({
      url: '/pages/notice/notice?group_id=' + this.Base.options.group_id,
    })
  }

  deletePost(e) {
    var that = this;
    var id = e.currentTarget.id;
    var postApi = new PostApi();
    postApi.adelete({ idlist: id },
      data => {
        var data = [];
        var list = that.Base.getMyData().list;
        for (var i = 0; i < list.length; i++) {
          if (list[i].id != id) {
            data.push(list[i]);
          }
        }
        that.Base.setMyData({ list: data });
      });
  }

  gotoNotify() {
    wx.navigateTo({
      url: '/pages/notify/notify?group_id=' + this.Base.options.group_id,
    });
  }
}
var page = new Content();
var body = page.generateBodyJson();
body.onLoad = page.onLoad;
body.onShow = page.onShow; 
body.sendNotice = page.sendNotice;
body.deletePost = page.deletePost; 
body.gotoNotify = page.gotoNotify;
Page(body)