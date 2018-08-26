<template>
  <transition name="el-zoom-in-top">
    <div class="tagselector" :class="{overHidden: hide}">
      <div class="tagsBox">
        <div class="tagsBoxMaxHeight" >
          <div class="tagsContainer">
            <div class="tagCell"
              v-for="tag in tags"
              v-text="tag.tagName"
              @click.stop="selectThis(tag)"
              :class="{choosedTag: selectedIds[tag.tagId]}"
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
  name: 'tagselector',
  created () {
    this.getTags()
    this.$utils.domOn(document, 'click', this.clickHandler)
  },
  props: {
    mutiple: false
  },
  data () {
    return {
      hide: true,
      selectedIds: {},
      scrollTop: 0,
      tags: []
    }
  },
  methods: {
    getTags () {
      this.$api.searchTag({
        searchName: ''
      }).then(res => {
        if (res.code === 0) {
          this.setTagsAddAll(res.data.list)
        }
      })
    },
    setTagsAddAll (tags = []) {
      tags.unshift({
        tagId: '*',
        tagName: '全部'
      })
      this.tags = tags
    },
    exchangeHide () {
      this.hide = !this.hide
      let el = this.$el.getElementsByClassName('tagsBoxMaxHeight')[0]
      el.scrollTop = 0
    },
    selectThis (tag) {
      if (tag && tag.tagId) {
        let id = tag.tagId + ''
        if (this.mutiple) { // 可选择多个
          this.$set(this.selectedIds, id, this.selectedIds[id] ? null : tag)
        } else {
          if (this.selectedIds[id]) {
            this.$set(this.selectedIds, id, null)
            delete this.selectedIds[id]
          } else {
            this.selectedIds = {}
            this.$set(this.selectedIds, id, tag)
          }
        }
      }
      this.$emit('change', this.selectedIds)
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
    .tagsBox{
      background:#fff;
      position: relative;
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

