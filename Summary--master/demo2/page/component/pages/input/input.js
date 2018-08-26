Page({
  data: {
    input1Total:'',
    input1:'',
    inputPanelExtVisible:false,
    textColor:'dark',
  },
  onTapColor(){
    var color = "red"
    if (this.data.textColor == 'red'){
      color = 'blue'
    }
    this.setData({
      textColor: color
    })
  },
  onBlur(){
    this.setData({
      inputPanelExtVisible:false
    })
  },
  onFocus(){
    this.setData({
      inputPanelExtVisible: true
    })
  },
  onInput1Confirm(e){
    console.log(e.detail.value)
    let newValue = e.detail.value
    if (this.data.input1Total) newValue = this.data.input1Total + "\n" + newValue
    this.setData({
      input1Total: newValue,
      input1:''
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  },
  bindHideKeyboard: function (e) {
    if (e.detail.value === '123') {
      // 收起键盘
      wx.hideKeyboard()
    }
  }
})
