window.onload=function(){
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "/font/icons/svg-symbols.svg", true);
    ajax.onload = function(e) {
        document.body.insertAdjacentHTML("afterBegin", '<div style="display:none;">' + ajax.responseText + '</div>');
    }
    ajax.send();
}

