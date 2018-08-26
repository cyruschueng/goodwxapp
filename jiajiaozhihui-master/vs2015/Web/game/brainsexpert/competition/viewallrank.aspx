<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="viewallrank.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.competition.viewallrank" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
   <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>排行榜</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/precedence.css" rel="stylesheet" type="text/css" />
    <style>
        
    </style>
</head>
<body>
        <div class=" container" style=" margin-bottom:28px;">
            <div class="row">
                <div class=" col-xs-12">
                    <div class=" page-header">
                        <ul class="nav nav-pills">
                          <li role="presentation" class="active"><a href="prize.aspx">奖品</a></li>
                          <li role="presentation"><a href="info.aspx">奖品领取</a></li>
                          <li role="presentation"><a href="precedence.aspx">排行榜</a></li>
                          <li role="presentation"><a href="help.aspx">活动规则</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class=" row">
                <div class="col-xs-12">
                    <div class="" id="rankinglist">
                        <table class=" table">
                            <tbody>
                                <%=HTMLData %>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
        <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
        <script>
          $(".table tr").each(function(index){
          var c= $(this).children().eq(3).text();
          if(c.length>3){
             $(this).children().eq(3).text(c.substr( 0,3));
          }
         });
      </script>
</body>
</html>
