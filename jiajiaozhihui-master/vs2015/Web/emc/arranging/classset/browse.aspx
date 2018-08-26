<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.arranging.classset.browse" Title="无标题页" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="基础数据">
            <table border="0" cellpadding="0" cellspacing="0" style="width:99%" class="fromtable">
                <tr>
                    <td  >
                        排课名称&nbsp;</td>
                    <td  >
                        <asp:TextBox ID="txtClassName" runat="server" Width="120px"></asp:TextBox></td>
                    <td  >
                        &nbsp;<asp:Button ID="btnAdd" runat="server" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" OnClick="btnAdd_Click" Text="增加" /></td>
                </tr>
            </table>
            <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="id" MouseOverCssClass="OverRow" SkinID="sgv1" 
                    OnRowDataBound="GridView1_RowDataBound">
                    <Columns>
                        <asp:BoundField DataField="id" HeaderText="ID" ReadOnly="True">
                            <ItemStyle Width="20px" />
                        </asp:BoundField>
                        <asp:BoundField  DataField="class_name"  HeaderText="班级名称"></asp:BoundField>
                        <asp:BoundField  DataField="opening_date"  HeaderText="开学日期"></asp:BoundField>
                        <asp:BoundField  DataField="create_date"  HeaderText="创建日期"></asp:BoundField>
                        <asp:TemplateField  HeaderText="课程列表" HeaderStyle-Width="100px" ItemStyle-Width="100px" >
                            <ItemTemplate >
                                <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="" Text="课程列表"></asp:HyperLink>
                            </ItemTemplate>
                        </asp:TemplateField>
                    </Columns>
                    <PagerSettings Position="Bottom"></PagerSettings>
                </asp:SmartGridView>
                <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>   
   <asp:HiddenField ID="hfID" runat="server" />
   <asp:HiddenField ID="hfMID" runat="server" />
</asp:Content>