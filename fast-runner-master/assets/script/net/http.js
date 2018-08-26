var http = cc.Class({
    extends: cc.Object,

    request : function(remoteUrl, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", encodeURI(remoteUrl), true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) {
                    callback(JSON.parse(xhr.responseText));
                } else {
                    cc.warn('http | request failed status: ' + xhr.status);
                    cc.warn('http | request failed url: ' + remoteUrl);
                }
            }
        };
        xhr.send();
    },
});

module.exports = new http();