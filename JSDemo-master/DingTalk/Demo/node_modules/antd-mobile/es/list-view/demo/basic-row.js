import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* tslint:disable:jsx-no-multiline-js */
import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import { ListView } from 'antd-mobile';
var data = [{
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒'
}, {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒'
}, {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒'
}];
var index = data.length - 1;
var NUM_ROWS = 20;
var pageIndex = 0;

var BasicRowDemo = function (_React$Component) {
    _inherits(BasicRowDemo, _React$Component);

    function BasicRowDemo(props) {
        _classCallCheck(this, BasicRowDemo);

        var _this = _possibleConstructorReturn(this, (BasicRowDemo.__proto__ || Object.getPrototypeOf(BasicRowDemo)).call(this, props));

        _this.genData = function () {
            var pIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var dataBlob = {};
            for (var i = 0; i < NUM_ROWS; i++) {
                var ii = pIndex * NUM_ROWS + i;
                dataBlob['' + ii] = 'row - ' + ii;
            }
            return dataBlob;
        };
        _this.onEndReached = function (_event) {
            // load new data
            // console.log('reach end', event);
            _this.setState({ isLoading: true });
            setTimeout(function () {
                _this.rData = _extends({}, _this.rData, _this.genData(++pageIndex));
                _this.setState({
                    dataSource: _this.state.dataSource.cloneWithRows(_this.rData),
                    isLoading: false
                });
            }, 1000);
        };
        var dataSource = new ListView.DataSource({
            rowHasChanged: function rowHasChanged(row1, row2) {
                return row1 !== row2;
            }
        });
        _this.rData = {};
        _this.state = {
            dataSource: dataSource.cloneWithRows(_this.genData()),
            isLoading: false
        };
        return _this;
    }

    _createClass(BasicRowDemo, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var separator = function separator(sectionID, rowID) {
                return React.createElement(View, { key: sectionID + '-' + rowID, style: {
                        backgroundColor: '#F5F5F9',
                        height: 8,
                        borderStyle: 'solid',
                        borderTopWidth: 1,
                        borderTopColor: '#ECECED',
                        borderBottomWidth: 1,
                        borderBottomColor: '#ECECED'
                    } });
            };
            var row = function row(_rowData, sectionID, rowID) {
                var highlightRow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (_sId, _rId) {};

                if (index < 0) {
                    index = data.length - 1;
                }
                var obj = data[index--];
                return React.createElement(
                    View,
                    { key: rowID },
                    React.createElement(
                        TouchableHighlight,
                        { underlayColor: 'rgba(100,100,100,0.2)', style: [{ padding: 8, backgroundColor: 'white' }], onPress: function onPress() {
                                highlightRow(sectionID, rowID);
                            } },
                        React.createElement(
                            View,
                            null,
                            React.createElement(
                                View,
                                { style: [{ marginBottom: 8, borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#F6F6F6' }] },
                                React.createElement(
                                    Text,
                                    { style: { fontSize: 18, fontWeight: '500', padding: 2 } },
                                    obj.title
                                )
                            ),
                            React.createElement(
                                View,
                                { style: [{ flexDirection: 'row' }] },
                                React.createElement(Image, { style: [{ height: 64, width: 64, marginRight: 8 }], source: { uri: obj.img } }),
                                React.createElement(
                                    View,
                                    null,
                                    React.createElement(
                                        Text,
                                        null,
                                        obj.des,
                                        ' - ',
                                        rowID
                                    ),
                                    React.createElement(
                                        Text,
                                        null,
                                        _this2.props.highlightRow
                                    ),
                                    React.createElement(
                                        Text,
                                        null,
                                        React.createElement(
                                            Text,
                                            { style: [{ fontSize: 24, color: '#FF6E27' }] },
                                            '35'
                                        ),
                                        '\xA5'
                                    )
                                )
                            )
                        )
                    )
                );
            };
            var loadingTxt = this.state.isLoading ? 'Loading...' : 'Loaded';
            return React.createElement(ListView, { dataSource: this.state.dataSource, renderHeader: function renderHeader() {
                    return React.createElement(
                        Text,
                        { style: [{ padding: 8 }] },
                        'header'
                    );
                }, renderFooter: function renderFooter() {
                    return React.createElement(
                        Text,
                        { style: { padding: 30, textAlign: 'center' } },
                        ' ',
                        loadingTxt,
                        ' '
                    );
                }, renderRow: row, renderSeparator: separator, pageSize: 4, scrollRenderAheadDistance: 500, scrollEventThrottle: 200, onEndReached: this.onEndReached, onEndReachedThreshold: 10 });
        }
    }]);

    return BasicRowDemo;
}(React.Component);

export default BasicRowDemo;

export var title = 'ListView Row';
export var description = 'ListView Row example';