/**
 * @description: 首页登录
 * @author: Franco
 * @update:
 */

require([
    'common/interface',
    'common/util',
    'common/errCode',
    'module/cookie',
    'module/checkForm'
], function (inter, util, errCode, cookie, check) {
        var page;
        var panoView;
        albumId = 'A23F2F3BC20047FB96E1A5863CEE1976';


        new com.appengine.App(document.getElementById("appContainer"),function(){
            page = new com.appengine.view.Page();
            panoView = new com.appengine.view.PanoView();
            panoView.setPanoId("4507AB24F3BE4571B2C9D596263EAAB5");
            page.addView(panoView);
            page.setWidth("850");
            
     
            panoView.onHeadingChangeCallback=function(){
                console.log("Heading",panoView.getHeading())
            };

            panoView.onPicthChangeCallback=function(){
                console.log("Picth",panoView.getPicth())
            };

            return page;

        });

    $(".savepic").on("click",function(){
    	var oCanvas = $("#appContainer canvas")[0];
    	// Canvas2Image.saveAsPNG(oCanvas, true, 200, 100);  //生成base64的图片

    	var oImgPNG = Canvas2Image.saveAsJPEG(oCanvas, true, 200, 100);  //生成png图片下载
        console.log(oImgPNG);

        file = oImgPNG;
        // console.log(oImgPNG["src"]);


        convertImgDataToBlob(oImgPNG["src"]);
        // convertBase64UrlToBlob(oImgPNG["src"]);
        var blob=null;

        function convertBase64UrlToBlob(urlData){  
              
            var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte  
              
            //处理异常,将ascii码小于0的转换为大于0  
            var ab = new ArrayBuffer(bytes.length);  
            var ia = new Uint8Array(ab);  
            for (var i = 0; i < bytes.length; i++) {  
                ia[i] = bytes.charCodeAt(i);  
            }  
            console.log(blob);
            return new blob( [ab] , {type : 'image/png'});  
        }  


        function convertImgDataToBlob(base64Data) {
            var format = "image/jpeg";
            var base64 = base64Data;
            var code = window.atob(base64.split(",")[1]);
            var aBuffer = new window.ArrayBuffer(code.length);
            var uBuffer = new window.Uint8Array(aBuffer);
            for(var i = 0; i < code.length; i++){
                uBuffer[i] = code.charCodeAt(i) & 0xff ;
            }
            console.info([aBuffer]);
            console.info(uBuffer);
            console.info(uBuffer.buffer);
            console.info(uBuffer.buffer==aBuffer); //true
            try{
                blob = new Blob([uBuffer], {type : format});
            }
            catch(e){
                window.BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;
                if(e.name == 'TypeError' && window.BlobBuilder){
                    var bb = new window.BlobBuilder();
                    bb.append(uBuffer.buffer);
                    blob = bb.getBlob("image/jpeg");

                }
                else if(e.name == "InvalidStateError"){
                    blob = new Blob([aBuffer], {type : format});
                }
                else{

                }
            }
            // alert(blob.size);
            console.log(blob);
            // blob["name"] = "pic_boss_jianming.jpg";
            fileName = 'h5-cover.png'
            console.log(blob);
            upload('/'+albumId+'/'+fileName, blob, function(url){
                url += '?' + parseInt(100*Math.random());
            })
            // return blob;
        };

        // path = "/A23F2F3BC20047FB96E1A5863CEE1976/h5-cover.png";
     



        // var oImgPNG = Canvas2Image.saveAsPNG(oCanvas, true)
    });
    
    



    function upload(path, file, callback) {
        util.setAjax(inter.getApiUrl().getSignature, {
            path: path
        }, function (json) {
            if (json.result != "0") {
                $.alert(json.msg);
            } else {
                uploadToQcloud(json.data,file, callback);
            }
        }, function () {
            alert('服务器繁忙，请稍后再试。');
        },"GET");
    }
    function uploadToQcloud(info,file,callback) {
        var url = 'http://web.file.myqcloud.com/files/v1/'+ info.appId  +'/'+ info.bucketName + info.path;
        var formData = null;
        if(window.FormData) {
            var formData = new FormData();
            formData.append('filecontent', file);
            formData.append('op','upload');
            formData.append('insertOnly','0');
        }
        $.ajax({
            type: 'post',
            url: url,
            headers: {
                "Authorization": info.signature
            },
            processData: false,
            contentType: false,
            data: formData,
            xhrFields: {
               withCredentials: false
            },
            success: function(data) {
                var data = $.parseJSON(data);
                if(data.code == 0 ) {
                    callback(medias_root + data.data.resource_path);
                } else {
                    alert(data.msg);
                }
            }
        });
    }

});