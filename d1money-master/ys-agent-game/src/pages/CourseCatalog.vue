<style lang="less" rel="stylesheet/less" scoped="scoped">
    .courseCatalog{

        .courseCatalog__hd{
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            padding: 10px;
            background-color: #ffffff;
            .img{
                width:80px;
                height:80px;
                border-radius: 100%;
                overflow: hidden;
                margin-right: 20px;
                img{
                    width:100%;
                    height:100%;
                    object-fit: cover;
                }
            }
            .content{

                .title{
                    font-size: 16px;
                    font-weight: bold;
                }
                .desc{
                    font-size: 12px;
                }
            }
        }
        .courseCatalog__bd{
            padding: 40px;
            box-sizing: border-box;
        }
    }
</style>
<template>
    <div class="courseCatalog">
        <div class="courseCatalog__hd">
            <div class="img">
                <img src="http://demongao.github.io/img/production/4.jpg" alt="">
            </div>
            <div class="content">
                <div class="title">微信营销总监班课程</div>
                <div class="desc">哈哈哈大手大脚拉我打算都拿完了</div>
            </div>
        </div>
        <div class="courseCatalog__bd">
            <lock-step
                v-for="(i, index) in 5" :key="index"
                :link="{name: 'CourseDetail', params: {courseid: 1}}"
            >
                <div slot="desc">第{{i}}章节</div>
            </lock-step>
        </div>
    </div>
</template>

<script>
    import LockStep from './../components/step/LockStep.vue'
    export default {
        data() {
            return {}
        },
        components: {
            LockStep
        },
        computed: {},
        methods: {},
        mounted() {
        }
    }
</script>
