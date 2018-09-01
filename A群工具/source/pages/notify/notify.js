// pages/notify/notify.js
import { AppBase } from "../../app/AppBase";
import { PostApi } from "../../apis/post.api.js";
import { NoticeApi } from "../../apis/notice.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({  title: "", description: "", group_id: options.group_id });

    var that=this;
    var noticeApi = new NoticeApi();
    noticeApi.allcover({},(covers)=>{
      that.Base.setMyData({ selectcover: covers[0], covers: covers });
    });
  }
  onShow() {
    var that = this;
    super.onShow();
  }
  titleChange(e) {
    this.Base.setMyData({ title: e.detail.value });
  }
  descriptionChange(e) {
    this.Base.setMyData({ description: e.detail.value });
  }

  sendNotice(e) {
    var formId = e.detail.formId;

    //this.Base.info(formId);
    //return;

    var data = this.Base.getMyData();
    console.log(data);
    var title = data.title;
    var description = data.description;
    if (title.trim() == "") {
      wx.showToast({
        icon: "none",
        title: '请输入公告标题',
      });
      return;
    }
    if (description.trim() == "") {
      wx.showToast({
        icon: "none",
        title: '请输入公告内容',
      });
      return;
    }
    

    var group_id = data.group_id;
    var postapi = new PostApi();
    var json = {
      group_id: group_id,
      title: title,
      noticecover_id: data.selectcover.id,
      description: data.description
    };
    var that = this;
    postapi.notify(json, data => {
      if (data.code != "0") {
        that.Base.error(data.return);
      } else {
        
        wx.navigateTo({
          url: '/pages/post/post?group_id='+this.Base.options.group_id+'&id=' + data.return,
        })
      }
    });
  }
  changeCover(e){
    var id=e.currentTarget.id;
    var data=this.Base.getMyData();
    var covers=data.covers;
    for(var i=0;i<covers.length;i++){
      if (covers[i].id == id) {
        this.Base.setMyData({ selectcover: covers[i]});
      }
    }
  }
}
var page = new Content();
var body = page.generateBodyJson();
body.onLoad = page.onLoad;
body.onShow = page.onShow;
body.titleChange = page.titleChange;
body.descriptionChange = page.descriptionChange; 
body.sendNotice = page.sendNotice;
body.changeCover = page.changeCover; 
Page(body)