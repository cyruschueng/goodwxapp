var questionNo = 0

$('.loading').show();
$.alert = function(msg){
    $('.dialog-inner').html(msg)
    $('.dialog').show();
}


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

/**页面显示的时候调用 APP调用该函数传参**/
function callback(exampaper,userAnswers, dictPath, showdata){
    if(!exampaper || !exampaper.parts || !exampaper.parts[0].children){alert('题目获取失败');return;}
    var dictPath = dictPath && dictPath!='undefined'? dictPath:'';
    exampaper = methods.showPartList(exampaper,showdata)
    window.document.title = exampaper.title;

    if(debug){
        $('.loading').hide();
        window.exampaper = exampaper;
        var msg = JSON.stringify(exampaper)
        // $('body').append('<div>'+msg+'</div>')
    }

    $.each(exampaper.parts,function(){// part
        methods.setUserAnswer(this,userAnswers)
        methods.sortAttachments(this)
        // $.each(this.children,function(){// question
        //     methods.setRefAnswer(this)
        //     methods.setUserAnswer(this,userAnswers)
        // });
    })

    // 小题整合 组件
    Vue.component('question',{template:'#question-template',props:['question','questionnum','index','parentqtype']})
    // 附件 组件
    Vue.component('attachments',{template:'#attachments-template',props:['attachments']})

    // 选择题 组件
    Vue.component('question-choice',{template:'#question-choice-template',props:['question','questionnum','parentqtype']})
    // 简答题 组件
    Vue.component('question-shortanswer',{template:'#question-shortanswer-template',props:['question','questionnum','parentqtype']})
    // 仿声朗读 组件
    Vue.component('question-imitation',{template:'#question-imitation-template',props:['question','questionnum','parentqtype']})
    // 填空题 组件
    Vue.component('question-filling',{template:'#question-filling-template',props:['question','questionnum','index']})
    // 阅读理解 组件
    Vue.component('question-reading',{template:'#question-reading-template',props:['question','questionnum','index']})

    //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    //数字转成字母
    Vue.filter("fromCharCode",function(value) {
        return String.fromCharCode(65+value)
    });
    // 对错判断(0:未批改 1:对 2:错 3:半对 4:未知)
    Vue.filter("setAssessIcon",function(value) {
        var res,answerIcon;
        var msg = '未作答'
        if(value && value.assess){
            answerIcon = value.assess==1? 'correct':value.assess==2? 'error':value.assess==3?'partly-correct':'';
            msg = value.assess==0?'未批改':value.assess==4?'未知':'';
            if(answerIcon) answerIcon='<span class="icon display-ib '+answerIcon+'"></span>'
        }
        msg = '<span class="fs-30">'+msg+'</span>'
         return answerIcon || msg
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
        }
    });
    // 格式化音频url
    Vue.filter("formatAudioUrl",function(val) {
        return dictPath? dictPath+'//'+val : val;
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
            exampaper:exampaper,
            // dictPath: dictPath,
            // questionNo:0,
            // answer:userAnswers
        },
        methods:{
            // 获取题号
            getQuestionNo:function(){
                questionNo++;
                return questionNo;
            }
        },
        init:function(){
        },
        created:function(){
            $('.loading').hide();
            if(!this.exampaper || !this.exampaper.parts || this.exampaper.parts.length==0) {
                $.alert('题目获取失败')
            }else{
                $('.wrap').show()
            }
        },
        ready:function(){
            // 初始化音频文件
             audiojs.events.ready(function() {
               audiojs.createAll();
             });
        }
    })

}
