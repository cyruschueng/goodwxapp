import utils from '../../utils/index.js';

Page({
  data: {
    status: 'init',
    tempFilePath: 'None',
    savedFilePath: 'None',
    duration: 0
  },

  start_time: 0,

  onLoad() {

  },

  onPlay() {
    const {tempFilePath} = this.data;
    utils.voice.play(tempFilePath);
  },

  onRecord() {
    this.start_time = Date.now()
    console.log('start record')
    this.setData({
      status: 'recording...'
    })

    utils.toast.show({
      title: 'recording',
      image: '/pages/image/microphone.png',
      duration: 60000
    })

    utils.record.start()
      .then((path) => {
        utils.toast.hide()

        const diff = Date.now() - this.start_time;
        if (diff < 1000) {
          this.setData({
            status: 'Duration Too Short.',
            tempFilePath: '',
            savedFilePath: ''
          })
          return;
        }

        const duration = Math.floor(diff / 1000);

        console.log(path);
        this.setData({
          status: 'tempFile',
          tempFilePath: path,
          duration: duration
        })

        return utils.file.save(path)
      })
      .then((path) => {
        console.log('then saved')
        this.setData({
          status: 'savedFile',
          savedFilePath: path
        })
        console.log(path, 'saved path')
      })
      .catch((err) => {
        console.log(err.errMsg);
        this.setData({
          status: err.errMsg
        })
      })
  },

  onStop() {
    utils.toast.hide()
    console.log('stop record.')
    this.setData({
      status: 'record stopped'
    })

    utils.record.stop()
  }
})
