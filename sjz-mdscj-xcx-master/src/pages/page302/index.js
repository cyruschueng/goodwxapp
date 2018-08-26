import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import * as types from '../../types';

class Page302 extends Component {
  static propTypes = {
    user: PropTypes.object
  };
  
  state = {
    url: null,
    source: null,
    title: null,
    hasRedirect: false
  };
  
  static defaultProps = {
    user: {}
  }

  onUpdate (props) {
    let that = this;
    if (!this.props.user.id && props.user && this.props.user !== props.user.id) {
      if (this.state.hasRedirect) return;
      this.setState({
        hasRedirect: true
      }, () => {
        wx.redirectTo({
          url: `/pages/webview/index?url=${that.state.url}&source=${that.state.source || ''}&title=${this.state.title || ''}`
        });
      });
    }
  }

  onLoad (option) {
    const {
      url,
      source,
      title
    } = option;
    this.setState({
      url: url,
      source: source || '',
      title: title || ''
    });
    this.props.setViewConfig({
      title: title || ''
    });
    if (!this.props.user.id) {
      this.props.login(source);
    }
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
    login (source) {
      dispatch({
        type: types.USER_LOGIN_REQUEST,
        source
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
)(Page302);
