// component/board/board.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    key:{
      type: String,
      value:'' 
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showBig: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showBigWord(isShow){
      this.setData({
        showBig: isShow
      })
    },

    _clickHandle(e){
      console.log(this.data.key);
      this.showBigWord(true);
      this.triggerEvent('clickHandle', this.data.key);

    },
    _touchend(){
      console.log('touch end')
      setTimeout(()=>{
        this.showBigWord(false);
      }, 500)
    }
  }
})
