<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="productdetail.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.competition.productdetail" %>

<!DOCTYPE html >

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
    <title>奖品</title>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    
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
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfProductID" runat="server" />
    </form>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script>
        $(".panel-body img").removeAttr("width").removeAttr("height").remove("style");
        $(".panel-body img").css({ "width": "100%", "height": "auto" });
    </script>
   
</body>
</html>
