 var myApp = {}
;(function(){
    //首页地址
    this.indexURL = '';

    this.secret = '';
    this.appID = '';

    //拿openid的接口地址
    this.getOpenIDURL = "";

    //拿授权的接口地址
    this.getTicketURL = "";

    //图片上传的接口地址
    this.uploadPicURL = '';

    this.loadPicURL = '';

    //分销返润的接口地址
    this.esAPI = '';
    




    this.init = function(winhref, callback){
        var self = this
        if(winhref.indexOf(x2headURL) != -1 || winhref.indexOf('localhost:8080') != -1){
            tplurl = "http://p.yshfresh.com/api/tpl/";
            // yshurl = "http://10.2.15.12:3000/api/ysh/";
            yshurl = "http://api2.yshfresh.com/api/ysh/";
            //首页地址
            self.indexURL = 'http://x2.yshfresh.com/yshsc/index_sc.html#Shop_Index';

            self.secret = '';
            self.appID = '';

            //拿openid的接口地址
            self.getOpenIDURL = "http://api2.yshfresh.com/getopenid/";

            //拿授权的接口地址
            self.getTicketURL = "http://api2.yshfresh.com/api/jsapiTicket?href=";

            //图片上传的接口地址
            //self.uploadPicURL = 'http://f.yshfresh.com';
            self.uploadPicURL = 'http://f.yshfresh.com';


            self.loadPicURL = 'img/loading.png';

            //分销返润的接口地址
            self.esAPI = 'http://api2.yshfresh.com/api/';
        }else if (winhref.indexOf(v3headURL) != -1){
            tplurl = "http://c-yshsc.yshfresh.com/api/tpl/";
            yshurl = "http://c-api.yshfresh.com/api/ysh/";
            //首页地址
            self.indexURL = 'http://testv3.yshfresh.com/yshsc/index_sc.html#Shop_Index';

            self.secret = '';
            self.appID = '';

            //拿openid的接口地址
            self.getOpenIDURL = "http://c-api.yshfresh.com/getopenid/";

            //拿授权的接口地址
            self.getTicketURL = "http://c-api.yshfresh.com/api/jsapiTicket?href=";

            //图片上传的接口地址
            self.uploadPicURL = 'http://f.yshfresh.com';

            self.loadPicURL = 'img/loading.png';

            //分销返润的接口地址
            self.esAPI = 'http://c-api.yshfresh.com/api/';
        }else if(winhref.indexOf(v1headURL) != -1){
            tplurl = "http://testv2.yshfresh.com/api/tpl/";
            yshurl = "http://api3.yshfresh.com/api/ysh/";
            //首页地址
            self.indexURL = 'http://testv1.yshfresh.com/yshsc/index_sc.html#Shop_Index';

            self.secret = '';
            self.appID = '';

            //拿openid的接口地址
            self.getOpenIDURL = "http://api3.yshfresh.com/getopenid/";

            //拿授权的接口地址
            self.getTicketURL = "http://api3.yshfresh.com/api/jsapiTicket?href=";

            //图片上传的接口地址
            self.uploadPicURL = 'http://f.yshfresh.com';

            self.loadPicURL = 'img/loading.png';

            //分销返润的接口地址
            self.esAPI = 'http://api3.yshfresh.com/api/';
        }
        FastClick.attach(document.body)
        if(callback && typeof callback === 'function'){
            callback()
        }        
    }

    this.aboutMe = {
        userInfoData: {
            userName: "未设置",
            nikeName: "未设置",
            sex: "男",
            birthDate: "未设置",
            email: "未设置",
            phoneNumber: "未设置",
            headImgSrc: "img/xiaoyuan.png",
            headPicId: 0
        },
        totalPoint: 0,
        couponsCount: 0,
        getCustomerInfo: function(){
            getDataList(yshurl + "cmd_getCustomerInfo", {}, function(d){
                if(d.aaData && d.aaData.length>0){
                    var a = d.aaData[0];
                    if(a.Username){
                        myApp.aboutMe.userInfoData.userName = a.Username
                    }
                    if(a.customerName){
                        myApp.aboutMe.userInfoData.nikeName = a.customerName
                    }
                    if(a.Gender){
                        myApp.aboutMe.userInfoData.sex = a.Gender
                    }
                    if(a.DateOfBirth){
                        myApp.aboutMe.userInfoData.birthDate = a.DateOfBirth.substr(0, 10)
                    }
                    if(a.Emailadd){
                        myApp.aboutMe.userInfoData.email = a.Emailadd
                    }
                    if(a.phonenumb){
                        myApp.aboutMe.userInfoData.phoneNumber = a.phonenumb
                    }
                    if(a.HeadPic){
                        myApp.aboutMe.userInfoData.headImgSrc = myApp.uploadPicURL + a.Picurl
                        myApp.aboutMe.userInfoData.headPicId = a.HeadPic
                    }
                }
            })
            getDataList(yshurl+"GetWalletInfo", {}, function(d){//积分
                if(d.aaData && d.aaData.length>0){
                    if(d.aaData[0].TotalPoint){
                        myApp.aboutMe.totalPoint = d.aaData[0].TotalPoint
                    }
                }            
            },true);
            getDataList(yshurl+"cmd_pGetCustomerCoupons", {SearchType:1}, function(d){//优惠卷
                if(d.aaData && d.aaData[1]){
                    if(d.aaData[1][0].$nouseCount){
                        myApp.aboutMe.couponsCount = d.aaData[1][0].$nouseCount
                    }
                }            
            },true);
        },
        updateCustomerBasicInfo: function(callback){
            getDataList(yshurl+"UpdateCustomerBasicInfo",{
                pEmailadd:myApp.aboutMe.userInfoData.email,
                pPhonenumb:myApp.aboutMe.userInfoData.phoneNumber,
                pFirstName:myApp.aboutMe.userInfoData.nikeName,
                pDateOfBirth:myApp.aboutMe.userInfoData.birthDate,
                pGender:myApp.aboutMe.userInfoData.sex,
                HeadPic:myApp.aboutMe.userInfoData.headPicId
            },function(d){
                if(typeof callback === 'function'){
                    callback()
                    layer.msg('保存成功', {
                        time: 2000
                    })
                }
            })
        }
    }


    this.proCate = {
        data:{
            navList: [],
            cateID: 0,
            pageIndex: 0,
            pageSize: 6
        },
        func:{
            getNavLists: function(){
                getDataList(yshurl + 'SelectCategoryListFront', {}, function(d){
                    if(d.state == 0 && d.aaData.length > 0){
                        myApp.proCate.data.navList = d.aaData
                    }
                })
            },
            handleData: function(d){
                if(d.aaData.length > 0 && d.aaData[0].length >0){
                    var dataList = d.aaData[0]
                    for(var i = 0, l = dataList.length; i < l; i++){
                        if(dataList[i].IsSpecial && dataList[i].endDatetime2){
                            if(!myApp.isOverTime(dataList[i].endDatetime2)){
                                dataList[i].IsSpecial = 0
                            }
                        }
                    }
                }
            }
        }
    }

    this.orderfill = {
        cate: 0
    }








    myApp.backhashString = '';
    this.page = '';
    this.scIndexURL = '';
    this.regEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    this.regManName = /^[\u4e00-\u9fa5A-Za-z0-9_]+$/;
    this.iconFont = {
        shopCart: '&#xe61e;',
        message: '&#xe605;',
        index: '&#xe61f;',
        call: '&#xe622;',
        me: '&#xe627;',
        cate: '&#xe637;',
        order: '&#xe619;',
        messageOn: '&#xe629;',
        indexOn: '&#xe62f;',
        callOn: '&#xe623;',
        meOn: '&#xe626;',
        cateOn: '&#xe63c;',
        orderOn: '&#xe634;'
    };
    this.adList = [];
    this.bestSellList = [];
    this.channelID = null;
    this.channelName = "";
    this.indexBanner = null;
    this.regHTML = /<\/?[^>]*>/g;
    this.reg = {
        info: {
            username: "",
            identifyingCode: "",
            pwd: '',
            cpwd: ''
        }
    }
    this.productInfo = {
        proCateID: 0,
        sssid: 0,
        CartID: 0,
        shareUserID: 0,
        shareLink: '',
        userID: 0,
        skuId: null,
        productId: null,
        syCode: null,
        price: null,
        fullDescription: null,
        inputVal: null,
        regNum: /^[1-9]\d*$/,
        getProReview: {
            ProductId: null,
            ReviewType: 1,
            startnum: 0,
            endnum: 15,
            PageIndex: 0,
            PageSize: 100,
        },
        isLogin: null,
        toLogin: {
            action:"shop_login", 
            upd:{
                nouserid: 1,
                suyuancode: null,
                productid: null,
                skuid: null,
                sssid: 0,
                nouserid2:1,
            }
        },
        basePicList: null,
        bornPicList: null,
        proPicList: null,
        swiperPicList: null,
        ncPicList: null,
        syDetectInfony: [],
        syDetectInfofl: [],
        Coordinates: null,
        syData: null,
        proData: null,
        reviewList: null,
        AVGList: null,
        proSpecList: null,
        smallPic: "",
        winLocation: ''
    };
    this.keyHotWordData = [];
    this.keyHotPro = [];
    this.index = {
        isUserExist: {
            openidd: null
        },
        getAd: {
            Position: "Shop_Index_01",
            ChannelId: null,
        },
        getBestSell: {
            PageIndex: 0,
            PageSize: 8,
            channelId: null,
        },
        data: {
            aDContent: []
        }
    };

    this.productCate = {
        cateIndex: 0
    };
    this.swiperDefaultOpts = {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
        effect : 'fade',
        fade: {
            crossFade: false,
        },
        loop: true
    };
    this.MsgNum = 0;
    this.isLogin = null;
    this.proCateNum = 0;
    this.backPage = null;
    this.regName2 = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/; 
    this.getDataList = {
        productInfo: function(params, fn){
            //获取商品详情
            getDataList(yshurl + "GetProductInfoByProuduct", {ProductId: params.skuId}, function(d) {
                if(d.aaData.length > 0 && !_.isEmpty(d.aaData[0])) { 
                    params.proData =  d.aaData[0];                  
                }else{
                    params.proData = null;
                }
            }, true);

            //获取规格和图片
            getDataList(yshurl + "GetProductSpecById", {ProductId: params.productId}, function(d) {
                if (d.aaData.length > 0 && !_.isEmpty(d.aaData[0])) { 
                    params.proSpecList = d.aaData;
                    for(var i = 0, l = params.proSpecList.length; i < l; i++){
                        if(!params.proSpecList[i].Picurl){
                            params.proSpecList[i].Picurl = "/zanwutupian.jpg";
                        }
                        if(params.proSpecList[i].WeightType){
                            params.proSpecList[i].specContent = params.proSpecList[i].UnitEnty
                                                                + "公斤/"                                                                              
                                                                + params.proSpecList[i].Specifications 
                                                                + params.proSpecList[i].UnitName 
                                                                       
                        }else{
                            params.proSpecList[i].specContent = params.proSpecList[i].Specifications
                                                                + params.proSpecList[i].UnitName;
                        }
                    }
                    params.smallPic = params.proSpecList[0].Picurl.split("|")[0];                  
                }else{
                    params.proSpecList = null;
                }
            }, true);

            //获取溯源信息
            getDataList(yshurl + 'GetSuYuanInfo', {SuyuanCode: params.syCode}, function(d){
                if(d.aaData.length>0 && !_.isEmpty(d.aaData[0]) && !_.isEmpty(d.aaData[0].SuyuanCode)){
                    params.syData = d;
                }else{
                    params.syData = null;
                }
            },true);
            //获取商品评价列表
            getDataList(yshurl + 'GetProductReviewByProductOrCustomer', params.getProReview, function(d){
                params.reviewList = d.many[0];
            });
            //获取商品总体评价
            getDataList(yshurl + 'GetAVGProductRate', {ProductId: params.productId}, function(d){
                if(d.aaData.length>0 && !_.isEmpty(d.aaData[0])){
                    params.AVGList = d.aaData[0];
                }else{
                    params.AVGList = null;
                }
            }, true);
            //获取肥料使用表
            getDataList(yshurl + 'GEtProductRecordList', {SuyuanCode: params.syCode,RecordClassId:2}, function(d){
                if(d.aaData.length){
                    for(var i = 0, len = d.aaData.length; i < len; i++){
                        params.syDetectInfofl.push(handleEmptyData(d.aaData[i]));
                    }
                }else{
                    params.syDetectInfofl = [];
                }
            }, true); 

            //获取农药使用表
            getDataList(yshurl + 'GEtProductRecordList', {SuyuanCode: params.syCode,RecordClassId:1}, function(d){
                if(d.aaData.length){
                    for(var i = 0, len = d.aaData.length; i < len; i++){
                        params.syDetectInfony.push(handleEmptyData(d.aaData[i]));
                    }                   
                }else{
                    params.syDetectInfony = [];
                }
            }, true); 

            //获取农残检测信息
            getDataList(yshurl+'GEtPatientsPicyrl', {SuyuanCode: params.syCode}, function(d){
                if(d.aaData.length>0 && !_.isEmpty(d.aaData[0]) && d.aaData[0].picurl2 && d.aaData[0].picurl2.length>0){
                    params.ncPicList = d.aaData[0].picurl2.split(',');
                }else{
                    params.ncPicList = null;
                }
            }, true);

            fn(params);

            return params;
        },
        getBaseData: function(){
            getDataList(yshurl+'getMsgNum',{},function(d){ 
                myApp.MsgNum = d.aaData.length;             
            },true);
            getDataList(yshurl+"cmd_GetShoppingCartList", {}, function(d){ 
                if(d.aaData.length>0&&d.aaData[0].length>0){                    
                    myApp.proCateNum = d.aaData[0].length;
                }else{
                    myApp.proCateNum = 0;
                }
            },true);
            myApp.renderNav();
        },
        getCartNumber: function(){
            getDataList(yshurl+"cmd_GetShoppingCartList", {}, function(d){ 
                if(d.aaData.length>0&&d.aaData[0].length>0){                    
                    myApp.proCateNum = d.aaData[0].length;
                }else{
                    myApp.proCateNum = 0;
                }
            },true);
            if(myApp.proCateNum>0){
                $("#shopCartNumb").text(myApp.proCateNum).css("display", "block");
            } 
        },
        shopIndex: function(callback){
            myApp.adList = []
            myApp.index.data.aDContent = []
            // getDataList(yshurl+"GetAdContentInfoByPostion", myApp.index.getAd, function(d){
            //     if(d.aaData.length>0){
            //         myApp.adList = d.aaData;
            //     }else{
            //         myApp.adList = [];
            //     }                             
            // },true)
            
            getDataList(yshurl+"GetBestSellProductByCustomerId", myApp.index.getBestSell, function(d){
                if(d.aaData.length>0){
                    myApp.bestSellList = d.aaData;
                }else{
                    myApp.bestSellList = [];
                }            
            }, true)
            getDataList(yshurl+"P_API_GetADcontent", {ChannelId: myApp.channelID}, function(d){
                if(d.aaData.length > 0 && d.aaData[0].length > 0){
                    var dataList = d.aaData[0]
                    for(var i = 0, l = dataList.length; i < l; i++){
                        if(dataList[i].main && dataList[i].main.indexOf('banner') != -1){
                            if (dataList[i].picurl.indexOf('f.yshfresh.com') != -1) {
                                myApp.adList.push(dataList[i])
                            }else{
                                dataList[i].picurl = myApp.uploadPicURL + dataList[i].picurl
                                myApp.adList.push(dataList[i])
                            }                            
                        }else if(dataList[i].main && dataList[i].main.indexOf('adpic') != -1){
                            if(dataList[i].picurl.indexOf('f.yshfresh.com') != -1){
                                myApp.index.data.aDContent.push(dataList[i])
                            }else{
                                dataList[i].picurl = myApp.uploadPicURL + dataList[i].picurl
                                myApp.index.data.aDContent.push(dataList[i])
                            }                                                      
                        }
                    }
                }     
            }, true)
            if(typeof callback === 'function'){
                callback()
            }
        },
        getShareInfo: function(id){
            getDataList(yshurl+"Get_shareInfo", {}, function(d) {
                console.log(d);
                if(d.aaData.length>0){
                    var shareID = d.aaData[0].ShareId;
                    var proID = d.aaData[0].ProductId;
                    var buyBackPrice = d.aaData[0].BuybackPrice;
                    var backPrice = d.aaData[0].BackPrice;
                    // dataHandle("Get_shareInfobyId", {ShareId:shareId},function(d){
                    //     articleName = d.aaData[0].ArticleName;
                    //     articleUrl = d.aaData[0].ArticleUrl;
                    //     notes = d.aaData[0].Notes;
                    //     picurl = d.aaData[0].Picurl;
                    //     window.location.href = articleUrl;
                    // })
                    // loadmain1({action:"zhuanti", upd:{
                    //  aaa:"111", 
                    //  userID: id, 
                    //  shareID:shareID
                    // }});
                    window.location.href = 'zhuanti.html?aaa=111&userID='+ id + '&shareID=' + shareID;
                }                    
            }, true);
        }
    };
    function handleEmptyData(d){
        for(var i in d){
            if(!d[i]){
                d[i] = '暂无';
            }
        }
        return d;
    };
    this.loadIcon = function(){
        var pageLocation = window.location.href
        var navComponent = Vue.extend({
            template: '#navBar'
        })        
        Vue.component('nav-component', navComponent)
        
        new Vue({
            el: '#main-page'
        });
        if(document.getElementById('sc_home')){
            $(".action_cart").find('.iconfont').html(myApp.iconFont.shopCart);
            if(pageLocation.indexOf('Shop_Message') != -1){
                $(".action_msg").find('.iconfont').html(myApp.iconFont.messageOn).end().find('.iconfont').css('color', '#87C644');
            }else{
                $(".action_msg").find('.iconfont').html(myApp.iconFont.message);
            }
            if(pageLocation.indexOf('Shop_Index') != -1 || pageLocation.indexOf('shop_index') != -1){
                $("#sc_home").find('.iconfont').html(myApp.iconFont.indexOn).end().find('.iconfont').css('color', '#87C644');
            }else{
                $("#sc_home").find('.iconfont').html(myApp.iconFont.index);
            }
            if(pageLocation.indexOf('Shop_CustomerService') != -1){
                $(".action_call").find('.iconfont').html(myApp.iconFont.callOn).end().find('.iconfont').css('color', '#87C644');
            }else{
                $(".action_call").find('.iconfont').html(myApp.iconFont.call);
            }
            if(pageLocation.indexOf('Shop_PersonalCenter') != -1){
                $(".action_my").find('.iconfont').html(myApp.iconFont.meOn).end().find('.iconfont').css('color', '#87C644');
            }else{
                $(".action_my").find('.iconfont').html(myApp.iconFont.me);
            }
            if(pageLocation.indexOf('shop_procate') != -1 || pageLocation.indexOf('cate') != -1){
                $("#actionCate").find('.iconfont').html(myApp.iconFont.cateOn).end().find('.iconfont').css('color', '#87C644');
            }else{
                $("#actionCate").find('.iconfont').html(myApp.iconFont.cate);
            }
            if(pageLocation.indexOf('Shop_Order_Filled') != -1){
                $("#actionOrder").find('.iconfont').html(myApp.iconFont.orderOn).end().find('.iconfont').css('color', '#87C644');
            }else{
                $("#actionOrder").find('.iconfont').html(myApp.iconFont.order);
            } 
            if($.isLogin()){
                myApp.getDataList.getBaseData()
            } 
            myApp.backhashString = '?backhash=' + (window.location.hash).replace("#", "").split('?')[0] 
        }          
    };
    this.renderNav = function(){
        if(myApp.MsgNum>0){
            if(myApp.MsgNum>99){
                myApp.MsgNum = '99+';
            }
            $("#msgNumb").text(myApp.MsgNum).css("display", "block");
        }
        if(myApp.proCateNum>0){
            $("#shopCartNumb").text(myApp.proCateNum).css("display", "block");
        } 
    };
    this.bindNavEvents = function(){        
        $('.action_my').unbind('click').on('click', function(){
            $(this).tap(function(){
                $.toUserPage('Shop_PersonalCenter', {})
            },{
                class:"el-click-on"
            });
        });
        $('.action_call').unbind('click').on('click', function(){
            $(this).tap(function(){
                loadmain1({action:'Shop_CustomerService',upd:{}});
            },{
                class:"el-click-on"
            });
        });
        $('.action_msg').unbind('click').on('click', function(){            
            $(this).tap(function(){
                $.toUserPage('Shop_Message', {})                   
            },{
                class:"el-click-on"
            });
        });
        $('.action_cart').unbind('click').on('click', function(){
            $(this).tap(function(){
                if(myApp.isLogin){
                    if(myApp.proCateNum>0){
                        loadmain1({action: "Shop_ShoppingCart_Filled", upd:{}});
                    }else{
                        loadmain1({action: "Shop_ShoppingCart_Empty", upd:{}});
                    }       
                }else{
                    var backUrl = window.location.href.split("#")[0]+"#shop_index";
                    history.pushState(null, null, backUrl)
                    setTimeout(function(){
                        loadmain1({action:"shop_login"})
                    },100)
                }                
            },{
                class:"el-click-on"
            }); 
        });
        $('#sc_home').unbind('click').on('click', function(){
            $(this).tap(function(){
                loadmain1({action:'Shop_Index',upd:{}});
            },{
                class:"el-click-on"
            });
        });
    };
    this.toShorppingCart = function(){
        getDataList(yshurl+"cmd_GetShoppingCartList", {}, function(d){
            if(d.aaData.length>0 && d.aaData[0].length>0){
                loadmain1({action: "Shop_ShoppingCart_Filled", upd:{}});
            }else{
                loadmain1({action: "Shop_ShoppingCart_Empty", upd:{}});
            }
        }, true); 
    };
    this.loadingCount = function(id){
        var t = 5;
        var timer = window.setInterval(function () {
            if(t>=0){
                // if(document.getElementById(id)){
                //  document.getElementById(id).innerHTML = t
                // }
                t--;
            }else{
                $('#loadingPage').fadeOut(2000)
                clearInterval(timer);
            }
            
        }, 1000);
    };
    // this.wxConfig = function(){
    //  getDataList(myApp.getTicketURL+encodeURIComponent(window.location.href.split("#")[0]),
 //         {},function(d){
 //         if(d.aaData.length>0){
    //          wx.config({
    //              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //              appId: myApp.appID, // 必填，公众号的唯一标识
    //              timestamp:d.aaData[1].timestamp, // 必填，生成签名的时间戳
    //              nonceStr: d.aaData[1].noncestr, // 必填，生成签名的随机串
    //              signature: d.aaData[0].signature,// 必填，签名，见附录1
    //              jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //          });
 //         }
 //     },true);
    // };
    this.getOpenIDByCode = function(code, callback){
        $.ajax({
            type:"GET",
            url:myApp.getOpenIDURL+code,
            async: false,
            data:{
                sesskey:window.localStorage.getItem("sesskey").replace('"','').replace('"','')
            },
            success:function(d){
                console.log(code);
                console.log(d);
                if(d && d.aaData && d.aaData.openid){
                    if(typeof callback === 'function'){
                        callback(d)
                    }                    
                }else{
                    window.location.href = myApp.indexURL.split('#')[0] + '#shop_login'
                } 
            },
            error:function(error){
                console.log(error);
            }                  
        });
    };
    this.Events = {
        navBar: {
            toShopCart: function(){
                if(window.location.href.indexOf('index_sc.html') != -1 || window.location.href.indexOf('index_sc_local.html') != -1){
                    if($.isLogin()){
                        getDataList(yshurl+"cmd_GetShoppingCartList", {}, function(d){
                            if(d.aaData.length>0 && d.aaData[0].length>0){
                                loadmain1({
                                    action: 'Shop_ShoppingCart_Filled',
                                    upd: {
                                        backhash: (window.location.hash).replace("#", "").split('?')[0] 
                                    }
                                })
                            }else{
                                loadmain1({
                                    action: 'Shop_ShoppingCart_Empty'
                                })
                            }
                        }, true)                        
                    }else{
                        loadmain1({
                            action: 'shop_login'
                        })
                    }
                }else{
                    if($.isLogin()){
                        getDataList(yshurl+"cmd_GetShoppingCartList", {}, function(d){
                            if(d.aaData.length>0 && d.aaData[0].length>0){
                                window.location.href = myApp.indexURL.split('#')[0] + '#Shop_ShoppingCart_Filled' + myApp.backhashString
                            }else{
                                window.location.href = myApp.indexURL.split('#')[0] + '#Shop_ShoppingCart_Empty'
                            }
                        }, true)                        
                    }else{
                        window.location.href = myApp.indexURL.split('#')[0] + '#shop_login'
                    } 
                }
                 
            },
            toProCart: function(){
                window.location.href = 'shop_procate.html'      
            },
            toIndex: function(){
                if(window.location.href.indexOf('index_sc.html') != -1 || window.location.href.indexOf('index_sc_local.html') != -1){
                    loadmain1({
                        action: 'Shop_Index'
                    })
                }else{
                    window.location.href = myApp.indexURL.split('#')[0] + '#Shop_Index'
                }                
            },
            toOrder: function(){
                window.location.href = 'orderfill.html' 
            },
            toMe: function(){
                if(window.location.href.indexOf('index_sc.html') != -1 || window.location.href.indexOf('index_sc_local.html') != -1){
                    if($.isLogin()){
                        loadmain1({
                            action: 'Shop_PersonalCenter'
                        })
                    }else{
                        loadmain1({
                            action: 'shop_login'
                        })
                    }
                }else{
                    if($.isLogin()){
                        window.location.href = myApp.indexURL.split('#')[0] + '#Shop_PersonalCenter'
                    }else{
                        window.location.href = myApp.indexURL.split('#')[0] + '#shop_login'
                    }
                }
            }
        },
        navBarH: {
            toShopCart: function(){
                if($.isLogin()){
                    getDataList(yshurl+"cmd_GetShoppingCartList", {}, function(d){
                        if(d.aaData.length>0 && d.aaData[0].length>0){
                            window.location.href = myApp.indexURL.split('#')[0] + '#Shop_ShoppingCart_Filled' + myApp.backhashString
                        }else{
                            window.location.href = myApp.indexURL.split('#')[0] + '#Shop_ShoppingCart_Empty'
                        }
                    }, true)                        
                }else{
                    window.location.href = myApp.indexURL.split('#')[0] + '#shop_login'
                } 
            },
            toProCart: function(){
                window.location.href = 'shop_procate.html'      
            },
            toIndex: function(){
                window.location.href = myApp.indexURL.split('#')[0] + '#Shop_Index'
            },
            toOrder: function(){
                if($.isLogin()){
                    window.location.href = 'orderfill.html' 
                }else{
                    window.location.href = myApp.indexURL.split('#')[0] + '#shop_login'
                } 
            },
            toMe: function(){
                if($.isLogin()){
                    window.location.href = myApp.indexURL.split('#')[0] + '#Shop_PersonalCenter'
                }else{
                    window.location.href = myApp.indexURL.split('#')[0] + '#shop_login'
                }
            }
        },
        showYQM: function(){      
            if(myApp.browser.versions.android){
                myApp.goTo('shop_yqm')
            }else{
                $(".shopCar-cover").show(0) 
                $('.model-center').show(0)
                $('.model-center').toggleClass('model-show')
            }
        },
        closeModel: function(){
            $('.model-center').toggleClass('model-show')
            $('.model-center').hide(0)
            $(".shopCar-cover").hide(0)
            $('#yqmTabel').css('top', '50%')
        },
        confirmModel: function(fn){
            myApp.Events.closeModel()
            if (fn && typeof fn === 'function') {
                fn()
            }
        },
        backTop: function(el){
            el.animate({
                scrollTop: 0
            }, 300)
        },
        scroll: function(){
            if ($(document).scrollTop() > 0) {
                $(".sc_hddb").show();
            } else {
                $(".sc_hddb").hide();
            }
        },
        toProductInfo: function(){
            
        },
        'click': {
            '.btn-xsqg-qg': function(el, params){
                window.location.href = myApp.indexURL.split('#')[0] 
                                    + '#Shop_Product_Info?SkuId=' + params.skuid
                                    + '&suyuancode=' + params.suyuancode
                                    + '&productId=' + params.productid
                                    + '&SkuId2=' + params.skuid
            },
            '#toXSQG': function(){
                window.location.href = 'xsqg.html?channelid=' + myApp.channelID
            },
            '.help-q-title': function(el, params){
                el.next().toggleClass('content-s')
            },
            '#toXY': function(){
                myApp.goTo('Shop_CustomerService')
            },
            '#toMsg': function(){
                myApp.goTo('Shop_Message')
            },
            '.sc_qggb': function(){
                window.location.href = 'shop_procate.html'
            },
            '#closeYQMBox2': function(){
                myApp.goTo('Shop_PersonalCenter')
            },
            '#submitYQMBox2': function(){
                myApp.submitYQM(function(){
                    // myApp.goTo('Shop_PersonalCenter')
                    window.location.href = 'shop_procate.html'    
                })
            },
            '.nav-item': function(self){
                alert(self.attr('cateid'))
            },
            '#sc_shippingCart': function(self){
                self.Events.navBar.toShopCart()
            },
            '#sc_home': function(self){
                self.Events.navBar.toIndex()
            },
            '#actionCate': function(self){
                self.Events.navBar.toProCart()
            },
            '#actionMe': function(self){
                self.Events.navBar.toMe()
            },
            '#actionOrder': function(self){
                self.Events.navBar.toOrder()
            },
            '.to-details': function(el){
            },
            '.to-ordpay': function(el){
                window.location.href = myApp.indexURL.split('#')[0] + '#Shop_Order_Info?orderNo=' + el.data('ordid')
            },
            '.ord-cancel': function(el){
                ysh_confirm("是否要取消订单", "确认", "取消", function(a){
                    if(a){
                        getDataList(yshurl+"CancelOrder",{
                            OrderId:el.data('ordid')
                        },function(d){
                            if(parseInt(d.aaData[0][0].rowcount) > 0){
                                window.location.reload()
                            }else{
                                ysh_msg('订单已发货,不能取消')
                            }
                        })
                    }
                })
            },
            '.check-wuliu': function(el, params){
                var skuid = el.data('skuid')
                var orderId = params.orderId
                var wuliuID,callbackURL;
                getDataList(yshurl + "SelectLogisticsNumber", {
                    OrderId: orderId,
                    SkuID: skuid
                }, function(d) {
                    if(d.aaData.length>0){
                        wuliuID = d.aaData[0].LogisticsNumber;
                        callbackURL = window.location.href.split('index_sc')[0]+'orderfill.html'
                        window.location.href = 'http://m.kuaidi100.com/index_all.html?postid=' + wuliuID + '&callbackurl=' + callbackURL;
                    }else{
                        ysh_msg('没查询到物流单号');
                    }
                });
            },
            '.to-pingjia': function(el){
                var productId = el.data('proid');
                var orderItemId = el.data('orditemid')
                var orderNo = el.data('ordid')
                var imgsrc = el.data('src')?("http://f.yshfresh.com" + el.data('src')):"img/zanwutupian.jpg"
                getDataList(yshurl+'getComments', {
                    productid:productId
                }, function(d){
                    if(d.aaData&&d.aaData.length>0){
                        var isCommented = 0;
                        for(var i = 0, len = d.aaData.length; i < len; i++){
                            if (orderNo==d.aaData[i].OrderNo) {
                                isCommented = 1;
                            }
                        }
                        if(isCommented){
                            var commentId = d.aaData[0].Id
                            window.location.href = myApp.indexURL.split('#')[0] 
                                                + '#Shop_Comment_Operation?orderItemId=' 
                                                + orderItemId
                                                + '&productId='
                                                + productId
                                                + '&commentId='
                                                + commentId
                                                + '&cover='
                                                + imgsrc
                                                + '&isAdd='
                                                + 1
                        }else{
                            window.location.href = myApp.indexURL.split('#')[0] 
                                                + '#Shop_Comment_Operation?orderItemId=' 
                                                + orderItemId
                                                + '&productId='
                                                + productId
                                                + '&orderId='
                                                + orderNo
                                                + '&cover='
                                                + imgsrc
                        }
                        
                    }else{
                        window.location.href = myApp.indexURL.split('#')[0] 
                                            + '#Shop_Comment_Operation?orderItemId=' 
                                            + orderItemId
                                            + '&productId='
                                            + productId
                                            + '&orderId='
                                            + orderNo
                                            + '&cover='
                                            + imgsrc
                    }
                },true)  
            },
            '.showlast': function(el){
                el.parent().parent().find('.last-items').show()
                el.parent().hide()
            },
            '.ord-cancel-pay': function(el){
                ysh_confirm("是否要取消订单并退款", "确认", "取消", function(a){
                    if(a){
                        getDataList(yshurl+"CancelOrder",{
                            OrderId:el.data('ordid')
                        },function(d){
                            if(parseInt(d.aaData[0][0].rowcount) > 0){
                                window.location.reload()
                            }else{
                                ysh_msg('订单已发货,不能取消')
                            }
                        })
                    }
                })
            },
            '.return-btn': function(el){
                el.parent().parent().find('.return-remark-box').show()
            },
            '.return-remark-cancel': function(el){
                el.parent().parent().hide()
            },
            '.return-remark-confirm': function(el, params){
                getDataList(yshurl + 'P_API_ReturnProductInsert', {
                    orderId: params.orderId,
                    SkuId: el.data('skuid'),
                    Remark: params.returnRemark
                }, function(d){
                    if(d.state == 0){
                        ysh_msg('已申请退货，请到退货列表查看退货进度')
                        myApp.setLayerPosition()
                        setTimeout(function(){
                            window.location.reload()
                        }, 2000)
                    }
                })
            },
            '.ord-main': function(el){
                window.location.href = myApp.indexURL.split('#')[0] + '#Shop_Order_Info?orderNo=' + el.data('id')
            },
            '#btnYCSH': function(el){
                ysh_confirm('确认延迟收货', '确认', '取消', function(a){
                    if(a){
                        getDataList(yshurl + 'updateDeferredReceipt', {
                            ordernumber: el.data('ordid')
                        }, function(d){
                            el.hide()
                            $(".order-count-down-box").hide()
                        })
                    }
                })                
            }
        },
        'focus': {
            '#staffName': function(){
                $('#yqmTabel').css('top', '30%')
            }
        },
        'blur': {
            '#staffName': function(){
                $('#yqmTabel').css('top', '50%') 
            }
        }
    }
    this.goTo = function(hash){
        if(window.location.href.indexOf('index_sc_local.html') != -1 || window.location.href.indexOf('index_sc.html') != -1){
            loadmain1({action: hash})
        }else{
            window.location.href = myApp.indexURL.split('#')[0] + '#' + hash
        }
    }
    this.fire = function(){
        var elName = arguments[1]
        var type = arguments[0]
        if(typeof this.Events[type][elName] === 'function'){
            this.Events[type][elName](arguments[2], arguments[3])
        }
    }
    this.submitYQM = function(fn){
        var totals
        getDataList(yshurl + 'SelectJzRegisterUser', {
            StaffName: myApp.personal.staffName,
            StaffCode: myApp.personal.staffCode
        }, function(d){
            if (d.aaData && d.aaData.length > 0) {
                totals = d.aaData[0][0].totals
                if(totals == 1){
                    getDataList(yshurl + 'UpdateJzRegisterUser', {
                        StaffName: myApp.personal.staffName,
                        StaffCode: myApp.personal.staffCode
                    }, function(data){
                        ysh_msg('验证成功') 
                        if(fn && typeof fn === 'function'){
                            fn()
                        }
                    })
                }else if (totals == 0) {
                    ysh_msg('姓名和兑换码错误')
                }else if (totals == 2) {
                    ysh_msg('用户已使用兑换码')
                }else if(totals == 3){
                    ysh_msg('该兑换码已使用')
                }
            }                       
        })
    }
    this.personal = {
        staffName: '',
        staffCode: ''
    }
    this.dataHandle = {
        picURL: function(d){
            for(var i = 0, l = d.length; i < l; i++){
                if(!d[i].picurl){
                    d[i].picURL = 'img/zanwutupian.jpg'
                }else{
                    d[i].picURL = myApp.uploadPicURL + d[i].picurl.split(',')[0]
                }
            }
            return d
        }
    }
    this.XSQG = {
        data: {
            pageIndex: 0
        }
    }
    this.setCountDown = function(el, endtime){ 
        // if(myApp.isOverTime(endtime)){
            
        // }else{
        //     el.html('活动已结束')
        //     el.parent().prev().find('.xsqg-img').addClass('img-gray')
        //     el.parent().prev().find('.old-price').remove()
        //     el.parent().prev().find('.new-price').html('￥'+el.data('price'))
        // } 
        el.countdown({
                timestamp   : Date.parse(endtime.replace(/\-/g,"/"))
            })       
    }
    this.isOverTime = function(endtime){
        var dt = new Date()
        var dtt = Date.parse(dt.replace(/\-/g,"/"))
        var ttt = Date.parse(endtime.replace(/\-/g,"/"))
        if(ttt>dtt){
            return true
        }else{
            return false
        }
    }
    this.setMidle = function(p, c){
        var ph = p.height()
        var ch = c.height()
        c.css('margin-top', ((ph/2)-(ch/2))+'px')
    }  
    this.browser = {
        versions:function(){ 
            var u = navigator.userAgent, app = navigator.appVersion; 
            return { 
                trident: u.indexOf('Trident') > -1, 
                presto: u.indexOf('Presto') > -1, 
                webKit: u.indexOf('AppleWebKit') > -1, 
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), 
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,  
                iPhone: u.indexOf('iPhone') > -1 , 
                iPad: u.indexOf('iPad') > -1, 
                webApp: u.indexOf('Safari') == -1, 
                weixin: u.indexOf('MicroMessenger') > -1,  
                qq: u.match(/\sQQ/i) == " qq"
            }; 
        }(), 
        language:(navigator.browserLanguage || navigator.language).toLowerCase() 
    }
    this.setLayerPosition = function(){
        var a = $('.layui-layer-hui').width()
        var b = $(window).width()
        console.log(a)
        console.log(b)
        $('.layui-layer-hui').css('left', (b-a)/2)
    }
    this.GetRTime = function(endtime){
        var EndTime= new Date(endtime);
        var NowTime = new Date();
        var t =EndTime.getTime() - NowTime.getTime();
        var d=0;
        var h=0;
        var m=0;
        var s=0;
        if(t>=0){
          d=Math.floor(t/1000/60/60/24);
          h=Math.floor(t/1000/60/60%24);
          m=Math.floor(t/1000/60%60);
          s=Math.floor(t/1000%60);
        }   
        document.getElementById("t_d").innerHTML = d + "天";
        document.getElementById("t_h").innerHTML = h + "时";
        document.getElementById("t_m").innerHTML = m + "分";
        // document.getElementById("t_s").innerHTML = s + "秒";
    }
}).apply(myApp);

(function($){
    $.fn.tap = function(fn,options){
        var el = $(this);
        el.addClass(options.class);
        setTimeout(function(){
            el.removeClass(options.class);
            fn();
        },100)
    };
    $.extend({
        noLogin:function(){
            if(!getuserInfo()[0] || getuserInfo()[0].user_id==0){
                ysh_msg("请先登录")
                var backUrl = window.location.href.split("#")[0]+"#shop_index";
                history.pushState(null, null, backUrl)
                setTimeout(function(){
                    loadmain1({action:"shop_login"})
                },100)            
            }
        },
        validBrowser: function(){
            var ua = navigator.userAgent.toLowerCase(); 
            if (/mobi|android|touch|mini/i.test(ua)) {
                console.log(1)
            } else {
                console.log(2)
            }
        },
        isLogin: function(){
            localUser = $.getUserInfo()
            if(!_.isEmpty(localUser) && !_.isEmpty(localUser[0]) && localUser[0].user_id!=0){
                return true;
            }else{
                return false;
            }
        },
        toUserPage: function(action,upd){
            if(!getuserInfo()[0] || getuserInfo()[0].user_id==0){
                ysh_msg("请先登录")
                setTimeout(function(){
                    loadmain1({action:"shop_login"})
                },100)                   
            }else{
                loadmain1({action:action,upd:upd});
            }; 
        },
        validateAddress: function(name, phone, address1){
            var name = $.trim($(name).val()),phone=$.trim($(phone).val()),address1 = $.trim($(address1).val()),
            r = true,rtxt="",
            regPhone=/d{11}/g,
            regName=/^[a-zA-Z0-9\u4e00-\u9fa5]+$/g;          
            if(address1.length==0||address1.length>100){
                r=false;
                rtxt="地址长度应在1到100之间";
            }       
            
            if(!mobileCheck(phone)){
                r=false;
                rtxt="请输入合法电话号码";
            }
            if(!regName.test(name)){
                r=false;
                rtxt="姓名不应包含非法字符";
            }
            if(name.length<2||name.length>10){
                r=false;
                rtxt="姓名长度应介于2~10之间";
            }
            return [r, rtxt];
        },
        getPCD: function(a, b, tpl){
            getDataList(yshurl+"GetAreaInfo",{
                pParentAreaNum:a,
                pPageIndex:0,
                pPageSize:100
            },function(d){
                if (d.state==0&&d.aaData.length>0) {
                    laytpl($(tpl).html()).render(d.aaData[0],function(html){
                        $(b).html(html);
                    });
                }else{
                    console.log("获取地区列表接口出错");
                }            
            });
        },
        getUserInfo: function(){
            var user_temp = localStorage.getItem("userInfo") || null;
            var user = new Object()
            if (user_temp) {
                try {
                    var user = JSON.parse(user_temp)
                } catch (e) {
                    console.log("用户信息格式有误!")
                    user = null
                }
            };
            return user;
        }
    });
})(jQuery);

