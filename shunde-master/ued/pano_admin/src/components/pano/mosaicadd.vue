<template>
  <transition name="el-zoom-in-top">
    <div class="mosaicadd compopup" >
      <div style="width:400px;">
        <div class="modelHeader compopup-header">
          <div class="modelHeaderText">
            <div>新增拼接工程</div>
            <div class="question cursor-pointer" @click.stop="showMentionPop"></div>
          </div>
          <div class="modelClose cursor-pointer el-icon-close" @click.stop="closeEvent"></div>
        </div>
        <div class="modelBody compopup-body">
          <input class="panoName" placeholder="请输入全景名称" v-model="panoName" @keyup.enter.stop="editPanoName"/>
          <div class="bodyBox" 
            :class="{opacity5: !panoId}" >
            <div class="bodycontainer">
              <div class="bodyHeader">
                上传拼接素材
                <div class="uploadSet cursor-pointer" @click.stop="uploadSet">批量上传</div>
              </div>
              <div class="titleWord">水平拍摄</div>
              <div class="cellBox">
                <comuploadimgcell  class="item"  :src="imgs['1'].imgSrc" 
                  :id="panoId" :file="imgs['1'].file" :position="imgs['1'].position" 
                  @src-change="stitchSrcChange" @loading-change="loadingChange"/>
                <comuploadimgcell  class="item"  :src="imgs['2'].imgSrc" 
                  :file="imgs['2'].file" :id="panoId" :position="imgs['2'].position" 
                  @src-change="stitchSrcChange" @loading-change="loadingChange"/>
                <comuploadimgcell  class="item"  :src="imgs['3'].imgSrc" 
                  :file="imgs['3'].file" :id="panoId" :position="imgs['3'].position" 
                  @src-change="stitchSrcChange" @loading-change="loadingChange"/>
                <comuploadimgcell  class="item"  :src="imgs['4'].imgSrc" 
                  :file="imgs['4'].file" :id="panoId" :position="imgs['4'].position" 
                  @src-change="stitchSrcChange" @loading-change="loadingChange"/>
                <comuploadimgcell  class="item"  :src="imgs['5'].imgSrc" 
                  :file="imgs['5'].file" :id="panoId" :position="imgs['5'].position" 
                  @src-change="stitchSrcChange" @loading-change="loadingChange"/>
                <comuploadimgcell  class="item"  :src="imgs['6'].imgSrc" 
                  :file="imgs['6'].file" :id="panoId" :position="imgs['6'].position" 
                  @src-change="stitchSrcChange" @loading-change="loadingChange"/>
              </div>
              <div class="cellLastBoxTitle titleWord">
                <div class="titleWord">斜拍补天</div>
                <div class="titleWord">垂直补底</div>
              </div>
              <div class="cellLastBox">
                <div class="cellXiepaiBox">
                  <comuploadimgcell  class="item"  :src="imgs['7'].imgSrc" 
                    :id="panoId" :file="imgs['7'].file" :position="imgs['7'].position" 
                    @src-change="stitchSrcChange" @loading-change="loadingChange"/>
                </div>
                <div  class="cellChuizhiBox">
                  <comuploadimgcell  class="item"  :src="imgs['8'].imgSrc" 
                    :id="panoId" :file="imgs['8'].file" :position="imgs['8'].position" 
                    @src-change="stitchSrcChange" @loading-change="loadingChange"/>
                  <comuploadimgcell  class="item"  :src="imgs['9'].imgSrc" 
                    :id="panoId" :file="imgs['9'].file" :position="imgs['9'].position" 
                    @src-change="stitchSrcChange" @loading-change="loadingChange"/>
                </div>
              </div>
            </div>
            <div  class="panoIdMask" 
            v-bind:title="panoId?'':'请先输入全景名并按enter保存'"
            v-show="!panoId"
            />
          </div>
          <div class="btns">
            <div class="btn btnSave commonbtn" @click.stop="save">确认并保存</div>
            <div class="btn btnStartMerge commonbtn" :class="{'commonbtn-disabled': !readyToCreate}" @click.stop="create">开始拼接</div>
          </div>
        </div>
      </div>
      <div class="mask uploadSetMentionMask" @click.stop="cancelPop" v-show="isMentionPop">
        <div class="compopup uploadSetMention transform-center" @click.stop="">
          <div class="compopup-header">
            提示
          </div>
          <div class="compopup-body">
            <img class="mention-img" src="../../../static/pano/icon-mention.png"/>
            <div class="mention-text">
                按照<a>规范</a>中要求的命名方式命名后
                </br>统一上传一张全景图所需的9张素材图</div>
            <div class="compopup-btns">
              <div class="compopup-btn-sure" @click.stop="cancelPop">确定</div>
              <!-- <div class="compopup-btn-sure" @click.stop="sureUploadSet">开始上传</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import comuploadimgcell from '../../components/pano/comuploadimgcell.vue'

export default {
  name: 'mosaicadd',
  props: {
    text: null
  },
  data () {
    return {
      panoId: '',
      panoName: '',
      readyToCreate: false,
      // @loading-change="loadingChange"
      imgs: {
        '1': {imgSrc: null, position: '01', isLoading: false},
        '2': {imgSrc: null, position: '02', isLoading: false},
        '3': {imgSrc: null, position: '03', isLoading: false},
        '4': {imgSrc: null, position: '04', isLoading: false},
        '5': {imgSrc: null, position: '05', isLoading: false},
        '6': {imgSrc: null, position: '06', isLoading: false},
        '7': {imgSrc: null, position: '07', isLoading: false},
        '8': {imgSrc: null, position: '08', isLoading: false},
        '9': {imgSrc: null, position: '09', isLoading: false}
      },
      isMentionPop: false
    }
  },
  methods: {
    createPano () {
      return new Promise((resolve, reject) => {
        if (this.panoId) {
          setTimeout(() => {
            resolve()
          })
          return
        }
        if (!this.panoName) {
          this.$message('请输入全景名称')
          reject()
          return
        }
        this.$api.ceatePano({
          panoName: this.panoName
        }).then(res => {
          if (res.code === 0) {
            this.panoId = res.data.id
            resolve()
          } else {
            this.$message({
              type: 'warning',
              text: res.msg
            })
            reject()
          }
        })
      })
    },
    clearCell () {
      for (let i in this.imgs) {
        this.imgs[i].imgSrc = null
        this.imgs[i].isLoading = false
        this.imgs[i].imgSrcLoad = false
      }
      // console.log(this.imgs)
      this.panoName = ''
    },
    loadingChange (isLoading, position) {
      // console.log(isLoading + '--' + position)
      for (let i in this.imgs) {
        if (this.imgs[i].position.indexOf(position + '') > -1) {
          this.imgs[i].isLoading = isLoading
          break
        }
      }
      // console.log(this.imgs)
    },
    closeEvent () {
      this.$emit('close')
    },
    save () {
      for (let i in this.imgs) {
        if (this.imgs[i].isLoading) {
          this.$message(`素材上传中, 请稍后`)
          return
        }
        // console.log(i, this.imgs[i].isLoading, this.imgs[i])
      }
      this.createPano().then(() => {
        this.clearCell()
        this.panoId = ''
        this.$emit('close')
        this.$emit('save')
      })
    },
    create () {
      if (this.readyToCreate && this.panoId) {
        for (let i in this.imgs) {
          if (this.imgs[i].isLoading) {
            this.$message(`素材上传中, 请稍后`)
            return
          }
        }
        this.$api.processPano({
          panoId: this.panoId
        }).then(res => {
          if (res.code === 0) {
            this.panoId = ''
            this.clearCell()
            this.$emit('close')
            this.$emit('save')
          }
        })
      }
    },
    editPanoName () {
      let updateName = () => {
        if (!this.panoName) {
          this.$message('请输入全景名称')
          return
        }
        this.$api.updatePanoName({
          panoId: this.panoId,
          panoName: this.panoName
        }).then((res) => {
          if (res.code !== 0) {
            this.$message.error(res.msg)
          }
        })
      }
      if (this.panoId) {
        updateName()
      } else {
        let panoName = this.panoName
        this.createPano().then(() => {
          this.panoName = panoName
          updateName()
        })
      }
    },
    uploadSet () {
      let self = this
      self.$utils.uploadStitchBatch((files) => {
        for (let i in self.imgs) {
          if (self.imgs[i] && files[i]) {
            self.$set(self.imgs[i], 'file', files[i])
          }
        }
      })
    },
    stitchSrcChange (src, position, cell) {
      for (let i in this.imgs) {
        if (this.imgs[i].position === position) {
          this.imgs[i].imgSrc = src || false
          // this.imgs[i].imgSrcLoad = src || false
          break
        }
      }
      this.readyToCreateHandle()
    },
    readyToCreateHandle () {
      // console.log(this.imgs)
      for (let i in this.imgs) {
        if (!this.imgs[i].imgSrc) {
          this.readyToCreate = false
          return
        }
        // if (!this.imgs[i].imgSrcLoad) {
        //   this.readyToCreate = false
        //   return
        // }
      }
      this.readyToCreate = true
    },
    // mention pop
    showMentionPop () {
      this.isMentionPop = true
    },
    cancelPop () {
      this.isMentionPop = false
    },
    sureUploadSet () {
      //
    }
  },
  components: { comuploadimgcell },
  watch: {
    panoId () {
      // if (!this.panoId) {
      //   this.createPano()
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
  $color1b: #1bb1e6;
  $colorf5: #f5f5f5;
  $colorde: #dedede;
  $color6f: #6f6f6f;
  $padding: 16px;
  $margin: 60px;

  .mosaicadd{
    .titleWord{
      color: $color6f;
      font-size:12px;
      padding:2px 0;
      display: flex;
      margin: 4px 0 2px;
    }
    .modelHeader{
      display: flex;
      justify-content: space-between;
      .modelHeaderText,.modelClose{
        display: flex;
        align-items: center;
      }
      .question{
        margin-left: 8px;
      }
    }
    .modelBody{
      display: flex;
      flex-flow: column nowrap;
      .panoName{
        text-align: center;
        padding: 15px 0 8px;
        border-bottom:1px solid $colorde !important;
        outline: none;
      }
      .bodyHeader{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin:10px 0;
        .uploadSet{
          font-size:0.8em;
          background: $color1b;
          color: #fff;
          padding:0 8px;
          display: flex;
          align-items: center;
          border-radius:8px;
        }
      }
      .cellBox{
        width:320px;
        display: flex;
        justify-content: space-between;
      }
      .cellLastBoxTitle{
        >div{
          margin-right: $margin;
        }
      }
      .cellLastBox, .cellChuizhiBox{
        display: flex;
      }
      .cellChuizhiBox{
        margin-left: $margin;
        >div{
          margin-right: 6px;
        }
      }
      .btns{
        display: flex;
        color: #fff;
        margin:20px 0 0;
        justify-content: center;
        .btnSave{
          margin-right:10px;
        }
      }
    }
    .uploadSetMentionMask{
      position: absolute;
      left: 0;
      top:0;
      width:100%;
      height:100%;
    }
    .uploadSetMention{
      width: 300px;
      .compopup-header{
        display: flex;
        align-items: center;
      }
      .compopup-body{
        text-align: center;
        .mention-img{
          width: 30%;
          margin-top: 20px;
        }
        .mention-text{
          margin:20px 0;
          color: #373737;
          a{
            color: $color1b;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
    .opacity5{
      opacity: 0.5;
    }
    .bodyBox{
      position: relative;
      .panoIdMask{
        position: absolute;
        left: 0;
        top: 0;
        width:100%;
        height:100%;
      }
    }
  }
</style>

