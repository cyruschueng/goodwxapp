<template>
	<div class="card">
		<div class="card-header">
			<icon :icon-class="iconName" icon-style="icon"></icon>
			<span>{{title}}</span>
		</div>
		<div class="card-body">
			<slot name="card_body"></slot>
		</div>
	</div>
</template>

<script>
import iconSvg from './icon-svg'
export default{
	components:{
		'icon':iconSvg
	},
	props:['title', 'iconName']
}
</script>

<style scoped>
.card{
	border: 1px solid #d1dbe5;
	border-radius: 4px;
	background-color: #fff;
	overflow: hidden;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
.card .card-header{
	padding: 10px 20px;
	border-bottom: 1px solid #d1dbe5;
	box-sizing: border-box;
}
.card .card-body{
	padding: 20px;
}
.icon{
	width: 20px;
	height: 20px;
	fill: #333;
	vertical-align: -0.25em;
	overflow: hidden;
	margin-right: 8px;
}
</style>