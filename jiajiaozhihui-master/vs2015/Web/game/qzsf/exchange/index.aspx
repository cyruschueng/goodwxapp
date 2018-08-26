<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="SfSoft.web.game.qzsf.exchange.index" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/weui.min.css" rel="stylesheet" type="text/css" />
    <title>商品兑换</title>
    <style>
        .unselected{ color:#fff;}
    </style>
</head>
<body>
    <div class="weui_tab" >
            <div class=" container" style="">
                <div class="row" style=" border-bottom:1px solid #ccc;">
                    <div class="col-xs-2" style="padding:5px 0 5px 5px;">
                        <img style=" width:60px; height:60px; border-radius:30px;" src="<%=HTMLHeadImgUrl %>" />
                    </div>
                    <div class="col-xs-10">
                        <div class="row">
                            <div class="col-xs-6 text-primary" style=" height:60px; line-height:60px; font-size:16px; padding-top:5px; padding-bottom:5px; font-weight:bolder"><%=HTMLNickName%></div>
                            <div class="col-xs-6" style=" height:60px; line-height:60px;">金币：<%=HTMLGold %></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weui_tab_bd" >
                <div class=" container" id="detail" style="">
                </div>
            </div>
            <div class="weui_tabbar" style=" position:fixed; bottom:0; background:#337AB7;">
                <a href="javascript:;" style=" text-decoration:none;" class="weui_tabbar_item weui_bar_item_on" id="selectGold">
                    <div class="weui_tabbar_icon" style=" background:url(images/mygold.png) no-repeat 0px 0px; background-size:100%">
                        
                    </div>
                    <p class="weui_tabbar_label" >金币兑换</p>
                </a>
                <!--
                <a href="javascript:;" style=" text-decoration:none;" class="weui_tabbar_item" id="selectDiamond">
                    <div class="weui_tabbar_icon" style=" background:url(images/diamond.png) no-repeat 0px -5px; background-size:100%" >
                        
                    </div>
                    <p class="weui_tabbar_label unselected" >钻石兑换</p>
                </a>
                -->
                <a href="help.aspx?id=1" style=" text-decoration:none;" class="weui_tabbar_item">
                    <div class="weui_tabbar_icon">
                        <span class="glyphicon glyphicon-question-sign" style=" font-size:24px; color:#fff"></span>
                    </div>
                    <p class="weui_tabbar_label unselected" >帮助</p>
                </a>
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
                <p class="weui_toast_content">数据加载中</p>
            </div>
        </div>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="js/index.js" type="text/javascript"></script>
    <script>
        
    </script>
</body>
</html>
