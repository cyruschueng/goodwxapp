import request from '../utils/request';

/**
 * 获取所有部门
 * @returns {Promise.<Object>}
 */
export async function queryAllParty() {
    return request('/contactbook/services/loadAllPartysByCorpId', { method: 'POST' });
}
