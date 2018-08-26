/**
 * 参考文档
 *
 * 录音管理 - 微信小程序文档
 * https://mp.weixin.qq.com/debug/wxadoc/dev/api/getRecorderManager.html
 */

import promisify from './promisify'

/** 获取全局唯一的录音管理器，v1.6.0+ 支持 */
const recorderManager = wx.getRecorderManager()

/**
 * 开始录音
 * @param {object} options - 录音选项
 * @param {number} options.duration - 指定录音的时长，单位 ms
 * @param {number} options.sampleRate - 采样率，有效值 8000/16000/44100
 * @param {number} options.numberOfChannels - 录音通道数，有效值 1/2
 * @param {number} options.encodeBitRate - 编码码率
 * @param {string} options.format - 音频格式，有效值 aac/mp3
 * @param {number} options.frameSize - 指定帧大小，单位 KB，传入 frameSize 后，每录制指定帧大小的内容后，会回调录制的文件内容，不指定则不会回调。暂仅支持 mp3 格式。
 */
function start(options) {
  recorderManager.start(options)
  return new Promise((resolve, reject) => {
    recorderManager.onStop(resolve)
  })
}

function stop() {
  recorderManager.stop()
}

export default {
  start,
  stop
}
