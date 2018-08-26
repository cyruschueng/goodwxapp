<template>
    <div class="pagesRouterview">
        <div id="topBanner">
            <div id="titleBox" :title="title">{{title}}</div>
            <div id="routerBox">
                <div id="routerContainer">
                  <router-link class="routerItem" :class="getRouter(router.path)" v-for="router in navirouters" :to="{ path: router.path }" :title="router.name">
                    {{router.name}}
                  </router-link>
                </div>
            </div>
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
            <div id="otherBox">
              <div class="userBox cursor-pointer"  @click="clickToUserCenter" title="前往个人中心">
                <div class="photoBox" ><img class="photo" alt="" :src="userPhoto"/></div>
                <div class="userName line-ellipsis">{{userInfo.userName}}</div>
              </div>
              <div class="line">|</div>
              <div class="quit cursor-pointer" @click="clickQuit">退出</div>
              <div class="problem cursor-pointer" @click="clickProblem">?</div>
            </div>
        </div>
        <router-view class="routerView"></router-view>
    </div>
</template>
<script>
export default {
  name: 'app',
  created () {
    setTimeout(() => {
      this.setCustomRouter()
    }, 200)
  },
  mounted () {
  },
  data () {
    return {
      dialogTableVisible: false,
      navirouters: [{
        name: '全景管理',
        path: '/pages/pano'
      },
      {
        name: '空间管理',
        path: '/pages/space'
      },
      {
        name: '专题管理',
        path: '/pages/album'
      },
      {
        name: '发布管理',
        path: '/pages/publish'
      },
      {
        name: '三维管理',
        path: '/pages/module'
      },
      {
        name: '拍摄需求',
        path: '/pages/shot'
      },
      {
        name: '业务统计',
        path: '/pages/static'
      }],
      title: '顺德区地理国情监测全景平台',
      userPhoto: './static/login/photo.png',
      userName: '明天你好',
      pageRouter: ''
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    setCustomRouter () {
      switch (this.$cookie.get('roleId')) {
        case '1':
          this.navirouters = [{
            name: '全景管理',
            path: '/pages/pano'
          },
          {
            name: '空间管理',
            path: '/pages/space'
          },
          {
            name: '专题管理',
            path: '/pages/album'
          },
          {
            name: '发布管理',
            path: '/pages/publish'
          },
          {
            name: '三维管理',
            path: '/pages/module'
          },
          {
            name: '拍摄需求',
            path: '/pages/shot'
          }]
          break
        case '2':
          break
        case '3':
          break
      }
    },
    showInfo () {
      this.dialogTableVisible = true
    },
    getRouter (path) {
      return (this.$route.path && this.$route.path.indexOf(path) > -1) ? 'routerActive' : ''
    },
    clickToUserCenter () {
      this.$router.push('/pages/usercenter')
    },
    clickQuit () {
      this.$api.userLoginOut().then(res => {
        if (res.code === 0) {
          this.$cookie.delCookies()
          this.$router.push('/index')
          this.openSuccess('退出成功')
        } else {
          this.openError('退出成功失败')
        }
      })
      this.$api.userLogOut()
    },
    clickProblem () {
      console.log('problem')
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
  },
  watch: {
    $route (route, oldRoute) {}
  }
}
</script>

<style lang="scss">
$toppadding: 24px;
$fontsize: 13px;

.pagesRouterview{
  min-height: 100%;
  display: flex;
  flex-flow: column nowrap;
  #topBanner {
      height: 60px;
      background: #4DB0E2;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 $toppadding;
      color:#ffffff;
      font-size:$fontsize;
      #titleBox, #routerBox, #otherBox{
        display: flex;
      }
      #routerBox{
        flex: auto;
        justify-content: center;
      }
      #otherBox{
        align-items:center;
      }
    #aboutUs{
      cursor: pointer;
      height:20px;
      color: #FFFFFF;
      font-size: 14px;
      word-spacing: 5px;
      width: 100px;
    }
    .aboutDialog {
      background: #FFF;
      .el-dialog {
        width: 70%;
        background: #D9D9D9;
        opacity: 0.9;
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
  }
  #titleBox{
    font-size:1.2em;
  }
  #routerContainer{
    display: inline-block;
    .routerItem{
      color:#fff;
      display:inline-block;
      position:relative;
      margin-right:10px;
      font-size: 14px;
    }
    .routerItem:after{
      content:'';
      background:#fff;
      position: absolute;
      left: 0px;
      bottom: -2px;
      height: 2px;
      width: 100%;
      transition:transform 200ms;
      transform:scaleX(0);
    }
    .routerItem.routerActive:after{
      transform:scaleX(1);
    }
    .routerItem:hover:after{
      transform:scaleX(1);
    }
  }
  #otherBox{
    font-size:$fontsize;
    .userBox{
      display:flex;
      align-items:center;
    }
    .photoBox{
      height:24px;
      width:24px;
      background:#fff;
      border-radius:12px;
      box-shadow:0px 2px 3px 0px rgba(0,0,0,0.3);
      overflow: hidden;
      display: flex;
      align-items:center;
      justify-content: center;
      .photo{
        width:22px;
        height:22px;
        border-radius:11px;
      }
    }
    .userName{
      margin-left:7px;
      max-width: 60px;
    }
    .line{
      margin:0 4px;
    }
    .quit{
      color:#000;
      border-bottom:1px #000 solid;
    }
    .problem{
      margin-left:14px;
      border:1px solid #fff;
      width:16px;
      height:16px;
      border-radius:10px;
      text-align: center;
    }
  }
  .routerView{
    flex: 1;
  }
}

</style>

