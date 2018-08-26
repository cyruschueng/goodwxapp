<template>

</template>

<script>
    import { querystring } from 'vux'
    export default {
        data() {
            return {}
        },
        components: {},
        computed: {},
        methods: {
            validate(formRef){
                const params = {}
                const childrensInput = this.$refs[formRef].querySelectorAll('input')
                for (let i = 0, len = childrensInput.length; i < len; i++) {
                    const item = childrensInput[i]
                    const name = item.name
                    const value = item.currentValue === undefined ? item.value : item.currentValue
                    const isRequire = item.required
                    // 表单检验是否通过
                    const isValid = item.valid
                    const noValueToast = item.placeholder
                    if (isRequire) {
                        // 判断是否必填
                        if (!value || value.replace(/^\s+|\s+$/g, '') === '') {
                            // 是否为空
                            this.$vux.toast.text(noValueToast, 'top')
                            item.focus()
                            return
                        }
                        if (!isValid) {
                            // 是否通过表单检验
                            const firstError = item.firstError
                            this.$vux.toast.text(firstError, 'top')
                            item.focus()
                            return
                        }
                    }
                    if (value !== null && value !== '' ) params[name] = value
                }

                const childrensSelect = this.$refs[formRef].querySelectorAll('select')
                for (let i = 0, len = childrensSelect.length; i < len; i++) {
                    const item = childrensSelect[i]
                    const name = item.name
                    const value = item.value ? item.value : null
                    const isRequire = item.required
                    // 表单检验是否通过
                    const noValueToast = item.placeholder
                    if (isRequire) {
                        // 判断是否必填
                        if (!value || value.replace(/^\s+|\s+$/g, '') === '') {
                            // 是否为空
                            this.$vux.toast.text(noValueToast, 'top')
                            item.focus()
                            return
                        }
                    }
                    if (value !== null && value !== 'null' && value !== '') params[name] = value
                }
                return params
            },
            formMixin_submit({url, formRef, appendData}){
                // ajax请求异常(超时/ajaxUrl不存在)
                const AJAXERROR = 2
                const params = this.validate(formRef)

                const datas = Object.assign(appendData, params)
                return new Promise((resolve, reject) => {
                    this.$http.post(url, querystring.stringify(datas))
                        .then(result => {
                            this.$vux.loading.hide()
                            if (result.data.code === 'SUCCESS') {
                                this.$vux.toast.show({
                                    type: 'success',
                                    text: '修改成功'
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
        },
        mounted() {
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped="scoped">
</style>
