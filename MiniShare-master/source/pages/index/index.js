//index.js
import { AppBase } from "../../app/AppBase";
import { BannerApi } from "../../apis/banner.api.js";
import { GroupApi } from "../../apis/group.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    //options.id=5;
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({activetab:0});
    var bannerApi = new BannerApi();
    bannerApi.home({},data=>{
      console.log(data);
      this.Base.setMyData({ homebanner:data });
    }, false);
  }
  onShow() {
    var that = this;
    super.onShow();
    var groupapi=new GroupApi();
    groupapi.all({},data=>{
      console.log(data);
      for(var i=0;i<data.length;i++){
        data[i]["operationtime_span"] = AppBase.Util.Datetime_str(Number(data[i]["operationtime_span"]));
      }
      if (that.setMyData != undefined) {
        that.setMyData({ list: data  });
      } else {
  that.Base.setMyData({ list: data });
      }
    });
  }
  createGroup(){
  }
  showMiddleButton(){
    this.Base.info("还没实现");
  }
}
var page = new Content();
var body = page.generateBodyJson();
body.onLoad = page.onLoad; 
body.onShow = page.onShow;
body.createGroup = page.createGroup;
body.showMiddleButton = page.showMiddleButton;
Page(body)