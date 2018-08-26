var _DuoguanData = require('data.js');
module.exports = {
	requestUrl: function(data, url, callback, pageobj) {
		wx.request({
			url: url,
			data: data,
			header: {
				'Content-Type': 'application/json'
			},
			success: function(res) {
				if (res.statusCode == 200 && res.data.code > 0) {
					callback.apply(pageobj, [res.data])
				} else {
					var error_msg = 'error:接口请求错误';
					if (res.data.info != 'null' || res.data.info != '') {
						error_msg = res.data.info
					}
					wx.showModal({
						title: '提示',
						content: error_msg,
						showCancel: false
					})
				}
			},
			complete: function() {}
		})
	},
	httpRequest: function(data, url, callback, pageobj) {
		wx.request({
			url: url,
			data: data,
			header: {
				'Content-Type': 'application/json'
			},
			success: function(res) {
				if (res.statusCode != 200) {
					wx.showModal({
						title: '提示',
						content: "error:接口请求错误",
						showCancel: false
					})
				} else {
					callback.apply(pageobj, [res.data]);
					if (res.data.status != 2 && res.data.status != 1) {
						wx.showModal({
							title: '提示',
							content: res.data.msg,
							showCancel: false
						})
					}
				}
			},
			fail: function() {
				wx.showModal({
					title: '提示',
					content: "error:网络请求失败",
					showCancel: false
				})
			}
		})
	},
	getShareData: function(mmodule, callback, pageobj) {
		var that = this;
		var data = {
			token: _DuoguanData.duoguan_user_token,
			mmodule: mmodule,
			_: Date.now()
		};
		var res = this.requestUrl(data, _DuoguanData.duoguan_get_share_data_url, callback, pageobj)
	},
	getSwiperList: function(callback, pageobj) {
		var that = this;
		var data = {
			token: _DuoguanData.duoguan_user_token,
			_: Date.now()
		};
		var res = this.requestUrl(data, _DuoguanData.duoguan_swiper_url, callback, pageobj)
	},
	getCmsCateList: function(beginnum, endnum, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			beginnum: beginnum,
			endnum: endnum,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_cms_cate_url, callback, pageobj)
	},
	getCmsList: function(s_key, cate_id, pagesize, pagenum, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			cate_id: cate_id,
			keyword: s_key,
			pagesize: pagesize,
			pagenum: pagenum,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_cms_url, callback, pageobj)
	},
	getCmsInfo: function(utoken, id, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			id: id,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_cms_read_url, callback, pageobj)
	},
	postComment: function(utoken, cid, content, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			cid: cid,
			content: content,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_comment_add_url, callback, pageobj)
	},
	getCommentList: function(cid, pagesize, pagenum, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			cid: cid,
			pagesize: pagesize,
			pagenum: pagenum,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_comment_list_url, callback, pageobj)
	},
	postCommentGood: function(cid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			cid: cid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_comment_good_url, callback, pageobj)
	},
	getUserInfo: function(utoken, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_user_info_url, callback, pageobj)
	},
	postUserInfo: function(utoken, udata, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			udata: udata,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_user_info_post_url, callback, pageobj)
	},
	getUserAddressList: function(utoken, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_user_address_list_url, callback, pageobj)
	},
	addAddress: function(utoken, ainfo, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			ainfo: ainfo,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_user_address_add_url, callback, pageobj)
	},
	getAddressInfo: function(utoken, aid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			aid: aid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_user_address_info_url, callback, pageobj)
	},
	delAddress: function(utoken, aid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			aid: aid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_user_address_del_url, callback, pageobj)
	},
	getUserPaylog: function(utoken, pagesize, pagenum, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			pagesize: pagesize,
			pagenum: pagenum,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_user_paylog_url, callback, pageobj)
	},
	makePayData: function(utoken, cid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			cid: cid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_make_paydata_url, callback, pageobj)
	},
	getUserPostList: function(utoken, pagesize, pagenum, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			pagesize: pagesize,
			pagenum: pagenum,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_user_postlist_url, callback, pageobj)
	},
	getUserOrderList: function(utoken, pagesize, pagenum, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			pagesize: pagesize,
			pagenum: pagenum,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_user_orderlist_url, callback, pageobj)
	},
	deleteOrderInfo: function(utoken, oid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oid: oid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_delete_user_order_url, callback, pageobj)
	},
	shouhuoOrderInfo: function(utoken, oid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oid: oid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_shouhuo_user_order_url, callback, pageobj)
	},
	postCommentOrder: function(utoken, oid, fval, fcon, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oid: oid,
			fval: fval,
			fcon: fcon,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_post_comment_order, callback, pageobj)
	},
	getBbsCategory: function(callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_bbs_cate_url, callback, pageobj)
	},
	getBbsGonggaoId: function(callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_bbs_gonggao_id, callback, pageobj)
	},
	getBbsTwoCategory: function(callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_bbs_cate_two_url, callback, pageobj)
	},
	getBbsPostList: function(wid, isjinghua, pagesize, pagenum, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			wid: wid,
			isjinghua: isjinghua,
			pagesize: pagesize,
			pagenum: pagenum,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_bbs_postlist_url, callback, pageobj)
	},
	postBBs: function(utoken, t_data, t_wb_name, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			t_data: t_data,
			t_wb_name: t_wb_name,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_bbs_post_url, callback, pageobj)
	},
	imgUpload: function(pid, utoken, imgurl, cb) {
		wx.uploadFile({
			url: _DuoguanData.duoguan_imgupload_url,
			filePath: imgurl,
			name: 'file',
			formData: {
				token: _DuoguanData.duoguan_user_token,
				utoken: utoken,
				pid: pid
			},
			success: function(res) {
				cb(res.data)
			}
		})
	},
	getPostInfo: function(pid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			pid: pid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_post_info_url, callback, pageobj)
	},
	checkBBSManage: function(utoken, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_check_bbs_manage_url, callback, pageobj)
	},
	delPostAction: function(utoken, pid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			pid: pid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_post_del_url, callback, pageobj)
	},
	addPostReply: function(utoken, pid, rp_id, content, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			pid: pid,
			rp_id: rp_id,
			content: content,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_post_replyadd_url, callback, pageobj)
	},
	getReplyList: function(pid, pagesize, pagenum, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			pid: pid,
			pagesize: pagesize,
			pagenum: pagenum,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_post_replylist_url, callback, pageobj)
	},
	postXihuanAct: function(utoken, pid, ptype, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			pid: pid,
			ptype: ptype,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_post_xihuan_url, callback, pageobj)
	},
	postReportAct: function(utoken, pid, ptype, content, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			pid: pid,
			ptype: ptype,
			content: content,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_post_report_url, callback, pageobj)
	},
	getShopConfig: function(callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_shop_config_url, callback, pageobj)
	},
	getShopQuanInfo: function(qid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			qid: qid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_shop_get_quan_info_url, callback, pageobj)
	},
	getShopQuanLingqu: function(utoken, qid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			qid: qid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_shop_get_quan_lingqu_url, callback, pageobj)
	},
	getUserOneQuanInfo: function(utoken, quan_id, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			quan_id: quan_id,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_shop_get_user_quan_info_url, callback, pageobj)
	},
	getShopUserQuanlist: function(utoken, qtype, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			qtype: qtype,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_shop_get_user_quanlist_url, callback, pageobj)
	},
	getShopPsOrderInfo: function(oid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			oid: oid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_shop_get_psorder_info_url, callback, pageobj)
	},
	getShopPsUserInfo: function(utoken, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_shop_get_psuser_info_url, callback, pageobj)
	},
	getShopPsConfirm: function(utoken, oid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oid: oid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_shop_get_ps_confrim_url, callback, pageobj)
	},
	getShopWuliuInfo: function(oid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			oid: oid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_shop_get_wuliu_info_url, callback, pageobj)
	},
	getShopCategory: function(callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_shop_cate_url, callback, pageobj)
	},
	getGoodsList: function(searchData, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			searchData: searchData,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_good_list_url, callback, pageobj)
	},
	getGoodsInfo: function(sid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			sid: sid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_good_info_url, callback, pageobj)
	},
	addGoodsCart: function(utoken, gid, gnumber, gattr, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			gid: gid,
			gnumber: gnumber,
			gattr: gattr,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_add_good_cart_url, callback, pageobj)
	},
	getCartList: function(utoken, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_cart_list_url, callback, pageobj)
	},
	delCartList: function(utoken, cid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			cid: cid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_del_cart_list_url, callback, pageobj)
	},
	editCartList: function(utoken, cid, cnum, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			cid: cid,
			cnum: cnum,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_edit_cart_list_url, callback, pageobj)
	},
	orderPost: function(utoken, oinfo, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oinfo: oinfo,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_order_post_url, callback, pageobj)
	},
	getOrderInfo: function(utoken, oid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oid: oid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_order_info_url, callback, pageobj)
	},
	makeOrderPayData: function(utoken, oid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oid: oid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_make_order_pay_url, callback, pageobj)
	},
	getAddressList: function(utoken, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_address_list_url, callback, pageobj)
	},
	getUserMenu: function(callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			ver_id: _DuoguanData.duoguan_config_version,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_user_menu_url, callback, pageobj)
	},
	duoguanData: _DuoguanData,
	getTuanCategory: function(callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_tuan_cate_url, callback, pageobj)
	},
	getTuanGoodsList: function(cid, pagesize, pagenum, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			cid: cid,
			pagesize: pagesize,
			pagenum: pagenum,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_tuan_good_list_url, callback, pageobj)
	},
	getTuanGoodsInfo: function(sid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			sid: sid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_tuan_good_info_url, callback, pageobj)
	},
	addTuanGoodsCart: function(utoken, gid, gnumber, gattr, btype, chengtuan_id, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			gid: gid,
			gnumber: gnumber,
			gattr: gattr,
			btype: btype,
			chengtuan_id: chengtuan_id,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_add_tuan_good_cart_url, callback, pageobj)
	},
	getTuanCartList: function(utoken, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_tuan_cart_list_url, callback, pageobj)
	},
	orderTuanPost: function(utoken, oinfo, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oinfo: oinfo,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_order_tuan_post_url, callback, pageobj)
	},
	makeTuanOrderPayData: function(utoken, oid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oid: oid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_make_tuan_order_pay_url, callback, pageobj)
	},
	getTuanInfo: function(tid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			tid: tid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_tuan_info_url, callback, pageobj)
	},
	getTuanWuliuInfo: function(oid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			oid: oid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_tuan_get_wuliu_info_url, callback, pageobj)
	},
	getUserTuanOrderList: function(utoken, pagesize, pagenum, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			pagesize: pagesize,
			pagenum: pagenum,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_user_tuan_orderlist_url, callback, pageobj)
	},
	getTuanOrderInfo: function(utoken, oid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oid: oid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_tuan_order_info_url, callback, pageobj)
	},
	deleteTuanOrderInfo: function(utoken, oid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oid: oid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_delete_user_tuan_order_url, callback, pageobj)
	},
	shouhuoTuanOrderInfo: function(utoken, oid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oid: oid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_shouhuo_user_tuan_order_url, callback, pageobj)
	},
	getCardMyInfo: function(utoken, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_card_my_info_url, callback, pageobj)
	},
	getCardUserInfo: function(utoken, cid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			cid: cid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_card_user_info_url, callback, pageobj)
	},
	postCardInfo: function(utoken, data, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			data: data,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_card_post_info_url, callback, pageobj)
	},
	postChangePhoneInfo: function(utoken, data, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			data: data,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_card_change_phone_url, callback, pageobj)
	},
	getCardViewInfo: function(uid, fid, ctype, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			uid: uid,
			fid: fid,
			ctype: ctype,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_card_view_info_url, callback, pageobj)
	},
	getMyCardList: function(utoken, ctype, ltype, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			ctype: ctype,
			ltype: ltype,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_card_get_list_url, callback, pageobj)
	},
	getUserPhoneCode: function(utoken, phone, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			phone: phone,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_get_user_phone_code_url, callback, pageobj)
	},
	getHotelListData: function (utoken, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now(),
		};
		this.httpRequest(data, _DuoguanData.duoguan_h_gethotellist_url, callback, pageobj)
	},
	getHotelData: function (hotel_id,utoken, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			hotel_id: hotel_id,
			_: Date.now()
		};
		this.httpRequest(data, _DuoguanData.duoguan_h_gethoteldata_url, callback, pageobj)
	},
	getHotelEvaData: function (hotel_id,pageIndex, pageSize, utoken, callback, pageobj) {
		var data = {
			hotel_id: hotel_id,
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now(),
			pageIndex: pageIndex,
			pageSize: pageSize
		};
		this.httpRequest(data, _DuoguanData.duoguan_h_gethotelevadata_url, callback, pageobj)
	},
	getRoomListData: function (hotel_id,startTime, stopTime, utoken, callback, pageobj) {
		var data = {
			hotel_id: hotel_id,
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now(),
			startTime: startTime,
			stopTime: stopTime
		};
		this.httpRequest(data, _DuoguanData.duoguan_h_getroomlist_url, callback, pageobj)
	},
	makeHotelOrder: function (hotel_id,checkintime, leavetime, name, tel, roomid, mealid, roomnums, price, paytype, utoken, callback, pageobj) {
		var data = {
			hotel_id: hotel_id,
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now(),
			checkintime: checkintime,
			leavetime: leavetime,
			name: name,
			tel: tel,
			paytype: paytype,
			roomid: roomid,
			mealid: mealid,
			roomnums: roomnums,
			price: price,

		};
		this.httpRequest(data, _DuoguanData.duoguan_h_makeorder_url, callback, pageobj)
	},
	makeHotelComment: function (data, utoken, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now(),
			data: data
		};
		this.httpRequest(data, _DuoguanData.duoguan_h_makecomment_url, callback, pageobj)
	},
	getOrderList: function (pageIndex,
							pageSize, utoken, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now(),
			pageIndex: pageIndex,
			pageSize: pageSize
		};
		this.httpRequest(data, _DuoguanData.duoguan_h_getorderlist_url, callback, pageobj)
	},
	deleteOrder: function (ordernumber, utoken, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now(),
			ordernumber: ordernumber
		};
		this.httpRequest(data, _DuoguanData.duoguan_h_deleteorder_url, callback, pageobj)
	},
	cancelOrder: function (ordernumber, utoken, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now(),
			ordernumber: ordernumber
		};
		this.httpRequest(data, _DuoguanData.duoguan_h_cancelorder_url, callback, pageobj)
	},
	payHotelOrder: function (ordernumber, utoken, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			_: Date.now(),
			ordernumber: ordernumber
		};
		this.httpRequest(data, _DuoguanData.duoguan_h_payHotelorder_url, callback, pageobj)
	},
	dishGetDishConfig: function(callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_get_dish_config, callback, pageobj)
	},
	dishGetDishList: function(lat, lng, pagesize, pagenum, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			ws_lat: lat,
			ws_lng: lng,
			pagesize: pagesize,
			pagenum: pagenum,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_get_dish_list, callback, pageobj)
	},
	dishGetDishInfo: function(utoken, dish_id, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			dish_id: dish_id,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_get_dish_info, callback, pageobj)
	},
	dishGetDishOneInfo: function(dish_id, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			dish_id: dish_id,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_get_dish_one_info, callback, pageobj)
	},
	dishGetGoodsInfo: function(utoken, dish_id, goods_id, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			dish_id: dish_id,
			goods_id: goods_id,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_get_goods_info, callback, pageobj)
	},
	dishGetOneGoodsAttr: function(goods_id, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			goods_id: goods_id,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_get_one_goods_attr, callback, pageobj)
	},
	dishAddGoodsCart: function(utoken, dish_id, gid, gnumber, gattr, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			dish_id: dish_id,
			gid: gid,
			gnumber: gnumber,
			gattr: gattr,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_add_cart_info, callback, pageobj)
	},
	dishGetCartList: function(utoken, dish_id, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			dish_id: dish_id,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_get_cart_info, callback, pageobj)
	},
	dishEditCartList: function(utoken, cid, cnum, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			cid: cid,
			cnum: cnum,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_edit_cart_info, callback, pageobj)
	},
	dishDeleteCartList: function(utoken, dish_id, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			dish_id: dish_id,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_delete_cart_info, callback, pageobj)
	},
	dishOrderPost: function(utoken, oinfo, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oinfo: oinfo,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_order_post_info, callback, pageobj)
	},
	dishMakeOrderPayData: function(utoken, oid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oid: oid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_order_pay_url, callback, pageobj)
	},
	dishGetUserOrderList: function(utoken, pagesize, pagenum, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			pagesize: pagesize,
			pagenum: pagenum,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_get_user_orderlist_url, callback, pageobj)
	},
	dishGetOrderInfo: function(utoken, oid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oid: oid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_order_info_url, callback, pageobj)
	},
	dishDeleteOrderInfo: function(utoken, oid, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oid: oid,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_delete_user_order_url, callback, pageobj)
	},
	dishPostOrderComment: function(utoken, oid, fval, fcon, callback, pageobj) {
		var data = {
			token: _DuoguanData.duoguan_user_token,
			utoken: utoken,
			oid: oid,
			fval: fval,
			fcon: fcon,
			_: Date.now()
		};
		this.requestUrl(data, _DuoguanData.duoguan_dish_post_comment_order, callback, pageobj)
	},
	dishImgUpload: function(pid, utoken, imgurl, cb) {
		wx.uploadFile({
			url: _DuoguanData.duoguan_dish_imgupload_url,
			filePath: imgurl,
			name: 'file',
			formData: {
				token: _DuoguanData.duoguan_user_token,
				utoken: utoken,
				pid: pid
			},
			success: function(res) {
				cb(res.data)
			}
		})
	},
}