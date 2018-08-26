<template>
  <div class="mosaicitem-1" :class="{uploaded: uploaded}"  @click.stop="previewAlbum()">
    <div class="mosaicitemContent-1">
      <img class="photo" :src="publishImg"/>
      <div class="content-text">
        <div class="idTitle-1">
          <div class="right-1">
          </div>
        </div>
        <div class="publishId">{{publishId}}</div>
        <div class="itemName">{{title1}}</div>
        <div class="author-from">
          <div>作者：{{author}}</div>
        </div>
        <div class="type">{{tipsList.join("/")}}</div>
        <span class="date-info">创建于：{{createTime1}}    删除于：{{from}}
        </span>
        <span class="content-text-main">
          {{albumDetail}}
        </span>
      </div>
    </div>

  </div>
</template>
<script>
import comuploadimgcell from '../../components/pano/comuploadimgcell'
import bordertext from '../../components/common/bordertext'

export default {
  name: 'deleteItem',
  props: {
    uploaded: true,
    publishImg: '',
    publishTime1: '',
    albumDetail: '',
    tipsList: null,
    title1: '',
    author: '',
    from: '',
    type: '',
    content: '',
    publishId: '',
    createTime1: '',
    tiles: [{
      img: '../../../static/draft.jpg',
      text: '',
      disable: false
    }]

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
    comuploadimgcell,
    bordertext
  }
}

</script>

<style lang="scss">
  $colord3: #d3d3d3;
  $color6f: #6f6f6f;
  $color1b: #1bb1e6;
  .mosaicitem-1{
    width: 44%;
    min-width: 500px;
    height: 220px;
    position: relative;
    overflow: hidden;
    margin-left: 50px;
    border-radius:3px;
    margin-top: 10px;
    text-align: center;
    margin-bottom: 10px;
    border: solid 1px #cccccc;
    &:hover {
      box-shadow: 0px 0px 10px 1px #d3d3d3;
    }
    .mosaicitemContent-1{
      position: relative;
      display: flex;
      height:100%;
      background:#fff;
      border-color: transparent;
      width: 100%;
      flex-flow: row nowrap;
      .content-text{
        display: flex;
        margin-left: 2.5%;
        margin-right: 2.5%;
        margin-top:10px;
        margin-bottom:10px;
        flex-direction: column;
        .itemName, .itemEdit{
          display: flex;
          align-items: center;
          font-weight: bold;
          margin-top: 12px;
          font-size: 16px;
        }
        .author-from{
          margin-top:5px;
          display: flex;
          font-size: 10px;
          flex-direction: row;
        }
        .type{
          margin-top:12px;
          display: flex;
          font-size: 10px;
          color: #808080;
          flex-direction: row;
        }
        .content-text-main{
          font-size:10px;
          height: 50px;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #808080;
          margin-top: 5px;
        }

      }
      .idTitle{
        flex-direction: row;
        justify-content: space-between;
        display: flex;
        .publishId{
          border-style: solid;
          color: #00aeff;
          padding: 1px;
          border-width: 1px;
        }
      }
      .photo{
        width: 43%;
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

