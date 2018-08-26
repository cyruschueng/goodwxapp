<style lang="less" rel="stylesheet/less" scoped="scoped">
    .home {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
        position: absolute;
        .iconGroup {
            .userTags {
                padding: 10px 0;
                max-height: 40vw;
                overflow: hidden;
                position: relative;
                box-sizing: border-box;
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                .item {
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: space-evenly;
                    width: 20vw;
                    height: 20vw;
                    text-align: center;
                    box-sizing: border-box;
                    .circular {
                        height: 10vw;
                        width: 10vw;
                        line-height: 10vw;
                        margin: 0 auto 3px;
                        background-color: #dedcdd;
                        -webkit-border-radius: 100% 100%;
                        -moz-border-radius: 100% 100%;
                        border-radius: 100% 100%;
                        i.iconfont {
                            color: #ffffff;
                            font-size: 6vw;
                        }
                    }
                    p {
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="home" id="home">
        <DmLoading v-if="loading" img="/static/common/img/loadingImg.png"></DmLoading>
        <template v-else="loading">
            <Group
                :gutter="0"
                title-color="#333"
                title="每日推荐"
            >
                <template v-if="recommend3Articles && recommend3Articles.length!==0">
                    <template v-for="(item, index) in recommend3Articles">
                        <swipeout>
                            <swipeout-item
                                transition-mode="follow"
                            >
                                <div slot="right-menu">
                                    <!--<swipeout-button style="border-radius: 100%;overflow:hidden;width: 70px;height: 70px;margin-top: calc(15vw - 35px);margin-left:5px" @click.native="onButtonClick('fav')" type="primary">收藏-->
                                    <!--</swipeout-button>-->
                                    <swipeout-button :type="item.iscommend ? 'warn' : 'primary'"
                                                     @click.native="commend(index, 'recommend3Articles')">
                                        <template v-if="item.iscommend">
                                            <i class="iconfont icon-likefill"></i> 已推荐
                                        </template>
                                        <template v-else="item.iscommend">
                                            <i class="iconfont icon-like"></i> 推荐
                                        </template>
                                    </swipeout-button>
                                </div>
                                <template slot="content">
                                    <DmPanel
                                        class="article"
                                        :class="['dm__panel', 'article', 'dm-border-b']"
                                        headWidth='75px'
                                        headHeight="60px"
                                        :lineClamp=2
                                        :img="item.imgSrc"
                                        :title='item.title'
                                        @click.native="openDialog(index, true)"
                                    >
                                        {{item.shortcontent}}
                                        <div slot="other" class="util">
                                            <div class="item"><i class="iconfont icon-like"></i>{{item.thumbsupcount}}
                                            </div>
                                            <div class="item"><i class="iconfont icon-comment"></i>{{item.commentcount}}
                                            </div>
                                            <div class="item"><i
                                                class="iconfont icon-attentionfill"></i>{{item.readcount}}
                                            </div>
                                        </div>
                                    </DmPanel>
                                </template>
                            </swipeout-item>
                        </swipeout>
                    </template>
                </template>
                <box v-else gap="15px">
                    <divider>暂时没有数据</divider>
                </box>
            </Group>
            <!--第一身份-->
            <Group
                v-for="(item, index) in tagTypelist"
                :key="index"
                class="iconGroup"
                :gutter="0"
                title-color="#333"
                :title="item.name"
            >
                <template v-if="item.articleTags && item.articleTags.length!==0">
                    <!--<scroller lock-y :scrollbar-x=false>-->
                    <div class="userTags" :ref="'tagType'+index">
                        <template v-for="(i, ix) in item.articleTags">
                            <div class="item" @click="routerLink('ArticleList',{tagid: i.id})">
                                <div class="circular" :style="{'backgroundColor': i.colorcode}">
                                    <i :class="['iconfont '+ i.iconclass]"></i>
                                </div>
                                <p>{{i.name}}</p>
                            </div>
                            <div class="item"
                                 v-if="!userTags['tagType'+index] && item.articleTags.length!==10 && ix === 8"
                                 @click="toggleMore('tagType'+index)">
                                <div class="circular" :style="{'backgroundColor': color}">
                                    <i class="iconfont icon-more"></i>
                                </div>
                                <p>查看更多</p>
                            </div>
                        </template>
                        <div class="item" v-if="userTags['tagType'+index]" @click="toggleMore('tagType'+index)">
                            <div class="circular" :style="{'backgroundColor': color}">
                                <i class="iconfont icon-triangleupfill"></i>
                            </div>
                            <p>收起</p>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <box gap="15px">
                        <divider>暂时没有数据</divider>
                    </box>
                </template>
            </Group>
            <!--第二身份-->
            <Group
                class="iconGroup"
                :gutter="0"
                title-color="#333"
                :title="userTags.name ? userTags.name : ''"
            >
                <template>
                    <div class="userTags" ref="userTags">
                        <template v-if="userTags.tags && userTags.tags.length!==0">
                            <div class="item" @click="userTagsPopup = !userTagsPopup">
                                <div class="circular" :style="{'backgroundColor': color}">
                                    <i class="iconfont icon-add"></i>
                                </div>
                                <p>添加</p>
                            </div>
                            <template v-for="(item, index) in userTags.tags">
                                <div class="item"
                                     v-if="!userTags['userTags'] && userTags.tags.length!==9 && index === 8"
                                     @click="toggleMore('userTags')">
                                    <div class="circular" :style="{'backgroundColor': color}">
                                        <i class="iconfont icon-more"></i>
                                    </div>
                                    <p>查看更多</p>
                                </div>
                                <div class="item" @click="routerLink('ArticleList',{tagid: item.id})">
                                    <div class="circular"
                                         :style="{'backgroundColor': item.colorcode}">
                                        <i :class="['iconfont '+ item.iconclass]"></i>
                                    </div>
                                    <p>{{item.name}}</p>
                                </div>
                            </template>
                            <div class="item" v-if="userTags['userTags']" @click="toggleMore('userTags')">
                                <div class="circular" :style="{'backgroundColor': color}">
                                    <i class="iconfont icon-triangleupfill"></i>
                                </div>
                                <p>收起</p>
                            </div>
                        </template>
                        <template v-else>
                            <div class="item" @click="userTagsPopup = !userTagsPopup">
                                <div class="circular" :style="{'backgroundColor': color}">
                                    <i class="iconfont icon-add"></i>
                                </div>
                                <p>添加</p>
                            </div>
                        </template>
                    </div>
                </template>
            </Group>
            <Group></Group>
            <sticky ref="sticky" :check-sticky-support="true">
                <tab :line-width=2 active-color="#07b2f6">
                    <tab-item @on-item-click="ajaxLoadArticlelistByclickType(1, false)" :selected="tabItemIndex === 1">
                        最新文章
                    </tab-item>
                    <tab-item @on-item-click="ajaxLoadArticlelistByclickType(2, false)" :selected="tabItemIndex === 2">
                        个人上传
                    </tab-item>
                    <tab-item @on-item-click="ajaxLoadArticlelistByclickType(3, false)" :selected="tabItemIndex === 3">
                        社区上传
                    </tab-item>
                </tab>
            </sticky>
            <div class="list">
                <template v-for="(item, index) in list">
                    <swipeout>
                        <swipeout-item
                            transition-mode="follow"
                        >
                            <div slot="right-menu">
                                <!--<swipeout-button style="border-radius: 100%;overflow:hidden;width: 70px;height: 70px;margin-top: calc(15vw - 35px);margin-left:5px" @click.native="onButtonClick('fav')" type="primary">收藏-->
                                <!--</swipeout-button>-->
                                <swipeout-button :type="item.iscommend ? 'warn' : 'primary'"
                                                 @click.native="commend(index, 'list')">
                                    <template v-if="item.iscommend">
                                        <i class="iconfont icon-likefill"></i> 已推荐
                                    </template>
                                    <template v-else="item.iscommend">
                                        <i class="iconfont icon-like"></i> 推荐
                                    </template>
                                </swipeout-button>
                            </div>
                            <template slot="content">
                                <DmPanel
                                    class="article"
                                    :class="['dm__panel', 'article', 'dm-border-b']"
                                    headWidth='75px'
                                    headHeight="60px"
                                    :lineClamp=2
                                    :img="item.imgSrc"
                                    :title='item.title'
                                    @click.native="routerLink('Article',{articleid: item.id})"
                                >
                                    {{item.shortcontent}}
                                    <div slot="other" class="util">
                                        <div class="item"><i class="iconfont icon-like"></i>{{item.thumbsupcount}}</div>
                                        <div class="item"><i class="iconfont icon-comment"></i>{{item.commentcount}}</div>
                                        <div class="item"><i class="iconfont icon-attentionfill"></i>{{item.readcount}}</div>
                                    </div>
                                </DmPanel>
                            </template>
                        </swipeout-item>
                    </swipeout>
                </template>
                <div style="text-align: center;margin: 15px;" v-if="pageNo < pageCount - 1">
                    <spinner type="android" size="45px"></spinner>
                </div>
                <box gap="15px" v-if="!loadding && (pageNo >= pageCount - 1)">
                    <divider>没有更多数据</divider>
                </box>

            </div>
            <!--立即分享 dialog-->
            <x-dialog
                class="articleDialog"
                v-model="articelDialogShow"
                :hide-on-blur="true"
            >

                <div class="head" :style="{'backgroundImage': 'url('+dialog.imgSrc +')'}">
                    <div class="mask"></div>
                    <i @click="articelDialogShow = !articelDialogShow" class="iconfont icon-close"></i>
                    <div class="head_bd">
                        <h3 class="title">{{dialog.title}}</h3>
                        <div class="desc">{{dialog.shortcontent}}</div>
                    </div>
                </div>
                <div class="content">
                    <p class="recommendation">推荐话术</p>
                    <p class="desc">{{dialog.description}}</p>
                </div>
                <box gap="10px 15px">
                    <x-button
                        :link="'/article/' + dialog.id"
                        style="height: 35px;line-height: 35px; font-size: 14px;"
                        :gradients="['#1D62F0', '#19D5FD']"
                    >立即分享
                    </x-button>
                </box>
            </x-dialog>
            <!--第二身份选择-->
            <div v-transfer-dom>
                <popup
                    style="height: 60%;"
                    v-model="userTagsPopup">
                    <popup-header
                        right-text="确定"
                        title="添加/删除第二身份"
                        :show-bottom-border="false"
                        @on-click-right="userTagsPopup = !userTagsPopup"
                    ></popup-header>
                    <div style="height: calc(100% - 44px);overflow: auto;-webkit-overflow-scrolling : touch;">
                        <checklist
                            label-position="left"
                            :options="userTagsCheckList"
                            v-model="userTagsCheck" @on-change="change"
                            style="margin-top:0"
                        ></checklist>
                    </div>
                </popup>
            </div>
        </template>
    </div>
</template>
<script>
    import {
        Group,
        Sticky,
        Tab,
        TabItem,
        XDialog,
        Scroller,
        XButton,
        Box,
        Spinner,
        Divider,
        Popup,
        Checklist,
        PopupHeader,
        TransferDomDirective as TransferDom,
        Swipeout,
        SwipeoutItem,
        SwipeoutButton
    } from 'vux'
    import DmPanel from '@/components/Dcomponents/DmPanel.vue'
    import DmLoading from '@/components/Dcomponents/DmLoading/index.vue'
    import UtilMixin from '@/mixins/UtilMixin.vue'

    export default {
        directives: {
            TransferDom
        },
        mixins: [UtilMixin],
        data() {
            return {
                loading: true,
                articelDialogShow: false,
                dialog: {
                    id: null,
                    title: null,
                    shortcontent: null,
                    description: null,
                    imgSrc: null
                },
                // 每日推荐
                recommend3Articles: [],
                tagTypelist: [],
                userTags: {
                    name: '',
                    tags: []
                },
                tabItemIndex: 1,
                list: [],
                pageNo: 0,
                pageSize: 10,
                pageCount: 1,
                loadding: false,
                userTagsPopup: false,
                // 可选择的第二身份
                userTagsCheckList: [],
                // 已选择的第二身份
                userTagsCheck: []
            }
        },
        components: {
            DmPanel,
            Group,
            Sticky,
            Tab,
            TabItem,
            XDialog,
            Scroller,
            XButton,
            Box,
            Spinner,
            Divider,
            Popup,
            Checklist,
            PopupHeader,
            DmLoading,
            Swipeout,
            SwipeoutItem,
            SwipeoutButton
        },
        computed: {},
        methods: {
            // 页面数据 初始化
            async init() {
                await this.ajaArticleClassification()
                await this.ajaxLoadArticlelistByclickType(1, false)
                this.$nextTick(() => {
                    this.$refs.sticky.bindSticky()
                })
                await this.ajaxSelectAllSecordIdentity()
                this.loading = false
            },
            // 收藏/取消收藏
            commend(index, list) {
                const id = this[list][index].id
                const iscommend = this[list][index].iscommend
                this.$axios.post({
                    url: '/agent/article/services/commendByid',
                    data: {
                        id,
                        iscommend: iscommend ? 0 : 1
                    }
                }).then(res => {
                    this[list][index].iscommend = iscommend ? 0 : 1
                    this.$vux.toast.show({
                        text: iscommend ? '取消推荐' : '已推荐'
                    })
                })
            },
            // 获取每日推荐 第一身份
            ajaArticleClassification() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/article/services/articleClassification'
                    }).then(result => {
                        result && result.recommend3Articles && (this.recommend3Articles = result.recommend3Articles)
                        result && result.tagTypelist && (this.tagTypelist = result.tagTypelist)
                        result && result.userTags && (this.userTags = result.userTags)
                        if (this.userTags.tags && this.userTags.tags.length !== 0) {
                            this.userTags.tags.map(item => {
                                this.userTagsCheck.push(item.id)
                            })
                        }
                        resolve(result)
                    })
                })
            },
            // 获取可选择的第二身份
            ajaxSelectAllSecordIdentity() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/article/services/selectAllSecordIdentity'
                    }).then((result) => {
                        resolve(result)
                        result.map(item => {
                            let _item = item
                            _item.key = item.id
                            _item.value = item.name
                            return _item
                        })
                        this.userTagsCheckList = result
                    })
                })
            },
            // 获取最新文章 个人上传 社区上传
            ajaxLoadArticlelistByclickType(type, append = true) {
                if (type === this.tabItemIndex && !this.list && this.list.length !== 0) {
                    return
                }
                if (!append) {
                    this.pageNo = 0
                }
                this.tabItemIndex = type
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/article/services/loadArticlelistByclickType',
                        data: {
                            type: type,
                            pageNo: this.pageNo,
                            pageSize: this.pageSize
                        }
                    }).then(result => {
//                        console.log(result)
                        this.pageCount = result.pageCount
                        if (!append) {
                            this.list = result.list
                        }
                        resolve(result.list)
                    })
                })
            },
            openDialog(index, isrecommend3Articles = false) {
                this.articelDialogShow = !this.articelDialogShow
                if (isrecommend3Articles) {
                    this.dialog = this.recommend3Articles[index]
                } else {
                    this.dialog = this.list[index]
                }
            },
            change(val, label) {
                if (!this.userTagsPopup) {
                    return
                }
                this.$set(this.userTags, 'tags', [])
                for (let i = 0, length = this.userTagsCheckList.length; i < length; i++) {
                    if (val.includes(this.userTagsCheckList[i].id)) {
                        this.userTags.tags.push(this.userTagsCheckList[i])
                    }
                }
                val.map(item => {
                    if (Object.prototype.toString.call(item) === '[object Object]') {
                        return item.key
                    }
                    return item
                })
                if (val.length === 0) {
                    val = ''
                } else {
                    val = val.join(',')
                }
                this.$axios.post({
                    url: '/agent/article/services/beachAddSecordIdentity',
                    data: {
                        tags: val
                    }
                }).then(result => {
//                    console.log(result)
                })
            },
            // 查看更多
            toggleMore(el) {
                let dom = null
                if (Array.isArray(this.$refs[el])) {
                    dom = this.$refs[el][0]
                } else {
                    dom = this.$refs[el]
                }
                if (this.userTags[el]) {
                    this.$set(this.userTags, el, false)
                    dom.style.maxHeight = '40vw'
                    dom.style.overflow = 'hidden'
                } else {
                    this.$set(this.userTags, el, true)
                    dom.style.maxHeight = 'none'
                    dom.style.overflow = 'auto'
                }
            }
        },
        created() {
            this.init()
        },
        async mounted() {
            const divscroll = document.getElementById('home')
            let divScroll = () => {
                let wholeHeight = divscroll.scrollHeight
                let scrollTop = divscroll.scrollTop
                let divHeight = divscroll.clientHeight
                if (scrollTop + divHeight + 30 >= wholeHeight) {
                    // 这里写动态加载的逻辑，比如Ajax请求后端返回下一个页面的内容
                    if (this.loadding === true) {
                        return
                    }
                    if (this.pageNo >= this.pageCount - 1) {
                        return
                    }
                    this.loadding = true
                    this.pageNo++
                    this.ajaxLoadArticlelistByclickType(this.tabItemIndex)
                        .then(result => {
                            this.loadding = false
                            this.list.push(...result)
                        })
                }
            }
            divscroll.onscroll = divScroll
        },
// eslint-disable-next-line no-trailing-spaces
        activated() {
            if (this.$route.meta.keepAlive) {
                this.$nextTick(() => {
                    this.$refs.sticky.bindSticky()
                })
            }
        }
    }
</script>
