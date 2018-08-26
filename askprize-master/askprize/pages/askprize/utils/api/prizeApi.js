/**
 * 有奖问答统一接口类
 * 
 * @author fuqiang
 */

import { baseApi } from "./baseApi";

function prizeApi(page) {
  // 继承基类
  baseApi.call(this);
  // 引入页面page类对象
  this.init(page);
  // this.ckPromission();
}


// 属性方法
prizeApi.prototype = {
  apiURL: {
    // 最新一条有奖问答
    'last': '/ask/prize/last',
    // 有奖问答问题列表
    'qlist': '/ask/prize/qlist',
    // 提交答案
    'answer': '/ask/prize/answer',
    // 获取有奖问答奖金
    'money': '/ask/prize/money',
    // 非实时最新一条有奖问答
    'reallast': '/ask/prize/reallast',
    // 是否可以分享
    'isjoin': '/ask/prize/isjoin',
    // 成功复活接口
    'isrelive': '/ask/prize/isrelive',

  },

  /**
   * 最新一个有奖问答
   */
  lastOne: function (callback) {
    var that = this;
    var args = [];
    that.getURLData(that.apiURL['last'], args, callback);
  },
  /**
   * 非实时最新一条有奖问答
   */
  reallast: function (callback) {
    var that = this;
    var args = [];
    that.getURLData(that.apiURL['reallast'], args, callback);
  },
  /**
   * 判断是否可以分享
   *  @param int qid   [有奖问答id]
   */
  isjoin: function (qid, callback) {
    var that = this;
    var args = { qid: qid };
    that.getURLData(that.apiURL['isjoin'], args, callback);
  },

  /**
   * 获取有奖问答问题列表
   * 
   * @param int qid   [有奖问答id]
   */
  qlist: function (qid, type, callback) {
    var that = this;
    var args = { qid: qid, type: type };
    that.getURLData(that.apiURL['qlist'], args, callback);
  },


  /**
   * 提交一个问题答案
   * 
   * @param int           answerid    [本次答题报名id]
   * @param int           questionid  [某个问题id]
   * @param string|array  answers     [答题assii码,多个用数组或英文逗号隔开]
   * @param string        callback    [回调方法]
   * 
   */
  answer: function (answerid, questionid, answers, type, callback) {
    var that = this;
    answers = typeof (answers) == 'string' ? answers.split(',').toString() : answers;
    var args = { answerid: answerid, questionid: questionid, answers: answers, type: type };
    that.postURLData(that.apiURL['answer'], args, callback);
  },



  /**
   * 成功复活（分享）
   *
   * @param int           qid         [有奖问答id]
   * @param int           answerid    [本次答题报名id]
   * @param int           questionid  [某个问题id]
   * @param int           isshare     [复活分享成功标识  0失败  1成功]
   * @param string        callback    [回调方法]
   * 
   */
  isrelive: function (qid, answerid, questionid, isshare, callback) {
    var that = this;
    var args = { qid: qid, answerid: answerid, questionid: questionid, isshare: isshare };
    that.postURLData(that.apiURL['isrelive'], args, callback);
  },

  /**
   * 获取有奖问答奖金
   * 
   * @param int     qid         [有奖问答id]
   * @param string  callback    [回调方法]
   */
  money: function (qid, answerid, callback) {
    var that = this;
    var args = { qid: qid, answerid: answerid };
    that.postURLData(that.apiURL['money'], args, callback);
  }

}

// 声明类方法
module.exports.prizeApi = prizeApi;