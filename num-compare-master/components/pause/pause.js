Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  data:{
    isShowPause: false
  },
  methods: {
    /*隐藏背景层*/
    hidePause() {
      this.setData({
        isShowPause: !this.data.isShowPause
      })
    },
    /*显示暂停背景层*/
    showPause() {
      this.setData({
        isShowPause: !this.data.isShowPause
      })
    },
    /*点击继续游戏的回调*/
    _goEvent() {
      //触发成功回调
      this.triggerEvent("goEvent");
    }
  }
})