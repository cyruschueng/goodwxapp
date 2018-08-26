var zan = require('../../common/zanUI/index'),
	app = getApp(),
	_fn,
	activePeopleInfo;
	
Page({
	data:{
		config:{
			name: {
				focus: true,
				title: '姓名',
			},
			phone: {
				inputType: 'number',
				title: '联系方式',
			},
			idCard: {
				inputType: 'number',
				title: '身份证',
			},
		}
	},
	onLoad : function( param ) {
		
	},
	onShow : function() {
		var self = this;
		self.setData({
			activePeopleInfo:{}
		})
	},
	changeTab : function( e ) {
		var data = e.currentTarget.dataset;
		this.setData( {
			'tab.current' : data.id
		} );
	},
	toggleBottomPopup:function(){//点击空白，全部消失
		var self = this;
		self.setData({
			activePeopleInfo:{}
		});
	},
	backward:function(){//返回
		var self = this;
		var activePeopleInfo = self.data.activePeopleInfo||{};
		activePeopleInfo.currentStep = activePeopleInfo.currentStep - 1;
		if(activePeopleInfo.currentStep === 1){
			activePeopleInfo.children = null;
		}else if(activePeopleInfo.currentStep === 0){
			activePeopleInfo.children = null;
			activePeopleInfo.parent = {};
		}
		self.setData({
			activePeopleInfo:activePeopleInfo
		});
	},
	selectChild:function(){
		console.log('selelct Child')

	},
	join:function(){//参与
		var self = this;
		var isLogin = _fn.checkLogin();
		if(!isLogin){
			_fn.goLoginPage();
			return;
		}
		var activePeopleInfo = self.data.activePeopleInfo||{};
		if(isLogin){
			activePeopleInfo.isShow = true;
			activePeopleInfo.currentStep = 1;
			self.setData({activePeopleInfo:activePeopleInfo});
		}else{
			_fn.goLoginPage();
			return;
		}
	},
	inputParentInfo:function(e){
		var self = this;
		var activePeopleInfo = self.data.activePeopleInfo||{};
		activePeopleInfo.parent = activePeopleInfo.parent || {};
		var key = e.currentTarget.key;
		var val = e.detail.value;
		activePeopleInfo.parent[key] = val;
		self.setData({activePeopleInfo:activePeopleInfo});
	},
	handleParent:function(){//添加父母
		var self = this;
		var activePeopleInfo = self.data.activePeopleInfo||{};
		var parent = activePeopleInfo.parent || {};
		var errMsg = ""
		if(!parent.name){

		}else if(!parent.phone){

		}else if(!parent.id){

		}
		if(errMsg){
			wx.showToast({msg:errMsg});
			return ;
		}
		activePeopleInfo.currentStep = 2;
		self.setData({activePeopleInfo:activePeopleInfo});
	},
	handleChild:function(){//添加孩子
		var self = this;
		var activePeopleInfo = self.data.activePeopleInfo||{};
		var children = activePeopleInfo.children || [];
		var errMsg = ""
		if(children.length<=0){
			// errMsg = "请选择参加活动的孩子"
		}
		if(errMsg){
			wx.showToast({msg:errMsg});
			return ;
		}
		_fn.addCart(self,function(){
			self.toCheckout();
		});
	},
	toEditChildPage:function(e){//去编辑孩子页面
		var childId;
		if(e){
			childId = e.currentTarget.dataset.id;
		}
		var url = '../editChild/editChild'
		if(childId){
			url = url + '?id='+childId; 
		}
		wx.navigateTo({
			url:url
		});
	},
	toCheckout:function(){//去结算页
		wx.navigateTo({
			url:'../checkout/checkout'
		});
	}
});

_fn = {
	getActiveData : function( caller, callback ) {
		ajax.query( {
			url : app.host + '/app/ware/detail/' + pageParam.id
		}, function( res ) {
			if ( utils.isErrorRes( res ) ) {
				return;
			}
			res.data = _fn.formatData( res.data );
			caller.setData( {
				pageData : res.data
			} );
			callback && callback();
		} );
	},
	getChildData :function(){//获取孩子信息
		console.log('getChildData');

	},
	checkLogin:function(){//检查是否登录
		console.log('checkLogin');
		return true;
	},
	goLoginPage:function(){
		console.log('goLoginPage');
	},
	addCart:function(self,callback){
		console.log('addCart',activePeopleInfo);
		if(callback && typeof callback==='function'){
			callback();
		}
	}
}