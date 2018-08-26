<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="agreementlist.aspx.cs" Inherits="SfSoft.web.game.qzsf.agreementlist" %>

<!DOCTYPE html >
<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>协议书上传</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/weui.min.css" rel="stylesheet" type="text/css" />
</head>
<body style=" padding-top:30px;  padding-bottom:50px;">
<div>
    <form id="uploadForm" runat="server">
        <div class=" container">
            <div class="row" id="rowImgArea" runat="server">
                <div class="col-xs-12">
                    <div style="font-size:16px; font-weight:bold"  class=" text-center" >我的协议</div>
                    <hr />
                    <img id="imgAgreement" src="<%=HtmlImgUrl %>"  style="width:100%;" />
                </div>
            </div>
            <div class="row" style=" padding-top:30px;" id="rowImgAdd" runat="server">
                <div class="col-xs-12">
                    <a href="agreement.aspx" class="btn btn-success">添加协议</a>
                    <hr />
                </div>
                <div class="col-xs-12 text-center">
                    你还没有添加任何协议
                </div>
            </div>
        </div>
        <asp:HiddenField ID="hfOpenID" runat="server" />
    </form> 
</div>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="js/wxJsSdk.js" type="text/javascript"></script>

    <script>
        var wxconfig = {
            regist: function () {
                $.ajax({
                    url: '/game/qzsf/server/RegistWxConfig.ashx',
                    type: 'Post',
                    dataType: 'JSON',
                    data: { 'url': window.location.href },
                    success: function (data) {
                        wx.config({
                            debug: false,
                            appId: data.AppId,
                            timestamp: data.Timestamp,
                            nonceStr: data.NonceStr,
                            signature: data.Signature,
                            jsApiList: ['hideOptionMenu', 'chooseImage', 'previewImage', 'uploadImage']
                        });
                    }
                })
            }
        }
        wxconfig.regist();
        var jssdk = new jsSdk();
        $("#imgAgreement").on('click', function () {
            var src = $(this).attr("src");

            if (src.indexOf("http://") == -1) {
                src = "http://" + window.location.host + src;
            }
            jssdk.setPreviewImageUrls(src, [src]);
            jssdk.image.previewImage();
        })
    </script>
</body>
</html>
