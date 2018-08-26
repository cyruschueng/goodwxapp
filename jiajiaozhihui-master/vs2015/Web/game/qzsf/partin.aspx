<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="partin.aspx.cs" Async="true" Inherits="SfSoft.web.game.qzsf.partin" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">   
    <title>上传作品</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../custorder/js/skins/all.css" rel="stylesheet" type="text/css" />
    <style>
        #cover{ position:fixed; left:0px; top:0px; width:100%; height:100%; display:none}
        .upload-prompt{ position: fixed; left:5%; width:90%; top:5px; display:block}
        .menu{ font-size:16px; padding:6px 8px; border:none; width:100%;}
        .right-line{ border-right:1px solid #fff; border-top-right-radius:0;border-bottom-right-radius:0;}
        .left-line{ border-left:1px solid #fff; border-top-left-radius:0;border-bottom-left-radius:0;}
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
                        <a href="javascript:void(0)" class="alert-link"><span class="btn btn-success glyphicon glyphicon-level-up">选择图片</span></a>
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
               <textarea id="resume" class="form-control" rows="3" required="required" placeholder="输入你的感想,最少5个字"></textarea>
            </div>
            <div id="owner" class="col-xs-12" style=" padding-top:15px;">
                所属：
                <input type="radio" checked name="owner" value="孩子"   />&nbsp;&nbsp;&nbsp;孩子
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="radio"  name="owner"  value="成人"  />&nbsp;&nbsp;&nbsp;成人
            </div>
            <div class=" col-xs-12" style=" padding-top:15px;">
                进展：
                <div class="btn-group" id="bookname">
                    <div class="btn-group">
                        <button class="btn  btn-default dropdown-toggle" data-toggle="dropdown" type="button">---书名---<span class="caret"></span></button>
                          <div class="dropdown-menu" style="min-width:300%">
                            <div class="row" style=" margin-bottom:50px;">
                                <div class=" col-xs-6"><a style=" display:block" href="javascript:void(0)" >《弟子规》</a></div>
                                <div class=" col-xs-6"><a style=" display:block" href="javascript:void(0)">《三字经》</a></div>
                                <div class=" col-xs-12 divider" role="presentation" ></div>
                                <div class=" col-xs-6"><a style=" display:block" href="javascript:void(0)">《千字文》</a></div>
                                <div class=" col-xs-6"><a style=" display:block" href="javascript:void(0)">《诫子书》</a></div>
                                <div class=" col-xs-12 divider" role="presentation" ></div>
                                <div class=" col-xs-6"><a href="javascript:void(0)">《声律启蒙》上</a></div>
                                <div class=" col-xs-6"><a href="javascript:void(0)">《声律启蒙》下</a></div>
                                <div class=" col-xs-12 divider" role="presentation" ></div>
                                <div class=" col-xs-6"><a href="javascript:void(0)">《唐诗选》</a></div>
                                <div class=" col-xs-6"><a href="javascript:void(0)">《孝经》</a></div>
                                <div class=" col-xs-12 divider" role="presentation" ></div>
                                <div class=" col-xs-6"><a href="javascript:void(0)">《格言别录》</a></div>
                                <div class=" col-xs-6"><a href="javascript:void(0)">《大学》</a></div>
                                <div class=" col-xs-12 divider" role="presentation" ></div>
                                <div class=" col-xs-6"><a href="javascript:void(0)">《中庸》</a></div>
                                <div class=" col-xs-6"><a href="javascript:void(0)">《论语》上</a></div>
                                <div class=" col-xs-12 divider" role="presentation" ></div>
                                <div class=" col-xs-6"><a href="javascript:void(0)">《论语》中</a></div>
                                <div class=" col-xs-6"><a href="javascript:void(0)">《论语》下</a></div>
                                <div class=" col-xs-12 divider" role="presentation" ></div>
                                <div class=" col-xs-6"><a href="javascript:void(0)">《老子道德经》</a></div>
                            </div>
                          </div>
                    </div>
                    <div class="btn-group btn-group-xs">
                        <input type=number class=" form-control"   max="50"  min="1"  id="pageindex" placeholder="页码" />
                    </div>
                    
                </div>
            </div>
            <div class="col-xs-12" style=" margin-top:30px;">
                <div class="row">
                    <div class=" col-xs-3 text-center" ></div>
                    <div class=" col-xs-6 text-center" ><a class=" btn btn-success" id="uploadImage" href="javascript:void(0)"   ><span class="glyphicon glyphicon-saved"></span>  提交</a></div>
                    <div class=" col-xs-3 text-center" ></div>
                </div>
            </div>
            <div class=" col-xs-12" style="padding-top:20px;">
                <p class="bg-success" style="padding:5px">
                    如果你的订单已审核，但还是显示 <span style="color:#f00">订单正在审核中。。。</span> 请到这里修正
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
    <div class="modal fade" id="modal-result" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="imgModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" >提示</h4>
                </div>
              <div class="modal-body">
                你的作品上传成功
              </div>
              <div class="modal-footer">
                <button type="button" id="btnComment" class="btn btn-primary">确认</button>
              </div>
            </div>
          </div>
    </div>
    <nav class="navbar  navbar-fixed-bottom" style="min-height:42px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLCommunityLink %>" >书法圈</a></div>
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLUpLoadLink %>" >上传作品</a></div>
                <div class="col-xs-4 text-center  " style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLMyInfoLink %>" >我的</a></div>
            </div>
        </div>
    </nav>
    <div id="modal-net-exception" class="modal fade" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <strong>提示</strong>
                </div>
                <div class="modal-body">
                    <h4 class="modal-title">网络异常，请稍后重试。。。。</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
    <div id="cover"></div>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfGoodsID" runat="server" />
        <asp:HiddenField ID="hfBackUrl" runat="server" />
        <asp:HiddenField ID="hfInfoUrl" runat="server" />
        <asp:HiddenField ID="hfWeixinID" runat="server" />
    </form>
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
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
