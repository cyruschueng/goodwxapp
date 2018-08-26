<template>
	<div id="index">
		<div id="header">
			<div class="title">农产品流通智慧合约</div>
			<div class="menu"></div>
		</div>
		<div id="logo">
			<div class="logoImg">
				<img src="../../lib/img/zhhy/logo.png">
			</div>
		</div>
		<div id="buyer">
			<span class="enter_btn" @click="toBuyer">我是买家</span>
		</div>
		<div id="seller">
			<span class="enter_btn" @click="toSeller">我是卖家</span>
		</div>
	</div>
</template>
<script>

export default {
  data () {
    return {
      
    }
  },
  components: {  },
  
  beforeCreate: function(){
    
  },
  mounted: function(){
    
  },
  methods: {
  	toBuyer: function(){
  		this.$router.push({name: 'buyer'})
  	},
  	toSeller: function(){
  		this.$router.push({name: 'seller'})
  	}
  }
}
</script>
<style type="text/css">
	#header{
		height: 1.3rem;
		background: #4bc2d1;
		text-align: center;
		color: #fff;
		position: relative;
	}
	#header .title{
		font-size: 0.36rem;
		line-height: 1.3rem;
	}
	#header .menu{
		width: 0.48rem;
		height: 0.48rem;
		position: absolute;
		right: 0.24rem;
		transform: translateY(-50%);
		top: 50%;
		background: url("../../lib/img/zhhy/menu.png");
		background-size: 100% 100%; 
	}

	#logo{
		margin-top: 0.39rem;
	}
	#logo img{
		width: 100%;
		height: 100%;
	}
	#seller{
		width: 3.23rem;
		margin: 0 auto 0.96rem auto;
	}
	#buyer{
		width: 3.23rem;
		margin: 0 auto 0.31rem;
	}
	.enter_btn{
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