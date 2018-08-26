<template>
  <div style="width: 100%;height: 100%;" id="indexPage">
   <navBar :title="title" :btn1="btn1" :btn2="btn2" :link1="link1" :link2="link2"></navBar>
   <div class="row index-content1">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 height100">
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 height100">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius height100">
              <tipBox title="追溯体系对比">
                <div style="height: 88%;width: 100%" id="indexChart1">
                
                </div>
              </tipBox>
            </div>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 no-padding-lr height100">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius height100">
              <tipBox title="全国地图">                
                <div class="mapcon guianmap currentmap" id="guianpic_wrapper">
                  <div class="mapwrapper clearfix">
                    <div style="float:left;width: 80%;height: 100%;padding-left: 10%;">
                      <img src="lib/img/chinamap.png" alt="" class="guianpic">
                    </div>
                    <div style="float:left;width: 20%;height: 100%;">
                      <div style="width: 100%;height: 70%;"></div>
                      <div style="width: 100%;height: 30%;padding-left:0.4rem;">
                        <!-- <ul style="width: 100%;height: 100%;" class="chinamap-ul">
                          <li style="height: 20%;font-size: 0.4rem;" class="chinamap-l1">商务部肉菜流通城市</li>
                          <li style="height: 20%;font-size: 0.4rem;" class="chinamap-l2">已展开追溯城市</li>
                        </ul> -->
                      </div>                
                    </div>              
                  </div>
                </div>
              </tipBox>
            </div>
          </div>
          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 height100">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr" style="height: 2%;"></div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr border-radius-5" style="height: 22%; position: relative;border: 1px solid rgba(255,255,255,0.1);">
            <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr border-radius-5 index-time-box" style="height: 22%; position: relative;"> -->
              <div class="center-top-position center-txt" style="z-index: 2;top: -0.4rem;background-color: #2a48a4;width: 50%;font-size: 0.6rem;">数据采集时间</div>
              <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 no-padding-lr height100"></div>
              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 no-padding-lr height100 center-txt">
                <span class="txt-middle date-year text-shadow-2" style="font-weight: 900;">{{datetime.year}}</span>
              </div>
              <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 no-padding-lr height100 center-txt">
                <span class="txt-middle date-span text-shadow-2" style="font-weight: 900;"></span>
              </div>
              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 no-padding-lr height100 center-txt">
                <span class="txt-middle date-month text-shadow-2" style="font-weight: 900;">{{datetime.month}}</span>
              </div>
              <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 no-padding-lr height100 center-txt">
                <span class="txt-middle date-span text-shadow-2" style="font-weight: 900;"></span>
              </div>
              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 no-padding-lr height100 center-txt">
                <span class="txt-middle date-day text-shadow-2" style="font-weight: 900;">{{datetime.day}}</span>
              </div>
              <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 no-padding-lr height100"></div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr" style="height: 2%;"></div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius" style="height: 74%;">
              <tipBox title="重要追溯企业">
                <div id="scrollCop" style="height: 88%;">
                  <ul id="scrollCopList">
                    <li id="content_li" v-for="item in copList">
                      <span class="good" style="width: 90%;display: inline-block;">{{item.bussnessName}}</span> 
                    </li>         
                  </ul>
                  <ul id="scrollCopList2">
                    <li id="content_li" v-for="item in copList">
                      <span class="good" style="width: 90%;display: inline-block;">{{item.bussnessName}}</span> 
                    </li>
                  </ul>
                  <ul class="scroll-box">
                    <li id="content_li" v-for="item in copList">
                      <span class="good" style="width: 90%;display: inline-block;">{{item.bussnessName}}</span> 
                    </li>
                  </ul>
                  <ul class="scroll-box">
                    <li id="content_li" v-for="item in copList">
                      <span class="good" style="width: 90%;display: inline-block;">{{item.bussnessName}}</span> 
                    </li>
                  </ul>
                  <ul class="scroll-box">
                    <li id="content_li" v-for="item in copList">
                      <span class="good" style="width: 90%;display: inline-block;">{{item.bussnessName}}</span> 
                    </li>
                  </ul>
                </div>
              </tipBox>
            </div>
          </div>
      </div>     
    </div>
    <div class="row index-content2">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 height100">
          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 height100">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius height100">
              <tipBox title="活跃城市">
                <div style="height: 88%;width: 100%" id="indexChart2">
                
                </div>
              </tipBox>
            </div>
          </div>
          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 no-padding-lr height100">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius height100">
              <tipBox title="政府监督数据">
                <div style="height: 88%;width: 100%;" id="indexChart3" class="padd-bot-05r">
                
                </div>
              </tipBox>
            </div>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 height100">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr box-shadow-inset-radius height100">
              <tipBox title="溯源电商交易图">
                <div style="height: 88%;width: 100%" id="indexChart4">
                
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
      </div>  
    </div>
   <footBox :txt="foottxt"></footBox>
  </div>  
</template>

<script>
// import echarts from 'echarts'
import navBar from './navBar.vue'
import tipBox from './tipBox.vue'
import footBox from './footBox.vue'
import popup from './popup.vue'

export default {
  data() {
    return {
      title: "全国重要产品追溯大数据云平台",
      btn1: 'lib/img/togaxq-btn.png',
      btn2: 'lib/img/tochengdu-btn.png',
      link1: '/gaxq',
      link2: '/chengdu',
      copList:[
      
      ],
      foottxt: 'Copyright  2016.成都源溯优品科技有限公司',
      datetime: {
        year:'',
        month: '',
        day: ''
      }
    }
  },
  components: {echarts, navBar, tipBox, footBox, popup},
  mounted (){ 
    var vm = this
    vm.datetime.year = new Date().getFullYear()
    vm.datetime.month = new Date().getMonth()+1
    vm.datetime.day = (new Date().getDay()-1)<10?'0'+(new Date().getDay()-1).toString():(new Date().getDay()-1)


    setmiddle([$('.txt-middle')]) 
    $.ajax({
      url: '../getInfo?folder=gagoods&file=bussness',
      success: function(res){
        vm.copList = res.aadata
        //文字滚动
        config.index.scrollCop = document.getElementById("scrollCop");
        config.index.scrollCopList = document.getElementById("scrollCopList");

        config.index.scroll1 = setInterval(function(){
          Marquee(config.index.scrollCop, config.index.scrollCopList)
        }, 30);
        console.log(vm.copList)
      }
    }) 
    
    scrollCop.onmouseover = function() {
      clearInterval(config.index.scroll1)
    };
    scrollCop.onmouseout = function() {
      config.index.scroll1 = setInterval(function(){
        Marquee(config.index.scrollCop, config.index.scrollCopList)
      }, 30);
    };
    var indexChart1 = echarts.init(document.getElementById('indexChart1'));
    var indexChart2 = echarts.init(document.getElementById('indexChart2'));
    var indexChart3 = echarts.init(document.getElementById('indexChart3'));
    var indexChart4 = echarts.init(document.getElementById('indexChart4'));
    indexChart1.setOption({
      title: {
          text: '',
          subtext: ''
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      legend: {
          data: ['', '']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '4%',
          top: '5%',
          containLabel: true
      },
      xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLine: {
            lineStyle: {
                color: '#fff'
            }
          }
      },
      yAxis: {
          type: 'category',
          data: ['危险品','特种设备','跨境电商','农工业生产资料','药品','食品', '食用农产品'],
          axisLine: {
            lineStyle: {
                color: '#fff'
            }
          }
      },
      series: [
          {
              name: '2011年',
              type: 'bar',
              data: [500, 600, 900, 700, 800, 1010, 400],
              barWidth:config.barWidth,
              itemStyle: {
                  normal: {
                      color: function(value) {
                         if(value.data<=500){                   
                              return '#54b1f9'
                         }else if(value.data>500 && value.data<=700){
                              return '#40e0d0'
                         }else if(value.data>700 && value.data<=900){
                              return '#ffa500'
                         }else if(value.data>900){
                              return '#FFFF66'
                         }
                      }
                  }
              }
          }
          // {
          //     name: '2012年',
          //     type: 'bar',
          //     data: [19325, 23438, 31000, 121594, 134141, 681807]
          // }
      ]
    });
    indexChart2.setOption({
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
          bottom: '4%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              data : ['成都市', '贵安新区', '绵阳市', '海口市', '重庆市'],
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
              data:[390, 334, 200, 151, 111],
              barWidth:config.barWidth,
              itemStyle: {
                  normal: {
                      color: function(value) {
                        switch (value.dataIndex)
                        {
                          case 0:
                            return '#54b1f9'
                            break;
                          case 1:
                            return '#40e0d0'
                            break;
                          case 2:
                            return '#ffa500'
                            break;
                          case 3:
                            return '#a2d355'
                            break;
                          case 4:
                            return '#CC66FF'
                            break;
                        }
                      }
                  }
              }
          }
      ]
    })
    indexChart3.setOption({
      legend: {
          orient: 'horizontal',
          x: 'center',
          y: 'top',
          data:['食药监部门','商务部门','农业部门'],
          textStyle: {
            color: '#ffffff'
          }
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
                  {value:110, name:'食药监部门',itemStyle: {
                    normal: {
                      color: '#FFFF66'
                    }
                  }},
                  {value:300, name:'商务部门',itemStyle: {
                    normal: {
                      color: '#40e0d0'
                    }
                  }},
                  {value:70, name:'农业部门',itemStyle: {
                    normal: {
                      color: '#ffa500'
                    }
                  }},
              ]              
          }
      ]
    })
    config.charts.sydsjyChart.series[0].data = [100, 200, 330, 400, 460, 600, 150, 350, 250, 150, 400, 150]
    // config.charts.sydsjyChart.barWidth = 20
    config.charts.sydsjyChart.series[1].data = [150, 250, 170, 250, 350, 250, 150, 400, 460, 600, 150, 350]
    indexChart4.setOption(config.charts.sydsjyChart)
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(config.index.scroll1)
    next()
  }
}

</script>

<style>
.chinamap-ul{
  list-style: none;
  counter-reset: count;
}
.chinamap-l1::before {
  color:#CC6666;
  content: '●';
}
.chinamap-l2::before {
  color:#990033;
  content: '●';
}
</style>