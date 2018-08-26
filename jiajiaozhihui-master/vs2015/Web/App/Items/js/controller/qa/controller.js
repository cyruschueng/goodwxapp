app.controller('preImageVoiceController',['$scope','wxJsSdkService',function($scope,wxJsSdkService){
    $scope.chooseImage=function(){
        wxJsSdkService.clearVoiceData();
        wxJsSdkService.image.chooseImage(function(){
            window.location.hash="uploadvoice";
        });
    }
}]);
app.controller('uploadImageVoiceController',['$scope','wxJsSdkService','$location','readFileService',
        function($scope,wxJsSdkService,$location,readFileService){
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
                                0,
                                $scope.info.text.inputtest.content
                            ).then(function(results){
                                $location.path("/uploadshare").search({type:$scope.type.fileType,content:$scope.info.text.inputtest.content,fileId:results});
                            });
                        });
                    }
                });
            };
        }
    ]
);


app.controller('myController',['$scope','commonService','myService','$location',function($scope,commonService,myService,$location){
    $scope.userInfo={
        nickName:commonService.wxUserInfo.NickName,
        headImgUrl:commonService.wxUserInfo.HeadImgUrl
    };

    var init=function(){
        myService.init().then(function(results){
            $scope.info=results;
            console.log(results);
        })
    }();
    var model=$location.search().mode;
    if(model=='selected'){
        var expertInfo=$location.search().values;
        if(expertInfo.expertId==undefined){
            $scope.expert={
                expertId:0,
                expertType:0,
                expertName:'',
            };
        }else{
            $scope.expert={
                expertId:expertInfo.expertId,
                expertType:expertInfo.expertType,
                expertName:expertInfo.expertName
            };
        }
    };
}]);
app.controller('viewPersonalController',['$scope','personalService','commonService',function($scope,personalService,commonService){
    personalService.getUserInfo().then(function(results){
        $scope.info={
            wxUser:results.wxUserInfo,
            readUser:results.readUser,
            expert:results.expert,
            userYearOld:commonService.getAge(results.readUser.borthDay)
        };
    });
}]);

app.controller('editPersonalController',['$scope','personalService','commonService','$location',function($scope,personalService,commonService,$location){
    personalService.getUserInfo().then(function(results){
        $scope.seInValid=0;
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
            telephone:info.readUser.telephone,
            isReceiveMesage:info.readUser.isReceiveMesage
        };
        $scope.sex=commonService.sex;
        $scope.selectSex=$scope.sex[0];
    });
    $scope.changeRest=function(){
      if($scope.userInfo.isReceiveMesage==0 || $scope.userInfo.isReceiveMesage==null){
          $scope.userInfo.isReceiveMesage=1;
      }else{
          $scope.userInfo.isReceiveMesage=0;
      }
    };
    $scope.update=function(isValid){
        if (isValid) {
            $scope.seInValid=true;
            return;
        };
        personalService.update($scope.userInfo.childAge,$scope.userInfo.telephone,$scope.selectSex.value,$scope.userInfo.isReceiveMesage).then(function(results){
            commonService.updateUserInfo($scope.userInfo.childAge,$scope.selectSex.value,$scope.userInfo.telephone);
            $location.path("/viewpersonal");
        });
    };
}]);


app.controller('articleReleaseController',['$scope','articleReleaseService',function($scope,articleReleaseService){
    articleReleaseService.get(1).then(function(results){
        $scope.articleInfo=results;
    })
}]);


/*家教问答*/
app.controller('initController',['$scope','commonService',function($scope,commonService){
    $scope.info={
        wxUserInfo:commonService.wxUserInfo,
        baseInfo:commonService.baseInfo,
        userInfo:commonService.userInfo,
        logoUrl:commonService.serviceUrl+commonService.baseInfo.logoUrl,
        award:commonService.award,
        isAttention:commonService.isAttention,
        expertNumber:commonService.expertNumber,
        memberShipNumber:commonService.memberShipNumber
    };
    console.log("init");
    console.log($scope.info);
    $scope.userOpenId = $scope.info.userInfo.openId;
}]);


app.controller('aboutController',['$scope','commonService',function($scope,commonService){
    $scope.about=commonService.baseInfo.introduction;
}]);
app.controller('sendAdvController',['$scope','$location',function($scope,$location){
    $scope.$on('advShowDetail',function(e,d){
        $location.path('/adv').search({id:d});
    })
}]);

app.controller('advController',['$scope','$location','advService',function($scope,$location,advService){
    var id=$location.search().id;
    advService.showSingleAdv(id).then(function(results){
        $scope.info=results;
    });

}]);
app.controller('questionController',['$scope','wxJsSdkService','$sce','questionService','$location','commonService','localStorageService',
    function($scope,wxJsSdkService,$sce,questionService,$location,commonService,localStorageService){


    $scope.userInfo=commonService.userInfo;

    $scope.isShowImg=false;
    $scope.isShowVoice=false;
    $scope.isShowExpert=false;
    $scope.imageSrc="";
    $scope.chooseImage=function(){
        wxJsSdkService.clearImageData();
        wxJsSdkService.image.chooseImage(function(src){
            //$scope.$apply($scope.imageSrc = $sce.trustAsResourceUrl(src));
            //$scope.$apply($scope.isShowImg=true);

            $scope.$apply($scope.imageSrc =src);
            $scope.$apply($scope.isShowImg=true);

        });
    };
    $scope.delImg=function(){
        wxJsSdkService.clearImageData();
        $scope.isShowImg=false;
        $scope.imageSrc="";
    };
    $scope.delExpert=function(){
        $scope.selectedExpert.headImgUrl='';
        $scope.selectedExpert.expertId='';
        $scope.selectedExpert.expertName='';
    };
    $scope.showImg=function(){
        var url=wxJsSdkService.getImageLocalId();
        wxJsSdkService.setPreviewImageUrls(url,[url]);
        wxJsSdkService.image.previewImage();
    };
    $scope.voice={
        isVoiceComplete:false,
        isStrartRecord:false,
        seVoiceEmpty:true,
        startRecordVoice:function(){
            wxJsSdkService.voice.startRecord(function(){
                $scope.voice.isStrartRecord=true;
                //$scope.$apply($scope.info.voice.seVoiceEmpty=false);
            });
        },
        stopRecordVoice:function(){
            wxJsSdkService.voice.stopRecord(function(){
                $scope.voice.isStrartRecord=false;
                //$scope.$apply($scope.info.voice.seVoiceEmpty=false);
            })
        },
        clear:function(){
            wxJsSdkService.clearVoiceData();
            $scope.voice.isStrartRecord=false;
            $scope.voice.isVoiceComplete=false;
            $scope.isShowVoice=false;
        },
        testPlayVoice:function(){
            wxJsSdkService.voice.playVoice();
        },
        initVoiceState:function(){
            $scope.voice.isVoiceComplete=false;
            $scope.voice.isStrartRecord=false;
            $scope.voice.seVoiceEmpty=true;
        }
    };
    $scope.text={
        inputtest:{
            max:200,
            content:'',
            currNumber:0
        },checkText:function(){
            if($scope.text.inputtest.content.length==undefined)return false;
            if($scope.text.inputtest.content.length>200){
                $scope.text.inputtest.content=$scope.text.inputtest.content.substr(0,200);
            };
            $scope.text.inputtest.currNumber=$scope.text.inputtest.content.length;
            $scope.data.comment=$scope.text.inputtest.content;
        }
    };
    wxJsSdkService.events(function(){
        $scope.voice.isVoiceComplete=true;
    });
    $scope.data={
        title:'',
        comment:'',
        tag:''
    };
    $scope.submitForm=function(isValid){
        if (isValid) {
            return;
        };
        $scope.isLoading=true;
        var title=$scope.data.title;
        //var comment=$scope.data.comment;
        var comment=$scope.text.inputtest.content;
        var tag=$scope.data.tag;
        var expert=$scope.selectedExpert.expertId;
        questionService.addFile(title,comment,tag,expert).then(function(results){
            $scope.isLoading=false;
            addImage(results);
            addVoice(results);
            $location.path("/result").search({title:'发布成功！',desc:'',hash:'home'});
        });
    };
    function addImage(fileId){
        var imageData=wxJsSdkService.getImageLocalId();
        if(imageData){
            $scope.isLoading=true;
            wxJsSdkService.image.uploadImage(function(data){
                $scope.isLoading=false;
                if(data.errMsg=='uploadImage:ok'){
                    var imageMediaId=data.serverId;
                    questionService.addImage(fileId,imageMediaId).then(function(results){

                    });
                }
            });
        }
    };
    function addVoice(fileId){
        var voiceData=wxJsSdkService.getVoiceLocalId();
        if(voiceData){
            $scope.isLoading=true;
            wxJsSdkService.voice.uploadVoice(function(data){
                $scope.isLoading=false;
                if(data.errMsg=='uploadVoice:ok'){
                    var voiceMediaId=data.serverId;
                    questionService.addVoice(fileId,voiceMediaId).then(function(results){

                    })
                }
            });
        }
    };
    $scope.$on('to-question',function(d,data){
        $scope.expert=data.id;
    });
    $scope.selectedExpert={
        expertId:'',
        expertType:0,
        expertName:'',
        headImgUrl:'../../../content/imgs/upload.jpg'
    };
    var getExpert=function(){
        var model=$location.search().mode;

        if(model=="selected"){
            var values=$location.search().values;
            $scope.selectedExpert.expertId=values.expertId;
            $scope.selectedExpert.expertType=values.expertType;
            $scope.selectedExpert.expertName=values.expertName;
            $scope.selectedExpert.headImgUrl=values.headImgUrl;
            showQuestionData();
        }else{
            if(commonService.defaultExpert==null){
                return false;
            }
            $scope.defaultExpert=commonService.defaultExpert;
            $scope.selectedExpert.expertId=commonService.defaultExpert.id;
            $scope.selectedExpert.expertType=commonService.defaultExpert.expertType;
            $scope.selectedExpert.expertName=commonService.defaultExpert.uname;
            $scope.selectedExpert.headImgUrl=commonService.defaultExpert.imgUrl;
        }
    }();
    function showQuestionData(){
        var state=$location.search().state;
        if(state==null) return false;
        $scope.text.inputtest.content=state.desc.content;
        $scope.text.inputtest.currNumber=state.desc.number;
        $scope.imageSrc=state.img.headImgUrl;
        $scope.isShowImg=state.img.isShowImg;

    };
    $scope.showExpert=function(){
        var state={
            desc:{
                number:$scope.text.inputtest.currNumber,
                content:$scope.text.inputtest.content
            },img:{
                src:$scope.imageSrc,
                isShowImg:$scope.isShowImg
            }
        };
        $location.path("/myexpert").search({hash:'question',state:state});
    }
}]);

app.controller('homeController',['$scope','wxJsSdkService','homeService','playerService','commonService',
    'likeService','commentService','$location','topService','advService','wxShareService','$rootScope',
    function($scope,wxJsSdkService,homeService,playerService,commonService,likeService,commentService,$location,topService,advService,wxShareService,$rootScope){
        var gets=function(){
            $scope.isLoading=true;
            homeService.gets(0).then(function(results){
                $scope.isLoading=false;
                $scope.infos = homeService.take(results);

                $scope.moreThen=$scope.infos.length;
            })
        };
        $scope.player= playerService;

        $scope.nickName=function(){
            return commonService.wxUserInfo.NickName;
        };
        $scope.addLike=function(playerTaskId){
            likeService.add(playerTaskId).then(function(){

            })
        };
        $scope.addComment=function(context,playerTaskId){
            commentService.add(context,playerTaskId)
        };
        $scope.browse=function(id){
            homeService.browse(id).then(function(results){

            })
            $location.path('/testing').search({fileId:id});
        };

        $scope.addLike=function(playerTaskId){
            likeService.add(playerTaskId).then(function(){

            })
        };
        $scope.share=function(fileId) {
            $location.path('/personalshare').search({fileId:fileId});
        };


        $scope.getFileType=function(type){
            return commonService.getFileType(type);
        };


        $scope.setTop=function(playerTaskId){
            topService.set(playerTaskId);
        };
        $scope.reflesh=function(){
            homeService.init();
            gets();
            $scope.currLink.newest=true;
            $scope.currLink.top=false;
            $scope.currLink.expert=false;
        };

        $scope.expert=function(){
            $scope.currLink.newest=false;
            $scope.currLink.top=false;
            $scope.currLink.expert=true;
        };

        $scope.currLink={
            newest:true,
            top:false,
            expert:false
        };
        $scope.showImg=function(url){
            wxJsSdkService.setPreviewImageUrls(url,[url]);
            wxJsSdkService.image.previewImage();
        };
        $scope.delete=function(fileId){
            homeService.delete(fileId).then(function(results){

            })
        };
        $scope.black=function(openId){
            homeService.black(openId).then(function(results){

            })
        };

        $scope.showAdv=function(id){
            $scope.$broadcast('advShowDetail',id);
        };

        wxShareService.default();

        $scope.folded=true;
        $scope.foldedName="全文";
        $scope.fold=function(){
            if($scope.folded==true){
                $scope.folded=false;
                $scope.foldedName="收起";
            }else{
                $scope.folded=true;
                $scope.foldedName="全文";
            }
        };

        var pageInfo= {
            default: {
                currentPage:0,
                totalPage: 1,
                busy: false
            }
        };
        homeService.init();
        // 首页请求数据方法
        $scope.loadDefaultMore=function(){
            if (pageInfo.default.currentPage < pageInfo.default.totalPage) {
                pageInfo.default.currentPage++;
                if (pageInfo.default.busy) {
                    return false;
                }
                pageInfo.default.busy = true;
                $scope.isLoading=true;
                homeService.gets(pageInfo.default.currentPage).then(function(results){
                    $scope.isLoading=false;
                    var infos= homeService.take(results.userFileList);
                    console.log("我的值");
                    console.log(infos);
                    if(pageInfo.default.currentPage==1){
                        advService.showAdv().then(function(advs){
                            $scope.infos=homeService.getTaskAndAdv(advs);
                            pageInfo.default.busy = false;
                        });
                    }else{
                        $scope.infos=infos;
                        pageInfo.default.busy = false;
                    }
                    pageInfo.default.totalPage = results.pageTotal;
                });
            }
        };
        $scope.loadDefaultMore();
        $scope.attention=$rootScope.attention;
    }
]);

app.controller('essenceController',['$scope','wxJsSdkService','homeService','playerService','commonService',
    'likeService','commentService','$location','topService','advService','wxShareService',
    function($scope,wxJsSdkService,homeService,playerService,commonService,likeService,commentService,$location,topService,advService,wxShareService){

        $scope.addLike=function(playerTaskId){
            likeService.add(playerTaskId).then(function(){

            })
        };
        $scope.browse=function(id){
            homeService.browse(id).then(function(results){

            })
            $location.path('/testing').search({fileId:id});
        };
        $scope.delete=function(fileId){
            homeService.delete(fileId).then(function(results){

            })
        };
        $scope.folded=true;
        $scope.foldedName="全文";
        $scope.fold=function(){
            if($scope.folded==true){
                $scope.folded=false;
                $scope.foldedName="收起";
            }else{
                $scope.folded=true;
                $scope.foldedName="全文";
            }
        };

        var pageInfo= {
            default: {
                currentPage:0,
                totalPage: 1,
                busy: false
            }
        };
        homeService.init();
        //精华请求数据方法
        $scope.loadDefaultMore=function(){
            if (pageInfo.default.currentPage < pageInfo.default.totalPage) {
                pageInfo.default.currentPage++;
                if (pageInfo.default.busy) {
                    return false;
                }
                pageInfo.default.busy = true;
                $scope.isLoading=true;
                homeService.top(pageInfo.default.currentPage).then(function(results){
                    $scope.isLoading=false;
                    var infos= homeService.take(results.userFileList);
                    $scope.infos=infos;
                    pageInfo.default.busy = false;
                    pageInfo.default.totalPage = results.pageTotal;
                });
            }
        };
        $scope.loadDefaultMore();
    }
]);
app.controller('myQuestionController',['$scope','wxJsSdkService','homeService','playerService','commonService',
        'likeService','commentService','$location','topService',
        function($scope,wxJsSdkService,homeService,playerService,commonService,likeService,commentService,$location,topService){
            var gets=function(){
                $scope.isLoading=true;
                homeService.getMyAllTask().then(function(results){
                    $scope.isLoading=false;
                    $scope.infos= homeService.take(results.userFileList);
                    $scope.moreThen=$scope.infos.length;
                })
            };

            homeService.init();
            gets();

            $scope.player= playerService;
            $scope.nickName=function(){
                return commonService.wxUserInfo.NickName;
            };
            $scope.addLike=function(playerTaskId){
                likeService.add(playerTaskId).then(function(){

                })
            };
            $scope.browse=function(id){
                homeService.browse(id).then(function(results){

                })
                $location.path('/testing').search({fileId:id});
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

app.controller('myAnswersController',['$scope','wxJsSdkService','homeService','playerService','commonService',
        'likeService','commentService','$location','topService',
        function($scope,wxJsSdkService,homeService,playerService,commonService,likeService,commentService,$location,topService){
            var gets=function(){
                $scope.isLoading=true;
                homeService.getMyAnswers().then(function(results){
                    $scope.isLoading=false;
                    $scope.infos= homeService.take(results.userFileList);
                    $scope.moreThen=$scope.infos.length;
                })
            };

            homeService.init();
            gets();

            $scope.player= playerService;
            $scope.nickName=function(){
                return commonService.wxUserInfo.NickName;
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
            };
            $scope.browse=function(id){
                homeService.browse(id).then(function(results){

                })
                $location.path('/testing').search({fileId:id});
            }

        }
    ]
);
app.controller('msgController',['$scope','$location',function($scope,$location){
    var params=$location.search();
    $scope.params={
        title:params.title,
        desc:params.desc,
        hash:params.hash
    };
}]);

app.controller('expertController',['$scope','expertService',function($scope,expertService){
    $scope.isLoading=true;
    $scope.getSingle=function(id){
        expertService.single(id).then(function(results){
            $scope.single=results;
        })
    };
    expertService.list().then(function(results){
        $scope.isLoading=false;
        $scope.list=results;
    });
    $scope.currExpert="";
    $scope.serverUrl=expertService.serverUrl;
    $scope.tell=function(id){
        $scope.$emit('to-question',{id:id});
    };

}]);
app.controller('viewExpertController',['$scope','viewExpertService','$location','wxShareService','commonService','expertService',function($scope,viewExpertService,$location,wxShareService,commonService,expertService){
    //$scope.paging=new Demo();

    var pageInfo= {
        default: {
            currentPage:0,
            totalPage: 1,
            busy: false,
            item:[]
        }
    };
    // 首页请求数据方法
    $scope.loadDefaultMore=function(){
        if (pageInfo.default.currentPage < pageInfo.default.totalPage) {
            pageInfo.default.currentPage++;
            if (pageInfo.default.busy) {
                return false;
            }
            pageInfo.default.busy = true;
            $scope.isLoading=true;
            viewExpertService.gets(pageInfo.default.currentPage).then(function(results){
                $scope.isLoading=false;
                for(var i=0;i<results.list.length;i++){
                    pageInfo.default.item.push(results.list[i]);
                }
                pageInfo.default.busy = false;
                $scope.items=pageInfo.default.item;
                pageInfo.default.totalPage = results.pageTotal;
            });
        }
    };
    $scope.loadDefaultMore();


    $scope.detail=function(id){
        $location.path("/expertdetail").search({id:id});
    };
    $scope.hash=$location.search().hash;
    $scope.state=$location.search().state;

    $scope.selectExpert=function(expertId,expertType,expertName,headImgUrl){
        $location.path($scope.hash).search({mode:'selected',values:{expertId:expertId,expertType:expertType,expertName:expertName,headImgUrl:headImgUrl},state:$scope.state});
    };
    $scope.setExpert=function(expertId,expertType,expertName,headImgUrl){
        expertService.setMyExpert(expertId,expertType).then(function(){
            $location.path($scope.hash).search({mode:'selected',values:{expertId:expertId,expertType:expertType,expertName:expertName,headImgUrl:headImgUrl},state:$scope.state});
        })
    };

    wxShareService.custom("家教问答","家教智慧专家介绍",1,"expert");

}]);
app.controller('expertDetailController',['$scope','expertService','$location','wxShareService','commonService',function($scope,expertService,$location,wxShareService,commonService){
    var id=$location.search().id;
    $scope.isMyExpert=0;

    var pageInfo= {
        default: {
            currentPage:0,
            totalPage: 1,
            busy: false,
            item:[]
        }
    };
    // 首页请求数据方法
    $scope.loadDefaultMore=function(){
        if (pageInfo.default.currentPage < pageInfo.default.totalPage) {
            pageInfo.default.currentPage++;
            if (pageInfo.default.busy) {
                return false;
            }
            pageInfo.default.busy = true;
            $scope.isLoading=true;
            expertService.detial(id,pageInfo.default.currentPage).then(function(results){
                $scope.isLoading=false;
                $scope.details=results;
                console.log(results);
                $scope.isMyExpert=results.isMyExpert;
                for(var i=0;i<results.qus.questionsList.length;i++){
                    pageInfo.default.item.push(results.qus.questionsList[i]);
                }
                pageInfo.default.busy = false;
                $scope.items=pageInfo.default.item;
                console.log($scope.items);
                pageInfo.default.totalPage = results.qus.pageTotal;
            });
        }
    };
    $scope.loadDefaultMore();

/*
    expertService.detial(id,pageIndex).then(function(results){
        $scope.details=results;
        $scope.isMyExpert=results.isMyExpert;
        //share(results.nickName,results.expertId);
    });

    */
    $scope.addLike=function(expertId){
        expertService.addLike(expertId).then(function(){

        })
    };
    $scope.selectedExpert=function(expertType,expertName,expertId,headImgUrl){

        $location.path("/question").search({mode:'selected',values:{expertId:expertId,expertType:expertType,expertName:expertName,headImgUrl:headImgUrl}});
    };
    $scope.setMyExpert=function(expertId,expertType){
        expertService.updateMyExpert(expertId,expertType).then(function(results){

        });
        if($scope.isMyExpert==0){
            $scope.isMyExpert=1;
        }else{
            $scope.isMyExpert=0;
        }
    }
    function share(teach,id){
        var title='家教问答';
        var desc='家教智慧教育专家【'+teach+'】为你提供家庭教育一对一免费服务';
        var page="expertdetail";
        wxShareService.custom(title,desc,id,page);
    }
}]);
app.controller('answerController',['$scope','wxJsSdkService','commentService','answerService','$location','commonService','wxShareService',
    function($scope,wxJsSdkService,commentService,answerService,$location,commonService,wxShareService){
        var id=$location.search().fileId;
        $scope.isLoading=true;
        answerService.get(id).then(function(results){
            $scope.isLoading=false;
            $scope.info=results;
            console.log(results);
            //share(results.content,results.fileId);
            wxShareService.custom("家教问答",results.content,results.fileId,"testing");
            $scope.userOpenId=commonService.openId;
        });
        $scope.getAnswerInfo=function(){
            return{
                nickName:commonService.nickName,
                headImgUrl:commonService.headImgUrl,
                sex:commonService.gender.text,
                openId:commonService.openId,
                expertType:commonService.expertType,
                expertId:0
            }
        };
        $scope.addComment=function(context,playerTaskId,expertType,sex,expertId){
            commentService.add(context,playerTaskId,expertType,sex,expertId)
        };
    }
]);

app.controller('unansweredController',['$scope','wxJsSdkService','homeService','playerService','commonService',
        'likeService','commentService','$location','topService',
        function($scope,wxJsSdkService,homeService,playerService,commonService,likeService,commentService,$location,topService){
            var gets=function(){
                $scope.isLoading=true;
                homeService.getUnanswered().then(function(results){
                    $scope.isLoading=false;
                    $scope.infos= homeService.take(results.userFileList);
                    $scope.moreThen=$scope.infos.length;
                })
            };

            homeService.init();
            gets();

            $scope.player= playerService;
            $scope.nickName=function(){
                return commonService.wxUserInfo.NickName;
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
            };
            $scope.browse=function(id){
                homeService.browse(id).then(function(results){

                })
                $location.path('/testing').search({fileId:id});
            }

        }
    ]
);
app.controller('joinController',['$scope','joinService',function($scope,joinService){
    joinService.isJoin().then(function(results){
        $scope.isExist=results;
    });
    $scope.add=function(name){
        joinService.join(name).then(function(results){
            $scope.info=results;
            $scope.isExist=(results!=null && results!="")?0:-1;
        });
    };
    $scope.isExist=-1;
    $scope.name="";
}]);

app.controller('dialogController',['$scope','$rootScope',function($scope,$rootScope){
    $scope.attention = $rootScope.attention;
    $scope.globalOpenId = $rootScope.globalOpenId;

    console.log($rootScope.attention);
    console.log($rootScope.globalOpenId);
}]);