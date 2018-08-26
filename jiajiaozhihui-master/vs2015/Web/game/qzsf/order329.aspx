<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="order329.aspx.cs" Inherits="SfSoft.web.game.qzsf.order329" %>

<!DOCTYPE html >
<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <meta name="format-detection" content="telephone=no" />
    <title>国学书法教材订购</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/weui.min.css" rel="stylesheet" type="text/css" />
    <style>
        .shener_label{ font-weight:normal; margin-bottom:inherit; max-width: inherit;}
        label.error{ display:block; color:Red; font-size:12px;}
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
    </style>
</head>
<body style=" padding-top:0px;">
<form id="form1" runat="server">
    <div class=" container" style=" margin-bottom:70px;">
          <div class="row">
            <div class="col-xs-12">
                <img class=" img-thumbnail" src="<%=HTMLImgUrl %>" />
            </div>
            <div class="col-xs-12">
                <h4><%=HTMLProductName%></h4>
            </div>
          </div>
        <div class="row" >
            <div class="col-xs-12">
                <%=HTMLContent %>
            </div>
        </div>
        <div class="row" id="go">
            <div class="col-xs-12">
                <img class=" img-thumbnail" src="<%=HTMLImgUrl %>" />
            </div>
            <div class="col-xs-12">
                <h4><%=HTMLProductName%></h4>
            </div>
            <div class="col-xs-12 ">
                <p class=" bg-info" style=" font-size:16px; color:#f00;">优惠价：￥<span id="txtUnitPrice"><%=HTMLUnitPrice%></span></p>
            </div>
            <div class="col-xs-12">
                <p style=" color:#666; font-size:14px;">
                    原价：￥<s id="cost_price"><%=HTMLMarkPric%></s> 
                </p>
            </div>
        </div>
        <div class="row">
            <div class=" col-xs-12">
                <div class="col-xs-12" style=" margin-top:15px;">
             	    <div  class=" alert alert-danger">*注：《国学经典书法教材》（一套10册）定价为198元，您只需支付&nbsp;<span style="color:#f00; font-size:16px;"><b><%=HTMLUnitPrice%></b></span>&nbsp;元的书法教材费(包邮)。</div> 
                 </div>
                <ul id="myTab" class="nav nav-tabs">
                   <li class="active"><a href="#home" data-toggle="tab">货到付款</a></li>
                   <li><a href="http://weixin.jiajiaozhihui.cn/wxpay/order/qzsf.aspx" >在线支付</a></li>
                </ul>
                <div id="myTabContent" class="tab-content">
                   <div class="tab-pane fade in active" id="home" style=" padding-top:15px;">
                            <div id="roseber" class=" col-xs-12"  >
                                <ul class="list-group" <%=HTMLRoseberStyle %>>
                                   <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-xs-8">单价</div>
                                            <div class="col-xs-4">
                                                <span style="color:#f00">&#65509;</span><span id="price" style=" color:#f00"><%=HTMLUnitPrice %></span> 
                                            </div>
                                        </div>
                                   </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-xs-7">购买数量</div>
                                            <div class="col-xs-5 text-right">
                                                <span class="btn btn-xs btn-default" id="btnSubtract">&nbsp;-&nbsp;</span>
                                                &nbsp; <span id="txtNumber" runat="server">1</span>&nbsp;
                                                <span class="btn btn-xs btn-default" id="btnUP">&nbsp;+&nbsp;</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-xs-8">配送方式</div>
                                            <div class="col-xs-4">
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
                            <div class=" col-xs-12 ">
                                <div class=" weui_cells_tips" id="tips"></div>
                            </div>
                            <div class="col-xs-12" style=" margin-top:0px;">
                                <button type="button"  class="btn btn-lg btn-success" id="btnConfirmOrder" <%=HTMLRoseberStyle %> >提交订单</button>
                                
                            </div>
                            <asp:HiddenField ID="hfOpenid" runat="server" />
                            <asp:HiddenField ID="hfFriendid" runat="server" />
                            <asp:HiddenField ID="hfGoodsid" runat="server" />
                            <asp:HiddenField ID="hfMode" runat="server" />
                            <asp:HiddenField ID="hfArea" runat="server" />
                            <asp:HiddenField ID="hfPrice" runat="server" />
                            <asp:HiddenField ID="hfOnlinePay" runat="server" />
                            <asp:HiddenField ID="hfShareLink" runat="server" />
                            <asp:HiddenField ID="hfProvince" runat="server" />
                            <asp:HiddenField ID="hfCity" runat="server" />
                            <asp:HiddenField ID="hfDistrict" runat="server" />
                            <asp:HiddenField ID="hfAddress" runat="server" />
                            <asp:HiddenField ID="hfTradeno" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!--数据处理-->
    <div id="loadingToast" class="weui_loading_toast" runat="server" style="display:none;">
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
            <div class="weui_dialog_bd">确定要提交您的订单？</div>
            <div class="weui_dialog_ft">
                <a href="javascript:;" class="weui_btn_dialog default">取消</a>
                <a href="javascript:;" class="weui_btn_dialog primary" id="btnSubmit">确定</a>
            </div>
        </div>
    </div>

    <nav class="navbar  navbar-fixed-bottom" style="min-height:42px; display:none;">
        <div class="container">
            <div class="row">
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.CommunityLink %>" >书法圈</a></div>
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.UpLoadLink %>" >上传作品</a></div>
                <!--<div class="col-xs-3 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.PartinLink %>" ><%=HTMLMenuName%></a></div>-->
                <div class="col-xs-4 text-center  " style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.MyInfoLink %>" >我的</a></div>
            </div>
        </div>
    </nav>
    </form>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>

    <script src="../../../js/jquery.validate.js" type="text/javascript"></script>
    <script src="../../../js/jquery.validate.extend.js" type="text/javascript"></script>
    <script src="../../../js/jquery.validate.messages_cn.js" type="text/javascript"></script>
    <script src="js/order.js" type="text/javascript"></script>
    <script src="../../wxpay/js/address.js" type="text/javascript"></script>
    <script>
        $(function () {
            $("#buy").text("我要订购");
            $('#myTab li:eq(0) a').tab('show');
            var url = $("#btnBack").attr("href");
            if (url != "javascript:void(0)") {
                $("#buy_remark").css("display", "block");
            } else {
                $("#buy_remark").css("display", "none");
            }
            $("#turn").click(function () {
                location.href = "<%=HTMLLink.CommunityLink  %>"
            });
            var showRoseber = $("#roseber ul").css("display");
            if (showRoseber == undefined || showRoseber == null || showRoseber.toLowerCase() == "none") {
                $("#roseber").append("<p>暂时不支货付到付款</p>");
            }

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
                    $("html,body").animate({ scrollTop: $("#myTab").offset().top }, 0);
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
        })

    </script>
</body>
</html>
