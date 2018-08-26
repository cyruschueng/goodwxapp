// pages/index/index.js
import { apiRequest } from '../../utils/net';
let page = 1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    // 输入框显示状态
    inputShowed: false,
    inputVal: "",
    searchReault: [],
    // banner
    banners: [],
    // 新歌
    newsong: [],
    // 电台
    djprogram: [],
    // 排行
    tracks: [],
    isplaying: false,
    // 初始化播放器信息
    audio: {
      id: 436514312,
      name: "成都",
      src: "http://m10.music.126.net/20170618112455/a79fdf1c797867b227947b95ed7fe07d/ymusic/35e8/22de/2dcd/3d2ccb1bd197e23827a6953af6297eab.mp3",
      picUrl: "http://p1.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg",
      author: "赵雷",
    }
  },
  // 事件  
  //  aaa:function(e){
  //
  // }可以缩写为 
  // aaa(e){
  //
  // }
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    //banner图
    apiRequest({
      url: '/banner',
      method: 'GET',
      success: function (res) {
        that.setData({
          banners: res.data.banners
        })
      },
      fail: function (res) {

      },
    });
    //推荐新音乐
    apiRequest({
      url: '/personalized/newsong',
      method: 'GET',
      success: function (res) {
        let newsong = [];
        res.data.result.forEach((item, index) => {
          newsong.push({
            id: item.id,
            name: item.name,
            author: item.song.artists[0].name,
            picUrl: item.song.album.picUrl
          });
        });
        that.setData({
          newsong: newsong
        });
      },
      fail: function (err) {

      }
    });
    //推荐电台
    apiRequest({
      url: '/personalized/djprogram',
      method: 'GET',
      success: function (res) {
        console.log(res)
        let djprogram = [];
        res.data.result.forEach((item, index) => {
          djprogram.push({
            id: item.program.mainSong.id,
            name: item.name,
            picUrl: item.picUrl,
            author: item.program.mainSong.artists[0].name
          });
     
        });
        
        that.setData({
          djprogram: djprogram
        });
      },
      fail: function (err) {

      }
    });


    //排行
    //           "0": 云音乐新歌榜,
    //           "1": 云音乐热歌榜,
    //           "2": 网易原创歌曲榜,
    //           "3": 云音乐飙升榜,
    //           "4": 云音乐电音榜,
    //           "5": UK排行榜周榜,
    //           "6": 美国Billboard周榜  
    //           "7": KTV嗨榜,
    //           "8": iTunes榜,
    //           "9": Hit FM Top榜,
    //           "10": 日本Oricon周榜  
    //           "11": 韩国Melon排行榜周榜,
    //           "12": 韩国Mnet排行榜周榜,
    //           "13": 韩国Melon原声周榜,
    //           "14": 中国TOP排行榜(港台榜),
    //           "15": 中国TOP排行榜(内地榜)  
    //           "16": 香港电台中文歌曲龙虎榜,
    //           "17": 华语金曲榜,
    //           "18": 中国嘻哈榜,
    //           "19": 法国 NRJ EuroHot 30周榜,
    //           "20": 台湾Hito排行榜,
    //           "21": Beatport全球电子舞曲榜
    apiRequest({
      url: '/top/list',
      method: 'GET',
      data: {
        idx: 1
      },
      success: function (res) {
     
        let dataTracks = []
        res.data.result.tracks.forEach((item, index) => {
          dataTracks.push({
            id: item.id,
            name: item.name,
            author: item.artists[0].name,
            picUrl: item.album.picUrl
          })
        });
        that.setData({
          tracks: dataTracks
        });
        wx.setStorage({
          key: 'tracks',
          data: dataTracks,
        })
      },
      fail: function (err) {

      }
    });
  },
  // 显示搜索框
  showInput() {
    this.setData({
      inputShowed: true
    });
  },
  // 隐藏搜索框
  hideInput() {
    this.setData({
      inputShowed: false,
      inputVal: ""
    });
  },
  // 清空搜索框
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  // 当键盘输入时，触发input事件，e.detail = { value: value }，处理函数可以直接 return 一个字符串，将替换输入框的内容。
  inputTyping: function (e) {
    let that = this;
    page = 1;
    that.setData({
      inputVal: e.detail.value,
    });
    // 搜索歌曲
    apiRequest({
      url: '/search',
      method: 'GET',
      data: {
        keywords: that.data.inputVal,
        offset: page,
        limit: 15 //加载数目
      },
      success: function (res) {
        let temp = []
        // 循环获取到数组添加到新数组
        res.data.result.songs.forEach((song, index) => {
          temp.push({
            id: song.id,
            name: song.name,
            mp3Url: song.mp3Url,
            picUrl: song.album.picUrl,
            singer: song.artists[0].name
          });
          that.setData({
            searchReault: temp,
          });
        })
        // 存入搜索的结果进缓存
        wx.setStorage({
          key: "searchReault",
          data: temp
        })
      },
      fail: function (res) {
        // fail
      }
    })
  },
  tonow(e) {
    let that = this;
    let songData = {
      id: e.currentTarget.dataset.id,
      name: e.currentTarget.dataset.name,
      picUrl: e.currentTarget.dataset.picurl,
      author: e.currentTarget.dataset.author,
    }
    // 将当前点击的歌曲保存在缓存中
    wx.setStorageSync('clickdata', songData);
    apiRequest({
      url: '/music/url',// 获取音乐 url  说明: 使用歌单详情接口后, 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id(可多个, 用逗号隔开), 可以获取对应的音乐的 url(不需要登录)
      method: 'GET',
      data: {
        id: songData.id,
      },
      success: function (res) {
        that.setData({
          audio: {
            id: songData.id,
            name: songData.name,
            src: res.data.data[0].url,
            picUrl: songData.picUrl,
            author: songData.author,
          },
          isplaying: true,
        })
        console.log('url' + songData.id)
        wx.playBackgroundAudio({
          dataUrl: res.data.data[0].url,
          title: songData.name,
          coverImgUrl: songData.picUrl,
          success: function (res) {
            // console.log(res)
          }
        })
      },
      fail: function (res) {
        // fail
      }
    });

  },
  /** 
       * 滑动切换tab 
       */
  bindChange(e) {
    let that = this
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav(e) {
    let that = this
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 下拉动作
   */
  onPullDownRefresh: function () {
    // json设置了下拉刷新停止
    wx.stopPullDownRefresh();
  },
  /**
   *上拉事件
   */
  searchReaultLower: function (e) {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    page++
    apiRequest({
      url: '/search',
      method: 'GET',
      data: {
        keywords: that.data.inputVal,
        offset: page,
        limit: 15
      },
      success: function (res) {
        let temp = []
        res.data.result.songs.forEach((song, index) => {
          temp.push({
            id: song.id,
            name: song.name,
            mp3Url: song.mp3Url,
            picUrl: song.album.picUrl,
            singer: song.artists[0].name
          })
          temp = Object.assign(that.data.searchReault, temp)
          that.setData({
            searchReault: temp,
          });
          wx.hideLoading();
          wx.setStorage({
            key: "searchReault",
            data: temp
          })
        })
      },
      fail: function (res) {
        // fail
      }
    })
  },
  // 播放
  audioPlay(e) {
    let that = this
    let audio = that.data.audio;
    wx.playBackgroundAudio({
      dataUrl: audio.src,
      title: audio.name,
      coverImgUrl: audio.poster,
      success: function (res) {
        that.setData({
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
    let that = this
    wx.pauseBackgroundAudio()
    that.setData({
      isplaying: false
    })
  },
  // 下一曲
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
  skip() {
    wx.navigateTo({
      url: '../now/index',
    })
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (res) {
    let that = this;
    return {
      title: '音乐',
      path: '/pages/index/index',
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
