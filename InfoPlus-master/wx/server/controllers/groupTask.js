const debug = require('debug')('saveGroupTask');
const taskDbService = require('../services/TaskDbService');
const userDbService = require('../services/UserDbService');
const util = require('../utilities/checkUtility');
const dayUtil = require('../utilities/dateUtility');

const groupTask = {
    async get(ctx,next){
        let queryTaskId = ctx.request.query.taskId?ctx.request.query.taskId:1;
        let taskEntity = await taskDbService.getTask(queryTaskId);
        let {title,detail,create_by_name,is_single,req_location,req_name,group_id,end_time,create_time} = taskEntity;
        let endTime = end_time?end_time.getTime()>1514736000000 ? end_time:null:null;
        let createdDate = dayUtil.getDateAndDay(create_time);
        endTime = endTime?dayUtil.getDateAndTime(end_time):null;
        ctx.state.data = {title,detail,taskId:queryTaskId,isSingle:is_single,reqLocation:req_location,groupId:group_id,endTime:endTime,createdBy:create_by_name,createdDate};
    },
    async post(ctx, next){
        let checked = !util.checkLogin(ctx) && !util.checkNotNull(ctx,['title']);
        if(!checked) return;
        debug('%s: %O', 'Req:', ctx.request.body);
        let reqTask = {...ctx.request.body};
        let username = await userDbService.getUsername(ctx.state.$wxInfo.userinfo.openId);
        username = username?username.user_name:ctx.state.$wxInfo.userinfo.nickName;
        let task = await taskDbService.saveTask(ctx.state.$wxInfo.userinfo,username,reqTask);
        ctx.state.data = task;
    }
}
module.exports = groupTask;