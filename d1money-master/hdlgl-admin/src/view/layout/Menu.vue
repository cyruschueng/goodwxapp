<style scoped lang="less" rel="stylesheet/less">
    .dmmenu {
        width: 100% !important;
        height: 100%;
    }
</style>
<template>
    <Menu class="dmmenu" :theme="theme3" :active-name="$route.name" @on-select="changeMenuItem">
        <MenuGroup title="活动量管理">
            <MenuItem name="Home">
                <Icon size="16" type="speedometer"></Icon>
                数据监控
            </MenuItem>
            <MenuItem name="VisitData">
                <Icon size="16" type="social-buffer"></Icon>
                拜访数据
            </MenuItem>
            <MenuItem name="VisitStatistics">
                <Icon type="pie-graph"></Icon>
                拜访统计
            </MenuItem>
        </MenuGroup>
    </Menu>
</template>
<script>
    export default {
        data() {
            return {
                theme3: 'light'
            }
        },
        methods: {
            changeMenuItem(key) {
                this.$router.push({name: key})
            }
        }
    }
</script>
