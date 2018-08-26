// pages/forcopy/forcopy.js
import { AppBase } from "../../app/AppBase";
import { PostApi } from "../../apis/post.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    //options.id=5;
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({ list: [] });
  }
  onShow() {
    var that = this;
    super.onShow(); var postApi = new PostApi();
    var data = this.Base.getMyData();
    var json = {
      operation: this.Base.options.operation,
      update_lasttime: data.newgettime,
      gettype: "new"
    };
    if (data.newgettime == undefined) {
      console.log("no newgettime");
      json.update_lasttime = "";
      json.gettype = "";
    }

    postApi.my(json,
      data => {
        for (var i = 0; i < data.length; i++) {
          data[i]["updated_date_span"] = AppBase.Util.Datetime_str(Number(data[i]["updated_date_span"]));
        }
        var list = that.Base.getMyData().list;
        for (var i = 0; i < list.length; i++) {
          data.push(list[i]);
        }
        if (data.length > 0) {
          that.Base.setMyData({ list: data, newgettime: data[0].updated_date, lastgettime: data[data.length - 1].updated_date });
        }
      });
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
  onPullDownRefresh() {
    var that = this;
    super.onShow();

    var postApi = new PostApi();
    var data = this.Base.getMyData();
    var json = {
      operation: this.Base.options.operation,
      update_lasttime: data.newgettime,
      gettype: "new"
    };

    postApi.list(json,
      data => {
        for (var i = 0; i < data.length; i++) {
          data[i]["updated_date_span"] = AppBase.Util.Datetime_str(Number(data[i]["updated_date_span"]));
        }
        var list = that.Base.getMyData().list;
        for (var i = 0; i < list.length; i++) {
          data.push(list[i]);
        }
        if (data.length > 0) {
          that.Base.setMyData({ list: data, newgettime: data[0].updated_date, lastgettime: data[data.length - 1].updated_date });
        }
      });
  }
  onReachBottom() {
    var that = this;
    super.onShow();

    var postApi = new PostApi();
    var data = this.Base.getMyData();
    console.log("nomoshow" + data.lastgettime);
    var json = {
      operation: this.Base.options.operation,
      update_lasttime: data.lastgettime,
      gettype: "last"
    };

    postApi.list(json,
      data => {
        if (data.length == 0) {
          wx.showToast({
            title: '已经是最后了',
          })
        }
        var list = that.Base.getMyData().list;
        for (var i = 0; i < data.length; i++) {
          data[i]["updated_date_span"] = AppBase.Util.Datetime_str(Number(data[i]["updated_date_span"]));
          list.push(data[i]);
        }
        if (data.length > 0) {
          that.Base.setMyData({ list: list, newgettime: list[0].updated_date, lastgettime: list[list.length - 1].updated_date });
        }
      });
  }
  gotoVote() {
    wx.navigateTo({
      url: '/pages/vote/vote?group_id=' + this.Base.options.id,
    });
  }
  gotoNotify() {
    wx.navigateTo({
      url: '/pages/notify/notify?group_id=' + this.Base.options.id,
    });
  }
  gotoMap() {
    wx.navigateTo({
      url: '/pages/map/map?group_id=' + this.Base.options.id,
    });
  }
}
var page = new Content();
var body = page.generateBodyJson();
body.onLoad = page.onLoad;
body.onShow = page.onShow;
body.deletePost = page.deletePost;
body.onPullDownRefresh = page.onPullDownRefresh;
body.onReachBottom = page.onReachBottom;
body.gotoVote = page.gotoVote;

Page(body)