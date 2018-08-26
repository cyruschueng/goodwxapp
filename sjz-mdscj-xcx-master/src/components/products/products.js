import { Component, PropTypes } from 'labrador';

import qnimage from '../qnimage/qnimage';

const {object} = PropTypes;

class Products extends Component {
  static propTypes = {
    item: object
  };

  constructor (props) {
    super(props);
  }

  children () {
    return {
      qnimage: {
        component: qnimage,
        props: {
          url: this.props.item.imgUrl,
          width: 358
        }
      }
    };
  }
}

export default Products;
