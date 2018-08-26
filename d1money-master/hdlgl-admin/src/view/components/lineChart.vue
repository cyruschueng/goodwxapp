<template>
    <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart">
    </div>
</template>
<style scoped lang="less">
    .yourClassName {
        div {
            width: 100%;
            height: 100%;
        }
    }
</style>
<script>
    import echarts from 'echarts'

    export default {
        props: {
            className: {
                type: String,
                default: 'yourClassName'
            },
            id: {
                type: String,
                default: 'yourID'
            },
            width: {
                type: String,
                default: '500px'
            },
            height: {
                type: String,
                default: '500px'
            },
            options: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                chart: null
            }
        },
        watch: {
            options(val, oldVal) {
//        console.log('new: %s, old: %s', val, oldVal)
            }
        },
        mounted() {
            this.initChart()
            this.$on('test', (msg) => {
//        console.log(msg)
            })
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$refs.myEchart)
//        console.log(this.options)
                // 把配置和数据放这里
                this.chart.setOption(this.options)
                // 图表响应大小的关键,重绘
                window.addEventListener('resize', this.chart.resize)
            },
            changeDate() {
                if (!this.chart) {
                    return
                }
                console.log(this.options)
                this.chart.setOption(this.options, true)
            }
        }
    }
</script>
