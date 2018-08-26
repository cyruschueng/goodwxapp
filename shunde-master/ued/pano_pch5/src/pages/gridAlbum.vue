<template>
  <div id="back">
    <div class="header-main">
      <div class="center">
        <div class="inputBox">
        </div>
      </div>
      <div class="divide-content">
        <div class="left-part">
          <p>全景网格</p>
          <img id="grid-image" src="/static/gridExample.png" @click="jumpToGrid"/>
        </div>
        <div class="right-part">
          <div style="font-size: 18px;font-weight: bold;width: 520px;display:flex;justify-content: space-between">
            <span>热门专题</span>
            <el-button id="myButton" @click="jumpToPage">查看更多</el-button>
          </div>
          <div class="right-child">
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
      </div>

    </div>
  </div>
</template>
<script>
  import mosaicitem from '../components/publish/draftItem-main.vue'
  import ElButton from '../../node_modules/element-ui/packages/button/src/button.vue'
  export default {
    name: 'grid-album',
    components: {
      ElButton,
      mosaicitem
    },
    data () {
      return {
        data: {
          q: '',
          fromPage: 1,
          size: 6,
          updateDate: '',
          create_user: '###',
          tips: '',
          status: 0
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
            res.data.searchResult[i].thumbnailUrl = (res.data.searchResult[i].thumbnailUrl.split('flat'))[0] + 'sphere/thumb_360.jpg'
            this.listsa.push(res.data.searchResult[i])
          }
          this.lists = res.data.tipsSet
        }
      })
    },
    methods: {
      jumpToPage () {
        this.$router.push('publish')
      },
      jumpToGrid () {
        this.$router.push('space')
      },
      searchList () {
        this.data.q = this.searchWord
        this.data.fromPage = 1
        this.selectList(this.data)
      }
    },
    computed: {
      example () {
      }
    }
  }
</script>
<style lang="scss">
  #back {
    background: #f0f0f0;
    text-align: center;
  }

  .el-input--prefix {
    input {
      height: 25px;
    }
    span {
      i {
        line-height: 0px;
      }
    }
  }
  #myButton {
    height: 30px;
    margin-left: 370px;
    padding-left:10px;
    padding-right: 10px;
    padding-top: 10px;
  }

  .center {
    text-align: right;
    .inputBox {
      width: 150px;
      right: -80%;
      position: relative;
      border-radius: 2px;
      height: 25px;
      overflow: hidden;
    }
    input {
      border: 1px solid #9b9b9b;
      flex: 1;
    }
  }

  .header-main {
    padding: 20px 0px;
    margin-top: 40px;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    background: #fff;
    border-bottom: 1px solid #dedede;
  }

  .divide-content {
    width: 100%;
    margin-left: 20px;
    margin-right: 20px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    .left-part {
      text-align: left;
      margin-left: 50px;
      width: 30%;
      p {
        font-weight:bold;
        font-size: 18px;
      }
    }
    .right-part {
      margin-left: 40px;
      width: 60%;
      .right-child {
        margin-top: 30px;
        justify-content: flex-start;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
  #grid-image {
    width: 100%;
    margin-right: 10%;
    margin-top: 45px;
  }
</style>
