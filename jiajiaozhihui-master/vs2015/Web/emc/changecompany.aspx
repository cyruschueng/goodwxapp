<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true" CodeBehind="changecompany.aspx.cs" Inherits="SfSoft.web.emc.changecompany" Title="切换公司" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
 
    <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False"  Width="380px" OnRowEditing="GridView1_RowEditing"   DataKeyNames="FilialeID">
        <Columns>
            <asp:BoundField DataField="FilialeID" HeaderText="ID" >
                <ItemStyle Width="50px" />
            </asp:BoundField>
            <asp:BoundField DataField="CompanyName" HeaderText="公司" >
                <ItemStyle Width="250px" />
            </asp:BoundField>
            
             <asp:CommandField ShowEditButton="True" EditText="进入" >
                        <ItemStyle Width="80px" />
             </asp:CommandField>
        </Columns>
    </asp:SmartGridView>
</asp:Content>
