<template>
  <el-dialog id="three-d-dialog" title="三维模型信息修改" :visible.sync="isShowCodeVisible">
    <div id="dialog-content">
      <div>
        <div class="shareText">缩略图</div>
        <up-load-view v-model="imageUrl">
        </up-load-view>
      </div>
      <div id="secondPart">
        <div class="shareText">描述信息</div>
        <div class="input-layout">名&nbsp&nbsp&nbsp称
          <el-input class="input" v-model="inputData" placeholder="请输入名称"></el-input>
        </div>
        <div class="input-layout">面&nbsp&nbsp&nbsp积
          <el-input class="input" v-model="inputData2" placeholder="请输入面积"></el-input>
        </div>
        <div class="input-layout">经&nbsp&nbsp&nbsp度
          <el-input class="input" v-model="longitude" placeholder="请输入坐标"></el-input>
        </div>
        <div class="input-layout">纬&nbsp&nbsp&nbsp度
          <el-input class="input" v-model="latitude" placeholder="请输入坐标"></el-input>
        </div>
        <div class="input-layout">分辨率
          <el-input class="input" v-model="inputData4" placeholder="请输入分辨率"></el-input>
        </div>
        <div class="input-layout-2">
          <div class="title">简&nbsp&nbsp&nbsp介</div>
          <el-input class="text-area"
                    type="textarea"
                    :rows="5"
                    placeholder="请输入描述内容"
                    v-model="textAreaContent">
          </el-input>
        </div>


      </div>

    </div>
    <div class="save-cancel">
      <el-button type="primary" v-on:click="cancel">取    消</el-button>
      <el-button type="primary" v-on:click="save">保    存</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import upLoadView from '../../components/3Dmodule/uploadImage.vue'
  export default {
    name: 'dialog',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      itemData: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        threeDimensionalId: this.itemData.threeDimensionalId,
        inputData: this.itemData.threeDimensionalName,
        inputData2: this.itemData.area,
        inputData4: this.itemData.resolutionRatio,
        longitude: this.itemData.longitude,
        latitude: this.itemData.latitude,
        imageUrl: this.itemData.thumbnailUrl,
        textAreaContent: this.itemData.description,
        dialogTableVisibleSuccess: true,
        isShowCodeVisible: false,
        oldData: {}
      }
    },
    created () {
    },
    methods: {
      cancel () {
        this.isShowCodeVisible = false
        this.inputData = this.oldData.threeDimensionalName
        this.threeDimensionalId = this.oldData.threeDimensionalId
        this.inputData2 = this.oldData.area
        this.inputData4 = this.oldData.resolutionRatio
        this.longitude = this.oldData.longitude
        this.latitude = this.oldData.latitude
        this.imageUrl = this.oldData.thumbnailUrl
        this.textAreaContent = this.oldData.description
      },
      save () {
        if (!this.inputData || this.inputData.trim() === '') {
          this.$message('名称不能为空')
          return
        }
        if (!this.inputData2 || this.inputData2.toString().trim() === '') {
          this.$message('面积不能为空')
          return
        }
        if (!this.inputData4 || this.inputData4.toString().trim() === '') {
          this.$message('分辨率不能为空')
          return
        }
        if (!this.longitude || this.longitude.toString().trim() === '') {
          this.$message('经度不能为空')
          return
        }
        if (!this.latitude || this.latitude.toString().trim() === '') {
          this.$message('纬度不能为空')
          return
        }
        if (!this.imageUrl || this.imageUrl.toString().trim() === '') {
          this.$message('请上传图片')
          return
        }
        if (!this.textAreaContent || this.textAreaContent.toString().trim() === '') {
          this.$message('描述不能为空')
          return
        }

        var editData = {
          threeDimensionalId: this.threeDimensionalId,
          threeDimensionalName: this.inputData,
          area: this.inputData2,
          resolutionRatio: this.inputData4,
          longitude: this.longitude,
          latitude: this.latitude,
          thumbnailUrl: this.imageUrl,
          description: this.textAreaContent
        }
        this.$emit('changedataclick', editData)
        this.isShowCodeVisible = false
      }
    },
    computed: {},
    watch: {
      value () {
        this.isShowCodeVisible = true
      },
      itemData (data) {
        this.inputData = data.threeDimensionalName
        this.threeDimensionalId = data.threeDimensionalId
        this.inputData2 = data.area
        this.inputData4 = data.resolutionRatio
        this.longitude = data.longitude
        this.latitude = data.latitude
        this.imageUrl = data.thumbnailUrl
        this.textAreaContent = data.description
        this.oldData = this.$utils.shallowCopy(data)
      }
    },
    components: {
      upLoadView
    }
  }
</script>
<style lang="scss">
  #three-d-dialog {
    .el-dialog {
      position: fixed;
      height: 500px;
      width: 650px;
      left: 50%;
      margin-left: -300px;
      .el-dialog__header {
        background-color: #F5F5F5;
        padding-left: 20px;
        padding-top: 15px;
        padding-bottom: 15px;
        .el-dialog__title {
          font-weight: bold;
          font-size: 20px;
        }
      }
      .el-dialog__body {
        display: flex;
        flex-direction: column;
        padding-right: 40px;
        overflow: scroll;
      }
    }

    #dialog-content {
      display: flex;
      flex-direction: row;
      height: 360px;
    }

    .shareText {
      color: #4B4B4B;
      margin-top: 20px;
      margin-left: 10px;
      font-size: 16px;
    }

    .save-cancel {
      position: absolute;
      width: 300px;
      bottom: 20px;
      left: 30%;
      display: flex;
      flex-direction: row;
    }

    .el-button--primary {
      width: 110px;
    }

    .avatar-uploader {
      margin-top: 10px;
      margin-left: 10px;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .avatar {
      width: 220px;
      height: 178px;
      display: block;
    }
    .input-layout {
      display: inline;
      margin-left: 10px;
      .input {
        display: inline-block;
        margin: 5px;
        width: 230px;
      }
      .el-input__inner {
        width: 100%;
        height: 30px;
      }
    }
    .input-layout-2 {
      display: inline;
      margin-top: 3px;
      margin-left: 10px;

      .title {
        display: inline;
        vertical-align: top;
      }
      .text-area {
        display: inline-block;
        margin: 5px;
        width: 230px;
        height: 90px;
      }
      .el-input__inner {
        width: 100%;
      }
    }

    #secondPart {
      padding-left: 30px;
      padding-bottom: 80px;
      display: flex;
      flex-direction: column;

    }
  }


</style>
