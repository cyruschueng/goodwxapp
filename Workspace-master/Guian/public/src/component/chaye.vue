<template>
<div id="chaye" style="height: 100%;width: 100%;">
	<navBar :title="title" :btn1="btn1" :btn2="btn2" :link1="link1" :link2="link2"></navBar>
	<div class="row gaxq-content1">
    	<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 con1-left" style="padding-right: 0;">
	      	<tipsList :tips="tips"></tipsList>
	      	<div class="con1-left-bot col-xs-12 col-sm-12 col-md-12 col-lg-12 pad-tb-2" style="padding-top: 6px;">
	      		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius border-radius-5" style="height: 100%">
	      			<tipBox title="明星产品" subtitle="贵安商贸投资">
	      				<div style="width: 100%;height: 88%;">
	      					<scrollTable :itemlist="foodList" :titlelist="titlelist" v-on:showPop="showPop"></scrollTable>
	      				</div>
	      			</tipBox>  	      			
	      		</div>
	      	</div>
      	</div>      
        <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="height: 100%;padding-right: 30px;">
      		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr pad-tb-2" style="height: 50%;padding-bottom: 4px;">
      			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="height: 100%;padding-right: 0;">
      				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius border-radius-5" style="height: 100%;">
      					<tipBox title="空气温度">
	      					<div style="height: 88%;width: 100%;" id="kqwdChart"></div>
	      				</tipBox>
      				</div>
      			</div>
      			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="height: 100%;padding-right: 0;">
      				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius border-radius-5" style="height: 100%;">
      					<tipBox title="土壤温度">
	      					<div style="height: 88%;width: 100%;" id="trwdChart"></div>
	      				</tipBox>
      				</div>
      			</div>
      			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="height: 100%;padding-right: 0;">
      				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius border-radius-5" style="height: 100%;">
      					<tipBox title="光照强度">
	      					<div style="height: 88%;width: 100%;" id="gzqdChart"></div>
	      				</tipBox>
      				</div>
      			</div>
      		</div>
      		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr pad-tb-2" style="height: 50%;padding-top: 4px;">
      			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="height: 100%;padding-right: 0;">
      				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius border-radius-5" style="height: 100%;">
      					<tipBox title="空气湿度">
	      					<div style="height: 88%;width: 100%;" id="gqxdChart"></div>
	      				</tipBox>
      				</div>
      			</div>
      			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="height: 100%;padding-right: 0;">
      				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius border-radius-5" style="height: 100%;">
      					<tipBox title="土壤湿度">
	      					<div style="height: 88%;width: 100%;" id="trsdChart"></div>
	      				</tipBox>
      				</div>
      			</div>
      			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="height: 100%;padding-right: 0;">
      				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius border-radius-5" style="height: 100%;">
      					<tipBox title="二氧化碳">
	      					<div style="height: 88%;width: 100%;" id="co2Chart"></div>
	      				</tipBox>
      				</div>
      			</div>
      		</div>
        </div>
    </div>
    <div class="row gaxq-content2" style="height: 40%;">
    	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pad-tb-2" style="height: 100%;">
    		<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 con1-right con2 con2-1">
    			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius border-radius-5" style="height: 100%;">
    				<tipBox title="全年追溯数据对比">
	      				<div style="height: 88%;width: 100%" id="chayeChart1">               
                		</div>
      				</tipBox> 
    			</div>				
			</div>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 con1-right con2 con2-3">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius border-radius-5" style="height: 100%;"> 
			  		<tipBox title="溯源电商交易图">
			  			<div style="height: 88%;width: 100%" id="chayeChart2">               
                		</div>
		                <!-- <div class="mapcon guianmap currentmap" id="guianpic_wrapper">
		                  <div class="mapwrapper clearfix" style="padding: 0;">
		                    <div style="float:left;width: 100%;height: 100%;">
		                      <img src="lib/img/chaye-chart2.png" alt="" class="guianpic">
		                    </div>             
		                  </div>
		                </div> -->
	              	</tipBox>				
    			</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 con1-right con2 con2-4">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius border-radius-5" style="height: 100%;">
					<tipBox title="实时访问数据">
	      				<div id="scrollData">
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
							<ul id="scrollDataList1">
								<li id="content_li" v-for="item in ssData">
									<span class="good">{{item.date}}</span> 
									<span class="cy-search">{{item.time}}</span>
									<span class="search">查询</span>
								</li>					
							</ul>
						</div>
      				</tipBox>    				
    			</div>				
			</div>
    	</div>		
    </div>
    <footBox :txt="foottxt"></footBox>
    <popup v-on:close="closepop">
	  <div class="dataSource">
		  <div style="width: 100%;height: 50%;">
		  	<div style="height: 15%;width: 100%;">
		  		<img src="lib/img/tcc-title1.png" alt="" style="height: 100%;width: 65%;">
		  	</div>
		  	<div style="height: 85%;width: 100%;" class="clearfix">
		  		<div class="pro-img" style="padding:3%;">
		  	  		<img :src="good.imgurl" alt="" style="width: 100%;height: 100%;">
		  	  	</div>
			  	<div class="yrz-img">
			  		<img src="lib/img/yrz.png" alt="" style="width: 100%;height: 100%;">
			  	</div> 
		  	</div>	  	  	 	
		  </div>
		  <div style="width: 100%;height: 50%;">
		  	<div class="goodeInfo">	          
	          <ul class="infoItem" style="border-top: none;">
		          <li>商品名称:{{good.name}}</li>
		          <li>品牌:{{good.brand}}</li>
		          <li>批次号:{{good.code}}</li>
		          <li>生产日期:{{good.productionDate}}</li>
		          <li>保质期:{{good.Qualitydate}}</li>
		          <li>追溯机构认证代码</li>
		          <li>{{good.Authentication}}</li>
		          <li>合作单位:贵州贵安商贸投资有限公司</li>
		          <li>技术支持:成都源溯优品科技有限公司</li>
	          </ul>
	        </div>
		  </div>        
      </div>
      <div class="sellingPiont" style="height: 100%;overflow: hidden;">
        <div class="f_ul">
        	<div style="width: 100%;height: 50%">
        		<div style="width: 100%;height: 15%;">
        			<img src="lib/img/title-scjd.png" alt="" style="height: 100%;">
        		</div>
    			<ul id="productionAdd" style="height: 85%;">
		          <li class='f_li'></li>
		          <li>经营商：{{productionAdd.Distribution}}</li>
		          <li>经营户：{{productionAdd.households}}</li>
		          <li>蔬菜抽检合格户：{{productionAdd.code}}</li>
		          <li>检验日期：{{productionAdd.date}}</li>
		          <li>地块信息：{{productionAdd.addinfo}}</li>
		          <li>农场信息：{{productionAdd.forminfo}}</li>
	          	</ul>
        	</div>
        	<div style="width: 100%;height: 50%;padding-top: 3%;">
        		<div style="width: 100%;height: 15%;">
        			<img src="lib/img/title-pszx.png" alt="" style="height: 100%;">
        		</div>
        		<ul id="logistics" style="height: 85%;">
		          <li class='f_li'></li>
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
        <div class="s_ul">
        	<div style="width: 100%;height: 50%;">
        		<div style="width: 100%;height: 15%;">
        			<img src="lib/img/title-xszx.png" alt="" style="height: 100%;">
        		</div>
        		<ul id="sell" style="height: 85%;">
		          <li class='f_li'></li>
	              <li>零销商:{{sell.Retailer}}</li>
		          <li>经营户:{{sell.households}}</li>
		          <li>进场日期:{{sell.date}}</li>
		          <li>摊位号:{{sell.code}}</li>
	          	</ul>
        	</div>
        	<div style="width: 100%;height: 50%;padding-top: 3%;">
        		<div style="width: 100%;height: 15%;">
        			<img src="lib/img/title-sjzc.png" alt="" style="height: 100%;">
        		</div>
        		<ul id="store" style="height: 85%;">
		          <li class='f_li'></li>
		          <li>名称:{{store.name}}</li>
		          <li>联系人:{{store.person}}</li>
		          <li>联系电话:{{store.phone}}</li>
		          <li>联系地址:{{store.addr}}</li>
	          	</ul>
        	</div>
        </div>
      </div>
    </popup>
</div>
</template>

<script>
// import echarts from 'echarts'
import navBar from './navBar.vue'
import tipBox from './tipBox.vue'
import popup from './popup.vue'
import footBox from './footBox.vue'
import tipsList from './tipsList.vue'
import scrollTable from './scrollTable.vue'

export default {
	data() {
		return {
		  title:'贵安新区羊艾茶场质量安全追溯系统',
		  btn1:'lib/img/togaxq-btn.png',
		  btn2:'lib/img/tofushikang-btn.png',
		  link1: '/gaxq',
  		  link2: '/fskPage',
		  copList: [
				{'bussnessName':'贵安商贸投资','proNum':19},
				{'bussnessName':'贵安富源超市','proNum':365},
				{'bussnessName':'贵安白泽云图','proNum':136},
				{'bussnessName':'贵安云溯科技','proNum':98},
				{'bussnessName':'贵安羊艾毛峰','proNum':9},
				{'bussnessName':'贵安慧贸通','proNum':88},
				{'bussnessName':'马场农贸市场','proNum':62},
				{'bussnessName':'贵州粮油平台','proNum':34},
				{'bussnessName':'贵州新业网','proNum':32},
				{'bussnessName':'贵州淘菜网','proNum':16}
		  ],
		  foodList:[
		
		  ],
		  titlelist: ['食材名称', '下单时间', '送货时间', '是否抽检', '追溯查询'],
		  good: {},
		  productionAdd: {},
		  logistics: {},
		  sell: {},
		  store: {},
		  ssData: [],
		  foottxt: 'Copyright  2016.贵州贵安商贸投资有限公司',
		  tips: [
		  	{
		  		img: 'lib/img/cy-tips1.png',
		  		num: '12,874'
		  	},
		  	{
		  		img: 'lib/img/cy-tips2.png',
		  		num: '14,114'
		  	},
		  	{
		  		img: 'lib/img/cy-tips3.png',
		  		num: '13,324'
		  	},
		  	{
		  		img: 'lib/img/cy-tips4.png',
		  		num: '11,254'
		  	}
		  ],
		  srollItemID: 0
		}
	},
	components: { navBar, tipBox, popup, footBox, tipsList, scrollTable },
	methods: {
		closepop: function(){
		  config.chaye.scrollData = document.getElementById("scrollData");
		    config.chaye.scrollDataList1 = document.getElementById("scrollDataList1");

		    config.chaye.scroll1 = setInterval(function(){
		      Marquee(config.chaye.scrollData, config.chaye.scrollDataList1)
		    }, 30);
	  	},
		showPop: function(id){
			var vm = this
	  		$.ajax({
	  			url: '../getInfo?folder=cdgoods&file=goods_'+id,
	  			success: function(res){
	  				vm.good = res
			  		vm.productionAdd = vm.good.productionAdd
			  		vm.logistics = vm.good.logistics
			  		vm.sell = vm.good.sell
			  		vm.store = vm.good.store
			  		config.gaxq.flag = false;
			  		showMask()
			        $("#popup").stop().animate({
			          height: "toggle",
			          width: "toggle"
			        })
			        clearInterval(config.gaxq.scroll1)			
					console.log(res.data)
	  			}
	  		})
		}
	},
	mounted (){		
		var vm = this

		$.ajax({
			url: '../getInfo?filetype=del_data',
			success: function(d){
				console.log(d)
				var kqwdChart = echarts.init(document.getElementById('kqwdChart'))
				var trwdChart = echarts.init(document.getElementById('trwdChart'))
				var gzqdChart = echarts.init(document.getElementById('gzqdChart'))
				var gqxdChart = echarts.init(document.getElementById('gqxdChart'))
				var trsdChart = echarts.init(document.getElementById('trsdChart'))
				var co2Chart = echarts.init(document.getElementById('co2Chart'))

				// var kqwdChartData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				// var trwdChartData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				// var gzqdChartData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				// var gqxdChartData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				// var trsdChartData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				// var co2ChartData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

				var smChartData = {
					'ts': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					'tw': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					'gq': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					'co': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					'ks': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					'kw': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				}

				for(var i = 0, l = d.length; i < l; i++){
					for(var j = 0, ll = d[i].length-1; j < ll; j++){
						smChartData[d[i][j].key][+d[i][j].time.split('-')[2]] = d[i][j].eve.split('.')[0]
					}					
					// trsdChartData[+d[i][0].time.split('-')[2]] = d[i][0].eve.split('.')[0]
					// trwdChartData[+d[i][1].time.split('-')[2]] = d[i][1].eve.split('.')[0]
					// gzqdChartData[+d[i][2].time.split('-')[2]] = d[i][2].eve.split('.')[0]
					// co2ChartData[+d[i][3].time.split('-')[2]] = d[i][3].eve.split('.')[0]
					// gqxdChartData[+d[i][5].time.split('-')[2]] = d[i][5].eve.split('.')[0]
					// kqwdChartData[+d[i][4].time.split('-')[2]] = d[i][4].eve.split('.')[0]
				}

				var kqwdChartData = smChartData.kw
				var trwdChartData = smChartData.tw
				var gzqdChartData = smChartData.gq
				var gqxdChartData = smChartData.ks
				var trsdChartData = smChartData.ts
				var co2ChartData = smChartData.co

				kqwdChart.setOption({
				    xAxis:  {
				        type: 'category',
				        boundaryGap: false,
				        data: ['0','','','','4','','','','8','','','','12','','','','16','','','','20','','','','24'],
				        axisLine: {
				            lineStyle: {
				                color: '#fff'
				            }
				          }
				    },
				    yAxis: {
				        type: 'value',
				        axisLabel: {
				            formatter: '{value}°C'
				        },
				          axisLine: {
				            lineStyle: {
				                color: '#fff'
				            }
				          }
				    },
				    series: [
				        {
				            name:'最高气温',
				            type:'line',
				            data:kqwdChartData,
				            // markPoint: {
				            //     data: [
				            //         {type: 'max', name: '最大值'}
				            //     ],
				            //     symbolSize: 10
				            // },
				            itemStyle: {
			                    normal: {
			                      color: '#40e0d0'
			                    }
			                  }
				        }
				    ],
				    grid: { // 控制图的大小，调整下面这些值就可以，
			             x: 40,
			             // y: 45,
			             y2:35,
			             x2: 10,
			             top: '10%'
			         },
				})
				trwdChart.setOption({
				    xAxis:  {
				        type: 'category',
				        boundaryGap: false,
				        data: ['0','','','','4','','','','8','','','','12','','','','16','','','','20','','','','24'],
				        axisLine: {
				            lineStyle: {
				                color: '#fff'
				            }
				          }
				    },
				    yAxis: {
				        type: 'value',
				        axisLabel: {
				            formatter: '{value}°C'
				        },
				          axisLine: {
				            lineStyle: {
				                color: '#fff'
				            }
				          }
				    },
				    series: [
				        {
				            name:'最高气温',
				            type:'line',
				            data:trwdChartData,
				            // markPoint: {
				            //     data: [
				            //         {type: 'max', name: '最大值'}
				            //     ],
				            //     symbolSize: 30
				            // },
				            itemStyle: {
			                    normal: {
			                      color: '#40e0d0'
			                    }
			                  }
				        }
				    ],
				    grid: { // 控制图的大小，调整下面这些值就可以，
			             x: 40,
			             // y: 45,
			             y2:35,
			             x2: 10,
			             top: '10%'
			         },
				})
				gzqdChart.setOption({
				    xAxis:  {
				        type: 'category',
				        boundaryGap: false,
				        data: ['0','','','','4','','','','8','','','','12','','','','16','','','','20','','','','24'],
				        axisLine: {
				            lineStyle: {
				                color: '#fff'
				            }
				          }
				    },
				    yAxis: {
				        type: 'value',
				        axisLabel: {
				            formatter: '{value}lux'
				        },
				          axisLine: {
				            lineStyle: {
				                color: '#fff'
				            }
				          }
				    },
				    series: [
				        {
				            name:'最高气温',
				            type:'line',
				            data:gzqdChartData,
				            // markPoint: {
				            //     data: [
				            //         {type: 'max', name: '最大值'}
				            //     ],
				            //     symbolSize: 30
				            // },
				            itemStyle: {
			                    normal: {
			                      color: '#40e0d0'
			                    }
			                  }
				        }
				    ],
				    grid: { // 控制图的大小，调整下面这些值就可以，
			             x: 70,
			             // y: 45,
			             y2:35,
			             x2: 10,
			             top: '10%'
			         },
				})
				gqxdChart.setOption({
				    xAxis:  {
				        type: 'category',
				        boundaryGap: false,
				        data: ['0','','','','4','','','','8','','','','12','','','','16','','','','20','','','','24'],
				        axisLine: {
				            lineStyle: {
				                color: '#fff'
				            }
			          	}
				    },
				    yAxis: {
				        type: 'value',
				        axisLabel: {
				            formatter: '{value}%'
				        },
			          	axisLine: {
				            lineStyle: {
				                color: '#fff'
				            }
			          	}
				    },
				    series: [
				        {
				            name:'最高气温',
				            type:'line',
				            data:gqxdChartData,
				            // markPoint: {
				            //     data: [
				            //         {type: 'max', name: '最大值'}
				            //     ],
				            //     symbolSize: 30
				            // },
				            itemStyle: {
			                    normal: {
			                      color: '#40e0d0'
			                    }
		                  	}
				        }
				    ],
				    grid: { // 控制图的大小，调整下面这些值就可以，
			             x: 40,
			             // y: 45,
			             y2:35,
			             x2: 10,
			             top: '10%'
		         	},
				})
				trsdChart.setOption({
				    xAxis:  {
				        type: 'category',
				        boundaryGap: false,
				        data: ['0','','','','4','','','','8','','','','12','','','','16','','','','20','','','','24'],
				        axisLine: {
				            lineStyle: {
				                color: '#fff'
				            }
				          }
				    },
				    yAxis: {
				        type: 'value',
				        axisLabel: {
				            formatter: '{value}%'
				        },
				          axisLine: {
				            lineStyle: {
				                color: '#fff'
				            }
				          }
				    },
				    series: [
				        {
				            name:'最高气温',
				            type:'line',
				            data:trsdChartData,
				            // markPoint: {
				            //     data: [
				            //         {type: 'max', name: '最大值'}
				            //     ],
				            //     symbolSize: 30
				            // },
				            itemStyle: {
			                    normal: {
			                      color: '#40e0d0'
			                    }
			                  }
				        }
				    ],
				    grid: { // 控制图的大小，调整下面这些值就可以，
			             x: 40,
			             // y: 45,
			             y2:35,
			             x2: 10,
			             top: '10%'
			         },
				})
				co2Chart.setOption({
				    xAxis:  {
				        type: 'category',
				        boundaryGap: false,
				        data: ['0','','','','4','','','','8','','','','12','','','','16','','','','20','','','','24'],
				        axisLine: {
				            lineStyle: {
				                color: '#fff'
				            }
				          }
				    },
				    yAxis: {
				        type: 'value',
				        axisLabel: {
				            formatter: '{value}PPM'
				        },
				          axisLine: {
				            lineStyle: {
				                color: '#fff'
				            }
				          }
				    },
				    series: [
				        {
				            name:'最高气温',
				            type:'line',
				            data:co2ChartData,
				            // markPoint: {
				            //     data: [
				            //         {type: 'max', name: '最大值'}
				            //     ],
				            //     symbolSize: 30
				            // },
				            itemStyle: {
			                    normal: {
			                      color: '#40e0d0'
			                    }
			                  }
				        }
				    ],
				    grid: { // 控制图的大小，调整下面这些值就可以，
			             x: 60,
			             // y: 45,
			             y2:35,
			             x2: 10,
			             top: '10%'
			         },
				})
			}
		})






		var chayeChart1 = echarts.init(document.getElementById('chayeChart1'))
		var chayeChart2 = echarts.init(document.getElementById('chayeChart2'))

		$.ajax({
			url: '../getInfo?folder=teagoods&file=goodslist',
			success: function(res){
				vm.foodList = res.aadata
				console.log(res.data)
			}
		})
			
		chayeChart1.setOption({
			color: ['#3398DB'],
	      tooltip : {
	          trigger: 'axis',
	          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	          }
	      },
	      grid: {
	          left: '3%',
	          right: '4%',
	          bottom: '3%',
	          containLabel: true
	      },
	      xAxis : [
	          {
	              type : 'category',
	              data : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	              axisLine: {
	                lineStyle: {
	                    color: '#fff'
	                }
	              }
	          }
	      ],
	      yAxis : [
	          {
	              type : 'value',
	              axisLine: {
	                lineStyle: {
	                    color: '#fff'
	                }
	              }
	          }
	      ],
	      series : [
	          {
	              name:'直接访问',
	              type:'bar',
	              barWidth: '60%',
	              data:[276, 152, 200, 334, 390, 222, 111, 124, 333, 234, 245, 298],
	              barWidth:config.barWidth,
	              itemStyle: {
                  normal: {
                      color: function(value) {
                        switch (value.dataIndex)
                        {
                          case 0:
                            return '#e7751f'
                            break;
                          case 1:
                            return '#f82471'
                            break;
                          case 2:
                            return '#2caa1b'
                            break;
                          case 3:
                            return '#4daee3'
                            break;
                    	  case 4:
                            return '#f3cb1c'
                            break;
                          case 5:
                            return '#d4b2d3'
                            break;
                          case 6:
                            return '#1c65cb'
                            break;
                          case 7:
                            return '#e48eb3'
                            break;
                          case 8:
                            return '#3e1a6c'
                            break;
                    	  case 9:
                            return '#a2d355'
                            break;
                          case 10:
                            return '#d1b4d0'
                            break;
                          case 11:
                            return '#861ba5'
                            break;
                          case 12:
                            return '#196910'
                            break;
                        }
                      }
                  }
              	}
	          }
	      ]
		})
		config.charts.sydsjyChart.series[0].data = [100, 250, 150, 400, 500, 400, 150, 250, 200, 300, 400, 500]
		// config.charts.sydsjyChart.barWidth = 10
    	config.charts.sydsjyChart.series[1].data = [150, 250, 150, 250, 300, 250, 150, 500, 400, 150, 250, 150]
		chayeChart2.setOption(config.charts.sydsjyChart)
		
		for(var i = 0; i < 20; i++){
			var fdate = {
				'date': new Date().Format("yyyy-MM-dd"),
				'time': new Date().Format("hh:mm")
			}
			vm.ssData.push(fdate)
		}		
		config.chaye.scrollData = document.getElementById("scrollData");
	    config.chaye.scrollDataList1 = document.getElementById("scrollDataList1");

	    config.chaye.scroll1 = setInterval(function(){
	      Marquee(config.chaye.scrollData, config.chaye.scrollDataList1)
	    }, 20);
	    scrollData.onmouseover = function() {
	      clearInterval(config.chaye.scroll1)
	    };
	    scrollData.onmouseout = function() {
	      config.chaye.scroll1 = setInterval(function(){
	        Marquee(config.chaye.scrollData, config.chaye.scrollDataList1)
	      }, 20);
	    };
	    $('.footer-text').css('font-size', '1rem') 
		$('.footer-text').css('color', '#FFFF33') 
	},
	beforeRouteLeave (to, from, next) {
      clearInterval(config.chaye.scroll1)
      next()
    }
}

</script>

<style>

</style>