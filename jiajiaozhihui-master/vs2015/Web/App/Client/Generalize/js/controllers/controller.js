app.controller('createController', ['$scope', '$location', 'wxJsSdkService', 'createService', '$location', 'cacheService', function ($scope, $location, wxJsSdkService, createService, $location, cacheService) {
    $scope.showLoadding = false;
    $scope.valid_date = "";
    $scope.title = "";
    $scope.currentClass="";
    $scope.currentGrade='1';
    $scope.grade=[
        {name:'初级群', value:'1'},
        {name:'高级群', value:'2'},
    ];
    createService.init().then(function(res){
        $scope.title=res.groupName;
    });

    $scope.chooseImage = function () {
        if ($scope.valid_date == "") {
            alert("请输入有效日期");
            return;
        }
        if ($scope.title == "") {
            alert("请输入标题");
            return;
        }
        var user = cacheService.user;
        if (user.id == undefined || user.id == null) {
            $location.path("/login");
        }
        wxJsSdkService.chooseImage(function () {
            wxJsSdkService.uploadImage(function (data) {
                    $scope.showLoadding = true;
                createService.uploadImg(data.serverId, $scope.valid_date, $scope.title,$scope.currentGrade,$scope.currentClass ).then(function (result) {
                    if (result == "ok") {
                        $scope.showLoadding = false;
                        $location.path("/tip").search({
                            title: "上传成功",
                            desc: "",
                            hash: "create",
                            img: ""
                        });
                    } else {
                        $location.path("/tip").search({
                            title: "上传失败",
                            desc: "",
                            hash: "create",
                            img: ""
                        });
                    }
                })
            })
        });
    };
} ]);
app.controller('tipController', ['$scope', '$location', function ($scope, $location) {
    var params = $location.search();
    $scope.params = {
        title: params.title,
        desc: params.desc,
        hash: params.hash,
        href: params.href,
        img: params.img,
        msgtype: params.msgtype || 'success',
    };
}]);

app.controller('loginController', ['$scope', 'loginService', '$location', function ($scope, loginService, $location) {
    $scope.userInfo = {
        userName: "",
        password:""
    };
    $scope.submitted = false;
    $scope.error = false;
    $scope.login = function () {
        if ($scope.loginForm.$valid) {
            loginService.login($scope.userInfo.userName, $scope.userInfo.password).then(function (result) {
                console.log(result);
                if (result == "") {
                    $scope.error = true;
                    console.log("空");
                } else {
                    
                    $location.path("/home");
                }
            });
        } else {
            $scope.submitted = true;
        }
    }
}]);
app.controller('homeController', ['$scope', 'homeService', '$location', '$rootScope', function ($scope, homeService, $location, $rootScope) {

    $scope.showLoadding = true;
    homeService.list().then(function (result) {
        $scope.showLoadding = false;
        $scope.list = result;
    });
    
    $scope.busy=false;
    $scope.using = function (groupId,catalogue) {
        $scope.busy=true;
        homeService.using(groupId,catalogue).then(function (result) {
            $scope.busy=false;
            $scope.list = result;
        });
    }
    $scope.detail = function (id) {
        $location.path("/detail").search({ id: id });
    };
    $scope.isValidDate = function (date) {
        var now = moment().format("YYYY-MM-DD");
        var end = moment(date).format("YYYY-MM-DD");
        var t1 = moment(now).isBefore(moment(end));
        var t2 = moment(now).isSame(moment(end));
        return t1 || t2;
    };
    $scope.groupName = homeService.getGroupName();
}]);

app.controller('detailController', ['$scope', 'homeService', '$location','wxJsSdkService', function ($scope, homeService, $location,wxJsSdkService ) {
    var id = $location.search().id;
    $scope.submitted=false;
    $scope.serverId='';

    $scope.showLoadding = true;

    $scope.grade=[
        {name:'初级群', value:'1'},
        {name:'高级群', value:'2'},
    ];
    homeService.detail(id).then(function (result) {
        $scope.showLoadding = false;
        $scope.info = result;
        //格式转化
        $scope.info.valid_date=new Date(result.valid_date);
    });
    $scope.delete = function (id) {
        if (confirm("你确定要从列表中移除当前数据吗？")) {
            homeService.dele(id).then(function (result) {
                $location.path("/home");
            });
        }
    };
    $scope.isValidDate = function (date) {
        var now = moment().format("YYYY-MM-DD");
        var end = moment(date).format("YYYY-MM-DD");
        var t1 = moment(now).isBefore(moment(end));
        var t2 = moment(now).isSame(moment(end));
        return t1 || t2;
    };

    $scope.submitForm = function(isValid) {
        if (!isValid) {
            console.log('验证失败');
            $scope.submitted = true;
        }else{
            $scope.showLoadding = true;
            homeService.update({
                id:$scope.info.id,
                title:$scope.info.title,
                catalogue:$scope.info.catalogue,
                classname:$scope.info.class_name,
                validdate: moment($scope.info.valid_date).format("YYYY-MM-DD"),
                serverid:$scope.serverId
            }).then(function(res){
                $scope.showLoadding = false;
                $scope.serverId='';
                $location.path("/tip").search({
                    title: res=='ok'?'修改成功':'上传失败',
                    desc: "",
                    hash: "home",
                    img: "",
                    msgtype: res=='ok'?'success':'error'
                });
            })
        }
    };
    $scope.chooseImage1 = function () {
        wxJsSdkService.chooseImage(function (src) {
            $("#groupSrc").attr("src",src);
            wxJsSdkService.uploadImage(function (data) {
                $scope.$apply(function(){
                    $scope.serverId= data.serverId;
                })
            })
        });
    };

}]);
app.controller('posterController', ['$scope', 'posterService', '$location','$filter', function ($scope, posterService, $location,$filter) {
    $scope.showLoadding = false;
    $scope.createPoster = function () {
        $scope.showLoadding = true;
        posterService.createPoster().then(function (result) {
            if (result == "ok") {
                $scope.showLoadding = false;
                $location.path("/tip").search({
                    title: "海报生成成功",
                    desc: "<p class='text-left text-muted'>请注意查看公众号消息<p>",
                    hash: "home",
                    img: "",
                    msgtype: 'success'
                });
            } else {
                $scope.showLoadding = false;
                $location.path("/tip").search({
                    title: "海报生成失败",
                    desc: "",
                    hash: "home",
                    img: "",
                    msgtype: 'error'
                });
            }
        })
    };
    $scope.createAdvancedPoster = function () {
        $scope.showLoadding = true;
        posterService.createAdvancedPoster().then(function (result) {
            if (result == "ok") {
                $scope.showLoadding = false;
                $location.path("/tip").search({
                    title: "海报生成成功",
                    desc: "<p class='text-left text-muted'>请注意查看公众号消息<p>",
                    hash: "home",
                    img: "",
                    msgtype: 'success'
                });
            } else {
                $scope.showLoadding = false;
                $location.path("/tip").search({
                    title: "海报生成失败",
                    desc: "",
                    hash: "home",
                    img: "",
                    msgtype:'error'
                });
            }
        })
    }
    var primary=[]; /*初级海报 */
    var advanced=[]; /*高级海报 */
    posterService.getTpl().then(function(res ){
        console.log(res);
        primary=$filter('filter')(res, {'catalogue':1});
        advanced=$filter('filter')(res, {'catalogue':2});
        

        $scope.tmp={
            primary:{
                currentTmp:primary[0],
                index:0,
                total:primary.length
            },
            advanced:{
                currentTmp:advanced[0],
                index:0,
                total:advanced.length
            }
        }
    })
    
    $scope.changeTpl=function(catalogue){
        if(catalogue==2){
            if($scope.tmp.advanced.index>=advanced.length-1){
                $scope.tmp.advanced.index=0;
            }else{
                $scope.tmp.advanced.index+=1;
            }
            $scope.tmp.advanced.currentTmp=advanced[$scope.tmp.advanced.index];
        }else{
            if($scope.tmp.primary.index>=primary.length-1){
                $scope.tmp.primary.index=0;
            }else{
                $scope.tmp.primary.index+=1;
            }
            $scope.tmp.primary.currentTmp=primary[$scope.tmp.primary.index];
        }
    }

    $scope.createPosterByTpl = function (catalogue,tplid) {
        $scope.showLoadding = true;
        posterService.createPosterByTpl(tplid,catalogue).then(function (result) {
            if (result == "ok") {
                $scope.showLoadding = false;
                $location.path("/tip").search({
                    title: "海报生成成功",
                    desc: "<p class='text-left text-muted'>请注意查看公众号消息<p>",
                    hash: "home",
                    img: "",
                    msgtype: 'success'
                });
            } else {
                $scope.showLoadding = false;
                $location.path("/tip").search({
                    title: "海报生成失败",
                    desc: "",
                    hash: "home",
                    img: "",
                    msgtype: 'error'
                });
            }
        })
    };
}]);

app.controller('tmpController',['$scope',function($scope){
    

    var tempArray=[];
    for(var i=0,len=items.length;i<len;i+=3){
        var list=items.slice(i,i+3);
        if(list.length=1){
            list.push({id:0,src:''},{id:0,src:''});
        }else if(list.length=2){
            list.push({id:0,src:''});
        }
        tempArray.push(list);
     }

     $scope.tmps=tempArray;
}])
