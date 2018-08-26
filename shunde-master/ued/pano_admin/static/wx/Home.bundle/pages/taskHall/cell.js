module(function(){
  return function(view) {

      view.setTitle = function(title) {
        view.$("tv_title").setText(title);
      };

      view.setAdr=function(adr){
        view.$("tv_adr").setText(adr);
      };

      view.setShenQinCount=function (shenqinCount){
        view.$("tv_shenqin_count").setText(shenqinCount);
      };

      view.setDianWeiCount=function(dianweiCount){
        view.$("tv_dianwei_count").setText(dianweiCount);
      };

      view.setTime=function(time){
        view.$("tv_time").setText(time);
      };

      view.init=function(title,adr,shenqinCount,dianweiCount,time){
        view.setTitle(title);
        view.setAdr(adr);
        view.setShenQinCount(shenqinCount);
        view.setDianWeiCount(dianweiCount);
        view.setTime(time);
      };
  }
});
