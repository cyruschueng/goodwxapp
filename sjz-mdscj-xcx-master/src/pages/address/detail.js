import { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import * as types from '../../types';
import {authAction} from '../../actions';

class List extends Component {
  static propTypes = {
    detail: PropTypes.object,
    region0: PropTypes.array,
    region1: PropTypes.array,
    region2: PropTypes.array,
    user: PropTypes.object,
    initAddressDetail: PropTypes.func,
    getRegionList: PropTypes.func,
    saveAddress: PropTypes.func,
    modifyAddress: PropTypes.func,
    initRegion: PropTypes.func
  };

  static defaultProps = {
    detail: {},
    region0: [],
    region1: [],
    region2: [],
    user: {}
  }

  state = {
    id: 0
  };

  bindPickerChange ({detail, target}) {
    let value = detail.value; // 当前数组index
    let field = target.dataset.field; // 哪个数组
    const pid = this.props['region' + field][value].id;

    this.props.modifyAddress({
      ['region' + field]: pid,
      ['indexRegion' + field]: value * 1
    });
    if (field == 0) {
      this.props.getRegionList(pid, 1);
    }
    if (field == 1) {
      this.props.getRegionList(pid, 2);
    }
  }

  changeDefault({detail}) {
    this.props.modifyAddress({
      isDefault: detail.value
    });
  }

  changeInput ({detail, target}) {
    let value = detail.value;
    let field = target.dataset.field;
    this.props.modifyAddress({
      [field]: value
    });
  }

  handelSubmit () {
    setTimeout(() => {
      this.props.saveAddress();
    }, 150);
  }

  delAddress () {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '您确认删除这个地址？',
      success: function(res) {
        if (res.confirm) {
          that.props.removeAddress(that.state.id);
        }
      },
      confirmColor: '#ff2551'
    });
  }

  formSubmit (e) {
    const formID = e.detail.formId;
    console.log(formID);
    if (formID !== 'the formId is a mock one') {
      this.props.submitFormId(formID);
    }
  }
  onLoad ({id}) {
    let title = id ? '地址编辑' : '添加地址';
    this.props.setViewConfig({
      title
    });
    if (id) {
      this.setState({id});
      this.props.getAddressDetail(id);
    } else {
      this.props.getRegionList(1, 0);
      this.props.initAddressDetail();
    }
  }

  onUpdate (props) {
  }

  children () {
    return {};
  }
}

export default connect(
  ({address, user, region}) => ({
    detail: address.detail,
    user,
    region0: region.region0,
    region1: region.region1,
    region2: region.region2,
  }),
  (dispatch) => ({
    getAddressDetail (id) {
      dispatch(authAction({
        type: types.ADDRESS_DETAIL_REQUEST,
        payload: {
          id
        }
      }));
    },
    initAddressDetail () {
      dispatch({
        type: types.ADDRESS_DETAIL_INIT_REQUEST
      });
    },
    initRegion (index) {
      dispatch({
        type: types.REGION_LIST_INIT,
        payload: {
          index
        }
      });
    },
    getRegionList (pid, index) {
      dispatch(authAction({
        type: types.REGION_LIST_REQUEST,
        payload: {
          pid,
          index
        }
      }));
    },
    modifyAddress (payload) {
      dispatch({
        type: types.ADDRESS_DATA_MODIFY,
        payload
      });
    },
    saveAddress () {
      dispatch(authAction({
        type: types.ADDRESS_SAVE_REQUEST
      }));
    },
    removeAddress (id) {
      dispatch(authAction({
        type: types.ADDRESS_REMOVE_REQUEST,
        payload: {
          id
        }
      }));
    },
    setViewConfig (config) {
      dispatch({
        type: types.UPDATE_VIEW_CONFIG,
        payload: config
      });
    },
    submitFormId (formId) {
      dispatch({
        type: types.FORM_ID_SAVE_REQUEST,
        payload: {
          formId
        }
      })
    }
  })
)(List);
