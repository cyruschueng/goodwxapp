<template>
  <transition name="el-zoom-in-top">
    <div id="tagseditor" class="compopup">
      <div class="compopup-header">
        <div>添加标签</div>
        <div class="el-icon-close cursor-pointer"  @click.stop="close"/>
      </div>
      <div class="compopup-body">
        <div class="tagseditorHeader">已选标签<div v-text="tagNumberText">(2/5)</div></div>
        <div class="tagseditorChoosedTags">
          <div class="tagsChooosedItem" v-for="tag in myTags">
            <div class="name" v-text="tag"></div>
            <div class="icon cursor-pointer el-icon-circle-close" @click.stop="disChooseTag(tag)"></div>
          </div>
        </div>
        <div class="tagseditorSearchAndAdd">
          <div class="tagseditorSearchBox">
            <input placeholder="搜索标签" v-model="serachText" class="tagseditorSearchInput" @keyup.enter.stop="searchTag(serachText)"/>
            <div class="tagseditorSearchIcon el-icon-search cursor-pointer" @click.stop="searchTag(serachText)"></div>
          </div>
          <div class="tagseditorAddBox">
            <input placeholder="新增标签" v-model="addText" class="tagseditorAddInput"  @keyup.enter.stop="addTag(addText)"/>
            <div class="tagseditorAddIcon el-icon-circle-plus cursor-pointer" @click.stop="addTag(addText)">
            </div>
          </div>
        </div>
        <div class="tagseditorContainer">
          <div class="tagsItem cursor-pointer"
            :class="{choosed: value}"
            v-for="(value, key) in tagsPool"
            v-text="key"
            @click.stop="chooseTag(key)" />
        </div>
        <div class="compopup-btns">
          <div class="commonbtn" @click.stop="save">完成</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
// import directionselect from '../../components/common/directionselect.vue'
/**
* 默认为新建poi  isEditPoi判断为编辑poi点
 */

export default {
  name: 'tagseditor',
  created () {
    this.tagNumberText = `(${this.myTags.length}/${this.$store.state.config.panoMaxTags})`
    this.$api.searchPanoTag({
      searchName: ''
    }).then(res => {
      if (res.code === 0) {
        this.updateTagPool(res.data.list)
      }
    })
  },
  props: {
    tags: null
  },
  data () {
    return {
      tagNumberText: '',
      serachText: '',
      addText: '',
      myTags: this.tags || [],
      tagsPool: {}// {name: choose}
    }
  },
  methods: {
    addTag (tagName) {
      if (!this.checkTagName(tagName)) return
      this.$api.createTag({
        tagName: tagName
      }).then(res => {
        if (res.code === 0) {
          this.searchTag(this.serachText)
        }
      })
    },
    disChooseTag (tagName) {
      if (!this.checkTagName(tagName)) return
      this.$emit('dis-choose-tag', tagName)
    },
    searchTag (tagName) {
      // if (!this.checkTagName(tagName)) return
      this.$api.searchPanoTag({
        searchName: tagName
      }).then(res => {
        if (res.code === 0) {
          this.updateTagPool(res.data.list)
        }
      })
    },
    updateTagPool (list = []) {
      this.tagsPool = {}
      for (let i in list) {
        this.$set(this.tagsPool, list[i].tagName, false)
      }
      this.updateTagsChoose()
    },
    chooseTag (tagName) {
      if (!this.tagsPool[tagName] && (this.myTags.length >= this.$store.state.config.panoMaxTags)) {
        this.$message(`全景的标签最大值为${this.$store.state.config.panoMaxTags}个`)
        return
      }
      if (this.tagsPool[tagName]) {
        this.disChooseTag(tagName)
      } else {
        this.$emit('choose-tag', tagName)
      }
    },
    checkTagName (tagName) {
      if (!tagName) {
        this.$message('请输入标签名')
        return false
      }
      return true
    },
    updateTagsChoose () {
      for (let i in this.tagsPool) {
        this.tagsPool[i] = false
        for (let j in this.myTags) {
          if (this.myTags[j] === i) {
            this.tagsPool[i] = true
            break
          }
        }
      }
    },
    close () {
      this.$emit('close')
    },
    save () {
      this.$emit('save')
    }
  },
  watch: {
    tags () {
      this.myTags = this.tags
      this.updateTagsChoose()
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
  $colord3: #d3d3d3;
  $color6f: #6f6f6f;
  $color1b: #1bb1e6;
  $color4d: #4db0e1;
  $color9b: #9b9b9b;
  $colorde: #dedede;
  $colord3: #f8f8f8;

  #tagseditor{
    width: 400px;
    .compopup-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      >div{
        display: flex;
        align-items: center;
      }
    }
    .compopup-body>div{
      display:flex;
      flex-wrap: wrap;
    }
    .tagseditorHeader{
      margin:15px 0;
    }
    .tagseditorChoosedTags{
      // min-height:20px;
      padding:10px 0;
      display:flex;
      flex-wrap:wrap;
    }
    .tagseditorSearchAndAdd{
      display: flex;
      justify-content:space-between;
      font-size:12px;
      .tagseditorSearchBox,.tagseditorAddBox{
        height:20px;
        border:1px solid $colorde;
        display: flex;
        align-items: center;
        border-radius:10px;
        overflow: hidden;
        position: relative;
      }
      .tagseditorSearchInput{
        padding: 0 10px;
        flex:1;
        width:120px;
      }
      .tagseditorSearchIcon{
        font-size:18px;
        color:$color9b;
        margin-right:2px;
      }
      .tagseditorAddInput{
        margin: 0 24px 0 10px;
        flex:1;
        width:80px;
      }
      .tagseditorAddIcon{
        font-size:24px;
        color:$color9b;
        position: absolute;
        right:-3px;
      }
    }
    .tagseditorContainer{
      display: flex;
      flex-wrap:wrap;
      align-items: baseline;
      align-content: baseline;
      height:120px;
      border:1px solid $colorde;
      background:$colord3;
      border-radius:4px;
      margin:15px 0 10px;
      overflow: auto;
      padding:10px;
      // .tagseditorContainerInnter{
      //   display:flex;
      //   flex-wrap: wrap;
      // }
    }
    .tagsChooosedItem{
      background: $color1b;
      color:#fff;
      position:relative;
      margin:0 12px 8px 0px;
      border-radius:2px;
      user-select: none;
      .name{
        font-size:12px;
        padding:2px 8px;
      }
      .icon{
        position:absolute;
        right:-6px;
        top:-6px;
        color:$color9b;
      }
    }
    .tagsItem{
      border:1px solid $colorde;
      padding:2px 8px;
      border-radius:2px;
      margin:0 12px 8px 0px;
      font-size:12px;
      user-select: none;
      color:$color9b;
    }
    .tagsItem.choosed{
      border-color:$color1b;
    }
  }
</style>

