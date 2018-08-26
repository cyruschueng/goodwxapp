var service = require( '../../service/service' ),
	utils = require( '../../common/utils/utils' ),
	param,	defaultParam,
	app = getApp(),
	_fn;

defaultParam = {
	method : 'back', // replace, forward,
	url : ''
}

Page({
	onLoad : function( options ) {
		param = options || {};
		param = utils.mix( param, options );
	},
  	onShareAppMessage : app.shareFunc,
	login : function() {
		// 1.获取用户信息
		utils.showLoading( 300 );
		service.user.login( function( res ) {
			if ( res.code == -1001 || res.code == -1002 ) {
				utils.hideLoading();
				_fn.showAuthPop(); // 用户进来再从新登录
				return;
			}

			if ( res.code != '0000' || res.success == false ) {
				utils.hideLoading();
				wx.showToast( { title : '登录失败' } );
				return;
			}
			utils.hideLoading();
			setTimeout( function() {
				app.bindUpperUid();
			}, 10 );
			_fn.next();
		} );
	},
	cancel : function() {
		wx.navigateBack();
	}
});

_fn = {
	next : function() {
		var method = param.method,	
			url = param.url ? decodeURIComponent( param.url ) : null;

		switch ( true ) {
			case !!url : 
				wx.redirectTo( { url : url } );
				break;
			default : 
				wx.navigateBack();
		}
	},
	showAuthPop : function() {
		var canUseOpenSetting = wx.canIUse("openSetting");	//1.1.0

		if ( !canUseOpenSetting ) {
			// 默认低版本弹提示信息
			wx.showModal({
				title : '提示',
				showCancel : false,
				content : '亲,如果想重新授权,请删除并重新搜索下载app'
			});
			return;
		}

		wx.showModal( {
			title : '提示',
			content : '请打开用户信息设置',
			showCancel : false,
			complete : function() {
				wx.openSetting( {} );
			}
		} );
	}
}




