<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true" CodeBehind="main.aspx.cs" Inherits="SfSoft.web.help.emc.main" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <table border="0" cellpadding="2" cellspacing="3" class="box" height="100%" width="100%">
        <tr>
            <td valign="top">
                <div class="blockhead" runat ="server" id="DivFunName">
                  </div>
                <table runat ="server" id="tbAppInfo" border="0" cellpadding="0"   width="100%">
                    <tr>
                        <td class="title">
                            <span>应用</span></td>
                    </tr>
                    <tr>
                        <td class="sub1">
                        <div runat ="server" id="DivAppInfo" width="100%"></div>
                             </td>
                    </tr>
                    </table>
                    <table runat ="server" id="tbFlowInfo" border="0" cellpadding="0"   width="100%">
                    <tr  >
                        <td class="title">
                            <span>流程</span></td>
                    </tr>
                    <tr>
                        <td class="sub1">
                        <div runat ="server" id="DivFlowInfo" width="100%"></div>
                             </td>
                    </tr>
                    </table>
                    <table runat ="server" id="tbCaseInfo" border="0" cellpadding="0"   width="100%">
                    <tr  >
                        <td class="title">
                            <span>案例</span></td>
                    </tr>
                    <tr>
                        <td class="sub1">
                        <div runat ="server" id="DivCaseInfo" width="100%"></div>
                             </td>
                    </tr>
                    </table>
                    <table runat ="server" id="tbContent" border="0" cellpadding="0"   width="100%">
                    <tr  >
                        <td class="title" style="height: 14px">
                            <span>操作</span></td>
                    </tr>
                    <tr>
                        <td class="sub1">
                         <div runat ="server" id="DivContent" width="100%"></div>
                             </td>
                    </tr>
                    </table>
                    <table runat ="server" id="tbOthers" border="0" cellpadding="0"   width="100%">
                                        <tr  >
                        <td class="title" style="height: 14px">
                            <span>其它</span></td>
                    </tr>
                    <tr>
                        <td class="sub1">
                         <div runat ="server" id="DivOthers" width="100%"></div>
                            </td>
                    </tr>
                    </table>
                    <table runat ="server" id="tbNoteInfo" border="0" cellpadding="0"   width="100%">
                                        <tr  >
                        <td class="title" style="height: 14px">
                            <span>提示信息</span></td>
                    </tr>
                    <tr>
                        <td class="sub1">
                        <div runat ="server" id="DivNoteInfo" width="100%"></div>
                            </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</asp:Content>
