const bgc = require('./config.js')

const random = (progress) => {
  // 生成第一个数
  let original = new Array;
  //定义运算符
  /*难度定义， 默认为初级难度*/
  progress = progress? progress: 1;
  let level = setGameLevel(progress);
  console.log('生成的难度'+level+'===关数：'+progress)
  let createNum = function() {
    switch(level){
      /*生成初级题目数字*/
      case 'a':
        return Math.floor(Math.random() * 10 + 1);
      /*生成中等题目数字*/
      case 'b':
        return Math.floor(Math.random() * 10 + 1);
      /*生成困难题目数字*/
      case 'c':
        return Math.floor(Math.random() * 19 + 1);
    }
  }
  let bgcArr = new Array;
  for (let i = 0, len = bgc.colorOption.length; i< len; i++){
    bgcArr[i] = bgc.colorOption[i];
  }
  
  /**打乱存放颜色的数组顺序 */
  bgcArr.sort(function () { return 0.5 - Math.random(); });

  for(let i=0; i< 2; i++){
    let obj = {};

    if(level !== 'a'){

      let one = createNum();
      let two = createNum();
      
      /*产生随机运算符*/
      let opt = Math.floor(Math.random() * 2);

      switch(opt){
        case 0:
          obj.key = `${one} + ${two}`;
          obj.value = Number(one) + Number(two);
          break;

        case 1:
          if(one < two){
            [two, one] = [one, two];
          }

          obj.key = `${one} - ${two}`;
          obj.value = Number(one) - Number(two);
          
      }

    }else{
      let one = createNum();

      obj.key = one;
      obj.value = one;
    }

    //生成背景色
    obj.bgC = bgcArr[i];
    original[i] = obj;
  }
  return original;
}


const setGameLevel = (currProgress) => {
  /*定义难度*/
  let gameLevelArr = ['a','b','c'];

  if(currProgress < 4){
    return gameLevelArr[0];
  }else if(currProgress < 10 && currProgress >= 4){
    return gameLevelArr[Math.floor(Math.random()*2)]
  }else if(currProgress >= 15){
    return gameLevelArr[Math.floor(Math.random() * 2 +1)]
  }else{
    return gameLevelArr[2];
  }
}

/*设置当前题目获得的分数*/
const setGamePoint = (currProgress) =>{
  console.log('游戏难度')
  console.log(currProgress)
  currProgress = currProgress ? currProgress: 1;
  let obj = {};
  if(currProgress < 4){
    obj.point = 10;
    obj.timing = 10;
  }else if(currProgress >=4 && currProgress <= 9){
    obj.point = 20;
    obj.timing = 10;
  }else if(currProgress >= 10 && currProgress <= 14){
    obj.point = 30;
    obj.timing = 10
  }else if(currProgress >= 15 && currProgress <= 19){
    obj.point = 40;
    obj.timing = 10;
  }else if(currProgress >= 20 && currProgress <= 24){
    obj.point = 60;
    obj.timing = 8;
  }else if(currProgress >= 25 && currProgress <= 29){
    obj.point = 80;
    obj.timing = 6;
  }else if(currProgress >= 30 && currProgress <= 32){
    obj.point = 100;
    obj.timing = 4;
  }else{
    obj.point = 150;
    obj.timing = 3;
  }
  return obj;
}

module.exports = {
  random: random,
  bgc: bgc,
  setGamePoint: setGamePoint
}