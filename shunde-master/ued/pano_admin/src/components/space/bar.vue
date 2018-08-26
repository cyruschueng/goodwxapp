<template>
  <div id="bar">
    <div class="content">
      <toggle text-before="网格"  text-after="漫游" @click="c" :flag="toggleFlag"></toggle>
      <el-button id="myNewPoi" v-show="generalUser" type="primary" style="position:absolute;right: 1%; width: 100px; height: 20px; font-size: 12px;line-height: 5px" @click="openDialog" plain class="new-poi-btn">新建POI</el-button>
    </div>
    <div class="popMask mask" v-show="popup.godownentry || popup.editpoi">
      <godownentry
        v-show="popup.godownentry"
        class="popupGodownentry transform-center"
        :editId="editPano_id"
        @save="updatePanoInfo"
        @save-and-entry="updatePanoInfoAndUpload"
        @close="closeGodownentry"/>
    </div>
  </div>
</template>
<script>
  import toggle from './toggle.vue'
  import godownentry from './newPoi'
  export default {
    components: {
      toggle,
      godownentry
    },
    methods: {
      c (flag) {
        this.toggleFlag = flag
        this.$router.push(this.toggleFlag ? '/pages/space' : '/pages/space/roam')
      },
      dealPath (path) {
        if (path.indexOf('roam') !== -1) {
          console.log('漫游')
          this.toggleFlag = false
        } else {
          console.log('网格')
          this.toggleFlag = true
        }
      },
      // 关闭
      closeGodownentry () {
        this.popup.godownentry = false
      },
      updatePanoInfoAndUpload (panoId) { // 修改入库单并入库
        this.updatePanoInfo(panoId)
        this.refresh()
      },
      updatePanoInfo (panoId) {
        for (let i in this.lists) {
          if (this.lists[i].panoId === panoId) {
            for (let j in this.lists[i]) {
              this.lists[i][j] = this.$store.state.panoInfos[panoId][j]
            }
            break
          }
        }
        this.editPano_id = ''
      },
      openDialog () {
        this.popup.godownentry = true
      }
    },
    data () {
      return {
        editPano_id: '',
        toggleFlag: true,
        popup: {
          godownentry: false
        }
      }
    },
    computed: {
      generalUser () {
        return this.$store.state.userInfo.generalUser
      }
    },
    created () {
      this.dealPath(this.$router.history.current.path)
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.dealPath(to.path)
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  #bar{
    background: #fff;
    flex:  0 0 auto;

    .content{
      width: 1200px;
      height: 50px;
      margin: 0 auto;
      background: #fff;
      display: flex;
      align-items: center;
    }
    .popMask{
      position: fixed;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 11;
    }
  }
</style>
