module ("top_sheet_cell.xml",function (render_top_sheet_cell){
  return function(view){

      var sheet_cee_infos=[
        {
          title:"时间最新",
          shouldShow:true

        },
        {
          title:"离我最近",
          shouldShow:false
        }
      ];


      view.$("overlay").setOnClick(function(){
        view.setGone(true);
      });
      view.overlayClick=function(func){
          view.$("overlay").setOnClick(function(){
              view.setGone(true);
              if(func){
                func();
              }
          });
      };

      view.cellClick=function(func){
        createCellsByData(func);
      };

      /*函数定义*/
      function updateData(check_index){
        var array_index_of_values_updated=[];
        for(var i=0;i<sheet_cee_infos.length;i++){
          var shouldShow=(i==check_index);
          if(sheet_cee_infos[i].shouldShow!=shouldShow){
            array_index_of_values_updated.push(i);
          }
          sheet_cee_infos[i].shouldShow=shouldShow;
        }
        return array_index_of_values_updated;
      }

      function createCellsByData(func){//cell click func
        view.$("view_container").clearViews();
        for (var i=0;i<sheet_cee_infos.length;i++){
          var top_sheet_cell=render_top_sheet_cell();
          top_sheet_cell.setId(i);
          top_sheet_cell.click(function(index,title,hasChecked){
            updateCellsByData(updateData(index));
            view.setGone(true);
            if (func){func(index,title,hasChecked);}
          });
          top_sheet_cell.init(
            i,
            sheet_cee_infos[i].title,
            sheet_cee_infos[i].shouldShow
          );
          view.$("view_container").addView(top_sheet_cell);
        }
      }

      function updateCellsByData(updatedDataIndexs){
        for(var j=0;j<updatedDataIndexs.length;j++){
          var i=updatedDataIndexs[j];
          view.$("view_container").findViewByIdInMyScope(i).init(
            i,
            sheet_cee_infos[i].title,
            sheet_cee_infos[i].shouldShow
          );
        }
      }
  };
});
