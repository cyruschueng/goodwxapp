const Koa = require("koa");
const route = require("koa-route");
const websockify = require("koa-websocket");
const cors = require("koa-cors");
const body = require("koa-body");
const convert = require("koa-convert");
const glob = require("glob");
const _ = require("lodash");
const util = require("./util");
const path = require("path");
const moment = require("moment");
const Router = require("koa-router");
const config = require("./config");
const logger = require("koa-logger");
const http = require("http");
const app = websockify(new Koa());
const router = new Router();

const WebSocket = require("ws");

const koaServer = http.Server(app.callback());

// 全局
global.BaaS = {};
app.ws.use(function(ctx, next) {
	// return `next` to pass the context (ctx) on to the next ws middleware
	console.log("----");
	return next(ctx);
});

// Using routes
app.ws.use(
	route.all("/", function(ctx) {
		ctx.websocket.on("message", function(message) {
			const obj = { name: "weiguoheng" };
			ctx.websocket.send(JSON.stringify(obj));
			console.log(message);
		});
	})
);
app.use(
	convert(
		cors({
			credentials: true
		})
	)
);
app.use(logger());

app.use(
	body({
		multipart: true
	})
);

app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		const msg = err.stack || err.toString();
		console.error(msg.replace(/^/gm, "  "));

		if (401 !== ctx.status) {
			ctx.status = 500;
		}
		ctx.error(err.name + " : " + err.message);
	}
});

// 加载中间件
const middlewares = glob.sync("**/*.middleware.js", { cwd: "./middleware" });
for (const key in middlewares) {
	const basename = path.basename(middlewares[key]);
	const name = basename.substr(0, basename.length - 14);
}

// 加载路由
const routes = glob.sync("**/*.js", {
	cwd: "./router"
});

for (const key in routes) {
	if (!_.includes(config.router, routes[key].replace(/\\/g, "/"))) {
		config.router.push(routes[key].replace(/\\/g, "/"));
	}
}

// 路由排序
for (const key in config.router) {
	const route = require(path.resolve("./router", config.router[key]));
	if (route instanceof Router) {
		router.use(
			path
				.join("/", path.dirname(config.router[key]))
				.replace(/\\/g, "/"),
			route.routes()
		);
	}
}
app.use(router.routes());
app.use(router.allowedMethods());
server = app.listen(config.port, () => {
	const date = moment().format("YYYY-MM-DD HH:mm:ss");

	console.log(`[${date}] Server running at: http://127.0.0.1:3003`);
});
