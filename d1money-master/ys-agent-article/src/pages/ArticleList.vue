<style rel="stylesheet/less" lang="less" scoped="scoped">
    .articleList {
        position: absolute;
        width: 100%;
        height: 100%;
        .articleList__hd {
            position: relative;
            height: 90px;
            .masker {
                position: absolute;
                height: 100%;
                width: 100%;
                opacity: .5;
            }
            .container {
                position: relative;
                height: 100%;
                display: flex;
                flex-flow: row nowrap;
                .logo {
                    margin: 15px;
                    width: 60px;
                    height: 60px;
                    text-align: center;
                    color: #ffffff;
                    -webkit-border-radius: 100% 100%;
                    -moz-border-radius: 100% 100%;
                    border-radius: 100% 100%;
                    i.iconfont {
                        font-size: 40px;
                    }
                }
                .content {
                    flex: 1;
                    margin: 15px 15px 15px 0;
                    color: #ffffff;
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: center;
                    h3 {
                        font-size: 16px;
                    }
                    font-size: 12px;
                }

            }
        }
        .articleList__bd {
            position: relative;
            height: calc(~"100% - 90px");
        }
    }
</style>
<template>
    <div class="articleList">
        <DmLoading v-if="loading" img="/static/common/img/loadingImg.png"></DmLoading>
        <template v-else>
            <div class="articleList__hd">
                <div class="masker" :style="{'background-color': tag.colorcode}"></div>
                <div class="container">
                    <div class="logo" :style="{'background-color': tag.colorcode}">
                        <i :class="['iconfont '+ tag.iconclass]"></i>
                    </div>
                    <div class="content">
                        <h3>{{tag.name}}</h3>
                        <div>
                            {{tag.description}}
                        </div>
                    </div>
                </div>

            </div>
            <div class="articleList__bd">
                <scroller
                    :on-refresh="refresh"
                    :on-infinite="infinite"
                    ref="dmscroller"
                >
                    <template v-for="(item, index) in list">
                        <swipeout>
                            <swipeout-item
                                transition-mode="follow"
                            >
                                <div slot="right-menu">
                                    <!--<swipeout-button style="border-radius: 100%;overflow:hidden;width: 70px;height: 70px;margin-top: calc(15vw - 35px);margin-left:5px" @click.native="onButtonClick('fav')" type="primary">收藏-->
                                    <!--</swipeout-button>-->
                                    <swipeout-button :type="item.iscommend ? 'warn' : 'primary'" @click.native="commend(index)">
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
                                            <div class="item"><i class="iconfont icon-attentionfill"></i>{{item.readcount}}
                                            </div>
                                        </div>
                                    </DmPanel>
                                </template>
                            </swipeout-item>
                        </swipeout>
                    </template>
                </scroller>
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
        </template>
    </div>
</template>
<script>
    import {
        Cell, Group, Confirm, Countup, TransferDomDirective as TransferDom, XDialog, XButton, Box, Swipeout,
        SwipeoutItem,
        SwipeoutButton
    } from 'vux'
    import DmPanel from '@/components/Dcomponents/DmPanel.vue'
    import DmLoading from '@/components/Dcomponents/DmLoading/index.vue'
    import ScrollerMixin from '@/mixins/ScrollerMixin.vue'
    import UtilMixin from '@/mixins/UtilMixin.vue'

    export default {
        directives: {
            TransferDom
        },
        mixins: [ScrollerMixin, UtilMixin],
        props: ['tagid'],
        components: {
            Cell,
            Group,
            DmPanel,
            Confirm,
            Countup,
            XDialog,
            XButton,
            Box,
            DmLoading,
            Swipeout,
            SwipeoutItem,
            SwipeoutButton
        },
        data() {
            return {
                loading: true,
                tag: {
                    id: null,
                    name: null,
                    iconclass: null,
                    description: null,
                    colorcode: null
                },
                articelDialogShow: false,
                dialog: {
                    id: null,
                    title: null,
                    shortcontent: null,
                    description: null,
                    imgSrc: null
                }
            }
        },
        async created() {
            await this.ajaxLoadArticleTagBytagid()
            let result = await this.ajaxPageDateByList()
            this.list = result.list
            this.pageCount = result.pageCount
            this.loading = false
        },
        methods: {
            // 收藏/取消收藏
            commend(index){
                const id = this.list[index].id
                const iscommend = this.list[index].iscommend
                this.$axios.post({
                    url: '/agent/article/services/commendByid',
                    data: {
                        id,
                        iscommend: iscommend ? 0 : 1
                    }
                }).then(res => {
                    this.list[index].iscommend = iscommend ? 0 : 1
                    this.$vux.toast.show({
                        text: iscommend ? '取消推荐' : '已推荐'
                    })
                })
            },
            async refresh(done) {
                this.pageNo = 0
                let result = await this.ajaxPageDateByList()
                this.list = result.list
                this.pageCount = result.pageCount
                done()
            },
            ajaxPageDateByList() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/article/services/loadarticlesBytagid',
                        data: {
                            tagid: this.tagid,
                            pageNo: this.pageNo,
                            pageSize: this.pageSize
                        },
                        tips: true
                    })
                        .then(result => {
                            resolve(result)
                        })
                        .catch((code, msg) => {
                            reject(code, msg)
                        })
                })
            },
            openDialog(index) {
                this.articelDialogShow = !this.articelDialogShow
                this.dialog = this.list[index]
            },
            ajaxLoadArticleTagBytagid() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/article/services/loadArticleTagBytagid',
                        data: {
                            tagid: this.tagid
                        },
                        tips: true
                    }).then(result => {
                        this.tag = result
                        resolve(result)
                    })
                })
            }
        }
    }
</script>
