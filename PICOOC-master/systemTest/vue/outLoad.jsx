
import Vue from 'vue';//引入vue
import VueRouter from 'vue-router';//引入vue-router,路由跳转
import VueResource from 'vue-resource';//引入vue-resource,类似ajax
// import $ from "jquery";//引入别的vue
import "./public1.less";//引入别的vue

import loadHtml from "./components/outLoad/load.vue";//引入头部
/*let ajaxLink="http://pm.picooc.com:8079/";

window.ajaxLink=ajaxLink;*/
var vm =new Vue({
	el:"#load",//挂载在页面的具体元素下
	data: function (){//初始数据
		return {
		}
	},
	template:'<div><loadHtml /></div>',//使用模板
	created:function (){//创建时调用，注意：使用this不能用es方法简写
    console.log(this);
	},
	methods:{},//方法集，放置需要的方法
	components:{
		"loadHtml":loadHtml
	}
})
