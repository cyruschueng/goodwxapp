// 加载组件
function lsLoadComponent(Vue){
    // 小题整合 组件
    Vue.component('question',{template:'\
        <question-choice v-if="question.qtype==1"       :question="question" :questionnum="questionnum" :showrefanswers="showrefanswers" :hidescore="hidescore" :parentqtype="parentqtype" :index="index"></question-choice>\
        <question-shortanswer v-if="question.qtype==6"  :question="question" :questionnum="questionnum" :showrefanswers="showrefanswers" :hidescore="hidescore" :parentqtype="parentqtype" :index="index"></question-shortanswer>\
        <question-imitation v-if="question.qtype==7"    :question="question" :questionnum="questionnum" :showrefanswers="showrefanswers" :hidescore="hidescore" :parentqtype="parentqtype" :index="index"></question-imitation>\
        <question-filling v-if="question.qtype==3"      :question="question" :questionnum="questionnum" :showrefanswers="showrefanswers" :hidescore="hidescore" :index="index"></question-filling>\
        <question-reading v-if="question.qtype==5"      :question="question" :questionnum="questionnum" :showrefanswers="showrefanswers" :hidescore="hidescore" :index="index"></question-reading>\
    ',props:['question','questionnum','showrefanswers','hidescore','index','parentqtype']})
    // 附件 组件
    Vue.component('attachments',{template:'\
        <div v-for="data in attachments">\
            <div v-if="data.file_url">\
                <div class="img-box mt30" v-if="data.file_type == 1">\
                    <img onclick="hammerClass(this)" :src="data.file_url" alt="" />\
                </div>\
                <div class="audioBox mt30 ml20 clearfix" v-if="data.file_type == 2">\
                    <div class="audioBtn"></div>\
                    <div class="taskBoxLinks"><h3><i></i></h3></div>\
                        <div class="timeBox"><em class="currentTime"></em><strong class="duration"></strong></div>\
                    <div class="loadError fl ml20"></div>\
                    <audio :src="data.file_url" preload="auto"></audio>\
                </div>\
                <div class="video pr mt30" v-if="data.file_type == 3">\
                    <video :src="data.file_url" controls="controls" preload="auto"></video>\
                </div>\
            </div>\
        </div>\
    ',props:['attachments']})
    // 选择题 组件
    Vue.component('question-choice',{template:'\
        <div class="bdt4-f1f0ec">\
            <div class="m20">\
                <div class="tit2 mt30" v-if="!hidescore">\
                    <span v-if="question.sort" :class="parentqtype?\' zanshiwuyong\':\'\'">{{question.sort}}.</span>\
                    <div class="display-ib col-red" v-html="question.userAnswer | setAssessIcon"></div>\
                    <span class="fs-24 col-808080">(<span class="col-red" v-html="question.userAnswer | setAssess"></span>/{{parseFloat(question.question_ref_sorce)}}分)</span>\
                </div>\
                <div class="txt1 lh53" v-html="question.stem | formatHtml"></div>\
                <attachments :attachments="question.attachments"></attachments>\
                <!-- option -->\
                <div v-for="option in question.options">\
                    <div class="mt40">\
                        <span class="option {{option | setOptionsIcon question.userAnswer }}">{{$index | fromCharCode}}</span><div class="display-ib ml20 option-txt" v-html="option.stem | formatHtml"></div>\
                        <attachments :attachments="option.attachments"></attachments>\
                    </div>\
                </div>\
                <!-- option end -->\
                <div v-if="showrefanswers && question.ref_info && question.ref_info.answers">\
                    <div class="fs30 col-999896  mt30 pt30 bdt1-f1f0ec">参考答案</div>\
                    <div class="green mt20">\
                        <div v-for="val in question.ref_info.answers">{{val.index | fromCharCode}}</div>\
                    </div>\
                </div>\
                <div v-if="question.textModule &&question.textModule[0] && question.textModule[0].textType==2 && question.textModule[0].questionStem!=\'\'">\
                    <div class="fs30 col-999896 mt40">听力原文</div>\
                    <div class="tit2 mt20" v-html="question.textModule[0].questionStem | formatHtml"></div>\
                </div>\
            </div>\
        </div>\
    ',props:['question','questionnum','showrefanswers','hidescore','parentqtype','index']})
    // 填空题 组件
    Vue.component('question-filling',{template:'\
        <div class="bdt4-f1f0ec">\
            <div class="m20">\
                <div class="tit2 mt30" v-if="!hidescore">\
                    <span v-if="question.sort" class="">{{question.sort}}. </span>\
                </div>\
                <div class="txt1 lh53" v-html="question.stem | formatHtml question.qtype"></div>\
                <attachments :attachments="question.attachments"></attachments>\
            </div>\
            <!-- option -->\
            <div class="bdt4-f1f0ec" v-for="option in question.options">\
                <div class="m20">\
                    <div class="tit2 pt30 mt30" v-if="!hidescore">\
                        <span class="option " v-if="option.sort">{{option.sort}}. </span>\
                        <div class="display-ib col-red" v-html="question.userAnswer && question.userAnswer.answers[$index] | setAssessIcon"></div>\
                        <span class="fs-24 col-808080">(<strong class="col-red" v-html="question | setAssessFilling $index"></strong>/{{parseFloat( (question.question_ref_sorce/question.options.length).toFixed(2) ) || 0}}分)\
                        </span>\
                    </div>\
                    <div class="mt40">\
                        <div class="display-ib" v-html="$index | fillingSetStem question.userAnswer"></div>\
                        <attachments :attachments="option.attachments"></attachments>\
                    </div>\
                    <div v-if="showrefanswers && option.stem">\
                        <div class="fs30 col-999896  mt30 pt30 bdt1-f1f0ec">参考答案</div>\
                        <div class="green mt20" v-html="option.stem | fillingRefAnswer"></div>\
                    </div>\
                </div>\
            </div>\
            <!-- option end -->\
        </div>\
    ',props:['question','questionnum','showrefanswers','hidescore','index']})
    // 简答题 组件
    Vue.component('question-shortanswer',{template:'\
        <div class="bdt4-f1f0ec">\
            <div class="m20">\
                <div class="tit2 mt30" v-if="!hidescore">\
                    <span v-if="question.sort" :class="parentqtype?\' zanshiwuyong\':\'\'">{{question.sort}}. </span>\
                    <div class="display-ib col-red" v-html="question.userAnswer | setAssessIcon"></div>\
                    <span class="fs-24 col-808080">(<span class="col-red" v-html="question.userAnswer | setAssess"></span>/{{parseFloat(question.question_ref_sorce)}}分)</span>\
                </div>\
                <div class="txt1 lh53" v-html="question.stem | formatHtml"></div>\
                <attachments :attachments="question.attachments"></attachments>\
                <div v-if="question.userAnswer.answers && question.userAnswer.answers[0] && question.userAnswer.answers[0].answerType==1 && question.userAnswer.answers[0].content && question.userAnswer.answers[0].content!=\'undefined\'">\
                    <div class="fs30 col-999896 mt40">我的录音</div>\
                    <div class="audioBox mt30 ml20 clearfix">\
                        <div class="audioBtn"></div>\
                        <div class="taskBoxLinks"><h3><i></i></h3></div>\
                        <div class="timeBox"><em class="currentTime"></em><strong class="duration"></strong></div>\
                        <div class="loadError fl ml20"></div>\
                        <audio :src="question.userAnswer.answers[0].content | formatAudioUrl" preload="auto"></audio>\
                    </div>\
                </div>\
                <div v-if="showrefanswers && question.ref_info && question.ref_info.solving_idea">\
                    <div class="fs30 col-999896 mt30 pt30 bdt1-f1f0ec">参考答案</div>\
                    <div class="green mt20">\
                        <div v-html="question.ref_info.solving_idea | formatHtml"></div>\
                    </div>\
                </div>\
            </div>\
        </div>\
        ',props:['question','questionnum','showrefanswers','hidescore','parentqtype','index']})
    // 仿声朗读 组件
    Vue.component('question-imitation',{template:'\
        <div class="bdt4-f1f0ec">\
            <div class="m20">\
                <div class="tit2 mt30" v-if="!hidescore">\
                    <span v-if="question.sort" :class="parentqtype?\' zanshiwuyong\':\'\'">{{question.sort}}. </span>\
                    <div class="display-ib col-red" v-html="question.userAnswer | setAssessIcon"></div>\
                    <span class="fs-24 col-808080">(<span class="col-red" v-html="question.userAnswer | setAssess"></span>/{{parseFloat(question.question_ref_sorce)}}分)</span>\
                </div>\
                <div class="txt1 lh53" v-html="question.stem | formatHtml"></div>\
                <attachments :attachments="question.attachments"></attachments>\
                <div v-if="question.userAnswer.answers && question.userAnswer.answers[0] && question.userAnswer.answers[0].answerType==1 && question.userAnswer.answers[0].content && question.userAnswer.answers[0].content!=\'undefined\'">\
                    <div class="fs30 col-999896 mt40">我的录音</div>\
                    <div class="audioBox mt30 ml20 clearfix">\
                        <div class="audioBtn"></div>\
                        <div class="taskBoxLinks"><h3><i></i></h3></div>\
                        <div class="timeBox"><em class="currentTime"></em><strong class="duration"></strong></div>\
                        <div class="loadError fl ml20"></div>\
                        <audio :src="question.userAnswer.answers[0].content | formatAudioUrl" preload="auto"></audio>\
                    </div>\
                </div>\
                <div v-if="showrefanswers && question.ref_info && question.ref_info.answers">\
                    <div class="fs30 col-999896 mt30 pt30 bdt1-f1f0ec">参考答案</div>\
                    <div class="green mt20">\
                        <div v-for="val in question.ref_info.answers"><div v-html="val | formatAnswers | formatHtml"></div></div>\
                    </div>\
                </div>\
            </div>\
        </div>\
        ',props:['question','questionnum','showrefanswers','hidescore','parentqtype','index']})
    // 阅读理解 组件
    Vue.component('question-reading',{template:'\
        <div class="bdt4-f1f0ec">\
            <div class="m20">\
                <div class="tit2 mt30" v-if="!hidescore">\
                    <span v-if="question.sort" class="">{{question.sort}}. </span>\
                </div>\
                <div class="txt1 lh53" v-html="question.stem | formatHtml"></div>\
                <attachments :attachments="question.attachments"></attachments>\
            </div>\
            <div v-for="question in question.children">\
                <question :question="question" :questionnum="questionnum" :showrefanswers="showrefanswers" :hidescore="hidescore" :parentqtype="question.qtype" :index="$index+1"></question>\
            </div>\
        </div>\
    ',props:['question','questionnum','showrefanswers','hidescore','index']})
}
// 加载过滤器
function lsLoadFilter(Vue,workStatus){
    //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    //数字转成字母
    Vue.filter("fromCharCode",function(value) {
        return String.fromCharCode(65+value)
    });
    // 设置得分的标签(assess= undefined或6:未作答  0:未批改 1:对 2:错 3:半对 4:未知 5:批改失败)
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
        return workStatus==16? '<span class="fs-30 mlr20">评分中</span>' : (answerIcon || msg);
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
                html = parseFloat(userAnswer.score.toFixed(2)) + '分'
            }
        }else{
            html = 0 + '分'
        }
        return workStatus==16? '评分中' : html;
    });
    // 设置填空题得分(0:未批改 1:对 2:错 3:半对 4:未知)
    Vue.filter("setAssessFilling",function(question,$index) {
        // {{!(question.userAnswer && question.userAnswer.answers && question.userAnswer.answers[$index])?0: ( question.userAnswer.answers[$index].assess==1 ? ((question.question_ref_sorce/question.options.length).toFixed(1) || 0) : (question.userAnswer.answers[$index].item_score || 0) )}}分
        var html;
        if(question.userAnswer && question.userAnswer.answers && question.userAnswer.answers[$index]!==undefined){
            if(question.userAnswer.answers[$index].assess===0){ // 未批改
                html = '评分中'
            }else{
                html = question.userAnswer.answers[$index].assess==1 ? (question.question_ref_sorce/question.options.length || 0) : (question.userAnswer.answers[$index].score || question.userAnswer.answers[$index].item_score || 0)
                html = parseFloat(html.toFixed(2)) + '分'
            }
        }else{
            html = 0 + '分'
        }

        return html;
    });
    // 选项评判
    Vue.filter("setOptionsIcon",function(option,userAnswer) {
        var className = ''
        if(userAnswer){
            var isCorrect = false;
            userAnswer.answers.forEach(function(answer){
                // 答案类型(1:音频URL 2:选项ID 3:填空题答案)
                if(answer.answerType==2){
                    if(answer.content == option.id){
                        className = option.is_answer?'op-green':'op-red';
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
    //填空题参考答案兼容一空多解
    Vue.filter("fillingRefAnswer",function(value) {
        var val = value;
        try{
            val = JSON.parse(val)
            val instanceof Array && (value = val.join('/'))
        }catch(e){}
        return value;
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

}