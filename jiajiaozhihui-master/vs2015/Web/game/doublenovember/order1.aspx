<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="order1.aspx.cs" Inherits="SfSoft.web.game.doublenovember.order1" %>

<!DOCTYPE html >
<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>订单</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .error{ color:#f00; font-size:13px;}
        #alert_orderstatus
        {
            position:fixed;
            left:0px;
            top:0px;
            width:100%;
        }
    </style>
    <style>
        .menu{ font-size:16px;}
    </style>
</head>
<body style=" padding-top:30px;">
    <div class=" container" style=" margin-bottom:70px;">
        <div class="row">
            <div class="col-xs-12">
                <img class=" img-thumbnail" src="<%=HTMLImgUrl %>" />
            </div>
            <div class="col-xs-12">
                <h4><%=HTMLProductName%></h4>
            </div>
            <div class="col-xs-12 ">
                <p class=" bg-info" style=" font-size:16px; color:#f00;">保证金￥<span id="txtUnitPrice"><%=HTMLUnitPrice%></span></p>
            </div>
            <div class="col-xs-12">
                <p style=" color:#666; font-size:14px;">
                    价格：￥<s id="cost_price"><%=HTMLMarkPric%></s> &nbsp;&nbsp;&nbsp;<span>快递 免运费</span>
                    <span class="btn btn-xs glyphicon glyphicon-plus pull-right" id="btnAdd"></span>
                    <span class=" btn btn-xs pull-right" id="txtNumber">1</span>
                    <span class="btn btn-xs glyphicon glyphicon-minus pull-right" id="btnSubtract"></span>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12"><a href="#go" class="btn btn-primary menu" type="button" style=" width:100%;" >我要参与</a></div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <%=HTMLContent %>
            </div>
        </div>
        <div class="row">
            <form id="form1" runat="server">
                <div class=" col-sm-12">
                <!--订单信息-->
                    <div id="go" class=" alert alert-danger">*注：《国学经典书法教材》（一套10册）定价为199元，您只需支付&nbsp;<span style="color:#f00; font-size:16px;"><b>99</b></span>&nbsp;元的学习保证金”。</div> 
                    <div class=" form-group">
                        <label for="txtName">姓名</label>
                        <asp:TextBox ID="name" name="name" CssClass="form-control" placeholder="收货人姓名" runat="server"></asp:TextBox>
                    </div>
                    <div class=" form-group">
                        <label for="txtPhone">联系电话（请输入11个字符）</label>
                        <asp:TextBox ID="phone" name="phone" CssClass=" form-control"  placeholder="请提供可以联系得上的手机号码" runat="server"></asp:TextBox>
                    </div>
                    <div class=" form-group">
                        <label for="">省分</label>
                        <asp:DropDownList ID="province" name="province" CssClass=" form-control" runat="server"></asp:DropDownList>
                    </div>
                    <div class=" form-group">
                        <label for="">城市</label>
                        <asp:DropDownList ID="city" name="city" CssClass=" form-control" runat="server"></asp:DropDownList>
                    </div>
                    <div class="form-group">
                        <label for="">详细地址</label>
                        <asp:TextBox ID="address" name="address" CssClass="form-control" TextMode="MultiLine" Rows=3 runat="server"></asp:TextBox>
                    </div>
                    <div class=" form-group">
                        <label for="txtRemark">备注</label>
                        <asp:TextBox ID="remark" name=remark CssClass="form-control" TextMode="MultiLine" Rows=3 runat="server"></asp:TextBox>
                    </div>
                </div>
                <div class=" col-xs-12">
                    <div class="row">
                        <div class="col-xs-12 text-center">
                            <!--<a  href="<%=HTMLPayLink %>"  id="btnBack" class=" btn btn-info " <%=HTMLOnlinePaymentStyle %>>在线支付</a>-->
                        </div>
                        <div class="col-xs-12 " id="buy_remark" style=" margin-top:15px;">
                            <!--<div class=" alert alert-danger">*如果已在线支付，请在备注栏说明 ，将会有工作人员会与你核实。</div>-->
                        </div>
                    </div>
                </div>
                <asp:HiddenField ID="hfOpenid" runat="server" />
                <asp:HiddenField ID="hfFriendid" runat="server" />
                <asp:HiddenField ID="hfGoodsid" runat="server" />
                <asp:HiddenField ID="hfMode" runat="server" />
                <asp:HiddenField ID="hfArea" runat="server" />
                <asp:HiddenField ID="hfPrice" runat="server" />
                <asp:HiddenField ID="hfOnlinePay" runat="server" />
            </form>
        </div>
    </div>

    <!--处理提示-->
    <div id="modal-progress" class="modal fade" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">正在处理中，请稍等。。。</h4>
                </div>
                <div class="modal-body">
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                        <span class="sr-only">80% Complete (danger)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!---订单确认-->
    <div id="modal-affirm" class="modal fade" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">请确认你的订单</h4>
                </div>
                <div class="modal-body">
                    <p>产品名称：<span id="affirm-productname"></span><%=HTMLProductName%></p>
                    <p>产品单价：<span id="affirm-unitprice"></span>￥<%=HTMLUnitPrice%></p>
                    <p>订购数量：<span id="affirm-number"></span></p>
                    <p>订购总金额：<span id="affirm-Price"></span></p>
                    <p>订购人：<span id="affirm-name"></span></p>
                    <p>收货地址：<span id="affirm-address"></span></p>
                </div>
                <div class=" modal-footer">
                    <span style=" color:#f00;">请确认提交你的订单</span> <span class=" glyphicon glyphicon-hand-right"></span> 
                    <button type="button" id="btnSure" class="btn btn-success" >确认</button>
                    <button type="button" id="btnClose" class="btn btn-info"  data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
    <nav class="navbar navbar-inverse navbar-fixed-bottom">
        <div class="container">
            <div class="row">
                <div class="col-xs-6 text-center" style=" background:#337AB7; padding:5px 3px "><button type="button" id="btnSubmit" class=" btn btn-primary " <%=HTMLRoseberStyle %>>提交订单</button></div>
                <div class="col-xs-6 text-center" style=" background:#337AB7; padding:5px 3px "><a class=" btn btn-primary" href="<%=HTMLReturnUrl %>" style=" width:100%;" >返回</a></div>
            </div>
        </div>
    </nav>
    
    
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>

    <script src="../../../js/jquery.validate.js" type="text/javascript"></script>
    <script src="../../../js/jquery.validate.extend.js" type="text/javascript"></script>
    <script src="../../../js/jquery.validate.messages_cn.js" type="text/javascript"></script>
    <script src="js/order.js" type="text/javascript"></script>

    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    
    <script>
        $(function () {
            var url = $("#btnBack").attr("href");
            if (url != "javascript:void(0)") {
                $("#buy_remark").css("display", "block");
            } else {
                $("#buy_remark").css("display", "none");
            }
        })
    </script>

     <script>        
         wx.config({
             debug: false,
             appId: '<%=HTMLAppid %>',
             timestamp: <%=HTMLTimestamp %>,
             nonceStr: '<%=HTMLNoncestr %>',
             signature: '<%=HTMLSignature %>',
             jsApiList: [
                 'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'previewImage'
                ]
         });
    </script> 
    <script src="js/wxshare.js" type="text/javascript"></script>

</body>
</html>
