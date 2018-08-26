Page({
  data: {
    resultText: '',
    inputText: '',
    times: 100   //改变的次数，默认100次
  },

  bindinput(e){
    let {value} = e.detail;
    this.setData({inputText: value});
    this.startMake();
  },

  changeTimes(e){
    let {value} = e.detail;
    value = Number.parseInt(value);
    if (Object.is(value, NaN)) return wx.showToast({ title: '请输入数字' });
    if(value>10000) return wx.showToast({title: '次数不能大于10000哦'});
    this.setData({
      times: value
    });
    this.startMake()
  },

  startMake(){
    let self = this;
    let {times, inputText, pid} = self.data;  //pid为模板id;
    let result;
    switch(pid){
      case '1':
        inputText += '\n';
        result = inputText.repeat(times) + '重要的事情说：' + times + '次';
      break;
      case '2':
        let arr = Array.from(inputText);
        arr.sort((a, b)=>{
          return Math.random()> .5? 1: -1;
        });
        result = arr.join('');
      break;
      default: 
        console.log('没进来');
      break;
    }
    self.setData({ resultText: result });
  },

  onCopy(){
    let self = this;
    let {resultText} = self.data;
    wx.setClipboardData({
      data: resultText,
      success(){
        wx.showToast({
          title: '复制成功'
        });
      }
    })
  },

  onLoad(options){
    let {title, pid} = options;
    wx.setNavigationBarTitle({title});
    this.setData({pid});
  },

  onShareAppMessage() {
    return {
      title: '一起来感受文字的魅力吧'
    }
  }
})