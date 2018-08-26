<template>
  <div id="mosaic1">
    <div class="header">
      <div>
        <div class="menus">
          <router-link :class="{active: item.isActive}" v-for="item in header.menus" :to="{ path: item.path }" >{{item.text}}</router-link>
        </div>
        <div class="center">
          <div class="inputBox" style="width: 200px;">
            <el-input class="search-input-4" search-input-3 :placeholder="header.search.placeholder" @change="searchTable" suffix-icon="el-icon-search"
                   size="small" style="padding-left:10px; height: 23px" v-model="data.searchName"/>
          </div>
        </div>
      </div>
    </div>
    <div class="tBodyContainer-1">
      <panoChart
        :list="list"
        :x_content="x_content" @dropChange="dropChanged" @dateChange="dateSelected"></panoChart>
      <panoForm
        :tableData3="tableData3" @change="tableChoose" @dropChange="selectorChanged"></panoForm>
      <el-pagination class="publish-pageing"
                     background
                     layout="prev, pager, next"
                     :page-size="5"
                     @current-change="bottomChange"
                     :total="totalSize">
      </el-pagination>
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
        selectValue: null,
        totalSize: null,
        TableTab: '',
        // 列表数据
        tableData3: [],
        data: {
          pageNo: 1,
          searchName: '',
          orderBy: 0
        },
        panoData: {
          type: 1,
          panoAlbumId: '',
          fromDate: '',
          toDate: ''
        },
        // 折线图数据
        list: [
          {
            name: '浏览量（PV）',
            type: 'line',
            data: [],
            areaStyle: {normal: {opacity: 0.1}}
          },
          {
            name: '独立访客（UV）',
            type: 'line',
            data: [],
            areaStyle: {normal: {opacity: 0.1}}
          },
          {
            name: '访问次数（VV）',
            type: 'line',
            data: [],
            areaStyle: {normal: {opacity: 0.1}}
          }
        ],
        x_content: [],
        chartList: [],
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
            placeholder: '搜索专题关键字'
          },
          btnText: '新增拼接工程'
        },
        panoName: true
      }
    },
    computed: {
      panoIds () {}
    },

    created () {
      this.dropChanged('1')
      this.searchTable()
    },
    methods: {
      selectorChanged (val) {
        this.data.orderBy = val
        this.searchTable()
      },
      bottomChange (page) {
        this.data.pageNo = page
        this.searchTable()
      },
      dateSelected (val) {
        if (val[0] !== '') {
          this.panoData.type = '5'
          this.panoData.fromDate = val[0]
          this.panoData.toDate = val[1]
        } else {
          this.panoData.fromDate = ''
          this.panoData.toDate = ''
          this.panoData.type = this.selectValue
        }
        this.selectSingle()
      },
      searchTable () {
        this.$api.getAlbumCountList({
          pageNo: this.data.pageNo,
          pageSize: 5,
          searchName: this.data.searchName,
          orderBy: this.data.orderBy
        }).then(res => {
          if (res.data) {
            this.totalSize = res.data.total
            this.tableData3 = res.data.list
          }
        })
      },
      getNowFormatDate (last) {
        this.chartList = []
        var date = new Date()
        var seperator1 = '-'
        var year
        var month
        var strDate
        date.setDate(date.getDate())
        year = date.getFullYear()
        month = date.getMonth() + 1
        strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        var currentDate = year + seperator1 + month + seperator1 + strDate
        this.chartList.push(currentDate)
        for (var i = last; i > 0; i--) {
          date.setDate(date.getDate() - 1)
          year = date.getFullYear()
          month = date.getMonth() + 1
          strDate = date.getDate()
          if (month >= 1 && month <= 9) {
            month = '0' + month
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate
          }
          var currentDate1 = year + seperator1 + month + seperator1 + strDate
          this.chartList.push(currentDate1)
        }
        this.x_content = this.chartList.reverse()
      },
      getNowFormatDateMonth (last) {
        this.chartList = []
        var date = new Date()
        var seperator1 = '-'
        var year
        var month
        date.setMonth(date.getMonth())
        year = date.getFullYear()
        month = date.getMonth() + 1
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        var currentDate = year + seperator1 + month
        this.chartList.push(currentDate)
        for (var i = last; i > 0; i--) {
          date.setMonth(date.getMonth() - 1)
          year = date.getFullYear()
          month = date.getMonth() + 1
          if (month >= 1 && month <= 9) {
            month = '0' + month
          }
          var currentDate1 = year + seperator1 + month
          this.chartList.push(currentDate1)
        }
        this.x_content = this.chartList.reverse()
      },
      getSelectedFormatDate (start, end) {
        function getDate (dateStr) {
          var temp = dateStr.split('-')
          var date = new Date(temp[0], temp[1] - 1, temp[2])
          return date
        }
        this.x_content = []
        var startTime = getDate(start)
        var endTime = getDate(end)
        while ((endTime.getTime() - startTime.getTime()) >= 0) {
          var year = startTime.getFullYear()
          var month = startTime.getMonth().toString().length === 1 ? '0' + (startTime.getMonth() + 1).toString() : (startTime.getMonth() + 1).toString()
          var day = startTime.getDate().toString().length === 1 ? '0' + startTime.getDate() : startTime.getDate()
          this.x_content.push(year + '-' + month + '-' + day)
          this.list[0].data.push(0)
          this.list[1].data.push(0)
          this.list[2].data.push(0)
          startTime.setDate(startTime.getDate() + 1)
        }
      },
      selectSingle () {
        this.$api.getAlbumForm({
          panoAlbumId: this.panoData.panoAlbumId,
          type: this.panoData.type,
          fromDate: this.panoData.fromDate,
          toDate: this.panoData.toDate
        }).then(res => {
          if (res.data) {
            this.list[0].data = []
            this.list[1].data = []
            this.list[2].data = []
            switch (this.panoData.type) {
              case '1':
                this.getNowFormatDate(6)
                this.list[0].data = [0, 0, 0, 0, 0, 0, 0]
                this.list[1].data = [0, 0, 0, 0, 0, 0, 0]
                this.list[2].data = [0, 0, 0, 0, 0, 0, 0]
                break
              case '2':
                this.getNowFormatDate(29)
                this.list[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                this.list[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                this.list[2].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                break
              case '3':
                this.getNowFormatDateMonth(2)
                this.list[0].data = [0, 0, 0]
                this.list[1].data = [0, 0, 0]
                this.list[2].data = [0, 0, 0]
                break
              case '4':
                this.getNowFormatDateMonth(11)
                this.list[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                this.list[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                this.list[2].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                break
              case '5':
                this.getSelectedFormatDate(this.panoData.fromDate, this.panoData.toDate)
                break
            }
          }
          for (var k = 0; k < this.x_content.length; k++) {
            if (res.data[this.x_content[k]]) {
              this.list[0].data[k] = (res.data[this.x_content[k]].pv)
              this.list[1].data[k] = (res.data[this.x_content[k]].uv)
              this.list[2].data[k] = (res.data[this.x_content[k]].vv)
            }
          }
        })
      },
      tableChoose (value) {
        this.panoData.panoAlbumId = value.panoAlbumId
        this.selectSingle()
      },
      dropChanged (val) {
        this.panoData.type = val
        this.panoData.fromDate = ''
        this.panoData.toDate = ''
        this.selectValue = val
        this.selectSingle()
      }
    },
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
          height: 25px;
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
        .search-input-4 {
          width: 200px;
          margin-right: 30px;
          input{
            background: #fff;
            height: 25px;
          }
          .el-input__icon{
            line-height: 20px;
          }
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
      text-align: center;
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
    .publish-pageing {
      margin-left: auto;
      margin-right: auto;
      margin-top: 20px;
    }
  }
</style>
