<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="precedence.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.competition.precedence" %>

<!DOCTYPE html >

<html >
<head runat="server">
   <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>排行榜</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/precedence.css" rel="stylesheet" type="text/css" />
    
</head>
<body>
        <div class=" container" style=" margin-bottom:28px;">
            <div class=" row">
                <div class="col-xs-12">
                    <div class="table-responsive" id="rankinglist">
                        <table class="table">
                            <tbody>
                                <%=HTMLData %>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <form id="form1" runat="server">
            <asp:HiddenField ID="hfRanking" runat="server" />
        </form>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="js/precedence.js?v=1" type="text/javascript"></script>
</body>
</html>
