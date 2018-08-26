module(function(){
  return function(view) {

    view.setTitle = function(title) {
      view.$("tv_title").setText(title);
    }
  }
});
