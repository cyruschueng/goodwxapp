import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';

class skuItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    skus: PropTypes.array,
    activeSkuId: PropTypes.number
  };

  static defaultProps = {
    skus: []
  };

  constructor(props) {
    super(props);
    this.state = immutable({});
  }

  children() {
    return {};
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

export default skuItem;

// export default connect(
//   (state)=>({})
// )(skuItem);
