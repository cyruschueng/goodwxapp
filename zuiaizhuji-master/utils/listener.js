import _ from './underscore.js';

//触发器总集合
const LISTENER_MANAGER = [];

export default class listener {
	/**
	 * 添加监听器
	 * @param {string} name
	 * @param {Function} listener
	 */
	static addEventListener(name, listener) {
		if (!name || !isNaN(parseInt(name)))
			throw TypeError("监听器名称只能为英文字母以及下划线！");
		if (!_.isFunction(listener))
			throw TypeError("监听器只能为回调函数！");

		//判断当前监听器是否存在，不存在则直接创建一个空数组
		if (LISTENER_MANAGER[name] === undefined)
			LISTENER_MANAGER[name] = [];

		LISTENER_MANAGER[name].push(listener);
	}

	/**
	 * 移除监听器
	 * @param {string} name
	 * @param {Function} listener
	 */
	static removeEventListener(name, listener) {
		//如果传递的不是一个回调函数，则直接返回
		if (!_.isFunction(listener)) return;

		//处理器
		const handler = function (listeners, listener) {
			const index = _.indexOf(listeners, listener);
			if (index !== -1)
				listeners.splice(index, 1);
		};
		if (!name || !isNaN(parseInt(name))) {
			//所有监听器都移除这个回调函数
			_.each(LISTENER_MANAGER, function (listeners) {
				handler(listeners, listener);
			});
		} else {
			handler(LISTENER_MANAGER[name] || [], listener);
		}
	}

	/**
	 * 触发监听器
	 * @param {string} name
	 * @param {Array} [param]
	 * @param {Object} [obj]
	 */
	static fireEventListener(name, param, obj) {
		if (!name || !isNaN(parseInt(name)))
			throw TypeError("监听器名称只能为英文字母以及下划线！");

		const listeners = LISTENER_MANAGER[name] || [];
		for (let i = 0; i < listeners.length; i++)
			if (listeners[i].apply(obj, param) === false)
				return false;
	}
};

if (typeof (module) !== 'undefined') {
	listener.default = listener;
	module.exports = listener;
}