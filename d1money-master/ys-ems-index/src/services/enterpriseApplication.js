import request from '../utils/request';

/***
 * 获取所有部门
 * @returns {Promise.<Object>}
 */
export async function queryApplist() {
    return request('/app/services/loadApplistByCorpid',{
        method: 'POST'
    });
}
