<template>
  <div class="mosaicitem-2">
    <div class="mosaicitemContent-2">
      <img id="photo2" :src="icon"/>
      <div class="content-text2">
        <div class="idTitle">
          <div class="publishId">ID:{{id}}</div>
          <div class="right1">
            <img class="icon" :src="iconEye" @click="watch" @mouseenter="eyeIconEnter" @mouseleave="eyeIconLeave"/>
            <img class="icon" :src="iconEdit" v-show="generalUser" @click="edit" @mouseenter="editIconEnter" @mouseleave="editIconLeave"/>
            <img class="icon" :src="iconCode" @click="code" @mouseenter="codeIconEnter" @mouseleave="codeIconLeave"/>
          </div>
        </div>
        <div class="itemName">{{title1}}</div>
        <div class="area-detail">
          <div>{{areaDetail}}</div>
          <div> /</div>
          <div>{{pixel}}</div>
        </div>
        <div class="coordinate">{{coordinate}}</div>
        <div class="createTime">{{createTime}}</div>
        <span class="content-text-main2">
          {{content}}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'mosaicitem',
    props: {
      itemData: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        iconCode: './static/icon-code.png',
        iconCode2: './static/icon-code2.png',
        iconEye: './static/eye.png',
        iconEdit: './static/icon-edit.png',
        iconEdit2: './static/icon-edit2.png',
        id: this.itemData.threeDimensionalId,
        icon: this.itemData.thumbnailUrl,
        title1: this.itemData.threeDimensionalName,
        areaDetail: this.itemData.area + '平方公里',
        pixel: this.itemData.resolutionRatio + '厘米分辨率',
        coordinate: '坐标：' + this.itemData.latitude + '/' + this.itemData.longitude,
        createTime: '创建于：' + this.itemData.createTime,
        content: this.itemData.description,
        qrcodeUrl: this.itemData.qrcodeUrl,
        itemObj: this.itemData,
        threeDUrl: this.itemData.thumbpreviewUrl
      }
    },
    created () {
    },
    methods: {
      watch () {
        if (this.threeDUrl.indexOf('?') === -1 || this.threeDUrl.indexOf('&') === -1 || this.threeDUrl.indexOf('vbrId') === -1 || this.threeDUrl.indexOf('jobId') === -1) {
          return
        }
        let str1 = this.threeDUrl.split('?')[1]
        let vbrId = str1.split('vbrId=')[1].split('&')[0]
        let jobId = str1.split('jobId=')[1]
        window.open('http://webapp.vizen.cn/shunde_model_detail_debug/index.html?mData=' + encodeURIComponent(JSON.stringify({modelId: vbrId, jobId: jobId, modelName: this.title1})))
      },
      code () {
        this.$emit('codedialogclick', this.qrcodeUrl)
      },
      edit () {
        this.$emit('editdialogclick', this.itemObj)
      },
      eyeIconEnter () {
        this.iconEye = './static/eye2.png'
      },
      eyeIconLeave () {
        this.iconEye = './static/eye.png'
      },
      editIconEnter () {
        this.iconEdit = './static/icon-edit2.png'
      },
      editIconLeave () {
        this.iconEdit = './static/icon-edit.png'
      },
      codeIconEnter () {
        this.iconCode = './static/icon-code2.png'
      },
      codeIconLeave () {
        this.iconCode = './static/icon-code.png'
      }
    },
    watch: {
      itemData (data) {
        this.id = data.threeDimensionalId
        this.icon = data.thumbnailUrl
        this.title1 = data.threeDimensionalName
        this.areaDetail = data.area + '平方公里'
        this.pixel = data.resolutionRatio + '厘米分辨率'
        this.coordinate = '坐标：' + data.latitude + '/' + data.longitude
        this.createTime = '创建于：' + data.createTime
        this.content = data.description
        this.qrcodeUrl = data.qrcodeUrl
        this.itemObj = data
        this.threeDUrl = data.thumbpreviewUrl
      }
    },
    computed: {
      generalUser () {
        return this.$store.state.userInfo.generalUser
      }
    },
    components: {}
  }

</script>

<style lang="scss">
  $colord3: #d3d3d3;
  $color6f: #6f6f6f;
  $color1b: #1bb1e6;
  .mosaicitem-2 {
    width: 45%;
    height: 200px;
    position: relative;
    overflow: hidden;
    border-radius: 3px;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    background: #fff;
    border-color: transparent;
    .mosaicitemContent-2 {
      display: flex;
      height: 100%;
      width: 100%;
      flex-flow: row nowrap;
      .content-text2 {
        width: 100%;
        display: flex;
        margin-left: 2.5%;
        margin-right: 2.5%;
        margin-top: 10px;
        margin-bottom: 10px;
        flex-direction: column;
        .itemName, .itemEdit {
          display: flex;
          align-items: center;
          font-weight: bold;
          margin-top: 12px;
          font-size: 16px;
        }
        .area-detail {
          min-width: 120px;
          margin-top: 5px;
          display: flex;
          font-size: 10px;
          flex-direction: row;
        }
        .coordinate {
          margin-top: 12px;
          display: flex;
          font-size: 10px;
          color: #808080;
          flex-direction: row;
        }
        .createTime {
          margin-top: 12px;
          display: flex;
          font-size: 10px;
          color: #808080;
          flex-direction: row;
        }
        .content-text-main2 {
          font-size: 10px;
          color: #808080;
        }

      }
      .idTitle {
        flex-direction: row;
        justify-content: space-between;
        display: flex;
        .publishId {
          width: 100px;
          word-wrap: break-word;
          color: #00aeff;
        }
        .right1 {
          min-width: 60px;
          .icon {
            cursor: pointer;
            width: 15px;
            margin-left: 3px;
          }
        }
      }
      #photo2 {
        width: 260px;
      }

      .center {
        flex: 1;
        display: flex;
        align-items: center;
        .centerContent {
          .centerTitleBox {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            .centerTitle {
              margin-right: 10px;
              color: #373737;
            }
          }
        }
        .imgsContent {
          display: flex;
        }
        .item {
          margin-right: 2px;
        }
      }
    }
    .itemIconBox {
      position: absolute;
      left: 0;
      top: 0;
      .itemIconBorder {
        border-width: 18px;
        border-style: solid;
        border-color: $color6f transparent transparent $color6f; /*透明 透明  灰*/
      }
      .itemIcon {
        position: absolute;
        font-size: 12px;
        top: 6px;
        left: 6px;
        font-weight: small;
        color: #fff;
      }
    }
    &.uploaded {
      .itemIconBox {
        .itemIconBorder {
          border-color: $color1b transparent transparent $color1b; /*透明 透明  灰*/
        }
      }
      border-color: $color1b;
    }
  }
</style>

