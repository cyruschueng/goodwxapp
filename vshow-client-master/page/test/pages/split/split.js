


//length给指定的字节数，是否以其他字符强制分割， 最后返回分割后的数组
String.prototype.getBytes = function(){
  let str = this;
  let len = str.length, bytes = len, charCode = -1;
  for(let i = 0; i< len; i++){
    charCode = str.charCodeAt(i);
    if (charCode > 255)
    bytes++
  } 
  return bytes; 
}



String.prototype._split = function (length, separator){
  let str = this;
  let arr = null;

  if (str.getBytes() <= length && separator){   //如果本身长度就不够，则返回本身的数组
    arr = str.split(separator);
    return arr; 
  } else if (str.getBytes() <= length && !separator){
    return [str]; 
  }

  //以下都是字符的长度，大于指定的长度

  if (separator){   //如果指定了分隔符
    arr = str.split(separator);
  }else{ //没有指定，则把回车替换为空格
    str = str.replace(/\n/g, ' ');
    arr = [str];
  }
  

  let resArr = [];  // 结果分割数组
  arr.forEach((v, i) => {
    if (v.getBytes() <= length){
      resArr.push(v);
    }else{
      let charCode = -1, value, curLen = 0, len = v.length, startIndex = 0;
      for (let i = 0; i < len; i++) {
        charCode = v.charCodeAt(i);
        if (charCode >= 0 && charCode <= 255)
          curLen++;
        else
          curLen += 2;

        if (curLen > length) {
          value = v.slice(startIndex, i);
          resArr.push(value);
          startIndex = i;
          charCode > 255? (curLen = 2): (curLen = 1);
        }

        if (i == len - 1 && curLen <= length){   //循环到最后一个了, 并且没有超过最大的长度时
          value = v.slice(startIndex, i+1);
          resArr.push(value);
        }
      }
    }
  });

  return resArr;
  


}


Page({


  submit(e){
    let { cont } = e.detail.value;
    console.log(cont._split(50, '\n'));
  }
});