$(function(){
    $("button").bind("click", function(){
        var turnTo = $(this).attr("turnTo");
        // for backgroud changing
        var bg = $("#p_bg");
        var bg_fill = bg.css("fill")
        bg.css("fill", bg_fill).css("animation", turnTo + "_bg 2s ease both")
        // for lowpoly changing
        $.each($("path"), function(i, n){
            var d = $(n).css("d");
            var fill = $(n).css("fill");
            $(n).css("d", d).css("fill", fill);
            $(n).css("animation", turnTo + "" + (i+1) + " 2s ease both");
        });
    })
})
