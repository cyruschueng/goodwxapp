<template>
  <div id="gaxq" style="height: 100%;width: 100%;">
  	<navBar :title="title" :btn1="btn1" :btn2="btn2" :link1="link1" :link2="link2"></navBar>
    <div class="row gaxq-content1">
    	<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 con1-left" style="padding-right: 0;">
	      	<tipsList :tips="tips"></tipsList>
	      	<div class="con1-left-bot-left chart1 col-xs-8 col-sm-8 col-md-8 col-lg-8 pad-tb-2" style="padding-top: 6px;">
	      		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius border-radius-5" style="height: 100%">
	      			<tipBox title="追溯明星区域统计数据">
	      			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="height: 88%" id="chart1">
	      			
	      			</div>
	      		</tipBox>	
	      		</div>	
	      		      		
	      	</div>
	      	<div class="con1-left-bot-right col-xs-4 col-sm-4 col-md-4 col-lg-4 pad-tb-2" style="padding-left: 0;padding-top: 6px;">
	      		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius border-radius-5" style="height: 100%">
	      			<tipBox title="追溯明星产品">
	      				<div id="scrollPro" style="height: 88%;">
							<ul id="scrollProList1">
								<li id="content_li" v-for="item in proList">
									<span class="good">{{item.ProductName}}</span> 
									<span class="search" @click="showPop(item.Id)">追溯查询</span>
								</li>					
							</ul>
							<ul id="scrollProList2">
								<li id="content_li" v-for="item in proList">
									<span class="good">{{item.ProductName}}</span> 
									<span class="search" @click="showPop(item.Id)">追溯查询</span>
								</li>
							</ul>
						</div>
	      			</tipBox>
	      		</div>	      		
	      	</div>
      	</div>
      
        <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="height: 100%;padding-right: 30px;">
      		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius border-radius-5" style="height: 100%;position: relative;">
      			<tipBox title="成都地图">
      				<div class="mapcon guianmap currentmap" id="guianpic_wrapper">
						<div class="mapwrapper clearfix">
							<div style="float:left;width: 80%;height: 100%;padding-left: 10%;">
								<img src="lib/img/chengdumap.png" alt="" class="guianpic">
							</div>
							<div style="float:left;width: 20%;height: 100%;">
								<div style="width: 100%;height: 70%;"></div>
								<div style="width: 100%;height: 30%;padding-left:0.4rem;">
									<!-- <ul style="width: 100%;height: 100%;">
										<li style="height: 20%;font-size: 0.4rem;">成都餐饮300家</li>
										<li style="height: 20%;font-size: 0.4rem;">学校食堂188家</li>
										<li style="height: 20%;font-size: 0.4rem;">社区门店XXX家</li>
										<li style="height: 20%;font-size: 0.4rem;">农贸市场XXX家</li>
									</ul> -->
								</div>								
							</div>							
						</div>
					</div>
      			</tipBox>
				
      		</div>
        </div>
    </div>
    <div class="row gaxq-content2" style="height: 40%;">
    	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pad-tb-2" style="height: 100%;">
    		<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 con1-right con2 con2-1">
    			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius border-radius-5" style="height: 100%;">
    				<tipBox title="追溯明星企业">
	      				<div id="scrollCop" style="height: 88%;padding-right:15px;">
							<ul id="scrollCopList1">
								<li id="content_li" v-for="item in copList">
									<span class="good">{{item.bussnessName}}</span> 
									<span style="float: right;margin-right: 20px;">追溯商品:<span style="color: #FF9933;">{{item.proNum}}</span></span>
								</li>					
							</ul>
							<ul id="scrollCopList2">
								<li id="content_li" v-for="item in copList">
									<span class="good">{{item.bussnessName}}</span> 
									<span style="float: right;margin-right: 20px;">追溯商品:<span style="color: #FF9933;">{{item.proNum}}</span></span>
								</li>
							</ul>
							<ul class="scroll-box">
								<li id="content_li" v-for="item in copList">
									<span class="good">{{item.bussnessName}}</span> 
									<span style="float: right;margin-right: 20px;">追溯商品:<span style="color: #FF9933;">{{item.proNum}}</span></span>
								</li>
							</ul>
							<ul class="scroll-box">
								<li id="content_li" v-for="item in copList">
									<span class="good">{{item.bussnessName}}</span> 
									<span style="float: right;margin-right: 20px;">追溯商品:<span style="color: #FF9933;">{{item.proNum}}</span></span>
								</li>
							</ul>
						</div>
	      			</tipBox> 				
    			</div>				
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 con1-right con2 con2-2" style="padding-right: 0">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius border-radius-5" style="height: 100%">
	      			<tipBox title="重点追溯产品">
	      				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr padd-bot-05r" style="height: 88%;" id="chart2"> 

    					</div>
	      			</tipBox>
	      		</div>				
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 con1-right con2 con2-3" style="padding-right: 0">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius height100">
	              <tipBox title="溯源电商交易图">
	              	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr" style="height: 88%;" id="chengduchart3"> 

					</div>
	                <!-- <div class="mapcon guianmap currentmap" id="guianpic_wrapper">
	                  <div class="mapwrapper clearfix" style="padding: 0;">
	                    <div style="float:left;width: 100%;height: 100%;">
	                      <img src="lib/img/index-chart4.png" alt="" class="guianpic">
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


<script type="text/javascript">
// import echarts from 'echarts'
import navBar from './navBar.vue'
import tipBox from './tipBox.vue'
import footBox from './footBox.vue'
import popup from './popup.vue'
import tipsList from './tipsList.vue'

export default {
  data () {
    return {
      proList:[
					
	  ],
	  copList:[
		
	  ],
	  good: {},
	  productionAdd: {},
	  logistics: {},
	  sell: {},
	  store: {},
	  title:'成都重要产品追溯大数据云平台',
	  btn1:'lib/img/tochaye-btn.png',
	  btn2:'lib/img/tofushikang-btn.png',
	  link1: '/chaye',
	  link2: '/fskPage',
  	  ssData: [],
  	  foottxt: 'Copyright  2016.成都源溯优品科技有限公司',
  	  tips: [
	  	{
	  		img: 'lib/img/gaxq1.png',
	  		num: '12,234'
	  	},
	  	{
	  		img: 'lib/img/gaxq2.png',
	  		num: '15,124'
	  	},
	  	{
	  		img: 'lib/img/gaxq3.png',
	  		num: '16,154'
	  	},
	  	{
	  		img: 'lib/img/gaxq4.png',
	  		num: '15,224'
	  	}
	  ]
    }
  },
  methods: {
  	closepop: function(){
	  config.gaxq.scrollPro = document.getElementById("scrollPro");
      config.gaxq.scrollProList1 = document.getElementById("scrollProList1");
      config.gaxq.flag = true;
      config.gaxq.scroll1 = setInterval(function(){
        Marquee(config.gaxq.scrollPro,config.gaxq.scrollProList1)
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
  components: { navBar, tipBox, footBox, popup, tipsList },
  mounted (){
  	var vm = this
  	for(var i = 0; i < 20; i++){
		var fdate = {
			'date': new Date().Format("yyyy-MM-dd"),
			'time': new Date().Format("hh:mm")
		}
		vm.ssData.push(fdate)
	}	
  	setmiddle([$('.c-text-t'), $('.c-text-b')])
  	$.ajax({
  		url: '../getInfo?folder=cdgoods&file=bussness',
  		success: function(res){
  			vm.copList = res.aadata
  			vm.proList = res.aamany
			console.log(vm.copList)
  		}
  	})
  	// $.ajax({
  	// 	url: '../getInfo?folder=cdgoods&file=goodslist',
  	// 	success: function(res){
  	// 		vm.proList = res.aadata
			// console.log(vm.proList)
  	// 	}
  	// })
    // 基于准备好的dom，初始化echarts实例
	var Chart1 = echarts.init(document.getElementById('chart1'));
	var Chart2 = echarts.init(document.getElementById('chart2'));
	var chengduchart3 = echarts.init(document.getElementById('chengduchart3'));
	// var Chart4 = echarts.init(document.getElementById('chart4'));
	// 绘制图表
	Chart1.setOption({
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
        	data:['企业数量','追溯查询次数'],
        	orient: 'horizontal',
          	x: 'center',
          	y: 'top',
          	textStyle: {
            	color: '#ffffff'
          	}
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '4%',
	        top: '8%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : ['都江堰','大邑','彭州','金堂'],
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
	            name:'企业数量',
	            type:'bar',
	            barWidth:config.barWidth,
	            data:[245, 104, 301, 188],
	            itemStyle: {
                    normal: {
                      color: '#e7751f'
                    }
                  }
	        },
	        {
	            name:'追溯查询次数',
	            type:'bar',
	            barWidth:config.barWidth,
	            data:[266, 133, 155, 320],
	            itemStyle: {
                    normal: {
                      color: '#4daee3'
                    }
                  }
	        }
	    ]
	});
	Chart2.setOption({
		legend: {
	          orient: 'horizontal',
	          x: 'center',
	          y: 'top',
	          data:['跨境电商','食用农产品','食品', '农业生产资料', '危险品', '特种设备', '药品'],
	          textStyle: {
	            color: '#ffffff'
	          },
	          itemWidth: 12,
	          itemHeight: 8,
	          itemGap: 5
	      },
	      series: [
	          {
	              name:'访问来源',
	              type:'pie',
	              radius: ['40%', '55%'],
	              labelLine:{
	                textStyle: {
	                  color: '#ffffff'
	                }
	              },
	              label: {
	                textStyle: {
	                  color: '#ffffff'
	                }
	              },
	              data:[
	                  {value:335, name:'跨境电商',itemStyle: {
	                    normal: {
	                      color: '#f3cb1c'
	                    }
	                  }},
	                  {value:310, name:'食用农产品',itemStyle: {
	                    normal: {
	                      color: '#d4b2d3'
	                    }
	                  }},
	                  {value:234, name:'食品',itemStyle: {
	                    normal: {
	                      color: '#99FFFF'
	                    }
	                  }},
	                  {value:234, name:'农业生产资料',itemStyle: {
	                    normal: {
	                      color: '#a2d355'
	                    }
	                  }},
	                  {value:0, name:'危险品',itemStyle: {
	                    normal: {
	                      color: '#CCCCCC',
	                      label: {
					            show: false
					        },
					        labelLine: {
					            show: false
					        }
	                    }
	                  }},
	                  {value:0, name:'特种设备',itemStyle: {
	                    normal: {
	                      color: '#CCCCCC',
	                      label: {
					            show: false
					        },
					        labelLine: {
					            show: false
					        }
	                    }
	                  }},
	                  {value:0, name:'药品',itemStyle: {
	                    normal: {
	                      color: '#CCCCCC',
	                      label: {
					            show: false
					        },
					        labelLine: {
					            show: false
					        }
	                    }
	                  }}
	              ]
	          }
	      ]
	})
	config.charts.sydsjyChart.series[0].data = [100, 250, 150, 400, 500, 250, 150, 250, 150, 300, 400, 500]
	// config.charts.sydsjyChart.barWidth = 10
	config.charts.sydsjyChart.series[1].data = [150, 250, 300, 400, 300, 250, 150, 300, 250, 150, 250, 150]
	chengduchart3.setOption(config.charts.sydsjyChart)
	// $.get('lib/js/beijing.json', function (beijingJson) {
	//     echarts.registerMap('beijing', beijingJson);
	//     Chart4.setOption({
	//         series: [{
	//             type: 'map',
	//             map: 'beijing'
	//         }]
	//     });
	// });

	//文字滚动1
    config.gaxq.scrollPro = document.getElementById("scrollPro");
    config.gaxq.scrollProList2 = document.getElementById("scrollProList2");
    config.gaxq.scrollProList1 = document.getElementById("scrollProList1");

    config.gaxq.scroll1 = setInterval(function(){
      Marquee(config.gaxq.scrollPro, config.gaxq.scrollProList1)
    }, 30);
    scrollPro.onmouseover = function() {
      clearInterval(config.gaxq.scroll1)
    };
    scrollPro.onmouseout = function() {
      if(config.gaxq.flag) {
        config.gaxq.scroll1 = setInterval(function(){
          Marquee(config.gaxq.scrollPro, config.gaxq.scrollProList1)
        }, 30);
      }   
    };  

    //文字滚动2
    config.gaxq.scrollCop = document.getElementById("scrollCop");
    config.gaxq.scrollCopList1 = document.getElementById("scrollCopList1");
    config.gaxq.scrollCopList2 = document.getElementById("scrollCopList2");

    config.gaxq.scroll2 = setInterval(function(){
      Marquee(config.gaxq.scrollCop, config.gaxq.scrollCopList1)
    }, 30);
    scrollCop.onmouseover = function() {
      clearInterval(config.gaxq.scroll2)
    };
    scrollCop.onmouseout = function() {
      config.gaxq.scroll2 = setInterval(function(){
        Marquee(config.gaxq.scrollCop, config.gaxq.scrollCopList1)
      }, 30);
    };
    //文字滚动3
    config.gaxq.scrollData = document.getElementById("scrollData");
    config.gaxq.scrollDataList1 = document.getElementById("scrollDataList1");
    config.gaxq.scrollDataList2 = document.getElementById("scrollDataList2");

    config.gaxq.scroll3 = setInterval(function(){
      Marquee(config.gaxq.scrollData, config.gaxq.scrollDataList1)
    }, 30);
    scrollData.onmouseover = function() {
      clearInterval(config.gaxq.scroll3)
    };
    scrollData.onmouseout = function() {
      config.gaxq.scroll3 = setInterval(function(){
        Marquee(config.gaxq.scrollData, config.gaxq.scrollDataList1)
      }, 30);
    };  
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(config.gaxq.scroll1)
    clearInterval(config.gaxq.scroll2)
    clearInterval(config.gaxq.scroll3)
    next()
  }
}
</script>
<style>
.mapwrapper div p{
	color: #ffffff;
}
</style>