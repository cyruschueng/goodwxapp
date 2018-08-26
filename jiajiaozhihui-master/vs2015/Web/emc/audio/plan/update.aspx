<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.audio.plan.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem2" runat="server" Tab_Name="计划数据">
            <asp:Panel ID="Panel2" GroupingText="筛选" runat="server">
                <style>
                    select { width:200px;}
                </style>
                <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                    <tr>
                        <td style="width:120px;">类目</td>
                        <td>
                            <asp:DropDownList ID="DropDownList1" AutoPostBack="true" runat="server" onselectedindexchanged="DropDownList1_SelectedIndexChanged" 
                                ></asp:DropDownList>
                            &nbsp;&nbsp;
                            <asp:DropDownList ID="DropDownList2" AutoPostBack="true" runat="server"  
                                Visible="false" onselectedindexchanged="DropDownList2_SelectedIndexChanged"
                                ></asp:DropDownList>
                            &nbsp;&nbsp;
                            <asp:DropDownList ID="DropDownList3" runat="server" Visible="false" 
                                AutoPostBack="true" onselectedindexchanged="DropDownList3_SelectedIndexChanged"
                                ></asp:DropDownList>
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:SmartGridView ID="GridView2" runat="server" AutoGenerateColumns="False" 
                Width="98%" SkinID ="sgv2" 
                             OnRowDataBound="GridView2_RowDataBound"  onrowcommand="GridView2_RowCommand" >
                            <Columns>
                                <asp:BoundField DataField="AudioId" HeaderText="音源Id" ReadOnly="True">
                                    <ItemStyle Width="50px" />
                                </asp:BoundField>
                                <asp:BoundField DataField="FullName" HeaderText="标题">
                                </asp:BoundField>
                                <asp:BoundField DataField="CategoryPath" HeaderText="类目">
                                </asp:BoundField>
                                <asp:TemplateField >
                                    <ItemStyle Width="50px" />
                                    <ItemTemplate>
                                        <asp:LinkButton ID="LinkButton1" runat="server" CommandArgument='<%# Eval("AudioId") %>' Text="移除"></asp:LinkButton>
                                    </ItemTemplate>
                                </asp:TemplateField>
                            </Columns>
                            <PagerSettings Position="Top"/>
                            <EditRowStyle Width="50px" />
                        </asp:SmartGridView>
                        <asp:AspNetPager ID="AspNetPager2" runat="server" class="aspnetpager" 
                                CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                                FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                                OnPageChanged="AspNetPager2_PageChanged" PageSize="15" PrevPageText="上一页" 
                                ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                                ShowPageIndexBox="always">
                            </asp:AspNetPager>
        </cc1:TabOptionItem>
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="数据分配">
            <asp:Panel ID="Panel1" GroupingText="筛选" runat="server">
                <style>
                    select { width:200px;}
                </style>
                <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                    <tr>
                        <td style="width:120px;">类目</td>
                        <td>
                            <asp:DropDownList ID="ddlCategory1" AutoPostBack="true" runat="server" 
                                onselectedindexchanged="ddlCategory1_SelectedIndexChanged"></asp:DropDownList>
                            &nbsp;&nbsp;
                            <asp:DropDownList ID="ddlCategory2" AutoPostBack="true" runat="server"  Visible="false"
                                onselectedindexchanged="ddlCategory2_SelectedIndexChanged"></asp:DropDownList>
                            &nbsp;&nbsp;
                            <asp:DropDownList ID="ddlCategory3" runat="server" Visible="false" AutoPostBack="true"
                                onselectedindexchanged="ddlCategory3_SelectedIndexChanged"></asp:DropDownList>
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False" 
                Width="98%" SkinID ="sgv2" 
                             OnRowDataBound="GridView1_RowDataBound" DataKeyNames="Id" onrowcommand="GridView1_RowCommand" >
                            <Columns>
                                <asp:BoundField DataField="Id" HeaderText="ID" ReadOnly="True">
                                    <ItemStyle Width="20px" />
                                </asp:BoundField>
                                <asp:BoundField DataField="FullName" HeaderText="标题">
                                </asp:BoundField>
                                <asp:BoundField DataField="CategoryPath" HeaderText="类目">
                                </asp:BoundField>
                                <asp:TemplateField >
                                    <ItemStyle Width="50px" />
                                    <ItemTemplate>
                                        <asp:LinkButton runat="server" CommandArgument='<%# Eval("Id") %>' Text="添加"></asp:LinkButton>
                                    </ItemTemplate>
                                </asp:TemplateField>
                            </Columns>
                            <PagerSettings Position="Top"/>
                            <EditRowStyle Width="50px" />
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
    <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
</asp:Content>
