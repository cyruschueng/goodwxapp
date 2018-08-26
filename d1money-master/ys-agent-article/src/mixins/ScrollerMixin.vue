<!--
ScrollerMixin 上拉刷新 下拉加载使用指南

1. 默认使用data
    pageNo: 当前页数
    pageCount: 一共多少页
    list: 数据组

2. 默认方法 methods
       refresh()  刷新方法
       infinite() 加载

3. ajaxPageDateByList 通用获取数据的方法名
-->
<script>
    export default {
        data() {
            return {
                list: [],
                pageNo: 0,
                pageSize: 10,
                pageCount: 1,
                isInit: false,
                isDeactivated: true
            }
        },
        async created() {
            if (this.isInit) {
                let result = await this.ajaxPageDateByList()
                this.list = result.list
                this.pageCount = result.pageCount
            }
        },
        methods: {
            async refresh(done) {
                this.pageNo = 0
                let result = await this.ajaxPageDateByList()
                this.list = result.list
                this.pageCount = result.pageCount
                done()
            },
            async infinite(done) {
                if (this.pageNo >= this.pageCount - 1) {
                    this.$refs.dmscroller.finishInfinite(2)
                    return
                }
                this.pageNo++
                let newList = await this.ajaxPageDateByList()
                let oldList = this.list
                this.list = oldList.concat(newList.list)
                this.pageCount = newList.pageCount
                done()
            }
        }
//        activated() {
//            if (this.$route.meta.keepAlive && localStorage.getItem('d1money!currentScroller')) {
//                let {left = 0, top = 0} = JSON.parse(localStorage.getItem('d1money!currentScroller'))
//                setTimeout(() => {
//                    this.$refs.dmscroller && this.$refs.dmscroller.scrollTo(left, top, false)
//                }, 30)
//            }
//        },
//        deactivated() {
//            if (this.isDeactivated) {
//                localStorage.setItem('d1money!currentScroller', JSON.stringify(this.$refs.dmscroller.getPosition()))
//            }
//        },
//        beforeRouteEnter(to, from, next) {
//            let refresh = ['teamVisitingRecord', 'Home', 'AddVisitRecord', 'AddRepublishVisitingRecord']
//            if (refresh.includes(from.name)) {
//                next(vm => {
//                    setTimeout(() => {
//                        vm.$refs.dmscroller && vm.$refs.dmscroller.scrollTo(0, 0, false)
//                        if (vm.isInit) {
//                            vm.ajaxPageDateByList()
//                                .then(result => {
//                                    vm.list = result.list
//                                    vm.pageCount = result.pageCount
//                                })
//                        }
//                    }, 30)
//                })
//            }
//            next()
//        }
    }
</script>
