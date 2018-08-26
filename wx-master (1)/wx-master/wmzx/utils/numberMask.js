function mask(cardId,len){
  var arr=[];
  for(var j = 0;j<len;j++){
    var str = cardId[j];
    var reg = /^(\d{4})\d+(\d{4})$/;
    str = str.replace(reg, "$1****$2");
    arr.push(str);
  }
  
  return arr
}
module.exports.mask = mask;