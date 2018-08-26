<template>
  <div id="mosaic2">
    <div class="header">
      <div>
        <div class="menus">
          <router-link :class="{active: item.isActive}" v-for="item in header.menus" :to="{ path: item.path }" >{{item.text}}</router-link>
        </div>
        <div class="center">
          <div class="inputBox">
            <input :placeholder="header.search.placeholder" v-model="searchWord" @keyup.enter.stop="searchList"/>
            <el-date-picker class="date-picker" v-model="value1" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" type="daterange" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" @change="dateChange" />
          </div>
        </div>
      </div>
      <div class="left tagChooseBox">
        <div class="tagChooseLabel">全部标签：</div>
        <tagselector @change="tagChooseChange":lists="lists"/>
      </div>
    </div>
    <div class="tBodyContainer-1">
      <publishItem v-for="item in listsa"
                  :title1="item.albumName"
                  :albumDetail="item.albumDetail"
                  :publishId="item.albumId"
                  :author="item.createUser"
                  :createTime1="item.createDate"
                  :publishImg="item.thumbnailUrl"
                  :publishTime1="item.updateDate"
                  :tipsList="item.tipsList"
                  :from="item.updateUser">
      </publishItem>
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
import publishItem from '../../components/publish/publishItem.vue'
import tagselector from '@/components/common/albumTagselector'
export default {
  name: 'sentItems',
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
        menus: [{
          text: '草稿箱',
          isActive: false,
          path: '/pages/publish/drafts'
        },
        {
          text: '已发布',
          isActive: true,
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
            res.data.searchResult[i].thumbnailUrl = (res.data.searchResult[i].thumbnailUrl.split('flat'))[0] + 'sphere/thumb_360.jpg'
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
  components: {publishItem, tagselector}
}
</script>

<style lang="scss">
  $margin: 24px;
  $commonColor: #1bb1e6;
  $color9b9b9b: #9b9b9b;

  #mosaic2 {
    font-size: 13px;
    height:100%;
    background: #f0f0f0;
    text-align: center;
    input{

      outline: none;
    }
    .publish-pageing {
      margin-top: 2%;
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
        display: flex;
        flex-wrap: nowrap;
        border:1px solid $commonColor;
        border-radius:2px;
        margin-left: 20px;
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
          width:700px;
          border-radius:2px;
          overflow: hidden;
          display:flex;
          flex-wrap:nowrap;
          flex-flow:row;
          .el-date-editor{
            margin-left:20px;
            height: 28px;
            width: 500px;
            margin-top: -7px;
            border-width: 0px;
            .el-input__icon{
              display: none;
            }
            .el-range-input{
              width: 150px;
              height: 23px;
            }
          }
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

    /*tBody*/
    .tBodyContainer-1{
      padding: 20px 0 1px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      background: #f0f0f0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
    /*el*/
    #panoName .el-checkbox__label{
      color:$color9b9b9b;
    }
  }
</style>
