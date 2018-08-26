const { mysql } = require('../qcloud');
const moment = require('moment');
const debug = require('debug')('TaskDbService');

const UserDbService ={
    getUserInfo(openId){
        let open_id = openId;
        return mysql('cSessionInfo').where({open_id})
        .then(res=>{
            if(!res[0]) return null;
            return res[0];
        })
        .catch(e => {
            debug('%s: %O', 'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB', e)
            throw new Error(`${'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB'}\n${e}`)
        })
    },
    getUsername(openId){
        let user_open_id = openId;
        return mysql('cUserName').where({user_open_id})
        .then(res=>{
            if(!res[0]) return null;
            return res[0];
        })
        .catch(e => {
            debug('%s: %O', 'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB', e)
            throw new Error(`${'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB'}\n${e}`)
        })
    },
    saveUserName(openId,username){
        let user_open_id = openId;
        const create_time = moment().format('YYYY-MM-DD HH:mm:ss');
        const update_time = create_time;
        const user_name = username;
        const entity = {
            user_name,create_time
        };

        return mysql('cUserName').count('user_open_id as hasUser').where({
            user_open_id
        })
        .then(res => {
            // 如果存在用户则更新
            if (res[0].hasUser) {
                return mysql('cUserName').update(entity).where({
                    user_open_id
                });
            } else {
                return mysql('cUserName').insert({...entity,user_open_id});
            }
        })
        .then(() => ({
            userName:userInfo.user_name
        }))
        .catch(e => {
            debug('%s: %O', 'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB', e)
            throw new Error(`${'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB'}\n${e}`)
        })
    }
}

module.exports = UserDbService;