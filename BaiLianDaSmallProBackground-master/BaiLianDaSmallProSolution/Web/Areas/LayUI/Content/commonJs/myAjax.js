layui.define(['jquery'], function (exports) {
    var $ = layui.jquery;


    var currentObj = {
        'test': function () {
            layer.msg('hello world');
        },
        //同步请求
        'postSyncReq': function (url,postData,successFn) {
            $.ajax({
                url: url,
                type: "POST",
                data: postData,
                dataType: 'JSON',
                async: false,
                success: function (res) {
                    if (successFn) {
                        successFn(res);
                    } else {
                        if (res.IsSuccess) {
                            layer.msg("操作完成", { icon: 1 });
                        } else {
                            if (res.ReturnMsg) {
                                layer.msg(res.ReturnMsg, { icon: 2 });
                            }
                        }
                    }
                },
                error: function (xhr, status, error) {
                    layer.msg('网络出现异常：原因为：' + JSON.stringify(xhr), { icon: 2 });
                }
            });
        },
        'postNoSyncReq': function (url, postData, successFn) {
            $.ajax({
                url: url,
                type: "POST",
                data: postData,
                dataType: 'JSON',
                async: true,
                success: function (res) {
                    if (successFn) {
                        successFn(res);
                    } else {
                        if (res.IsSuccess) {
                            layer.msg("操作完成", {icon:1});
                        } else {
                            if (res.ReturnMsg) {
                                layer.msg(res.ReturnMsg, { icon: 2 });
                            }
                        }
                    }
                },
                error: function (xhr, status, error) {
                    layer.msg('网络出现异常：原因为：' + JSON.stringify(xhr), { icon: 2 });
                }
            });
        },
        'dealResult': function (data,successFn,errorFn) {
            if (data.IsSuccess) {
                if (successFn) {
                    successFn();
                } else {
                    layer.msg(data.ReturnMsg, { icon: 1 });
                }
            } else {
                if (errorFn) {
                    errorFn();
                } else {
                    layer.msg(data.ReturnMsg, { icon: 2 });
                }
            }
        }
    };

    exports('myAjax', currentObj);
});