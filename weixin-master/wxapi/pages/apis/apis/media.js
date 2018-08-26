/**
 * API -- Media 媒体对象
 */

/** 图片 */
const image = {
  id: 0,

  // 选择图片
  choose(opts) {
    const _opts = {
      count: 'Number, 最多可选图片数量，默认：9',
      sizeType: 'StringArray, original原图，compressed压缩图，默认两者都有',
      sourceType: 'StringArray, album从相册选图，camera使用相机，默认两者都有',
      success: function (res) {
        const _res = {
          tempFilePaths: 'StringArray, 图片的本地文件路径列表',
          // ObjectArray, 图片的本地文件列表，每项是一个File对象，这些都还是临时存储
          // 如果要永久存储，需要调用 save(wx.saveFile)
          tempFiles: [{
            path: 'String，本地文件路径',
            size: 'Number, 本地文件大小，单位：B'
          }, { /* ... */ }]
        }

        console.log('/media/image/choose/success/path', res.tempFilePaths)
        console.log('/media/image/choose/success/files', res.tempFiles)
      },
      fail: function (res) {
        console.log('/media/image/choose/fail', res)
      },

      complete: function (res) {
        console.log('/media/image/choose/complete', res)
      }
    }

    wx.chooseImage(opts || _opts)
  },

  // 预览图片
  preview(opts) {
    const _opts = {
      current: 'String, 当前显示图片的链接，不填默认为urls的第一张',
      urls: 'StringArray, required, 需要预览的图片链接列表',
      success: function (res) {
        console.log('/media/image/preview/success', res)
      },
      fail: function (res) {
        console.log('/media/image/preview/fail', res)
      },
      complete: function (res) {
        console.log('/media/image/preview/complete', res)
      }
    }

    wx.previewImage(opts || _opts)
  },

  // 获取图片信息
  getInfo(opts) {
    const _opts = {
      src: 'String, required, 图片路径，可以使相对，临时文件，存储文件，网络图片路径',
      success: function (res) {
        const _res = {
          width: 'Number, 图片宽度(px)',
          height: 'Number, 图片高度(px)',
          path: 'String, 返回图片的本地路径'
        }

        console.log('/media/image/getInfo/success', res)
      },
      fail: function (res) {
        console.log('/media/image/getInfo/fail', res)
      },
      complete: function (res) {
        console.log('/media/image/getInfo/complete', res)
      }
    }

    wx.getImageInfo(opts || _opts)
  },

  // 永久保存图片
  save() {
    const _opts = {
      filePath: 'String, required, 图片文件路径，可以是临时文件或永久文件路径，不支持网络图片路径',
      success: function (res) {
        const _res = {
          errMsg: 'String, 调用结果'
        }

        console.log('/media/image/save/success', res)
      },
      fail: function (res) {
        console.log('/media/image/save/fail', res)
      },
      complete: function (res) {
        console.log('/media/image/save/complete', res)
      }
    }

    wx.saveImageToPhotosAlbum(opts || _opts)
  }
}

/** 录音 */
const recorder = {
  // < 1.6.0 笨笨
  old: {
    start(opts) {
      const _opts = {
        success(res) {
          const _res = {
            tempFilePath: 'String，录音文件的临时路径'
          }

          console.log('/media/recorder/old/start/success', res)
        },
        fail() {},
        complete() {}
      }
      wx.startRecord(opts || _opts)
    },
    stop(opts) {
      console.log('/media/recorder/old/stop', opts)
      wx.stopRecord()
    }
  },
  // 1.6.0+ 版本
  manager: null,

  getManager() {
    this.manager = wx.getRecorderManager()
    return this.manager
  },

  start(opts) {
    const _opts = {
      duration: 'Number, 指定录音时长(ms)，达到时长自动停止，最大(600000,10分钟), 默认(60000,1分钟)',
      sampleRate: 'Number, 采样率，有效值8000/16000/44100',
      numberOfChannels: 'Number, 录音通道数，有效值1/2',
      /**
       * 采样率    编码码率
       * 8000     16000 ~ 48000
       * 11025    16000 ~ 48000
       * 12000    24000 ~ 64000
       * 16000    24000 ~ 96000
       * 22050    32000 ~ 128000
       * 24000    32000 ~ 128000
       * 32000    48000 ~ 192000
       * 44100    64000 ~ 320000
       * 48000    64000 ~ 320000
       */
      encodeBitRate: 'Number, 编码码率，有效值见上表',
      format: 'String，音频格式，有效值 aac/mp3',
      frameSize: 'Number, 指定帧大小(KB)，传入frameSize后，没录制指定帧大小的内容后，会回调录制的文件内容，不指定则不回调。暂仅支持mp3格式'
    }

    this.manager = this.manager || this.getManager()
    this.manager && this.manger.start(opts || _opts)
  },

  pause() {
    this.manager = this.manager || this.getManager()
    this.manager && this.manager.pause()
  },

  resume() {
    this.manager = this.manager || this.getManager()
    this.manager && this.manager.resume()
    },

  stop() {
    this.manager = this.manager || this.getManager()
    this.manager && this.manager.stop()
  },

  on: {
    start(callback) {
      this.manager = this.manager || this.getManager()
      this.manager && this.manager.onStart(res => {
        console.log('/media/recorder/on/start', res)
        if (callback) {
          callback(res)
        }
      })
    },
    pause(callback) {
      this.manager = this.manager || this.getManager()
      this.manager && this.manager.onPause(res => {
        console.log('/media/recorder/on/stop', res)
        if (callback) {
          callback(res)
        }
      })
    },
    stop(callback) {
      this.manager = this.manager || this.getManager()
      this.manager && this.manager.onStop(res => {
        const _res = {
          tempFilePath: 'String， 录音文件的临时路径'
        }

        console.log('/media/recorder/on/stop', res)
        if (callback) {
          callback(res || _res)
        }
      })
    },
    frameRecorded(callback) {
      this.manager = this.manager || this.getManager()
      this.manager && this.manager.onFrameRecorded(res => {
        const _res = {
          frameBuffer: 'ArrayBuffer, 录音分片结果数据',
          isLastFrame: 'Boolean，当前帧是否为录音结束前的最后一帧'
        }

        if (callback) {
          callback(res || _res)
        }
      })
    },
    error(callback) {
      this.manager = this.manager || this.getManager()
      this.manager && this.manager.onError(res => {
        const _res = {
          errMsg: 'String，错误信息'
        }
        if (callback) {
          callback(res || _res)
        }
      })
    }
  }
}

/** 音频播放控制 */
const voice = {
  play(opts) {
    const _opts = {
      filePath: 'String, required',
      duration: 'Number，单位：秒，默认：60，到达指定时长自动停止',
      success() {},
      fail() {},
      complete() {}
    }

    wx.playVoice(opts || _opts)
  },
  pause(opts) {
    wx.pauseVoice()
  },
  stop(opts) {
    wx.stopVoice()
  }
}

const audio = {

  // >= 1.6.0，为createAudioContext升级版
  innerContext: {
    src: 'String，音频数据链接，用于直接播放',
    startTime: 'Number, 开始播放位置（单位：s），默认：0',
    autoplay: 'Boolean，是否自动播放，默认：false',
    loop: 'Boolean, 是否循环播放，默认：false',
    obeyMuteSwitch: 'Boolean，是否遵循系统静音开关，false用户打开了静音开关，也能继续发出声音，默认为true',
    duration: 'Number, readOnly, 当前音频长度（单位：s），只有在当前有合法的src时返回',
    currentTime: 'Number，readOnly, 当前音频的播放位置（单位：s），只有在当前有合法的src时返回，时间不取整，保留小数点后6位',
    paused: 'Boolean, readOnly，播放或停止状态，true暂停或停止，false正在播放',
    buffered: 'Number, readOnly, 音频缓冲时间点，仅保证当前播放时间点到此时间点内容已缓冲',
    play() {},
    pause() {},
    stop() {},
    seek(pos) {},
    destroy() {},
    onCanPlay(cb) {},
    onPause(cb) {},
    onStop(cb) {},
    onEnded(cb) {},
    onTimeUpdate(cb) {},
    onError(cb) {},
    onWaiting(cb) {},
    onSeeking(cb) {},
    onSeeked(cb) {}
  },

  getInnerContext() {
    return this.innerContext = wx.createInnerAudioContext()
  },

  // < 1.6.0
  context: {
    setSrc(src) {},
    play() {},
    pause() {},
    seek(position) {}
  },
  // context
  getContext(audioId, scope) {
    /**
     * 通过 audioId 跟一个 <audio/> 组件绑定从来来控制该组件
     */
    return this.context = wx.createAudioContext(audioId, scope || this)
  },

  // >= 1.2.0
  manager: {
    duration: 'Number, 当前音频长度（单位：s），只有当前有合法的src时返回',
    currentTime: 'Number, 当前音频播放位置，只有当前有合法的src时返回',
    paused: 'Boolean, 暂停或停止状态，false为正在播放',
    src: 'String, 音频数据源，默认为空串，当设置了新的src时，会自动播放，支持：m4a, aac, mp3, wav',
    startTime: 'Number, 音频开始播放位置，单位：s',
    buffered: 'Number, 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲',
    title: 'String, 音频标题，用于做原生音频播放器音频标题，原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值',
    epname: 'String, 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值',
    singer: 'String, 歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值',
    coverImgUrl: 'String, 封面图url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及北京，也将使用该值',
    webUrl: 'String, 页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值'
  },

  play() {
    this.manager.play()
  },
  pause() {
    this.manager.pause()
  },
  stop() {
    this.manager.stop()
  },
  seek(position) { // 单位：秒
    this.manager.seek(position)
  },
  on: {
    // 音频进入可播放状态，但不保证流畅
    canPlay(callback) {
      this.manager.onCanplay(callback)
    },
    play(callback) {
      this.manager.onPlay(callback)
    },
    pause(callback) {
      this.manager.onPause(callback)
    },
    stop(callback) {
      this.manager.onStop(callback)
    },
    ended(callback) {
      this.manager.onEnded(callback)
    },
    // 音频播放进度更新事件
    timeUpdate(callback) {
      this.manager.onTimeUpdate
    },
    prev(callback) {
      this.manager.onPrev(callback)
    },
    next(callback) {
      this.manager.onNext(callback)
    },
    error(callback) {
      /**
       * error code:
       * 
       * code   desc
       * 10001  系统错误
       * 10002  网络错误
       * 10003  文件错误
       * 10004  格式错误
       * -1     未知错误
       */
      this.manager.onError(callback)
    },
    // 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
    waiting(callback) {
      this.manager.onWaiting(callback)
    }
  },

  getManager() {
    return this.manager = wx.getBackgroundAudioManager()
  },

  // < 1.2.0
  old: {
    getState(opts) {
      const _opts = {
        success(res) {
          const _res = {
            duration: '选定音频长度（单位：s），只有在当前有音乐播放时返回',
            currentPosition: '当前播放音频的播放位置（单位：s）',
            status: '播放状态（2：没有音乐在播放，1：播放中，0：暂停中）',
            downloadPercent: '音频的下载进度（整数，80代表80%），有音乐播放时返回',
            dataUrl: '歌曲数据链接，有音乐播放时返回'
          }
        },
        fail(res) {},
        complete(res) {}
      }
      
      wx.getBackgroundAudioPlayerState(opts || _opts)
    },

    play(opts) {
      const _opts = {
        dataUrl: 'String, required, 音乐链接，支持：m4a, aac, mp3, wav',
        title: 'String, 音乐标题',
        coverImgUrl: 'String, 封面URL',
        success(res) {},
        fail(res) {},
        complete(res) {}
      }

      wx.playBackgroundAudio(opts || _opts)
    },

    pause(opts) {
      wx.pauseBackgroundAudio()
    },

    seek(opts) {
      const _opts = {
        position: 'Number, required, 单位：秒',
        success(res) {},
        fail(res) {},
        complete(res) {}
      }

      wx.seekBackgroundAudio(opts || _opts)
    },

    stop(opts) {
      wx.stopBackgroundAudio()
    },

    on: {
      play(callback) {
        wx.onBackgroundAudioPlay(callback)
      },
      pause(callback) {
        wx.onBackgroundAudioPause(callback)
      },
      stop(callback) {
        wx.onBackgroundAudioStop(callback)
      }
    }
  }
}

const video = {
  // 视频组件控制
  context: {
    play() {},
    pause() {},
    seek(pos) {},
    sendDanmu(danmu) {
      const _danmu = {
        text: 'String',
        color: 'css color'
      }
    },
    // 1.4.0 设置倍速播放，支持倍率有0.5/0.8/1.0/1.25/1.5
    playbackRate(rate) {},
    // 1.4.0 进入全屏，可传入{direction}(1.7.0起支持)
    requestFullScreen() {},
    // 1.4.0
    exitFullScreen() {}
  },

  getContext(videoId, scope) {
    return this.context = wx.createVideoContext(videoId, scope || this)
  },

  choose(opts) {
    const _opts = {
      sourceType: 'StringArray, album从相册选，camera拍摄，默认：["album", "camera"]',
      compressed: 'Boolean, 是否压缩，默认：true',
      maxDuration: 'Number, 拍摄最长时间，最长60s',
      success(res) {
        const _res = {
          // wx.saveFile 永久保存
          tempFilePath: '选定视频的临时文件路径',
          duration: '选定视频的时间长度',
          size: '选定视频的数据量大小',
          height: '返回选定视频的长',
          width: '返回选定视频的宽'
        }
      },
      fail(res) {},
      complete(res) {}
    }
  },

  saveToAlbum(opts) {
    const _opts = {
      filePath: 'String, required, 可临时或永久路径',
      success(res) {
        const _res = {
          errMsg: 'String, 调用结果'
        }
      },
      fail(res) {},
      complete(res) {}
    }

    wx.saveVideoToPhotosAlbum(opts || _opts)
  },

  save(opts) {
    const _opts = {
      tempFilePath: 'String, required, 需要保存文件的临时路径',
      success(res) {
        const _res = {
          // 本地文件存储的大小限制为 10M
          savedFilePath: '文件的保存路径'
        }
      },
      fail(res) {},
      complete(res) {}
    }

    wx.saveFile(opts || _opts)
  }
}

const camera = {
  // >= 1.6.0
  context: {
    takePhoto(opts) {
      const _opts = {
        quality: 'String, 成像质量，值为high, normal, low, 默认normal',
        success(res) {
          const _res = {
            tempImagePath: 'String, 图片临时保存地址'
          }
        },
        fail(res) {},
        complete(res) {}
      }
    },
    startRecord(opts) {
      const _opts = {
        success(res) {},
        fail(res) {},
        complete(res) {},
        timeoutCallback(res) {
          // 超过30s或页面onHide时结束录像
          const _res = {
            tempThumbPath, tempVideoPath
          }
        }
      }
    },
    stopRecord(opts) {
      const _opts = {
        success(res) {
          const _res = {
            tempThumbPath, tempVideoPath
          }
        },
        fail(res) {},
        complete(res) {}
      }
    }
  },

  getContext(scope) {
    return this.context = wx.createCameraContext(scope || this)
  }
}

// 操作对应的 <live-player/> 组件
const livePlayer = {
  context: {
    // 其他方法的opts(除requestFullScreen外)
    opts: {
      success(res) {},
      fail(res) {},
      complete(res) {}
    },
    play(opts) {},
    stop(opts) {},
    mute(opts) {},
    requestFullScreen(opts) {
      const _opts = {
        direction: 'Number, 0-正常竖向，90-屏幕逆时针90度，-90-屏幕顺时针90度',
        success(res) {},
        fail(res) {},
        complete(res) {}
      }
    },
    exitFullScreen(opts) {}
  },
  
  getContext(domId, scope) {
    return this.context = wx.createLivePlayerContext(domid, scope)
  }
}

const livePusher = {
  // >= 1.7.0
  context: {
    // 所有方法的 opts
    opts: {
      success(res) {},
      fail(res) {},
      complete(res) {}
    },
    // 播放推流
    start(opts) {},
    // 停止推流
    stop(opts) {},
    // 暂停推流
    pause(opts) {},
    // 恢复推流
    resume(opts) {},
    // 切换前后摄像头
    switchCamera(opts) {}
  },
  getContext() {
    return this.context = wx.createLivePusherContext()
  }
}


module.exports = {
  image, recorder, voice, audio, video, camera,
  livePlayer, livePusher
}