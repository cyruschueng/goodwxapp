module.exports = {
	success(data, msg, meta) {
		this.body = { data, msg, code: 1, meta };
	},
	error(data, msg, meta) {
		this.body = { data, msg, code: 0, meta };
	}
};
