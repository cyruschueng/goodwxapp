   <template>
	<div class="page-jylb">
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="1" style="padding-bottom: 2rem;">
			<div class="dealList">
				<ul>
					<li v-for="item in goodList" @click="toJyxqPage(item.OrderNumber)">
						<div class="left fl">
							<span>{{item.ProductName}}</span>
							<span style="color: #b8b8b8">{{item.OrderNumber}}</span>
						</div>
						<div class="right fr">
							<span>{{item.FromMarket}}—{{item.ToMarket}}</span>
							<span>{{item.orderdate}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>				
	</div>
</template>

<script type="text/javascript">
	import  btn from '../../component/btnComponet.vue'
	import  topNav from '../../component/topNav.vue'

	export default {
	  	data () {
	    	return {
	    		loading: false,
	    		pageIndex: 0,
	      		goodList: [],
	      		userID: window.localStorage.getItem('zhhy_user_id')
	    	}
	  	},
	  	
	  	components: { btn,topNav },

	  	methods: {
		  	toJyxqPage: function(oderId){
		  		this.$router.push({name: 'seller_jyxq',query:{ordnumber: oderId}})
		  	},
		  	loadMore: function(){
		  		var vm = this
      			vm.loading = true
      			setTimeout(function(){
      				commom.getDataList('ysh/GetOrderList',{
      					User_id: vm.userID,
      					pageindex: vm.pageIndex*6,
      					pagesize: 6
      				},function(d){
      					if(d.aaData && d.aaData.length > 0){
      						for(let v of d.aaData){
				    			if(v.orderdate==null){
				    				v.orderdate="暂无"
				    			}
				    			vm.goodList.push(v)
				    		}
				    		vm.loading = false
		            		vm.pageIndex++
      					} else {
      						$('.page-jylb').html('<p>还没有交易列表~~</p>')
      					}		    		
			    	})
      			}, 500)		  		
		  	}
	  	},
	  	mounted (){
	  	
	  	}
	}
</script>
