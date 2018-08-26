var util = require("../../utils/util.js")
var app = getApp();
const config = require('../../config')
var that;
Page({
    data: {
        i:'',
        j: '',
        cid:'',
        subjects:[],
        subject:'',
        from:'',
        show_add:true,
        myAlbums:[]
    },
    onLoad: function (options) {
      that=this;
 
      var cid = options.cid;
      var gid = options.gid;
      that.initAlbum(cid,gid);
    },


    initAlbum: function (cid,gid) {
      wx.showLoading({
        title: '加载中..',
      })
      app.getImprint(function (imprint) {
        var formdata = { "cid": cid }
        util.AJAX1(config.getAlbumsUrl, formdata, "post", { imprint: imprint }, function (res) {
          var result = res.data;
          wx.hideLoading()
          if (result.status == 'ok') {
            that.setData({gid:gid, cid: cid, allAlbums: result.allAlbums, myAlbums: result.myAlbums, loaded: true })
          }
        });
      });
    },

    showAdd:function(e){
      that.setData({show_add:false})
    },



    // 提交 TODO
    submit: function (event) {

      if (app.globalData.isExpOpenid) {
        wx.showToast({
          title: '体验者无权限',
        })
        return;
      }

      var name = event.detail.value.name;
      if (name.length == 0) {
        wx.showToast({
          title: '名称不正确',
        })
        return;
      }
      var desc = "";
      var cid = that.data.cid;
      var gid = that.data.gid;
      var role = "teacher";
      wx.showLoading({
        title: '添加中....',
      })
      app.getImprint(function (imprint) {
        var formdata = { "name": name, "desc": desc, "cid": cid, "gid": gid, role: role }
        util.AJAX1(config.createAlbumUrl, formdata, "post", { imprint: imprint }, function (res) {
          that.setData({ button_loadding: false });
          wx.hideLoading()
          var result = res.data;
          console.log(result);
          app.globalData.albumRefresh = true;
          if (result.status == 'ok') {
            var album=result.album;
            var myAlbums = that.data.myAlbums
            myAlbums.push(album);
            that.setData({ myAlbums: myAlbums, show_add: true})
            app.globalData.currentAlbumPublish = { name: album.name, id: album._id };
            wx.navigateBack({})
            // // app.globalData.memberReload = 1;
            // wx.navigateBack({ ddd: "as" });
          }
        });
      });
    },


    navigate: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value);
      var album_id=e.currentTarget.id;
      var album="";
      that.data.myAlbums.forEach(function(item){
         if(item._id==album_id){
           album=item;
         }
      });
      app.globalData.currentAlbumPublish ={name:album.name,id:album._id};
      wx.navigateBack({})
      // if(that.data.from=="add"){
      //   app.globalData.currentSubjectPublish = subject ;
      //   wx.navigateBack({})
      // }else{
      //   util.AJAX2(config.editTimetableUrl, '添加中', { cid: cid, subject: subject, j: j, i: i }, "post", {}, function (res) {
      //     if (res.data.status == 'ok') {
      //       app.globalData.currentSubject = subject + "|" + j + "|" + i;
      //       console.log(subject);
      //       wx.navigateBack({})
      //     } else {
      //       wx.showToast({
      //         title: '出现异常...',
      //       })
      //     }
      //   })
      // }
    },
});
