<template>
  <div class="mosaiclistitem item-hover-shadow" :class="{choosed: choose}" @click="exChoose">
    <!-- 全景名称 素材类型  素材数量 拼接状态  操作 -->
    <div class="content" >
      <div class="panoImgBox">
        <div class="container">
          <div class="panoImgContainer cursor-pointer" @click.stop="editPano">
              <div class="no-img-text">添加素材</div>
              <img class="pano-img" :src="compressPreview" v-if="compressPreview"/>
              <div class="img-edit" v-show="generalUser" v-if="compressPreview">
                <div>修改</div>
              </div>
          </div>
          <editableword v-show="generalUser" :text="innerPanoName" @text-change-end="val => innerPanoName = val"/>
        </div>
      </div>
      <div class="panoType user-select-none" v-text="typeText"></div>
      <div class="panoNum user-select-none" v-text="stitchNumber"></div>
      <div class="panoStatus user-select-none" v-text="statusText"></div>
      <div class="panoHandler" v-show="generalUser">
        <div class="delete el-icon-delete cursor-pointer" @click.stop='deletePano'></div>
      </div>
    </div>
    <div class="itemIconBox" >
      <div class="itemIconBorder" />
      <div class="itemIcon el-icon-check" />
    </div>
  </div>
</template>
<script>
import comuploadimgcell from '@/components/pano/comuploadimgcell'
import editableword from '@/components/common/editableword'
import { resourPicFactUrl, resourPicShowUrl } from '@/api/urlprovider'

export default {
  name: 'mosaiclistitem',
  model: {
    prop: 'choose',
    event: 'choosed-change'
  },
  props: {
    choose: {
      type: Boolean,
      default () {
        return false
      }
    }, // 是否选中
    panoId: '', // 全景ID
    panoName: '', // 全景名称
    type: null, // 待拼接类型
    status: null, // 拼接状态  // -1:失败,0:未开始,1:成功, 2:处理中
    preview: {
      type: String,
      default () {
        return ''
      }
    }, // 预览图
    stitchNumber: 0, // 图片数量
    waitingTime: null, // 处理等待时间
    anchorInfo: {
      type: Object,
      default: function () {
        return { }
      }
    }
  },
  created () {},
  data () {
    return {
      innerPanoName: this.panoName
    }
  },
  methods: {
    deletePano () {
      this.$emit('delete-pano', this.panoId)
    },
    exChoose () {
      this.$emit('choosed-change', !this.choose)
    },
    editPano () {
      if (this.generalUser === false) {
        return
      }
      this.$emit('edit-pano', this.panoId)
    }
  },
  computed: {
    generalUser () {
      return this.$store.state.userInfo.generalUser
    },
    typeText () {
      let type = this.type + ''
      if (this.$store.state.deviceType[type]) {
        return this.$store.state.deviceType[type].name
      }
      return type
    },
    statusText () {
      if (this.type === 3) { // 鱼眼
        if (!this.stitchNumber) {
          return '--'
        }
        if (this.stitchNumber < 9) {
          return '素材不足'
        }
        for (let i in this.$store.state.deviceType['3'].status) {
          if (this.status === this.$store.state.deviceType['3'].status[i].key) {
            /**
             * 根据要求不显示拼接等待时长
            if (this.status === 2 && this.waitingTime) {
              return `约需${Math.ceil(this.waitingTime / 60)}分钟`
            }
            */
            return this.$store.state.deviceType['3'].status[i].text
          }
        }
      }
      if (this.type === 2) { // 无人机
        if (this.stitchNumber < 24 || this.stitchNumber > 32) {
          return '素材不足'
        }
        if (!this.anchorInfo || !this.anchorInfo.name || !this.anchorInfo.url) {
          return '缺少水平参考'
        }
        for (let i in this.$store.state.deviceType['2'].status) {
          if (this.status === this.$store.state.deviceType['2'].status[i].key) {
            return this.$store.state.deviceType['2'].status[i].text
          }
        }
      }
    },
    compressPreview () {
      // if (picture.url && picture.url.indexOf(resourPicFactUrl) >= 0) {
      //   picture.listShowUrl = picture.url.replace(resourPicFactUrl, resourPicShowUrl) + '/small32'
      //   picture.singleShowUrl = picture.url.replace(resourPicFactUrl, resourPicShowUrl) + '/small110'
      // }
      // if (picture.url && picture.url.indexOf(resourPicFactUrl) === -1) {
      //   picture.listShowUrl = picture.url + '?x-oss-process=image/resize,m_fixed,h_48,w_32'
      //   picture.singleShowUrl = picture.url + '?x-oss-process=image/resize,m_fixed,h_110,w_110'
      // }
      let preview = this.preview
      if (preview) {
        if (preview.indexOf(resourPicFactUrl) >= 0) {
          preview = preview.replace(resourPicFactUrl, resourPicShowUrl) + '/small32'
        }
      }
      return preview
    }
  },
  watch: {
    innerPanoName () {
      this.$api.updatePanoName({
        panoId: this.panoId,
        panoName: this.innerPanoName
      }).then((res) => {
        if (res.code === 0) {
          this.$emit('name-change')
        }
      })
    }
  },
  components: {
    comuploadimgcell,
    editableword
  }
}

</script>

<style lang="scss">
  $colord3: #d3d3d3;
  $color6f: #6f6f6f;
  $color1b: #1bb1e6;

  .mosaiclistitem{
    padding: 0 20px;
    position: relative;
    overflow: hidden;
    border-radius:3px;
    margin-bottom: 10px;
    background:#fff;
    border-width: 1px;
    border-style: solid;
    border-color: #d3d3d3;
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
        font-weight: small;
        color: #fff;
      }
    }
    &.choosed{
      .itemIconBox{
        .itemIconBorder{
          border-color:$color1b transparent transparent $color1b;/*透明 透明  灰*/
        }
      }
      border-color: $color1b;
    }
    &.choosed:hover{
      box-shadow: none;
    }
    .content{
      height: 140px;
      display: flex;
      .panoImgBox, .panoType, .panoNum, .panoStatus, .panoHandler{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .panoImgBox{
        .container{
          .panoImgContainer{
            position: relative;
            width: 146px;
            height: 82px;
            border: 1px solid #e5e5e5;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 2px;
            margin-bottom: 2px;
            .pano-img{
              width: 134px;
              height: 72px;
              z-index:2;
              position: relative;
            }
            .no-img-text{
              color: #999;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .img-edit{
              background: rgba(0,0,0,.6);
              align-items: center;
              justify-content: center;
              display: none;
              z-index:3;
              &>div{
                width: 70px;
                height:30px;
                background: hsla(0,0%,100%,.27);
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
              }
            }
            .no-img-text, .img-edit{
              position: absolute;
              left:0 ;
              top:0;
              width:100%;
              height:100%;
            }
            &:hover .img-edit{
              display: flex;
            }
          }
        }
      }
      //  <div class="panoImgBox">
      //     <div class="">
      //       添加素材
      //         <img class="panoImg" src=""/>
      //     </div>
      //     <editableword />
      // </div>
      // <div class="panoType"></div>
      // <div class="panoNum"></div>
      // <div class="panoStatus"></div>
      // <div class="panoHandler">
      //   <div class="delete el-icon-delete cursor-pointer" @click.stop='deleteThis'></div>
      // </div>
    }
    .delete:hover{
      color: $color1b;
    }
  }
</style>

