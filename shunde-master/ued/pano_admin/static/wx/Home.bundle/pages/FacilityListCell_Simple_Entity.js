module("item.xml",function(render_item){
  return function(view) {

      view.create=function(facilityGroup){

        view.$("tv_title").setText(facilityGroup.name);//旅游景点

        for(var i=0;i<facilityGroup.facilityList.length;i++){//创造子DOM

          var view_item=render_item();
          view_item.setTitle(facilityGroup.facilityList[i].name);
          view.$("view_container").addView(view_item);

        }


      };




  }
});
