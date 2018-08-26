var debug;
debug = $common && $common.getUrlParaBase64('debug') || '';
// debug = true;  // 开启调试
var log='异常log';
var  pageType = $common.getUrlParaBase64('pageType') || '';
var  clientId = $common.getUrlParaBase64('clientId') || '';
var  userId = $common.getUrlParaBase64('userId') || '';
var  brandId = $common.getUrlParaBase64('brandId') || '';
var  versionId = $common.getUrlParaBase64('versionId') || '';
var  doWorkId = $common.getUrlParaBase64('doWorkId') || '';
var authorization = '?grantType=hmac&clientId='+ clientId + '&userId='+ userId;
var apiData = { // APP数据集合
    userInfo:pageType==2? '':false,
    exampaper:'',
    answers:''
}
var firstTimer = setTimeout(function(){ // 设置超时报错
    if(apiData.exampaper==='' || apiData.answers==='' || apiData.userInfo===''){
        $.error('Api请求超时')
        return;
    }
},30000)
window.onerror = function(e){
    apiData.answers.userId==98538 && alert('页面出错了~\n'+JSON.stringify(e))
    // $.error(log+':'+JSON.stringify(e))
}
// 格式化用户答案方法集合
var methods = {
    // 只显示老师布置的作业题
    showPartList:function(result,showdata){
        if (showdata && showdata.length > 0) {
            var _showdata = showdata.split(",");
            var arrayObj = new Array(); //创建一个数组
            $.each(_showdata, function(i, d) {
                var l = result.parts.length - 1;
                if (d <= l) {
                    var ret = result.parts[d];
                    arrayObj.push(ret);
                }
            });
            var _result = { title: result.title, ref_score: result.ref_score, curriculum_id: result.curriculum_id, parts: arrayObj, id: result.id, version_id: result.version_id };
            result = _result;
        }
        return result;
    },
    trim:function(str){
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    formatEmpty:function(str){
        return str.replace(/&nbsp;/g,' ');
    },
    setfillingQuestion:function(question){
        if(question.qtype==3){
            // question.stemArr = question.stem.split(/\{#blank#\}.*?\{#\/blank#\}/)
            var stemArr = question.stem.split(/\{#blank#\}|\{#\/blank#\}/)
            question.stemArr = []
            for(var i=0;i<stemArr.length;i++){
                question.stemArr.push({
                    sid:i%2==0?-1:(i+1)/2-1,
                    html:stemArr[i],
                    content:'',
                    assess:0
                })
            }
        }
        return question;
    },
    // 设置参考答案
    // answerIdArr:正确答案选项组，options：题目选项
    setRefAnswer:function(question) {
        // if(!question) return false;
        var answerIdArr = question.ref_info.answers
        var options = question.options
        var result=[],arr = [];
        // 选择题答案解析
        if(question.qtype==1 || question.qtype==2){
            for (var j = 0; j < options.length; j++) {
                options[j].is_answer = false;
                options[j].assess = 0;
                options[j].sid = j;
                for (var i = 0; i < answerIdArr.length; i++) {
                    if (options[j].id == answerIdArr[i]) {
                        options[j].is_answer = true;
                        arr.push(options[j]);
                        break;
                    }
                }
            }
        }
        
        if(arr != ''){
            question.options = options;
            question.ref_info.answers = arr;
            return question;
        }
    },
    // 设置用户答案
    setUserAnswer:function(question,userAnswers){
            methods.setRefAnswer(question)
            question.userAnswer = methods.findUserAnswer(userAnswers, question.version_id);
            question.assessHtml = methods.setAssessIcon(question.userAnswer);
            return question;
    },
    findUserAnswer:function(userAnswers, versionId){
        var result = $.grep(userAnswers, function (m) {
            if (m.versionId) {
                return m.versionId == versionId;
            } else {
                return m.version_id == versionId;
            }
        })[0];
        if (result && !$.isArray(result.answers)) {
            result.answers = JSON.parse(result.answers);
        }
        return result;
    },
    // 附件排序
    sortAttachments:function(question){
            var atta = question.attachments;
            audioArr = [],
            imgArr = [],
            videoArr = [];
        for (var i = 0,len=atta.length; i < len; i++) {
            if(atta[i].file_type==1) imgArr.push(atta[i])
            if(atta[i].file_type==2) audioArr.push(atta[i])
            if(atta[i].file_type==3) videoArr.push(atta[i])
        }
         question.attachments = audioArr.concat(imgArr).concat(videoArr)
         return question;
    },
    // 设置得分的标签(assess= undefined或6:未作答  0:未批改 1:对 2:错 3:半对 4:未知  5:批改失败)
    setAssessIcon:function(userAnswer,workStatus){
        var msg='',
            answerIcon='';
        if(!userAnswer || userAnswer.assess===undefined || userAnswer.assess==6){
            msg = '未作答';
        }else{
            answerIcon = userAnswer.assess==1? 'correct':userAnswer.assess==2? 'error':userAnswer.assess==3?'partly-correct':userAnswer.assess==4?'unknown':'';
            if(answerIcon) answerIcon='<span class="icon display-ib mlr20 '+answerIcon+'"></span>';
            // msg = userAnswer.assess==4?'未知':'';
        }
        if(msg) msg = '<span class="fs-30 mlr20">'+msg+'</span>';
        return workStatus==16? '<span class="fs-30 mlr20">评分中</span>' : (answerIcon || msg);
    },
    // 选项评判 assess:评判状态(0:未选择 1:对 2:错)
    setOptionsIcon:function(question){
        if(!question)return false;
        if(question.qtype==3){
            for(var n=0;n<question.stemArr.length;n++){
                var option = question.stemArr[n];
                if(option.sid>=0){
                    question.stemArr[n].assess = 0;
                    question.stemArr[n].content = '';
                    if(question.userAnswer){
                        for(var j=0;j<question.userAnswer.answers.length;j++){
                            var answer = question.userAnswer.answers[j]
                            if(option.sid==answer.sid){
                                question.stemArr[n].assess = answer.assess;
                                question.stemArr[n].content = answer.content!==undefined?answer.content : '';
                            }
                        }
                    }
                }
            }

            var stemArrIndex,index = 0;
            question.stem = question.stem.replace(/\{#blank#\}(\d*)\{#\/blank#\}/g,function(){
                stemArrIndex = (index+1)*2-1;
                var input = '<div class="inline ques '+ (question.stemArr[stemArrIndex].assess==1?'fill-green':question.stemArr[stemArrIndex].assess!=4?'fill-red':'') +'">'+question.stemArr[stemArrIndex].content+'</div>';
                index++;
                return input;
            });
        }else{
            for(var i=0;i<question.options.length;i++){
                question.options[i].assess = question.is_objective || (question.qtype==1 || question.qtype==2 || question.qtype==8)?0:4;
                
                (question.qtype==6 || question.qtype==7 || question.qtype==8) && (question.options[i].content = '');
                if(question.userAnswer){
                    for(var j=0;j<question.userAnswer.answers.length;j++){
                        var answer = question.userAnswer.answers[j]
                        if(question.qtype==1 || question.qtype==2){
                            var option = question.options[i];
                            if(answer.answerType==1 && answer.content == option.id){
                                question.options[i].assess = answer.assess;
                            }
                        }else if(question.qtype==6 || question.qtype==7 || question.qtype==8){
                            if(i==answer.sid){
                                question.options[i].assess = answer.assess;
                                question.options[i].content = answer.content!==undefined?answer.content : '';
                            }
                        }
                    }
                }
            }
        }
        return question;
    },
    formatQuestion:function(questions,userAnswers){
        questions && $.each(questions.children, function () {

            methods.setUserAnswer(this,userAnswers);
            methods.sortAttachments(this);
            this.qtype==3 && methods.setfillingQuestion(this);
            methods.setOptionsIcon(this);
            this.stem && (this.stem = methods.formatEmpty(this.stem) );
            
            this.children && this.children.length > 0 && methods.formatQuestion(this, userAnswers);
        });
    },
    // 更新当前作业完成度
    updateQuestionFinished:function(exampaper){
        for(var j=0;j<exampaper.length;j++){
            var question = exampaper[j];
            if(question && question.level==2){
                question.finished=question.userAnswer?true:false;
                if(question.children.length>0){
                    question.finished=true;
                    for(var n=0;n<question.children.length;n++){
                        question.children[n].level=3;
                        if(!question.children[n].userAnswer) question.finished=false;
                    }
                }
                exampaper[j] = question;
            }
        }
        return exampaper;
    }
}
// 本地交互
var local = {
    // 上一题
    prevQuestion:function(){
        if(mySwiper && mySwiper.slides[mySwiper.activeIndex].getAttribute('data-isproblems')=='true'){// 是复合题
            var list = $(mySwiper.slides[mySwiper.activeIndex]).find('.sub-question-item');
            var len = list.length;
            for(var i=0;i<list.length;i++){
                if($(list[i]).hasClass('showTag')){
                    if(i>0){
                        $(list[i]).removeClass('showTag'),$(list[i-1]).addClass('showTag');
                    }else{
                        mySwiper.slidePrev();
                    }
                    break;
                }
            }
            // 暂停全部媒体播放
            local.pauseMedia();
        }else{  // 不是复合题
            mySwiper.slidePrev()
        }
        local.slideButtonStatus(mySwiper);
    },
    // 下一题
    nextQuestion:function(){
        if(mySwiper && mySwiper.slides[mySwiper.activeIndex].getAttribute('data-isproblems')=='true'){// 是复合题
            var list = $(mySwiper.slides[mySwiper.activeIndex]).find('.sub-question-item');
            var len = list.length;
            for(var i=0;i<list.length;i++){
                if($(list[i]).hasClass('showTag')){
                    if(i<len-1){
                        $(list[i]).removeClass('showTag');
                        $(list[i+1]).addClass('showTag');
                        if(i==len-2 && mySwiper.activeIndex == mySwiper.slides.length-1){
                            $('#nextQuestion').addClass('btn-disabled')
                        }
                    }else{
                        mySwiper.slideNext();
                    }
                    break;
                }
            }
            // 暂停全部媒体播放
            local.pauseMedia();
        }else{  // 不是复合题
            mySwiper.slideNext()
        }
        local.slideButtonStatus(mySwiper);
    },
    // 更新上一题下一题状态
    slideButtonStatus:function(swiper){
        var mySwiper = swiper || window.mySwiper;
        if(mySwiper && mySwiper.slides[mySwiper.activeIndex].getAttribute('data-isproblems')=='true'){// 是复合题
            var list = $(mySwiper.slides[mySwiper.activeIndex]).find('.sub-question-item');
            var len = list.length;
            for(var i=0;i<list.length;i++){
                if($(list[i]).hasClass('showTag')){
                    if(i>=len-1 && mySwiper.activeIndex == mySwiper.slides.length-1){
                        $('#nextQuestion').addClass('btn-disabled')
                    }else{
                        $('#nextQuestion').hasClass('btn-disabled') && $('#nextQuestion').removeClass('btn-disabled');
                    }
                    break;
                }
            }
        }
    },
    // 音频/视频全部暂停
    pauseMedia:function(){
        $('video,audio').each(function(i2,item2){
            var _selfIndex,
                index = $(item2).attr('index')
            if(typeof mySwiper !='undefined' && mySwiper.slides[mySwiper.activeIndex].getAttribute('data-isproblems')=='true'){// 是复合题
                _selfIndex = $(mySwiper.slides[mySwiper.activeIndex]).find('.problems-stem audio').attr('index')
            }
            if(item2.nodeName=='AUDIO' && index){
                if(!_selfIndex || _selfIndex!=index){
                    window["AudioList"][index].pause();
                }
            }else{
                item2.pause();
            }
        })
    },
    // 填空题做题
    doFilling:function(element){
        var versionId = $(element).data('versionid')
        var optionIndex = $(element).data('index')
        var id = $(element).data('id')
        vue._tempFillingVal = $tools.htmlEncode($tools.removeEmoticons($tools.trim($(element).val())))
        // $(this).val(vue._tempFillingVal);
        var question = vue.findQuestion(versionId);
        if(question && question.qtype==3 && question.options[optionIndex].content != vue._tempFillingVal){
            // var inputstr= question.stem.match(/<input [^>]+ [^>]+>/g)[index-1]
            // inputstr.replace(/ value="(+)"/i,' value="'+val+'"')
            question.stem = question.stem.replace(RegExp('<input [^>]+data-id="'+id+'" [^>]+>','g'),function(val){
                return arguments[0].replace(/value="*"/,'value="'+vue._tempFillingVal+'"')
            })
            var index = (optionIndex+1)*2-1;
            question.stemArr[index].content = question.options[optionIndex].content = vue._tempFillingVal;
            question.userAnswer = local.doWork(question,index)
            question = methods.setOptionsIcon(question);
            window.vue.updateQuestion(question)
            console.log('content2:',question.stemArr[index].content)
        }
    },
}

// 获取在线作答试卷
function getOnlineExamination(){
    var url = API.getOnlineExamination + authorization + '&versionId='+ versionId;
    $common.ajax(url,function(response){
        log = '返回用户答案'
        var json = typeof response == 'string' ? JSON.parse(response) : response;
        if((json.errcode==undefined || json.errcode!=0) || !json.data){
            $.error(json.msg || log)
        }else{
            dataReady('getOnlineExamination',json.data);
        }
    },userId)
}
// 获取用户答案
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

// Api数据集中处理
function dataReady(method,data){
    var json = data && typeof data == 'string' ? JSON.parse(data) : data;
    if(method=='getOnlineExamination'){
        apiData.exampaper = json;
    }else if(method=='getDoWorkInfo'){
        apiData.answers = json || [];
    }else if(method=='getUserInfo'){
        apiData.userInfo = json;
    }else if(method=='getBrand'){
        apiData.userInfo.avatar=json.icon
        if(vue){
            vue.userInfo.avatar = apiData.userInfo.avatar
            return;
        }
    }

    if(apiData.exampaper !=='' && apiData.answers !=='' && apiData.userInfo!==''){
        if(apiData.userInfo!==false){
            // 用户信息
            if(apiData.userInfo.classes && apiData.userInfo.classes.length>1){
                apiData.userInfo.classes.splice(1)
            }
            // 默认用户头像为品牌logo
            if(apiData.userInfo.avatar.indexOf('http')==-1){
                getBrand()
            }
        }
        // 处理列表和用户答案
        var userAnswers = apiData.answers.workAnswers && apiData.answers.workAnswers.length>0? apiData.answers.workAnswers : '';
        var exampaper = apiData.exampaper;
        
        console.log(exampaper)
        $.each(exampaper.parts,function(){// part
            methods.formatQuestion(this,userAnswers)
        })

        var list = [],sort = 1,totalNum=0;
        for(var i=0;i<exampaper.parts.length;i++){
            var part = exampaper.parts[i]
            list.push({
                level:1,
                module_type_name:part.module_type_name
            })
            for(var j=0;j<part.children.length;j++){
                var question = part.children[j];
                if(question){
                    question.level=2
                    if(question.children.length>0){
                        for(var n=0;n<question.children.length;n++){
                            question.children[n].level=3;
                        }
                    }
                    question.sort=sort++
                    list.push(question) 
                }
            }
        }
        totalNum = sort-1;
        list = methods.updateQuestionFinished(list);
        title = exampaper.title || '在线作答';
        console.log(list)
        // 渲染页面
        showPage(list,totalNum,title)
    }
}

// 渲染页面
function showPage(exampaper,totalNum,title){
    onlineLoadComponent(Vue)
    onlineLoadFilter(Vue)

    window.vue = new Vue({
        el:'#app',
        data:{
            exampaper:exampaper,
            totalNum:totalNum,              // 总页数
            userInfo: apiData.userInfo,
            answers:apiData.answers,
            showRefAnswers:!apiData.userInfo,   // 是否显示参考答案
            title:title,
        },
        watch:{
            'exampaper':{
                //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
                handler:function(curVal,oldVal){
                    this.exampaper = curVal;
                },
                deep:true
            }
        },
        methods:{
        },
        ready:function(){
            this.$nextTick(function(){
                $('.loading').hide();
                if(!this.exampaper) {
                    $.error('题目获取失败~')
                }else{
                    $('.wrap').show()
                }
                var win_height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
                !window.mySwiper && pageInt(win_height)
                $("table").css({width: '100%'});
                // 初始化音频组件2
                $('.audioBox').each(function(){
                    new AudioClass(this)
                });
                document.title = this.title
                // ios需要主动请求更改文档标题
                log = 'set SetTitle'
                ciwongPlugin && ciwongPlugin.createEvent('SetTitle' , [{source:3,title:document.title}] ,function( response ){
                })
                // 老师点评
                apiData.answers.comment && $common.teacherComment(apiData.answers.comment)
                // 分享链接
                $common.shareUrl(apiData.answers.actualScore)
                // 老师微信端分享
                $common.getUrlParaBase64('wappid') && $common.wxShare();
            })
        }
    })

}

function pageInt(win_height) {
	window.mySwiper = new Swiper('.swiper-container', {
		initialSlide:0,
		speed:500,
		// slidesPerView:"auto",           // 可以设置为number或者 'auto'则自动根据slides的宽度来设定数量
        autoHeight:true,             // 题目多的时候回造成ios卡屏
        // height : window.innerHeight,
        noSwipingClass : 'problems-question-box',   // 不可拖动块的类名
		// centeredSlides : true,          // 内容居中,题目多的时候回造成ios卡屏
		followFinger : false,           // 如设置为false，拖动slide时它不会动，当你释放时slide才会切换。
        // shortSwipes:false,           // 设置为false时，进行快速短距离的拖动无法触发Swiper
        onInit: function(swiper){
        },
        onTransitionStart:function(swiper){
        },
        onTransitionEnd:function(swiper){
        },
        onSlideChangeStart: function(swiper){
            swiper.lockSwipes();
            $('.body-main').scrollTop(0)
            local.pauseMedia();
            btnShow(swiper)
            swiper.unlockSwipes();
        },
        onSlideChangeEnd: function(swiper){
        }
	})

    //上一题
    $('#prevQuestion').on("touchstart",local.prevQuestion)
    //下一题
    $('#nextQuestion').on("touchstart",local.nextQuestion)
    
    //减去导航栏和底部按钮和进度栏的高度
    $('.problems').css({ "height": ($('#body-main').height() - $('.sortContent').height()*2) + 'px'});
    if(mySwiper.slides.length>30) $('.question_btn,.submitBox').css('transition','none');

    function btnShow(swiper){
        if(swiper.slides[swiper.activeIndex].getAttribute('data-isproblems')=='true'){
            $('.question_btn').addClass('btn_show');
        }else{
            $('.question_btn').removeClass('btn_show');
        }
        // 复合题小题默认回到第一小题
        $('.problems-question-box').each(function(){
            $(this).find('.sub-question-item').each(function(index){
                if(index==0 && $(this).hasClass('showTag')){
                    return false;
                }else if(index==0 && !$(this).hasClass('showTag')){
                    $(this).addClass('showTag')
                }else if($(this).hasClass('showTag')){
                    $(this).removeClass('showTag')
                    return false;
                }
            })
        })
        
        local.slideButtonStatus(swiper);
    }
}

if(location.href.split('?debug=')[1]) {
    $(function(){
        $.getJSON('../../data/online'+location.href.split('?debug=')[1]+'_paper.json', {}, function(json, textStatus) {
            dataReady('getOnlineExamination',json.data);
        });
        $.getJSON('../../data/online'+location.href.split('?debug=')[1]+'_answer.json', {}, function(json, textStatus) {
            dataReady('getDoWorkInfo',json.data);
        });
    })
}else{
    getOnlineExamination()
    getDoWorkInfo()
    apiData.userInfo!==false && getUserInfo();
}
