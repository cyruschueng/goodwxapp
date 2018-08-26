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
        <p><span class="num" data-bind="text: $index() + 1 + \'、\'"></span><span data-bind="html: stem"></span></p>\
     </div>\
     <ul class="optList" data-bind="foreach: options">\
         <li data-bind="click: $parent.setAnswerHanlder">\
             <i class="opt" data-bind="text: ciwong.englishLetter[$index()],css:{ \'check\': $parent.qtype === 2 }"></i>\
             <div data-bind="html: stem"></div>\
         </li>\
     </ul>\
     <div class="finish" data-bind="visible: isLastQuestion,css:{ \'finishAction\': isLastQuestion }">\
        <a class="finish-btn" data-bind="click:$root.correctQuestion" href="javascript:;">完&nbsp;&nbsp;成</a>\
     </div>');

    ciwong.koTemplateEngine.add("panduanTemplate", '\
     <div class="info">\
        <p><span class="num" data-bind="text: $index() + 1 + \'、\'"></span><span data-bind="html: stem"></span></p>\
     </div>\
     <ul class="optList">\
         <li data-bind="click: function(data,event){ setAnswerHanlder(data,event,\'1\'); }">\
             <i class="opt true"></i>\
             <div>正确</div>\
         </li>\
         <li data-bind="click: function(data,event){ setAnswerHanlder(data,event,\'0\'); }">\
             <i class="opt false"></i>\
             <div>错误</div>\
         </li>\
     </ul>\
     <div class="finish" data-bind="visible: isLastQuestion,css:{ \'finishAction\': isLastQuestion }">\
        <a class="finish-btn" data-bind="click:$root.correctQuestion" href="javascript:;">完&nbsp;&nbsp;成</a>\
     </div>');

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
                        </div>\
                        <div class="txtBox"><textarea cols="30" data-bind="editableText:$parent.editableText,attr:{\'index\':$index()}" maxlength="500" rows="10" class="txtArea"></textarea></div>\
                        <!--ko template: { name : \'pointTemplate\', data: $parent } --><!--/ko-->\
                        <div class="finish" data-bind="css:{ \'finishAction\': $parent.isLastQuestion && $index() === $parent.ref_info.answers.length - 1 },visible: $parent.isLastQuestion && $index() === $parent.ref_info.answers.length - 1">\
                            <a class="finish-btn" data-bind="click:$root.correctQuestion" href="javascript:;">完&nbsp;&nbsp;成</a>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
     </div>');

    ciwong.koTemplateEngine.add("jiandaTemplate", '\
    <div class="info">\
        <p><span class="num" data-bind="text: $index() + 1 + \'、\'"></span><span data-bind="html: stem"></span></p>\
    </div>\
    <div class="txtBox">\
        <textarea cols="30" rows="10" maxlength="2000" data-bind="editableText:editableText" class="txtArea"></textarea>\
    </div>\
    <div class="finish" data-bind="visible: isLastQuestion,css:{ \'finishAction\': isLastQuestion }">\
        <a class="finish-btn" data-bind="click:$root.correctQuestion" href="javascript:;">完&nbsp;&nbsp;成</a>\
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
     </div>');

    exports.isCompleted = true
})