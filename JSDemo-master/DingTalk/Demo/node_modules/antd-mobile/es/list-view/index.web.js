import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import MListView from 'rmc-list-view';
import handleProps from './handleProps';
import IndexedList from './Indexed.web';

var ListView = function (_React$Component) {
    _inherits(ListView, _React$Component);

    function ListView() {
        _classCallCheck(this, ListView);

        var _this = _possibleConstructorReturn(this, (ListView.__proto__ || Object.getPrototypeOf(ListView)).apply(this, arguments));

        _this.scrollTo = function () {
            var _this$refs$listview;

            return (_this$refs$listview = _this.refs.listview).scrollTo.apply(_this$refs$listview, arguments);
        };
        _this.getInnerViewNode = function () {
            return _this.refs.listview.getInnerViewNode();
        };
        return _this;
    }

    _createClass(ListView, [{
        key: 'render',
        value: function render() {
            var _handleProps = handleProps(this.props, false),
                restProps = _handleProps.restProps,
                extraProps = _handleProps.extraProps;

            var _props = this.props,
                useZscroller = _props.useZscroller,
                refreshControl = _props.refreshControl;

            if (refreshControl) {
                useZscroller = true;
            }
            return React.createElement(MListView, _extends({ ref: 'listview' }, restProps, extraProps, { useZscroller: useZscroller }));
        }
    }]);

    return ListView;
}(React.Component);

export default ListView;

ListView.defaultProps = {
    prefixCls: 'am-list-view',
    listPrefixCls: 'am-list'
};
ListView.DataSource = MListView.DataSource;
ListView.IndexedList = IndexedList;