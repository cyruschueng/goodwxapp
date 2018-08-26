<template>
	<div class="page-index"></div>
</template>
<script>
export default {
	mounted: function(){
    var vm = this
    ZHHY.index.checkRole(vm)
	}
}
</script>
