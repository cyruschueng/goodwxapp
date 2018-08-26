var debug;
// debug = true;  // 开启调试
var log='异常log';
// APP数据集合
var apiData = {
    exampaper:'',
    answers:'',
    key:''
}

// 设置超时报错
var firstTimer = setTimeout(function(){
    if(apiData.exampaper===''){
        $.error('Api请求超时')
        return;
    }
},30000)

window.onerror = function(e){
    clearTimeout(window.questionTimer)
	window.questionTimer = setTimeout(function(){
            console.log('异常退出')
            app.exitOnlineAnswer(local.getAnswer())
	},15000)
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
    formatEmpty:function(str){
        return str.replace(/&nbsp;/g,' ');
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
    setAssessIcon:function(userAnswer){
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
        return workStatus==16? '<span class="fs-30 mlr20">评分中</span>' : (answerIcon || msg);
    },
    // 选项评判 assess:评判状态(0:未选择 1:对 2:错)
    setOptionsIcon:function(question){
        if(!question) return ;
        for(var i=0;i<question.options.length;i++){
            question.options[i].assess = 0;
            (question.qtype==3 || question.qtype==6 || question.qtype==7 || question.qtype==8) && (question.options[i].content = '');
            if(question.userAnswer){
                for(var j=0;j<question.userAnswer.answers.length;j++){
                    var answer = question.userAnswer.answers[j]
                    if(question.qtype==1 || question.qtype==2){
                        var option = question.options[i];
                        if(answer.answerType==1 && answer.content == option.id){
                            question.options[i].assess = option.is_answer? 1:2;
                        }
                    }else if(question.qtype==6 || question.qtype==7 || question.qtype==8){
                        if(i==answer.sid){
                            question.options[i].assess = question.options[i].stem==answer.content?1:2;
                            question.options[i].content = answer.content;
                        }
                    }
                }
            }
            if(question.qtype==3){
                for(var n=0;n<question.stemArr.length;n++){
                    var option = question.stemArr[n];
                    question.stemArr[n].content = '';
                    if(option.sid>=0 && question.userAnswer){
                        for(var j=0;j<question.userAnswer.answers.length;j++){
                            var answer = question.userAnswer.answers[j]
                            if(option.sid==answer.sid){
                                question.stemArr[n].content = answer.content!==undefined?answer.content : '';
                                var optionIndex = methods.fillingConvertForStem(n,true);
                                question.options[optionIndex] && (question.options[optionIndex].content = answer.content);
                            }
                        }
                    }
                }
            }
        }
        return question;
    },
    // 初始化填空题
    setfillingQuestion:function(question){
        if(question.qtype==3 && !question.stemArr){
            // question.stemArr = question.stem.split(/\{#blank#\}.*?\{#\/blank#\}/)
            var stemArr = question.stem.split(/\{#blank#\}|\{#\/blank#\}/)
            question.stemArr = []
            for(var i=0;i<stemArr.length;i++){
                question.stemArr.push({
                    sid:i%2==0?-1:methods.fillingConvertForStem(i,true),
                    html:stemArr[i],
                    content:''
                })
            }
        }
        return question;
    },
    // 填空题题干索引转换
    fillingConvertForStem:function(index,stemarrToStem){
        return stemarrToStem?(index+1)/2-1:(index+1)*2-1;
    },
    // 渲染填空题题干
    drawingFillingStem:function(question){
        if(question && question.qtype==3){
            var stemArrIndex,index = 0;
            question.stemHtml = question.stem.replace(/\{#blank#\}(\d*)\{#\/blank#\}/g,function(){
                stemArrIndex = methods.fillingConvertForStem(index,false);
                var input = '<input  type="text" class="ques" value="'+(question.options.length>index && question.options[index].content || '')+'" data-id="'+question.version_id+'_'+index+'" data-versionid="'+question.version_id+'"  data-sort="'+arguments[1]+'" data-assess="" data-index="'+index+'" placeholder="('+(index+1)+')" onblur="local.doFilling(this)" onfocus="local.focusInput(this)">';
                index++;
                return input;
            });
        }
        return question;
    },
    formatQuestion:function(questions,userAnswers){
        questions && $.each(questions.children, function () {

            methods.setUserAnswer(this,userAnswers);
            methods.sortAttachments(this);
            this.stem && (this.stem = methods.formatEmpty(this.stem) );
            this.qtype==3 && methods.setfillingQuestion(this);
            methods.setOptionsIcon(this);
            methods.drawingFillingStem(this);
            
            this.children && this.children.length > 0 && methods.formatQuestion(this, userAnswers);
        });
    },
    // 更新当前作业完成度
    updateQuestionFinished:function(exampaper){
        for(var j=0;j<exampaper.length;j++){
            var question = exampaper[j];
            if(question && question.level==2){
                question.finished=question.userAnswer?true:false;
                // 填空题
                if(question.qtype==3 && question.userAnswer && (!question.userAnswer.answers || question.userAnswer.answers.length!==question.options.length)) question.finished = false;
                if(question.children.length>0){
                    question.finished=true;
                    for(var n=0;n<question.children.length;n++){
                        question.children[n].level=3;
                        var subQuestion = question.children[n];
                        if(!subQuestion.userAnswer) question.finished=false;
                        // 填空题
                        if(subQuestion.qtype==3 && subQuestion.userAnswer && (!subQuestion.userAnswer.answers || subQuestion.userAnswer.answers.length!==subQuestion.options.length)) question.finished = false;
                    }
                }
                exampaper[j] = question;
            }
        }
        return exampaper;
    }
}
var local = {
    // 上一题
    prevQuestion:function(){
        clearTimeout(window.questionTimer)
        vue.currQuestion = false;
        var currSlide = mySwiper.slides[mySwiper.activeIndex];
        if(currSlide.getAttribute('data-isproblems')=='true'){// 是复合题
            var list = $(currSlide).find('.sub-question-item');
            var len = list.length;
            for(var i=0;i<list.length;i++){
                if($(list[i]).hasClass('showTag')){
                    (i>0)?($(list[i]).removeClass('showTag'),$(list[i-1]).addClass('showTag'),$('.body-main').scrollTop(0),local.pauseMedia()):mySwiper.slidePrev();
                    break;
                }
            }
            
        }else{  // 不是复合题
            mySwiper.slidePrev()
        }
    },
    // 下一题
    nextQuestion:function(){
        clearTimeout(window.questionTimer)
        vue.currQuestion = false;
        var currSlide = mySwiper.slides[mySwiper.activeIndex];
        if(currSlide.getAttribute('data-isproblems')=='true'){// 是复合题
            var list = $(currSlide).find('.sub-question-item');
            var len = list.length;
            for(var i=0;i<list.length;i++){
                if($(list[i]).hasClass('showTag')){
                    (i<len-1)?($(list[i]).removeClass('showTag'),$(list[i+1]).addClass('showTag'),$('.body-main').scrollTop(0),$(currSlide).find('.problems-question-box').scrollTop(0),local.pauseMedia()):mySwiper.slideNext();
                    break;
                }
            }
            
        }else{  // 不是复合题
            mySwiper.slideNext()
        }
    },
    // 获取本地答案，有versionId为获取单个答案，无versionId为获取所有答案
    getAnswer:function(versionId){
        var answers = localStorage.getItem('onlineAnswers_'+apiData.key)|| [];
        answers = typeof answers=='object'?JSON.stringify(answers):answers+'';
        if(versionId===undefined){ // 获取所有答案
            return answers;
        }else{
            for(var i=0;i<answers.length;i++){
                if(answers[i].versionId == versionId) return answers[i];
            }
        }
    },
    // 总分数
    getTotalScore:function(){
        var answers = this.getAnswer() || [];
        answers = answers && typeof answers=='string'?JSON.parse(answers):answers;
        var totalScore = 0;
        for(var i=0;i<answers.length;i++){
            totalScore+=answers[i].score || 0;
        }
        return totalScore;
    },
    // 剩余题目
    getRemainNum:function(){
        var list = vue.exampaper;
        var remainNum = 0;
        for(var i=0;i<list.length;i++){
            list[i].level==2 && list[i].finished==false && (remainNum++)
        }
        return remainNum;
    },
    delAnswer:function(versionId){
        if(!versionId) return false;
        var answers = localStorage.getItem('onlineAnswers_'+apiData.key) || [];
        try {
            answers = typeof answers=='string'?JSON.parse(answers):answers;
        } catch (e) {
            answers = []
            console.warn('本地存储数据格式错误：',e)
        }
        var hasAnswer = false;
        if(answers){
            for(var i=0;i<answers.length;i++){
                if(versionId == answers[i].versionId){
                    answers.splice(i,1)
                    hasAnswer = true;
                    break;
                }
            }
        }
        answers = typeof answers=='string'?answers:JSON.stringify(answers);
        hasAnswer && localStorage.setItem('onlineAnswers_'+apiData.key,answers);
    },
    delAllAnswer:function(){
        localStorage.removeItem('onlineAnswers_'+apiData.key);
        localStorage.removeItem('onlineAnswers_currQuestion_'+apiData.key);
    },
    setAnswer:function(answer){
        if(!answer) return false;
        // answer = JSON.parse(JSON.stringify(answer))
        var answers = localStorage.getItem('onlineAnswers_'+apiData.key) || [];
        try {
            answers = typeof answers=='string'?JSON.parse(answers):answers;
        } catch (e) {
            answers = []
            console.warn('本地存储数据格式错误：',e)
        }
        var hasAnswer = false;
        if(answers && answers.length>0){
            for(var i=0;i<answers.length;i++){
                if(answer.versionId == answers[i].versionId){
                    answers.splice(i,1,answer)
                    hasAnswer = true;
                    break;
                }
            }
        }
        if(!hasAnswer || answers.length==0) answers.push(answer);
        console.log('本地保存：',answers)
        answers = typeof answers=='string'?answers:JSON.stringify(answers);
        localStorage.setItem('onlineAnswers_'+apiData.key,answers);
    },
    // 记录用户当前题目记录
    saveLocalCurrQuestion:function(currQuestion){
        if(apiData.key && currQuestion!==undefined){
            localStorage.setItem('onlineAnswers_currQuestion_'+apiData.key,currQuestion);
        }
    },
    // 获取用户当前题目记录
    getLocalCurrQuestion:function(){
        if(apiData.key){
            return localStorage.getItem('onlineAnswers_currQuestion_'+apiData.key);
        }
        return null;
    },
    // 记录上一个题目
    setPrevQuestionLog:function(add){
        if(!add){
            vue.previousIndex = [vue.currIndex]
        }else{
            var index = vue.previousIndex.indexOf(vue.currIndex);
            index !=-1 && vue.previousIndex.splice(index,1)
            vue.previousIndex.push(vue.currIndex)
        }
        console.log('previousIndex:'+vue.previousIndex)
    },
    // 退出在线作答
    exitOnline:function(){
        var len = mySwiper.slides.length || 0;
        prevLen = vue.previousIndex.length;
        window.action = 'exitOnline';
        console.log('len='+len+',vue.previousIndex='+vue.previousIndex+',vue.currIndex='+vue.currIndex+',mySwiper.isEnd='+mySwiper.isEnd)
        if(mySwiper && mySwiper.isEnd || prevLen>1){
            var previousIndex = vue.previousIndex[prevLen-1] || 0;
            vue.previousIndex.splice(prevLen-1,1)
            mySwiper.slideTo(previousIndex, 0);
        }else{
            console.log('exit')
            app.exitOnlineAnswer(local.getAnswer())
        }
    },
    // 重做题目
    reFormQuestion:function(index){
        window.action = 'reFormQuestion'
        local.setPrevQuestionLog(true);
        mySwiper.slideTo(index, 0);
    },
    // 做题,index:选项下标或8判断题的值(1对 0错)
    doWork:function(question,index){
        var question = question && JSON.parse(JSON.stringify(question));
        var result, 
            userAnswer = question.userAnswer;
        if(question.qtype==1){
            userAnswer = [{sid:index,content:question.options[index].id}]
            result = local.correct(question,userAnswer)
        }else if(question.qtype==2){
            var result = [],
                baseAnswer = {sid:index,content:question.options[index].id},
                hasAnswer = false;
            if(userAnswer){
                for(var i=0;i<userAnswer.answers.length;i++){
                    if(index == userAnswer.answers[i].sid){
                        hasAnswer = true;
                    }else{
                        result.push(userAnswer.answers[i])
                    }
                }
            }
            if(!hasAnswer)  result.push(baseAnswer)
            result = local.correct(question,result)
        }else if(question.qtype==6 || question.qtype==7 || question.qtype==8){
            userAnswer = [{sid:0,content:index}]
            result = local.correct(question,userAnswer)
        }else if(question.qtype==3){
            userAnswer = []
            for(var i=0;i<question.stemArr.length;i++){
                var option = question.stemArr[i];
                if(option.sid>=0){
                    userAnswer.push({
                        sid:option.sid,
                        content:option.content
                    })
                }
            }
            result = local.correct(question,userAnswer)
        }
        // 用户答案为空则清空评分结果
        if(result && result.assess!=1){
            var hasAnswer = false;
            for(var i=0;i<result.answers.length;i++){
                if(result.answers[i].content){
                    hasAnswer = true;
                    break;
                }
            }
            !hasAnswer && (result = null);
        }
        result && console.log(JSON.parse(JSON.stringify(result)))
        return result;
    },
    // 作业批改类
    // @paran question:题目
    // @paran userAnswer:用户答案，格式如：[{sid:0,content:'950460955559143355'},{sid:1,content:'2222222222222222222'}]
    // @paran type:处理类型，默认评分，type=2为删除答案
    // @return Array/Boolean
    // ---------------------------------------------------------------------------------------------------------------
    // @remark qtype:题目类型(1:单选题 2:多选题 3:填空题 4:完形填空 5:阅读理解 6:简答题 7:简答题2 8:判断题)
    // @remark assess:评分状态(undefined或6:未作答  0:未批改 1:对 2:错 3:半对 4:未知 5:批改失败)
    // @remark answerType:答案类型(1:字符串 2:音频文件)
    // @remark sid:下标
    // @remark content:答案内容
    // @remark score:得分
    correct:function(question,userAnswer,type){
        var corrResult = {
            answers: [],
            versionId: typeof question=='object' && question.version_id && question.version_id+'',
            assess: 0,
            score: 0
        }
        if(!userAnswer || !question || !question.ref_info){
            console.log('评分异常：参数缺失，question:',question,'userAnswer:'+userAnswer)
            return undefined;
        }
        if(question.qtype==2 && userAnswer.length==0){
            local.delAnswer(question.version_id);
            return undefined;
        }
        question = JSON.parse(JSON.stringify(question))
        userAnswer = JSON.parse(JSON.stringify(userAnswer))
        var refAnswer = question.ref_info.answers;  // 参考答案
        var formatAnswers = []
        for(var i=0;i<userAnswer.length;i++){
            formatAnswers.push({
                sid: userAnswer[i].sid,
                answerType: 1,
                assess: 2,
                content: userAnswer[i].content+'',
                score: 0
            })
        }
        try {
                var isTrue = false;
                if(refAnswer && refAnswer.length>0 && userAnswer.length>0){
                    var sameNum = 0;
                    for(var i=0;i<refAnswer.length;i++){
                        for(var u=0;u<userAnswer.length;u++){
                            if(question.qtype==1 || question.qtype==2){
                                if(refAnswer[i].sid == userAnswer[u].sid && (refAnswer[i] == userAnswer[u].content || refAnswer[i].id == userAnswer[u].content)){
                                    if(refAnswer.length==1) formatAnswers[u].score=question.question_ref_sorce;
                                    formatAnswers[u].assess = 1;
                                    userAnswer[u].sid = -1;
                                    sameNum++;
                                }
                            }else if(question.qtype==6 || question.qtype==7 || question.qtype==8){
                                if(refAnswer[i] == userAnswer[u].content){
                                    formatAnswers[u].assess = 1;
                                    formatAnswers[u].score=question.question_ref_sorce;
                                    sameNum++;
                                }
                            }else if(question.qtype==3){
                                if(i == userAnswer[u].sid && (refAnswer[i]+'').toLocaleLowerCase() == (userAnswer[u].content+'').toLocaleLowerCase() ){
                                    formatAnswers[u].assess = 1;
                                    formatAnswers[u].score=question.question_ref_sorce;
                                    sameNum++;
                                }
                            }
                        }
                    }
                    // 正确选项个数和参考答案个数一致
                    if(sameNum == refAnswer.length && refAnswer.length == userAnswer.length){
                        isTrue = true;
                    }
                }
                if(isTrue){ // 正确
                    corrResult.assess = 1;
                    corrResult.score = parseFloat(question.question_ref_sorce);
                }else{
                    corrResult.assess = 2;
                }
                // 3填空题得分处理
                if(question.qtype==3 && refAnswer.length>0 && !isTrue){
                    corrResult.score = 0;
                    var itemScore = parseFloat((question.question_ref_sorce / question.ref_info.answers.length).toFixed(2));
                    for(var i=0;i<formatAnswers.length;i++){
                        if(formatAnswers[i].assess==1) {
                            formatAnswers[i].score = itemScore;
                            corrResult.score += itemScore;
                            if(!isTrue) corrResult.assess = 3;  // 半对
                        }
                    }
                }
                corrResult.answers = formatAnswers;
        } catch (error) {
            console.log('评分异常：',error)
            return undefined;
        }

        if(corrResult){
            // 去掉空答案,整体批评主观题
            if(!question.is_objective && !(question.qtype==1 || question.qtype==2 || question.qtype==8)){ // 主观题
                corrResult.assess = 4;
                corrResult.score = 0;
            }
            var _answers = [];
            for(var i=0;i<corrResult.answers.length;i++){
                if(!question.is_objective && !(question.qtype==1 || question.qtype==2 || question.qtype==8)){
                    corrResult.answers[i].assess = 4;
                    corrResult.answers[i].score = 0;
                }
                if(corrResult.answers[i].content!='') _answers.push(corrResult.answers[i])
            }
            corrResult.answers = _answers;
            if(_answers.length==0) corrResult = undefined;
            local.setAnswer(corrResult);
            local.saveLocalCurrQuestion(mySwiper.activeIndex);
        }
        return corrResult;
    },
    // 填空题做题
    doFilling:function(element){
        var versionId = $(element).data('versionid')
        var optionIndex = $(element).data('index')
        var id = $(element).data('id')
        vue._tempFillingVal = $tools.htmlEncode($tools.removeEmoticons($tools.trim($(element).val())))
        $(element).val(vue._tempFillingVal);
        var question = vue.findQuestion(versionId);
        question = question && JSON.parse(JSON.stringify(question));
        if(question && question.qtype==3 && question.options[optionIndex].content != vue._tempFillingVal){
            // var inputstr= question.stem.match(/<input [^>]+ [^>]+>/g)[index-1]
            // inputstr.replace(/ value="(+)"/i,' value="'+val+'"')
            // question.stem = question.stem.replace(RegExp('<input [^>]+data-id="'+id+'" [^>]+>','g'),function(val){
            //     return arguments[0].replace(/value="*"/,'value="'+vue._tempFillingVal+'"')
            // })
            var index = methods.fillingConvertForStem(optionIndex,false);
            question.stemArr[index].content = question.options[optionIndex].content = vue._tempFillingVal;
            question.userAnswer = local.doWork(question,index)
            question = methods.setOptionsIcon(question);
            // question = methods.drawingFillingStem(question)
            window.vue.updateQuestion(question)
            console.log('content2:',question.stemArr[index].content)
        }
    },
    focusInput:function(element){
        var optionIndex = $(element).data('index')
        var versionId = $(element).data('versionid')
        var question = vue.findQuestion(versionId);
        if(question){
            if(vue.currQuestion && vue.currQuestion!=question.version_id){
                $(element).blur()
                return false;
            }
            !vue.currQuestion && (vue.currQuestion = question.version_id);
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
    }
}
// h5与app交互的接口集合
var app = {
    getOnlineExamination:function(){
        ciwongPlugin && ciwongPlugin.createEvent('GetOnlineExamination' , [{source:3}] ,function( response ){
            log = '获取在线作答试卷'
            debug && alert(log +":"+ (typeof response=='string'?response:JSON.stringify(response)) )
            dataReady('getOnlineExamination',response);
        })
    },
    getOnlineAnswer:function(){
        ciwongPlugin && ciwongPlugin.createEvent('GetOnlineAnswer', [{source:3}] ,function( response ){
            log = '获取用户答案'
            debug && alert(log + (typeof response=='string'?response:JSON.stringify(response)) )
            dataReady('getDoWorkInfo',response);
        })
    },
    setOnlineAnswer:function(answers){
        console.log('重设用户答案：'+answers)
        ciwongPlugin && ciwongPlugin.createEvent('SetOnlineAnswer' , [{source:3,answers:answers}] ,function( response ){
            log = '重设用户答案'
            debug && alert(log + (typeof response=='string'?response:JSON.stringify(response)) )
        })
    },
    submitOnlineAnswer:function(answers,totalScore,remainNum){
        local.pauseMedia();

        debug && alert('开始提交作业，总分：'+JSON.stringify(totalScore)+'，还剩'+remainNum+'个未完成\n答案：'+JSON.stringify(answers))
        ciwongPlugin && ciwongPlugin.createEvent('SubmitOnlineAnswer' , [{source:3,answers:answers,totalScore:totalScore,remainNum:remainNum}] ,function( response ){
            log = '提交作业'
            debug && alert(log + (typeof response=='string'?response:JSON.stringify(response)) )
            response && local.delAllAnswer();
        })
    },
    exitOnlineAnswer:function(answers){
        ciwongPlugin && ciwongPlugin.createEvent('ExitOnlineAnswer' , [{source:3,answers:answers}] ,function( response ){
            log = '退出作答'
            debug && alert(log + (typeof response=='string'?response:JSON.stringify(response)) )
        })
    },
    getOnlineKey:function(){
        ciwongPlugin && ciwongPlugin.createEvent('GetOnlineKey' , [{source:3}] ,function( response ){
            log = '获取作业key'
            debug && alert(log + (typeof response=='string'?response:JSON.stringify(response)) )
            if(response){
                apiData.key = response;
                getDoWorkInfo();
            } 
        })
    },
    openVideo:function(url){
        var _url = url && url.replace("letv://", "") || '';
        log = '开始播放视频'
        debug && alert(log)
        ciwongPlugin && ciwongPlugin.createEvent('OpenVideo' , [{source:3,letv:_url, btn: 1}] ,function( response ){
        })
    }
}
window.onerror = function(e){
    debug && alert('页面出错了~\n'+JSON.stringify(e))
    // local.exitOnline();
}

// 获取用户答案
function getDoWorkInfo(){
    var answers = local.getAnswer();
    if(!answers){
        app.getOnlineAnswer();
    }else{
        dataReady('getDoWorkInfo',answers);
    }
}

// Api数据集中处理
function dataReady(method,data){
    var json = data && typeof data == 'string' ? JSON.parse(data) : data;
    if(method=='getOnlineExamination'){
        apiData.exampaper = json;
    }else if(method=='getDoWorkInfo'){
        apiData.answers = json || [];
    }

    if(apiData.exampaper !=='' && apiData.answers !==''){
        // 处理列表和用户答案
        var userAnswers = apiData.answers || '';
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
        showPage(list,totalNum,title,local.getLocalCurrQuestion())
    }
}

// 渲染页面
function showPage(exampaper,totalNum,title,currIndex){
    onlineDoWorkLoadComponent(Vue)
    onlineDoWorkLoadFilter(Vue)

    window.vue = new Vue({
        el:'#app',
        data:{
            exampaper:exampaper,
            totalNum:totalNum,              // 总页数
            previousIndex:[],         // 上一个题目序号
            currIndex:parseInt(currIndex) || 0,         // 当前题目序号
            title:title,
            currQuestion:false,
            // answers:apiData.answers,
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
            updateQuestion:function(question){
                if(!question) return false;
                var havFind=false,
                    isLastQuestion = false;
                for(var i=0;i<this.exampaper.length;i++){
                    var oldQuestion = this.exampaper[i];
                    if(oldQuestion.children && oldQuestion.children.length>0){  // 该题是复合题
                        for(var j=0;j<oldQuestion.children.length;j++){
                            if(question.version_id == oldQuestion.children[j].version_id){
                                // if(question.qtype==3){  // 填空题暂不更新stem
                                    this.exampaper[i].children[j].stemArr = question.stemArr;
                                    this.exampaper[i].children[j].options = question.options;
                                    this.exampaper[i].children[j].userAnswer = question.userAnswer;
                                // }else{
                                //     this.exampaper[i].children.splice(j,1,question);
                                // }
                                havFind = true;
                                if(j>=oldQuestion.children.length-1) isLastQuestion = true;
                                break;
                            }
                        }
                    }else if(question.version_id == oldQuestion.version_id){
                        // if(question.qtype==3){  // 填空题暂不更新stem
                            this.exampaper[i].stemArr = question.stemArr;
                            this.exampaper[i].options = question.options;
                            this.exampaper[i].userAnswer = question.userAnswer;
                        // }else{
                        //     this.exampaper.splice(i,1,question);
                        // }
                        havFind = true;
                        if(i>=this.exampaper.length-1 || this.exampaper[i+1].level==1) isLastQuestion = true;
                        break;
                    }
                    if(havFind) break;
                }
                this.exampaper = methods.updateQuestionFinished(this.exampaper);
                // 大题的最后二级题目保存答案到app
                if(isLastQuestion){
                    app.setOnlineAnswer(local.getAnswer())
                }
                this._question = question;
                this.$nextTick(function(){
                    if(this._question.qtype==1 || this._question.qtype==8){
                        window.questionTimer = setTimeout(function(){
                            !mySwiper.animating && local.nextQuestion();
                        },500)
                    }
                    // $(mySwiper.slides[mySwiper.activeIndex]).find("table").css({width: '100%'});
                })
            },
            findQuestion:function(versionId,questions){
                var _question,
                    questions = questions || this.exampaper;
                for(var i=0;i<questions.length;i++){
                    if(questions[i].children && questions[i].children.length>0){
                        _question = this.findQuestion(versionId,questions[i].children);
                        if(_question && _question.version_id){
                            return _question;
                        }
                    }else if(versionId == questions[i].version_id){
                        return questions[i];
                    }
                }
            }
        },
        ready:function(){
            this.$nextTick(function(){
                $('.loading').hide();
                if(!this.exampaper) {
                    $.error('题目获取失败~')
                }else{
                    $('.wrap').show()
                }
                exampaper.title && (document.title = exampaper.title);
                // ios需要主动请求更改文档标题
                log = 'set SetTitle'
                ciwongPlugin && ciwongPlugin.createEvent('SetTitle' , [{source:3,title:document.title}] ,function( response ){
                    // alert(log + (typeof response=='string'?response:JSON.stringify(response)) )
                })
                var win_height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
                !window.mySwiper && pageInt(win_height)
                $("table").css({width: '100%'});
                // 初始化音频组件2
                $('.audioBox').each(function(){
                    new AudioClass(this)
                });
            })
        }
    })
}

function pageInt(win_height) {
    var backCard =  $('.backCard')
    var submitBox =  $('.submitBox')

	window.mySwiper = new Swiper('.swiper-container', {
		initialSlide:vue.currIndex,
		speed:500,
		slidesPerView:"auto",
        autoHeight:true,                         // 题目多的时候回造成ios卡屏
        // height : window.innerHeight,
        noSwipingClass : 'problems-question-box',   // 不可拖动块的类名
		// centeredSlides : true,                   // 题目多的时候回造成ios卡屏
		followFinger : false,           // 如设置为false，拖动slide时它不会动，当你释放时slide才会切换。
        // shortSwipes:false,           // 设置为false时，进行快速短距离的拖动无法触发Swiper
        onInit: function(swiper){
            btnShow(swiper)
        },
        onTransitionStart:function(swiper){
            clearTimeout(window.questionTimer)
            vue.currQuestion = false;
        },
        onTransitionEnd:function(swiper){
        },
        onSlideChangeStart: function(swiper){
            swiper.lockSwipes();
            if(window.action != 'exitOnline' && window.action != 'reFormQuestion') {
                local.setPrevQuestionLog();
            }else{
                window.action = '';
            }
            vue.currIndex = swiper.activeIndex;
            $('input,textarea').blur();
            // window.scrollTo(0,0)
            $('.body-main').scrollTop(0)
            btnShow(swiper)
            // 暂停全部媒体播放
            local.pauseMedia();
            swiper.unlockSwipes();
        },
        onSlideChangeEnd: function(swiper){
            clearTimeout(window.questionTimer)
        }
	})

    //跳转到答题卡页面
    $('#backCard').on("touchstart",function(e){
        local.setPrevQuestionLog();
        setTimeout(function(){mySwiper.slideTo(mySwiper.slides.length-1, 0);},100);
    })
    //返回/退出页面
    $('#exitOnline').on("touchstart",function(e){
        local.exitOnline()
    })
    //上一题
    $('#prevQuestion').on("touchstart",local.prevQuestion)
    //下一题
    $('#nextQuestion').on("touchstart",local.nextQuestion)
    //切到选项卡,不能用touchstart
    $('.reFormQuestion').on("click",function(){
        var index = $(this).attr('data-index') || 0;
        local.reFormQuestion(index);
    })
    //提交作业
    $('#submitOnline').on("touchstart",function(e){
        app.submitOnlineAnswer(local.getAnswer(),local.getTotalScore(),local.getRemainNum());
    })
    //减去导航栏和底部按钮和进度栏的高度
    $('.problems').css({ "height": ($('#body-main').height() - $('.sortContent').height()*2) + 'px'});
    if(mySwiper.slides.length>30) $('.question_btn,.submitBox').css('transition','none');
    // 上次做题提示信息
    if(vue.currIndex){
        var topTips = $('.top-tips')
        topTips.removeClass('hidetext')
        setTimeout(function(){topTips.addClass('hidetext')},3000);
    }
    
    clearTimeout(window.questionTimer)
}
// 上下题按钮和交作业按钮的显示隐藏
function  btnShow(swiper){
    var question_btn = $('.question_btn')
    var backCard =  $('.backCard')
    var submitBox =  $('.submitBox')
    var content =  $('.problems')
    if(swiper.isEnd){
        //返回答题卡图片
        backCard.hide();
        submitBox.addClass('btn_show');
    }else {
        backCard.show();
        submitBox.removeClass('btn_show');
    }
    if(swiper.isEnd || swiper.slides[swiper.activeIndex]&&swiper.slides[swiper.activeIndex].getAttribute('data-level') =='1'){ // 一级题目
        question_btn.removeClass('btn_show');
    }else{
        question_btn.addClass('btn_show');
    }
    // 复合题小题默认回到第一小题
    if(swiper.slides[swiper.activeIndex].getAttribute('data-isproblems')=='true'){// 是复合题
        $(swiper.slides[swiper.activeIndex]).find('.sub-question-item').each(function(index){
            if(index==0 && $(this).hasClass('showTag')){
                return false;
            }else if(index==0 && !$(this).hasClass('showTag')){
                $(this).addClass('showTag')
            }else if($(this).hasClass('showTag')){
                $(this).removeClass('showTag')
                return false;
            }
        })
    }
}

if(location.href.split('?debug=')[1]) {
    $(function(){
        apiData.key = location.href.split('?debug=')[1]
        $.getJSON('../../data/online'+location.href.split('?debug=')[1]+'_paper.json', {}, function(json, textStatus) {
            dataReady('getOnlineExamination',json.data);
            getDoWorkInfo();
        });
    })
}else{
    var timer = setInterval(function(){
        if(typeof ciwongPlugin != 'undefined' && typeof cordova !='undefined' && typeof cordova.exec =='function'){
            clearInterval(timer)
            app.getOnlineExamination();
            app.getOnlineKey();
        }
    },200)
}
