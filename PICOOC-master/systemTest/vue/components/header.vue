<template>
	<header class="header flex">
		<div class="header-li header-p1">有品管理后台</div>
	</header>
</template>
<style lang="less">
@import "../public.less";

.header{
	.border-bottom;
	line-height: 30px;
	background: #4A90E2;
	color: rgba(255,255,255,0.50);
	padding-top: 20px;
	padding-bottom: 10px;
	.active{
		color: #fff;
		.border-bottom(3px,#fff);
	}
}
.header-li{
	text-align: center;
	height: 30px;
	position: relative;
}
.header-p1{
	width: 200px;
	color: #fff;
	margin-right: 200px;
}
.header-p2{
	text-align: right;
	margin-right: 50px;
	color: rgba(255,255,255,0.50);
}
.header-p3{
	text-align: left;
	margin-left: 50px;
}

</style>
