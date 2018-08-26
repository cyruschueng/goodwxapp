<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="voice.aspx.cs" Inherits="SfSoft.web.libao.voice" %>

<!DOCTYPE html >

<html >
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>儿童读物</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/layoutit.css" rel="stylesheet" type="text/css" />
    <link href="css/libao.css" rel="stylesheet" type="text/css" />
    <script src="http://cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="js/html5media.min.js" type="text/javascript"></script>
    <style>
        ul{ padding:0px; margin:0px;}
        li{ list-style-type:none;}
        .tip{ display:block; font-size:14px; margin-top:15px;}
        .btn1 {
            display:inline;
            padding: 6px 12px;
            margin-bottom: 0px;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.42857;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            background-color:#fff;
            -moz-user-select:auto;
            background-image: none;
            border: 1px solid transparent;
            border-radius: 4px;
            color:#000;
            border-color: #2E6DA4;
        }
        .desc{ font-size:14px;}
    </style>
    <script>
        var jsondata;
        function copyToClipBoard() {
            var clipBoardContent = this.location.href;
            window.clipboardData.setData("Text", clipBoardContent);
            alert("复制成功!");
        }

        $(function () {
            $.getJSON("json/data.json", function (data) {
                jsondata = data.item[0];
                
            })
        })
        function show(index) {

            var srcs = jsondata.voice[index].img;
            $(".modal-title").text(jsondata.voice[index].name);
            var items = "";
            for (var i = 0; i < srcs.length; i++) {
                items += "<img class='img-thumbnail' src='" + srcs[i].src + "'>";
            }
            $("#imgs").empty();
            $("#imgs").append(items);
            $("#mydialog").modal("show");
        }
    </script>
</head>
<body style=" padding-top:10px;">
    <div class="container-fluid">
    <div class="row">
        <div class="col-xs-12">
            <div class=" alert alert-danger text-center">
                <h3  >以下内容需要用电脑下载</h3> 
                <span class=" label label-warning" style=" font-size:14px;">电脑下载具体操作流程，请查看文章底部</span>
            </div>
        </div>
    </div>
	<div class="row-fluid">
		<div class="span12">
			<ul class="thumbnails">
                <li class="span4">
					<div class="thumbnail">
						<img alt="300x200" src="img/voice_head_001.jpg" />
						<div class="caption">
							<h3 onclick="show(0)" style=" cursor:pointer">
								爸爸一定要陪孩子看的7部电影<small style=" color:#5CB85C">（点击查看详情）</small>
							</h3>
							<p class="desc">
								我们常常说妈妈的爱是轰轰烈烈，而爸爸的爱又何尝不是呢？爸爸和孩子在一起的时候，能教给孩子更多的勇气、宽容和幽默。所以，爸爸们，请放下你们的工作，推脱掉各种应酬，带着孩子看部电影，享受这难得的温情！还有什么比全家在一起吃吃零食，搂搂抱抱看个电影什么的，更有爱呢！
							</p>
							<p><span class="btn1"  style=" cursor:auto;" >http://pan.baidu.com/s/1o63m0KM</span></p>
                            <p><span class="tip">（请在电脑上打开链接，下载资源。）</span></p>
						</div>
					</div>
				</li>
				<li class="span4">
					<div class="thumbnail">
						<img alt="300x200" src="img/voice_head_001.jpg" />
						<div class="caption">
							<h3 onclick="show(5)" style=" cursor:pointer">
								《世界优秀绘本55册》<small style=" color:#5CB85C">（点击查看详情）</small>
							</h3>
							<p class="desc">
								绘本以儿童思维创作，图画是绘本的命脉，甚至有些绘本，一个字也没有，只用绘画来讲故事。一本优秀的绘本，可以让不认字的孩子，"读"出其中的意思。
							</p>
							<p><span class="btn1" href="javascript:void(0)">http://pan.baidu.com/s/1sj0y133</span></p>
                            <p><span class="tip">（请在电脑上打开链接，下载资源。）</span></p>
						</div>
					</div>
				</li>
				<li class="span4">
					<div class="thumbnail">
						<img alt="300x200" src="img/voice_head_002.jpg" />
						<div class="caption">
							<h3 onclick="show(1)" style=" cursor:pointer">
								《儿童有声百科全书》<small style=" color:#5CB85C">（点击查看详情）</small>
							</h3>
							<p class="desc">
								此次分享的幼儿有声百科全书内容包括古诗、开动脑筋故事、儿童歌曲、国学启蒙、童话故事、伊索寓言双语版、儿歌、童谣、学唱英文歌等，内容非常丰富哦，为孩子开启了文化之旅的大门，同时又能用来学习语文，非常适合使用、收藏哦。
							</p>
							<p><span class="btn1" href="javascript:void(0)">http://pan.baidu.com/s/1c0ybL2w</span></p>
                            <p><span class="tip">（请在电脑上打开链接，下载资源。）</span></p>
						</div>
					</div>
				</li>
                <li class="span4">
					<div class="thumbnail">
						<img alt="300x200" src="img/voice_head_003.jpg" />
						<div class="caption">
							<h3 onclick="show(4)" style=" cursor:pointer">
								《十万个为什么》<small style=" color:#5CB85C">（点击查看详情）</small>
							</h3>
							<p class="desc">
								《十万个为什么》主要根据幼儿的特点，以生动的画面和简单的语言回答了人类、自然、科学等等方面的问题，对儿童理解世界很有帮助！
							</p>
							<p><span class="btn1" href="javascript:void(0)">http://pan.baidu.com/s/1qWl2bWo</span></p>
                            <p><span class="tip">（请在电脑上打开链接，下载资源。）</span></p>
						</div>
					</div>
				</li>
                <li class="span4">
					<div class="thumbnail">
						<img alt="300x200" src="img/voice_head_004.jpg" />
						<div class="caption">
							<h3 onclick="show(2)" style=" cursor:pointer">
								高清双语迪士尼动画<small style=" color:#5CB85C">（点击查看详情）</small>
							</h3>
							<p class="desc">
								小编整理出迪士尼百年完整珍藏——高清国英双语迪士尼动画，是想将这快乐和笑声传递给你家的孩子，而且我始终相信，这套精选的优秀动画片，会像黑夜里一盏盏璀璨的明灯，点亮孩子幼小心灵的火花，在真善美的感召下，梦想的翅膀会让天真的孩子站的更高、看的更远！
							</p>
							<p><span class="btn1" href="javascript:void(0)">http://pan.baidu.com/s/1eQpkoro</span></p>
                            <p><span class="tip">（请在电脑上打开链接，下载资源。）</span></p>
						</div>
					</div>
				</li>
                <li class="span4">
					<div class="thumbnail">
						<img alt="300x200" src="img/voice_head_005.jpg" />
						<div class="caption">
							<h3 onclick="show(3)" style=" cursor:pointer">
								儿童读物《国家地理儿童百科》<small style=" color:#5CB85C">（点击查看详情）</small>
							</h3>
							<p class="desc">
								《国家地理儿童百科》是外语教学与研究出版社引进“国家地理”的儿童英语系列读物，分为入门级、提高级和流利级三套，适用于4-16岁孩子，这三套读物涉及了物理科学、地球;太空科学、生命科学、工艺和技术、地理、历史、文化以及经济等多个方面。培养孩子的听、说、读、写等全面语言技能的同时，也注重孩子的自然、社会百科知识与生活常识的积累以及对孩子交际、生存能力的培养。
							</p>
							<p><span class="btn1" href="javascript:void(0)">http://pan.baidu.com/s/1354Nc</span></p>
                            <p><span class="tip">（请在电脑上打开链接，下载资源。）</span></p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
    <div class="row">
        <div class="col-xs-12" >
            <div class="page-header "><span class="h3">电脑下载操作方法：</span> </div>
            <p><span class=" label label-danger"  style=" font-size:13px;"> 1、点击页面右上角的“<span class="glyphicon glyphicon-option-horizontal"></span>”<span> 图标</span></p>
            <img  style=" width:100%;" src="img/method_1.png" />
        </div>
        <div class="col-xs-12" style=" margin-top:30px;">
            <p ><span class=" label label-danger" style=" font-size:13px;"> 2、分享到手机QQ</span></p>
            <img style=" width:100%;" src="img/method_3.png" />
        </div>
        <div class="col-xs-12" style=" margin-top:30px;">
            <p ><span class=" label label-danger" style=" font-size:13px;"> 3、点击“我的电脑”，然后发送</span></p>
            <img style=" width:100%;" src="img/method_2.png" />
            
        </div>
        <div class="col-xs-12" style=" margin-top:30px;">
            <img style=" width:100%;" src="img/method_4.png" />
        </div>
        <div class="col-xs-12" style=" margin-top:30px;">
            <p ><span class=" label label-danger" style=" font-size:13px;"> 4、在电脑上登录QQ，打开链接，下载资源</span></p>
        </div>
        
    </div>
</div>
<div id="mydialog" class="modal fade">
    <div class=" modal-dialog">
        <div class=" modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body" id="imgs">
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
