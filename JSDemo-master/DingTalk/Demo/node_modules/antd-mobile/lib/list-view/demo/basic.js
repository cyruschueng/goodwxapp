'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.description = exports.title = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _antdMobile = require('antd-mobile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
}]; /* tslint:disable:jsx-no-multiline-js */

var index = data.length - 1;
var NUM_SECTIONS = 5;
var NUM_ROWS_PER_SECTION = 5;
var pageIndex = 0;

var BasicDemo = function (_React$Component) {
    (0, _inherits3['default'])(BasicDemo, _React$Component);

    function BasicDemo(props) {
        (0, _classCallCheck3['default'])(this, BasicDemo);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (BasicDemo.__proto__ || Object.getPrototypeOf(BasicDemo)).call(this, props));

        _this._genData = function () {
            var pIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            for (var i = 0; i < NUM_SECTIONS; i++) {
                var ii = pIndex * NUM_SECTIONS + i;
                var sectionName = 'Section ' + ii;
                _this.sectionIDs.push(sectionName);
                _this.dataBlob[sectionName] = sectionName;
                _this.rowIDs[ii] = [];
                for (var jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
                    var rowName = 'S' + ii + ', R' + jj;
                    _this.rowIDs[ii].push(rowName);
                    _this.dataBlob[rowName] = rowName;
                }
            }
            // new object ref
            _this.sectionIDs = [].concat(_this.sectionIDs);
            _this.rowIDs = [].concat(_this.rowIDs);
        };
        _this.onEndReached = function (_event) {
            // load new data
            _this.setState({ isLoading: true });
            setTimeout(function () {
                _this._genData(++pageIndex);
                _this.setState({
                    dataSource: _this.state.dataSource.cloneWithRowsAndSections(_this.dataBlob, _this.sectionIDs, _this.rowIDs),
                    isLoading: false
                });
            }, 1000);
        };
        _this.renderSectionHeader = function (sectionData) {
            return _react2['default'].createElement(
                _reactNative.Text,
                { style: [{ padding: 10, backgroundColor: 'rgba(255,255,255,0.8)' }] },
                'Task ' + sectionData.split(' ')[1]
            );
        };
        var getSectionData = function getSectionData(dataBlob, sectionID) {
            return dataBlob[sectionID];
        };
        var getRowData = function getRowData(dataBlob, _sectionID, rowID) {
            return dataBlob[rowID];
        };
        var dataSource = new _antdMobile.ListView.DataSource({
            getRowData: getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: function rowHasChanged(row1, row2) {
                return row1 !== row2;
            },
            sectionHeaderHasChanged: function sectionHeaderHasChanged(s1, s2) {
                return s1 !== s2;
            }
        });
        _this.dataBlob = {};
        _this.sectionIDs = [];
        _this.rowIDs = [];
        _this._genData();
        _this.state = {
            dataSource: dataSource.cloneWithRowsAndSections(_this.dataBlob, _this.sectionIDs, _this.rowIDs),
            headerPressCount: 0
        };
        return _this;
    }

    (0, _createClass3['default'])(BasicDemo, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var separator = function separator(sectionID, rowID) {
                return _react2['default'].createElement(_reactNative.View, { key: sectionID + '-' + rowID, style: {
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
                return _react2['default'].createElement(
                    _reactNative.View,
                    { key: rowID },
                    _react2['default'].createElement(
                        _reactNative.TouchableHighlight,
                        { underlayColor: 'rgba(100,100,100,0.2)', style: [{ padding: 8, backgroundColor: 'white' }], onPress: function onPress() {
                                highlightRow(sectionID, rowID);
                            } },
                        _react2['default'].createElement(
                            _reactNative.View,
                            null,
                            _react2['default'].createElement(
                                _reactNative.View,
                                { style: [{ marginBottom: 8, borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#F6F6F6' }] },
                                _react2['default'].createElement(
                                    _reactNative.Text,
                                    { style: { fontSize: 18, fontWeight: '500', padding: 2 } },
                                    obj.title
                                )
                            ),
                            _react2['default'].createElement(
                                _reactNative.View,
                                { style: [{ flexDirection: 'row' }] },
                                _react2['default'].createElement(_reactNative.Image, { style: [{ height: 64, width: 64, marginRight: 8 }], source: { uri: obj.img } }),
                                _react2['default'].createElement(
                                    _reactNative.View,
                                    null,
                                    _react2['default'].createElement(
                                        _reactNative.Text,
                                        null,
                                        obj.des,
                                        ' - ',
                                        rowID
                                    ),
                                    _react2['default'].createElement(
                                        _reactNative.Text,
                                        null,
                                        _this2.props.highlightRow
                                    ),
                                    _react2['default'].createElement(
                                        _reactNative.Text,
                                        null,
                                        _react2['default'].createElement(
                                            _reactNative.Text,
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
            return _react2['default'].createElement(_antdMobile.ListView, { dataSource: this.state.dataSource, renderHeader: function renderHeader() {
                    return _react2['default'].createElement(
                        _reactNative.Text,
                        { style: [{ padding: 8 }] },
                        'header'
                    );
                }, renderFooter: function renderFooter() {
                    return _react2['default'].createElement(
                        _reactNative.Text,
                        { style: [{ padding: 30, textAlign: 'center' }] },
                        ' ',
                        loadingTxt,
                        ' '
                    );
                }, renderSectionHeader: this.renderSectionHeader, renderRow: row, renderSeparator: separator, pageSize: 4, onEndReached: this.onEndReached, onEndReachedThreshold: 10 });
        }
    }]);
    return BasicDemo;
}(_react2['default'].Component);

exports['default'] = BasicDemo;
var title = exports.title = 'ListView';
var description = exports.description = 'ListView example';