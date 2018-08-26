// pages/now/index.js
import { apiRequest } from '../../utils/net';
import { getlyric, formatSeconds } from '../../utils/commen';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 初始化播放器信息
    audio: {
      id: 436514312,
      name: "成都",
      picUrl: "http://p1.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg",
      src: "http://m10.music.126.net/20170618112455/a79fdf1c797867b227947b95ed7fe07d/ymusic/35e8/22de/2dcd/3d2ccb1bd197e23827a6953af6297eab.mp3",
      author: "赵雷",
    },
    time: '00:00',
    alltime: '00:00',
    value: 0,
    max: 0,
    rotate: false,
    isplaying: false,
    lrc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'clickdata',
      success: function (res) {
        that.setData({
          audio: {
            id: res.data.id,
            name: res.data.name,
            picUrl: res.data.picUrl,
            author: res.data.author
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;

    // 获取后台音乐播放状态。
    //     success返回参数说明：
    // duration	          选定音频的长度（单位：s），只有在当前有音乐播放时返回
    // currentPosition	  选定音频的播放位置（单位：s），只有在当前有音乐播放时返回
    // status	            播放状态（2：没有音乐在播放，1：播放中，0：暂停中）
    // downloadPercent	  音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回
    // dataUrl  	        歌曲数据链接，只有在当前有音乐播放时返回
    this.player = function () {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          let status = res.status;
          let currentPosition = res.currentPosition;
          let duration = res.duration;
          let date = new Date(currentPosition * 1000);
          getlyric(that.data.audio.id, (obj, lyricArr) => {
            if (status == 1) {
              that.setData({
                rotate: true,
                isplaying: true,
                time: formatSeconds(currentPosition),
                alltime: formatSeconds(duration),
                value: currentPosition,
                max: duration,
                //obj[currentPosition] currentPosition是键
                lrc: obj[currentPosition]
              })
            }
          })
        }
      })
    };
    // this变量可在其他地方使用
    // 定时器旋转
    this.Interval = setInterval(this.player, 1000);

  },
  rotate(e) {
    let that = this;
    if (that.data.rotate == true) {
      that.setData({
        rotate: false
      })
    } else {
      that.setData({
        rotate: true
      })
    }
    wx.getShareInfo({
      // shareTicket:true,
      success: function (res) {
        console.log(res)
      }
    })

  },
  sliderChange(e) {
    let that = this;
    //调用 滑动 歌曲快进 方法
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        let val = e.detail.value
        wx.seekBackgroundAudio({
          position: val,
          success: function (seekRes) {
            that.setData({
              value: val
            })
          }
        });
      }
    })

  },
  // 播放
  audioPlay(e) {
    this.Interval = setInterval(this.player, 1000);
    let that = this
    let audio = that.data.audio;
    wx.playBackgroundAudio({
      dataUrl: audio.src,
      title: audio.name,
      coverImgUrl: audio.poster,
      success: function (res) {
        console.log(res)
        that.setData({
          rotate: true,
          isplaying: true
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  // 暂停
  audioPause(e) {
    // 清除定时器
    clearInterval(this.Interval)
    let that = this
    // 暂停背景播放
    wx.pauseBackgroundAudio()
    that.setData({
      rotate: false,
      isplaying: false
    })
  },
  audioNext(e) {
    let that = this;
    wx.getStorage({
      key: 'clickdata',
      success: function (clickdata) {
        wx.getStorage({
          key: 'tracks',
          success: function (track) {
            // findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
            // findIndex() 方法为数组中的每个元素都调用一次函数执行：
            // 当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
            // 如果没有符合条件的元素返回 - 1
            // 注意: findIndex() 对于空数组，函数是不会执行的。
            // 注意: findIndex() 并没有改变数组的原始值。
            let currentSongIndex = track.data.findIndex((item) => {
              return item.id == clickdata.data.id;
            })
            currentSongIndex++;
            apiRequest({
              url: '/music/url',
              method: 'GET',
              data: {
                id: track.data[currentSongIndex].id,
              },
              success: function (song) {
                that.setData({
                  audio: {
                    id: track.data[currentSongIndex].id,
                    name: track.data[currentSongIndex].name,
                    src: song.data.data[0].url,
                    picUrl: track.data[currentSongIndex].picUrl,
                    author: track.data[currentSongIndex].author,
                  },
                  isplaying: true,
                })
                wx.setStorageSync('clickdata', that.data.audio);
                wx.playBackgroundAudio({
                  dataUrl: song.data.data[0].url,
                  title: track.data.name,
                  coverImgUrl: track.data.picUrl,
                  success: function (res) {
                    // console.log(res)
                  },
                  fail: function (err) {
                    console.log(err)
                  }
                })
              },
              fail: function (res) {
                // fail
              }
            });
          }
        });
      }
    });
  },
  // 评论跳转
  comment(e){
    let that = this;
    wx.navigateTo({
      url: `../comment/index?id=${that.data.audio.id}`,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let that = this;
    return {
      title: `音乐：${that.data.audio.name}`,
      path: '/pages/now/index',
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (err) {
        // 转发失败
        console.log(err)

      }
    }
  }
})
