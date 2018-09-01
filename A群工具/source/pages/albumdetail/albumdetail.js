// pages/albumdetail/albumdetail.js
import { AppBase } from "../../app/AppBase";
import { AlbumApi } from "../../apis/album.api.js";
import { GroupApi } from "../../apis/group.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    //options.id = 12;
    //options.group_id = 1;
    this.Base.Page = this;

    if (options.id != undefined) {
      this.Base.setMyData({ "album_id": options.id });
    } else {
      this.Base.setMyData({ "album_id": "0" });
      options.id=0;
    }
    if (options.group_id != undefined) {
      this.Base.setMyData({ "group_id": options.group_id });
    } else {
      this.Base.setMyData({ "group_id": "0" });
      options.group_id = 0;
    }

    super.onLoad(options);
  }
  onShow() {
    var that = this;
    super.onShow();

    if(this.Base.options.id>0){
      var albumapi = new AlbumApi();
      albumapi.detail({ group_id: this.Base.options.group_id, id: this.Base.options.id }, data => {
        that.Base.setMyData({ info: data });
        wx.setNavigationBarTitle({
          title: data.name,
        })
      });
    }else{

      var groupapi = new GroupApi();
      groupapi.allphotos({ group_id: this.Base.options.group_id }, data => {
        that.Base.setMyData({ info: data });
        wx.setNavigationBarTitle({
          title: data.name,
        })
      });
    }
  }
  uploadPhoto(){
    wx.navigateTo({
      url: '/pages/upload/upload?choosetype=photo&album_id=' + this.Base.options.id + "&group_id=" + this.Base.options.group_id,
    })
  }
  viewPhotos(e){
    var photos=this.Base.getMyData().info.photos;
    var current=e.currentTarget.id;
    var nphotos=[];
    for (let i in photos){
      for (var j = 0; j < photos[i]["photos"].length;j++){
        nphotos.push(photos[i]["photos"][j]["photo"]);
      }
    }
    this.Base.viewGallary("album", nphotos,current);
  }
}
var page = new Content();
var body = page.generateBodyJson(); 
body.onLoad = page.onLoad;
body.onShow = page.onShow; 
body.uploadPhoto = page.uploadPhoto;
body.viewPhotos = page.viewPhotos;

Page(body)