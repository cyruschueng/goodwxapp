let app = getApp()

Page(Object.assign({
  data:{
    array: ['中国', '美国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']]
  },
  onPickerColumnChange(e){
    // console.log(e)
    let column = e.detail.column
    let newValue = e.detail.value
    let multiArray = this.data.multiArray

    if (column == 0) {
      if (newValue == 0){
        multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']
      }else{
        multiArray[1] = ['有颌鱼', '总鳍鱼', '两栖动物', '爬行动物', '鸟类','哺乳动物']
      }
      this.setData({
        "multiArray": multiArray
      })
    }
  },
}, app.page))