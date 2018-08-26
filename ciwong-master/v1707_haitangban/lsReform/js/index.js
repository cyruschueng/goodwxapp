var debug;
// debug = true;  // 开启调试
$('.loading').show(); 
var log='异常log';
var isLsSharePage = false;  // 是听说模考分享页还是详情页
// APP数据集合
var apiData = {
    userInfo:isLsSharePage? '':false,
    exampaper:'',
    answers:''
}


// 设置超时报错
var firstTimer = setTimeout(function(){
    if(apiData.exampaper==='' || apiData.answers==='' || apiData.userInfo===''){
        $.error('Api请求超时')
        return;
    }
},10000)

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
    // 设置参考答案
    // answerIdArr:正确答案选项组，options：题目选项
    setRefAnswer:function(question) {
        // if(!question) return false;
        var answerIdArr = question.ref_info.answers
        var options = question.options
        var result=[],arr = [];
        // 选择题答案解析
        if(question.qtype==1){
            for (var i = 0; i < answerIdArr.length; i++) {
                for (var j = 0; j < options.length; j++) {
                    options[j].is_answer = false;
                    if (options[j].id == answerIdArr[i]) {
                        options[j].index = j;
                        options[j].is_answer = true;
                        arr.push(options[j]);
                        break;
                    }
                };
            }
        }
        
        if(arr != ''){
            question.options = options;
            question.ref_info.answers = arr;
            return question;
        }
    },
    // 设置用户答案
    setUserAnswer:function(questions,userAnswers){
        questions && $.each(questions.children, function () {
            methods.setRefAnswer(this)
            this.userAnswer = methods.findUserAnswer(userAnswers, this.version_id);
            this.children && this.children.length > 0 && methods.setUserAnswer(this, userAnswers);
        });
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
    sortAttachments:function(questions){
        questions && $.each(questions.children,function(){
            var atta = this.attachments,
                audioArr = [],
                imgArr = [],
                videoArr = [];
            for (var i = 0,len=atta.length; i < len; i++) {
                if(atta[i].file_type==1) imgArr.push(atta[i])
                if(atta[i].file_type==2) audioArr.push(atta[i])
                if(atta[i].file_type==3) videoArr.push(atta[i])
            }
            this.attachments = audioArr.concat(imgArr).concat(videoArr)
        })
    },
    // 标记大题是否未完成
    markPartAnswer:function(questions){
        function findUnfinishedQuestion(question){
            if(!question.userAnswer || !question.userAnswer.answers || question.userAnswer.answers.length==0){
                questions.unfinished=true;
                return false;
            }else{
                var _answers = question.userAnswer.answers
                for (var i = 0; i < _answers.length; i++) {
                    if(_answers[i].content===undefined || _answers[i].content===''){
                        questions.unfinished=true;
                        return false;
                    }
                }
            }
        }
        
        questions.unfinished=false;
        questions && $.each(questions.children,function(){
            if(this.children && this.children.length > 0){
                $.each(this.children,function(){
                    findUnfinishedQuestion(this);
                })
            }else{
                findUnfinishedQuestion(this);
            }
        })
    }
}

// 获取听说模考试卷信息
function getLsExamination(){
    // debug && alert('正在请求2...听说模考试卷信息')
    ciwongPlugin && ciwongPlugin.createEvent('GetJsonData' , [{source:3}] ,function( response ){
        log = '返回听说模考试卷信息'
        debug && alert(log + (typeof response=='string'?response:JSON.stringify(response)) )
        dataReady('getLsExamination',response);
    })
}
// 获取听说模考用户答案/老师选题（checkResouresIds）
function getDoWorkInfo(){
    // debug && alert('正在请求2...用户答案/老师选题（checkResouresIds）')
    ciwongPlugin && ciwongPlugin.createEvent('getDoWorkInfo' , [{source:3}] ,function( response ){
        log = '返回用户答案'
        debug && alert(log + (typeof response=='string'?response:JSON.stringify(response)) )
        dataReady('getDoWorkInfo',response);
    })
}
// 重做该题
function reformQuestion(partIndex){
    // 播放音频/视频其他的全部暂停
    $('video,audio').each(function(i2,item2){
        var index = $(item2).attr('index')
        if(item2.nodeName=='AUDIO' && index){
            window["AudioList"][index].pause();
        }else{
            item2.pause();
        }
    })

    log = '重做该题'
    debug && alert(log)
    ciwongPlugin && ciwongPlugin.createEvent('reformQuestion' , [{source:3,index:partIndex,queNum:apiData.answers.checkedResource[partIndex]}] ,function( response ){
        debug && alert(log + (typeof response=='string'?response:JSON.stringify(response)) )
        dataReady('getDoWorkInfo',response);
    })
}
// Api数据集中处理
function dataReady(method,data){
    var json = typeof data == 'string' ? JSON.parse(data) : data;
    if(method=='getLsExamination'){
        apiData.exampaper = json;
    }else if(method=='getDoWorkInfo'){
        apiData.answers = json;
    }else if(method=='getUserInfo'){
        apiData.userInfo = json;
    }

    if(apiData.exampaper !=='' && apiData.answers !=='' && apiData.userInfo !==''){
        // 用户信息
        if(apiData.userInfo.classes && apiData.userInfo.classes.length>1){
            apiData.userInfo.classes.splice(1)
        }

        // 处理列表和用户答案
        var showdata = apiData.answers.checkedResource && apiData.answers.checkedResource.join() || '';
        var userAnswers = apiData.answers.workAnswers || [];
        var exampaper = methods.showPartList(apiData.exampaper,showdata)
        
        $.each(exampaper.parts,function(){// part
            methods.setUserAnswer(this,userAnswers)
            methods.sortAttachments(this)
            // 标记大题是否已做完
            methods.markPartAnswer(this)
        })
        debug && alert('是否重做:'+JSON.stringify(exampaper))
        // 渲染页面
        showPage(exampaper)
    }
}

// 渲染页面
function showPage(exampaper){
    lsLoadComponent(Vue)
    lsLoadFilter(Vue,apiData.answers.workStatus)

    window.vue = new Vue({
        el:'#app',
        data:{
            showRefAnswers:!isLsSharePage,   // 是否显示参考答案
            exampaper:exampaper,
            userInfo: apiData.userInfo,
            answers:apiData.answers
        },
        methods:{
            // 获取题号
            getQuestionNo:function(index){
                // return index;   // 暂时使用旧排序方式
                questionNo++;
                return questionNo;
            }
        },
        init:function(){
        },
        created:function(){
            $('.loading').hide();
            if(!this.exampaper || !this.exampaper.parts || this.exampaper.parts.length==0) {
                $.error('题目获取失败~')
            }else{
                $('.wrap').show()
            }
            exampaper.title && (document.title = exampaper.title);
            
            if(/Iphone|Ipad|Ipod/i.test(navigator.userAgent)){
                // ios需要主动请求更改文档标题
                log = 'set SetTitle'
                ciwongPlugin && ciwongPlugin.createEvent('SetTitle' , [{source:3,title:document.title}] ,function( response ){
                    // alert(log + (typeof response=='string'?response:JSON.stringify(response)) )
                })
            }
        },
        ready:function(){
            // 初始化音频组件2
            $('.audioBox .taskBoxLinks').each(function(){
                new AudioClass(this)
            });

            // 播放音频/视频其他的全部暂停
            $('video,audio').each(function(i1,item1){
                item1.addEventListener("playing", function(){
                    $('video,audio').each(function(i2,item2){
                        if((item1.nodeName != item2.nodeName) || (i1 != i2) ){
                            var index = $(item2).attr('index')
                            if(item2.nodeName=='AUDIO' && index){
                                window["AudioList"][index].pause();
                            }else{
                                item2.pause();
                            }
                        }
                    })
                });
            })


            // ipad video播放不了问题处理
            var ua = navigator.userAgent;
            if(ua.indexOf("iPhone") != -1 ||ua.indexOf("iPad") != -1 || ua.indexOf("MX4") != -1){
                // 视频播放
                $('video').each(function(index, el) {
                    if(ua.indexOf("MX4") != -1) $(this).removeProp('controls');
                    $(this).after('<div class="video-icon" onclick="videoPlay(this)"></div>')
                });
            }

            // 点击失败图标重播音频
            $('.loadError').click(function(event) {
                $(this).siblings('.audioBtn').click();
            });

            // 兼容某些机型不能获取音频时间的问题
            if(document.getElementsByTagName('audio').length>0 && window["AudioList"] && window["AudioList"][0] && !window["AudioList"][0].audio.duration){
                var isLoadPage = false;
                document.addEventListener('touchstart',function(){
                    if(!isLoadPage){
                        isLoadPage = true;
                        for(var i=0,len=window["AudioList"].length;i<len;i++){
                            window["AudioList"][i].pause();
                        }
                    }
                })
            }
        }
    })
}

// ipad video播放不了问题处理
function videoPlay(obj){
    var video = $(obj).siblings('video')[0]
    
    $(obj).remove();
    if(video.paused){
       video.play();
    }else{
       video.pause();
    } 
}

var timer = setTimeout(function(){
    log = '首次定时器已执行'
    if(typeof cordova !='undefined' && typeof cordova.exec =='function'){
        getLsExamination()
        getDoWorkInfo()
        setTimeout(timer)
    }
},200)

if(location.href.split('debug=')[1]){
    $.getJSON('../../data/ls_paper.json', function(response, textStatus) {
        dataReady('getLsExamination',response);
    });
    $.getJSON('../../data/ls_answers.json', function(response, textStatus) {
        dataReady('getDoWorkInfo',response);
    });
}