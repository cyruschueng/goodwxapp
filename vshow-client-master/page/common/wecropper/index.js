/**
 * Created by sail on 2017/6/1.
 * 
 * 接受参数
 * 1. oriImgUrl(初始化需要裁剪的图片) -- ''
 * 2. createBtnText(生成图片按钮的文字) -- ''
 * 3. hasUploadBtn(是否含有上传图片按钮) -- '1'
 * 4. targetName(把裁剪后的图片链接赋值给app.globalData.targetName) -- ''
 * 5. cutHeight(裁切的高度) -- 300
 * 
 */
import weCropper from './dist/weCropper.min.js';
const app = getApp();
const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight - 50;
Page({
	data: {
    hasUploadBtn: true,
    createBtnText: '',
    targetName: '',
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
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
    if (!this.wecropper.croperTarget) return wx.showToast({
      title: '请先上传图片！',
    });
    let { targetName } = this.data;
		this.wecropper.getCropperImage((src) => {
			if (src) {
				console.log(src);
        if (targetName){
          app.globalData[targetName] = src;
          return wx.navigateBack();
        }
        wx.navigateTo({
          url: '/page/common/previewimage/index?url=' + src
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
	onLoad (option) {
    let { oriImgUrl = '', createBtnText = '', hasUploadBtn = true, targetName = '', cutHeight } = option;
    console.log(option);
    
    if (cutHeight){
      this.setData({
        createBtnText, hasUploadBtn, targetName, 'cropperOpt.cut': {
          x: (width - 300) / 2,
          y: (height - cutHeight) / 2,
          width: 300,
          height: cutHeight*1
        }
      });
    }else{
      this.setData({
        createBtnText, hasUploadBtn, targetName
      });
    }
    
    const { cropperOpt } = this.data;
		new weCropper(cropperOpt)
			.on('ready', (ctx) => {
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
			.updateCanvas();
    oriImgUrl && (this.wecropper.pushOrign(oriImgUrl));  //如果初始化传入照片则写入
      
  },
  onShareAppMessage() {
    return {
      title: '一起来玩转微V秀吧',
      path: '/page/tabBar/photo/index'
    }
  }
})
