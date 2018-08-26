app.controller('preImageVoiceController',['$scope','wxJsSdkService','$location',function($scope,wxJsSdkService,$location){
    var taskId=$location.search().taskId;
    var type=$location.search().type;
    $scope.chooseImage=function(){
        wxJsSdkService.clearVoiceData();
        wxJsSdkService.image.chooseImage(function(){
            window.location.hash="uploadvoice?taskId="+taskId+"&type="+type;
        });
    }
}]);
app.controller('uploadImageVoiceController',['$scope','wxJsSdkService','$location','readFileService',
        function($scope,wxJsSdkService,$location,readFileService){
           var taskId=$location.search().taskId;
           var type=$location.search().type;

            $scope.info={
                image:{
                    loadingImage:function(){
                        return wxJsSdkService.getImageLocalId();
                    },
                    clear:function(){
                        wxJsSdkService.clearImageData();
                    }
                },voice:{
                    isVoiceComplete:false,
                    isStrartRecord:false,
                    seVoiceEmpty:true,
                    startRecordVoice:function(){
                        wxJsSdkService.voice.startRecord(function(){
                            $scope.info.voice.isStrartRecord=true;
                            //$scope.$apply($scope.info.voice.seVoiceEmpty=false);
                        });
                    },
                    stopRecordVoice:function(){
                        wxJsSdkService.voice.stopRecord(function(){
                            $scope.info.voice.isStrartRecord=false;
                            //$scope.$apply($scope.info.voice.seVoiceEmpty=false);
                        })
                    },
                    clear:function(){
                        wxJsSdkService.clearVoiceData();
                        $scope.info.voice.isStrartRecord=false;
                        $scope.info.voice.isVoiceComplete=false;

                    },
                    testPlayVoice:function(){
                        wxJsSdkService.voice.playVoice();
                    },
                    initVoiceState:function(){
                        $scope.info.voice.isVoiceComplete=false;
                        $scope.info.voice.isStrartRecord=false;
                        $scope.info.voice.seVoiceEmpty=true;
                    }

                },text:{
                    inputtest:{
                        max:100,
                        content:'',
                        currNumber:0
                    },checkText:function(){
                        if($scope.info.text.inputtest.content.length==undefined)return false;
                        if($scope.info.text.inputtest.content.length>100){
                            $scope.info.text.inputtest.content=$scope.info.text.inputtest.content.substr(0,100);
                        }
                        $scope.info.text.inputtest.currNumber=$scope.info.text.inputtest.content.length;
                    }
                }
            };
            $scope.type={
                fileType:0
            };
            $scope.testImageData="";
            $scope.testVoiceData="";
            $scope.cancel=function(){
                $scope.info.image.clear();
                $scope.info.voice.clear();
                $location.path("/preuploadvoice");
            }
            wxJsSdkService.events(function(){
                $scope.info.voice.isVoiceComplete=true;
            });

            $scope.seInValid=false;
            $scope.sePristine=false;
            $scope.upload=function(isValid){
                $scope.sePristine=true;
                if (isValid) {
                    $scope.seInValid=true;
                    return false;
                }
                if($scope.info.voice.seVoiceEmpty==true){
                    return false;
                }
                $scope.isLoading=true;
                wxJsSdkService.image.uploadImage(function(data){
                    $scope.isLoading=false;
                    if(data.errMsg=='uploadImage:ok'){
                        var imageMediaId=data.serverId;
                        wxJsSdkService.voice.uploadVoice(function(res){
                            var voiceMediaId=res.serverId;
                            readFileService.add(
                                imageMediaId,
                                voiceMediaId,
                                type,
                                $scope.info.text.inputtest.content,
                                taskId
                            ).then(function(results){
                                //$location.path("/home");
				                $location.path("/uploadshare").search({type:type,content:$scope.info.text.inputtest.content,fileId:results});
                            });
                        });
                    }
                });
            };
        }
    ]
);
app.controller('uploadShareController',['$scope','$location','wxJsSdkService','wxShareService','commonService',
    function($scope,$location,wxJsSdkService,wxShareService,commonService){
    var params= $location.search();
    var type=params.type;
    var content=params.content;
    var fileId=params.fileId;
    var openId=commonService.openId;
    var appId=commonService.appId;
    $scope.info={
        loadingImage:function(){
            return wxJsSdkService.getImageLocalId();
        },
        testPlayVoice:function(){
            wxJsSdkService.voice.playVoice();
        },
        type:type,
        content:content
    };
    wxShareService.custom('邀请您为我的孩子加油鼓励','我的孩子正在参加亲子诵读社诵读学习活动，快给他加油点赞吧！',fileId,"personalview");
}]);
app.controller('initReadController', ['$scope', '$rootScope', 'commonService', function ($scope, $rootScope, commonService) {
    
    $scope.readInfo={
        wxUserInfo: commonService.wxUserInfo,
        baseInfo: commonService.readInfo,
        readUserInfo: commonService.readUserInfo,
        logoUrl: commonService.serviceUrl + commonService.readInfo.logoUrl,
        award: commonService.award,
        isAttention: $rootScope.attention
    };
}]);
app.controller('homeController',['$scope','wxJsSdkService','homeService','playerService','commonService',
    'likeService','commentService','$location','topService','advService','wxShareService',
    function($scope,wxJsSdkService,homeService,playerService,commonService,likeService,commentService,$location,topService,advService,wxShareService){
        var gets=function(){
            $scope.isLoading=true;
            homeService.gets(0).then(function(results){
                $scope.isLoading=false;
                $scope.infos= homeService.take(results);
                $scope.moreThen=$scope.infos.length;
            })
        };
        //带广告
        var init=function(){
            $scope.isLoading=true;
            homeService.gets(0).then(function(results){
                $scope.isLoading=false;
                var infos= homeService.take(results);
                $scope.moreThen=infos.length;
                advService.showAdv().then(function(advs){
                    $scope.infos=homeService.getTaskAndAdv(advs);
                    console.log($scope.infos);
                });
            })
        };
        homeService.init();
        init();

        $scope.player= playerService;
        $scope.nickName=function(){
            return commonService.wxUserInfo.nickName;
        };
        $scope.addLike=function(playerTaskId){
            likeService.add(playerTaskId).then(function(){

            })
        };
        $scope.addComment=function(context,playerTaskId){
            commentService.add(context,playerTaskId)
        };
        $scope.share=function(fileId) {
            $location.path('/personalshare').search({fileId:fileId});
        };
        $scope.more=function(){
            gets();
        };
        $scope.getFileType=function(type){
            return commonService.getFileType(type);
        };
        $scope.moreTop=function(){
            homeService.top().then(function(results){
                $scope.infos= homeService.take(results);
            });
            $scope.currLink.newest=false;
            $scope.currLink.top=true;
        };
        $scope.setTop=function(playerTaskId){
            topService.set(playerTaskId);
        };
        $scope.reflesh=function(){
            homeService.init();
            gets();
            $scope.currLink.newest=true;
            $scope.currLink.top=false;
        };
        $scope.top=function(){
            homeService.init();
            homeService.top().then(function(results){
                $scope.infos= homeService.take(results);
            });
            $scope.currLink.newest=false;
            $scope.currLink.top=true;
        };



        $scope.currLink={
            newest:true,
            top:false
        };
        $scope.showImg=function(url){
            wxJsSdkService.setPreviewImageUrls(url,[url]);
            wxJsSdkService.image.previewImage();
        };
        $scope.delete=function(fileId){
            homeService.delete(fileId).then(function(results){

            })
        };
        $scope.showAdv=function(id){
            $scope.$broadcast('advShowDetail',id);
        };
        wxShareService.default();
    }
]);
app.controller('aboutController',['$scope','commonService',function($scope,commonService){
    $scope.about=commonService.readInfo.introduction;
}]);
app.controller('sendAdvController',['$scope','$location',function($scope,$location){
    $scope.$on('advShowDetail',function(e,d){
        console.log(d);
        $location.path('/adv').search({id:d});
    })
}]);

app.controller('advController',['$scope','$location','advService','wxShareService','commonService',function($scope,$location,advService,wxShareService,commonService){
    var id=$location.search().id;
    if(id==undefined){
        id=commonService.fileId
    }
    var openId=commonService.openId;
    var appId=commonService.appId;
    advService.showSingleAdv(id).then(function(results){
        $scope.info=results;
	share(results.shareTitle,results.shareDesc);
    })
    var share=function(title,desc){
        wxShareService.custom(title,desc,id,"adv");
    }
}]);

app.controller('myController',['$scope','commonService',function($scope,commonService){
    $scope.userInfo={
        nickName:commonService.wxUserInfo.nickName,
        headImgUrl:commonService.wxUserInfo.headImgUrl
    }

}]);
app.controller('viewPersonalController',['$scope','personalService','commonService',function($scope,personalService,commonService){
    personalService.getUserInfo().then(function(results){
        $scope.info={
            wxUser:results.wxUserInfo,
            readUser:results.readUser,
            userYearOld:commonService.getAge(results.readUser.borthDay)
        };
    });
}]);

app.controller('editPersonalController',['$scope','personalService','commonService','$location',function($scope,personalService,commonService,$location){
    personalService.getUserInfo().then(function(results){
        $scope.seInValid=false;
        var info={
            wxUser:results.wxUserInfo,
            readUser:results.readUser,
            userYearOld:commonService.getAge(results.readUser.borthDay)
        };

        $scope.userInfo={
            nickName:info.wxUser.nickName,
            province:info.wxUser.province,
            city:info.wxUser.city,
            childAge:info.readUser.childAge,
            telephone:info.readUser.telephone
        };
    });

    $scope.sex=commonService.sex;
    $scope.selectSex=$scope.sex[0];

    $scope.update=function(isValid){

        if (isValid) {
            $scope.seInValid=true;
            return false;
        }
        personalService.update($scope.userInfo.childAge,$scope.userInfo.telephone,$scope.selectSex.value).then(function(results){
            $location.path("/viewpersonal");
        });
    };
}]);
app.controller('myAllWorkController',['$scope','wxJsSdkService','homeService','playerService','commonService',
        'likeService','commentService','$location','topService',
        function($scope,wxJsSdkService,homeService,playerService,commonService,likeService,commentService,$location,topService){
            var gets=function(){
                $scope.isLoading=true;
                homeService.getMyAllTask().then(function(results){
                    $scope.isLoading=false;
                    $scope.infos= homeService.take(results);
                    $scope.moreThen=$scope.infos.length;
                    console.log(results);
                })
            };

            homeService.init();
            gets();

            $scope.player= playerService;
            $scope.nickName=function(){
                return commonService.wxUserInfo.nickName;
            };
            $scope.addLike=function(playerTaskId){
                likeService.add(playerTaskId).then(function(){

                })
            };
            $scope.addComment=function(context,playerTaskId){
                commentService.add(context,playerTaskId)
            };
            $scope.share=function(fileId) {
                $location.path('/personalshare').search({fileId:fileId});
            };
            $scope.more=function(){
                gets();
            };
            $scope.setTop=function(playerTaskId){
                topService.set(playerTaskId);
            };
            $scope.reflesh=function(){
                homeService.init();
                gets();
                $scope.currLink.newest=true;
                $scope.currLink.top=false;
            };
            $scope.top=function(){
                homeService.init();
                homeService.top().then(function(results){
                    $scope.infos= homeService.take(results);
                });
                $scope.currLink.newest=false;
                $scope.currLink.top=true;
            };
            $scope.currLink={
                newest:true,
                top:false
            };
            $scope.showImg=function(url){
                wxJsSdkService.setPreviewImageUrls(url,[url]);
                wxJsSdkService.image.previewImage();
            };
            $scope.delete=function(fileId){
                homeService.delete(fileId).then(function(results){

                })
            }
        }
    ]
);

app.controller('personalShareController',['$scope','wxJsSdkService','homeService','playerService','$location','wxShareService','commonService',
        function($scope,wxJsSdkService,homeService,playerService,$location,wxShareService,commonService){
            var fileId=$location.search().fileId;
            homeService.get(fileId).then(function(results){
                $scope.info=results;
                share();
            });
            $scope.player= playerService;

            var openId=commonService.openId;
            var appId=commonService.appId;
            function share(){
                wxShareService.custom('我的孩子正在诵读学习，快给他加油点赞吧！','我的孩子正在诵读学习，快给他加油点赞吧！',fileId,"personalview");
            }
        }
    ]
);
app.controller('personalViewController',['$scope','wxJsSdkService','playerService','wxShareService',
        'homeService','commonService','likeService','commentService',
        function ($scope, wxJsSdkService, playerService, wxShareService, homeService, commonService, likeService, commentService) {

            var fileId= commonService.fileId;
            homeService.get(fileId).then(function(results){
                $scope.info=results;
                share();
            })
            $scope.player= playerService;

            $scope.nickName=function(){
                return commonService.wxUserInfo.nickName;
            };
            $scope.addLike=function(id){
                likeService.add(id).then(function(){

                })
            };
            $scope.addComment=function(context,id){
                commentService.add(context,id)
            };
            var openId=commonService.share;
            var appId=commonService.appId;

            function share(){
                wxShareService.custom('我的孩子正在诵读学习，快给他加油点赞吧！','我的孩子正在诵读学习，快给他加油点赞吧！',fileId,"personalview");
            }
        }
    ]
);

app.controller('articleReleaseController',['$scope','articleReleaseService',function($scope,articleReleaseService){
    articleReleaseService.get(10).then(function(results){
        $scope.articleInfo=results;
    })
}]);

app.controller('taskController',['$scope','taskService','$location',function($scope,taskService,$location){
    taskService.get().then(function(results){
        $scope.task=results;
    });
    $scope.run=function(taskId,type){
        $location.path("/preuploadvoice").search({taskId:taskId,type:type});
    }
}])