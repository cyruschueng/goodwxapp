// pages/upload/upload.js
import { AppBase } from "../../app/AppBase";
import { AlbumApi } from "../../apis/album.api.js";
import { NoticeApi } from "../../apis/notice.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    //options.album_id = 12;
    //options.group_id = 1;
    this.Base.Page = this;
    super.onLoad(options);


    this.Base.setMyData({
      photos: [], description: "", album_id: options.album_id, group_id: options.group_id
    });


  }
  onShow() {
    var that = this;
    super.onShow();
  }
  chooseImage() {
    var that = this;
    this.Base.uploadImage("album", function (photo) {
      var photos = that.Base.getMyData().photos;
      photos.push(photo);
      that.Base.setMyData({ photos: photos });
    });
  }
  deleteImage(e) {
    var photos = this.Base.getMyData().photos;
    var newphotos = [];
    for (var i = 0; i < photos.length; i++) {
      if (e.currentTarget.id != "photo_" + photos[i]) {
        newphotos.push(photos[i]);
      }
    }
    this.Base.setMyData({ photos: newphotos });
  }
  previewPhotos() {
    console.log("aa");
    var photos = this.Base.getMyData().photos;
    console.log(photos);
    this.Base.viewGallary("album", photos);
  }
  changeDescription(e) {
    this.setData({ description: e.detail.value });
  }
  uploadToAlbum(e){
    console.log(e);
    var formId=e.detail.formId;
    var that=this;
    var data = this.Base.getMyData();
    var photos = data.photos;
    if(photos.length<=0){
      this.Base.info("请至少选择一张图片上传");
      return;
    }
    var group_id = data.group_id;
    var json = {
      album_id: data.album_id,
      group_id: data.group_id,
      description: data.description,
      photos: photos.join(",")
    };
    var albumApi = new AlbumApi();
    albumApi.uploadphoto(json,data=>{
      if(data.code=="0"){

        var noticeApi = new NoticeApi();
        noticeApi.uploadphoto({ group_id: group_id, post_id: data.return, formid: formId });


        wx.navigateTo({
          url: '/pages/post/post?id='+data.return,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        });
      }else{
        that.Base.error("系统繁忙，请稍后重试");
      }
    });
  }
}
var page = new Content();
var body = page.generateBodyJson();
body.onLoad = page.onLoad;
body.onShow = page.onShow;
body.chooseImage = page.chooseImage;
body.deleteImage = page.deleteImage;
body.previewPhotos = page.previewPhotos; 
body.changeDescription = page.changeDescription;
body.uploadToAlbum = page.uploadToAlbum; 


Page(body)