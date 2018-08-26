<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>上传图片</title>
</head>
<body>
	
	<form action="" method="POST" enctype="multipart/form-data">
		<input type="file" name="file" id="">
		<input type="submit" value="开始上传">
	</form>
	<br>
	<hr>


<?php 


if(isset($_FILES['file'])) {
	if(empty($_FILES['file'])) {
		echo '请先选择图片';exit;
	} else {
		$file = $_FILES['file'];

		$dir = 'upload/'.date('Y')."/".date('m').'/'.date('d');
		if(!is_dir($dir)) {
			mkdir($dir, 0777, true);
		}

		$ext = substr($file['name'], strrpos($file['name'], '.'));
		$random_str = str_shuffle('abcdefghijklmnoporstuvwxyz');
		$new_name = time().substr($random_str, 0, 5);
		$new_name .= $ext;

		$new_path = $dir. '/' . $new_name;

		$res = move_uploaded_file($file['tmp_name'], $new_path);

		if($res) {
			$ip = "http://124.232.150.53/qvod/" . $_SERVER['SERVER_PORT'];
			$absolute_path = 'http://124.232.150.53/qvod/' . $new_path;
			echo '上传成功，请复制图片地址：<br/><textarea id="contents" style="margin-top:30px;width: 600px;">' ,$absolute_path , '</textarea><input type="button" onClick="copy();" value="复制" />';
		}
	}

}


 ?>
<script type="text/javascript">
	function copy(){
		var content=document.getElementById("contents");//对象是多行文本框contents
		content.select(); //选择对象
		document.execCommand("Copy"); //执行浏览器复制命令
	}
</script>
</body>
</html>