import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';
import * as types from '../../types';
import { connect } from 'labrador-redux';
import { authAction } from '../../actions';

const {any} = PropTypes;

class Submit extends Component {
  static propTypes = {
    init: PropTypes.func
  };

  static defaultProps = {
    addressList: []
  };

  state = {
    query: {},
    address: null,
    addressStr: '',
    showSelector: false,
    showModalCoupons: false,
    remarkText: '',
    cardId: null,
    getOrderItem: () => {
      return this.props.detail.orderBOs[0].orderItems[0].orderItem;
    }
  };

  children () {
    return {};
  }

  onLoad (query) {
    this.setState({query});
    this.props.setTitle('确认订单');
    this.props.init(query);
    this.setQunId();
  }

  onShow () {
    const { query } = this.state;
    const { dataCoupons } = this.props;
    if (query.productId) {
      this.props.init(query);
      this.setQunId();
    }
  }

  onHide () {
    this.props.dataClear();
  }

  onUnload () {
    this.props.dataClear();
  }

  setQunId () {
    const that = this;
    let dataShare = '';
    wx.getStorage({
      key: 'dataShare',
      success: function(res) {
        let dataShare = res.data;
        if (dataShare) {
          wx.getShareInfo({
            shareTicket: dataShare,
            complete: function(res) {
              if (res.errMsg === 'getShareInfo:ok') {
                const params = {
                  encryptedData: res.encryptedData,
                  iv: res.iv
                };
                that.props.setQunIdRequest(params);
              }
            }
          });
        }
      }
    });
    
  }

  updateAddress (address, needInit = false) {
    const { query } = this.state;
    this.setState({
      address,
      addressStr: `${address.province} ${address.city} ${address.district} ${address.street}`,
      query: {
        ...query,
        userAddressId: address.id
      }
    });
    if (needInit) {
      this.props.updateAddress();
      this.props.init(this.state.query.set('userAddressId', address.id));
    }
  }

  onUpdate (props) {
    if (props.isReady && !this.props.isReady && !this.state.address) {
      let defaultAddressIndex = 0;
      for (let i = 0; i < props.addressList.length; i++) {
        if (props.addressList[i].isDefault) {
          defaultAddressIndex = i;
          break;
        }
      }

      const defaultAddress = props.addressList[defaultAddressIndex];
      defaultAddress && this.updateAddress(defaultAddress);
    }
  }



  handleRemarkChange (e) {
    this.setState({remarkText: e.detail.value});
  }

  handlecardIdChange (e) {
    this.setState({cardId: e.detail.value});
  }

  handleSubmit () {
    const {query, address, remarkText, cardId} = this.state;
    const { dataTemp: { qunId } } = this.props;
    const  ranges = ['\ud83c[\udf00-\udfff]', '\ud83d[\udc00-\ude4f]', '\ud83d[\ude80-\udeff]'];
    this.props.submit(
      query.merge({
        userAddressId: address.id,
        remarkText: remarkText.replace(new RegExp(ranges.join('|'), 'g'), ''),
        cardId,
        openGid: qunId
      })
    );
  }

  handleShowSelector () {
    this.setState({showSelector: true});
  }

  handleCloseSelector () {
    this.setState({showSelector: false});
  }

  handleAddAddress () {
    this.setState({showSelector: false});
    wx.navigateTo({url: '/pages/address/detail'});
  }

  handleSelectAddress (e) {
    const {address} = e.currentTarget.dataset;
    if (address.id === this.state.address.id) {
      return;
    }

    this.updateAddress(address, true);
    this.setState({showSelector: false});
  }

  handleSelectCoupons ({ target }) {
    const { item } = target.dataset;
    
    const {query, address, remarkText, cardId} = this.state;
    const { dataTemp: { qunId } } = this.props;
    
    const params = {
      query: {
        ...query,
        userAddressId: address.id,
        remarkText,
        cardId,
        openGid: qunId
      },
      coupons: item
    }

    this.setState({showModalCoupons: false});
    
    this.props.changeSelectedCoupons(params);
  }
  handleToggleCoupons () {
    const { showModalCoupons } = this.state;
    const { dataCoupons } = this.props;

    if (!dataCoupons.list.length) {
      return;
    }
    this.setState({
      showModalCoupons: !showModalCoupons
    });
  }

  handleAddressEdit (e) {
    wx.navigateTo({ url: '/pages/address/detail?id=' + e.target.dataset.id });
  }

  formSubmit (e) {
    const formID = e.detail.formId;
    console.log(formID);
    if (formID !== 'the formId is a mock one') {
      this.props.submitFormId(formID);
    }
  }
}

export default connect(
  ({order, address}) => ({
    isReady: order.isPreOrderReady,
    detail: order.preOrderDetail,
    dataTemp: order.dataTemp,
    addressList: address.list,
    showAddressSelector: address.showSelector,
    dataCoupons: order.dataCoupons
  }),
  (dispatch) => ({
    dataClear () {
      dispatch({
        type: types.DATA_REDUCER_CLEAR
      });
    },
    init (payload) {
      dispatch(authAction({
        type: types.ORDER_PRE_DETAIL_INIT_START,
        payload
      }));
    },
    changeSelectedCoupons (payload) {
      dispatch({
        type: types.COUPONS_SELECTED_CHANGE_REQUEST,
        payload
      });
    },
    updateAddress () {
      dispatch({
        type: types.ORDER_ADDRESS_UPDATE_REQUEST
      });
    },
    submit (payload) {
      dispatch(authAction({
        type: types.ORDER_SUBMIT_REQUEST,
        payload
      }));
    },
    setTitle (title) {
      dispatch({
        type: types.UPDATE_VIEW_CONFIG,
        payload: {
          title
        }
      });
    },
    setQunIdRequest (payload) {
      dispatch(authAction({type: types.QUNID_REQUEST, payload}));
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
)(Submit);
