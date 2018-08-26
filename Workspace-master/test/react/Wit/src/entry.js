import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

// 引入文件
import './lib/normalize.css'
import './lib/jquery-1.10.2.min.js'
import './lib/auto-size.js'
import './lib/index.scss'

// 引入组件
import IndexPage from './components/index.js';
import buyerList from './components/buyerList.js';

/** 
 *  页面渲染
 *  <IndexRoute component={Home}/>处理默认显示的组件
 */ 
const appEle = document.getElementById('container');
ReactDOM.render(
	<Router history={hashHistory}>
  		<Route path="/" component={IndexPage}>
			
 		</Route>
 		<Route path="/buyerList" component={buyerList}>

 		</Route>
	</Router>,
	appEle
);
