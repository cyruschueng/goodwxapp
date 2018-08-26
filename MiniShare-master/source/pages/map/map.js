// pages/map/map.js
import { AppBase } from "../../app/AppBase";
import { GroupApi } from "../../apis/group.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    //options.group_id=1;
    this.Base.Page = this;
    super.onLoad(options);
    var that=this;
    var groupapi = new GroupApi();
    groupapi.detail({ id: options.group_id }, data => {
      var members = data.members;
      var markers=[];
      var count=0;
      if(members.length>30){
        members.sort(function () { return 0.5 - Math.random() });
      }
      for (var i = 0; i < members.length && count<30;i++){
        if (members[i].lat != null && members[i].lng != null) {
          console.log(members[i].lat);
          markers.push({
            iconPath: members[i].avatarUrl,
            id: members[i].id,
            label: {content:members[i].nickName},
            callout: members[i].nickName,
            title: members[i].nickName,
            latitude: members[i].lat,
            longitude: members[i].lng,
            width: 50,
            height: 50
          });
          count++;
        }
      }
      that.Base.setMyData({ markers: markers });
      return;
      for (var i = 0; i < markers.length; i++) {
        var marker=markers[i];
        wx.downloadFile({
          url: marker.iconPath,
          success:function(res){
            var path = res.tempFilePath;
            for (var k = 0; k < markers.length; k++) {
              if (marker.id == markers[k].id){
                markers[k].iconPath = path;
                break;
              }
            }
            that.Base.setMyData({ markers: markers });
          }
        })
      }
    });
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res);
        var latitude = res.latitude;
        var longitude = res.longitude;
        that.Base.setMyData({ lng: longitude,lat:latitude });
      }
    });
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