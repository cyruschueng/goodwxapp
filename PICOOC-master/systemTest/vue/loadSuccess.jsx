
import Vue from 'vue';//引入vue
import VueRouter from 'vue-router';//引入vue-router,路由跳转
import VueResource from 'vue-resource';//引入vue-resource,类似ajax
// import $ from "jquery";//引入别的vue
import "./public1.less";//引入别的vue
import headerHtml from "./components/header.vue";//引入头部
import loadSuccess from "./components/load/loadSuccess.vue";//引入头部

var vm =new Vue({
	el:"#load",//挂载在页面的具体元素下
	data: function (){//初始数据
		return {
		}
	},
	template:'<div><headerHtml /><loadSuccess /></div>',//使用模板
	created:function (){//创建时调用，注意：使用this不能用es方法简写
    console.log(this);
	},
	methods:{},//方法集，放置需要的方法
	components:{//引入的模板
		"headerHtml":headerHtml,
		"loadSuccess":loadSuccess
	}
})
