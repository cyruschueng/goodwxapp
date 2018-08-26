/**
 * Created by Administrator on 2016/8/3 0003.
 */
define(function (r, exports) {
    var ciwong = require("ciwong");

    ciwong.koTemplateEngine.add("normalQuesListTemplate", '\
    <div class="swiper-slide">\
		<div class="wrapper">\
		    <div class="wrapArea">\
                <div class="answerCon">\
                     <div class="sort-content">\
                         <div class="cloze-answer-rg choice-mark">\
                             <span data-bind="text:sortNo"></span>&nbsp;/&nbsp;<span data-bind="text:$root.totalQuestionCount"></span>\
                         </div>\
                     </div>\
                     <!--ko template: templateName --><!--/ko-->\
                     <!--ko template: \'pointTemplate\' --><!--/ko-->\
                </div>\
            </div>\
        </div>\
    </div>');

    ciwong.koTemplateEngine.add("slideSubsetTemplate", '\
    <div class="swiper-slide">\
		<div class="wrapper">\
		    <div class="questArea">\
                <div class="questArea-con">\
                    <div class="areaCon">\
                        <div class="sort-content">\
                            <div class="cloze-answer-rg choice-mark">\
                                <span data-bind="text:sortNo"></span>&nbsp;/&nbsp;<span data-bind="text:$root.totalQuestionCount"></span>\
                            </div>\
                        </div>\
                        <div class="info">\
                            <p><span class="num" data-bind="text: $index() + 1 + \'、\'"></span><span data-bind="html: stem"></span></p>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            <!--ko template: templateName --><!--/ko-->\
        </div>\
    </div>');

    ciwong.koTemplateEngine.add("xuanzeTemplate", '\
     <div class="info">\
        <p><span class="num" data-bind="text: $index() + 1 + \'、\'"></span>\
        <span class="after-answer-title" data-bind="html:assessResult()"></span>\
        <span data-bind="html: stem"></span></p>\
     </div>\
     <ul class="optList" data-bind="foreach: options">\
         <li data-bind="css: $parent.getUserAnswer(id)">\
             <i class="opt" data-bind="text: ciwong.englishLetter[$index()],css:{ \'check\': $parent.qtype === 2 }"></i>\
             <div data-bind="html: stem"></div>\
         </li>\
     </ul>');

    ciwong.koTemplateEngine.add("panduanTemplate", '\
     <div class="info">\
        <p><span class="num" data-bind="text: $index() + 1 + \'、\'"></span>\
        <span class="after-answer-title" data-bind="html:assessResult()"></span>\
        <span data-bind="html: stem"></span></p>\
     </div>\
     <ul class="optList">\
         <li data-bind="css: getUserAnswer(\'1\')">\
             <i class="opt true"></i>\
             <div>正确</div>\
         </li>\
         <li data-bind="css: getUserAnswer(\'0\')">\
             <i class="opt false"></i>\
             <div>错误</div>\
         </li>\
     </ul>');

    ciwong.koTemplateEngine.add("tiankongTemplate", '\
     <div class="answerArea">\
        <div class="toggleBox"><div class="btn"></div></div>\
        <div class="answerCon">\
            <div class="swiper-container answerInfo">\
                <div class="swiper-wrapper" data-bind="foreach: ref_info.answers">\
                    <div class="swiper-slide">\
                        <div class="tBar">\
                            <h3 class="t"></h3>\
                            <p class="pageArea">\
                                <i class="pageIndex" data-bind="text:$index() + 1">1</i>/\
                                <i class="pageTotal" data-bind="text:$parent.ref_info.answers.length"></i>\
                            </p>\
                            <span class="after-answer-title" data-bind="html:$parent.assessResult($index())"></span>\
                        </div>\
                        <div class="txtBox">\
                            <textarea cols="30" data-bind="value:$parent.getUserAnswer($index())" readonly maxlength="500" rows="10" class="txtArea"></textarea>\
                        </div>\
                        <!--ko template: { name : \'pointTemplate\', data: $parent } --><!--/ko-->\
                    </div>\
                </div>\
            </div>\
        </div>\
     </div>');

    ciwong.koTemplateEngine.add("jiandaTemplate", '\
    <div class="info">\
        <p><span class="num" data-bind="text: $index() + 1 + \'、\'"></span>\
        <span class="after-answer-title" data-bind="html:assessResult()"></span>\
        <span data-bind="html: stem"></span></p>\
    </div>\
    <div class="txtBox">\
        <textarea cols="30" rows="10" readonly data-bind="value: getUserAnswer(0)" class="txtArea"></textarea>\
    </div>');

    ciwong.koTemplateEngine.add("wanxingTemplate", '\
     <div class="answerArea">\
        <div class="toggleBox"><div class="btn"></div></div>\
        <div class="answerCon">\
            <div class="swiper-container answerInfo">\
                <div class="swiper-wrapper" data-bind="foreach: children">\
                    <div class="swiper-slide">\
                        <div class="tBar">\
                            <h3 class="t"></h3>\
                            <p class="pageArea">\
                                <i class="pageIndex" data-bind="text:$index() + 1">1</i>/\
                                <i class="pageTotal" data-bind="text:$parent.children.length"></i>\
                            </p>\
                        </div>\
                        <!--ko template: templateName --><!--/ko-->\
                        <!--ko template: \'pointTemplate\' --><!--/ko-->\
                    </div>\
                </div>\
            </div>\
        </div>\
     </div>');

    ciwong.koTemplateEngine.add("pointTemplate", '\
     <div class="expain" data-bind="foreach : ref_info.points">\
         <a href="javascript:;" class="expBtn" data-bind="text:name"></a>\
     </div>\
     <div class="reference-answer">\
        <p class="reference-answer_t mb3">参考答案<span data-bind="html: refAnswer($index())"></span></p>\
        <!--ko if : refThinking.length > 0 -->\
           <p class="reference-answer_r">题目解析</p>\
           <p class="reference-answer_p" data-bind="html:refThinking"></p>\
        <!--/ko-->\
     </div>');

    exports.isCompleted = true
})