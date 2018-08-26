var comm = require('../../../utils/common.js');
var event = require('../../../utils/event.js')
var app = getApp()
Page({
    data:{

        //地图
        longitude:0,
        latitude:0,
        noShowMap:false,
        showModalStatus: true,
        tagLocation:{},
        markers: [],
        remind:'加载中',
        search_inputShowed: false,
        search_inputVal: "",
        scrollHeight:0,

        isShowList:true, 
        switchMode:'',
        place:[],
        _place: [],
        selectedPlace:{},
        placeIndex: 0,

        live:[],
        _live:[],
        liveIndex:0,

        morelive:[],
        _morelive:['面包熟食店','咖啡馆和茶室'],
        moreliveIndex:0,


        list:[],
        page:1,
        isMoreData:'',
        place_id:0,
        isCollect:0,

       
    },

    onLoad:function(option){
        console.log('option: ')
        console.log(option)
        var that=this
        var isShowList
        if (option.regoin_id && option.category_two_id){
          this.setData({
            longitude: parseFloat(option.longitude),
            latitude: parseFloat(option.latitude),
            place_id:parseInt(option.place_id),
            isCollect: parseInt(option.isCollect),
          })
          this.getLiveHeader(option.id, option.regoin_id, option.category_two_id)
          isShowList = false
        }else{
          this.getLiveHeader(option.id)
        }

        wx.getSystemInfo({
          success: function (res) {
            that.setData({
              scrollHeight: res.windowHeight,
              switchMode: '地图',
              isShowList: isShowList,
            });
          }
        });
        wx.setNavigationBarTitle({
          title: '班夫生活'
        })

        event.on('markersChange', that, function (id) {
          var markers = that.data.markers
          for (var i in markers) {
            if (parseInt(id) == parseInt(markers[i].id)) {
              markers[i].iconPath = '../../../image/mapIcon2.png'
              break
            }
          }
          that.setData({
            markers:markers
          })
        })
       
    },

    onUnload: function () {
      event.remove('markersChange', this);
    },

   // 搜索
    showInput: function () {
        this.setData({
            search_inputShowed: true
        });
    },
    hideInput: function () {
      this.setData({
          search_inputVal: "",
          search_inputShowed: false
      });
    },
    clearInput: function () {
      this.setData({
          search_inputVal: ""
      });
    },
    inputTyping: function (e) {
      this.setData({
          search_inputVal: e.detail.value
      });
      console.log('e.detail.value')
    },

     search:function(e){
       this.setData({
         page:1,
       })
       if (e.detail.value != ''){
         var region_id=this.getRegionId(this.data.placeIndex)
         var live_id=this.getLiveId(this.data.liveIndex)
         var twocategories_id = this.getMoreliveId(this.data.moreliveIndex)
         this.getLiveContent(region_id, live_id, twocategories_id, parseInt(this.data.page), e.detail.value)
       }else{
         wx.showModal({
           title: '提示',
           content: '请输入您要搜索的内容！',
           showCancel:false,
         })

       }
     },

     mytrait:function(){
       wx.navigateTo({
         url: '../../mytrait/mytrait',
       })
     },

    //地图
    switch:function(e){
        if(this.data.isShowList){
            this.setData({
                isShowList:false,
                switchMode:'列表',
            })
        }else{
            this.setData({
            isShowList:true,
            switchMode:'地图',
        })
        }
        
    },

    //获取中心位置
    getLocation: function(){
      var that=this
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          var latitude = res.latitude
          var longitude = res.longitude
          that.setData({
            longitude: longitude,
            latitude: latitude
          })
        },
        fail:function(){
          console.log('获取位置失败')
        }
      })
    },

    //点击地图标记点跳转到已到达行程
    markertap:function(e){
      var that = this
      var id = e.markerId
      function modalRender(info){
        console.log(info)
        if (info.intro == null) {
          info.intro = ''
        }
        if (info.content == null) {
          info.content = ''
        }
        that.setData({
          tagLocation:info,
          showModalStatus: false,
          noShowMap:true,
        })
      }
      wx.request({
        url: app._server+'/place/detail?appid'+app._appid+'&place_id=' + id + '&ukey=' + app.cache.userdata,
        success: function (res) {
          if (res.data) {
            var info = res.data;
            if (info.length != 0) {
              modalRender(info)
            }
          }
        },
      })
    },

    cancel:function(){
      this.setData({
        showModalStatus: true,
        noShowMap:false
      })
    },

    skip:function(){
      var that=this
      wx.redirectTo({
        url: 'merchants/merchants?id=' + that.data.tagLocation.id,
      })
    },

    //添加到已达行程
    arrived:function(){
      var that=this
      var markers=this.data.markers
      var tagLocation = this.data.tagLocation

      wx.showModal({
        content: '您是否要将该景点添加到已达行程',
        success:function(res){
          if(res.confirm){
            wx.request({
              url: app._server+'/schedule/mark',
              method: 'POST',
              data: {
                ukey: app.cache.userdata,
                appid: 'banfu123',
                status: 1,
                schedule_id: tagLocation.schedule_id,
              },
              success: function (res) {
                if (res.data.success) {
                  wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000
                  })
                  for (var i in markers) {
                    if (parseInt(tagLocation.id) == parseInt(markers[i].id)) {
                      markers[i].iconPath ="../../../image/mapIcon1.png"
                    }
                  }
                  that.setData({
                    markers: markers,
                    showModalStatus: true,
                    noShowMap: false
                  })
                } else {
                  wx.showToast({
                    title: '添加失败',
                    icon: 'success',
                    duration: 1000
                  })
                }
              },
              fail: function (res) {
                wx.showToast({
                  title: '添加失败',
                  icon: 'success',
                  duration: 1000
                })
              }
            })

            wx.navigateTo({
              url: '../../mytrait/mytrait?current=1',
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '添加失败',
            icon: 'fail',
            duration: 1000
          })
        }
      })
      
      
    },

    //选择器
    placeChange: function(e) {
      var region_id =this.getRegionId(parseInt(e.detail.value))
      var live_id = this.getLiveId(this.data.liveIndex)
      var twocategories_id = this.getMoreliveId(this.data.moreliveIndex)

      this.setData({
        placeIndex: e.detail.value,
        page:1,
        latitude:0,
        longitude:0,
        remind:'加载中',
      })
      this.getLiveContent(region_id, live_id, twocategories_id, parseInt(this.data.page))
    },

    liveChange:function(e){
      
      var region_id = this.getRegionId(this.data.placeIndex)
      var live_id = this.getLiveId(parseInt(e.detail.value))
      this.setData({
        liveIndex: e.detail.value,
        page:1,
        latitude: 0,
        longitude: 0,
        remind: '加载中',  
      })
      this.getMorelive(region_id, live_id)
    },

    moreliveChange:function(e){
      var region_id = this.getRegionId(this.data.placeIndex)
      var live_id = this.getLiveId(this.data.liveIndex)
      var twocategories_id = this.getMoreliveId(parseInt(e.detail.value))

      this.setData({
        moreliveIndex: e.detail.value,
        page: 1,
        latitude: 0,
        longitude: 0, 
        remind:'加载中', 
      })
      this.getLiveContent(region_id, live_id, twocategories_id, parseInt(this.data.page))

    },
  
    getLiveHeader: function (id, regoin_id = -1, twocategories_id = -1,){
      var that=this

      //渲染区域和分类
      function PlaceAndLiveRender(info){
        var _place = []
        var _live = []
        var liveIndex=0
        var place=info
        var placeIndex=0
        for (var i in info) {
          _place.push(info[i].name)
          place[i].index=i
          if(regoin_id != -1){
            if (parseInt(regoin_id) == parseInt(place[i].id)){
              placeIndex=i
            }
          }
        }

        var live = app.cache['live']
        for (var i in app.cache['live']) {
          _live.push(app.cache['live'][i].name)
          live[i].index=i
          if (parseInt(id) == parseInt(live[i].id)){
            liveIndex=i
          }
        }
        that.setData({
          _place: _place,
          _live: _live,
          liveIndex:liveIndex,
          live:live,
          place:place,
          placeIndex:placeIndex          
        })
        //console.log(place)
        //console.log(live)
      }

      //获取区域和分类数据
      wx.request({
        url: app._server+'/place/regions?appid='+app._appid+'',
        success: function (res) {
          if (res.data) {
            var info = res.data;
            if (info) {
              console.log(info)
              PlaceAndLiveRender(info)
              if (regoin_id == -1){
                regoin_id =that.getRegionId(that.data.placeIndex)
                that.getMorelive(regoin_id, id, twocategories_id)
              }else{
                that.getMorelive(regoin_id, id, twocategories_id)
              }
            }
          } 
        },
      })
    },

    //二级目录
    getMorelive: function (regoin_id, id, twocategories_id = -1){
      var that=this
      function moreliveRender(info){
        var morelive=info
        var _morelive=[]
        var moreliveIndex=0
        for (var i in morelive){
          _morelive.push(morelive[i].name)
          morelive[i].index=i
          if (twocategories_id != -1) {
            if (parseInt(twocategories_id) == parseInt(morelive[i].id)) {
              moreliveIndex = i
            }
          }
        }
        //全部
        var all={}
        all.id=-2
        all.index = parseInt(morelive.length)
        all.name='全部'
        _morelive.push(all.name)
        morelive.push(all)

        if(info.length == 0){
          moreliveIndex=-2
        }

        that.setData({
          _morelive:_morelive,
          morelive:morelive,
          moreliveIndex: moreliveIndex
        })

        console.log('二级目录： ')
        console.log(that.data.morelive)
      }

      if(parseInt(id) == -2){
        id=''
        twocategories_id=''
        var morelive={'id':-2,'index':0,'name':'全部'}
        var _morelive=['全部']
        var moreliveIndex=0
        that.setData({
          morelive:morelive,
          _morelive:_morelive,
          moreliveIndex:moreliveIndex
        })
        that.getLiveContent(regoin_id, id, twocategories_id, parseInt(that.data.page))
      }else{
        wx.request({
          url: app._server+'/live/twocategories?appid='+app._appid+'&id=' + id,
          success: function (res) {
            var info = res.data;
            moreliveRender(info)
            if (twocategories_id == -1) {
              twocategories_id = that.getMoreliveId(that.data.moreliveIndex)
              that.getLiveContent(regoin_id, id, twocategories_id, parseInt(that.data.page))
            } else {
              that.getLiveContent(regoin_id, id, twocategories_id, parseInt(that.data.page))
            }
          },
          complete: function () {
            that.setData({
              remind: ''
            })
          }
        })
      }
      
    },





    getLiveContent: function (id, category_id, twocategories_id,page,words=''){
      var that = this
      var url
      if (parseInt(category_id) == -2){
        category_id=''
      }
      if (parseInt(twocategories_id) == -1){
        twocategories_id=''
      }
      if (parseInt(twocategories_id) == -2){
        twocategories_id = ''
      }
      //渲染列表数据
      function contentRender(info) {
        console.log('列表内容： ')
        console.log(info)
        var list = app.cache['selectedPlace']
        that.setData({
          list: list,
        })
        console.log(that.data.list)
      }
      //获取列表数据
      console.log('区域id: ' + id)
      console.log('分类id: ' + category_id)
      console.log('二级目录id: ' + twocategories_id)
      wx.request({
        url: app._server+'/place/places?appid='+app._appid+'&region_id=' + id + '&category_id=' + category_id + '&category_two_id=' + twocategories_id+ '&page='+page+'&size=10'+'&words='+words,
        success: function (res) {
          if (res.data) {
            var info = res.data;
            if (info.length != 0) {
              
              app.saveCache('selectedPlace', info);
              contentRender(info)
              that.getMapInfo(id, category_id, twocategories_id)
            }else{
              wx.showModal({
                title: '提示',
                content: '暂无该项，请搜索其他项！',
                showCancel: false,
              })
              app.removeCache('selectedPlace');
              contentRender(info) 
              that.getMapInfo(id, category_id, twocategories_id) 
            }
          } 
        },
        complete: function () {
          that.setData({
            remind: ''
          })
        }
      })
    },

    //列表内容动态加载
    lower: function (e) {
       var that = this;
       setTimeout(function () {that.nextLoad(); }, 1000);
     },

     nextLoad: function () {
       var that=this

       var page=this.data.page
       page=page+1
       this.setData({
         page:page
       })

       
       var region_id=that.getRegionId(that.data.placeIndex)
       var live_id=that.getLiveId(that.data.liveIndex)
       var twocategories_id = that.getMoreliveId(that.data.moreliveIndex)
       this.getLiveContentNext(region_id, live_id, twocategories_id,parseInt(this.data.page))
       
       
     },

     getLiveContentNext: function (id, category_id, twocategories_id,page,words='') {
       var that = this
       //渲染列表数据
       if (parseInt(category_id) == -2) {
         category_id = ''
         twocategories_id=''
       }
       if (parseInt(twocategories_id) == -2){
         twocategories_id = ''
       }
       
       function contentRender(info) {
         var list = that.data.list.concat(info)
         app.saveCache('selectedPlace',list)
         that.setData({
           list: list,
         })
       }

       //获取列表数据
       wx.request({
         url: app._server+'/place/places?appid='+app._appid+'&region_id=' + id + '&category_id=' + category_id + '&category_two_id=' + twocategories_id +'&page=' + page + '&size=10' + '&words=' + words,
         success: function (res) {
           if (res.data) {
             var info = res.data;
             if (info.length !=0 ) {
               contentRender(info)
             } else 
             {
               console.log('已经没有数据了！')
             } 
           }
         },
       })
     },

    

     //获取地图标记点信息
     getMapInfo: function (region_id, category_id, twocategories_id){
      var that=this
      //console.log('区域id: ' + region_id)
      //console.log('分类id: ' + category_id)
      //console.log('二级目录id: ' + twocategories_id)

      var longitude = that.data.longitude
      var latitude = that.data.latitude
      function getMarkers(place){
        var markers=[]
        for(var i=0;i<place.length;i++){
          var marker = { 'id': 0, 'iconPath': '', 'latitude': 0,'longitude':0}
          if ((place[i].latitude.length != 0 || place[i].longitude.length != 0) && (parseFloat(place[i].latitude) != 0 || parseFloat(place[i].longitude) != 0)){
            marker['id'] = place[i].id
            marker['iconPath'] = '../../../image/mapIcon1.png'
            marker['latitude'] = place[i].latitude
            marker['longitude'] = place[i].longitude
            marker['width'] = 19
            marker['height'] = 26
            markers.push(marker)
          }     
        }
        wx.request({
          url: app._server+'/schedule/list',
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: {
            ukey: app.cache.userdata,
            appid: 'banfu123',
          },
          success: function (res) {
            if (res.data) {
              var info = res.data;
              if (info.length != 0) {
                
                for(var i in info){
                  console.log('i: '+i)
                  if(markers.length != 0){
                    for (var j in markers) {
                      if (parseInt(info[i].place_id) == parseInt(markers[j].id)) {
                        console.log("j: " + j)
                        markers[j]['iconPath'] = '../../../image/mapIcon2.png'
                        break
                      }
                    }
                    if (parseInt(info[i].place_id) != parseInt(markers[j].id)) {
                      var marker = { 'id': 0, 'iconPath': '', 'latitude': 0, 'longitude': 0 }
                      if ((info[i].latitude.length != 0 || info[i].longitude.length != 0) && (parseFloat(info[i].latitude) != 0 || parseFloat(info[i].longitude) != 0)) {
                        marker['id'] = info[i].place_id
                        marker['iconPath'] = '../../../image/mapIcon2.png'
                        marker['latitude'] = info[i].latitude
                        marker['longitude'] = info[i].longitude
                        marker['width'] = 19
                        marker['height'] = 26
                        markers.push(marker)
                      }
                    }
                  }else{
                    var marker = { 'id': 0, 'iconPath': '', 'latitude': 0, 'longitude': 0 }
                    marker['id'] = info[i].place_id
                    marker['iconPath'] = '../../../image/mapIcon2.png'
                    marker['latitude'] = info[i].latitude
                    marker['longitude'] = info[i].longitude
                    marker['width'] = 19
                    marker['height'] = 26
                    markers.push(marker)

                  } 
                  
                 
                }
              }
              that.setData({
                markers: markers,
                latitude: markers[0].latitude,
                longitude: markers[0].longitude
              })

              //console.log('markers: ')
              //console.log(that.data.markers)
              //console.log('latitude: ' + that.data.latitude + ' longitude: ' + that.data.longitude)
            }else{
              that.setData({
                markers: markers,
                latitude: markers[0].latitude,
                longitude: markers[0].longitude
              })
            }
          },
          fail:function(res){
            console.log("res:　")
            console.log(res)
          },
        })

        
      }


      //console.log('latitude: ' + that.data.latitude + ' longitude: ' + that.data.longitude)
      if (parseInt(longitude) == 0 && parseInt(latitude)==0){
        wx.request({
          url: app._server+'/place/places?appid='+app._appid+'&region_id=' + region_id + '&category_id=' + category_id + '&category_two_id=' + twocategories_id,
          success: function (res) {
            if (res.data) {
              var info = res.data;
              console.log('地图信息: ')
              console.log(info)
              if (info.length != 0) {
                getMarkers(info)
              }
            }
          },
        })
      }else{
        var markers=[]
        var iconPath=''
        if (that.data.isCollect == 0){
          iconPath ='../../../image/mapIcon1.png'
        }else{
          iconPath = '../../../image/mapIcon2.png'
        }
        var marker = { 'id': that.data.place_id, 'iconPath': iconPath, 'latitude': latitude, 'longitude': longitude,'width':19,'height':26}
        markers.push(marker)
        that.setData({
          markers:markers
        })
        console.log('markers: ')
        console.log(that.data.markers)
      }

     },

     //获取地点id
     getRegionId: function(index){
      var place=this.data.place
      var region_id=1
      if(place){
        for(var i in place){
          if(index == place[i].index){
            region_id=place[i].id
            break
          }
        }
      }
      return region_id
     },

     //获取生活id
     getLiveId: function(index){
       var live=this.data.live
       var live_id=1
       if(live){
         for(var i in live){
           if(index == live[i].index){
             live_id=live[i].id
             break
           }
         }
       }
       return live_id
     },

     //获取更多生活id
     getMoreliveId:function(index){
       var morelive=this.data.morelive
       var morelive_id
       if(index == -2){
         morelive_id=-2
         return morelive_id
       }
       if(morelive){
         for(var i in morelive){
           if(index == morelive[i].index){
             morelive_id=morelive[i].id
             break
           }
         }
       }
       return morelive_id
     },

     //图片加载错误处理
     errImg: function (ev) {
       var that = this;
       comm.errImgFun(ev, that);
     }, 
})