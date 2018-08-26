let app = getApp()

Page(Object.assign(app.page, {
  data: {},
formSubmit: function (e) {
  console.log('form发生了submit事件，携带数据为：', e.detail.value)
  console.log('form发生了submit事件，formId：', e.detail.formId)
},
formReset: function (e) {
  console.log('form发生了reset事件')
  this.setData({
    activeColor: ''
  })
}
}))
