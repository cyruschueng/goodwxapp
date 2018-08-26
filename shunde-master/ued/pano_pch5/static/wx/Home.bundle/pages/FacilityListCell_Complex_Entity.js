module("FacilityListCell_CE_item.xml",function(render_item){
  return function(view) {

      view.create=function(entityGroup){

        view.$("tv_title").setText(entityGroup.name);//旅游景点

        for(var i=0;i<entityGroup.entityList.length;i++){//创造子DOM

          var view_item=render_item();
          view_item.create(entityGroup.entityList[i]);
          view.addView(view_item);

        }


      };




  }
});
