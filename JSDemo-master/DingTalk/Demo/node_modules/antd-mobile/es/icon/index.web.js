import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
import React from 'react';
import classNames from 'classnames';
var warnMsg = 'Icon props.type is invalid, have you set svg-sprite-loader correctly? see https://goo.gl/kN8oiw';

var Icon = function (_React$Component) {
    _inherits(Icon, _React$Component);

    function Icon() {
        _classCallCheck(this, Icon);

        var _this = _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));

        _this.renderSvg = function () {
            var type = _this.props.type;

            var svg = void 0;
            try {
                svg = require('./style/assets/' + type + '.svg');
            } catch (e) {} finally {
                return svg;
            }
        };
        return _this;
    }

    _createClass(Icon, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _a = this.props,
                type = _a.type,
                className = _a.className,
                style = _a.style,
                size = _a.size,
                restProps = __rest(_a, ["type", "className", "style", "size"]);
            if (!type || typeof type !== 'string') {
                console.error(warnMsg);
                return null;
            }
            var xlinkHref = this.renderSvg();
            var outerIcon = void 0;
            if (!xlinkHref) {
                outerIcon = true;
                xlinkHref = type;
                if (!/^#/.test(type)) {
                    console.error(warnMsg);
                }
            } else {
                if (!/^#/.test(xlinkHref)) {
                    console.error(warnMsg);
                }
                xlinkHref = '#' + type;
            }
            var iconClassName = classNames((_classNames = {
                'am-icon': true
            }, _defineProperty(_classNames, 'am-icon-' + (outerIcon ? type.substr(1) : type), true), _defineProperty(_classNames, 'am-icon-' + size, true), _defineProperty(_classNames, className, !!className), _classNames));
            return React.createElement(
                'svg',
                _extends({ className: iconClassName, style: style }, restProps),
                React.createElement('use', { xlinkHref: xlinkHref })
            );
        }
    }]);

    return Icon;
}(React.Component);

export default Icon;

Icon.defaultProps = {
    size: 'md'
};