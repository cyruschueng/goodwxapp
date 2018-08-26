/**
 * @author Sky
 * @email lihaizh_cn@foxmail.com
 * @create date 2018-02-03 11:34:42
 * @modify date 2018-02-03 11:34:42
 * @desc 查找文件的正则表达式
*/

exports.RegNodeModulesFile = /(?:require\(["'](\w\S+?)["']\))|(?:import[\S\s]+?["'](\w\S+?)["'])/gim
exports.RegJSFile = /(?:require\(["'](\.\S+?)["']\))|(?:import[\S\s]+?["'](\.\S+?)["'])/gim
exports.RegSCSSFile = /@import\s+["'](\.\S+?\.wxss)["']/gim
exports.RegSRCFile = /\ssrc=["'](\.\S+?)["']/gim
