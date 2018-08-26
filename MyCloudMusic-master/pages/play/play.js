// pages/play/play.js
const app = getApp();
const utils = require('../../utils/util.js');
const audioManager = wx.getBackgroundAudioManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isReady: false,
    name: '',
    artists: '',
    album: '',
    coverUrl: '',
    isPlaying: false,
    playImgUrl: '/images/pause.svg',
    currentPos: 0,
    total: 0,
    isSliding: false,
    currentProcess: '00:00',
    totalProcess: '00:00',
    sliderValue: 0,
    sliderMax: Number.MAX_VALUE
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let currentPos = app.globalData.currentPos;
    this.setPlayingMusic(currentPos);
    this.setData({
      isReady: true
    });
    audioManager.onTimeUpdate(() => {
      if (!this.data.isSliding) {
        this.setData({
          currentProcess: utils.formatAudioProcess(audioManager.currentTime),
          sliderValue: Math.floor(audioManager.currentTime)
        });
      }
    });
    audioManager.onNext(() => this.next());
    audioManager.onPrev(() => this.previous());
    audioManager.onEnded(() => this.next());
    audioManager.onPause(() => this.setPause());
    audioManager.onStop(() => this.setPause());
    audioManager.onPlay(() => this.setPlay());
    audioManager.seek = (options) => {
      wx.seekBackgroundAudio(options);
    }
  },
  setPlayingMusic: function (index) {
    let song = app.globalData.tracks[index];
    this.setData({
      name: song.name,
      artists: song.singers,
      album: song.album.name,
      coverUrl: song.album.picUrl,
      isPlaying: true,
      currentPos: index,
      total: app.globalData.tracks.length,
      totalProcess: utils.formatAudioProcess(song.duration / 1000),
      sliderMax: song.duration / 1000
    });
    audioManager.coverImgUrl = song.album.picUrl;
    audioManager.epname = song.album.name;
    audioManager.title = song.name;
    audioManager.singer = song.singers;
    audioManager.webUrl = 'http://music.163.com/song/media/outer/url?id=' + song.id + '.mp3';
    audioManager.src = 'http://music.163.com/song/media/outer/url?id=' + song.id + '.mp3';
  },
  previous: function () {
    let currentPos = (this.data.total + this.data.currentPos - 1) % this.data.total;
    app.globalData.currentPos = currentPos;
    this.setPlayingMusic(currentPos);
  },
  togglePlay: function () {
    let paused = audioManager.paused;
    if (paused) {
      audioManager.play();
    } else {
      audioManager.pause();
    }
    this.setData({
      isPlaying: !paused,
      playImgUrl: paused ? '/images/pause.svg' : '/images/play.svg'
    });
  },
  setPause: function () {
    let paused = audioManager.paused;
    if (!paused) {
      audioManager.pause();
    }
    this.setData({
      isPlaying: false,
      playImgUrl: '/images/play.svg'
    });
  },
  setPlay: function () {
    let paused = audioManager.paused;
    if (paused) {
      audioManager.play();
    }
    this.setData({
      isPlaying: true,
      playImgUrl: '/images/pause.svg'
    });
  },
  next: function () {
    let currentPos = (this.data.currentPos + 1) % this.data.total;
    app.globalData.currentPos = currentPos;
    this.setPlayingMusic(currentPos);
  },
  hanleSliderChange: function (e) {
    const position = e.detail.value;
    this.seekCurrentAudio(position);
  },
  seekCurrentAudio: function (position) {
    // 这里有一个诡异bug：seek在暂停状态下无法改变currentTime，需要先play后pause
    const pauseStatusWhenSlide = audioManager.paused;
    if (pauseStatusWhenSlide) {
      audioManager.play();
    }
    audioManager.seek({
      position: Math.floor(position),
      success: () => {
        this.setData({
          currentProcess: utils.formatAudioProcess(position),
          sliderValue: Math.floor(position)
        });
        if (pauseStatusWhenSlide) {
          audioManager.pause();
        }
        console.log(`The process of the audio is now in ${audioManager.currentTime}s`);
      }
    });
  },
  handleSliderMoveStart: function () {
    this.setData({
      isSliding: true
    });
  },
  handleSliderMoveEnd: function () {
    this.setData({
      isSliding: false
    });
  }
})