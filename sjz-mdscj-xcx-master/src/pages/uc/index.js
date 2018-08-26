import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import * as types from '../../types';
import {authAction} from '../../actions';

class Uc extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  static defaultProps = {
    user: {}
  }

  formSubmit (e) {
    const formID = e.detail.formId;
    console.log(formID);
    if (formID !== 'the formId is a mock one') {
      this.props.submitFormId(formID);
    }
  }

  onLoad () {
    this.props.setViewConfig({
      title: '我的'
    });
    if (!this.props.user.id) {
      this.props.login();
    }
  }
}

export default connect(
  ({user}) => ({
    user
  }),
  (dispatch) => ({
    setViewConfig (config) {
      dispatch({
        type: types.UPDATE_VIEW_CONFIG,
        payload: config
      });
    },
    login (config) {
      dispatch({
        type: types.USER_LOGIN_REQUEST
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
)(Uc);
