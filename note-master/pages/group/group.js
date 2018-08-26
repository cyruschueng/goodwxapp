// pages/group/group.js
const m_name = "group";
const app = getApp();

const $ = (name) => require(`../../utils/${name}.js`)[name];
const pg = $("pg");
const mp = $("mp");
const db = $("db");
const api = $("api");
const res = $("res");

function load(page, options) {
	console.log(`${m_name} onload options:${JSON.stringify(options)}`);

	let gid = options.gid * 1;
	let opengid = options.opengid;

	db.user.addGroup(app.user, gid, opengid);
	db.user.save(app.user);

	page.setData({
		"group.opengid": opengid,
	});

	mp.groupGet(page, { gid });
}

function groupGet(page, obj) {
	let gid = obj.gid;
	let group = obj.group;
	let d = page.data;
	let adviser = {name: ""};
	let teachers = [];
	let patriarchs = [];
	let students = [];

	db.group.save(app.groups, gid, group);

	console.log(`group=${JSON.stringify(group)}`);

	if (group.teachers) {
		adviser.name = group.teachers[group.adviser + ""].name;

		Object.keys(group.teachers).map((uid, idx) => {
			if ((uid * 1) != group.adviser) {
				let teacher = group.teachers[uid];

				teachers.push({
					name: teacher.name,
					idx: idx,
				});
			}
		});
	}

	if (group.patriarchs) {
		Object.keys(group.patriarchs).map((uid, idx) => {
			let patriarch = group.patriarchs[uid];

			patriarchs.push({
				name: patriarch.name,
				idx: idx,
			});
		});

		Object.keys(group.students).map((uid, idx) => {
			let student = group.students[uid];

			students.push({
				name: student.name,
				idx: idx,
			});
		});
	}

	page.setData({
		"adviser.name": adviser.name,
		"teacher.all": teachers,
		"patriarch.all": patriarchs,
		"student.all": students,
	});
}

Page({
	name: m_name,
	data: {
		adviser: {
			label: res.Word("adviser"),
			name: "",
		},
		teacher: {
			label: res.Word("teacher"),
			all: [
				// {idx: idx, name: name},
			],
		},
		patriarch: {
			label: res.Word("patriarch"),
			all: [
				// {idx: idx, name: name},
			],
		},
		student: {
			label: res.Word("student"),
			all: [
				// {idx: idx, name: name},
			],
		},
	},

	onLoad: function (options) {
		load(this, options);
	},

	groupGet: function (obj) {
		return groupGet(this, obj);
	},
})