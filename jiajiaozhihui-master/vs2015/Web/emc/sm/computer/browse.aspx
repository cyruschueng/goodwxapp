<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.sm.computer.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="电脑注册信息">
            <table width="99%" class="fromtable">
                <tr>
                    <td>
                        姓名：<asp:TextBox ID="txtCnName" runat="server" Width="125px"></asp:TextBox>&nbsp;
                        状态：<asp:CheckBoxList ID="cblStatus" runat="server" RepeatDirection ="Horizontal" RepeatLayout ="Flow" >
                            <asp:ListItem Text="未审批" Value="未审批"></asp:ListItem>
                            <asp:ListItem Text="审批同意" Value="审批同意"></asp:ListItem>
                            <asp:ListItem Text="审批不同意" Value="审批不同意"></asp:ListItem>
                            <asp:ListItem Text="已取消" Value="已取消"></asp:ListItem>
                        </asp:CheckBoxList>
                       &nbsp; <asp:CheckBox id="cbFlag" Text ="不需要注册用户" runat ="server"  />
                        &nbsp; 计算机使用类型：<asp:DropDownList ID="ddlComputerKind" runat="server">
                        </asp:DropDownList>
                        <asp:Button ID="btnSearch" runat="server" class="btn" onmouseover="this.className='btn_mouseover'"
                            onmouseout="this.className='btn'" OnClick="btnSearch_Click" Text="查询" />
                    </td>
                </tr>
            </table>
            <asp:SmartGridView ID="GridView1" runat="server" AllowPaging="True" AutoGenerateColumns="False"
                DataKeyNames="ID" MouseOverCssClass="OverRow" OnPageIndexChanging="GridView1_PageIndexChanging"
                SkinID="sgv1" Width="130%"  OnRowDataBound="GridView1_RowDataBound">
                <Columns>
                    <asp:BoundField DataField="ID" HeaderText="编号" ItemStyle-Width="60px">
                    </asp:BoundField>
                    <asp:BoundField DataField="CnName" HeaderText="姓名"></asp:BoundField>
                    <asp:BoundField DataField="DeptName" HeaderText="部门"></asp:BoundField>
                    <asp:BoundField DataField="Status" HeaderText="状态"></asp:BoundField>
                    <asp:BoundField DataField="Flag" HeaderText="用户类型"></asp:BoundField>
                    <asp:BoundField DataField="ComputerKind" HeaderText="电脑使用类型"></asp:BoundField>
                    <asp:BoundField DataField="ComputerID" HeaderText="机器号"></asp:BoundField>
                    <asp:BoundField DataField="Brand" HeaderText="品牌"></asp:BoundField>
                    <asp:BoundField DataField="ComputerType" HeaderText="型号"></asp:BoundField>
                    <asp:BoundField DataField="ComputerSn" HeaderText="序列号"></asp:BoundField>
                    <asp:BoundField DataField="Remark" HeaderText="申请理由"></asp:BoundField>
                    <asp:BoundField DataField="SubmitDate" HeaderText="提交日期" DataFormatString="{0:yyyy-MM-dd}"></asp:BoundField>
                    <asp:BoundField DataField="CancelDate" HeaderText="取消日期" DataFormatString="{0:yyyy-MM-dd}"></asp:BoundField>
                    <asp:BoundField DataField="AppDate" HeaderText="审核日期" DataFormatString="{0:yyyy-MM-dd}"></asp:BoundField>       
                    <asp:BoundField DataField="Approval" HeaderText="审核人"></asp:BoundField>      
                    <asp:BoundField DataField="AppRemark" HeaderText="审核备注"></asp:BoundField> 
                </Columns>
                <PagerSettings Position="TopAndBottom" />
            </asp:SmartGridView>
            <asp:HiddenField ID="hfMID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
