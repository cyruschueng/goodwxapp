

Page({
	data: {
		url: ''
	},
	onLoad: function(option){
		console.log(option);
		this.setData({
			url: `https://file74301aa321a6.iamh5.cn/v3/idea/${option.url}`
		})
	}
});
