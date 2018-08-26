<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wxpay001.aspx.cs" Inherits="SfSoft.web.App.Pay.wxpay001" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel="stylesheet" href="//cdn.bootcss.com/weui/1.1.1/style/weui.min.css">
    <link rel="stylesheet" href="//cdn.bootcss.com/jquery-weui/1.0.1/css/jquery-weui.min.css">
    <title>购买课程</title>
</head>
<body>
    <div class="weui-cells" style="margin-top: 0;">
        <a href="http://161s5g6007.51mypc.cn/app/appstart/microlecture/baseinfo.ashx?redirect_url=http://192.168.100.76/dist/guide?r=a=app001|h=start"  class="weui-cell" style="background: #f60; color: #fff;">
            <div class="weui-cell__hd">< </div>
            <div class="weui-cell__bd">
                <div style="padding: 0 10px;"><%= this.Info?.GoodName %></div>
            </div>
            <div class="weui-cell__ft"></div>
        </a>
    </div>
    <article class="weui-article">
        <h2 class="title"></h2>
        <img src="<%= this.Info?.ImgURL %>" />
        <section>
            <%= this.Info?.Desc %>
        </section>
    </article>

    <div style="position: fixed; bottom: 0; left: 0; width: 100%; background: #eee; padding: 0px 2px;">
        <div class="weui-flex">
            <div class="weui-flex__item" style="text-align: center;">
                <span style="padding-top: 0px; height: 45px; line-height: 45px; font-size: 16px; color: #f00;">价格:<%= string.Format("{0:c}",this.Info?.PublicPrice)  %></span>
            </div>
            <div>
                <span  id="btnPayPrivew" class="weui-btn  weui-btn_warn" style="width: 100%; border-radius: 0;">微信支付</span>
            </div>
        </div>
    </div>

    <div id="popupPayPrivew" class="weui-popup__container popup-bottom">
        <div class="weui-popup__overlay"></div>
        <div class="weui-popup__modal">
            <div class="weui-form-preview" style="font-size:16px;">
                <div class="weui-form-preview__hd">
                    <label class="weui-form-preview__label">付款金额</label>
                    <em class="weui-form-preview__value"><%= string.Format("{0:c}",this.Info?.PublicPrice)  %></em>
                </div>
                <div class="weui-form-preview__bd">
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">商品</label>
                        <span class="weui-form-preview__value"><%= this.Info?.GoodName %></span>
                    </div>
                </div>
                <div class="weui-form-preview__ft">
                    <button id="btnPay" type="button" class="weui-form-preview__btn weui-form-preview__btn_primary">立即支付</button>
                </div>
            </div>
        </div>
    </div>
    <script src="./Content/ThirdJs/jquery-1.10.2.min.js"></script>
    <script src="//cdn.bootcss.com/jquery/1.11.0/jquery.min.js"></script>
    <script src="//cdn.bootcss.com/jquery-weui/1.0.1/js/jquery-weui.min.js"></script>
    <script>
        $("#btnPayPrivew").click(function () {
            $("#popupPayPrivew").popup();
        })

        $("#btnPay").click(function () {
            $.ajax({
                url: 'http://161s5g6007.51mypc.cn/app/microlecture/userinfo/add',
                type: 'POST',
                dataType: 'JSON',
                contentType: 'application/json; charset=utf-8',
                data:JSON.stringify( { userid: '<%= this.userId  %>', relationid:1 }),
                success: function (res) {
                    console.log(res);
                    if (res.success == true) {
                        window.location.href = "http://161s5g6007.51mypc.cn/app/appstart/microlecture/baseinfo.ashx?redirect_url=http://192.168.100.76/dist/guide?r=a=app001|h=start"
                    }
                }, error: function (x) {
                    console.log(x);
                }
            })
        })
    </script>
</body>
</html>
