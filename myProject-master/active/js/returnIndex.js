$(function(){
	//监听微信浏览器的返回事件
    pushHistory();
    var bool=false;
    setTimeout(function(){
        bool=true;
    },1500);
    window.addEventListener("popstate", function(e) {
        if(bool)
        {
        	alert("监听到了返回");
            window.location.href = "index.html";
        }
        pushHistory();

    }, false);
    function pushHistory() {
        var state = {
            url: "index.html"
        };
        window.history.pushState(state, "index.html");
    }
})