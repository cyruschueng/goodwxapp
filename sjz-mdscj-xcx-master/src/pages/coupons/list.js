import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import SwitchTab from '../../components/switchTab/switchTab';
import * as types from '../../types';
import {authAction} from '../../actions';

const { array, func } = PropTypes;

class Template extends Component {
  static propTypes = {
    orders: array,
    getDataList: func
  };
  static defaultProps = {
    orders: []
  };

  state = {
    tabs: ['可使用', '已使用', '已过期']
  };

  constructor (props) {
    super(props);
  }

  handleTab (e) {
    const { index } = e.target.dataset;
    const { dataTemp: { tabIndex } } = this.props;
    if (tabIndex === index) {
      return;
    }

    this.props.changeStatus({ tabIndex: index });
  }

  onLoad () {
    this.props.setViewConfig({
      title: '我的优惠券'
    });
    this.props.getDataList();
  }

  getNextPage () {
    const {
      dataTemp: { isLoading },
      dataCoupons: { totalItem, data }
    } = this.props;
    if (isLoading || data.length >= totalItem) {
      return;
    }
    this.props.getDataList();
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
  ({coupons}) => ({
    dataCoupons: coupons.dataCoupons,
    dataTemp: coupons.dataTemp
  }),
  (dispatch) => ({
    getDataList (payload = {}) {
      dispatch(authAction({
        type: types.COUPONS_LIST_GET_REQUEST,
        payload
      }));
    },
    changeStatus (payload = {}) {
      dispatch({
        type: types.COUPONS_LIST_TYPE_CHANGE_REQUEST,
        payload
      });
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
)(Template);
