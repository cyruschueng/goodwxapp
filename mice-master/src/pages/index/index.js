
import { flow } from 'lodash';
import { LOCAL_TEST_LIST } from '../../utils/const';
let MIXINS = require("../../common/mixin");
import { getTestList, getBannerList } from '../../service/index.js';
const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef
Page({
	onShareAppMessage: function (res) {
		if (res.from === 'button') {
		  // 来自页面内转发按钮
		  console.log(res.target)
		}
		wx.showShareMenu({
			withShareTicket: true
		  })
		return {
		  title: '看看我们的消息吧',
		  path: 'pages/index/index',
		  imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523349954261&di=6c8f318161c2e09f5c4e2624cdd32cc3&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Faa18972bd40735fa13899ac392510fb30f24084b.jpg',
		  success: function(res) {
			// 转发成功
			console.log(21, res.shareTickets);
			wx.getShareInfo({
				shareTicket: res.shareTickets[0],
				success:function (info) {
					console.log(29, info);
				}
			})
		  },
		  fail: function(res) {
			// 转发失败
		  }
		}
	  },
	data: {
		userInfo: {},
		iH5Url:[
			'https://file74301aa321a6.iamh5.cn/v3/idea/td1zgHH4',
			'https://file74301aa321a6.iamh5.cn/v3/idea/z3tRYLSD',
			'https://file74301aa321a6.iamh5.cn/v3/idea/a6fTj5UN',
			'https://file74301aa321a6.iamh5.cn/v3/idea/3dgWu6op'
		],
		imgUrls: [
			{
				'img': 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
				'url':'td1zgHH4'
			},
			{
				'img': 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
				'url':'z3tRYLSD'
			},
			{
				'img': 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
				'url':'a6fTj5UN'
			},
			{
				'img': 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
				'url':'3dgWu6op'
			}
		],
		swiperCurrent:0,
		list: LOCAL_TEST_LIST,
		btnList:[
			{title: '全部', type: '1',img:'btn_all', activeImg:'btn_all_active'},
			{title: '趣味测试', type: '2',img:'btn_fun', activeImg:'btn_fun_active'},
			{title: '专业测试', type: '3',img:'btn_major', activeImg:'btn_major_active'},
			{title: '测试1', type: '4',img:'btn_major', activeImg:'btn_major_active'},
			{title: '测试2', type: '5',img:'btn_major', activeImg:'btn_major_active'},
			{title: '测试3', type: '6',img:'btn_major', activeImg:'btn_major_active'}
		],
		btnActiveType: '1'
	},
	swiperCurrentChange(e) {
		this.setData({
			swiperCurrent:e.detail.current
		})
	},
	// 跳转搜索页面
	toSearchActive() {
		wx.navigateTo({
			url:'/pages/search/index'
		})
	},
	// 跳转测试连接
	toWebViewTab(e) {
		let _url = e.currentTarget.dataset.url;
		MIXINS.listToH5Active(_url);
	},
	btnTap(e) {
		let _type = e.currentTarget.dataset.type;
		this.setData({
			btnActiveType: _type
		})
	},
	listToH5Active(p1, p2) {
		let _url = p1.detail.url;
		MIXINS.listToH5Active(_url, p2);
	},
	scrolltolower() {
		console.log('滚到底部了')
		wx.showLoading({
			title:'玩命加载中...',
			mask: true
		})
		setTimeout(() => {
			wx.hideLoading()
		}, 3000);
	},
	previewImg() {
		// http://www.favourfree.com/Public/Home/sharewuliu/img/erweima.png  不费事二维码
		// http://xiaoma.aldwx.com/tool/code/img/mcode.png   小程序二维码
    wx.previewImage({
      current: 'http://www.favourfree.com/Public/Home/sharewuliu/img/erweima.png',     //当前图片地址
      urls: ['http://www.favourfree.com/Public/Home/sharewuliu/img/erweima.png'],               //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
	},
	showLoading() {
		wx.showLoading({
			title:'玩命加载中...',
			mask: true
		})
	},
	async onLoad() {
		getTestList();
		getBannerList().then(msg => {
			console.log('msg------', msg)
		});
		// await delay();

		// const log = flow(() => {
		// 	console.log('is wechat mini program: ', __WECHAT__);
		// 	console.log('is alipay mini program: ', __ALIPAY__);
		// 	console.log('DEV: ', __DEV__);
		// });
		// log();
		// // 调用应用实例的方法获取全局数据
		// app.getUserInfo((userInfo) => {
		// 	// 更新数据
		// 	this.setData({ userInfo });
		// });
	},
});
