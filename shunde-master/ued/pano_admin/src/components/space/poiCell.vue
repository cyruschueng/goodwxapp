<template>
  <div :class="[poicellClass,{'checked-poicell':data.checked}]">
    <div :class="[sanjiaoClass,{'checked-sanjiao':data.checked}]" @click="sanjiaoClick">
      <i class="iconfont icon-dagou"></i>
    </div>
    <img :src="data.thumbnail" class="top" @click="watchPano">
    <div class="bottom">
      <div class="content">
        <div class="content-head">
          <h3 v-if="!nameModify">{{name}}</h3>
          <el-input  v-else v-model="name" placeholder="" size="mini"></el-input>
          <i class="el-icon-edit" v-show="generalUser" @click="updateName(data)"></i>
        </div>
        <span>{{photoTime}}</span>
      </div>
      <div class="deal">
        <div class="left"><i class="el-icon-edit" v-show="generalUser" @click="editOnePanoClick"></i></div>
        <div class="vline"></div>
        <div class="right"><i class="iconfont icon-lajixiang" v-show="generalUser" @click="deleteOnePanoClick"></i></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: Object
      },
      index: {
        type: Number,
        default: 0
      },
      panoId: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        sanjiaoClass: 'sanjiao',
        poicellClass: 'poi-cell',
        nameModify: false,
        oldName: ''
      }
    },
    computed: {
      generalUser () {
        return this.$store.state.userInfo.generalUser
      },
      name: {
        set (v) {
          this.data.name = v
        },
        get () {
          return this.data.name
        }
      },
      photoTime () {
        if (this.$utils.isEmpty(this.data.photoTime)) {
          return ''
        }
        return this.$utils.format(new Date(parseInt(this.data.photoTime)), 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      updateName (data) {
        this.nameModify = !this.nameModify
        if (this.nameModify) {
          this.oldName = this.name
        } else {
          if (this.name !== this.oldName) {
            let param = {
              id: this.data.poiId,
              poiName: this.data.name,
              coordsys: this.data.coordsys,
              lat: this.data.lat,
              lng: this.data.lng,
              provinceId: this.data.provinceId,
              cityId: this.data.cityId,
              countyId: this.data.countyId,
              areaId: this.data.areaId,
              gridCode: this.data.gridCode
            }
            this.$api.updatePoi(param).then(res => {
              console.log(res)
              if (res.code !== 0) {
                this.name = this.oldName
              }
            }).catch(e => {
              this.name = this.oldName
            })
          }
        }
      },
      sanjiaoClick () {
        this.$emit('updateChecked', this.index, this.data.id, !this.data.checked)
      },
      editOnePanoClick () {
        this.$emit('edit-one-pano-click', this.data)
      },
      deleteOnePanoClick () {
        this.$emit('delete-one-pano-click', this.data.id)
      },
      watchPano () {
        this.panoId && this.$utils.previewPanoByPanoId(this.panoId)
        this.panoId && this.$api.panoStatistics({panoId: this.panoId})
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/iconfont/spaceicon.css";
  @import "../../style/space";

  @mixin sanjiao-border($color) {
    border-top: 26px solid $color;
    border-right: 26px solid transparent;
  }

  .poi-cell {
    @include base-cell;
    height: 190px;
    position: relative;
    display: flex;
    flex-direction: column;
    background: #fff;

    img.top {
      flex: 5.9 0 0;
      overflow: hidden;
    }
    //0.652
    //0.59
    .bottom {
      flex: 4.1 0 0;
      display: flex;
      flex-direction: column;
      .content {
        flex: 2 0 0;
        border-bottom: 1px solid #ddd;
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .content-head {
          display: flex;
          justify-content: space-between;
          margin-top: 0px;
          h3 {
            margin: 0;
            padding: 0;
            font-size: 14px;
            font-weight: 400;
            line-height: normal
          }
          i {
            color: #bbb;
            font-size: 13px;
          }
          i:hover{
            cursor: pointer;
            color: $space-blue;
          }
        }
        span {
          color: #9b9b9b;
          font-size: 11px;
          font-weight: 300;
        }
      }
      .deal {
        flex: 1.3 0 0;
        display: flex;
        .vline {
          flex: 0 0 auto;
          width: 1px;
          background: #ddd;
          align-self: stretch;
          margin: 4px 0;
        }
        .left, .right {
          flex: 1 0 0;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #bbb;
          i:hover{
            cursor: pointer;
            color: $space-blue;
          }
        }
      }
    }
    .sanjiao {
      flex: 0 0 0;
      width: 0px;
      height: 0px;
      @include sanjiao-border(#fff);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      cursor: pointer;
      position: absolute;
      i {
        color: #ddd;
        position: absolute;
        top: -26px;
        left: 0px;
        font-size: 16px;
      }
    }

  }
  .poi-cell:hover{
    box-shadow: 4px 4px 6px 0px #ddd;
  }
  .checked-poicell {
    border: 1px solid $space-blue;
    .checked-sanjiao {
      @include sanjiao-border($space-blue);
      i {
        color: #fff;
      }
    }
  }

</style>
