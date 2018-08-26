const { NODE_ENV } = process.env;
const isDev = NODE_ENV !== 'production';
const BASE_URL ='mainapi.icarbonx.com'
const ENTRY = 'miniprogram'; // 入口
const API_VERSION ='v1'; // api版本
const INDEX_SKY_ID ='mini-test-index-banner'; // 这个banner不能
const INDEX_SKY_TYPE ='Banner';
export {
	BASE_URL,
	ENTRY,
	API_VERSION,
	INDEX_SKY_ID,
	INDEX_SKY_TYPE
}