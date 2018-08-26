Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },
  traceEvent(e){
    console.log(e)
  },
  onSwitchChange(e){
    var fieldName = e.currentTarget.dataset.name
    var data = {}
    data[fieldName] = !(this.data[fieldName] || false)
    this.setData(data)
  },
  onSliderChange(e){
    var fieldName = e.currentTarget.dataset.name
    var data = {}
    data[fieldName] = e.detail.value
    this.setData(data)
  }
})
