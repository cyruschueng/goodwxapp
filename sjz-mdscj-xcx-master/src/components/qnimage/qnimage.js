import { Component, PropTypes } from 'labrador';
import {qnParser} from '../../utils/filter';

const { string, any } = PropTypes;

class qnimage extends Component {
  static propTypes = {
    url: string,
    width: any,
    height: any
  };

  static defaultProps = {
    url: '',
    width: '',
    height: ''
  };

  constructor(props) {
    super(props);

    let url = this.props.url;
    this.state = {
      url: qnParser(url, this.props.width, this.props.height)
    };
  }
}

export default qnimage;