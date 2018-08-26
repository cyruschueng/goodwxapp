// helper.js

const helper = {
	bkdr: (s) => {
		let n = 0;

		for (let i = 0; i < s.length; i++) {
			let c = s.charCodeAt(i);

			n = (n * 37 + c) >>> 0;
		}

		return n >>> 0;
	},

	url: (name, param = {}) => {
		let url = `/pages/${name}/${name}`;
		let keys = Object.keys(param);
		let count = keys.length;

		for (let i = 0; i < count; i++) {
			let k = keys[i];
			let v = param[k];

			if (0 == i) {
				url = `${url}?${k}=${v}`;
			} else {
				url = `${url}&${k}=${v}`;
			}
		}

		return url;
	},

	promisify: (fn, obj = {}) => new Promise((resolve, reject) => {
		obj.success = resolve;
		obj.fail = reject;

		fn(obj);
	}),
};

/*
const fsm = {
	INIT: 0,
	NORMAL: 1,
	WX_LOGIN_FAIL: 2,
	MP_LOGIN_FAIL: 3,
	NORMAL_G: 4,
	RAND_LOGIN: 5,
	RAND_LOGIN_G: 6,
	USER_LOGIN: 7,
	USER_LOGIN_G: 8,
};
*/

const topic = {
	state: {
		open: 0,
		closed: 1,
		all: 2,
		end: 3
	},
	type: {
		vote: 0,
		notice: 1,
		end: 2
	},
	makeTid: (type, tpid) => ((type >>> 0) << 24) | (tpid >>> 0),
	getTpid: tid => (tid >>> 0) & 0x00ffffff,
	getType: tid => ((tid >>> 0) & 0xff000000) >> 24,
};

/*
const typedef = {
	user: {
		uid: 0,
		session: "",
		nn: 4,
		groups: [0],
	},
	secret: {
		encryptedData: "",
		iv: "",
	},
	lease: {
		begin: 0,
		end: 0,
	},
	group: {
		ver: 0,
		opengid: "",
		adviser: 0,
		payer: 0,
		lease: {},
		create: 0,
		students: {},
		teachers: {},
		patriarchs: {},
	},
	checkinStudents: {
		name: "",
		relation: "",
		sgw: 0,
	},
	student: {
		name: "",
		sgw: 0,
		relation: {},
	},
	teacher: {
		name: "",
		nick: "",
	},
	patriarch: {
		name: "",
		nick: "",
		relation: {},
	},
	$topic: {
		creater: 0,
		create: 0,
		begin: 0,
		end: 0,
		state: 0,
		title: "",
		content: "",
		body: {},
	},
	$topicx: {
		tid: 0,
		$topic: {},
		actions: [{}],
	},
	$topicAction: {
		uid: 0,
		time: 0,
		action: {},
	},
	$topicSummary: {
		summary: {},
	},
	pay: {
		timeStamp: "",
		nonceStr: "",
		package: "",
		signType: "",
		paySign: "",
	},
};
*/

module.exports = {
	helper: helper,
};
