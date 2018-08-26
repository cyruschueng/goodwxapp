<style scoped rel="stylesheet/less">

</style>
<template>
    <div>
        <group :gutter="0">

            <x-input
                ref="username"
                name="username"
                title="username"
                v-model="username"
                type="text"
                placeholder="请输入接收邮箱地址"
                :required="true"
                @on-enter="nextFocus('password')"
            ></x-input>
            <x-input
                ref="password"
                name="password"
                title="password"
                v-model="password"
                type="text"
                placeholder="请输入接收邮箱地址"
                :required="true"
                @on-enter="nextFocus('code')"
            ></x-input>
            <!--<x-input-->
                <!--:required="true"-->
                <!--ref="code"-->
                <!--class="weui-cell_vcode"-->
                <!--title="验<span style='margin-left:.5em'></span>证<span style='margin-left:.5em'></span>码"-->
                <!--label-width="5em"-->
                <!--v-model="username"-->
                <!--type="text"-->
                <!--placeholder="请输入验证码"-->
                <!--@on-enter="submit"-->
            <!--&gt;-->
                <!--<canvas @click="drawPic" slot="right" class="weui-vcode-img" id="canvasCode" width="80px"-->
                        <!--height="46px"></canvas>-->
            <!--</x-input>-->
        </group>
        <div style="padding: 20px 15px 10px;">
            <h5 style="font-weight: normal;color: #969696;font-size: 12px;">请求结果</h5>
            <p style="font-size:12px;color: #aaaaaa;">
                {{result}}<br/>
            </p>
        </div>
        <div style="padding: 10px 15px;">
            <x-button type="confirm" :disabled="submitLoadding" :show-loading="submitLoadding" @click.native="submit">开始导出</x-button>
        </div>

    </div>
</template>
<script>
    import {XInput, Group, XButton} from 'vux'
    import FormMixin from '@/mixins/FormMixin.vue'

    export default {
        mixins: [FormMixin],
        components: {
            XInput,
            Group,
            XButton
        },
        data() {
            return {
                // 邮箱
                username: '',
                password: '',
                submitLoadding: false,
                result: null
            }
        },
        mounted() {
            this.drawPic()
        },
        beforeDestroy() {

        },
        methods: {
            // 绘制验证码
            drawPic() {
                this.code = ''
                this.$refs.code.reset()
                let canvas = this.$el.querySelector('#canvasCode')
                let width = 80
                let height = 46
                let ctx = canvas.getContext('2d')
                ctx.textBaseline = 'bottom'

//                ctx.fillStyle = randomColor(180, 240)
                ctx.fillStyle = randomColor(255, 255)
//                ctx.fillStyle = '#fbf9fe'
                ctx.fillRect(0, 0, width, height)
                let str = 'ABCEFGHJKLMNPQRSTWXY123456789'
                for (let i = 0; i < 4; i++) {
                    let txt = str[randomNum(0, str.length)]
                    this.code += txt
                    ctx.fillStyle = randomColor(50, 160)
                    ctx.font = randomNum(20, 35) + 'px SimHei'
                    let x = 10 + i * 15
                    let y = randomNum(35, 44)
                    let deg = randomNum(-15, 15)

                    ctx.translate(x, y)
                    ctx.rotate(deg * Math.PI / 180)
                    ctx.fillText(txt, 0, 0)
                    ctx.rotate(-deg * Math.PI / 180)
                    ctx.translate(-x, -y)
                }

                for (let i = 0; i < 6; i++) {
                    ctx.strokeStyle = randomColor(40, 180)
                    ctx.beginPath()
                    ctx.moveTo(randomNum(0, width), randomNum(0, height))
                    ctx.lineTo(randomNum(0, width), randomNum(0, height))
                    ctx.stroke()
                }

                for (let i = 0; i < 40; i++) {
                    ctx.fillStyle = randomColor(0, 255)
                    ctx.beginPath()
                    ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI)
                    ctx.fill()
                }
            },
            // 调到下一个input
            nextFocus(ref) {
                this.$refs[ref].focus()
            },
            submit() {
//                this.submitLoadding = true
                this.formMixin_submit('doRegister')
                    .then((result) => {
//                        this.submitLoadding = false
                        this.result = result
                        this.$refs.email.reset()
                        this.$refs.code.reset()
                        this.$router.push({name: 'Home'})
                        console.log('success')
                    })
                    .catch((err) => {
//                        this.submitLoadding = false
                        this.result = err
                        console.log(`code:${err.code} \n msg:${err.msg}`)
                    })
            }
        }
    }

    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    function randomColor(min, max) {
        let r = randomNum(min, max)
        let g = randomNum(min, max)
        let b = randomNum(min, max)
        return 'rgb(' + r + ',' + g + ',' + b + ')'
    }
</script>
