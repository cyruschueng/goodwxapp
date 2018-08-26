$(function () {
  //http://www.codoon.com/www/hot_zone_server/share_sports_area_record?share_id=O6IhhEM3yz8%3D
  //WkpXaAJQ0v8%3D

  //about share
  var nativeJS = new codoonNativeBridge();
  //获取参数
  function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2]; return null;
  }
  var shareid=getQueryString('share_id');
  //console.log(shareid);
  function getShareinfo(id) {
    cloudNineAjax.get(
      '//www.codoon.com/www/hot_zone_server/share_sports_area_record',
      {share_id:id},
      function (data) {
        if(typeof data.data === 'string'){
          data.data = JSON.parse(data.data);
        }
        if(data.status=='OK'){
          //console.log(data.data);
          updateData(data.data);
        }else {
          alert(data.description);
        }

      }
    )
  }
  getShareinfo(shareid);

  function updateData(data) {
    $('#shareimg').attr({'src':data.pic});
    $('#runwayname').html(data.area_name);
    toShare(shareid,data.pic,data.title,data.text);
  }


  //app通用分享
  function toShare(shareid,shareimgurl,sharetit,sharedes) {
    // console.log(shareid);
    // console.log(shareimgurl);
    // console.log(sharetit);
    // console.log(sharedes);
    var shareOption={
      sCodoonShareImgUrl: shareimgurl,
      sCodoonShareLineLink:'https://www.codoon.com/h5/runway-share/shareperson.html?share_id='+shareid,
      sCodoonShareTitle: sharetit,
      sCodoonShareDescContent: sharedes,
      sCodoonShareCodoonLineLink: 'https://www.codoon.com/h5/runway-share/shareperson.html?share_id='+shareid,
    }

    nativeJS.nativeTopButtonShare({
      sCodoonShareImgUrl: shareOption.sCodoonShareImgUrl,
      sCodoonShareLineLink: shareOption.sCodoonShareLineLink,
      sCodoonShareTitle: shareOption.sCodoonShareTitle ,
      sCodoonShareDescContent: shareOption.sCodoonShareDescContent,
      sCodoonShareCodoonLineLink: shareOption.sCodoonShareCodoonLineLink,
      oCodoonShareDestination: {
        codoonTimeline:  true,
        codoonGroup:   true,
        weixinToFriend: true,
        weixinToTimeline: true,
        sinaWeibo:  true,
        tencentQQ:  true,
        tencentQzone: true
      },
    });
    configAndShare({
      title: shareOption.sCodoonShareTitle,
      desc: shareOption.sCodoonShareDescContent,
      link: shareOption.sCodoonShareLineLink,
      imgUrl: shareOption.sCodoonShareImgUrl
    });

  }
})
