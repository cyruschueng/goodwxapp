
// 首页banner轮播
indexBannerSwiper();
function indexBannerSwiper(){
 var swiper = new Swiper('.index_banner_swiper', {
      pagination: {
        el: '.index_banner_pagination', //分页器
      },
      // navigation: {
      //   nextEl: '.swiper-button-next', // 控制右箭头
      //   prevEl: '.swiper-button-prev', // 控制左箭头
      // },
      spaceBetween: 10,
      slidesPerView: 1,//显示个数
      paginationClickable: true,
      //spaceBetween: 30, //右外边距
      //freeMode: true, //是否整个移动
      freeModeMomentumRatio : 1,
      autoplay : {
        delay:2500
      },
      loop : true, //环路
      //autoplayDisableOnInteraction: false, //手指滑动后还自动播放
      noSwiping : true,
      noSwipingClass : 'stop-swiping',
      //allowSwipeToPrev : false, //只能滑下一页
      //allowSwipeToNext : false, //只能滑上一页       
      //initialSlide :8,//初始化到第几页
      //swipeHandler : '.swipe-handler', //禁止触摸滑动
      //followFinger : false, //拖动后释放鼠标或手指时slide滑动
    }); 
}

// 首页商品分类
indexGoodsClassifySwiper();
function indexGoodsClassifySwiper(){
 var swiper = new Swiper('.index_goods_classify_swiper', {
      slidesOffsetBefore : 15, //设定slide与左边框的预设偏移量（单位px）。
      slidesOffsetAfter : 20, //设定slide与右边框的预设偏移量（单位px）。
      spaceBetween: 25, 
      slidesPerView :4.9,//显示个数
      paginationClickable: true,
      //freeMode: true, //是否整个移动
      freeModeMomentumRatio : 1,
      //autoplay: 2500,//2500毫秒播放一次
      //loop : true, //环路
      //autoplayDisableOnInteraction: false, //手指滑动后还自动播放
      noSwiping : true,
      noSwipingClass : 'stop-swiping',
      //allowSwipeToPrev : false, //只能滑下一页
      //allowSwipeToNext : false, //只能滑上一页       
      //initialSlide :1,//初始化到第几页
      //swipeHandler : '.swipe-handler', //禁止触摸滑动
      //followFinger : false, //拖动后释放鼠标或手指时slide滑动
    }); 
}

// 首页品牌
indexBrandSwiper();
function indexBrandSwiper(){
 var swiper = new Swiper('.index_brand_swiper', {
      //slidesOffsetBefore : 15, //设定slide与左边框的预设偏移量（单位px）
      //slidesOffsetAfter : 20, //设定slide与右边框的预设偏移量（单位px）
      spaceBetween: 1, 
      slidesPerView :2.45,//显示个数
      slidesPerColumn: 2,//显示2行
      paginationClickable: true,
      //freeMode: true, //是否整个移动
      freeModeMomentumRatio : 1,
      //autoplay: 2500,//2500毫秒播放一次
      //loop : true, //环路
      //autoplayDisableOnInteraction: false, //手指滑动后还自动播放
      noSwiping : true,
      noSwipingClass : 'stop-swiping',
      //allowSwipeToPrev : false, //只能滑下一页
      //allowSwipeToNext : false, //只能滑上一页       
      //initialSlide :1,//初始化到第几页
      //swipeHandler : '.swipe-handler', //禁止触摸滑动
      //followFinger : false, //拖动后释放鼠标或手指时slide滑动
    }); 
}



//本周最新
indexNewTswkSwiper();
function indexNewTswkSwiper(){
 var swiper = new Swiper('.index_new_tswk_swiper', {
      pagination: {
        el: '.index_new_tswk_pagination', //分页器
      },
      spaceBetween: 10,
      slidesPerView: 1,//显示个数
      paginationClickable: true,
      //freeMode: true, //是否整个移动
      freeModeMomentumRatio : 1,
      //autoplay: 2500,//2500毫秒播放一次
      loop : true, //环路
      //autoplayDisableOnInteraction: false, //手指滑动后还自动播放
      noSwiping : true,
      noSwipingClass : 'stop-swiping',
      //allowSwipeToPrev : false, //只能滑下一页
      //allowSwipeToNext : false, //只能滑上一页       
      //initialSlide :1,//初始化到第几页
      //swipeHandler : '.swipe-handler', //禁止触摸滑动
      //followFinger : false, //拖动后释放鼠标或手指时slide滑动
    }); 
}


//首页 产品推荐
indexGoodsRecommendSwiper();
function indexGoodsRecommendSwiper(){
 var swiper = new Swiper('.index_goods_recommend_swiper', {
      slidesOffsetBefore : 10, //设定slide与左边框的预设偏移量（单位px）
      slidesOffsetAfter : 10, //设定slide与右边框的预设偏移量（单位px）
      spaceBetween: 10,
      slidesPerView: 3.7,//显示个数
      paginationClickable: true,
      //freeMode: true, //是否整个移动
      freeModeMomentumRatio : 1,
      //autoplay: 2500,//2500毫秒播放一次
      //loop : true, //环路
      //autoplayDisableOnInteraction: false, //手指滑动后还自动播放
      noSwiping : true,
      noSwipingClass : 'stop-swiping',
      //allowSwipeToPrev : false, //只能滑下一页
      //allowSwipeToNext : false, //只能滑上一页       
      //initialSlide :1,//初始化到第几页
      //swipeHandler : '.swipe-handler', //禁止触摸滑动
      //followFinger : false, //拖动后释放鼠标或手指时slide滑动
    }); 
}


//控制底部导航数字长度
// indexCartNum();
// function indexCartNum(){
//   var num = document.querySelector('.index_cart_num');
//       if( num.innerHTML*1 > 99 ){
//         num.innerHTML = "99+";
//       }
// }

//首页点赞
var oIndexZan = $('.index_zan_num').text(),
    oIndexZanNum = 0,
    oIndexZanIsChange = true;
function index_zan(){
  if( oIndexZanIsChange ){
    oIndexZanIsChange = false;
    oIndexZanNum ++
    $('.index_zan_num').text( oIndexZan*1 +oIndexZanNum );
    $('.index_zan_xin').addClass('on');
  }else{
    alert('您已经点过赞了！');
  }
}


ToScroll()
function ToScroll(){
  //$(document).height() //是获取整个页面的高度
  //$(window).height()   //获取浏览器窗口的高度
  var Distance=$(document).height()-$(window).height()
  $(document).scroll(function() {
    if($(this).scrollTop()>0 && $(this).scrollTop()<Distance){
      $('.Totop').fadeIn(500);
    }else if($(this).scrollTop()==0){
      $('.Totop').fadeOut(500);
    }
  });
}
// 返回顶部
function Totop(){
  var speed=200;//滑动的速度
  $('body,html').animate({ scrollTop: 0 }, speed);
  return false;
}

//收缩页 收缩按钮
function search_btn(){
  var txt = $('.search_input').val();
  if (txt === '') {
    alert('请输入搜索内容！')
  };
}

// 商品详情页 banner轮播
goodsDetailsBannerSwiper();
function goodsDetailsBannerSwiper(){
 var swiper = new Swiper('.goods_details_banner_swiper', {
      pagination: {
        el: '.goods_details_banner_pagination', //分页器
      },
      spaceBetween: 10,
      slidesPerView: 1,//显示个数
      paginationClickable: true,
      freeModeMomentumRatio : 1,
      autoplay: 2500,//2500毫秒播放一次
      loop : true, //环路
      noSwiping : true,
    }); 
}

//商品详情 加入购物车
function goods_details_add_cart(){
  $('.goods_details_pop').show();
}

//商品详情 立即购买
var isGoodsDetailsNowBuy = false;
function goods_details_now_buy(){
  isGoodsDetailsNowBuy = true;
  $('.goods_details_pop').show();
}

//商品详情页 确定
function goods_details_pop_confirm(){
  if(isGoodsDetailsNowBuy){
    alert('购买成功');
    window.location = "goods_details.html"
  }else{
    alert('成功加入购物车');
  }
  $('.goods_details_pop').hide();
}


//商品详情页 关闭按钮
function goods_details_delete(){
  $('.goods_details_pop').hide();
}

//商品详情页 减
function goods_details_pop_minus(){
  var oNumber = $('.goods_details_pop_number').text();
      oNumber --
      if(oNumber<0){
        oNumber =0
        return
      }; 
      $('.goods_details_pop_number').text(oNumber);
}
//商品详情页 加
function goods_details_pop_add(){
  var oNumber = $('.goods_details_pop_number').text();
      oNumber ++
      $('.goods_details_pop_number').text(oNumber);
}

//提醒发货
 var isReminderDelivery = false;
function ReminderDelivery(){
  if(!isReminderDelivery){
      isReminderDelivery = true;
      $('.my_order_reminder_delivery').addClass('on');
      alert('已提醒卖家发货！');
  }
}

//退换货 选择
myReturnExchange();
function myReturnExchange(){
  var oReturnExchange = document.querySelectorAll('.my_return_exchange_btn span'),
      length = oReturnExchange.length;
        index = 0;
        for(var i=0; i<length; i++){
          oReturnExchange[i].index = i;
          oReturnExchange[i].onclick = function (){
           oReturnExchange[index].className = '';
           index = this.index;
           this.className = 'on';
          }
        }
}

//专题页 收藏
subjectLike();
function subjectLike(){
  var oSubjectLike = document.querySelectorAll('.subject_like');
      for( var i=0; i<oSubjectLike.length; i++ ){
        oSubjectLike[i].onclick = function (){
          if( this.className === 'subject_like on' ){
              this.className = 'subject_like';
          }else{
            this.className = 'subject_like on';
          }
        }
      }
}

/*首页 热销榜单 轮播 start*/
memberSlider()
  function memberSlider() {
    var container = $('.index_hot_ranking_swiper');
    function slider(container) {
      var item = container.find('.figures .figure-img');
      var panel = container.find('.figure-cnt li');
      var itemParent = item.parent();
      var itemLen = item.length;
      var rebuildedItem = item;
      var index = -1;
      var panelIndexCache = -1;
      function setPanel(index) {
        panel.eq(index).fadeIn();
        if(panelIndexCache >= 0) {
          panel.eq(panelIndexCache).fadeOut()
        }
        panelIndexCache = index
      }
      function setAction(item, type) {
        if(!item.length) {
          return;
        }
        //item.removeClass();
        if(type === 'fadeInFromRight') {
          item.addClass('fadein-from-right the-right');
        } else if(type === 'rightToCenter') {
          item.addClass('right-to-center the-center');
        } else if(type === 'centerToLeft') {
          item.addClass('center-to-left the-left');
        } else if(type === 'fadeoutFromLeft') {
          item.addClass('fadeout-from-left');
        } else if(type === 'fadeInFromLeft') {
          item.addClass('fadein-from-left the-left');
        } else if(type === 'leftToCenter') {
          item.addClass('left-to-center the-center');
        } else if(type === 'centerToRight') {
          item.addClass('center-to-right the-right');
        } else if(type === 'fadeoutFromRight') {
         // item.addClass('fadeout-from-right');

        }
      }
      function go(direction) {
        item.removeClass().addClass('figure-img');
        if(direction === 'left') {
          index++;
          if(index >= itemLen) {
          index = 0; //环路
          //index = itemLen-1; //不环路
          }

          //小圆点变色
          $('.xiabiao li').eq(index).addClass('on').siblings().removeClass();
          setAction(rebuildedItem.eq(index - 2 < 0 ? itemLen + index - 2 : index - 2), 'fadeoutFromLeft');
          setAction(rebuildedItem.eq(index - 1 < 0 ? itemLen - 1: index - 1), 'centerToLeft');
          setAction(rebuildedItem.eq(index), 'rightToCenter');
          setAction(rebuildedItem.eq(index + 1 > itemLen - 1 ? 0 : index + 1), 'fadeInFromRight');

        } else if(direction === 'right') {
          index--;
          if(index <= -1) {
          index = itemLen - 1; //环路
          //index = 0; //不环路
          //console.log(index)
          }

          //小圆点变色
          $('.xiabiao li').eq(index).addClass('on').siblings().removeClass();
          //console.log('current inde: ' + index)
          setAction(rebuildedItem.eq(index + 2 > itemLen - 1 ? index + 2 - (itemLen - 1): index + 2), 'fadeoutFromRight');
          setAction(rebuildedItem.eq(index + 1 > itemLen - 1  ? itemLen - index - 1 : index + 1), 'centerToRight');
          setAction(rebuildedItem.eq(index), 'leftToCenter');
          setAction(rebuildedItem.eq(index === 0 ? itemLen - 1 : index - 1), 'fadeInFromLeft');
        }
        setPanel(index);
      }

      function bindEvent() {
        container.find('.figures').on({
          'swipeLeft': function(ev) {
            go('left')
          },
          'swipeRight': function(ev) {
            //console.dir(1)
            go('right')
          }
        });

        //这是本来默认点击左右图片切换的
        /*rebuildedItem.on('tap', function() {
          var _this = $(this)
          if(_this.hasClass('the-left')) {
            go('right')
          } else if(_this.hasClass('the-right')) {
            go('left')
          }
        })*/

        //滑动方向
        var c = $('.index_hot_ranking_swiper').get(0);
        function GetSlideAngle(dx, dy) {
            return Math.atan2(dy, dx) * 180 / Math.PI
          }
          function GetSlideDirection(startX, startY, endX, endY) {
            var dy = startY - endY;
            var dx = endX - startX;
            var result = 0;
            if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
              return result
            }
            var angle = GetSlideAngle(dx, dy);
            if (angle >= -45 && angle < 45) {
              result = 4
            } else if (angle >= 45 && angle < 135) {
              result = 1
            } else if (angle >= -135 && angle < -45) {
              result = 2
            } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
              result = 3
            }
            return result
          }
          var startX, startY;
          c.addEventListener('touchstart', function(ev) {
            startX = ev.touches[0].pageX;
            startY = ev.touches[0].pageY
          }, false);
          c.addEventListener('touchend', function(ev) {
            var endX, endY;
            endX = ev.changedTouches[0].pageX;
            endY = ev.changedTouches[0].pageY;
            var direction = GetSlideDirection(startX, startY, endX, endY);
            switch (direction) {
            case 0:
              break;
            case 1: //上

              break;
            case 2: //下

              break;
            case 3: //左
              //if($('.button_next').hasClass('the-right')) {
                go('left')
              //}
              break;
            case 4: //右
              //if($('.button_prev').hasClass('the-left')) {
                go('right')
              //}
              break;
            default:
            }
          }, false);

      }
      function init(){
        //go('left');
        go('right');
        bindEvent();
      }
      init();
    }
    container.each(function() {
      var _this = $(this);
      slider(_this);
    });
  }
/*首页 热销榜单 轮播 end*/


$(function (){
  //商品详情页 选择商品详情或尺寸
  $('.goods_details_tab_title span').click(function (){
    $(this).addClass('on').siblings().removeClass('on');
    $('.goods_details_tab_content li').eq($(this).index()).addClass('on').siblings().removeClass('on');
  });

  //商品详情页 选择颜色
  $('.goods_details_pop_option_pigment li').click(function (){
    //console.log($(this).index());
    $(this).addClass('on').siblings().removeClass('on');
  });
  //商品详情页 选择尺寸
  $('.goods_details_pop_option_size li').click(function (){
    //console.log($(this).index());
    $(this).addClass('on').siblings().removeClass('on');
  });

  // 我的收藏
  $('.my_collect_tab span').click(function (){
    $(this).addClass('on').siblings().removeClass('on');
    $('.my_collect_tab_box_in').eq($(this).index()).show().siblings().hide();
  });

});












