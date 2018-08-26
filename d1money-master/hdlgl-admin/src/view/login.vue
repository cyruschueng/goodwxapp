<style rel="stylesheet/less" lang="less">
    .loginPage {
        width: 100%;
        height: 100%;
        background-image: url("../assets/loginBg.jpg");
        background-size: 100% 100%;
        .userlogin {
            position: absolute;
            left: 50%;
            top: 50%;
            padding: 16px 20px 20px;
            width: 820px;
            height: 404px;
            box-sizing: border-box;
            transform: translate(-50%, -50%);
            background-color: #ffffff;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            /*标题*/
            .title {
                font-size: 26px;
                color: #333333;
                font-weight: normal;
                text-align: center;
                margin-bottom: 7px;
                margin-top: -2px;
            }
            /*登录*/
            .from {
                height: calc(~"100% - 110px");
                margin-top: 5px;
                /*用户名密码登录*/
                .input {
                    height: 40px;
                    .ivu-input {
                        outline: none;
                        height: 40px !important;
                    }
                    margin-bottom: 20px;
                }
                .user, .ep {
                    padding: 30px 50px;
                    padding-bottom: 0;
                    height: 100%;
                    position: relative;
                    button {
                        position: absolute;
                        bottom: 0;
                        width: calc(~"100% - 80px");
                    }
                }
                .ep {
                    .imgContainer {
                        padding: 0 50px;
                        img {
                            width: 210px;
                            height: 114px;
                            margin: 0 auto;
                        }
                        .icon-qiyeweixintubiao {
                            font-size: 14px;
                        }
                    }
                }
                .line {
                    background-image: url("./../assets/line.jpg");
                    background-position: center center;
                    background-repeat: no-repeat;
                    height: 100%;
                }
            }
        }
    }
</style>
<template>
    <div class="loginPage">
        <div class="userlogin">
            <h2 class="title">管 理 员 登 录</h2>
            <Row class="from">
                <Col class="user" span="11">
                <p style="font-size: 14px;margin-bottom: 10px;">使用用户名和密码登录</p>
                <i-input class="input" placeholder="请输入用户名">
                    <span slot="prepend">用户名</span>
                </i-input>
                <i-input class="input" placeholder="请输入密码">
                    <span slot="prepend">密<span style="margin-left: 1em;"></span>码</span>
                </i-input>
                <p style="float: right;margin-bottom: 20px;margin-top: -8px;font-size: 14px;color: #969696;">忘记密码?</p>
                <i-button type="primary" size="large">登录</i-button>
                </Col>
                <Col class="line" span="2"></Col>
                <Col class="ep" span="11">
                <div class="imgContainer">
                    <img src="./../assets/login_logo.png" alt="">
                </div>
                <p style="text-align: center;margin: 20px; 0">点击跳转后使用企业微信扫码登录</p>
                <i-button type="primary" size="large" icon="iconfont iconfont icon-qiyeweixintubiao"
                          @click.native="gotowxep">企业微信登录
                </i-button>
                </Col>
            </Row>
            <p style="text-align: center;position: absolute;bottom: 15px;left: 0;right: 0;font-size: 10px;color: #a3a3a3;">
                提示：若您从来没有在管理后台的个人资料中设置过用户名个密码        <br/>请您使用右侧的“企业微信登录“进行登录。
            </p>
        </div>
    </div>
</template>
<script>
    /* eslint-disable indent */

    export default {
        data() {
            return {}
        },
        mounted() {
            let errcode = this.$route.query.errCode
            if (errcode) {
                switch (parseInt(errcode)) {
                    case 500000:
                        this.$Notice.warning({
                            title: '错误提示',
                            desc: '用户登录状态失效,请重新登陆',
                            duration: 0
                        })
                        break
                    case 500001:
                        this.$Notice.warning({
                            title: '错误提示',
                            desc: '成员身份不允许登录',
                            duration: 0
                        })
                        break
                    case 500002:
                        this.$Notice.warning({
                            title: '错误提示',
                            desc: '管理员没有分配给您任何部门的管理权限,不允许登录',
                            duration: 0
                        })
                        break
                }
            }
        },
        beforeDestroy() {

        },
        methods: {
            gotowxep() {
                let state = new Date().getTime()
                console.log(state)
                window.location.href = `https://open.work.weixin.qq.com/wwopen/sso/3rd_qrConnect?appid=wwbb2775eca6964984&redirect_uri=http%3A%2F%2Few.d1money.com%2Fadmin%2Fauth&state=${state}&usertype=admin`
            }
        }
    }
</script>
