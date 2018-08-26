const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function getNum(weishu) {//this.data.weishu
  //获取一个操作数
  return Math.floor(Math.random() * Math.pow(10, weishu));
}
function getYunsuanfu(yunsuanfu) {
  //获取运算符
  var length = yunsuanfu.length;//this.data.yunsuanfu
  var mark = Math.floor(Math.random() * length);
  return yunsuanfu[mark];
}
function getBiaodashi(yunsuanshu, yunsuanfu, weishu, timu, correct_result, xiaoshuwei) {//参与运算的数字个数this.data.yunsuanshu，参与运算的运算符数组this.data.yunsuanfu，参与运算的数字位数this.data.weishu，当前的题库this.data.timu，正确答案数组this.data.correct_result，除法答案保留的小数位this.data.xiaoshuwei
  //获取表达式
  var biaodashi = "";
  for (var i = 0; i < yunsuanshu; i++) {
    biaodashi = biaodashi + getNum(weishu) + getYunsuanfu(yunsuanfu);
  }
  biaodashi = biaodashi.slice(0, -1);//把多余的运算符取消掉
  biaodashi = biaodashi + "=";//给表达式增加一个"="
  console.log(biaodashi);
  var result = judge_biaodashi(biaodashi.slice(0, -1),timu);
  if (result === false) {
    return getBiaodashi(yunsuanshu, yunsuanfu, weishu, timu, correct_result, xiaoshuwei);
  } else {
    
    result = Math.round(result * Math.pow(10, xiaoshuwei)) / Math.pow(10, xiaoshuwei);
    correct_result.push(result);
    //this.setData({ correct_result: tmp });
    //this.setData({ biaodashi: biaodashi });
    timu.push(biaodashi);
    //this.setData({ timu: tm });
    return {correct_result: correct_result,biaodashi: biaodashi, timu: timu};
  }
}
function judge_biaodashi(biaodashi,timu) {//表达式本身，当前的题库
  //验证表达式的结果是否正常，不能为负数，不能是Infinity，不能是NaN，不能超过设置的运算位数
  //不能有重复题目
  var result = calCommonExp(biaodashi);
  console.log(result);
  if (!isFinite(result)) {
    return false;
  }
  if (isNaN(result)) {
    return false;
  }
  if (result < 0) {
    return false;
  }
  if (timu.indexOf(biaodashi + "=") !== -1) {//不能有重复题目
    return false;
  }
  return result;
}
//以下代码是框架的代码，借用一下rpn.js
function isOperator(value) {
  var operatorString = '+-*/()×÷';
  return operatorString.indexOf(value) > -1;
}
function getPrioraty(value) {
  if (value == '-' || value == '+') {
    return 1;
  } else if (value == '*' || value == '/' || value == '×' || value == '÷') {
    return 2;
  } else {
    return 0;
  }
}
function prioraty(v1, v2) {
  return getPrioraty(v1) <= getPrioraty(v2);
}
function outputRpn(exp) {
  var inputStack = [];
  var outputStack = [];
  var outputQueue = [];
  var firstIsOperator = false;
  exp.replace(/\s/g, '');
  if (isOperator(exp[0])) {
    exp = exp.substring(1);
    firstIsOperator = true;
  }
  for (var i = 0, max = exp.length; i < max; i++) {
    if (!isOperator(exp[i]) && !isOperator(exp[i - 1]) && (i != 0)) {
      inputStack[inputStack.length - 1] = inputStack[inputStack.length - 1] + exp[i] + '';
    } else {
      inputStack.push(exp[i]);
    }
  }
  if (firstIsOperator) {
    inputStack[0] = -inputStack[0]
  }
  while (inputStack.length > 0) {
    var cur = inputStack.shift();
    if (isOperator(cur)) {
      if (cur == '(') {
        outputStack.push(cur);
      } else if (cur == ')') {
        var po = outputStack.pop();
        while (po != '(' && outputStack.length > 0) {
          outputQueue.push(po);
          po = outputStack.pop();
        }
      } else {
        while (prioraty(cur, outputStack[outputStack.length - 1]) && outputStack.length > 0) {
          outputQueue.push(outputStack.pop());
        }
        outputStack.push(cur)
      }
    } else {
      outputQueue.push(Number(cur));
    }
  }
  if (outputStack.length > 0) {
    while (outputStack.length > 0) {
      outputQueue.push(outputStack.pop());
    }
  }
  return outputQueue;
}
function calRpnExp(rpnArr) {
  var stack = [];
  for (var i = 0, max = rpnArr.length; i < max; i++) {
    if (!isOperator(rpnArr[i])) {
      stack.push(rpnArr[i]);
    } else {
      var num1 = stack.pop();
      var num2 = stack.pop();
      if (rpnArr[i] == '-') {
        var num = num2 - num1;
      } else if (rpnArr[i] == '+') {
        var num = num2 + num1;
      } else if (rpnArr[i] == '*' || rpnArr[i] == '×') {
        var num = num2 * num1;
      } else if (rpnArr[i] == '/' || rpnArr[i] == '÷') {
        var num = num2 / num1;
      }
      stack.push(num);
    }
  }
  return stack[0];
}
function calCommonExp(exp) {
  var rpnArr = outputRpn(exp);
  return calRpnExp(rpnArr)
}
function simplyBiaodashi(timu){
  var sz = timu;
  var tm = sz[0].slice(0, -1);
  for (var i = 1; i < sz.length; i++) {
    tm = tm + "," + sz[i].slice(0, -1);
  }
  return tm;
}
function calcHaoshi(begin, end) {
  console.log(begin);
  console.log(end);
  var haoshi = (end - begin) / 1000;//得到秒
  var sec = Math.round(haoshi % 60);
  var min = Math.floor(haoshi / 60);
  if (min === 0) {
    return sec + "秒";
  } else if (sec === 0) {
    return min + "分";
  } else {
    return min + "分" + sec + "秒";
  }
}
//睡眠millsecond毫秒
function sleep(millsecond){
  let begin=new Date().getTime();
  let end=0;
  while(true){
    end=new Date().getTime();
    if(end-begin>millsecond){
      return;
    }
  }
}
module.exports = {
  formatTime: formatTime,
  getBiaodashi: getBiaodashi,
  calCommonExp: calCommonExp,
  simplyBiaodashi: simplyBiaodashi,
  calcHaoshi: calcHaoshi,
  sleep: sleep
}
