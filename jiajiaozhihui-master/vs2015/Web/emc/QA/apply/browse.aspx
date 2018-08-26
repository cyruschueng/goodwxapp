<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.QA.apply.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="专家申请">
            <asp:Panel ID="Panel3" GroupingText="" runat="server">
                <table border="0" cellpadding="0" cellspacing="0" style="width:100%" class="fromtable">
                    <tr>
                        <td><asp:TextBox ID="txtNickName" placeholder="昵称"   runat="server"></asp:TextBox></td>
                        <td><asp:TextBox ID="txtName" placeholder="姓名"   runat="server"></asp:TextBox></td>
                        <td>
                            <asp:CheckBox ID="cbIsAct0" runat="server" />审核中&nbsp;
                            <asp:CheckBox ID="cbIsAct1" Checked="true" runat="server" />通过&nbsp;
                            <asp:CheckBox ID="cbIsAct2" runat="server" />未通过&nbsp;
                        </td>
                        <td>
                            <asp:Button ID="btnFind"  Text="查询" class="btn"  
                                onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" 
                                runat="server" onclick="btnFind_Click" />
                        </td>
                    </tr>
                </table>
                <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="Id" OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                    SkinID="sgv1" >
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
                        <asp:BoundField DataField="NickName" HeaderText="昵称" ReadOnly="true" />
                        <asp:TemplateField HeaderText="头像">
                            <ItemTemplate>
                                <img style="width:32px;" src='<%# Eval("HeadImgUrl") %>'  />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Sex" HeaderText="性别"  ReadOnly="true"/>
                        <asp:BoundField DataField="CName" HeaderText="真实姓名"  ReadOnly="true"/>
                        <asp:BoundField DataField="CreateDate" HeaderText="申请日期" ReadOnly="true"  />
                        <asp:BoundField DataField="IsAct" HeaderText="状态" ReadOnly="true"  />
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
