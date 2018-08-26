<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="repair.aspx.cs" Inherits="SfSoft.web.game.doublenovemberII.repair" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>亲子书法用户更正</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
</head>
<body style=" padding-top:30px;">
    <div class=" container">
        <div class="row">
            <div class="col-xs-12">
                <div class=" alert alert-danger">
                    <strong>提示!</strong><br />
                    对部份用户上传不了作品，你可以通过以下步骤更正<br />
                    1）确认你已参加了活动，已领到我们为你寄去的书法贴！<br />
                    2）在下面的列表中查找有没有你的订单，如果有就将需”更正“<br />
                    3）如果在下面的列表找到找到你的订单，请将当时订单提交的电话号码以及姓名输入，然后点”更正“<br />
                    4）如果有不明白的地方可以联系客服：0755-22200786
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <form  runat="server">
                    <div class=" form-group form-group-sm">
                        <label for="telephone">手机号码：</label>
                        <input id="telephone" type="tel" class=" form-control " placeholder="请输入你提交订单时的手机号码" />
                    </div>
                    <div class=" form-group">
                        <label for="name">联系人：</label>
                        <input id="name" type="text" class=" form-control" placeholder="请输入你提交订单时联系人" />
                    </div>
                    <div class=" form-group" >
                        <div class="col-xs-3 text-center" style=" margin-bottom:15px;">
                            <span id="btnSearch" class="btn btn-success glyphicon glyphicon-search">查询</span>
                        </div>
                        <div class=" col-xs-3 text-center" style=" margin-bottom:15px;">
                            <span id="btnCorrect" class="btn btn-success glyphicon glyphicon-ok">更正</span>
                        </div>
                        <div class=" col-xs-6 text-center" style=" margin-bottom:15px;">
                            <a id="Span1" href="<%=HTMLReturnUrl %>" class="btn btn-success glyphicon glyphicon-ok">进入亲子书法圈</a>
                        </div>
                    </div>
                    <asp:HiddenField ID="hfOpenID" runat="server" />
                    <asp:HiddenField ID="hfWeixinID" runat="server" />
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <table class=" table">
                    <thead>
                        <tr>
                            <th>序号：</th>
                            <th>联系人：</th>
                            <th>手机号码：</th>
                            <th>订单状态：</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="js/repair.js" type="text/javascript"></script>
</body>
</html>
