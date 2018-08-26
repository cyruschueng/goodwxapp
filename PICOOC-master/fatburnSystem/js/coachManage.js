$(function(){
    getCoachList('');//获取所有教练列表；
    $('.coachM .searchCoach').on('keyup', function(){//搜索关键字显示教练列表；
        getCoachList($(this).val());
    });
    function getCoachList(name){
        var coachUrl = baseUrl+"v1/api/campAdmin/coachUrl"+"?name="+name+"&token="+token+"&roleId="+roleId;
        $.ajax({
            type: "get",
            url: coachUrl,
            dataType: "json",
            success:function(data){
                console.log('11*教练管理-获取教练列表*',data);
                if(data.result.code==200){
                    var str = '';
                    for(var i=0; i<data.resp.length; i++){
                        str += '<div class="col-xs-12 col-sm-12 coaches">'+data.resp[i].coachName+'</div>';
                    }
                    $('.coachM .aboutCoach .innerAboutCoach').empty().append(str); //教练管理列表页
                    $('.coachM .coaches:first').css({
                        'backgroundColor': '#DED9DE',
                        'borderTop': '1px solid black'
                    });
                    //初始化默认显示第一条教练信息
                    if(data.resp.length == 0){//如果没有匹配的，iframe为空；
                        $('.coachM .aboutInfo iframe').attr('src', '');
                    }else{
                        $('.coachM .aboutInfo iframe').attr('src', data.resp[0].url);
                    }
                    $('.coachM .coaches').unbind('click').click(function(){//改变背景颜色
                        $('.coachM .coaches').css('backgroundColor', '');
                        $(this).css('backgroundColor', '#DED9DE');
                        //console.log('$(this).index()',$(this).index());//index()是从0开始的；
                        $('.coachM .aboutInfo iframe').attr('src', data.resp[$(this).index()].url);
                        $('#coachLink').html(data.resp[$(this).index()].url.replace(/\&/g,'&amp;').replace(/studentList/g,'studentListPC')+"&testtype=tanchao");
                    });
                }else if(data.result.code==30000){
                    // window.location.href = 'index.html';//超时，跳转到登录页面；
                }else{
                    $(".error-main-t").html(data.message);
                    $(".errorAlert").css("display","block");
                    $(".error-main").css("margin-top",-$(".error-main").height()/2);
                }
            }
        });
    }
});