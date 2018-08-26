<template>
  <div class="mosaicitem-1" :class="{uploaded: uploaded}">
    <div class="mosaicitemContent-1">
      <img class="photo" :src="publishImg" @click.stop="previewAlbum"/>
      <div class="content-text">
        <div class="idTitle">
          <div></div>
          <div class="right">
            <el-button class="publish-net" v-show="canClick" type="text" @click="dialogTableVisible = true">发布至互联网</el-button>
            <p class="publish-net-2" v-show="!canClick">已发布至互联网</p>
            <!--ele弹窗-->
            <el-dialog class="condyDialog" title="设置微信分享" :visible.sync="dialogTableVisible">
              <div>
                <div class="shareText">分享图片</div>
                  <el-upload
                   class="avatar-uploader"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <div id="secondPart">
                <div class="shareText">分享标题与描述</div>
                <el-input id="input-title" v-model="inputData" style="margin: 10px" placeholder="请输入标题"></el-input>
                <el-input style="margin: 12px"
                  type="textarea"
                  :rows="5"
                  placeholder="请输入描述内容"
                  v-model="textAreaContent">
                </el-input>
              </div>
              <div class="save-cancel">
                <el-button type="primary">保    存</el-button>
                <el-button type="primary" @click="dialogTableVisible = false; dialogTableVisibleSuccess=true; publishSuccess()">发    布</el-button>
              </div>
            </el-dialog>
            <el-dialog class="dialogSuccess" title="设置微信分享" :visible.sync="dialogTableVisibleSuccess">
              <div>
                <div style="color: #98D15D; text-align: center">互联网发布成功</div>
                <canvas id="canvas" class="show-code"></canvas>
                <div style="text-align: center">
                    <el-button round style="padding-top: 5px;padding-bottom: 5px;padding-left: 10px;padding-right: 10px">下载二维码</el-button>
                </div>
              </div>
            </el-dialog>
          <div class="delete el-icon-delete cursor-pointer" @click="open4"></div>
          </div>
        </div>
        <div class="publishId">{{publishId}}</div>
        <div class="itemName">{{title1}}</div>
        <div class="author-from">
          <div>作者：{{author}}</div>
          <div>&nbsp</div>
          <div>编辑：{{from}}</div>
        </div>
        <div class="type">{{tipsList.join("/")}}</div>
        <span class="date-info">创建于：{{createTime1}}    发布于：{{publishTime1}}
        </span>
        <span class="content-text-main">
          {{albumDetail}}
        </span>
      </div>
      <img class="publish-icon" src="/static/publishIcon.png"/>
    </div>

  </div>
</template>
<script>
import Vue from 'vue'
// import comuploadimgcell from '../../components/pano/comuploadimgcell'
import bordertext from '../../components/common/bordertext'
import QRCode from 'qrcode'
Vue.use(QRCode)

export default {
  name: 'mosaicitem1',
  props: {
    uploaded: true,
    from: '',
    publishId: '',
    createTime1: '',
    publishTime1: '',
    author: '',
    albumDetail: '',
    publishImg: '',
    title1: '',
    tipsList: null
  },
  data () {
    return {
      type: '大量区/科教/展览',
      addressToCode: 'http://pano.shunde.vizen.cn/album/src/index.html?albumId=' + this.publishId + '&lang=&vrflag=on',
      tiles: [{
        img: '/static/login/img1.png',
        text: '',
        disable: false
      }],
      canClick: true,
      textAreaContent: '',
      imageUrl: '',
      inputData: '',
      search: {
        placeholder: '搜索关键字'
      },
      example3: {
        img: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png',
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true
      },
      dialogTableVisible: false,
      dialogTableVisibleSuccess: false
    }
  },
  watch: {
    publishId () {
      this.canClick = true
    }
  },
  created () {
  },
  methods: {
    previewAlbum () {
      if (this.publishId) {
        window.open(`http://pano.shunde.vizen.cn/album/src/index.html?albumId=${this.publishId}&lang=&vrflag=on`, '_blank')
      }
    },
    publishSuccess () {
      setTimeout(() => {
        this.useqrcode()
      }, 100)
    },
    // 删除对话框
    open4 () {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '如果已入库数据被删除，则无法被恢复 '),
          h('br'),
          h('i', { style: 'color: red' }, '是否执行删除？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            }, 3000)
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'success',
          message: '专题已经删除成功，\n' +
          '请在已删除模块中查看 '
        })
      })
    },
    useqrcode () {
      var canvas = this.$el.getElementsByClassName('show-code')
      canvas.height = canvas.height
      QRCode.toCanvas(canvas[0], `http://pano.shunde.vizen.cn/album/src/index.html?albumId=${this.publishId}&lang=&vrflag=on`, function (error) {
        if (error) console.error(error)
        console.log('success!')
      })
      this.canClick = false
    },
    mounted () {
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    getTiles () {
      if (!this.tiles) {
        this.tiles = []
      }
      while (this.tiles.length < 9) {
        this.tiles.push(this.getCellObj())
      }
      return this.tiles
    },
    // 更新cells里面的数组
    computecells (tile) {
      return tile && tile.img
    },
    getCellObj () {
      return {
        img: '',
        text: '',
        disable: false
      }
    },
    handleRemove (file) {
    }
  },
  computed: {},
  components: {
    // comuploadimgcell,
    bordertext
  }
}

</script>

<style lang="scss">
  $colord3: #d3d3d3;
  $color6f: #6f6f6f;
  $color1b: #1bb1e6;
  .shareText{
    color: #4B4B4B;
    margin-top: 20px;
    margin-left:10px;
    font-size: 16px;
  }
  .date-info{
    text-align: left;
  }
  // .el-message--success{
  //   position: absolute;
  //   top: 50%;
  //   height: 50px;
  //   left: 35%;
  //   background: #000000;
  //   opacity: 0.8;
  // }
  #canvas{width:200px!important;height:200px!important;}
  #describe-dialog{
    width: 100%;
    border-width: 1px;
    margin-top: 20px;
    margin-left: 10px;
  }
  #secondPart{
    margin-left: 20px;
  }

  .save-cancel{
    position: absolute;
    width: 300px;
    bottom: 20px;
    left: 30%;
    display: flex;
    flex-direction: row;
  }
  .el-button--primary{
    width: 120px;
  }
  .publish-net-2{
    margin-left: 10px;
    overflow: hidden;
    border-radius: 10px;
    padding-left: 5px;
    padding-top:1px;
    padding-bottom: 1px;
    white-space: nowrap;
    padding-right:5px;
    text-align: center;
    font-size: 14px;
    border-width: 0px;
    cursor:default;

    background-color: #FFF;
    color: #808080;
  }
  .mosaicitem-1{
    width: 40%;
    height: 220px;
    position: relative;
    overflow: hidden;
    margin-left: 50px;
    margin-right: 50px;
    border-radius:3px;
    margin-top: 10px;
    text-align: center;
    margin-bottom: 10px;
    .mosaicitemContent-1{
      position: relative;
      margin-left: 2.5%;
      display: flex;
      height:100%;
      box-shadow: 0px 0px 10px 1px #d3d3d3;
      background:#fff;
      border-color: transparent;
      width: 95%;
      flex-flow: row nowrap;
      .content-text{
        text-align: left;
        overflow: hidden;
        display: flex;
        margin-left: 2.5%;
        margin-right: 2.5%;
        margin-top:10px;
        margin-bottom:10px;
        flex-direction: column;
        .itemName, .itemEdit{
          display: flex;
          align-items: center;
          font-weight: bold;
          margin-top: 10px;
          font-size: 16px;
        }
        .author-from{
          margin-top:5px;
          display: flex;
          font-size: 10px;
          flex-direction: row;
        }
        .type{
          margin-top:12px;
          display: flex;
          font-size: 10px;
          color: #808080;
          flex-direction: row;
        }
        .content-text-main{
          font-size:10px;
          color: #808080;
          margin-top: 5px;
          text-align: left;
        }

      }
      .publishId{
        margin-top: 5px;
        color: #00aeff;
        padding: 1px;
        border-width: 1px;
      }
      .idTitle{
        flex-direction: row;
        justify-content: space-between;
        display: flex;
        .right{
          flex-direction: row;
          display: flex;
        }
        .publish-net{
            margin-left: 10px;
            border-radius: 10px;
            padding-left: 5px;
            padding-top:1px;
            padding-bottom: 1px;
            padding-right:5px;
            text-align: center;
            font-size: 14px;
            background-color: #00aeff;
            color: #FFF;
            &:hover{
              color: $color6f;
            }
        }
        .delete{
            margin-left: 20px;
            color: $colord3;
            font-size:22px;
            &:hover{
              color: $color6f;
            }
        }

      }
      .photo{
        width: 43%;
        min-width: 250px;
      }

      .center{
        flex: 1;
        display: flex;
        align-items: center;
        .centerContent{
          .centerTitleBox{
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            .centerTitle{
              margin-right: 10px;
              color: #373737;
            }
          }
        }
        .imgsContent{
          display:flex;
        }
        .item{
          margin-right: 2px;
        }
      }
      .publish-icon{
        position: absolute;
        left: 0;
        top: 0;
        height: 25%;
      }
    }
    .itemIconBox{
      position: absolute;
      left: 0;
      top: 0;
      .itemIconBorder{
        border-width:18px;
        border-style:solid;
        border-color:$color6f transparent transparent $color6f;/*透明 透明  灰*/
      }
      .itemIcon{
        position: absolute;
        font-size: 12px;
        top:6px;
        left:6px;
        font-weight: lighter;
        color: #fff;
      }
    }
    &.uploaded{
      .itemIconBox{
        .itemIconBorder{
          border-color:$color1b transparent transparent $color1b;/*透明 透明  灰*/
        }
      }
      border-color: $color1b;
    }
    .condyDialog{
      .el-dialog{
        height: 400px;
        width: 600px;
        position: absolute;
        left:50%;
        top: 10%;
        margin-left: -300px;
        .el-dialog__header{
          background-color: #F5F5F5;
          padding-left: 20px;
          padding-top: 15px;
          padding-bottom: 15px;
          .el-dialog__title{
            font-weight:bold;
          }
        }
        .el-dialog__body{
          display: flex;
          flex-direction: row;
          padding-right: 40px;
        }
      }
    }
    .avatar-uploader{
      margin-top: 10px;
      margin-left: 10px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .dialogSuccess {
      .el-dialog{
        height: 350px;
        width: 300px;
        position: absolute;
        left:50%;
        top: 10%;
        margin-left: -150px;
        .el-dialog__body{
          padding: 10px;
          display: flex;
          justify-content: center;
        }
      }

    }

  }
</style>

