(function ($) {
    function getGuWen(id) {
        $.getJSON("/App/Project/Information/Controller/InfoController.ashx?method=info", { id: id }, function (result) {
            $("#caption").text(result.caption);
            $("#detail").html(result.detail);
        })
    }
    getGuWen(10);
})(jQuery)