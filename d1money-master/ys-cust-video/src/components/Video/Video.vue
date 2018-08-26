<template>
    <div>
        <div id="id_test_video" :style="{width: width, height: height}"></div>
    </div>
</template>

<script>
    export default {
        props: {
            file_id: {
                type: String
            },
            app_id: {
                type: String
            },
            auto_play: {
                type: String,
                default: '0'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: 'auto'
            }
        },
        data() {
            return {}
        },
        components: {},
        computed: {},
        methods: {},
        mounted() {
            let options = {
                auto_play: this.auto_play,
                file_id: this.file_id,
                app_id: this.app_id,
                width: 1920,
                height: 1080,
                https: 1
            }
            // eslint-disable-next-line
            new window.qcVideo.Player('id_test_video', options)
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped="scoped">
</style>
