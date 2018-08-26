<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="friend-invite.aspx.cs" Inherits="SfSoft.web.game.qzsf.friend_invite" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>我要参与</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/weui.min.css" rel="stylesheet" type="text/css" />
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
    <div class="container" style=" padding-top:0px; padding-bottom:80px;">
        <div class="row" style=" background:#eee; margin-bottom:10px;">
           <div class=" alert alert-info" style='margin-bottom:0'>
                <span id="bntshare"  href="<%=HTMLLink.PartinLink %>" class=" btn btn-xs btn-success"> 立刻邀请好友</span>
           </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <table class="table">
                    <tr>
                        <td ><img style=" width:48px; height:48px;" src="<%=HTMLHeadImgUrl %>" /></td>
                        <td style=" font-size:medium"><strong style=" color:#0034FF"> <%=HTMLNickName%></strong>  参与亲子书法活动<%=HTMLAwayDays %>天，已有<%=HTMLWorksNumber %>个作品</td>
                    </tr>
                    <tr>
                        <th colspan="2">我的最新作品</th>
                    </tr>
                </table>
            </div>
            <div class=" col-xs-12">
                <ul class=" media-list" id="media-list">
                    
                </ul>
            </div>
        </div>
        
        <div class="row">
            

        </div>
        <div class="row">
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
                <p class=" bg-info" style=" font-size:16px; color:#f00;">活动价￥<span id="txtUnitPrice"><%=HTMLUnitPrice%></span></p>
            </div>
            <div class="col-xs-12">
                <p style=" color:#666; font-size:14px;">
                    价格：￥<s id="cost_price"><%=HTMLMarkPric%></s> &nbsp;&nbsp;&nbsp;<span>快递 免运费</span>
                    <span class="btn btn-xs glyphicon glyphicon-plus pull-right" id="btnUp"></span>
                    <span class=" btn btn-xs pull-right" id="txtNumber">1</span>
                    <span class="btn btn-xs glyphicon glyphicon-minus pull-right" id="btnSubtract"></span>
                </p>
            </div>
        </div>

        <div class="row" >
            <div class="col-xs-12" style=" margin-top:15px;">
             	<div  class=" alert alert-danger">*注：《国学经典书法教材》（一套10册）定价为198元，您只需支付&nbsp;<span style="color:#f00; font-size:16px;"><b>99</b></span>&nbsp;元的书法教材费(包邮)。</div> 
             </div>
            <div class=" col-xs-12">
                <ul id="myTab" class="nav nav-tabs">
                   <li class="active"  ><a href="#home" data-toggle="tab">货到付款</a></li>
                   <li><a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa0f624ad8cdb46c4&redirect_uri=http%3A%2F%2Fweixin.jiajiaozhihui.cn%2Fwxpay%2Forder%2Fqzsf.aspx&response_type=code&scope=snsapi_base&state=123456789&connect_redirect=1#wechat_redirect" >在线支付</a></li>
                </ul>
                <div id="myTabContent" class="tab-content">
                    
                    <div class="tab-pane fade in active" id="home" style=" padding-top:15px;">
                        <div id="roseber"  class=" col-xs-12" >
                                <ul class="list-group"  <%=HTMLRoseberStyle %> >
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
                                                <span class="btn btn-xs btn-default" id="Span1">&nbsp;-&nbsp;</span>
                                                &nbsp; <span id="Span2" runat="server">1</span>&nbsp;
                                                <span class="btn btn-xs btn-default" id="Span3">&nbsp;+&nbsp;</span>
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
            </div>
            <div class=" col-xs-12 ">
                <div class=" weui_cells_tips" id="tips"></div>
            </div>
            <div class=" col-xs-12 text-center">
                    <button type="button"  class="btn btn-lg btn-success" id="btnConfirmOrder" <%=HTMLRoseberStyle %> >提交订单</button>
                </div>
        </div>
            <asp:HiddenField ID="hfOpenid" runat="server" />
            <asp:HiddenField ID="hfFriendid" runat="server" />
            <asp:HiddenField ID="hfGoodsid" runat="server" />
            <asp:HiddenField ID="hfPrice" runat="server" />
            <asp:HiddenField ID="hfShare" runat="server" />
            <asp:HiddenField ID="hfOnlinePay" runat="server" />
            <asp:HiddenField ID="hfAddressParameters" runat="server" />
            <asp:HiddenField ID="hfShareLink" runat="server" />
            <asp:HiddenField ID="hfAwayDays" runat="server" />
            <input type="hidden" id="hfWeiXinAddress" />
            <asp:HiddenField ID="hfProvince" runat="server" />
            <asp:HiddenField ID="hfCity" runat="server" />
            <asp:HiddenField ID="hfDistrict" runat="server" />
            <asp:HiddenField ID="hfAddress" runat="server" />
            <asp:HiddenField ID="hfTradeno" runat="server" />
        
    </div>
    <audio id="audio"></audio>
    <nav class="navbar navbar-inverse navbar-fixed-bottom" style="min-height:42px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.CommunityLink %>" >书法圈</a></div>
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.UpLoadLink %>" >上传作品</a></div>
                <div class="col-xs-4 text-center  " style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.MyInfoLink %>" >我的</a></div>
            </div>
        </div>
    </nav>
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
    <div id="share">
        <img src="images/guide.jpg" style=" width:100%;" />
    </div>
     </form>
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>

     <script src="../../../js/jquery.validate.js" type="text/javascript"></script>
    <script src="../../../js/jquery.validate.extend.js" type="text/javascript"></script>
    <script src="../../../js/jquery.validate.messages_cn.js" type="text/javascript"></script>
    <script src="js/audio.js" type="text/javascript"></script>
    <script src="js/friend-invite.js" type="text/javascript"></script>
    <script src="../../wxpay/js/address.js" type="text/javascript"></script>
    <script>
        $("#turn").click(function () {
            location.href = "<%=HTMLLink.CommunityLink  %>"
        });
        var HTMLAwayDays = '<%=HTMLAwayDays %>';
	var showRoseber = $("#roseber ul").css("display");
            if (showRoseber == undefined || showRoseber == null || showRoseber.toLowerCase() == "none") {
                $("#roseber").append("<p>暂不支持货到付款</p>");
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
    </script>
</body>
</html>
