<template xmlns:placeholder="http://www.w3.org/1999/xhtml">
  <div id="container">
    <div id="threeDContent">
      <div id="threeDHeader">
        <div>
          <div id="threeDCenter1">
            <div id="threeDInputBox1">
              <el-input id="threeInput1" suffix-icon="el-icon-search"
                        size="small" style="padding-left:10px; height: 23px" :placeholder="inputHint" @change="search($event)" v-model="searchText"/>
            </div>

          </div>
        </div>

      </div>
      <div id="tBodyContainer-1" v-loading.fullscreen.lock="fullScreenLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
        <item v-for="item in itemArray" :itemData="item" @editdialogclick="editDialog" @detaildialogclick="detailDialog"
              @codedialogclick="showCodeDialog"/>
      </div>
      <jump :total="total" @jumpclick="getData">
      </jump>
    </div>
    <my-dialog :value="isEditDialogTag" :itemData="itemData" @changedataclick="changeData"
               @cancelandrestoredata="restoreData"></my-dialog>
    <codeDialog :value="isCodeDialogTag" :img="codeImg"></codeDialog>
    <!--<threeDDetailDialog :value="detailDialogTag" :threeDUrl="threeDUrl"></threeDDetailDialog>-->
  </div>
</template>
<script>
  import item from '../../components/3Dmodule/3DItem.vue'
  import jump from '../../components/3Dmodule/jumpPage.vue'
  import myDialog from '../../components/3Dmodule/3DDialog.vue'
  import codeDialog from '../../components/3Dmodule/3DCodeDialog.vue'
  import threeDDetailDialog from '../../components/3Dmodule/3DDetailFrame.vue'
  export default {
    name: 'module',
    data () {
      return {
        inputHint: '搜索工程名称',
        value1: '',
        name: true,
        isEditDialogTag: false,
        isCodeDialogTag: false,
        total: 0,
        itemArray: [],
        codeImg: '',
        itemData: {},
        searchText: '',
        fullScreenLoading: false,
        detailDialogTag: false,
        threeDUrl: ''
      }
    },
    computed: {},
    watch: {},
    created () {
      this.getData()
    },
    methods: {
      search (e) {
        this.getData()
      },
      showCodeDialog (url) {
        this.isCodeDialogTag = !this.isCodeDialogTag
        this.codeImg = url
      },
      editDialog (data) {
        this.isEditDialogTag = !this.isEditDialogTag
        this.itemData = data
      },
      detailDialog (url) {
        this.detailDialogTag = !this.detailDialogTag
        this.threeDUrl = url
      },
      updateList (list) {
        this.itemArray = list
      },
      getData (page) {
        if (!page) {
          page = 1
        }
        this.fullScreenLoading = true
        this.$api.getThreeDData({
          offset: page,
          limit: 10,
          threeDimensionalName: this.searchText
        }).then(res => {
          this.fullScreenLoading = false
          if (res.code === 0) {
            this.total = res.data.total
            this.updateList(res.data.list)
          }
        }).catch(res => {
          this.fullScreenLoading = false
          this.$message('请求数据失败')
        })
      },
      restoreData () {
        this.getData()
      },
      changeData (data) {
        this.$api.changeThreeDData({
          threeDimensionalId: data.threeDimensionalId,
          thumbnailUrl: data.thumbnailUrl,
          threeDimensionalName: data.threeDimensionalName,
          latitude: data.latitude,
          longitude: data.longitude,
          area: data.area,
          resolutionRatio: data.resolutionRatio,
          description: data.description
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
          }
        }).catch(res => {
          this.$message('修改失败')
        })
      }
    },
    components: {
      item,
      myDialog,
      codeDialog,
      threeDDetailDialog,
      jump
    }
  }
</script>

<style lang="scss">
  $margin: 24px;
  #container {
    position: relative;
  }

  #threeDContent {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    height: 100%;
    /*header*/
    #threeDHeader {
      margin: 0 $margin;
      padding: 20px 0px;
      border-bottom: 1px solid #dedede;
      > div {
        display: flex;
        flex-wrap: nowrap;
        height: 24px;
      }
    }
    #threeDCenter1 {
      flex: 1;
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
    }
    #threeDInputBox1 {
      width: 240px;
      border-radius: 2px;
      overflow: hidden;
      display: flex;
      flex-wrap: nowrap;
      flex-flow: row;
    }
    #threeInput1 {
      height: 23px;
      padding-left: 10px;
      border: 1px solid #9b9b9b;
      flex: 1;
      input{
        background: #fff;
        height: 23px;
      }
      .el-input__icon{
        line-height: 20px;
      }
    }
    .el-input--small .el-input__icon{
      line-height: 23px;
    }
    /*tBody*/
    #tBodyContainer-1 {
      padding-left: 5%;
      padding-top: 2%;
      padding-bottom: 2%;
      display: flex;
      flex-wrap: wrap;
      background: #f0f0f0;
      width: 100%;
      height: 100%;
    }
  }

  #threeDModel {
    position: fixed;
    left: 0;
    bottom: 0;
    background: red;
  }
</style>
