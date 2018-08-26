import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import Products from '../../components/products/products';
import * as types from '../../types';
import config from '../../config';

class Index extends Component {
  static propTypes = {
    products: PropTypes.array,
    getProductList: PropTypes.func
  };
  static defaultProps = {
    products: []
  };

  onLoad () {
    this.props.setViewConfig({
      title: config.miniProName
    });
    // this.props.getProductList();
    
    wx.showShareMenu({
      withShareTicket: true,
      complete (res) {
        console.log('shareMenu', res);
      }
    });
  }

  onShow () {
    this.props.getProTuanList();
  }

  onHide () {
    this.props.dataClear();
  }

  onUnload () {
    this.props.dataClear();
  }


  formSubmit (e) {
    const formID = e.detail.formId;
    console.log(formID);
    if (formID !== 'the formId is a mock one') {
      this.props.submitFormId(formID);
    }
  }

  onShareAppMessage() {
    return {
      title: config.miniProName,
      desc: '精选全球商品，让你省钱又省心',
      path: '/pages/index/index'
    }
  }

  children () {
    return {
      products: this.props.products.map((item) => {
        return {
          component: Products,
          key: item.id,
          props: {
            item: item
          }
        };
      })
    };
  }
}

export default connect(
  ({product, groups}) => ({
    products: product.list,
    dataProTuan: groups.dataProTuan.data
  }),
  (dispatch) => ({
    getProductList () {
      dispatch({
        type: types.PRODUCT_LIST_REQUEST
      });
    },
    getProTuanList (payload = {}) {
      dispatch({
        type: types.PRODUCT_TUAN_LIST_REQUEST,
        payload
      });
    },
    setViewConfig (config) {
      dispatch({
        type: types.UPDATE_VIEW_CONFIG,
        payload: config
      });
    },
    dataClear () {
      dispatch({
        type: types.DATA_REDUCER_CLEAR
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
)(Index);
