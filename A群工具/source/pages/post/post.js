// pages/post/post.js
import { AppBase } from "../../app/AppBase";
import { PostApi } from "../../apis/post.api.js";
import { WechatApi } from "../../apis/wechat.api";
import { GroupApi } from "../../apis/group.api";
import { VoteApi } from "../../apis/vote.api.js";
import { ApiUtil } from "../../apis/apiutil.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
   // options.id = 223;
    this.Base.Page = this;
    super.onLoad(options);
    var postapi=new PostApi();
    postapi.read({ post_id: this.Base.options.id });
    postapi.view({ post_id: this.Base.options.id });

    this.Base.setMyData({ comment: "", id: options.id });
  }
  onShow() {
    var that = this;
    super.onShow();
    var postapi = new PostApi();
    var id = 0;
    console.log("cc");
    console.log(this.options);
    if (this.options.id!=undefined){
      id=this.options.id;
    }else{
      id = this.Base.options.id;
    }
    postapi.detail({ id: id },data=>{
      data["updated_date_span"] = AppBase.Util.Datetime_str(Number(data["updated_date_span"]));
      if (that.setMyData != undefined) {
        that.setMyData({ info: data });
      } else {
        that.Base.setMyData({ info: data });
      }
    });
    this.Base.loadComment();
  }
  loadComment(){
    var that = this;
    var postApi = new PostApi();
    postApi.commentlist({ post_id: this.options.id }, data => {
      for(var i=0;i<data.length;i++){
        data[i].update_span = ApiUtil.Datetime_str(ApiUtil.StrToDate(data[i].updated_date).getTime()/1000 );
      }
      that.setMyData({ commentlist: data });
    
    });
  }


  onShareAppMessage() {
    var that = this;
    var info=that.Base.getMyData().info;
    return {
      title: info.title,
      path: '/pages/post/post?id=' + info.id,
      success: function (res) {
        // 转发成功

        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        console.log(shareTickets);
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            console.log(res);
            var wechatapi = new WechatApi();
            wechatapi.decrypteddata(res, data => {
              console.log("aa");
              console.log(data);
              if (data.code == 0) {
                var groupapi = new GroupApi();
                groupapi.join({ opengid: data.return.openGId }, data => {
                  groupapi.addpost({ group_id: data.return, post_id:info.id},c=>{
                    wx.redirectTo({
                      url: '/pages/group/group?id=' + data.return,
                    })
                  });
                  //that.Base.onShow();
                });
              }
            });
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        });
      },
      fail: function (res) {
        // 转发失败
      }
    }

  }
  likePost(e) {
    var that = this;
    var id = e.currentTarget.id;
    var postApi = new PostApi();
    postApi.like({ post_id: id }, ret => {
      if (ret.code == 0) {
        var info = that.Base.getMyData().info; 
        info.like = ret.return;
        that.Base.setMyData({ info: info });
      }
    });
  }
  commentChange(e){
    var str=e.detail.value;
    this.Base.setMyData({ comment: str});
  }
  sendComment(){
    var that = this;
    var info = that.Base.getMyData().info;
    var comment = that.Base.getMyData().comment;
    if(comment.trim()==""){
      wx.showToast({
        icon:"none",
        title: '请输入你的评论',
      })
      return;
    }
    var postApi = new PostApi();
    postApi.comment({ post_id: info.id, comment: comment }, ret => {
      if (ret.code == 0) {
        that.Base.setMyData({ comment: ""});
        that.Base.loadComment();
      }
    });
  }
  selectedOption(e){
    var that=this;
    var id = e.currentTarget.id;
    var info = that.Base.getMyData().info;
    if (info.vote_expired_count<0){
      return;
    }
    var voteApi = new VoteApi();
    voteApi.vote({ post_id: info.id, vote_id: id }, ret => {
      if (ret.code == 0) {
        that.Base.onShow();
      }
    });
  }
  gotoGroup(){
    wx.redirectTo({
      url: '/pages/group/group?id=' + this.Base.options.group_id,
    })
  }
  myback(){
    var group_id=this.Base.options.group_id;
    if(group_id!=undefined){
      wx.navigateTo({
        url: '/pages/group/group?id='+group_id,
      });
    }else{
      wx.navigateBack({
        
      })
    }
  }
}
var page = new Content();
var body = page.generateBodyJson();
body.onLoad = page.onLoad; 
body.onShow = page.onShow; 
body.onShareAppMessage = page.onShareAppMessage;
body.likePost = page.likePost;
body.commentChange = page.commentChange; 
body.sendComment = page.sendComment; 
body.selectedOption = page.selectedOption; 
body.gotoGroup = page.gotoGroup;
body.myback = page.myback;

Page(body)