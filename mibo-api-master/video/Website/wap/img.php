<?php 

$path = isset($_GET['path']) ? urldecode($_GET['path']) : '';
$title = isset($_GET['title']) ? urldecode($_GET['title']) : '这个冬天不寒冷';

if(!$path) {
	$path = 'http://mibores.yahalei.com/img/pub/201610/community_convention.jpg';
	// http://miboweb.yahalei.com/wap/img.php?path=http%3a%2f%2fmibores.yahalei.com%2fimg%2fpub%2f201610%2fcommunity_convention.jpg&title=%e7%a4%be%e5%8c%ba%e5%85%ac%e7%ba%a6
	// http://miboweb.yahalei.com/wap/img.php?path=http%3a%2f%2fmibores.yahalei.com%2fimg%2fpub%2f201610%2fbig_gift.jpg&title=%e8%b1%aa%e7%a4%bc%e5%a4%a7%e6%94%be%e9%80%81
}


 ?>
 <!DOCTYPE html>
 <html lang="en">
 <head>
 	<meta charset="UTF-8">
 	<title><?php echo $title; ?></title>
    <link rel="stylesheet" href="./res/css/reset.css">
 </head>
 <body>
 		<img src="<?php echo $path; ?>" width="100%" alt="">
 </body>
 </html>