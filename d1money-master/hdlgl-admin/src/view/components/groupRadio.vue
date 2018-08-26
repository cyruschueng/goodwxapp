<style scoped rel="stylesheet/less">

</style>
<template>
    <!--按钮组-->
    <div class="groupRadio">
        <template v-for="(item, index) in list">
            <Tag v-if="currentIndex===index" type="dot" :color="activeColor"
                 @click.native="changeRadio(index)">{{item.name}}
            </Tag>
            <Tag v-else="currentIndex===index" type="dot" :color="defaultColor"
                 @click.native="changeRadio(index)">{{item.name}}
            </Tag>
        </template>
    </div>
</template>
<script>
    export default {
        props: {
            id: {
                type: Number,
                default: 0
            },
            list: {
                type: Array,
                default: []
            },
            defaultColor: {
                type: String,
                default: 'default'
            },
            activeColor: {
                type: String,
                default: 'blue'
            }
        },
        data() {
            return {
                currentIndex: 0
            }
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            changeRadio(index) {
                this.currentIndex = index
                this.$emit('groupRadioChange', index, this.id)
            }
        }
    }
</script>
