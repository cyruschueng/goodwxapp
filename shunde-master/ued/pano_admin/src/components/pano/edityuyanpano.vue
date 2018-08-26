<template>
  <transition name="el-zoom-in-top">
    <div class="edityuyanpano compopup" >
      <div style="width:400px;">
        <div class="modelHeader compopup-header">
          <div class="modelHeaderText">
            <div>鱼眼拼接素材</div>
            <div class="question cursor-pointer" @click.stop="showMentionPop"></div>
          </div>
          <div class="modelClose cursor-pointer el-icon-close" @click.stop="close"></div>
        </div>
        <div class="modelBody compopup-body">
          <input class="panoName" placeholder="请输入全景名称" v-model="panoName" @keyup.enter.stop="editPanoName"/>
          <div class="bodyBox" 
            :class="{opacity5: !panoId}" >
            <div class="bodycontainer">
              <div class="bodyHeader">
                上传拼接素材
                <div class="uploadSet cursor-pointer" v-show="!isLoading" @click.stop="uploadSet">批量上传</div>
              </div>
              <div class="titleWord">水平拍摄</div>
              <div class="cellBox">
                <uploadstitch  class="item"  
                  :src="imgs['1'].imgSrc" 
                  :id="panoId" 
                  :file="imgs['1'].file" 
                  :position="imgs['1'].position"
                  @upload-file="uploadStitchFile"
                  @src-change="stitchSrcChange" 
                  @loading-change="loadingChange"/>
                <uploadstitch  class="item"  
                  :src="imgs['2'].imgSrc" 
                  :file="imgs['2'].file" 
                  :id="panoId" 
                  :position="imgs['2'].position" 
                  @upload-file="uploadStitchFile"
                  @src-change="stitchSrcChange" 
                  @loading-change="loadingChange"/>
                <uploadstitch  class="item"  
                  :src="imgs['3'].imgSrc" 
                  :file="imgs['3'].file" 
                  :id="panoId" 
                  :position="imgs['3'].position" 
                  @upload-file="uploadStitchFile"
                  @src-change="stitchSrcChange" 
                  @loading-change="loadingChange"/>
                <uploadstitch  class="item"  
                  :src="imgs['4'].imgSrc" 
                  :file="imgs['4'].file" 
                  :id="panoId" 
                  :position="imgs['4'].position" 
                  @upload-file="uploadStitchFile"
                  @src-change="stitchSrcChange" 
                  @loading-change="loadingChange"/>
                <uploadstitch  class="item"  
                  :src="imgs['5'].imgSrc" 
                  :file="imgs['5'].file" 
                  :id="panoId" 
                  :position="imgs['5'].position" 
                  @upload-file="uploadStitchFile"
                  @src-change="stitchSrcChange" 
                  @loading-change="loadingChange"/>
                <uploadstitch  class="item"  
                  :src="imgs['6'].imgSrc" 
                  :file="imgs['6'].file" 
                  :id="panoId" 
                  :position="imgs['6'].position" 
                  @upload-file="uploadStitchFile"
                  @src-change="stitchSrcChange" 
                  @loading-change="loadingChange"/>
              </div>
              <div class="cellLastBoxTitle titleWord">
                <div class="titleWord">斜拍补天</div>
                <div class="titleWord">垂直补底</div>
              </div>
              <div class="cellLastBox">
                <div class="cellXiepaiBox">
                  <uploadstitch  class="item"  
                    :src="imgs['7'].imgSrc" 
                    :id="panoId" 
                    :file="imgs['7'].file" 
                    :position="imgs['7'].position" 
                    @upload-file="uploadStitchFile"
                    @src-change="stitchSrcChange" 
                    @loading-change="loadingChange"/>
                </div>
                <div  class="cellChuizhiBox">
                  <uploadstitch  class="item"  
                    :src="imgs['8'].imgSrc" 
                    :id="panoId" 
                    :file="imgs['8'].file" 
                    :position="imgs['8'].position" 
                    @upload-file="uploadStitchFile"
                    @src-change="stitchSrcChange" 
                    @loading-change="loadingChange"/>
                  <uploadstitch  class="item"  
                    :src="imgs['9'].imgSrc" 
                    :id="panoId" 
                    :file="imgs['9'].file" 
                    :position="imgs['9'].position" 
                    @upload-file="uploadStitchFile"
                    @src-change="stitchSrcChange" 
                    @loading-change="loadingChange"/>
                </div>
              </div>
            </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import uploadstitch from '@/components/pano/uploadstitch.vue'

export default {
  name: 'edityuyanpano',
  props: {
    panoId: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      panoName: '',
      readyToCreate: false,
      isLoading: false,
      imgs: {
        '1': {imgSrc: null, file: null, position: '01', loading: false},
        '2': {imgSrc: null, file: null, position: '02', loading: false},
        '3': {imgSrc: null, file: null, position: '03', loading: false},
        '4': {imgSrc: null, file: null, position: '04', loading: false},
        '5': {imgSrc: null, file: null, position: '05', loading: false},
        '6': {imgSrc: null, file: null, position: '06', loading: false},
        '7': {imgSrc: null, file: null, position: '07', loading: false},
        '8': {imgSrc: null, file: null, position: '08', loading: false},
        '9': {imgSrc: null, file: null, position: '09', loading: false}
      },
      isMentionPop: false
    }
  },
  methods: {
    loadingChange (loading, position) {
      let isLoading = false
      for (let i in this.imgs) {
        if (this.imgs[i].position === position) {
          this.imgs[i].loading = loading
        }
        if (this.imgs[i].loading) {
          isLoading = true
        }
      }
      this.isLoading = isLoading
    },
    close () {
      // this.clearSpace()
      this.$emit('close')
    },
    save () {
      // for (let i in this.imgs) {
      //   if (this.imgs[i].loading) {
      //     this.$message(`素材上传中, 请稍后`)
      //     return
      //   }
      // }
      if (this.isLoading) {
        this.$message('正在上传，请稍后！')
        return
      }
      if (!this.panoName) {
        this.$message('请输入全景名称')
        return
      }
      this.$api.updatePanoName({
        panoId: this.panoId,
        panoName: this.panoName
      }).then((res) => {
        if (res.code === 0) {
          this.$emit('close')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    create () {
      if (this.readyToCreate && this.panoId) {
        for (let i in this.imgs) {
          if (this.imgs[i].loading) {
            this.$message(`素材上传中, 请稍后`)
            return
          }
        }
        this.$api.processPano({
          panoId: this.panoId
        }).then(res => {
          if (res.code === 0) {
            // this.panoId = ''
            // this.clearSpace()
            this.$emit('close')
            // this.$emit('save')
          }
        })
      }
    },
    editPanoName () {
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
    uploadStitchFile (file, position, id) {
      for (let i in this.imgs) {
        if (this.imgs[i].position === position) {
          this.imgs[i].file = file
          this.$set(this.imgs[i], 'file', file)
          break
        }
      }
      // console.log(this.imgs)
    },
    stitchSrcChange (src, position, id) {
      for (let i in this.imgs) {
        if (this.imgs[i].position === position) {
          this.imgs[i].imgSrc = src || null
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
    },
    clearSpace () {
      for (let i in this.imgs) {
        this.imgs[i].imgSrc = null
        this.imgs[i].loading = false
        this.imgs[i].file = null
      }
      this.panoName = ''
    }
  },
  components: {
    uploadstitch
  },
  watch: {
    panoId () {
      this.clearSpace()
      if (this.panoId) {
        this.$api.getPanoStitch({
          panoId: this.panoId
        }).then(res => {
          if (res && res.code === 0) {
            // console.log(res)
            if (res.data) {
              for (let i in res.data.stitch) {
                if (this.imgs[i]) {
                  this.imgs[i].imgSrc = res.data.stitch[i].listShowUrl || res.data.stitch[i].singleShowUrl
                }
              }
              this.panoName = res.data.name
            }
          } else {
            this.$message(res.msg)
          }
        })
      }
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

  .edityuyanpano{
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
  }
</style>

