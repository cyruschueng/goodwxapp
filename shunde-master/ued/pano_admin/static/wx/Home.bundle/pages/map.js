require("/common/CommonUtil.js","FacilityListCell.xml", "FacilityListCell_album.xml",
  function(common,renderCell_hotel, renderCell_album) {
    var View = com.vizengine.view.View;
    return function (view) {
      var v_markerCard = view.$("markerCard");
      var selectedMarker
      var data
      var initMap = function () {
        window.mapObj = new AMap.Map(view.$("mapContainer")._nativeView.div, {
          touchZoom: true,
          doubleClickZoom: true,
          zoom: 9,
          mapStyle: 'amap://styles/e085462b354e0ef9b98040a255e17c91'
        });
        //this._globalAmap = global.AMap
        //this._map = new this._globalAmap.Map('map-container', {
        //  center: this.center,
        //  resizeEnable: true
        //})
        //let self = this
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'], function () {
          mapObj.addControl(new AMap.ToolBar({
            position: 'RT'
          }))
        })
        //this.infoWindow = new this._globalAmap.InfoWindow({
        //  isCustom: true,
        //  offset: new this._globalAmap.Pixel(0, -38)
        //})
        //mapObj.on('click', function () {
        //  if (selectedMarker) {
        //    selectedMarker.childNodes[0].style.display = 'none'
        //    selectedMarker.childNodes[1].setAttribute('class', '')
        //    selectedMarker = null
        //  }
        //})
        //this.$watch('shotSpots', function (newVal, oldVal) {
        //  if (newVal) {
        //    this.getShotSpots()
        //  }
        //})
        view.setOnClick(function(){})
        markerCardInit()
        view.$("back").setOnClick(function(){
          document.getElementsByClassName("amap-toolbar")[0].style.visibility='hidden'
          view.setGone(true)
        })
      }
      var markerCardAni = function (x,y,callback) {
        commonUtil.scaleAnim(view.$("markerCard"), 1000,v_markerCard.scaleX,x,v_markerCard.scaleY,y,0.5,0,null,callback)
      }
      var markerCardDetialCell = function (msg) {
        return View.parse({

        })
      }
      var markerCardInit = function () {
        view.$("markerCard")._nativeView.div.style.zIndex = 100
        v_markerCard.setOnClick(function(){})
        v_markerCard.$("markerUp").setOnClick(function(){
          hideMarker(false)
          completePhotographBtn && completePhotographBtn.setGone(false)
          v_markerCard.setVisible(false)
        })
      }

      initMap()
      util.disablePreventTouch(view.$("mapContainer"))

      window.test = function () {
        alert(1)
      }
      var  createFacilityCell = function(textStr) {
        var tv = View.parse({
          type: "View",
          width : "wrap",
          height : "wrap",
          marginRight : "16dp",
          children : [
            {
              type: "TextView",
              width : "wrap",
              height : "wrap",
              fontSize : "14dp",
              fontColor : "#888888",
              text : textStr
            }

          ]
        });
        return tv;
      }

      function initListView(type,bigNameList) {
        var renderCell;
        if(type == "album"){
          renderCell = renderCell_album
        }else{
          renderCell = renderCell_hotel
        }
        for(var i=0;  i < bigNameList.length;  i++){
          var currData = bigNameList[i];
          var reUseView = renderCell();
          reUseView.$("facilityName").setText(currData.name);
          reUseView.$("facilityNum").setText("("+currData.list.length+")");
          for(var j=0;  j<currData.list.length;  j++){
            reUseView.$("facilityBox").addView(createFacilityCell(currData.list[j]));
          }
          if(type == "album"){
            reUseView.$("address").setText(currData.address.address)
            reUseView.$("address").setOnClick(function(){
              util.nav(currData.address.lng,currData.address.lat,currData.name ? currData.name : "拍摄点",currData.address.address)
            })
          }
          view.$("facilityListView").addView(reUseView);
        }
      }

      var hideMarker = function (value) {
        for(var i = 0; i < markers.length; i++){
          if(value){
            markers[i].hide()
          }else{
            markers[i].show()
          }
        }
      }

      window.markerDown = function () {
        if((new Date()) - markerTouchStartTime < 200) {
          v_markerCard.setVisible(true)
          //markerCardAni(0.8,0.9)
          completePhotographBtn && completePhotographBtn.setGone(true)
          hideMarker(true)
        }
      }

      var getMarkerStyle = function (msg) {
        spotsNameStr = '';
        for(var i=0; i < msg.facilityList.length; i++){
          spotsNameStr += msg.facilityList[i].name + '&nbsp;&nbsp;&nbsp;&nbsp;';
        }
        window.markerTouchStartTime;
        window.markerNav = function () {
          console.log((new Date()) - markerTouchStartTime)
          if((new Date()) - markerTouchStartTime < 200){
            util.nav(msg.lng,msg.lat,'当前拍摄点',msg.entiretyAddress);
          }
        }

        var markerHtml = '<div id="spotMarker" class="spotMarker"><div id="markerAddress" style="display:none;" class="markerAddress"><i slot="reference" style="color:#888;" class="iconfont icon-address"></i><span ontouchstart="markerTouchStartTime=new Date()" ontouchend="markerNav()">'
          + msg.entiretyAddress + '</span><div class="spotsName">'+spotsNameStr+'</div><img id="markerDowns" ontouchstart="markerTouchStartTime=new Date()" ontouchend="markerDown()" class="dressDown" src="/static/wx/Home.bundle/images/down.svg"/></div><div id="outerBorder"><div id="markerCount" class="markerCount">' + msg.count + '</div></div></div>'
        return markerHtml
      }

      var setMarker =  function(spotList) {
          var infoWindow = new AMap.InfoWindow();
          for (var i in spotList) {
            var marker = new AMap.Marker({
              draggable: false,
              position: [spotList[i].lng, spotList[i].lat],
              map: mapObj,
              content: getMarkerStyle(spotList[i])
            })

            marker.on('click', function () {
              var markerDom = this.getContentDom().childNodes[0]
              mapObj.setCenter(this.getPosition())
              if (selectedMarker) {
                selectedMarker.childNodes[0].style.display = 'none'
                selectedMarker.childNodes[1].setAttribute('class', '')
              }
              markerDom.childNodes[0].style.display = 'block'
              markerDom.childNodes[1].setAttribute('class', 'outerBorder')
              selectedMarker = markerDom
              view.$("photographerAddress").setText(spotList[i].address);
              view.$("photographerAddressBox").setOnClick(function(){
                util.nav(spotList[i].lng,spotList[i].lat,spotList[i].name,spotList[i].address);
              });
              if(sessionStorage.currType == "album" && $(markerDom).find(".spotsName")[0].offsetWidth >= $(markerDom).find(".spotsName")[0].scrollWidth){
                $(markerDom).find("#markerDowns")[0].style.display= 'none'
              }
              if(sessionStorage.currType == "hotel"){
                view.$("spotsName_album").clearViews();
                view.$("facilityListView").setGone(false)
                view.$("facilityListView").clearViews();
                view.$("spotName").setText(spotList[i].name+'（'+spotList[i].count+'）')
                initListView(sessionStorage.currType,spotList[i].facilityList);
              }else if(sessionStorage.currType == "album"){
                view.$("spotsName_album").clearViews();
                for(var k in spotList[i].facilityList){
                  view.$("spotsName_album").addView(createFacilityCell(spotList[i].facilityList[k].name))
                }
              }
            })
          }
        markers = mapObj.getAllOverlays("marker");
        mapObj.setFitView()

      }

      view.setData = function (data) {
        data = data
        console.log(data)
        setMarker(data.data)
      }
    }
  })
