import wx, { Component, PropTypes } from 'labrador';
import { connect } from 'labrador-redux';
import * as types from '../../types';
import {authAction} from '../../actions';

class List extends Component {
  static propTypes = {
    list: PropTypes.array,
    user: PropTypes.object,
    getAddressList: PropTypes.func
  };
  static defaultProps = {
    list: [],
    user: {}
  };
  
  formSubmit (e) {
    const formID = e.detail.formId;
    console.log(formID);
    if (formID !== 'the formId is a mock one') {
      this.props.submitFormId(formID);
    }
  }

  onLoad () {
    this.props.setViewConfig({
      title: '地址管理'
    });
    this.props.getAddressList();
  }
}

export default connect(
  ({address, user}) => ({
    list: address.list,
    user
  }),
  (dispatch) => ({
    getAddressList () {
      dispatch(authAction({
        type: types.ADDRESS_LIST_REQUEST
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
