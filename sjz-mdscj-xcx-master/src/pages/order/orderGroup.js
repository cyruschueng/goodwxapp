import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import SwitchTab from '../../components/switchTab/switchTab';
import * as types from '../../types';
import {authAction} from '../../actions';

const { array, func } = PropTypes;

class Template extends Component {
  static propTypes = {
    orders: array,
    getAllOrders: func
  };
  static defaultProps = {
    orders: []
  };

  state = {
    index: 0,
    tabs: ['全部', '组团中', '组团成功', '组团失败']
  };

  constructor (props) {
    super(props);
  }

  handleTab (e) {
    const { index } = e.target.dataset;
    const { dataTemp: { tabIndex } } = this.props;
    console.log('indexqq', index, tabIndex)
    if (tabIndex === index) {
      return;
    }

    this.props.changeStatus({ tabIndex: index });
  }

  onUpdate (props) {
    console.log('update');
  }

  onLoad () {
    this.props.setViewConfig({
      title: '订单管理'
    });
    this.props.getAllOrders();
  }

  getNextPage () {
    const {
      dataTemp: { isLoading },
      dataOrders: { totalItem, data }
    } = this.props;
    if (isLoading || data.length >= totalItem) {
      return;
    }

    this.props.getAllOrders();
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
  ({order}) => ({
    dataOrders: order.dataOrderGroups,
    dataTemp: order.dataTemp
  }),
  (dispatch) => ({
    getAllOrders (payload = {}) {
      dispatch(authAction({
        type: types.ORDER_GROUP_GET_REQUEST,
        payload
      }));
    },
    changeStatus (payload = {}) {
      dispatch({
        type: types.ORDER_GROUP_TYPE_CHANGE_REQUEST,
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
