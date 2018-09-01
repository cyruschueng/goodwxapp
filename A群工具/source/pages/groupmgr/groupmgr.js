// pages/group/group.js
import { AppBase } from "../../app/AppBase";
import { GroupApi } from "../../apis/group.api.js";
import { PostApi } from "../../apis/post.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=1;
    super.onLoad(options);
    this.Base.setMyData({ list: [] });
  }

  onShow() {
    var that = this;
    super.onShow();
    var groupapi = new GroupApi();
    groupapi.detail({ id: this.Base.options.id }, data => {
      that.Base.setMyData({ info: data });
    });
  }
  transManage(e){
    var dataset=e.currentTarget.dataset;
    var member_id = dataset.member_id;
    var openid = dataset.openid;

    var that = this;

    var groupapi = new GroupApi();
    groupapi.trans({ newmgr_id: member_id }, data => {
      if(data.code==0){

        var data = that.Base.getMyData();
        var info = data.info;
        info.adminmember_id = member_id;
        info.adminmember_id_name = openid;
        that.Base.setMyData({ info: info });
      }
    });



  }
}
var page = new Content();
var body = page.generateBodyJson();
body.onLoad = page.onLoad;
body.onShow = page.onShow;
body.transManage = page.transManage;

Page(body)