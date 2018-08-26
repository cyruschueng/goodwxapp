<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.mycourse.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="课程">
            
            <asp:Panel ID="Panel1" GroupingText="基础条件" runat="server">
                <style>
                    .select{ width:95%;}
                </style>
                
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>昵称</td>
                        <td><asp:TextBox ID="txtNickName" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>姓名</td>
                        <td><asp:TextBox ID="txtName" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>电话号码</td>
                        <td><asp:TextBox ID="txtTelephone" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>
                            <asp:RadioButtonList ID="rblSelectState" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Text="未选课程" Value="0"></asp:ListItem>
                                <asp:ListItem Text="已选课程" Value="1"></asp:ListItem>
                                <asp:ListItem Text="全部" Value=""></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                        <td>
                            <asp:Button ID="btnSearch" runat="server" class="btn"
                                onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" 
                                Text="查询" onclick="btnSearch_Click"  />
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:Panel ID="Panel3" GroupingText="" runat="server">
                <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="OpenId" OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                    SkinID="sgv1" >
                    <Columns>
                        <asp:BoundField DataField="NickName" HeaderText="昵称" ReadOnly="true" />
                        <asp:BoundField DataField="UserName" HeaderText="姓名" ReadOnly="true" />
                        <asp:BoundField DataField="Telephone" HeaderText="电话号码"  ReadOnly="true"/>
                        <asp:BoundField DataField="Quantity" HeaderText="选课数量"  ReadOnly="true"/>
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
