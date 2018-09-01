// pages/vote/vote.js
import { AppBase } from "../../app/AppBase";
import { VoteApi } from "../../apis/vote.api.js";
import { NoticeApi } from "../../apis/notice.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    //options.group_id=8;
    this.Base.Page = this;
    super.onLoad(options);

    var opts=[];
    opts.push({seq:0, text: "" });
    opts.push({seq:1, text: "" });
    var now=new Date();
    var date = AppBase.Util.FormatDateStr(now.getTime());
    var time = AppBase.Util.FormatTimeStr(now.getTime()+3600*1000);

    this.Base.setMyData({ options: opts, title: "", description: "", date: date, time: time, startdate: date, group_id: options.group_id});
    
  }
  onShow() {
    var that = this;
    super.onShow();
  }
  titleChange(e){
    this.Base.setMyData({title:e.detail.value});
  }
  descriptionChange(e) {
    this.Base.setMyData({ description: e.detail.value });
  }
  bindDateChange(e) {
    this.Base.setMyData({ date: e.detail.value });
  }
  bindTimeChange(e) {
    this.Base.setMyData({ time: e.detail.value });
  }
  cutOption(e){
    var ops=[];

    var options = this.Base.getMyData().options;

    for (var i = 0; i < options.length; i++) {
      if (e.currentTarget.id != options[i].seq){
        ops.push(options[i]);
      }
    }
    options=ops;
    for (var i = 0; i < options.length; i++) {
      options[i].seq = i;
    }
    this.Base.setMyData({ options: options });
  }
  addOption() {
    var options=this.Base.getMyData().options;
    for(var i=0;i<options.length;i++){
      options[i].seq=i;
    }
    options.push({ seq: options.length, text: "" });
    this.Base.setMyData({ options: options });
  }
  optionsChange(e){
    var val=e.detail.value;
    var seq = e.currentTarget.id;
    var options = this.Base.getMyData().options;
    for (var i = 0; i < options.length; i++) {
      if (seq == options[i].seq) {
        options[i].text = val;
      }
    }
    this.Base.setMyData({ options: options });
  }
  sendVote(e){
    var formId = e.detail.formId;

    //this.Base.info(formId);
    //return;

    var data = this.Base.getMyData();
    console.log(data);
    var title=data.title;
    if(title.trim()==""){
      wx.showToast({
        icon:"none",
        title: '请输入投票标题',
      });
      return;
    } 
    var options = data.options;
    var opts=[];
    var count=0;
    for (var i = 0; i < options.length; i++) {
      if (options[i].text.trim()!="") {
        opts.push(options[i]);
      }
    }

    if (opts.length <2) {
      wx.showToast({
        icon: "none",
        title: '请至少有两项可以选择',
      });
      return;
    }
    var group_id = data.group_id;
    var voteApi = new VoteApi();
    var json={
      group_id: group_id,
      options: JSON.stringify(opts),
      title:title,
      description:data.description,
      vote_expired:data.date+" "+data.time
    };
    var that=this;
    voteApi.create(json,data=>{
        if(data.code!="0"){
          that.Base.error(data.return);   
        } else {
          var noticeApi = new NoticeApi();
          noticeApi.createvote({ group_id: group_id, post_id: data.return, formid: formId });
          wx.navigateTo({
            url: '/pages/post/post?id='+data.return,
          })
        }
    });
  }
}
var page = new Content();
var body = page.generateBodyJson();
body.onLoad = page.onLoad; 
body.onShow = page.onShow;
body.titleChange = page.titleChange;
body.descriptionChange = page.descriptionChange; 
body.cutOption = page.cutOption; 
body.addOption = page.addOption;
body.optionsChange = page.optionsChange;
body.bindDateChange = page.bindDateChange;
body.bindTimeChange = page.bindTimeChange;
body.sendVote = page.sendVote;


Page(body)