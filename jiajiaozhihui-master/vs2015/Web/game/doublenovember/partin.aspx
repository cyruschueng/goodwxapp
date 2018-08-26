<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="partin.aspx.cs" Async="true" Inherits="SfSoft.web.game.doublenovember.partin" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>上传图片</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../custorder/js/skins/all.css" rel="stylesheet" type="text/css" />
    <style>
        #cover{ position:fixed; left:0px; top:0px; width:100%; height:100%; display:none}
        .upload-prompt{ position: fixed; left:5%; width:90%; top:5px; display:block}
    </style>
    <style>
        .menu{ font-size:16px;}
    </style>
    
</head>
<body style=" padding-top:30px;  padding-bottom:50px;">
    <div class=" container" >
        <div class="row">
            <div class="col-xs-12">
                <div class=" thumbnail">
                    <img id="previewImage" src="" alt="" />
                    <div id="prompt" class="alert text-center " role="alert" runat="server">
                        <strong>提示：</strong>你还没有选择上传的图片 
                        <a href="javascript:void(0)" class="alert-link"><span class="glyphicon glyphicon-level-up">选择图片</span></a>
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
               <textarea id="resume" class="form-control" rows="3" placeholder="输入你的感想,不少小于10字"></textarea>
            </div>
            <div id="owner" class="col-xs-12" style=" padding-top:15px;font-size:14px">
                所属：
                <input type="radio" checked name="owner" value="孩子"   />&nbsp;&nbsp;&nbsp;孩子
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="radio"  name="owner"  value="成人"  />&nbsp;&nbsp;&nbsp;成人
            </div>
            <div class=" col-xs-12" style="padding-top:20px;">
                <p class="bg-success" style="padding:5px">
                    有部分用户不能上传作品，请到这里修正
                    <a class=" btn btn-bg-primary" href="<%=HTMLRepairUrl %>">进入</a>
                </p>
            </div>
        </div>
    </div>

    <!--提示对话-->
    <div class="modal fade" id="promptModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="imgModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="imgModalLabel">提示</h4>
                </div>
              <div class="modal-body">
                
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
              </div>
            </div>
          </div>
    </div>
    <nav class="navbar  navbar-fixed-bottom" style="min-height:45px;">
        <div class="container">
            <div class="row">
                <div class=" col-xs-6 text-center" style=" background:#337AB7; padding:5px 3px "><a class=" btn btn-primary menu" id="uploadImage" href="javascript:void(0)"  style=" width:100%;" >提交</a></div>
                <div class=" col-xs-6 text-center" style=" background:#337AB7; padding:5px 3px"><a class=" btn btn-primary menu" href="<%=HTMLReturnUrl %>" style=" width:100%;" >返回</a></div>
            </div>
        </div>
    </nav>
    <!--<a href="<%=HTMLRefleshUrl %>" class=" btn btn-default " >&nbsp;刷新</a>-->
    <div id="cover"></div>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfGoodsID" runat="server" />
    </form>
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="js/checkbrower.js" type="text/javascript"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
     <script src="js/partin.js" type="text/javascript"></script>
     <script src="../../custorder/js/icheck.min.js" type="text/javascript"></script>
     <script>
        $("input").iCheck({
            checkboxClass: "icheckbox_square-red",
            radioClass: 'iradio_square-red',
            increaseArea: "20%" // optional
        });
    </script>
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
     <script>        
         wx.config({
             debug: false,
             appId: '<%=HTMLAppid %>',
             timestamp: <%=HTMLTimestamp %>,
             nonceStr: '<%=HTMLNoncestr %>',
             signature: '<%=HTMLSignature %>',
             jsApiList: [
                'checkJsApi',
                'chooseImage',
                'uploadImage'
                ]
         });
    </script> 
    <script src="js/wx.js" type="text/javascript"></script>
</html>
