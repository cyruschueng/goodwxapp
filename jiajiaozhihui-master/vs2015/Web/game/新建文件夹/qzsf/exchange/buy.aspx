<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="buy.aspx.cs" Inherits="SfSoft.web.game.qzsf.exchange.buy" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/weui.min.css" rel="stylesheet" type="text/css" />
    <title>兑换</title>
</head>
<body>
    <form id="form1" runat="server">
    <div class=" container" style="">
        <div class="row">
            <div class="col-xs-12">
                <img src="<%=HTMLImage %>"  style=" width:100%;" />
            </div>
        </div>
        <div class="row" style=" margin-top:10px;">
            <div class="col-xs-12">
                <ul class="list-group">
                   <li class="list-group-item">
                        <div class="row">
                            <div class="col-xs-8">单价</div>
                            <div class="col-xs-4 text-right">
                                <span style="color:#f00">&#65509;</span><span id="price" style=" color:#f00"><%=HTMLQuantity%></span> 
                            </div>
                        </div>
                   </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-xs-7">兑换数量</div>
                            <div class="col-xs-5 text-right">
                                <span id="quantity" runat="server">1</span>&nbsp;
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-xs-8 ">配送方式</div>
                            <div class="col-xs-4 text-right">
                                快递 自费
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-xs-4">收货信息</div>
                            <div class="col-xs-8 text-right">
                                <span class=" btn btn-xs btn-default" id="editAddress">选择与编辑收货信息</span>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="row">
                                    <div class="col-xs-6">收货人： <span id="name"></span> </div>
                                    <div class="col-xs-6"><span id="telephone"></span></div>
                                    <div class="col-xs-12" style=" margin-top:10px;">详细地址：<span id="address"></span></div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="col-xs-12" style=" margin-bottom:30px;">
                <a href="javascript:void(0)" class="weui_btn weui_btn_primary" id="btnOrder">提交订单</a>
            </div>
        </div>
    </div>
        <asp:HiddenField ID="hfAddressParameters" runat="server" />
        <asp:HiddenField ID="hfOpenId" runat="server" />
        <asp:HiddenField ID="hfGoodsid" runat="server" />
        <asp:HiddenField ID="hfProvince" runat="server" />
        <asp:HiddenField ID="hfCity" runat="server" />
        <asp:HiddenField ID="hfDistrict" runat="server" />
    </form>
    <div id="loadingToast" runat="server" class="weui_loading_toast" style="display:none;">
            <div class="weui_mask_transparent"></div>
            <div class="weui_toast">
                <div class="weui_loading">
                    <div class="weui_loading_leaf weui_loading_leaf_0"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_1"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_2"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_3"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_4"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_5"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_6"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_7"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_8"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_9"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_10"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_11"></div>
                </div>
                <p class="weui_toast_content">数据上传中</p>
            </div>
        </div>
        <div class="weui_dialog_confirm" id="affirmOrder" style="display: none;">
        <div class="weui_mask"></div>
        <div class="weui_dialog">
            <div class="weui_dialog_hd"><strong class="weui_dialog_title">提示</strong></div>
            <div class="weui_dialog_bd">确定购买吗</div>
            <div class="weui_dialog_ft">
                <a href="javascript:;" class="weui_btn_dialog default">取消</a>
                <a href="javascript:;" class="weui_btn_dialog primary" id="btnSubmit">确定</a>
            </div>
        </div>
    </div>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="../../../wxpay/js/address.js" type="text/javascript"></script>
    <script>
        $("#editAddress").shenerAddress({
            bodyId: "#form1",
            latestAddress: {
                "serverpath": "../../../wxpay/server/address.ashx?type=latest",
                "openid": $("#hfOpenId").val(),
                "backfn": function (address) {
                    if (!$.isEmptyObject(address.ds)) {
                        $("#name").text(address.ds[0].Name);
                        $("#telephone").html(address.ds[0].Mobile);
                        $("#address").text(address.ds[0].Province + " " + address.ds[0].City + " " + address.ds[0].District + " " + address.ds[0].Address);
                        $("#hfProvince").val(address.ds[0].Province);
                        $("#hfCity").val(address.ds[0].City);
                        $("#hfDistrict").val(address.ds[0].District);
                        $("#hfAddress").val(address.ds[0].Address);

                    }
                }
            },
            backSelectAddress: function (address) {
                var name = address.name;
                var mobile = address.mobile;
                var prvince = address.province;
                var city = address.city;
                var district = address.district;
                var detail = address.detail;
                $("#name").text(name);
                $("#telephone").html(mobile);
                $("#address").text(prvince + " " + city + " " + district + " " + detail);
                $("#hfProvince").val(prvince);
                $("#hfCity").val(city);
                $("#hfDistrict").val(district);
                $("#hfAddress").val(detail);
                $("html,body").animate({ scrollTop: $("#myTab").offset().top }, 0);
            },
            saveAddress: {
                "serverpath": "../../../wxpay/server/address.ashx?type=add",
                "openid": $("#hfOpenId").val()
            },
            getAllAddress: {
                "serverpath": "../../../wxpay/server/address.ashx?type=list",
                "openid": $("#hfOpenId").val()
            },
            setLatestAddress: {
                "serverpath": "../../../wxpay/server/address.ashx?type=set",
                "openid": $("#hfOpenId").val()
            }
        });
    </script>
    <script src="js/buy.js" type="text/javascript"></script>
    <script>
        
    </script>
</body>
</html>
