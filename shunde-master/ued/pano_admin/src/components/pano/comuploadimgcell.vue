<template>
  <div class="comUploadImgcell" @click.stop>
    <!-- <input class="inputFile" type="file" /> -->
    <div class="empty cursor-pointer" v-show="!imgSrc && !myLoading" @click.stop="inputFile">
      <div class="emptyIcon el-icon-plus" ></div>
      <div class="emptyWord" v-text="getPosition()" v-show="myPosition"></div>
    </div>
    <div class="loaded" v-show="imgSrc">
      <img class="img" v-show="imgSrc" :src="imgSrc" />
      <div class="loadedIcons">
        <div class="loadedUpPart" @click.stop="inputFile">
          <div class="loadedIcon el-icon-picture-outline"></div>
        </div>
        <div class="loadedDownPart" @click.stop="deleteSrc">
          <div class="loadedIcon el-icon-delete"></div>
        </div>
      </div>
    </div>
    <div class="loading disableDiv" v-if="myLoading">
      <!-- <div v-loading="myLoading" v-if="myLoading"  /> -->
      <el-progress class="loadingCell" :show-text="progressText" type="circle" :percentage="progress" :width="progressWidth"></el-progress>
    </div>
    <div class="disableDiv" v-show="myDisabled"></div>
  </div>
</template>
<script>
import { fileMd5Factory, checkPicture } from '@/filters'
import { resourPicShowUrl, resourPicFactUrl } from '@/api/urlprovider.js'
// var cosJs = require('../../assets/js/cos-js-sdk-v4')

const getMd5 = fileMd5Factory()

export default {
  name: 'comuploadimgcell',
  props: {
    src: null,
    position: null,
    loading: false,
    file: null,
    id: null,
    disabled: false
  },
  created () {},
  data () {
    return {
      imgSrc: this.src,
      originalImgSrc: this.src,
      myDisabled: this.disabled,
      progress: 0,
      progressWidth: 40,
      progressText: false,
      myPosition: '',
      myLoading: this.loading,
      cellType: 'empty',
      md5: null,
      exif: null,
      myFile: this.file,
      picInfo: {}
    }
  },
  events: {},
  methods: {
    inputFile () {
      let input = this.createUploadInput()
      let self = this
      input.onchange = function (e) {
        let file = e.target.files[0]
        self.myFile = file
        input.value = null
      }
      input.click()
    },
    deleteSrc () {
      if (!this.id) {
        return
      }
      this.$api.deleteOnePanoStitchPic({
        panoId: this.id,
        position: this.position
      }).then(res => {
        if (res.code === 0) {
          this.imgSrc = null
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    createUploadInput () {
      if (!this.$el._uploadInput) {
        this.$el._uploadInput = document.createElement('input')
        this.$el._uploadInput.setAttribute('type', 'file')
      }
      return this.$el._uploadInput
    },
    uploadFile (file) {
      if (!file) {
        return
      }
      if (/jpg/i.test(file.name)) {
        getMd5(file, md5 => {
          if (this.md5 === md5) {
            // this.$message(`${this.position} 不能上传同一幅照片！`)
            this.$message({
              showClose: true,
              message: `${this.position} 不能上传同一幅照片！`,
              type: 'warning'
            })
            return
          }
          this.myLoading = true
          this.getExif([file], this.position, md5)
        })
      } else {
        // console.warn(`${this.position} 图片格式必须为jpg，请重新上传`)
        this.$message({
          showClose: true,
          message: `${this.position} 图片格式必须为jpg，请重新上传`,
          type: 'warning'
        })
      }
    },
    // checkoutImgName (imgName) {
    //   if (!/^0/.test(imgName)) {
    //     imgName = '0' + imgName
    //   }
    //   return imgName
    // },
    // progressHandler (pro) {
    //   this.progress = Math.floor(pro * 100)
    // },
    checkoutImgName (imgName) {
      if (!/^0/.test(imgName)) {
        imgName = '0' + imgName
      }
      return imgName
    },
    progressHandler (pro) {
      this.progress = Math.floor(pro * 100)
    },
    getExif (files, position, md5) {
      checkPicture(files, exif => {
        if (exif === 0) {
          this.myLoading = false
          this.$message({
            showClose: true,
            message: `${this.position} 图片参数不符合要求，请重新上传`,
            type: 'warning'
          })
        } else if (exif === -1) {
          this.myLoading = false
          this.$message({
            showClose: true,
            message: `${this.position} 图片没有exif信息，请重新选择`,
            type: 'warning'
          })
        } else {
          position = this.checkoutImgName(position)
          if (this.exif) {
            if (this.$utils.objEqual(exif, this.exif)) {
              this.uploadImg(this.id, files[0], position, path => {
                this.savePanoItem(path, position, exif, md5)
              })
            } else {
              this.myLoading = false
              this.$message({
                showClose: true,
                message: `${this.position} 图片参数与其他图片不同，请重新上传`,
                type: 'warning'
              })
            }
          } else {
            this.uploadImg(this.id, files[0], position, path => {
              this.savePanoItem(path, position, exif, md5)
            })
          }
        }
      })
    },
    uploadImg (id, file, position, callback, error, process) {
      this.originalImgSrc = this.imgSrc
      this.$api.uploadPanoTilesToCos(file, `${id}/${position}.JPG`, callback, null, this.progressHandler)
    },
    savePanoItem (url, position, exif, md5) {
      if (!this.id) {
        this.imgSrc = ''
        this.myLoading = false
        return
      }
      position = position * 1
      let listShowUrl = url.replace(resourPicFactUrl, resourPicShowUrl) + '/small32'
      let singleShowUrl = url.replace(resourPicFactUrl, resourPicShowUrl) + '/small110'
      let params = {
        panoId: this.id,
        position: position,
        picInfo: Object.assign({
          url: url,
          name: `${this.checkoutImgName(position)}.JPG`,
          md5: md5,
          listShowUrl: listShowUrl,
          singleShowUrl: singleShowUrl
        }, exif)
      }
      this.$api.updatePanoStitchPic(params).then(res => {
        if (res.code === 0) {
          this.md5 = md5
          this.picInfo = params.picInfo
          this.imgSrc = singleShowUrl + `?time=${+new Date()}`
          this.$message(`图片上传成功:0${position}.JPG`)
        }
        this.myLoading = false
      })
    },
    getPosition () {
      this.myPosition = this.position ? (this.position.length < 2 ? ('0' + this.position) : this.position) : ''
      return this.myPosition
    }
  },
  watch: {
    imgSrc (newValue) {
      if (this.src !== this.imgSrc) {
        this.$emit('src-change', this.imgSrc, this.position, this)
      }
    },
    src () {
      if (this.src !== this.imgSrc) {
        this.imgSrc = this.src
        this.originalImgSrc = this.src
        if (!this.src) {
          this.md5 = null
        }
      }
    },
    myLoading () {
      if (this.loading !== this.myLoading) {
        this.$emit('loading-change', this.myLoading, this.position, this)
      }
      if (!this.myLoading) {
        this.progress = 0
      }
    },
    file (newValue) {
      if (newValue) {
        this.myFile = newValue
      }
    },
    myFile (newValue) {
      this.uploadFile(this.myFile)
    },
    text () {
      this.getPosition()
    },
    disabled () {
      this.myDisabled = this.disabled
    }
  }
}
</script>

<style lang="scss" scoped>
  $colord3: #d3d3d3;
  $color6f: #6f6f6f;
  $color1b: #1bb1e6;
  $colorde: #dedede;

  .comUploadImgcell {
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

