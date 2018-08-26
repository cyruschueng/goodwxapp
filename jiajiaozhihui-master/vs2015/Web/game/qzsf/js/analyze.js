(function ($) {
    var analyze = {
        pageIndex: 1,
        pageSize: 10,
        groupTitle:[],
        existGroup:function(key){
            var code= $.inArray(key,this.groupTitle);
            if(code==-1){
                this.groupTitle.push(key);
                return false;
            }else{
                return true;
            }
        },
        setPageIndex: function () {
            if (sessionStorage["pageindex"] == null) {
                this.pageIndex = 1;
            } else {
                var index = parseInt(sessionStorage["pageindex"]);
                this.pageIndex = index + 1;
                sessionStorage["pageindex"] = this.pageIndex;
            }
        },
        getData: function () {
            var $this = this;
            $.ajax({
                url: './server/analyze.ashx',
                type: 'POST',
                dataType: 'JSON',
                data: { pageindex: $this.pageIndex },
                beforeSend: function () {
                    toast.show();
                    $this.setPageIndex();
                },
                complete: function () {
                    toast.hide();
                },
                success: function (data) {
                    $this.showData(data);
                }
            });
        },
        showData:function(data){
            this.show2016Data(data);
            this.show2015Data(data);
        },
        show2016Data: function (data) {
            for(var week=4;week>0;week--){
                if(!$.isEmptyObject(data)){
                    var json=data.ds;
                    for(var row=0;row<json.lenght;row++){
                        if(json[row].Year==2016 && json[row].Week==week){
                            
                        }
                    }
                }else{
                    
                }
            }
        },
        show2015Data: function (data) {
            var $this=this;
            $.each(data.ds,function(index,context){
                    $this.initData(context);
                });
        },
        initData:function(context){
            var html='';
            if(!$.isEmptyObject(data)){
                html+='<a href="javascript:void(0);" class="weui_media_box weui_media_appmsg">';
                html+='     <div class="weui_media_hd">'
                html+='         <img class="weui_media_appmsg_thumb" src="'+context.ImgUrl+'" alt="">';
                html+='     </div>';
                html+='     <div class="weui_media_bd">';
                html+='         <h4 class="weui_media_title">标题一</h4>';
                html+='         <p class="weui_media_desc">'+context.Resume+'</p>';
                html+='     </div">';
                html+='</a>';
            }else{
                html+='<a href="javascript:void(0);" class="weui_media_box weui_media_appmsg">';
                html+='     <div class="weui_media_hd">'
                html+='         <img class="weui_media_appmsg_thumb"  alt="">';
                html+='     </div>';
                html+='     <div class="weui_media_bd">';
                html+='         <h4 class="weui_media_title"></h4>';
                html+='         <p class="weui_media_desc">未上传作品</p>';
                html+='     </div">';
                html+='</a>';
            }
            return html;
        },
        next: function () {
            var $this = this;
            $this.getData();
        }
    };
    /*数据加载*/
    var toast = {
        that: $('#loadingToast'),
        defaultContent: "数据加载中",
        hide: function () {
            this.that.hide();
        },
        show: function (msg) {
            if (msg == '') {
                msg = this.defaultContent;
            }
            var $content = this.that.find('.weui_toast_content');
            $content.html(msg);
            this.that.show();
        }
    };
    analyze.getData();
    $(document).on('click', '#next', function () {
        analyze.next();
    });
})()



<a href="javascript:void(0);" class="weui_media_box weui_media_appmsg">
                        <div class="weui_media_hd">
                            <img class="weui_media_appmsg_thumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==" alt="">
                        </div>
                        <div class="weui_media_bd">
                            <h4 class="weui_media_title">标题一</h4>
                            <p class="weui_media_desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
                        </div>
                    </a>