/** 
 * 皓月文件实时修改iframe区域高度
 * 测服地址：http://luna-test.visualbusiness.cn/luna-web/scripts/common/iframe.js
 * 线上地址：http://luna.visualbusiness.cn/luna-web/scripts/common/iframe.js
 */
try{
    top.location.hostname;
    } catch (err) {
     // != location){
    $(document).ready(function(){
        $("body").addClass("iframe-wrap");   
    });

    //引入皓月iframe文件
    document.addEventListener('DOMContentLoaded', function(){
        console.log(document.referrer);
        var iframe = document.createElement('iframe'), iframe2;
        iframe.height = "0";
        iframe.width = "0";
        iframe.style = "opacity: 0;border:none";
        var height = Math.max(document.documentElement.scrollHeight, document.body.clientHeight), oldHeight;
        if(/test\./.test(location.host)){ //测试环境
            iframe.src = "http://luna-test.visualbusiness.cn/luna-web/iframe.jsp#height=" + height;
            document.body.appendChild(iframe);
        } else { //线上环境
            if(window.location != window.parent.location && document.referrer){
                var host =  document.referrer.match("^http[s]?:\/\/([^\/]+).+")[1];
                if(/visualbusiness\.cn/.test(host)){
                    iframe.src = "http://luna.visualbusiness.cn/luna-web/iframe.jsp#height=" + height;
                    document.body.appendChild(iframe);
                } else if(/visualbusiness\.com/.test(host)){
                    iframe.src = "http://luna.visualbusiness.com/luna-web/iframe.jsp#height=" + height;
                    document.body.appendChild(iframe);
                }
            } else{
                iframe2 = iframe.cloneNode(true);
                iframe.src = "http://luna.visualbusiness.cn/luna-web/iframe.jsp#height=" + height;
                iframe2.src = "http://luna.visualbusiness.com/luna-web/iframe.jsp#height=" + height;
                document.body.appendChild(iframe);
                document.body.appendChild(iframe2);
            }
        }

        setInterval(function(){
            oldHeight = height;
            var children = document.body.childNodes, cur;
            height=0;
            for(var i = children.length - 1 ; i >= 0 ;i--){
                cur = (children[i].clientHeight || 0) + (children[i].offsetTop || 0);
                if(height < cur){
                    height = cur;
                }
            }

            if(height < 400){
                height = 400;
            }

            if(oldHeight !== height){
                iframe.src = iframe.src.replace(/height=(\d+)/, "height=" + height);
                if(iframe2){
                    iframe2.src = iframe2.src.replace(/height=(\d+)/, "height=" + height);
                }
            }
        }, 500);



        function resize(){
            iframe.src = iframe.src.replace(/height=(\d+)/, "height=" + 520);
            if(iframe2){
                iframe2.src = iframe2.src.replace(/height=(\d+)/, "height=" + 520);
            }
        }

        window.lunaIframe = {
            resize: resize
        };
    });
}
