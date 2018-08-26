<template>
  <div id="mosaic1">
    <div class="header">
      <div>
        <div class="menus">
            <router-link :class="{active: item.isActive}" v-for="item in header.menus" :to="{ path: item.path }" >{{item.text}}</router-link>
        </div>
        <div class="center">
          <div class="inputBox">
            <input :placeholder="header.search.placeholder" style="padding-left:10px;"/>
          </div>
        </div>
      </div>
    </div>
    <div class="tBodyContainer-1">
      <panoChart
        :list="list"
        :x_content="x_content"></panoChart>
      <panoForm
        :tableData3="tableData3"></panoForm>
    </div>
  </div>
</template>

<script>
import panoChart from '../../components/business/panoChart.vue'
import panoForm from '../../components/business/albumForm.vue'
export default {
  name: 'pano',
  data () {
    return {
      // 列表数据
      tableData3: [],
      data: {
        pageNo: 1,
        searchName: '',
        orderBy: 0
      },
      listsa: [],
      totalSize: 0,
      // 折线图数据
      list: [
        {
          name: '浏览量（PV）',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 440, 330, 310],
          areaStyle: {normal: {opacity: 0.1}}
        },
        {
          name: '独立访客（UV）',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410],
          areaStyle: {normal: {opacity: 0.1}}
        },
        {
          name: '访问次数（W）',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320],
          areaStyle: {normal: {opacity: 0.1}}
        }
      ],
      x_content: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      value1: '',
      header: {
        menus: [{
          text: '全景流量',
          isActive: false,
          path: '/pages/static/panoCompute'
        },
        {
          text: '网格流量',
          isActive: false,
          path: '/pages/static/gridCompute'
        },
        {
          text: '专题流量',
          isActive: true,
          path: '/pages/static/albumCompute'
        },
        {
          text: '用户流量',
          isActive: false,
          path: '/pages/static/userCompute'
        }],
        search: {
          placeholder: '搜索全景'
        },
        btnText: '新增拼接工程'
      },
      panoName: true
    }
  },
  computed: {
    panoIds () {}
  },
  watch: {},
  created () {
    this.$api.getAlbumCountList({
      pageNo: 1,
      pageSize: 20,
      searchName: this.data.searchName,
      orderBy: 0
    }).then(res => {
      if (res.data) {
        this.totalSize = res.data.total
        this.tableData3 = res.data.list
      }
    })
  },
  methods: {},
  components: {panoChart, panoForm}
}
</script>

<style lang="scss">
  $margin: 24px;
  $commonColor: #1bb1e6;
  $color9b9b9b: #9b9b9b;

  #mosaic1 {
    font-size: 13px;
    height:100%;
    display: flex;
    background: #f0f0f0;
    flex-flow:column nowrap;
    text-align: center;
    input{
      outline: none;
    }
    /*header*/
    .header{
      padding:20px 0px;
      background: #fff;
      border-bottom:1px solid #dedede;
      >div{
        display: flex;
        flex-wrap: nowrap;
        height:24px;
      }
      .menus{
        display: flex;
        flex-wrap: nowrap;
        margin-left: 20px;
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
          width:170px;
          border-radius:2px;
          overflow: hidden;
          display:flex;
          flex-wrap:nowrap;
          flex-flow:row;
        }
        input{
          border:1px solid #9b9b9b;
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
    }
    /*tBody*/
    .tBodyContainer-1{
        padding: 20px 0 1px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        background: #f0f0f0;
        width: 100%;
        height: 100%;
      }
    /*el*/
    #panoName .el-checkbox__label{
      color:$color9b9b9b;
    }
  }
</style>
