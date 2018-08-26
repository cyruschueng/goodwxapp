<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <transition name="el-zoom-in-top">
    <div class="editwurenjipano compopup" @click.stop>
      <div class="compopup-header">
        <div>航拍全景拼接&nbsp
          <el-popover ref="popover1" placement="top-start" width="200" trigger="hover"
                      content="《全景上传规范说明》"></el-popover>
          <div class="question" v-popover:popover1 @click="openPDF"></div>
        </div>
        <div class="el-icon-close cursor-pointer" @click="close"/>
      </div>
      <div class="compopup-body">
        <div class="underLineText stepStatus">
          <div class="number"
               :class="{active: step == 1, success: step > 1, 'el-icon-check': step > 1}"
               v-text="step <= 1?1:''"></div>
          <div class="text">整理素材</div>
          <div class="line"></div>
          <div class="number"
               :class="{active: step == 2, success: step > 2, 'el-icon-check': step > 2}"
               v-text="step <= 2?2:''"></div>
          <div class="text">选择补天</div>
          <div class="line"></div>
          <div class="number"
               :class="{active: step == 3, success: step > 3, 'el-icon-check': step > 3}"
               v-text="step <= 3 ? 3 : ''"></div>
          <div class="text">预览补天</div>
        </div>
        <div class="step1 steps" v-show="step == 1">
          <div class="upload commonWidth">
            <div class="step1Tips stepTips">
              <div>素材总数应为24-32张。请选择一张设为水平参考图</div>
              <div class="tips">上传{{step1.number}}张</div>
            </div>
            <div class="uploadPlace">
              <div class="uploadCell uploadBox cursor-pointer" @click="chooseFile">
                <div class="el-icon-plus"></div>
                上传
              </div>
              <!-- loading selected -->
              <div class="uploadCell uploadItem"
                   v-for="(stitch, index) in step1.stitchs"
                   :class="{selected: index == anchorInfoIndex, loading: stitch.loading}"
                   @click="selectConsultThis(index, stitch)">
                <img class="img" :src="stitch.thumbnail"/>
                <div class="seletedIcon">
                  <div class="el-icon-check"></div>
                </div>
                <div class="uploadItemMask">
                  <div class="deleteIcon el-icon-delete cursor-pointer" @click="deleteStitch(index, stitch)"></div>
                </div>
                <div class="loadingDiv">
                  <el-progress
                    class="loadingCell"
                    :show-text="step1.progressText"
                    type="circle"
                    :percentage="stitch.progress"
                    :width="step1.progressWidth"
                  ></el-progress>
                </div>
              </div>
            </div>
            <div class="selectConsult">
              <div class="selectConsultTextBox">
                <div class="selectConsultTextStrong">水平参考 </div>
                <div>请选择一张地平线平直的图片作为水平参考</div>
              </div>
              <div class="selectConsultImgBox">
                <img :src="anchorInfo.url" v-show="anchorInfo.url"/>
              </div>
            </div>
          </div>
          <div class="compopup-btns bottom-btns">
            <div class="commonbtn"
                 :class="{'commonbtn-disabled': step1.disableSave}"
                 @click="saveAndProcess">下一步
            </div>
          </div>
        </div>
        <div class="step2 steps" v-show="step == 2">
          <div class="selectButianBox">
            <div class="selectButian" v-if="!step2.waiting">
              <div class="selectButianContainer commonWidth">
                <div class="step2Tips stepTips">
                  <div>选择一组推荐的补天素材，或在素材库中选择</div>
                  <div class="tips cursor-pointer" @click="step2.showSuCaiku = !step2.showSuCaiku">素材库</div>
                </div>
                <div class="pano-preview-wrap">
                  <img :src="step2.patchUrl" v-show="step2.patchUrl"/>
                  <div class="pano-preview-direction pano-preview-left"
                       @click="exchangePatchIdBefore">
                    <div class="el-icon-arrow-left"></div>
                  </div>
                  <div class="pano-preview-direction pano-preview-right"
                       @click="exchangePatchIdNext">
                    <div class="el-icon-arrow-right"></div>
                  </div>
                </div>
                <div class="pano-preview-wrap">
                  <img :src="step2.groundSphereSmall || step2.groundSphere"
                       v-show="step2.groundSphereSmall || step2.groundSphere"/>
                </div>
              </div>
              <div class="sucaiku" v-show="step2.showSuCaiku">
                <div class="sucaikuHeader">
                  <el-select v-model="weatherType" placeholder="请选择">
                    <el-option
                      v-for="item in weatherList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="timeType" placeholder="请选择">
                    <el-option
                      v-for="item in timeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="lightSource" placeholder="请选择">
                    <el-option
                      v-for="item in lightList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="sucaikuBody">
                  <div class="patchItem cursor-pointer"
                       :class="{recommended: patch.recommended, selected: patch.patchId == step2.patchId}"
                       @click="exchangePatchId(patch.patchId)"
                       v-for="patch in patchIds">
                    <img :src="patch.url"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="selectButianWaiting" v-if="step2.waiting">
              <div>
                <el-progress
                  class="loadingCell"
                  :show-text="step2.progressWaitingText"
                  type="circle"
                  :percentage="step2.progressWaitingPer"
                  :width="step2.progressWaitingWidth"
                ></el-progress>
                <div class="step2WatingText">正在拼接</div>
                <div class="step2WatingTextLong">此过程较长，可先<span class="cursor-pointer" @click="close">收起到拼接队列</span>继续其他操作
                </div>
              </div>
            </div>
          </div>
          <div class="compopup-btns bottom-btns">
            <div class="commonbtn" :class="{'commonbtn-disabled': !step2.nextEnable}" @click="saveStep2Patch">选择补天</div>
          </div>
        </div>
        <div class="step3" v-show="step == 3">
          <div class="previewPano" :style="{'background-image': step3.panoPreviewStyle}"></div>
          <div class="compopup-btns bottom-btns">
            <div class="commonbtn" v-if="step3.showBackToPatch" @click="backToSelectPatch">上一步</div>
            <div class="commonbtn" v-if="step3.nextEnable" @click="step3Ronghe">下一步</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import {fileMd5PromiseFactory, getExifInfo} from '@/filters'
  // import QCUploder from '@/api/qcloud_uploader'
  import {resourPicShowUrl, resourPicFactUrl, getSkyImageUrl} from '@/api/urlprovider.js'
  // var cosJs = require('../../assets/js/cos-js-sdk-v4')

  const getMd5Promise = fileMd5PromiseFactory()
  const weatherList = [{value: '', label: '全部天气'}, {value: 1, label: '晴朗'}, {value: 2, label: '多云'}] // 天气列表
  const timeList = [{value: '', label: '全部时间'}, {value: 1, label: '白天'}, {value: 2, label: '晨昏'}, {
    value: 3,
    label: '夜晚'
  }] // 时间列表
  const lightList = [{value: '', label: '全部光源'}, {value: 1, label: '中间'}, {value: 2, label: '偏左'}, {
    value: 3,
    label: '偏右'
  }, {value: 4, label: '不定向'}] // 光源列表

  export default {
    name: 'editwurenjipano',
    props: {
      panoId: null
    },
    components: {},
    created () {
      this._uploadInput = document.createElement('input')
      this._uploadInput.setAttribute('type', 'file')
      this._uploadInput.setAttribute('multiple', 'multiple')
      this._uploadInput.setAttribute('accept', 'image/jpg,image/jpeg')
      this.checkStep1SaveNable()
    },
    data () {
      return {
        weatherList,
        timeList,
        lightList,
        timeType: '',
        lightSource: '',
        weatherType: '',
        patchIds: [],
        exifData: {},
        step: 1,
        httpPanoInfo: null,
        anchorInfoIndex: this.MAX_COUNT + 1,
        anchorInfo: {
          name: '',
          url: ''
        },
        step1: {
          progressText: false,
          progressWidth: 40,
          number: 0,
          successNumber: 0,
          failNumber: 0,
          selectConsultSrc: '',
          stitchs: [],
          disableSave: true
        },
        step2: {
          nextEnable: false,
          patchId: null,
          patchUrl: null,
          showSuCaiku: false,
          waiting: false,
          progressWaitingText: false,
          progressWaitingPer: 30,
          progressWaitingWidth: 40,
          groundSphere: null,
          groundSphereSmall: null
        },
        step3: {
          showBackToPatch: true,
          nextEnable: true,
          panoPreviewStyle: ''
        }
      }
    },
    methods: {
      resetSteps () {
        this.httpPanoInfo = null
        this.step1.stitchs = []
        this.step1.exifData = {}
        this.step1.number = 0
        this.step1.disableSave = true
        this.anchorInfoIndex = this.MAX_COUNT + 1
        this.step = 1
        this.step2.groundSphere = null
        this.step2.groundSphereSmall = null
        this.step2.waiting = false
        this.step2.patchId = null
        this.step2.patchUrl = null
        this.step2.nextEnable = false
        this.step3.showBackToPatch = false
        this.step3.nextEnable = false
        this.step3.panoPreviewStyle = ''
        // console.error('reset:' + new Date().getTime())
      },
      refreshPatchId () {
        // let res = {
        //   data: {
        //     all: ['225356', '225429', '225501', '225503', '225512'],
        //     recommend: ['225356']
        //   }
        // }
        this.$api.getPatchIds({
          panoId: this.panoId,
          lightSource: this.lightSource,
          weatherType: this.weatherType,
          timeType: this.weatherType
        }).then(res => {
          if (res.code === 0) {
            this.patchIds = []
            this.$nextTick(() => {
              for (let i in res.data.all) {
                let recommended = false
                for (let j in res.data.recommend) {
                  if (res.data.recommend[j] === res.data.all[i]) {
                    recommended = true
                    break
                  }
                }
                this.patchIds.push({
                  patchId: res.data.all[i],
                  recommended: recommended,
                  url: this.showPatchUrl(res.data.all[i])
                })
              }
              if (this.patchIds && this.patchIds.length && !this.step2.patchId) {
                this.step2.patchId = this.patchIds[0].patchId
              }
            })
          }
        })
      },
      refreshPanoInfo () {
        if (this.panoId) {
          this.refreshPatchId()
          this.$api.getPanoStitch({
            panoId: this.panoId
          }).then(res => {
            if (res && res.code === 0) {
              this.httpPanoInfo = res.data
              if (res.data.isSuccess === 0 || res.data.isSuccess === 4) {
                this.setStepTo1(res.data)
              } else if (res.data.isSuccess === 2 || res.data.isSuccess === 3) {
                this.setStepTo2(res.data)
              } else {
                this.setStepTo3(res.data)
              }
            } else {
              this.$message(res.msg)
            }
          })
        }
      },
      chooseFile () {
        let self = this
        this._uploadInput.onchange = function () {
          self.createFileData(self._uploadInput.files)
          self._uploadInput.value = null
        }
        this._uploadInput.click()
      },
      // 排除后缀和中文名
      filterFile (files = []) {
        let filesFilter = []
        let nameReg = /[\u4e00-\u9fa5]/
        for (let i = 0, len = files.length; i < len; i++) {
          if (!/.jpg$/i.test(files[i].name)) {
            this.$message(`必须上传jpg图片, ${files[i].name}`)
            continue
          }
          if (nameReg.test(files[i].name)) {
            this.$message(`名称中不能包含中文名, ${files[i].name}`)
            continue
          }
          filesFilter.push(files[i])
        }
        // Array.prototype.filter.apply(files, function (item) {
        //   if (!/.jpg$/i.test(item.name)) {
        //     this.$message('必须上传jpg图片')
        //     return false
        //   }
        // })
        return filesFilter
      },
      // 删选md5重复
      filterMd5 (file) {
        for (let i in this.step1.stitchs) {
          if (this.step1.stitchs[i].md5 === file.md5) {
            return false
          }
        }
        return true
      },
      setExifData (picture) {
        this.exifData = {
          model: picture.model,
          focal: picture.focal,
          width: picture.width,
          height: picture.height
        }
      },
      compareExifData (standardMeta, metaData) {
        for (let key in standardMeta) {
          if (standardMeta[key] !== metaData[key]) {
            return false
          }
        }
        return true
      },
      createFileData (_files = []) {
        let files = this.filterFile(_files)
        if (files.length < 1) {
          return
        }
        files.forEach(file => {
          getMd5Promise(file).then(md5 => {
            file.md5 = md5
            if (!this.filterMd5(file)) {
              this.$message(`不能上传重复的图片${file.name}`)
              return
            }
            getExifInfo(file).then(metaData => {
              if (metaData && metaData.model && metaData.focal && metaData.width && metaData.height) {
                if (Object.keys(this.exifData).length === 0) {
                  this.setExifData(metaData)
                }
                if (this.compareExifData(this.exifData, metaData)) {
                  file.exifData = metaData
                  this.uploadFile(this.createStitch(file))
                } else {
                  this.$message(`图片${file.name}的的Exif信息不一致`)
                }
              } else {
                this.$message(`图片${file.name}的Exif信息存在问题`)
              }
            })
          })
        })
      },
      createStitch (file = null) {
        return {
          file: file,
          url: '',
          thumbnail: '',
          selected: false,
          loading: false,
          progress: 0,
          md5: file && file.md5,
          saveObj: null
        }
      },
      getThumbnail (url) {
        let thumbnail
        if (url && url.indexOf(resourPicFactUrl) >= 0) {
          thumbnail = url.replace(resourPicFactUrl, resourPicShowUrl) + '/w160'
        } else if (url && url.indexOf(resourPicFactUrl) === -1) {
          thumbnail = url + '?x-oss-process=image/resize,m_fixed,h_110,w_110'
        } else {
          thumbnail = url
        }
        return thumbnail
      },
      uploadFile (stitchObj) {
        if (this.step1.stitchs.length >= this.MAX_COUNT) {
          this.$message(`超过最大上传数量32张,已拒绝${stitchObj.file.name}`)
          return
        }
        this.step1.stitchs.push(stitchObj)
        stitchObj.loading = true
        this.$api.uploadPanoTilesToCos(stitchObj.file, `${this.panoId}/${stitchObj.file.name}`, (url, res) => {
          stitchObj.url = url
          stitchObj.thumbnail = this.getThumbnail(url)
          let file = stitchObj.file
          stitchObj.saveObj = {
            name: file.name,
            url: url,
            md5: file.md5,
            model: file.exifData && file.exifData.model || 0,
            focal: file.exifData && file.exifData.focal || 0,
            width: file.exifData && file.exifData.width || 0,
            height: file.exifData && file.exifData.height || 0,
            lensMode: file.exifData && file.exifData.lensMode || '',
            aperture: file.exifData && file.exifData.FNumber || 0,
            iso: file.exifData && file.exifData.iso || 0,
            shutter: file.exifData && file.exifData.ExposureTime || 0,
            colorSpace: file.exifData && file.exifData.ColorSpace || 0
          }
          this.saveStitch(() => {
            stitchObj.loading = false
            this.checkStep1SaveNable()
          })
        }, null, (pro) => {
          stitchObj.progress = Math.floor(pro * 100) * 1
        })
      },
      checkStep1SaveNable () {
        if (this.step1.number > this.MAX_COUNT || this.step1.number < this.MIN_COUNT) {
          this.step1.disableSave = true
          return
        }
        if (!this.anchorInfo || !this.anchorInfo.url) {
          this.step1.disableSave = true
          return
        }
        for (let i in this.step1.stitchs) {
          if (this.step1.stitchs[i].loading) {
            this.step1.disableSave = true
            return
          }
        }
        this.step1.disableSave = false
      },
      selectConsultThis (index) {
        if (this.step1.stitchs[index] && this.step1.stitchs[index].saveObj && this.step1.stitchs[index].saveObj.url) {
          this.anchorInfoIndex = index
        }
      },
      deleteStitch (index, stitch) {
        if (this.anchorInfoIndex === index) {
          this.anchorInfoIndex = this.MAX_COUNT + 1
        }
        this.step1.stitchs.splice(index, 1)
      },
      saveStitch (callback) {
        let picMap = {}
        let index = 1
        for (let i = 0, len = this.step1.stitchs.length; i < len; i++) {
          if (this.step1.stitchs[i].saveObj && this.step1.stitchs[i].saveObj.name && this.step1.stitchs[i].saveObj.url) {
            picMap[index + ''] = this.step1.stitchs[i].saveObj || {}
            index += 1
          }
        }
        if (!this.panoId) {
          return
        }
        if (this.httpPanoInfo) {
          if (this.httpPanoInfo.isSuccess === 0 || this.httpPanoInfo.isSuccess === 4) {
            // console.log(this.anchorInfo)
            this.$api.droneAutoStitch({
              panoId: this.panoId,
              anchorInfo: JSON.stringify(this.anchorInfo),
              picMap: JSON.stringify(picMap)
            }).then(res => {
              if (res.code !== 0) {
                this.$message(res.msg)
              }
              callback && callback()
            })
          }
          console.error(this.httpPanoInfo)
        }
      },
      saveAndProcess () {
        this.checkStep1SaveNable()
        if (this.step1.disableSave) {
          return
        }
        this.$api.processPano({
          panoId: this.panoId
        }).then(res => {
          if (res.code === 0) {
            this.refreshPanoInfo()
          }
          // this.$message(res.msg)
        })
      },
      close () {
        this.$emit('close')
      },
      openPDF () {
        window.open('./static/aa.pdf')
      },
      setStepTo1 (panoInfo) {
        this.anchorInfo.name = panoInfo.anchorInfo && panoInfo.anchorInfo.name
        this.anchorInfo.url = panoInfo.anchorInfo && panoInfo.anchorInfo.url
        for (let i in panoInfo.stitch) {
          let stitch = this.createStitch()
          stitch.url = panoInfo.stitch[i].url
          stitch.thumbnail = this.getThumbnail(panoInfo.stitch[i].url)
          stitch.md5 = panoInfo.stitch[i].md5
          stitch.saveObj = panoInfo.stitch[i]
          this.step1.stitchs.push(stitch)
        }
      },
      // save () {},
      // step2
      exchangePatchId (patchId) {
        this.step2.patchId = patchId
      },
      exchangePatchIdByIndex (index) {
        if (this.patchIds.length < 1) {
          return
        }
        if (!this.step2.patchId) {
          this.step2.patchId = this.patchIds[0].patchId
          return
        }
        if (index === -1) {
          for (let i = 0, len = this.patchIds.length; i < len; i++) {
            if (this.patchIds[i].patchId === this.step2.patchId) {
              if (i !== 0) {
                this.step2.patchId = this.patchIds[i - 1].patchId
              }
              return
            }
          }
        }
        if (index === 1) {
          for (let i = 0, len = this.patchIds.length; i < len; i++) {
            if (this.patchIds[i].patchId === this.step2.patchId) {
              if (i !== len - 1) {
                this.step2.patchId = this.patchIds[i + 1].patchId
              }
              return
            }
          }
        }
      },
      exchangePatchIdBefore () {
        this.exchangePatchIdByIndex(-1)
      },
      exchangePatchIdNext () {
        this.exchangePatchIdByIndex(1)
      },
      showPatchUrl (patchId) {
        let url = getSkyImageUrl({id: patchId})
        return url + '/w1600h'
      },
      step2CheckNextEnable () {
        if (this.step2.patchId && this.httpPanoInfo && (this.httpPanoInfo.isSuccess === 3)) {
          this.step2.nextEnable = true
        }
      },
      setStepTo2 (panoInfo) {
        // 拼接状态  // 0 就绪  1 已完成 2拼接中 3确认补天 4拼接失败 5待融合 6融合中
        this.step = 2
        this.step2.groundSphereSmall = panoInfo.groundSphereSmall
        this.step2.groundSphere = panoInfo.groundSphere
        if (panoInfo.isSuccess === 2) {
          this.step2.waiting = true
        }
        this.step2CheckNextEnable()
      },
      saveStep2Patch () {
        this.step2CheckNextEnable()
        if (this.step2.nextEnable) {
          this.$api.saveSkypatch({
            panoId: this.panoId,
            url: getSkyImageUrl({id: this.step2.patchId}),
            patchId: this.step2.patchId
          }).then(res => {
            if (res.code === 0) {
              this.refreshPanoInfo()
            } else {
              this.$message(res.msg)
            }
          })
        }
      },
      // step3
      setStepTo3 (panoInfo) {
        // res.data.isSuccess === 5 || res.data.isSuccess === 6 || res.data.isSuccess === 1
        this.step = 3
        if (panoInfo.isSuccess === 5) {
          this.step3.showBackToPatch = true
          this.step3.nextEnable = true
        } else {
          this.step3.showBackToPatch = false
          this.step3.nextEnable = false
        }
        this.step3.panoPreviewStyle = `url(${location.protocol}${this.showPatchUrl(panoInfo.patchId)}), url(${panoInfo.groundSphere})`
      },
      backToSelectPatch () {
        this.$api.updateStatus({
          panoId: this.panoId
        }).then(res => {
          if (res.code === 0) {
            this.refreshPanoInfo()
          }
        })
      },
      step3Ronghe () {
        this.$api.startPatch2({
          panoIds: this.panoId
        }).then(res => {
          if (res.code === 0) {
            this.refreshPanoInfo()
          }
        })
      }
    },
    computed: {
      MAX_COUNT () {
        return this.$store.state.deviceType['2'].max_count
      },
      MIN_COUNT () {
        return this.$store.state.deviceType['2'].min_count
      }
    },
    watch: {
      'step1.stitchs' () {
        this.step1.number = this.step1.stitchs.length
        this.checkStep1SaveNable()
      },
      'step2.patchId' () {
        if (this.step2.patchId) {
          this.step2.patchUrl = this.showPatchUrl(this.step2.patchId)
        } else {
          this.step2.patchUrl = null
        }
        this.step2CheckNextEnable()
      },
      anchorInfoIndex (newValue, oldValue) {
        if (this.step1.stitchs[this.anchorInfoIndex]) {
          this.anchorInfo.name = this.step1.stitchs[this.anchorInfoIndex].name || (this.step1.stitchs[this.anchorInfoIndex].saveObj && this.step1.stitchs[this.anchorInfoIndex].saveObj.name)
          this.anchorInfo.url = this.step1.stitchs[this.anchorInfoIndex].thumbnail || this.getThumbnail(this.step1.stitchs[this.anchorInfoIndex].url)
        } else {
          this.anchorInfo.name = ''
          this.anchorInfo.url = ''
        }
        this.checkStep1SaveNable()
        // console.error(this.anchorInfoIndex)
        if (isNaN(oldValue)) {
          return
        }
        this.saveStitch()
      },
      panoId () {
        this.resetSteps()
        this.refreshPanoInfo()
      },
      timeType () {
        this.refreshPatchId()
      },
      lightSource () {
        this.refreshPatchId()
      },
      weatherType () {
        this.refreshPatchId()
      }
    }
  }
</script>

<style lang="scss" scoped>
  $color1b: #1bb1e6;
  $colorf5: #f5f5f5;
  $colorde: #dedede;
  $color6f: #6f6f6f;
  $stepNormal: rgba(0, 0, 0, .25);
  $commonBg: #f9f9f9;
  $padding: 16px;
  $margin: 60px;
  $commonWidth: 670px;
  .editwurenjipano {
    .commonWidth {
      width: $commonWidth;
    }
    .compopup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > div {
        display: flex;
        align-items: center;
      }
    }
    .steps {
      display: flex;
      flex-flow: column nowrap;
    }
    .stepTips {
      display: flex;
      padding: 10px;
      align-items: center;
      justify-content: space-between;
      color: #333;
      .tips {
        color: $color1b;
      }
    }
    .stepStatus {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
      .number {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        color: $stepNormal;
        border: 1px solid $stepNormal;
        margin-right: 5px;
        border-radius: 12px;
      }
      .number.active {
        background: $color1b;
        color: #fff;
        border: 0px solid $color1b;
      }
      .number.success {
        // background: $color1b;
        color: $color1b;
        border: 1px solid $color1b;
      }
      .line {
        height: 1px;
        width: 100px;
        margin: 0 10px;
        background: $stepNormal;
      }
      .line.success {
        background: $color1b
      }
    }
    .step1 {
      .uploadPlace {
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        margin-bottom: 10px;
        background: $commonBg;
      }
      .selectConsult {
        background: $commonBg;
        display: flex;
        padding: 10px;
        margin-bottom: 10px;
        align-items: center;
        justify-content: center;
        .selectConsultTextBox {
          width: 185px;
          color: #666;
          font-size: 13px;
          line-height: 24px;
          .selectConsultTextStrong {
            color: #000;
            font-weight: bolder;
          }
        }
        .selectConsultImgBox {
          width: 100px;
          height: 100px;
          position: relative;
          box-sizing: border-box;
          border: 1px solid $stepNormal;
          img, div {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
          div {
            border: 1px solid $stepNormal;
          }
        }
      }
      .uploadCell {
        width: 70px;
        height: 70px;
        box-sizing: border-box;
        border-width: 1px;
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;
        overflow: hidden;
      }
      .uploadBox {
        border-style: dashed;
        border-color: $stepNormal;
        color: $stepNormal;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        &:hover {
          border-color: $color1b;
          color: $color1b;
        }
      }
      .uploadItem {
        border-style: solid;
        border-color: $stepNormal;
        .img {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 100%;
          height: auto;
          transform: translate(-50%, -50%);
        }
        &.selected {
          border-color: $color1b;
          .seletedIcon {
            display: flex;
          }
          .uploadItemMask {
            display: block;
          }
        }
        &:hover {
          .uploadItemMask {
            display: block;
          }
        }
        .seletedIcon {
          display: none;
          position: absolute;
          left: 6px;
          top: 6px;
          width: 16px;
          height: 16px;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          color: #fff;
          background: $color1b;
        }
        .uploadItemMask {
          background: rgba(0, 0, 0, .12);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: none;
          .deleteIcon {
            position: absolute;
            right: 0;
            top: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            &:hover {
              color: $color1b;
            }
          }
        }
        .loadingDiv {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: $commonBg;
          display: flex;
          align-items: center;
          justify-content: center;
          display: none;
        }
        &.loading {
          .loadingDiv {
            display: flex;
          }
        }
      }
    }
    .step2 {
      .pano-preview-wrap {
        height: 200px;
        margin-bottom: 10px;
        background: $commonBg;
        position: relative;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        .pano-preview-direction {
          color: #fff;
          background: hsla(0, 0%, 100%, .5);
          opacity: 0.9;
          position: absolute;
          width: 50px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          &.pano-preview-left {
            left: 40px;
            top: 40px;
            bottom: 40px;
          }
          &.pano-preview-right {
            right: 40px;
            top: 40px;
            bottom: 40px;
          }
          &:hover {
            opacity: 1;
            background: rgba(0, 0, 0, .5);
          }
        }
      }
      .selectButian {
        display: flex;
        .sucaiku {
          width: 390px;
          display: flex;
          flex-flow: column nowrap;
          .sucaikuHeader {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 0px;
            background: $commonBg;
            > div {
              width: 110px;
              margin: 0 3px;
            }
            input {
              height: 36px;
            }
          }
          .sucaikuBody {
            padding: 10px 17px;
            flex: 1;
            overflow: scroll;
            height: 400px;
            display: flex;
            flex-flow: row wrap;
            .patchItem {
              width: 76px;
              box-sizing: border-box;
              height: 76px;
              position: relative;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0px 8px 8px 0px;
              &.recommended:after {
                content: '推荐';
                color: #fff;
                position: absolute;
                font-weight: lighter;
                background: hsla(0, 0%, 45%, .64);
                padding: 2px 4px;
                left: 4px;
                top: 4px;
                font-size: 12px;
                border-radius: 1px;
                opacity: 0.8;
              }
              > img {
                height: 100%;
              }
              &.selected {
                border: 2px solid $color1b;
              }
            }
          }
        }
      }
      .selectButianWaiting {
        width: $commonWidth;
        height: 450px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: lighter;
        margin-bottom: 10px;
        background: #9b9b9b linear-gradient(-180deg, hsla(0, 0%, 100%, .5), rgba(0, 0, 0, .5));
        > div {
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          justify-content: center;
        }
        .step2WatingText {
          font-size: 16px;
          margin: 10px 0 10px;
        }
        .step2WatingTextLong {
          color: hsla(0, 0%, 100%, .6);
          > span {
            color: #54adda;
          }
        }
      }
    }
    .step3 {
      .previewPano {
        width: $commonWidth;
        height: $commonWidth / 2;
        background: no-repeat, no-repeat;
        background-position: top, bottom;
        background-size: 100%, 100%;
        background-blend-mode: multiply;
        margin: 10px 0;
      }
      .compopup-btns {
        min-height: 32px;
      }
    }
  }
</style>

