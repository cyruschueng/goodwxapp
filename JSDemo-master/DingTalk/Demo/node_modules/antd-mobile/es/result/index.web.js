import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* tslint:disable:jsx-no-multiline-js */
import React from 'react';
import Button from '../button/index.web';
import classNames from 'classnames';

var Result = function (_React$Component) {
    _inherits(Result, _React$Component);

    function Result() {
        _classCallCheck(this, Result);

        return _possibleConstructorReturn(this, (Result.__proto__ || Object.getPrototypeOf(Result)).apply(this, arguments));
    }

    _createClass(Result, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                className = _props.className,
                img = _props.img,
                imgUrl = _props.imgUrl,
                title = _props.title,
                message = _props.message,
                buttonText = _props.buttonText,
                buttonClick = _props.buttonClick,
                buttonType = _props.buttonType,
                style = _props.style;

            var wrapCls = classNames((_classNames = {}, _defineProperty(_classNames, '' + prefixCls, true), _defineProperty(_classNames, className, className), _classNames));
            var imgContent = null;
            if (img) {
                imgContent = React.createElement(
                    'div',
                    { className: prefixCls + '-pic' },
                    img
                );
            } else if (imgUrl) {
                imgContent = React.createElement('div', { className: prefixCls + '-pic', style: { backgroundImage: 'url(' + imgUrl + ')' } });
            }
            return React.createElement(
                'div',
                { className: wrapCls, style: style, role: 'alert' },
                imgContent,
                title ? React.createElement(
                    'div',
                    { className: prefixCls + '-title' },
                    title
                ) : null,
                message ? React.createElement(
                    'div',
                    { className: prefixCls + '-message' },
                    message
                ) : null,
                buttonText ? React.createElement(
                    'div',
                    { className: prefixCls + '-button' },
                    React.createElement(
                        Button,
                        { type: buttonType, onClick: buttonClick },
                        buttonText
                    )
                ) : null
            );
        }
    }]);

    return Result;
}(React.Component);

export default Result;

Result.defaultProps = {
    prefixCls: 'am-result',
    buttonType: '',
    buttonClick: function buttonClick() {}
};