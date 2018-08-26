<template>
    <div class="login-container">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
            <h3 class="title">管理员登录</h3>
            <el-form-item prop="phone">
                <span class="svg-container"><iconSvg icon-style="svg-icon" icon-class="user"></iconSvg></span>
                <el-input name="phone" type="text" v-model="loginForm.phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="passwd">
                <span class="svg-container"><iconSvg icon-style="svg-icon" icon-class="password"></iconSvg></span>
                <el-input name="passwd" type="password" v-model="loginForm.passwd" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click="handleLogin('loginForm')">
                    登录
                </el-button>
            </el-form-item>
            <!-- <router-link to="/sendpwd" class="forget-pwd">
                忘记密码?
            </router-link> -->
        </el-form>
    </div>
</template>

<script>
    import iconSvg from './tmp/icon-svg'
    import bus from '../assets/js/eventBus'
    export default{
      components:{iconSvg},
      data(){
        return{
          loginForm:{
            phone:'',
            passwd:'',
          },
          loginRules:{
            phone:[
                { required: true, message: '请输入手机号码', trigger: 'blur' },
                { pattern:/^1[34578]\d{9}$/, message: '手机号码格式不正确'}
            ],
            passwd:[
                { required: true, message: '请输入密码', trigger: 'blur' }
            ]
          },
          loading:false
        }
      },
      mounted(){
        let token_admin=this.cookie.get('token')
        if (token_admin) {
            this.$router.push('/')
        }
      },
      methods:{
        //login
        handleLogin(formName){
            this.$refs[formName].validate(valid=>{
                if (valid) {
                    this.loading=true
                    this.axios.post(`${_const.host}/ftk/users/user/login`,{
                        user_id:this.loginForm.phone,
                        user_passwd:this.loginForm.passwd
                    }).then(res=>{
                        if (res.data.code==='OK') {
                            this.cookie.set('token', res.data.token)
                            this.cookie.set('swap', res.data.swap)
                            this.userinfo()
                        } else {
                            this.notice('error', '用户名或密码错误')
                            this.loading=false
                        }
                    })
                } else {
                    return false;
                }
            })
        },
        //userinfo
        userinfo(){
            this.axios.get(`${_const.host}/ftk/users/user`,{
                headers:{
                    token:this.cookie.get('token')
                }
            }).then(res=>{
                if (res.data.code==='OK') {
                    this.user=res.data.data[0]
                    bus.$emit('userinfo', this.user)
                    if (this.user.role===4) {
                        this.cookie.set('userinfo', res.data.data[0])
                        this.notice('success', '登录成功')
                        setTimeout(()=>this.$router.push('/'),800)
                    } else {
                        this.notice('error', '没有权限或权限不足')
                        this.loading=false
                        this.logout()
                    }
                } else if (res.data.code==='TOKEN_INVLID') {
                    this.token('userinfo')
                } else {
                    console.log(res.data.msg)
                }
            })
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .login-container {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        height: 100%;
        width:100%;
        background-color: #2d3a4b;
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #eeeeee;
            height: 47px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        .svg-container {
          padding: 6px 5px 6px 15px;
          color: #889aa4;
          .svg-icon {
            width: 1.2em; 
            height: 1.2em;
            vertical-align: middle;
            fill: #ccc;
            overflow: hidden;
          }
        }

        .title {
            font-size: 26px;
            font-weight: 400;
            color: #eeeeee;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }

        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 350px;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }

</style>
