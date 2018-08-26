<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.education.coursesorder.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="在线活动发布">
            <table class="fromtable">
                <tr>
                    <td>
                        课程名：<asp:TextBox ID="txtTitle" runat="server" Width="117px"></asp:TextBox>
                        昵称：<asp:TextBox ID="txtName" runat="server" Width="117px"></asp:TextBox>
                        <asp:Button ID="btnSearch" runat="server" class="btn" 
                            onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" 
                            Text="查询" onclick="btnSearch_Click"  />&nbsp;&nbsp;
                    </td>
                </tr>
             </table>
            <asp:SmartGridView ID="GridView1" runat="server" AllowPaging="False" AutoGenerateColumns="False"
                Width="99%" OnPageIndexChanging="GridView1_PageIndexChanging" DataKeyNames="ID"
                 OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" SkinID="sgv1">
                <Columns>
                    <asp:TemplateField ItemStyle-Width="20px">
                        <HeaderTemplate>
                            <asp:CheckBox ID="all" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="item" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="ID" HeaderText="编号" />
                    <asp:BoundField DataField="Topic" HeaderText="课程称" />
                    <asp:BoundField DataField="Name" HeaderText="昵称" />
                    <asp:BoundField DataField="Entrant" HeaderText="姓名" />
                    <asp:BoundField DataField="Telephone" HeaderText="电话号码" />
                    <asp:BoundField DataField="CreateDate" HeaderText="报名日期" DataFormatString="{0:yyyy-MM-dd}" />
                </Columns>
                <CascadeCheckboxes>
                    <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                </CascadeCheckboxes>
                <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                <PagerSettings Position="Bottom"></PagerSettings>
            </asp:SmartGridView>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="20" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
</asp:Content>
