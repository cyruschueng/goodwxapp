<style scoped lang="less" rel="stylesheet/less">
    @import './../styles/common.css';

    .container {
        position: absolute;
        top: 0;
        width: 100%;
        min-width: 1000px;
        padding-top: 60px;
        height: 100%;

        .menu {
            height: 100%;
        }
        .content {
            padding: 20px;
            height: 100%;
            overflow-y: auto;
        }
    }
</style>
<template>
    <div>
        <dm-header></dm-header>
        <Row class="container">
            <Col class="menu" span="3">
                <dm-menu></dm-menu>
            </Col>
            <Col class="content" span="21">
            <Breadcrumb style="margin-bottom: 20px">
                <BreadcrumbItem href="/">
                    <Icon type="clipboard"></Icon>
                    活动量管理
                </BreadcrumbItem>
                <BreadcrumbItem href="/">
                    <Icon :type="$route.meta.icon"></Icon>
                    {{this.$route.meta.title}}
                </BreadcrumbItem>
            </Breadcrumb>
            <router-view></router-view>
            </Col>
        </Row>
    </div>
</template>
<script>
    import dmMenu from '@/view/layout/Menu.vue'
    import dmHeader from '@/view/layout/Header.vue'

    export default {
        name: 'index',
        components: {
            'dm-menu': dmMenu,
            'dm-header': dmHeader
        },
        data() {
            return {}
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {}
    }
</script>
