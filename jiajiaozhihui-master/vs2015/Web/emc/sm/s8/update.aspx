<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    Codebehind="update.aspx.cs" Inherits="SfSoft.web.emc.sm.s8.update" Title="审批点设置" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
 
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="审批点设置">
            <table width="100%" border="0" cellspacing="0" cellpadding="2" bgcolor="#D4EDFA" class="fromtable">
                <tr bgcolor="#8ad3f7">
                    <td bgcolor="#52c2f9" style="height: 24px; width: 20%;">
                        <span style="color: #0000FF">审批级别:<asp:Label ID="lblClass" runat="server"></asp:Label></span></td>
                    <td bgcolor="#d4edfa" width="75%" style="height: 24px">
                    </td>
                </tr>
                <tr bgcolor="#8AD3F7">
                    <td height="22" style="width: 20%" align="right">
                        审批名称</td>
                    <td width="75%">
                        <asp:TextBox ID="txtAuditTypeName" runat="server" Width="205px"></asp:TextBox><font color="#FF0000">*</font>(审批人的职位或部门)
                    </td>
                </tr>
                <tr>
                    <td height="22" style="width: 20%" align="right">
                        审批条件</td>
                    <td width="75%">
                        <asp:DropDownList ID="ddlConditionName" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlConditionName_SelectedIndexChanged">
                        </asp:DropDownList>
                        <asp:DropDownList ID="ddlLogicName" runat="server" Visible="False">
                            <asp:ListItem>&gt;</asp:ListItem>
                            <asp:ListItem>=</asp:ListItem>
                            <asp:ListItem>&gt;=</asp:ListItem>
                        </asp:DropDownList>
                        <asp:TextBox ID="txtConditionValue" runat="server" Width="133px" Visible="False"></asp:TextBox>
                        <asp:CheckBoxList ID="cblSel" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow"
                            Visible="False">
                        </asp:CheckBoxList></td>
                </tr>
                <tr>
                    <td height="22" style="width: 20%" align="right">
                        审批方式</td>
                    <td width="75%">
                        <asp:RadioButtonList ID="rblAuditMode" runat="server" AutoPostBack="True" RepeatDirection="Horizontal"
                            RepeatLayout="Flow" OnSelectedIndexChanged="rblAuditMode_SelectedIndexChanged">
                            <asp:ListItem Selected="True" Value="U">上级审批</asp:ListItem>
                            <asp:ListItem Value="P">指定审批</asp:ListItem>
                        </asp:RadioButtonList></td>
                </tr>
                </table>
                <asp:Panel id="Panel1" runat="server" Width="100%" Height="50px" Visible="False"> 
               
                <table width="100%" border="0" cellspacing="0" cellpadding="1" bgcolor="#d4edfa" class="fromtable">
                <tr>
                    <td height="22" style="width: 20%" align="right">
                        审批人</td>
                    <td width="75%">
                        <asp:DropDownList ID="ddlAuditUserID" runat="server">
                        </asp:DropDownList>*</td>
                </tr>
                <tr>
                    <td style="height: 22px; width: 20%;" align="right">
                        审批范围</td>
                    <td width="75%" style="height: 22px">
                        <asp:RadioButtonList ID="rblAuditBound" runat="server" AutoPostBack="True" RepeatDirection="Horizontal"
                            RepeatLayout="Flow" OnSelectedIndexChanged="rblAuditBound_SelectedIndexChanged">
                            <asp:ListItem Selected="True" Value="DF">默认范围</asp:ListItem>
                            <asp:ListItem Value="PT">指定审批</asp:ListItem>
                        </asp:RadioButtonList>
                        (指定部门范围外的所有部门)
                    </td>
                </tr>
                </table>
                </asp:Panel>
                <asp:Panel id="Panel2" runat="server" Width="100%" Height="150px" Visible="False"> 
                <table width="100%" border="0" cellspacing="0" cellpadding="1" bgcolor="#d4edfa" class="fromtable">
                <tr>
                    <td height="22" style="width: 20%" align="right">
                                    选择审批范围</td>
                    <td width="75%" bgcolor="#ffffff">
                        <table width="450">
                            <tr>
                                <td style="height: 20px">
                                    选中部门：</td>
                                <td align="center" style="width: 78px; height: 20px">
                                    操作</td>
                                <td style="height: 20px">
                                    候选部门：</td>
                            </tr>
                            <tr>
                                <td style="height: 120px">
                                    <asp:ListBox ID="lbDept" runat="server" Rows="8" Width="186px"></asp:ListBox></td>
                                <td style="width: 13px; height: 120px">
                                    <asp:Button ID="btnAdd" runat="server" Text="<<增加" OnClick="btnAdd_Click" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" />
                                    <asp:Button ID="btnDel" runat="server" Text=">>删除" OnClick="btnDel_Click" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" />
                                    <asp:Button ID="btnAddAll" runat="server" Text="<<所有" OnClick="btnAddAll_Click" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" />
                                    <asp:Button ID="btnDelAll" runat="server" Text=">>所有" OnClick="btnDelAll_Click" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" /></td>
                                <td style="height: 120px">
                                    <asp:ListBox ID="lbBySelectDept" runat="server" Rows="8" Width="186px"></asp:ListBox></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                </table>
                </asp:Panel>                        <asp:HiddenField ID="hfFieldName" runat="server" />
                        <asp:HiddenField ID="hfMID" runat="server" />
                        <asp:HiddenField ID="hfMode" runat="server" />
                        <asp:HiddenField ID="hfAFID" runat="server" />
                        <asp:HiddenField ID="hfAuditClass" runat="server" />
                        <asp:HiddenField ID="hfFlag" runat="server" />
                <br />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
