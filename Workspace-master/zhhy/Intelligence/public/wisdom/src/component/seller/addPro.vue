<template>
  <div class="page-add">
    <div class="pro-list"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="1">
      <div class="item" v-for="(item, index) in proList">
        <div class="item-l">
          <div class="name text-center">
            {{item.ProductName}}
          </div>
          <div class="type text-center">
            {{item.ProductClass}}
          </div>
          <div class="price text-center">
            {{item.Price}}/{{item.Unit}}
          </div>
        </div>
        <div class="item-c">
          <input type="number" v-model="item.Amount"><span>
            {{item.Unit}}
          </span>
        </div>
        <div class="item-r">
          <img :src="removeImg" @click="remove(index)">
        </div>
      </div>
    </div>
    <div class="page-add-banner-btn">
      <button class="button" @click="save">保存商品</button>
    </div>
  </div>  
</template>

<script>
import { MessageBox } from 'mint-ui';

export default {
  components: {MessageBox},
  data() {
    return {
      loading: false,
      pageIndex: 0,
      removeImg: config.picURL.remove,
      proList: [],
      userID: window.localStorage.getItem('zhhy_user_id')
    }
  }, 
  mounted (){
    
  },
  methods: {
    loadMore: function(){
      var vm = this
      vm.loading = true
      setTimeout(function(){
        commom.getDataList("ysh/GetUserProducttplList",{
          User_id: vm.userID,
          pageindex: vm.pageIndex*6,
          pagesize: 6
        },function(d){
          if(d.aaData && d.aaData.length > 0){
            var data = d.aaData
            for(var i = 0, l = data.length; i < l; i++){
              vm.proList.push(data[i])
            }
            vm.loading = false
            vm.pageIndex++
          }
        })
      }, 500)
    },
    save: function(){
      var vm = this
      var list = vm.proList
      var i = 0
      if(list.length > 0){
        vm.addPro(i, list)
      }else{
        commom.msg('暂无商品')
      }      
    },
    addPro: function(i, list){
      var vm = this
      commom.getDataList('ysh/AddUserProduct', {
        MouldId: list[i].Id,
        user_id: vm.userID,
        Amount: list[i].Amount
      }, function(d){
        if(i < (list.length - 1)){
          i++
          vm.addPro(i, list)
        }else{
          vm.$router.push({name: 'seller_twsm'})
        }
      })
    },
    remove: function(index){
      var vm = this
      MessageBox.confirm('确定删除?')
      .then(function(){
        console.log(index)
        vm.proList.splice(index, 1)
      }, function(){})      
    }
  }
}
</script>
<style>

</style>