(function ($) {
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    };
    var id = getQueryString("id");
    $.getJSON('../../App/Project/ZXS/Controller/AdvController.ashx?method=info&id=' + id, function (results) {
        $("#img").attr('src', results.imgUrl);
        $("#adv").html(results.textContent);
    })
})(jQuery)


   