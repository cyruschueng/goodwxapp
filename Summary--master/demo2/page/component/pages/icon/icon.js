Page({
  data: {
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColors: [
      'red', 'orange', '#ffff00', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconTypes1: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ]
  },
  onLoad(){
    const ORI_TYPES = ["success", "info", "warn", "waiting", "cancel", "download", "search", "clear"]
    let arr = []
    for (var k in ORI_TYPES){
      let iconType = ORI_TYPES[k]
      arr.push(iconType, iconType + "_no_circle", iconType +"_circle")
    }
    console.log(arr)
    this.setData({
      iconTypes2: arr
    })
  }
})