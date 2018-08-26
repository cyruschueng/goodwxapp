<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="reginfo.aspx.cs" Inherits="SfSoft.web.reg.emc.reginfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>神尔EMC-企业协同办公管理系统</title>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312">
    <link rel="stylesheet" type="text/css" href="/emc/css/emccss.css" />
</head>
<body>
    <form id="form1" runat="server">
    <div style="overflow: hidden; height: 40px; background: url(/images/top-bg.jpg) #5D9ADF;
        line-height: 20px; color: #fff; font-family: Verdana, 微软雅黑,黑体">
        <span style="padding-left: 0px; font-size: 16px; width: 550px; float: left;">
            <table border="0" cellpadding="0" cellspacing="0" height="33px">
                <td width="52px">
                    <img src="/images/logo.png" />
                </td>
                <td>
                    <div runat="server" id="EMCLOGO" class="emclogo" style="width: 500px">
                    </div>
                </td>
                <td width="32px">
                </td>
            </table>
        </span><span></span>
    </div>
    <table width="100%" border="0" cellpadding="0" cellspacing="0" height="30" bgcolor="#91C8FF">
        <tr bgcolor="#9B9B9B">
            <td height="1" width="82">
            </td>
            <td height="1" width="934">
            </td>
            <td height="1" colspan="2" width="3">
            </td>
        </tr>
        <tr>
            <td width="82">
                &nbsp;
            </td>
            <td width="934">
                <font size="3"><b><font color="#FFFFFF">用户电脑注册说明</font></b></font>
            </td>
            <td width="3">
                &nbsp;
            </td>
        </tr>
    </table>
    <table width="100%" border="0" cellspacing="0" cellpadding="1" bordercolorlight="#ffffff"
        bordercolordark="#EEEEEE" bgcolor="#EEEEEE">
        <tr>
            <td colspan="2" height="2" class="bodytxt" align="right" bgcolor="#FFFFFF">
            </td>
        </tr>
        <tr>
            <td colspan="2" height="2" class="bodytxt" align="right" bgcolor="#FFFFFF">
            </td>
        </tr>
        <tr>
            <td width="8%" height="30" class="bodytxt" valign="bottom" align="right">
                &nbsp;
            </td>
            <td width="92%" height="120" valign="top">
                <p>
                    <br>
                </p>
                进入电脑注册之前(现在),请先进行如下设置，否则系统将不能注册成功，如果已经配置好浏览器参数 <input type="button" name="Button" value="进入注册" class="btn" onclick="document.location='reg.aspx'"><input type="button" name="Button2" value="返回" class="btn" onclick="document.location='/login.aspx'">：<br>
                <br>
                1.把EMC网址加入到”可信站点“：
                  在浏览器菜单中点“工具-->Internet 选项“ 进入“Internet 选项“ 页中，点“安全“ ，进行安全页后，选择”可信站点“，再点“站点“进入可信站点设置，输入EMC网址，取消下方选择，点”添加“，再点确定，完成操作。<br />
                  <img src="st1.jpg" border="0" />
                  <br /><br />
                2.定义可信站点的安全级别：
                     在设置完可信站点网址后，在同一个界面上 点“自定义级别...“按扭，进入安全设置。进入安全设置后，在设置框中，按下图设置：<br /><br />
                     <img src="st2.jpg" border="0" />
                </p>
                <p>
 
                <p>
                    3.完成 操作2 后点[确定]</p>
                <p>
                    4.完成以上操作
                    <input type="button" name="Button" value="进入注册" class="btn" onclick="document.location='reg.aspx'">
                    <input type="button" name="Button2" value="返回" class="btn" onclick="document.location='/login.aspx'">
                </p>
                <br /><br />
                <p>
                    备注：如果系统安装了上网助手或其它客户端安全工具，那么进行注册页或者登录页时将会出现如下图信息，这是上网助手屏蔽了客户端程序，所以必须取消这个屏蔽，操作如下：</p>
                <blockquote>
                    <p>
                        １。右键点击地址栏下的黄色栏，出现一菜单，在菜单中点击“安装此ActiveX插件“.</p>
                    <p>
                        ２。上网助手会弹出提示，在提示页中点“确定“ ，设置完成。<br>
                        <br>
                        <img src="st3.jpg" width="629" height="157">
                    </p>
                </blockquote>
            </td>
        </tr>
    </table>
    <br /><br />
    <table width="100%" border="0" cellpadding="0" cellspacing="0" height="8">
        <tr>
            <td align ="center" >
                <font color="#AFAFAF">深圳神尔科技有限公司 版权所有</font>
            </td>
        </tr>
    </table>
    </form>
</body>
</html>
