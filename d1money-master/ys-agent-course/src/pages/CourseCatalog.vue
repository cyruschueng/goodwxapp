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
                <img :src="detail && detail.imgsrc" :alt="detail && detail.title">
            </div>
            <div class="content">
                <div class="title">{{detail && detail.title}}</div>
                <div class="desc">{{detail && detail.introduce}}</div>
            </div>
        </div>
        <div class="courseCatalog__bd">
            <lock-step
                v-for="(item, index) in list" :key="index"
                :link="{name: 'CourseDetail', params: {curriculumid: curriculumid, lessonid: item.id}}"
                :img="item.imgsrc"
            >
                <div slot="desc">第{{index+1}}课时: {{item.title}}</div>
            </lock-step>
        </div>
    </div>
</template>

<script>
    import LockStep from './../components/step/LockStep.vue'
    export default {
        props: ['curriculumid'],
        data() {
            return {
                list: [],
                detail: null
            }
        },
        components: {
            LockStep
        },
        computed: {},
        methods: {
            ajaxLoadCurriculumLessonList(){
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/curriculum/services/loadCurriculumLessonList',
                        data: {
                            curriculumid: this.curriculumid
                        },
                        tips: true
                    }).then(result => {
                        this.list = result.list
                        this.detail = result.curriculum
                        document.title = result.curriculum.title
                    }).catch((code, msg) => {
                        reject(code, msg)
                    })
                })
            }
        },
        created(){
            this.$wechat.ready(() => {
                // 隐藏所有非基础按钮接口
                this.$wechat.hideAllNonBaseMenuItem()
            })
            this.ajaxLoadCurriculumLessonList()
        },
        mounted() {}
    }
</script>
