//import {ajax} from './ajax.js'
import {simplecheckPermission} from './permissions.js'
const upload = {
    methods: {
        //获取照片
        getPhotoAndUpload: function (success, error, quality) {

    var browser = {  
        versions: function() {  
            var u = navigator.userAgent, app = navigator.appVersion;  
            return {     //移动终端浏览器版本信息  
                trident: u.indexOf('Trident') > -1, //IE内核  
                presto: u.indexOf('Presto') > -1, //opera内核  
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器  
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器  
                iPad: u.indexOf('iPad') > -1, //是否iPad  
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
                };  
            } (),  
            language: (navigator.browserLanguage || navigator.language).toLowerCase()  
    }

        if(browser.versions.android == true){
            simplecheckPermission(cordova.plugins.diagnostic.runtimePermission.READ_EXTERNAL_STORAGE);
            simplecheckPermission(cordova.plugins.diagnostic.runtimePermission.WRITE_EXTERNAL_STORAGE);
        }


            var vm = this
            var _quality = typeof quality == "undefined" ? 50 : quality;
            var pictureSource;
            var destinationType;
            pictureSource = navigator.camera.PictureSourceType;
            destinationType = navigator.camera.DestinationType;
            //quality : 图像的质量，范围是[0,100]
            navigator.camera.getPicture(function (imageURI) {
                //获取照片成功
                vm.apiPost(vm.phost+'/Dls/base64_upload',{img:'data:image/jpg;base64,'+imageURI}).then((res) => {
                      // alert(res.token)
                     console.log(res);
                    if(res.code==200){
                        vm.$vux.loading.hide()
                        vm.$vux.toast.show({
                            text: '上传成功',
                        })
                        success(res)
                        
                    }else{
                        vm.$vux.toast.show({
                            text: res.msg,
                            type: "warn"
                        })
                    }
                })

            },
                function (error) {
                    console.log("照片获取失败！")
                },
                {
                    quality: _quality, destinationType: destinationType.DATA_URL, sourceType: pictureSource.PHOTOLIBRARY
                })
        },
    }
}
export default upload 