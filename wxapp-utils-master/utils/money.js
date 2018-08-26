/**
 * 将人民币的元单位转换为分单位
 * @param {number|string} yuan 金额，以人民币元为单位
 */
function yuan2fen(yuan) {
  if (isNaN(yuan)) {
    throw new Error('请输入正确的金额，以元为单位～')
  }
  return Math.floor(yuan * 100)
}

/**
 * 将分转换为元
 * @param {number|string} fen 金额，以人民币分为单位
 */
function fen2yuan(fen) {
  if (isNaN(fen)) {
    throw new Error('请输入正确的金额，以分为单位')
  }

  return Math.floor(fen) / 100
}

export default {
  yuan2fen,
  fen2yuan
}
