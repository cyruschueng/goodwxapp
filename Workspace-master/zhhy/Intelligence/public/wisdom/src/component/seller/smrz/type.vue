<template>
  <div class="page-type">
    <topNav title="选择经营类型" showManu="0" manuType="type" v-on:save="save" v-on:back="back"></topNav>
    <div class="type-list">
      <div class="item flex-y-center" v-for="item in typeList">
        <span>{{item.ManageType}}</span>  
        <img :src="imgUnchose" @click="chose(item, $event)" style="display: block;"> 
        <img :src="imgChose" @click="unChose(item, $event)" style="display: none;">
      </div>
    </div>
  </div>
</template>

<script>
import topNav from '../../topNav.vue'

export default {
  components: { topNav },
  data () {
    return {
      typeList: [],
      imgChose: config.picURL.chose,
      imgUnchose: config.picURL.unchose,
      choseList:[],
      choseNames: [],
      userID: window.localStorage.getItem('zhhy_user_id')
    }
  },
  mounted () { 
    var vm = this
    commom.getDataList('ysh/GetManageList', {}, function(d){
      if(d.aaData && d.aaData.length > 0){
        vm.typeList = d.aaData
        for(var i = 0, l = vm.typeList.length; i < l; i++){
          vm.typeList[i].check = false
        }
      }
    })
  },
  methods: {
    chose: function(item, eve){
      var vm = this, has = 0
      for(var i = 0, l = vm.choseList.length; i < l; i++){
        if(vm.choseList[i] === item.Id){
          has = 1
        }          
      }
      if(has === 0){
        vm.choseList.push(item.Id)
        vm.choseNames.push(item.ManageType)
      }
      $(eve.target).hide()
      $(eve.target).siblings('img').show()
    },
    unChose: function(item, eve){
      var vm = this
      for(var i = 0, l = vm.choseList.length; i < l; i++){
        if(vm.choseList[i] === item.Id){
          vm.choseList.splice(i, 1)
          vm.choseNames.splice(i, 1)
        }          
      }
      $(eve.target).hide()
      $(eve.target).siblings('img').show()
    },
    save: function(){
      var vm = this
      ZHHY.saveType(vm)
    },
    back: function(){
      var vm = this
      this.$router.push({name: 'seller_smrz_index'})
    }
  }
}
</script>