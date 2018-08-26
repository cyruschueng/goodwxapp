<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ShowResult.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.ShowResult" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>课程练习</title>
    
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="../js/result.js" type="text/javascript"></script>
    <script src="../js/dropGold.js" type="text/javascript"></script>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../css/button.css" rel="stylesheet" type="text/css" />
    <link href="../css/result.css" rel="stylesheet" type="text/css" />
    <script src="../js/buttons.js" type="text/javascript"></script>
   
</head>
<body style=" padding:0px; margin:0px; background:#00e4fa;">
    <div class="container" id="result">
	    <div class="row">
		    <div class=" col-xs-12" style="padding-left:0; padding-right:0;">
                <div >
                    <div id="img" style=" margin-top:0;">
                        <!--<img src="../images/result_001.png" style=" width:100%;" />-->
                        <img id="result_img" src="" style=" width:100%;" />
                    </div>
                    <div id="score">
                        <img src="<%=HTMLHeaderImgUrl %>" />
                        <span id="nickname"><%=HTMLNickName %></span>
                        <span id="appellation"><%=HTMLGradeName %></span>
                        <div id="currScore">本次得分：<span><%=HTMLCurrScore%></span></div>
                        <!--<div id="gold">目前金币：<span id="cur_gold"><%=HTMLGold %></span>&nbsp;<span class="glyphicon glyphicon-yen" style=" color:#ffb200"></span></div>-->
                    </div>
                    <div class=" text-center" id="result-do" >
                        <a id="btnAgain"  href="<%=HTMLAgen %>" class="button button-3d button-action button-pill" style=" background:#ff7502; box-shadow: 0px 7px 0px #964502, 0px 8px 3px rgba(0, 0, 0, 0.3);" >再来一局</a>
                        <a id="btnOther"   href="<%=HTMLNext %>" class="button button-3d button-action button-pill" style=" background:#ffffff; box-shadow: 0px 7px 0px #425980, 0px 8px 3px rgba(0, 0, 0, 0.3); color:#000; margin-right:10px;">返回课程</a>
                    </div>
                </div>
		    </div>
	    </div>
    </div>
    <div id="upgrade">
        <img src="" />
    </div>
    <div id="share">
        <img src="../../images/guide.jpg" />
    </div>
    <div id="drowngold">
        <img  src="../images/mygold.png" />
    </div>
    <audio autoplay="autoplay" id="audio"></audio>
    <audio autoplay="autoplay" id="goldaudio"></audio>
    <div id="notice" class=" alert alert-danger alert-dismissible" style=" position:absolute; top:0; left:0; display:block; ">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <strong>提示!</strong><%=HTMLNotice %> 
    </div>

    <form id="form1" runat="server">
        <asp:HiddenField ID="hfID" runat="server" />
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfUpgrade" runat="server" />
        <asp:HiddenField ID="hfIsGetGold" runat="server" />
        <asp:HiddenField ID="hfWeiXinID" runat="server" />
        <asp:HiddenField ID="hfModel" runat="server" />
    </form>

   <script>
        var nickName = $("#nickname").text();
        if (nickName == "斧头") {
 	    var href=$("#btnOther").attr("href");
            var Request=new UrlSearch(href); //实例化
            var state=Request.state;
            var href = "http://courses.jiaxiaogongyu.com/app/views/redirect/default.html?state=" + state;
        }
         
         function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
	
	function UrlSearch(url)
	{
   	   var name,value;
	   var str=url; //location.href; //取得整个地址栏
	   var num=str.indexOf("?")
	   str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
	   var arr=str.split("&"); //各个参数放到数组里
	   for(var i=0;i < arr.length;i++){
	    	num=arr[i].indexOf("=");
	    	if(num>0){
	     		name=arr[i].substring(0,num);
	     		value=arr[i].substr(num+1);
	     		this[name]=value;
	       }
	    }
	} 
    </script>
</body>


</html>

