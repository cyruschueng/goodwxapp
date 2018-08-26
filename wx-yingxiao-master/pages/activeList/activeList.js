    Page({
      data:{
      menuCurrent:'0',
      swiperCurrent:'0',
      heightCurrent:'0',
      isNull:'0',
      activeClass: ['千人团购', '地域抢订', '我在现场'],
      header: ['进行中', '已结束'],
      active: [
        {
          img: '/pages/source/images/active2.png',
          title: '月亮女神前任团购活动',
          starttime: '2017-10-09',
          endtime: '2017-10-25',
          status: '1'
        },
        {
          img: '/pages/source/images/active2.png',
          title: '月亮女神前任团购活动',
          starttime: '2017-10-09',
          endtime: '2017-10-25',
          status: '1'
        },
        {
          img: '/pages/source/images/active2.png',
          title: '月亮女神千人团购活动',
          starttime: '2017-10-09',
          endtime: '2017-10-25',
          status: '1'
        },
        {
          img: '/pages/source/images/active2.png',
          title: '月亮女神千人团购活动',
          starttime: '2017-10-09',
          endtime: '2017-10-25',
          status: '1'
        },
        {
          img: '/pages/source/images/active2.png',
          title: '月亮女神我在现场活动',
          starttime: '2017-10-09',
          endtime: '2017-10-25',
          status: '0'
        },
        {
          img: '/pages/source/images/active2.png',
          title: '月亮女神前任团购活动',
          starttime: '2017-10-09',
          endtime: '2017-10-25',
          status: '0'
        },
      ]  
  },
  onLoad: function (options) {
    var that = this;
    var active = that.data.active;
    var height1 = 0,height2 = 0,height = [];
    active.forEach(function(val,index){
      if(val.status==1){
        height1++
      }else{
        height2++
      }
    })
    if(height1==0&&height2==0){
      that.setData({
        isNull:'1',
        height:[800,800]
      })
    }else{
      height.push(height1 * 325 + 10);
      height.push(height2 * 325 + 10);
      that.setData({
        height: height,
      })
    }
  },
  changeMenu:function(e){
    this.setData({
      menuCurrent:e.currentTarget.dataset.index,
      swiperCurrent:e.currentTarget.dataset.index,
      heightCurrent:e.currentTarget.dataset.index,
    })
  },
  changeSwiper:function(e){
    var that = this;
    console.log(e);
    that.setData({
      menuCurrent:e.detail.current,
      heightCurrent:e.detail.current,
    })
  }
})