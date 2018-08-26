module("item.xml",function(render_f){

  return function(view){

    view.create=function(cell){
      view.$("tv_title").setText(cell.name+"：");
      for(var i=0;i<cell.facilityList.length;i++){
        var view_f=render_f();
        view_f.setTitle(cell.facilityList[i].name);
        view.$("v_container").addView(view_f);
      }

    };
  };
});
