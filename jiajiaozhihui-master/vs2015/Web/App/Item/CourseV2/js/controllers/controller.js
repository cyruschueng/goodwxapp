app.controller('homeController',['$scope','wxJsSdkService','homeService','commonService','$location','wxShareService','ngAudio','songRemember',
    function($scope,wxJsSdkService,homeService,commonService,$location,wxShareService,ngAudio,songRemember){
        $scope.isLoading=true;
        homeService.gets().then(function(res){
            $scope.isLoading=false;
            $scope.courses=res;
            console.log(res);
            if(res.course.section!=null)
            {
                var url= res.course.section[0].contents[0].url;
                $scope.audio=ngAudio.load(url);
            }
            
        });
        $scope.courseHref=function(mediaType,courseId,freeVideo){
            return homeService.href(mediaType,courseId,freeVideo);
        };
        $scope.pay=function(cid,ctype){
            window.location.href=homeService.pay(cid,ctype);
        };
        $scope.state={
            valid:true
        };
        wxShareService.default();
        
        
    }
]);

app.controller('videoController',['$scope','$sce','$location','homeService','$timeout','courseService',
    function($scope,$sce,$location,homeService,$timeout,courseService){

        var controller = this;
        controller.state = null;
        controller.API = null;
        controller.currentVideo = 0;

        controller.onPlayerReady = function(API) {
            controller.API = API;
        };

        controller.onCompleteVideo = function() {
            controller.isCompleted = true;

            controller.currentVideo++;

            if (controller.currentVideo >= controller.videos.length) controller.currentVideo = 0;

            controller.setVideo(controller.currentVideo);
        };


        function init(){
            controller.config = {
                preload: "preload",
                autoHide: false,
                autoHideTime: 3000,
                autoPlay: true,
                sources: controller.videos[0].sources,
                theme: {
                    url: $sce.trustAsResourceUrl("../content/css/videogular.css")
                },
                plugins: {
                    poster: "../content/imgs/teacher.jpg"
                }
            };
        }
        controller.setVideo = function(index) {
            courseService.isBuy(courseId).then(function(results){
                if(results=="False" && index>0){
                    $location.path("/result").search({
                        title:"提醒",
                        desc:"购买后可以学习整个课程",
                        hash:"course?courseId=34"
                    })
                }else{
                    controller.API.stop();
                    controller.currentVideo = index;
                    controller.config.sources = controller.videos[index].sources;
                    $timeout(controller.API.play.bind(controller.API), 100);
                }
            })
        };

        var courseId=$location.search().courseId;
        homeService.get(courseId).then(function(results){
            $scope.courses=results;
            controller.videos=[];
            for(var i=0;i<results.section.length;i++){
                var item=results.section[i];
                var video={
                    sources:[
                        {src: $sce.trustAsResourceUrl(item.contents[0].url), type: "video/mp4",name:item.sectionName}
                    ]
                }
                controller.videos.push(video);
            }
            init();
        });
        $scope.show={
            detai:false,
            section:true,
            exercise:false,
            internship:false
        };
        controller.learn=function(){
            courseService.learn(courseId).then(function(results){
                $scope.learn=results;
            })
        }
    }
]);

app.controller('freeVideoController',['$scope','$sce','$location','homeService','$timeout','courseService',
    function($scope,$sce,$location,homeService,$timeout,courseService){
        var courseId=$location.search().courseId;
        $scope.isLoading=true;
        homeService.get(courseId).then(function(results){
            $scope.isLoading=false;
            $scope.courses=results;
            $scope.videos=[];
            for(var i=0;i<results.section.length;i++){
                var item=results.section[i];
                var video={
                    sources:[
                        {src: $sce.trustAsResourceUrl(item.contents[0].url), responsive:item.contents[0].responsive,name:item.sectionName}
                    ]
                }
                $scope.videos.push(video);
            }
            videoInfo.src=$scope.videos[0].sources[0].src ;
            videoInfo.responsive=$scope.videos[0].sources[0].responsive ;
            $scope.videoInfo=videoInfo;
        });
        var videoInfo={
            src:'',
            responsive:''
        }
        $scope.setVideo=function(src,responsive){
            videoInfo.src=src;
            videoInfo.responsive=responsive;
            $scope.videoInfo=videoInfo;
        };
    }
]);

app.controller('myCourseController',['$scope','$sce','courseService','homeService',function($scope,$sce,courseService,homeService){
    $scope.isLoading=true;
    courseService.myCourse().then(function(results){
        $scope.isLoading=false;
        $scope.courses=results;
    });
    $scope.courseHref=function(mediaType,courseId){
        return homeService.href(mediaType,courseId);
    };
}]);

app.controller('bagsController',['$scope','$sce','$location','bagsService','$timeout','homeService','wxShareService','commonService',
    function($scope,$sce,$location,bagsService,$timeout,homeService,wxShareService,commonService){
        var bagId=$location.search().bagId;
        if(bagId==undefined){
            bagId=commonService.courseId;
        }

        $scope.isLoading=true;
        bagsService.bags(bagId).then(function(results){
            $scope.isLoading=false;
            $scope.courses=results;
            wxShareService.custom(results.courseName,results.intro,bagId,"bags");
        });
        $scope.show={
            detai:false,
            section:true,
            exercise:false,
            internship:false
        };
        $scope.bagLearn=function(){
            bagsService.bagLearn(bagId).then(function(results){
                $scope.learn=results;
            })
        };
        $scope.courseHref=function(mediaType,courseId,isFree){
            return homeService.href(mediaType,courseId,isFree);
        };
    }
]);
app.controller('msgController',['$scope','$location',function($scope,$location){
    var params=$location.search();
    $scope.params={
        title:params.title,
        desc:params.desc,
        hash:params.hash,
        href:params.href,
        img:params.img
    };
}]);
app.controller('viewPersonalController',['$scope','personalService','commonService',function($scope,personalService,commonService){
    personalService.getUserInfo().then(function(results){
        $scope.info={
            wxUser:results.wxUserInfo,
            courseUser:results.courseUser
        };
    });
}]);

app.controller('editPersonalController',['$scope','personalService','commonService','$location',function($scope,personalService,commonService,$location){
    personalService.getUserInfo().then(function(results){
        $scope.seInValid=0;
        var info={
            wxUser:results.wxUserInfo,
            courseUser:results.courseUser,
            userYearOld:commonService.getAge(results.courseUser.birthday)
        };

        $scope.userInfo={
            nickName:info.wxUser.nickName,
            province:info.wxUser.province,
            city:info.wxUser.city,
            age:info.courseUser.age,
            telephone:info.courseUser.telephone
        };
        $scope.sex=commonService.sex;
        $scope.selectSex=$scope.sex[0];
    });
    $scope.update=function(isValid){
        if (isValid) {
            $scope.seInValid=true;
            return;
        };
        personalService.update($scope.userInfo.age,$scope.userInfo.telephone,$scope.selectSex.value).then(function(results){
            $location.path("/viewpersonal");
        });
    };
}]);

app.controller('myController',['$scope','myService','commonService',function($scope,myService,commonService){
    myService.get().then(function(results){
        $scope.info=results;
    });
    $scope.userInfo=commonService.wxUserInfo;
}]);

app.controller('myCourseListController',['$scope','myService','commonService',function($scope,myService,commonService){
    $scope.getMyCourseList=function(theme){
        myService.list(theme).then(function(results){
            $scope.courses=results;
        })
    };
}]);

app.controller('singleAudioController',['$scope','homeService','$location','wxShareService','commonService',function($scope,homeService,$location,wxShareService,commonService){
    var courseId=$location.search().courseId;
    if(courseId==undefined || courseId==null){
        courseId=commonService.fileId;
    }
    $scope.courseId=courseId;
    homeService.get(courseId).then(function(results){
        $scope.course=results;
        $scope.isStart=homeService.isStart(results.startDate);
        $scope.$emit('single-audio',results.section[0].contents);
        wxShareService.custom(results.title,results.intro,results.id,"singleaudio");
    });
    $scope.loading=function(i){
        var item=$scope.course.section[i].contents[0];
        $scope.load(item,true);
    }
}]);

app.controller('multipleAudioController',['$scope','homeService','$location','wxShareService',function($scope,homeService,$location,wxShareService){
    var courseId=$location.search().courseId;
    $scope.isLoading=true;
    homeService.get(courseId).then(function(results){
        $scope.isLoading=false;
        $scope.multipleCourse=results;
        console.log(results);
        wxShareService.custom(results.title,results.intro,results.id,"viewcourse",'{"themeid":"'+results.theme+'"}');
        $scope.$emit('multiple-audio',results.section[0].contents)
    });
}]);

app.controller('onlineAudioController',['$scope','homeService','$location','commonService','wxShareService',function($scope,homeService,$location,commonService,wxShareService){
    var courseId=$location.search().courseId;
    if(courseId==undefined){
        courseId=commonService.fileId;
    }
    $scope.isLoading=true;
    homeService.get(courseId).then(function(results){
        $scope.isLoading=false;
        $scope.onLinecourse=results;
        wxShareService.custom(results.title,results.intro,results.id,"onlineaudio");
        $scope.$emit('online-audio',results)
    });
}]);


app.controller('audioController', ['$scope','$timeout','$filter','$interval',function($scope,$timeout,$filter,$interval){

    $scope.isStart=false;
    $scope.playing = false;
    $scope.hasPrev = false;
    $scope.hasNext = false;
    $scope.playMode = 1;//默认播放全部


    var readPlaying=false;

    $scope.toastMsg = function(msg) {
        $scope.toast = msg;
        $timeout(function() {
            $scope.toast = '';
        }, 1500);
    };
    $scope.$on('toastMsg',function(e,text){
        $scope.toastMsg(text);
    });

    $scope.loading=function(){
        $scope.loading = true;
        $scope.loading_text = text;
    };

    $scope.$on('loading', function(e, state) {
        $scope.loading =state.loading;
        $scope.loading_text =state.text;
    });


    $scope.$watch('playMode', function(newVal, oldVal) {
        if (newVal) {
            $scope.toastMsg('列表循环');
        }
        else {
            $scope.toastMsg('单曲循环');
        }
    });

    $scope.keyword = '';
    $scope.song = {};
    $scope.toast = '';


    var audio = document.getElementById('fr').contentWindow.document.getElementById('audio');
    //禁止歌词的touch事件
    //事件监听
    window.addEventListener('resize', function() {
        $scope.$apply(function() {
            $scope.progressWidth = document.querySelector('.xl-progress-bar').clientWidth;
        });
    }, false);

    audio.addEventListener('play', function() {
        $scope.$apply(function() {
            $scope.progressWidth=document.querySelector('.xl-progress-bar').clientWidth;
            $scope.playing = true;
        });
    }, false);
    audio.addEventListener('pause', function() {
        $scope.$apply(function() {
            $scope.playing = false;
        });
    }, false);
    audio.addEventListener('ended', function() {
        if ($scope.playMode == 1) {
            if ($scope.hasNext) {
                $scope.next();
            }
            else {
                //$scope.load($scope.list[0]);
                $scope.progressWidth=0;
            }
        }
        else {
            $scope.load($scope.song, true);
        }

    }, false);

    $scope.progress = 0;
    audio.addEventListener('timeupdate', function(e) {
        $scope.$apply(function() {
            $scope.song.currentTime = e.target.currentTime;
            $scope.progress = $scope.song.currentTime / $scope.song.time;
        });
    }, false);



    /**
     * 设置将要播放的歌曲
     * @param item
     * @param force
     */
    $scope.load = function(item, force) {

        if ((force != undefined && force) || item.id != $scope.song.id) {
            //加载歌词，歌曲图片，作者，歌曲名称，
            //$scope.$broadcast('loading', '加载【' + item.fullName + '】');
            //$scope.loading('加载【' + item.fullName + '】');

            $scope.song = item;
            $scope.loading = false;
            $scope.song.img ="";
            $scope.song.title ="";
            $scope.song.time = item.duration;
            $scope.song.currentTime = 0;
            $scope.song.src = item.url;
            audio.src = item.url;
            //计算上一首，下一首
            var _index = $scope.list.indexOf(item);
            var _maxIndex = $scope.list.length - 1;
            $scope.hasPrev = _index > 0;
            $scope.hasNext = _index < _maxIndex;

            if(readPlaying==true || force==true){
                audio.play();
            }
            readPlaying=true;
        }
        else {
            audio.play();
        }
    };

    //播放歌曲
    $scope.play = function() {
        audio.play();
        readPlaying=true;
    };
    //暂停
    $scope.pause = function() {

        audio.pause();
    };

    $scope.$on('single-audio',function(event,data){
        $scope.list=data;

        $scope.load($scope.list[0]);
    });

    $scope.$on('multiple-audio',function(event,data){
        $scope.songs=data;

        $scope.list=$filter('filter')(data,{type:2});
        $scope.load($scope.list[0]);
    });

    $scope.$on('online-audio',function(event,data){

        $scope.list=[];
        $scope.songs=[];

        //课程内容
        var result= data.section[0].contents;
        /*
         * 显示直播的内容
         * 立即显示的内容
         * */
        var info=$filter('filter')(result,{atOnceShow:1});
        for(var i=0;i<info.length;i++){
            $scope.songs.push(info[i]);
            if(info[i].type==2){
                $scope.list.push(info[i]);
            }
        };
        /*
         * 显示直播的内容
         * 当前时间大于直播内容定义的时间就要立即显示出来
         * */
        var showed=$filter('onlineShowed')(result,data.now,'showDateTime');
        for(var i=0;i<showed.length;i++){
            $scope.songs.push(showed[i]);
            if(showed[i].type==2){
                $scope.list.push(showed[i]);
            }
        };



        /*
         * 显示直播的内容
         * 当前时间小时直播内容定义的时间就定时显示
         *
         * */
        var showing=$filter('onlineShowing')(result,data.now,'showDateTime');
        var nowDate=moment(data.now,"YYYY-MM-DD HH:mm:ss");
        if(showing.length==0){
          return;
        }else{
            var interval= $interval(function(){
                nowDate.add(1,'s');
            },1000);
        }

        var time= 0;
        var n=0;
        /*获取第一次定时器时间*/
        var first=showing[0];
        time=runTime(first.showDateTime,nowDate);

        var startRun= function(){

            var timeout= $timeout(function(){
                if(n>=showing.length){
                    $timeout.cancel(timeout);
                    $interval.cancel(interval);
                    return;
                }
                var info=showing[n++];

                $scope.songs.push(info);
                if(info.type==2){
                    $scope.list.push(info);
                }
                //下一次定时间器时间
                try{
                    time=runTime(showing[n].showDateTime,nowDate);
                }catch(e){
                    time=0;
                }
                startRun();
            },time);
        };
        startRun();
        function runTime(testTime,now){
            return (moment(testTime,"YYYY-MM-DD HH:mm:ss").unix()-now.unix())*1000;
        }
        /*
        $scope.list=$filter('filter')($scope.songs,{type:2});
        $scope.load($scope.list[0]);
        */
    });

    $scope.prev = function() {
        $scope.toastMsg('上一首');
        var _index = $scope.list.indexOf($scope.song);
        $scope.load($scope.list[--_index]);
    };
    $scope.next = function() {
        $scope.toastMsg('下一首');
        var _index = $scope.list.indexOf($scope.song);
        $scope.load($scope.list[++_index]);
    };
}]);

app.controller('viewCourseController', ['$scope', 'courseService', '$location', 'homeService', '$sce', 'wxShareService', function ($scope, courseService, $location, homeService, $sce, wxShareService) {
    var cid= $location.search().cid;
    var themid=$location.search().themid;

    $scope.isLoading=true;
    $scope.theme = themid;

    courseService.viewCourse(cid,themid).then(function(results){
        $scope.isLoading=false;
        $scope.info=results;
        console.log(results);
        wxShareService.custom(results.title, "父母成长一小步，孩子成长一大步！", cid, "viewcourse", '{"themeid":"' + themid + '"}');
    });

    $scope.pay=function(cid,ctype){
        window.location.href=homeService.pay(cid,ctype);
    };
    $scope.sceHtml = function (context) {
        return $sce.trustAsHtml(context);
    };
    $scope.learning=function(ctype,isfree){
        $scope.isLoading=true;
        courseService.learn(cid,ctype).then(function(results){
            $scope.isLoading=false;
            $scope.learn=results;
            console.log(results);
            console.log(themid);
            if(themid==14){
                $location.path("/viewcourse").search({cid:cid,themid:themid});
            }else if(themid==15){
                var mtype=$location.search().mtype;
                if(mtype==1){
                    if(isfree==true){
                        $location.path("/freevideo").search({courseId:cid});
                    }else{
                        $location.path("/video").search({courseId:cid});
                    }
                }else if(mtype==2){
                    $location.path("/singleaudio").search({courseId:cid});
                }else if(mtype==3){
                    $location.path("/multipleaudio").search({courseId:cid});
                }
            }else if(themid==3){
                $location.path("/bags").search({bagId:cid});
            }
        })
    }
}]);

app.controller('courseListController',['$scope','courseListService','homeService',function($scope,courseListService,homeService){

    function getOnLine(){
        $scope.isLoading=true;
        courseListService.getOnline().then(function(result){
            $scope.isLoading=false;
            $scope.infos=result;
            $scope.type=3;
            $scope.title="直播";

        });
    };
    function getBag(){
        $scope.isLoading=true;
        courseListService.getBag().then(function(result){
            $scope.isLoading=false;
            $scope.infos=result;
            $scope.type=2;
            $scope.title="特训";
        });
    };
    function getCommon(){
        $scope.isLoading=true;
        courseListService.getCommon().then(function(result){
            $scope.isLoading=false;
            $scope.infos=result;
            $scope.type=1;
            $scope.title="常训";
        });
    };
    $scope.getOnLine=function(){
        getOnLine();
    };
    $scope.getBag=function(){
        getBag();
    };
    $scope.getCommon=function(){
        getCommon();
    };
    $scope.courseHref=function(mediaType,courseId,freeVideo){
        return homeService.href(mediaType,courseId,freeVideo);
    };
    getCommon();
}]);

app.controller('defaultController',['$scope','wxJsSdkService','defaultService','$location','wxShareService',
    function($scope,wxJsSdkService,defaultService,$location,wxShareService){
        $scope.isLoading=true;
        defaultService.gets().then(function(res){
            $scope.isLoading=false;
            $scope.courses=res;
        });
        $scope.courseHref=function(mediaType,courseId,freeVideo){
            return defaultService.href(mediaType,courseId,freeVideo);
        };
        $scope.pay=function(cid,ctype){
            window.location.href=defaultService.pay(cid,ctype);
        };
        $scope.state={
            valid:true
        };
        $scope.link=function(isBuyCard,courseId,themid,mediaType,isFreeVideo){


            if(isBuyCard==true){
                var url=defaultService.href(mediaType,courseId,isFreeVideo);
                window.location.href=url;
            }else{
                $location.path("/viewcourse").search({cid:courseId,themid:themid,mtype:mediaType});
            }
        };
        $scope.gxdr=function(id){
            $location.path("/gxdr").search({id:id});
        }
        wxShareService.default();
        document.title="智慧父母特训营";
    }
]);
app.controller('gxdrController',['$scope','gxdrService','$location',function($scope,gxdrService,$location){
    var id=$location.search().id;
    var courseId=$location.search().id;
    if(id==''){
        $scope.info={
            item:{
                id:''
            }
        }
        return;
    }
    gxdrService.show(id).then(function(results){
        $scope.info={
            item:results,
            url:'http://161s5g6007.51mypc.cn/game/brainsexpert/gxdr.aspx?id='+id+'&openid='+results.openId+'&courseid='+id
        };
    });
    $scope.get=function(){
        gxdrService.get(id).then(function(results){
            $scope.res=results;
            $scope.link='http://161s5g6007.51mypc.cn/game/brainsexpert/Course/index.aspx?id='+id+'&openid='+results.openId;
            console.log(results);
        });
    };
    $scope.order=function(index){
        $location.path("/order").search({ranking:index});
    }
}]);

app.controller('headerController',['$scope','$location','commonService',function($scope,$location,commonService){
    $scope.goBack=function(href){
        var hash= commonService.hash;
        if(hash=="start"){
            $location.path("/home");
        }else if (hash=="card"){
            $location.path("/default");
        }
    }
}]);

app.controller('aboutController',['$scope','aboutService',function($scope,aboutService){
    aboutService.getInfo(10).then(function(res){
        $scope.info=res;
    });
}]);

app.controller('activeCardController',['$scope','$location','activeCardService','commonService',function($scope,$location,activeCardService,commonService){
    var cardId=commonService.cardId;
    var serverUrl=commonService.serviceUrl;
    var clientUrl=commonService.clientUrl;
    window.document.title="父母特训营学习卡激活";
    activeCardService.getInfo(cardId).then(function(res){
        $scope.info=res;
        console.log(res);
        $scope.isMyCard=activeCardService.isMyCard(res.openId);
        $scope.checkState= activeCardService.checkState(res.allegeList);
    });
    $scope.active=function(){
        activeCardService.activeCard(cardId).then(function(res){
            $scope.result=res;
            var params={
                title:'学习卡激活成功',
                desc:'',
                hash:'',
                href:serverUrl+'app/appstart/course/baseinfo.ashx?redirect_url='+clientUrl+'/app/default.html&state={"appid":"app001","hash":"card"}'
            };
            $location.path("/result").search(params);
        })
    };
    /*免费激活*/
    $scope.freeActive=function(){
        activeCardService.freeActive(cardId).then(function(res){
            console.log(res);
            if(res>0){
                var params={
                    title:'学习卡激活成功',
                    desc:'',
                    hash:'',
                    href:serverUrl+'app/appstart/course/baseinfo.ashx?redirect_url='+clientUrl+'/app/default.html&state={"appid":"app001","hash":"card"}'
                };
                $location.path("/result").search(params);
            }
        });
    };
    /*申述*/
    $scope.allege=function(){
        activeCardService.allege(cardId).then(function(res){
            console.log(res);
            if(res>0){
                var params={
                    title:'提交受理成功',
                    desc:'<p>后台验证中，请您稍后</p><p class="text-left text-danger">激活后系统将会向你发送确认信息，为不了影响你接收信息，请选关注【家教智慧】服务！</p><p class="text-left">给您添麻烦了！感谢您的体谅！</p><p class="text-left">【家教智慧】服务号：jiajiao-ZH</p>',
                    hash:'',
                    img:'../../content/imgs/jiajiaozh.jpg',
                    href:serverUrl+'app/appstart/course/baseinfo.ashx?redirect_url='+clientUrl+'/app/default.html&state={"appid":"app001","hash":"card"}'
                };
                $location.path("/result").search(params);
            }
        });
    };

    /*我是不是在容错的中*/
    $scope.hasMyAllege=function(list){
        return activeCardService.hasMyAllege(list);
    };
    $scope.isChecking=function(list){
        return activeCardService.isChecking(list);
    };
    $scope.isAgree=false;
    $scope.agree=function(){
        return !$scope.isAgree;
    };
}]);
app.controller('showAllegeController',['$scope','$location','commonService','activeCardService',function($scope,$location,commonService,activeCardService){
    var cardId=commonService.cardId;
    activeCardService.showAllege(cardId).then(function(res){
        $scope.infos=res;
    });
    $scope.checkAllege=function(errorId,openId){
        var serverUrl=commonService.serviceUrl;
        var clientUrl=commonService.clientUrl;

        activeCardService.checkAllege(errorId,openId).then(function(res){
            if(res!=null){
                var params={
                    title:'学习卡申诉处理成功',
                    desc:'',
                    hash:'',
                    href:serverUrl+'app/appstart/course/baseinfo.ashx?redirect_url='+clientUrl+'/app/default.html&state={"appid":"app001","hash":"card"}'
                };
                $location.path("/result").search(params);
            }
        });
    };
}]);

app.controller('taskController',['$scope','$location','taskService',function($scope,$location,taskService){
    var courseId=$scope.courseId;
    taskService.getConfig(courseId).then(function(res){
        $scope.configInfo=res;
    });
    $scope.Gxdr=function(activeId){
        var url=taskService.gxdr(activeId,courseId);
        window.location.href=url;
    };
    $scope.Zxs=function(appId,themeId){
        var url=taskService.zxs(appId,themeId,courseId);
        window.location.href=url;
    };
    $scope.GuWen=function(expertId){
        var url=taskService.guwen(expertId);
        window.location.href=url;
    };
}]);

app.controller('learnCardController',['$scope','learnCardService',function($scope,learnCardService){
    learnCardService.getCardInfo(10).then(function(res){
        $scope.cardInfo=res;

    });
}]);

app.controller('gxdrRanking',['$scope','gxdrRankingService','$location',function($scope,gxdrRankingService,$location){
    var item=$location.search().id;
    $scope.cityRank=function(city,top){
        gxdrRankingService.getCityRank(item,city,top).then(function(res){
            $scope.rank=res;
        })
    };
    $scope.provinceProvince=function(city,top){
        gxdrRankingService.getProvinceRank(item,city,top).then(function(res){
            $scope.rank=res;
        })
    };
    $scope.nationwideRank=function(top){
        gxdrRankingService.getNationwide(item,top).then(function(res){
            $scope.rank=res;
        })
    };
}]);

app.controller('orderController',['$scope',function($scope){
    $scope.order={};
    $scope.submitted = false
    $scope.processOrder=function(){
        if($scope.orderForm.$valid){

        }else{
            $scope.submitted=true;
        }
    };
}])
