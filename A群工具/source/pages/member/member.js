// pages/member/member.js
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
    this.Base.setMyData({ activetab: 1 });
  }
  onShow() {
    var that = this;
    super.onShow();
  }
}
var page = new Content();
var body = page.generateBodyJson();
body.onLoad = page.onLoad;
body.onShow = page.onShow;
Page(body)