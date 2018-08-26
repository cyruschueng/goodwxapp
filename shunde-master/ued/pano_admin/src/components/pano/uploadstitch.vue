<template>
  <transition name="el-zoom-in-top">
    <div class="uploadstitch" @click.stop>
      <div class="empty cursor-pointer" v-show="!src" @click.stop="inputFile">
        <div class="emptyIcon el-icon-plus" ></div>
        <div class="emptyWord" v-text="position" v-show="position"></div>
      </div>
      <div class="loaded" v-show="src">
        <img class="img" v-show="src" :src="src" />
        <div class="loadedIcons">
          <div class="loadedUpPart" @click.stop="inputFile">
            <div class="loadedIcon el-icon-picture-outline"></div>
          </div>
          <div class="loadedDownPart" @click.stop="deleteStitch">
            <div class="loadedIcon el-icon-delete"></div>
          </div>
        </div>
      </div>
      <div class="loading disableDiv" v-if="innerLoading">
        <el-progress class="loadingCell" :show-text="progressText" type="circle" :percentage="progress" :width="progressWidth"></el-progress>
      </div>
      <div class="disableDiv" v-show="disabled"></div>
    </div>
  </transition>
</template>
<script>
import { fileMd5Factory, checkPicture } from '@/filters'
import { resourPicShowUrl, resourPicFactUrl } from '@/api/urlprovider.js'
const getMd5 = fileMd5Factory()

export default {
  name: 'uploadstitch',
  props: {
    id: null,
    src: null,
    file: null,
    position: null,
    disabled: false,
    loading: false
  },
  created () {},
  data () {
    return {
      progress: 0,
      progressWidth: 40,
      progressText: false,
      innerLoading: this.loading,
      md5: null
    }
  },
  computed: {
    createUploadInput () {
      if (!this.$el._uploadInput) {
        this.$el._uploadInput = document.createElement('input')
        this.$el._uploadInput.setAttribute('type', 'file')
      }
      return this.$el._uploadInput
    }
  },
  methods: {
    clearSpace () {
      this.md5 = null
      this.innerLoading = false
    },
    inputFile () {
      let self = this
      this.createUploadInput.onchange = function (e) {
        self.$emit('upload-file', e.target.files[0], self.position, self.id)
        self.createUploadInput.value = null
      }
      this.createUploadInput.click()
    },
    uploadFile () {
      if (!/jpg/i.test(this.file.name)) {
        this.$message({
          showClose: true,
          message: `${this.position} 图片格式必须为jpg，请重新上传`,
          type: 'warning'
        })
        return
      }
      getMd5(this.file, md5 => {
        if (this.md5 === md5) {
          this.$message({
            showClose: true,
            message: `${this.position} 不能上传同一幅照片！`,
            type: 'warning'
          })
          return
        }
        this.getExif([this.file], this.position, md5)
      })
    },
    getExif (files, position, md5) {
      this.innerLoading = true
      checkPicture(files, exif => {
        if (exif === 0) {
          this.innerLoading = false
          this.$message({
            showClose: true,
            message: `${this.position} 图片参数不符合要求，请重新上传`,
            type: 'warning'
          })
          return
        }
        if (exif === -1) {
          this.innerLoading = false
          this.$message({
            showClose: true,
            message: `${this.position} 图片没有exif信息，请重新选择`,
            type: 'warning'
          })
          return
        }
        this.uploadImg(this.id, files[0], position, path => {
          this.savePanoItem(path, position, exif, md5)
        })
      })
    },
    progressHandler (pro) {
      this.progress = Math.floor(pro * 100)
    },
    uploadImg (id, file, position, callback, error, process) {
      this.progressHandler(0)
      this.$api.uploadPanoTilesToCos(file, `${id}/${position}.JPG`, callback, null, this.progressHandler)
    },
    savePanoItem (url, position, exif, md5) {
      if (!this.id) {
        this.innerLoading = false
        return
      }
      let listShowUrl = url.replace(resourPicFactUrl, resourPicShowUrl) + '/small32'
      let singleShowUrl = url.replace(resourPicFactUrl, resourPicShowUrl) + '/small110'
      let params = {
        panoId: this.id,
        position: this.position,
        picInfo: Object.assign({
          url: url,
          name: `${this.position}.JPG`,
          md5: md5,
          listShowUrl: listShowUrl,
          singleShowUrl: singleShowUrl
        }, exif)
      }
      this.$api.updatePanoStitchPic(params).then(res => {
        if (res.code === 0) {
          this.md5 = md5
          this.picInfo = params.picInfo
          this.$emit('src-change', `${singleShowUrl}?time=${+new Date()}`, this.position, this.id)
          this.$message(`图片上传成功:0${position}.JPG`)
        }
        this.innerLoading = false
      })
    },
    deleteStitch () {
      this.$api.deleteOnePanoStitchPic({
        panoId: this.id,
        position: this.position
      }).then(res => {
        if (res.code === 0) {
          this.$emit('src-change', null, this.position, this.id)
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'warning'
          })
        }
      })
    }
  },
  watch: {
    file () {
      this.file && this.uploadFile(this.file)
    },
    id () {
      this.clearSpace()
    },
    innerLoading () {
      this.$emit('loading-change', this.innerLoading, this.position, this)
    },
    loading () {
      this.innerLoading = this.loading
    }
  }
}
</script>

<style lang="scss" scoped>
  $colord3: #d3d3d3;
  $color6f: #6f6f6f;
  $color1b: #1bb1e6;
  $colorde: #dedede;

  .uploadstitch {
    width: 48px;
    height: 48px;
    border-radius:3px;
    background: $colorde;
    position: relative;
    .empty{
      position:absolute;
      color:#fff;
      left: 50%;
      top: 50%;
      transform:translate(-50%, -50%);
      font-size: 12px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      .emptyWord{
        line-height: 12px;
        text-align: center;
      }
      &:hover{
        color:$color6f;
      }
      .emptyIcon{
        text-align: center;
      }
    }
    .inputFile{
      display: none;
      visibility: hidden;
    }
    .img{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
    .loaded{
      .loadedIcons{
        opacity: 0;
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        color: #fff;
        cursor: pointer;
        font-size: 15px;
        .loadedUpPart{
          margin-bottom: 1px;
        }
        .loadedUpPart,.loadedDownPart{
          flex: 1;
          background:rgba(0,0,0,0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover{
            color: $color1b;
          }
        }
        .loadedIcon{
          text-align: center;
        }
        &:hover{
          opacity: 1;
        }
      }
    }
    .loading, .disableDiv{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .el-loading-parent--relative{
      position: absolute !important;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>

