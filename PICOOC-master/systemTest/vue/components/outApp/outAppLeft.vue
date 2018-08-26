<template>
	<section class="left">
		<router-link :to="{name:'outAppArticleIndex'}" class="left_item"><span class="">我的文章</span></router-link>
		<!--<router-link :to="{name:'outAppNoticeIndex'}" class="left_item"><span class={(msgRed || true)?'leftHasMsg':''}>通知中心</span></router-link>-->
		<router-link :to="{name:'outAppNoticeIndex'}" class="left_item"><span  v-bind:class="[(msgRed || noticeRed) ? 'leftHasMsg' : '']">通知中心</span></router-link>
	</section>
</template>
<script>
    export default{
        props:["msgRed", "noticeRed"],
        mounted:function(){
        },
        watch:{
            msgRed:function(){
//                alert(this.msgRed);
            },
            noticeRed:function(){
//                alert(this.noticeRed);
            }


        },
    }
</script>
<style lang="less">
@import "../../public.less";
.left{
	width: 105/@rem;
	margin-right: 9/@rem;
	.left_item{
		display: inline-block;
		width: 100%;
		text-align: center;
		font-size: 8/@rem;
		color: #444;
		height: 25/@rem;
		line-height:25/@rem;
		border-left: 1px solid #444444;
		border-right: 1px solid #444444;
		border-top: 1px solid #444444;
        .leftHasMsg{
            padding: 0 4/@rem;
            background: url("https://cdn2.picooc.com/web/res/system/images/redPoint.png") no-repeat right 6/@rem;
        }
	}
	.left_item:last-child{
		border-bottom: 1px solid #444444;
	}
	.router-link-active{
		color: #fff;
		background-color: #444;
	}
}
</style>
