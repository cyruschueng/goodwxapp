$(function () {
  var indextowheght=0;
  var mySwiper = new Swiper('.swiper-container-main', {
    direction : 'vertical',
    nextButton:'.jiantou',
    autoHeight: true,
    onSlideChangeEnd: function(mySwiper){
      var nowindex=mySwiper.activeIndex;
      if(nowindex==0){
        indexdonghua();
      }else if(nowindex==1){
        indexdhremove();
        var s_topcount=0;
        var t_bottomcount=0;

        var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
        var nScrollTop = 0;  //滚动到的当前位置
        var nDivHight = $('.mid-slide').height();

        if(mySwiper.previousIndex==0){
          $('.mid-slide').scrollTop(5);
        }if(mySwiper.previousIndex==2){
          //alert(indextowheght-nDivHight-10);
          $('.mid-slide').scrollTop(indextowheght-nDivHight-5);
        }
        //console.log($(".mid-slide").height());
        $('.mid-slide').scroll(function () {
          nScrollHight = $(this)[0].scrollHeight;
          nScrollTop = $(this)[0].scrollTop;
          indextowheght=$(this)[0].scrollHeight;
          //console.log(nScrollHight);
          //console.log(nScrollTop);
          if(nScrollTop==0){
            if(s_topcount!=1){
              s_topcount++;
            }else if(s_topcount==1){
              mySwiper.slidePrev();
              indexdonghua();
            }
          }
          if(nScrollTop + nDivHight >= nScrollHight){
            //alert("滚动条到底部了");
            if(t_bottomcount!=1){
              t_bottomcount++;
              $('.mid-slide').scrollTop(nScrollTop-10);
            }else if(t_bottomcount==1){
              mySwiper.slideNext();
            }
          }
        });
      }
    }
  })
  //index
  function indexdonghua() {
    $('.bigword').addClass('bigwordact');
    $('.index-person').addClass('indexpeoact');
    $('.indexwordnum').addClass('indexnumact');
  }
  function indexdhremove() {
    $('.bigword').removeClass('bigwordact');
    $('.index-person').removeClass('indexpeoact');
    $('.indexwordnum').removeClass('indexnumact');
  }
  //商品链接
  function togooddetail(dataid) {
    var isApp = navigator.userAgent.toLowerCase().indexOf('codoon') > -1;
    if(isApp){
      location.href='codoon://www.codoon.com/mall/goods_detail?goods_id='+dataid;
    }else{
      location.href='https://xmall.codoon.com/html/item-detail.html?h_id='+dataid;
    }

  }
  $('.goodcom').bind('click',function () {
    var a=$(this).attr('d_id');
    togooddetail(a);
  })
  //咕咚分享
  var nativeJS = new codoonNativeBridge();
  //分享
  nativeJS.nativeTopButtonShare({
    sCodoonShareImgUrl: 'http://activity-codoon.b0.upaiyun.com/codoonmall-sec/upload/cmalllshare.jpg',
    sCodoonShareLineLink:'https://www.codoon.com/h5/codoonmall-secret/index.html',
    sCodoonShareTitle: '2016咕咚商城大揭秘',
    oCodoonShareDestination: {
      codoonTimeline:  true,
      codoonGroup:   true,
      weixinToFriend: true,
      weixinToTimeline: true,
      sinaWeibo:  true,
      tencentQQ:  true,
      tencentQzone: true
    },
    sCodoonShareDescContent: '2016咕咚商城大揭秘，7000万用户大数据，为你揭秘你不知道的咕咚商城',
    sCodoonShareCodoonLineLink: 'https://www.codoon.com/h5/codoonmall-secret/index.html'
  });
  //微信分享
  // wx.config({
  //   title: "2016咕咚商城大揭秘",
  //   desc: '2016咕咚商城大揭秘，7000千万用户大数据，为你揭秘你不知道的咕咚商城',
  //   link: "//www.codoon.com/h5/codoonmall-secret/index.html",
  //   imgUrl: 'http://activity-codoon.b0.upaiyun.com/codoonmall-sec/upload/cmalllshare.jpg'
  // })
})
