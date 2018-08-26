app.controller("TipController", function ($scope) {
    // 数据可以根据自己使用情况更换
    $scope.datasetData = [
        { nickName: "无名", city: "深圳", headerImgUrl: "http://wx.qlogo.cn/mmopen/oYwP0cFmRU0WM7E4hMSrq39sBldOWcuRViaciamZUvRgeexW3UbB0Wo9jtMs6ibsnjMuEp2km0f0v6YPS9Pq5KNIQ/0" },
        { nickName: "下雨天", city: "武汉", headerImgUrl: "http://wx.qlogo.cn/mmopen/ajNVdqHZLLBu6cCiaucAGtiaUJSeeIlaM0LQ6VbGu9W5QPIdKMzKYCn3b7jZ2K0wZmvsjYmmibiagUtB3FjTq1bo0A/0" },
        { nickName: "斧头", city: "深圳", headerImgUrl: "http://wx.qlogo.cn/mmopen/iczy6nlJJI2Mib48hXxfzoiazWo4bWoH1w16QWEvr43zicMEHsF05MiaRmjYmhasPe28LicxicHpSVEcNHb4mGLibd0A2OMQkQMdrVnD/0" },
        { nickName: "谢秀风", city: "深圳", headerImgUrl:"http://wx.qlogo.cn/mmopen/ajNVdqHZLLDays8picgsrRhnsx10uicYyEC2RrtgqlfFO7ayFDmBkVsCgMUkBvjzFn8iaQTvUb8smiaHETx4ZoVQAJRZZlG4qvXXZ4zPmu2eVlY/0" },
        { nickName: "晶鱼儿🐟", city: "湖南", headerImgUrl: "http://wx.qlogo.cn/mmopen/gKg4PB5PfUd8lkD4VOF7SWicqFK5CnbcywxWiaXwhoMk2Ovd86WMn4T9xngxvJktIs1W6byF05VLPhibMvmqoWPL71sUYHCERW7/0" },
        { nickName: "灰灰", city: "九江", headerImgUrl: "http://wx.qlogo.cn/mmopen/iczy6nlJJI2PlZ4y3AJar2ck7PwuIEp1UIcQWLpnxicr6kAUTKiaVdQGSIQ2Dic4pqZQnnroQACEv00EoQgPzO1yeZsibfe7Py2Bz/0" },
        { nickName: "袁名湖", city: "赣州", headerImgUrl: "http://wx.qlogo.cn/mmopen/Q3auHgzwzM74b9bbtHdO4DjULuS1LHQElKz6v7CUsKDbtx1oPYJnooTklVtS0PBA5S4AH4BGibve65fEVDKicNtccuAXm0xyQoeE7rPmib7HkA/0" },
        { nickName: "小锅锅小", city: "深圳", headerImgUrl: "http://wx.qlogo.cn/mmopen/oYwP0cFmRU0q35fpwQ5H9Kl8dnBdN3KL0v91kibZMibSQcVaBS2fOZ38tIsjtych63PscTrReSQ6SeFXicib7smIMrP9Cn9nUwUW/0" },
        { nickName: "风子", city: "河源", headerImgUrl: "http://wx.qlogo.cn/mmopen/gKg4PB5PfUcPf4ia0pwBG4zRyMWsoIfsNUyyAU0sOvTqdjTlajvY7zD2g1RKSoW4GspboXYKiadic5EjSNoKib1Fq6xMfkSS3kWK/0" },
        { nickName: "胖子", city: "成都", headerImgUrl: "http://wx.qlogo.cn/mmopen/iczy6nlJJI2PlZ4y3AJar2ZjRvFOoDenDpA6orHlBkVibc95MuXibjA7ABq9qXiaEA29o79Qc3yukvibTpJT55mgTDia8cSzh9WnMF/0" },
        { nickName: "清风", city: "洛阳", headerImgUrl: "http://wx.qlogo.cn/mmopen/ajNVdqHZLLCrerlDZnb7VMFSEyzeWmibFtBzefBmHSibY9icfp9Tcia2kDa9GojglgzHmjNITvVqYgyH5xPibQNiaMUg/0" },
        { nickName: "芬", city: "泉州", headerImgUrl: "http://wx.qlogo.cn/mmopen/o3Y0zIelBvKicicSwANJCI4IpGt6RzSs4Celj1DQD5Oic7auX3zADAjyyiagnA4Z202XtxaC4JDctJIfvXlh4y7OCgSAxLXCFJjf/0" },
        { nickName: "雨薇", city: "宜昌", headerImgUrl: "http://wx.qlogo.cn/mmopen/ajNVdqHZLLBWwjZTib1TZzaHC2yj7wYICo0eQlOOBUnU7nZz762ia5AickSzrEBhdAvQORAZb9TcVw3eQPPE8yOOnYjRc6U84lHdCdzicgiab10k/0" },
        { nickName: "E网情深", city: "江门", headerImgUrl: "http://wx.qlogo.cn/mmopen/o3Y0zIelBvLvew7dJyhBF0es507MkXDUwqQOA26XoC42BZKa9P2UB63ic1AKzD0Gib62h03zg3QIesMN8y3KA7ZvugEpH9UuNh/0" },
        { nickName: "蝶^_^  【吻痕】", city: "资阳", headerImgUrl: "http://wx.qlogo.cn/mmopen/dwc9psc7PIYbu2K8EAWfaVSJPSmBHAr6bW3SSPlEgTcy7SDsZkoqtTKORen9IP6fHCCCKDlRwWlic25ic8Xuu8X5vAXibsRKO7F/0" },
        { nickName: "倩倩纹绣师", city: "河池", headerImgUrl: "http://wx.qlogo.cn/mmopen/Yia0s5ic2zfcHbXl5ASz5b80ZDHfyWG2wVgvZwO8jHI9YlXSv4ldOua3z6MhJ24SWxyib7zP9FQ9cCVTJWxq68ucTSvibsicFHzuS/0" },
        { nickName: "黄妙琪", city: "梧州", headerImgUrl: "http://wx.qlogo.cn/mmopen/O4DIQBGHvRZ97jI2LnF2Mk1b47Nfmk5JN2haQ9stsRodsHuqFiceMAR5cpL9SHtGca9fFfL9zPWUVZSGakUcnAXrxYzhAQvKo/0" }
    ]
});



app.controller("homeController", ['$scope', 'wxShareService', '$location', function ($scope, wxShareService, $location) {
    wxShareService.default({
        success: function (res) {
            $scope.$apply(function () {
                $location.path("attention");
            })
        }, error: function () {
        }
    });
}]);

app.controller("shareController", ['$scope', 'wxShareService', '$location', function ($scope, wxShareService, $location) {
    wxShareService.default({
        success: function (res) {
            $scope.$apply(function () {
                $location.path("attention");
            })
        }, error: function () {

        }
    });
}]);

app.controller("attentionController", ['$scope', 'attentionService', function ($scope, attentionService) {
    attentionService.addShsre();
}]);


app.controller("storeController", ['$scope', 'storeService', '$location', function ($scope, storeService, $location) {
    $scope.isLoading = true;
    storeService.getProductInfo().then(function (result) {
        isLoading = false;
        console.log("store");
        console.log(result);
        $scope.productInfos = result;
    });
    $scope.detail = function () {
        
        storeService.hot(106).then(function (result) {
            console.log(result);
            if (result.attention == 1 && result.isShare == true) {
                $location.path("detail").search({ id: 106 });
            } else {
                var params = {
                    title: '领取失败',
                    desc: '亲，差一点你就能领取了，请点击下面的确认后，按提示操作，你就能领起到了',
                    hash: 'home',
                    href: ''
                };
                $location.path("/result").search(params);
            }
        })
    }
}]);

app.controller("detailController", ['$scope', 'detailService', '$location', 'wxJsSdkService', function ($scope, detailService, $location, wxJsSdkService) {
    var id= $location.search().id;
    detailService.getProductInfo(id).then(function (result) {
        console.log("detail");
        console.log(result);
        $scope.productInfo = result;
    });
}]);

app.controller("payController", ['$scope', 'detailService', '$location', 'wxJsSdkService', 'payService', function ($scope, detailService, $location, wxJsSdkService, payService) {
    var id = $location.search().id;
    id = 106;
    detailService.getProductInfo(id).then(function (result) {
        $scope.productInfo = result;
    });
    $scope.openAddress = function () {
        wxJsSdkService.openAddress(function (address) {
            $scope.$apply(function () {
                $scope.address = address;
            });
            
        },function (address) {
            $scope.$apply(function () {
                payService.updateLatestAddress(address).then(function (res) {

                });
            });
        });
    }
    /*获取最新地址*/
    payService.latestAddress().then(function (result) {
        $scope.address = {
            userName: result.name|| '', //收货人姓名。
            postalCode: '',//邮编。
            provinceName: result.province,//国标收货地址第一级地址（省）。
            cityName: result.city,//国标收货地址第二级地址（市）。
            countryName: result.district,// 国标收货地址第三级地址（国家）。
            detailInfo: result.address,//详细收货地址信息。
            nationalCode: result.postCode,// 收货地址国家码   
            telNumber: result.mobile//收货人手机号码
        };
    });
    var unifiedorder = {};
    payService.unifiedOrder(1, id).then(function (result) {
        console.log(result);
        unifiedorder = result;
    });
    $scope.paing = false;
    $scope.pay = function () {
        
        if ($scope.address.userName == "" || $scope.address.telNumber == "") {
            wxJsSdkService.openAddress(function (address) {
                $scope.$apply(function () {
                    $scope.address = address;
                });
            }, function (address) {
                payService.updateLatestAddress(address).then(function () {

                });
            });
            return false;
        };
        payService.unifiedOrder(1, id).then(function (unified) {
            console.log(result);
            payService.createOrder(unified.outTradeNo, id, 1).then(function (result) {
                wxJsSdkService.pay(unified.payParameters, function () {
                    $scope.$apply(function () {
                        $location.path("home");
                    })
                })
            })
        });
    }
}]);

app.controller('msgController', ['$scope', '$location', function ($scope, $location) {
    var params = $location.search();
    $scope.params = {
        title: params.title,
        desc: params.desc,
        hash: params.hash,
        href: params.href,
        img: params.img
    };
}]);

app.controller("rewriteAddressController", ['$scope', 'wxJsSdkService', 'rewriteAddressService', '$location', function ($scope, wxJsSdkService, rewriteAddressService, $location) {
    $scope.openAddress = function () {
        wxJsSdkService.openAddress(function (address) {
            $scope.$apply(function () {
                $scope.address = address;
            });

        }, function (address) {
            $scope.$apply(function () {
                payService.updateLatestAddress(address).then(function (res) {

                });
            });
        });
    }
    $scope.updateAddress = function () {
        /*
        if ($scope.address.userName == "" || $scope.address.telNumber == "") {
            wxJsSdkService.openAddress(function (address) {
                $scope.$apply(function () {
                    $scope.address = address;
                });

            }, function (address) {
                $scope.$apply(function () {
                    payService.updateLatestAddress(address).then(function (res) {

                    });
                });
            });
            return false;
        }
        */
        $scope.address = {
            userName: "袁名湖", //收货人姓名。
            postalCode: '',//邮编。
            provinceName: "广东",//国标收货地址第一级地址（省）。
            cityName: "深圳",//国标收货地址第二级地址（市）。
            countryName: "南山",// 国标收货地址第三级地址（国家）。
            detailInfo: "蛇口",//详细收货地址信息。
            nationalCode: "001",// 收货地址国家码   
            telNumber: "18576689397"//收货人手机号码
        };
        rewriteAddressService.updateAddress($scope.address).then(function (result) {
            if (result == "ok") {
                var params = {
                    title: '收货地址更新成功',
                    desc: '亲，我们将近快为你发货',
                    hash: 'address',
                    href: ''
                };
                $location.path("/result").search(params);
            }
        })
    }
}]);