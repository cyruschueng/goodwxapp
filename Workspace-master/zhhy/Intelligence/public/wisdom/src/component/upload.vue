<template>
  <div class="page-upload">
    <input type="file" id="uploadInputHid" name="uploadInputHid">
    <div id="showUploadImg"></div>
    <div class="buyerJyshBtns">
      <div class="okbtn fl">
            <span class="enter_btn" @click="upload">上传</span>
      </div>
      <div class="rejectBtn fl">
            <span class="enter_btn" @click="cancelUpload">取消</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      id: this.$route.params.id,
      fileurl:"",
    }
  },
  methods:{
    // 上传质检报告
    upload:function(){
      let vm = this
      let param = new Object;
      param.picUrl = vm.fileurl
      param.picType = 1 // 质检图片
      $.ajax({
        type:"POST",
        data:param,
        url: config.apiURL + "filepath",
        success: function(d){
          commom.getDataList('ysh/UpdateUserProductPicture',{
            ProductId: vm.id,
            PicId: d.insertId
          },function(d){
            // console.log(d)
            if(d.status==0){
              commom.msg('上传成功')
              setTimeout(function(){
                vm.$router.push({name: 'seller_twsm'})
              },1000)
            } else {
              commom.msg('上传失败')
            }
          })
        }
      })
    },
    // 取消上传
    cancelUpload: function(){
      this.$router.push({name: 'seller_twsm'})
    }
  },
  mounted () { 
    var vm = this
    $('#uploadInputHid').uploadifive({
      uploadScript: 'http://f.yshfresh.com/upload',
      buttonText:"选择文件",
      multi:false,
      'auto': true,
      'fileSizeLimit': '8MB',
      simUploadLimit:1,
      onUploadComplete : function(file, data) {
        var obj = jQuery.parseJSON(data);
        var html = '<div><img class="media-object" id="headImg" src="' + config.yshURL + obj.aaData[0].fileurl +'"></div>'; 
        $("#showUploadImg").css("display","block").html(html);
        // 上传完成删除上传进度条
        $(".complete").remove(); 
        $('.buyerJyshBtns').css("display","block");
        vm.fileurl = obj.aaData[0].fileurl
      }
    })
    commom.getDataList('ysh/GetProductInfo', {productId: vm.id}, function(d){
      if(d.aaData.length > 0 && d.aaData[0].PictureUrl){
        var proPic = d.aaData[0].PictureUrl
        vm.fileurl = config.yshURL + proPic
        console.log(vm.fileurl)
        var html = '<div><img class="media-object" id="headImg" src="' + vm.fileurl +'"></div>';
        $("#showUploadImg").css("display","block").html(html);
      }
    })
  }
}
</script>