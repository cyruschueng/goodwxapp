
import Vue from 'vue';//引入vue
import VueRouter from 'vue-router';//引入vue-router,路由跳转
import VueResource from 'vue-resource';//引入vue-resource,类似ajax
// import $ from "jquery";//引入别的vue
import "./public1.less";//引入别的vue
import outHeaderHtml from "./components/outheader.vue";//引入头部
import outTotelMain from "./components/outTotelMain.vue";
import outFooter from "./components/outFooter.vue";
import alertWrap from "./components/alertWrap.vue";
import outAppMain from "./components/outAppMain.vue";//引入app下的主要内容
import outAppLeft from "./components/outApp/outAppLeft.vue";//引入app下的左部分
import outAppRight from "./components/outApp/outAppRight.vue";//引入app下的右部分
//我的文章
import outAppArticleIndex from "./components/outApp/article/index.vue";

//通知中心
import outAppNoticeIndex from "./components/outApp/notice/index.vue";

/*let ajaxLink="http://pm.picooc.com:8079/";

window.ajaxLink=ajaxLink;*/
import outAppArticleAdd from "./components/outApp/article/add.vue";

if(getCookie("outToken")=="false"){
	window.location.href="outLoad.html";
}
else{
	window.token='&token='+getCookie("outToken")+'&';
}

Vue.use(VueRouter);//使用路由
Vue.use(VueResource);//使用请求，类似ajax


let publicData={
	pageSize:20,
}
window.publicData=publicData;

/*if(getCookie("token")=="false"){
	window.location.href="load.html";
}
else{
	window.token='&token='+getCookie("token")+'&';
}*/




getWindowSearch();
function getWindowSearch(){
	let windowSearch=window.location.href.split("?")[1];
	if(typeof windowSearch=="undefined"){
		windowSearch="";
	}
	window.windowSearch=windowSearch;
}
window.getWindowSearch=getWindowSearch;

let router=new VueRouter({//路由设置
	routes:[//数组，跳转路径
		{path:'/',name:'/',component:outAppMain,children:[
			{path:'outAppRight',name:'outAppRight',components:{outAppRight:outAppRight},children:[
					{path:'outAppArticleIndex',name:'outAppArticleIndex',component:outAppArticleIndex},
					//{path:'outAppArticleAdd',name:'outAppArticleAdd',component:outAppArticleAdd},
					{path:'outAppNoticeIndex',name:'outAppNoticeIndex',component:outAppNoticeIndex}
				]
			},
			]
		},
		{path:'/outAppArticleAdd',name:'outAppArticleAdd',component:outAppArticleAdd}
	]
});
window.router=router;


var vm =new Vue({
	el:"#outIndex",//挂载在页面的具体元素下
	router:router,
	data: function (){//初始数据
		return {
		}
	},
	template:'<div><alertWrap /><outHeaderHtml /><outTotelMain /><outFooter /></div>',//使用模板
	created:function (){//创建时调用，注意：使用this不能用es方法简写
    console.log(this);
	},
	methods:{},//方法集，放置需要的方法
	components:{//引入的模板
		"outHeaderHtml":outHeaderHtml,
		"outTotelMain":outTotelMain,
		"outFooter":outFooter,
		"alertWrap":alertWrap,
	}
})
