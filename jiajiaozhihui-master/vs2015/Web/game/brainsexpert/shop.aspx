<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="shop.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.shop" %>

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
    <style >
        .ellipsis
        {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis; 
            white-space: nowrap; 
        }
    </style>
</head>
<body style=" padding-top:20px;">
    <div class=" container">
        <div class="row">
            <div class="col-xs-12">
                <div class="thumbnail ">
                    <img src="../images/miaosha.jpg" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class=" alert  alert-success">
                    <a id="help" href="javascript:void(0)" class="alert-link" data-toggle="modal" data-target=".bs-example-modal-sm" style=" font-size:14px;">如何获取金币 &nbsp;&nbsp;<span class="glyphicon glyphicon-question-sign"></span></a>
                    
                </div>
            </div>
        </div>
        <div class="row">
            <%=HTMLProduct %>
        </div>
    </div>
    <div id="myModal" class=" modal bs-example-modal-sm" tabindex="-1" role="dialog">
        <div class=" modal-dialog modal-sm">
            <div class=" modal-content">
                <div class=" modal-header">
                    <button type="button" class=" close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title lead">获取金币规则</h4>
                </div>
                <div class=" modal-body">
                    <p>每局获得【15分~19分】，奖励【2个】金币</p>
                    <p>每局获得【20分~24分】，奖励【5个】金币</p>
                    <p>每局获得【25分~29分】，奖励【8个】金币</p>
                    <p>每局获得【30分】，奖励【10个】金币</p>
                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenID" runat="server" />
    </form>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script>
        $(function () { 
            $("#help").dia
        })
    </script>
</body>
</html>
