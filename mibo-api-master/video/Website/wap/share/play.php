<?php 

$m3u8_url = isset($_GET['m3u8_url']) ? $_GET['m3u8_url'] : 'http://cloud.video.taobao.com/play/u/2554695624/p/1/e/6/t/1/fv/102/28552077.mp4';
$cover_url = isset($_GET['cover_url']) ? $_GET['cover_url'] : 'http://mibores.yahalei.com/img/pub/201610/default_cover_of_no_achor.jpg';


 ?>

 <!DOCTYPE html>
 <html lang="en">
 <head>
 	<meta charset="UTF-8">
 	<title>正在播放</title>
 	<link rel="stylesheet" href="http://g.alicdn.com/de/prismplayer/1.4.7/skins/default/index.css" />
 	<script type="text/javascript" src="http://g.alicdn.com/de/prismplayer/1.4.7/prism.js"></script>
 	<style>
 		*{margin:0;padding:0;}
 		.back-btn{
 			padding: 1px 8px;
 			background: #f8c703 none repeat scroll 0 0;
 			border-radius: 5px;
 			color: #000;
 			display: block;
 			font-size: 16px;
 			height: 40px;
 			line-height: 40px;
 			text-decoration: none;
 			text-align: center;
 			position: fixed;
 			top: 0;
 			left: 0;
 		}
 		.bottom-back-btn{
 			padding: 1px 8px;
 			background: #f8c703 none repeat scroll 0 0;
 			color: #000;
 			display: block;
 			font-size: 46px;
 			height: 140px;
 			line-height: 140px;
 			text-decoration: none;
 			text-align: center;
 		}
 	</style>
 </head>
 <body>
 	<a class="back-btn" href="javascript:history.back();">退出</a>
 	<div class="prism-player" id="J_prismPlayer"></div>
 	<script>
 	  var player = new prismplayer({
 	      id: "J_prismPlayer", // 容器id
 	      source: "<?php echo $m3u8_url; ?>",  // 视频url 支持互联网可直接访问的视频地址
 	      autoplay: true,      // 自动播放
 	      //width: "100%",      // 播放器高度
 	      height: "100%",      // 播放器高度
 	      cover: "<?php echo $cover_url; ?>"
 	  });
 	</script>
 	<!--<a class="bottom-back-btn" href="javascript:history.back();">退出</a>-->
 </body>
 </html>