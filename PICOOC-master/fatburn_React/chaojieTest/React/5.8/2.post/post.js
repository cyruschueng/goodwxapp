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
 * 测试post类型的Ajax请求
 1. 创建一个xmlhttpRequest对象
 2. 设置回调监听
 3. 打开一个连接
 4. 设置请求头
 5. 发请求
 */

document.getElementById('btn').onclick = function () {
    var request = createRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            var result = request.responseText;
            console.log(result);
        }
    };
    request.open('POST', '/ajax/post');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send('userName=jingTian&age=18');
};