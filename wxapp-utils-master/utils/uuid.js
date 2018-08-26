/**
 * 生成 40 位的唯一字符编码
 *
 * @return {string} - 40 位的字符编码
 */
export default function uuid() {
  return Date.now().toString().slice(5, 13) + guid(8) + guid(8) + guid(8) + guid(8)
}

/**
 * 生成指定长度的随机数
 *
 * @param {number} length - 指定的随机数长度，若为空，默认为 16
 * @return {string} - 一个随机字符串
 */
function guid(length = 16) {
  let guid = ''
  for (var i = 0; i < length; i++) {
    const n = Math.random() * 16
    guid += Math.floor(n).toString(16)
  }
  return guid
}
