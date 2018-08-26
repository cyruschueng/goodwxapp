/**
 * Created by GUQIANG on 2017/9/27.
 */
module("/page/page.js",function (render) {

    return function () {

        var page = render;
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