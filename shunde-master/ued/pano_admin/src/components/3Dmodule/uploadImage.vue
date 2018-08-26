<template>
  <div id="upload-container">
    <div id="box-border" @click="upload">
      <div v-if="!url" class="el-icon-plus"></div>
    </div>
    <img v-if="url" :src="url" class="photo"/>
  </div>
</template>
<script>
  export default {
    name: 'upload',
    model: {
      prop: 'imageUrl',
      event: 'changed'
    },
    props: {
      imageUrl: String
    },
    data () {
      return {
        url: this.imageUrl
      }
    },
    created () {
    },
    methods: {
      upload () {
        let input = this.createUploadInput()
        var self = this
        input.onchange = function (e) {
          let file = e.target.files[0]
          let date1 = new Date()
          date1 = Date.parse(date1)
          self.$api.uploadFileToCos(file, date1 + '.jpg', function (uploadUrl) {
            self.$message.success('上传成功')
            self.url = uploadUrl
            self.$emit('changed', self.url)
          })
        }
        input.click()
      },
      createUploadInput () {
        if (!this._upload) {
          this._upload = document.createElement('input')
          this._upload.setAttribute('type', 'file')
        }
        return this._upload
      }
    },
    watch: {
      imageUrl (value) {
        this.url = value
      }
    },
    computed: {},
    components: {}
  }
</script>
<style lang="scss">
  #upload-container {
    margin-top: 6px;
    width: 220px;
    height: 180px;
    position: relative;
    #box-border {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 178px;
      border: 2px dashed #d9d9d9;
      border-radius: 3px;
      position: absolute;
    }

    #box-border:hover {
      width: 100%;
      height: 100%;
      text-align: center;
      border: 2px dashed #579DF8;
      line-height: 178px;
      border-radius: 3px;
      position: absolute;
    }

    .el-icon-plus {
      font-size: 30px;
    }
    .photo {
      width: 100%;
      height: 100%;
      border-radius: 3px;
      z-index: 10;
    }
  }


</style>
