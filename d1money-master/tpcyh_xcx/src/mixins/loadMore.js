import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {

    }
    methods = {

        loadMore(dateOrigin){
            this[dateOrigin].isload = true;
            // console.log(this[dateOrigin]);
            this.$invoke('dm-panel-ft','changeData',true)

            setTimeout(() => {
                this[dateOrigin].isload = false;
                this.$invoke('dm-panel-ft','changeData',false)
                // console.log("setTimeout");

                let list = [
                    {
                        id:1,
                        img: 'http://img1.imgtn.bdimg.com/it/u=1669988347,113905404&fm=214&gp=0.jpg',
                        nickName: '陈刚1',
                        status: 2,
                        tel: 17853593651,
                        day: 10
                    },
                    {
                        id:2,
                        img: 'http://img1.imgtn.bdimg.com/it/u=1669988347,113905404&fm=214&gp=0.jpg',
                        nickName: '王小伞2',
                        status: 1,
                        day: 8
                    }
                ];

                this[dateOrigin].list = this[dateOrigin].list.concat(list);
                this.$apply();
            },1500)
        }
    }


    onShow() {

    }

    onLoad() {

    }
}
