$(function() {
	// 初始化插件
	$("#zyUpload").zyUpload({
		width: "650px", // 宽度
		height: "auto", // 宽度
		itemWidth: "120px", // 文件项的宽度
		itemHeight: "100px", // 文件项的高度
		url: "http://f.yshfresh.com/upload", // 上传文件的路径
		multiple: true, // 是否可以多个文件上传
		dragDrop: true, // 是否可以拖动上传文件
		del: true, // 是否可以删除文件
		finishDel: false // 是否在上传文件完成后删除预览
	});
});