<template>
	<div id="fskWrapper">
  		<navBar :title="title" :btn1="btn1" :btn2="btn2" :link1="link1" :link2="link2"></navBar>
	    <div class="fsk-content row">
	    	<div class="left-content col-xs-7 col-sm-7 col-md-7 col-lg-7" style="height:97%">
	    		<div class="left_topBar row">
	    			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="height:100%">
	    				<div class="box-shadow-inset-radius clearfix" style="height:100%">
		    				<div class="tipsFour" style="height:80%;">
		    					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="height:100%"> 
			    					<div class="tipsImg" style="height:100%">
			    						<img src="lib/img/gaxq1.png" style="height:100%;" class="center-block">
			    					</div>
		    					</div>
		    					<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
			    					<div class="textBox">
		    							<p class="txt-center"><strong class="text-shadow-2" style="font-size:1rem;color:#69c218;">2,342</strong></p>
		    							<p class="text-shadow-2 txt-center" style="font-weight: 900;text-align:center;">追溯食材</p>
			    					</div>
		    					</div>
		    				</div>
	    				</div>
	    			</div>
	    			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 no-padding-left" style="height:100%">
	    				<div class="box-shadow-inset-radius clearfix" style="height:100%">
		    				<div class="tipsFour" style="height:80%;">
		    					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="height:100%"> 
			    					<div class="tipsImg" style="height:100%">
			    						<img src="lib/img/2.png" style="height:100%;" class="center-block">
			    					</div>
		    					</div>
		    					<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
			    					<div class="textBox">

	    								<p class="txt-center"><strong class="text-shadow-2" style="font-size:1rem;color:#4aa9e8">23,622</strong></p>
	    								<p class="text-shadow-2 txt-center" style="font-weight: 900;text-align:center;">追溯查询</p>
	    							</div>
		    					</div>
		    				</div>
	    				</div>
	    			</div>
	    			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 no-padding-left" style="height:100%">
						<div class="box-shadow-inset-radius clearfix" style="height:100%">
		    				<div class="tipsFour" style="height:80%;">
		    					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="height:100%"> 
			    					<div class="tipsImg" style="height:100%">
			    						<img src="lib/img/3.png" style="height:100%;" class="center-block">
			    					</div>
		    					</div>
		    					<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
			    					<div class="textBox">
	    								<p class="txt-center"><strong class="text-shadow-2" style="font-size:1rem;color:#81c485">16,800</strong></p>
	    								<p class="text-shadow-2 txt-center" style="font-weight: 900;text-align:center;">农残检测</p>
	    							</div>
		    					</div>
		    				</div>
	    				</div>
	    			</div>
	    			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 no-padding-left" style="height:100%">
						<div class="box-shadow-inset-radius clearfix" style="height:100%">
		    				<div class="tipsFour" style="height:80%;">
		    					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="height:100%"> 
			    					<div class="tipsImg" style="height:100%">
			    						<img src="lib/img/4.png" style="height:100%;" class="center-block">
			    					</div>
		    					</div>
		    					<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
			    					<div class="textBox">
	    								<p class="txt-center"><strong class="text-shadow-2" style="font-size:1rem;color:#ceb53a">352</strong></p>
	    								<p class="text-shadow-2 txt-center" style="font-weight: 900;<!-- text-align:center; -->">实名供应商</p>
	    							</div>
		    					</div>
		    				</div>
	    				</div>
	    			</div>
	    		</div>   		
    			<div class="food-list box-shadow-inset-radius">
    				<div class="echart-head">
    					<span class="tip-bar-text">实时访问数据</span>
    				</div>
    				<div style="width: 100%;height: 91%;">
    					<scrollTable :itemlist="foodList" :titlelist="titlelist" v-on:showPop="showGoodInfo"></scrollTable>
    				</div>

	    			<!-- <table border="1">
    					<tr class="thead">
    						<td width="20%">食材名称</td>
    						<td>下单时间</td>
    						<td>送货时间</td>
    						<td>是否抽检</td>
    						<td>追溯查询</td>
    					</tr>
    					<tr v-for="item in foodList">
    						<td>{{item.goodsname}}</td>
    						<td>{{item.creattime}}</td>
    						<td>{{item.shiptime}}</td>
    						<td>{{item.Isdetile}}</td>
    						<td><span class="zs_searchBtn" @click="showGoodInfo(item.Id)">追溯查询</span></td>
    					</tr>
    					
	    			</table> -->
				</div>	    		
	    		<div class="bottom-btns">
		    		<div class="btns">
	    				<div @click="showLastMonthData" style="background:url('../../lib/img/fsk-btn1.png');background-size: 100% 100%;"></div>
	    				<div @click="showhalfYearData" style="background:url('../../lib/img/fsk-btn2.png');background-size: 100% 100%;"></div>
	    				<div @click="showfullYearData" style="background:url('../../lib/img/fsk-btn3.png');background-size: 100% 100%;"></div>
		    		</div>
	    		</div>
	    	</div>
	    	<div class="right-content col-xs-5 col-sm-5 col-md-5 col-lg-5" style="height:97%">
	    		<div class="row" style="height:32%">
	    			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 no-padding-left" style="height:100%;">
		    			<div class="box-shadow-inset-radius border-radius-5" style="height:100%;">
		    				<div class="echart-head">
		    					<span class="tip-bar-text">生鲜品种对比</span>
		    				</div>
		    				<div id="shenxian" style="width:100%;height:85%;"></div>
		    			</div>
	    			</div>
	    			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 no-padding-left" style="height:100%;">
		    			<div class="box-shadow-inset-radius border-radius-5" style="height:100%;">
		    				<div class="echart-head">
		    					<span class="tip-bar-text">肉类数据对比</span>
		    				</div>
		    				<div id="roulei" style="width:100%;height:85%;"></div>
		    			</div>
	    			</div>
	    		</div>
	    		<div class="row" style="height:1%"></div>
	    		<div class="row" style="height:32%">
	    			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 no-padding-left" style="height:100%;">
		    			<div class="box-shadow-inset-radius border-radius-5" style="height:100%;">
		    				<div class="echart-head">
		    					<span class="tip-bar-text">粮油数据对比</span>
		    				</div>
		    				<div id="liangyou" style="width:100%;height:85%;"></div>
		    			</div>
	    			</div>
	    			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 no-padding-left" style="height:100%;">
		    			<div class="box-shadow-inset-radius border-radius-5" style="height:100%;">
		    				<div class="echart-head">
		    					<span class="tip-bar-text">明星供应商</span>
		    				</div>
		    				<div class="infolList">
		    					<p><strong style="color:#fd9800">家园商品超市</strong></p>
		    					<p>地址：西航港大道17号</p>
		    					<p>联系方式：18140785462</p>
		    					<p>追溯信息：<span style="color:#fd9800">1258</span> 条</p>
		    				</div>
		    			</div>
	    			</div>
	    		</div>
	    		<div class="row" style="height:1%"></div>

	    		<div class="row" style="height:32%">
	    			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 no-padding-left" style="height:100%;">
		    			<div class="box-shadow-inset-radius border-radius-5" style="height:100%;overflow: hidden;">
		    				<div class="echart-head">
		    					<span class="tip-bar-text">实时数据访问</span>
		    				</div>
		    				<div id="scrollData" style="height: 91%;">
								<ul id="scrollDataList1">
									<li id="content_li" v-for="item in ssData">
										<span class="good">{{item.date}}</span> 
										<span class="cy-search">{{item.time}}</span>
										<span class="search">查询</span>
									</li>					
								</ul>
								<ul id="scrollDataList1">
									<li id="content_li" v-for="item in ssData">
										<span class="good">{{item.date}}</span> 
										<span class="cy-search">{{item.time}}</span>
										<span class="search">查询</span>
									</li>					
								</ul>
							</div>
		    			</div>
	    			</div>
	    			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 no-padding-left" style="height:100%;">
		    			<div style="height:100%;">
		    				
		    				<div id="imgBox" style="width:100%;height:100%;">
		    					<div id="erCode" style="width:150px;height:150px;">
		    						<img src="../../lib/img/fsk-code.png" height="100%" width="100%">
		    					</div>
		    				</div> 
		    			</div>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="footer" style="height:5%">
    			<footBox :txt="foottxt"></footBox>
	    	</div>
	    </div>
	    <popup good="good">
			<div id="fskdata_Search" style="height:100%;width:100%;">
				<div id="lastMonth" style="height:100%;width:100%;display:none">
					<div class="tableHead"></div>
					<div id="lastMonthData"></div>
				</div>

				<div id="halfYear" style="height:100%;width:100%;display:none">
					<div class="tableHead1"></div>
					<div id="halfYearData"></div>
				</div>

				<div id="fullYear" style="height:100%;width:100%;display:none">
					<div class="tableHead2"></div>
					<div id="fullYearData"></div>
				</div>

				<div id="goodInfo_List">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="height:100%;padding-left:0;">
							<div class="left">
								<div style="height: 8%;width: 66%;border-bottom: 1px solid #8393bd">
							  		<img src="lib/img/tcc-title1.png" alt="" style="height: 100%;width:100%;">
							  	</div>
							  	<div style="height: 42%;overflow:hidden;">
							  		<div class="goodLogoImg fl">
							  	  		<img :src="good.imgurl" alt="" style="width: 100%;height: 100%;">
							  	  	</div>
								  	<div class="rzImg fr">
								  		<img src="lib/img/yrz.png" alt="" style="width: 90%;height: 76%;">
								  	</div>
							  	</div>
							  	<div class="goodInfoBox">
							  		<div style="padding: 10px 10px;">
								  		<ul class="infoItem" style="border-top: none;list-style-type: none;margin: 0;padding:0;">
							          		<li>商品名称: {{good.name}}</li>
									        <li>品牌: {{good.brand}}</li>
									        <li>批次号: {{good.code}}</li>
									        <li>生产日期: {{good.productionDate}}</li>
									        <li>保质期: {{good.Qualitydate}}</li>
									        <li>追溯机构认证代码: </li>
									        <li>{{good.Authentication}}</li>
									        <li>合作单位: 贵州贵安商贸投资有限公司</li>
		          							<li>技术支持: 成都源溯优品科技有限公司</li>
							          	</ul>
						          	</div>
							  	</div>
							</div>
						</div>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="height:100%;padding-left:0;">
							<div class="middle" style="height:100%">
								<div class="titleImg">
					          		<img src="../../lib/img/title-scjd.png" height="100%" style="height: 100%;width:65%;">
					          	</div>
								<ul class="titleInfo infoItem">
						          	<li>经营商：{{productionAdd.Distribution}}</li>
						            <li>经营户：{{productionAdd.households}}</li>
						            <li>蔬菜抽检合格户：{{productionAdd.code}}</li>
						            <li>检验日期：{{productionAdd.date}}</li>
						            <li>地块信息：{{productionAdd.addinfo}}</li>
						            <li>农场信息：{{productionAdd.forminfo}}</li>
					          	</ul>
					          	<div style="height:3%;"></div>
					          	<div class="titleImg">
					          		<img src="../../lib/img/title-pszx.png" style="height: 100%;width:65%;">
					          	</div>
								<ul class="titleInfo infoItem">
						          	<li>配送商：{{logistics.Distribution}}</li>
						            <li>联系人：{{logistics.person1}}</li>
						            <li>联系电话：{{logistics.phone1}}</li>
						            <li>配送车牌号：{{logistics.carcode}}</li>
						            <li>配送联系人：{{logistics.carperson}}</li>
						            <li>进场日期：{{logistics.cardate}}</li>
						            <li>摊位号：{{logistics.carnum}}</li>
					          	</ul>
							</div>
						</div>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="height:100%;padding-left:0;">
							<div class="right">
								<div class="titleImg">
					          		<img src="../../lib/img/title-xszx.png" style="height: 100%;width:65%;">
					          	</div>
								<ul class="titleInfo infoItem">
						          	<li>零销商: {{sell.Retailer}}</li>
						            <li>经营户: {{sell.households}}</li>
						            <li>进场日期: {{sell.date}}</li>
						            <li>排位号: {{sell.code}}</li>
					          	</ul>
					          	<div style="height:3%;"></div>
					          	<div class="titleImg">
					          		<img src="../../lib/img/title-sjzc.png" style="height: 100%;width:65%;">
					          	</div>
								<ul class="titleInfo infoItem">
						          	<li>名称: {{store.name}}</li>
						          	<li>联系人: {{store.person}}</li>
						          	<li>联系电话: {{store.phone}}</li>
						          	<li>联系地址: {{store.addr}}</li>
					          	</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
	    </popup>
	</div>
</template>
 
<script>
	// import echarts from 'echarts';
	import navBar from './navBar.vue';
	import footBox from './footBox.vue';
	import popup from './popup.vue';
	import scrollTable from './scrollTable.vue'
	import tipsList from './tipsList.vue'

	//组件数据
    export default {
        data () {
            return {
        		title:'贵安新区富士康产业园食品安全追溯体系',
	  			btn1:'lib/img/togaxq-btn.png',
	  			btn2:'lib/img/tochaye-btn.png',

	  			link1: '/gaxq',
  				link2: '/chaye',

  				// 商品列表
	  			foodList:[],

	  			good: {},
	  			productionAdd: {},
				logistics: {},
				sell: {},
				store: {},
	  			foottxt: 'Copyright  2016.贵州贵安商贸投资有限公司',
	  			titlelist: ['食材名称', '下单时间', '送货时间', '是否抽检', '追溯查询'],
	  			tips: [
				  	{
				  		img: 'lib/img/cy-tips1.png',
				  		num: '13,254'
				  	},
				  	{
				  		img: 'lib/img/cy-tips2.png',
				  		num: '13,254'
				  	},
				  	{
				  		img: 'lib/img/cy-tips3.png',
				  		num: '13,254'
				  	},
				  	{
				  		img: 'lib/img/cy-tips4.png',
				  		num: '13,254'
				  	}
				  ],
			  	ssData: []
            }
        },

  		components: { navBar, footBox, popup, scrollTable, tipsList },

  		methods: {
  			// 商品详情弹窗
		    showGoodInfo: function (Id) {
		    	var vm = this;
		    	showPopup();
		      	showMask();
		      	$("#goodInfo_List").css("display","block");
		      	$.ajax({
		      		url: '../getInfo?folder=orders&file=goods_' + Id,
		      		type: 'GET',
		      		success: function(res){
		      			vm.good = res;
		  				vm.productionAdd = vm.good.productionAdd;
		  				vm.logistics = vm.good.logistics;
		  				vm.sell = vm.good.sell;
		  				vm.store = vm.good.store;
		  				vm.imgurl = res.imgurl;
		      		}
		      	})
		    },
		    // 上月数据弹窗
		    showLastMonthData: function(){
    	  		showPopup();
		      	showMask();
		      	$("#lastMonth").css("display", "block");
		      	$("#goodInfo_List").css("display", "none");
    	  	}, 
    	  	// 半年数据弹窗
		    showhalfYearData: function(){
    	  		showPopup();
		      	showMask();
		      	$("#halfYear").css("display", "block");
		      	$("#goodInfo_List").css("display", "none");
    	  	},// 全年数据弹窗
		    showfullYearData: function(){
    	  		showPopup();
		      	showMask();
		      	$("#fullYear").css("display", "block");
		      	$("#goodInfo_List").css("display", "none");
    	  	}
		},

        mounted: function() {
  			var vm = this;	
  			for(var i = 0; i < 20; i++){
				var fdate = {
					'date': new Date().Format("yyyy-MM-dd"),
					'time': new Date().Format("hh:mm")
				}
				vm.ssData.push(fdate)
			}

			config.fsk.scrollData = document.getElementById("scrollData");
		    config.fsk.scrollDataList1 = document.getElementById("scrollDataList1");

		    config.fsk.scroll1 = setInterval(function(){
		      Marquee(config.fsk.scrollData, config.fsk.scrollDataList1)
		    }, 30);
		    scrollData.onmouseover = function() {
		      clearInterval(config.fsk.scroll1)
		    };
		    scrollData.onmouseout = function() {
		      config.fsk.scroll1 = setInterval(function(){
		        Marquee(config.fsk.scrollData, config.fsk.scrollDataList1)
		      }, 30);
		    }; 

        	// tips居中
        	setmiddle([$(".tip-bar-text"),$("#imgBox")]);

        	$.ajax({
        		url: '../getInfo?folder=orders&file=DataOrder',
        		type: 'GET',
        		success: function(res){
        			vm.foodList = res.aadata;
        		}
        	});

			// 左上图标居中
			function getElePh (ele){
				var ph = ele.parent().parent().parent().height() - ele.height();
				return ph;
			}
			function setTipsMiddle (eles){
				for(var i=0;i<eles.length;++i){
					eles[i].css("margin-top",getElePh(eles[i]) / 2 + "px");
				}
			}
			var arrFourTips = [$(".tipsImg"),$(".textBox")]
			setTipsMiddle(arrFourTips)

			// 二维码居中
			var erCodeph = $("#imgBox").parent().height() - $("#erCode").height();
			var erCodepw = $("#erCode").parent().width() - $("#erCode").width();
			console.log(erCodeph)
			// $("#erCode").css("margin-top",erCodeph / 2 + "px");
			$("#erCode").css("margin-left",erCodepw / 2 + "px");

			
        	// 关闭弹窗处理
        	$(document).on('click', '#close', function(){
        		$("#fskdata_Search").children().css("display","none")
		    }) 

		    // 动态获取图表容器高宽
        	var elesArr = [$("#lastMonthData"),$("#halfYearData"),$("#fullYearData")];
        	var setHeight = function(eles){
        		var ph = $("#popup").height();
        		var pw = $("#popup").width()-60;
		      	for(var i=0;i<eles.length;++i){
        			eles[i].css("height", ph*90/100 + "px");
        			eles[i].css("width", (pw) + "px");
        		}
		    }
        	setHeight(elesArr);

        	// 图表
         	var myChart = echarts.init(document.getElementById('shenxian'));
         	var myChart2 = echarts.init(document.getElementById('roulei'));
         	var myChart3 = echarts.init(document.getElementById('liangyou'));
         	var myChart4 = echarts.init(document.getElementById('lastMonthData'));
        	var myChart5 = echarts.init(document.getElementById('halfYearData'));
        	var myChart6 = echarts.init(document.getElementById('fullYearData'));

         	// 指定图表的配置项和数据
	        var option = {
	            title: { text: '' },
	   			tooltip: {},
	            xAxis: {
	                data: ["水果","蔬菜","水产","干货","肉品"],
	                axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
	            },
	            yAxis: {
	            	axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
	            },
	            series: [{
	                name: '销量',
	                type: 'bar',
	                barWidth : 30,
	                itemStyle: {
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                        var colorList = [
		                          '#a361fe','#fe9900','#83c582','#f25e81','#4cd0fe'
		                        
		                        ];
		                        return colorList[params.dataIndex]
		                    },
		                    // label: {
		                    //     show: true,
		                    //     position: 'top',
		                    //     formatter: '{b}\n{c}'
		                    // }
		                }
		            },
	                data: [40, 20, 36, 5, 10]
	            }],
	            grid: { // 控制图的大小，调整下面这些值就可以，
		             left: '3%',
                right: '4%',
                bottom: '5%',
                top: '5%',
                containLabel: true
		         }
	        };
	        var option2 = {
	            title: { text: '' },
	   			tooltip: {},
	            xAxis: {
	                data: ["牛肉","猪肉","鸭肉","鸡肉","羊肉"],
	                axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
	            },
	            yAxis: {
	            	axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
	            },
	            series: [{
	                name: '销量',
	                type: 'bar',
	                barWidth : 30,
	                itemStyle: {
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                        var colorList = [
		                          '#a361fe','#fe9900','#83c582','#f25e81','#4cd0fe'
		                        
		                        ];
		                        return colorList[params.dataIndex]
		                    },
		                    // label: {
		                    //     show: true,
		                    //     position: 'top',
		                    //     formatter: '{b}\n{c}'
		                    // }
		                }
		            },
	                data: [90, 80, 36, 10, 100]
	            }],
	            grid: { // 控制图的大小，调整下面这些值就可以，
		             left: '3%',
                right: '4%',
                bottom: '5%',
                top: '5%',
                containLabel: true
		         }
	        };
	        var option3 = {
	            title: { text: '' },
	   			tooltip: {},
	            xAxis: {
	                data: ["花生油","菜籽油","大豆油","调和油","葵花籽油"],
	                axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
	            },
	            yAxis: {
	            	axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
	            },
	            series: [{
	                name: '销量',
	                type: 'bar',
	                barWidth : 30,
	                itemStyle: {
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                        var colorList = [
		                          '#a361fe','#fe9900','#83c582','#f25e81','#4cd0fe'
		                        
		                        ];
		                        return colorList[params.dataIndex]
		                    },
		                    // label: {
		                    //     show: true,
		                    //     position: 'top',
		                    //     formatter: '{b}\n{c}'
		                    // }
		                }
		            },
	                data: [110, 20, 36, 30, 120]
	            }],
	            grid: { // 控制图的大小，调整下面这些值就可以，
		             left: '3%',
                right: '4%',
                bottom: '5%',
                top: '5%',
                containLabel: true
		         }
	        };

	        var xAxisData = [];
			var data1 = [];
			var data2 = [];
			for (var i = 0; i < 100; i++) {
			    xAxisData.push('类目' + i);
			    data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
			    data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
			};

	        var option4 = {
			    title : {
			      
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['公司','交易数'],
			        y: 'bottom', // 'center' | 'bottom' | {number}
	                textStyle: {color: '#fff'},
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : ['1号','4号','9号','10号','16号','25号','28号'],
			            axisLabel: {
	                        show: true,
	                        textStyle: {
	                            color: '#fff'
	                        }
	                    }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel: {
	                        show: true,
	                        textStyle: {
	                            color: '#fff'
	                        }
	                    }
			        }
			    ],
			    series : [
			      
			        {
			            name:'公司',
			            type:'line',
			            smooth:true,
			            itemStyle: {normal: {areaStyle: {type: 'default'}, color: '#db811e'}},			
			            data:[10, 12, 21, 54, 260, 830, 710]
			        },
			        {
			            name:'交易数',
			            type:'line',
			            smooth:true,
			            itemStyle: {normal: {areaStyle: {type: 'default'}, color: '#4dace9'}},
			            data:[30, 182, 434, 791, 390, 330, 410]
			        }
			    ]
			};

			var option5 = {
			    title : {
			      
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['公司','交易数'],
			        y: 'bottom', // 'center' | 'bottom' | {number}
	                textStyle: {color: '#fff'},
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : ['1月份','2月份','3月份','4月份','5月份','6月份'],
			            axisLabel: {
	                        show: true,
	                        textStyle: {
	                            color: '#fff'
	                        }
	                    }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel: {
	                        show: true,
	                        textStyle: {
	                            color: '#fff'
	                        }
	                    }
			        }
			    ],
			    series : [
			      
			        {
			            name:'公司',
			            type:'line',
			            smooth:true,
			            itemStyle: {normal: {areaStyle: {type: 'default'}, color: '#db811e'}},			
			            data:[10, 12, 121, 236, 260, 830]
			        },
			        {
			            name:'交易数',
			            type:'line',
			            smooth:true,
			            itemStyle: {normal: {areaStyle: {type: 'default'}, color: '#4dace9'}},
			            data:[30, 182, 434, 591, 390, 630]
			        }
			    ]
			};

			var option6 = {
			    title : {
			      
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['公司','交易数'],
			        y: 'bottom', // 'center' | 'bottom' | {number}
	                textStyle: {color: '#fff'},
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : ['1月份','2月份','3月份','4月份','5月份','6月份','7月份','8月份','9月份','10月份','11月份','12月份'],
			            axisLabel: {
	                        show: true,
	                        textStyle: {
	                            color: '#fff'
	                        }
	                    }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel: {
	                        show: true,
	                        textStyle: {
	                            color: '#fff'
	                        }
	                    }
			        }
			    ],
			    series : [
			      
			        {
			            name:'公司',
			            type:'line',
			            smooth:true,
			            itemStyle: {normal: {areaStyle: {type: 'default'}, color: '#db811e'}},			
			            data:[10, 12, 21, 54, 260, 830, 710, 464, 323, 453, 754, 234,]
			        },
			        {
			            name:'交易数',
			            type:'line',
			            smooth:true,
			            itemStyle: {normal: {areaStyle: {type: 'default'}, color: '#4dace9'}},
			            data:[30, 182, 434, 791, 390, 330, 410, 343, 234, 455, 900, 623]
			        }
			    ]
			};



	        // 使用刚指定的配置项和数据显示图表。
	        myChart.setOption(option);
	        myChart2.setOption(option2);
	        myChart3.setOption(option3);
	        myChart4.setOption(option4);
	        myChart5.setOption(option5);
	        myChart6.setOption(option6);
	        $('.footer-text').css('font-size', '1rem') 
			$('.footer-text').css('color', '#FFFF33')
	    },
	    beforeRouteLeave (to, from, next) {
		    clearInterval(config.fsk.scroll1);
		    next();
	  	}
    }
</script>

<style>
	#fskWrapper{
		height: 100%;
		width: 100%;
	}
	.fsk-header{
		position: relative;
		height: 10%;
	}
	.fsk-header h1{
		color: #fff;
		display: inline-block;
		margin: 0;
		padding: 0;
	}
	.fsk-header .headerBtn{
		border-radius: 21px;
		height: 42px;
		width: 160px;
	}
	/**/
	.fsk-content{
		width: 98%;
		margin: 10px auto 0 auto;
		height: 87%; 
	}  
      
	/*left_topBar*/
	.left_topBar{
		height: 10%;
	}

	/*列表*/
	.food-list{
		width: 100%;
		height: 73%;
		margin-top: 15px;
		border-radius: 5px; 
	}
	.food-list .echart-head{
		background: #4e47a4;
		width: 100%;
		height: 9%;
		border-radius: 5px 5px 0 0; 
		background:rgba(255, 255, 255, 0.1);
		color: #fff;
	}
	.food-list table{
		height:85%;
		width:94%;
		margin:1% auto;
		text-align:center;
		border: 1px solid #1e3f7b;
	}
	.food-list table tr.thead td{
		font-weight: 600;
		font-size: 18px;
		color: #ff9800;
	}
	.food-list table tr td{
		height: 10%;
		color: #fcfffd;
	}
	.bottom-btns{
		width: 100%;
		height: 10%;
		margin: 0 auto; 
		margin-top: 3%;
	}
	.btns{
		width: 86%;
		height: 100%;
		margin: 0 auto;
	}
	.bottom-btns .btns div{
		display: inline-block;
		height: 78%;
		width: 22%;
		margin-left: 6%;
		background-size: 100% 100%;
		cursor: pointer;
	}
	.zs_searchBtn{
		display: inline-block;
		box-shadow: 0 0 10px 0 #7c9aa6 inset;
		padding: 0px 12px;
		border-radius: 15px;
		cursor: pointer;
		background: #2b3772;
		border: 1px solid #b4c5c5;
	}

	/*右边图表*/
	.echart-head{
		background: #4e47a4;
		width: 100%;
		height: 15%;
		border-radius: 5px 5px 0 0; 
		background:rgba(255, 255, 255, 0.2);
		color: #fff;
	}
	.infolList,.infolList1{
		padding: 4.5% 10%;
	}
	.infolList p{
		margin-bottom: 5%
	}
	.infolList1 p{
		margin-bottom: 3.5%;
		min-width: 300px;
		overflow: hidden;
	}
	.infolList1 p a{
		color: #fd9800;
	}
	.no-padding-left{
		padding-left: 0;
	}



	#fskdata_Search{
		padding: 0 30px;
	}
	.tableHead:before{
		content: "上月采购食材数据报表";
        text-shadow: black 0 1px 0;
		font-weight: 900;
        font-size: 22px;
        display: block;
        color: #FFCC33;
        height: 0;
        width: 350px;
        line-height: 40px;
        padding-left: 10px;
        border-width: 0px 60px 40px 0px;
        border-style: none solid solid;
        border-color: transparent transparent ;
	}
	.tableHead1:before{
		content: "半年采购食材数据报表";
        text-shadow: black 0 1px 0;
        font-weight: 900;
        font-size: 22px;
        display: block;
        color: #FFCC33;
        height: 0;
        width: 350px;
        line-height: 40px;
        padding-left: 10px;
        border-width: 0px 60px 40px 0px;
        border-style: none solid solid;
        border-color: transparent transparent ;
	}
	.tableHead2:before{
		content: "全年采购食材数据报表";
        font-weight: 900;
        text-shadow: black 0 1px 0;
        font-size: 22px;
        display: block;
        color: #FFCC33;
        height: 0;
        width: 350px;
        line-height: 40px;
        padding-left: 10px;
        border-width: 0px 60px 40px 0px;
        border-style: none solid solid;
        border-color: transparent transparent ;
	}
	/*#lastMonthData,#halfYearData,#fullYearData {
		border-top: 1px solid #8393bd;
	}*/

	#goodInfo_List{
		/*border: 1px solid #8393bd;*/
		height:100%;
		width: 100%;
		display: none;

	}

	#goodInfo_List .left,.middle,.right{
		height:100%;
		/*border: 1px solid #8393bd;*/
	} 

	ul{
		list-style-type: none;
		margin: 0;padding: 0;
	}
	.left .goodLogoImg{
		width:66%;height:100%;padding:15px;border-left: 1px solid #8393bd;
	}
	.left .rzImg{
		width:33.9%;height:100%;border-left: 1px solid #8393bd;border-bottom: 1px solid #8393bd;padding-left:5%;padding-top: 12%;
	}
	.left .goodInfoBox{
		width:100%;height:50%;border: 1px solid #8393bd;border-top: none;
	}

	.titleImg{
		height:8%;width:100%;border-bottom: 1px solid #8393bd;
	}
	.titleInfo{
		border: 1px solid #8393bd;padding:15px 10px;height:40.5%;border-top:none;
	}
</style>