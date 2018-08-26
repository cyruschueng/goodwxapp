const checkUtility = {
    checkLogin(ctx){
        if(ctx.state.$wxInfo.loginState !== 1){
            ctx.state.code=-1;
            return true;
        }
    },
    checkNotNull(ctx,checkArray){
        let data =  ctx.request.body;
        for(let p of checkArray){
            if(!data.hasOwnProperty(p)||!data[p]||!data[p].trim()){
                ctx.state.code=-2;
                return true;
            }
        }
    }
}
module.exports = checkUtility;