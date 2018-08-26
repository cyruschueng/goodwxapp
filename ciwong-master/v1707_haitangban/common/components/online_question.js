// 加载组件
function onlineLoadComponent(Vue){
    // 小题整合 组件
    Vue.component('question',{template:'\
        <question-choice            v-if="question.qtype==1"                    :question="question" :questionnum="questionnum" :showrefanswers="showrefanswers" :hidescore="hidescore" :parentqtype="parentqtype" :index="index"></question-choice>\
        <question-multiple-choice   v-if="question.qtype==2"                    :question="question" :questionnum="questionnum" :showrefanswers="showrefanswers" :hidescore="hidescore" :parentqtype="parentqtype" :index="index"></question-multiple-choice>\
        <question-filling           v-if="question.qtype==3"                    :question="question" :questionnum="questionnum" :showrefanswers="showrefanswers" :hidescore="hidescore" :parentqtype="parentqtype" :index="index"></question-filling>\
        <question-reading           v-if="question.qtype==4||question.qtype==5" :question="question" :questionnum="questionnum" :showrefanswers="showrefanswers" :hidescore="hidescore" :parentqtype="parentqtype" :index="index"></question-reading>\
        <question-shortanswer       v-if="question.qtype==6||question.qtype==7" :question="question" :questionnum="questionnum" :showrefanswers="showrefanswers" :hidescore="hidescore" :parentqtype="parentqtype" :index="index"></question-shortanswer>\
        <question-judge             v-if="question.qtype==8"                    :question="question" :questionnum="questionnum" :showrefanswers="showrefanswers" :hidescore="hidescore" :parentqtype="parentqtype" :index="index"></question-judge>\
    ',props:['question','questionnum','showrefanswers','hidescore','index','parentqtype']})
    // 附件 组件
    Vue.component('attachments',{template:'\
        <div v-for="data in attachments">\
            <div v-if="data.file_url">\
                <div class="img-box mt30" v-if="data.file_type == 1">\
                    <img onclick="hammerClass(this)" :src="data.file_url" alt="" />\
                </div>\
                <div class="audioBox mt30 clearfix" v-if="data.file_type == 2">\
                    <div class="audioBtn"></div>\
                    <div class="taskBoxLinks"><h3><i></i></h3></div>\
                        <div class="timeBox"><em class="currentTime"></em><strong class="duration"></strong></div>\
                    <div class="loadError fl ml20"></div>\
                    <audio :src="data.file_url" preload="auto"></audio>\
                </div>\
                <div class="video pr mt30" v-if="data.file_type == 3 && data.file_url.indexOf(\'letv://\')>-1">\
                    <iframe style="width:6.7rem;height:3.77rem;" :src="\'http://yuntv.letv.com/bcloud.html?uu=2bfc338ed7&vu=\'+data.file_url.replace(\'letv://\',\'\')+\'&width=100%&height=100%\'" frameborder=0 allowfullscreen></iframe>\
                </div>\
            </div>\
        </div>\
        ',props:['attachments']})
    // 参考信息,包括答案和解题思路 组件
    Vue.component('refinfo',{template:'\
        <div>\
            <div class="mt30 plr30 bdt1-f1f0ec" v-if="showrefanswers && question.ref_info && question.ref_info.answers && question.ref_info.answers.length>0">\
                <div class="fs30 col-999896 pt30">参考答案</div>\
                <div class="green mt20">\
                    <div class="inline" v-if="question.qtype==1 || question.qtype==2" v-for="val in question.ref_info.answers">{{val.sid | fromCharCode}}</div>\
                    <div class="inline" v-if="question.qtype==3" v-for="val in question.ref_info.answers">{{$index!=0? \'；\':\'\'}}<div class="inline" v-html="val"></div></div>\
                    <div class="inline" v-if="question.qtype==6 || question.qtype==7" v-for="val in question.ref_info.answers" v-html="val"></div>\
                    <div class="inline" v-if="question.qtype==8" v-for="val in question.ref_info.answers">{{val==\'1\'?\'正确\':\'错误\'}}</div>\
                </div>\
            </div>\
            <div class="mt30 plr30 bdt1-f1f0ec" v-if="showrefanswers && question.ref_info && question.ref_info.solving_idea">\
                <div class="fs30 col-999896 pt30">解题思路</div>\
                <div class="green mt20">\
                    <div v-html="question.ref_info.solving_idea"></div>\
                </div>\
            </div>\
        </div>\
        ',props:['question','showrefanswers']})
    // 序号线
    Vue.component('sortline',{template:'\
        <div class="sortContent">\
            <div class="serial_num"><span class="green">{{sort || 1}}</span>\
                <span class="col-999896">/</span>\
                <span class="col-999896 fs-24">{{totalnum || 1}}</span>\
            </div>\
            <div class="part_line"></div>\
        </div>\
    ',props:['sort','totalnum']})
    // 评分状态
    Vue.component('assesshtml',{template:'\
        <div><div class="tit2 mt30" v-if="!hidescore">\
            <div class="display-ib col-red" v-html="question.assessHtml"></div>\
            <span class="fs-24 col-808080" v-if="question.userAnswer && question.userAnswer.assess==4">(<span class="col-red">待批改</span>/{{parseFloat(question.question_ref_sorce)}}分)</span>\
            <span class="fs-24 col-808080" v-else>(<span class="col-red" v-html="question.userAnswer && question.userAnswer.score || 0"></span>分/{{parseFloat(question.question_ref_sorce)}}分)</span>\
        </div></div>\
    ',props:['question','hidescore']})
    // 1单选题
    Vue.component('question-choice',{template:'\
        <div>\
            <div class="mlr30">\
                <assesshtml :question="question" :hidescore="hidescore"></assesshtml>\
                <div class="lh54 mt24">\
                    <span v-if="parentqtype || question.sort">{{parentqtype?index:question.sort}}.</span>\
                    <div class="inline" v-html="question.stem"></div>\
                </div>\
                <attachments :attachments="question.attachments"></attachments>\
                <div class="choAnw mt40" v-for="(index,option) in question.options">\
                    <div class="fs-80">\
                        <span class="option" :data-id="option.id" :class="option.assess==1?\'op-green\':option.assess==2?\'op-red\':\'\'">{{$index | fromCharCode}}</span><div class="choTit inline" v-html="option.stem"></div>\
                        <attachments :attachments="option.attachments"></attachments>\
                    </div>\
                </div>\
            </div>\
            <refinfo :question="question" :showrefanswers="showrefanswers"></refinfo>\
        </div>\
        ',props:['question','questionnum','showrefanswers','hidescore','parentqtype','index']})
    // 2多选题
    Vue.component('question-multiple-choice',{template:'\
        <div class=" multipleChoice">\
            <div class="mlr30">\
                <assesshtml :question="question" :hidescore="hidescore"></assesshtml>\
                <div class="lh54 mt24">\
                    <span v-if="parentqtype || question.sort">{{parentqtype?index:question.sort}}.</span>\
                    <div class="inline" v-html="question.stem"></div>\
                </div>\
                <attachments :attachments="question.attachments"></attachments>\
                <div class="choAnw mt40" v-for="(index,option) in question.options">\
                    <div class="fs-80">\
                        <span class="option" :data-id="option.id" :class="option.assess==1?\'op-green\':option.assess==2?\'op-red\':\'\'">{{$index | fromCharCode}}</span><div class="choTit inline" v-html="option.stem"></div>\
                        <attachments :attachments="option.attachments"></attachments>\
                    </div>\
                </div>\
            </div>\
            <refinfo :question="question" :showrefanswers="showrefanswers"></refinfo>\
        </div>\
        ',props:['question','questionnum','showrefanswers','hidescore','parentqtype','index']})
    // 3填空题 组件
    /*
    <!--<div class="inline" v-for="stem in question.stemArr">\
        <div class="inline" v-if="$index%2==0" v-html="stem.html"></div>\
        <div class="inline ques" v-if="$index%2!=0" :class="stem.assess==1?\'fill-green\':stem.assess!=4?\'fill-red\':\'\'" v-html="stem.content"></div>\
    </div>-->\
    */
    Vue.component('question-filling',{template:'\
        <div>\
            <div class="mlr30">\
                <assesshtml :question="question" :hidescore="hidescore"></assesshtml>\
                <div class="lh54 mt24">\
                    <span v-if="parentqtype || question.sort">{{parentqtype?index:question.sort}}.</span>\
                    <div class="inline" v-html="question.stem"></div>\
                    <p>&nbsp;</p>\
                </div>\
                <attachments :attachments="question.attachments"></attachments>\
            </div>\
            <refinfo :question="question" :showrefanswers="showrefanswers"></refinfo>\
        </div>\
        ',props:['question','questionnum','showrefanswers','hidescore','parentqtype','index']})
    // 4/5阅读理解 组件
    Vue.component('question-reading',{template:'\
        <div>\
            <div class="problems">\
                <div class="problems-stem">\
                    <div class="lh54 mt24">\
                        <span v-if="question.sort">{{question.sort}}. </span>\
                        <div class="inline" v-html="question.stem | formatHtml question"></div>\
                    </div>\
                <attachments :attachments="question.attachments"></attachments>\
                </div>\
                <div class="problems-question-box">\
                    <div class="sub-question-item" :class="$index==0?\'showTag\':\'\'"  v-for="question in question.children">\
                        <question :question="question" :parentqtype="question.qtype" :showrefanswers="showrefanswers" :index="$index+1"></question>\
                    </div>\
                </div>\
            </div>\
        </div>\
    ',props:['question','questionnum','showrefanswers','hidescore','parentqtype','index']})
    // 6/7简答题 组件
    Vue.component('question-shortanswer',{template:'\
        <div>\
            <div class="mlr30">\
                <assesshtml :question="question" :hidescore="hidescore"></assesshtml>\
                <div class="lh54 mt24">\
                    <span v-if="parentqtype || question.sort">{{parentqtype?index:question.sort}}.</span>\
                    <div class="inline" v-html="question.stem"></div>\
                </div>\
                <attachments :attachments="question.attachments"></attachments>\
                <div><textarea class="anw" readonly="readonly" v-html="question.options[0].content"></textarea></div>\
            </div>\
            <refinfo :question="question" :showrefanswers="showrefanswers"></refinfo>\
        </div>\
        ',props:['question','questionnum','showrefanswers','hidescore','parentqtype','index']})
    // 8判断题
    Vue.component('question-judge',{template:'\
        <div>\
            <div class="mlr30">\
                <assesshtml :question="question" :hidescore="hidescore"></assesshtml>\
                <div class="lh54 mt24">\
                    <span v-if="parentqtype || question.sort">{{parentqtype?index:question.sort}}.</span>\
                    <div class="inline" v-html="question.stem"></div>\
                </div>\
                <attachments :attachments="question.attachments"></attachments>\
                <div class="choAnw mt40" v-for="(index,option) in question.options">\
                    <p class="fs-80"><i class="option-txt true" :class="option.content==\'1\' && option.assess==1?\'true_curr op-green\':option.content==\'1\' && option.assess==2?\'true_curr op-red\':\'\'"></i><span>正确</span></p>\
                    <p class="fs-80"><i class="option-txt false" :class="option.content==\'0\' && option.assess==1?\'false_curr op-green\':option.content==\'0\' && option.assess==2?\'false_curr op-red\':\'\'"></i><span>错误</span></p>\
                </div>\
            </div>\
            <refinfo :question="question" :showrefanswers="showrefanswers"></refinfo>\
        </div>\
        ',props:['question','questionnum','showrefanswers','hidescore','parentqtype','index']})
}
// 加载过滤器
function onlineLoadFilter(Vue,workStatus){
    //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    //数字转成字母
    Vue.filter("fromCharCode",function(value) {
        return String.fromCharCode(65+value)
    });
    // 格式化html
    Vue.filter("formatHtml",function(val,question) {
        if(question.qtype==4){
            return val.replace(/{#blank#}(\d*){#\/blank#}/g,'<span class="down_line">($1)</span>')
        }
        return val
    });
}