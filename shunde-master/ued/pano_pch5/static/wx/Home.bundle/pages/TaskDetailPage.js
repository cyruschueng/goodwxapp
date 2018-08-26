/**
 * Created by Drzhang on 2017/8/14.
 */
module("TaskDetailPage.xml", "FacilityListCell.xml", "FacilityListCell_album.xml","FacilityListCell_Complex_Entity.xml",
  "item2.xml","item.xml","FacilityListCell_Simple_Entity.xml",
  function (render, renderCell_hotel, renderCell_album,renderCell_ce,render_item2,render_item,render_simple) {

    var View = com.vizengine.view.View;

    return function () {
        var page = render();
        // util.showLoading("vizenLoadingDiv")
        //http://api.shot.test.vb.com.cn/task/shotPoint?taskId=5a001fb9e5b5137c0679e441
        var getFacilitiesUtl = "/task/entity";
        var complexUtl="/task/shotPoint";
        var confirmTaskUrl = "/app/shotTask/confirmPano";
        var getTaskDetailUrl = "/task/";
        var detailTaskData;
        var facilitiesData;
        var loadingFlag = 0;

        //摄影师信息模块
        var btnBack = page.$("btnBack");
        var taskName = page.$("taskName");
        var avtarImg = page.$("avtarImg");
        var photographerName = page.$("photographerName");
        var photographerPhone = page.$("photographerPhone");
        var callBtn = page.$("callBtn");
        var photographerAddressBox = page.$("photographerAddressBox");
        var photographerAddress = page.$("photographerAddress");
        var facilityCount = page.$("facilityCount");
        var photographStatus = page.$("photographStatus");
        window.completePhotographBtn = page.$("completePhotographBtn");
        var taskQrCode = page.$("taskQrCode");
        var photographBtnCover = page.$("photographBtnCover");
        var facilityListView = page.$("facilityListView");

        //二维码模块
        var qrcodeDialog = page.$("qrcodeDialog");
        var qrTaskName = page.$("qrTaskName");
        var qrTaskAddress = page.$("qrTaskAddress");
        var qrImg = page.$("qrImg");
        var qrClose = page.$("qrClose");
        var qrcodeDialogCover = page.$("qrcodeDialogCover");

        //完成拍摄模块
        var confirmDialog = page.$("confirmDialog");
        var confirmCompletedBtn = page.$("confirmCompletedBtn");
        var cancelBtn = page.$("cancelBtn");
        var confirmDialogCover = page.$("confirmDialogCover");

        //地图
        var v_map = page.$("map")
        var mapData = {
          bounds: {},
          data: [],
          center: []
        };
        var bigNameList = [];

        console.log("获取任务详情url："+util.baseUrl+getTaskDetailUrl+sessionStorage.currTaskId);
        util.http(util.baseUrl+getTaskDetailUrl+sessionStorage.currTaskId,
            function (response) {
                loadingFlag++;
                console.log(response);
                if(response.code == 0){
                    detailTaskData = response.data;
                    initView();
                    initOnClickEvent();
                }
            },
            function (response) {
                console.log("error" + response
                );
            }
        );

      if(sessionStorage.currType=="custom"){
        http://api.shot.test.vb.com.cn/task/shotInfo/complex?taskId=5a001fb9e5b5137c0679e441
        var tempUrl=complexUtl;
      }else{
        var tempUrl=getFacilitiesUtl;
      }
      console.log("获取实体列表url："+util.baseUrl+tempUrl+"?taskId="+sessionStorage.currTaskId+"&type="+sessionStorage.currType);
      util.http(util.baseUrl+tempUrl+"?taskId="+sessionStorage.currTaskId+"&type="+sessionStorage.currType,
        //sessionStorage.currTaskId = '59ddf202e6f39837d0047059'
        //sessionStorage.currType = 'album'
        //  util.http('//localhost:8084'+getFacilitiesUtl+"?taskId="+sessionStorage.currTaskId+"&type="+sessionStorage.currType,
        function (response) {
          loadingFlag++;
          console.log(response);
          if(response.code == 0){
            facilitiesData = response.data;
            var handleInterval = setInterval(function () {
              if(loadingFlag == 2){
                clearInterval(handleInterval);
                handleFacilitiesData(sessionStorage.currType);
                initListView(sessionStorage.currType);
                console.log(bigNameList);
              }
            });
          }
        },
        function (response) {
          console.log("error" + response
          );
        }
      );






        setQRCode(qrImg._nativeView.div,255,255,sessionStorage.currTaskId,sessionStorage.currType);
        initOnClickEvent();
        document.title="需求详情";
        window.page = page;
        return page;


      /*
      * 函数的定义
      * */
      function setQRCode(element, width, height,taskId,type) {
        var url = util.qrCodeUrl+"?taskId="+taskId+"&type="+type;
        while (element.hasChildNodes()) {
          element.removeChild(element.lastChild);
        }
        var qrcode = new QRCode(element, {
          width : width,
          height : height
        });
        qrcode.makeCode(url);
      }

      function initOnClickEvent() {
        btnBack.setOnClick(function(){
          page.backward();
          document.title="拍摄中的需求";
        });

        callBtn.setOnClick(function () {
          util.tel(detailTaskData.contactPhone);
        });

        photographerAddressBox.setOnClick(function(){
          util.nav(detailTaskData.lnglat[1],detailTaskData.lnglat[0],detailTaskData.name,detailTaskData.address);
        });

        completePhotographBtn && completePhotographBtn.setOnClick(function(){
          if(!photographBtnCover.visible){
            qrcodeDialog.setVisible(true);
          }
        });

        qrClose.setOnClick(function(){
          qrcodeDialog.setVisible(false);
        });

        confirmDialogCover.setOnClick(function () {
          //阻止事件穿透
        })
        qrcodeDialogCover.setOnClick(function(){
          //阻止事件穿透
        });

        page.$("toMap").setOnClick(function(){
          page.$("map").setGone(false);
          document.getElementsByClassName("amap-toolbar")[0].style.visibility='visible'
          setTimeout(function(){
            mapObj.setZoom(9)
            mapObj.setFitView();
          },500)

          if(sessionStorage.currType == "hotel"){
            window.spotInfoView = page.$("spotsDatail")
          }else if(sessionStorage.currType == "album"){
            window.spotInfoView = page.$("facilityListView").subViews[0]
          }
        })
      }

      function initView() {
        if(detailTaskData.name && detailTaskData.name.length > 15){
          taskName.setText(detailTaskData.name.substr(0,15)+'...');
        }else {
          taskName.setText(detailTaskData.name);
        }
        photographerName.setText(detailTaskData.contact);
        photographerPhone.setText(detailTaskData.contactPhone);
        photographerAddress.setText(detailTaskData.address);
        facilityCount.setText("共"+detailTaskData.facilities.length+"个设施点");
        page.$("shotCount").setText('拍摄点（'+detailTaskData.facilities.length+'）')
        if(sessionStorage.currType == "hotel"){
          page.$("forHotel").setGone(false)
          page.$("forHotel").$("spotName").setText(detailTaskData.name+'（'+detailTaskData.facilities.length+'）');
        }
        if(sessionStorage.currType == "custom"){
          page.$("forHotel").setGone(false)
          page.$("forHotel").$("spotName").setText(detailTaskData.name+'（'+detailTaskData.facilities.length+'）');
        }

        //二维码
        qrTaskName.setText(detailTaskData.name);
        qrTaskAddress.setText(detailTaskData.address);


        if(detailTaskData.status == 10){
          photographStatus.setText("完成拍摄");
          taskQrCode.setGone(false);
          photographBtnCover.setVisible(false);
        }else if(detailTaskData.status == 20) {
          photographStatus.setText("已完成拍摄");
          taskQrCode.setGone(true);
          photographBtnCover.setVisible(true);
          photographBtnCover.setVisible(false);
          completePhotographBtn.setGone(true)
          completePhotographBtn = null;
        }
      }

      function handleFacilitiesData(type) {
        if(type=="album") {
          if(!facilitiesData[0].facilityList){
            facilitiesData = [{
              facilityList: facilitiesData
            }]
          }
          for (var i in facilitiesData) {
            for (var j in facilitiesData[i].facilityList) {
              var spot = facilitiesData[i].facilityList[j]
              var province = spot.provinceName;
              var city = spot.cityName;
              var county = spot.countyName;
              var address = spot.address;
              spot.entiretyAddress = (province ? province : '') + (city ? city.replace(province, '') : '') + (county ? county.replace(city, '') : '') + (address ? address.replace(province, '').replace(city, '').replace(county, '') : '')
              if (j === '0') {
                mapData.bounds.maxLng = spot.lng
                mapData.bounds.maxLat = spot.lat
                mapData.bounds.minLng = spot.lng
                mapData.bounds.minLat = spot.lat
              }
              mapData.bounds.maxLng = mapData.bounds.maxLng > spot.lng ? mapData.bounds.maxLng : spot.lng
              mapData.bounds.maxLat = mapData.bounds.maxLat > spot.lat ? mapData.bounds.maxLat : spot.lat
              mapData.bounds.minLng = mapData.bounds.minLng < spot.lng ? mapData.bounds.minLng : spot.lng
              mapData.bounds.minLat = mapData.bounds.minLat < spot.lat ? mapData.bounds.minLat : spot.lat
              for (var k in mapData.data) {
                if (Math.abs(mapData.data[k].lng - spot.lng) < 0.01 && Math.abs(mapData.data[k].lat - spot.lat) < 0.01) {
                  mapData.data[k].facilityList.push(spot)
                  mapData.data[k].count++
                  break
                } else if (k === String(mapData.data.length - 1)) {
                  mapData.data.push({
                    lng: spot.lng,
                    lat: spot.lat,
                    count: 1,
                    provinceName: spot.provinceName,
                    cityName: spot.cityName,
                    countyName: spot.countyName,
                    address: spot.address,
                    entiretyAddress: spot.entiretyAddress,
                    facilityList: [spot]
                  })
                }
              }
              if (!mapData.data.length) {
                mapData.data.push({
                  lng: spot.lng,
                  lat: spot.lat,
                  count: 1,
                  provinceName: spot.provinceName,
                  cityName: spot.cityName,
                  countyName: spot.countyName,
                  address: spot.address,
                  entiretyAddress: spot.entiretyAddress,
                  facilityList: [spot]
                })
              }
            }
          }
          for (var i = 0; i < mapData.data.length; i++){
            var currData = mapData.data[i];
            if(!currData.facilityList.length) {
              break;
            }
            var bigNameItem = {
              list : [],
              name: '',
              address: {
                lng: currData.facilityList[0].lng,
                lat: currData.facilityList[0].lat,
                address: currData.facilityList[0].entiretyAddress
              }
            };
            for(var j=0;  j < currData.facilityList.length;  j++){
              var currFacility = currData.facilityList[j];
              bigNameItem.list.push(currFacility.name);
            }
            bigNameList.push(bigNameItem);
          }
          mapData.bounds.maxLng = mapData.bounds.maxLng + 0.5
          mapData.bounds.maxLat = mapData.bounds.maxLat + 0.5
          mapData.bounds.minLng = mapData.bounds.minLng - 0.5
          mapData.bounds.minLat = mapData.bounds.minLat - 0.5

          mapData.center[0] = (mapData.bounds.minLng + mapData.bounds.maxLng) / 2
          mapData.center[1] = (mapData.bounds.maxLat + mapData.bounds.minLat) / 2

        }else if(type="hotel"){
          mapData = {
            bounds: {
              maxLng: detailTaskData.lnglat[0] + 0.5,
              maxLat: detailTaskData.lnglat[1] + 0.5,
              minLng: detailTaskData.lnglat[0] - 0.5,
              minLat: detailTaskData.lnglat[1] - 0.5
            },
            center: [detailTaskData.lnglat[0],detailTaskData.lnglat[1]],
            data: [

            ]
          }
          if(detailTaskData.facilities.length > 0){

            for(var i=0;  i < facilitiesData.length;  i++){
              var currData = facilitiesData[i];

              var bigNameItem = {
                list : []
              };
              for(var j=0;  j < currData.facilityList.length;  j++){
                var currFacility = currData.facilityList[j];
                for(var k=0;  k < detailTaskData.facilities.length;  k++){
                  var currDetailFacility = detailTaskData.facilities[k];
                  if(currDetailFacility == currFacility.id){
                    bigNameItem.name = currData.categoryName;
                    bigNameItem.list.push(currFacility.name);
                    continue;
                  }
                }
              }
              if(bigNameItem.name != null && bigNameItem.list.length > 0){
                bigNameList.push(bigNameItem);
              }

            }
            mapData.data.push({
              name: detailTaskData.name,
              lng: detailTaskData.lnglat[0],
              lat: detailTaskData.lnglat[1],
              count: detailTaskData.facilities.length,
              provinceName: detailTaskData.provinceName,
              cityName: detailTaskData.cityName,
              countyName: detailTaskData.countyName,
              address: detailTaskData.address,
              entiretyAddress: detailTaskData.address,
              facilityList: bigNameList
            })
          }
        }else{

        }
        v_map.setData(mapData);

      }

      function initListView(type) {
        var renderCell;
        if(type == "album"){
          renderCell = renderCell_album;
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
            facilityListView.addView(reUseView);
          }
        }else if(type=="hotel"){
          renderCell = renderCell_hotel;
          for(var i=0;  i < bigNameList.length;  i++){
            var currData = bigNameList[i];
            var reUseView = renderCell();
            reUseView.$("facilityName").setText(currData.name);
            reUseView.$("facilityNum").setText("("+currData.list.length+")");
            for(var j=0;  j<currData.list.length;  j++){
              reUseView.$("facilityBox").addView(createFacilityCell(currData.list[j]));
            }
            if(type == "album"){
              reUseView.$("address").setText(currData.address.address);
              reUseView.$("address").setOnClick(function(){
                util.nav(currData.address.lng,currData.address.lat,currData.name ? currData.name : "拍摄点",currData.address.address)
              })
            }
            facilityListView.addView(reUseView);
          }
        }else{
          var al=facilitiesData.appearance;
          if(al.length==0){
            page.$("tv_waiguan").setGone(true);
          }
          for(var j=0;  j<al.length;  j++){
            console.log({name:al[j].name});
            var view_item=render_item();
            view_item.setTitle(al[j].name);
            page.$("container").addView(view_item);
          }

          if(facilitiesData.tag=="complex"){
            for(var k=0;k<facilitiesData.entityGroupList.length;k++){
              //var entityList=entityGroupList[k].entityList;//arr
              var view_entityGroup=renderCell_ce();
              view_entityGroup.create(facilitiesData.entityGroupList[k]);
              page.$("facilityListView").addView(view_entityGroup);
              //var rc=renderCell_ce();
              //rc.$("tv_title").setText(entityGroupList[k].name);//旅游景点
            }
          }else{
            for(var k=0;k<facilitiesData.facilityGroupList.length;k++){
              //var entityList=entityGroupList[k].entityList;//arr
              var view_simple=render_simple();
              view_simple.create(facilitiesData.facilityGroupList[k]);
              page.$("facilityListView").addView(view_simple);
              //var rc=renderCell_ce();
              //rc.$("tv_title").setText(entityGroupList[k].name);//旅游景点
            }
          }

        }
      }

      function createFacilityCell(textStr) {
        var tv = View.parse({
          type: "View",
          width : "wrap",
          height : "wrap",
          marginRight : "16dp",
          children : [
            {
              type: "TextView",
              width : "75dp",
              contentGravity:"center",
              height : "wrap",
              fontSize : "14dp",
              fontColor : "#999999",
              clipToBounds:"true",
              background:"#d3d3d3",
              borderCorner:"6dp",
              padding:"6dp",
              margin:"10dp",
              text : textStr
            }
          ]
        });
        return tv;
      }
    }
})
