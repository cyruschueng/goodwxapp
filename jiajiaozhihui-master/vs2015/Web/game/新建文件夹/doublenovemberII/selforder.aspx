<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="selforder.aspx.cs" Inherits="SfSoft.web.game.doublenovemberII.selforder" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>注册亲子书法</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/weui.min.css" rel="stylesheet" type="text/css" />
    <style>
        #tips .error{ color:#f00; font-size:12px;}
    </style>
</head>
<body>  
    <form id="form1" runat="server">
    <div class=" container">
        <div class="row">
            <div class="col-xs-12">
                <article class="weui_article">
                    <section>
                        <h1 class="title"><strong>请正确填写以下信息</strong> </h1>
                        <p>收货人,号码都是当时订购时填写的</p>
                    </section>
                </article>
                <div class="weui_cells weui_cells_form">
                    <div class="weui_cell">
                        <div class="weui_cell_hd"><label class="weui_label">收货人</label></div>
                        <div class="weui_cell_bd weui_cell_primary">
                            <input class="weui_input" type="text" id="name" name="name"  form="form1"   placeholder="请输入收货人号"/>
                        </div>
                    </div>
                    <div class="weui_cell">
                        <div class="weui_cell_hd"><label class="weui_label">号码</label></div>
                        <div class="weui_cell_bd weui_cell_primary">
                            <input class="weui_input" id="telephone" type="number" name="telephone" form="form1"  pattern="[0-9]*" placeholder="请输入手机号码"/>
                        </div>
                    </div>
                </div>
                <div class="weui_cells_tips" id="tips"></div>
                <div class="weui_btn_area">
                    <a class="weui_btn weui_btn_primary" href="javascript:;" id="submit">确定</a>
                </div>
            </div>
        </div>
    </div>
    <nav class="navbar  navbar-fixed-bottom" style="min-height:42px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLCommunityLink %>" >进入亲子书法圈</a></div>
            </div>
        </div>
    </nav>
    <div class="weui_dialog_alert" id="dialog2" style="display: none;">
        <div class="weui_mask"></div>
        <div class="weui_dialog">
            <div class="weui_dialog_hd"><strong class="weui_dialog_title">提示</strong></div>
            <div class="weui_dialog_bd" id="alertBody"></div>
            <div class="weui_dialog_ft">
                <a href="javascript:;" class="weui_btn_dialog primary">确定</a>
            </div>
        </div>
    </div>
    
        <asp:HiddenField ID="hfOpenId" runat="server" />
    </form>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="../../js/jquery.validate.js" type="text/javascript"></script>
    <script src="../../js/jquery.validate.extend.js" type="text/javascript"></script>
    <script src="../../js/jquery.validate.messages_cn.js" type="text/javascript"></script>
    <script>
        $("#submit").click(function () {
            var b = validate1();
            if (b == false) {
                return;
            }
            var telephone = $("#telephone").val();
            var name = $("#name").val();
            var openid = $("#hfOpenId").val();
            $.ajax({
                url: 'server/selforder.ashx',
                type: 'POST',
                dataType: 'JSON',
                data: { 'goodsid': '76', 'telephone': '' + telephone + '', 'name': '' + name + '', 'openid': '' + openid + '' },
                success: function (data) {
                    var $body = $("#alertBody");
                    var tips = "";
                    var link = "javascrip:;";
                    if (data.code == 0) {
                        tips = "注册成功，点击确认后，进入亲子书法圈";
                        link = "<%=HTMLCommunityLink %>"
                    } else if (data.code == 1) {
                        tips = "没有要更新的数据或输入的数据不正确";
                    } else {
                        tips = "注册失败";
                    }
                    $body.text(tips);
                    var $dialog2 = $('#dialog2');
                    $dialog2.show();
                    $dialog2.find('.weui_btn_dialog').one('click', function () {
                        if (data.code == 0) {
                            location.href = link;
                        }
                        $dialog2.hide();
                    });
                }
            });
        });
        function validate1() {
            var o = $("#form1").validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    telephone: {
                        required: true,
                        mobile: true
                    }
                },
                messages: {
                    name: {
                        required: "请填写收货人姓名&nbsp;&nbsp;&nbsp;",
                        minlength: "收货人姓名不合法，必须大于或等于2个字&nbsp;&nbsp;&nbsp;"
                    },
                    telephone: {
                        required: "请填写收货人联系人电话&nbsp;&nbsp;&nbsp;",
                        mobile: "手机格式不正确&nbsp;&nbsp;&nbsp;"
                    }
                },
                errorPlacement: function (error, element) {
                    error.appendTo($("#tips"));
                }
            });
            if (o.form()) {
                return true;
            }
            return false;
        }
        
    </script>
</body>
</html>
