// tp.js

const tp = {
	
	newTopic: (creater, title, content, after = 2) => {
		let now = new Date();

		// todo: float to uint32
		let create = now.getTime() / 1000;

		return {
			header: {
				creater,
				title,
				content,
				create,
				deadline: create + after * 24 * 3600,
				// 0: open
				// 1: closed
				state: 0,
				// 0: vote
				// 1: notice
				type: 0,
			},
			body: {
				// only for note
				options: [],
			},
		};
	},

	newOption: (multi = false) => ({multi: true}),
	setOptionTitle: (opt, title) => opt.title = title,
	
};

module.exports = {
	tp: tp,
};
