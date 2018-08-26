<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="agreement.aspx.cs" Inherits="SfSoft.web.game.qzsf.agreement" %>

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
            <div class="row">
                <div class="col-xs-12">
                    <div class=" thumbnail">
                        <img id="previewImage" src="" alt="" />
                        <div id="prompt" class="alert text-center " role="alert" runat="server">
                            <a id="chooseImage" href="javascript:void(0)" class="alert-link"><span class="btn btn-success glyphicon glyphicon-level-up">选择协议</span></a>
                        </div>
                    </div>
                </div>
                <div class=" col-xs-12">
                    <div class="weui_cells weui_cells_form">
                        <div class="weui_cell">
                            <div class="weui_cell_hd" style="width:100px;"><label class="weui_label" style="width:100px; font-weight:normal">姓名：</label></div>
                            <div class="weui_cell_bd weui_cell_primary">
                                <input type="text" id="name"  class=" weui_input"  placeholder="你购买时的姓名" required="required" />
                            </div>
                        </div>
                        <div class="weui_cell">
                            <div class="weui_cell_hd" style="width:100px;"><label class="weui_label" style="width:100px;font-weight:normal">电话号码：</label></div>
                            <div class="weui_cell_bd weui_cell_primary">
                                <input type="text" id="telephone"  class=" weui_input"  placeholder="你购买时的电话号码" required="required" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12" style=" margin-top:30px;">
                    <div class="row">
                        <div class=" col-xs-3 text-center" ></div>
                        <div class=" col-xs-6 text-center" ><a class=" btn btn-success" id="uploadImage" href="javascript:void(0)"   >上传协议书</a></div>
                        <div class=" col-xs-3 text-center" ></div>
                    </div>
                </div>
            </div>
        </div>
        <asp:HiddenField ID="hfOpenID" runat="server" />
    </form> 
</div>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="js/jquery-weui.js" type="text/javascript"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="js/wxJsSdk.js" type="text/javascript"></script>
    <script src="js/agreement.js" type="text/javascript"></script>
</body>
</html>

