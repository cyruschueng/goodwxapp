const BASE_HOST_URL = "https://xdata.zlgshonor.com";
const HOST_URL = BASE_HOST_URL + "/zl";
const API_URL = HOST_URL + '/home.php?s=';
module.exports = {
	version: '1.0.0',
	urls: {
		baseHostUrl: BASE_HOST_URL,
		hostUrl: HOST_URL,
		apiUrl: API_URL,
		//公共接口
		public: {
			upload: API_URL + '/File/uploadPicture.html',
			log: '',
			share: API_URL + '/Addons/getShare.html',
			region: API_URL + '/UtilsApi/region/addon/User.html',
			gassite: BASE_HOST_URL + '/uchome/weixin/paiming_jiayouzhan_api.php',
		},
		//会员基本操作接口
		member: {
			login: API_URL + '/Api/wxLogin/addon/User.html',
			bind: API_URL + '/Api/bindWx/addon/User.html',
			register: API_URL + '/Api/register/addon/User.html',
			info: API_URL + '/Api/info/addon/User.html',
			update: API_URL + '/Api/update/addon/User.html',
			unbind: API_URL + '/Api/unbind/addon/User.html',
			ad: API_URL + '/Api/getAd/addon/User.html',
			find: API_URL + '/Api/find/addon/User.html',
			modify: BASE_HOST_URL + '/uchome/weixin/WX_api_changeinfor.php',
			modifyAvatar: BASE_HOST_URL + '/uchome/weixin/WX_api_changeavatar.php',
			modifyPwd: BASE_HOST_URL + '/change_pw.php',

			//用户地址接口
			address: {
				create: API_URL + '/AddressApi/create/addon/User.html',
				update: API_URL + '/AddressApi/update/addon/User.html',
				info: API_URL + '/AddressApi/info/addon/User.html',
				lists: API_URL + '/AddressApi/lists/addon/User.html',
				delete: API_URL + '/AddressApi/delete/addon/User.html',
				setDefault: API_URL + '/AddressApi/setDefault/addon/User.html',
			},
		},
		//社区接口
		bbs: {
			category: {
				create: API_URL + '/Api/writeCategory/addon/Weiba.html',
				update: API_URL + '/Api/writeCategory/addon/Weiba.html',
				lists: API_URL + '/Api/getCategoryList/addon/Weiba.html',
				info: API_URL + '/Api/infoCategory/addon/Weiba.html',
				delete: API_URL + '/Api/deleteCategory/addon/Weiba.html',
				tree: API_URL + '/Api/getCateTree/addon/Weiba.html',
			},
			weiba: {
				create: API_URL + '/Api/writeWeiba/addon/Weiba.html',
				update: API_URL + '/Api/writeWeiba/addon/Weiba.html',
				lists: API_URL + '/Api/getWeibaList/addon/Weiba.html',
				info: API_URL + '/Api/infoWeiba/addon/Weiba.html',
				delete: API_URL + '/Api/deleteWeiba/addon/Weiba.html',
				isModerator: API_URL + '/Api/isModerator/addon/Weiba.html',
			},
			post: {
				noticeList: API_URL + '/Api/getNoticeList/addon/Weiba.html',
				create: API_URL + '/Api/writePost/addon/Weiba.html',
				update: API_URL + '/Api/writePost/addon/Weiba.html',
				lists: API_URL + '/Api/getPostList/addon/Weiba.html',
				myLists: API_URL + '/Api/getMyPostList/addon/Weiba.html',
				info: API_URL + '/Api/postInfo/addon/Weiba.html',
				delete: API_URL + '/Api/deletePost/addon/Weiba.html',
				praise: API_URL + '/Api/praisePost/addon/Weiba.html',
				report: API_URL + '/Api/reportPost/addon/Weiba.html',
			},
			comment: {
				create: API_URL + '/Api/writeComment/addon/Weiba.html',
				lists: API_URL + '/Api/getCommentList/addon/Weiba.html',
				myLists: API_URL + '/Api/getMyCommentList/addon/Weiba.html',
				delete: API_URL + '/Api/deleteComment/addon/Weiba.html',
				praise: API_URL + '/Api/praiseComment/addon/Weiba.html',
				report: API_URL + '/Api/reportComment/addon/Weiba.html',
			}
		},
		//商城接口
		shoping: {
			//商品接口
			goods: {
				category: API_URL + '/Api/getCategory/addon/Mall.html',
				list: API_URL + '/Api/getGoodsLists/addon/Mall.html',
				info: API_URL + '/Api/getGoodsInfo/addon/Mall.html',
				comment: API_URL + '/Api/getCommentLists/addon/Mall.html',
			},
			//购物车接口
			cart: {
				list: API_URL + '/Api/getCartLists/addon/Mall.html',
				update: API_URL + '/Api/updateCart/addon/Mall.html',
				delete: API_URL + '/Api/deleteCart/addon/Mall.html',
				clear: API_URL + '/Api/clearCart/addon/Mall.html',
				add: API_URL + '/Api/plusCart/addon/Mall.html',
			},
			order: {
				create: API_URL + '/OrderApi/create/addon/Mall.html',
				list: API_URL + '/OrderApi/lists/addon/Mall.html',
				info: API_URL + '/OrderApi/info/addon/Mall.html',
				delete: API_URL + '/OrderApi/delete/addon/Mall.html',
				confirm: API_URL + '/OrderApi/confirm/addon/Mall.html',
			},
			comment: {
				add: API_URL + '/Api/addComment/addon/Mall.html',
			}
		},
		//积分排名接口
		ranking: {
			person: BASE_HOST_URL + '/uchome/weixin/paiming_geren_api.php',
			personDetail: BASE_HOST_URL + '/uchome/weixin/paiming_geren_detail_api.php',
			company: BASE_HOST_URL + '/uchome/weixin/paiming_danwei_api.php',
			gas: BASE_HOST_URL + '/uchome/weixin/paiming_jiayouzhan_api.php',
			manager: BASE_HOST_URL + '/uchome/weixin/paiming_zhanjingli_api.php',
			getScoreByDay: API_URL + '/Api/getScoreByDay/addon/Ranking.html',
			getFengCaiByDay: API_URL + '/Api/getFengCaiByDay/addon/Ranking.html',
			getJiDuRanking: API_URL + '/Api/getJiDuRanking/addon/Ranking.html',
			jiguanrenyuan: BASE_HOST_URL + '/uchome/weixin/paiming_jiguanrenyuan_api.php',

			apply: API_URL + '/Api/apply/addon/Ranking.html',
			apply_lists: API_URL + '/Api/apply_lists/addon/Ranking.html',
			check_lists: API_URL + '/Api/check_lists/addon/Ranking.html',
			check: API_URL + '/Api/check/addon/Ranking.html',

			departments: API_URL + '/Api/getDepartment/addon/Ranking.html',
			departmentUsers: API_URL + '/Api/getDepartmentUser/addon/Ranking.html',

			reward: API_URL + '/Api/reward/addon/Ranking.html',
		},
		//动态/新闻
		article: {
			index: API_URL + '/Api/getDynamic/addon/Article.html',
			lists: API_URL + '/Api/getArticleList/addon/Article.html',
			info: API_URL + '/Api/getArticleInfo/addon/Article.html',
			getCommentList: API_URL + '/Api/getCommentList/addon/Article.html',
			comment: API_URL + '/Api/comment/addon/Article.html',
			togglePraise: API_URL + '/Api/togglePraise/addon/Article.html',
		}
	},
};

//{
//     "pagePath": "pages/bbs/index/index",
//     "text": "中联之家",
//     "iconPath": "images/tabbar/message.png",
//     "selectedIconPath": "images/tabbar/message_in.png"
// },

// "pages/bbs/index/index",
//     "pages/bbs/detail/detail",
//     "pages/bbs/forum/forum",
//     "pages/bbs/forumlist/forumlist",
//     "pages/bbs/post/post",