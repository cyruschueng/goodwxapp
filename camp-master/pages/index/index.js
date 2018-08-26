var activelist = require( '../../views/activelist/activelist.js' ),
	// orders = require( '../../views/orderlist/orderlist.js' ),
	// mine = require( '../../views/mine/mine.js' ),
	orders,mine,
	App = getApp(),
	views,
	_fn;

views = {
	activelist : activelist,
	orders : orders,
	mine : mine
};
	
Page( {
	data : {
		viewData : {},
		currentView : '',
		tab : {
			currentTab : 0,
			list : [{
				text : '首页',
				className : 'footer-activelist',
				view : 'activelist'
			},{
				text : '订单',
				className : 'footer-orders',
				view : 'orders'
			},{
				text : '我的',
				className : 'footer-mine',
				view : 'mine'
			}]
		}
	},
	onShareAppMessage : App.shareFunc,
	onLoad : function( options ) {
	},
	onReady : function( res ) {	
	},

	onShow : function() {
		// 每次显示都刷新一次购物车
		// 这样保证在商详添加后在首页也能显示
		var self = this,
			currentView = self.data.currentView || 'activelist';

		_fn.selectView.call( this, currentView );
	},

	changeTab : function( e ) {
		var currentTarget = e.currentTarget,
			viewName = currentTarget.dataset.view;

		if ( !viewName ) {
			return;
		}

		// 请求数据，渲染对应页面
		this.setData( {
			currentView : viewName,
			'tab.currentTab' : e.currentTarget.dataset.index
		} );
		_fn.selectView.call( this, viewName );

	},
	changeTabByNameIndex:function(viewName,index){
		if ( !viewName ) {
			return;
		}

		// 请求数据，渲染对应页面
		this.setData( {
			currentView : viewName,
			'tab.currentTab' : index
		} );
		_fn.selectView.call( this, viewName );


	},
	// 触发事件代理
	events : function( e ) {
		var cTarget = e.currentTarget,
			dataset = cTarget.dataset,
			currentView = views[this.data.currentView] || {};


		if ( !currentView.events || typeof currentView.events[dataset.func] != 'function' ) {
			return;
		}
		currentView.events[dataset.func]( this, e );
	},

	jump : function( e ) {
		var url = e.currentTarget.dataset.url;

		if ( url.indexOf( '/comment/comment' ) > -1 ) {	// 多了后面改为switch
			this.closeTips();			
			wx.navigateTo( { url : url } );
		}
	},

	closeTips : function() {
		_fn.writeTime();
		this.setData( {
			tips : { show : false }
		} );
	}
} );

_fn = {
	selectView : function( viewName ) {
		var view = views[viewName];
		if ( !view ) {
			return;
		}
		this.setData( {
			currentView : viewName
		} );
		view.render( this );
	}
}