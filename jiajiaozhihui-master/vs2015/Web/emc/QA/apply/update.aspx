<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.QA.apply.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    <script>
        function SelectExpert() {
            var ObjAssignID = "<%=txtExpert.ClientID %>";
            var ObjhfAssignID = "<%=hfExpertId.ClientID %>";
            var Flag = "1";
            var url = "../../common/SelectExpert.aspx?ObjID=" + ObjAssignID + "&ObjhfID=" + ObjhfAssignID + "&Flag=" + Flag;
            ShowIframe('专家选择', url, '720', '600');
        }
    </script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="群信息">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <style>
                    .td{ width:80px;}
                </style>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td class="td">昵称</td>
                        <td ><asp:Label ID="lblNickName" runat="server"  ></asp:Label></td>
                    </tr>
                    <tr>
                        <td class="td">头像</td>
                        <td ><asp:Image ID="imgHeadImgUrl" runat="server" style="width:100px;" /></td>
                    </tr>
                    <tr>
                        <td class="td">性别</td>
                        <td ><asp:Label ID="lblSex" runat="server"></asp:Label></td>
                    </tr>
                     <tr>   
                        <td class="td">姓名</td>
                        <td ><asp:Label ID="lblCName" runat="server"></asp:Label></td>
                    </tr>
                    <tr>
                        <td class="td">申请日期</td>
                        <td ><asp:Label ID="lblCreateDate"  runat="server"></asp:Label></td>
                    </tr>
                    <tr>
                        <td class="td">状态</td>
                        <td >
                            <asp:DropDownList ID="ddlAct" runat="server">
                                <asp:ListItem Text="审核中" Value="0"></asp:ListItem>
                                <asp:ListItem Text="通过" Value="1"></asp:ListItem>
                                <asp:ListItem Text="未通过" Value="2"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td class="td">匹配</td>
                        <td >
                            <asp:TextBox  ID="txtExpert" runat="server"></asp:TextBox>
                            <input id="btnExpert" onclick="SelectExpert()" type="button" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" value="选择专家"   />
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
            <asp:HiddenField ID="hfExpertId" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
