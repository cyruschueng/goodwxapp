<template>
  <div id="poi-area">
    <div id="head">
      <div>
        <input type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox" :class="[labelClass,{'checked-label':checked}]">{{poiName}}</label>
        <i id="edit" class="el-icon-edit" v-show="generalUser" @click="editOnePoiClick"></i>
      </div>
      <i id="jiantou" :class="[jtClass,{'rotate': jtFlag}]" @click="jtc" v-if="views&&views.length>3"></i>
    </div>
    <div class="line"></div>
    <div class="cell-item-container">
        <poi-cell
          v-for="(item,index) in views"
          v-if="index<=2 || jtFlag"
          :index="index"
          :data="item"
          :panoId="item.panoId"
          @updateChecked="changeOneViewChecked"
          @edit-one-pano-click="editOnePanoClick"
          @delete-one-pano-click="deleteOnePanoClick">
        </poi-cell>
    </div>
  </div>
</template>
<script>
  import poiCell from './poiCell.vue'
//  jt指箭头图标
  export default {
    components: {poiCell},
    created () {
      console.log('poiArea created')
      this.poiName = this.data.name
      this.netRequest()
    },
    props: ['data', 'poiIndex', 'poiChecked', 'tag'],
    computed: {
      generalUser () {
        return this.$store.state.userInfo.generalUser
      },
      selfTag () {
        if (this.tag === null || this.tag === '全部' || this.tag === 0) {
          return ''
        }
        return this.tag
      }
    },
    data () {
      return {
        views: [],
        checked: this.poiChecked,
        poiName: 'poi名称',
        jtFlag: true,
        labelClass: 'label',
        jtClass: 'iconfont icon-jiantou',
        ss: false
      }
    },
    watch: {
      poiChecked (flag) {
        this.checked = flag
      },
      checked (flag) {
        console.log('ss = ' + this.ss + ', flag = ' + flag)
        if (this.ss && !flag) {
          return
        }
        let param = {
          poiIndex: this.poiIndex,
          poiId: this.data.id,
          viewIndexs: [],
          viewIds: [],
          flag: flag,
          target: 'poi',
          ss: this.ss
        }
        for (let i = 0; i < this.views.length; i++) {
          let view = this.views[i]
          this.$set(view, 'checked', flag)
          param.viewIndexs.push(i)
          param.viewIds.push(view.id)
        }

        this.$emit('poiCheck', param)
      },
      data () {
        if (!this.$utils.isEmpty(this.data)) {
          this.poiName = this.data.name
          this.netRequest()
        }
      },
      tag () {
        this.netRequest()
      }
    },
    methods: {
      netRequest () {
        console.log('netRequest=')
        console.log({
          poiId: this.data.id,
          tag: this.selfTag
        })
        this.$api.getPanoInfoListByPoi({
          poiId: this.data.id,
          tag: this.selfTag
        }).then(res => {
          console.log('该poi下的views成功获取')
          console.log(res.data)
          this.views = this.dealOriginData(res.data)
        }).catch(e => {
        })
      },
      dealOriginData (data) {
        for (let i = 0; i < data.length; i++) {
          this.$set(data[i], 'checked', this.poiChecked)
        }
        return data
      },
      jtc () {
        this.jtFlag = !this.jtFlag
        this.$emit('jiantouClick', this.jtFlag)
      },
      editOnePanoClick (panoData) {
        this.$emit('edit-one-pano-click', this.data, panoData)
      },
      deleteOnePanoClick (id) {
        this.$emit('delete-one-pano-click', id)
      },
      changeOneViewChecked (position, id, flag) {
        if (this.checked && !flag) {
          this.ss = true
          this.checked = false
        } else {
          this.ss = false
        }
        let param = {
          poiIndex: this.poiIndex,
          poiId: this.data.id,
          viewIndexs: [],
          viewIds: [],
          flag: flag,
          target: 'view',
          ss: this.ss
        }
        let view = this.views[position]
        this.$set(view, 'checked', flag)
        param.viewIndexs.push(position)
        param.viewIds.push(id)
        this.$emit('poiCheck', param)
      },
      editOnePoiClick () {
        this.$emit('edit-one-poi-click', this.data)
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/iconfont/spaceicon.css";
  @import "../../style/space";
  #poi-area{

    #head{
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      #edit{
        color: #aaa;
        cursor: pointer;
      }
      #edit:hover{
        color: #1bb1e6;
      }
      #jiantou{
        color: #555;
        cursor: pointer;
        font-size: 17px;
        transition: transform .6s;
        align-self: flex-end;
      }
      .label{
        color: #333;
        font-size: 14.5px;
      }
      .checked-label{
        color: $space-blue;
      }
      .rotate{
        transform: rotate(180deg);
      }
    }
  }
</style>
