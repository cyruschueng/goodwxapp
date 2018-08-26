<template>
  <div class="compoptemplate compopup" @click.stop>
    <div class="compopup-header">
      <div>通用pop模板<div class="question"></div></div>
      <div class="el-icon-close cursor-pointer" @click="closePopup"/>
    </div>
    <div class="compopup-body">
      <div class="underLineText poiHeader">
        模块
      </div>
      <div class="compopup-items">
        <div class="compopup-item">
          <div class="compopup-item-text">itemName1：</div>
          <div class="compopup-item-textcell-box">
            <div class="compopup-item-textcell">item11</div>
          </div>
        </div>
      </div>
      <div class="compopup-items">
        <div class="compopup-item">
          <div class="compopup-item-text">itemName2：</div>
          <div class="compopup-item-textcell-box">
            <div class="compopup-item-textcell">item21</div>
            <div class="compopup-item-textcell">item22</div>
          </div>
        </div>
      </div>
      <div class="compopup-half-items">
        <div class="compopup-half-item">
          <div class="compopup-item">
            <div class="compopup-item-text"><div class="warn-text">左分：</div></div>
            <input class="compopup-item-flexText" />
          </div>
        </div>
        <div class="compopup-half-item">
          <div class="compopup-item">
            <div class="compopup-item-text"><div class="warn-text">右分：</div></div>
            <input class="compopup-item-flexText" placeholder="测试"/>
          </div>
        </div>
      </div>
      <div class="compopup-btns">
        <div class="compopup-btn-cancel" >取消</div>
        <div class="compopup-btn-sure" >开始上传</div>
        <div class="commonbtn" >保存</div>
        <div class="commonbtn commonbtn-disabled" >保存并入库</div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * <editableword class="name" :text="word" @text-change="log" @text-change-end="log"/>
 */
export default {
  name: 'compoptemplate',
  props: {},
  data () {
    return {}
  },
  methods: {
    closePopup () {
      this.$emit('popup-close')
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
  .compoptemplate{
    width: 500px;
    .compopup-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      >div{
        display: flex;
        align-items: center;
      }
      .question{
        margin-left: 8px
      }
    }
  }
</style>

