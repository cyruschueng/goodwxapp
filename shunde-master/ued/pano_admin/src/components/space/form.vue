<template>
  <div id="container" direction="vertical">
    <div id="container2" direction="horizontal">
      <a id="title" v-text="componentName">
      </a>
      <el-button id="dragBtn" v-show="generalUser" type="primary" v-on:click="dragEnable" size="small">{{dragBtnText}}</el-button>
    </div>
    <div class="container-parent">
      <div class="cellContainer">
        <form-cell v-for="(content , index) in contents" :itemData="content"
                   v-show="isDragging" :num="index" :key="content"
                   v-dragging="{ item: content, list: contents, group: 'content'}"
                   @watchpano="watchItem(index)"></form-cell>

      </div>

      <div class="cellContainer">
        <form-cell v-for="(content , index) in contents" :itemData="content"
                   v-show="!isDragging" :num="index"
                   @watchpano="watchItem(index)"></form-cell>

      </div>
    </div>

    <div id="bottom" v-show="isShowBottom">
      <el-button id="saveBtn" :plain="true" v-show="generalUser" type="primary" v-on:click="save" size="small">保存
      </el-button>
    </div>

  </div>

</template>
<script>
  import FormCell from './newFormCell.vue'
  export default{
    components: {
      FormCell
    },
    props: {
      isShowBottom: Boolean,
      contents: Array
    },
    data () {
      return {
        componentName: 'poi信息',
        isDragging: false,
        dragBtnText: '拖拽排序'
      }
    },
    watch: {},
    created () {
    },
    computed: {
      generalUser () {
        return this.$store.state.userInfo.generalUser
      }
    },
    mounted () {
    },
    methods: {
      dragEnable () {
        this.isDragging = !this.isDragging
        this.dragBtnText = this.isDragging ? '取消拖拽' : '拖拽排序'
      },
      watchItem (index) {
        this.$emit('watchpano', index)
      },
      save () {
        let poiIds = ''
        for (var i = 0; i < this.contents.length; i++) {
          let poiId = this.contents[i].poi.id
          if (i === this.contents.length - 1) {
            poiIds += poiId
          } else {
            poiIds += poiId + ','
          }
        }
        this.$emit('resort', poiIds)
      }
    }
  }

</script>
<style scoped lang="scss" rel="stylesheet/scss">
  #container {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    /*overflow: hidden;*/
  }

  .mt20 {

  }

  #container2 {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center; /*垂直居中*/
    justify-content: space-between;
  }

  #title {
    flex: 0 0 auto;
    margin-left: 15px;
    width: auto;
    font-size: 16px;
    color: #343434
  }

  #dragBtn {
    round: true;
    margin-right: 20px;
  }

  #saveBtn {
    width: 100px;
    margin-right: 20px;
  }

  #watchBtn {
    width: 100px;
    margin-right: 20px;
  }

  .container-parent {
    margin-top: 20px;
    width: 100%;
    position: relative;
    .cellContainer {
      padding-left: 10px;
    }
  }

  #line {
    width: 100%;
    height: 1px;
    background: #dedede;
    margin-bottom: 10px;
    overflow: hidden;
  }

  #bottom {
    padding-top: 20px;
    padding-bottom: 20px;
    width: auto;
    margin: 0 auto;
  }

</style>
