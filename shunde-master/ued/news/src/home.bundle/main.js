require("/home/page.js", "/common/common.js", function(render){
    rootView._interceptedPanotileUrl = window.urlProvider('panotiles');
    var preload = function() {
        var imageUrls = [];
        var callback = null;
        for(var i = 0 ; i < arguments.length; i++) {
            if(arguments[i] instanceof Function) {
                callback = arguments[i];
            } else {
                imageUrls.push(arguments[i]);
            }
        }

        if(!imageUrls.length){
            callback();
            return;
        }
        
        var loadedCount = 0;
        for(var i = 0 ; i < imageUrls.length; i++) {
            var imgEle = document.createElement("img");
            imgEle.onload = function() {
                loadedCount++;
                if(loadedCount == imageUrls.length) {
                    callback();
                }
            }
            imgEle.src = imageUrls[i];
        }
    }
    
    window.hidePageLoading = function(el) {
        var loadingDiv = document.getElementById("vizenLoadingDiv");
            loadingDiv.style.display="none";
    }
    /**
     * 预加载，避免白屏
     */
    preload(
        function(){
            // hidePageLoading();
        }
    );
    return render;
});