var texts = [
  '2011年1月，微信 1.0 发布',
  '10月，微信&nbsp;3.0&nbsp;新增摇一摇功能',
  '4月份，微信&lt;4.0&gt;朋友圈发布',
  '2017年1月，小程序发布',
  '特殊字符：&amp;|&apos;|&ensp;|&emsp;结束',
];

let app = getApp()

Page(Object.assign(app.page, {
  data: {
    text: '',
    canAdd: true,
    canRemove: false
  },
  extraLine: [],
  add(e) {
    this.extraLine.push(texts[this.extraLine.length])
    this.setData({
      text: this.extraLine.join('\n'),
      canAdd: this.extraLine.length < texts.length,
      canRemove: this.extraLine.length > 0
    })
  },
  remove(e) {
    if (this.extraLine.length > 0) {
      this.extraLine.pop()
      this.setData({
        text: this.extraLine.join('\n'),
        canAdd: this.extraLine.length < texts.length,
        canRemove: this.extraLine.length > 0,
      })
    }
  }
}))
