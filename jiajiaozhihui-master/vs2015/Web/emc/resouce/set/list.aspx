<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true"
    Codebehind="list.aspx.cs" Inherits="SfSoft.web.emc.resouce.set.list" Title="无标题页" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
     <script type="text/javascript" language="javascript" src="/js/comm.js"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="基础数据">
            <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                <tr>
                    <td  >
                        Bucket&nbsp;</td>
                    <td  >
                        <asp:TextBox ID="txtTitle" runat="server" Width="120px"></asp:TextBox></td>
                    <td  >
                        &nbsp;<asp:Button ID="btnAdd" runat="server" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" OnClick="btnAdd_Click" Text="增加" /></td>
                </tr>
            </table>
      
                <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False" Width="98%" SkinID ="sgv2" 
                    OnRowEditing="GridView1_RowEditing" OnRowUpdating="GridView1_RowUpdating"
                    OnRowCancelingEdit="GridView1_RowCancelingEdit" OnRowDataBound="GridView1_RowDataBound"
                    DataKeyNames="id" AllowPaging="True" PageSize="50"
                      OnPageIndexChanging="GridView1_PageIndexChanging" OnSelectedIndexChanging="GridView1_SelectedIndexChanging">
                    <Columns>
                        <asp:BoundField DataField="id" HeaderText="ID" ReadOnly="True">
                            <ItemStyle Width="20px" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Bucket名称">
                            <ItemTemplate >
                                <asp:HiddenField ID="txtHfBucketTitle" Value='<%# Eval("title") %>'  runat="server" />
                                <a id="bucketTitle" href='javascript:onclick=parent.parent.addTab("<%# Eval("title")%>", "/emc/resouce/set/update.aspx?ID=<%# Eval("id") %>&mode=update", "subNav");'><font color="#2828FF"><%# Eval("title")%></font></a>
                            </ItemTemplate> 
                            <EditItemTemplate>
                                <asp:TextBox ID="txtTitle" runat="server"  Text='<%# Eval("title") %>'></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="create_date" ReadOnly="true"  HeaderText="创建日期">
                            <ItemStyle Width="200px" />
                        </asp:BoundField>
                        <asp:TemplateField  HeaderText="课程列表" HeaderStyle-Width="100px" ItemStyle-Width="100px" >
                            <ItemTemplate >
                                <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="" Text="文件列表"></asp:HyperLink>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:CommandField HeaderText="操作" ItemStyle-Width="100px"  ShowCancelButton="true" ShowEditButton="true" CancelText="取消" EditText="编辑" />
                    </Columns>
                    <PagerSettings Position="Top"/>
                    <EditRowStyle Width="50px" />
       
                </asp:SmartGridView>
        
            <asp:HiddenField ID="hfClassID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
