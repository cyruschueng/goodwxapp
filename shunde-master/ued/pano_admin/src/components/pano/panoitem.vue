<template>
  <div class="panoitem item-hover-shadow" :class="{choosed: myChoosed}" @click.stop="setChoosed">
    <div class="itemIconBox" @click.stop="setChoosed">
      <div class="itemIconBorder" />
      <div class="itemIcon el-icon-check" />
    </div>
    <div class="border"/>
    <div class="container">
      <div class="imgContainer" >
        <div class="statusBox" v-show="status !== 1">
          <img  class="statusImg" src="../../../static/picFile.png" />
          <div  class="statusText" v-text="statusText"/>
        </div>
        <div class="imgBox cursor-pointer"
          @click.stop="previewPano"
          title="点击预览全景"
          v-show="status === 1"
          :style="{backgroundImage: 'url('+imgSrc+')'}" />
      </div>
      <div class="infoBox">
        <editableword class="name" v-show="generalUser"
        :disabled="disabled"
        :text="word"
        @text-change-end="textChange"/>
        <div class="time user-select-none" v-text="computedTime"></div>
      </div>
      <div class="editBox" v-show="generalUser">
        <div class="edit cursor-pointer"
          :class="{'el-icon-edit': !onlyRead, 'el-icon-view': onlyRead}"
          v-show="isPrepared"
          @click.stop="editThis" />
        <div class="grey-line"
          v-show="isPrepared"
        />
        <div class="remove el-icon-delete cursor-pointer" @click.stop="deleteThis" />
      </div>
      <div class="disableMask" v-if="disabled" />
    </div>
  </div>
</template>
<script>
/**
 */
import editableword from '../../components/common/editableword'

export default {
  name: 'panoitem',
  props: {
    name: null,
    time: null,
    img: null,
    choosed: false,
    panoId: null,
    isStatic: {
      type: Boolean,
      default () {
        return false
      }
    },
    onlyRead: false, // 为true时显示el-icon-view icon
    isTest: false, // 是否跳转测试panoId
    id: null, // 用于修改名字
    status: { // -1:失败,0:未开始,1:成功, 2:处理中
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      disabled: false,
      statusText: '',
      word: this.name,
      myChoosed: this.choosed,
      imgSrc: this.img,
      isPrepared: false
    }
  },
  created () {
    this.checkStatus()
  },
  methods: {
    previewPano () {
      if (this.disabled) {
        return
      }
      if (this.isStatic) {
        this.$api.panoStatistics({panoId: this.panoId})
      }
      this.$utils.previewPanoByPanoId((this.isTest ? '[TT]' : '') + this.panoId)
    },
    editThis () {
      if (this.disabled) {
        return
      }
      this.$emit('edit', this.id, this)
    },
    deleteThis () {
      if (this.disabled) {
        return
      }
      this.$emit('delete', this.id, this)
    },
    setChoosed () {
      if (this.disabled) {
        return
      }
      if (!this.isPrepared) {
        return
      }
      this.myChoosed = !this.myChoosed
      this.$emit('choosed-change', this.myChoosed, this.panoId, this.poiId, this)
    },
    textChange (newValue) {
      if (this.word === newValue) {
        return
      }
      this.$api.updatePanoInfoName({
        panoId: this.id || this.panoId,
        name: newValue
      }).then((res) => {
        if (res.code === 0) {
          this.word = newValue
          this.$emit('text-change-end')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    checkStatus () {
      if (this.status === 1) {
        this.statusText = ''
        this.isPrepared = true
      } else if (this.status === -1) {
        this.statusText = '处理失败'
        this.isPrepared = false
      } else if (this.status === 1) {
        this.statusText = '未开始处理'
        this.isPrepared = false
      } else {
        this.statusText = '处理中'
        this.isPrepared = false
      }
    }
  },
  watch: {
    choosed () {
      this.myChoosed = this.choosed
    },
    status () {
      this.disabled = !(this.status === 1)
      this.checkStatus()
    }
  },
  computed: {
    generalUser () {
      return this.$store.state.userInfo.generalUser
    },
    computedTime () {
      var date = new Date(this.time * 1) || ''
      if (date) {
        date = this.$utils.format(date, 'yyyy年MM月dd日 hh:mm:ss')
      }
      return date
    }
  },
  components: {
    editableword
  }
}

</script>

<style lang="scss">
  $colord3: #d3d3d3;
  $color6f: #6f6f6f;
  $color1b: #1bb1e6;

  .panoitem{
    position: relative;
    width: 221px;//1920-338 1200-221.5
    height: 188px;//1920-301 1200-118.125
    background: #fff;
    // box-shadow: 0px 0px 10px 1px $colord3;
    border-radius: 2px;
    overflow: hidden;
    border:1px solid $colord3;
    .grey-line{
      width:1px;
      height: 18px;
      background: $colord3;
    }
    .itemIconBox{
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      .itemIconBorder{
        border-width:18px;
        border-style:solid;
        border-color:#fff transparent transparent #fff;/*透明 透明  灰*/
      }
      .itemIcon{
        position: absolute;
        font-size: 12px;
        top:6px;
        left:6px;
        font-weight: small;
        color: $colord3;
      }
    }
    &.choosed{
      border-color: $color1b;
      box-shadow: none;
      .itemIconBox{
        .itemIconBorder{
          border-color:$color1b transparent transparent $color1b;
        }
        .itemIcon{
          color: #fff;
        }
      }
    }
    .container{
      height: 100%;
      position: relative;
      display: flex;
      flex-flow: column nowrap;
      .imgContainer{
        position: relative;
        height: 112px;
        .statusBox{
          position: absolute;
          left: 50%;
          top:60%;
          transform: translate(-50%, -50%);
          .statusImg{
            width:50px;
          }
          .statusText{
            text-align: center;
            color:$colord3;
          }
        }
        .imgBox{
          position: absolute;
          width:100%;
          height:100%;
          left:0;
          top:0;
          background-size: cover;
          background-position: center center;
          position: relative;
          img{
            height: 100%;
            width: 100%;
          }
        }
      }
      .infoBox{
        flex: 1;
        padding:0px 18px;
        font-size:12px;
        display: flex;
        align-items: stretch;
        flex-direction: column;
        .time{
          color: $colord3;
          flex:1;
        }
        .name{
          flex:1;
        }
      }
      .editBox{
        height:27px;
        display: flex;
        color: $colord3;
        border-top:1px solid $colord3;
        align-items: center;
        .edit{
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover{
            color: $color1b;
          }
        }
        .remove{
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover{
            color: $color1b;
          }
        }
      }
      .disableMask{
        position:absolute;
        width:100%;
        height: 100%;
        left:0;
        top:0;
      }
    }
  }
</style>

