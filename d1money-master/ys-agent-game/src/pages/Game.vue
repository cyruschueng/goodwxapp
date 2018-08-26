<template>
    <div>
        <grid :cols="3">
            <grid-item
                label="Grid"
                v-for="(item, index) in games" :key="index"
                style="background-color: #ffffff"
                :link="item.link"
            >
                <span slot="label">{{item.title}}</span>
            </grid-item>
        </grid>
    </div>
</template>

<script>
    import { Grid, GridItem } from 'vux'
    export default {
        data() {
            return {
                games: [
                    {
                        title: '前世今生',
                        link: {name: 'QSJS'}
                    },
                    {
                        title: '吉凶祸福'
                    }
                ]
            }
        },
        components: {
            Grid,
            GridItem
        },
        computed: {},
        methods: {},
        mounted() {
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped="scoped">
</style>
