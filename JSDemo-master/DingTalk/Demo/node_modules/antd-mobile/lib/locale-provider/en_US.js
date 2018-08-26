'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _en_US = require('../pagination/locale/en_US');

var _en_US2 = _interopRequireDefault(_en_US);

var _en_US3 = require('../date-picker/locale/en_US');

var _en_US4 = _interopRequireDefault(_en_US3);

var _en_US5 = require('../input-item/locale/en_US');

var _en_US6 = _interopRequireDefault(_en_US5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_moment2['default'].locale('en');
exports['default'] = {
    locale: 'en',
    Pagination: _en_US2['default'],
    DatePicker: _en_US4['default'],
    InputItem: _en_US6['default']
};
module.exports = exports['default'];