let extConfig = wx.getExtConfigSync? wx.getExtConfigSync(): {}


export const SELECT_TIME_DAY = [1,2,3,4,5,6,7]

export const SELECT_TIME_HOUR = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

export const SELECT_TIME_MINUTE = [0, 10, 20, 30, 40, 50]

export const SUBMIT_WXPAY = {
	'-1': '未登录',
	'-101': '创建订单失败，有未支付订单',
	'-106': '未实名认证',
	'-103': '已过期',
	'-107': '已发车',
	'-108': '没座了',
	'-302': '没有足够的座位',
	'-109': '行程已取消',
	'-105': '不能订自己的行程',
	'-102': '创建订单失败'
}
