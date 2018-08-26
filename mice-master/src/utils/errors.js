export const LESS_THAN_LIMIT = 26014
export const INVALID_PARAM = 10002
export const ERROR = -1
export const INVALID_TOKEN = 24002
export const NOT_FOUND = 404
export const EXCEED_TIMES_LIMIT = 29002
export const GRAB_FINISH = 26005
export const COMMAND_NOT_CORRECT = 26007
export const HAS_SENSITIVE_WORD = 26003
export const NULL_COMMAND = 26004
export const TOO_FREQUENT = 29001
export const REPEAT_GROUP = 32001
export default (code) => {
	let text
	switch (code) {
		case NOT_FOUND:
			text = '未知请求'
			break
		case ERROR:
			text = '未知错误'
			break
		case LESS_THAN_LIMIT:
			text = '余额不足提现'
			break
		case INVALID_PARAM:
			text = '请求参数非法'
			break
		case INVALID_TOKEN:
			text = '请求已过期'
			break
		case EXCEED_TIMES_LIMIT:
			text = '超过时间限制'
			break
		case TOO_FREQUENT:
			text = '操作太频繁'
			break
		case HAS_SENSITIVE_WORD:
			text = '存在敏感词语，请重新输入口令'
			break
		default:
			text = null

	}
	return text
}
