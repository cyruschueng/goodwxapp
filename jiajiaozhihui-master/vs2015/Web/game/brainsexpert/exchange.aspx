<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="exchange.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.exchange" %>

<!DOCTYPE html >

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
    <title>金币商城</title>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/exchange.css" rel="stylesheet" type="text/css" />
</head>
<body style=" padding-top:20px;">
    <div class=" container">
        <div class="row">
            <div class="col-xs-12">
                <div class="thumbnail" style=" margin-bottom:0">
                    <img  src="<%=HTMLImgUrl %>" style=" max-width:80%;" alt="" />
                </div>
                <div class=" panel" style=" margin-bottom:0">
                    <div class=" panel-body">
                        <h3 class=" text-center"><%=HTMLTitle %></h3>
                        <p class=" text-right">所需金币：<span class="text-danger" style=" font-size:20px;"><%=HTMLExchange %></span> 金币</p>
                        <p class=" text-right">
                            <span id="order" class="btn btn-danger btn-lg "  <%=HTMLEnable %>  <%=HTMLButtonStyle %>   ><%=HTMLButtonName%></span>
                        </p>
                        
                        <!--显示返回结果-->
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="panel">
                    <div class=" panel-heading" style="padding-top:0">
                        <h3 style=" margin-top:0; margin-bottom:0">产品介绍</h3>
                    </div>
                    <div class=" panel-body" style="margin-top:0; padding-top:0;">
                        <%=HTMLDesc %>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="mymodal" class="modal" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h5 class="modal-title">本次兑换将花费<%=HTMLExchange%>金币，您当前持有<%=HTMLAllExchange %>金币。</h5>
                    <p>请认真填写收货信息，这件礼品就会投向您的怀抱了~~~</p>
                    <p class=" text-success">所有兑换的产品均包邮</p>
                </div>
                <div class="modal-body">
                    <form id="form1" action="#" method="get"  runat="server">
                        <div class=" form-group form-group-sm">
                            <label for="recipients">收件人姓名：<span class="import">*</span></label>
                            <input  type="text" id="recipients" name="recipients" class=" form-control" />
                        </div>
                        <label style=" display:block;">所在地区：<span class="import">*</span></label>
                        <div class="btn-group" style=" margin-bottom:15px;width:100%;">
                            <div class="btn-group" style=" width:50%;">
                              <select class=" form-control" id="province" name="province">
                                <%=HTMLProvince %>
                              </select>
                          </div>
                          <div class="btn-group" style=" width:50%;">
                              <select class=" form-control" id="city" name="city"></select>
                          </div>
                        </div>
                        <div class=" form-group">
                            <label for="address">街道地址：<span class="import">*</span></label>
                            <input  type="text" id="address" name="address" class=" form-control" placeholder="街道地址"/>
                        </div>
                        <div class=" form-group">
                            <label for="address">邮政编码：</label>
                            <input  type="text" id="postcode" name="postcode" class=" form-control" placeholder="邮政编码"/>
                        </div>
                        <div class=" form-group">
                            <label for="address">手机号码：<span class="import">*</span></label>
                            <input  type="text" id="mobile" name="mobile" class=" form-control" placeholder="手机号码"/>
                        </div>
                        <asp:HiddenField ID="hfCity" runat="server" />
                        <asp:HiddenField ID="hfOpenID" runat="server" />
                        <asp:HiddenField ID="hfProductID" runat="server" />
                        <asp:HiddenField ID="hfEnable" runat="server" />
                    </form>
                </div>
                <div class="modal-footer">
				    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				    <button id="btnSubmit" type="button" class="btn btn-primary">提交</button>
			    </div>
                <p style=" color:#f00; padding-left:15px;">注：请确认您提交的信息正确，提交后不能修改</p> 
            </div>
        </div>
    </div>
    <div id="request">
        <img src="../../images/processed.gif" style=" width:32px; height:32px;" />
    </div>

    <div id="exchange-tip" class=" modal " data-backdrop="static">
        <div class=" modal-dialog">
            <div class=" modal-content">
                <div class=" modal-header">
                    <h5>提示</h5>
                </div>
                <div class="modal-body">
                    你已兑换成功！
                </div>
                <div class=" modal-footer">
                    <button type="button" class=" btn btn-primary btn-xs" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="../../js/jquery.validate.js" type="text/javascript"></script>
    <script src="../../js/jquery.validate.extend.js" type="text/javascript"></script>
    <script src="../../js/jquery.validate.messages_cn.js" type="text/javascript"></script>
    <script src="../js/exchange.js" type="text/javascript"></script>
   
</body>
</html>
