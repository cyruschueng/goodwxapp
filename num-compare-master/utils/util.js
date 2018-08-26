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

const showModal = (params, callback) => {
  wx.showModal({
    title: params.title,
    content: params.content,
    showCancel: params.showCancel !== undefined? params.showCancel: true,
    cancelText: params.cancelText? params.cancelText: '取消',
    cancelColor: params.cancelText? params.cancelColor: '#000000',
    confirmColor: params.confirmColor? params.confirmColor: '#3CC51F',
    success: function(res){
      callback(res);
    },
    fail: function(res){
      // callback(()=>{
        throw new Error('接口调用失败')
      // })
    }
  })
}

/**音频播放 */
const playMedia = (index) => {
  let mediaFile = '';
  switch(index){
    case 0:
      mediaFile = '/static/media/sucess.mp3';
    break;
    case 1:
      mediaFile = '/static/media/fail.mp3'
    break;
    case 2:
      mediaFile = '/static/media/clock.mp3';
    break;
    default:
    break;
  }
  
  const innerAudioContext = wx.createInnerAudioContext()
  innerAudioContext.autoplay = true
  innerAudioContext.src = mediaFile
  innerAudioContext.onPlay(() => {
  })
}

module.exports = {
  formatTime: formatTime,
  showModal: showModal,
  playMedia: playMedia
}
