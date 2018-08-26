//接口列表
const api = {
	getToken: '/token',                             //获取token
	getOpenid: '/wxApplets/user/wxsesstion',         //微信授权获取openid，登录           
	/**
	 * 用户登录、注册
	 */
	userInfo: '/wxApplets/user/info',                   //用户信息，参数id
	getSmsCode: '/wxApplets/user/msm',                   //获取短信，参数user_phone
	signup: '/wxApplets/user/register',                     //用户注册，参数supply_area，user_info，user_name, user_password,  user_phone
	login: '/wxApplets/user/login',                     //用户登录，参数user_password,  user_phone

	/**
	 * 目录接口
	 */
	areaInfo: '/wxApplets/area/info',                   //目录信息，参数id
	areaList: '/wxApplets/area/list',                     //目录列表，参数area_status，page，size

	/**
	 * 分类接口
	 */
	typeInfo: '/wxApplets/type/info',                   //分类信息，参数id
	typeList: '/wxApplets/type/list',                     //分类列表，参数type_status，page，size

	/**
	 * 品牌接口
	 */
	brandsInfo: '/wxApplets/brands/info',                   //品牌信息，参数id
	brandsList: '/wxApplets/brands/list',                     //品牌列表，参数brands_status，page，size

	/**
	 * 资源接口
	 */
	supplyInfo: '/wxApplets/supply/info',                   //品牌信息，参数id
	supplyList: '/wxApplets/supply/list',                     //品牌列表，参数area_id,  brands_id, is_recommend（1是，0否）, type_id，supply_status，page，size
}
module.exports = api;
