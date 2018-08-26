const Koahub = require("koahub");
const WebSocket = require("ws");
const app = new Koahub();

global.wss = new WebSocket.Server({ server: app.getServer() });

const router = require("koa-router")();

router.get("/ws", async (ctx, next) => {
	wss.on("connection", async function(ws, req) {
		ws.on("message", async function(message) {
			console.log(message);
			console.log(JSON.parse(message));
			if (message.type == update) {
			}
		});
	});
});

module.exports = router;
