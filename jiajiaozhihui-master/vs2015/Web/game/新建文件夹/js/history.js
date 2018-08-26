$(function () {
    $("#btnError").click(function () {
        $(this).parent().attr("class", "active");
        $("#btnRight").parent().removeAttr("class");
        $(".collapse").collapse("hide");
        $(".navbar-brand").text($(this).text());
        getData(0);
    })

    $("#btnRight").click(function () {
        $(this).parent().attr("class", "active");
        $("#btnError").parent().removeAttr("class");
        $(".collapse").collapse("hide");
        $(".navbar-brand").text($(this).text());
        getData(1);
    })
})
function getData(type) {
    $.ajax({
        url: "../provide/history.ashx",
        type: "POST",
        dataType: "json",
        async: false,
        data: "activeid=" + $("#hfQuestionActiveid").val() + "&openid=" + $("#hfOpenID").val().replace(/\+/g, '%2B') + "&type=" + type + "&method=getquesstion",
        beforeSend: function () {
            $("#request").show();
        },
        complete: function () {
            $("#request").hide();
        },
        success: function (data) {
            if (!jQuery.isEmptyObject(data.ds)) {
                var li = "";
                $.each(data.ds, function (index, context) {
                    li += "<div class='panel panel-default' style=' margin-bottom:10px;'>";
                    li += "<div class='panel-heading' role='tab' id='heading" + context.ID + "'>";
                    li += "<h4 class='panel-title'>";
                    if (index == 0) {
                        li += "<a role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse" + context.ID + "' aria-expanded='true' aria-controls='collapse" + context.ID + "'>";
                    }
                    else {
                        li += "<a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse" + context.ID + "' aria-expanded='false' aria-controls='collapse" + context.ID + "'>";
                    }
                    li += context.testquestion;

                    li += "</a>";
                    li += "</h4>";
                    li += "</div>";
                    if (index == 0) {
                        li += "<div id='collapse" + context.ID + "' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='heading" + context.ID + "'>";
                    }
                    else {
                        li += "<div id='collapse" + context.ID + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + context.ID + "'>";
                    }

                    li += "<div class='panel-body'>";

                    if (context.accessoryurl != "") {
                        li += "<div class='row'>";
                        li += "<div class='col-xs-12 thumbnail' style='border:none'>";
                        li += "<img src='" +context.accessoryurl + "'";
                        li += "</div>";
                        li += "</div>";
                    }

                    li += "<div class='row'>";
                    /*
                    li += "<div class='col-xs-6'>" + context.answer1.replace("/a", "") + "</div>";
                    li += "<div class='col-xs-6'>" + context.answer2.replace("/b", "") + "</div>";
                    li += "<div class='col-xs-6'>" + context.answer3.replace("/c", "") + "</div>";
                    li += "<div class='col-xs-6'>" + context.answer4.replace("/d", "") + "</div>";
                    */
                    li += formatAnswer(context, context.answer1, "a");
                    li += formatAnswer(context, context.answer2, "b");
                    li += formatAnswer(context, context.answer3, "c");
                    li += formatAnswer(context, context.answer4, "d");
                    li += "</div>";
                    li += "</div>";
                    li += "</div>";
                    li += "</div>";
                })
                $("#accordion").empty();
                $("#accordion").append(li);
            } else {
                $("#accordion").empty();
            }
        }
    })
}
function formatAnswer(context,title,answer) {
    var result="";
    var rightAnswer=context.rightanswer.toLocaleLowerCase();
    var selectAnswer=context.SelectAnswer.toLocaleLowerCase();
    if (selectAnswer == answer){
        if (rightAnswer == answer){
            result="<div class='col-xs-6  text-center ' ><span class='btn btn-default select select-right'>" +title.replace("/" + answer + "", "") + "</span></div>";
        }
        else
        {
            result = "<div class='col-xs-6 text-center ' ><span class='btn btn-default select select-error'>" + title.replace("/" + answer + "", "") + "</span></div>";
        }
    }
   else if(answer == rightAnswer){
        result = "<div class='col-xs-6 text-center ' ><span class='btn btn-default select select-right'>" + title.replace("/" + answer + "", "") + "</span></div>";
   }else{
        result = "<div class='col-xs-6 text-center '><span class='btn btn-default select'>" + title.replace("/" + answer + "", "") + "</span></div>";
    }
    return result;
}

