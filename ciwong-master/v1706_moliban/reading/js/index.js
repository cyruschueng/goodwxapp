// var questionNo = 0 // 题号
var debug = false;  // 开启调试
$('.loading').show();
// 弹出框
$.alert = function(msg){
    if($('.dialog').css('display')=='none'){
        $('.dialog-inner').html(msg)
        $('.dialog').show();
        setTimeout(function(){$('.dialog').hide();},2000)
    }
}
// 错误信息
$.error = function(msg){
    clearTimeout(firstTimer)

    $('.loading').hide();
    $('.wrap').html('');
    if(msg) $('.m-error .u-txt').html('( '+msg+' )')
    $('.m-error').show();
}

var log='异常log';
var  clientId = $common.getUrlParaBase64('clientId') || '';
var  userId = $common.getUrlParaBase64('userId') || '';
var  brandId = $common.getUrlParaBase64('brandId') || '';
var  doWorkId = $common.getUrlParaBase64('doWorkId') || '';
var  pageType = $common.getUrlParaBase64('pageType') || '';   // 当前所属页面, 1:单词跟读详情页 2:单词跟读分享页 3:句子跟读详情页 4:句子跟读分享页
var  versionId = pageType==1||pageType==2 ? $common.getUrlParaBase64('parentVersionId') : $common.getUrlParaBase64('versionId');
versionId = versionId && versionId!='0'? versionId : $common.getUrlParaBase64('parentVersionId') || '';
var authorization = '?clientId='+ clientId + '&userId='+ userId;
var apiData = {
    userInfo:(pageType==1 || pageType==3)? false : '',
	list:'',
	answers:''
}

// 设置超时报错
var firstTimer = setTimeout(function(){
    if(apiData.list==='' || apiData.answers==='' || apiData.userInfo==='' ){
        $.error('Api请求超时')
        return;
    }
},10000)
// 获取用户信息(包括班级学校)
function getUserInfo(){
    var url = API.getUserInfo + authorization + '&brandId='+ brandId + '&uin='+ userId;
    $common.ajax(url,function(response){
        log = '返回获取用户信息'
        var json = typeof response == 'string' ? JSON.parse(response) : response;
        if((json.errcode==undefined || json.errcode!=0) || !json.data){
            $.error(json.msg || log)
        }else{
            dataReady('getUserInfo',json.data);
        }
    },userId)
}
// 根据id查询品牌信息
function getBrand(){
    var url = API.getBrand + authorization + '&brandId='+ brandId;
    $common.ajax(url,function(response){
        log = '根据id查询品牌信息'
        var json = typeof response == 'string' ? JSON.parse(response) : response;
        if((json.errcode==undefined || json.errcode!=0) || !json.data){
            // 品牌信息获取失败不做异常处理
            // $.error(json.msg || log)
        }else{
            dataReady('getBrand',json.data);
        }
    },userId)
}
// 获取单词跟读
function getWordReading(){
	var url = API.getWordReading + authorization + '&versionId='+ versionId;
	$common.ajax(url,function(response){
        log = '返回单词跟读'
        var json = typeof response == 'string' ? JSON.parse(response) : response;
        if((json.errcode==undefined || json.errcode!=0) || !json.data){
            $.error(json.msg || log)
        }else{
        	dataReady('getWordReading',json.data);
        }
	},userId)
}
// 获取句子跟读
function getSentenceReading(){
	var url = API.getSentenceReading + authorization + '&versionId='+ versionId;
	$common.ajax(url,function(response){
        log = '返回句子跟读'
        var json = typeof response == 'string' ? JSON.parse(response) : response;
        if((json.errcode==undefined || json.errcode!=0) || !json.data){
            $.error(json.msg || log)
        }else{
        	dataReady('getSentenceReading',json.data);
        }
	},userId)
}
// 获取用户答案（包括用户总得分）/老师选题（checkResouresIds）/当前批改状态（workStatus）
function getDoWorkInfo(){
    var url = API.getDoWorkInfo + authorization + '&doWorkId='+ doWorkId;
    $common.ajax(url,function(response){
        log = '返回用户答案'
        var json = typeof response == 'string' ? JSON.parse(response) : response;
        if((json.errcode==undefined || json.errcode!=0) || !json.data){
            $.error(json.msg || log)
        }else{
            dataReady('getDoWorkInfo',json.data);
        }
    },userId)
}
// Api数据集中处理
function dataReady(method,data){
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
		showPage(list,audioList)
        // 默认用户头像为品牌logo
        if(apiData.userInfo!==false && apiData.userInfo.avatar.indexOf('http')==-1){
            getBrand()
        }
    }
}

// 渲染页面
function showPage(list,audioList){
	log = '开始渲染页面'
    
    Vue.filter("scoreClass",function(val) {
        var className = '';
        if(val>=80){
            className = 'correct-green';
        }else if(val>=60){
            className = 'correct-orange'
        }else if(val<60){
            className = 'correct-red'
        }
        return className;
    });
    //格式化句子
    Vue.filter("formatSentence",function(val) {
        return val && val.replace(/{(.*):}/g,'$1:');
    });

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
            $('.loading').hide();
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

if(pageType==1){    // 单词跟读详情页
    getWordReading()
    getDoWorkInfo()
}else if(pageType==2){    // 单词跟读分享页
    getWordReading()
    getDoWorkInfo()
    getUserInfo()
}else if(pageType==3){    // 句子跟读详情页
    getSentenceReading()
    getDoWorkInfo()
}else if(pageType==4){    // 句子跟读分享页
    getSentenceReading()
    getDoWorkInfo()
    getUserInfo()
}