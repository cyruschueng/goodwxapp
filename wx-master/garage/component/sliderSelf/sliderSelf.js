var SliderData={
  '_slider_self_.offsetLeft':0,
  '_slider_self_.width':0,
  '_slider_self_.target':0,
  '_slider_self_.percentage':'0%'
}
var app = getApp();
let scale = app.globalData.systemInfo.screenWidth / 750;
var SliderSelf={
  sliderSelf_x:'',
  sliderSelf_xx:'',
  sliderSelf_dis:'',
  sliderSelf_offsetLeft:'',
  _sliderTouchStart: function (e) {
    var target = e.changedTouches[0];
    this.sliderSelf_offsetLeft = e.target.offsetLeft;
    this.sliderSelf_x = target.clientX;
  },
  _sliderTouchMove: function (e) {
    var target = e.changedTouches[0],
         barWidth=this.data._slider_self_.width,
         diff1=scale*23,
         diff2=scale*25,
         diff3=(diff1+diff2)/2;

    this.sliderSelf_xx = target.clientX;
    this.sliderSelf_dis = this.sliderSelf_xx - this.sliderSelf_x + this.sliderSelf_offsetLeft;

    if(this.sliderSelf_dis<=-diff1){
        this.setData({ '_slider_self_.offsetLeft':-diff1 ,'_slider_self_.target':0,'_slider_self_.percentage':'0%'})
    }else if(this.sliderSelf_dis>=barWidth-diff2){
        this.setData({ '_slider_self_.offsetLeft': barWidth-diff2,'_slider_self_.target':1,'_slider_self_.percentage':'100%'})
    }else{
        this.setData({ '_slider_self_.offsetLeft': this.sliderSelf_dis,'_slider_self_.target':((this.sliderSelf_dis+diff3)/barWidth).toFixed(2),'_slider_self_.percentage':Math.floor(((this.sliderSelf_dis+diff3)/barWidth).toFixed(2)*100)+'%'})
    }

  },
  _sliderTouchEnd: function (e) {
    var target = e.changedTouches[0];
    this.sliderSelf_x = target.clientX;
  },

}

module.exports={
  SliderSelf,
  SliderData
}
