// var questionNo = 0 // 题号
var debug = false;  // 开启调试
$.loading('show')   // 显示加载中
var log='异常log';
var  clientId = $common.getUrlParaBase64('clientId') || '';
var  userId = $common.getUrlParaBase64('userId') || '';
var  brandId = $common.getUrlParaBase64('brandId') || '';
var authorization = '?clientId='+ clientId + '&userId='+ userId;
// 接口数据仓库
var apiData = {
	list:'',
	answers:''
}
// 设置自动超时报错
var firstTimer = setTimeout(function(){
    if(apiData.list==='' || apiData.answers==='' || apiData.userInfo==='' ){
        $.error('Api请求超时')
        return;
    }
},10000)
// 接口函数
var API_methods = {
    getCurrentRecordStatistics:function(){
        var url = API.getCurrentRecordStatistics + authorization + '&versionId='+ versionId;
        $common.ajax(url,function(response){
            log = '返回单词跟读'
            var json = typeof response == 'string' ? JSON.parse(response) : response;
            if((json.errcode==undefined || json.errcode!=0) || !json.data){
                $.error(json.msg || log)
            }else{
                BuildPage.dataReady('getWordReading',json.data);
            }
        },userId)
    }
}
// 构建页面
var BuildPage = {
    // 初始化
    init:function(){
        var _self = this;
        clearTimeout(firstTimer)
        $.loading('hide')
        $('.wrap').show()
        // 图表切换
        $('.chart-head span').click(function(){
            $(this).addClass('on').siblings().removeClass('on')
            $('.chart-body .echarts-box').eq($(this).index()).addClass('on').siblings().removeClass('on');
        })
        
        var echartH = window.innerHeight - $('.statistics-report').height() - 10;
        $('.echarts-box').css({'height': echartH + 'px' , 'width': window.innerWidth + 'px'})
        var option1 = {data:_self.randomData('data'),date:_self.randomData('date'),num:0,page:1,totalPage:20,callback:function(){
            console.log(11)
        }}
        var option2 = {data:_self.randomData('data'),date:_self.randomData('date'),num:0,page:1,totalPage:20,callback:function(){
            console.log(22)
        }}
        var option3 = {data:_self.randomData('data'),date:_self.randomData('date'),num:0,page:1,totalPage:20,callback:function(){
            console.log(33)
        }}
        var wordReadChart = new echartsClass('main1',option1)
        var sentenceReadChart = new echartsClass('main2',option2)
        var listenSpeakChart = new echartsClass('main3',option3)
        window.mySwiper = new Swiper('.swiper-container', {
            pagination : '.swiper-pagination',
            onInit: function(swiper) {
                var el = $(swiper.slides[swiper.activeIndex]).find('.num')
                if(!el.hasClass('finished')) {
                    el.addClass('finished')
                    BuildPage.autoAddToSetNum(el.data('num'),el.attr('id'))
                }
            },
            onTransitionStart: function(swiper) {},
            onTransitionEnd: function(swiper) {},
            onSlideChangeStart: function(swiper) {},
            onSlideChangeEnd: function(swiper) {
                var el = $(swiper.slides[swiper.activeIndex]).find('.num')
                if(!el.hasClass('finished')) {
                    el.addClass('finished')
                    BuildPage.autoAddToSetNum(el.data('num'),el.attr('id'))
                }
            }
        })

    },
    // 数字累加到制定值动效
    autoAddToSetNum:function (total,id){
        if(typeof total !=='number' || total<=0 || !id) return;
        var el = document.getElementById(id);
        var count = 0;
        var totalCount = 21
        total<totalCount && (totalCount = total);
        var baseNum = Math.floor(total/totalCount);
        var currScore = 0;
        el.innerHTML=0;
        var timer = setInterval(function(){
        count++;
        // console.log(count)
        if(count>=totalCount){
            clearInterval(timer)
            el.innerHTML=total;
            return false;
        }
        currScore += baseNum;
        el.innerHTML=currScore;
        },50)
    },
    // 生成随机数据
    randomData:function (type){
        var num = 44;
        if(type=='date') return function(){
            var data = []
            var month = parseInt(12*Math.random())
            for(var i=0;i<num;i++){
                data.push(month+'.'+i)
            }
            return data;
        }()
        else return function(){
            var data = []
            for(var i=0;i<num;i++){
                data.push(parseInt(100*Math.random()))
            }
            return data;
        }()
    },
    // 添加数据
    addData:function (type){
        var charts,option;
        switch(type){
        case 1:
            option1.date = option1.date.concat(randomData('date'))
            option1.data = option1.data.concat(randomData('data'))
            option1.num +=1;
            charts = chart1;
            option = option1;
            break;
        case 2:
            option2.date = option2.date.concat(randomData('date'))
            option2.data = option2.data.concat(randomData('data'))
            option2.num +=1;
            charts = chart2;
            option = option2;
            break;
        case 3:
            option3.date = option3.date.concat(randomData('date'))
            option3.data = option3.data.concat(randomData('data'))
            option3.num +=1;
            charts = chart3;
            option = option3;
            break;
        }
        charts.setOption({
            dataZoom: [{
                startValue: option.num*100,
                endValue: option.num*100+10
            }],
            xAxis:[{
            data: option.date
            }],
            series: [{
                data: option.data
            }]
        });
        console.log(option)
    },
    // Api数据集中处理
    dataReady:function(method,data){
        var _self = this;
        var json = typeof data == 'string' ? JSON.parse(data) : data;
        if(method=='getWordReading'){
            apiData.list = json;
        }else if(method=='getSentenceReading'){
            apiData.list = json;
        }else if(method=='getDoWorkInfo'){
            apiData.answers = json;
        }else if(method=='getUserInfo'){
            apiData.userInfo = json;
        }else if(method=='getBrand'){
            apiData.userInfo.avatar=json.icon
            if(vue){
                vue.userInfo.avatar = apiData.userInfo.avatar
                return;
            }
        }
        // 所有数据接收完成才开始处理
        if(apiData.list !=='' && apiData.answers !=='' && apiData.userInfo !==''){
            // 用户信息
            if(apiData.userInfo.classes && apiData.userInfo.classes.length>1){
                apiData.userInfo.classes.splice(1)
            }

            // 处理列表和用户答案
            var list = apiData.list.textList || apiData.list.wordList || '';
            var userAnswer = apiData.answers.workAnswers || '';
            var checkedResource = apiData.answers.checkedResource || [];
            var actualScore = 0; // 用户总分
            var audioList = [];
            // 只显示老师布置的作业题
            if(checkedResource && checkedResource.length>0){
                var _list = []
                for(var i=0,len=checkedResource.length;i<len;i++){
                    var id = checkedResource[i];
                    for(var j=0,len2=list.length;j<len2;j++){
                        var item = list[j];
                        if(item.wId == id || item.versionId == id){
                            _list.push(item);
                            list.splice(j,1)
                            break;
                        }
                    }
                }
                list = _list;
            }
            list.map(function(item,index){
                for(var i=0,len=userAnswer.length;i<len;i++){
                    var answer = userAnswer[i];
                    if(item.wId == answer.versionId || item.versionId == answer.versionId){
                        answer.score = Math.round(parseFloat(answer.score)) || 0;
                        item.userAnswer = answer;
                        actualScore += answer.score;
                        userAnswer.splice(i,1)
                        break;
                    }
                }
            })
            for (var i = 0; i < list.length; i++) {
                if(list[i].userAnswer && list[i].userAnswer.answers && list[i].userAnswer.answers[0] && list[i].userAnswer.answers[0].audioUrl.indexOf('http:')>-1){
                    audioList.push(list[i].userAnswer.answers[0].audioUrl);
                    list[i].userAnswer.audioUrl = list[i].userAnswer.answers[0].audioUrl;
                }
            }
            apiData.userInfo.actualScore = Math.round(actualScore/list.length);
            // 渲染页面
            _self.showPage(list,audioList)
            // 默认用户头像为品牌logo
            if(apiData.userInfo!==false && apiData.userInfo.avatar.indexOf('http')==-1){
                getBrand()
            }
        }
    },
    // 渲染页面
    showPage:function(list,audioList){
        var _self = this;
        log = '开始渲染页面'

        window.vue = new Vue({
            el:'#app',
            data:{
                pageType:pageType,
                userInfo:apiData.userInfo,
                list:list || [],
                audioList:audioList || []
            },
            methods:{
            },
            init:function(){
            },
            created:function(){
                $.loading('hide')
                if(!this.list) {
                    $.error('暂无信息~')
                }else{
                    $('.wrap').show()
                }
                (apiData.answers.workName || apiData.list.name) && (document.title = apiData.answers.workName || apiData.list.name);
                // ios需要主动请求更改文档标题
                if(/Iphone|Ipad|Ipod/i.test(navigator.userAgent)){
                    log = 'set SetTitle'
                    ciwongPlugin && ciwongPlugin.createEvent('SetTitle' , [{source:3,title:document.title}] ,function( response ){
                    })
                }
                // 老师点评
                if( (pageType==1 || pageType==3) && apiData.answers.comment) $common.teacherComment(apiData.answers.comment)
                // 分享链接
                if(pageType==1 || pageType==3) $common.shareUrl(apiData.answers.actualScore)
                
                this.$nextTick(function(){
                    window._AudioClass = new AudioClass(this)
                    // 老师微信端分享
                    $common.getUrlParaBase64('wappid') && $common.wxShare();
                })
            }
        })
    }
}

$(function(){
    BuildPage.init();
});

