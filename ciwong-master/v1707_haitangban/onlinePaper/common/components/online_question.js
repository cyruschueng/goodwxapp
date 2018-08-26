// 加载组件
function onlineDoWorkLoadComponent(Vue){
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
                    <div v-if="data.file_url.indexOf(\'letv://\')>-1"><div class="video-icon"  onclick="app.openVideo(\'{{data.file_url}}\')"></div></div>\
                    <video v-else :src="data.file_url" controls="controls" preload="auto"></video>\
                </div>\
            </div>\
        </div>\
        ',props:['attachments']})
    // 序号线
    Vue.component('sortline',{template:'\
        <div class="sortContent mt30">\
            <div class="serial_num"><span class="green">{{sort || 1}}</span>\
                <span class="col-999896">/</span>\
                <span class="col-999896 fs-24">{{totalnum || 1}}</span>\
            </div>\
            <div class="part_line"></div>\
        </div>\
    ',props:['sort','totalnum']})
    // 1单选题
    Vue.component('question-choice',{template:'\
        <div>\
            <div class="mlr30">\
                <div class="lh54 mt24">\
                    <span v-if="parentqtype || question.sort">{{parentqtype?index:question.sort}}.</span>\
                    <div class="inline" v-html="question.stem"></div>\
                </div>\
                <attachments :attachments="question.attachments"></attachments>\
                <div class="choAnw mt40" v-for="(index,option) in question.options">\
                    <div class="fs-80" @click="doWork(index)">\
                        <span class="option" :data-id="option.id" :class="option.assess?\'op-green\':\'\'">{{$index | fromCharCode}}</span><div class="choTit inline" v-html="option.stem+\'&nbsp;\'"></div>\
                    </div>\
                    <attachments :attachments="option.attachments"></attachments>\
                </div>\
            </div>\
        </div>\
        ',props:['question','questionnum','showrefanswers','hidescore','parentqtype','index'],
        methods:{
            doWork:function(index){
                clearTimeout(window.questionTimer)
                this.question.userAnswer = local.doWork(this.question,index)
                this.question = methods.setOptionsIcon(this.question);
                window.vue.updateQuestion(this.question)
            }
        }
    })
    // 2多选题
    Vue.component('question-multiple-choice',{template:'\
        <div class=" multipleChoice">\
            <div class="mlr30">\
                <div class="lh54 mt24">\
                    <span v-if="parentqtype || question.sort">{{parentqtype?index:question.sort}}.</span>\
                    <div class="inline" v-html="question.stem"></div>\
                </div>\
                <attachments :attachments="question.attachments"></attachments>\
                <div class="choAnw mt40" v-for="(index,option) in question.options">\
                    <div class="fs-80" @click="doWork(index)">\
                        <span class="option" :data-id="option.id" :class="option.assess?\'op-green\':\'\'">{{$index | fromCharCode}}</span><div class="choTit inline" v-html="option.stem+\'&nbsp;\'"></div>\
                    </div>\
                    <attachments :attachments="option.attachments"></attachments>\
                </div>\
            </div>\
        </div>\
        ',props:['question','questionnum','showrefanswers','hidescore','parentqtype','index'],
        methods:{
            doWork:function(index){
                this.question.userAnswer = local.doWork(this.question,index)
                this.question = methods.setOptionsIcon(this.question);
                window.vue.updateQuestion(this.question)
            }
        }
    })
    // 3填空题 组件
    Vue.component('question-filling',{template:'\
        <div>\
            <div class="mlr30">\
                <div class="lh54 mt24">\
                    <span v-if="parentqtype || question.sort">{{parentqtype?index:question.sort}}.</span>\
                    <div class="inline" v-html="question.stemHtml"></div>\
                    <!--<div class="inline" v-for="stem in question.stemArr">\
                        <div class="inline" v-if="$index%2==0" v-html="stem.html"></div>\
                        <input v-if="$index%2!=0" type="text" class="ques" :placeholder="\'(\'+stem.html+\')\'" :data-id="question.version_id" v-model="stem.content" @keyup.enter="doWork($index,1)" @keyup.right="doWork($index,1)" @keyup.left="doWork($index,-1)" @blur="doWork($index)" @focus="filterEvent($index)" />\
                    </div>-->\
                    <p>&nbsp;</p>\
                    <attachments :attachments="question.attachments"></attachments>\
                </div>\
            </div>\
        </div>\
        ',props:['question','questionnum','showrefanswers','hidescore','parentqtype','index'],
        methods:{
            doWork:function(index,direct){
                try {
                    var inputList = $(this.$el).find('.ques');
                    var optionIndex = (index+1)/2-1;
                    console.log('content1:',this.question.stemArr[index].content)
                    this.question.options[optionIndex].content = this.question.stemArr[index].content = $tools.removeEmoticons($tools.trim(this.question.stemArr[index].content+''));
                    this.question.userAnswer = local.doWork(this.question,index)
                    this.question = methods.setOptionsIcon(this.question);
                    window.vue.updateQuestion(this.question)
                    console.log('content2:',this.question.stemArr[index].content)
                    if(direct && direct==-1){
                        if(optionIndex>0) $(inputList[optionIndex-1]).focus();
                    }else if(direct && direct==1){
                        if(optionIndex<inputList.length-1) $(inputList[optionIndex+1]).focus();
                    }
                } catch (error) {
                    console.warn('填空题错误：'+error)
                }
            },
            filterEvent:function(index){
                var inputList = $(this.$el).find('.ques');
                var optionIndex = (index+1)/2-1;
                if(vue.currQuestion && vue.currQuestion!=this.question.version_id){
                    $(inputList[optionIndex]).blur()
                    return false;
                }
                !vue.currQuestion && (vue.currQuestion = this.question.version_id);
            }
        }
    })
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
                        <question :question="question" :parentqtype="question.qtype" :showrefanswers="showRefAnswers" :index="$index+1"></question><p>&nbsp;</p>\
                    </div>\
                </div>\
            </div>\
        </div>\
    ',props:['question','questionnum','showrefanswers','hidescore','parentqtype','index']})
    // 6/7简答题 组件
    Vue.component('question-shortanswer',{template:'\
        <div>\
            <div class="mlr30">\
                <div class="lh54 mt24">\
                    <span v-if="parentqtype || question.sort">{{parentqtype?index:question.sort}}.</span>\
                    <div class="inline" v-html="question.stem"></div>\
                </div>\
                <attachments :attachments="question.attachments"></attachments>\
                <div><textarea class="anw" v-model="question.options[0].content" @blur="doWork(question.options[0].content)" @focus="filterEvent(0)"></textarea></div>\
            </div>\
        </div>\
        ',props:['question','questionnum','showrefanswers','hidescore','parentqtype','index'],
        methods:{
            doWork:function(content){
                var _content = $tools.removeEmoticons($tools.trim(content+''));
                this.question.options[0].content = _content;
                this.question.userAnswer = local.doWork(this.question,_content)
                this.question = methods.setOptionsIcon(this.question);
                window.vue.updateQuestion(this.question)
            },
            filterEvent:function(index){
                var inputList = $(this.$el).find('.anw');
                if(vue.currQuestion && vue.currQuestion!=this.question.version_id){
                    inputList.blur()
                    return false;
                }
                !vue.currQuestion && (vue.currQuestion = this.question.version_id);
            }
        }
    })
    // 8判断题
    Vue.component('question-judge',{template:'\
        <div>\
            <div class="mlr30">\
                <div class="lh54 mt24">\
                    <span v-if="parentqtype || question.sort">{{parentqtype?index:question.sort}}.</span>\
                    <div class="inline" v-html="question.stem"></div>\
                </div>\
                <attachments :attachments="question.attachments"></attachments>\
                <div class="choAnw mt40" v-for="(index,option) in question.options">\
                    <p class="fs-80" @click="doWork(\'1\')"><i class="option-txt" :class="option.content===\'1\'?\'true_curr\':\'true\'"></i><span>正确</span></p>\
                    <p class="fs-80" @click="doWork(\'0\')"><i class="option-txt" :class="option.content===\'0\'?\'false_curr\':\'false\'"></i><span>错误</span></p>\
                </div>\
            </div>\
        </div>\
        ',props:['question','questionnum','showrefanswers','hidescore','parentqtype','index'],
        methods:{
            doWork:function(assess){
                clearTimeout(window.questionTimer)
                this.question.options[0].content = assess+'';
                this.question.userAnswer = local.doWork(this.question,assess)
                this.question = methods.setOptionsIcon(this.question);
                window.vue.updateQuestion(this.question)
            }
        }
    })
}
// 加载过滤器
function onlineDoWorkLoadFilter(Vue,workStatus){
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
