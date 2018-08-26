// mq.js

function tp_init(obj) {
	obj.seq = 0;
	obj.head = undefined;
	obj.tail = undefined;
}

class topic {
	static init(obj) {
		obj.seq = 0;
		obj.head = undefined;
		obj.tail = undefined;
	}

	constructor() {
		this.q = new Map();

		tp_init(this);
	}

	clear() {
		this.q.clear();

		tp_init(this);
	}

	sendmsg(sender, msg) {
		let seq = this.seq++;

		this.q.set(seq, { sender, msg });
		this.head = seq;
		if (1 == this.q.size) {
			this.tail = seq;
		}
	}

	recvmsg() {
		if (0 == this.q.size) {
			return undefined;
		}

		let head = this.head;
		let data = this.q.get(head);

		this.q.delete(head);

		return data;
	}

	size() {
		return this.q.size;
	}

	seq() {
		return this.seq;
	}
};

class mq {
	constructor() {
		this.box = {};

		console.log(`new mq`);
	}

	clear() {
		this.box = {};

		console.log(`clear mq`);
	}

	clearTopic(name) {
		let tp = this.box[name];

		if (tp) {
			tp.clear();

			console.log(`clear topic ${name}`);
		}
	}

	addTopic(name) {
		if (!this.box[name]) {
			this.box[name] = new topic();

			console.log(`new topic: ${name}`);
		}
	}

	delTopic(name) {
		if (this.box[name]) {
			delete this.box[name];

			console.log(`delete topic ${name}`);
		}
	}

	sendmsg(sender, recver, msg) {
		let tp = this.box[recver];
		
		if (tp) {
			tp.sendmsg(sender, msg);

			console.log(`${sender}==>${recver} msg:${JSON.stringify(msg)}`);
		}
	}

	recvmsg(recver) {
		let tp = this.box[recver];
		let {sender, msg} = tp ? tp.recvmsg() : {};

		console.log(`${recver} recv msg:${JSON.stringify(msg)} sender:${sender}`);

		return {sender, msg};
	}
}

module.exports = {
	mq: mq,
};
