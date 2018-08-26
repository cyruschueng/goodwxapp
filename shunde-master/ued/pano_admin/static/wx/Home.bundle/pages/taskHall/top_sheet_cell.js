module (function (){
  return function(view){
    view.setTitle=function(title){
      view.$("tv_title").setText(title);
    };
    view.getTitle=function(){
      return view.$("tv_title").getText();
    };
    view.setFontColor=function(shouldShow){
      view.$("tv_title").setFontColor(shouldShow?"#F5846F":"#696969")
    }
    view.setIv=function(shouldShow){
      view.$("iv").setVisible(shouldShow);
    };

    view.click=function(func){
      view.$("view_container").setOnClick(function(){
        if(func){func(view.index,view.getTitle(),view.hasChecked);}
      });
    }



    view.init=function(index,title,shouldShow){
      view.index=index;
      view.hasChecked=shouldShow;
      view.setFontColor(shouldShow);
      view.setTitle(title);
      view.setIv(shouldShow);
    };
  };
});
