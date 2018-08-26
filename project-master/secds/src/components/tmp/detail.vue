<template>
	<div class="detail">
		<h3>电子银行承兑汇票</h3>
		<ul>
			<li>出票日期：<span>{{draftdata.draft_start_date}}</span></li>
			<li>票据状态：
				<span v-if="draftdata.draft_status==010004">出票已登记</span>
				<span v-else-if="draftdata.draft_status==020001">提示承兑待签收</span>
				<span v-else-if="draftdata.draft_status==020006">提示承兑已签收</span>
				<span v-else-if="draftdata.draft_status==030001">提示收票待签收</span>
				<span v-else-if="draftdata.draft_status==030006">提示收票已签收</span>
				<span v-else-if="draftdata.draft_status==000002">票据已作废</span>
				<span v-else-if="draftdata.draft_status==100001">背书待签收</span>
				<span v-else-if="draftdata.draft_status==100006">背书已签收</span>
				<span v-else-if="draftdata.draft_status==110101">买断式贴现待签收</span>
				<span v-else-if="draftdata.draft_status==110106">买断式贴现已签收</span>
				<span v-else-if="draftdata.draft_status==200001">提示付款待签收</span>
				<span v-if>提示付款已签收待清算</span>
			</li>
			<li>到期日期：<span>{{draftdata.draft_end_date}}</span></li>
			<li>票据号码：<span>{{draftdata.draft_id}}</span></li>
		</ul>
		<table width="100%" border="1" cellspacing="0" cellpadding="0" class="draft">
			<tbody>
				<tr>
					<td rowspan="3" align="center" valign="middle" width="30">出<br/>票<br/>人</td>
					<td align="center" width="80">全 称</td>
					<td width="240"><span class="pan">{{draftdata.drawer_name}}</span></td>
					<td rowspan="3" align="center" valign="middle" width="30">收<br/>款<br/>人</td>
					<td align="center" width="80">全 称</td>
					<td width="240"><span class="pan">{{draftdata.payee_name}}</span></td>
				</tr>
				<tr>
					<td align="center">账 号</td>
					<td><span class="pan">{{draftdata.drawer_account}}</span></td>
					<td align="center">账 号</td>
					<td><span class="pan">{{draftdata.payee_account}}</span></td>
				</tr>
				<tr>
					<td align="center">开户银行</td>
					<td><span class="pan">{{draftdata.drawer_bank_name}}</span></td>
					<td align="center">开户银行</td>
					<td><span class="pan">{{draftdata.payee_bank_name}}</span></td>
				</tr>
				<tr>
					<td align="center" colspan="2">出票保证信息</td>
					<td colspan="4">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tbody>
								<tr>
									<td><span>保证人名称：</span></td>
									<td>&nbsp;</td>
									<td>保证人地址：</td>
									<td>&nbsp;</td>
									<td>保证日期：</td>
									<td>&nbsp;</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
				<tr>
					<td colspan="2" align="center">票据金额</td>
					<td colspan="2"><span class="pan">人民币<br/>（大写）</span>  <span>{{chineseSpecify}}</span></td>
					<td colspan="3" style="border:none; padding:0px;">
						<table width="100%" cellpadding="0" cellspacing="0">
							<tbody>
								<tr>
									<td align="center" class="draftc">&nbsp; &nbsp;</td>
									<td align="center" class="draftc">十</td>
									<td align="center" class="draftc">亿</td>
									<td align="center" class="draftc">千</td>
									<td align="center" class="draftc">百</td>
									<td align="center" class="draftc">十</td>
									<td align="center" class="draftc">万</td>
									<td align="center" class="draftc">千</td>
									<td align="center" class="draftc">百</td>
									<td align="center" class="draftc">十</td>
									<td align="center" class="draftc">元</td>
									<td align="center" class="draftc">角</td>
									<td align="center" class="draftc" style="border-right:0;">分</td>
								</tr>
								<tr>
									<td align="center" class="draftb">{{value[10]}}</td>
									<td align="center" class="draftb">{{value[9]}}</td>
									<td align="center" class="draftb">{{value[8]}}</td>
									<td align="center" class="draftb">{{value[7]}}</td>
									<td align="center" class="draftb">{{value[6]}}</td>
									<td align="center" class="draftb">{{value[5]}}</td>
									<td align="center" class="draftb">{{value[4]}}</td>
									<td align="center" class="draftb">{{value[3]}}</td>
									<td align="center" class="draftb">{{value[2]}}</td>
									<td align="center" class="draftb">{{value[1]}}</td>
									<td align="center" class="draftb">{{value[0]}}</td>
									<td align="center" class="draftb">0</td>
									<td align="center" class="draftb" style="border-right:0;">0</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
				<tr>
					<td rowspan="2" colspan="2" align="center">承兑人信息</td>
					<td rowspan="2" colspan="2" align="left">
						<div class="pan">全称：<span> {{draftdata.payer_name}}</span></div>
						<div class="pan">账号：<span> {{draftdata.payer_account}}</span></div>
					</td>
					<td align="center">开户行行号</td>
					<td><span class="pan">{{draftdata.payer_bank_account}}</span></td>
				</tr>
				<tr>
					<td align="center">开户行名称</td>
					<td><span class="pan">{{draftdata.payer_bank_name}}</span></td>
				</tr>
				<tr>
					<td colspan="2" align="center">交易合同号</td>
					<td>&nbsp;</td>
					<td rowspan="2" align="center">承<br/>兑<br/>信<br/>息</td>
					<td colspan="2"><span class="pan">{{seller}}</span></td>
				</tr>
				<tr>
					<td colspan="2" align="center">能否转让</td>
					<td>
						<span class="pan" v-if="draftdata.draft_restrictive==1">不可转让</span>
						<span class="pan" v-else>可转让</span>
					</td>
					<td colspan="2" align="left" >
						<span class="pan">{{buyer}}</span>
						<template>
							<p v-if="draftdata.acceptance_date==null"></p>
							<p v-else style="margin-top:2px;" class="pan">承兑日期：{{draftdata.acceptance_date}}</p>
						</template>
					</td>
				</tr>
				<tr>
					<td align="center" colspan="2">承兑保证信息</td>
					<td colspan="4">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tbody>
								<tr>
									<td><span class="pan">保证人名称：</span></td>
									<td>&nbsp;</td>
									<td>保证人地址：</td>
									<td>&nbsp;</td>
									<td>保证日期：</td>
									<td>&nbsp;</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
				<tr>
					<td colspan="2" align="center"><span style="padding:10px">评级信息(由出票人，承兑人自己记载，仅供参考)</span></td>
					<td colspan="4">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tbody>
								<tr>
									<td><span class="pan">出票人</span></td>
									<td>评级主体：</td>
									<td>&nbsp;</td>
									<td>信用等级：</td>
									<td>&nbsp;</td>
									<td>评级到期日</td>
									<td>&nbsp;</td>
								</tr>
								<tr>
									<td><span class="pan">承兑人</span></td>
									<td>评级主体：</td>
									<td>&nbsp;</td>
									<td>信用等级：</td>
									<td>&nbsp;</td>
									<td>评级到期日</td>
									<td>&nbsp;</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
		<table width="100%" border="1" cellspacing="0" cellpadding="0" style="margin-top:15px;" v-for="item in draftdata.endorsements" class="draft">
			<tr>
				<td align="center" colspan="2"><h3>背书</h3></td>
			</tr>
			<tr>
				<td  width="20%" class="pan">背书人名称</td>
				<td><span class="pan">{{item.endorser_name}}</span></td>
			</tr>
			<tr>
				<td class="pan">被背书人名称</td>
				<td><span class="pan">{{item.endorsee_name}}</span></td>
			</tr>
			<tr>
				<td class="pan">不得转让标识</td>
				<td><span class="pan">{{item.endorse_restrictive==0?'可转让':'不可转让'}}</span></td>
			</tr>
			<tr>
				<td class="pan">背书日期</td>
				<td><span class="pan">{{item.endorsement_date}}</span></td>
			</tr>
		</table>
	</div>
</template>

<script>
import capital from '../../assets/js/capital' //人民币大写
export default{
	name:'detail',
	props:[''],
	data(){
		return{
			
		}
	},
	computed:{
		draftdata(){
			return this.$store.state.draftdata
		},
		value(){
			let value=this.draftdata.draft_value+''
			let split=value.split('')
			split.unshift('￥')
			split.reverse()
			return split
		},
		chineseSpecify(){
			return capital(this.draftdata.draft_value)
		},
		seller(){
			let status=this.draftdata.draft_status
			let seller
			if (status=='010004') {
				seller=''
			} else if (status=='020001') {
				seller='出票人承诺：本汇票请予以承兑，到期无条件付款'
			} else {
				seller='出票人承诺：本汇票请予以承兑，到期无条件付款'
			}
			return seller
		},
		buyer(){
			let status=this.draftdata.draft_status
			let buyer
			if (status=='010004') {
				buyer=''
			} else if (status=='020001') {
				buyer=''
			} else {
				buyer='承兑人承诺：本汇票已经承兑，到期无条件付款'
			}
			return buyer
		},
	}
}
</script>

<style scoped>
p{
	padding: 0;
	margin: 0;
}
.detail{
	background-image: url(../../assets/images/bg.jpg);
	padding: 30px 20px;
}
.detail h3{
	text-align: center;
}
.detail ul{
	margin-top: 14px;
	display: flex;
	flex-flow: row wrap;
}
.detail ul li{
	width: 50%;
	margin-bottom: 10px;
}
table.draft{border:solid 1px #95b8e7;border-collapse: collapse;}
table.draft td{border:solid 1px #95b8e7; height:30px}
table.draft table td{border: none;}
table.draft table td.draftc{border-right:solid 1px #95b8e7; border-bottom:solid 1px #95b8e7;}
table.draft table td.draftb{border-right:solid 1px #95b8e7;}
.pan{padding-left:10px;}
</style>