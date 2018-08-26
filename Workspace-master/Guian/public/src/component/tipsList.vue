<template>
  <div class="con1-left-top col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr pad-tb-2" style="padding-bottom: 6px;">
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="height: 100%">
      <div class="box-shadow-inset-radius clearfix" style="width: 100%;height: 100%;">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 no-padding-lr" style="height: 100%;padding-top: 3%;padding-bottom: 3%;">
          <img :src="tips[0].img" style="height: 100%;" class="center-block">
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 no-padding-lr" style="height: 100%;">
          <p class="txt-center p-box-t text-shadow-2 tips-item-num" style="width: 100%;height: 55%;color: #69c218;font-weight: 900;">
            <span class="c-text-t">{{tips[0].num}}</span>
          </p>
          <p class="txt-center p-box-b" style="width: 100%;height: 45%;"><span class="c-text-b text-shadow-2" style="font-weight: 900;">销售次数</span></p>
        </div>
      </div>
    </div>
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="height: 100%">
      <div class="box-shadow-inset-radius" style="width: 100%;height: 100%;">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 no-padding-lr" style="height: 100%;padding-top: 3%;padding-bottom: 3%;">
          <img :src="tips[1].img" style="height: 100%;" class="center-block">
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 no-padding-lr" style="height: 100%;">
          <p class="txt-center p-box-t text-shadow-2 tips-item-num" style="width: 100%;height: 55%;color: #4dabe9;font-weight: 900;">
            <span class="c-text-t">{{tips[1].num}}</span>
          </p>
          <p class="txt-center p-box-b" style="width: 100%;height: 45%;">
            <span class="c-text-b text-shadow-2" style="font-weight: 900;">追溯查询</span>
          </p>
        </div>
      </div>
    </div>
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="height: 100%">
      <div class="box-shadow-inset-radius" style="width: 100%;height: 100%;">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 no-padding-lr" style="height: 100%;padding-top: 3%;padding-bottom: 3%;">
          <img :src="tips[2].img" style="height: 100%;" class="center-block">
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 no-padding-lr" style="height: 100%;">
          <p class="txt-center p-box-t text-shadow-2 tips-item-num" style="width: 100%;height: 55%;color: #76af75;font-weight: 900;">
           <span class="c-text-t">{{tips[2].num}}</span>
          </p>
          <p class="txt-center p-box-b" style="width: 100%;height: 45%;"><span class="c-text-b text-shadow-2" style="font-weight: 900;">追溯企业</span></p>
        </div>
      </div>
    </div>
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="height: 100%">
      <div class="box-shadow-inset-radius" style="width: 100%;height: 100%;">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 no-padding-lr" style="height: 100%;padding-top: 3%;padding-bottom: 3%;">
          <img :src="tips[3].img" style="height: 100%;" class="center-block">
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 no-padding-lr" style="height: 100%;">
          <p class="txt-center p-box-t text-shadow-2 tips-item-num" style="width: 100%;height: 55%;color: #b9a134;font-weight: 900;">
            <span class="c-text-t">{{tips[3].num}}</span>
          </p>
          <p class="txt-center p-box-b" style="width: 100%;height: 45%;"><span class="c-text-b text-shadow-2" style="font-weight: 900;">追溯产品</span></p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: ['tips'],
}

</script>

<style>
.tips-item-num{
  font-size: 1rem;
}
</style>