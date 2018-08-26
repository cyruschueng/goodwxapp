module(function(){
  return function(view) {
      view.is_open=false;

      view.actionDependsOpen=function(is_open,title){
        if(!is_open){
          view.$("tv_prefix").setFontColor("#F5846F");
          view.$("iv").setSrc("../../images/sanjiao_up.png");
        }else{
          view.$("tv_prefix").setFontColor("#363636");
          view.$("iv").setSrc("../../images/sanjiao_down.png");
        }
        if(title){view.$("tv_prefix").setText(title);}
        view.is_open=!is_open;
      }

      view.click=function(func){
            view.$("view_sort").setOnClick(function(){
              view.actionDependsOpen(view.is_open);

                if(func){
                  func();
                }
            });
      };
  }
});
