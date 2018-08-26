<template>
    <div class="login-container">
        <div class="mask"></div>
        <el-row>
            <el-col :span="18" :offset="3" style="margin-top:18%;display:flex;justify-content:space-around;">
                <div class="title">
                    <h1>电子汇票仿真系统</h1>
                    <h4>Electronic Draft Simulation System</h4>
                </div>
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
                    <h3>SECDS</h3>
                    <el-form-item prop="phone">
                        <span class="svg-container"><iconSvg icon-style="svg-icon" icon-class="user"></iconSvg></span>
                        <el-input name="phone" type="text" v-model="loginForm.phone" placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item prop="passwd">
                        <span class="svg-container"><iconSvg icon-style="svg-icon" icon-class="password"></iconSvg></span>
                        <el-input name="passwd" type="password" v-model="loginForm.passwd" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width:100%; background: rgba(16, 26, 57, .7); border:none;height:50px;" :loading="loading"
                        @click="handleLogin('loginForm')" id="login">登 录</el-button>
                    </el-form-item>
                    <router-link to="/register" class="register">注册用户</router-link>
                    <router-link to="/pwdEdit" class="pwdEdit">忘记密码？</router-link>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import iconSvg from './tmp/icon-svg'
    export default{
      components:{iconSvg},
      data(){
        return{
          host: _const.host,
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
        let swap=this.cookie.get('swap')
        if (swap!==undefined) {
            setTimeout(_=>{
                this.$router.push('/home')
            }, 600)
        }
      },
      methods:{
        handleLogin(formName){
            this.$refs[formName].validate(valid=>{
                if (valid) {
                    this.loading=true
                    this.axios.get(`${this.host}/secds/users/login`,{
                        params:{
                            user_id:this.loginForm.phone,
                            user_passwd:this.loginForm.passwd
                        }
                    }).then(res=>{
                        if (res.data.code!=='OK') {
                            this.$notify.error({message: res.data.msg, duration:2000})
                            this.loading=false
                        } else {
                            this.$notify({type:'success', message: '登录成功', duration:2000})
                            this.cookie.set('token', res.data.token)
                            this.cookie.set('swap', res.data.swap, { expires: 365 })
                            this.cookie.set('user_id', this.loginForm.phone, { expires: 365 })
                            this.cookie.set('id','')
                            setTimeout(()=>this.$router.push('/home'), 1000)
                        }
                    })
                } else {
                    return false;
                }
            })
        },
      }
    }

   /* window.onload=function () {
        document.body.onkeydown=function (e) {
            var event=window.event || e;
            if (event.keyCode==13) {
                var event1=document.createEvent('HTMLEvents');
                event1.initEvent('click', true, true);
                event1.eventType='message';
                document.getElementById('login').dispatchEvent(event1)
            }
        }
    }*/
</script>

<style rel="stylesheet/scss" lang="scss">
    .login-container {
        font-family:'Microsoft YaHei';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        height: 100%;
        width:100%;        
        background: -moz-radial-gradient(right,#30a1dc,#03061d );
        background: -webkit-radial-gradient(right,#30a1dc,#03061d );
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        .mask{
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            height: 100%;
            width:100%; 
            background-image: url('../assets/images/login_bg_01.png'),
            url('../assets/images/login_bg_02.png');
            background-image: url('../assets/images/login_bg_01.png'),
            url('../assets/images/login_bg_02.png');
            background-image: url('../assets/images/login_bg_01.png'),
            url('../assets/images/login_bg_02.png');
            background-repeat: no-repeat;
            background-position: 0 0, top right;
            background-size: auto 100%, auto;
            opacity: .8;    
        }
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #fff;
            height: 50px;
        }
        .el-input {
            display: inline-block;
            height: 50px;
            width: 85%;
        }
        .svg-container {
          padding: 6px 5px 6px 15px;
          color: #889aa4;
          .svg-icon {
            width: 1.2em; 
            height: 1.2em;
            vertical-align: middle;
            fill: #fff;
            overflow: hidden;
          }
        }
        .title {
            display: inline-block;
            color: #fff;
            margin-top: 60px;
            h1{
                font-weight: normal;
                font-size: 60px;
                letter-spacing: 4px;
            }
            h4{
                font-weight: normal;
                font-size: 29px;
                letter-spacing: 1px;
            }
        }
        .login-form {
            width: 350px;
            h3{
                font-weight: normal;
                font-size: 30px;
                color: #fff;
                margin-bottom: 15px;
            }
            .register{
                float: right;
                color: rgb(255, 255, 255);
                font-size: 16px;
            }
            .pwdEdit{
                float: left;
                color: rgb(255, 255, 255);
                font-size: 16px;
            }
        }

        .el-form-item {
            // border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(16, 26, 57, 0.15);
            border-radius: 5px;
            color: #fff;
        }
    }

</style>
