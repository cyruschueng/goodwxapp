<template>
  <div id="mosaic-detele">
    <div class="header">
      <div>
        <div class="menus">
          <router-link :class="{active: item.isActive}" v-for="item in header.menus" :to="{ path: item.path }">
            {{item.text}}
          </router-link>
        </div>
        <div class="center">
          <div class="inputBox-publish">
            <el-input class="search-input-3" :placeholder="header.search.placeholder"  suffix-icon="el-icon-search"
                      size="small" style="padding-left:10px; height: 23px" v-model="searchWord" @change="searchList"/>
            <el-date-picker class="date-picker" v-model="value1" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期" type="daterange" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                            placeholder="选择日期" @change="dateChange"/>
          </div>
        </div>
      </div>

    </div>
    <div class="tBodyContainer-1">
      <mosaicitem v-for="item in listsa"
                  :title1="item.albumName"
                  :content="item.albumDetail"
                  :publishId="item.albumId"
                  :author="item.createUser"
                  :createTime1="item.createDate"
                  :publishImg="item.thumbnailUrl"
                  :tipsList="item.tipsList"
                  :from="item.updateDate">
      </mosaicitem>
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
  import mosaicitem from '../../components/publish/deleteItems.vue'
  import tagselector from '@/components/common/albumTagselector'

  export default {
    name: 'delete',
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
          status: 2
        },
        user_id: 0,
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
            isActive: false,
            path: '/pages/publish/sentItems'
          },
          {
            text: '已删除',
            isActive: true,
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
      panoIds () {
      }
    },
    watch: {},
    created () {
      if (this.$cookie.get('userId') !== null && this.$cookie.get('userId') !== undefined && this.$cookie.get('roleId') === '1') {
        this.user_id = 1
        console.log(this.user_id)
      }
      this.$api.getPublishedList({
        params: {
          q: '',
          fromPage: 1,
          size: 6,
          createUser: this.user_id,
          tip: '',
          status: 2
        }
      }).then(res => {
        if (res.data) {
          this.totalSize = res.data.total
          this.listsa = []
          for (var i = 0; i < res.data.searchResult.length; i++) {
            if (res.data.searchResult[i].thumbnailUrl != null) {
              res.data.searchResult[i].thumbnailUrl = (res.data.searchResult[i].thumbnailUrl.split('flat'))[0] + 'sphere/thumb_360.jpg'
            } else if (!res.data.searchResult[i].thumbnailUrl) {
              res.data.searchResult[i].thumbnailUrl = './static/picFile.png'
            }
            if (res.data.searchResult[i].updateUser == null) {
              res.data.searchResult[i].updateUser = ''
            }
            if (res.data.searchResult[i].updateDate == null) {
              res.data.searchResult[i].updateDate = ''
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
            createUser: this.user_id,
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
              } else if (!res.data.searchResult[i].thumbnailUrl) {
                res.data.searchResult[i].thumbnailUrl = './static/picFile.png'
              }
              if (res.data.searchResult[i].updateUser == null) {
                res.data.searchResult[i].updateUser = ''
              }
              if (res.data.searchResult[i].updateDate == null) {
                res.data.searchResult[i].updateDate = ''
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
        if (this.value1 === null) {
          this.data.updateDate = ['', '']
        } else {
          this.data.updateDate = this.value1
        }
        this.data.q = this.searchWord
        this.data.fromPage = 1
        this.selectList(this.data)
      }
    },
    components: {mosaicitem, tagselector}
  }
</script>

<style lang="scss">
  $margin: 24px;
  $commonColor: #1bb1e6;
  $color9b9b9b: #9b9b9b;

  #mosaic-detele {
    text-align: center;
    font-size: 13px;
    height: 100%;
    display: flex;
    background: #f0f0f0;
    flex-flow: column nowrap;
    input {
      outline: none;
    }
    .publish-pageing {
      margin-top: 15px;
      margin-bottom: 10px;
    }
    /*header*/
    .header {
      padding: 20px 0px;
      background: #fff;
      border-bottom: 1px solid #dedede;
      > div {
        display: flex;
        flex-wrap: nowrap;
        height: 24px;
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
      .center {
        flex: 1;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        .inputBox-publish {
          width: 600px;
          border-radius: 2px;
          overflow: hidden;
          display: flex;
          flex-wrap: nowrap;
          flex-flow: row;
          .el-input__inner{
            border-color: #808080;
            padding-left:10px;
          }
          .search-input-3 {
            width: 200px;
            margin-right: 30px;
            input{
              background: #fff;
              height: 23px;
            }
            .el-input__icon{
              line-height: 20px;
            }
          }
          .el-range-editor.el-input__inner{
            padding:0px;
          }
          .el-date-editor{
            margin-left:20px;
            height: 24px;
            width: 500px;
            border-width: 0px;
            .el-range-separator {
              font-size: 10px;
              margin-right: 10px;
              margin-left: 10px;
            }
            .el-range-input{
              width: 150px;
              vertical-align: top;
              height: 24px;
              border:solid 1px #808080
            }
          }
        }
        input {
          border: 1px solid #9b9b9b;
          flex: 1;
        }
      }
    }

    /*tHeader*/
    #tHeader {
      margin: 8px $margin;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      .left {
        width: 25%;
        color: $color9b9b9b;
      }
      .center {
        flex: 1;
        color: $color9b9b9b;
      }
      .right {
        right: 10px;
        > div {
          padding: 2px 8px;
          border-radius: 4px;
        }
        #startAll {
          background: $commonColor;
          color: #fff;
          margin-right: 5px;
          cursor: pointer;
        }
        #deleteAll {
          color: #ef4a4a;
          border: 1px solid #ef4a4a;
          cursor: pointer;
        }
      }
    }

    /*tBody*/
    .tBodyContainer-1 {
      padding: 20px 0 1px;
      display: flex;
      flex: 1;
      align-content: flex-start;
      min-width: 1200px;
      margin-left: auto;
      margin-right: auto;
      flex-wrap: wrap;
      justify-content: flex-start;
      background: #f0f0f0;
      max-width: 1600px;
    }

    /*el*/
    #panoName .el-checkbox__label {
      color: $color9b9b9b;
    }
  }
</style>
