<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.sm.logs.browse" Title="无标题页" %>

 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
 
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="登录日志">
        <table class="fromtable"><tr><td>
            <asp:Panel ID="Panel1" runat="server" GroupingText="查询条件" Width="99%">
                &nbsp;公司：<asp:DropDownList ID="ddlCompany" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlCompany_SelectedIndexChanged">
            </asp:DropDownList>&nbsp;
            部门：<asp:DropDownList ID="ddlDept" runat="server">
            </asp:DropDownList>&nbsp;
            姓名：<asp:TextBox ID="txtCnName" runat="server" Width="70px"></asp:TextBox>&nbsp;
                &nbsp;
            日期 从：<asp:CalendarTextBox ID="txtStartDate" runat="server" Width="68px"></asp:CalendarTextBox>
            到：<asp:CalendarTextBox ID="txtEndDate" runat="server" Width="68px"></asp:CalendarTextBox>
            <asp:Button ID="btnSearch" runat="server" Text="查询" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" OnClick="btnSearch_Click" />
            </asp:Panel>
        </td></tr></table>
            <asp:SmartGridView ID="GridView1" runat="server" AllowPaging="True" AutoGenerateColumns="False"
                DataKeyNames="ID" MouseOverCssClass="OverRow" OnPageIndexChanging="GridView1_PageIndexChanging"
                 SkinID="sgv1" Width="99%" PageSize="50">
                <Columns>
                    <asp:BoundField DataField="ID" HeaderText="编号" />
                    <asp:BoundField DataField="UserName" HeaderText="用户名" />
                    <asp:BoundField DataField="CnName" HeaderText="姓名" />
                    <asp:BoundField DataField="Dept" HeaderText="部门" />
                    <asp:BoundField DataField="LoginTime" HeaderText="登录时间" />
                    <asp:BoundField DataField="LogoutTime" HeaderText="退出时间" />
<%--                    <asp:BoundField DataField="IpAddr" HeaderText="IP" />
                    <asp:BoundField DataField="ComputerName" HeaderText="登录电脑" />--%>
 
                </Columns>
                <pagersettings position="Top"></pagersettings>
            </asp:SmartGridView>
        </cc1:TabOptionItem>
        <cc1:TabOptionItem ID="TabOptionItem2" runat="server" Tab_Name="日志管理">
        <table class="fromtable"><tr><td>
            清除前<asp:DropDownList ID="ddlMonths" runat="server">
                <asp:ListItem Value="3">3</asp:ListItem>
                <asp:ListItem Selected="True" Value="6">6</asp:ListItem>
                <asp:ListItem Value="9">9</asp:ListItem>
                <asp:ListItem Value="12">12</asp:ListItem>
            </asp:DropDownList>个月之前的日志
            <asp:Button ID="btnClear" runat="server" OnClick="btnClear_Click" Text="确定" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" />
            <asp:Label ID="lblMsg" runat="server" ForeColor="Red" Width="281px"></asp:Label><br />
            <br />
            系统保持最近三个月的日志。</cc1:TabOptionItem>
        </td></tr></table>    
    </cc1:TabOptionWebControls>
</asp:Content>
