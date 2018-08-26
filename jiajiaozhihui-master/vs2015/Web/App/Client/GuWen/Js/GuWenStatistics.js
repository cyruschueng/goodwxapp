$(function () {
    $("#btnAdd").on('click', function () {
        add();
    })

    function check() {
        return $("#form1").validate({
            debug: false,
            submitHandler: function (form) {
                form.submit();
            }, errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent());
            }, rules: {
                userName: {
                    required: true
                }, telephone: {
                    required: true,
                    mobile: true
                }, address: {
                    required: true
                }, quantity: {
                    required: true,
                    number: true,
                    max: 1000,
                    min: 1
                }
            }
        });
    }
    function add() {
        if (!check().form()) return;
        var userName = $("#userName").val();
        var telephone = $("#telephone").val();
        var address = $("#address").val();
        var quantity = $("#quantity").val();
        var remark = $("#remark").val();

        $.ajax({
            url: '../../Project/GuWen/Controller/GuWenStatistics.ashx',
            type: 'POST',
            dataType: 'text',
            beforeSend: function () {
                $(".cover").show();
            },
            complete: function () {
                $(".cover").hide();
            },
            data: { userName: userName, telephone: telephone, address: address, quantity: quantity, remark: remark },
            success: function (res) {
                if (res == 0) {
                    window.location.href = "error.html?r=0";
                } else if (res == 1) {
                    $("#userName").val("");
                    $("#telephone").val("");
                    $("#address").val("");
                    $("#quantity").val("");
                    $("#remark").val("");
                    window.location.href = "error.html?r=1";
                } else if (res == 2) {
                    window.location.href = "error.html?r=2";
                }
            }
        })
    }
})