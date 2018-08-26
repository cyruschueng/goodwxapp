<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master"
    AutoEventWireup="true" CodeBehind="view.aspx.cs" Inherits="SfSoft.web.emc.sm.computer.view" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <asp:Panel ID="AppPanel" runat="server" GroupingText="审批信息">
        <table border="0" width="100%" class="divApp">
            <tr>
                <td width="50%">
                    状&nbsp;&nbsp;态：
                   <asp:TextBox ID="txtStatus" runat="server" ReadOnly="true" SkinID="txtBoxRedonly"
                        Width="200px"></asp:TextBox>
                </td>
                <td width="50%">
                    审批备注： &nbsp;<asp:TextBox ID="txtAppRemark" runat="server" MaxLength="200" Width="200px"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td style="width: 50%">
                    审批人：<asp:TextBox ID="txtApproval" runat="server" ReadOnly="True" Width="200px"  SkinID="txtBoxRedonly"></asp:TextBox>
                </td>
                <td width="50%">
                    <asp:Label ID="lblAppDate" Text="审批时间：" runat="server"></asp:Label>
                    &nbsp;<asp:TextBox ID="txtAppDate" runat="server" ReadOnly="True" Width="100px" SkinID="txtBoxRedonly"></asp:TextBox>
                </td>
            </tr>
        </table>
    </asp:Panel>
    <asp:Panel ID="DetailPanel" runat="server" GroupingText="电脑注册信息">
        <table class="fromtable">
            <tr>
                <td>
                    姓名
                </td>
                <td>
                    <asp:TextBox ID="txtCnName" runat="server" MaxLength="30" Width="200px" ReadOnly="true"
                        SkinID="txtBoxRedonly"></asp:TextBox>
                </td>
                <td>
                    部门
                </td>
                <td>
                    <asp:TextBox ID="txtDeptName" runat="server" MaxLength="30" Width="200px" ReadOnly="true"
                        SkinID="txtBoxRedonly"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    身份证号码
                </td>
                <td>
                    <asp:TextBox ID="txtIDCard" runat="server" MaxLength="18" Width="200px" ReadOnly="true"
                        SkinID="txtBoxRedonly"></asp:TextBox>
                </td>
                <td>
                    电脑使用类型
                </td>
                <td>
                    <asp:TextBox ID="txtComputerKind" runat="server" MaxLength="18" Width="200px" ReadOnly="true"
                        SkinID="txtBoxRedonly"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    机器号
                </td>
                <td>
                    <asp:TextBox ID="txtComputerID" runat="server" MaxLength="30" Width="200px" ReadOnly="true"
                        SkinID="txtBoxRedonly"></asp:TextBox>
                </td>
                <td>
                    品牌
                </td>
                <td>
                    <asp:TextBox ID="txtBrand" runat="server" MaxLength="30" Width="200px" ReadOnly="true"
                        SkinID="txtBoxRedonly"></asp:TextBox>
                </td>
            </tr>
            <tr>                
                <td>
                    型号
                </td>
                <td>
                    <asp:TextBox ID="txtComputerType" runat="server" MaxLength="30" Width="200px" ReadOnly="true"
                        SkinID="txtBoxRedonly"></asp:TextBox>
                </td>

                <td>
                    序列号
                </td>
                <td>
                    <asp:TextBox ID="txtComputerSn" runat="server" MaxLength="30" Width="200px" ReadOnly="true"
                        SkinID="txtBoxRedonly"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    申请理由
                </td>
                <td colspan="3">
                    <asp:TextBox ID="txtRemark" runat="server" MaxLength="30" Width="400px" ReadOnly="true"
                        SkinID="txtBoxRedonly"></asp:TextBox>
                </td>
            </tr>
        </table>
    </asp:Panel>
        <asp:Panel ID="PanelList" runat="server" GroupingText="用户其它注册信息">
                  <asp:SmartGridView ID="GridView1" runat="server" AllowPaging="False" AutoGenerateColumns="False"
                DataKeyNames="ID" MouseOverCssClass="OverRow" 
                SkinID="sgv1" Width="110%">
                <Columns>
                    <asp:BoundField DataField="ID" HeaderText="编号" ItemStyle-Width="60px">
                    </asp:BoundField>
                    <asp:BoundField DataField="CnName" HeaderText="姓名"></asp:BoundField>
                    <asp:BoundField DataField="DeptName" HeaderText="部门"></asp:BoundField>
                    <asp:BoundField DataField="ComputerKind" HeaderText="电脑使用类型"></asp:BoundField>
                    <asp:BoundField DataField="ComputerID" HeaderText="机器号"></asp:BoundField>
                    <asp:BoundField DataField="Brand" HeaderText="品牌"></asp:BoundField>
                    <asp:BoundField DataField="ComputerType" HeaderText="型号"></asp:BoundField>
                    <asp:BoundField DataField="ComputerSn" HeaderText="序列号"></asp:BoundField>
                    <asp:BoundField DataField="Remark" HeaderText="申请理由"></asp:BoundField>
                </Columns>
           
            </asp:SmartGridView>
        
        </asp:Panel> 
    <asp:HiddenField ID="hfID" runat="server" />
    <asp:HiddenField ID="hfMode" runat="server" />
    <asp:HiddenField ID="hfUserID" runat="server" />
</asp:Content>
