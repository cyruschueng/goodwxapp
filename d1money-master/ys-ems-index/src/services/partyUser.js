import queryString from 'queryString';
import request from '../utils/request';

/**
 * 获取某个部门成员
 * @returns {Promise.<Object>}
 */
export async function queryPartyUsers(params) {
    console.log(params)
    return request('/contactbook/services/loadPartyUsers', {
        method: 'POST',
        body: queryString.stringify(params),
    });
}
