
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-');
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}
function findArryIndex(arr,val){
  for(var i=0; i<arr.length; i++){
    if(arr[i]==val){
      return i;
    }
  }
  return -1;
}
function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

module.exports = {
  formatTime: formatTime,
  formatDate:formatDate,
  removeByValue:removeByValue,
  findArryIndex:findArryIndex,
  trim:trim
}
