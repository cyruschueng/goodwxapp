module("present.js","sort.xml","cell.xml","top_sheet.xml",function (P,render_sort,render_cell,render_top_sheet) {

  var View = com.vizengine.view.View;

  return function (page) {

        //view定义
        var sv=page.$("sv");


        //添加排序view
        var view_sort=render_sort();
        var top_sheet;
        view_sort.click(function(){
          if(!top_sheet){//如果容器里还没有top_sheet的dom，初始化top_sheet
            top_sheet=render_top_sheet();
            top_sheet.overlayClick(function(){//遮罩层点击事件
              view_sort.actionDependsOpen(true);//现在是展开的，所以传入true
            });
            top_sheet.cellClick(function(index,title,hasChecked){//top_sheet的子cell点击事件【此事件必须要写，index代表cell的位置，title代表cell的内容】
              view_sort.actionDependsOpen(true,title);//传入是否展开sort以及sort的标题
              if(!hasChecked){
                page.$("sv").clearViews();
                getP().fetch_tasks(index==0?"time":"distance");
              }
            });
            page.$("view_top_sheet_container").addView(top_sheet);
          }else {
            top_sheet.setGone(!top_sheet.gone);
          }
        });
        page.$("view_sort_container").addView(view_sort);

        //scrollview
        sv.onScrollCallback=function(){
          var b=sv.scroll
          console.log("b："+b);
        };
        //获取数据
        getP().fetch_tasks();










        /*
        *
        *   函数的定义
        *
        * */

        var p
        function getP(){
          if(!p){p=new P(success_fetch_tasks,error_fetch_tasks);}
          return p;
        }
        /*
        * 成功获取到数据
        * */
        function success_fetch_tasks(total,tasks){
            for(var i=0;i<tasks.length;i++){
              console.log("tasks[i]");
              console.log(tasks[i]);
              var view_cell=render_cell();
              view_cell.init(
                tasks[i].name,//title
                tasks[i].cityName+tasks[i].countyName,//adr
                tasks[i].applicationCount,//shenqinCount
                tasks[i].shotCount,//dianweiCount
                tasks[i].days+"天前发布"//time
              );
              page.$("sv").addView(view_cell);
            }
        }
        /*
        * 失败获取到数据
        * */
        function error_fetch_tasks(){

        }

  }

})
