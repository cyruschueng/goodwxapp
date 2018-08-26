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

module.exports = {
  formatTime: formatTime
}

/**
 * 根据某一项值获取当前项所在数组索引，-1说明未查到
 */
export function indexOfArray(key, value, target) {
  for (let index in target) {
    let item = target[index];
    if (item[key] == value) {
      return parseInt(index)
    }
  }

  return -1;
}

/**
 * 根据某一项值获取当前项数据
 */
export function getInArray(key, value, target) {
  for (let index in target) {
    let item = target[index];
    if (item[key] == value) {
      return item;
    }
  }

  return null;
}