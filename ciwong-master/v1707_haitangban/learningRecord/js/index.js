// var questionNo = 0 // 题号
var debug = false;  // 开启调试
$('.loading').show();

var log='异常';
// APP数据集合
var apiData = {
    userInfo:'',    // 用户信息
    list:'',        // 记录列表
}

var  accessToken = $common.getUrlParaBase64('accessToken') || '';
var  clientId = $common.getUrlParaBase64('clientId') || '';
var  userId = $common.getUrlParaBase64('userId') || '';
var  brandId = $common.getUrlParaBase64('brandId') || '';
var  pageSize = $common.getUrlParaBase64('pageSize') || '';
var authorization = '?clientId='+ clientId + '&accessToken='+ accessToken;
var currMonth = [];

getRecords()

// 设置超时报错
var firstTimer = setTimeout(function(){
    if(apiData.list===''){
        $.error('Api请求超时')
        return;
    }
},30000)


// if(/Iphone|Ipad/i.test(navigator.userAgent)){
    // app接口调用
    var timer = setInterval(function(){
        log = '首次定时器已执行'
        if(typeof ciwongPlugin != 'undefined' && typeof cordova !='undefined' && typeof cordova.exec =='function'){
            clearInterval(timer)
            try{
                // ios需要主动请求更改文档标题
                log = 'set SetTitle '
                ciwongPlugin && ciwongPlugin.createEvent('SetTitle' , [{source:3,title:'学习记录'}] ,function( response ){
                    // $.alert(log + (typeof response=='string'?response:JSON.stringify(response)) )
                })
            }catch(e){
                $.error('请求APP失败');
            }
        }
    },200)
// }

// 获取学习记录列表
function getRecords(page,callback,complete){
	log = '获取学习记录列表'
	var currPage = page && page>0? page : 1;
	var isOnline = 1;	// 是否线上作业 1:是 0:否
	pageSize = pageSize && pageSize>0? pageSize : 40;
	var url = API.getRecords + authorization+'&brandId='+brandId +'&isOnline='+isOnline +'&page='+currPage +'&pageSize='+pageSize;
	$common.ajax(url,function(response){    // ajax success
        debug && alert('返回学习记录列表-返回数据：'+(typeof response=='string'?response:JSON.stringify(response)))
        log = '返回学习记录列表'
        var json = typeof response == 'string' ? JSON.parse(response) : response;
        if((json.errcode==undefined || json.errcode!=0) || !json.data){
            $.error(json.msg || log)
        }else{
            dataReady('getRecords',json.data,callback)
        }
	},'','','','',function(){  // ajax error
        typeof vue!=='undefined' && (vue.isLoading = false);
    })
}
// Api数据集中处理
function dataReady(method,data,callback){
    var json = typeof data == 'string' ? JSON.parse(data) : data;
    if(method=='getRecords'){
        apiData.list = json;
    }

    if(apiData.list!==''){
        // 处理列表
        var list = apiData.list.pageList || '';
        var today = $common.formatDate((+new Date()).toString().substr(0,10),'yyyyMM')
    	for (var i = 0; i < list.length; i++) {
            var date = $common.formatDate(list[i].submitDate || 0,'yyyyMM')
            if(currMonth.indexOf(date)>-1){
                list[i].isShowMonth = false;
            }else{
                currMonth.push(date);
                list[i].isShowMonth = true;
            }
    	}
        apiData.list.pageList = list;
        

        if(window.vue){
            if(typeof callback =='function') callback();
            window.vue.lists.page = apiData.list.page;
            for(var i=0;i<list.length;i++){
                window.vue.pageList.push(list[i])
            }
        }else{
            // 渲染页面
            showPage(apiData.list)
        }
    }
}

// 渲染页面
function showPage(lists){
	log = '开始渲染页面'

    // 显示题型图标
    Vue.filter("setModuleIdIcon",function(val) {
        return val==10?'icon-read':val==15?'icon-ls':val==124?'icon-online':'';
    });
    // 格式化日期
    Vue.filter("formatDate",function(timestamp,format) {    // timestamp = 1492141656
        if(!timestamp) return '';
        !format && (format = 'W MM/dd');
        return $common.formatDate(timestamp,format)
    });

    window.vue = new Vue({
        el:'#app',
        data:{
            pageList:lists.pageList,
            lists:lists,
            isLoading:false,    // 是否正在加载
            firstLoading:true   // 第一次下拉加载
        },
        methods:{
            // 格式化显示月份
            formatMonth:function(timestamp) {    // timestamp = 1492141656
                var today = $common.formatDate((+new Date()).toString().substr(0,10),'yyyyMM')
                var date = $common.formatDate(timestamp,'yyyyMM')
                if(today == date){
                    return '本月';
                }else if(today.substr(0,4) != date.substr(0,4)){
                    return $common.formatDate(timestamp,'yyyy年M月')
                }else{
                    return $common.formatDate(timestamp,'M月')
                }
            },
            // 加载更多
            loadMore:function(){
                var _vue = this;
                var elementRoot = $('#loadMore');
                if(!_vue.isLoading || _vue.firstLoading){
                    _vue.firstLoading = false;
                    _vue.isLoading = true;
                    if(_vue.lists.totalCount<=_vue.lists.pageSize || _vue.lists.pageCount<=_vue.lists.page){
                        if(!elementRoot.hasClass('loaded')){
                            elementRoot.addClass('loaded')
                            elementRoot.children('.load-txt').addClass('c-999896').html('已全部加载')
                            setTimeout(function(){
                                elementRoot.slideUp('fast')
                            },2000)
                        }
                        return ;
                    }
                    
                    getRecords(parseInt(_vue.lists.page)+1,function(){
                        _vue.isLoading =false;
                    })
                }
            },
            urlTo:function(item){
                if(typeof NProgress!='undefined'){  // 加载进度条效果
                    if(NProgress.isStarted()){
                        NProgress.remove();
                    }
                    NProgress.start();
                    NProgress.inc(0.5)
                }
                var commentUrlParam = item.comment? '&isComment=1':'';
                var url = '';
                if(item.moduleId==124){  // online, in app h5 page
                    url = '#pageType=1&clientId='+clientId+'&userId='+item.userId+'&brandId='+brandId+'&versionId='+item.versionId+'&doWorkId='+item.doWorkId+commentUrlParam+''
                    location.href= HOST_project +　'onlinePaper/detail.html'+url;
                }else if(item.moduleId==15){ // listenspeak
                    if(item.doWorkPackageUrl.indexOf('http:')>-1){  // 旧资源
                        log = '开始请求JumpToOldListen_Speak'
                        // 跳转到app本地h5页面
                        ciwongPlugin && ciwongPlugin.createEvent('JumpToOldListen_Speak' , [{source:3,params:item}] ,function( response ){
                            log = 'app JumpToOldListen_Speak 接口调用返回'
                            // alert(log + (typeof response=='string'?response:JSON.stringify(response)) )
                        })
                        setTimeout(function(){
                            if(typeof NProgress!='undefined' && NProgress.isStarted()){
                                NProgress.done();
                            }
                        },1500)
                    }else{  // 新资源
                        url = '#clientId='+clientId+'&userId='+item.userId+'&brandId='+brandId+'&versionId='+item.versionId+'&doWorkId='+item.doWorkId+commentUrlParam+''
                        location.href= HOST_project +　'ls/index.html'+url;
                    }
                }else if(item.moduleId==10){    // reading
                    if(item.doWorkPackageUrl.indexOf('http:')>-1){  // 旧资源
                        log = '开始请求JumpToOldRead'
                        // 跳转到app本地h5页面
                        ciwongPlugin && ciwongPlugin.createEvent('JumpToOldRead' , [{source:3,params:item}] ,function( response ){
                            log = 'app JumpToOldRead 接口调用返回'
                        })
                        setTimeout(function(){
                            if(typeof NProgress!='undefined' && NProgress.isStarted()){
                                NProgress.done();
                            }
                        },1500)
                    }else{  // 新资源
                        if(item.resourceType == 'a7527f97-14e6-44ef-bf73-3039033f128e'){ // 同步跟读-单词
                            url = '#pageType=1&clientId='+clientId+'&userId='+item.userId+'&brandId='+brandId+'&versionId='+item.versionId+'&parentVersionId='+item.parentVersionId+'&doWorkId='+item.doWorkId+commentUrlParam+''
                            location.href= HOST_project +　'reading/index.html'+url;
                        }else if(item.resourceType == '6ed8a021-8cd1-45b1-8ec1-a6369dfb19ae' || item.resourceType == '992a5055-e9d0-453f-ab40-666b4d7030bb'){   // 同步跟读-短语,句子,同步跟读-课文
                            url = '#pageType=3&clientId='+clientId+'&userId='+item.userId+'&brandId='+brandId+'&versionId='+item.versionId+'&parentVersionId='+item.parentVersionId+'&doWorkId='+item.doWorkId+commentUrlParam+''
                            location.href= HOST_project +　'reading/index.html'+url;
                        }
                    }
                }
            }
        },
        init:function(){
        },
        watch:{
            'pageList':function(val){
                // console.log(val)
            }
        },
        created:function(){
            $('.loading').hide();
            if(!this.lists || !this.lists.pageList || this.lists.pageList.length==0) {
                $.error('还没有学习记录~')
            }else{
                // 兼容大屏手机或pad
                var clientWidth = document.documentElement.clientWidth;
                if(clientWidth && clientWidth>415){
                    $('.work-title').css('max-width',clientWidth*0.7+'px')
                }
                $('.wrap').show()
            }

            if(typeof NProgress=='undefined'){
                var link = document.createElement('link')
                link.href = '../common/js/nprogress/nprogress.css';
                document.body.appendChild(link)
                var script = document.createElement('script')
                script.src = '../common/js/nprogress/nprogress.js';
                document.body.appendChild(script)
            }
        },
        ready:function(){
            this.$nextTick(function(){
                var _vue = this;
                if(_vue.lists.totalCount<=_vue.lists.pageSize){
                    _vue.firstLoading = false;
                    _vue.isLoading = true;
                    var elementRoot = $('#loadMore');
                    if(!elementRoot.hasClass('loaded')){
                        elementRoot.addClass('loaded')
                        elementRoot.children('.load-txt').addClass('c-999896').html('已全部加载')
                        setTimeout(function(){
                            // elementRoot.hide('fast')
                        },2000)
                    }
                }
                $common.loadMore({},this.loadMore);
            })
        }
    })
}