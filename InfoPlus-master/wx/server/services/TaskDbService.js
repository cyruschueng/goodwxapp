const { mysql } = require('../qcloud');
const uuidGenerator = require('uuid/v4')
const shortid = require('shortid');
const moment = require('moment');
const debug = require('debug')('TaskDbService');

const TaskDbService ={
    getTask(taskId,groupId,shareTicket){
        let task_id = taskId;
        return mysql('cGroupTask').leftJoin('cTaskGroupInfo','cGroupTask.task_id','cTaskGroupInfo.task_id').where('cGroupTask.task_id',task_id)
        .then(res=>{
            if(!res[0]) return {};
            return res[0];
        })
        .catch(e => {
            debug('%s: %O', 'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB', e)
            throw new Error(`${'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB'}\n${e}`)
        })
    },
    saveTask(userInfo,username,task){
        let task_id = task.id ? task.id: shortid.generate();//uuidGenerator();
        const create_time = moment().format('YYYY-MM-DD HH:mm:ss');
        const update_time = create_time;
        const create_by = userInfo.openId;
        //const create_name = userInfo.nickName;
        let create_by_name = username;
        const title = task.title;
        const detail = task.detail;
        const is_single = task.isSingle;
        const req_location = task.showLocation;
        const req_name = task.reqName;
        const end_time = task.endTime;
        const entity = {
            create_by,create_by_name,create_time,update_time,title,detail,is_single,req_location,req_name,end_time
        };

        return mysql('cGroupTask').count('task_id as hasTask').where({
            task_id
        })
        .then(res => {
            // 如果存在用户则更新
            if (res[0].hasTask) {
                return mysql('cGroupTask').update(entity).where({
                    task_id
                });
            } else {
                return mysql('cGroupTask').insert({...entity,create_time,task_id});
            }
        })
        .then(() => ({
            taskId: task_id,
            nickName:userInfo.nickName,
            title:title
        }))
        .catch(e => {
            debug('%s: %O', 'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB', e)
            throw new Error(`${'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB'}\n${e}`)
        })
    },
    saveTaskShare(task_id,share_ticket,group_id,group_name){
        const create_time = moment().format('YYYY-MM-DD HH:mm:ss');
        const update_time = create_time;
        
        const entity = {
            share_ticket,group_id,group_name,update_time
        };

        return mysql('cTaskGroupInfo').count('task_id as hasTask').where({
            task_id
        })
        .then(res => {
            // 如果存在用户则更新
            if (res[0].hasTask) {
                return mysql('cTaskGroupInfo').update(entity).where({
                    task_id
                });
            } else {
                return mysql('cTaskGroupInfo').insert({...entity,create_time,task_id});
            }
        })
        .then(() => ({
            taskId: task_id,
            groupId:group_id,
            groupName:group_name
        }))
        .catch(e => {
            debug('%s: %O', 'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB', e)
            throw new Error(`${'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB'}\n${e}`)
        })
    }
}

module.exports = TaskDbService;