function createRequest(){
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

/**
 * 测试get类型的Ajax请求
 1. 创建一个xmlhttpRequest对象
 2. 设置回调监听
 3. 打开一个连接
 4. 发请求
 * @type {Element}
 */

var btn = document.getElementById('btn');
btn.addEventListener('click', function(){
    var request = createRequest();
    request.onreadystatechange = function(){
        if((request.readyState == 4) && (request.status == 200)){
            var result = request.responseText;
            console.log(result);
        }
    };
    //request.open('GET', 'https://j020d4ksuc.execute-api.us-west-2.amazonaws.com/boxbear/videoprom/guajiang');
    request.open('GET', '/get/ajax?superStar=liuyifei');
    request.send();
}, false);