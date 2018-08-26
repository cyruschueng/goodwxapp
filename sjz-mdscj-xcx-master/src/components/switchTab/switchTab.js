import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';
import { connect } from 'labrador-redux';

const { number, func, array } = PropTypes;

class SwitchTab extends Component {
  static propTypes = {
    index: number,
    switchEvent: func,
    tabs: array
  };

  static defaultProps = {
    index: 0,
    switchEvent: null,
    tabs: []
  };

  onLoad () {
    // let immutableProps = immutable(this.props);
    // this.state = immutableProps;
  }

  constructor(props) {
    super(props);
  }

  onUpdate(props) {
    console.log("indexindex", props);
  }

  handleTab (event) {
    this.props.invokeSwitch(event);
  }


  // onLoad() {
  // }

  // onReady() {
  // }

  // onUpdate() {
  // }

  // onShow() {
  // }

  // onHide() {
  // }

  // onUnload() {
  // }

}

// export default SwitchTab;

export default connect(
  ({switchTab})=>({
    index: switchTab.index
  }),
  (dispatch) => ({
    invokeSwitch (event) {
      let index = event.currentTarget.dataset.index;
      console.log('index', index);
      if (!(index === undefined)) {
        this.switchEvent(index);
      }
    }
  })
)(SwitchTab);
