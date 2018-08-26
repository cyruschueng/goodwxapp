<template>
	<div class="dialog">
		<el-row>
			<el-col :span="24">
				<el-dialog title="提示" :visible.sync="myVisible" width="30%">
					<span>这是一段信息</span>
					<span slot="footer" class="dialog-footer">
						<el-button @click="isVisible">取 消</el-button>
						<el-button type="primary" @click="isVisible">确 定</el-button>
					</span>
				</el-dialog>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: 'dialog',
	props: ['visible'],
	data() {
		return {
			myVisible: this.visible
		}
	},
	watch: {
		visible(val) {
			this.myVisible = val
		},
		myVisible(val) {
			this.$emit('visialChange', val)
		}
	},
	methods: {
		isVisible() {
			this.$emit('isVisible')
		}
	}
}
</script>