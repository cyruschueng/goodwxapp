<template>
    <div v-cloak class="addVisitTimeOther" :style="{height: screenHeight + 'px'}">
        <div class="addVisitTime__bd" :class="{'hideSpeechCode' : !isspecking}">
            <group class="customName" :gutter="0">
                <x-input title="客户姓名" :is-type="be2333" placeholder="请填写客户姓名" :debounce="1"></x-input>
            </group>

            <group class="position" :gutter="0">
                <x-input title="地理位置" :is-type="be2333" placeholder="请选择地理位置" :debounce="1"></x-input>
            </group>

            <group class="desc" title="拜访记录" :gutter="0">
                <textarea id="desc" v-model="value" @focus="onFocus()" @blur="onBlur()"
                          placeholder="请输入拜访记录"></textarea>
                <!--<x-textarea v-model="value" placeholder="请输入客户信息" autosize="true"> </x-textarea>-->
            </group>
            <group class="uploadImg" :gutter="0">
                <flexbox class="uploadImgFlexbox" wrap="wrap" :gutter="0">
                    <template v-for="(item, index) in uploadImg">
                        <flexbox-item :span="3"
                                      class="uploadImg__item"
                                      @click.native="show(index)">
                            <img :src="item.src" class="uploadImg__item__img">
                        </flexbox-item>
                    </template>

                    <template v-if="uploadImg.length !== 4">
                        <flexbox-item :span="3" class="uploadImg__item">
                            <!--<img src="./../assets/upload.png" alt="">-->
                            <div class="addIcon">
                                <i class="iconfont icon-jia"></i>
                            </div>
                        </flexbox-item>
                    </template>

                </flexbox>
            </group>
        </div>
        <div class="addVisitTime__speechCode">
            <div class="speechCode " :class="[{'recording' : isspecking} , {'transCoding' : istranscoding}]">
                <!--recording 录音中 transCoding 转码中  -->
                <div class="record one"></div>
                <div class="record two"></div>
                <div class="record three"></div>
                <div class="record four"></div>
                <div class="record five"></div>
                <div class="record six"></div>
                <div class="record seven"></div>
                <div class="record eight"></div>
                <div class="record nine"></div>
                <div class="record ten"></div>
            </div>
            <div class="time">
                00:05
            </div>
        </div>
        <div class="addVisitTime__ft">
            <div class="speechCodeBtn">
                <flexbox wrap="wrap" :gutter="0">
                    <template v-if="isspecking">
                        <flexbox-item class="btn" @click.native="speckfinish">
                            说完了
                        </flexbox-item>
                    </template>

                    <template v-else>
                        <flexbox-item class="btn"
                                      @click.native="!isspecking&&istranscoding ? '' : isspecking = !isspecking ">
                            <template v-if="!isspecking&&istranscoding">
                                <i class="iconfont icon-yuyin"></i> 转码中
                                <p class="istranscodingBox">
                                    <span class="istranscoding">...</span>
                                </p>
                            </template>
                            <template v-else>
                                <i class="iconfont icon-yuyin"></i> 录音
                            </template>
                        </flexbox-item>
                        <flexbox-item class="btn" @click.native="speckfinish"
                                      style="background-color:#68baf9; color: #ffffff;">
                            提交
                        </flexbox-item>
                    </template>
                </flexbox>
            </div>
        </div>

        <!--全图预览-->
        <div class="previewer" v-transfer-dom>
            <previewer :list="uploadImg" ref="previewer" :options="options">
                <template slot="button-before">
                    <span class="previewer-delete-icon-box">
                      <img src="../assets/previewer_delete_icon.png" width="22" height="22" class="previewer-delete-icon"
                           @click.prevent.stop="removeImg">
                    </span>
                </template>
            </previewer>
        </div>
    </div>
</template>

<script>
    import {XInput, Group, XButton, Cell, Flexbox, FlexboxItem, XImg, XTextarea, Previewer, TransferDom} from 'vux'
    export default{
        directives: {
            TransferDom
        },
        components: {
            XInput,
            Group,
            XButton,
            Cell,
            Flexbox,
            FlexboxItem,
            XImg,
            XTextarea,
            Previewer
        },
        data(){
            return {
                value: '客户是一位年轻的单身白领女性。目前对健康类疾病保险很有兴趣,也对今后可能用到的生育保险有一定的关注。洽谈中感觉成单可能一般',
                be2333: function (value) {
                    return {
                        valid: false,
                        msg: '不能为空'
                    }
                },
                uploadImg: [
                    {
                        src: 'https://ooo.0o0.ooo/2017/05/17/591c271ab71b1.jpg',
                        w: 800,
                        h: 400
                    },
                    {
                        src: 'https://ooo.0o0.ooo/2017/05/17/591c271acea7c.jpg'
                    },
                    {
                        src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
                    }
                ],
                options: {
                    getThumbBoundsFn (index) {
                        // find thumbnail element
                        let thumbnail = document.querySelectorAll('.uploadImg__item')[index]
                        // get window scroll Y
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                        // optionally get horizontal scroll
                        // get position of element relative to viewport
                        let rect = thumbnail.getBoundingClientRect()
                        // w = width
                        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                        // Good guide on how to get element coordinates:
                        // http://javascript.info/tutorial/coordinates
                    },
                    isClickableElement (el) {
                        return /previewer-delete-icon/.test(el.className)
                    }
                },
                speechCodePopup: true,
                // 当前屏幕的高度
                screenHeight: null,
                // 是否在录音
                isspecking: true,
                // 是否在转码
                istranscoding: false,
                // 录音时间
                speckTime: null
            }
        },
        computed: {},
        methods: {
            speckfinish(){
                let desc = document.getElementById('desc')
                desc.focus()
                this.isspecking = false
                this.istranscoding = true
                setTimeout(() => {
                    this.istranscoding = false
                }, 2000)
            },
            onFocus(e) {
                let cnt = 0
                setInterval(() => {
                    if (cnt < 3) {
                        cnt++
                    } else {
                        clearInterval()
                        return
                    }
                    document.body.scrollTop = document.body.scrollHeight
                }, 300)
            },
            onBlur(e) {
                clearInterval()
            },
//            查看图片
            show (index) {
                this.$refs.previewer.show(index)
            },
//            删除图片
            removeImg (){
                let _currentIndex = this.$refs.previewer.getCurrentIndex()
                this.uploadImg.splice(_currentIndex, 1)
                if (this.uploadImg.length === 0 ){
                    this.$refs.previewer.close()
                }
            }


        },
        mounted(){
            this.screenHeight = document.body.clientHeight
        }

    }

</script>

<style lang="less" rel="stylesheet/less">
    @styleColor: #68baf9;
    @bgColor: #f1f1f1;
    .addVisitTimeOther {
        position: relative;
        overflow: hidden;
        .addVisitTime__bd {
            &.hideSpeechCode {
                height: calc(~ "100% - 44px");
            }
            height: calc(~ "100% - 206px");
            background-color: @bgColor;
            .position {
                .weui-cells:before {
                    display: none;
                }
            }
            /*拜访记录*/
            .desc {
                @media screen and (min-width: 768px){
                    height: calc(~ "100% - 78px - 200px");
                }
                box-sizing: border-box;
                height: calc(~ "100% - 78px - 90px");
                background-color: #ffffff;
                .weui-cells {
                    box-sizing: border-box;
                    height: calc(~ "100% - 34px");
                    &:before {
                        display: none
                    }
                    textarea {
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                        outline: none;
                        border: none;
                        resize: none;
                        overflow-y: auto;
                        color: #666666;
                        padding: 10px 15px;
                        font-size: 17px;
                        line-height: 1.41176471;
                    }
                }
                /*删除底部横线*/
                .weui-cells.vux-no-group-title {
                    height: 100%;
                    &:after, &:before {
                        display: none;
                    }
                }
                /*修改拜访记录标题样式*/
                .weui-cells__title {
                    color: #000;
                    width: 5em;
                    line-height: 1.41176471;
                    font-size: 17px;
                    word-wrap: break-word;
                    word-break: break-all;
                    padding: 10px 15px 0;
                    margin: 0;

                }
            }
            /*上传图片*/
            .uploadImg {
                @media screen and (min-width: 768px){
                    height: 200px;
                }
                box-sizing: border-box;
                background-color: @bgColor;
                height: 90px;
                padding: 15px 0;
                overflow: hidden;
                /*display: flex;*/
                /*align-items: center;*/

                .weui-cells.vux-no-group-title {
                    height:100%;
                    padding-right: 15px;
                    background-color: @bgColor;
                    &:after, &:before {
                        display: none;
                    }
                    .uploadImgFlexbox{
                        height:100%;
                    }
                }
                .uploadImg__item {
                    width:100%;
                    height:100%;
                    align-items: center;
                    padding-left: 15px;
                    box-sizing: border-box;
                    img {
                        width: 100%;
                        height:100%;
                        object-fit: cover;
                    }
                    .addIcon{
                        height: 100%;
                        width:60px ;
                        height: 60px;
                        text-align: center;
                        line-height: 60px;
                        border:1px solid #aaaaaa;
                        box-sizing: border-box;
                        i.iconfont{
                            font-size:40px;
                            color: #aaaaaa;
                        }
                        @media screen and (min-width: 768px){
                            height: 170px;
                            width: 170px;
                            line-height: 170px;
                            i.iconfont{
                                font-size: 140px;
                                color: #aaaaaa;
                            }
                        }
                    }
                }
            }
        }
        .addVisitTime__speechCode {
            height:162px;
            .speechCode {
                box-sizing: border-box;
                height: 132px;
                width: 182px;
                padding: 30px 0 20px;
                margin: 0 auto;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .ten {
                    width: 6px;
                    margin-left: 10px;
                    border-radius: 50px;
                    background-color: @styleColor;
                    vertical-align: middle;
                    display: inline-block;
                }
                .record {
                    transform: translateZ(0);
                    height: 6px;
                }
                &.recording {
                    .record {
                        height: 100%;
                    }
                    .one {
                        animation: record .65s infinite 0.1s;
                        -webkit-animation: record 1.1s infinite 0.1s;
                    }
                    .two {
                        animation: record 1.1s infinite 0.2s;
                        -webkit-animation: record 1.1s infinite 0.2s;
                    }
                    .three {
                        animation: record 1.1s infinite 0.3s;
                        -webkit-animation: record 1.1s infinite 0.3s;
                    }
                    .four {
                        animation: record 1.1s infinite 0.4s;
                        -webkit-animation: record 1.1s infinite 0.4s;
                    }
                    .five {
                        animation: record 1.1s infinite 0.5s;
                        -webkit-animation: record 1.1s infinite 0.5s;
                    }
                    .six {
                        animation: record 1.1s infinite 0.6s;
                        -webkit-animation: record 1.1s infinite 0.6s;
                    }
                    .seven {
                        animation: record 1.1s infinite 0.7s;
                        -webkit-animation: record 1.1s infinite 0.7s;
                    }
                    .eight {
                        animation: record 1.1s infinite 0.8s;
                        -webkit-animation: record 1.1s infinite 0.8s;
                    }
                    .nine {
                        animation: record 1.1s infinite 0.9s;
                        -webkit-animation: record 1.1s infinite 0.9s;
                    }
                    .ten {
                        animation: record 1.1s infinite 1.0s;
                        -webkit-animation: record 1.1s infinite 1.0s;
                    }
                }

                &.transCoding {
                    .record {
                        height: 10px;
                    }
                    .one {
                        animation: transCoding .65s infinite 0.1s;
                        -webkit-animation: transCoding 1.1s infinite 0.1s;
                    }
                    .two {
                        animation: transCoding 1.1s infinite 0.2s;
                        -webkit-animation: transCoding 1.1s infinite 0.2s;
                    }
                    .three {
                        animation: transCoding 1.1s infinite 0.3s;
                        -webkit-animation: transCoding 1.1s infinite 0.3s;
                    }
                    .four {
                        animation: transCoding 1.1s infinite 0.4s;
                        -webkit-animation: transCoding 1.1s infinite 0.4s;
                    }
                    .five {
                        animation: transCoding 1.1s infinite 0.5s;
                        -webkit-animation: transCoding 1.1s infinite 0.5s;
                    }
                    .six {
                        animation: transCoding 1.1s infinite 0.6s;
                        -webkit-animation: transCoding 1.1s infinite 0.6s;
                    }
                    .seven {
                        animation: transCoding 1.1s infinite 0.7s;
                        -webkit-animation: transCoding 1.1s infinite 0.7s;
                    }
                    .eight {
                        animation: transCoding 1.1s infinite 0.8s;
                        -webkit-animation: transCoding 1.1s infinite 0.8s;
                    }
                    .nine {
                        animation: transCoding 1.1s infinite 0.9s;
                        -webkit-animation: transCoding 1.1s infinite 0.9s;
                    }
                    .ten {
                        animation: transCoding 1.1s infinite 1.0s;
                        -webkit-animation: transCoding 1.1s infinite 1.0s;
                    }
                }

            }
            .time {
                height: 30px;
                line-height: 20px;
                text-align: center;
                color: #969696;
            }
        }
        .addVisitTime__ft {
            height:44px;
            /*按钮*/
            .speechCodeBtn {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: #fbf9ff;
                .btn {
                    height: 44px;
                    line-height: 44px;
                    border-top: 1px solid @styleColor;
                    text-align: center;
                    font-size: 16px;
                    border-left: 1px solid @styleColor;
                    box-sizing: border-box;
                    color: @styleColor;
                    &:first-child {
                        border-left: none;
                    }
                    i.iconfont {
                        font-size: 20px;
                    }
                    .istranscodingBox {
                        display: inline-block;
                        width: 26px;
                        letter-spacing: 3px;
                        height: 44px;
                        line-height: 44px;
                        position: relative;
                        .istranscoding {
                            vertical-align: bottom;;
                            display: inline-block;
                            font-size: 20px;
                            width: 26px;
                            overflow: hidden;

                            position: relative;
                            &:after {
                                content: '';
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background-color: #fbf9ff;
                                z-index: 9999;
                                animation: istranscoding 1s steps(3) infinite;
                            }
                        }
                    }

                }
            }
        }
    }
    .previewer{
        .previewer-delete-icon-box{
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 44px;
            height: 44px;
            /*line-height: 22px;*/
            padding:11px;
            text-align: center;
            -webkit-background-size:100% 100%;
            background-size:100% 100%;
        }
    }
    .keyframes (@name, @frames) {
        @-webkit-keyframes @name { @frames();
        }
        @-moz-keyframes @name { @frames();
        }
        @-ms-keyframes @name { @frames();
        }
        @-o-keyframes @name { @frames();
        }
        @keyframes @name { @frames();
        }
    }

    /*转码中 样式*/
    .keyframes(transCoding, { 0% {
        transform: rotateX(0deg);
    } 20% {
          transform: rotateX(40deg);
      } 50% {

            transform: rotateX(60deg);
        } 90% {

              transform: rotateX(70deg);
          } 100% {

                transform: rotateX(0deg);
            } });

    /*录音样式*/
    .keyframes(record, { 0% {
        transform: rotateX(0deg);
    } 20% {
          transform: rotateX(45deg);
      } 60% {

            transform: rotateX(90deg);
        } 80% {

              transform: rotateX(45deg);
          } 100% {

                transform: rotateX(0deg);
            } });

    /*转码中动画样式*/
    .keyframes(istranscoding, { 0% {
        transform: translateX(0)
    } 33.33% {
          transform: translateX(13px)
      } 66.66% {
            transform: translateX(26px)
        } });
    [v-cloak] {
        display: none
    }
</style>
