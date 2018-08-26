<template xmlns="http://www.w3.org/1999/html">
    <div class="login-page">
      <my-alert class="my-alert" v-if="showDialog">
        <div class="comment-dialog" v-if="showRegisterDialog" >
          <el-form :inline="true" :model="registerForm"
                   status-icon :rules="registerRule"
                   ref="registerForm"
                   label-position="top"
                   style="background-color: #ffffff ; " label-height="30px"
                   label-width="100px" class="form-table">
            <div class="legend"  >
              <div class="title">注册用户【默认权限：一般用户】</div>
              <div class="close el-icon-close" @click="dismissRegister ()"></div>
            </div>
            <div class="content">
              <div >
                <el-form-item label="用户名"  prop="userName">
                  <el-input type="text" v-model="registerForm.userName"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="departmentId">
                  <el-select style="width:190px"  v-model="registerForm.departmentId"  placeholder="请选择">
                    <el-option v-for="item in departmentOptions" :key="item.departmentId" :label="item.departmentName" :value="item.departmentId"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div >
                <el-form-item label="密码"  prop="password">
                  <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                  <el-input type="password" v-model="registerForm.confirmPassword" auto-complete="off"></el-input>
                </el-form-item>
              </div>
              <div >
                <el-form-item label="电话"  prop="phone">
                  <el-input v-model.number="registerForm.phone"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input type="email" v-model="registerForm.email"   auto-complete="off"></el-input>
                </el-form-item>
              </div>
              <el-form-item class="comment-btn">
                <el-button type="primary" @click="submitRigesterForm('registerForm')">注册</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="comment-dialog" v-if="showResetDialog" >
          <el-form :inline="false" :model="getPasswordWayForm"
                   style="background-color: #ffffff ; "
                   class="form-table">
            <div class="legend"  >
              <div class="title">密码找回</div>
              <div class="close el-icon-close" @click="dismissReset ()"></div>
            </div>
            <div class="content">
              <el-form-item >
                <el-input type="text" v-model="getPasswordWayForm.userName" placeholder="输入用户名"  ></el-input>
              </el-form-item>
              <el-form-item class="comment-btn" >
                <el-button type="primary"  @click="byPhone()">手机找回</el-button>
                <el-button type="primary"  @click="byEmail()">邮箱找回</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="comment-dialog" v-if="showCenterDialog" >
          <el-form :inline="false"  class="form-table">
          <div class="legend"  >
            <div class="title">密码找回</div>
            <div class="close el-icon-close" @click="dismissPassword()"></div>
          </div>
          <div class="content">
            <el-form-item >
              <p>{{getPasswordWayForm.userName+":您好"}} </p>
              <p v-if="getPasswordWayForm.type === 1"  style="margin-top: 10px;">{{tip1}}</p>
              <p v-else style="margin-top: 10px;" >{{tip2}}</p>
              <p style="margin-top: 10px;">请查看验证码进行密码设置！</p>
            </el-form-item>
            <el-form-item class="comment-btn" >
              <el-button type="primary" @click="getRestInfo()">修改密码</el-button>
            </el-form-item>
          </div>
        </el-form>
        </div>
        <div class="comment-dialog" v-if="showConfirmCode">
          <el-form  :model="newPasswordForm"
                    status-icon :rules="newPasswordRule"
                    ref="newPasswordForm"
                    label-position="left"
                    style="background-color: #ffffff ; "
                    class="form-table" >
            <div class="legend"  >
              <div class="title">设置密码</div>
              <div class="close el-icon-close" @click="dismissCofirm()"></div>
            </div>
            <div class="content" style="padding: 5px">
              <div>
                <el-form-item label="验证码" prop="verifyCode">
                <el-input type="text" v-model="newPasswordForm.verifyCode" placeholder="验证码"></el-input>
              </el-form-item>
              </div>
              <div>
               <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="newPasswordForm.password" placeholder="新密码"></el-input>
              </el-form-item>
              </div>
              <div>
                <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="newPasswordForm.confirmPassword"  placeholder="确认密码"></el-input>
              </el-form-item>
              </div>
              <el-form-item class="comment-btn" >
                <el-button type="primary"  @click="onLookFor('newPasswordForm')">修改</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </my-alert>
      <div class="login-box" v-if="showLogin">
        <div class="logan-text1">顺德区地理国情监测全景平台</div>
        <el-form :inline="true" :model="loginForm" ref="loginForm"   class="login-form">
          <el-form-item prop="userName">
            <el-input class="el-input" required autofocus v-model="loginForm.userName" placeholder="输入用户名或邮箱" @keyup.enter.native="login"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="el-input" required type="password" v-model="loginForm.password" placeholder="输入密码" @keyup.enter.native="login"></el-input>
          </el-form-item>
          <div class="button" @click="login('loginForm')">
            <i class="iconfont icon-arrow-right" style="font-size: 25px;margin-left: 5px;"></i>
          </div>
        </el-form>
        <div class="operate-box">
          <div class="register-button"  @click="register()" >注册</div>
          <div class="reset-button" @click="reset ()">找回密码</div>
          <div class="remind-me" style="display: none">
            <!-- <el-tooltip popper-class="remindMe-tooltip" effect="light" placement="bottom">
              <div class="tooltip-text" slot="content">
                为了您的帐号安全，请勿在网吧或<br>
                公用电脑上使用此功能
              </div>
              <el-checkbox  label="五天内自动登录" name="type" v-model="remindMe" ></el-checkbox>
            </el-tooltip> -->
          </div>
        </div>
      </div>
      <div id="pano-box">
        <div id="aboutUs-1" @click.stop="showInfo"><u>关于</u></div>
        <el-dialog class="aboutDialog" title="关于我们" :visible.sync="dialogTableVisible">
          <p>地理国情是重要的基本国情，是搞好宏观调控、促进可持续发展的重要的决策依据，也是建设责任政府、服务型政府的重要支撑。顺德区第一次全国地理国情普查领导小组基于地理国情普查内容，结合顺德区地方社会经济发展需求，提出了地理国情普查成果应用和地理国情监测具体内容和实现技术路线，顺德区于2015年底完成了顺德区土地利用覆盖变化和主城区城市扩张动态监测两项基本监测任务。</p>
          <p>建立地理国情监测动态响应机制，为国土、房产、规划、交通等部门提供 360 全景可视化高效的区域地理信息保障，建立地理国情监测动态响应机制，实现重点区域动态监测，顺德国土城建和水利局计划开展地理国情监测项目建设，利用地面和空中 360 影像数据，建立地面和空中 360 全景影像数据平台，实现地理区情动态监测。</p>
          <p>顺德区国土城建水利局建设了“一库两平台”，提供了一站式行业标准化全景管理平台服务。</p>
          <p>“顺德区地理国情全景库”以《全集数据采集和制作标准》为依据，对全区进行了 “地-空”360全方位的全景网格覆盖和重点更新。打通了全景一体化相机设备和全景库， “一见即拍，一拍即得”，解决了数据的实时动态更新。所有高清海量全景数据存储到云端，提供全景调用接口，满足其他业务部门调用，优化资源配置和共享。</p>
          <p>“顺德区地理国情监测全景平台”既是“全景数据管理中心”又是“全景专题应用制作中心”，用户一键上传图片，平台自动拼接，既享全景成果，并为全景建立科学的标签分类体系，实现了全景可视化和网格化管理。用户还可以利用库里的全景，在线制作全景专题轻应用，实现地理国情的专题监测，并可发布至互联网，满足领导和公众关切。建立对全景业务数据的统计分析、在线对搜全景拍摄需求集和管理，闭环全景数据管理，持续深化地理信息服务。</p>
          <p>“全景顺德平台” 互联网全景管理和展示平台，满足PC、手机、大屏多终端体验。利用全景、VR独特的交互展示服务，让用户身临其境，足不出户即可游览顺德；用户在全景上还可以进行手动标记和画线，一键分享，移动办公好助手，顺德全量全景和专题“一手掌握” 。</p>
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
        <div class="logan-text2">顺德区国土城建和水利局</div>
      </div>
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
      dialogTableVisible: false,
      tip1: '我们已向您绑定的手机发送了验证码.',
      tip2: '我们已向您绑定的邮箱发送了验证码和链接.',
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
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass3, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validatePass4, trigger: 'blur' }
        ]
      },
      registerRule: {
        userName: [
          { required: true, message: '请输入注册名称', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        departmentId: [
          { required: true, message: '请选择所属部门', trigger: 'change' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        phone: [
          { required: true, validator: checkPhone, trigger: 'blur' }
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
    }
  },
  name: 'login',
  methods: {
    showInfo () {
      this.dialogTableVisible = true
    },
    login () {
      var self = this
      this.$api.login(this.loginForm).then(res => {
        if (res.code === 0) {
          panoView.dispose()
          this.$api.loginSave(this, function (res) {
            self.$router.push('/pages')
          })
        } else {
          this.openSuccess(res.msg)
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
    initPanoView () {
      /* eslint-disable no-new */
      new window.com.vizengine.App(document.getElementById('pano-box'), function () {
        panoView = new window.com.vizengine.view.PanoView()
        panoView.setMouseWheelEnable(false)
        panoView.panoViewInternal.setAutoplayEnable(true)
        panoView.setPanoId('307F73D330FE45F7986130786E2CBAA3')
        panoView.setHeading(-100)
        panoView.setPitch(0)
        panoView.setKeyEnable(false)
        return panoView
      })
    },
    byPhone () {
      this.getPasswordWayForm.type = 1
      this.newPasswordForm.userName = this.getPasswordWayForm.userName
      if (this.getPasswordWayForm.userName === '') {
        this.openWarn('用户名不能为空')
      } else {
        this.$api.getPassWord(this.getPasswordWayForm).then(res => {
          if (res.code === 0) {
            var phone = res.data.phone
            var mphone = phone.substr(0, 3) + '****' + phone.substr(7)
            this.tip1 = '我们已向您绑定的手机' + mphone + '发送了验证码.'
            this.showCenterDialog = true
            this.showResetDialog = false
          } else {
            this.openError(res.data.msg)
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
            var email = res.data.email
            var memail = email.substr(0, 3) + '****' + email.substr(7)
            this.tip2 = '我们已向您绑定的邮箱' + memail + '发送了验证码和链接.'
            this.showCenterDialog = true
            this.showResetDialog = false
          } else {
            this.openError(res.data.msg)
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
<style lang="scss" >
.login-page{
    width: 100%;
    height:100%;
    overflow:hidden;
    margin:0;
    position: relative;
    .login-box{
      width: 612px;
      height: 168px;
      position: absolute;
      margin: 0 auto;
      top: 272px;
      left: 0;
      right: 0;
      background:rgba(0,0,0,0.4);
      border-radius:5px;
      background-size: 100% 100%;
      z-index:222;
      .el-input {
        height: 34px;
        input{
          height: 100%;
        }
      }
      .logan-text1{
        color:#ffffff;
        width: 612px;
        font-size: 30px;
        margin-left: 95px;
        margin-top: 10px;
        z-index: 100;
      }
      .login-form{
        width: 430px;
        margin: 0 auto;
        position:absolute;
        left:0;
        right:0;
        top:60px;
        .el-form-item{
          width: 178px;
          margin-left:4px;
          margin-right:4px;
          .el-form-item__content{
            width: 178px;
            border-radius:20px;
          }
        }
        .button{
          width:37px;
          height:37px;
          display:inline-block;
          border-radius: 2px;
          padding:0;
          background:#1b6d85;
          line-height: 37px;
          color: #fff;
        }
        .button:hover{
          background:#1bb1e6;
        }
      }
      .operate-box{
        width: 430px;
        margin: 0 auto;
        position:absolute;
        left:0;
        right:0;
        top:118px;
        text-align:left;
        color:#ffffff;
        .reset-button{
          opacity: 0.6;
          font-size: 14px;
          width: 100px;
          position:absolute;
          line-height: 1;
          text-decoration: underline;
          letter-spacing: 0.7px;
          color: #ffffff;
          cursor: pointer;
          margin-left:194px;
        }
        .register-button{
          opacity: 0.6;
          font-size: 14px;
          width: 100px;
          position:absolute;
          line-height: 1;
          text-decoration: underline;
          letter-spacing: 0.7px;
          cursor: pointer;
          color: #ffffff;
          margin-left:4px;
        }
        .remind-me{
          position:absolute;
          margin-left:294px;
          margin-top: -5px;
        }
      }
      .operate-box>*:hover{
        opacity: 1;
      }
    }
    .logan-text2{
      color:#ffffff;
      text-align: center;
      font-size: 24px;
      margin: 0 auto;
      right: 0;
      left: 0;
      position: absolute;
      z-index: 100;
      bottom: 20px;
    }
    .comment-dialog{
      .form-table{
        border-radius:5px;
        background-color: #ffffff;
        .legend{
          background-color: #f5f5f5;
          height: 40px;
          display: flex;
          border-radius:5px;
          align-items: center;
          justify-content: space-between;
          padding: 0px 10px;
        }
        .content{
          margin: 20px;
          display: flex;
          flex-flow:column nowrap;
          justify-content: center;
          label{
            margin:0;
            padding: 0px;
          }
          >div{
            margin-bottom: 10px;
            display: flex;
            flex-flow:row nowrap;
            justify-content: center;
          }
          .comment-btn{
            margin:20px 0 30px;
          }
        }
      }
    }
    #pano-box{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
    }
  }
#aboutUs-1{
  cursor: pointer;
  height:20px;
  position: absolute;
  right: 1%;
  top:1%;
  color: #FFFFFF;
  font-size: 18px;
  word-spacing: 5px;
  width: 100px;
  z-index: 3000;
}
.aboutDialog {
  background: #808080;
  .el-dialog {
    background: #fff;
    width: 70%;
    opacity: 0.9;
    .el-dialog__body{
      padding: 0px 0px;
    }
    p {
      padding-left:40px;
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
.remindMe-tooltip{
  width: 175px;
  height:40px;
  border-radius: 3px;
  background-color: rgba(0,0,0,0.7)!important;
  border: solid 1px rgba(255,255,255,0.5)!important;
  transform: translateX(-55px);
  .tooltip-text{
    width: 175px;
    height: 26px;
    font-size: 12px;
    line-height: 19px;
    letter-spacing:-0.5px;
    font-weight: 500;
    text-align: center;
    color: #f15a3f !important;
  }
}
.remindMe-tooltip.el-tooltip__popper.is-light[x-placement^=bottom] .popper__arrow::after {
  border-bottom-color: rgba(0,0,0,0.85)!important;
}
.remindMe-tooltip.el-tooltip__popper.is-light[x-placement^=top] .popper__arrow::after {
  border-top-color: rgba(0,0,0,0.85)!important;
}
.el-form-item__label{
  line-height:30px
}
</style>
