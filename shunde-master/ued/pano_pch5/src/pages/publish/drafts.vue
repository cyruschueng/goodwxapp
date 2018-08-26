<template>
  <div id="mosaic1">
    <div class="tBodyContainer-1">
      <div class="header">
        <div>
          <div class="menus">
          </div>
          <div class="center">
            <span class="mySpan">全景专题</span>
            <div class="inputBox">
              <el-input  @keyup.enter.native="searchList"
                placeholder="请输入专题关键字"
                v-model="searchWord">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <!--<el-date-picker class="date-picker" v-model="value1" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" type="daterange" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" @change="dateChange" />-->
            </div>

          </div>
        </div>
        <!--<div class="left tagChooseBox">-->
        <!--<div class="tagChooseLabel">全部标签：</div>-->
        <!--<tagselector @change="tagChooseChange":lists="lists"/>-->
        <!--</div>-->
      </div>
      <div id="flexNeed">
      <mosaicitem v-for="item in listsa"
                  :title1="item.albumName"
                  :content="item.albumDetail"
                  :publishId="item.albumId"
                  :author="item.createUser"
                  :createTime1="item.createDate"
                  :publishImg="item.thumbnailUrl"
                  :tipsList="item.tipsList"
                  :from="item.updateUser">
        </mosaicitem>
      </div>
    </div>
    <el-pagination class="publish-pageing"
                   background
                   layout="prev, pager, next"
                   :page-size="6"
                   @current-change="bottomChange"
                   :total="totalSize">
    </el-pagination>
  </div>
</template>

<script>
import mosaicitem from '../../components/publish/draftItem.vue'
import bordertext from '../../components/common/bordertext'
import tagselector from '@/components/common/albumTagselector'

export default {
  name: 'drafts',
  // props: ['mosaicSuccess'],
  data () {
    return {
      data: {
        q: '',
        fromPage: 1,
        size: 6,
        updateDate: '',
        create_user: '###',
        tips: '',
        status: 1
      },
      searchWord: '',
      listsa: [],
      totalSize: null,
      value1: '',
      header: {
        search: {
          placeholder: '搜索关键字'
        },
        btnText: '新增拼接工程'
      },
      panoName: true,
      lists: []
    }
  },
  computed: {
    panoIds () {}
  },
  watch: {},
  created () {
    this.$api.getPublishedList({
      params: {
        q: '',
        fromPage: 1,
        size: 6,
        create_user: '###',
        tip: '',
        status: 1
      }
    }).then(res => {
      if (res.data) {
        this.totalSize = res.data.total
        this.listsa = []
        for (var i = 0; i < res.data.searchResult.length; i++) {
          if (res.data.searchResult[i].thumbnailUrl != null) {
            res.data.searchResult[i].thumbnailUrl = (res.data.searchResult[i].thumbnailUrl.split('flat'))[0] + 'sphere/thumb_360.jpg'
          } else {
            res.data.searchResult[i].thumbnailUrl = ''
          }
          this.listsa.push(res.data.searchResult[i])
        }
        this.lists = res.data.tipsSet
      }
    })
  },
  methods: {
    selectList (data) {
      this.$api.getPublishedList({
        params: {
          q: data.q,
          fromPage: data.fromPage,
          size: 6,
          create_user: '###',
          fromDate: data.updateDate[0],
          toDate: data.updateDate[1],
          tip: data.tips,
          status: data.status
        }
      }).then(res => {
        if (res.data) {
          this.totalSize = res.data.total
          this.listsa = []
          for (var i = 0; i < res.data.searchResult.length; i++) {
            if (res.data.searchResult[i].thumbnailUrl != null) {
              res.data.searchResult[i].thumbnailUrl = (res.data.searchResult[i].thumbnailUrl.split('flat'))[0] + 'sphere/thumb_360.jpg'
            } else {
              res.data.searchResult[i].thumbnailUrl = ''
            }
            this.listsa.push(res.data.searchResult[i])
          }
        }
      })
    },
    bottomChange (pageNo) {
      this.data.fromPage = pageNo
      this.selectList(this.data)
    },
    tagChooseChange (tags) {
      let tagName = ''
      for (let i in tags) {
        if (tags.hasOwnProperty(i)) {
          tagName += tags[i]
        }
      }
      this.tagName = tagName
      if (tagName === '全部') {
        this.data.tips = ''
      } else {
        this.data.tips = tagName
      }
      this.selectList(this.data)
    },
    searchList () {
      this.data.q = this.searchWord
      this.data.fromPage = 1
      this.selectList(this.data)
    },
    dateChange () {
      console.log(this.value1)
      this.data.q = this.searchWord
      this.data.fromPage = 1
      this.data.updateDate = this.value1
      this.selectList(this.data)
    }
  },
  components: {mosaicitem, bordertext, tagselector}
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
    .mySpan{
      margin-left: 40px;
      font-weight:bold;
      font-size: 18px;
      float: left;
    }
    input{
      outline: none;
    }
    /*header*/
    .header{
      padding:20px 0px;
      margin-top: 40px;
      background: #fff;
      text-align: right;
      border-bottom:1px solid #dedede;
      >div{
        height:24px;
      }
      .tagChooseBox{
        display: flex;
        height:24px;
        z-index:10;
        margin-left: 20px;
        margin-top: 20px;
        align-items: center;
        .tagChooseLabel{
          display: flex;
          align-items: center;
        }
      }
      .menus{
        display: none;
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
        text-align: right;
        .inputBox{
          width: 160px;
          right: -60%;
          position: relative;
          border-radius:2px;
          height: 25px;
          overflow: hidden;
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
    .el-input--prefix{
      input{
        height: 25px;
      }
      span{
        i{
          line-height: 0px;
        }
      }
    }

    /*tBody*/
    .tBodyContainer-1{
      padding: 20px 0 1px;
      background: #f0f0f0;
      width: 790px;
      margin-left: auto;
      margin-right: auto;
      height: 100%;
      z-index: 0;
      }
    #flexNeed{
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      justify-content: space-between;
    }

    /*el*/
    #panoName .el-checkbox__label{
      color:$color9b9b9b;
    }
    .publish-pageing {
      margin-top: 40px;
    }
  }
</style>
