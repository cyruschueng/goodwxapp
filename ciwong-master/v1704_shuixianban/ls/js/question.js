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
    }
}

// http://123.56.154.119:8877/v1704_shuixianban/lsShare/?clientId=20001&userId=580826062&brandId=524726977&versionId=4657056784883491176&doWorkId=4286012342226373

var  clientId = $common.getUrlParaBase64('clientId') || '';
var  userId = $common.getUrlParaBase64('userId') || '';
var  brandId = $common.getUrlParaBase64('brandId') || '';
var  versionId = $common.getUrlParaBase64('versionId') || '';
var  doWorkId = $common.getUrlParaBase64('doWorkId') || '';

var authorization = '?clientId='+ clientId + '&userId='+ userId;

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
// 获取听说模考试卷信息（包括总分）
function getLsExamination(){
    var url = API.getLsExamination + authorization + '&versionId='+ versionId;
    $common.ajax(url,function(response){
        log = '返回听说模考试卷信息'
        var json = typeof response == 'string' ? JSON.parse(response) : response;
        if((json.errcode==undefined || json.errcode!=0) || !json.data){
            $.error(json.msg || log)
        }else{
            dataReady('getLsExamination',json.data);
        }
    },userId)
}
// 获取用户答案
function getWorkAnswers(){
    var url = API.getWorkAnswers + authorization + '&doWorkId='+ doWorkId;
    $common.ajax(url,function(response){
        log = '返回用户答案'
        var json = typeof response == 'string' ? JSON.parse(response) : response;
        if((json.errcode==undefined || json.errcode!=0) || !json.data){
            $.error(json.msg || log)
        }else{
            dataReady('getWorkAnswers',json.data);
        }
    },userId)
}
// 获取听说模考用户答案（包括用户总得分）/老师选题（checkResouresIds）/当前批改状态（workStatus）
function getDoWorkInfo(){
    var url = API.getDoWorkInfo + authorization + '&doWorkId='+ doWorkId;
    $common.ajax(url,function(response){
        log = '返回听说模考用户答案'
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
        var userAnswers = apiData.answers.workAnswers || '';
        var exampaper = methods.showPartList(apiData.exampaper,showdata)
        
        $.each(exampaper.parts,function(){// part
            methods.setUserAnswer(this,userAnswers)
            methods.sortAttachments(this)
        })
        // 渲染页面
        showPage(exampaper)
    }
}

// 渲染页面
function showPage(exampaper){

    // 小题整合 组件
    Vue.component('question',{template:'#question-template',props:['question','questionnum','showrefanswers','index','parentqtype']})
    // 附件 组件
    Vue.component('attachments',{template:'#attachments-template',props:['attachments']})

    // 选择题 组件
    Vue.component('question-choice',{template:'#question-choice-template',props:['question','questionnum','showrefanswers','parentqtype','index']})
    // 简答题 组件
    Vue.component('question-shortanswer',{template:'#question-shortanswer-template',props:['question','questionnum','showrefanswers','parentqtype','index']})
    // 仿声朗读 组件
    Vue.component('question-imitation',{template:'#question-imitation-template',props:['question','questionnum','showrefanswers','parentqtype','index']})
    // 填空题 组件
    Vue.component('question-filling',{template:'#question-filling-template',props:['question','questionnum','showrefanswers','index']})
    // 阅读理解 组件
    Vue.component('question-reading',{template:'#question-reading-template',props:['question','questionnum','showrefanswers','index']})

    //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    //数字转成字母
    Vue.filter("fromCharCode",function(value) {
        return String.fromCharCode(65+value)
    });
    // 设置得分的标签(assess= undefined或6:未作答  0:未批改 1:对 2:错 3:半对 4:未知  5:批改失败)
    Vue.filter("setAssessIcon",function(userAnswer) {
        var msg='',
            answerIcon='';
        if(!userAnswer || userAnswer.assess===undefined || userAnswer.assess==6){
            msg = '未作答';
        }else{
            answerIcon = userAnswer.assess==1? 'correct':userAnswer.assess==2? 'error':userAnswer.assess==3?'partly-correct':'';
            if(answerIcon) answerIcon='<span class="icon display-ib mlr20 '+answerIcon+'"></span>';

            msg = userAnswer.assess==4?'未知':'';
        }
        if(msg) msg = '<span class="fs-30 mlr20">'+msg+'</span>';
        return apiData.answers.workStatus==16? '<span class="fs-30 mlr20">评分中</span>' : (answerIcon || msg);
    });
    // 设置得分(0:未批改 1:对 2:错 3:半对 4:未知)
    Vue.filter("setAssess",function(userAnswer) {
        var html='';
        if(userAnswer && userAnswer.score!==undefined){
            if(userAnswer.assess===0){
                html = '评分中'
            }else if(userAnswer.assess===5){
                html = '批改失败'
            }else{
                html = parseFloat(userAnswer.score) + '分'
            }
        }else{
            html = 0 + '分'
        }
        return apiData.answers.workStatus==16? '评分中' : html;
    });
    // 设置填空题得分(0:未批改 1:对 2:错 3:半对 4:未知)
    Vue.filter("setAssessFilling",function(question,$index) {
        // {{!(question.userAnswer && question.userAnswer.answers && question.userAnswer.answers[$index])?0: ( question.userAnswer.answers[$index].assess==1 ? ((question.question_ref_sorce/question.options.length).toFixed(1) || 0) : (question.userAnswer.answers[$index].item_score || 0) )}}分
        var html;
        if(question.userAnswer && question.userAnswer.answers && question.userAnswer.answers[$index]!==undefined){
            if(question.userAnswer.answers[$index].assess===0){ // 未批改
                html = '评分中'
            }else{
                html = question.userAnswer.answers[$index].assess==1 ? ((question.question_ref_sorce/question.options.length).toFixed(2) || 0) : (question.userAnswer.answers[$index].score || question.userAnswer.answers[$index].item_score || 0)
                html = parseFloat(html) + '分'
            }
        }else{
            html = 0 + '分'
        }

        return html;
    });
    // 选项评判
    Vue.filter("setOptionsIcon",function(option,userAnswer) {
        var className = ''
        if(option.is_answer) className = 'op-green'
        else if(userAnswer){    // 不是参考答案
            var isCorrect = false;
            userAnswer.answers.forEach(function(answer){
                // 答案类型(1:音频URL 2:选项ID 3:填空题答案)
                if(answer.answerType==2){
                    if(answer.content == option.id){
                        className = 'op-red'
                    }
                }
            })
        }
        return className
    });
    // 用户选项内容
    Vue.filter("fillingSetStem",function(index,userAnswer) {
        var res='';
        if(userAnswer && userAnswer.answers && userAnswer.answers[index]){
            res = userAnswer.answers[index].content
        }
        return res
    });
    Vue.filter("toString",function(val) {
        return typeof val =='string'? val : JSON.stringify(val);
    });
    // 格式化html
    Vue.filter("formatHtml",function(val,type) {
        if(type==3){
            return val.replace(/{#blank#}(\d*){#\/blank#}/g,'<span class="filling-txt">$1</span>')
        }else{
            return val.replace(/&nbsp;/g,' ')
        }
    });
    // 格式化音频url
    Vue.filter("formatAudioUrl",function(val) {
        return val;
        // return dictPath? dictPath+''+val : val;
    });
    Vue.filter("formatAnswers",function(text){
        var regExp = /#YZSID:[A-Z0-9-_.]+#/; //口头作文id过滤
        var jsgExp = /#JSGF/;                //过滤简答题的答案
        if(regExp.test(text)){
        text = text.replace(regExp,'');
        }
        if(jsgExp.test(text)){
        text = '答案略';
        }
        return text;
    });

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
            // 评论内容传给App
            if(apiData.answers.comment){
                log = 'app GetComments'
                ciwongPlugin.createEvent('GetComments' , [{source:3,comment:apiData.answers.comment}] ,function( response ){
                    // alert(log + (typeof response=='string'?response:JSON.stringify(response)) )
                })
            }
            if(/Iphone|Ipad|Ipod/i.test(navigator.userAgent)){
                // ios需要主动请求更改文档标题
                log = 'set SetTitle'
                ciwongPlugin.createEvent('SetTitle' , [{source:3,title:document.title}] ,function( response ){
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

isLsSharePage && getUserInfo()
getLsExamination()
getDoWorkInfo()
// getWorkAnswers()
