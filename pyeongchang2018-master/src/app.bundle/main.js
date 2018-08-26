/**
 * Created by GUQIANG on 2017/9/27.
 */
module("/page/page.js","util/util.js",function (render) {

    return function () {

        var page = render;
        var View = com.vizengine.view.View;
        View.prototype.setNativeAttrClass = function(className){
            if(this && this._nativeView && this._nativeView.div){
                this._nativeView.div.setAttribute("class", className);
            }
        }
        window.hidePageLoading = function() {
            var loadingDiv = document.getElementById("loadingDiv");
            loadingDiv.style.display="none";
        };
        window.showPageLoading = function() {
            var loadingDiv = document.getElementById("loadingDiv");
            loadingDiv.style.display="block";
        };
        return page;
    }

})