define(function (r, exports) {

    var ciwong = require("ciwong"), questionCorrect = require("correct"), $ = require("jquery"),
        ko = require("ko"), question = require("question"), allPlayers = [];

    var methods = {
        findUserAnswer: function (userAnswers, versionId) {
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
        /*设置用户答案*/
        setUserAnswer: function (data, questions) {
            questions && $.each(questions.children, function () {
                this.userAnswer = methods.findUserAnswer(data, this.version_id);
                this.children && this.children.length > 0 && methods.setUserAnswer(data, this);
            });
        },
        pauseAllPlayer: function (curr) {
            $.each(allPlayers, function () {
                this != curr && this.plyr.pause()
            });
        }
    };

    var viewModel = {
        preView: function (settingOptions) {
            var model = this,
                settings = settingOptions || {};

            model.lastDataSource = undefined;
            model.allSingleQuestions = [];

            model.Countscore = ko.observable(0);//总分值
            model.paper = ko.observable();
            model.paper.subscribe(function (newPaper) {
                model.lastDataSource = ko.toJS(newPaper);
                var lastQuestionVersionId = "0";
                if (model.allSingleQuestions.length == 0) {
                    var allQuestions = [];
                    $.each(model.lastDataSource.parts, function () {
                        allQuestions = allQuestions.concat(this.children)
                    });
                    model.totalQuestionCount = allQuestions.length;
                    $.each(allQuestions, function (i, item) {
                        if (item.children.length > 0) {
                            model.allSingleQuestions = model.allSingleQuestions.concat(item.children)
                        } else {
                            model.allSingleQuestions.push(item);
                        }
                    });
                    lastQuestionVersionId = model.allSingleQuestions[model.allSingleQuestions.length - 1].version_id;
                }

                var questionSortNo = 1;
                newPaper.parts && $.each(newPaper.parts, function (i) {
                    $.each(this.children, function () {
                        this.sortNo = questionSortNo++;
                    })
                    this.children = ko.observable(new question.viewModel.preView({
                        dataSource: this.children,
                        lastQuestionVersionId: lastQuestionVersionId
                    }));
                });
            });

            model.afterRender = function () {
                $("table").css({width: '100%'});
                allPlayers = plyr.setup();
                $.each(allPlayers, function () {
                    this.addEventListener('play', function () {
                        methods.pauseAllPlayer(this);
                    })
                });
                settings.afterRender && settings.afterRender.call()
            };

            model.getUserAnswer = function () {
                var userAnswer = [];
                $.each(model.paper().parts, function () {
                    $.merge(userAnswer, this.children().getAnswers());
                });
                return userAnswer;
            };

            model.paper(settings.data);

            model.correctQuestion = function () {
                //试题批改(用户提交答案集合,试题集合) 离线批改
                var contents = questionCorrect.question.correct(model.getUserAnswer(), model.lastDataSource.parts);
                var totalScore = 0;
                $.each(contents, function (i, item) {
                    totalScore += parseFloat(item.score);
                });
                console.log(contents)
                var remainNum = model.allSingleQuestions.length - contents.length;
                cordova && cordova.exec(function () {
                }, function () {
                    alert("提交失败")
                }, 'CiwongPlugin', 'Submit', [contents, totalScore, remainNum])

                var ua = navigator.userAgent;
                // ios系统
                if(ua.indexOf("iPhone") != -1 ||ua.indexOf("iPad") != -1){
                    // 停止所有音频、视频播放
                    $('video,audio').each(function(i1,item1){
                        try {
                            if(typeof item1.pause =='function') item1.pause();
                        } catch (error) {}
                        item1.addEventListener("playing", function(){
                            try {
                                if(typeof item1.pause =='function') item1.pause();
                            } catch (error) {}
                        });
                    })
                }
            };
        },
        resultView: function (settingOptions) {
            var model = this,
                settings = settingOptions || {};

            model.paper = ko.observable();
            model.paper.subscribe(function (newPaper) {
                var allQuestions = [];
                $.each(newPaper.parts, function () {
                    allQuestions = allQuestions.concat(this.children)
                });
                model.totalQuestionCount = allQuestions.length;

                var questionSortNo = 1;
                newPaper.parts && $.each(newPaper.parts, function (i) {
                    $.each(this.children, function () {
                        this.sortNo = questionSortNo++;
                    })
                    this.children = ko.observable(new question.viewModel.resultView({
                        dataSource: this.children
                    }));
                });
            });

            model.afterRender = function () {
                $("table").css({width: '100%'});
                allPlayers = plyr.setup();
                $.each(allPlayers, function () {
                    this.addEventListener('play', function () {
                        methods.pauseAllPlayer(this);
                    })
                });
                settings.afterRender && settings.afterRender.call()
            };

            $.each(settings.data.parts, function (i, item) {
                methods.setUserAnswer(settings.userAnswer, item);
            });

            model.paper(settings.data);

            model.closeWindow = function () {
                cordova && cordova.exec(function () {
                }, function () {
                }, 'CiwongPlugin', 'closeWindow', [])
            }
        }
    };

    exports.viewModel = viewModel;
    exports.moduleId = "1f693f76-02f5-4a40-861d-a8503df5183f";

    ciwong.openVideo = function (url) {
        methods.pauseAllPlayer();
        cordova && cordova.exec(function () {
        }, function () {
            alert('打开失败')
        }, 'CiwongPlugin', 'OpenVideo', [{letv: url.replace("letv://", ""), btn: 1}])
    }

    ciwong.koTemplateEngine.add("paperTemplate", '\
       <div class="swiper-wrapper" data-bind="foreach: parts">\
         <div class="swiper-slide">\
           <div class="wrapper">\
             <div class="wrapArea">\
                <div class="answerCon">\
                    <div class="info" data-bind="text:module_type_name.removeHtmlTag()"></div>\
                    <div class="hand"><img src="images/hand.png" /></div>\
                </div>\
             </div>\
           </div>\
         </div>\
         <!--ko foreach : children().list --><!--ko template: slideTemplate  --><!--/ko--><!--/ko-->\
       </div>');
});
