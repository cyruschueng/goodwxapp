<template>
	<aside class="throw">
		<div class="throw_top">投放策略</div>
		<div class="throw_title">*投放范围</div>
		<div class="throw_type1">
			<input type="radio" class="throw_input1 throw_input1_1" name="throwRange" value="0" checked="checked" /><span>所有用户</span>
		</div>
		<div class="throw_type1">
			<input type="radio" class="throw_input1 throw_input1_2" name="throwRange" value="1" /><span>用户范围</span>
		</div>
		<div class="throw_card1">
			<div class="throw_card1_type1">
				<div class="throw_card1_title">性别</div>
				<input type="radio" class="throw_card1_sex" id="throw_card1_sex1" name="throwSex" value="1" /><span>男</span>
				<input type="radio" class="throw_card1_sex" id="throw_card1_sex2" name="throwSex" value="0" /><span>女</span>
				<div class="throw_card1_title2">年龄范围</div>
				<input class="throw_card1_age" type="throwAge" /><span>--</span>
				<input class="throw_card1_age" type="throwAge" />
			</div>
			<div class="throw_card1_type2">
				<div class="throw_card1_title">身体类型</div>
				<div class="throw_card1_type2_bodyType">
					<input type="checkbox" class="throw_card1_body_type"  name="throwFat" value="1" /><span>隐性胖/隐性肥胖</span>
				</div>
				<div class="throw_card1_type2_bodyType">
					<input type="checkbox" class="throw_card1_body_type throw_card1_body_type2"  name="throwFat" value="2" /><span>偏胖型/肥胖型</span>
				</div>
				<div class="throw_card1_type2_bodyType">
					<input type="checkbox" class="throw_card1_body_type throw_card1_body_type2" name="throwFat" value="3" /><span>肌肉型偏胖/运动型偏胖</span>
				</div>
				<div class="throw_card1_type2_bodyType">
					<input type="checkbox" class="throw_card1_body_type throw_card1_body_type2"  name="throwFat" value="4" /><span>缺乏锻炼型</span>
				</div>
				<div class="throw_card1_type2_bodyType">
					<input type="checkbox" class="throw_card1_body_type throw_card1_body_type2"  name="throwFat" value="5" /><span>标准型</span>
				</div>
				<div class="throw_card1_type2_bodyType">
					<input type="checkbox" class="throw_card1_body_type throw_card1_body_type2"  name="throwFat" value="6" /><span>标准肌肉型/标准运动型</span>
				</div>
				<div class="throw_card1_type2_bodyType">
					<input type="checkbox" class="throw_card1_body_type throw_card1_body_type2"  name="throwFat" value="7" /><span>偏瘦型/消瘦型</span>
				</div>
				<div class="throw_card1_type2_bodyType">
					<input type="checkbox" class="throw_card1_body_type throw_card1_body_type2"  name="throwFat" value="8" /><span>偏瘦运动型/偏瘦肌肉型</span>
				</div>
				<div class="throw_card1_type2_bodyType">
					<input type="checkbox" class="throw_card1_body_type throw_card1_body_type2"  name="throwFat" value="9" /><span>肌肉发达型/运动健美型/肌肉型</span>
				</div>
				<div class="throw_card1_title2" @click="getThrowIn">体重范围</div>
				<input class="throw_card1_weight" type="throwWeight" /><span>--</span>
				<input class="throw_card1_weight" type="throwWeight" />
			</div>
		</div>
	</aside>
</template>
<script>
export default {
	props:["conditions"],
	created:function(){
		window.getThrowIn=this.getThrowIn;
	},
	watch:{
		conditions:function(){
			if(this.conditions.id==0){
				$(".throw_input1").eq(0).attr("checked","checked");
			}
			else{
				if(this.conditions.id!=null){
					$(".throw_input1").eq(1).attr("checked","checked");
				}
				if(this.conditions.gender!=null){
					if(this.conditions.gender==1){
						$(".throw_card1_sex").eq(0).attr("checked","checked");
					}
					else if(this.conditions.gender==0){
						$(".throw_card1_sex").eq(1).attr("checked","checked");
					}
				}
				if(this.conditions.bodyType!=null){
					let throw_bodyType=[];
					throw_bodyType=this.conditions.bodyType.split(",");
					for(let i=0,len=throw_bodyType.length;i<len;i++){
						$(".throw_card1_body_type").eq(throw_bodyType[i]-1).attr("checked","checked");
					}
				}
				if(this.conditions.age!=null){
					let throw_age=[];
					throw_age=this.conditions.age.split("~");
					$(".throw_card1_age").eq(0).val(throw_age[0]);
					$(".throw_card1_age").eq(1).val(throw_age[1]);
				}
				if(this.conditions.weight!=null){
					let throw_weight=[];
					throw_weight=this.conditions.weight.split("~");
					$(".throw_card1_weight").eq(0).val(throw_weight[0]);
					$(".throw_card1_weight").eq(1).val(throw_weight[1]);
				}
			}
		}
	},
	methods:{
		getThrowIn:function(){
			let conditionsData={};
			//alert($("input[name='throwRange']:checked").val());
			if($(".throw input[name='throwRange']:checked").val()==0){
				conditionsData.id=0;
			}
			else{
				conditionsData.gender=[];
				$(".throw_card1_sex").each(function(){
					if($(this).is(":checked")){
						conditionsData.gender.push($(this).val());
					}
				});
				conditionsData.gender=conditionsData.gender.toString();
				console.log(conditionsData);
				if($(".throw_card1_age").eq(0).val()!="" && $(".throw_card1_age").eq(1).val()!=""){
					conditionsData.age=$(".throw_card1_age").eq(0).val().toString()+'~'+$(".throw_card1_age").eq(1).val().toString();
				}
				else if(($(".throw_card1_age").eq(0).val()!="" && $(".throw_card1_age").eq(1).val()=="") || ($(".throw_card1_age").eq(0).val()=="" && $(".throw_card1_age").eq(1).val()!="")){
					alert("年龄范围要么不填，要么全部都填,只填一个，年龄默认为空！");
					//return true;
				}
				conditionsData.bodyType=[];
				$(".throw_card1_body_type").each(function(){
					if($(this).is(":checked")){
						//let programsItem={"id":$(this).val()};
						conditionsData.bodyType.push($(this).val());
					}
				});
				conditionsData.bodyType=conditionsData.bodyType.toString();
				if($(".throw_card1_weight").eq(0).val()!="" && $(".throw_card1_weight").eq(1).val()!=""){
					conditionsData.weight=$(".throw_card1_weight").eq(0).val().toString()+'~'+$(".throw_card1_weight").eq(1).val().toString();
				}
			}
			return conditionsData;
		}
	},
}
</script>
<style lang="less">
@import "../../../public.less";
.throw{
	.throw_top{
		margin-top: 25px;
	}
	.throw_title{
		margin-top: 25px;
		margin-bottom: 15px;
	}
	.throw_type1{
		margin: 15px 0;
	}
	.throw_input1{
		width: 14px;
		height: 14px;
		margin: 0 8px 0 0;
	}
	.throw_card1{
		.flex;
		//width: 378px;
		padding: 10px 14px;
		background: #FFFFFF;
		.border(1px,#C1C7D2);
		.border-radius(2px);
	}
	.throw_card1_type1{
		.flex-grow
	}
	.throw_card1_title{
		margin-bottom: 10px;
	}
	.throw_card1_sex{
		margin: 0 8px 0 0;
	}
	#throw_card1_sex2{
		margin-left: 40px;
	}
	.throw_card1_title2{
		margin: 20px 0 10px;
	}
	.throw_card1_age{
		width: 50px;
		height: 20px;
		line-height: 20px;
		padding-left: 5px;
		.border(1px,#CBD0D9);
	}
	.throw_card1_type2{
		.flex-grow(1);
	}
	.throw_card1_type2_bodyType{
		display: inline-block;
		width: 230px;
	}
	.throw_card1_body_type{
		margin: 0 8px 0 0;
	}
	.throw_card1_body_type2{
	}
	.throw_card1_weight{
		width: 50px;
		height: 20px;
		line-height: 20px;
		padding-left: 5px;
		.border(1px,#CBD0D9);
	}
	
	
}

</style>