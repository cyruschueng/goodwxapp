<template>
  <transition name="el-zoom-in-top">
    <div class="tagselector" :class="{overHidden: hide}">
      <div class="tagsBox-1">
        <div class="tagsBoxMaxHeight" >
          <div class="tagsContainer">
            <div class="tagCell"
              v-for="tag in tags"
              v-text="tag"
              @click.stop="selectThis(tag)"
              :class="{choosedTag: tag == selectTags}"
              ></div>
          </div>
        </div>
        <div>
          <div class="tagIconBox tagCell hidden"></div>
          <div class="tagIconBox tagIconBoxActive tagCell"
            :class="{active: hide}"
            @click.stop="exchangeHide">
            <div class="el-icon-arrow-right"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'tagSelector',
  created () {
    this.$utils.domOn(document, 'click', this.clickHandler)
  },
  props: {
    mutiple: false,
    lists: null
  },
  watch: {
    lists () {
      this.getTags()
    }
  },
  data () {
    return {
      hide: true,
      selectTags: {},
      scrollTop: 0,
      tags: []
    }
  },
  methods: {
    getTags () {
      var myList = []
      for (var i = 0; i < this.lists.length; i++) {
        myList.push(this.lists[i].key)
      }
      this.setTagsAddAll(myList)
    },
    setTagsAddAll (list) {
      this.tags = []
      this.tags.push('全部')
      for (var i = 0; i < list.length; i++) {
        this.tags.push(list[i])
      }
    },
    exchangeHide () {
      this.hide = !this.hide
      let el = this.$el.getElementsByClassName('tagsBoxMaxHeight')[0]
      el.scrollTop = 0
    },
    selectThis (tag) {
      if (tag) {
        let name = tag + ''
        this.selectTags = name
      }
      this.$emit('change', this.selectTags)
    },
    clickHandler () {
      this.hide = true
    }
  }
}
</script>

<style lang="scss">
  $color1b: #1bb1e6;
  $colorb9: #b9b9b9;
  $height: 20px;
  .tagselector{
    font-size: 12px;
    height: $height;
    color: $colorb9;
    box-sizing: border-box;
    position:relative;
    .tagsBox-1{
      background: #ffffff;
      position: relative;
      z-index: 10;
      display: flex;
    }
    .tagsBoxMaxHeight{
      max-height:300px;
      overflow-y: auto;
    }
    .tagsContainer{
      display:inline-block;
      flex-flow: row wrap;
      width: 320px;
      padding:0 4px 8px 8px;
      text-align: left;
      .tagCell{
        margin-right: 10px;
        margin-bottom: 8px;
        &:hover, &.choosedTag{
          background: $color1b;
          color: #fff;
          border-color:transparent;
        }
      }
    }
    .tagCell{
      padding:0px 6px;
      border-radius:3px;
      border:1px solid $colorb9;
      height: $height;
      user-select: none;
      cursor: pointer;
      display:inline-block
    }
    .tagIconBoxActive{
      position: absolute;
      top:0;
      right:0;
      font-size:14px;
      display: flex;
      align-items: center;
      justify-content: center;
      &>div{
        transform-origin: 50% 50%;
        transition: transform 200ms;
      }
      &.active{
        &>div{
          transform: rotate(90deg)
        }
      }
    }
    .tagIconBox{
      width: $height;
      height: $height;
      margin-right:5px;
    }
    .hidden{
      visibility: hidden;;
    }
    &.overHidden{
      overflow: hidden;
    }
  }
</style>

