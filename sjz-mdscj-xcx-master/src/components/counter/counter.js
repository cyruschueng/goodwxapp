import { Component, PropTypes } from 'labrador-immutable';

class counter extends Component {
  static propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    limitInteger: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: 0,
    min: 0,
    max: 99
  };
  
  handleMinus () {
    const {value, min, onChange} = this.props;
    if (value - 1 <= min) {
      onChange(min);
    } else {
      onChange(value - 1);
    }
  }
  
  handlePlus () {
    const {value, max, onChange} = this.props;
    if (value + 1 >= max) {
      onChange(max);
    } else {
      onChange(value + 1);
    }
  }
  
  handleInput (e) {
    const {min, max, limitInteger, onChange} = this.props;
    let value = +e.detail.value;
    
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }
    
    if (limitInteger) {
      value = parseInt(value);
    }
    onChange(value);
  }
}

export default counter;
