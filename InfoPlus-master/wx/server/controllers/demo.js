const demo = {
    async get(ctx, next){
        console.log(ctx.state);
        ctx.state.data = {
            msg:'Hello World2',
            info:'H'
        }
    },
    async post(ctx, next){
        console.log(ctx.state);
        ctx.state.data = {
            msg:'Hello World3',
            info:'H'
        }
    }
}
module.exports = demo;