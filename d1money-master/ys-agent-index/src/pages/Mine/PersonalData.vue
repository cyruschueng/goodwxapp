<style lang="less" rel="stylesheet/less" scoped="scoped">
    .personalData{
        height: 100%;
        background-color: #fbf9fe;
        position: relative;
        overflow: hidden;
        .info{
            .value{
                margin-right: 10px;
                font-size: 14px;
            }
            &.avatar{
                img{
                    border-radius: 4px;
                    width: 46px;
                    height: 46px;
                    object-fit: cover;
                }
            }
        }
    }
</style>
<template>
    <div class="personalData">
        <group>
            <cell
                class="info avatar"
                title="头像"
                :is-link="true"
                :link="{name: 'UploadAvatar'}"
            >
                <div class="value">
                    <img :src="userImg" alt="暂无头像">
                </div>
            </cell>
            <cell class="info" title="名字" :is-link="true" :link="{name: 'UploadNickname'}">
                <div class="value">
                    {{nickname}}
                </div>
            </cell>
            <cell class="info" title="手机号码" :is-link="true" :link="{name: 'UploadPhone'}">
                <div class="value">
                    {{username}}
                </div>
            </cell>
        </group>
    </div>
</template>

<script>
    import { Cell, Group } from 'vux'
    import DmLoading from '@/components/Dcomponents/DmLoading/index.vue'
    export default {
        data() {
            return {
                loading: true,
                userImg: window.YS_USER_AVATAR[46],
                nickname: window.YS_USER.type === 2 ? window.YS_CORP_USER.realname : window.YS_USER.nickname,
                username: window.YS_USER.username
            }
        },
        components: {
            Cell,
            Group,
            DmLoading
        },
        computed: {},
        methods: {},
        mounted() {
            this.loading = false
        }
    }
</script>
