<template>
  <div class="editpoi compopup" @click.stop :class="{editPoi: isEditPoi}">
    <div class="compopup-header">
      <div>修改入库单<div class="question"></div></div>
      <div class="el-icon-close cursor-pointer" @click="close"/>
    </div>
    <div class="compopup-body">
      <div class="underLineText">
        Poi信息
      </div>
      <div class="compopup-half-items">
        <div class="compopup-half-item">
          <div class="compopup-items">
            <div class="compopup-item">
              <div class="compopup-item-text" >
                  <div :class="{warnText: isCreatePoi}">Poi名称：</div>
              </div>
              <input class="compopup-item-flexText poiName" placeholder="请输入Poi名称"
                v-bind:readonly="isEditPoi" v-model="poiInfo.name"/>
            </div>
            <div class="compopup-item">
              <div class="compopup-item-text">
                <div :class="{warnText: isCreatePoi}" >网格号： </div>
              </div>
              <div>网格选择插件</div>
            </div>
          </div>
        </div>
        <div class="compopup-half-item">
        </div>
      </div>
      <div class="compopup-items">
        <div class="editPoiCoordinate">
          <div class="compopup-item">
            <div class="compopup-item-text" >
              <div :class="{warnText: isCreatePoi}">经纬度：</div>
            </div>
            <div class="compopup-item-textcell-box">
              <div class="compopup-item-textcell">高德</div>
              <input class="compopup-item-textcell" placeholder="经度" title="经度"/>
              <input class="compopup-item-textcell" placeholder="纬度" title="纬度"/>
            </div>
          </div>
          <div class="coordinate">
            <a >坐标拾取器</a>
          </div>
        </div>
        <div class="compopup-item">
          <div class="compopup-item-text" />
          <div class="compopup-item-textcell-box">
            <input class="compopup-item-textcell" placeholder="广东省" title="省"/>
            <input class="compopup-item-textcell" placeholder="佛山市" title="市"/>
            <input class="compopup-item-textcell" placeholder="顺德区" title="县"/>
            <input class="compopup-item-textcell" placeholder="大良区" title="县"/>
          </div>
        </div>
      </div>
      <div class="underLineText">
        属性信息
      </div>
      <div class="compopup-half-items">
        <div class="compopup-half-item">
          <div class="compopup-half-item directionSelectBox">
            <div class="compopup-item-text"><div class="warn-text">朝向：</div></div>
            <directionselect  class="directionSelect"/>
            <div class="questionBox">
              <div class="question"></div>
            </div>
          </div>
        </div>
        <div class="compopup-half-item">
          <div class="compopup-items">
            <div class="compopup-item">
              <div class="compopup-item-text"><div class="warn-text">拍摄方式：</div></div>
              <input class="compopup-item-flexText" />
            </div>
            <div class="compopup-item">
              <div class="compopup-item-text"><div class="warn-text">拍摄高度：</div></div>
              <input class="compopup-item-flexText" />
            </div>
            <div class="compopup-item">
              <div class="compopup-item-text"><div class="warn-text">拍摄人员：</div></div>
              <input class="compopup-item-flexText" />
            </div>
            <div class="compopup-item">
              <div class="compopup-item-text"><div class="warn-text">拍摄日期：</div></div>
              <input class="compopup-item-flexText" placeholder="选择时间"/>
            </div>
          </div>
        </div>
      </div>
      <div class="compopup-btns bottom-btns">
        <div class="compopup-btn-cancel"  @click="close">取消</div>
        <div class="commonbtn commonbtn-disabled"  @click="save">保存</div>
      </div>
    </div>
  </div>
</template>
<script>
import directionselect from '../../components/common/directionselect.vue'
/**
* 默认为新建poi  isEditPoi判断为编辑poi点
 */

export default {
  name: 'editpoi',
  props: {
    poiId: null
  },
  data () {
    return {
      isEditPoi: false,
      id: this.poiId,
      poiInfo: {}
    }
  },
  methods: {
    isCreatePoi () {
      return !this.isEditPoi
    },
    save () {
      this.$emit('save')
    },
    close () {
      this.$emit('close')
    }
  },
  watch: {
    poiId (newValue) {
      console.log(newValue)
    },
    id (newValue) {
      console.log(newValue)
    }
  },
  components: {
    directionselect
  }
}
</script>

<style lang="scss" scoped>
  $colord3: #d3d3d3;
  $color6f: #6f6f6f;
  $color1b: #1bb1e6;

  .editpoi{
    width: 600px;
    input{
      outline: none;
      background: none;
    }
    a{
      color:$color1b;
      font-size:0.8em;
      border-bottom:1px solid $color1b;
      cursor: pointer;
    }
    .question{
      margin-left: 8px;
    }
    .compopup-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      &>div{
        display: flex;
        align-items: center;
      }
    }
    .directionSelectBox{
      display: flex;
      .directionSelect{
        margin-top: 4px;
      }
      .questionBox{
        height: 30px;
        margin-top: 4px;
        display: flex;
        align-items: center;
      }
    }
    .editPoiCoordinate{
      display: flex;
      justify-content: space-between;
    }
    .coordinate{
      display: flex;
      align-items: center;
    }
    .bottom-btns{
      margin-top: 16px;
    }
    // 是否为新建poi
    &.editPoi{
      .poiName{
        border: none;
        user-select: none;
      }
    }
  }
</style>

