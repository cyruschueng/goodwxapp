<style scoped rel="stylesheet/less" lang="less">
    .VerificationCode {
        margin: 0;
        height: 46px;
        box-sizing: border-box;
        display: flex;
        background-color: #fff;
        .title{
            height: 46px;
            line-height: 46px;
            padding: 0 15px;
        }
        input {
            height: 46px;
            line-height: 46px;
            box-sizing: border-box;
            flex: 1;
            outline: none;
            border: none;
        }
        .code {
            box-sizing: border-box;
            width: 80px;
            height: 100%;
        }
    }
</style>
<template>
    <div class="VerificationCode">
        <p class="title">验证码</p>
        <input v-model="code" type="text" placeholder="请输入验证码"/>
        <p class="code" ref="code">
            <canvas ref="canvasCode" width="80px" height="46px"></canvas>
        </p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                code: ''
            }
        },
        mounted() {
            // this.$refs.canvasCode
            this.drawPic()
        },
        beforeDestroy() {

        },
        methods: {
            drawPic() {
//                this.$el.querySelector('#')
                let canvas = this.$refs.canvasCode
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
