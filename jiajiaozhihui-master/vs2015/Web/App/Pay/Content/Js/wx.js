$(function () {
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    };
    var addressItem = {
        receivename: '',
        telephone: '',
        province: '',
        city: '',
        district: '',
        detail: '',
    };
    var openid = getQueryString("openid");
    var appid = getQueryString("appid");

    function showAddress() {
        $("#receivename").text(addressItem.receivename);
        $("#area").text(addressItem.province + " " + addressItem.city);
        $("#address").text(addressItem.district + addressItem.detail);
        $("#telephone").text(addressItem.telephone);
    }
    $("#btnEditAddress").shenerAddress({
        bodyId: "#container",
        latestAddress: {
            "serverpath": "../pay/service/address.ashx?type=latest",
            "openid": openid,
            "backfn": function (address) {
                if (!$.isEmptyObject(address.ds)) {
                    addressItem.receivename = address.ds[0].Name;
                    addressItem.telephone = address.ds[0].Mobile;
                    addressItem.province = address.ds[0].Province;
                    addressItem.city = address.ds[0].City;
                    addressItem.district = address.ds[0].District;
                    addressItem.detail = address.ds[0].Address;
                    showAddress();
                }
            }
        },
        backSelectAddress: function (address) {
            addressItem.receivename = address.name;
            addressItem.telephone = address.mobile;
            addressItem.province = address.province;
            addressItem.city = address.city;
            addressItem.district = address.district;
            addressItem.detail = address.detail;
            showAddress();
        },
        saveAddress: {
            "serverpath": "../pay/service/address.ashx?type=add",
            "openid": openid
        },
        getAllAddress: {
            "serverpath": "../pay/service/address.ashx?type=list",
            "openid": openid
        },
        setLatestAddress: {
            "serverpath": "../pay/service/address.ashx?type=set",
            "openid": openid
        }
    });
    function pay(outTradeNo) {
        var info = new Object();
        info.body = "国学知行社";
        info.outTradeNo = outTradeNo;
        info.openid = openid;
        info.appid = appid;
        info.notifyPage="Zxs.ashx";
        var json=JSON.stringify(info);
        
        $.post("http://localhost:50383/app/project/zxs/Controller/WxPaySignController.ashx?method=pay", {data:json}, function (msg) {
            console.log(msg)
            var data = JSON.parse(msg);
            console.log(data)
            wx.chooseWXPay({
                appId: data.appId,
                timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: data.paySign, // 支付签名
                success: function (res) {
                    window.location.href = 'http://zxs.jiajiaozhihui.cn/app/index.html#/registsuccess';
                },
            });
        })
    }
    function orderState() {
        $.get('http://weixin.jiajiaozhihui.cn/app/project/zxs/Controller/PayOrderController.ashx?method=state&appId=' + appid + "&openId=" + openid, function (results) {
            if (results == 1) {
                console.log("ok");
                $("#btnPay").addClass("disabled").text("已订购");
            } else if (results == 2) {
                $("#btnPay").addClass("disabled").text("已售完");
            }
        })
    }
    //$.showLoading();
    orderState();

    $.getJSON("http://weixin.jiajiaozhihui.cn/app/project/zxs/Controller/WxPaySignController.ashx?method=config&appId=" + appid + "&openId=" + openid+"&page=zxs.html", function (data) {
        $.hideLoading();
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名，见附录1
            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {

        });
        wx.error(function (res) {
            //alert(res);
        });
    })
    $("#btnPay").click(function () {
        $.showLoading("正在发起支付");
        var tradeno = new Date().getTime();
        var outTradeNo = tradeno;
        var info={
            detail:addressItem.detail,
            province:addressItem.province,
            city:addressItem.city,
            district:addressItem.district,
            name:addressItem.receivename,
            openId:openid,
            telePhone:addressItem.telephone,
            tradeno:tradeno
        }
        var json= JSON.stringify(info);
        if (info.province == "" || info.city == "" || info.name == "" || info.telePhone == "") {
            alert("请选择你的收货地址");
            return;
        }
        $.post("http://localhost:50383/app/project/zxs/Controller/PayOrderController.ashx?method=add&appId="+appid, {data:json}, function (results) {
            if (results > 0) {
                pay(tradeno);
            } else if (results == -1) {
                alert("很抱歉，产品已售完！");
                $("#btnPay").addClass("disabled").text("已售完");
            } else if (results == -2) {
                alert("请选择你的收货地址");
            }
            $.hideLoading();
        })
    })
})