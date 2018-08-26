<style lang="less" rel="stylesheet/less" scoped="scoped">
    .uploadUsername {
        padding: 20px 10px 10px;
        box-sizing: border-box;
        .dmInput {
            position: relative;
            .dmLabel {
                &.hide {
                    display: none;
                }
            }
            .forminput {
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                input {
                    flex: 1;
                    background: transparent;
                    outline: none;
                    border: none;
                    height: 24px;
                    line-height: 24px;
                    font-size: 16px;
                    padding: 5px;
                    font-weight: 300;
                    color: #333;
                }
                &:before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    border-bottom: 1px solid #4aa1f0;
                }
                .btn {
                    display: inline-block;
                    background-color: #4aa1f0;
                    padding: 0 10px;
                    line-height: 34px;
                    color: #ffffff;
                    border-radius: 5px 5px 0 0;
                    font-size: 12px;
                }
            }
            .desc {
                color: #969696;
                padding: 10px;
                font-size: 14px;
            }
        }
        .submit{
            width:40%;
            margin: 30px auto 0;
            .btn{
                background-color: #4aa1f0;
                color: #ffffff;
                font-size: 14px;
            }
        }
    }
</style>
<template>
    <div class="uploadUsername">
        <div class="dmInput">
            <span class="dmLabel hide">手机号</span>
            <div class="forminput">
                <input type="number" v-model="username" placeholder="" ref="username">
            </div>
            <p class="desc">若您常用手机号已更换请及时更改。</p>
        </div>
        <div class="dmInput">
            <span class="dmLabel hide">验证码</span>
            <div class="forminput">
                <input type="number" v-model="checkcode" placeholder="" ref="checkcode">
                <a href="javascript:;" class="btn" @click="sendCode">
                    发送验证码
                    <template v-if="codeTime!==0">
                        (<countdown
                        v-model="codeTime"
                        @on-finish="codeTime=0"
                        v-show="codeTime!==0"
                    ></countdown>)
                    </template>
                </a>
            </div>
        </div>
        <div class="submit">
            <x-button class="btn" type="default" @click.native="update">保 存</x-button>
        </div>
    </div>
</template>

<script>
    import {Countdown, XButton} from 'vux'
    export default {
        data() {
            return {
                inputFocusIndex: 0,
                username: window.YS_USER.username,
                checkcode: null,
                // 发送验证码等待时间
                codeTime: 0
            }
        },
        components: {
            Countdown,
            XButton
        },
        computed: {},
        methods: {
            sendCode(){
                if (this.codeTime !== 0) {
                    this.$vux.toast.text(`还有${this.codeTime}秒才能再次发送验证码!`)
                    return
                }
                if (!this.username || this.username.replace(/^\s+|\s+$/g, '') === '') {
                    this.$vux.toast.text('手机号不能为空!', 'center')
                    return
                }
                if (!(/^1\d{2,10}$/.test(this.username))){
                    this.$vux.toast.text('手机号格式不正确!', 'center')
                    return
                }
                const _this = this
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/user/services/sendVerificationCode',
                        data: {
                            username: this.username
                        },
                        isloadding: true,
                        tips: true
                    }).then(res => {
                        this.$vux.toast.show({
                            text: '短信发送成功',
                            time: 500,
                            onHide(){
                                resolve(res)
                            }
                        })
                        _this.$refs.checkcode.focus()
                        this.codeTime = 60
                    })
                })
            },
            update() {
                if (!this.username || this.username.replace(/^\s+|\s+$/g, '') === '') {
                    this.$vux.toast.text('手机号不能为空!', 'center')
                    return
                }
                if (!(/^1\d{2,10}$/.test(this.username))){
                    this.$vux.toast.text('手机号格式不正确!', 'center')
                    return
                }
                if (!this.checkcode || this.checkcode.replace(/^\s+|\s+$/g, '') === ''){
                    this.$vux.toast.text('验证码不能为空!', 'center')
                    return
                }
                const _this = this
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/user/services/updateUser',
                        data: {
                            username: this.username,
                            checkcode: this.checkcode
                        },
                        isloadding: true,
                        tips: true
                    }).then(res => {
                        this.$vux.toast.show({
                            text: '保存成功',
                            time: 500,
                            onHide() {
                                window.YS_USER.username = _this.username
                                _this.$router.go(-1)
                                resolve(res)
                            }
                        })
                    })
                })
            }
        },
        mounted() {
            this.$refs.username.focus()
        }
    }
</script>
