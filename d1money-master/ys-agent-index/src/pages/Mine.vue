<style lang="less" rel="stylesheet/less" scoped="scoped">
    .mine {
        height: 100%;
        .mine__hd {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            padding: 15px;
            background-color: #fff;
            position: relative;
            margin-top: 0.77em;

            &:active {
                background-color: #ECECEC;
            }
            &:before {
                content: " ";
                position: absolute;
                left: 0;
                top: 0px;
                right: 0;
                height: 1px;
                border-top: 1px solid #D9D9D9;
                color: #D9D9D9;
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
            }
            &:after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0px;
                right: 0;
                height: 1px;
                border-top: 1px solid #D9D9D9;
                color: #D9D9D9;
                -webkit-transform-origin: 0 100%;
                transform-origin: 0 100%;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
            }
            .headUrl {
                width: 50px;
                height: 50px;
                margin-right: 10px;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 5px;
                    /*box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5), 0 2px 11px 2px rgba(0, 0, 0, 0.55);*/
                    /*transform-style: preserve-3d;*/
                }
            }
            .content {
                flex: 1;
                display: flex;
                flex-flow: column nowrap;
                justify-content: space-around;
                height: 46px;
                .nickname {
                    font-size: 16px;
                    line-height: 1em;
                }
                .score {
                    font-size: 12px;
                }
            }
        }
        .mine__bd {
            .menu {
                .icon {
                    margin-right: 5px;
                }
            }
        }
        .wxewmPopup{
            .content{
                width: 100%;
                height:100%;
                line-height: 0;
            }
        }
    }
</style>

<template>
    <div class="mine">
        <div class="mine__hd">
            <div class="headUrl">
                <img :src="userInfo.headUrl" alt="">
            </div>
            <div class="content">
                <div class="nickname">{{userInfo.nickName}}</div>
                <div class="score">{{userInfo.score}}</div>
            </div>
        </div>
        <div class="mine__bd">
            <group v-for="(menu, menu_index) in menus" :key="menu_index">
                <cell
                    class="menu"
                    v-for="(item, index) in menu.list"
                    :key="index"
                    :title="item.title"
                    :value="item.linkValue"
                    :is-link="item.isLink"
                    @click.native="menuChange(item)"
                >
                    <div class="icon" slot="icon" style="">
                        <i :class="['iconfont', item.icon]" :style="{color: item.iconColor}"></i>
                    </div>
                </cell>

            </group>
        </div>
        <x-dialog
            v-model="wxewmPopup"
            :hide-on-blur="true"
            class="wxewmPopup"
        >
            <div class="content" @click="wxewmPopup = !wxewmPopup">
                <img width="100%" :src="userInfo.wx_ewm" alt="二维码加载失败">
            </div>
        </x-dialog>
    </div>
</template>

<script>
    import {TransferDomDirective as TransferDom, Cell, Group, XDialog} from 'vux'
    import DmLoading from '@/components/Dcomponents/DmLoading/index.vue'
    export default {
        directives: {
            TransferDom
        },
        data() {
            return {
                loading: true,
                wxewmPopup: false,
                // 用户信息
                userInfo: {
                    headUrl: window.YS_USER_AVATAR['46'],
                    nickName: window.YS_USER.type === 2 ? window.YS_CORP_USER.realname : window.YS_USER.nickname,
                    score: window.YS_USER.type === 2 ? window.YS_CORP.name : '个人理财师',
                    wx_ewm: window.YS_USER_AVATAR['wx_ewm']
                },
                // menus
                menus: [
                    {
                        list: [
                            {
                                id: 1,
                                title: '个人资料',
                                isLink: true,
                                linkValue: '',
                                icon: 'icon-profile',
                                iconColor: '#59c63b'
                            },
                            {
                                id: 2,
                                title: '微信二维码',
                                isLink: true,
                                linkValue: '',
                                icon: 'icon-qrcode',
                                iconColor: '#5ab3ec'
                            }
                        ]
                    },
                    {
                        list: [
                            {
                                id: 3,
                                title: '关于我们',
                                isLink: true,
                                linkValue: '',
                                icon: 'icon-creativefill',
                                iconColor: '#989898'
                            }
                        ]
                    }
                ]
            }
        },
        components: {
            Cell,
            Group,
            XDialog,
            DmLoading
        },
        computed: {},
        methods: {
            menuChange(item) {
                const {id} = item
                if (id === 1) {
                    this.$router.push({name: 'PersonalData'})
                }
                if (id === 2) {
//                    this.wxewmPopup = true
                    this.$router.push({name: 'UploadWxewm'})
                }
            }
        },
        created() {
        },
        mounted() {
            this.loading = false
        }
    }
</script>

