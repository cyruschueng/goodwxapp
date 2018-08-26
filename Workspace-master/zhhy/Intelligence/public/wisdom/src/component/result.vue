<template>
	<div class="page-result">
    <template v-if="result === 'pass'">
      <div class="resultImg">
        <img :src="imgPass">
      </div>
      <div class="resultTips">恭喜你 , 审核通过</div>
    </template>
    <template v-if="result === 'fail'">
      <div class="resultImg">
        <img :src="imgFail">
      </div>
      <div class="resultTips">很抱歉 , 审核失败</div>
    </template>
    <template v-if="result === 'wait'">
      <div class="resultImg">
        <img :src="imgWait">
      </div>
      <div class="resultTips">审核中 , 请耐心等待</div>
    </template>
	</div>
</template>
<script>
export default {
  data (){
    var vm = this
    return {
      result: vm.$route.params.res,
      imgPass: config.picURL.pass,
      imgFail: config.picURL.fail,
      imgWait: config.picURL.wait
    }
  }
}
</script>

