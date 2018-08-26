<template>
  <div id="mosaic1">
    <div class="header">
      <div>
        <div class="menus">
          <router-link :class="{active: item.isActive}" v-for="item in header.menus" :to="{ path: item.path }">
            {{item.text}}
          </router-link>
        </div>
        <div class="center">
          <div class="inputBox">
            <input :placeholder="header.search.placeholder"  style="padding-left:10px;"/>
            <el-date-picker class="date-picker" v-model="value1" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" type="daterange" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" @change="dateChange" />
          </div>
        </div>
      </div>

    </div>
    <div class="tBodyContainer-1">
      <mosaicitem v-for="panoItem in panoItems"/>
    </div>
  </div>
</template>

<script>
  import mosaicitem from '../../components/publish/deleteItems.vue'
  import bordertext from '../../components/common/bordertext'

  export default {
    name: 'delete',
    // props: ['mosaicSuccess'],
    data () {
      return {
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
        panoItems: [{
          uploaded: true,
          loadStyle: '未上传',
          uploadTotal: '批量上传',
          tiles: [{
            img: '/static/login/img1.png',
            text: '',
            disable: false
          }]
        },
        {
          uploaded: false
        },
        {
          uploaded: false
        },
        {
          uploaded: false
        },
        {
          uploaded: false
        },
        {
          uploaded: false
        }]
      }
    },
    computed: {
      panoIds () {
      }
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
    components: {mosaicitem, bordertext}
  }
</script>

<style lang="scss">
  $margin: 24px;
  $commonColor: #1bb1e6;
  $color9b9b9b: #9b9b9b;

  #mosaic1 {
    text-align: center;
    font-size: 13px;
    height: 100%;
    display: flex;
    background: #f0f0f0;
    flex-flow: column nowrap;
    input {
      outline: none;
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
      .menus {
        display: flex;
        flex-wrap: nowrap;
        margin-left: 20px;
        border: 1px solid $commonColor;
        border-radius: 2px;
        a {
          display: flex;
          align-items: center;
          padding: 0 4px;
          color: $commonColor;
        }
        :not(:last-child) {
          border-right: 1px solid $commonColor;
        }
        a.active, a:hover {
          background: $commonColor;
          color: #fff;
        }
      }
      .center {
        flex: 1;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        .inputBox {
          width: 700px;
          border-radius: 2px;
          overflow: hidden;
          display: flex;
          flex-wrap: nowrap;
          flex-flow: row;
          .date-picker {
            margin-left: 20px;
            border-width: 0px;
            .el-input__inner {
              height: 100%;
              width: 150px;
            }
            .el-input__icon {
              line-height: 27px;
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
        display: flex;
        flex-flow: row nowrap;
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
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      background: #f0f0f0;
      width: 100%;
      height: 100%;
    }

    /*el*/
    #panoName .el-checkbox__label {
      color: $color9b9b9b;
    }
  }
</style>
