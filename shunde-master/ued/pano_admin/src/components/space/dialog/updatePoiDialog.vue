<template>
  <my-dialog v-if="show">
    <div class="dialog-container">
      <div class="dialog-head">
        <span class="dialog-head-title">修改poi信息</span>
        <i class="iconfont icon-guanbi dialog-close" @click="closeButNotSave"></i>
      </div>
      <p class="title">Poi信息</p>
      <div class="h-line"></div>
      <div class="row">
        <div class="row-title"><h3>Poi名称：</h3></div>
        <div class="row-content"><input style="font-size: 14px;margin-top: 5px" v-model="selfData.name"></div>
      </div>
      <div class="row">
        <div class="row-title"><h3>格网号：</h3></div>
        <div class="row-content">
          <map-view :show-head="showMapHead" size="small"
                    v-model="selfData.gridCode" @cell-click="cc">
          </map-view>
        </div>
      </div>
      <div class="row">
        <div class="row-title"><h3>经纬度：</h3></div>
        <div class="row-content jwd-container">
          <div class="jwd">
            <el-select class="jwd-son" v-model="selfData.coordsys" placeholder="请选择" size="small">
              <el-option
                v-for="coordsys in $store.state.config.coordsys"
                :label="coordsys.label"
                :value="coordsys.value">
              </el-option>
            </el-select>
            <el-input class="jwd-son" v-model="selfData.lng" placeholder="请输入经度" size="small"></el-input>
            <el-input class="jwd-son" v-model="selfData.lat" placeholder="请输入纬度" size="small"></el-input>
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
      <div class="btn-bar">
        <btn text="取消" class="btn cancel" @click="closeButNotSave"></btn>
        <btn text="保存" class="btn save" @click="closeAndSave"></btn>
      </div>
    </div>
  </my-dialog>
</template>
<script>
  import myDialog from '../myDialog.vue'
  import mapView from '../map.vue'
  import btn from '../../btn.vue'
  export default {
    components: {myDialog, mapView, btn},
    created () {
      this.$api.commonzone().then(res => {
        this.provinces = this.dealOriginData(res.data)
      }).catch(e => {
      })
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      poiName: {
        type: String,
        default: ''
      },
      data: {
        type: Object,
        default () {
          return null
        }
      }
    },
    watch: {
      value (v) {
        this.show = v
      },
      show (v) {
        this.$emit('input', v)
      },
      data (v) {
        console.log('prop data changed')
        console.log('selfData')
        this.selfData = this.$utils.shallowCopy(v)
        console.log(this.selfData)
      },
      selectedProvince (v) {
        this.$api.commonzone({
          upperCode: v
        }).then(res => {
          this.citys = this.dealOriginData(res.data)
        }).catch(e => {
        })
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
      }
    },
    data () {
      return {
        baseData: {
          id: '',
          name: '',
          gridCode: '',
          lat: 0,
          lng: 0,
          isValid: 1,
          provinceId: '',
          cityId: '',
          countyId: '',
          areaId: ''
        },
        selfData: this.$utils.shallowCopy(this.data) || this.baseData,
        show: this.value,
        showMapHead: true,
        selectedCell: '',
        selectedMap: 0,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        selectValue: '',
        input: '',
        provinces: [],
        citys: [],
        countys: [],
        areas: []
      }
    },
    computed: {
      selectedProvince: {
        get () {
          return this.selfData.provinceId
        },
        set (v) {
          this.selfData.provinceId = v
        }
      },
      selectedCity: {
        get () {
          return this.selfData.cityId
        },
        set (v) {
          this.selfData.cityId = v
        }
      },
      selectedCounty: {
        get () {
          return this.selfData.countyId
        },
        set (v) {
          this.selfData.countyId = v
        }
      },
      selectedArea: {
        get () {
          return this.selfData.areaId
        },
        set (v) {
          this.selfData.areaId = v
        }
      }
    },
    methods: {
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
        this.selfData = this.$utils.shallowCopy(this.data) || this.baseData
        console.log(this.selfData)
        this.show = false
      },
      closeAndSave () {
        this.show = false
        this.$emit('close-and-save', this.selfData)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../style/space";
  .dialog-container{
    width: 700px;
    height: 660px;
    border-radius: 3px;
    background: #fff;
    display: flex;
    flex-direction: column;
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
      display: flex;
      justify-content: center;
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
