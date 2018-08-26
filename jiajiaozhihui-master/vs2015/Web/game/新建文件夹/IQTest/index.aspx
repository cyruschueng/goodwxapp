<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="SfSoft.web.game.IQTest.index" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>测一测孩子天赋</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <script src="../../js/jquery.js" type="text/javascript"></script>
    <script src="js/index.js" type="text/javascript"></script>
    
</head>
<body style=" padding-top:20px;">
    <div class="container" style=" position:relative;" >
        <div id="start" style=" position:fixed; width:100%; height:100%; background:#ffea9f; left:0px; top:0px; text-align:center; padding-top:20px;  display:block;">
            <div class=" thumbnail" style=" background:#ffea9f; border:none;">
            <img src="images/iq_main.gif" style=" width:50%;" />
            <button id="btnTest" class=" btn  btn-lg btn-danger" style=" width:50%; font-size:24px;" ><span class="glyphicon glyphicon-hand-right" ></span>&nbsp;&nbsp;测一测</button>
            <div style=" height:20px;"></div>
            </div>
        </div>
        <div id="going" style=" position:fixed; width:100%; height:100%; background:#ffea9f; left:0;top:0; display:none;">
            <img src="images/cat.png" style=" width:100%; " />
            <div style="margin:0 20px; padding:50px 10px 30px 10px; border-top:8px solid #3a1a03; border-bottom:8px solid #3a1a03; border-left:4px solid #3a1a03; border-right:4px solid #3a1a03; border-radius:15px;">
                    <h4 id="iqtest_title" class="caption"  style=" color:#000;"></h4>
                    <p class=" text-center" style=" padding-top:50px;">
                        <button class=" btn btn-success" id="btnTrue" name="true" style=" width:30%; background:#c5d645; border-color:#c5d645; margin-right:10px; font-size:24px; color:#000;">是</button>
                        <button class=" btn btn-default" id="btnFalse" name="false" style=" width:30%; background:#c0bfbf; margin-left:10px; font-size:24px; color:#000;">否</button>
                    </p>
                </div>
        </div>
        <div id="done" style=" position:fixed; width:100%; height:100%; background:url(images/result.png) #ffea9f no-repeat; background-size:100%;  display:none; left:0; top:0;  ">
            <div style=" padding-top:45%;">
                <h2 style=" margin-bottom:0px; text-align:center; font-weight:bold;">测试结果</h2>
                <div style="  width:80%; height:70%; margin:0 auto;">
                    <ul class=" list-group" id="rights" style="font-size:14px; color:#000;">
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenid" runat="server" />
    </form>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</body>
</html>
