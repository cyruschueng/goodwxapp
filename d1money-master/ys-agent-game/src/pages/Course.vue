<style scoped rel="stylesheet/less" lang="less">
    .course {
        width: 100%;
        height: 100%;
        .course__hd {
            position: relative;
            z-index: 1;
        }
        .course__bd {
            box-sizing: border-box;
            .courseList {
                padding: 8px;
                box-sizing: border-box;
                .courseItem {
                    box-sizing: border-box;
                    margin-bottom: 8px;
                    &:nth-child(2n) {
                        padding-left: 4px;
                    }
                    &:nth-child(2n+1) {
                        padding-right: 4px;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="course">
        <tabbar-scoller
            class="course__hd"
            :list="headTab.items"
            :currentIndex="headTab.selectIndex"
            active-color="#4aa1f0"
            @change="switchTabItem"
        ></tabbar-scoller>
        <scroller
            class="course__bd"
            :on-refresh="refresh"
            :on-infinite="infinite"
            ref="dmscroller"
            style="padding-top: 45px;"
        >
            <flexbox class="courseList" :gutter="0" wrap="wrap" align="flex-start">
                <template v-for="(item, index) in list">
                    <flexbox-item class="courseItem" :span="1/2">
                        <course-cell
                            :title="item.title"
                            :desc="item.introduce"
                            :img="item.courseImg"
                            :seeNumber="item.playcount"
                            :likeNumber="item.thumbsupcount"
                            :shareNumber="item.sharedcount"
                            :mask=".6"
                            :isRadius="true"
                            @click.native="routerLink('CourseCatalog',{courseid: item.id}, {title: item.title})">
                        </course-cell>
                    </flexbox-item>
                </template>
            </flexbox>
        </scroller>
    </div>
</template>
<script>
    import {XHeader, Tab, TabItem, Flexbox, FlexboxItem} from 'vux'
    import UtilMixin from './../mixins/UtilMixin.vue'
    import ScrollerMixin from './../mixins/ScrollerMixin.vue'
    import CourseCell from './../components/Cell/CourseCell.vue'
    import TabbarScoller from './../components/TabbarScoller/index.vue'
    export default {
        mixins: [UtilMixin, ScrollerMixin],
        data() {
            return {
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
            CourseCell,
            TabbarScoller
        },
        async created() {
            const headTabItems = await this.ajaxLoadAllPosterType()
            if (Array.isArray(headTabItems) && headTabItems.length !== 0) {
                this.typeid = headTabItems[0].id
                const result = await this.ajaxPageDateByList()
                this.list = result.list
                this.pageCount = result.pageCount
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
                        url: '/agent/course/services/loadAllCorpVedioType',
                        tips: true
                    }).then(result => {
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
                        url: '/agent/course/services/loadVedioListByType',
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
