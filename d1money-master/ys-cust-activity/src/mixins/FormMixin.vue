<style scoped rel="stylesheet/less">

</style>
<script>
    import {
        querystring
    } from 'vux'

    export default {
        data() {
            return {}
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            formMixin_submit(ajaxUrl) {
                // 信息填写不完整
                const ISEMPTY = 0
                const ISNOVALID = 1
                // ajax请求异常(超时/ajaxUrl不存在)
                const AJAXERROR = 2
                return new Promise((resolve, reject) => {
                    let params = {}
                    for (let key in this.$refs) {
                        console.log(this.$refs[key])
                        console.log(this.$refs[key].valid)
                        console.log(this.$refs[key].currentValue === '')
                        if (this.$refs[key].currentValue === '') {
                            this.$vux.toast.text('请将信息填写完整', 'top')
                            this.$refs[key].focus()
                            reject({
                                code: ISEMPTY,
                                msg: '信息填写不完整'
                            })
                            return
                        } else {
                            if (!this.$refs[key].valid) {
                                this.$vux.toast.text(this.$refs[key].firstError, 'top')
                                this.$refs[key].focus()
                                reject({
                                    code: ISNOVALID,
                                    msg: '信息填写不完整'
                                })
                                return
                            }
                        }
                        if (this.$refs[key].name) {
                            params[this.$refs[key].name] = this.$refs[key].currentValue
                        }
                    }
                    console.log(params)
                    this.$vux.loading.show({
                        text: '导出中...'
                    })
                    this.$http.post('/agent/user/services/' + ajaxUrl, querystring.stringify(params))
                        .then(result => {
                            this.$vux.loading.hide()
                            if (result.data.code === 'SUCCESS') {
                                this.$vux.toast.show({
                                    type: 'success',
                                    text: '操作成功'
                                })
                                resolve(result)
                            } else {
                                console.error(`错误Code: ${result.data.code}, 错误信息: ${result.data.msg}`)
                                this.$vux.toast.show({
                                    type: 'cancel',
                                    text: result.data.msg
                                })
                                reject({
                                    code: result.data.code,
                                    msg: result.data.msg
                                })
                            }
                        })
                        .catch(error => {
                            console.log(`ajax异常 ${JSON.stringify(error)}`)
                            this.$vux.loading.hide()
                            this.$vux.toast.show({
                                type: 'cancel',
                                text: '请求超时'
                            })
                            reject({
                                code: AJAXERROR,
                                msg: '请求超时'
                            })
                        })
                })
            }
        }
    }
</script>
