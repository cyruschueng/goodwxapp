<template>
    <input type="file" style="display: none;" :id="'img-upload-'+ modelName" accept="image/*" @change="uploadImg($event)"/>
</template>

<script>
    export default {
        name: 'image-html5-upload',
        props: {
            modelName: {
                type: String,
                default: 'undefined'
            },
            imgNumLimit: {
                type: Number,
                default: 1
            }
        },
        components: {},
        computed: {},
        methods: {
            uploadImg (e) {
                // 上传图片
                // this.option.img
                this.$vux.loading.show({
                    text: '图片加载中...'
                })
                const _this = this
                let file = e.target.files[0]
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                    return false
                }
                let reader = new FileReader()
                reader.onload = (e) => {
                    let data = ''
                    if (typeof e.target.result === 'object') {
                        // 把Array Buffer转化为blob 如果是base64不需要
                        data = window.URL.createObjectURL(new Blob([e.target.result]))
                    } else {
                        data = e.target.result
                    }
                    this.$vux.loading.hide()
                    _this.$emit('changeImg', data, _this.modelName)
                }
                // 转化为base64
                // reader.readAsDataURL(file)
                // 转化为blob
                reader.readAsArrayBuffer(file)
            }
        },
        mounted() {
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped="scoped">
</style>
