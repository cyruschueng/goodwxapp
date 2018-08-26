<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true"
    Codebehind="list.aspx.cs" Inherits="SfSoft.web.emc.brainsexpert.winner.list" Title="无标题页" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
     <script type="text/javascript" language="javascript" src="/js/comm.js"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="获奖设置">
            <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                <tr>
                    <td>获奖名次&nbsp;</td>
                    <td  >
                        <asp:DropDownList runat="server" ID="ddlRank">
                            <asp:ListItem Text="" Value=""></asp:ListItem>
                            <asp:ListItem Text="第1名" Value="1"></asp:ListItem>
                            <asp:ListItem Text="第2名" Value="2"></asp:ListItem>
                            <asp:ListItem Text="第3名" Value="3"></asp:ListItem>
                            <asp:ListItem Text="第4名" Value="4"></asp:ListItem>
                            <asp:ListItem Text="第5名" Value="5"></asp:ListItem>
                            <asp:ListItem Text="第6名" Value="6"></asp:ListItem>
                            <asp:ListItem Text="第7名" Value="7"></asp:ListItem>
                            <asp:ListItem Text="第8名" Value="8"></asp:ListItem>
                            <asp:ListItem Text="第9名" Value="9"></asp:ListItem>
                            <asp:ListItem Text="第10名" Value="10"></asp:ListItem>
                        </asp:DropDownList>
                    <td  >
                        获奖取值范围&nbsp;</td>
                    <td   >
                        <asp:TextBox TextMode="Number" ID="txtLowerLimit" runat="server" min="1" Text="1" onkeyup="javascript:permitInt(this);"></asp:TextBox>
                        --
                        <asp:TextBox ID="txtUpperLimit" TextMode="Number" runat="server" min="1" Text="1" onkeyup="javascript:permitInt(this);"></asp:TextBox>
                    <td  >
                        &nbsp;<asp:Button ID="btnAdd" runat="server" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" OnClick="btnAdd_Click" Text="增加" /></td>
                </tr>
            </table>
      
                <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False" Width="98%" SkinID ="sgv2" 
                    OnRowDeleting="GridView1_RowDeleting" OnRowEditing="GridView1_RowEditing" OnRowUpdating="GridView1_RowUpdating"
                    OnRowCancelingEdit="GridView1_RowCancelingEdit" OnRowDataBound="GridView1_RowDataBound"
                    DataKeyNames="ID" AllowPaging="True" PageSize="50"
                      OnPageIndexChanging="GridView1_PageIndexChanging">
                    <Columns>
                        <asp:BoundField DataField="ID" HeaderText="ID" ReadOnly="True">
                            <ItemStyle Width="20px" />
                        </asp:BoundField>
                        <asp:BoundField DataField="WinnerName" HeaderText="名次" ReadOnly="true">
                            <ItemStyle Width="100px" />
                        </asp:BoundField>
                        <asp:BoundField DataField="LowerLimit" HeaderText="下限">
                            <ItemStyle Width="50px" />
                        </asp:BoundField>
                        <asp:BoundField DataField="UpperLimit" HeaderText="上限">
                            <ItemStyle Width="50px" />
                        </asp:BoundField>
                        <asp:CommandField ShowEditButton="True">
                            <ItemStyle Width="50px" />
                        </asp:CommandField>
                        <asp:CommandField ShowDeleteButton="True">
                            <ItemStyle Width="50px" />
                        </asp:CommandField>
                    </Columns>
                    <PagerSettings Position="Top"/>
                    <EditRowStyle Width="50px" />
       
                </asp:SmartGridView>
        
            <asp:HiddenField ID="hfActivityId" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
