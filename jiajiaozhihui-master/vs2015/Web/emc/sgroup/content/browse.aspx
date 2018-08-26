<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.sgroup.content.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="群内容管理">
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                <tr>
                    <td align="right">
                        <asp:DropDownList ID="ddlGroup" runat="server"></asp:DropDownList>
                    </td>
                    <td align="right">
                        <asp:CheckBox ID="cbShowDelete" runat="server" />只显示删除数据
                    </td>
                    <td align="right">
                        <asp:CheckBox ID="cbIsAct" runat="server" />正在使用的
                    </td>
                    <td align="left">
                        <asp:Button ID="BtnSearch" OnClick="BtnSearch_Click" runat="server" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" Text="查询"></asp:Button>
                    </td>
                </tr>
            </table>
            <asp:Panel ID="Panel3" GroupingText="" runat="server">
                <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="Id,group_type " OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                    SkinID="sgv1" OnRowCancelingEdit="GridView1_RowCancelingEdit" OnRowEditing="GridView1_RowEditing" OnRowUpdating="GridView1_RowUpdating" OnRowCommand="GridView1_RowCommand" >
                    <Columns>
                        <asp:TemplateField ItemStyle-Width="20px">
                            <HeaderTemplate>
                                <asp:CheckBox ID="all" runat="server" />
                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:CheckBox ID="item" runat="server" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Id" HeaderText="编号" ReadOnly="true" />
                        <asp:TemplateField HeaderText="标题" >
                            <ItemTemplate >
                                <%# Eval("title") %>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:TextBox ID="txtTitle" runat="server" Text='<%# Eval("title") %>' ></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="group_type" HeaderText="群名称" ReadOnly="true" />
                        <asp:TemplateField HeaderText="班级" >
                            <ItemTemplate >
                                <asp:Label ID="Label2" runat="server" Text='<%# Eval("class_name") %>'></asp:Label>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:TextBox ID="txtClassName" runat="server" Text='<%# Eval("class_name") %>' ></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>

                        <asp:BoundField DataField="is_act" HeaderText="是否有效"  ReadOnly="true"/>
                        <asp:BoundField DataField="create_date" HeaderText="创建日期"  ReadOnly="true"/>
                        <asp:CommandField HeaderText="编辑" ShowEditButton="true" ShowCancelButton="true"  />

                       <asp:TemplateField HeaderText="操作" >
                           <ItemTemplate>
                               <asp:LinkButton Text="获取二维码" CommandArgument='<%# Eval("id").ToString() %>' runat="server"></asp:LinkButton>
                           </ItemTemplate>
                       </asp:TemplateField>
                    </Columns>
                    <CascadeCheckboxes>
                        <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                    </CascadeCheckboxes>
                    <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                    <PagerSettings Position="Bottom"></PagerSettings>
                </asp:SmartGridView>
            </asp:Panel>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="60" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
</asp:Content>
