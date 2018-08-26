<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="detail.aspx.cs" Inherits="SfSoft.web.LearningCenter.view.detail" %>

<!DOCTYPE html >

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title><!--顾问中心-->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" id="viewport" name="viewport">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
</head>
<body>
    <div class=" container">
        <div class="row">
            <div  class=col-xs-12>
                <div id="Title" class=" text-center h3" ><%=HtmlTitle %></div>
                <hr />
                <div id="Content"><%=HtmlContent %></div>
            </div>
        </div>
    </div>
</body>
</html>
