import { connect } from '../../../lib/wechat-weapp-redux'
import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { fetching, fetchend, clearError } from '../../../store/actions/loader'
// import { fetchOrder } from '../../../store/actions/mine'
import { fetchSaleSupportReasonList } from '../../../store/actions/global'

const mapStateToData = (state, options) => {
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,
    saleSupportMessage:state.global.saleSupportMessage,
    reasonList: state.global.saleSupportReasonList
  }
}

const mapDispatchToPage = dispatch => ({
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),
  clearError: _ => dispatch(clearError()),

  fetchSaleSupportReasonList: _ => dispatch(fetchSaleSupportReasonList())
})

const pageConfig = {
  data: {
    // 赔付类型 1现金 2优惠券 3礼品卡
    compenStateType:{
      cash: 1,
      coupon: 2,
      gift: 3
    },
    // 申诉状态 1待审核 2处理成功 3驳回
    serviceStatus:{
      wait: "1",
      success: "2",
      reject: "3"
    },
    serviceReason:''
  },

  async onLoad (options) {
    console.log(options)
    this.fetching()
    await this.fetchSaleSupportReasonList()
    const serviceReason = this.data.reasonList.filter(item => {
      if(item.serviceReason == this.data.saleSupportMessage.serviceReason) {
        return item
      }
    })[0].title
    console.log(serviceReason)
    this.setData({
      serviceReason
    })
    this.fetchend()
  },

  reload () {
    this.clearError()
    this.onLoad(this.options)
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
