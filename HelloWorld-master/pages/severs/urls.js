import {
	duoguan_host_api_url as API_URL,
	duoguan_get_share_data_url as SHARE_URL
} from '../../utils/data';
const ADDON_URL = API_URL + "/index.php?s=/addon/DuoguanInfo/";


//导出和同城相关的url
module.exports = {
	base: API_URL,
	baseAddon: ADDON_URL,
	share: SHARE_URL,
	version: "1.8.171121",

    /**
     * 配置
     */
	config: {
		load: ADDON_URL + "DuoguanInfoApi/loadConfig.html",
	},

    /**
     * 分类
     */
	category: {
		lists: ADDON_URL + "DuoguanInfoApi/categoryList.html",
	},

    /**
     * 信息
     */
	document: {
		lists: ADDON_URL + "DuoguanInfoApi/documentList.html",
		myLists: ADDON_URL + "DuoguanInfoApi/myDocuments.html",
		add: ADDON_URL + "DuoguanInfoApi/documentWrite.html",
		userDocs: ADDON_URL + "DuoguanInfoApi/getUserDocs.html",
		detail: ADDON_URL + "DuoguanInfoApi/documentInfo.html",
		del: ADDON_URL + "DuoguanInfoApi/documentDel.html",
		pullWallet: ADDON_URL + "DuoguanInfoApi/documentPullWallet.html",
		wechatPay: ADDON_URL + "DuoguanInfoApi/documentWechatPay.html",
		imprestPay: ADDON_URL + "DuoguanInfoApi/documentImprestPay.html",
		payAmount: ADDON_URL + "DuoguanInfoApi/documentAmount.html",
		good: ADDON_URL + "DuoguanInfoApi/documentGood.html",
		checked: ADDON_URL + "DuoguanInfoApi/documentChecked.html",
		jubao: ADDON_URL + "DuoguanInfoApi/documentJubao.html",
		toggleTop: ADDON_URL + "DuoguanInfoApi/documentToggleTop.html",
		pullblack: ADDON_URL + "DuoguanInfoApi/pullBlack.html",
		upload: ADDON_URL + "DuoguanInfoApi/upload.html",
	},

    /**
     * 评论
     */
	comment: {
		lists: ADDON_URL + "CommentApi/lists.html",
		add: ADDON_URL + "CommentApi/create.html",
		del: ADDON_URL + "CommentApi/delete.html",
		myLists: ADDON_URL + "CommentApi/myLists.html",
		replaysMe: ADDON_URL + "CommentApi/replysMe.html",
	},

    /**
     * 工具
     */
	util: {
		getDistance: ADDON_URL + "DuoguanInfoApi/getDistance.html",
		shareStatistics: ADDON_URL + "DuoguanInfoApi/shareStatistics.html",
	},

};