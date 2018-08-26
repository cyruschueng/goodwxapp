<template>
<div style="width: 100%;height: 100%;">
  <div style="width: 100%;height: 20%;" class="clearfix">
    <div class="table-title text-shadow-2" v-for="item in titlelist"><span class="table-title-txt">{{item}}</span></div>
  </div>
  <div id="scrollTable" style="height: 80%;width: 100%;">
    <div id="scrollitemList" style="width: 100%;">
      <div v-for="item in itemlist" class="scroll-item clearfix">
        <div><span>{{item.goodsname}}</span> </div>
        <div><span>{{item.creattime}}</span></div>
        <div><span>{{item.shiptime}}</span></div>
        <div><span>{{item.Isdetile}}</span></div>
        <div><span class="zs_searchBtn" @click="showPop(item.Id)">追溯查询</span></div>
      </div>         
    </div>
    <div style="width: 100%;">
      <div v-for="item in itemlist" class="scroll-item clearfix">
        <div><span>{{item.goodsname}}</span></div>
        <div><span>{{item.creattime}}</span></div>
        <div><span>{{item.shiptime}}</span></div>
        <div><span>{{item.Isdetile}}</span></div>
        <div><span class="zs_searchBtn" @click="showPop(item.Id)">追溯查询</span></div>
      </div>         
    </div>
    <div style="width: 100%;">
      <div v-for="item in itemlist" class="scroll-item clearfix">
        <div><span>{{item.goodsname}}</span></div>
        <div><span>{{item.creattime}}</span></div>
        <div><span>{{item.shiptime}}</span></div>
        <div><span>{{item.Isdetile}}</span></div>
        <div><span class="zs_searchBtn" @click="showPop(item.Id)">追溯查询</span></div>
      </div>         
    </div>
    <div style="width: 100%;">
      <div v-for="item in itemlist" class="scroll-item clearfix">
        <div><span>{{item.goodsname}}</span></div>
        <div><span>{{item.creattime}}</span></div>
        <div><span>{{item.shiptime}}</span></div>
        <div><span>{{item.Isdetile}}</span></div>
        <div><span class="zs_searchBtn" @click="showPop(item.Id)">追溯查询</span></div>
      </div>         
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      scroll: {}
    }
  },
  props: ['itemlist', 'titlelist'],
  mounted: function(){
    setmiddle([$('.table-title-txt')])
    var vm = this
    var scrollTable = document.getElementById("scrollTable");
    var scrollitemList = document.getElementById("scrollitemList");

    vm.scroll = setInterval(function(){
      Marquee(scrollTable, scrollitemList)
    }, 30);
    scrollTable.onmouseover = function() {
      clearInterval(vm.scroll)
    };
    scrollTable.onmouseout = function() {
      vm.scroll = setInterval(function(){
        Marquee(scrollTable, scrollitemList)
      }, 30);
    };
  },
  destroyed: function(){
    var vm = this
    clearInterval(vm.scroll)
  },
  methods: {
    showPop: function(id){
      this.$emit('showPop', id)
    }
  }
}

</script>

<style>
#scrollTable{width: 100%;overflow: hidden;position: relative;}
#scrollitemList{height: auto; text-align: left;width: 100%;}
#scrollTable li{list-style-type: none;text-align: left;line-height: 1.6rem;padding: 5px 0;width: 100%;box-sizing: border-box;}
.table-title, .scroll-item div{
  float: left;
  width: 20%;
  height: 100%;
  text-align: center;
}
.scroll-item{
  width: 100%;
  height: 1.6rem;
}
.table-title{
  color: #FFCC33;
  font-size: 0.8rem;
  font-weight: 900;
}
</style>