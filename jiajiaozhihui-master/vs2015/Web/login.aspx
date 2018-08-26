<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="SfSoft.web.login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>神尔-企业分销管理系统</title>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312">
    <link href="emc/css/emccss.css" rel="stylesheet">

    <script type="text/javascript" src="/js/popup.js"></script>

    <script type="text/javascript" src="/js/popupclass.js"></script>

    <script type="text/javascript" src="/js/checkform.js"></script>

    <script type="text/javascript" src="/js/jquery-1.4.4.min.js"></script>


    <script>
        function frameBuster() {
            if (window != top) {
                top.location.href = location.href;
            }
        }
        window.onload = frameBuster;

        function getPassword() {
            //window.open("getpassword.aspx", "", "width=300 height=170 left=300 top=200");
            ShowIframe('忘记密码', 'getpassword.aspx', '400', '170');
        }
    </script>
</head>
<body style="background-image: url('emc/images/loginbg.jpg');">
    <form id="form1" runat="server">
    <asp:HiddenField ID="txtComputerID" Value ="" runat ="server"  />
    <iframe id="clientFrame" src="<%=iframeurl%>"   style ="display:none ;"  ></iframe>
    <table cellspacing="0" cellpadding="0" width="100%" border="0">
        <tbody>
            <tr>
                <td height="50">
                    &nbsp;
                </td>
            </tr>
            <tr align="CENTER">
                <td>
                    <table width="491" border="0" cellspacing="0" cellpadding="1" style="background-image: url('emc/images/emc_login_main.jpg'); filter:progid:DXImageTransform.Microsoft.Shadow (Color=#8E9397,Direction=120,strength=6);" 
                        height="411" >
                        <tr>
                            <td style="width: 491px; height: 265px;">
                                &nbsp; 
                            </td>
                        </tr>
                        <tr align="CENTER">
                            <td style="height: 99px; width: 491px;">
                                <table border="0" cellpadding="1" cellspacing="0" style="width: 323px" class="loginForm">
                                    <tr>
                                        <td style="width: 212px; height: 100px;">
                                            <table border="0" cellpadding="0" style="width: 293px;display:<%=strDisp%>">
                                                <tr>
                                                    <td align="right">
                                                        <asp:Label ID="UserNameLabel" runat="server" AssociatedControlID="UserName">用户名:</asp:Label>
                                                    </td>
                                                    <td align="left" style="width: 161px">
                                                        <asp:TextBox ID="UserName" runat="server" Width="140px" TabIndex="1"></asp:TextBox>
                                                        <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName"
                                                            ErrorMessage="必须填写“用户名”。" ToolTip="必须填写“用户名”。" ValidationGroup="Login1">*</asp:RequiredFieldValidator>
                                                    </td>
                                                    <td align="left" style="width: 54px">
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="right">
                                                        <asp:Label ID="PasswordLabel" runat="server" AssociatedControlID="Password">密码:</asp:Label>
                                                    </td>
                                                    <td align="left" style="width: 161px">
                                                        <asp:TextBox ID="Password" runat="server" TextMode="Password" Width="140px" TabIndex="2"></asp:TextBox>
                                                        <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password"
                                                            ErrorMessage="必须填写“密码”。" ToolTip="必须填写“密码”。" ValidationGroup="Login1">*</asp:RequiredFieldValidator>
                                                    </td>
                                                    <td align="left" style="width: 54px">
                                                        &nbsp;<asp:Button ID="LoginButton" runat="server" Text="登 录" CssClass="btn" onmouseover="this.className='btn_mouseover'"
                                                            onmouseout="this.className='btn'" ValidationGroup="Login1" OnClick="LoginButton_Click"
                                                            TabIndex="4" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="right">
                                                        验证码:
                                                    </td>
                                                    <td align="left">
                                                        <asp:TextBox ID="code_op" runat="server" Columns="4" title="请输入验证码~4:!" MaxLength="4"
                                                            TabIndex="3"></asp:TextBox>
                                                        &nbsp; 请输入<img id="ImageCheck" align="absMiddle" height="20" onclick="javascript:ChangeCodeImg();"
                                                            onload="javascript:Open_Submit();" src="" style="cursor: pointer" title="点击更换验证码图片!"
                                                            width="45" />
                                                    </td>
                                                    <td align="left" style="width: 54px">
                                                        <asp:HyperLink ID="PasswordRecoveryLink" runat="server" Style="cursor: hand" onclick="getPassword()"
                                                            TabIndex="5">   忘记密码</asp:HyperLink>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center" colspan="2" style="color: red; height: 14px">
                                                          <asp:Literal ID="FailureText" runat="server" EnableViewState="False"></asp:Literal>
                                                    </td>
                                                    <td align="center" colspan="1" style="color: red; height: 14px; width: 54px;">
                                                    </td>
                                                </tr>
                                            </table>
                                             <asp:CheckBox ID="RememberMe" runat="server" Text="下次记住我。" Visible="False" TabIndex="15" />
                                       
                                        </td>
                                    </tr>
                                </table>
                                &nbsp;
                            </td>
                        </tr>
                        <tr align="CENTER">
                            <td height="41" style="width: 491px">
                                深圳神尔科技有限公司 <a href="javascript:OpenLicense()">版权所有</a> &nbsp;<a href="reg/emc/reginfo.aspx">电脑注册</a><br>
                                <a href="http://www.shenerjiaoyu.com" target="_blank" tabindex="16">www.shenerjiaoyu.com</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr align="CENTER">
                <td>
                    &nbsp;
                </td>
            </tr>
        </tbody>
    </table>

    </form>
   
</body>
</html>

<script language="JavaScript" type="text/javascript"><!--

    // The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu) 

    // See: http://www.msc.cornell.edu/~houle/javascript/randomizer.html 

   // var aa = "<%=iframeurl %>";
    rnd.today = new Date();

    rnd.seed = rnd.today.getTime();

    function rnd() {
        rnd.seed = (rnd.seed * 9301 + 49297) % 233280;
        return rnd.seed / (233280.0);

    };

    function rand(number) {
        return Math.ceil(rnd() * number);

    }; 

    // end central randomizer. --> 

</script>

<script language="javascript" type="text/javascript">
    ChangeCodeImg();
    function ChangeCodeImg() {
        a = document.getElementById("ImageCheck");
        a.src = "common/CodeImg.aspx?" + rand(10000000)+"=";
        document.all.LoginButton.disabled = false;
    }

    function Open_Submit() {
        document.all.LoginButton.disabled = false;
    }

    if (top != self) {
        top.location.href = "login.aspx";
    }
    //alert(navigator.appVersion);
    if (navigator.appVersion.indexOf("MSIE") == -1) {
        //alert("提醒 : 本管理系统建议议采用Internet Explorer 5.5 (或以上版本) 的浏览器。请开启浏览器的 Cookies 与 JavaScript 功能。");   
    }
    var objUserName = document.getElementById("<%=UserName.ClientID%>");
   // objUserName.focus();
</script>

