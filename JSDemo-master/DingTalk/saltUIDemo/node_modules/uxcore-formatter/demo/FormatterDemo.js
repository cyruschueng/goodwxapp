/**
 * Formatter Component Demo for uxcore
 * @author guanghong.wsj
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

const Formatter = require('../src');
const log = window.console.log;

log(Formatter.date(new Date(), 'YYYY-MM-DD HH:mm:ss')); // 2015-10-12 14:22:16
log(Formatter.money('6566456.65466545')); // "6 566 456.65466545"
log(Formatter.money('6566456.65466545', ','));  // "6,566,456.65466545"
log(Formatter.money('6566456', ','));  // "6,566,456"
log(Formatter.money('6566456', ',', 4)); // "6,566,456.0000"
log(Formatter.money('6566456', ',', 2)); // "6,566,456.00"
log(Formatter.money('6566456.65466545', ',', 4));  // "6,566,456.6547"
log(Formatter.money('6566456.65466545', ',', 2)); // "6,566,456.65"
module.exports = Formatter;
