<template>
  <my-dialog v-if="show">
    <div class="dialog-container">
      <div class="dialog-head">
        <span class="dialog-head-title">创建全景需求单</span>
        <i class="iconfont icon-guanbi dialog-close" @click="closeButNotSave"></i>
      </div>
      <p class="title">Poi信息</p>
      <div class="h-line"></div>
      <div class="row">
        <div class="row-title"><h3>Poi名称：</h3></div>
        <div class="row-content">
          <el-select v-model="selfData.poiId"placeholder="请选择目标全景poi" size="small"  style="width: 280px;" filterable @change="changePoi">
            <el-option
              v-for="poi in pois"
              :label="poi.name"
              :value="poi.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="row">
        <div class="row-title"><h3>格网号：</h3></div>
        <div class="row-content">
          <map-view :show-head="showMapHead" size="small"
                    v-model="selfData.gird" @cell-click="cc">
          </map-view>
        </div>
      </div>
      <div class="row">
        <div class="row-title"><h3>经纬度：</h3></div>
        <div class="row-content jwd-container">
          <div class="jwd">
            <el-select class="jwd-son" v-model="selfData.coordinateType" placeholder="请选择" size="small">
              <el-option
                v-for="coordsys in $store.state.config.coordsys"
                :label="coordsys.label"
                :value="coordsys.value">
              </el-option>
            </el-select>
            <el-input class="jwd-son" v-model="selfData.longitude" placeholder="请输入经度" size="small"></el-input>
            <el-input class="jwd-son" v-model="selfData.latitude" placeholder="请输入纬度" size="small"></el-input>
            <div class="jwd-son za">
              <div class="circle-wenhao">?</div>
              <a href="#">坐标拾取器</a>
            </div>
          </div>
          <div class="jwd">
            <el-select class="jwd-son" v-model="selectedProvince" :placeholder="$store.state.zone.province" size="small" @change="provinceChange">
              <el-option
                v-for="item in provinces"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-select class="jwd-son" v-model="selectedCity" :placeholder="$store.state.zone.city" size="small"  @change="cityChange">
              <el-option
                v-for="item in citys"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-select class="jwd-son" v-model="selectedCounty" :placeholder="$store.state.zone.county" size="small"  @change="countyChange">
              <el-option
                v-for="item in countys"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-select class="jwd-son" v-model="selectedArea" :placeholder="$store.state.zone.area" size="small">
              <el-option
                v-for="item in areas"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <p class="title">拍摄信息</p>
      <div class="h-line"></div>
      <div class="shot-info" style="margin-bottom: 15px;">
        <div class="shot-col">
          <div class="row-top">
            拍摄名称
          </div>
          <div class="row-bottom">
            <el-input
              size="small"
              placeholder="请输入拍摄名称"
              v-model="selfData.shotName">
            </el-input>
          </div>
        </div>
      </div>
      <div class="shot-info">
        <div class="shot-col">
          <div class="row-top">拍摄方式</div>
          <div class="row-bottom">
            <el-select class="row-bottom-form-cell" v-model="selfData.shotMode" placeholder="请选择" size="small">
              <el-option
                v-for="coordsys in $store.state.config.shotMode"
                :label="coordsys.label"
                :value="coordsys.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="shot-col">
          <div class="row-top">拍摄高度</div>
          <div class="row-bottom">
            <el-input class="row-bottom-form-cell" v-model="selfData.shotHeight" placeholder="请输入高度" size="small"></el-input>
          </div>
        </div>
        <div class="shot-col">
          <div class="row-top">期望完成日期</div>
          <div class="row-bottom">
            <el-date-picker
              v-model="expectDate"
              type="datetime"
              size="small"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="shot-info" style="margin-right: 15px;margin-top: 15px;">
        <div class="shot-col" style="width: 100%;">
          <div class="row-top">
            具体需求描述
          </div>
          <div class="row-bottom">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="selfData.description">
            </el-input>
          </div>
        </div>
      </div>
      <div class="btn-bar">
        <btn text="取消" class="btn cancel" @click="closeButNotSave"></btn>
        <btn text="保存" class="btn save" @click="closeAndSave"></btn>
      </div>
    </div>
  </my-dialog>
</template>
<script>
  import myDialog from '../space/myDialog'
  import mapView from '../space/map'
  import btn from '../btn.vue'
  export default {
    components: {myDialog, mapView, btn},
    created () {
//      this.selfData = this.getBaseData()
      this.$api.commonzone().then(res => {
        console.log(res.data)
        this.provinces = this.dealOriginData(res.data)
      }).catch(e => {
      })
      this.$api.searchPoiWithName().then(res => {
        console.log(res.data)
        this.pois = res.data
      }).catch(e => {
      })
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      value (v) {
        this.show = v
      },
      show (v) {
        this.$emit('input', v)
      },
      selectedProvince (v) {
        this.$api.commonzone({
          upperCode: v
        }).then(res => {
          console.log(res.data)
          this.citys = this.dealOriginData(res.data)
        }).catch(e => {
        })
        for (let i = 0; i < this.provinces.length; i++) {
          let province = this.provinces[i]
          if (province.code === v) {
            this.selfData.provinceName = province.name
            break
          }
        }
      },
      selectedCity (v) {
        if (v === '') {
          this.countys = []
          return
        }
        this.$api.commonzone({
          upperCode: v
        }).then(res => {
          this.countys = this.dealOriginData(res.data)
        }).catch(e => {
        })
        for (let i = 0; i < this.citys.length; i++) {
          let city = this.citys[i]
          if (city.code === v) {
            this.selfData.cityName = city.name
            break
          }
        }
      },
      selectedCounty (v) {
        if (v === '') {
          this.areas = []
          return
        }
        this.$api.commonzone({
          upperCode: v
        }).then(res => {
          this.areas = this.dealOriginData(res.data)
        }).catch(e => {
        })
        for (let i = 0; i < this.countys.length; i++) {
          let county = this.countys[i]
          if (county.code === v) {
            this.selfData.countyName = county.name
            break
          }
        }
      },
      selectedArea (v) {
        for (let i = 0; i < this.areas.length; i++) {
          let area = this.areas[i]
          if (area.code === v) {
            this.selfData.areaName = area.name
            break
          }
        }
      }
    },
    data () {
      return {
        selfData: this.getBaseData(),
        show: this.value,
        showMapHead: true,
        selectedCell: '',
        input: '',
        provinces: [],
        citys: [],
        countys: [],
        areas: [],
        pois: [],
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        }
      }
    },
    computed: {
      expectDate: {
        get () {
          return new Date(this.selfData.expectDate)
        },
        set (v) {
          this.selfData.expectDate = v.getTime()
        }
      },
      selectedProvince: {
        get () {
          return this.selfData.provinceCode
        },
        set (v) {
          this.selfData.provinceCode = v
        }
      },
      selectedCity: {
        get () {
          return this.selfData.cityCode
        },
        set (v) {
          this.selfData.cityCode = v
        }
      },
      selectedCounty: {
        get () {
          return this.selfData.countyCode
        },
        set (v) {
          this.selfData.countyCode = v
        }
      },
      selectedArea: {
        get () {
          return this.selfData.areaCode
        },
        set (v) {
          this.selfData.areaCode = v
        }
      }
    },
    methods: {
      changePoi (poiId) {
        for (let i = 0; i < this.pois.length; i++) {
          if (this.pois[i].id === poiId) {
            this.selfData.gird = this.pois[i].gridCode
            this.selfData.longitude = this.pois[i].lng
            this.selfData.latitude = this.pois[i].lat
            this.selfData.coordinateType = this.pois[i].coordsys
            this.selfData.provinceCode = this.pois[i].provinceId
            this.selfData.cityCode = this.pois[i].cityId
            this.selfData.countyCode = this.pois[i].countyId
            this.selfData.areaCode = this.pois[i].areaId
            this.selfData.provinceName = this.pois[i].provinceName
            this.selfData.cityName = this.pois[i].cityName
            this.selfData.countyName = this.pois[i].countyName
            this.selfData.areaName = this.pois[i].areaName
            break
          }
        }
      },
      getBaseData () {
        return {
          orderNo: '',
          modifyTime: null,
          createUserId: null,
          createTime: null,
          status: 1,
          shotMode: null,
          shotHeight: null,
          poiId: null,
          provinceCode: '',
          provinceName: '',
          cityCode: '',
          cityName: '',
          countyCode: '',
          countyName: '',
          areaCode: '',
          areaName: '',
          gird: '',
          shotName: '',
          longitude: null,
          latitude: null,
          expectDate: new Date().getTime(),
          description: '',
          coordinateType: null
        }
      },
      cc () {
      },
      dealOriginData (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].code = data[i].code + ''
        }
        return data
      },
      provinceChange () {
        this.selectedCity = this.selectedCounty = this.selectedArea = ''
      },
      cityChange () {
        this.selectedCounty = this.selectedArea = ''
      },
      countyChange () {
        this.selectedArea = ''
      },
      closeButNotSave () {
        this.selfData = this.getBaseData()
        this.show = false
      },
      closeAndSave () {
        this.show = false
        console.log(this.selfData)
        this.$api.createShotTask(this.selfData).then(res => {
          if (res.code === 0) {
            let temp = this.$utils.shallowCopy(this.selfData)
            this.selfData = this.getBaseData()
            this.$emit('close-and-save', temp)
          }
        }).catch(e => {
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../style/space";
  @import "../../assets/iconfont/spaceicon.css";
  .dialog-container{
    width: 700px;
    height: 660px;
    border-radius: 3px;
    background: #fff;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    .dialog-head{
      flex: 0 0 auto;
      height: 50px;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      .dialog-head-title{
        font-size: 16px;
      }
      .dialog-close{
        color: #bbb;
        cursor: pointer;
      }
    }
    .title{
      padding: 15px 0 2px 15px;
      font-size: 16px;
    }
    .h-line{
      height: 1px;
      background: #bbb;
      margin: 0 15px 15px 15px;
    }
    .shot-info{
      display: flex;
      flex: 0 0 auto;
      padding-left: 15px;
      .shot-col{
        display: flex;
        flex-direction: column;
      }
      .row-top{
        font-size: 14px;
        font-weight: normal;
        color: #888;
        padding-bottom: 5px;
      }
      .row-bottom-form-cell{
        width: 130px;
        margin-right: 15px;
      }
    }
    .row{
      flex: 0 0 auto;
      display: flex;
      margin: 0 15px 15px 15px;
      h3{
        padding:5px 0;
        margin: 0;
        font-size: 14px;
        font-weight: normal;
        color: #888;
      }
      .row-title{
        flex: 0 0 auto;
        width: 80px;
        display: flex;
        justify-content: flex-end;
      }
      .row-content{
        flex: 1 0 0;
      }
      .jwd-container{
        display: flex;
        flex-direction: column;
        .jwd{
          display: flex;
          margin-bottom: 15px;
          .jwd-son{
            flex: 1 0 0;
            margin-right: 15px;
          }
          .jwd-son:last-of-type{
            margin-right: 0px;
          }
          .za{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .circle-wenhao{
              $w: 15px;
              $c: #ddd;
              width: $w;
              height: $w;
              border: 1px solid $c;
              border-radius: $w / 2;
              font-size: 12px;
              color: $c;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            a{
              font-size: 12px;
              color: $space-blue;
              text-decoration: underline;
              letter-spacing: .7px;
            }
          }
        }
      }
    }
    .btn-bar{
      margin: 15px 0;
      display: flex;
      justify-content: center;
      flex: 0 0 auto;
      .btn{
        width: 130px;
        padding: 5px 0;
        border-raidus: 3px;
        margin-right: 15px;
        font-size: 14px;
        font-weight: normal;
      }
      .btn:last-of-type{
        margin-right: 0px;
      }
      .cancel{
        border: 1px solid $space-blue;
        color: $space-blue;
      }
      .save{
        background: #bbb;
        color: #fff;
      }
    }
  }
</style>
