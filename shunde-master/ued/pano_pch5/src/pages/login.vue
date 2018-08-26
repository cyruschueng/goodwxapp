<template xmlns="http://www.w3.org/1999/html">
  <div class="login-page">
    <my-alert class="my-alert" v-if="showDialog">
      <div class="comment-dialog" v-if="showRegisterDialog">
        <el-form :inline="true" :model="registerForm"
                 status-icon :rules="registerRule"
                 ref="registerForm"
                 label-position="top"
                 style="background-color: #ffffff ; " label-height="30px"
                 label-width="100px" class="form-table">
        </el-form>
      </div>
    </my-alert>
    <div class="login-box" v-if="showLogin">
      <img class="img-title" src="static/login_title.png"/>
      <div id="title-word"><span>{{titleText1}}</span></div>
      <el-form :inline="true" :model="loginForm" ref="loginForm" class="login-form">
        <el-form-item prop="userName">
          <el-input class="el-input" required autofocus v-model="loginForm.userName" placeholder="输入用户名或邮箱"
                    @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="el-input" required type="password" v-model="loginForm.password" placeholder="输入密码"
                    @keyup.enter.native="login"></el-input>
        </el-form-item>
        <div class="button" @click="login('loginForm')">
          <i class="iconfont icon-arrow-right" style="font-size: 25px;margin-left: 5px;"></i>
        </div>
      </el-form>
    </div>
    <div id="pano-box" src="static/background.png"/>
    <transition name="fade">
      <img v-show="showBack" id="backImg" src="static/background.jpg"/>
    </transition>
    <div id="label-content">
      <label class="label-1" v-bind:class="{active: isActiveList[0]}"/>
      <label class="label-2" v-bind:class="{active: isActiveList[1]}"/>
      <label class="label-3" v-bind:class="{active: isActiveList[2]}"/>
    </div>
    <span id="bottomLabel">Copyright@2018&nbsp;&nbsp;&nbsp;&nbsp;顺德区国土城建和水利局&nbsp;&nbsp;版权所有&nbsp;&nbsp;&nbsp;&nbsp;粤ICP备05093488号</span>
    <div id="aboutUs" @click.stop="showInfo"><u>关于</u></div>
    <el-dialog class="aboutDialog" title="关于我们" :visible.sync="dialogTableVisible">
      <p>
        地理国情是重要的基本国情，是搞好宏观调控、促进可持续发展的重要的决策依据，也是建设责任政府、服务型政府的重要支撑。顺德区第一次全国地理国情普查领导小组基于地理国情普查内容，结合顺德区地方社会经济发展需求，提出了地理国情普查成果应用和地理国情监测具体内容和实现技术路线，顺德区于2015年底完成了顺德区土地利用覆盖变化和主城区城市扩张动态监测两项基本监测任务。</p>
      <p>
        建立地理国情监测动态响应机制，为国土、房产、规划、交通等部门提供 360 全景可视化高效的区域地理信息保障，建立地理国情监测动态响应机制，实现重点区域动态监测，顺德国土城建和水利局计划开展地理国情监测项目建设，利用地面和空中 360 影像数据，建立地面和空中 360 全景影像数据平台，实现地理区情动态监测。</p>
      <p>顺德区国土城建水利局建设了“一库两平台”，提供了一站式行业标准化全景管理平台服务。</p>
      <p>
        “顺德区地理国情全景库”以《全集数据采集和制作标准》为依据，对全区进行了 “地-空”360全方位的全景网格覆盖和重点更新。打通了全景一体化相机设备和全景库， “一见即拍，一拍即得”，解决了数据的实时动态更新。所有高清海量全景数据存储到云端，提供全景调用接口，满足其他业务部门调用，优化资源配置和共享。</p>
      <p>
        “顺德区地理国情监测全景平台”既是“全景数据管理中心”又是“全景专题应用制作中心”，用户一键上传图片，平台自动拼接，既享全景成果，并为全景建立科学的标签分类体系，实现了全景可视化和网格化管理。用户还可以利用库里的全景，在线制作全景专题轻应用，实现地理国情的专题监测，并可发布至互联网，满足领导和公众关切。建立对全景业务数据的统计分析、在线对搜全景拍摄需求集和管理，闭环全景数据管理，持续深化地理信息服务。</p>
      <p>
        “全景顺德平台” 互联网全景管理和展示平台，满足PC、手机、大屏多终端体验。利用全景、VR独特的交互展示服务，让用户身临其境，足不出户即可游览顺德；用户在全景上还可以进行手动标记和画线，一键分享，移动办公好助手，顺德全量全景和专题“一手掌握” 。</p>
      <div style="background: #000; height: 200px;width: 100%;margin-top: 40px;padding-top: 40px">
        <div style="width: 200px">
          <img src="static/shundeLogo_white.png" style="width: 35px; margin-top: 0px;vertical-align: top"/>
          <img src="static/r-code.png" style="margin-left: 10px; height: 130px"/>
        </div>
        <div style="position: absolute; height: 40px;left: 35%;bottom: 120px">
          <a href="http://webapp.vizen.cn/shunde/index.html" target="_blank" style="font-size: 18px; letter-spacing: 3px; font-family: SimSun; color: #FFFFFF; font-weight: bold"><u>顺德区地理国情监测平台</u></a>
          <label style="height: 60px; width: 1px;color: #FFFFFF;font-size: 22px;margin-left: 10px">|</label>
          <a href="http://shunde.vizen.cn/pcshunde/index.html" style="font-family: SimSun;letter-spacing: 3px;margin-left: 10px;font-size: 18px;color: #FFFFFF; font-weight: bold"><u>全景顺德</u></a>
        </div>
        <div style="position: absolute; height: 40px;left: 30%;bottom: 60px">
          <a style="font-size: 18px; font-weight: bold; color: #FFFFFF;font-family:SimSun">Copyright@2018顺德区国土城建和水利局</a>
          <a style="margin-left: 10px;font-size: 18px;color: #FFFFFF; font-weight: bold">版权所有</a>
          <a style="font-size: 18px; font-weight: bold; color: #FFFFFF;font-family:SimSun">粤ICP备05093488号</a>
        </div>
        <div style="position: absolute; height: 40px;left: 30%;bottom: 20px">
          <a style="font-size: 18px; font-weight: bold; color: #FFFFFF;font-family:SimSun">技术支持：河北鼎联科技有限公司</a>
          <a style="font-size: 18px; font-weight: bold; color: #FFFFFF;font-family:SimSun">0316-5759515</a>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>

  import myAlert from '../components/login/myAlert.vue'
  import { baseWebUrl } from '../api/urlprovider'

  var panoView = null
  export default {
    components: {
      'my-alert': myAlert
    },
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.registerForm.confirmPassword !== '') {
            this.$refs.registerForm.validateField('confirmPassword')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.newPasswordForm.confirmPassword !== '') {
            this.$refs.newPasswordForm.validateField('confirmPassword')
          }
          callback()
        }
      }
      var validatePass4 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.newPasswordForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话号码不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('电话号码必须是数字'))
          } else {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            if (!reg.test(value)) {
              callback(new Error('请输入正确的电话号码！'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      return {
        isActiveList: [true, false, false],
        titleText1: '千秋功过，可见一斑，华夏祖先，可知谱序流传',
        titleText: ['千秋功过，可见一斑，华夏祖先，可知谱序流传', '一橹一条河，一河一个景', '敢为人先、崇文务实、通济和谐'],
        dialogTableVisible: false,
        showBack: true,
        timeOut: 3000,
        showDialog: false,
        showLogin: true,
        showRegisterDialog: false,
        showResetDialog: false,
        showSendDialog: false,
        showCenterDialog: false,
        showConfirmCode: false,
        remindMe: false,
        loginForm: {
          userName: '',
          password: ''
        },
        registerForm: {
          userName: '',
          departmentId: '',
          password: '',
          confirmPassword: '',
          phone: '',
          email: ''
        },
        passwordForm: {
          userName: '',
          type: ''
        },
        newPasswordForm: {
          userName: '',
          verifyCode: '',
          password: '',
          confirmPassword: ''
        },
        getPasswordWayForm: {
          userName: '',
          type: ''
        },
        newPasswordRule: {
          verifyCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePass3, trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, validator: validatePass4, trigger: 'blur'}
          ]
        },
        registerRule: {
          userName: [
            {required: true, message: '请输入注册名称', trigger: 'blur'},
            {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
          ],
          departmentId: [
            {required: true, message: '请选择所属部门', trigger: 'change'}
          ],
          password: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          phone: [
            {required: true, validator: checkPhone, trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      if (window.location.search.indexOf('userName=') > -1) {
        let url = window.location.search.substr(1)
        let params = url.split('&')
        for (let i in params) {
          if (params[i].indexOf('userName=') > -1) {
            this.newPasswordForm.userName = params[i].replace('userName=', '')
            this.showDialog = true
            this.showConfirmCode = true
            this.showLogin = false
            break
          }
        }
        // this.newPasswordForm.userName = url.match(/userName=(.+^&)$/)
      }
      setTimeout(() => {
        this.showBack = false
      }, 3000)
    },
    mounted () {
      this.initPanoView()
    },
    computed: {
      departmentOptions () {
        return this.$store.state.departmentList
      },
      userInfo () {
        return this.$store.state.userInfo
      },
      timeOut: {
        set (val) {
          this.$store.state.timeout.compileTimeout = val
        },
        get () {
          return this.$store.state.timeout.compileTimeout
        }
      }
    },
    name: 'login',
    methods: {
      showInfo () {
        this.dialogTableVisible = true
      },
      initPanoView () {
        var self = this
        /* eslint-disable no-new */
        new window.com.vizengine.App(document.getElementById('pano-box'), function () {
          var panos = []
          var panoIndex = 0
          panos.push('7AD3E8BFFE6C405DB8BF4E980FE18552')
          panos.push('2A9A04D8B48D4181BBFF2D3CB977F9A9')
          panos.push('394E1BA38D5F4DC1BC9F7E9D3848C0AE')
          panoView = new window.com.vizengine.view.PanoView()
          panoView.setMouseWheelEnable(false)
          panoView.panoViewInternal.setAutoplayEnable(true)
          panoView.setKeyEnable(false)
          panoView.setTouchable(false)
          var setPano = function () {
            self.titleText1 = self.titleText[panoIndex]
            panoView.setPanoId(panos[panoIndex])
            panoView.setHeading(0)
            panoView.setPitch(0)
            for (var i = 0; i < self.isActiveList.length; i++) {
              self.isActiveList[i] = false
            }
            self.isActiveList[panoIndex] = true
            setTimeout(() => {
              if (panoIndex < panos.length - 1) {
                setPano(panos[++panoIndex])
              } else {
                panoIndex = 0
                setPano(panos[panoIndex])
              }
            }, 10000)
          }
          setPano()
          return panoView
        })
        this.showLogin = true
      },
      login () {
        let self = this
        this.$api.login(this.loginForm).then(res => {
          if (res.code === 0) {
            self.$router.push('pages')
            self.$api.loginSave(this)
          } else {
            self.openSuccess(res.msg)
          }
        })
      },
      register () {
        this.showLogin = false
        this.showDialog = true
        this.showRegisterDialog = true
      },
      dismissRegister () {
        this.showLogin = true
        this.showDialog = false
        this.showRegisterDialog = false
      },
      dismissReset () {
        this.showLogin = true
        this.showDialog = false
        this.showResetDialog = false
      },
      dismissPassword () {
        this.showLogin = true
        this.showDialog = false
        this.showCenterDialog = false
      },
      dismissCofirm () {
        this.showLogin = true
        this.showDialog = false
        this.showConfirmCode = false
      },
      reset () {
        this.showLogin = false
        this.showDialog = true
        this.showResetDialog = true
      },
      byPhone () {
        this.getPasswordWayForm.type = 1
        this.newPasswordForm.userName = this.getPasswordWayForm.userName
        if (this.getPasswordWayForm.userName === '') {
          this.openWarn('用户名不能为空')
        } else {
          this.$api.getPassWord(this.getPasswordWayForm).then(res => {
            if (res.code === 0) {
              this.showCenterDialog = true
              this.showResetDialog = false
            } else {
              this.openError(res.msg)
            }
          })
        }
      },
      byEmail () {
        this.getPasswordWayForm.type = 2
        this.newPasswordForm.userName = this.getPasswordWayForm.userName
        if (this.getPasswordWayForm.userName === '') {
          this.openWarn('用户名不能为空')
        } else {
          this.$api.getPassWord(this.getPasswordWayForm).then(res => {
            if (res.code === 0) {
              this.showCenterDialog = true
              this.showResetDialog = false
            } else {
              this.openError(res.msg)
            }
          })
        }
      },
      getRestInfo () {
        this.showCenterDialog = false
        this.showConfirmCode = true
      },
      onLookFor (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.resetPassWord(this.newPasswordForm).then(res => {
              if (res.code === 0) {
                this.showLogin = true
                this.showDialog = false
                this.showConfirmCode = false
                location.href = baseWebUrl()
                this.openSuccess('密码修改成功!')
              } else {
                this.openWarn(res.msg)
              }
            })
          } else {
            this.openError('密码修改失败!')
          }
        })
      },
      submitRigesterForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.register(this.registerForm).then(res => {
              if (res.code === 0) {
                this.showLogin = true
                this.showDialog = false
                this.showRegisterDialog = false
                this.openSuccess(res.msg)
              } else {
                this.openWarn(res.msg)
              }
            })
          } else {
            this.openError('注册信息有误请核对后再尝试')
          }
        })
      },
      openError (msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error'
        })
      },
      openWarn (msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'warning'
        })
      },
      openSuccess (msg) {
        this.$message({
          message: msg,
          type: 'success'
        })
      }
    }
  }
</script>
<style lang="scss">
  .el-form-item {
    background: #fff;
  }

  .el-input {
    background: #fff;
    .el-input__inner {
      background: #fff;
    }
  }

  #backImg {
    z-index: 220;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .login-page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: relative;
    .login-box {
      text-align: center;
      width: 612px;
      position: absolute;
      margin: 0 auto;
      top: 250px;
      height: 400px;
      left: 0;
      right: 0;
      border-radius: 5px;
      background-size: 100% 100%;
      z-index: 100;
      .img-title {
        color: #ffffff;
        width: 50px;
        font-size: 30px;
        margin-left: auto;
        margin-right: auto;
        z-index: 100;
      }
      #title-word {
        font-size: 20px;
        top: 20px;
        position: relative;
        span{
          color: #fff;
          font-weight: bold;
          word-spacing: 10px;
        }

      }
      .login-form {
        width: 430px;
        margin: 0 auto;
        position: relative;
        top: 40px;
        margin-bottom: 100px;
        .el-form-item {
          width: 178px;
          margin-left: 4px;
          margin-right: 4px;
          .el-form-item__content {
            width: 178px;
            border-radius: 20px;
          }
        }
        .button {
          width: 37px;
          height: 37px;
          display: inline-block;
          border-radius: 2px;
          padding: 0;
          background: #E84838;
          line-height: 37px;
          color: #fff;
        }
        .button:hover {
          background: #DF2315;
        }
      }
      .operate-box {
        width: 430px;
        margin: 0 auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 118px;
        text-align: left;
        color: #ffffff;
        .reset-button {
          opacity: 0.6;
          font-size: 14px;
          width: 100px;
          position: absolute;
          line-height: 1;
          text-decoration: underline;
          letter-spacing: 0.7px;
          color: #ffffff;
          margin-left: 194px;
        }
        .register-button {
          opacity: 0.6;
          font-size: 14px;
          width: 100px;
          position: absolute;
          line-height: 1;
          text-decoration: underline;
          letter-spacing: 0.7px;
          color: #ffffff;
          margin-left: 4px;
        }
        .remind-me {
          position: absolute;
          margin-left: 294px;
          margin-top: -5px;
        }
      }
      .operate-box > *:hover {
        opacity: 1;
      }
    }
    .logan-text2 {
      color: #ffffff;
      text-align: center;
      font-size: 24px;
      margin: 0 auto;
      right: 0;
      left: 0;
      position: absolute;
      z-index: 100;
      bottom: 20px;
    }
    .el-dialog__body{
      padding: 0px;
      margin-top: 40px;
    }
    .comment-dialog {
      .form-table {
        border-radius: 5px;
        background-color: #ffffff;
        .legend {
          background-color: #f5f5f5;
          height: 40px;
          display: flex;
          border-radius: 5px;
          align-items: center;
          justify-content: space-between;
          padding: 0px 10px;
        }
        .content {
          margin: 20px;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          label {
            margin: 0;
            padding: 0px;
          }
          > div {
            margin-bottom: 10px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
          }
          .comment-btn {
            margin: 20px 0 30px;
          }
        }
      }
    }
    #pano-box {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    #aboutUs {
      cursor: pointer;
      position: absolute;
      height: 20px;
      color: #FFFFFF;
      font-size: 22px;
      word-spacing: 5px;
      width: 100px;
      top: 2%;
      right: 1%;
    }
    .aboutDialog {
      background: #FFF;
      .el-dialog {
        width: 70%;
        background: #D9D9D9;
        opacity: 0.9;
        p {
          padding-left: 40px;
          padding-right: 40px;
          margin-top: 10px;
          font-size: 18px;
          word-spacing: 2px;
          line-height: 30px;
        }
        .el-dialog__title {
          font-size: 24px;
        }
      }
    }
    .el-message{
      background: #fff;
    }
    #label-content{
      display: flex;
      justify-content: space-between;
      width: 200px;
      position: absolute;
      z-index: 50;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10%;
      label{
        height: 3px;
        width: 50px;
        background: white;
      }
      .active{
        background: red;
      }
    }
    #bottomLabel{
      position: absolute;
      color: #ffffff;
      font-size: 14px;
      bottom: 2%;
      left: 50%;
      z-index: 500;
      transform: translateX(-50%);
    }

  }

</style>
