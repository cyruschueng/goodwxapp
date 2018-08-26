<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    Codebehind="source_list.aspx.cs" Inherits="SfSoft.web.emc.resouce.set.source_list" Title="无标题页" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
     <script type="text/javascript" language="javascript" src="/js/comm.js"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="基础数据">
            <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                <tr>
                    <td  >
                        文件名&nbsp;</td>
                    <td  >
                        <asp:TextBox ID="txtFileTitle" runat="server" Width="120px"></asp:TextBox></td>
                    <td  >
                        &nbsp;<asp:Button ID="btnSearch" runat="server" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" OnClick="btnSearch_Click" Text="查询" /></td>
                </tr>
            </table>
      
                <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False" Width="98%" SkinID ="sgv2" 
                     OnRowDataBound="GridView1_RowDataBound" DataKeyNames="id">
                    <Columns>
                        <asp:BoundField DataField="id" HeaderText="ID" ReadOnly="True">
                            <ItemStyle Width="20px" />
                        </asp:BoundField>
                        <asp:BoundField DataField="file_title" HeaderText="文件名" />
                        
                        <asp:BoundField DataField="create_date" ReadOnly="true"  HeaderText="创建日期">
                            <ItemStyle Width="200px" />
                        </asp:BoundField>
                    </Columns>
                    <PagerSettings Position="Top"/>
                    <EditRowStyle Width="50px" />
                    <PagerSettings Position="Bottom"></PagerSettings>
                </asp:SmartGridView>
                <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
            <asp:HiddenField ID="hfClassID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <script>
        function Add_CousetForm(classId) {
            document.location = 'source_update.aspx?mode=add&ID=&classId='+classId;
        }
    </script>
</asp:Content>
