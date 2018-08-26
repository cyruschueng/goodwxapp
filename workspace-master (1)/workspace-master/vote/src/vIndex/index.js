define(function(require,exports,module){
    var $ = require("$");
    var setup = require("setup");
    
    //公告滚动
    var Swiper = require("swiper");

    var Engine = require("engine");
    var box = Engine.init();

    var footerNav = require("../common.footernav/index");
    var wxShare = require("../common.wxShare/index");
    
    var vote = {
        activityId: $("#activityId").val(),
        openId: $("#openId").val(),
        timesBackwards: function(){
            var me = this;
            function timesChange(times){
                var me = this;
                var timerBox = $("#timer");
                var d = h = m = s = 0;
                if(times > 0){
                    d = Math.floor((times / 86400)) > 0 ? zero(Math.floor((times / 86400))) : "00";

                    times = (times - d*86400);
                    h = Math.floor(times/3600) > 0 ? zero(Math.floor(times /3600)) : "00";

                    times = (times - h*3600);
                    m = Math.floor(times / 60) > 0 ? zero(Math.floor(times / 60)) : "00";
                    
                    times = (times - m*60);
                    s = Math.floor(times) > 0 ? zero(Math.floor(times)) : "00";


                    function zero(t){
                        return t>9 ? t : "0"+t;
                    }
                  
                    var str_time = d+"<span class='timain'>天</span>"+h+"<span class='timain'>时</span>"+m+"<span class='timain'>分</span>"+s+"<span class='timain'>秒</span>";
                    
                    timerBox.html(str_time);
                }
            }
            

            setInterval(function(){
                var now, end, times;
                var strings = ($("#endTime").val()).replace(/\-/g,"/");
                end = new Date(strings).getTime();
                now = new Date().getTime();
                times = (end - now)/1000;
                if(times>0){
                    timesChange(times)
                }else{
                    $(".countdown .p1").html("");
                    $("#timer").html("该活动已结束！").addClass("lh58");
                }
                
            }, 1000);
            //阻止表单的默认行为
            $('.search').on('submit', '.input-kw-form', function(event){
                event.preventDefault();
            });
        },
        tabClick: function(){
            var me = this;
            $(".weui-navbar__item").click(function(){
                var self = $(this);
                var index = self.index();
                $(".weui-navbar__item").removeClass("weui-bar__item--on");
                self.addClass("weui-bar__item--on");
                me.getActivityApplyUserSort(me.activityId,index+1,me.openId);
                return false;
            });
        },
        //活动投票设置
        getActivityVoteConfig: function(){
            var me = this;
            setup.commonAjax("vote/getActivityVoteConfig.do", {activityId: me.activityId}, function(msg){ 
                //console.logsole.log(JSON.stringify(msg,null,2));
                $(".news p").html(msg.voteConfig.message);
                var mySwiper1 = new Swiper ('#swiper1', {
                    direction: 'horizontal',
                    loop: true,   
                    autoplay: 3000
                });

                //给脚部报名按钮添加链接
                footerNav.init({
                    activityId: $("#activityId").val(),
                    openId: $("#openId").val(),
                    activityUrl: msg.activity.activityUrl,
                    host: location.host
                });
            });
        },
        //活动数据
        getActivityData: function(){
            var me = this;
            setup.commonAjax("vote/getActivityData.do", {activityId: me.activityId}, function(msg){ 
                // console.log(JSON.stringify(msg,null,2));
                $(".main .realtimeInfor #playerNum").html(msg.sumApplyUser);
                $(".main .realtimeInfor #addVote").html(msg.sumVotes);
                $(".main .realtimeInfor #accessNum").html(msg.sumPageView);
            });
        },
        //排名查询
        getActivityApplyUserSort: function(activityId, sortKey, openId){
            var me = this;
            var params = params = {activityId: activityId,sortKey:sortKey, openId: openId};
            setup.commonAjax("vote/getActivityApplyUserSort.do", params, function(msg){ 
                //console.log(JSON.stringify(msg,null,2));
                if(msg.sortUser.length<1 && !msg.currentUser){
                    $(".main .inforTab .noInfor").show().siblings().hide();
                }else{
                    var voteStatus = msg.currentUser;
                    if(voteStatus){
                        msg.currentUser.voteOpenid = $("#openId").val();
                        msg.currentUser.host = location.host;
                        if(sortKey == 3){
                            if(msg.currentUser.votesRank == 1){
                                msg.currentUser.topImg = "top1.png" ;
                                msg.currentUser.votesRank = "";
                            }else if(msg.currentUser.votesRank == 2){
                                msg.currentUser.topImg = "top2.png" ;
                                msg.currentUser.votesRank = "";
                            }else if(msg.currentUser.votesRank == 3){
                                msg.currentUser.topImg = "top3.png" ;
                                msg.currentUser.votesRank = "";
                            }else{
                                msg.currentUser.topImg = "top4.png" ;
                            }
                        }
                    }
                    
                    $.each(msg.sortUser, function(i,v){
                        v.voteOpenid = $("#openId").val();
                        v.host = location.host;
                        //排行有突出
                        if(sortKey == 3){
                            if(v.votesRank == 1){
                                v.topImg = "top1.png" ;
                                v.votesRank = "";
                            }else if(v.votesRank == 2){
                                v.topImg = "top2.png" ;
                                v.votesRank = "";
                            }else if(v.votesRank == 3){
                                v.topImg = "top3.png" ;
                                v.votesRank = "";
                            }else{
                                v.topImg = "top4.png" ;
                            }
                        }
                    });


                    //路径
                    var sort1 = require("../../src/vIndex/index.tpl");
                    box.render($(".inforTab #tab1 ul"), msg, sort1);
                    var w = $(".applyImage").width();
                    $(".applyImage").css("height", w*0.7 + "px");
                }  
                
            });
        },

        //搜索框
        searchBar:function(){
            $(".search input").keydown(function(event){ //键盘事件，按下按键触发
                if (event.keyCode==13){
                    var playInfor = $(".search input").val();
                    location.href = $("#base").val()+ "vote/vSearch.html?search="+playInfor+"&activityId="+ $("#activityId").val()+"&openId="+$("#openId").val();
                };
            });
            $(".main .checkSear").delegate("#weSearch", "click", function () {
                var playInfor = $(".search input").val();
                location.href = $("#base").val()+ "vote/vSearch.html?search="+playInfor+"&activityId="+ $("#activityId").val()+"&openId="+$("#openId").val();  
            });

        },
        checkHasApply: function(log){
            var me = this;
            var params = {
                activityId: me.activityId,
                openId: me.openId,
            };
            setup.commonAjax("vote/checkHasApply.do", params, function(msg){ 
                $(".main #apply").show(); 
            },function(){}, 1);
        }
    };

    vote.timesBackwards();    
    vote.tabClick();
    vote.checkHasApply();

    vote.getActivityVoteConfig();
    vote.getActivityData();
    vote.getActivityApplyUserSort(vote.activityId, 1, vote.openId);
    vote.searchBar();


    (function() {
      var hm = document.createElement("script");
      var n= $("#activityId").val();
      var url = "http://www.iliujia.com/liujia-data-gather-server/js.js?h5|"+n;
      hm.src = url +"|"+ encodeURIComponent(window.location.href)+"|"+encodeURIComponent($("#openId").val());
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);


      var hm = document.createElement("script");
      hm.src = "//hm.baidu.com/hm.js?872417171834250a8a2847b664936c77";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();

    //首页分享
    wxShare.getJsConfig("", 1);
});