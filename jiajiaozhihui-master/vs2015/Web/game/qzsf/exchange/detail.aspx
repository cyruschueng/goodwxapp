<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="detail.aspx.cs" Inherits="SfSoft.web.game.qzsf.exchange.detail" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/weui.min.css" rel="stylesheet" type="text/css" />
    <title>兑换</title>
</head>
<body>
    <div class=" container" style=" padding-bottom:30px;">
        <div class="row">
            <img src="<%=HTMLImage %>"  style=" width:100%;" />
        </div>
        <div class="row" style=" margin-top:10px;">
            <div class="col-xs-12">
                <div class="weui_cells">
                    <div class="weui_cell">
                        <div class="weui_cell_bd weui_cell_primary" id="quantity">
                            <%=HTMLQuantity%>
                        </div>
                        <div class="weui_cell_ft"></div>
                    </div>
                    <div class="weui_cell">
                        <div class="weui_cell_bd weui_cell_primary" id="details">
                            <%=HTMLQetails%>
                        </div>
                        <div class="weui_cell_ft"></div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <a id="exchange" runat="server"  class="weui_btn weui_btn_primary">兑换</a>
            </div>
        </div>
    </div>
    <div id="loadingToast" class="weui_loading_toast" style="display:none;">
            <div class="weui_mask_transparent"></div>
            <div class="weui_toast">
                <div class="weui_loading">
                    <div class="weui_loading_leaf weui_loading_leaf_0"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_1"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_2"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_3"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_4"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_5"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_6"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_7"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_8"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_9"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_10"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_11"></div>
                </div>
                <p class="weui_toast_content">数据上传中</p>
            </div>
        </div>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</body>
</html>
