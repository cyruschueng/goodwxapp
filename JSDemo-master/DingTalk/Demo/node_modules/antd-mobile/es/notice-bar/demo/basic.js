import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* tslint:disable:no-console */
import React from 'react';
import { View, Image } from 'react-native';
import { NoticeBar, WhiteSpace } from 'antd-mobile';

var NoticeBarExample = function (_React$Component) {
  _inherits(NoticeBarExample, _React$Component);

  function NoticeBarExample() {
    _classCallCheck(this, NoticeBarExample);

    return _possibleConstructorReturn(this, (NoticeBarExample.__proto__ || Object.getPrototypeOf(NoticeBarExample)).apply(this, arguments));
  }

  _createClass(NoticeBarExample, [{
    key: 'render',
    value: function render() {
      var customIcon = React.createElement(Image, { source: { uri: 'https://zos.alipayobjects.com/rmsportal/bRnouywfdRsCcLU.png' }, style: { width: 12, height: 12 } });
      return React.createElement(
        View,
        { style: { marginTop: 10 } },
        React.createElement(WhiteSpace, { size: 'lg' }),
        React.createElement(
          NoticeBar,
          { onClick: function onClick() {
              return alert('click');
            } },
          'Notice: The arrival time of incomes and transfers of Yu \'E Bao will be delayed during National Day.'
        ),
        React.createElement(WhiteSpace, { size: 'lg' }),
        React.createElement(
          NoticeBar,
          { mode: 'closable', onClick: function onClick() {
              return alert('will close');
            } },
          'Notice: The arrival time of incomes and transfers of Yu \'E Bao will be delayed during National Day.'
        ),
        React.createElement(WhiteSpace, { size: 'lg' }),
        React.createElement(
          NoticeBar,
          { mode: 'closable', icon: customIcon },
          'Customized icon.'
        ),
        React.createElement(WhiteSpace, { size: 'lg' }),
        React.createElement(
          NoticeBar,
          { mode: 'link', onClick: function onClick() {
              return alert('link');
            } },
          'Notice: The arrival time of incomes and transfers of Yu \'E Bao will be delayed during National Day.'
        ),
        React.createElement(WhiteSpace, { size: 'lg' }),
        React.createElement(
          NoticeBar,
          { mode: 'link' },
          'Notice: The arrival time of incomes and transfers of Yu \'E Bao will be delayed during National Day.'
        ),
        React.createElement(WhiteSpace, { size: 'lg' }),
        React.createElement(
          NoticeBar,
          { mode: 'closable', icon: null },
          'Remove the default icon.'
        )
      );
    }
  }]);

  return NoticeBarExample;
}(React.Component);

export default NoticeBarExample;