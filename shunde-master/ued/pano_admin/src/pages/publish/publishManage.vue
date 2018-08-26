<template>
  <div id="mosaic">
    <div class="header">
      <div>
        <div class="menus">
            <router-link :class="{active: item.isActive}" v-for="item in header.menus" :to="{ path: item.path }" >{{item.text}}</router-link>
        </div>
        <div class="center">
          ]/<div class="inputBox">
            <input :placeholder="header.search.placeholder" style="padding-left:10px;"/>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div id="tHeader">
      </div>
      <div id="tBody">
      </div>
    </div>
  </div>
</template>

<script>
import mosaicitem from '../../components/pano/mosaicitem'
import bordertext from '../../components/common/bordertext'

export default {
  name: 'publish',
  // props: ['mosaicSuccess'],
  data () {
    return {
      header: {
        menus: [{
          text: '草稿箱',
          isActive: true,
          path: '/pages/publish/drafts'
        },
        {
          text: '已发布',
          isActive: false,
          path: '/pages/publish/sentItems'
        },
        {
          text: '已删除',
          isActive: false,
          path: '/pages/publish/delete'
        }],
        search: {
          placeholder: '搜索关键字'
        },
      },
      panoName: true,

    }
  },
  computed: {
    panoIds () {}
  },
  watch: {},
  created () {},
  methods: {},
  components: {mosaicitem, bordertext}
}
</script>

<style lang="scss">
  $margin: 24px;
  $commonColor: #1bb1e6;
  $color9b9b9b: #9b9b9b;

  #mosaic {
    font-size: 13px;
    input{
      outline: none;
    }
    /*header*/
    .header{
      margin:0 $margin;
      padding:20px 0px;
      border-bottom:1px solid #dedede;
      >div{
        display: flex;
        flex-wrap: nowrap;
        height:24px;
      }
      .menus{
        display: flex;
        flex-wrap: nowrap;
        border:1px solid $commonColor;
        border-radius:2px;
        a{
          display: flex;
          align-items: center;
          padding:0 4px;
          color: $commonColor;
        }
        :not(:last-child){
          border-right:1px solid $commonColor;
        }
        a.active, a:hover{
          background:$commonColor;
          color:#fff;
        }
      }
      .center{
        flex:1;
        display:flex;
        flex-wrap:nowrap;
        justify-content: center;
        .inputBox{
          width:240px;
          border:1px solid #9b9b9b;
          border-radius:2px;
          overflow: hidden;
          display:flex;
          flex-wrap:nowrap;
          flex-flow:row;
        }
        input{
          margin-left:10px;
          flex:1;
        }
      }
    }

    /*tHeader*/
    #tHeader{
      margin:8px $margin;
      display: flex;
      flex-flow:row nowrap;
      align-items: center;
      .left{
        width: 25%;
        color: $color9b9b9b;
      }
      .center{
        flex:1;
        color: $color9b9b9b;
      }
      .right{
        display: flex;
        flex-flow:row nowrap;
        >div{
          padding:2px 8px;
          border-radius:4px;
        }
        #startAll{
          background:$commonColor;
          color:#fff;
          margin-right:5px;
          cursor:pointer;
        }
        #deleteAll{
          color:#ef4a4a;
          border:1px solid #ef4a4a;
          cursor:pointer;
        }
      }
    }

    /*tBody*/
    #tBody{
      background: #f0f0f0;
      >div{
        margin:0 $margin;
      }
      .tBodyContainer{
        padding: 20px 0 1px;
      }
    }

    /*el*/
    #panoName .el-checkbox__label{
      color:$color9b9b9b;
    }
  }
</style>
