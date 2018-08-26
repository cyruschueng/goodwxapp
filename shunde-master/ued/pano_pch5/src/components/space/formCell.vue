<template>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item id="jump-tag" size="mini" label="跳转标记:">
        <el-input class="input" size="mini" placeholder="名称"></el-input>
      </el-form-item>
      <div id="jumpLabel">
        跳转网格
        <div class="gridBtn">
          <div class="gridLayout">网格坐标
            <img class="little_icon" src="/static/pen.png">
          </div>
        </div>
      </div>
      <el-form-item id="pano-jump" size="mini" label="跳转全景">
        <el-select class="input" size="mini" v-model="value" placeholder="全景类型">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.text"
                     :value="item.value" size="mini"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form" size="mini" label="位置">
        <div v-text="locationText">
        </div>
      </el-form-item>
      <el-form-item class="form" size="mini">
        <img class="icon" @click="deleteCell" src="/static/delete.png"/>
      </el-form-item>
    </el-form>
</template>
<script>
  export default{
    created () {
    },
    props: {
      itemData: Object,
      key: Number
    },
    data () {
      return {
        locationText: '',
        options: [
          {text: '高产粮田航拍', value: 'A'},
          {text: '公路航拍', value: 'B'},
          {text: '其他', value: 'C'}
        ],
        value: ''
      }
    },
    methods: {
      deleteCell () {
        this.$emit('deleteItemClick')
      }
    },
    mounted () {
    }
  }

</script>
<style scoped lang="scss" rel="stylesheet/scss">
  #cellContainer {
    width: 100%;
  }

  #jump-tag{
     padding-right: 10px;
  }
  #jumpLabel {
    margin-right: 15px;
    display: inline;
    font-size: 14px;
    color: #606266;
  }

  .gridBtn {
    display: inline-block;
    width: 100px;
    height: 28px;
    font-size: 12px;
    color: #c0c4cc;
    border: solid;
    border-width: 1px;
    border-radius: 2px;
    border-color: #dcdfe6;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    cursor: pointer;
  }
  .gridBtn:hover {
    display: inline-block;
    width: 80px;
    height: 28px;
    font-size: 12px;
    color: #c0c4cc;
    border: solid;
    border-width: 1px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    border-radius: 2px;
    cursor: pointer;
    border-color: #c0c4cc;
  }

  .gridLayout{
    display: flex;
    flex-direction: row;
  }

  #pano-jump{
    padding-right: 10px;
  }
  .input{
    .el-form-item__content{
      width: 300px;
    }
  }
  .btn {

  }

  .form {
    padding-right: 10px;
  }

  .input {
    width: 100px;
  }

  .gridBtn {
    width: 80px;
  }

  .icon {
    width: 25px;
  }
  .little_icon {
    width: 15px;
    height: 15px;
  }

</style>
