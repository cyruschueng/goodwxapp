app.controller('msgController',['$scope','$location',function($scope,$location){
    var params=$location.search();
    $scope.params={
        title:params.title,
        desc:params.desc,
        hash:params.hash,
        success:params.success&&true,
        url:params.url
    };
}]);
app.controller('myController',['$scope','myService','wxShareService',function($scope,myService,wxShareService){
    $scope.userInfo=myService.userInfo;
    $scope.memberInfo=myService.memberInfo;
    console.log("my set");
    console.log(myService.userInfo);
    wxShareService.default();
}]);
app.controller('rightController',['$scope','rightController','$location',function($scope,rightController,$location){
    $scope.checkMember=function(){
        var state= rightController.memberInfo.state;
        if(state==-1){
            //注册审核失败
            $location.path("/result").search({
                title:'审核失败！',
                success:false
            });
        }else if(state==0){
            //注册审核中
            $location.path("/result").search({
                title:'正在审核中，请耐心等待',
                desc:'',
                success:true
            });
        }else if(state==404){
            //未注册
            $location.path("/memberregist");
            $location.replace();
        }
    }
}]);
app.controller('adviceController',['$scope','myService',function($scope,myService){
    myService.getAdvice().then(function(res){
        console.log("getAdvice");
        console.log(res );
        if(res.success==true){
            $scope.info={
                src:res.url,
                exists:true
            }
        }else{
            $scope.info={
                src:'',
                exists:false
            }
        }
    })
}]);

app.controller('memberController',['$scope','memberService','$location',function($scope,memberService,$location){
    $scope.data = {
        real_name: memberService.wxUserInfo.nickName,
        telephone:'',
        parent_age:0,
        profession:'',
        city:memberService.wxUserInfo.city,
        child_sex:'',
        child_age:0,
        child_grade:''
    };
    $scope.seInValid = false;
    $scope.regist = function (isValid) {
        if (isValid) {
            $scope.seInValid = true;
            return;
        };
        var data={
            telephone:$scope.data.telephone,
            realname:$scope.data.real_name,
            childage:$scope.data.child_age,
            childsex:$scope.data.child_sex,
            childgrade:$scope.data.child_grade,
            city:$scope.data.city,
            parentage:$scope.data.parent_age,
            profession:$scope.data.profession
        };

        memberService.regist(data).then(function (res) {
            console.log(res);
            if (res.success == true && res.state==0) {
                $location.path("/result").search({
                    title: "会员注册成功",
                    desc: "请等待审核",
                    url:memberService.serverUrl+'link/gardenia/index.html',
                });
            }else if (res.success == true && res.state==1) {
                $location.path("/result").search({
                    title: "会员已被注册",
                    desc: "请核查你所填的信息，如有凝问，请加小微老师",
                    hash: "habitnews"
                });
            }else{
                $location.path("/result").search({
                    title: "会员注册失败",
                    desc: "",
                    hash: "habitnews"
                });
            }
        })
    };
    memberService.show().then(function(res){

        console.log("member info");
        console.log(res);
        if(res.success==true && res.data!=null){
            $scope.data={
                real_name:res.data.real_name,
                telephone:res.data.telephone,
                parent_age:res.data.parent_age,
                profession:res.data.profession,
                city:res.data.city,
                child_sex:res.data.child_sex,
                child_age:res.data.child_age,
                child_grade:res.data.child_grade
            };
        }

    });
}]);
app.controller('taskController',['$scope','taskService','$location','ngAudio','$document',function($scope,taskService,$location,ngAudio,$document){
    $.showLoading();
    $scope.audios=[];
    taskService.getTask().then(function(res){
        $.hideLoading();
        console.log("getTask");
        console.log(res);
        $scope.task={};
        if(res.success==true){
            $scope.task=res.task;
            if(res.task.everyDay.source!=''){
                var audio= ngAudio.load(res.task.everyDay.source);
                $scope.audios.push(audio)
            }
            if(res.task.wangMaMa.source!=''){
                var audio= ngAudio.load(res.task.wangMaMa.source);
                $scope.audios.push(audio)
            }
            console.log("audios");
            console.log($scope.audios);
        }
    });
    $scope.progressWidth = $document[0].getElementById('xl-progress-bar').clientWidth;
    $scope.setLoop=function(index){
        $scope.audios[index].loop=!$scope.audios[index].loop;
    };
    $scope.startExercise=function(id){
        globalData.exerciseActivityId=id;
        console.log("globalData.exerciseActivityId="+id);
        $location.path("/exercisetesting")
    };
    $scope.habitRank=function(id){
        globalData.habitId=id;
        $location.path("/habitrank")
    };
    $scope.memberInfo=taskService.memberInfo;
}]);

app.controller('historyEveryDayController',['$scope','historyService','ngAudio',function($scope,historyService,ngAudio){
    var audios=[];
    $scope.getEveryDayData=function(){
        historyService.getEveryDayData().then(function(res){
            console.log("getEveryDayData");
            console.log(res);
            $scope.list=res;
            for(var i=0;i<res.data.length;i++){
                var audio= ngAudio.load(res.data[i].source);
                audios.push(audio);
            }
            $scope.audio =audios[0];
        })
    };
    $scope.play=function(index){
        if(index!=$scope.index){
            $scope.audio.stop();
            $scope.audio =audios[index];
            $scope.audio.play();
            $scope.index=index;
        }else{
            if($scope.audio && $scope.audio.paused && $scope.index==index){
                $scope.audio.play();
            }else if($scope.audio && !$scope.audio.paused && $scope.index==index){
                $scope.audio.pause();
            }
        }
    };
    $scope.index=0;
    $scope.memberInfo=historyService.memberInfo;
}]);

app.controller('historyEveryWeekController',['$scope','historyService','$location',function($scope,historyService,$location){
    historyService.getEveryWeekData().then(function(res){
        console.log("historyEveryWeekController");
        console.log(res);
        $scope.list=res;
    });
    $scope.startExercise=function(id){
        globalData.exerciseActivityId=id;
        console.log("globalData.exerciseActivityId="+id);
        $location.path("/exercisetesting")
    };
    $scope.memberInfo=historyService.memberInfo;
}]);
/***************start 练习**********************/
app.controller('exerciseActivityController',['exerciseActivityService','$scope',function(exerciseActivityService,$scope){
    exerciseActivityService.activityList().then(function(res){
        $scope.activityList=res;
        console.log(res);
    })
}]);
app.controller('exerciseReadyController',['$scope','$timeout','$location','exerciseTestingService',function($scope,$timeout,$location,exerciseTestingService){
    $scope.loading=true;
    exerciseTestingService.questionList().then(function(res){
        $timeout(function () {
            $scope.loading=false;
            console.log("数据准备");
            console.log(res);
            $scope.$broadcast('questionlibrary',res);
        },1000);
    })
}]);
app.controller('exerciseTestingController',['exerciseTestingService','$scope','$interval','$timeout','$location',function(exerciseTestingService,$scope,$interval,$timeout,$location){
    $scope.questionData={
        title:'', //标题
        question:[], //答题选项
        count:10, //到计时
        right:'',
        score:0, /*分数*/
        rightIndex:-1 /*正确选项*/
    };
    $scope.userInfo={
        headImgUrl:exerciseTestingService.userInfo.headImgUrl
    };
    $scope.icon={
        selected:false, //已选择
        selectedIndex:-1, //选择的是第几项
        right:false, //答题是否正确
        busy:false //每一次答题有一秒的暂停，这段时间内点击将没有效果
    };

    $scope.resultId=[];/*答题卡 正确的答题Id*/
    $scope.resultScore=0;/*答题卡 正确的答题分数*/
    $scope.score=0;/*这次测试的分数*/
    $scope.data=null;/*这次测试的题库*/
    $scope.index=1;/*控制第几道题*/
    $scope.total=0;/*总共有多少个题目*/

    var startDate=null;
    $scope.$on('questionlibrary',function(event,data){
        $scope.data=data;
        console.log(data);
        $scope.total=data.length;
        initQuestionData();
        setQuestion(data[0]);
        start();
        startDate=new Date();

    });
    /*答题*/
    $scope.answer=function(select,index,id,score){
        if($scope.icon.busy) return;
        $scope.icon.selected=true;
        $scope.icon.selectedIndex=index;
        if(select==$scope.questionData.right){
            $scope.score+=$scope.questionData.score;
            $scope.icon.right=true;
            $scope.resultId.push(id);
            $scope.resultScore+=score;
        }
        $scope.icon.busy=true;
        var sleepTimeout= $timeout(function(){
            $scope.icon.busy=false;
            stop();
            if(existArray()){
                console.log('index='+$scope.index);
                setQuestion($scope.data[$scope.index]);
                $scope.index+= 1;
                start()
            }else{
                result();
            }
        },1500)
    };

    /*开始出题*/
    function start(){
        $scope.intervalRow=$interval(function(){
            console.log('start='+$scope.index);
            if(existArray()){
                setQuestion($scope.data[$scope.index]);
                $scope.index+=1;
            }else{
                stop();
                result();
            }
        },9000,$scope.data.length-$scope.index)
    }
    function stop(){
        if($scope.intervalRow){
            $interval.cancel($scope.intervalRow);
        }
    }
    /*设置出题的数据*/
    function setQuestion(data){
        initQuestionData();
        $scope.questionData.title=data.testQuestion;
        $scope.questionData.right=data.rightAnswer;
        $scope.questionData.score=data.score;
        $scope.questionData.rightIndex=getRightIndex(data.rightAnswer);
        $scope.questionData.question.push({index:0,id:data.iD,title:data.answer1,select:'a',score:data.score});
        $scope.questionData.question.push({index:1,id:data.iD,title:data.answer2,select:'b',score:data.score});
        $scope.questionData.question.push({index:2,id:data.iD,title:data.answer3,select:'c',score:data.score});
        $scope.questionData.question.push({index:3,id:data.iD,title:data.answer4,select:'d',score:data.score});
    }
    /*出题初始*/
    function initQuestionData(){
        $scope.questionData={
            title:'',
            question:[],
            count:10,
            rightIndex:-1
        };
        counter();
        $scope.icon={
            selected:false,
            selectedIndex:-1,
            right:false
        }
    }
    /*计数器 倒计时*/
    function counter(){
        var i=1;
        if($scope.intervalTime){
            $interval.cancel($scope.intervalTime);
        }
        var count=10;
        $scope.intervalTime= $interval(function(){
            $scope.questionData.count=count-i;
            i+=1;
        },1000,10)
    }
    /*判断有没有答完所有的题*/
    function existArray(){
        var m= $scope.data[$scope.index];
        if(m==undefined){
            return false;
        }
        return true;
    }
    /*计算正确答题是第几项*/
    function  getRightIndex(answer){
        var index=-1;
        switch (answer){
            case 'a': index=0; break;
            case 'b': index=1; break;
            case 'c': index=2; break;
            case 'd':index=3; break;
        }
        return index;
    }
    /*答完所有题后*/
    function  result(){
        var totalTime= moment().diff(startDate);//总答题时间
        $scope.isLoading=true;
        exerciseTestingService.addRecord($scope.resultId.join(','));
        exerciseTestingService.addScore($scope.resultScore,totalTime).then(function(res){
            $scope.isLoading=false;
            $location.path("/exerciseresult").search({score:res.score})
        })
    }
}]);
app.controller('exerciseResultController',['$scope','$location','exerciseResultService','exerciseRankService',
    function($scope,$location,exerciseResultService,exerciseRankService){
        $scope.score=$location.search().score;

        var values= $location.search();
        console.log(values);
        $scope.score=values.score;
        $scope.userInfo=exerciseResultService.userInfo;
        $scope.memberInfo=exerciseResultService.memberInfo;

        exerciseRankService.rankClass(10).then(function(res){
            console.log("exerciseRankService.rankClass");
            console.log(res);
            $scope.ranks=res;
        });
    }
]);

app.controller('exerciseRankController',['$scope','exerciseRankService',function($scope,exerciseRankService){

    $scope.rankMethod='全校排名';

    $scope.rankSchool=function(){
        exerciseRankService.rankSchool(20).then(function(res){
            console.log("全校排名");
            console.log(res);
            $scope.rank=res;
        })
    };

    $scope.rankClass=function(){
        exerciseRankService.rankClass(20).then(function(res){
            console.log("全班排名");
            console.log(res);
            $scope.rank=res;
        })
    };
    exerciseRankService.rankSchool(20).then(function(res){
        console.log("全校排名");
        console.log(res);
        $scope.rank=res;
    })
}]);

/***************end 练习**********************/




/***************start 习惯**********************/
app.controller('habitsMyController',['$scope','habitsMyService',function($scope,habitsMyService){
    habitsMyService.getMyHabit().then(function(res){
        console.log("habitsMyController");
        console.log(res);
        $scope.habits=res.list;
    });
}]);

/*服务器*/
app.controller('habitsNewsController',['$scope','habitsLikeService','habitsCommentService','habitsNewsService','habitsRankService','wxShareService',
    function($scope,habitsLikeService,habitsCommentService,habitsNewsService,habitsRankService,wxShareService){
        $scope.data={
            tabs:{
                names:["推荐","排行榜"],
                tabActiveIndex: 0,
                sliderOffset: 0,
                sliderLeft: 0
            },
            userInfo:habitsNewsService.userInfo,
            memberInfo:habitsNewsService.memberInfo,
            page:{
                busy:false,
                finish:false,
                start:1,
                end:10,
                loop:1,
                step:10
            }
        };

        $scope.loadMore=function(){
            $scope.load();
        };
        $scope.load=function(){
            if($scope.data.page.busy==false && $scope.data.page.finish==false){
                $scope.data.page.busy=true;
                habitsNewsService.getDetail($scope.data.page.start,$scope.data.page.end).then(function(res){
                    $scope.data.page.busy=false;
                    $scope.habits=habitsNewsService.take(res.list) ;
                    if($scope.data.page.loop*$scope.data.page.step>=res.total){
                        $scope.data.page.finish=true;
                    }else{
                        $scope.data.page.loop+=1;
                        $scope.data.page.start=($scope.data.page.loop-1)*$scope.data.page.step+1;
                        $scope.data.page.end=$scope.data.page.loop*$scope.data.page.step;
                    }
                })
            }
        };
        $scope.likeUpdate=function(detailId,habitid){
            habitsLikeService.update(detailId,habitid).then(function(res){

            })
        };
        $scope.commentSend=function(detailId,habitId,commentContext,index){
            habitsCommentService.comment(detailId,habitId,commentContext).then(function(res){
                $scope.habits[index].comment.push({
                    id:res.id,
                    message:res.comment,
                    name:res.nickName
                })
            })
        };
        $scope.replySend=function(detailId,habitId,commentId,commentContext,index){
            habitsCommentService.reply(detailId,habitId,commentId,commentContext).then(function(res){
                $scope.habits[index].comment.push({
                    id:res.id,
                    message:res.comment,
                    name:$scope.data.userInfo.nickName+' 回复 '+ res.nickName
                })
            })
        };
        habitsNewsService.clear();
        $scope.load();
        wxShareService.default();
    }
]);

/*原文件 */
app.controller('habitsNewsController',['$scope','habitsLikeService','habitsCommentService','habitsNewsService','habitsRankService','wxShareService',
    function($scope,habitsLikeService,habitsCommentService,habitsNewsService,habitsRankService,wxShareService){
        $scope.data={
            tabs:{
                names:["推荐","排行榜"],
                tabActiveIndex: 0,
                sliderOffset: 0,
                sliderLeft: 0
            },
            userInfo:habitsNewsService.userInfo,
            memberInfo:habitsNewsService.memberInfo,
            page:{
                busy:false,
                finish:false,
                start:1,
                end:10,
                loop:1,
                step:10
            }
        };

        $scope.loadMore=function(){
            console.log("load more");
            $scope.load();
        };
        $scope.load=function(){
            console.log("$scope.data.page.busy:"+$scope.data.page.busy);
            console.log("$scope.data.page.finish:"+$scope.data.page.finish);
            if($scope.data.page.busy==false && $scope.data.page.finish==false){
                $scope.data.page.busy=true;
                habitsNewsService.getDetail($scope.data.page.start,$scope.data.page.end).then(function(res){
                    $scope.data.page.busy=false;
                    console.log("habitsDetailService");
                    console.log(res);
                    $scope.habits=habitsNewsService.take(res.list) ;
                    if($scope.data.page.loop*$scope.data.page.step>=res.total){
                        $scope.data.page.finish=true;
                    }else{
                        $scope.data.page.loop+=1;
                        $scope.data.page.start=($scope.data.page.loop-1)*$scope.data.page.step+1;
                        $scope.data.page.end=$scope.data.page.loop*$scope.data.page.step;
                    }
                })
            }
        };
        $scope.likeUpdate=function(detailId,habitid){
            habitsLikeService.update(detailId,habitid).then(function(res){

            })
        };
        $scope.commentSend=function(detailId,habitId,commentContext,index){
            habitsCommentService.comment(detailId,habitId,commentContext).then(function(res){
                $scope.habits[index].comment.push({
                    id:res.id,
                    message:res.comment,
                    name:res.nickName
                })
            })
        };
        $scope.replySend=function(detailId,habitId,commentId,commentContext,index){
            habitsCommentService.reply(detailId,habitId,commentId,commentContext).then(function(res){
                $scope.habits[index].comment.push({
                    id:res.id,
                    message:res.comment,
                    name:$scope.data.userInfo.nickName+' 回复 '+ res.nickName
                })
            })
        };
        habitsNewsService.clear();
        $scope.load();
        wxShareService.default();
    }
]);
app.controller('habitsDetailController',['$scope','habitsDetailService','habitsRankService','habitsLikeService','habitsCommentService',
    function($scope,habitsDetailService,habitsRankService,habitsLikeService,habitsCommentService){
        $scope.data={
            tabs:{
                names:["热门推荐","排行榜"],
                tabActiveIndex: 0,
                sliderOffset: 0,
                sliderLeft: 0
            },
            userInfo:habitsDetailService.userInfo,
            page:{
                busy:false,
                finish:false,
                start:1,
                end:10,
                loop:1,
                step:10
            },
            habit:{
                info:{},
                isJoin:false
            },
        };
        $scope.habits=[];
        habitsDetailService.getHabitInfo().then(function(res){
            console.log("getHabitInfo" );
            console.log(res );
            if(res.success==true){
                $scope.data.habit.info=res.info;
                $scope.data.habit.isJoin=res.isJoin;
            }
        });
        $scope.loadMore=function(){
            console.log("load more");
            load();
        };
        var load=function(){
            console.log("$scope.data.page.busy:"+$scope.data.page.busy);
            console.log("$scope.data.page.finish:"+$scope.data.page.finish);
            if($scope.data.page.busy==false && $scope.data.page.finish==false){
                $scope.data.page.busy=true;
                habitsDetailService.getDetail($scope.data.page.start,$scope.data.page.end).then(function(res){
                    $scope.data.page.busy=false;
                    console.log("habitsDetailService");
                    console.log(res);
                    $scope.habits=habitsDetailService.take(res.list) ;
                    if($scope.data.page.loop*$scope.data.page.step>=res.total){
                        $scope.data.page.finish=true;
                    }else{
                        $scope.data.page.loop+=1;
                        $scope.data.page.start=($scope.data.page.loop-1)*$scope.data.page.step+1;
                        $scope.data.page.end=$scope.data.page.loop*$scope.data.page.step;
                    }
                })
            }
        };
        habitsRankService.getRank().then(function(res){
            console.log("on aboutHabitsRank");
            console.log(res.list);
            $scope.ranks=res.list;
        });
        $scope.likeUpdate=function(detailId,habitid){
            habitsLikeService.update(detailId,habitid).then(function(res){

            })
        };
        $scope.commentSend=function(detailId,habitId,commentContext,index){
            habitsCommentService.comment(detailId,habitId,commentContext).then(function(res){
                $scope.habits[index].comment.push({
                    id:res.id,
                    message:res.comment,
                    name:res.nickName
                })
            })
        };
        $scope.replySend=function(detailId,habitId,commentId,commentContext,index){
            habitsCommentService.reply(detailId,habitId,commentId,commentContext).then(function(res){
                console.log("habitsCommentService.reply");
                console.log(res);
                $scope.habits[index].comment.push({
                    id:res.id,
                    message:res.comment,
                    name:$scope.data.userInfo.nickName+' 回复 '+ res.nickName
                })
            })
        };
        load();
    }
]);
app.controller('habitsRankController',['$scope','habitsRankService','$location',function($scope,habitsRankService,$location){
    console.log("habitsRankController");
    console.log($location.search());
    $scope.title=$location.search().t;
    habitsRankService.getRank($location.search().habitId).then(function(res){
        console.log("on aboutHabitsRank");
        console.log(res.list);
        $scope.ranks=res.list;
    });
}]);

app.controller('habitsController',['$scope','habitsService','$location',function($scope,habitsService,$location){
    habitsService.getList().then(function(res){
        console.log("habitsController");
        console.log(res);
        $scope.habits=res.list;
    });

    $scope.selectHabit=function(habitid){
        globalData.habitId=habitid;
        $location.path("/habitdetail");
    }
}]);

app.controller('habitsRecordsController',['$scope','$location','wxJsSdkService','habitsRecordsService','wxShareService',function($scope,$location,wxJsSdkService,habitsRecordsService,wxShareService){
    console.log("habitsRecordsController");
    console.log($location.search());
    $scope.data={
        card:{
            isPunch:false,
            state:0 /*0:未打卡 1:已打卡*/
        },
        modele:0,/*0:打卡区域 1：心情记录区域*/
        habitId:$location.search().habitid,
        title:$location.search().n,
        minLenght:1, /*最少要输入一个字符*/
        notes:'', /*记录内容*/
        serverId:'' /*图片资源*/
    };
    habitsRecordsService.getCard($scope.data.habitId).then(function(res){
        if(res.success==true && res.is_punch==true){
            $scope.data.card.state=1;
        }else{
            $scope.data.card.state=0;
        }
    });
    $scope.punchCard=function(){
        console.log("punchCard");
        $.showLoading("数据正在处理...");
        habitsRecordsService.addCard($scope.data.habitId).then(function(res){
            $.hideLoading();
            console.log(res);
            if(res.success==true){
                $scope.data.card.state=1;
            }
        })
    };
    $scope.addRecord=function(){
        console.log("sssssssssss");
        $scope.data.modele=1;
    };
    $scope.cancelRecord=function(){
        $scope.data.modele=0;
    };
    $scope.selectImg=function(){
        wxJsSdkService.image.chooseImage(function(localIds){
            wxJsSdkService.image.uploadImage(function(res){
                $scope.data.serverId=res;
            })
        })
    };
    $scope.submitRecord=function(){
        $.showLoading("数据正在处理...");
        habitsRecordsService.addRecord($scope.data.habitId,$scope.data.notes).then(function(res){
            return res;
        }).then(function(res){
            if(res.success==true && $scope.data.serverId!='' ){
                habitsRecordsService.addRecordImg(res.index,$scope.data.serverId).then(function(res){
                    $.hideLoading();
                    $location.path('/habitnews');
                })
            }else{
                $.hideLoading();
                $location.path('/habitnews');
            }
        })
    };
    wxShareService.default({
        title: '栀子会 习惯助手', // 分享标题
        desc: '我坚持'+$location.search().n+'已经'+$location.search().c+'天了',
    });
    $scope.memberInfo=habitsRecordsService.memberInfo;
}]);
app.controller('habitsJoinController',['$scope','habitsJoinService','$location',function($scope,habitsJoinService,$location){
    $scope.data={
        habitaim:{
            title: "选择手机",
            items:[
                {title: "7 天", value: "7"},
                {title: "21 天", value: "21"},
                {title: "56 天", value: "56"},
                {title: "100 天", value: "100"},
                {title: "365 天", value: "365"},
            ],
            onChange:function(e){
                console.log("myselect");
                console.log(e);
                console.log(e.values);
                $scope.data.target.text= e.titles;
                $scope.data.target.value= e.value;
            }
        },
        isJoin:false,
        btnName:'我要加入',
        target:{
            text:'7 天',
            value:7
        }
    };
    habitsJoinService.getHabitInfo().then(function(res){
        console.log("habitsJoinController");
        console.log(res);
        if(res.isJoin==false){
            $scope.data.isJoin=false;
            $scope.data.btnName='我要加入'
        }else{
            $scope.data.isJoin=true;
            $scope.data.btnName='更新'
        }
    });
    $scope.joinHabit=function(){
        habitsJoinService.joinHabit($scope.data.target.value).then(function(res){
            $location.path("/result").search({
                title:$scope.data.isJoin==true?'更新成功':'加入成功',
                desc:'',
                hash:'myhabits'
            });
        })
    };
    selectTagert=function(value){
        for(var i=0;i<$scope.data.habitaim.length;i++){
            if($scope.data.habitaim[i].value==value){
                $scope.data.target.text=$scope.data.habitaim[i].title;
                $scope.data.target.value=$scope.data.habitaim[i].value;
                break;
            }
        }
    }
}]);

/***************end 习惯************************/

/***************start 课程************************/
app.controller('coursesController',['$scope','coursesService','$location','ngAudio','$document','$interval','$timeout',
    function($scope,coursesService,$location,ngAudio,$document,$interval,$timeout){
        var courseId=$location.search().courseId;
        $scope.index=0;
        $scope.audios=[];
        coursesService.get(courseId).then(function(results){
            $scope.courses=results;
            console.log("coursesController");
            console.log(results);
            $scope.audio = ngAudio.load(results.section[$scope.index].contents[0].url);
            var interval= $interval(function(){
                if($scope.audio.currentTime >= $scope.audio.duration){
                    $scope.index+=1;
                    if($scope.index>results.section.length-1){
                        $interval.cancel(interval);
                        $scope.audio.currentTime=0;
                        $scope.index=0;
                    }else{
                        $scope.audio = ngAudio.load(results.section[$scope.index].contents[0].url);
                        $timeout(function(){
                            $scope.audio.play();
                        },1000);
                    }
                }
            },500);
        });
        $scope.progressWidth = $document[0].getElementById('xl-progress-bar').clientWidth;
        $scope.setLoop=function(){
            $scope.audio.loop=!$scope.audio.loop;
        };
        $scope.play=function(sn){
            if($scope.index==sn){
                if($scope.audio.paused){
                    $scope.audio.play()
                }else{
                    $scope.audio.pause();
                }
            }else{
                $scope.audio.stop();
                $scope.audio = ngAudio.load($scope.courses.section[sn].contents[0].url);
                $timeout(function(){
                    $scope.audio.play();
                },1000);
                $scope.index=sn;
            }
        };
        $scope.next=function(){
            $scope.index+=1;
            if($scope.index>$scope.courses.section.length-1){
                $scope.index=0;
            }
            $scope.audio = ngAudio.load($scope.courses.section[$scope.index].contents[0].url);
            $timeout(function(){
                $scope.audio.play();
            },1000);
        };
        $scope.memberInfo=coursesService.memberInfo
    }
]);

/*****************end 课程************************/