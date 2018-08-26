<style scoped rel="stylesheet/less" lang="less">
    .video {
        width: 100%;
        height: 100%;
        .video__hd {
            position: relative;
            z-index: 99;
        }
        .video__bd {
            box-sizing: border-box;
            .vidoeList {
                .videoItem {
                    box-sizing: border-box;
                    margin-bottom: 15px;
                    &:nth-child(2n) {
                        padding-left: 2px;
                    }
                    &:nth-child(2n+1) {
                        padding-right: 2px;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="video">
        <DmLoading v-if="loading" img="/static/common/img/loadingImg.png"></DmLoading>
        <template v-else="loading">
            <tabbar-scoller
                class="video__hd"
                :list="headTab.items"
                :currentIndex="headTab.selectIndex"
                active-color="#4aa1f0"
                @change="switchTabItem"
            ></tabbar-scoller>
            <scroller
                class="video__bd"
                :on-refresh="refresh"
                :on-infinite="infinite"
                ref="dmscroller"
                style="padding-top: 45px;"
            >
                <flexbox class="vidoeList" :gutter="0" wrap="wrap" align="flex-start">
                    <template v-for="(item, index) in list">
                        <flexbox-item class="videoItem" :span="1/2">
                            <video-cell
                                :title="item.title"
                                :desc="item.introduce"
                                :img="item.videoImg"
                                :seeNumber="item.playcount"
                                :likeNumber="item.thumbsupcount"
                                :shareNumber="item.sharedcount"
                                @click.native="routerLink('VideoDetail',{videoid: item.id})">
                            </video-cell>
                        </flexbox-item>
                    </template>
                </flexbox>
            </scroller>
        </template>
    </div>
</template>
<script>
    import {XHeader, Tab, TabItem, Flexbox, FlexboxItem} from 'vux'
    import UtilMixin from './../mixins/UtilMixin.vue'
    import ScrollerMixin from './../mixins/ScrollerMixin.vue'
    import VideoCell from './../components/Cell/VideoCell.vue'
    import TabbarScoller from './../components/TabbarScoller/index.vue'
    import DmLoading from '@/components/Dcomponents/DmLoading/index.vue'
    export default {
        mixins: [UtilMixin, ScrollerMixin],
        data() {
            return {
                loading: true,
                headTab: {
                    selectIndex: 0,
                    items: []
                },
                // 分类id
                typeid: null,
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
            VideoCell,
            TabbarScoller,
            DmLoading
        },
        async created() {
            const headTabItems = await this.ajaxLoadAllPosterType()
            if (Array.isArray(headTabItems) && headTabItems.length !== 0) {
                this.typeid = headTabItems[0].id
                const result = await this.ajaxPageDateByList()
                this.list = result.list
                this.pageCount = result.pageCount
                this.loading = false
            }
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
            ajaxLoadAllPosterType() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/video/services/loadAllCorpVedioType',
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
                        url: '/agent/video/services/loadVedioListByType',
                        data: {
                            typeid: this.typeid,
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
            }
        }
    }
</script>
