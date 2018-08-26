<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.gardenia.checkmember.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="会员审核">
            <asp:Panel ID="Panel3" GroupingText="" runat="server">
                <table align="center" border="0" cellpadding="0" cellspacing="0"  height="100%" width="100%" class="fromtable">
                    <tr>
                        <td>审核状态</td>
                        <td>
                            <asp:RadioButtonList ID="rblAct" AutoPostBack="true" RepeatDirection="Horizontal" runat="server" OnSelectedIndexChanged="rblAct_SelectedIndexChanged">
                                <asp:ListItem  Text="请求验证" Selected="True" Value="0"></asp:ListItem>
                                <asp:ListItem  Text="验证通过" Value="1"></asp:ListItem>
                                <asp:ListItem  Text="验证失败" Value="-1"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                        <td>审核状态</td>
                        <td>
                            <asp:DropDownList runat="server" AutoPostBack="true" ID="ddlGroupType" OnSelectedIndexChanged="ddlGroupType_SelectedIndexChanged"></asp:DropDownList>
                        </td>
                    </tr>
                </table>

                <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="Id" OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                    SkinID="sgv1" OnRowCommand="GridView1_RowCommand" OnRowCancelingEdit="GridView1_RowCancelingEdit" OnRowEditing="GridView1_RowEditing" OnRowUpdating="GridView1_RowUpdating" >
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
                        <asp:BoundField DataField="nick_name" HeaderText="昵称" ReadOnly="true" />
                        <asp:BoundField DataField="class_name" HeaderText="班级名称" ReadOnly="true" />
                        <asp:BoundField DataField="class_no" HeaderText="班级编号" ReadOnly="true" />
                        <asp:BoundField DataField="class_type" HeaderText="班级类别" ReadOnly="true" />
                        <asp:BoundField DataField="group_name" HeaderText="区域" ReadOnly="true" />
                        <asp:BoundField DataField="profession" HeaderText="申核群名"  ReadOnly="true"/>
                        <asp:TemplateField HeaderText="状态">
                            <ItemTemplate>
                                <%# GetStateName(Eval("is_act").ToString()) %>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:RadioButtonList ID="rblIsAct"  RepeatDirection="Horizontal" runat="server" >
                                    <asp:ListItem  Text="请求验证" Value="0"></asp:ListItem>
                                    <asp:ListItem  Text="验证通过" Value="1"></asp:ListItem>
                                    <asp:ListItem  Text="验证失败" Value="-1"></asp:ListItem>
                                </asp:RadioButtonList>
                                <asp:HiddenField ID="hfIsAct" runat="server" Value='<%#Eval("is_act") %>' />
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:CommandField ShowEditButton="true" ShowCancelButton="true" />
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
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
</asp:Content>
