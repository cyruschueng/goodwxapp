<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="additioninfo.aspx.cs" Inherits="SfSoft.web.game.doublenovemberII.additioninfo" %>

<!DOCTYPE html >

<html >
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../custorder/js/skins/all.css" rel="stylesheet" type="text/css" />
    <title>我的资料</title>
    <style>
        .menu{ font-size:16px; padding:6px 8px; border:none; width:100%;}
        .right-line{ border-right:1px solid #fff; border-top-right-radius:0;border-bottom-right-radius:0;}
        .left-line{ border-left:1px solid #fff; border-top-left-radius:0;border-bottom-left-radius:0;}
    </style>
</head>
<body>
    <div class=" container" style=" padding-top:20px;">
        
        <div class="row">
            <div class="col-xs-12">
                <h4 class="bg-success" style=" padding:5px;"><%=HTMLNickName%>个人资料</h4>
            </div>
            <div class="col-xs-12">
                <form runat="server" >
                    <div class=" form-group">
                        <label for="nickname">别名</label>
                        <input type="text" class=" form-control" name="nickname" id="nickname" placeholder="别名代替你的昵称"  />
                    </div>
                    <div class=" form-group">
                        <label>是否启用别名</label>
                        <div class="btn-group " style=" display:block" id="Div2">
                            <input type="radio" name="IsAlias" id="IsAlias1" value="1" />&nbsp;是
                            &nbsp;&nbsp;
                            <input type="radio" name="IsAlias" id="IsAlias0" checked value="0" />&nbsp;否
                        </div>
                    </div>

                    <div class=" form-group">
                        <label>小孩性别</label>
                        <div class="btn-group " style=" display:block" id="sex">
                            <input type="radio" name="sex" id="sex0" value="女" />&nbsp;女
                            &nbsp;&nbsp;
                            <input type="radio" name="sex" id="sex1" value="男" />&nbsp;男
                        </div>
                    </div>
                    <div class=" form-group">
                        <label >小孩出生日期</label>
                        <div class="btn-group" style=" display:block">
                            <div class="btn-group" id="year">
                              <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button">---年---<span class="caret"></span></button>
                              <div class="dropdown-menu" style=" width:250px;">
                                    <table class=" table">
                                        <%=HTMLYear%>
                                    </table>
                              </div>
                          </div>
                          <div class="btn-group" id="month">
                                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button">---月---<span class="caret"></span></button>
                                <div class="dropdown-menu dro" style=" width:300%;">
                                    <table class=" table">
                                        <tr>
                                            <td><a href="javascript:void(0)">1月</a></td>
                                            <td><a href="javascript:void(0)">2月</a></td>
                                            <td><a href="javascript:void(0)">3月</a></td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0)">4月</a></td>
                                            <td><a href="javascript:void(0)">5月</a></td>
                                            <td><a href="javascript:void(0)">6月</a></td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0)">7月</a></td>
                                            <td><a href="javascript:void(0)">8月</a></td>
                                            <td><a href="javascript:void(0)">9月</a></td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0)">10月</a></td>
                                            <td><a href="javascript:void(0)">11月</a></td>
                                            <td><a href="javascript:void(0)">12月</a></td>
                                        </tr>
                                    </table>
                                    
                                </div>
                          </div>
                          <div class="btn-group" id="day">
                              <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button">---日---<span class="caret"></span></button>
                               <div class="dropdown-menu dropdown-menu-right" style=" width:200px; left:-70%;">
                                    <table class=" table">
                                        <tr>
                                            <td><a href="javascript:void(0)">1日</a></td>
                                            <td><a href="javascript:void(0)">2日</a></td>
                                            <td><a href="javascript:void(0)">3日</a></td>
                                            <td><a href="javascript:void(0)">4日</a></td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0)">5日</a></td>
                                            <td><a href="javascript:void(0)">6日</a></td>
                                            <td><a href="javascript:void(0)">7日</a></td>
                                            <td><a href="javascript:void(0)">8日</a></td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0)">9日</a></td>
                                            <td><a href="javascript:void(0)">10日</a></td>
                                            <td><a href="javascript:void(0)">11日</a></td>
                                            <td><a href="javascript:void(0)">12日</a></td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0)">13日</a></td>
                                            <td><a href="javascript:void(0)">14日</a></td>
                                            <td><a href="javascript:void(0)">15日</a></td>
                                            <td><a href="javascript:void(0)">17日</a></td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0)">18日</a></td>
                                            <td><a href="javascript:void(0)">19日</a></td>
                                            <td><a href="javascript:void(0)">20日</a></td>
                                            <td><a href="javascript:void(0)">21日</a></td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0)">22日</a></td>
                                            <td><a href="javascript:void(0)">23日</a></td>
                                            <td><a href="javascript:void(0)">24日</a></td>
                                            <td><a href="javascript:void(0)">25日</a></td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0)">26日</a></td>
                                            <td><a href="javascript:void(0)">27日</a></td>
                                            <td><a href="javascript:void(0)">28日</a></td>
                                            <td><a href="javascript:void(0)">29日</a></td>
                                        </tr>
                                        <tr>
                                            <td><a href="javascript:void(0)">30日</a></td>
                                            <td><a href="javascript:void(0)">31日</a></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </table>
                               </div>
                          </div>
                        </div>
                    </div>
                    
                    <asp:HiddenField ID="hfOpenID" runat="server" />
                    <asp:HiddenField ID="hfSex" runat="server" />
                    <asp:HiddenField ID="hfBirthday" runat="server" />
                    <asp:HiddenField ID="hfAlias" runat="server" />
                    <asp:HiddenField ID="hfFrom" runat="server" />
                    <asp:HiddenField ID="hfWeixinID" runat="server" />
                </form>
            </div> 
        </div>
    </div>
    <nav class="navbar  navbar-fixed-bottom" style="min-height:42px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-6 text-center" style=" background:#337AB7; padding:8px 2px "><button type="button" id="btnSubmit" class=" btn btn-primary menu"  ><span class="glyphicon glyphicon-saved"></span>提交</button></div>
                <div class="col-xs-6 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu" href="<%=HTMLReturnUrl %>"  ><span class="glyphicon glyphicon-share-alt"></span>返回</a></div>
            </div>
        </div>
    </nav>
    <div id="modal-progress" class="modal fade" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">正在处理中，请稍等。。。</h4>
                </div>
                <div class="modal-body">
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                        <span class="sr-only">80% Complete (danger)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="../../custorder/js/icheck.min.js" type="text/javascript"></script>
    <script src="js/additioninfo.js" type="text/javascript"></script>
    <script>
        $("input").iCheck({
            checkboxClass: "icheckbox_square-red",
            radioClass: 'iradio_square-red',
            increaseArea: "15%" // optional
        });
    </script>
</body>
</html>
