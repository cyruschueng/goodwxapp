import wepy from 'wepy'

// 单数据分页加载

export default class extends wepy.mixin {
    data = {
        pageNo: 0,
        pageSize: 15,
        pageCount: 1
    }
    methods = {}

    onShow() {

    }

    onLoad() {
        if(!this.origin){
            console.error("此页面没有配置 origin （数据源）！\n 请在 data 中 配置 origin='' ")
        }
        if(typeof (this.loadmoreSingleLoad) != 'function'){
            console.error("此页面没有配置 loadmoreSingleLoad （分页加载数据源）！\n 请在 data 中 配置 loadmoreSingleLoad(){} ")
        }
    }

    async onReachBottom(){
        this.pageNo++;
        // console.log(this.pageNo);
        if(this.pageNo >= this.pageCount){
            // console.log(`${this.pageNo} >= ${this.pageCount}`);
            return ;
        }
        let origin = this.origin;
        let list =  await this.loadmoreSingleLoad();
        this[origin].list = this[origin].list.concat(list);
        this.$apply();

    }
}
