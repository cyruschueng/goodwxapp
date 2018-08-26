<style lang="less" rel="stylesheet/less" scoped="scoped">
    .uploadUsername{
        padding: 20px 10px 10px;
        box-sizing: border-box;
        .dmInput{
            position: relative;
            .dmLabel{
                &.hide{
                    display: none;
                }
            }
            .forminput{
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                input{
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
                &:before{
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left:0;
                    right:0;
                    border-bottom:1px solid #4aa1f0;
                }
                .btn{
                    display: inline-block;
                    background-color: #4aa1f0;
                    padding:0 10px;
                    line-height: 34px;
                    color: #ffffff;
                    border-radius: 5px 5px 0 0;
                    font-size: 12px;
                }
            }
            .desc{
                color: #969696;
                padding: 10px;
                font-size: 14px;
            }
        }
    }
</style>
<template>
    <div class="uploadUsername">
        <div class="dmInput">
            <span class="dmLabel hide">姓名</span>
            <div class="forminput">
                <input type="text" v-model="nickname" placeholder="" ref="nickname">
                <a href="javascript:;" class="btn" @click="update">保 存</a>
            </div>
            <p class="desc">好名字可以让你的朋友更容易记住你。</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                nickname: window.YS_USER.type === 2 ? window.YS_CORP_USER.realname : window.YS_USER.nickname
            }
        },
        components: {},
        computed: {},
        methods: {
            update() {
                if (this.nickname.replace(/^\s+|\s+$/g, '') === ''){
                    this.$vux.toast.text('用户昵称不能为空!', 'center')
                }
                const _this = this
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/user/services/updateUser',
                        data: {
                            nickname: this.nickname
                        },
                        isloadding: true,
                        tips: true
                    }).then(res => {
                        this.$vux.toast.show({
                            text: '保存成功',
                            time: 500,
                            onHide() {
                                window.YS_USER.type === 2 ? window.YS_CORP_USER.realname = _this.nickname : window.YS_USER.nickname = _this.nickname
                                _this.$router.go(-1)
                                resolve(res)
                            }
                        })
                    })
                })
            }
        },
        mounted() {
            this.$refs.nickname.focus()
        }
    }
</script>
