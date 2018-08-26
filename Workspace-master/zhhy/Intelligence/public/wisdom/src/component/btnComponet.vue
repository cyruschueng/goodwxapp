<template>
  <div class="btnstyle">      
    <span class="enter_btn" @click="go">{{btnTitle}}</span>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: ['btnTitle','linkTo'],
  mounted (){
    
  },
  methods: {
    go: function(){
      this.$emit('go')
    }
  }
}

</script>

<style type="text/css">
	.btnstyle{
		width: 3.23rem;
		margin: 0 auto;
	}
	.btnstyle span.enter_btn{
		display: inline-block;
		background: #4fc4d3;
		line-height: 0.85rem;
		width: 3.23rem;
		text-align: center;
		border-radius: 0.425rem;
		color: #fff;
		font-size: 0.43rem;
	}
</style>