<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="reg.aspx.cs" Inherits="SfSoft.web.reg.emc.reg" %>

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
            <td width="934" >
                <font size="3"><b><font color="#FFFFFF">用户电脑注册：</font></b></font> <font face="Verdana">
                    EMC为神尔科技的内部系统，所有信息级别为内部保密，为了保障内部信息的安全，特实施EMC用户认证。
            </td>
            <td width="3">
                &nbsp;
            </td>
        </tr>
    </table>
    <table width="100%" border="0">
        <tr>
            <td width="15%">
                &nbsp;
            </td>
            <td width="75%">
                <span class="style1">
                    <p>
                        <br>
                        </font><font face="Verdana">用户须知：<br>
                        </font><font face="Verdana">1。所有申请EMC登陆的用户必须是公司的员工，机器必须是公司认证的机器<br>
                        </font><font face="Verdana">2。原则上每人只容许使用一个机器登陆，员工必须以本人的注册登陆，不得使用他人的注册<br>
                        </font><font face="Verdana">3。须选择正确的电脑类，发现不符时审批将不会被通过<br>
                        </font><font face="Verdana">4。所有申请注册/重新申请注册的用户必须注明原因，申请理由为空的一律不予通过，新员工须注明‘新员工’；<br>
                        </font><font face="Verdana">5。公司所有服务器须由网络管理员负责申请，分支机构的须由指定当地网络管理员负责申请<br>
                        </font><font face="Verdana">6。如因配置改变而须重新申请的，新的用户认证号码将替代旧的用户认证号码,用户认证号码将会被删除，除非注明保留原因<br>
                        </font><font face="Verdana">7。如因业务原因须申请多台机器登陆认证的必须注明原因，否则不予受理<br>
                            8。笔记本电脑需要输入后面的系列号以便核对，不提供该信息的申请将不予通过，经认证的笔记本电脑需注意保护内部信息的安全。<br>
                        </font><font face="Verdana">9。离职人员的认证将在员工离职后删除<br>
                        </font><font face="Verdana">10。如发现多次认证将会被删除</font><font face="Verdana"><br>
                            请用户按照以上要求申请认证。谢谢合作！</font></p>
                </span>
            </td>
            <td width="15%">
                &nbsp;
            </td>
            <tr>
                <td>
                </td>
                <td>
                    <table class="fromtable">
                        <tr>
                            <td>
                                姓名
                            </td>
                            <td>
                                <asp:TextBox ID="txtCnName" runat="server" MaxLength="30" Width="200px"></asp:TextBox><font
                                    color="red">*</font>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                身份证号码
                            </td>
                            <td>
                                <asp:TextBox ID="txtIDCard" runat="server" MaxLength="18" Width="200px"></asp:TextBox><font
                                    color="red">*</font>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                电脑使用类型
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlComputerKind" runat="server">
                                </asp:DropDownList>
                                <font color="red">*</font>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                机器号
                            </td>
                            <td>
                                <asp:TextBox ID="txtComputerID" runat="server" MaxLength="30" Width="200px" SkinID="txtBoxRedonly"></asp:TextBox><font
                                    color="red">*</font>
                                <label id="lblMsg" runat="server">
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                申请理由
                            </td>
                            <td>
                                <asp:TextBox ID="txtRemark" runat="server" MaxLength="30" Width="200px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                品牌
                            </td>
                            <td>
                                <asp:TextBox ID="txtBrand" runat="server" MaxLength="30" Width="200px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                型号
                            </td>
                            <td>
                                <asp:TextBox ID="txtComputerType" runat="server" MaxLength="30" Width="200px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                序列号
                            </td>
                            <td>
                                <asp:TextBox ID="txtComputerSn" runat="server" MaxLength="30" Width="200px"></asp:TextBox>
                            </td>
                        </tr>
                    </table>
                    <table class="toolbars" style="width: 100%">
                        <tr>
                            <td>
                                <asp:Button ID="btnSubmit" runat="server" Text="提交" CssClass="btn" OnClick="btnSubmitClick" />
                                <input type="button" name="Button2" value="刷新" class="btn" onclick="javascript:document.location='reg.aspx'" />
                                <input type="button" name="Button2" value="返回" class="btn" onclick="javascript:document.location='reginfo.aspx'" />
                                &nbsp;&nbsp;<asp:Label ID="lblResult" runat="server" ForeColor="Red"></asp:Label>
                                如果机器号取不到或出现其它错误,请刷新当前页面！
                            </td>
                        </tr>
                    </table>
                </td>
                <td>
                </td>
            </tr>
        </tr>
    </table>
    <iframe id="clientFrame" src="getclient.aspx" style="display: none;"></iframe>
    </form>
</body>
</html>
