<template>
  <div class="mosaicitem-1" :class="{uploaded: uploaded}">
    <div class="mosaicitemContent-1"  @click.stop="previewAlbum">
      <img class="photo" :src="publishImg"/>
      <div class="content-text-0">
        <div class="seperate-name">
          <div class="itemName">{{title1}}</div>
          <i class="el-icon-view"></i>
        </div>
        <div class="type">{{tipsList.join("/")}}</div>
        <div class="author-from">
          <div style="float: left;display: -webkit-box">
            <span class="date-info">发布人：
          </span>
            <div class="grayContent">{{author}}</div>
          </div>
        </div>
        <div id="publishContent">
          <span class="date-info">发布于：
        </span>
          <span class="grayContent">{{createTime1}}</span>
        </div>
        <div id="brefContent">
          <span class="date-info">简介：
        </span>
          <span class="content-text-main">
          {{content}}
        </span>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
// import comuploadimgcell from '../../components/pano/comuploadimgcell'
import bordertext from '../../components/common/bordertext'

export default {
  name: 'mosaicitem',
  props: {
    uploaded: true,
    tiles: [{
      img: '/static/draft.jpg',
      text: '',
      disable: false
    }],
    publishImg: '',
    tipsList: null,
    title1: '',
    author: '',
    from: '',
    type: '',
    content: '',
    publishId: '',
    createTime1: ''
  },
  data () {
    return {
    }
  },
  created () {},
  methods: {
    previewAlbum () {
      if (this.publishId) {
        window.open(`http://pano.shunde.vizen.cn/album/src/index.html?albumId=${this.publishId}&lang=&vrflag=on`, '_blank')
      }
    },
    open4 () {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '如果已入库数据被删除，则无法被恢复 '),
          h('br'),
          h('i', { style: 'color: red' }, '是否执行删除？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            }, 3000)
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'success',
          message: '专题已经删除成功，\n' +
          '请在已删除模块中查看 '
        })
      })
    },
    getTiles () {
      if (!this.tiles) {
        this.tiles = []
      }
      while (this.tiles.length < 9) {
        this.tiles.push(this.getCellObj())
      }
      return this.tiles
    },
    // 更新cells里面的数组
    computecells (tile) {
      return tile && tile.img
    },
    getCellObj () {
      return {
        img: '',
        text: '',
        disable: false
      }
    }
  },
  computed: {},
  components: {
    // comuploadimgcell,
    bordertext
  }
}

</script>

<style lang="scss">
  $colord3: #d3d3d3;
  $color6f: #6f6f6f;
  $color1b: #1bb1e6;
  .grayContent{
    color: #808080;
  }
  #brefContent{
    height: 35px;
    text-overflow:ellipsis;
    margin-top: 5px;
  }
  .el-icon-view {
    font-size: 16px;
    &:hover{
      cursor: pointer;
      color: #0000ff;
    }
  }
  #publishContent{
    margin-top: 5px;
  }
  // .el-message--success{
  //   position: absolute;
  //   top: 50%;
  //   left: 35%;
  //   background: #000000;
  //   opacity: 0.8;
  // }
  .mosaicitem-1{
    width: 250px;
    height: 300px;
    position: relative;
    overflow: hidden;
    border-radius:3px;
    margin-top: 5px;
    text-align: center;
    margin-bottom: 10px;
    border-style: solid;
    border-width: 1px;
    border-color: #d3d3d3;
    &:hover {
      box-shadow: 2px 4px 6px #d3d3d3;
    }
    .mosaicitemContent-1{
      position: relative;
      height:100%;
      background:#fff;
      border-color: transparent;
      flex-flow: row nowrap;
      .content-text-0{
        display: flex;
        margin-left: 2.5%;
        margin-right: 2.5%;
        margin-top:5px;
        padding-left: 10px;
        padding-right: 10px;
        overflow: hidden;
        text-align: left;
        margin-bottom:10px;
        flex-direction: column;
        .itemName, .itemEdit{
          display: flex;
          width: 180px;
          text-overflow:ellipsis;
          align-items: center;
          overflow: hidden;
          font-weight: bold;
          font-size: 16px;
        }
        .author-from{
          margin-top:5px;
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          flex-direction: row;
        }
        .type{
          display: flex;
          font-size: 10px;
          height: 16px;
          margin-top: 5px;
          overflow: hidden;
          color: #808080;
          flex-direction: row;
        }
        .content-text-main{
          font-size:10px;
          color: #808080;
          height: 100%;
          overflow: hidden;
          margin-top: 5px;
        }

      }
      .photo{
        width: 250px;
        height: 150px;
        background-image: url('/static/picFile.png');
      }

      .center{
        flex: 1;
        display: flex;
        align-items: center;
        .centerContent{
          .centerTitleBox{
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            .centerTitle{
              margin-right: 10px;
              color: #373737;
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
    .seperate-name {
      display: flex;
      justify-content: space-between;
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
        font-weight: lighter;
        color: #fff;
      }
    }
    &.uploaded{
      .itemIconBox{
        .itemIconBorder{
          border-color:$color1b transparent transparent $color1b;/*透明 透明  灰*/
        }
      }
      border-color: $color1b;
    }
  }
</style>

