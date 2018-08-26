<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="partinIII.aspx.cs" Inherits="SfSoft.web.game.qzsf.partinIII" %>

<!DOCTYPE html >
<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>上传作品</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/weui.min.css" rel="stylesheet" type="text/css" />
    <style>
        label.error,label.error2{ display:block; color:Red; font-size:12px;}
        .shener_label{ font-weight:normal; margin-bottom:inherit; max-width: inherit;}
        .upload-prompt{ position: fixed; left:5%; width:90%; top:5px; display:block}
        .menu{ font-size:16px; padding:6px 8px; border:none; width:100%;}
        .right-line{ border-right:1px solid #fff; border-top-right-radius:0;border-bottom-right-radius:0;}
        .left-line{ border-left:1px solid #fff; border-top-left-radius:0;border-bottom-left-radius:0;}
    </style>
</head>
<body style=" padding-top:30px;  padding-bottom:70px;">
<div>
<!--
    <div class=" container" style=" padding-top:30px;">
        <div class="row">
            <div class="col-xs-12">
                <img style="width:100%;" src="../images/maintenance.jpg" />
            </div>
            <div class="col-xs-12 ">
                <p>尊敬的用户：</p>
                <p>由于系统进一步优化</p> 
                <p>活动今天将暂停，进行维护,给大家带来不便，请原谅</p>
                <p>维护后将在 2016-08-31 23：00开启</p>
                <p>客户电话：0755-21622298</p>
            </div>
        </div>
    </div>
-->	
    <form id="uploadForm" runat="server">
        <div class=" container">
            <div class="row">
                <div class="col-xs-12">
                    <div class=" thumbnail">
                        <img id="previewImage" src="" alt="" />
                        <div id="prompt" class="alert text-center " role="alert" runat="server">
                            <strong>提示：</strong>你还没有选择上传的图片 
                            <a id="chooseImage" href="javascript:void(0)" class="alert-link"><span class="btn btn-success glyphicon glyphicon-level-up">选择图片</span></a>
                        </div>
                    </div>
                </div>
		<div class="col-xs-12 text-center" id="voicerecord">
                    <span class="btn btn-xs btn-info glyphicon glyphicon-volume-up" id="btnVoice">录音</span>
                </div>
                <div class="col-xs-12 text-center" id="voicetry" style="display:none;">
                    <div class="row">
                        <div class="col-xs-6 text-center"><span class="btn btn-xs btn-info glyphicon glyphicon-headphones" id="btnTestVoice">试听</span> </div>
                        <div class="col-xs-6 text-center"><span class="btn btn-xs btn-success glyphicon glyphicon-remove-circle" id="btnTryRecordVoice">重配音</span> </div>
                    </div>
                </div>
                <div class=" col-xs-12">
                    <div class="weui_cells weui_cells_form">
                        <div class="weui_cell">
                            <div class="weui_cell_bd weui_cell_primary">
                                <textarea id="resume" name="resume" class="weui_textarea" placeholder="输入你的感想,最少5个字" rows="1" required="required"></textarea>
                                <div class="weui_textarea_counter"><span>0</span>/50</div>
                            </div>
                        </div>
                    </div>
                    <div class="weui_cells_title" >所属：</div>
                    <div class="weui_cells weui_cells_radio" id="owner">
                        <label class="weui_cell weui_check_label" for="x11">
                            <div class="weui_cell_bd weui_cell_primary">
                                <p class="shener_label">孩子</p>
                            </div>
                            <div class="weui_cell_ft">
                                <input type="radio" class="weui_check" value="孩子" name="owner" id="x11" checked="checked">
                                <span class="weui_icon_checked"></span>
                            </div>
                        </label>
                        <label class="weui_cell weui_check_label" for="x12">

                            <div class="weui_cell_bd weui_cell_primary">
                                <p class="shener_label">成人</p>
                            </div>
                            <div class="weui_cell_ft">
                                <input type="radio" name="owner" value="成人" class="weui_check" id="x12" >
                                <span class="weui_icon_checked"></span>
                            </div>
                        </label>
                    </div>
                </div>
                <div class="col-xs-12">
                        <div class="weui_cells_tips" id="tips"></div>
                        <div class="weui_cells_tips" id="tips2"></div>
                </div>
                <div class="col-xs-12" style=" margin-top:30px;">
                    <div class="row">
                        <div class=" col-xs-3 text-center" ></div>
                        <div class=" col-xs-6 text-center" ><a class=" btn btn-success" id="uploadImage" href="javascript:void(0)"   ><span class="glyphicon glyphicon-saved"></span>  提交</a></div>
                        <div class=" col-xs-3 text-center" ></div>
                    </div>
                    
                </div>
            </div>
        </div>

        <div class="weui_dialog_alert" id="dialogverify" style="display: none;">
            <div class="weui_mask"></div>
            <div class="weui_dialog">
                <div class="weui_dialog_hd"><strong class="weui_dialog_title">提示</strong></div>
                <div class="weui_dialog_bd"></div>
                <div class="weui_dialog_ft">
                    <a href="javascript:;" class="weui_btn_dialog primary">确定</a>
                </div>
            </div>
        </div>
        
        <nav class="navbar  navbar-fixed-bottom" style="min-height:42px;" id="footerMenu">
            <div class="container">
                <div class="row">
                    <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.CommunityLink %>" >书法圈</a></div>
                    <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.UpLoadLink %>" >上传作品</a></div>
                    <div class="col-xs-4 text-center  " style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.MyInfoLink %>" >我的</a></div>
                </div>
            </div>
        </nav>

	<div id="actionSheet_wrap">
            <div class="weui_mask_transition" id="mask"></div>
            <div class="weui_actionsheet" id="weui_actionsheet">
                <div id="actionsheet_record"  class="text-center" style="padding: 15px 5px; display: none ">
                    <img style="width:50%;" src="images/0112205543a25f0000019ae98571ec.jpg">
                </div>
                <div class="weui_actionsheet_menu">
                    <div id="actionsheet_voice" class="weui_actionsheet_cell">开始录音</div>
                </div>
                <div class="weui_actionsheet_action">
                    <div class="weui_actionsheet_cell" id="actionsheet_cancel">取消</div>
                </div>
            </div>
        </div>

        <input type="text" name="file1" id="file1" style=" display:none" />
    	<input id="subbtn" type="submit" style=" display:none">
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfGoodsID" runat="server" />
        <asp:HiddenField ID="hfBackUrl" runat="server" />
        <asp:HiddenField ID="hfInfoUrl" runat="server" />
        <asp:HiddenField ID="hfWeixinID" runat="server" />
    </form> 
</div>
<script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
<script src="js/jquery-weui.js" type="text/javascript"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="js/wxJsSdk.js" type="text/javascript"></script>
<script src="js/partinIII.js?id=12" type="text/javascript"></script>


</body>
</html>
