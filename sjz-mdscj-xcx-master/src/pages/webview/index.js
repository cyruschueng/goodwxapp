import wx, { Component, PropTypes } from 'labrador';
import { connect } from 'labrador-redux';
import * as types from '../../types';

class Webv extends Component {
  state = {
    url: null,
    title: null,
    source: null
  };

  onLoad (option) {
    const {
      url,
      title,
      source
    } = option;
    this.setState({
      url: decodeURIComponent(url),
      title: title || '',
      source: source || ''
    });
    this.props.setViewConfig({
      title: title || ''
    });
  }

   onShareAppMessage() {
     return {
       title: this.state.title || ' ',
       desc: ' ',
       path: `/pages/page302/index?url=${encodeURIComponent(this.state.url)}&title=${this.state.title}&source=${this.state.source}`
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
    }
  })
)(Webv);
