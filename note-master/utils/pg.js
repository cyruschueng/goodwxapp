// pg.js
const $ = (name) => require(`${name}.js`)[name];
const res = $('res');
const mp = $('mp');

const app = getApp();

const pg = {
	share: (page, options) => {
		console.log(`share from ${options.from} to ${options.target}`);

		return {
			title: res.APP,
			path: `/${page.route}?shared=1`,
			success: v => {
				let shareTicket = v.shareTickets[0];

				console.info(`${page.name} share success v=${JSON.stringify(v)}`);

				mp.start(app, shareTicket);
			},
			fail: e => {
				console.info(`${page.name} share failed e=${e}`);
			},
		};
	},
};

module.exports = {
	pg: pg,
};
