import { Component, PropTypes } from 'labrador';

import wx from "labrador";
import ProductCard from "../productCard/productCard";

const {object, array} = PropTypes;

class oldProductsCom extends Component {
  static propTypes = {
    items: array
  };
  constructor (props) {
    super(props);
  }
  children () {
    return {
      ProductCard: this.props.items.map((item, index) => {
        return {
          component: ProductCard,
          key: index,
          props: {
            item: item
          }
        }
      })
    }
  }
}

export default oldProductsCom;


