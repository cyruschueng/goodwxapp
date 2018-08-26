// pages/cutImageInside/cutImageInside.js
var api = require('../../../api.js')
var weCropper = require('../../../utils/weCropper')
const device = wx.getSystemInfoSync()
const width = device.windowWidth
Page({
	data: {
		cropperOpt: {
			id: 'cropper',
			width: width,
			height: width,
			scale: 2.5,
			zoom: 8,
			// cut: {
			// 	x: (width - 300) / 2,
			// 	y: (width - 300) / 2,
			// 	width: 300,
			// 	height: 300
			// }
		}
	},
	touchStart (e) {
		this.wecropper.touchStart(e)
	},
	touchMove (e) {
		this.wecropper.touchMove(e)
	},
	touchEnd (e) {
		this.wecropper.touchEnd(e)
	},
	getCropperImage () {
		this.wecropper.getCropperImage((src) => {
			if (src) {
				console.log(src)
				wx.setStorageSync('zhuangx_clipImageUrl',src);
				wx.navigateBack({
					delta: 1
				})
			} else {
				console.log('获取图片地址失败，请稍后重试')
			}
		})
	},
	uploadTap () {
		const self = this

		wx.chooseImage({
			count: 1, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success (res) {
				const src = res.tempFilePaths[0]
				//  获取裁剪图片资源后，给data添加src属性及其值

				self.wecropper.pushOrign(src)
			}
		})
	},
	onLoad (options) {
		console.log("options.width",options.width);
		console.log("options.height",options.height);
		var imageRadio = options.width/options.height;
		if (imageRadio < 1) {
			var cutHeight = width;
			var cutWidth = cutHeight * imageRadio;
		} else {
			var cutWidth = width - 30;
			var cutHeight = cutWidth / imageRadio;
		}

		var $instance = new weCropper()
		$instance.cut.width = cutWidth
    $instance.cut.height = cutHeight
		$instance.cut.x = (width - cutWidth)/2
    $instance.cut.y = (width -cutHeight)/2
		const { cropperOpt } = this.data

    var that = this
		new weCropper(cropperOpt)
			.on('ready', (ctx) => {
				 that.wecropper.pushOrign(options.src)
         console.log(`wecropper is ready for work!`)
			})
			.on('beforeImageLoad', (ctx) => {
				console.log(`before picture loaded, i can do something`)
				console.log(`current canvas context:`, ctx)
				wx.showToast({
					title: '上传中',
					icon: 'loading',
					duration: 20000
				})
			})
			.on('imageLoad', (ctx) => {
				console.log(`picture loaded`)
				console.log(`current canvas context:`, ctx)
				wx.hideToast()
			})
			.on('beforeDraw', (ctx, instance) => {
				console.log(`before canvas draw,i can do something`)
				console.log(`current canvas context:`, ctx)
			})
			.updateCanvas()
	}
})
