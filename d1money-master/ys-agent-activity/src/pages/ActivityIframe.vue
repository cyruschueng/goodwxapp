<style lang="less" rel="stylesheet/less" scoped="scoped">
    .activityIframe {
        height: 100%;
        position: relative;
        .iframe {
            width: 100%;
            height: calc(~'100% - 50px');
        }
        .bottom {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50px;
            box-sizing: border-box;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            background-color: #ffffff;
            .img {
                width: 60px;
                height: 50px;
                padding: 5px 10px;
                /*height: 40px;*/
                box-sizing: border-box;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 100%;
                    overflow: hidden;
                }
            }
            .util {
                flex: 1;
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-end;
                height: 50px;
                line-height: 50px;
                .tel, .ewm {
                    width: 50px;
                    text-align: center;
                    color: #ffffff;
                    i.iconfont {
                        color: #ffffff;
                        font-size: 20px;
                    }
                }
                .tel {
                    background-color: #FF7676;
                }
                .ewm {
                    i.iconfont {
                        color: #09bb07;
                        font-size: 20px;
                    }
                }
                .btn {
                    height: 100%;
                    padding: 0 10px;
                    background-color: #E64340;
                    color: #ffffff;
                    font-size: 18px;
                }
            }

        }
    }
</style>
<template>
    <div class="activityIframe">
        <DmLoading v-if="loading" img="/static/common/img/loadingImg.png"></DmLoading>
        <template v-else="loading">
            <iframe
                class="iframe"
                frameborder="0"
                :src="$route.query.url"
            >
            </iframe>
            <div class="bottom">
                <div class="img">
                    <img :src="userImg" alt="">
                </div>
                <div class="name">
                    {{fpuserName}}
                </div>
                <div class="util">
                    <div class="ewm" @click="lookewm">
                        <i class="iconfont icon-yingdaicon04"></i>
                    </div>
                    <a :href="'tel:'+ user.name" class="tel">
                        <i class="iconfont icon-dianhua"></i>
                    </a>
                    <div class="btn" @click="openSignUp">预约报名</div>
                </div>
            </div>
        </template>
        <confirm
            class="signUpConfirm"
            v-model="signUpConfirm"
            title="请填写报名信息"
            @on-confirm="signUp"
            :close-on-confirm="false"
        >
            <Group :gutter="0" class="noborder" ref="signUpForm">
                <x-input
                    name="acceptername"
                    placeholder="请填写您的姓名"
                    :required="true"
                    :should-toast-error="false"
                ></x-input>
                <x-input
                    name="accepterphone"
                    placeholder="请填写手机号"
                    type="tel"
                    is-type="china-mobile"
                    :required="true"
                    :should-toast-error="false"
                ></x-input>
            </Group>
        </confirm>
    </div>
</template>

<script>
    import {XButton, Box, Group, XInput, Confirm} from 'vux'
    import WxShareMixin from './../mixins/WxShareMixin.vue'
    import DmLoading from '@/components/Dcomponents/DmLoading/index.vue'
    export default {
        mixins: [WxShareMixin],
        props: ['id'],
        data() {
            return {
                loading: true,
                signUpConfirm: false,
                userImg: window.YS_USER_AVATAR[46],
                userewm: window.YS_USER_AVATAR.wx_ewm,
                user: window.YS_USER,
                user_corpuser: window.YS_USER_CORPUSER
            }
        },
        components: {
            XButton,
            Box,
            Group,
            XInput,
            Confirm,
            DmLoading
        },
        computed: {
            fpuserName() {
                let realname = this.user.nickname
                if (this.user_corpuser && this.user_corpuser.realname){
                    realname = this.user_corpuser.realname
                }
                return realname
            }
        },
        methods: {
            // 查看微信二维码
            lookewm() {
                this.$vux.alert.show({
                    title: '请长按并识别二维码',
                    content: `
                            <div style="width: 100%;">
                                <img style="width: 100%;height:100%;object-fit: cover;"src="${this.userewm}" alt="二维码加载失败">
                            </div>
                    `
                })
            },
            openSignUp() {
                this.$vux.toast.text('自己不能向自己报名喔', 'center')
            },
            ajaxLoadActivityDetail() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/activity/services/loadActivityDetail',
                        data: {
                            activityid: this.id,
                            // type 1: 的添加阅读记录
                            type: 1
                        }
                    }).then(res => {
                        resolve(res)
                    })
                })
            },
            /***
             * 分享回调接口
             * @param type 0:朋友圈 1:朋友 2: QQ 3:QQ空间 4:企业微信
             */
            ajaxCallBackShared(type) {
                this.$axios.post({
                    url: '/agent/activity/services/shareActivitycallBack',
                    data: {
                        activityid: this.$route.query.id,
                        sharetype: type,
                        fpuserid: this.user.id,
                        shareuserid: this.user.id,
                        level: 1
                    }
                }).then(res => {

                })
            }
        },
        async created() {
            let result = await this.ajaxLoadActivityDetail()
            window.document.title = result.name
            // 微信分享
            this.$wechat.ready(() => {
                this.$wechat.showMenuItems({
                    menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:QZone'] // 要显示的菜单项，所有menu项见附录3
                })
                this.weixinShare({
                    title: result.name, // 分享标题
                    desc: result.introduce,
                    link: `${window.location.protocol}//${window.location.host}/cust/activity/index?id=${this.id}&shareuserid=${this.user.id}&fpuserid=${this.user.id}&level=2#/?id=${this.id}&shareuserid=${this.user.id}&fpuserid=${this.user.id}&level=2`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: result.smallimgsrc, // 分享图标
                    fn: this.ajaxCallBackShared
                })
            })
            this.loading = false
        },
        mounted() {
        }
    }
</script>
