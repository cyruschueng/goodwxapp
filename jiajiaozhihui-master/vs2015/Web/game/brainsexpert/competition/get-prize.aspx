<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="get-prize.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.competition.get_prize" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>擂台赛-诗词大荟</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .error{ color:Red; font-size:11px;}
        #request{ position:fixed; width:100%; height:100%; left:0px; top:0px; display:none; z-index:900; background:rgba(0,0,0,0.5)}
        #request img{ position:absolute; margin-left:50%; left:-16px; margin-top:50%; top:-16px;}
    </style>
</head>
<body style=" padding-top:20px;">
    <div class=" container">
        <div class="row">
            <div class=" page-header">
                <h5 class="" style=" padding:0 15px;">你将获得出家教智慧提供的<%= HTMLProductName%></h5>
                <p><img src="<%=HTMLImgUrl %>" style=" width:100%;" /></p>
            </div>
            <div class="col-xs-12">
                <div id="exchange-tip" class=" modal " data-backdrop="static">
                    <div class=" modal-dialog">
                        <div class=" modal-content">
                            <div class=" modal-header">
                                <h5>提示</h5>
                            </div>
                            <div class="modal-body">
                                交换完成
                            </div>
                            <div class=" modal-footer">
                                <button type="button" class=" btn btn-primary btn-xs" data-dismiss="modal">关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class=" panel panel-primary">
                    <div class=" panel-heading">
                        <div class=" panel-title">奖品领取</div>
                    </div>
                    <div class=" panel-body">
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
                            <asp:HiddenField ID="hfActiveID" runat="server" />
                            <asp:HiddenField ID="hfEnable" runat="server" />
                            <asp:HiddenField ID="hfRank" runat="server" />
                        </form>
                    </div>
                    <div class=" panel-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				        <button id="btnSubmit" type="button" class="btn btn-primary">提交</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="request">
        <img src="../../../images/processed.gif" style=" width:32px; height:32px;" />
    </div>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="../../../js/jquery.validate.js" type="text/javascript"></script>
    <script src="../../../js/jquery.validate.extend.js" type="text/javascript"></script>
    <script src="../../../js/jquery.validate.messages_cn.js" type="text/javascript"></script>
    <script src="js/get-prize.js" type="text/javascript"></script>
    <script>
        
    </script>
</body>
</html>
