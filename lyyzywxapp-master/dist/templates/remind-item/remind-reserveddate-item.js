
import { assign } from '../../utils/npm/lodash-wx'

const defaultButton = {
  name: '保存数据',
  openType: '',
  tapHandler: 'footSaveButtonHandler'
}

let parent
let parentDataKey

export default {
  setParent(p) {
    parent = p
  },
  data() {
    return {
      reserveddateData: {
        dateViewHidden: true,
        picker_value: '',
        picker_year: [],
        picker_month: [],
        picker_day: [],
        choose_year: '',
        choose_month: '',
        choose_day: '',
        now_year: '',
        now_month: '',
        now_day: ''
      },
    }
  },
  listeners() {
    return {
      footSaveButtonHandler: (ev) => {
        console.log('footSaveButtonHandler...')
      }
    }
  },
  bindData(pageOptions, dataKey = 'footButtonData', data) {
    parentDataKey = dataKey
    pageOptions.data[dataKey] = assign(this.data(), data)
  },
  bindListeners(pageOptions, listeners) {
    assign(pageOptions, this.listeners(), listeners)

    let onReady = pageOptions.onReady
    let footButton = this

    // NOTE: 此处不要写成 = () => 的形式，保持this指向page instance.
    pageOptions.onReady = function (options) {
      footButton.setParent(this)
      // wx.showShareMenu({
      //   withShareTicket: true
      // })





      console.log('##called wx.showShareMenu withShareTicket.')
      onReady && onReady.call(this, options)
    }
  }
}