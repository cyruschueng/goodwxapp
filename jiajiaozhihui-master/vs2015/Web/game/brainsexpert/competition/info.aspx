<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="info.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.competition.info" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>奖品领取</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .error{ font:11px; color:Red}
        #request{ position:fixed; width:100%; height:100%; left:0px; top:0px; display:none; z-index:900; background:#eee}
        #request img{ position:absolute; margin-left:50%; left:-16px; top:50%;}
    </style>
</head>
<body>
    <div class=" container" style=" margin-bottom:28px;">
        <div class="row">
            <div class=" col-xs-12">
                <div class=" page-header">
                    <ul class="nav nav-pills">
                      <li role="presentation" class="active"><a href="prize.aspx">奖品</a></li>
                      <li role="presentation"><a href="info.aspx">奖品领取</a></li>
                      <li role="presentation"><a href="precedence.aspx">排行榜</a></li>
                      <li role="presentation"><a href="help.aspx?id=13">活动规则</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row" <%=HTMLStyleNone  %>>
            <div class="col-xs-12">
                <div class="table-responsive">
                    <table class="table" >
                        <tbody>
                            <tr>
                                <td>活动名称：</td>
                                <td>春节大联欢擂台赛</td>
                            </tr>
                            <tr>
                                <td>得分：</td>
                                <td><%=HTMLInfoModel.Score %></td>
                            </tr>
                            <tr>
                                <td>所用时间：</td>
                                <td><%=HTMLInfoModel.SpanTime%></td>
                            </tr>
                            <tr>
                                <td>排名：</td>
                                <td><%=HTMLInfoModel.Rank%></td>
                            </tr>
                            <tr>
                                <td>获奖名次：</td>
                                <td><%=HTMLInfoModel.Title%></td>
                            </tr>
                            <tr>
                                <td>奖品名称：</td>
                                <td><%=HTMLInfoModel.PrizeName%></td>
                            </tr>
                            <tr>
                                <td colspan="2" class=" text-center">
                                    <button id="btnGet" type="button" class=" btn btn-primary center-block " <%=HTMLBtnStyle %>>领取</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                    <%=HTMLNunPrize%>
            </div>
        </div>
        <div class="row" <%=HTMLStyleNone  %>>
            <div class="col-xs-12">
                <div id="tim_alert"><%=HTMLStatusText %></div>
            </div>
        </div>
        <div class="row" <%=HTMLStyleNone  %>>
            <div class="col-xs-12 tex">
                <p class=" lead text-center text-danger">服务电话:<a href="tel:0755-22200786"><span class="glyphicon glyphicon-earphone"></span>0755-22200786</a></p>
            </div>
        </div>
        <div class="row" <%=HTMLTipStyle %> >
            <div class="col-xs-12">
                <div id='result' class='alert alert-success alert-dismissible' role='alert' style='margin-top:10px;'>
                    活动结束后，获奖者请在这里填写领取奖品的收货信息。本次擂台赛奖品将在4月5日寄出，请耐心等待！
                </div>
            </div>
        </div>
    </div>
    
    <div id="entityModal" class=" modal" data-backdrop="static">
        <div class=" modal-dialog">
            <div class=" modal-content">
                <div class=" modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <p>请认真填写收货信息，这件礼品就会投向您的怀抱了~~~</p>
                    <p class=" text-success">所有的奖品均包邮</p>
                </div>
                <div class=" modal-body">
                    <form id="form1" action="#" method="get"  runat="server">
                            <div class=" form-group form-group-sm">
                                <label for="recipients">收件人姓名：<span class="import">*</span></label>
                                <input  type="text" id="recipients" name="recipients" class=" form-control" />
                            </div>
                            <label style=" display:block;">所在地区：<span class="import">*</span></label>
                            <div class="btn-group" style=" margin-bottom:15px;width:100%;">
                                <div class="btn-group" style=" width:50%;">
                                  <select class=" form-control" id="province" name="province">
                                    <%=HTMLProvince %>
                                  </select>
                              </div>
                              <div class="btn-group" style=" width:50%;">
                                  <select class=" form-control" id="city" name="city"></select>
                              </div>
                            </div>
                            <div class=" form-group">
                                <label for="address">街道地址：<span class="import">*</span></label>
                                <input  type="text" id="address" name="address" class=" form-control" placeholder="街道地址"/>
                            </div>
                            <div class=" form-group">
                                <label for="address">邮政编码：</label>
                                <input  type="text" id="postcode" name="postcode" class=" form-control" placeholder="邮政编码"/>
                            </div>
                            <div class=" form-group">
                                <label for="address">手机号码：<span class="import">*</span></label>
                                <input  type="text" id="mobile" name="mobile" class=" form-control" placeholder="手机号码"/>
                            </div>
                            
                            <asp:HiddenField ID="hfOpenID" runat="server" />
                            <asp:HiddenField ID="hfCompetition" runat="server" />
                            <asp:HiddenField ID="hfGoodsClass" runat="server" />

                            <asp:HiddenField ID="hfCity" runat="server" />
                            <asp:HiddenField ID="hfProductID" runat="server" />
                            <asp:HiddenField ID="hfActiveID" runat="server" />
                            <asp:HiddenField ID="hfEnable" runat="server" />
                            <asp:HiddenField ID="hfRank" runat="server" />
                            <asp:HiddenField ID="hfGold" runat="server" />

                        </form>
                </div>
                <div class=" modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				    <button id="btnSubmit" type="button" class="btn btn-primary">提交</button>
                </div>
            </div>
        </div>
    </div>
    <div id="virtualModel" class="modal" data-backdrop="static">
        <div class=" modal-dialog">
            <div class=" modal-content">
                <div class=" modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		    <h3>恭喜你！在本次活动中，你获得<%=HTMLInfoModel.Title%>，将获得<%=HTMLInfoModel.PrizeName%></h3>
                    <p class=" lead" >
                        当前金币： <span id="currgold"><%=HTMLInfoModel.GoldTotal%></span>
                        
                    </p>
                </div>
                <div class="modal-body text-center">
                    <img src="images/golds.jpg"  style="width:50%;" />
                </div>
                <div class=" modal-footer">
                    <button type="button" class=" btn btn-primary btn-xs" data-dismiss="modal">关闭</button>
                    <button id="btnGetGold" type="button " class="btn btn-primary btn-xs">现在领取</button>
                </div>
            </div>
        </div>
    </div>
    <div id="tip" class=" modal " data-backdrop="static">
        <div class=" modal-dialog">
            <div class=" modal-content">
                <div class=" modal-header">
                    <h5>提示</h5>
                </div>
                <div class="modal-body">
                    已领取成功！
                </div>
                <div class=" modal-footer">
                    <button type="button" class=" btn btn-primary btn-xs" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
    <div class=" panel-footer panel-success" style=" position:fixed; bottom:0; width:100%;padding-top:0; padding-bottom:0 ;background:rgba(255,255,255,1)">
            <ul class="nav nav-pills  text-center">
              <li role="presentation" style=" float:none;"><a href="<%=HtmlBackLink %>" style=" font-size:14px;" ><span class="glyphicon glyphicon-share-alt"></span>返回</a></li>
            </ul>
    </div>
    <div id="request">
        <!--<img src="../../../images/processed.gif" style=" width:32px; height:32px;" />-->

        <div class="progress progress-striped active">
	        <div class="progress-bar progress-bar-warning" style="width:80%"></div>
        </div>

    </div>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="../../../js/jquery.validate.js" type="text/javascript"></script>
    <script src="../../../js/jquery.validate.extend.js" type="text/javascript"></script>
    <script src="../../../js/jquery.validate.messages_cn.js" type="text/javascript"></script>
    <script src="js/info.js" type="text/javascript"></script>
    <script>
        $(function () {
            $(".nav li").removeClass("active");
            $(".nav li").eq(1).addClass("active");
        })
    </script>
</body>
</html>
