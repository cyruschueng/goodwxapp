require("common/common.js","album/album.js",function(common,render){
    rootView._interceptedPanotileUrl = window.urlProvider('panotiles');
    return render;
});


