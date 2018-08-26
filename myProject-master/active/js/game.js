$(function(){
    // var gameUrl = window.localtion.href;
    // console.log(gameUrl);
//获取上个页面传过来的城市id
    GetQueryString=function (name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    };
//获取用户选择城市，跳转到对应背景图
    var url = GetQueryString("city");
    $(".container").css({
        "background-image": "url(img/game_" + url + ".png)",
        "background-position": "center top",
        "background-size": "100%"
    });
// var code = GetQueryString("getc");
    var tokenc = GetQueryString("getSpeak");
    console.log(tokenc);
    console.log(window.location.search.substr(1));
//获取所有题目列表
    function getAnswer(){
        var result;
        $.ajax({
            type:"get",
            dataType:'json',
            url: "http://m.benxiangbentu.cn/api/h5/wxQuestion/getwxQuestions?cityId=" + url,
            async:false,//这里选择异步为false，那么这个程序执行到这里的时候会暂停，等待
            success : function(data){
                result = data.data;
            }
        });
        return result;
    }
    var data = getAnswer();//服务器返回的十道题信息
    var num = 1;
    var index;//li索引
    var answer;//对应一道题的选项
    var answerId;//用户选择的答案id
    var qoestionStem;//题干
    var dataList;//存放十道题信息
    var obj = {};//将题干与选项衔接，便于转换json
    var objNum = [];//存放十道题的题干id
    var objId = [];//存放用户选择的选项id
    function questions(){
        var li = "";
        dataList = data;
        qoestionStem = dataList[num-1].stem;
        answer = dataList[num-1].wxChoosableAnswerList;
        var li = "";
        for(var i=0;i<answer.length;i++) {
            li += "<li class='img_input_no'><span class='questions'>" + answer[i].content + "</span></li>";
        }
        $(".answer_title").append(li);
        $(".game_title").html(qoestionStem);
        $(".answer_title li").click(function(){
            //点击当前选项，更改下一题的按钮颜色，同时记录用户当前点击选项的题干以及选项的索引，在点击下一题确定按钮的时候赋值
            $(this).addClass("img_input_yes").siblings().removeClass("img_input_yes");
            $(".next").addClass("nextOne");
            index = $(this).index();
            answerId = answer[index].id;
            questionId = dataList[num-1].id;
        })
    }
    questions();
//点击下一题
    $("#next").click(function () {
        //防止未选择答案点击下一题
        if ($(".answer_title li").hasClass("img_input_yes")){
        }else if(!($(".answer_title li").hasClass("img_input_yes"))){
            alert("请选择你的答案");
            return false;
        };
        //获取用户点击的题目以及选择的答案
        objNum.push(questionId);
        objId.push(answerId);
        for(var j=0;j<objNum.length;j++){
            obj[objNum[j]] = objId[j];
        }
        if(num<=9){
            num++;
        }else if(num==10){
            $(".game_num_str").html(10);
        }
        $(".answer_title").html("");
        $(".game_num_str").html(num);
        $(".next").removeClass("nextOne");
        if(num<10) {
            questions();
        }else if(num==10){
            //选项是第十题
            $(".next").addClass("sub");
            var dataList = data;
            var qoestionStem = dataList[num-1].stem;
            var answer = dataList[num-1].wxChoosableAnswerList;
            var li = "";
            for(var i=0;i<answer.length;i++) {
                li += "<li class='img_input_no'><span class='questions'>" + answer[i].content + "</span></li>";
            }
            $(".answer_title").append(li);
            $(".game_title").html(qoestionStem);
            $(".answer_title li").click(function(){
                $(this).addClass("img_input_yes").siblings().removeClass("img_input_yes");
                $(".next").addClass("subMit");
                index = $(this).index();
                answerId = answer[index].id;//用户选择的答案id
                questionId = dataList[num-1].id;
            });
            objNum.push(questionId);
            objId.push(answerId);
        }
        console.log(obj);
        console.log(tokenc);
        //判断选择到第十题，并且用户已经选择过答案，根据提交按钮的背景class验证登录与请求答案匹配
        if($("#next").hasClass("subMit")){
            //document.cookie = "token =" + tokenc;
            $.ajax({
                url: "http://m.benxiangbentu.cn/api/h5/wxQuestion/verifyAnswer",
                type: 'POST',
                dataType: 'json',
                contentType:'application/json',
                data: JSON.stringify(obj),
                //添加额外的请求头
                headers : {'Access-Control-Allow-Origin':'*','token':tokenc,"Access-Control-Allow-Credentials": "true"},
                success:function(data){
                    var res = data.data;
                    console.log(data);
                    console.log(res);
                    //根据用户选择的答案与正确答案匹配，返回回答正确数量，跳转到指定分数页
                    window.location.href = "result.html?answer_num="+res;
                }
            });
        }
    });
})
