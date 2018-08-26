var config = require('../../config.js');
var common = require('../../asset/js/common.js');
var Server = config.service;
var Session = common.Session;
var AppPages = common.AppPages;
var UserIdFun = common.UserIdFun;
var wxShowToast = common.wxShowToast;
// 设置项
var countTimeMaxS = 10;
var scoreTotalMax = 1000;
var ScoreSuccessVal = 600;
// 提示音
var innerAudioContext;
var audioSrcUrl = {
    "wrong": "https://renxingstyle.xyz/tianfuxueba/resource/wrong.mp3",
    "right": "https://renxingstyle.xyz/tianfuxueba/resource/right.mp3",
};
var audioSrcLocalPath = {
    "wrong": "",
    "right": "",
};
// 下载音频文件，生成本地路径
function downLoadAudioFile(){
    // 错误
    wx.downloadFile({
        url: audioSrcUrl.wrong,
        success: function (res) {
            if (res.statusCode === 200) {
                audioSrcLocalPath["wrong"] = res.tempFilePath;
            }
        }
    })
    // 正确
    wx.downloadFile({
        url: audioSrcUrl.right,
        success: function (res) {
            if (res.statusCode === 200) {
                audioSrcLocalPath["right"] = res.tempFilePath;
            }
        }
    })
}
// 回答问题提示音
function answerVoiceFun(flag, handle){
    // 音源
    var voiceSrc = audioSrcLocalPath["wrong"];
    switch (flag){
        case "wrong":
            voiceSrc = audioSrcLocalPath["wrong"];
            break;
        case "right":
        default:
            voiceSrc = audioSrcLocalPath["right"];
    }
    innerAudioContext.src = voiceSrc;
    // 操作
    switch (handle) {
        case "start":
            innerAudioContext.seek(0);
            innerAudioContext.play();
            break;
        case "pause":
            innerAudioContext.pause();
            break;
        case "stop":
        default:
            innerAudioContext.stop();
            innerAudioContext.seek(0);
    }
}
// 倒计时运行控制
var isCountDownRun = false;
var countDownTimer; // 倒计时计时器 1s循环
var goNextQuestionTimer; // 进入下一题答题计时器
var RecoverCountDownTimer; // 恢复计时器为10s
var countDownStartTimer;
var pageToResultTimer;

var hasAnswerQuestion = false;   //是否已经答题
var QuestionRunning = false;    // 是否进入答题
// 得分结果背景
var gradeBgSrcObj = {
    "fail": "../../asset/image/grade-fail.png",
    "success": "../../asset/image/grade-success.png"
};
// 生成随机数
function GetRandomNum(m, n) {
    return Math.floor(Math.random() * Math.abs(n - m) + m);
}
// 题目列表相关设置
var QuestionToken = "";
var QuestionsArr = [];
var QuestionTotal = QuestionsArr.length;
// 页面切换
function pageContentSwitch(self, flag){
    var gameclass = "slhide";
    var gradeclass = "slhide";
    switch(flag){
        case "grade":
            gradeclass = "";
        break;
        case "question":
        default:
            gameclass = "";
    }
    self.setData({
        gameLoad: gameclass,
        gradeLoad: gradeclass
    });
}
// 设置挑战结果信息
function setGradeResInfo(self, jsonData) {
    var theScore = parseInt(jsonData["theScore"]);
    var gradeBgSrc = gradeBgSrcObj["fail"];
    var star = parseInt(jsonData["star"]);
    var isSuccess = (theScore >= ScoreSuccessVal) ? true : false;
    if (isSuccess){
        gradeBgSrc = gradeBgSrcObj["success"];
        var oldStar = self.data.userStar;
        if ((oldStar == 2) && (star == 0)){
            star = 3;
        }
    }
    var starBgHideClass = (parseInt(jsonData["level"]) >= 13) ? "starhide" : "";
    self.setData({
        gradeLoad: "",
        gradeBgImgSrc: gradeBgSrc,
        userStar: star,
        starBgHide: starBgHideClass,
        gradeScoreTotal: theScore
    });
}
// 倒计时初始化
function countDownInit(self) {
    clearTimeout(countDownTimer);
    self.setData({
        countDownVal: "10s",
        countDownH: "100%"
    });
    isCountDownRun = false;
};
// 倒计时启动
function countDownStart(self, time){
    countDownInit(self);
    clearTimeout(countDownTimer);
    isCountDownRun = true;
    // 倒计时运行
    function countDownRun(self, time){
        clearTimeout(countDownTimer);
        if (!isCountDownRun){ return ;}
        self.setData({
            countDownVal: time + "s"
        });
        time--;
        if (time < 0) {
            // 选中正确答案项
            self.setData({
                choiceResClass: "choiceok"
            });
            countDownStop(self, false);
            return;
        } else {
            self.setData({
                countDownH: (time * 100 / countTimeMaxS) + "%"
            });
        }
        // 1s后循环调用
        countDownTimer = setTimeout(function () {
            countDownRun(self, time);
        }, 1000);
    }
    countDownRun(self, time);
};
// 倒计时停止
function countDownStop(self, isanswer) {
    clearTimeout(countDownTimer);
    isCountDownRun = false;
    // 播放提示音
    var voiceFlag = isanswer ? "right" : "wrong";
    answerVoiceFun(voiceFlag, "start");
    // 计算分数
    var time = parseInt(self.data.countDownVal);
    calScoreTotal(self, time, isanswer);
};
// 题目初始化
function questionInit(self, data){
    self.setData({
        questionNumber: data.number,
        questionTitle: data.title,
        questionOptions: data.options,
        choiceResClass: "",
        questionLoad: ""
    });
}
// 计算总得分
function calScoreTotal(self, time, isanswer){
    if (isanswer){
        var curScore = time * 100 / countTimeMaxS;
        var scoreTotal = self.data.scoreTotalVal + curScore
        scoreTotal = (scoreTotal <= scoreTotalMax) ? scoreTotal : scoreTotalMax;
        var scoreH = scoreTotal * 100 / scoreTotalMax + "%";
        self.setData({
            scoreTotalVal: scoreTotal,
            scoreTotalH: scoreH,
        });
    }else{
        goNextQuestion(self);
    }
}
// 开始答题
function answerQuestion(self, data, index){
    hasAnswerQuestion = false;
    // 题目
    data.number = index;
    // 初始化题目
    questionInit(self, data);
    //开始倒计时
    clearTimeout(countDownStartTimer);
    countDownStartTimer = setTimeout(function(){
        countDownStart(self, countTimeMaxS);
    }, 1500);
}
// 生成随机题目以及随机选项
function getRandomQuestion(dataArr){
    var arrSize = dataArr.length;
    var randomIndex = 0;
    randomIndex = (arrSize <= 1) ? randomIndex : GetRandomNum(0, arrSize);
    var questionData = dataArr[randomIndex];
    dataArr.splice(randomIndex, 1);
    var optionArr = questionData.options;
    var optionSize = optionArr.length;
    var randomArr = [];
    for (var i = 0, len = optionArr.length; i<len; i++){
        var j = Math.floor(Math.random() * optionArr.length);
        randomArr[i] = optionArr[j];
        optionArr.splice(j, 1);
    }
    questionData.options = randomArr;
    return questionData;
}

// 进入挑战结果弹窗
function goGradeRes(self, jsonData){
    // 切换到得分页
    pageContentSwitch(self, "grade");
    // 设置结果信息
    setGradeResInfo(self, jsonData);
    // 跳转到成绩页面
    clearTimeout(pageToResultTimer);
    pageToResultTimer = setTimeout(function () {
        var score = parseInt(self.data.scoreTotalVal);
        wx.redirectTo({
            url: AppPages.pageResult + "?score=" + score
        })
    }, 2500);
}
// 保存本轮比赛得分
function saveQuestionScore(self){
    var inData = new getInData();
    inData.scoreTotal = self.data.scoreTotalVal;
    inData.token = QuestionToken;
    wx.showLoading({
        title: '保存得分...',
    })
    wx.request({
        url: Server.updateQuestionResUrl,
        data: inData,
        success: function (res) {
            wx.hideLoading();
            var code = res.data['code'];
            if(parseInt(code) == 200){
                // 保存成功
                var jsonData = res.data['data'];
                jsonData.theScore = self.data.scoreTotalVal;
                // 进入结果弹窗
                goGradeRes(self, jsonData);
            }
            else{
                // 失败跳转到首页
                handleFailToHome("得分保存失败");
            }
        },
        fail: function (err) {
            wx.hideLoading();
            console.log(err);
            // 失败跳转到首页
            handleFailToHome("得分保存失败");
        }
    })
}
// 答题结束
function questionEnd(self){
    if (!QuestionRunning){return ;}
    QuestionRunning = false;
    // 保存得分
    saveQuestionScore(self);
}
// 开始答题
function startQuestion(self){
    clearTimeout(goNextQuestionTimer);
    // 先恢复答题计时器到10s
    clearTimeout(RecoverCountDownTimer);
    self.setData({
        countDownAnimTime: "0ms",
        countDownVal: "10s",
        countDownH: "100%"
    });
    var questionSize = QuestionsArr.length;
    if (questionSize <= 0){
        // 答题结束
        questionEnd(self);
        return ;
    }
    self.setData({
        countDownAnimTime: "1000ms",
        questionLoad: "slhide"
    });
    var questionData = getRandomQuestion(QuestionsArr);
    var questionNum = QuestionTotal - QuestionsArr.length;
    answerQuestion(self, questionData, questionNum);
}

// 获取请求参数
function getInData() {
    var inData = {};
    inData.userId = UserIdFun.get();
    return inData;
}
// 处理题目列表数据
function fatQuestionsData(dataArr){
    var questionsArr = dataArr;
    for (var x = 0, len = questionsArr.length; x < len; x++) {
        var question = questionsArr[x];
        // 答案转换成小写
        question["answer"] = String(question["answer"]).toLowerCase();
        // 选项
        var options = question["options"];
        for (var y = 0, size = options.length; y < size; y++) {
            var option = options[y];
            // 标签转换成小写
            option["tag"] = String(option["tag"]).toLowerCase();
            option["value"] = String(option["value"]);
            options[y] = option;
        }
        questionsArr[x] = question;
    }
    return [].concat(questionsArr);
}
// 内容区显示
function contentShow(self, flag){
    var classStr = flag ? "" : "slhide" ;
    self.setData({
        contentLoad: classStr
    });
}
// 请求数据
function getAllQuestions(self) {
    var inData = new getInData();
    // 隐藏内容
    contentShow(self, false);
    wx.showLoading({
        title: '加载中...',
    })
    wx.request({
        url: Server.allQuestionsUrl,
        data: inData,
        success: function (res) {
            wx.hideLoading();
            var jsonData = res.data['data'];
            var code = parseInt(res.data['code']);
            switch(code){
                case 500:
                    var msg = res.data['msg'];
                    wx.showModal({
                        title: '提示',
                        content: msg,
                        showCancel: false,
                        success: function (res) {
                            atOnceLinkToMe();
                        }
                    })
                break;
                case 200:
                    do{
                        if (typeof (jsonData) != "object"){
                            atOnceLinkToHome();
                            break;
                        }
                        // 保存token
                        var token = jsonData["token"];
                        QuestionToken = token;
                        // 题目列表
                        var questions = jsonData["questions"];
                        QuestionsArr = fatQuestionsData(questions);
                        QuestionTotal = QuestionsArr.length;
                        if (QuestionsArr.length > 0) {
                            // 显示内容
                            contentShow(self, true);
                            // 开始答题
                            QuestionRunning = true; 
                            startQuestion(self);
                        } else {
                            atOnceLinkToHome();
                        }
                    }while(0)
                    break;
                default:
                    atOnceLinkToHome();
            }
        },
        fail: function (err) {
            wx.hideLoading();
            console.log(err);
            atOnceLinkToHome();
        }
    })
}
// 直接立即跳转个人中心
function atOnceLinkToMe() {
    wx.redirectTo({
        url: AppPages.pageMe
    })
}
// 直接立即跳转首页
function atOnceLinkToHome() {
    wx.navigateBack({
        delta: 1
    })
}
// 操作失败跳转到首页
function handleFailToHome(msg) {
    wxShowToast({
        title: msg,
        flag: "fail"
    })
    setTimeout(function () {
        wx.navigateBack({
            delta: 1
        })
    }, 1000);
}
// 加载得分弹窗信息
function loadGradeResInfo(self){
    var inData = {};
    inData.userId = UserIdFun.get();
    wx.request({
        url: Server.getUserInfoUrl,
        data: inData,
        success: function (res) {
            wx.hideLoading();
            var jsonData = res.data['data'];
            // 设置用户数据
            self.setData({
                userStar: jsonData["star"],
            });
        },
        fail: function (err) {
            wx.hideLoading();
            console.log(err);
        }
    })
}

Page({
    data:{
        gameLoad: "slhide",
        gradeLoad: "slhide",
        questionLoad: "slhide",
        contentLoad: "slhide",
        questionNumber: 1,
        questionTitle: [],
        questionOptions: [],
        countDownAnimTime: "1000ms",
        countDownVal: "10s",
        countDownH: "100%",
        scoreTotalVal: 0,
        scoreTotalH: "0%",
        choiceResClass: "",
        userStar: "0",
        starBgHide: ""
    },
    onLoad: function (options) {
        var self = this;
        // 下载音频文件
        downLoadAudioFile();
        // 创建音频上下文
        innerAudioContext = wx.createInnerAudioContext();
        // 切换页面到题目
        pageContentSwitch(self, "question");
        // 加载题目
        getAllQuestions(self);
        // 加载结果弹窗的信息（星星）
        loadGradeResInfo(self);
    },
    onUnload: function (e) {
        var self = this;
        console.log("game onUnload");
        QuestionRunning = false;
        clearTimeout(countDownTimer);
        clearTimeout(goNextQuestionTimer);
        clearTimeout(RecoverCountDownTimer);
        clearTimeout(pageToResultTimer);
        isCountDownRun = false;
        QuestionsArr = [];
        QuestionTotal = 0;
    },
    chooseOptFun: function (e) {
        if (hasAnswerQuestion){return;}
        hasAnswerQuestion = true;
        var self = this;
        var dataset = e.currentTarget.dataset;
        var choiceClass = (dataset.isanswer) ? "choiceok" : ("choice" + dataset.tag);
        self.setData({
            choiceResClass: choiceClass
        });
        countDownStop(self, dataset.isanswer);
    },
    scoreTotalAnimEnd: function (e) {
        var self = this;
        goNextQuestion(self);
    }
});
// 进入下一题
function goNextQuestion(self){
    clearTimeout(goNextQuestionTimer);
    goNextQuestionTimer = setTimeout(function () {
        startQuestion(self);
    }, 2000);
}