// pages/album/album.js
import { AppBase } from "../../app/AppBase";
import { GroupApi } from "../../apis/group.api.js";
import { AlbumApi } from "../../apis/album.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    //options.id=1;
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({
      tabs: ["共同回忆", "我的回忆"],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      t1: 0,
      t2: 0,
      hiddenmodalput:true
    });
  }
  onShow() {
    var that = this;
    super.onShow();
    var albumapi = new AlbumApi();
    albumapi.list({ group_id: this.Base.options.id }, data => {
      that.Base.setMyData({allalbum:data});
    });
    albumapi.list({ group_id: this.Base.options.id, createdmember_id: "Y" }, data => {

      that.Base.setMyData({ myalbum: data });
    });

    var groupapi = new GroupApi();
    groupapi.detail({ id: this.Base.options.id },data=>{

      that.Base.setMyData({ group: data });
    });

  }

  tabClick(e) {
    this.Base.setMyData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
  inputAlbunname(e){
    this.Base.setMyData({ albumname: e.detail.value});
  }
  createAlbum(){
    this.Base.setMyData({ albumname: "", hiddenmodalput: false, album_id: "" });
  }
  cancelCreate(){
    this.Base.setMyData({  hiddenmodalput: true });
  }
  confirmCreate() {
    var data=this.Base.getMyData();
    var albumname = data.albumname;
    var album_id = data.album_id;
    if(albumname.trim()==""){
      this.Base.info("回忆主题不能为空");
      return;
    }
    var that=this;
    var albumapi = new AlbumApi();
    console.log(album_id);
    if(album_id!=""){

      var postjson = { name: albumname, album_id: album_id };
      console.log(postjson);
      albumapi.rename(postjson, data => {
        if (data.code == 0) {
          that.onShow();
        } else {
          that.Base.error("系统正在维护，请稍后重试");
        }
      })
    }else{

      var postjson = { name: albumname, group_id: this.Base.options.id };
      console.log(postjson);

      albumapi.create(postjson, data => {
        if (data.code == 0) {
          that.Base.info("创建成功");
          that.onShow();
          wx.navigateTo({
            url: '/pages/albumdetail/albumdetail?id=' + data.return + "&group_id=" + that.Base.options.id,
          });
        } else {
          that.Base.error("系统正在维护，请稍后重试");
        }
      })
    }
    this.Base.setMyData({ hiddenmodalput: true });
  }
  changeAlbumname(e){
    var name = e.currentTarget.dataset.name;
    var sid = e.currentTarget.dataset.sid;
    console.log(sid);
    if(sid==""){

      that.Base.info("ri");
      return;
    }
    this.Base.setMyData({ albumname: name, album_id: sid, hiddenmodalput: false }); 
  }
  startManage(){
    var data = this.Base.getMyData();

    var allalbum=data.allalbum;
    for(var i=0;i<allalbum.length;i++){
      allalbum[i].selected=false;
    }
    this.Base.setMyData({ inmanage: true, allalbum: allalbum }); 
  }
  cancelManage(){
    this.Base.setMyData({ inmanage: false }); 
  }
  selectAlbum(e){
    var id=e.currentTarget.id;
    
    var data = this.Base.getMyData();
    if(data.inmanage!=true){
      wx.navigateTo({
        url: '/pages/albumdetail/albumdetail?id='+id+"&group_id="+this.Base.options.id,
      })
    }
    var allalbum = data.allalbum;
    for (var i = 0; i < allalbum.length; i++) {
      if (allalbum[i].id == id && allalbum[i].createdmember_id_name==AppBase.UserInfo.openid){
        allalbum[i].selected = !allalbum[i].selected;
      }
    }
    this.Base.setMyData({ inmanage: false, allalbum: allalbum }); 
  }
  deleteAlbum(){
    var that=this;
    var data = this.Base.getMyData();
    var allalbum = data.allalbum;
    var ids=[];
    for (var i = 0; i < allalbum.length; i++) {
      if (allalbum[i].selected == true && allalbum[i].createdmember_id_name == AppBase.UserInfo.openid) {
        ids.push(allalbum[i].id);
      }
    }
    ids=ids.join(",");
    console.log(ids);
    var albumapi = new AlbumApi();
    albumapi.adelete({ idlist:ids},data=>{
      if (data.code == 0) {
        that.onShow();
      } else {
        that.Base.error("系统正在维护，请稍后重试");
      }
    });
    this.Base.setMyData({ inmanage: false }); 
  }
  selectAllPhotos(){
    wx.navigateTo({
      url: '/pages/albumdetail/albumdetail?group_id=' + this.Base.options.id
    });
  }
}
var page = new Content();
var body = page.generateBodyJson();
body.onLoad = page.onLoad;
body.onShow = page.onShow; 
body.tabClick = page.tabClick; 
body.createAlbum = page.createAlbum;
body.inputAlbunname = page.inputAlbunname;
body.cancelCreate = page.cancelCreate; 
body.confirmCreate = page.confirmCreate; 
body.changeAlbumname = page.changeAlbumname;
body.startManage = page.startManage; 
body.cancelManage = page.cancelManage; 
body.selectAlbum = page.selectAlbum;
body.deleteAlbum = page.deleteAlbum;
body.selectAllPhotos = page.selectAllPhotos;
Page(body)