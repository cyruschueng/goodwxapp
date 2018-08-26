$(function () {
  Date.prototype.pattern=function(fmt) {
    var o = {
      'M+' : this.getMonth()+1, //月份
      'd+' : this.getDate(), //日
      'h+' : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
      'H+' : this.getHours(), //小时
      'm+' : this.getMinutes(), //分
      's+' : this.getSeconds(), //秒
      'q+' : Math.floor((this.getMonth()+3)/3), //季度
      'S' : this.getMilliseconds() //毫秒
    };
    var week = {
      '0' : '/u65e5',
      '1' : '/u4e00',
      '2' : '/u4e8c',
      '3' : '/u4e09',
      '4' : '/u56db',
      '5' : '/u4e94',
      '6' : '/u516d'
    };
    if(/(y+)/.test(fmt)){
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+'').substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
      fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? '/u661f/u671f' : '/u5468') : '')+week[this.getDay()+'']);
    }
    for(var k in o){
      if(new RegExp('('+ k +')').test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (('00'+ o[k]).substr((''+ o[k]).length)));
      }
    }
    return fmt;
  }
  //http://www.codoon.com/www/hot_zone_server/share_sports_area_detail?share_id=l7OOWIFW_gc%3D

  // http://www.codoon.com/www/hot_zone_server/share_sports_area_detail?share_id=yzuNYfjWwQQ%3D

  //about share
  var nativeJS = new codoonNativeBridge();
  //获取参数
  function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2]; return null;
  }
  var shareid=getQueryString('share_id');
  var area_id=0;
  var sports_type=0;

  function getShareinfo(id) {
    cloudNineAjax.get(
      '//www.codoon.com/www/hot_zone_server/share_sports_area_detail',
      {share_id:id},
      function (data) {
        if(typeof data.data === 'string'){
          data.data = JSON.parse(data.data);
        }
        if(data.status=='OK'){
          console.log(data.data);
          area_id=data.data.area_id;
          sports_type=data.data.sports_type;
          // //如果没有排名，隐藏本周排名
          // // console.log(data.data.area_rank_data.list.length);
          // if(data.data.area_rank_data.list.length == 0){
          //   $('.rank-con').hide()
          // }
          //如果小于5调，隐藏按钮
          if(data.data.area_rank_data.list.length<5){
            $('.bottombtn').hide();
          }
          updateData(data.data);

        }else {
          alert(data.description);
        }

      }
    )
  }
  getShareinfo(shareid);

  function updateData(data) {
    //画图背景图
    $('#bodymovin').css({'background':'url('+data.area_detail_data.area_detail_pic+')  no-repeat','background-size':'100%'});

    //轨迹start
    if(data.area_detail_data.lottie!=''){
      //画图的json
      if(typeof data.area_detail_data.lottie === 'string'){
        data.area_detail_data.lottie = JSON.parse(data.area_detail_data.lottie);
      }
      var anim;
      var elem = document.getElementById('bodymovin')
      var animData = {
        container: elem,
        renderer: 'svg',//canvas
        loop: false,
        autoplay: true,
        rendererSettings: {
          progressiveLoad:false
        },
        animationData: data.area_detail_data.lottie,
      };
      anim = bodymovin.loadAnimation(animData);
    }
    //轨迹end

    //如果有跑场占领着，没有的话不显示
    if(data.area_detail_data.owner_nick){
      $('.uinfo-con .nickimg').attr({'src':data.area_detail_data.owner_portrait});
      $('.uinfo-con .iconv').attr({'src':data.area_detail_data.vipicon_s});
      $('.uinfo-con .nick').html(data.area_detail_data.owner_nick);
    }else {
      $('.uinfo-con').hide();
    }
    //跑场信息
    $('.runinfo-con .run-name').html(data.area_detail_data.area_name);
    $('.runinfo-con .run-area span').html(data.area_detail_data.area_location);
    $('.runinfo-con .run-dot span').html(data.area_detail_data.area_text);

    //随机头像
    if(data.participants_portrait.length>0){
      var tximgli='';
      for(var i=0;i<data.participants_portrait.length;i++){
        tximgli+='<img src=\''+data.participants_portrait[i]+'\'>'
      }
      $('.runinfo-con .txs-con').html(tximgli);
    }

    $('.runinfo-con .txs-word span').html(data.area_detail_data.area_heat);

    //排行榜
    if(data.area_rank_data.list.length == 0){
      $('.rank-con').hide();
    }else {
      //排行榜
      updateRank(data.area_rank_data.list,0);
    }

    //分享
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
      sCodoonShareLineLink:'https://www.codoon.com/h5/runway-share/index.html?share_id='+shareid,
      sCodoonShareTitle: sharetit,
      sCodoonShareDescContent: sharedes,
      sCodoonShareCodoonLineLink: 'https://www.codoon.com/h5/runway-share/index.html?share_id='+shareid,
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

  // 'http://www.codoon.com/www/hot_zone_server/share_current_week_area_rank?area_id=11002&sports_type=1&start_time=2017-04-05%2000:00:00&limit='+limit,

  function getRankLst(limit) {
    //时间格式："2006-01-02 15:04:05"
    cloudNineAjax.get(
      '//www.codoon.com/www/hot_zone_server/share_current_week_area_rank',
      {
        area_id:area_id,
        sports_type:sports_type,
        start_time:new Date().pattern('yyyy-MM-dd HH:mm:ss'),
        limit:limit,
      },
      function (data) {
        if(typeof data.data === 'string'){
          data.data = JSON.parse(data.data);
        }
        if(data.status=='OK'){
          $('.bottombtn').hide();
          // console.log(data.data.list);
          updateRank(data.data.list,5);
        }else {
          alert(data.description);
        }

      }
    )
  }
  //更新排行榜
  function updateRank(data,fromNum) {
    console.log('fromNum:'+fromNum);

    var rankli='';
    for(var i=fromNum;i<data.length;i++){
      rankli+=
        '<div class=\'rank-li\'>'
        +'<div class=\'ranknum\' id=\'li'+data[i].range_id+'\'>'+data[i].range_id+'</div>'
        +'<div class=\'tximg\'>'
        +'<img class=\'tx\' src=\''+data[i].user_portrait+'\'>'
        +'<img class=\'iconv\' src=\''+data[i].vipicon_s+'\'>'
        +'</div>'
        +'<div class=\'nick\'><p>'+data[i].user_nick+'</p></div>'
        +'<div class=\'grade\'><span>'+data[i].score+'</span></div>'
        +'</div>';
    }
    $('.rankli-con').append(rankli);

    // http://activity-codoon.b0.upaiyun.com/sharerunway/upload/top1.png
    // http://activity-codoon.b0.upaiyun.com/sharerunway/upload/top2.png
    // http://activity-codoon.b0.upaiyun.com/sharerunway/upload/top3.png

    //前三名的名次显示图片
    $('#li1').html('<img class=\'topimg\' src=\'//activity-codoon.b0.upaiyun.com/sharerunway/upload/top1.png\'>');
    $('#li2').html('<img class=\'topimg\' src=\'//activity-codoon.b0.upaiyun.com/sharerunway/upload/top2.png\'>');
    $('#li3').html('<img class=\'topimg\' src=\'//activity-codoon.b0.upaiyun.com/sharerunway/upload/top3.png\'>');

  }
  //点击拉取更多按钮(后45条)
  $('.bottombtn').bind('click',function () {
    getRankLst(50);
  })




})
