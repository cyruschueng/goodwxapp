// pages/group/group.js
import { AppBase } from "../../app/AppBase";
import { GroupApi } from "../../apis/group.api.js";
import { PostApi } from "../../apis/post.api.js";
import { NoticeApi } from "../../apis/notice.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=1;
    super.onLoad(options);
    this.Base.setMyData({list:[],latestnotice:{id:"0"}});
    var that=this;
    var noticeapi=new NoticeApi();
    noticeapi.latestnotice({ group_id: this.Base.options.id},function(data){
      if(data.id==undefined){
        data.id=0;
      }
      that.Base.setMyData({ latestnotice: data });
    });
  }

  onShow() {
    var that = this;
    super.onShow();
    var groupapi=new GroupApi();
    groupapi.detail({id:this.Base.options.id},data=>{
      var memberpeoples=[];
      for(var i=0;i<data.members.length&&i<9;i++){
        memberpeoples.push(data.members[i]);
      }
      that.Base.setMyData({ info: data, memberpeoples: memberpeoples});
    });
    var postApi = new PostApi();
    var data=this.Base.getMyData();
    var json={
      group_id: this.Base.options.id,
      update_lasttime:data.newgettime,
      gettype:"new"
    };
    if (data.newgettime==undefined){
      console.log("no newgettime");
      json.update_lasttime = "";
      json.gettype = "";
    }
    
    postApi.list(json,
      data => {
        for (var i = 0; i < data.length; i++) {
          data[i]["updated_date_split"] = AppBase.Util.Datetime2(Number(data[i]["updated_date_span"]));

          data[i]["updated_date_span"] = AppBase.Util.Datetime_str(Number(data[i]["updated_date_span"]));
        }
        var list = that.Base.getMyData().list;
        for(var i=0;i<list.length;i++){
          data.push(list[i]);
        }
        if(data.length>0){
          that.Base.setMyData({ list: data,  newgettime: data[0].updated_date,lastgettime:data[data.length-1].updated_date });
        }
      });
  }

  gotoAlbum(){
    wx.navigateTo({
      url: '/pages/album/album?id='+this.Base.options.id,
    })
  }
  deletePost(e){
    var that=this;
    var id=e.currentTarget.id;
    var postApi = new PostApi();
    postApi.adelete({ idlist:id},
      data => {
        var data=[];
        var list = that.Base.getMyData().list;
        for (var i = 0; i < list.length; i++) {
          if(list[i].id!=id){
            data.push(list[i]);
          }
        } 
        that.Base.setMyData({ list: data });
      });
  }
  onPullDownRefresh(){
    var that = this;
    super.onShow();
   
    var postApi = new PostApi();
    var data = this.Base.getMyData();
    var json = {
      group_id: this.Base.options.id,
      update_lasttime: data.newgettime,
      gettype: "new"
    };

    postApi.list(json,
      data => {
        for (var i = 0; i < data.length; i++) {
          data[i]["updated_date_split"] = AppBase.Util.Datetime2(Number(data[i]["updated_date_span"]));
          data[i]["updated_date_span"] = AppBase.Util.Datetime_str(Number(data[i]["updated_date_span"]));
        }
        var list = that.Base.getMyData().list;
        for (var i = 0; i < list.length; i++) {
          data.push(list[i]);
        }
        if (data.length > 0) {
          that.Base.setMyData({ list: data,  newgettime: data[0].updated_date, lastgettime: data[data.length - 1].updated_date });
        }
      });
  }
  onReachBottom() {
    var that = this;
    super.onShow();

    var postApi = new PostApi();
    var data = this.Base.getMyData();
    console.log("nomoshow"+data.lastgettime);
    var json = {
      group_id: this.Base.options.id,
      update_lasttime: data.lastgettime,
      gettype: "last"
    };

    postApi.list(json,
      data => {
        if(data.length==0){
          wx.showToast({
            title: '已经是最后了',
          })
        }
        var list = that.Base.getMyData().list;
        for (var i = 0; i < data.length; i++) {
          data[i]["updated_date_split"] = AppBase.Util.Datetime2(Number(data[i]["updated_date_span"]));
          data[i]["updated_date_span"] = AppBase.Util.Datetime_str(Number(data[i]["updated_date_span"]));
          list.push(data[i]);
        }
        if (data.length > 0) {
          that.Base.setMyData({ list: list, newgettime: list[0].updated_date, lastgettime: list[list.length - 1].updated_date });
        }
      });
  }
  likePost(e) {
    var that = this;
    var id=e.currentTarget.id;
    var postApi = new PostApi();
    postApi.like({post_id:id},ret=>{
      if(ret.code==0){
        var list=that.Base.getMyData().list;
        for(var i=0;i<list.length;i++){
          if(id==list[i].id){
            list[i].like=ret.return;
            break;
          }
        }
        that.Base.setMyData({list:list});
      }
    });
  }

  gotoVote() {
    wx.navigateTo({
      url: '/pages/vote/vote?group_id=' + this.Base.options.id,
    });
  }
  gotoVoteList() {
    wx.navigateTo({
      url: '/pages/votelist/votelist?group_id=' + this.Base.options.id,
    });
  }
  gotoNotify() {
    wx.navigateTo({
      url: '/pages/notify/notify?group_id=' + this.Base.options.id,
    });
  }
  gotoNotifyList() {
    wx.navigateTo({
      url: '/pages/notifylist/notifylist?group_id=' + this.Base.options.id,
    });
  }
  gotoMap() {
    wx.navigateTo({
      url: '/pages/map/map?group_id=' + this.Base.options.id,
    });
  }
  gotoMgr(){
    wx.navigateTo({
      url: '/pages/groupmgr/groupmgr?id=' + this.Base.options.id,
    });
  }
  openbgselect(){
    this.Base.setMyData({ bgselect:true});
  }
  closebgselect() {
    this.Base.setMyData({ bgselect: false });
  }
}
var page = new Content();
var body = page.generateBodyJson();
body.onLoad = page.onLoad; 
body.onShow = page.onShow; 
body.gotoAlbum = page.gotoAlbum;
body.deletePost = page.deletePost;
body.onPullDownRefresh = page.onPullDownRefresh;
body.onReachBottom = page.onReachBottom;
body.likePost = page.likePost; 
body.gotoVote = page.gotoVote; 
body.gotoNotifyList = page.gotoNotifyList;
body.gotoNotify = page.gotoNotify; 
body.gotoVote = page.gotoVote;
body.gotoVoteList = page.gotoVoteList; 
body.gotoMap = page.gotoMap; 
body.gotoMgr = page.gotoMgr;
body.openbgselect = page.openbgselect;
body.closebgselect = page.closebgselect;

Page(body)