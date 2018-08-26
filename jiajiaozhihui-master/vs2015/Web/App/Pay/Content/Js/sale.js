$(function () {
    var product = {
        productId:0,
        productName:'',
        marketPrice:0,
        price:0,
        number:0,
        descInfo:'',
        introInfo:'',
        productType:'',
        imgUrl:'' 
    };
    var params = {
        cid:0,
        oid:'',
    }
    /*获取信息*/
    function init() {
        params.cid = getQueryString("cid");
        params.oid = getQueryString("oid");
        $.ajax({
            url: '../project/sale/controller/SaleController.ashx?method=init',
            type: 'POST',
            dataType: 'JSON',
            data: { oid: params.oid, cid: params.cid},
            success: function (res) {
                console.log(res);
                product.descInfo=res.descInfo;
                product.imgUrl=res.imgUrl;
                product.introInfo=res.introInfo;
                product.marketPrice=res.marketPrice;
                product.number=res.number;
                product.price=res.price;
                product.productId=res.productId;
                product.productName=res.productName;
                product.productType=res.productType;
                show();
            }
        })
        
        $.getJSON("../project/sale/Controller/SaleController.ashx?method=config&cid="+params.cid+"&oid=" + params.oid + "&page=sale.html", function (data) {
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名，见附录1
                jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
                
            });
            wx.error(function (res) {
                //alert(res);
            });
        })
        
        function show() {
            $("#imgSrc").attr("src", product.imgUrl)
            $("#price").text(product.price);
            $("#title").text(product.productName);
            $("#content").html(product.introInfo)
        };
        function payState(info) {
            if (info) {
                $("#btnPay").attr("disabled", "disabled");
                $("#btnPay").text("已支付");
            }
        }
        /*获取参数*/
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        };
    }
    function pay() {
        $("#btnPay").on('click', function () {
            $.ajax({
                url: '../project/course/controller/PayOrderController.ashx?method=add',
                type: 'POST',
                dataType: 'text',
                data: data,
                success: function (res) {
                    if (res != "") {
                        unifiedOrder(res)
                    }
                }
            })

            function unifiedOrder(tradeno) {
                var info = new Object();
                info.body = params.title;
                info.outTradeNo = tradeno;
                info.openid =params.oid;
                info.attach =params.ctype;
                info.notifyPage="sale.ashx";
                var json=JSON.stringify(info);

                $.ajax({
                    url: '../project/course/controller/WxPayController.ashx?method=pay',
                    type: 'POST',
                    dataType: 'JSON',
                    data: data,
                    success: function (res) {
                        wx.chooseWXPay({
                            appId: res.appId,
                            timestamp: res.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
                            package: res.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: res.paySign, // 支付签名
                            success: function (res) {
                                window.location.href = '';
                            },
                        });
                    }
                })
            }
        })
    }
    init();
    pay();
})