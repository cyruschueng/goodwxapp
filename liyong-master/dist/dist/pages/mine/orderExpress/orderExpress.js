import { connect } from '../../../lib/wechat-weapp-redux'
import { fetchExpress } from '../../../store/actions/mine'
import { fetching, fetchend, clearError } from '../../../store/actions/loader'

const mapStateToData = (state, options) => {
  const { id } = options
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,

    express: state.expresses.map[id]
  }
}

const mapDispatchToPage = dispatch => ({
  clearError: _ => dispatch(clearError()),
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),

  fetchExpress: id => dispatch(fetchExpress(id))
})

const pageConfig = {
  onLoad (options) {
    const { id } = options
    this.fetching()
    this.fetchExpress(id)
    this.fetchend()
  },

  showMore () {
    console.log('showMore')
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
