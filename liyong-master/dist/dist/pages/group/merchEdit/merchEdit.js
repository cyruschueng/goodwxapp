import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { connect } from '../../../lib/wechat-weapp-redux'
import { fetching, fetchend, clearError } from '../../../store/actions/loader'
import { fetchMerch, putGrouponSlogon } from '../../../store/actions/group'
import { alert } from '../../../utils'

const mapStateToData = (state, options) => {
  const { id } = options
  const { merchTypes, groupons } = state
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,

    groupId: state.global.group.id,
    merchTypes: (merchTypes.idsMap[id] || []).map(id => merchTypes.map[id]),
    groupon: groupons.map[groupons.idMap[id]]
  }
}

const mapDispatchToPage = dispatch => ({
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),
  clearError: _ => dispatch(clearError()),

  fetchMerch: ({ groupId, merchId }) => dispatch(fetchMerch({ groupId, merchId })),
  putGrouponSlogon: ({ grouponId, slogon }) => dispatch(putGrouponSlogon({ grouponId, slogon })),
})

const pageConfig = {
  onLoad (options) {
    const { id } = this.options
    const { groupId } = this.data
    this.fetching()
    this.fetchMerch({ groupId, merchId: id })
    this.fetchend()
  },

  async submit (event) {
    const { grouponId } = this.data.groupon
    const { slogon } = event.detail.value
    // valid
    if (!slogon.trim()) {
      return alert('宣言不能为空！')
    }
    this.fetching()
    const isSuccess = await this.putGrouponSlogon({ grouponId, slogon })
    if (isSuccess) {
      wx.navigateBack()
    }
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
