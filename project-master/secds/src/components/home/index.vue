<template>
	<div class="info-box">
		<el-row>
			<el-col :span="24">
				<card title="个人信息" icon-name="userinfo">
					<template slot="card_body">
						<user-info></user-info>
					</template>
				</card>
			</el-col>
		</el-row>
		<el-row style="margin-top:40px;">
			<el-col :span="24">
				<card title="用户手册" icon-name="manual">
					<template slot="card_body">
					<el-collapse accordion>
							<el-collapse-item title="票据查询" name="1">
								<h3 class="info-title">票据列表</h3>
								<div>显示当前用户拥有的全部票据</div>
								<h3 class="info-title">未用退回</h3>
								<div>在票据未被收款人签收前,出票人均可使用“未用退回”功能将票据撤销。若票据处于“提示承兑待签收”、“提示收票待签收”等待签收状态时，出票人须先将相关的申请撤销后，才能使用“未用退回”功能。</div>
							</el-collapse-item>
							<el-collapse-item title="出票申请" name="2">
								<h3 class="info-title">出票信息登记</h3>
								<div>通过该功能用户将票据要素在系统中完成登记，并从系统中取得票据号码。</div>
							</el-collapse-item>
							<el-collapse-item title="承兑业务" name="3">
								<h3 class="info-title">提示承兑申请</h3>
								<div>在成功进行出票信息登记后，才能进行提示承兑申请。票据必须在承兑后才能提交给收款人。</div>
								<h3 class="info-title">提示承兑处理查询及撤销</h3>
								<div>用户可以通过该功能了解“提示承兑申请”的操作结果，还可以了解承兑人对申请的处理情况。</div>
							</el-collapse-item>
							<el-collapse-item title="提示收票" name="4">
								<h3 class="info-title">提示收票申请</h3>
								<div>在票据被承兑后，用户可向收款人发出提示收票申请。该操作也是出票的最后一个操作，一旦收款人签收，票据的权利也发生转移。</div>
								<h3 class="info-title">提示收票处理查询及撤销</h3>
								<div>用户可以了解收款人对申请的处理情况。还可以对票据状态为“待签收”的票据进行撤消操作</div>
								<h3 class="info-title">提示收票签收</h3>
								<div>用户作为收款人，可以在出票人发出提示收票申请后，对该申请进行签收。用户若“签收”成功则取得该票据并成为票据权利人。若“驳回”申请，表示拒绝接受申请，如以后要再次接收票据须出票人重新发出提示收票申请。</div>
							</el-collapse-item>
							<el-collapse-item title="背书转让" name="5">
								<h3 class="info-title">背书转让申请</h3>
								<div>背书人向被背书人发出背书转让业务的申请。背书转让将使票据权利发生转移。</div>
								<h3 class="info-title">背书转让处理查询及撤销</h3>
								<div>通过该功能了解“背书转让申请”操作的结果。当“票据处理状态”为“对方已签收”时，表示背书转让成功。票据在背书转让申请后，在被背书人签收前，用户可以撤销背书转让申请。</div>
								<h3 class="info-title">背书转让签收</h3>
								<div>被背书人可以对背书人的提示背书转让申请进行签收。签收成功后，被背书人即取得票据，成为持票人。</div>
							</el-collapse-item>
							<el-collapse-item title="贴现申请" name="6">
								<h3 class="info-title">贴现申请</h3>
								<div>贴现申请目前只有买断式贴现申请,贴出人向贴入人发出贴现申请,贴出人贴出后，贴现交易即完成并结束。</div>
								<h3 class="info-title">贴现申请处理查询及撤销</h3>
								<div>在贴现申请中操作的记录均可通过“贴现申请查询”来了解。同时用户还可以通过该功能了解“贴现申请”操作的结果。当 “票据处理状态”为“对方已签收”时，表示贴现成功。票据在贴现申请后，在贴入人签收前，用户可以撤销贴现申请。</div>
							</el-collapse-item>
							<el-collapse-item title="付款申请" name="7">
								<h3 class="info-title">提示付款申请</h3>
								<div>持票人可向承兑人发出非逾期提示付款</div>
								<h3 class="info-title">提示付款处理查询及撤销</h3>
								<div>提示付款申请中操作的记录均可通过“提示付款处理查询及撤销”来了解。通过该功能了解“提示付款申请”操作的结果。当 “票据处理状态”为“对方已签收”时，表示提示付款业务成功。票据在提示付款申请后，在承兑人签收前，可以撤销提示付款申请。</div>
							</el-collapse-item>
							<el-collapse-item title="用户中心" name="8">
								<h3 class="info-title">生成练习数据</h3>
								<div>直接生成票据数据,如逾期付款,回头背书,不可转让等特殊票据</div>
								<h3 class="info-title">修改用户信息</h3>
								<div>修改密码,修改账户名称等</div>
							</el-collapse-item>
						</el-collapse>
					</template>
				</card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import userInfo from '../tmp/userinfo'
	import card from '../tmp/card'
	export default{
		components:{
			'user-info':userInfo,
			'card':card
		},
		mounted(){
			this.loginStatus()
		}
	}
</script>
