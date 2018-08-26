module("FacilityListCell_CE_cell.xml",function(render_cell){

  return function(view){

    view.create=function(entity){
      var num=entity.appearance.length+entity.facilityGroupList.length;
      view.$("tv_title").setText(entity.name+"("+num+")");//午门大殿（4）
      //创造子DOM
      //将外观列表转为实体列表
      var facilityGroup={
        name:"外观",
        facilityList:[]
      };
      for(var i=0;i<entity.appearance.length;i++){
        facilityGroup.facilityList[i]=entity.appearance[i];
      }
      entity.facilityGroupList.splice(0,0,facilityGroup);//插入实体列表

      for(var j=0;j<entity.facilityGroupList.length;j++){//实体列表
        var view_cell=render_cell();
        view_cell.create(entity.facilityGroupList[j]);
        view.addView(view_cell);
      }

    };
  };

});
