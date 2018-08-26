<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.autopartin._default" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>用户注册</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/weui.min.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div class=" container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="weui_msg">
                        <div class="weui_icon_area"><i class="<%=HtmlStyle %>  weui_icon_msg"></i></div>
                        <div class="weui_text_area">
                            <h2 class="weui_msg_title"><%=HtmlTitle %></h2> 
                            <p class="weui_msg_desc"><%=HtmlInfo %></p>
                        </div>
                        <div class="weui_opr_area">
                            <p class="weui_btn_area">
                                <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa0f624ad8cdb46c4&redirect_uri=http%3A%2F%2Fweixin.jiajiaozhihui.cn%2Fgame%2Fqzsf%2Fstart%2Findex.aspx&response_type=code&scope=snsapi_base&state=123456789&connect_redirect=1#wechat_redirect" class="weui_btn weui_btn_primary" id="btnPartIn" runat="server" >进入亲子书法圈</a>
                            </p>
                        </div>
                        <div class="weui_extra_area">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>
    </form>
</body>
</html>
