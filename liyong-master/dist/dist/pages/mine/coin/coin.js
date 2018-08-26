import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { connect } from '../../../lib/wechat-weapp-redux'
import { fetching, fetchend, clearError } from '../../../store/actions/loader'
import { fetchCoin, fetchCoinRecordList } from '../../../store/actions/mine'

const mapStateToData = (state, options) => {
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,

    coinAmount: state.coins.amount,
    coinRecordList: state.coins.recordList
  }
}

const mapDispatchToPage = dispatch => ({
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),
  clearError: _ => dispatch(clearError()),

  fetchCoin: _ => dispatch(fetchCoin()),
  fetchCoinRecordList: ({ isAppend }) => dispatch(fetchCoinRecordList({ isAppend }))
})

const pageConfig = {
  async onShow (options) {
    this.fetching()
    await Promise.all([
      this.fetchCoin(),
      this.fetchCoinRecordList({})
    ])
    this.fetchend()
  },

  async onReachBottom () {
    this.fetching()
    this.fetchCoinRecordList({ isAppend: true })
    this.fetchend()
  },

  // async onPullDownRefresh () {
  //   this.onShow(options)
  // },

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

