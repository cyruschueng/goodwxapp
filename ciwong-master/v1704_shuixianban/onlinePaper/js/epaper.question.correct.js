/// <reference path="jquery-1.8.0.min.js" />
define(["jquery", window.JSON ? undefined : "json2"], function ($) {
    ///创建试卷批改对象questionCorrect
    var questionCorrect = window.questionCorrect || {}, currect = ['scale', 'all_matching'];

    var methods = {
        RegFilter: function (regValue) {
            this.regStr = regValue;
            this.isTrim = false;
            this.replaceStr = '';
            this.convert = function (sourceStr) {
                if (sourceStr === undefined || sourceStr === null || sourceStr === '' || !sourceStr) {
                    return sourceStr;
                }
                if (this.isTrim) {
                    sourceStr = sourceStr.trim();
                }
                var reg = new RegExp(this.regStr, 'gmi');
                return sourceStr.replace(reg, this.replaceStr);
            }
        },
        ///英文实体类
        WordShort: function (shortword, intactword) {
            this.ShortWord = shortword;
            this.IntactWord = intactword;
        },
        ///正则表达式需要更换
        HtmlFilter: function () {
            //return new methods.RegFilter('<[a-zA-Z]+? [^<>]*?>|</[a-zA-Z]+?>|<[a-zA-Z]+?>|<[a-zA-Z]+?/>'); 
            return new methods.RegFilter("<script[^>]*?>.*?</script>|<(.[^>]*)>|([\r\n])[\s]+|-->|<!--.*|&(quot|#34);|&(amp|#38);|&(lt|#60);|&(gt|#62);|&(nbsp|#160);|&(iexcl|#161);|&(cent|#162);|&(pound|#163);|&(copy|#169);|&#(\d+);|<|>|\r\n");
        },
        //html格式字符串替换 空格
        HtmlDecode: function () {
            this.convert = function (sourceStr) {
                if (sourceStr === null || sourceStr === '' || !sourceStr) {
                    return sourceStr;
                }
                sourceStr = sourceStr.replace(/&nbsp;/g, " ");
                var temp = document.createElement("div");
                temp.innerHTML = sourceStr;
                var output = temp.innerText || temp.textContent;
                temp = null;
                return output;
            }
        },
        //中文字符串转换
        ChineseConvert: function () { //将特殊字符 全部转换成把半角格式的字符串
            this.convert = function (sourceStr) {
                if (sourceStr === null || sourceStr === '' || !sourceStr) {
                    return sourceStr;
                }
                return this.ToDBC(sourceStr);
            },
                this.ToDBC = function (content) {
                    var output = "";
                    for (var i = 0; i < content.length; i++) {
                        var chartCode = content.charCodeAt(i);
                        var str;
                        if (chartCode == 12288 || chartCode == 160) {//中文空格转换英文空格
                            str = String.fromCharCode(32);
                        }
                        else if (chartCode == 8217) {//中文半角单引号转成英文单引号
                            str = String.fromCharCode(39);
                        }
                        else if (chartCode == 12290) {//中文句号转换英文句号
                            str = String.fromCharCode(46);
                        }
                        else if (chartCode > 65280 && chartCode < 65375) {//中文标点数字转换英文
                            str = String.fromCharCode(chartCode - 65248);
                        } else {
                            str = String.fromCharCode(chartCode);
                        }
                        output += str;
                    }
                    return output;
                }
        },
        //英文字符串转换
        EnglishShort: function () {
            //字符串缩写替换
            this.getWordLibrary = function () {
                var _list = [];
                _list.push(new methods.WordShort("I'm", "I am"));
                _list.push(new methods.WordShort("he's", "he has"));
                _list.push(new methods.WordShort("he's", "he is"));
                _list.push(new methods.WordShort("she's", "she is"));
                _list.push(new methods.WordShort("she's", "she has"));
                _list.push(new methods.WordShort("Tony's", "Tony is"));
                _list.push(new methods.WordShort("it's", "it is"));
                _list.push(new methods.WordShort("what's", "what is"));
                _list.push(new methods.WordShort("who's", "who is"));
                _list.push(new methods.WordShort("where's", "where is"));
                _list.push(new methods.WordShort("name's", "name is"));
                _list.push(new methods.WordShort("that's", "that is"));
                _list.push(new methods.WordShort("how's", "how is"));
                _list.push(new methods.WordShort("let's", "let us"));

                _list.push(new methods.WordShort("isn't", "is not"));
                _list.push(new methods.WordShort("aren't", "are not"));
                _list.push(new methods.WordShort("can't", "can not"));
                _list.push(new methods.WordShort("don't", "do not"));
                _list.push(new methods.WordShort("doesn't", "does not"));
                _list.push(new methods.WordShort("didn't", "did not"));
                _list.push(new methods.WordShort("won't", "will not"));
                _list.push(new methods.WordShort("wasn't", "was not"));
                _list.push(new methods.WordShort("weren't", "were not"));
                _list.push(new methods.WordShort("couldn't", "could not"));
                _list.push(new methods.WordShort("shouldn't", "should not"));
                _list.push(new methods.WordShort("wouldn't", "would not"));
                _list.push(new methods.WordShort("mustn't", "must not"));
                _list.push(new methods.WordShort("needn't", "need not"));
                _list.push(new methods.WordShort("hasn't", "has not"));
                _list.push(new methods.WordShort("haven't", "have not"));

                _list.push(new methods.WordShort("we're", "we are"));
                _list.push(new methods.WordShort("you're", "you are"));
                _list.push(new methods.WordShort("they're", "they are"));
                _list.push(new methods.WordShort("who're", "who are"));
                _list.push(new methods.WordShort("what're", "what are"));
                _list.push(new methods.WordShort("where're", "where are"));
                _list.push(new methods.WordShort("I'll", "I will"));
                _list.push(new methods.WordShort("we'll", "we will"));
                _list.push(new methods.WordShort("there'll ", "there will"));
                _list.push(new methods.WordShort("I'd like", "I would like"));
                _list.push(new methods.WordShort("I'd", "I had"));
                _list.push(new methods.WordShort("you'd better", "you had better"));
                _list.push(new methods.WordShort("I've", "I have"));
                return _list;
            };
            //字符串转换方法
            this.convert = function (sourceStr) {
                if (sourceStr === null || sourceStr === '' || !sourceStr) {
                    return sourceStr;
                }
                var wordLibrary = this.getWordLibrary();
                for (var a = 0, b = wordLibrary.length; a < b; a++) {
                    var reg = new RegExp(wordLibrary[a].shortWord, 'gmi');
                    sourceStr = sourceStr.replace(reg, wordLibrary[a].intactWord);
                }

                return sourceStr.replace(reg, '');
            }
        },
        //是否去掉前后空格
        SpaceFilter: function (isTrim) {
            var regStr = isTrim ? "[\\s]{2,}" : "[\\s]{1,}";
            var regFilter = new methods.RegFilter(regStr);
            regFilter.isTrim = isTrim;
            if (isTrim) {
                regFilter.replaceStr = " ";
            }
            return regFilter;
        },
        //字符串大小写转换
        SingleCharConvert: function () {
            this.convert = function (sourceStr) {
                if (sourceStr === undefined || sourceStr === null || sourceStr === '' || !sourceStr) {
                    return sourceStr;
                }
                if (sourceStr.length === 1) {
                    sourceStr = sourceStr.toLowerCase();
                }
                return sourceStr;
            };
        },
        /**##  分值计算方法 (总分值,有多少项,下标) ##**/
        GetScore: function (totalScore, totalItem, index) {
            if (totalItem <= 1) {
                return totalScore;
            }
            if (index > totalItem - 1) {
                return 0.0;
            }
            var avgScore = parseFloat((totalScore / totalItem).toFixed(2));
            return index < totalItem - 1 ? avgScore : totalScore - index * avgScore;
        },
        /**##  是否为空字符串 (字符串)##**/
        IsNullOrWhiteSpace: function (str) {
            if (str === undefined && str === null || str === '' || !str || str.trim() === '') {
                return true;
            }
            return false;
        },
        /**## 试题批改方法 ##**/
        FillsUpCorrect: function () {
            this.wikiAnswerConvertRule = [];
            this.userAnswerConvertRule = [];
            this.scoreMode = currect[0];
            /**试题批改方法**/
            this.correct = function (userAnswer, wikiQues) {
                if (null == wikiQues.Answer || wikiQues.Answer.length === 0) {
                    return methods.unknownAnswerCorrect(userAnswer);
                }
                var rightNum = 0;
                userAnswer.answers.sort(function (a, b) {
                    return a.sid > b.sid ? 1 : -1;
                });
                for (var i = 0; i < userAnswer.answers.length; i++) {
                    var item = userAnswer.answers[i];
                    if (wikiQues.Answer.length - 1 < item.sid) {
                        item.Assess = 4;
                        continue;
                    }
                    var wikiStr = this.convert(wikiQues.Answer[item.sid], this.wikiAnswerConvertRule);
                    var userStr = this.convert(item.content, this.userAnswerConvertRule);
                    var isEquals = !methods.IsNullOrWhiteSpace(userStr) && (wikiStr === userStr);
                    item.Assess = isEquals ? 1 : 2;
                    if (item.Assess == 1) {
                        item.ItemScore = methods.GetScore(userAnswer.score, wikiQues.Answer.length, i);
                    } else {
                        item.ItemScore = 0.0;
                    }
                    rightNum = isEquals ? rightNum + 1 : rightNum;
                    //主观题不打错误,未答的主观题一定错误
                    if (!wikiQues.IsObjective && !isEquals) {
                        item.Assess = methods.IsNullOrWhiteSpace(item.content) ? 2 : 4;
                    }
                }
                userAnswer.Assess = rightNum == wikiQues.Answer.length ? 1 : 2;
                var hasUnknowAssess = false;
                for (var i = 0; i < userAnswer.answers.length; i++) {
                    if (userAnswer.answers[i].Assess === 4) {
                        hasUnknowAssess = true;
                        break;
                    }
                }
                if (!wikiQues.IsObjective && userAnswer.Assess == 2 && hasUnknowAssess) {
                    userAnswer.Assess = 4;
                }
                if (this.scoreMode == currect[1] && userAnswer.Assess != 1) {
                    for (var i = 0; i < userAnswer.answers.length; i++) {
                        userAnswer.answers[i].ItemScore = 0.0;
                    }
                }
                userAnswer.score = 0;
                for (var i = 0; i < userAnswer.answers.length; i++) {
                    userAnswer.score += userAnswer.answers[i].ItemScore;
                }
                return userAnswer;
            };
            /**试题转换方法**/
            this.convert = function (sourceStr, stringConvertRules) {
                for (var i = 0; i < stringConvertRules.length; i++) {
                    var rule = stringConvertRules[i];
                    sourceStr = rule.convert(sourceStr);
                }

                return sourceStr;
            };

        },
        /**主观题批改**/
        ChooseMoreCorrect: function () {
            this.scoreMode = currect[1];
            this.correct = function (userAnswer, wikiQues) {
                if (null == wikiQues.Answer || wikiQues.Answer.length === 0) {
                    return methods.unknownAnswerCorrect(userAnswer);
                }
                var rightNum = 0, wrongNum = 0;
                for (var a = 0; a < userAnswer.answers.length; a++) {
                    var model = userAnswer.answers[a];
                    if (methods.IsNullOrWhiteSpace(model.content)) {
                        model.Assess = 2;
                        continue;
                    }
                    model.Assess = 2;
                    for (var i = 0; i < wikiQues.Answer.length; i++) {
                        if (wikiQues.Answer[i] === model.content) {
                            model.Assess = 1;
                            break;
                        }
                    }
                    if (model.Assess == 1) {
                        rightNum++;
                        model.ItemScore = methods.GetScore(userAnswer.score, wikiQues.Answer.length, i);
                    }
                    else {
                        model.ItemScore = 0.0;
                        wrongNum++;
                    }
                }
                userAnswer.Assess = wrongNum == 0 && rightNum == wikiQues.Answer.length ? 1 : 2;
                //多选题按比例匹配时,如果存在一个错误答案,则不给分,防止ABCD...全选给满分,如果按完全匹配模式,错误一个,则都不给分
                if (this.scoreMode == currect[1] && userAnswer.Assess != 1 || this.scoreMode == currect[0] && wrongNum > 0) {
                    for (var i = 0; i < userAnswer.answers.length; i++) {
                        userAnswer.answers[i].ItemScore = 0.0;
                    }
                }
                userAnswer.score = userAnswer.Assess == 1 ? userAnswer.score : 0.0;
                return userAnswer;
            }
        },
        /**单项小题的批改**/
        SimpleSelectionCorrect: function () {
            this.correct = function (userAnswer, wikiQues) {
                if (null == wikiQues.Answer || wikiQues.Answer.length === 0) {
                    return methods.unknownAnswerCorrect(userAnswer);
                }
                userAnswer.Assess = 2;
                for (var i = 0; i < wikiQues.Answer.length; i++) {
                    if (wikiQues.Answer[i] === userAnswer.answers[0].content) {
                        userAnswer.Assess = 1;
                        break;
                    }
                }
                userAnswer.score = userAnswer.Assess == 1 ? userAnswer.score : 0.0;
                userAnswer.answers[0].Assess = userAnswer.Assess;
                userAnswer.answers[0].ItemScore = userAnswer.score;
                return userAnswer;
            }
        }, ///判断试题是否属于主观题
        unknownAnswerCorrect: function (userAnswer) {
            userAnswer.Assess = 4;
            userAnswer.score = 0.0;
            for (var i = 0; i < userAnswer.answers.length; i++) {
                userAnswer.answers[i].Assess = 4;
            }
            return userAnswer;
        },
        //获取试题(重新组建对象)
        getQuestions: function (data) {
            var result = data;//之前请求数据获取当前试卷信息
            var returnVal = [];
            var attachQuestion = function (questions, item) {
                var question = {
                    Version: item.version_id,
                    qType: item.qtype,
                    IsObjective: item.is_objective,
                    Answer: item.ref_info.answers,
                    CurriculumID: item.curriculum_id
                };

                questions.push(question);
                if (item.children) {
                    for (var i = 0; i < item.children.length; i++) {
                        attachQuestion(questions, item.children[i]);
                    }
                }
            };
            //如果只有单个小题为题目的时候会出现result[i].children中的值为空 所以需要将这一类题目加入到试题中
            for (var i = 0; i < result.length; i++) {
                if (result[i].children && result[i].children.length == 0) {
                    var children = result[i];
                    attachQuestion(returnVal, children);
                } else {
                    for (var a = 0; result[i].children && a < result[i].children.length; a++) {
                        var children = result[i].children[a];
                        attachQuestion(returnVal, children);
                    }
                }
            }
            return returnVal;
        }
    };

    questionCorrect.question = new function () {
        var question = {
            filterInstance: new function () {
                this.htmlDecode = new methods.HtmlDecode();
                this.htmlFilter = new methods.HtmlFilter();
                this.chineseConvert = new methods.ChineseConvert();
                this.englishShort = new methods.EnglishShort();
                this.spaceFilter1 = new methods.SpaceFilter(true);
                this.spaceFilter2 = new methods.SpaceFilter(false);
                this.singleCharConvert = new methods.SingleCharConvert();
            },
            //作业批改类
            correct: function (userAnswer, resources) {
                var questions = methods.getQuestions(resources);
                var corrResults = [];
                for (var a = 0, b = userAnswer.length; a < b; a++) {
                    var question;
                    for (var c = 0, d = questions.length; c < d; c++) {
                        if (questions[c].Version === userAnswer[a].version_id) {
                            question = questions[c];
                            break;
                        }
                    }

                    var answer;
                    if (question) {
                        answer = this.getCorrectInstance(question).correct(userAnswer[a], question);
                    }
                    else {
                        answer = methods.unknownAnswerCorrect(userAnswer[a]);
                    }

                    var corrResult = {
                        answers: [],
                        versionId: answer.version_id,
                        score: answer.score,
                        assess: answer.Assess
                    };

                    for (var i = 0; i < answer.answers.length; i++) {
                        var subAnswer = answer.answers[i];
                        corrResult.answers.push({
                            sid: subAnswer.sid,
                            content: subAnswer.content,
                            assess: subAnswer.Assess,
                            score: subAnswer.ItemScore,
                            answerType: 1
                        });
                    }
                    corrResults.push(corrResult);
                }
                return corrResults;
            },
            //根据试卷类型获取试卷编码(反编译)
            getCorrectInstance: function (question) {
                switch (question.qType) {
                    case 1:
                    case 4:
                    case 8:
                        var simpleSelectionCorrect = new methods.SimpleSelectionCorrect();
                        return simpleSelectionCorrect;
                    case 2:
                        var chooseMoreCorrect = new methods.ChooseMoreCorrect();
                        return chooseMoreCorrect;
                    default:
                        var fillsUpCorrect = new methods.FillsUpCorrect();
                        /*html格式在页面输入的时候需要过滤之后再进行转换*/
                        fillsUpCorrect.wikiAnswerConvertRule.push(this.filterInstance.htmlFilter);
                        fillsUpCorrect.wikiAnswerConvertRule.push(this.filterInstance.htmlDecode);

                        fillsUpCorrect.wikiAnswerConvertRule.push(this.filterInstance.chineseConvert);
                        fillsUpCorrect.userAnswerConvertRule.push(this.filterInstance.chineseConvert);
                        if (question.CurriculumID == 3) //英语
                        {
                            fillsUpCorrect.wikiAnswerConvertRule.push(this.filterInstance.spaceFilter1);
                            fillsUpCorrect.wikiAnswerConvertRule.push(this.filterInstance.englishShort);

                            fillsUpCorrect.userAnswerConvertRule.push(this.filterInstance.spaceFilter1);
                            fillsUpCorrect.userAnswerConvertRule.push(this.filterInstance.englishShort);
                        }
                        else {
                            fillsUpCorrect.wikiAnswerConvertRule.push(this.filterInstance.spaceFilter2);

                            fillsUpCorrect.userAnswerConvertRule.push(this.filterInstance.spaceFilter2);
                        }

                        fillsUpCorrect.wikiAnswerConvertRule.push(this.filterInstance.singleCharConvert);
                        fillsUpCorrect.userAnswerConvertRule.push(this.filterInstance.singleCharConvert);
                        return fillsUpCorrect;
                }
            }
        };
        return question;
    }

    window.questionCorrect = questionCorrect;
    return questionCorrect; //对外返回
});