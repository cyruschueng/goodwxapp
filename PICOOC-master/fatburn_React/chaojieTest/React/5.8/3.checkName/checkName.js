function createRequest (){
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else{
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    return xmlhttp;
}

var userName = document.getElementById('userName');
userName.onblur = function(){
    var request = createRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            var result = request.responseText;
            document.getElementById("warning").innerHTML = result;
        }
    };
    var checkName = userName.value;
    request.open('GET', '/ajax/checkName?checkName=' + checkName);
    request.send();
};