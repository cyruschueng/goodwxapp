<template>
  <div class="mosaicitem item-hover-shadow" :class="{choosed: myChoosed, disabled: disabled}" @click="exchangeChoosed">
    <div class="mosaicitemContent">
      <div class="left">
        <editableword class="editWord" :text='myTitle' :disabled="disabled" @text-change-end="titleChange"/>
      </div>
      <div class="center">
        <div class="centerContent">
          <div class="centerTitleBox">
            <div class="centerTitle itemTimeBox">
              <div class="itemTimeText">{{statusText}}</div>
              <div class="itemTime" v-show="!chooseNable && myWaitingText">{{myWaitingText}}</div>
            </div>
            <div class="centerBtn" v-show="!myLoading && chooseNable && !disabled" @click.stop="uploadSet" >
              <bordertext text="批量上传" fontSize="12px" borderWidth="1px" height="18px" />
            </div>
          </div>
          <div class="imgsContent">
            <comuploadimgcell class="item" v-for="(tile, key) in getTiles()"
              :id="panoId"
              :src="tile.singleShowUrl"
              :position="key"
              :file="tile.file"
              :disabled="tile.disabled || disabled"
              @loading-change="loadingChange" />
          </div>
          <div class="progress" v-if="isCreating">
            <div class="progressBar" :style="{width: uploadProgress}" />
          </div>
        </div>
      </div>
      <div class="right editIconBox">
        <div class="uploadType el-icon-upload" @click="processThis"></div>
        <div class="delete el-icon-delete cursor-pointer" @click.stop='deleteThis' v-show="generalUser"></div>
      </div>
    </div>
    <div class="itemIconBox" :class="{'opacityDisable': !chooseNable}">
      <div class="itemIconBorder" />
      <div class="itemIcon el-icon-check" />
    </div>
  </div>
</template>
<script>
import comuploadimgcell from '../../components/pano/comuploadimgcell'
import bordertext from '../../components/common/bordertext'
import editableword from '../../components/common/editableword'

export default {
  name: 'mosaicitem',
  props: {
    title: '',
    tiles: '',
    progress: '',
    panoId: null,
    choosed: false,
    status: 0, // 拼接状态
    loading: false,
    waitingTime: null,
    disabled: false,
    isCreating: false // 是否正在拼接  一旦开始拼接 应该不能进行中断
  },
  data () {
    return {
      myStatus: this.status || 0, // -1:失败,0:未开始,1:成功, 2:处理中
      myWaitingText: '',
      myWaitingTime: this.waitingTime,
      statusText: '',
      myLoading: this.loading,
      myTitle: this.title,
      myTilesArr: this.tiles || {}, // this.$utils.disMargeStringToArray(this.tiles) || [],
      myChoosed: this.choosed,
      chooseNable: true
    }
  },
  created () {
    this.setStatusText = () => {
      let status = this.$store.state.config.mosaicStatus[0]
      for (let i in this.$store.state.config.mosaicStatus) {
        if (this.$store.state.config.mosaicStatus[i].key === this.myStatus) {
          status = this.$store.state.config.mosaicStatus[i]
          break
        }
      }
      // console.log(this.myStatus, this.statusText)
      this.chooseNable = status.chooseNable
      this.statusText = status.text
    }
    this.getWaitingTime = () => {
      if (!this.waitingTime) {
        this.myWaitingText = ''
      }
      if (this.waitingTime < 3600) {
        this.myWaitingText = `(大约需要${Math.ceil(this.waitingTime / 60)}分钟)`
      } else {
        let hour = this.waitingTime / 3600
        let minute = Math.ceil((this.waitingTime - hour * 3600) / 60)
        this.myWaitingText = `(大约需要${hour}小时${minute}分钟)`
      }
    }
    this.setStatusText()
    this.getWaitingTime()
  },
  methods: {
    titleChange (newTitle) {
      if (this.myTitle !== newTitle) {
        this.myTitle = newTitle
        this.$api.updatePanoName({
          panoId: this.panoId,
          panoName: newTitle
        }).then((res) => {
          if (res.code === 0) {
            this.$emit('title-change')
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    getTiles () {
      for (let i = 1; i <= 9; i++) {
        if (!this.myTilesArr[i + '']) {
          this.myTilesArr[i + ''] = {
            file: null,
            disabled: false
          }
        }
      }
      return this.myTilesArr
    },
    exchangeChoosed () {
      if (this.disabled) {
        return
      }
      if (this.chooseNable) {
        this.myChoosed = this.isCreating ? true : !this.myChoosed
      } else {
        this.myChoosed = false
      }
    },
    deleteThis () {
      if (this.disabled) {
        return
      }
      this.$emit('deleteThis', this.panoId, this)
    },
    processThis () {
      if (this.disabled || !this.chooseNable) {
        return
      }
      this.$emit('process', this.panoId, this)
    },
    uploadSet () {
      let self = this
      self.$utils.uploadStitchBatch((files) => {
        for (let i in self.myTilesArr) {
          if (self.myTilesArr[i] && files[i]) {
            this.$set(self.myTilesArr[i], 'file', files[i])
          }
        }
      })
    },
    getIndex (index) {
      return (index.length < 2 ? '0' : '') + index
    },
    loadingChange (isLoading, position, cell) {
      this.myTilesArr[position].loading = isLoading
      this.changeLoading()
    },
    changeLoading () {
      for (let i in this.myTilesArr) {
        if (this.myTilesArr[i].loading) {
          this.myLoading = true
          return
        }
      }
      this.myLoading = false
    }
  },
  computed: {
    generalUser () {
      return this.$store.state.userInfo.generalUser
    },
    uploadProgress () {
      let pro = 0
      pro = parseFloat(this.progress)
      if (isNaN(pro)) {
        pro = 0
      }
      return pro
    }
  },
  watch: {
    choosed (value) {
      if (this.choosed !== this.myChoosed) {
        this.myChoosed = this.choosed
      }
    },
    myChoosed (value) {
      if (this.choosed !== this.myChoosed) {
        this.$emit('choosed-change', value, this.panoId, this)
      }
    },
    myStatus () {
      // console.error(this.waitingTime)
      this.setStatusText()
    },
    chooseNable () {
      if (!this.chooseNable) {
        for (let i in this.myTilesArr) {
          this.$set(this.myTilesArr[i], 'disabled', true)
        }
      }
    },
    myWaitingTime () {
      this.getWaitingTime()
    }
  },
  components: {
    comuploadimgcell,
    bordertext,
    editableword
  }
}

</script>

<style lang="scss">
  $colord3: #d3d3d3;
  $color6f: #6f6f6f;
  $color1b: #1bb1e6;

  .mosaicitem{
    padding: 0 20px;
    position: relative;
    overflow: hidden;
    border-radius:3px;
    margin-bottom: 10px;
    background:#fff;
    border-width: 1px;
    border-style: solid;
    border-color: #d3d3d3;
    .mosaicitemContent{
      height: 120px;
      display: flex;
      flex-flow: row nowrap;
      .left{
        width: 30%;
        display: flex;
        align-items: center;
        .editWord{
          width: 140px;
          height:30px;
        }
      }
      .right{
        margin-left: 20px;
        display: flex;
        .uploadType ,.delete{
          display: flex;
        }
        .uploadType{
          align-items: center;
          color: $colord3;
          &.loadEnd{
            color: $color6f;
          }
        }
        .delete{
          align-items: center;
          margin-left: 20px;
          color: $color6f;
        }
      }
      .center{
        flex: 1;
        display: flex;
        align-items: center;
        .centerContent{
          .centerTitleBox{
            display: flex;
            align-items: center;
            margin-bottom: 4px;
            height: 20px;
            .centerTitle{
              margin-right: 10px;
              color: #9b9b9b;
            }
          }
        }
        .imgsContent{
          display:flex;
        }
        .item{
          margin-right: 2px;
        }
      }
    }
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
    .progress{
      height: 4px;
      border-radius: 2px;
      background-color: $colord3;
      overflow: hidden;
      margin-top: 6px;
      .progressBar{
        background: $color1b;
        height: inherit;
        border-radius: inherit;
      }
    }
    .itemTimeBox{
      display:flex;
      font-size:12px;
      .itemTime{
        color:#9b9b9b;
      }
      .itemTimeText{
        color:#373737;
      }
    }
    .opacityDisable{
      opacity: 0.5;
    }
    &.disabled .editIconBox{
      display: none;
    }
  }
</style>

