<template>
  <div class="goodsType-page">      
    <ul>
      <li v-for="d in typeList" @click="selectTypeId(d.Id)">{{d.ProductClass}}</li>
    </ul>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      typeList: []
    }
  },
  props: [ ],
  mounted (){
    
  },
  beforeMount: function(){
    this.Query();
  },
  methods: {
    // 获取分类列表
    Query: function(){
      let vm = this;
      commom.getDataList('ysh/GetProductClassList',{},function(d){
        if(d.aaData && d.aaData.length > 0){
          vm.typeList = d.aaData
        }
      })
    },
    // 选择分类
    selectTypeId: function(id){
      this.$router.push({name: 'spbj',query:{id:id}})
    }
  }
}
</script>
