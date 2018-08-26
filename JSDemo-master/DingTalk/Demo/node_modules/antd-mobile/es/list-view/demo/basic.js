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
var NUM_SECTIONS = 5;
var NUM_ROWS_PER_SECTION = 5;
var pageIndex = 0;

var BasicDemo = function (_React$Component) {
    _inherits(BasicDemo, _React$Component);

    function BasicDemo(props) {
        _classCallCheck(this, BasicDemo);

        var _this = _possibleConstructorReturn(this, (BasicDemo.__proto__ || Object.getPrototypeOf(BasicDemo)).call(this, props));

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
            return React.createElement(
                Text,
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
        var dataSource = new ListView.DataSource({
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

    _createClass(BasicDemo, [{
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
                        { style: [{ padding: 30, textAlign: 'center' }] },
                        ' ',
                        loadingTxt,
                        ' '
                    );
                }, renderSectionHeader: this.renderSectionHeader, renderRow: row, renderSeparator: separator, pageSize: 4, onEndReached: this.onEndReached, onEndReachedThreshold: 10 });
        }
    }]);

    return BasicDemo;
}(React.Component);

export default BasicDemo;

export var title = 'ListView';
export var description = 'ListView example';