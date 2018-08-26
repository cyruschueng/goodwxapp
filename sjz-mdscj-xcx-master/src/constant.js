export const enume = {
	status: {
		CANCELLED: '已取消',
		PAID: '已支付',
		SHIPPED: '已发货',
		SUBMITTED: '已下单,待支付',
		FINISHED: '已完成',
		CLOSED: '订单关闭',
		WAIT_SHIPPING: '已付款，等待卖家发货',
		APPLYING: '退款申请中',
		REJECTED: '卖家已拒绝',
		AGREED: '卖家已同意',
		REFUNDING: '退款中',
		REFUND_FINISHED: '退货退款完成',
		RETURN: '退货',
		REFUND: '退款',
		GOODSRETURN: '退款退货',
		NOSENDONTIME: '没有按时发货',
		AGREETWOSIDE: '协商一致退款',
		NOSTOCK: '缺货',
		NOTWANT: '我不想要了',
		REORDER: '拍错了，多拍',
		OTHER: '其他',
		WAIT: '待成团',
		ACTIVE: '组团中',
		SUCCESS: '组团成功',
		FAILED: '组团失败',
		WAIT_PLATFORM_APPROVE: '等待平台核准'
	}
};

export const enumRefundType = [{
// 	key: 'RETURN',
// 	value: '退货'
// }, 
// {
	key: 'REFUND',
	value: '退款'
}];

export const enumRefundReason = [{
	key: 'AGREETWOSIDE',
	value: '协商一致退款'
}, {
	key: 'NOSENDONTIME',
	value: '没有按时发货'
}, 
{
	key: 'NOSTOCK',
	value: '缺货'
}, 
{
	key: 'NOTWANT',
	value: '我不想要了'
}, 
// {
// 	key: 'REORDER',
// 	value: '拍错了，多拍'
// }, 
{
	key: 'OTHER',
	value: '其他'
}];