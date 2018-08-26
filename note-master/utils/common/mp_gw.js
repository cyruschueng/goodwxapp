// common/mp_gw.js
const include = (name) => require(`../${name}.js`)[name];

const db = include("db");
const api = include("api");

function start_post(app, g = {}) {
	let target = "guide";

	db.user.save(app.user);

	api.hideLoadingEx();

	console.log(`start over`);

	if (g.opengid) {
		if (g.gid) {
			let gid = db.user.getGid(app.user, g.opengid);
			if (gid != g.gid) {
				db.user.addGroup(app.user, g.gid, g.opengid);
				db.user.save(app.user);
			}

			api.redirectToEx("group", {
				opengid: g.opengid,
				gid: g.gid,
			});
		} else {
			api.redirectToEx("guide", { opengid: g.opengid });
		}
	} else {
		let groups = db.user.getGroups(app.user);
		let count = groups ? groups.length : 0;

		switch (count) {
			case 0:
				// do nothing
				break;
			case 1:
				api.redirectToEx("group", {
					opengid: groups[0].opengid,
					gid: groups[0].gid,
				});

				break;
			default:
				api.redirectToEx("list");
				break;
		}
	}
}

const mp_gw = {
	start_post: start_post,
};

module.exports = {
	mp_gw: mp_gw,
};
