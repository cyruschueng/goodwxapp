import { connect } from '../../../lib/wechat-weapp-redux'
import { clearError } from '../../../store/actions/loader'
import { alertError } from '../../../utils'
import { categorymerchandise, promotion } from '../../../api/homePage'
import regeneratorRuntime from '../../../lib/regenerator-runtime'


const mapStateToData = (state, options) => {
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,
    id: state.global.group && state.global.group.id,
    location: state.global.location
  }
}

const mapDispatchToPage = dispatch => ({
  clearError: _ => dispatch(clearError())

})

const pageConfig = {
  data:{
    tab: 'snapUp',
  },

  async onShow (options) {
    const { id } = this.data
    try {
      const res = await promotion({ id, type: 0 })
      const specialGoods = res
      this.setData({
        specialGoods
      })
    } catch (err) {
      alertError(err)
    }
  },
  async changeTab (event) {
    const { tab } = event.target.dataset
    this.setData({
      tab
    })
    if (tab === 'snapUp') {
      console.log("正在特卖")
      const { id } = this.data
      try {
        const { id } = this.data
        const res = await promotion({ id, type: 0 })
        const specialGoods = res
        this.setData({
          specialGoods
        })
      } catch (err) {
        alertError(err)
      }
    } else if (tab === 'beginIn') {
      console.log("即将开始")
      try {
        const { id } = this.data
        const res = await promotion({ id, type: 1 })
        const specialGoods = res
        this.setData({
          specialGoods
        })
      } catch (err) {
        alertError(err)
      }
    }
  },
  reload () {
    this.clearError()
    this.onShow(this.options)
  },
  onUnload () {
    this.clearError()
  }
}

Page(
  connect(
    mapStateToData,
    mapDispatchToPage
  )(pageConfig)
)
