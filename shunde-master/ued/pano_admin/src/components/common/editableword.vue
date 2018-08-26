<template>
  <div class="editableword" @click.stop :class="{disabled: disabled}">
    <div class="editableword-text-box line-ellipsis" :class="{editting: editting}">
      <input v-if="editting" class="editableword-input" v-model="mytext" @keyup.enter.stop="toEdit"/>
      <div v-else class="editableword-text line-ellipsis">
        <div class="line-ellipsis user-select-none">{{mytext}}</div>
      </div>
    </div>
    <div class="editableword-edit-box cursor-pointer"  @click="toEdit">
      <div v-if="editting" class="el-icon-check"></div>
      <div v-else class="editing el-icon-edit"></div>
    </div>
  </div>
</template>
<script>
/**
 * <editableword class="name" :text="word" @text-change="log" @text-change-end="log"/>
 */
export default {
  name: 'editableword',
  created () {
    this.$utils.domOn(document, 'click', this.clickHandler)
  },
  props: {
    text: null,
    disabled: false
  },
  data () {
    return {
      mytext: this.text,
      editting: false
    }
  },
  methods: {
    toEdit () {
      if (this.disabled) {
        return
      }
      this.editting = !this.editting
      if (this.mytext !== this.text) {
        this.$emit('text-change-end', this.mytext)
      }
    },
    clickHandler (e) {
      if (this.editting) {
        this.toEdit()
      }
    }
  },
  watch: {
    mytext (newValue) {
      if (this.mytext !== this.text) {
        this.$emit('text-change', newValue)
      }
    },
    text (newValue) {
      if (this.mytext !== newValue) {
        this.mytext = newValue
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  $colord3: #d3d3d3;
  $color6f: #6f6f6f;
  $color1b: #1bb1e6;

  .editableword{
    display: flex;
    align-items: stretch;
    min-height: 20px;
    .editableword-text-box{
      flex: 1;
      position: relative;
      .editableword-text, .editableword-input{
        position: absolute;
        width: 100%;
        left: 0;
        top:0;
        height:100%;
      }
      .editableword-text{
        display: flex;
        align-items: center;
      }
      .editableword-input{
        width: 90%;
        margin-left:4px;
        outline: none;
      }
      &.editting{
        border:1px solid $color6f;
        box-shadow: 0 0 2px 0px rgba(0,0,0,0.5);
      }
    }
    .editableword-edit-box{
      width: 20px;
      color: $colord3;
      margin-left: 8px;
      position: relative;
      display: flex;
      align-items: center;
      &:hover{
        color: $color1b;
      }
    }
    &.disabled .editableword-edit-box{
      opacity: 0;
    }
  }
</style>

