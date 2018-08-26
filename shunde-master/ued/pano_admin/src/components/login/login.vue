<template>
  <div class="login-page">
    <div class="header-wrap">
      <img class="logo-img" src="/static/login/logo_login.svg">
      <el-popover placement="bottom-end" width="200" trigger="hover">
        <div class="service-tooltip">
          <img class="service-code" src="../assets/service_code.jpg" alt="">
          <p class="service-text">扫码关注我们的公众号，向客服提出问题。</p>
        </div>
        <div slot="reference" class="header-btn service-btn">联系我们</div>
      </el-popover>
      <!-- <router-link class="header-btn" to="help">常见问题</router-link> -->
      <a class="header-btn" href="help" target="blank">常见问题</a>
    </div>
    <div class="login-wrap">
      <swiper :options="swiperOption" class="carrouse-bg">
        <swiper-slide v-for="item in items" :key="item.id" class="swiper-slide" :class="item.swiperIndex">
          <div class="login-slogan" onselectstart="return false;">{{item.text}}</div>
          <div class="swiper-box" :style="{ backgroundImage: 'url(' + item.img + ')' }"></div>
          <img class="swiper-img" :src="item.img">
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
      </swiper>
      <div class="login-box">
        <div class="form-error" v-show="res.code !== '0'">{{res.msg}}</div>
        <el-form :inline="true" :model="loginForm" ref="loginForm" class="login-form">
          <el-form-item prop="email">
            <el-input required autofocus v-model="loginForm.email" placeholder="输入手机号" @keyup.enter.native="login"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input required type="password" v-model="loginForm.password" placeholder="输入密码" @keyup.enter.native="login"></el-input>
          </el-form-item>
          <div class="button" @click="login('loginForm')">
            <i class="iconfont icon-arrow-right"></i>
          </div>
        </el-form>
        <div class="operate-wrap">
          <el-tooltip popper-class="remindMe-tooltip" effect="light" placement="bottom">
            <div class="tooltip-text" slot="content">
              为了您的帐号安全，请勿在网吧或<br>
              公用电脑上使用此功能
            </div>
            <el-checkbox  label="五天内自动登录" name="type" v-model="remindMe"></el-checkbox>
          </el-tooltip>
          <el-tooltip popper-class="resetpwd-tooltip" placement="bottom" effect="light">
            <div slot="content" class="link-wrap">
              <a href="/resetpwd/phone" class="link">通过手机重置</a>
              <div class="line"></div>
              <a href="/resetpwd/email" class="link">通过邮箱重置</a>
            </div>
            <span class="el-dropdown-link">重置密码</span>
          </el-tooltip>
          <!-- <router-link class="register-button" to="register">立即入驻</router-link> -->
          <router-link class="register-button" to="/select-type">立即入驻</router-link>
          <!-- <router-link class="register-button" :to="{name:'accountType'}">立即入驻</router-link> -->
        </div>
      </div>
    </div>
    <div class="total-intro-wrap">
      <div class="intro-box">
        <div class="intro-step" v-for="item in totalInfo" :key="item.id">
          <div class="icon-box">  
              <img :src="item.img">
          </div>  
          <p class="step-title">{{item.text}}</p>
        </div>
      </div>
    </div>
    <div v-for="item in detailInfo" :key="item.id" class="detail-intro-wrap"
    :class="item.class">
      <p class="detail-title">{{item.title}}</p>
      <p class="detail-text" v-html="item.text"></p>
      <img class="detail-img" :src="item.img">
    </div>
    <div class="bottom-wrap">
      <p class="bottom-title">就是这么简单</p>
      <!-- <router-link class="bottom-button" to="register">立即免费入驻</router-link> -->
      <router-link class="bottom-button" to="/select-type">立即免费入驻</router-link>
    </div>
    <div class="footer-wrap">
      <div class="links-wrap">
        <a class="links" href="http://www.visualbusiness.com/">微景天下官网</a>
        <span>|</span>
        <a class="links" :href="showStageName">微景平台</a>
        <span>|</span>
        <a class="links" href="javascript:scrollTo(0,0);" target="_self">微景平台摄影师版</a>
      </div>
      <!-- <p class="tel">TEL: 010-62440010</p> -->
      <p class="tel"></p>
      <p class="address">北京市·海淀区·西土城路10号北邮科技大厦301室</p>
      <p class="bottom-Copyright">
        <span>Copyright ©2015-2017</span>     
        <span>微景天下(北京)科技有限公司版权所有 </span>    
        <span>京ICP备15031894号-2 </span>
      </p>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { showStageName } from '@/filters'
export default {
  name: 'login',
  components: {
    showStageName,
    swiper,
    swiperSlide
  },
  data () {
    return {
      showStageName: showStageName,
      items: [
        {
          swiperIndex: 'swiper-slide1',
          text: '为全景摄影师量身打造的专业平台服务',
          img: '/static/login/carrousel01.jpg'
        },
        {
          swiperIndex: 'swiper-slide2',
          text: '承接充满挑战的拍摄任务',
          img: '/static/login/carrousel02.jpg'
        },
        {
          swiperIndex: 'swiper-slide3',
          text: '与一流的摄影同行共同成长',
          img: '/static/login/carrousel03.jpg'
        }
      ],
      totalInfo: [
        {
          text: '让全景制作更轻松高效',
          img: '/static/login/icon1.svg'
        },
        {
          text: '提供一站式全景商业服务',
          img: '/static/login/icon2.svg'
        },
        {
          text: '无限量存储空间',
          img: '/static/login/icon3.svg'
        }
      ],
      detailInfo: [
        {
          class: 'detail-intro-wrap1',
          title: '全景制作化繁为简，从此专注拍摄',
          text: '免费的自动拼接工具，一键上传平面照片，坐收完美全景成果<br>批量上传全景成片，拍摄、编辑两不误。',
          img: '/static/login/img1.png'
        },
        {
          class: 'detail-intro-wrap2',
          title: '一站式商业服务，收入轻松有保障',
          text: '实时透明的商业全景拍摄信息平台，免费智能的报价和订单管理服务，<br>让您专注于摄影技艺，轻松转化收入。</p>',
          img: '/static/login/img2.svg'
        },
        {
          class: 'detail-intro-wrap3',
          title: '无限量存储，尽情展示得意作品',
          text: '个人作品可不限量上传存储并进行管理，<br>为您做最贴心的商业全景数据管家。',
          img: '/static/login/img3.png'
        }
      ],
      swiperOption: {
        notNextTick: true,
        autoplay: 8000,
        // autoplayDisableOnInteraction: false,
        // mousewheelControl: true,
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true
      },
      isShot: false,
      // 记住我
      remindMe: false,
      loginForm: {
        email: '',
        password: ''
      },
      res: {
        code: '0',
        msg: ''
      }
      // },
      // rules: {
      //   email: [
      //     { required: true, message: '请输入手机号', trigger: 'blur' }
      //   ],
      //   password: [
      //     { required: true, message: '请输入密码', trigger: 'blur' }
      //   ]
      // }
    }
  },
  created () {
    this.isLogin()
  },
  methods: {
    getWechatInfo () {
      var self = this
      this.$api.getWechatStatus().then(function (res) {
        if (res.code === '0') {
          if (res.data.receiveWechat === 'true' || res.data.receiveWechat) {
            self.$cookie.set('isWechat', false)
          } else {
            self.$cookie.set('isWechat', true)
          }
        }
      })
    },
    isLogin () {
      if (this.$cookie.get('username')) {
        this.$api.isLogin().then(res => {
          if (res.code === '0' && res.data === 1) {
            this.$router.push('/index')
          }
        })
      }
    },
    login () {
      this.$router.push('/pages')
    },
    changeToShot (result) {
      this.$api.activateShot({}).then(res => {
        if (res.code === '0') {
          if (result.type === null) {
            this.$router.push('/select-type')
          } else {
            this.$router.push('/index')
          }
        } else {
          this.$message.warning(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page{
  .header-wrap{
    width:57%;
    height:60px;
    text-align:left;
    margin:0 auto;
    min-width:1080px;
    .logo-img{
      width:260px;
      display: inline-block;
      margin: 14px 0;
    }
    .header-btn{
      display: inline-block;
      width: 83px;
      height: 28px;
      line-height:28px;
      border-radius: 2px;
      border: solid 1px #000000;
      margin: 14px 0;
      margin-left:20px;
      font-size: 14px;
      text-align: center;
      color: #000000;
      text-decoration:none;
      cursor:pointer;
      float:right;
    }
  }
  .login-wrap{
    width: 100%;
    height:690px;
    overflow:hidden;
    margin:0;
    position: relative;
    .carrouse-bg{
      width:100%;
      height:690px;
      overflow:hidden;
      .swiper-slide{
        width:100%;
        .swiper-box{
          width:100%;
          height:690px;
          background-size:1920px 690px;
          background-repeat:no-repeat;
          background-position:center;
          background-origin:content-box;
        }
        .swiper-img{
          width:100%;
          display:none;
        }
      }
    }
    .swiper-pagination{
      bottom:70px!important;
    }
    .swiper-pagination-bullet {
      width: 50px;
      height: 4px;
      background:#fff;
      border-radius:0;
      opacity:1;
    }
    .swiper-pagination-bullet:hover{
      background:#f15a3f;
      transition: all 0.5s;
      -moz-transition: all 0.5s;  
      -webkit-transition: all 0.5s; 
      -o-transition: all 0.5s; 
    }
    .swiper-pagination-bullet:first-child {
      border-bottom-left-radius: 2px;
      border-top-left-radius: 2px;
    }
    .swiper-pagination-bullet:last-child {
      border-bottom-right-radius: 2px;
      border-top-right-radius: 2px;
    }
    .swiper-pagination-bullet-active {
      background:#f15a3f;
    }
    .gister-button{
      margin-top: 22px;
      width: 100px;
      margin-right: 30px;
    }
    .login-slogan{
      width:800px;
      position: absolute;
      margin: 0 auto;
      top: 191px;
      left: 0;
      right: 0;
      font-size: 40px;
      line-height: 1.55;
      letter-spacing: 2.2px;
      text-align: center;
      color: #ffffff;
      text-shadow: 0 3px 0 rgba(148, 52, 0, 0.5);
      z-index: 999;
    }
    .swiper-slide2 .login-slogan{
      text-shadow: 0 3px 0 #49607C;
    }
    .swiper-slide3 .login-slogan{
      text-shadow: 0 3px 0 #5f5f5f;
    }
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
      z-index:999;
      .form-error{
        font-size: 16px;
        line-height: 0.88;
        letter-spacing: 0.8px;
        text-align: center;
        color: #f15a3f;
        margin-top:26px;
        height: 20px;
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
            border-radius:2px;
          }
        }
        input{
          width:176px;
          text-align:center;
          border-radius: 2px;
          background-color: #ffffff!important;
          border: solid 1px #888888;
        }
        input:focus{
          border-color:#f15a3f;
        }
        .button{
          width:37px;
          height:36px;
          display:inline-block;
          border-radius: 2px;
          padding:0;
          background:#f15a3f;
          line-height: 37px;
          color: #fff;
        }
        .button:hover{
          background:#DA5942;
        }
      }
      .operate-wrap{
        width: 402px;
        margin: 0 auto;
        position:absolute;
        left:0;
        right:0;
        top:118px;
        text-align:left;
        color:#ffffff;
        label{
          opacity: 0.6;
          font-size: 14px;
          line-height: 1;
          letter-spacing: 0.7px;
          color: #ffffff;
          .el-checkbox__input{
            vertical-align: initial;
          }
          .el-checkbox__inner{
            display:inline-block;
            width: 11px;
            height: 11px;
            border-radius: 3px;
            border: solid 1px #ffffff;
            background-color: rgba(0,0,0,0);
            font-family: "iconfont" !important;
            font-size: 10px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            color:#f15a3f;
          }
          .el-checkbox__inner::after {
              border: 0;
          }
          .el-checkbox__input.is-checked .el-checkbox__inner::after {
              border-color: #ffffff;
              background-color: rgba(0,0,0,0);
              content: "\e610"; 
              top: 0px;
              left: 0px;
              transform:rotate(0deg);
              -ms-transform:rotate(0deg); /* Internet Explorer */
              -moz-transform:rotate(0deg); /* Firefox */
              -webkit-transform:rotate(0deg); /* Safari 和 Chrome */
              -o-transform:rotate(0deg); /* Opera */
          }
        }
        .el-dropdown-link{
          opacity: 0.6;
          font-size: 14px;
          line-height: 1;
          letter-spacing: 0.7px;
          color: #ffffff;
          margin-left:70px;
        }
        .register-button{
          opacity: 0.6;
          font-size: 14px;
          line-height: 1;
          letter-spacing: 0.7px;
          color: #ffffff;
          margin-left:50px;
          text-decoration:none;
        }
      }
      .operate-wrap>*:hover{
        opacity: 1;
      }
    }
  }
  .total-intro-wrap{
    width:100%;
    height:660px;
    background-color:#ffffff;
    text-align:center;
    .intro-box{
      width:810px;
      display: flex;
      justify-content:space-between;
      padding-top:194px;
      margin:0 auto 0 auto;
      text-align:center;
      .intro-step{
        width:240px;
        display:inline-block;
        .icon-box{
          width: 154px;
          height: 154px;
          margin:0 auto;
          line-height:154px;
        }
        .step-title{
          font-size: 20px;
          font-weight: 500;
          text-align: center;
          color: #000000;
          margin-top:75px;
        }  
        .step-text{
          font-size: 18px;
          font-weight: 300;
          margin-top: 48px;
        } 
      }
    }
  }
  .detail-intro-wrap{
    width:100%;
    height:800px;
    text-align:center;
    .detail-title{
      height:40px;
      font-size: 40px;
      font-weight: 300;
      line-height: 1;
      letter-spacing: 2.2px;
      text-align: center;
      color: #ffffff;
      text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
      padding-top:150px;
      margin:0;
    }
    .detail-text{
      margin-top:50px;
      font-size: 18px;
      font-weight: 300;
      line-height: 2;
      text-align: center;
      color: #ffffff;
    }
    .detail-img{
      display:inline-block;
      width:849px;
      margin-top:30px;
    }
  }
  .detail-intro-wrap1{
    background:url('/static/login/bg1.jpg');
    background-size:1920px 800px;
    background-repeat:no-repeat;
    background-position:center;
    background-origin:content-box;
    background-color:#2f2d2e;
    .detail-img{
      width:500px;
      margin-top: -30px;
    }
  }
  .detail-intro-wrap2{
    background:#ffffff;
    .detail-title,.detail-text{
      color:#000000;
      text-shadow: 0 0px 0 rgba(148, 52, 0, 0.5);
    }
    .detail-img{
      margin-top:100px;
    }
  }
  .detail-intro-wrap3{
    background:url('/static/login/bg2.jpg');
    background-size:1920px 800px;
    background-repeat:no-repeat;
    background-position:center;
    background-origin:content-box;
    background-color:#2f2f2f;
    .detail-img{
      width:700px;
    }
  }
  .bottom-wrap{
    width:100%;
    height:600px;
    text-align:center;
    background:#fff;
    .bottom-title{
      font-size: 36px;
      font-weight: 300;
      line-height: 1;
      text-align: center;
      color: #000000;
      padding-top:195px;
      margin:0;
    }
    .bottom-button{
      display:inline-block;
      text-decoration:none;
      width: 250px;
      height: 60px;
      line-height:60px;
      border-radius: 5px;
      background-color: #ff674b;
      margin-top:104px;
      color:#ffffff;
    }
    .bottom-button:hover{
      background-color: #DA5942;
    }
  }
  .footer-wrap{
    height: 270px;
    background-color: #282828;
    color: #ffffff;
    .links-wrap{
      padding-top:50px;
      text-align:center;
    }
    .links{
      font-size: 18px;
      text-align: center;
      color: #ffffff;
      margin:0 36px;
      text-decoration:none;
    }
    .links:hover{
      color:#888888;
    }
    .tel{
      font-size: 14px;
      line-height: 1;
      margin-top:50px;
    }
    .address{
      font-size: 14px;
      line-height: 1;
      margin-top:15px;
    }
    .bottom-Copyright{
      margin-top:50px;
      font-size: 12px;
      line-height: 1;
      span{
        margin:0 10px;
      }
    }
  }
}
.resetpwd-tooltip{
  width:98px;
  height: 54px;
  .link-wrap{
    text-align: center;
    .link{
      width: 98px;
      height: 29px;
      font-size: 12px;
      line-height: 29px;
      letter-spacing: 0.6px;
      text-align: center;
      color: #888888;
      margin:0 auto;
      cursor:pointer;
      text-decoration:none;
    }
    .link:hover{
      color: #000000;
    }
    .line{
      width: 98px;
      height: 1px;
      font-size: 12px;
      text-align: center;
      background:#888888;
      margin: 0 auto;
    }
  }
}
.resetpwd-tooltip{
  width:120px;
  height:61px;
  padding:0;
  cursor:pointer;
  background:red;
  border-radius:2px!important;
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
@media screen and (min-width: 1920px) {
  .swiper-box{
    display:none;
  }
  .swiper-img{
    display:block!important;
  }
}
</style>
