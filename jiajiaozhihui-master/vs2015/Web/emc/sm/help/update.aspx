<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.sm.help.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
        <tr>
            <td align="right" height="25" style="width: 7%">
                功能名称</td>
            <td align="left" height="25" width="*">
                <asp:Label ID="lblFunName" runat="server" Width="221px" ForeColor="Red"></asp:Label>
            </td>
        </tr>
        <tr>
            <td align="right" height="25" style="background-color: whitesmoke" valign="top">
                应用</td>
            <td align="left" colspan="1" height="25" style="background-color: whitesmoke" width="*">
                <FCKeditorV2:FCKeditor ID="fckAppInfo" runat="server" DefaultLanguage="zh-cn" Height="200px"
                    Width="560px">
                </FCKeditorV2:FCKeditor>
            </td>
        </tr>
        <tr>
            <td align="right" height="25" style="background-color: whitesmoke" valign="top">
                流程</td>
            <td align="left" colspan="1" height="25" style="background-color: whitesmoke" width="*">
                <FCKeditorV2:FCKeditor ID="fckFlowInfo" runat="server" DefaultLanguage="zh-cn" Height="200px"
                    Width="560px">
                </FCKeditorV2:FCKeditor>
            </td>
        </tr>
        <tr>
            <td align="right" height="25" style="background-color: whitesmoke" valign="top">
                案例</td>
            <td align="left" colspan="1" height="25" style="background-color: whitesmoke" width="*">
                <FCKeditorV2:FCKeditor ID="fckCaseInfo" runat="server" DefaultLanguage="zh-cn" Height="200px"
                    Width="560px">
                </FCKeditorV2:FCKeditor>
            </td>
        </tr>
        <tr>
            <td align="right" height="25" style="background-color: whitesmoke" valign="top">
                操作</td>
            <td align="left" colspan="1" height="25" style="background-color: whitesmoke" width="*">
                <FCKeditorV2:FCKeditor ID="fckContent" runat="server" DefaultLanguage="zh-cn" Height="200px"
                    Width="560px">
                </FCKeditorV2:FCKeditor>
            </td>
        </tr>
        <tr>
            <td align="right" height="25" style="background-color: whitesmoke" valign="top">
                其它</td>
            <td align="left" colspan="1" height="25" style="background-color: whitesmoke" width="*">
                <FCKeditorV2:FCKeditor ID="fckOthers" runat="server" DefaultLanguage="zh-cn" Height="200px"
                    Width="560px">
                </FCKeditorV2:FCKeditor>
            </td>
        </tr>
        <tr>
            <td align="right" height="25" style="background-color: whitesmoke" valign="top">
                提示信息</td>
            <td align="left" colspan="1" height="25" style="background-color: whitesmoke" width="*">
                <asp:TextBox ID="txtNoteInfo" runat="server" MaxLength="180" Rows="3" TextMode="MultiLine"
                    Width="550px"></asp:TextBox></td>
        </tr>
        <tr>
            <td colspan="2" height="25">
                <div align="center">
                    &nbsp;<asp:Button ID="btnSave" runat="server" CssClass="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" OnClick="btnSave_Click" Text="保存" />
                    <asp:Label ID="lblMsg" runat="server" ForeColor="Red" Width="200px"></asp:Label>
                    <asp:HiddenField ID="hfMode" runat="server" />
                    <asp:HiddenField ID="hfMID" runat="server" />
                    <asp:HiddenField ID="hfID" runat="server" />
                    &nbsp; &nbsp;
                </div>
            </td>
        </tr>
    </table>
</asp:Content>
