<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.audio.download.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="课程订单">
            <asp:Panel ID="Panel1" GroupingText="查询条件" runat="server">
                <cc1:TabOptionItem ID="TabOptionItem2" runat="server" Tab_Name="基础数据">
                    <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                        <tr>
                            <td  >
                                <asp:TextBox ID="txtTitle" placeholder="标题" runat="server" Width="120px"></asp:TextBox></td>
                                
                                <td>
                                <asp:Button ID="btnSearch" runat="server" class="btn" onmouseover="this.className='btn_mouseover'" onclick="btnSearch_Click" onmouseout="this.className='btn'"  Text="查询" />
                            </td>
                        </tr>
                    </table>
                    <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False" Width="98%" SkinID ="sgv2" OnRowDeleting="GridView1_RowDeleting"
                             OnRowDataBound="GridView1_RowDataBound" DataKeyNames="Id" >
                            <Columns>
                                <asp:BoundField DataField="Id" HeaderText="ID" ReadOnly="True">
                                    <ItemStyle Width="20px" />
                                </asp:BoundField>
                                <asp:BoundField DataField="Title" HeaderText="标题">
                                </asp:BoundField>
                                <asp:BoundField DataField="CreateDate" HeaderText="日期">
                                    <ItemStyle Width="200px" />
                                </asp:BoundField>
                                <asp:CommandField ShowDeleteButton="True">
                                    <ItemStyle Width="50px" />
                                </asp:CommandField>
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
            </asp:Panel>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
