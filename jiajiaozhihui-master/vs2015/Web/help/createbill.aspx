<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="createbill.aspx.cs" Inherits="SfSoft.web.help.createbill" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>填加订单</title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <style>
        .error{ color:#f00}
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class=" container">
            <div class="row">
                <div class=" col-xs-12">
                    <div class=" page-header h3">手动填加订单</div>
                </div>
                <div class=" col-xs-12">
                    <div class=" form-group">
                        <label for="txtName">订购人</label>
                        <asp:TextBox ID="txtName"  CssClass=" form-control" name="txtName"   placeholder="订购人" runat="server"></asp:TextBox>
                    </div>
                    <div class=" form-group">
                        <label for="txtPhone">手机号码</label>
                        <asp:TextBox ID="txtPhone"  CssClass=" form-control" name="txtPhone" TextMode="Phone"   placeholder="手机号码" runat="server"></asp:TextBox>
                    </div>
                    <div class=" form-group">
                        <label for="ddlProvince">省</label>
                        <asp:DropDownList ID="ddlProvince" CssClass=" form-control" 
                            AutoPostBack="true"  name="ddlProvince"  runat="server" 
                            onselectedindexchanged="ddlProvince_SelectedIndexChanged">
                                <asp:ListItem Text="----选择省分----" Value=""></asp:ListItem>
                            </asp:DropDownList>
                    </div>
                    <div class=" form-group">
                        <label for="ddlCity">市</label>
                        <asp:DropDownList ID="ddlCity" CssClass=" form-control" name="ddlCity"  runat="server">
                            <asp:ListItem Text="----选择城市----" Value=""></asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class=" form-group">
                        <label for="txtAddress">详细地址</label>
                        <asp:TextBox ID="txtAddress"  TextMode="MultiLine" Rows=3  name="txtAddress" CssClass=" form-control"   placeholder="详细地址" runat="server"></asp:TextBox>
                    </div>
                    <div class=" form-group">
                        <label for="txtTradeno">支付订单号</label>
                        <asp:TextBox ID="txtTradeno"   name="txtTradeno" CssClass=" form-control"   placeholder="支付订单号" runat="server"></asp:TextBox>
                    </div>
                    <div class=" form-group">
                        <asp:RadioButtonList ID="cblPay" RepeatDirection="Horizontal" runat="server">
                            <asp:ListItem Text="已支付" Value="1" Selected="True"></asp:ListItem>
                            <asp:ListItem Text="未支付"  Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                    </div> 
                </div>
                <div class=" col-xs-12">
                    <div id="ordermsg" runat="server"></div>
                </div>
                <div class=" col-xs-12">
                    <asp:Button CssClass=" btn btn-info" ID="btnNew" Text="填加新单" runat="server" 
                        onclick="btnNew_Click" />
                    <asp:Button CssClass=" btn btn-info" ID="btnOk" Text="提交订单" runat="server" 
                        onclick="btnOk_Click" />
                </div>
            </div>
        </div>
    </form>
    <script src="../js/jquery.js" type="text/javascript"></script>
    <script src="../js/jquery.validate.js" type="text/javascript"></script>
    <script src="../js/jquery.validate.extend.js" type="text/javascript"></script>
    <script src="../js/jquery.validate.messages_cn.js" type="text/javascript"></script>
    <script>
        $(function () {
            var t = ValidateRecive();
            if (t == false) {
                return false;
            }
        })
        function ValidateRecive() {
            var o = $("#form1").validate({
                rules: {
                    txtName: {
                        required: true,
                        minlength: 2
                    },
                    txtPhone: {
                        required: true,
                        mobile: true
                    },
                    ddlProvince: {
                        required: true,
                        min: 4
                    },
                    ddlCity: {
                        required: true,
                        min: 4
                    },
                    txtAddress: {
                        required: true,
                        minlength: 4
                    }
                }
            })
            if (o.form()) {
                return true;
            }
            return false;
        }
    </script>
</body>
</html>
