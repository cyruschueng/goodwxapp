
/**
 * 获取文件路径的扩展名
 * @param {string} filePath - 文件路径
 * @return {string}
 */
function extname(filePath) {
  const reg = /\.(\w+)$/
  const res = reg.exec(filePath)
  if (!res) return ''
  return res[0]
}

module.exports = {
  extname
}
