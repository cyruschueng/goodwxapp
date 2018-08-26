const router = require("koa-router")();
const _ = require("lodash");

router.get("/home", async (ctx, next) => {
	var users = _.groupBy([4.2, 6.1, 6.4], function(n) {
		return Math.floor(n);
	});

	ctx.success(users);
});

module.exports = router;
