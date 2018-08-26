// mp.js
const $ = (name) => require(`${name}.js`)[name];
const mp_gw = require('common/mp_gw.js').mp_gw;
const res = $('res');
const api = $('api');
const gw = $('gw');

function isApp(obj) {
	return true === obj.__i_m_app__;
}

function isPage(obj) {
	return !isApp(obj);
}

function initParam(app, param) {
	let user = app.user;

	param.uid = user.uid;
	param.session = user.session;
}

const debug = true;

function start(app, gsecret) {
	if (gsecret) {
		app.login.gsecret = gsecret;
	}

	if (debug || 0 == app.user.uid) {
		return start_login(app);
	} else {
		return api.checkSession().then(
			v => start_normal(app),
			e => start_login(app)
		);
	}
}

function start_normal(app) {
	if (app.login.gsecret) {
		return userG(app);
	} else {
		console.log(`start normal`);

		mp_gw.start_post(app);
	}
}

function start_login(app) {
	api.showLoadingEx(res.Transfer( "wx login"));

	return api.login().then(
		v => login(app, v.code),
		e => {
			let msg = res.Transfer("wx login fail");

			api.hideLoadingEx();

			console.error(`${msg}: ${JSON.stringify(e)}`);

			api.showModal(res.APP, msg);
		}
	);
}

function login(app, jscode) {
	app.login.jscode = jscode;

	api.showLoadingEx(res.Transfer("mp login"));

	if (debug || 0 == app.user.uid) {
		if (app.login.gsecret) {
			return randLoginG(app);
		} else {
			return randLogin(app);
		}
	} else {
		if (app.login.gsecret) {
			return userLoginG(app);
		} else {
			return userLogin(app);
		}
	}
}

function loginBy(app, method, param) {
	app.login.param = param;
	app.login.method = method;

	let msg = res.Word("login");

	msg = `${msg} ${method}`;
	api.showLoadingEx(msg);

	msg = `start ${msg} with`;
	if (param.uid) {
		msg = `${msg} uid:${param.uid}`;
	}
	if (param.jscode) {
		msg = `${msg} jscode:${param.jscode}`;
	}
	if (param.gsecret) {
		msg = `${msg} gsecret:${JSON.stringify({ iv: param.gsecret.iv })}`;
	}
	console.log(msg);

	return callBy(app, method, param);
}

function callBy(obj, method, param) {
	let r = gw[method];

	if (isPage(obj)) {
		initParam(getApp(), param);
	}

	return r.request(param).then(
		v => {
			let d = v.data;

			console.log(`${method} recv obj: ${JSON.stringify(d)}`);

			return (!d || d.error) ? r.fail(obj, d) : r.success(obj, d);
		},
		e => {
			console.log(`${method} recv error: ${JSON.stringify(d)}`);

			return r.fail(obj, e);
		}
	);
}

function randLogin(app) {
	return loginBy(app, "randLogin", {
		jscode: app.login.jscode,
	});
}

function randLoginG(app) {
	return loginBy(app, "randLoginG", {
		jscode: app.login.jscode,
		gsecret: app.login.gsecret,
	});
}

function userLogin(app) {
	return loginBy(app, "userLogin", {
		uid: app.user.uid,
		jscode: app.login.jscode,
	});
}

function userLoginG(app) {
	return loginBy(app, "userLoginG", {
		uid: app.user.uid,
		jscode: app.login.jscode,
		gsecret: app.login.gsecret,
	});
}

function userG(app) {
	return loginBy(app, "userG", {
		uid: app.user.uid,
		session: app.user.session,
		gsecret: app.login.gsecret,
	});
}

const mp = {
	start: (app, shareTicket) => {
		if (shareTicket) {
			console.log(`mp start with shareTicket:${shareTicket}`);

			api.getShareInfo(shareTicket).then(v => {
				console.log(`mp getShareInfo: shareTicket:${shareTicket} ==> iv:${v.iv}`);

				start(app, {
					iv: v.iv,
					encryptedData: v.encryptedData,
				});
			})
		} else {
			console.log(`mp start normal`);

			start(app);
		}
	},

	userCheckin: (page, param = { opengid, role, name, students, userInfo }) =>
		callBy(page, "userCheckin", param),

	groupCheckin: (page, param = { gid, role, name, students, userInfo }) =>
		callBy(page, "groupCheckin", param),

	groupGet: (page, param = { gid }) =>
		callBy(page, "groupGet", param),

	groupSync: (page, param = { gid, ver }) =>
		callBy(page, "groupSync", param),

	groupNewAdviser: (page, param = { gid, adviser }) =>
		callBy(page, "groupNewAdviser", param),

	groupDel: (page, param = { gid }) =>
		callBy(page, "groupDel", param),

	groupDelUser: (page, param = { gid, user }) =>
		callBy(page, "groupDelUser", param),

	groupDelStudent: (page, param = { gid, student }) =>
		callBy(page, "groupDelStudent", param),

	payPre: (page, param = { gid, money, time, lease }) =>
		callBy(page, "payPre", param),

	topicNew: (page, param = { gid, type, topic }) =>
		callBy(page, "topicNew", param),

	topicAct: (page, param = { gid, tid, action }) =>
		callBy(page, "topicAct", param),

	topicGet: (page, param = { gid, tid }) =>
		callBy(page, "topicGet", param),

	topicGetOpen: (page, param = { gid }) =>
		callBy(page, "topicGetOpen", param),

	topicGetClosed: (page, param = { gid }) =>
		callBy(page, "topicGetClosed", param),

	topicClose: (page, param = { gid, tid }) =>
		callBy(page, "topicClose", param),

	topicDel: (page, param = { gid, tid }) =>
		callBy(page, "topicDel", param),
};

module.exports = {
	mp: mp,
};