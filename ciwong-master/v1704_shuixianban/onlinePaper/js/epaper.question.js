define(function (r, exports) {
    var ciwong = require("ciwong"), $ = require("jquery"), ko = require("ko");

    var defaultSettings = function () {
        return {
            questionShowTemplate: {
                0: "xuanzeTemplate",
                1: "xuanzeTemplate",
                2: "xuanzeTemplate",
                3: "tiankongTemplate",
                4: "wanxingTemplate",
                5: "wanxingTemplate",
                6: "jiandaTemplate",
                7: "jiandaTemplate",
                8: "panduanTemplate"
            },
            lastQuestionVersionId: 0
        };
    };

    //新增对可输入DIV的监控
    ko.bindingHandlers.editableText = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            ko.utils.registerEventHandler(element, "blur", function () {
                var modelValue = valueAccessor();
                var elementValue = element.value;
                if (ko.isWriteableObservable(modelValue)) {
                    var editableValue = {
                        index: parseInt($(element).attr("index") || 0),
                        value: elementValue
                    }
                    modelValue(editableValue);
                }
                else {
                    var allBindings = allBindingsAccessor();
                    if (allBindings['_ko_property_writers'] && allBindings['_ko_property_writers'].htmlValue) {
                        allBindings['_ko_property_writers'].htmlValue(elementValue);
                    }
                }
                return true;
            })
            //禁止粘贴
            ko.utils.registerEventHandler(element, "paste", function () {
                return false;
            })
        }
    };

    var methods = {
        attachmentHandler: function (attachments, stem) {
            function buildHtml(attachment) {
                var html = '';
                switch (attachment.file_type) {
                    case 1: //图片
                        html += '<div class="pic"><img class="enclosure-img" src="{0}"/></div>'.format(attachment.file_url);
                        break;
                    case 2://音频
                        html += '<div class="music">';

                        var ua = navigator.userAgent;
                        // ios系统
                        if(ua.indexOf("iPhone") != -1 ||ua.indexOf("iPad") != -1){
                            html += '<audio src="{0}" preload="auto"></audio>'.format(attachment.file_url);
                        }else{
                            html += '<audio src="{0}" preload="none"></audio>'.format(attachment.file_url);
                        }
                        html += '</div>';
                        break;
                    case 3: //视频
                        if (attachment.file_url.indexOf("letv://") == 0) {
                            html += '<div class="video"><img onclick="javascript:ciwong.openVideo(\'{0}\');" src="images/video.jpg" style="width: 85%" /></div>'.format(attachment.file_url);
                        } else {
                            html += '<div class="video"><video width="100%;" preload controls="controls" src="{0}"></video></div>'.format(attachment.file_url);
                        }
                        break;
                    default:
                        break;
                }
                return html;
            }

            var temp = '{Question.Stem}{AttachmentPosition.2}{AttachmentPosition.1}{AttachmentPosition.3}';
            attachments && $.each(attachments, function (i, item) {
                temp = temp.replace("{AttachmentPosition.{0}}".format(item.file_type), buildHtml(item));
            });
            return temp.replace(/{AttachmentPosition.(\d*)}/g, "").replace("{Question.Stem}", stem ? stem.replace(/&nbsp;/g, "	") : "");
        },
        stemBuildV1: function (question) {
            if (question.qtype == 3) {
                $.each(question.ref_info.answers, function (i) {
                    question.stem = question.stem.replace('{#blank#}{0}{#\/blank#}'.format(i + 1), '<span class="cloze-figure">&nbsp;</span>');
                })
            }
            else if (question.qtype == 4) {
                $.each(question.children, function (i) {
                    this.qtype = 1;
                    //question.stem = question.stem.replace('{#blank#}{0}{#\/blank#}'.format(i + 1), '<div class="q-txt tc">{0}</div>'.format(i + 1));
                    question.stem = question.stem.replace('{#blank#}{0}{#\/blank#}'.format(i + 1), '<span class="cloze-figure">{0}</span>'.format(i + 1));
                });
            }
            $.each(question.options, function () {
                this.stem = methods.attachmentHandler(this.attachments, this.stem);
            });

            //首先清除题干中的宽度样式，比如用户复制的表格样式将会导致在手机展示时宽度超出
            question.stem = question.stem.replace(/width="(\d*)(\w*)"/g, '');
            question.stem = question.stem.replace(/catalogue[^\"]*mathmlToImage/gi, 'http://mathapi.ciwong.com/home/mathmlToImage');
            question.stem = methods.attachmentHandler(question.attachments, question.stem);
        },
        getCorrectStyle: function (assess, refScore, score, qtype) {
            var assessIco = assess == 1 ? '<img src="images/img_10.png" />'
                : assess == 2 ? '<img src="images/img_09.png" />'
                : assess == 4 ? '<img src="images/img_12.png" />'
                : assess == 3 ? '<img src="images/img_11.png" />' : "";
            if (qtype === 3) {
                return '{0}<span>({1}分)</span>'.format(assessIco, score);
            } else {
                return '{0}<span>({1}分/{2}分)</span>'.format(assessIco, score, refScore);
            }
        },
        getRefAnswer: function (question, index) {
            if (question.ref_info.answers.length == 0) {
                return "";
            }
            var _answer = "";
            switch (question.qtype) {
                case 1:
                    $.each(question.options, function (i) {
                        if (this.id == question.ref_info.answers[0]) {
                            _answer = ciwong.englishLetter[i];
                            return false;
                        }
                    });
                    break;
                case 2:
                    $.each(question.options, function (i) {
                        if ($.inArray(this.id, question.ref_info.answers) > -1) {
                            _answer += ciwong.englishLetter[i];
                        }
                    });
                    break;
                case 3:
                    $.each(question.ref_info.answers, function (i) {
                        if (i === index) {
                            _answer = question.ref_info.answers[index];
                            return false;
                        }
                    });
                    break;
                case 8:
                    _answer = question.ref_info.answers[0] == "0" ? "错误" : question.ref_info.answers[0] == "1" ? "正确" : "";
                    break;
                default:
                    _answer = question.ref_info.answers.join("、&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                    break;
            }
            return _answer == "" ? "略" : _answer.replace(/&nbsp;/g, "	");
        },
        answerHelper: function () {
            var answerList = {}, questionList = {};
            return {
                setAnswer: function (question, answer, index) {
                    index = parseInt(index, 10) || 0;
                    if (!answerList[question.version_id]) {
                        answerList[question.version_id] = [];
                        questionList[question.version_id] = question.question_ref_sorce;
                    }
                    var isRemove = false;
                    $.each(answerList[question.version_id], function (i, item) {
                        if (item.sid == index) {
                            isRemove = true;
                            answerList[question.version_id].splice(i, 1);
                            return false;
                        }
                    });
                    if (question.qtype != 2 || !isRemove) {
                        answerList[question.version_id].push({sid: index, content: answer});
                    }
                    return answerList[question.version_id];
                },
                getAnswer: function () {
                    var versions = [];
                    for (var item in answerList) {
                        versions.push(item.toString());
                    }
                    return $.map(versions, function (item) {
                        return {version_id: item, score: questionList[item], answers: answerList[item]}
                    })
                }
            };
        },
        /**每个小题的解题思路**/
        getRefThinking: function (question) {
            if (question.ref_info.solving_idea == "" || question.ref_info.solving_idea == undefined) {
                return "";
            }
            return methods.attachmentHandler(question.ref_info.attachments, question.ref_info.solving_idea);
        }
    };

    var viewModel = {
        preView: function (settingOptions) {
            var model = this,
                settings = $.extend(true, defaultSettings(), settingOptions || {}),
                answerHelper = methods.answerHelper();

            model.list = ko.observableArray();
            model.list.subscribe(function (newQuesions) {
                function questionHandler(list) {
                    list && $.each(list, function (i, question) {
                        question.templateName = settings.questionShowTemplate[question.qtype];

                        methods.stemBuildV1(question);
                        question.userAnswer = ko.observableArray();

                        //可点击答案监控
                        question.setAnswerHanlder = function (data, event, other, index) {
                            question.qtype == 2 && (index = $.inArray(data, question.options));
                            question.userAnswer(answerHelper.setAnswer(question, other || data.id, index));
                        }

                        //可编辑DIV答案监控
                        if (question.qtype == 3 || question.qtype == 6 || question.qtype == 7) {
                            question.editableText = ko.observable();
                            question.editableText.subscribe(function (text) {
                                question.userAnswer(answerHelper.setAnswer(question, text.value, text.index));
                            })
                        }

                        if (question.qtype == 3 || question.qtype == 4 || question.qtype == 5) {
                            question.slideTemplate = "slideSubsetTemplate";
                        } else {
                            question.slideTemplate = "normalQuesListTemplate";
                        }

                        question.isLastQuestion = question.version_id === settings.lastQuestionVersionId;

                        question.children && question.children.length > 0 && questionHandler(question.children);
                    });
                }

                questionHandler(newQuesions);
            });

            model.getAnswers = function () {
                return answerHelper.getAnswer();
            };

            settings.dataSource && model.list(settings.dataSource);
        },
        resultView: function (settingOptions) {
            var model = this,
                settings = $.extend(true, defaultSettings(), settingOptions || {}),
                answerHelper = methods.answerHelper();

            model.list = ko.observableArray();

            model.list.subscribe(function (newQuesions) {
                function questionHandler(list) {
                    list && $.each(list, function (i, question) {
                        question.templateName = settings.questionShowTemplate[question.qtype];
                        methods.stemBuildV1(question);
                        if (!question.userAnswer && question.qtype != 4 && question.qtype != 5) {
                            question.userAnswer = {assess: 2, score: 0, answers: []};
                        }

                        question.getUserAnswer = function (data) {
                            if (question.qtype == 0 || question.qtype == 1 || question.qtype == 2 || question.qtype == 8) {
                                var isChecked = question.userAnswer.answers.some(function (item) {
                                    return item.content == data
                                })
                                return isChecked && question.userAnswer.assess == 1 ? "mistake"
                                    : isChecked ? "correct" : "";
                            }
                            else {
                                var uAnswer = $.grep(question.userAnswer.answers, function (item) {
                                    return item.sid == data;
                                });
                                return uAnswer.length > 0 ? uAnswer[0].content : ""
                            }
                        }

                        question.assessResult = function (index) {
                            if (question.qtype == 3) {
                                var uAnswer = $.grep(question.userAnswer.answers, function (item) {
                                    return item.sid == index;
                                })[0];
                                if (uAnswer) {
                                    return methods.getCorrectStyle(uAnswer.assess, question.question_ref_sorce, uAnswer.score, 3)
                                } else {
                                    return methods.getCorrectStyle(2, question.question_ref_sorce, 0, 3)
                                }
                            }
                            return methods.getCorrectStyle(question.userAnswer.assess, question.question_ref_sorce, question.userAnswer.score)
                        }

                        if (question.qtype == 3 || question.qtype == 4 || question.qtype == 5) {
                            question.slideTemplate = "slideSubsetTemplate";
                        } else {
                            question.slideTemplate = "normalQuesListTemplate";
                        }

                        question.refAnswer = function (index) {
                            return methods.getRefAnswer(question, index)
                        }

                        question.refThinking = methods.getRefThinking(question)

                        question.children && question.children.length > 0 && questionHandler(question.children);
                    });
                }

                questionHandler(newQuesions);
            });

            settings.dataSource && model.list(settings.dataSource);
        }
    };

    exports.viewModel = viewModel;
    exports.moduleId = '008a020d-72c6-4df5-ba6c-73086b8db022';
});