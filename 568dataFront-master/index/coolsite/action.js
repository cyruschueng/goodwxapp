/*注册事件的页面*/
var _tar;
var daijinquanCount = 0;
var register = function(tar, data) {
	_tar = tar;
	addDataClass(data, _tar.data)
	getApp().coolsite360._coolsite.register(_tar);
	eventBind(data);
}
//事件绑定
var eventBind = function(data) {
	for(var i = 0; i < data.length; i++) {
		if(!data[i].iType) {
			var _act = parseAct(data[i]);
			if(_act && _act._eventType != 'undefined')
				switch(_act._eventType) {
					case 0:
						event_tap(_act);
						break;
					default:
						break;
				}
		}
	}
}
/*
 *添加data中的class
 */
var addDataClass = function(data, actData) {
	var _hasClass = [1, 2, 20, 21, 22, 23, 26];
	for(var i = 0; i < data.length; i++) {
		if(!data[i].iType) {
			var el = data[i].element_id;
			if(data[i].data && _hasClass.indexOf(data[i].data.type) != -1) {
				if(actData[el]) { //合并原来的class
					if(!actData[el].class) actData[el].class = '';
				} else {
					actData[el] = {
						class: ''
					}
				}
			}
		}
	}
	// return actData;
	_tar.setData(actData);
}
//解析action数据 验证
var parseAct = function(_act) {
	if(!_act.element_id) return;
	if(_act.data) var _detail = _act.data;
	if(!_detail || !_detail.args) return;

	return {
		_obj: _act.element_id, //事件触发元素  
		_eventType: _detail.type, //事件类型
		_execType: _detail.exec, //触发执行事件类型
		_execDetail: _detail.args //触发事件内容
	}
}

//bind tap
var event_tap = function(_act) {
	getApp().coolsite360.$(_act['_obj']).on('tap', function(e, data) {
		_execType(_act, data);
	})
}

//touchstart
// touchmove
// touchcancel
// touchend
//longtap 

//事件执行
var _execType = function(_exec, data) {
	wx.showLoading({
		title: '查询中。。。',
		mask: true
	});
	var _type = _exec['_execType'];
	var time = new Date().getTime();
	console.log(_type+"---"+time);
	if(getApp().data.lastExecType != null && getApp().data.lastExecType != '' && getApp().data.lastExecType==_type){
		if(time-getApp().data.lastExecTime < 2000){
			console.log('两次相同操作间隔时间过小');
				getApp().data.lastExecType = _type;
				getApp().data.lastExecTime = time;
			return;
		}
	}
	getApp().data.lastExecType = _type;
	getApp().data.lastExecTime = time;
	wx.request({
		url: 'https://51yangcong.com/568data/getDaijinquansByOpenId_daijinquan.do',
		//url: 'http://aqvwkm.natappfree.cc/568data/getDaijinquansByOpenId_daijinquan.do',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: {
			'openId': getApp().data.userOpenId
		},
		success: function success(res) {
			//wx.hideLoading(); //////////////////////////////////////////////
			console.log(res.data)
			var o = res.data;
			if(o != null && o.length > 0) {
				daijinquanCount = o.length;
			} else {
				daijinquanCount = 0;
			}
			switch(_type) {
				case 0:
					_goTo(_exec);
					break; //cxjl(_exec, data); break;
				case 1:
					_toggleShow(_exec, {
						type: 0
					});
					break;
				case 2:
					_toggleShow(_exec, {
						type: 1
					});
					break;
				case 5:
					_goTo(_exec);
					break;
				case 10:
					tbxx(_exec, data);
					break;
				case 11:
					clzt(_exec, data);
					break;
				case 12:
					zjhy(_exec, data);
					break;
				case 13:
					gjhy(_exec, data);
					break;
				case 14:
					_goTo(_exec);
					break; //wbjl(_exec, data); break;
				case 15:
					wbjl(_exec, data);
					break; //
				case 16:
					cxjl(_exec, data);
					break; //
				case 20:
					_toggleShow(_exec, {
						type: 2
					});
					break;
				case 21:
					_toggleClass(_exec, {
						type: 0
					});
					break;
				case 22:
					_toggleClass(_exec, {
						type: 1
					});
					break;
				case 23:
					_toggleClass(_exec, {
						type: 2
					});
					break;
				case 26:
					_changeState(_exec);
					break;
				case 101:
					_showActionSheets(_exec);
					break;
				case 102:
					_showModal(_exec);
					break;
				case 103:
					_showtoast(_exec);
					break;
				case 104:
					_hidetoast();
					break;
				case 105:
					_canvasCircleAni(_exec, data);
					break;
				default:
					break;
			}
			//wx.hideLoading(); //////////////////////////////////////////////
			return;
		},
		'fail': function(res) {
			wx.hideLoading(); //////////////////////////////////////////////
		}
	});

}

/*action exec type*/
//中级会员
var zjhy = function(detail, data) {
	wx.showLoading({
		title: '执行中',
		mask: true
	}); //////////////////////////////////////
	var _aniIds = detail._execDetail.a_ids;
	if(_aniIds.length != 0) {
		getApp().coolsite360.Timeline.parse(_aniIds, true);
	}
	if(getApp().data.userOpenId != null && getApp().data.userOpenId != '') {
		console.log("zjhy获得openid成功" + getApp().data.userOpenId);
		wx.request({
			url: 'https://51yangcong.com/568data/PayOff',
			// url: 'https://localhost/568data/PayOff',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				'openid': getApp().data.userOpenId,
				'payType': 'ZJHY'
			},
			success: function success(res) {
				var orderId = res.data.orderId;
				var openid = res.data.openid;
				if(orderId == null) {
					wx.showModal({
						title: '提示',
						content: res.data.errormassage,
						success: function(res) {
							wx.hideLoading(); //////////////////////////////////////////////
							if(res.confirm) {
								console.log('用户点击确定')
							} else if(res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
					wx.hideLoading(); //////////////////////////////////////////////
					return;
				}
				var obj = res.data;
				wx.requestPayment({
					'timeStamp': obj.timeStamp,
					'nonceStr': obj.nonceStr,
					'package': obj.package,
					'signType': obj.signType,
					'paySign': obj.paySign,
					'success': function(res) {
						console.log(res)
						if(res.errMsg == "requestPayment:ok") {
							wx.request({
								url: 'https://51yangcong.com/568data/PaySuccess',
								//url: 'https://localhost/568data/PaySuccess',
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: {
									'orderId': orderId
								},
								success: function success(res) {
									console.log(res)
									if(!res.data.success) {
										wx.hideLoading(); //////////////////////////////////////////////
										wx.showModal({
											title: '提示',
											content: res.data.errorMessage,
											success: function(res) {
												if(res.confirm) {
													console.log('用户点击确定')
												} else if(res.cancel) {
													console.log('用户点击取消')
												}
											}
										})
										return;
									}
									wx.request({
										url: 'https://51yangcong.com/568data/BeHighMember',
										// url: 'https://localhost/568data/BeHighMember',
										method: 'POST',
										header: {
											'content-type': 'application/x-www-form-urlencoded'
										},
										data: {
											'openid': openid,
											'orderId': orderId,
											'type': 'M'
										},
										success: function success(res) {
											console.log(res)
											if(!res.data.success) {
												wx.showModal({
													title: '提示',
													content: res.data.error,
													success: function(res) {
														if(res.confirm) {
															console.log('用户点击确定')
														} else if(res.cancel) {
															console.log('用户点击取消')
														}
													}
												})
												return;
											} else {
												wx.showModal({
													title: '提示',
													content: '恭喜您，成功升为中级会员！',
													success: function(res) {
														if(res.confirm) {
															console.log('用户点击确定')
														} else if(res.cancel) {
															console.log('用户点击取消')
														}
													}
												})
											}
										}
									});
								}
							});
						}

					},
					'fail': function(res) {
						wx.hideLoading(); //////////////////////////////////////////////
					}
				})
			}
		});

	} else {
		wx.login({
			success: function(res) {
				wx.request({
					url: 'https://51yangcong.com/568data/GetOpenId',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						'code': res.code
					},
					success: function success(res) {
						wx.hideLoading(); //////////////////////////////////////////////
						getApp().data.userOpenId = res.data.openid;
						console.log("zjhy，重新获得openid:" + res.data.openid);
					},
					'fail': function(res) {
						wx.hideLoading(); //////////////////////////////////////////////
					}
				});
			}
		});
		wx.showModal({
			title: '提示',
			content: "查询失败，请稍后再试！",
			success: function(res) {
				if(res.confirm) {} else if(res.cancel) {}
			}
		})
	}
}
//高级会员
var gjhy = function(detail, data) {
	wx.showLoading({
		title: '执行中'
	}); //////////////////////////////////////
	var _aniIds = detail._execDetail.a_ids;
	if(_aniIds.length != 0) {
		getApp().coolsite360.Timeline.parse(_aniIds, true);
	}
	if(getApp().data.userOpenId != null && getApp().data.userOpenId != '') {
		console.log("gjhy获得openid成功" + getApp().data.userOpenId);

		wx.request({
			url: 'https://51yangcong.com/568data/PayOff',
			//url: 'https://localhost/568data/PayOff',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				'openid': getApp().data.userOpenId,
				'payType': 'GJHY'
			},
			success: function success(res) {
				var orderId = res.data.orderId;
				var openid = res.data.openid;
				if(orderId == null) {
					wx.hideLoading(); //////////////////////////////////////////////
					wx.showModal({
						title: '提示',
						content: res.data.errormassage,
						success: function(res) {
							if(res.confirm) {
								console.log('用户点击确定')
							} else if(res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
					return;
				}
				var obj = res.data;
				wx.requestPayment({
					'timeStamp': obj.timeStamp,
					'nonceStr': obj.nonceStr,
					'package': obj.package,
					'signType': obj.signType,
					'paySign': obj.paySign,
					'success': function(res) {
						console.log(res)
						if(res.errMsg == "requestPayment:ok") {
							wx.request({
								url: 'https://51yangcong.com/568data/PaySuccess',
								//url: 'https://localhost/568data/PaySuccess',
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: {
									'orderId': orderId
								},
								success: function success(res) {
									console.log(res)
									if(!res.data.success) {
										wx.hideLoading(); //////////////////////////////////////////////
										wx.showModal({
											title: '提示',
											content: res.data.errorMessage,
											success: function(res) {
												if(res.confirm) {
													console.log('用户点击确定')
												} else if(res.cancel) {
													console.log('用户点击取消')
												}
											}
										})
										return;
									}
									wx.request({
										url: 'https://51yangcong.com/568data/BeHighMember',
										//url: 'https://localhost/568data/BeHighMember',
										method: 'POST',
										header: {
											'content-type': 'application/x-www-form-urlencoded'
										},
										data: {
											'openid': openid,
											'orderId': orderId,
											'type': 'H'
										},
										success: function success(res) {
											console.log(res)
											wx.hideLoading(); //////////////////////////////////////////////
											if(!res.data.success) {
												wx.showModal({
													title: '提示',
													content: res.data.error,
													success: function(res) {
														if(res.confirm) {
															console.log('用户点击确定')
														} else if(res.cancel) {
															console.log('用户点击取消')
														}
													}
												})
												return;
											} else {
												wx.showModal({
													title: '提示',
													content: '恭喜您，成功升为高级会员！',
													success: function(res) {
														if(res.confirm) {
															console.log('用户点击确定')
														} else if(res.cancel) {
															console.log('用户点击取消')
														}
													}
												})
											}
										}
									});
								}
							});
						}

					},
					'fail': function(res) {
						wx.hideLoading(); //////////////////////////////////////////////
					}
				})
			}
		});

	} else {
		wx.login({
			success: function(res) {
				wx.request({
					url: 'https://51yangcong.com/568data/GetOpenId',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						'code': res.code
					},
					success: function success(res) {
						wx.hideLoading(); //////////////////////////////////////////////
						getApp().data.userOpenId = res.data.openid;
						console.log("gjhy，重新获得openid:" + res.data.openid);
					},
					'fail': function(res) {
						wx.hideLoading(); //////////////////////////////////////////////
					}
				});
			}
		});
		wx.showModal({
			title: '提示',
			content: "查询失败，请稍后再试！",
			success: function(res) {
				if(res.confirm) {} else if(res.cancel) {}
			}
		})
	}
}
/*四大查询-维保查询*/
var wbjl = function(detail, data) {
	var useDaijinquan = "0";
	if(daijinquanCount > 0) {
		wx.showModal({
			title: '提示',
			content: "您有可用的代金券，是否使用？",
			success: function(res) {
				if(res.confirm) {
					console.log('用户确定使用代金券');
					useDaijinquan = "1";
				} else if(res.cancel) {
					console.log('用户不使用使用代金券');
					useDaijinquan = "0";
				}
				wbjl2(detail, data, useDaijinquan);
			}
		})
	} else {
		wbjl2(detail, data, useDaijinquan);
	}
}
var wbjl2 = function(detail, data, useDaijinquan) {

	wx.showLoading({
		title: '查询中'
	}); //////////////////////////////////////
	var _aniIds = detail._execDetail.a_ids;
	if(_aniIds.length != 0) {
		getApp().coolsite360.Timeline.parse(_aniIds, true);
	}
	if(getApp().data.userOpenId != null && getApp().data.userOpenId != '') {
		console.log("BYJL获得openid成功" + getApp().data.userOpenId);
		wx.request({
			url: 'https://51yangcong.com/568data/PayOff',
			//url: 'http://localhost:8880/568data/PayOff',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				'openid': getApp().data.userOpenId,
				'useDaijinquan': useDaijinquan,
				'payType': 'BYJL',
				'vin': data.vin,
				'enginno': data.enginno,
				'licenseplate': data.licenseplate
			},
			success: function success(res) {
				var orderId = res.data.orderId;
				if(orderId == null) {
					wx.hideLoading(); //////////////////////////////////////////////
					wx.showModal({
						title: '提示',
						content: res.data.errormassage,
						success: function(res) {
							if(res.confirm) {
								console.log('用户点击确定')
							} else if(res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
					return;
				}
				wx.showLoading({
					title: '查询中'
				}); //////////////////////////////////////
				var obj = res.data;
				wx.requestPayment({
					'timeStamp': obj.timeStamp,
					'nonceStr': obj.nonceStr,
					'package': obj.package,
					'signType': obj.signType,
					'paySign': obj.paySign,
					'success': function(res) {
						wx.hideLoading(); //////////////////////////////////////////////
						wx.showLoading({
							title: '支付结果确认中'
						}); //////////////////////////////////////
						console.log(res);
						if(res.errMsg == "requestPayment:ok") {
							wx.request({
								url: 'https://51yangcong.com/568data/PaySuccess',
								//url: 'https://localhost/568data/PaySuccess',
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: {
									'orderId': orderId,
									'payType': 'BYJL',
									'vin': data.vin,
									'enginno': data.enginno,
									'licenseplate': data.licenseplate
								},
								success: function success(res) {
									console.log(res)
									if(!res.data.success) {
										wx.hideLoading(); //////////////////////////////////////////////
										var errorMessage = res.data.errorMessage;
										var submitOrder = res.data.submitOrder;
										wx.showModal({
											title: '提示',
											content: errorMessage,
											success: function(res) {
												if(res.confirm) {
													console.log('用户点击确定');
													if(submitOrder == 1 || submitOrder == '1') {
														wx.reLaunch({
															url: '../../page/page2/page2'
														});
													}
												} else if(res.cancel) {
													console.log('用户点击取消');
													if(submitOrder == 1 || submitOrder == '1') {
														wx.reLaunch({
															url: '../../page/page2/page2'
														});
													}
												}
											}
										})
										wx.hideLoading(); //////////////////////////////////////////////
										return;
									}
									wx.navigateTo({
										url: '../1baoyangjilu/1baoyangjilu?orderId=' + orderId
									});
								},
								'fail': function(res) {
									wx.hideLoading(); //////////////////////////////////////////////
								}
							});
						} else {
							wx.hideLoading(); //////////////////////////////////////////////
							wx.showModal({
								title: '提示',
								content: '支付失败，如果已经扣款，请联系客服处理',
								success: function(res) {
									if(res.confirm) {

									} else if(res.cancel) {

									}
								}
							})
						}
						//wx.hideLoading();//////////////////////////////////////////////
					},
					'fail': function(res) {
						wx.hideLoading(); //////////////////////////////////////////////
						wx.showModal({
								title: '提示',
								content: '支付失败，如果已经扣款，请联系客服处理',
								success: function(res) {}
							})
					}
				})
				// if (res.data.notRepeatPay != null && res.data.notRepeatPay==true){

				//   return;
				// }

			}
		});

	} else {

		wx.login({
			success: function(res) {
				wx.request({
					url: 'https://51yangcong.com/568data/GetOpenId',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						'code': res.code
					},
					success: function success(res) {
						wx.hideLoading(); //////////////////////////////////////////////
						getApp().data.userOpenId = res.data.openid;
						console.log("BYJL，重新获得openid:" + res.data.openid);
					},
					'fail': function(res) {
						wx.hideLoading(); //////////////////////////////////////////////
					}
				});
			}
		});
		wx.showModal({
			title: '提示',
			content: "查询失败，请稍后再试！",
			success: function(res) {
				if(res.confirm) {} else if(res.cancel) {}
			}
		})
	}
	/*
	wx.login({
		success: function(res) {}
	});
	*/
}
/*四大查询-出险记录*/
var cxjl = function(detail, data) {
	var useDaijinquan = "0";
	if(daijinquanCount > 0) {
		wx.showModal({
			title: '提示',
			content: "您有可用的代金券，是否使用？",
			success: function(res) {
				if(res.confirm) {
					console.log('用户确定使用代金券');
					useDaijinquan = "1";
				} else if(res.cancel) {
					console.log('用户不使用使用代金券');
					useDaijinquan = "0";
				}
				cxjl2(detail, data, useDaijinquan);
			}
		})
	} else {
		cxjl2(detail, data, useDaijinquan);
	}
}
var cxjl2 = function(detail, data, useDaijinquan) {
	wx.showLoading({
		title: '查询中'
	}); //////////////////////////////////////
	var _aniIds = detail._execDetail.a_ids;
	if(_aniIds.length != 0) {
		getApp().coolsite360.Timeline.parse(_aniIds, true);
	}
	if(getApp().data.userOpenId != null && getApp().data.userOpenId != '') {
		console.log("CXJL获得openid成功" + getApp().data.userOpenId);

		wx.request({
			url: 'https://51yangcong.com/568data/PayOff',
			//url: 'https://localhost/568data/PayOff',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				'openid': getApp().data.userOpenId,
				'useDaijinquan': useDaijinquan,
				'payType': 'CXJL',
				'licenseNo': data.licenseNo == null ? "" : data.licenseNo,
				'frameNo': data.frameNo == null ? "" : data.frameNo,
			},
			success: function success(res) {
				var orderId = res.data.orderId;
				if(orderId == null) {
					wx.hideLoading(); //////////////////////////////////////////////
					wx.showModal({
						title: '提示',
						content: res.data.errormassage,
						success: function(res) {
							if(res.confirm) {
								console.log('用户点击确定')
							} else if(res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
					return;
				}
				var obj = res.data;
				wx.showLoading({
					title: '查询中'
				}); //////////////////////////////////////
				wx.requestPayment({
					'timeStamp': obj.timeStamp,
					'nonceStr': obj.nonceStr,
					'package': obj.package,
					'signType': obj.signType,
					'paySign': obj.paySign,
					'success': function(res) {
						wx.showLoading({
							title: '查询中'
						}); //////////////////////////////////////
						console.log(res)
						if(res.errMsg == "requestPayment:ok") {
							wx.request({
								url: 'https://51yangcong.com/568data/PaySuccess',
								// url: 'https://localhost/568data/PaySuccess',
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: {
									'orderId': orderId,
									'payType': 'CXJL',
									'licenseNo': data.licenseNo == null ? "" : data.licenseNo,
									'frameNo': data.frameNo == null ? "" : data.frameNo,
								},
								success: function success(res) {
									console.log(res)
									if(!res.data.success) {
										wx.hideLoading(); //////////////////////////////////////////////
										wx.showModal({
											title: '提示',
											content: res.data.errorMessage,
											success: function(res) {
												if(res.confirm) {
													console.log('用户点击确定')
												} else if(res.cancel) {
													console.log('用户点击取消')
												}
											}
										})
										wx.hideLoading(); //////////////////////////////////////////////
										return;
									}
									wx.navigateTo({
										url: '../0chuxianjilu/0chuxianjilu?orderId=' + orderId
									});
								},
								'fail': function(res) {
									wx.hideLoading(); //////////////////////////////////////////////
								}
							});
						}
						//wx.hideLoading();//////////////////////////////////////////////
					},
					'fail': function(res) {
						wx.hideLoading(); //////////////////////////////////////////////
					}
				})
			}
		});

	} else {
		wx.login({
			success: function(res) {
				wx.request({
					url: 'https://51yangcong.com/568data/GetOpenId',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						'code': res.code
					},
					success: function success(res) {
						wx.hideLoading(); //////////////////////////////////////////////
						getApp().data.userOpenId = res.data.openid;
						console.log("CXJL，重新获得openid:" + res.data.openid);
					},
					'fail': function(res) {
						wx.hideLoading(); //////////////////////////////////////////////
					}
				});
			}
		});
		wx.showModal({
			title: '提示',
			content: "查询失败，请稍后再试！",
			success: function(res) {
				if(res.confirm) {} else if(res.cancel) {}
			}
		})
	}
}
/*四大查询-投保信息*/
var tbxx = function(detail, data) {
	var useDaijinquan = "0";
	if(daijinquanCount > 0) {
		wx.showModal({
			title: '提示',
			content: "您有可用的代金券，是否使用？",
			success: function(res) {
				if(res.confirm) {
					console.log('用户确定使用代金券');
					useDaijinquan = "1";
				} else if(res.cancel) {
					console.log('用户不使用使用代金券');
					useDaijinquan = "0";
				}
				tbxx2(detail, data, useDaijinquan);
			}
		})
	} else {
		tbxx2(detail, data, useDaijinquan);
	}
}
var tbxx2 = function(detail, data, useDaijinquan) {
	if(getApp().data.userOpenId != null && getApp().data.userOpenId != '') {
		console.log("TBXX获得openid成功" + getApp().data.userOpenId);

		wx.request({
			url: 'https://51yangcong.com/568data/PayOff',
			//url: 'https://localhost/568data/PayOff',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				'openid': getApp().data.userOpenId,
				'useDaijinquan': useDaijinquan,
				'payType': 'TBXX',
				'renewalCarType': data.indexid,
				'licenseNo': data.licenseNo,
				'carVin': data.carVin,
				'engineNo': data.engineNo
			},
			success: function success(res) {
				var orderId = res.data.orderId;
				if(orderId == null) {
					wx.hideLoading(); //////////////////////////////////////////////
					wx.showModal({
						title: '提示',
						content: res.data.errormassage,
						success: function(res) {
							if(res.confirm) {
								console.log('用户点击确定')
							} else if(res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
					return;
				}
				wx.showLoading({
					title: '查询中'
				}); //////////////////////////////////////
				var obj = res.data;
				wx.requestPayment({
					'timeStamp': obj.timeStamp,
					'nonceStr': obj.nonceStr,
					'package': obj.package,
					'signType': obj.signType,
					'paySign': obj.paySign,
					'success': function(res) {
						wx.showLoading({
							title: '查询中'
						}); //////////////////////////////////////
						console.log(res)
						if(res.errMsg == "requestPayment:ok") {
							wx.request({
								url: 'https://51yangcong.com/568data/PaySuccess',
								//url: 'https://localhost/568data/PaySuccess',
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: {
									'orderId': orderId,
									'payType': 'TBXX',
									'renewalCarType': data.indexid,
									'licenseNo': data.licenseNo,
									'carVin': data.carVin,
									'engineNo': data.engineNo
								},
								success: function success(res) {
									console.log(res)
									if(!res.data.success) {
										wx.hideLoading(); //////////////////////////////////////////////
										wx.showModal({
											title: '提示',
											content: res.data.errorMessage,
											success: function(res) {
												if(res.confirm) {
													console.log('用户点击确定')
												} else if(res.cancel) {
													console.log('用户点击取消')
												}
											}
										})
										return;
										wx.hideLoading(); //////////////////////////////////////////////
									}
									wx.navigateTo({
										url: '../0toubaoxinxi/0toubaoxinxi?orderId=' + orderId
									});
								},
								'fail': function(res) {
									wx.hideLoading(); //////////////////////////////////////////////
								}
							});
						}
						//wx.hideLoading();//////////////////////////////////////////////
					},
					'fail': function(res) {
						wx.hideLoading(); //////////////////////////////////////////////
					}
				})
			}
		});

	} else {
		wx.login({
			success: function(res) {
				wx.request({
					url: 'https://51yangcong.com/568data/GetOpenId',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						'code': res.code
					},
					success: function success(res) {
						wx.hideLoading(); //////////////////////////////////////////////
						getApp().data.userOpenId = res.data.openid;
						console.log("TBXX重新获得openid:" + res.data.openid);
					},
					'fail': function(res) {
						wx.hideLoading(); //////////////////////////////////////////////
					}
				});
			}
		});
		wx.showModal({
			title: '提示',
			content: "查询失败，请稍后再试！",
			success: function(res) {
				if(res.confirm) {} else if(res.cancel) {}
			}
		})
	}

}
/*四大查询 -车辆状态*/
var clzt = function(detail, data) {
	var useDaijinquan = "0";
	if(daijinquanCount > 0) {
		wx.showModal({
			title: '提示',
			content: "您有可用的代金券，是否使用？",
			success: function(res) {
				if(res.confirm) {
					console.log('用户确定使用代金券');
					useDaijinquan = "1";
				} else if(res.cancel) {
					console.log('用户不使用使用代金券');
					useDaijinquan = "0";
				}
				clzt2(detail, data, useDaijinquan);
			}
		})
	} else {
		clzt2(detail, data, useDaijinquan);
	}
}
var clzt2 = function(detail, data, useDaijinquan) {
	wx.showLoading({
		title: '查询中'
	}); //////////////////////////////////////
	if(getApp().data.userOpenId != null && getApp().data.userOpenId != '') {
		console.log("CLZT获得openid成功" + getApp().data.userOpenId);

		wx.request({
			url: 'https://51yangcong.com/568data/PayOff',
			//url: 'http://127.0.0.1:8880/568data/PayOff',
			//url: 'https://123.206.89.114/568data/PayOff',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				'openid': getApp().data.userOpenId,
				'payType': 'CLZT',
				'useDaijinquan': useDaijinquan,
				'number': data.number1,
				'cltype': data.indexid,
				'cltypevalue': data.indexvalue
			},
			success: function success(res) {
				var orderId = res.data.orderId;
				if(orderId == null) {
					wx.hideLoading(); //////////////////////////////////////////////
					wx.showModal({
						title: '提示',
						content: res.data.errormassage,
						success: function(res) {
							if(res.confirm) {
								console.log('用户点击确定')
							} else if(res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
					return;
				}
				wx.showLoading({
					title: '查询中'
				}); //////////////////////////////////////
				var obj = res.data;
				wx.requestPayment({
					'timeStamp': obj.timeStamp,
					'nonceStr': obj.nonceStr,
					'package': obj.package,
					'signType': obj.signType,
					'paySign': obj.paySign,
					'success': function(res) {
						wx.showLoading({
							title: '查询中'
						}); //////////////////////////////////////
						console.log(res)
						if(res.errMsg == "requestPayment:ok") {
							wx.request({
								url: 'https://51yangcong.com/568data/PaySuccess',
								//url: 'http://127.0.0.1:8880/568data/PaySuccess',
								//url: 'https://123.206.89.114/568data/PaySuccess',
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: {
									'orderId': orderId,
									'payType': 'CLZT',
									'number': data.number1,
									'cltype': data.indexid,
									'cltypevalue': data.indexvalue
								},
								success: function success(res) {
									console.log(res)
									if(!res.data.success) {
										wx.hideLoading(); //////////////////////////////////////////////
										wx.showModal({
											title: '提示',
											content: res.data.errorMessage,
											success: function(res) {
												if(res.confirm) {
													console.log('用户点击确定')
												} else if(res.cancel) {
													console.log('用户点击取消')
												}
											}
										})
										wx.hideLoading(); //////////////////////////////////////////////
										return;
									}
									wx.navigateTo({
										url: '../0cheliangzhuangtai/0cheliangzhuangtai?orderId=' + orderId
									});
								},
								'fail': function(res) {
									wx.hideLoading(); //////////////////////////////////////////////
								}
							});
						}
						//wx.hideLoading();//////////////////////////////////////////////
					},
					'fail': function(res) {
						wx.hideLoading(); //////////////////////////////////////////////
					}
				})
			},
			'fail': function(res) {
				wx.hideLoading(); //////////////////////////////////////////////
			}
		});

	} else {
		wx.login({
			success: function(res) {
				wx.request({
					url: 'https://51yangcong.com/568data/GetOpenId',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						'code': res.code
					},
					success: function success(res) {
						wx.hideLoading(); //////////////////////////////////////////////
						getApp().data.userOpenId = res.data.openid;
						console.log("CLZT重新获得openid:" + res.data.openid);
					},
					'fail': function(res) {
						wx.hideLoading(); //////////////////////////////////////////////
					}
				});
			}
		});
		wx.showModal({
			title: '提示',
			content: "查询失败，请稍后再试！",
			success: function(res) {
				if(res.confirm) {} else if(res.cancel) {}
			}
		})
	}
}
//跳转页面
var _goTo = function(detail) {
	var _url = detail._execDetail.url;
	var _type = detail._execDetail.open_type;
	if(!_url) return;
	if(!_type) {
		if(detail._execDetail.redirect) wx.redirectTo({
			url: _url
		});
		else wx.navigateTo({
			url: _url
		});
		return;
	}
	switch(_type) {
		case "redirect":
			wx.redirectTo({
				url: _url
			});
			break;
		case "navigate":
			wx.navigateTo({
				url: _url
			});
			break;
		case "nagivator":
			wx.navigateTo({
				url: _url
			});
			break; //兼容，后续可以去掉
		default:
			wx.switchTab({
				url: _url
			});
			break;
	}
}
//显示/隐藏元素 class
var _toggleShow = function(detail, opt) {
	var _arguments = detail._execDetail;
	var coolsite360 = getApp().coolsite360;
	if(_arguments.e_ids) {
		for(var i = 0; i < _arguments.e_ids.length; i++) {
			if(opt && opt.type != 'undefined') {
				switch(opt.type) {
					case 0:
						coolsite360.$(_arguments.e_ids[i]).removeClass('c-initHide');
						break;
					case 1:
						coolsite360.$(_arguments.e_ids[i]).addClass('c-initHide');
						break;
					case 2:
						coolsite360.$(_arguments.e_ids[i]).toggleClass('c-initHide');
						break;
				}
			}
		}
	}
}
// 添加/移除class class必须
var _toggleClass = function(detail, opt) {
	var _arguments = detail._execDetail;
	var coolsite360 = getApp().coolsite360;
	if(_arguments.e_ids && _arguments.cla) {
		for(var i = 0; i < _arguments.e_ids.length; i++) {
			if(opt && opt.type != 'undefined') {
				switch(opt.type) {
					case 0:
						coolsite360.$(_arguments.e_ids[i]).addClass(_arguments.cla);
						break;
					case 1:
						coolsite360.$(_arguments.e_ids[i]).removeClass(_arguments.cla);
						break;
					case 2:
						coolsite360.$(_arguments.e_ids[i]).toggleClass(_arguments.cla);
						break;
				}
			}
		}
	}
}
//切换状态  class必须
var _changeState = function(detail) {
	var _arguments = detail._execDetail;
	var coolsite360 = getApp().coolsite360;
	if(_arguments.e_ids && _arguments.cla) {
		var _class = detail._execDetail.cla;
		for(var i = 0; i < _arguments.e_ids.length; i++) {
			if(_class == 'c-state1') {
				coolsite360.$(_arguments.e_ids[i]).removeClass('c-state2', 'c-state3').addClass(_class);
			} else if(_class == 'c-state2') {
				coolsite360.$(_arguments.e_ids[i]).removeClass('c-state1', 'c-state3').addClass(_class);
			} else {
				coolsite360.$(_arguments.e_ids[i]).removeClass('c-state1', 'c-state2').addClass(_class);
			}
		}
	} else {
		for(var m = 0; m < _arguments.e_ids.length; m++) {
			coolsite360.$(_arguments.e_ids[m]).removeClass('c-state1', 'c-state2', 'c-state3');
		}
	}
}
var _showActionSheets = function(detail) {
	var _list = detail._execDetail.itemList;
	var _color = detail._execDetail.itemColor || "#000000";
	if(_list.length == 0) return;
	wx.showActionSheet({
		itemList: _list,
		itemColor: _color
	})
}

var _showModal = function(detail) {
	var _arguments = detail._execDetail;
	// color只能是16进制的
	wx.showModal({
		title: _arguments.title || '提示',
		content: _arguments.content || '这是一个模态弹窗',
		showCancel: _arguments.showCancel == 'checked' || 'true',
		cancelText: _arguments.cancelText || '取消',
		cancelColor: rgb2Hex(_arguments.cancelColor) || "#000000",
		confirmText: _arguments.confirmText || '确定',
		confirmColor: rgb2Hex(_arguments.confirmColor) || "#3CC51F"
	})
}

var _showtoast = function(detail) {
	var _arguments = detail._execDetail;
	if(!_arguments) return;
	wx.showToast({
		title: _arguments.title || '',
		icon: _arguments.icon || 'success',
		duration: parseInt(_arguments.duration) || 1500
	})
}
var _hidetoast = function() {
	wx.hideToast();
}
var _canvasCircleAni = function(detail, data) {
	var _canvas = detail._execDetail.e_ids;
	for(var i = 0; i < _canvas.length; i++) {
		getApp().coolsite360.Component.drawCanvasCir(data[_canvas[i]], _canvas[i], true);
	}
}
var rgb2Hex = function(color) {
	if(/^(rgba|RGBA)/.test(color)) {
		var aColor = color.replace(/rgba\(|RGBA?/g, "").split(",");
		var strHex;
		strHex = "#" + ((1 << 24) + (parseInt(aColor[0]) << 16) + (parseInt(aColor[1]) << 8) + parseInt(aColor[2])).toString(16).slice(1);
		if(strHex.length !== 7) {
			strHex = color;
		}
		return strHex;
	} else {
		return color;
	}
}
module.exports = {
	register: register
}