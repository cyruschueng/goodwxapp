<style lang="less" rel="stylesheet/less" scoped="scoped">
    .tabberScoller {
        width: 100%;
        overflow: hidden;
        position: relative;
        font-size: 14px;
        background-color: #ffffff;
        &:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            border-bottom: 1px solid #f2f2f2;
        }
        .tabbar {
            position: relative;
            font-size: 14px;
            /*overflow: hidden;*/
            /*transform-origin: 0px 0px 0px;*/
            /*transition: none;*/
            /*transform: scale(1, 1);*/
            .tabbar-item {
                display: inline-block;
                box-sizing: border-box;
                width: 5em;
                height: 44px;
                line-height: 44px;
                text-align: center;
                font-size: 14px;
                color: #666;
                &.active {
                    color: rgb(74, 161, 240);
                }
            }
        }
        .tabbar-bottomline {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 5em;
            height: 1px;
            transform: translateX(0);
            transition: all 0.15s cubic-bezier(0.35, 0, 0.25, 1) 0.045s, all 0.15s cubic-bezier(0.35, 0, 0.25, 1);
        }
    }
</style>
<template>
    <div class="tabberScoller" ref="tabberScoller">
        <ul class="tabbar"
            :style="{width: 5 * list.length +'em'}"
        >
            <li
                v-for="(item, index) in list" :key="index"
                :class="['tabbar-item']"
                :style="{color: index === currentIndex ? activeColor : ''}"
                @click="changeIndex(index)"
            >
                {{item.name}}
            </li>
            <div
                class="tabbar-bottomline"
                :style="{backgroundColor: activeColor, transform: 'translateX(' + (currentIndex * 70) + 'px)'}"
            ></div>
        </ul>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    export default {
        props: {
            list: {
                type: Array,
                default: []
            },
            currentIndex: {
                type: Number,
                default: 0
            },
            activeColor: {
                type: String,
                default: '#4aa1f0'
            }
        },
        data(){
            return {
                scroll: null
            }
        },
        created() {

        },
        mounted(){
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
            _initScroll(){
                this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.tabberScoller, {
                        probeType: 0,
                        click: true,
                        scrollX: true,
                        scrollY: false,
                        speed: 0
                    })
                })
            },
            changeIndex(index) {
                this.$emit('change', index)
            }
        }
    }
</script>
