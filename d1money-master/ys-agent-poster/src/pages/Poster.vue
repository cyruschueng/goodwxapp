<style scoped rel="stylesheet/less" lang="less">
    .poster {
        width: 100%;
        height: 100%;
        .poster__fixhead {
            position: relative;
            z-index: 1;
            background-color: #fbf9fe;
            padding-bottom: 10px;
            .poster__hd {
                width: 100%;
                overflow: hidden;
                height: 22.5vh;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .footer {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    color: #ffffff;
                    font-size: 12px;
                    height: 25px;
                    line-height: 25px;
                    background-color: rgba(0, 0, 0, .3);
                    display: flex;
                    flex-flow: nowrap row;
                    justify-content: space-between;
                    padding: 0 10px;
                }
            }
        }
        .poster__bd {
            position: relative;
            top: -44px;
            box-sizing: border-box;
            padding: 0 10px 10px 10px;
            height: calc(~"100% - 44px") !important;
            /*margin-top: 95px;*/
            padding-top: 44px !important;
            .posterPic {
                margin: 10px;
                box-sizing: border-box;
                img {
                    width: 100%;
                    height: 25vh;
                    object-fit: cover;
                }
                .title {
                    text-align: center;
                    font-size: 12px;
                }
            }
        }
    }
</style>
<template>
    <div class="poster">
        <DmLoading v-if="loading" img="/static/common/img/loadingImg.png"></DmLoading>
        <template v-else="loading">
            <div class="poster__fixhead">
                <tabbar-scoller
                    :list="headTab.items"
                    :currentIndex="headTab.selectIndex"
                    active-color="#4aa1f0"
                    @change="switchTabItem"
                ></tabbar-scoller>
                <!--<div class="poster__hd">-->
                <!--<img src="../../static/img/head.png"/>-->
                <!--<div class="footer">-->
                <!--<p>已坚持打卡5天(连续1天)</p>-->
                <!--<p>已有12415人参与</p>-->
                <!--</div>-->
                <!--</div>-->
                <button-tab style="margin: 10px 15px 0; ">
                    <button-tab-item selected @on-item-click="switchOrderType">最新</button-tab-item>
                    <button-tab-item @on-item-click="switchOrderType">最热</button-tab-item>
                </button-tab>
            </div>
            <scroller
                class="poster__bd"
                :on-refresh="refresh"
                :on-infinite="infinite"
                ref="dmscroller"
            >
                <flexbox :gutter="0" wrap="wrap" align="flex-start">
                    <template v-for="(item, index) in list">
                        <flexbox-item :span="1/3">
                            <div class="posterPic" @click="seePoster(item.id)">
                                <img :src="item.imgsrc">
                                <p class="title">{{item.title}}</p>
                            </div>
                        </flexbox-item>
                    </template>
                </flexbox>
            </scroller>
        </template>
    </div>
</template>
<script>
    import {XHeader, Tab, TabItem, Flexbox, FlexboxItem, ButtonTab, ButtonTabItem} from 'vux'
    import UtilMixin from './../mixins/ScrollerMixin.vue'
    import TabbarScoller from './../components/TabbarScoller/index.vue'
    import DmLoading from '@/components/Dcomponents/DmLoading/index.vue'
    export default {
        mixins: [UtilMixin],
        data() {
            return {
                loading: true,
                headTab: {
                    selectIndex: 0,
                    items: []
                },
                // 分类id
                typeid: null,
                // 最新: 0, 最热: 1
                ordertype: 0,
                list: [],
                pageSize: 9
            }
        },
        components: {
            XHeader,
            Tab,
            TabItem,
            Flexbox,
            FlexboxItem,
            ButtonTab,
            ButtonTabItem,
            TabbarScoller,
            DmLoading
        },
        async created() {
            this.$wechat.ready(() => {
                // 隐藏所有非基础按钮接口
                this.$wechat.hideAllNonBaseMenuItem()
            })
            const headTabItems = await this.ajaxLoadAllPosterType()
            if (Array.isArray(headTabItems) && headTabItems.length !== 0) {
                this.typeid = headTabItems[0].id
                const result = await this.ajaxPageDateByList()
                this.list = result.list
                this.pageCount = result.pageCount
            }
            this.loading = false
        },
        async mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            // typeid切换
            async switchTabItem(index) {
                if (this.typeid === this.headTab.items[index].id) {
                    return
                }
                this.typeid = this.headTab.items[index].id
                this.$vux.loading.show({
                    text: '加载中...'
                })
                this.pageNo = 0
                try {
                    let result = await this.ajaxPageDateByList()
                    this.$refs.dmscroller && this.$refs.dmscroller.scrollTo(0, 0, false)
                    this.list = result.list
                    this.pageCount = result.pageCount
                    this.headTab.selectIndex = index
                } catch (err) {
                    console.error(err)
                }
                this.$vux.loading.hide()
            },
            async switchOrderType(index) {
                if (this.ordertype === index) {
                    return
                }
                this.$vux.loading.show({
                    text: '加载中...'
                })
                this.ordertype = index
                this.pageNo = 0
                try {
                    let result = await this.ajaxPageDateByList()
                    this.$refs.dmscroller && this.$refs.dmscroller.scrollTo(0, 0, false)
                    this.list = result.list
                    this.pageCount = result.pageCount
                } catch (err) {
                    console.error(err)
                }
                this.$vux.loading.hide()
            },
            ajaxLoadAllPosterType() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/poster/services/loadAllPosterType',
                        tips: true
                    }).then(result => {
                        result.unshift({
                            id: -1,
                            name: '全部'
                        })
                        this.$set(this.headTab, 'items', result)
                        resolve(result)
                    }).catch((code, msg) => {
                        reject(code, msg)
                    })
                })
            },
            ajaxPageDateByList() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/poster/services/loadAllcorpPostersByTypeid',
                        data: {
                            typeid: this.typeid,
                            ordertype: this.ordertype,
                            pageNo: this.pageNo,
                            pageSize: this.pageSize
                        },
                        tips: true
                    }).then(result => {
                        resolve(result)
                    }).catch((code, msg) => {
                        reject(code, msg)
                    })
                })
            },
            // 图片预览接口
            async seePoster(posterid) {
                this.$vux.loading.show({
                    text: '加载中...'
                })
                try {
                    await this.$axios.post({
                        url: '/agent/poster/services/addClickRecord',
                        data: {
                            posterid
                        }
                    })
                    this.$vux.loading.hide()
                    this.$wechat.previewImage({
                        current: `${window.location.origin}/gent/poster/services/toPoster?id=${posterid}&v=${Math.round(Math.random() * 1000000)}`, // 当前显示图片的http链接
                        urls: [`${window.location.origin}/agent/poster/services/toPoster?id=${posterid}&v=${Math.round(Math.random() * 1000000)}`] // 需要预览的图片http链接列表
                    })
                } catch (err) {
                    console.log(err)
                    this.$vux.loading.hide()
                }
            }
        }
    }
</script>
