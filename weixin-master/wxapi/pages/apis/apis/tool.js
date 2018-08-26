/**
 * Tool
 * 
 * 小工具
 */

/**
 * ArrayBuffer 转 16禁止字符串
 */
function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    bit => '00' + bit.toString(16).slice(-2)
  )

  return hexArr.join('')
}