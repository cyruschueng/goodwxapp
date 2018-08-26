var validates = {
	noEmpty: function(val) {
		if(typeof val === 'object' && val !== null) {
			if(val.length) {
				return true;
			} else {
				return false;
			}
		} else {
			if(val === '' || val === null ||val === '请选择') {
				return false
			} else {
				return true
			}
		}

	},
	telephone(val) {
		var reg = /^((13[0-9])|(15[^4,\D])|(18[0-9])|(14[5,7])|(17[0,1,3,5,6,7,8]))\d{8}$/;
		if(reg.test(val)) {
			return true
		} else {
			return false
		}
	},
	contactName(val) {
		var patrn = /^[a-zA-Z·\s\u4e00-\u9fa5]+$/;
		if(patrn.test(val)) {
			return true
		} else {
			return false
		}
	},
	checkIllegal(val) {
		var filterString = "";
		filterString = filterString == "" ? "“”、《》~！@#……%&<>" : filterString;
		var ch;
		var i;
		var temp;
		var error = true; //当包含非法字符时，返回true
		for(i = 0; i <= (filterString.length - 1); i++) {
			ch = filterString.charAt(i);
			temp = val.indexOf(ch);
			if(temp != -1) {
				error = false;
				break;
			}
		}
		return error
	},
	carNo(val) {
		var patrn = /^[\u4E00-\u9FFF]{1}[A-Z0-9]{6}$/;
		if(patrn.test(val)) {
			return true
		} else {
			return false
		}
	},
	frameNo(val) {
		var patrn = /^[a-zA-Z0-9]{17}$/;
		if(patrn.test(val)) {
			return true
		} else {
			return false
		}
	},
	mileage(val){
		var patrn = /^[1-9]\d*$/;
		if(patrn.test(val)) {
			return true
		} else {
			return false
		}
	}
}

var validator = function() {
	this.list = [];
}

validator.prototype = {
	addRule: function(value, rules) {
		if(typeof rules === 'object') {
			for(var i = 0, len = rules.length; i < len; i++) {
				this.list.push({
					value: value,
					rule: rules[i].rule,
					text: rules[i].text
				})
			}
		}
	},
	start: function() {
		for(var i = 0, len = this.list.length; i < len; i++) {
			//console.log(validates[this.list[i].rule](this.list[i].value));
			if(!validates[this.list[i].rule](this.list[i].value)) {
				wx.showToast({
					image: '',
					title: this.list[i].text
				})
				return false
			}
		}
		return true
	}
}
module.exports = {
	validator,
	validates
}
