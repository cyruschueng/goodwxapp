// pages/core/computer/computer.js
Page({
  data: {
    modalflag: false,
    about: null
  },
  modalOk: function () {
    this.setData({ modalflag: true })
  }
})