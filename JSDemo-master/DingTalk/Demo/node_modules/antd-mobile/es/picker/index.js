import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import AbstractPicker, { getDefaultProps } from './AbstractPicker';
import pickerStyles from './style';

var Picker = function (_AbstractPicker) {
    _inherits(Picker, _AbstractPicker);

    function Picker() {
        _classCallCheck(this, Picker);

        var _this = _possibleConstructorReturn(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).apply(this, arguments));

        _this.popupProps = {};
        return _this;
    }

    return Picker;
}(AbstractPicker);

export default Picker;

Picker.defaultProps = _extends({}, getDefaultProps(), { styles: pickerStyles });