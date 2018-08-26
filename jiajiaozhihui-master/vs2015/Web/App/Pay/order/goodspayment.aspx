<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="goodspayment.aspx.cs" Inherits="SfSoft.web.wxpay.order.goodspayment" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title><%=HtmlGoodsModel.GoodName %></title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../game/qzsf/css/weui.min.css" rel="stylesheet" type="text/css" />
    <style>
        .menu{ font-size:16px; padding:6px 8px; border:none; width:100%;}
        .right-line{ border-right:1px solid #fff; border-top-right-radius:0;border-bottom-right-radius:0;}
        .left-line{ border-left:1px solid #fff; border-top-left-radius:0;border-bottom-left-radius:0;}
        #alert_orderstatus
        {
            position:fixed;
            left:0px;
            top:0px;
            width:100%;
        }
        #share
        {
             position:absolute;
             left:0;
             top:0;
             width:100%;   
             display:none;
        }
        .shener_label{ font-weight:normal; margin-bottom:inherit; max-width: inherit;}
        label.error{ display:block; color:Red; font-size:12px;}
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class="container" style=" padding-top:30px; padding-bottom:80px;">
        <div class="row">
            <div class="col-xs-12">
                <%=HtmlArticleModel.Detail %>
            </div>
        </div>
        <div class="row" id="go">
            <div class="col-xs-12">
                <img class=" img-thumbnail" src="<%=HtmlGoodsModel.ImgURL  %>" />
            </div>
            <div class="col-xs-12">
                <h4><%=HtmlGoodsModel.GoodName %></h4>
            </div>
            <div class="col-xs-12 ">
                <p class=" bg-info" style=" font-size:16px; color:#f00;">活动价：<span id="txtUnitPrice"><%=HtmlGoodsModel.PublicPrice %>元</span></p>
            </div>
        </div>
        <div class="row" >
            <div class=" col-xs-12">
                <div class="tab-pane fade in active" id="home" style=" padding-top:15px;">
                        <div id="roseber" class=" col-xs-12"   >
                                <ul class="list-group"  >
                                   <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-xs-8">单价</div>
                                            <div class="col-xs-4 text-right">
                                                <span id="price" style=" color:#f00"><%=HtmlGoodsModel.PublicPrice%></span><span style="color:#f00">元</span>
                                            </div>
                                        </div>
                                   </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-xs-7">购买数量</div>
                                            <div class="col-xs-5 text-right">
                                                <span class="btn btn-xs btn-default" id="sub">&nbsp;-&nbsp;</span>
                                                &nbsp; <span id="number" runat="server">1</span>&nbsp;
                                                <span class="btn btn-xs btn-default" id="add">&nbsp;+&nbsp;</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-xs-8">配送方式</div>
                                            <div class="col-xs-4 text-right">
                                                快递 免费
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-xs-4">收货信息</div>
                                            <div class="col-xs-8 text-right">
                                                <a href="javascript:void(0)" class=" btn btn-xs btn-default" id="editAddress">选择与编辑收货信息</a>
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
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <textarea class="weui_textarea" id="remark" name="remark" placeholder="预留你的第二个联系电话" rows="2"></textarea>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                    </div>
            </div>
            <div class=" col-xs-12 ">
                <div class=" weui_cells_tips" id="tips"></div>
            </div>
            <div class=" col-xs-12 text-center">
                    <button type="button"  class="btn btn-lg btn-success" id="btnConfirmOrder">提交订单</button>
                </div>
        </div>
            <asp:HiddenField ID="hfOpenid" runat="server" />
            <asp:HiddenField ID="hfGoodsid" runat="server" />
            <asp:HiddenField ID="hfPrice" runat="server" />
            <asp:HiddenField ID="hfProvince" runat="server" />
            <asp:HiddenField ID="hfCity" runat="server" />
            <asp:HiddenField ID="hfDistrict" runat="server" />
            <asp:HiddenField ID="hfAddress" runat="server" />
            <asp:HiddenField ID="hfTradeno" runat="server" />
            <asp:HiddenField ID="hfArticleId" runat="server" />
    </div>
    <!--数据处理-->
    <div id="loadingToast" class="weui_loading_toast" style="display:none;">
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
            <p class="weui_toast_content">数据加载中</p>
        </div>
    </div>
    <div class="weui_dialog_confirm" id="dialogOrder" style="display: none;">
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
    </form>
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="../../weixinconfig/wxconfig.js" type="text/javascript"></script>
    <script src="../../wxpay/js/address.js" type="text/javascript"></script>
    <script src="../js/goodspayment.js" type="text/javascript"></script>
    <script>
        $("#editAddress").shenerAddress({
            bodyId: "#form1",
            latestAddress: {
                "serverpath": "../../wxpay/server/address.ashx?type=latest",
                "openid": $("#hfOpenid").val(),
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
                $("html,body").animate({ scrollTop: $("#home").offset().top }, 0);
            },
            saveAddress: {
                "serverpath": "../../wxpay/server/address.ashx?type=add",
                "openid": $("#hfOpenid").val()
            },
            getAllAddress: {
                "serverpath": "../../wxpay/server/address.ashx?type=list",
                "openid": $("#hfOpenid").val()
            },
            setLatestAddress: {
                "serverpath": "../../wxpay/server/address.ashx?type=set",
                "openid": $("#hfOpenid").val()
            }
        });
    </script>
    <script>
        wx.ready(function () {
            var shareData = {
                title: '<%=HtmlGoodsModel.GoodName %>',
                desc: '<%=HtmlGoodsModel.GoodName %>',
                link: 'http://weixin.jiajiaozhihui.cn/wxpay/order/goodspayment.aspx?aid=' + $("#hfArticleId").val() + '&gid=' + $("#hfGoodsid").val() + '',
                imgUrl: '<%=HtmlGoodsModel.ImgURL %>'
            };
            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareTimeline(shareData);
        })
    </script>
</body>
</html>
