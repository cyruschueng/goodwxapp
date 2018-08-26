<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="videolist.aspx.cs" Inherits="SfSoft.web.libao.videolist" %>

<!DOCTYPE >

<html >
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>家教视频</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/layoutit.css" rel="stylesheet" type="text/css" />
    <link href="css/flat-ui.css" rel="stylesheet" type="text/css" />
    <link href="css/libao.css" rel="stylesheet" type="text/css" />
    <script src="http://cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="js/html5media.min.js" type="text/javascript"></script>
    <style>
        ul{ padding:0px; margin:0px;}
        li{ list-style-type:none;}
    </style>

</head>
<body >
    <div class="container-fluid">
	<div class="row-fluid">
		<div class="span12">
			<ul class="thumbnails">
				<li class="span4">
					<div class="thumbnail">
						<img alt="300x200" src="img/vide_head_001.jpg" />
						<div class="caption">
							<h3>
								孩子心理成长的需要（上）
							</h3>
							<p>
国内著名的青少年教育专家 知心姐姐卢勤老师主讲 ，跟大家一起探讨青少年的教育问题 孩子心灵成长中需要 包容 沟通 肯定 梦想 磨难 体验 滋润 困惑 空间 宣泄 尊重
							</p>
							<p>
								<a class="btn btn-primary" data-src="http://player.youku.com/embed/XMTI2Mzg1NDIzNg==" id="media1" href="javascript:void(0)" onclick='play("media1")' >播放</a>
							</p>
						</div>
					</div>
				</li>
				<li class="span4">
					<div class="thumbnail">
						<img alt="300x200" src="img/vide_head_001.jpg" />
						<div class="caption">
							<h3>
								孩子心理成长的需要（中）
							</h3>
							<p>
国内著名的青少年教育专家 知心姐姐卢勤老师主讲 ，跟大家一起探讨青少年的教育问题 孩子心灵成长中需要 包容 沟通 肯定 梦想 磨难 体验 滋润 困惑 空间 宣泄 尊重
							</p>
							<p>
                                <a class="btn btn-primary" data-src="http://player.youku.com/embed/XMTI2Mzg1MjM2OA==" id="media2" href="javascript:void(0)"  onclick='play("media2")'>播放</a>
							</p>
						</div>
					</div>
				</li>
				<li class="span4">
					<div class="thumbnail">
						<img alt="300x200" src="img/vide_head_001.jpg" />
						<div class="caption">
							<h3>
								孩子心理成长的需要（下）
							</h3>
							<p>
国内著名的青少年教育专家 知心姐姐卢勤老师主讲 ，跟大家一起探讨青少年的教育问题 孩子心灵成长中需要 包容 沟通 肯定 梦想 磨难 体验 滋润 困惑 空间 宣泄 尊重
							</p>
							<p>
								<a class="btn btn-primary" data-src="http://player.youku.com/embed/XMTI2MzEwOTI4OA==" id="media3" href="javascript:void(0)" onclick='play("media3")'>播放</a>
							</p>
						</div>
					</div>
				</li>
                <li class="span4">
					<div class="thumbnail">
						<img alt="300x200" src="img/vide_head_004.jpg" />
						<div class="caption">
							<h3>
								爱孩子的十种方法
							</h3>
							<p>
								少年有志 国家有望   我们全民族的人都在关注我们下一代 ，直接面对孩子的就是老师 跟家长，现在社会 做孩子真累 做父母真烦 。怎么解决这些问题？国内著名的青少年教育专家 知心姐姐卢勤老师主讲 孩子你真棒
							</p>
							<p>
								<a class="btn btn-primary" data-src="http://player.youku.com/embed/XMTI2Mjk4NDk3Ng==" id="media4" href="javascript:viod(0)" onclick='play("media4")'>播放</a>
							</p>
						</div>
					</div>
				</li>
                <li class="span4">
					<div class="thumbnail">
						<img alt="300x200" src="img/vide_head_002.jpg" />
						<div class="caption">
							<h3>
								新世纪我们怎么做父母
							</h3>
							<p>
								新世纪我们怎样做父母知心姐姐卢勤老师主讲 ，探讨怎么让我们孩子成为新的一代优秀的孩子。父母应该有一颗平常心。 
							</p>
							<p>
								<a class="btn btn-primary" data-src="http://player.youku.com/embed/XMTI2MzEyNzYzMg==" id="media6" href="javascript:void(0)" onclick='play("media6")'>播放</a>
							</p>
						</div>
					</div>
				</li>
                <li class="span4">
					<div class="thumbnail">
						<img alt="300x200" src="img/vide_head_005.jpg" />
						<div class="caption">
							<h3>
								家教帮3期
							</h3>
							<p>
								家教帮是家教智慧和神尔教育联合主办，每期节目邀请3位国内权威教育专家，和您一起聊聊孩子教育中的一些事
							</p>
							<p>
								<a class="btn btn-primary" data-src="http://player.youku.com/embed/XMTI2MzEyNzM0MA==" id="media7" href="javascript:void(0)" onclick='play("media7")'>播放</a>
							</p>
						</div>
					</div>
				</li>
                <li class="span4">
					<div class="thumbnail">
						<img alt="300x200" src="img/vide_head_006.jpg" />
						<div class="caption">
							<h3>
								张三丰太极十三式
							</h3>
							<p>
								武当十五代弟子 贺贤真 师承武当山武当玄真功夫道院贺先生  
							</p>
							<p>
								<a class="btn btn-primary" data-src="http://player.youku.com/embed/XMTI2MzEyODA0NA==" id="media8" href="javascript:void(0)" onclick='play("media8")'>播放</a>
							</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
<div id="playlayer">
    <div class="row demo-samples wrap" style=" background:none;">
        
        <div class="span8 demo-video">
            <iframe  id="iframe" height=auto width=100%  src="" frameborder=0 allowfullscreen></iframe>
        </div>

        <input type="button" class="btn btn-primary"  id="playlayer-back" style=" background:#009966; font-size:14px; width:60px; border:1px solid #eee;" value="返回" /> 
    </div>
</div>
    <script src="js/video.js" type="text/javascript"></script>
<script>
    $(function () {
        $("#playlayer-back").click(function () {
            top.window.location.href = 'videolist.aspx';
            $("#playlayer").hide();
        });
    })
    function play(id) {
        $("#playlayer").show();
        var src = jQuery("#" + id).data("src");
        $("#iframe").attr("src",src);
    }
    </script>
</body>
</html>
