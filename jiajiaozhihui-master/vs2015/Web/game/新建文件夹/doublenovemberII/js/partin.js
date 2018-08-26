$(function () {
    $("#bookname a").click(function () {
        var values = $(this).text();
        $("#bookname button").text(values);
    });
    $("#btnComment").click(function () {
        window.location.href = $("#hfInfoUrl").val();
    });
})