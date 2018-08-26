/**
 * 参考文档
 *
 * wx.createInnerAudioContext()
 * https://mp.weixin.qq.com/debug/wxadoc/dev/api/createInnerAudioContext.html
 */

/** 创建并返回内部 audio 上下文 innerAudioContext 对象，基础库 1.6.0 开始支持 */
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.autoplay = false

/**
 * 播放音频
 * @param {string} path - 需播放对音频地址
 */
function play(path){
  console.log('[play sound]: ', path)
  if (!path) {
    throw new Error('voice path is empty')
  }
  innerAudioContext.src = path
  innerAudioContext.play()
}

/** 停止音频 */
function stop() {
  innerAudioContext.stop()
}

/** 暂停音频 */
function pause() {
  innerAudioContext.pause()
}

export default {
  play,
  stop,
  pause
}
