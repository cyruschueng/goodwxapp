<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.sm.s3.browse" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script language="javascript" src="/js/TreeView2.js"></script>
    <script language="javascript" type="text/javascript">
     
        
        function SelectAll(sel) {
        var mm = document.getElementsByTagName("input").length;
 
          for(var i=0;i<mm;i++)
           {
              var dd = document.getElementsByTagName("input").item(i);
              if(dd.type == "checkbox")
                {
                 dd.checked=sel;
               }
           }
       
        }
    </script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="角色管理">
            <div>
                <span style="font-size: larger; color: maroon"></span>
                <table style="width: 100%" cellspacing="2" cellpadding="2" border="0" class="fromtable1">
                    <tbody>
                        <tr>
                            <td style="width: 490px" class="toolbars">
                                添加角色：<asp:TextBox ID="txtRole" runat="server" Width="150px"></asp:TextBox>&nbsp;&nbsp;<asp:Button
                                    ID="btnSubmit" OnClick="btnSubmit_Click" runat="server" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" Text=" 确定 "></asp:Button>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 99%; height: 135px" align="center">
                                <asp:SmartGridView ID="GridView1" runat="server" Width="100%" AutoGenerateColumns="False"
                                     >
                                    <Columns>
                                        <asp:TemplateField HeaderText="角色名">
                                            <HeaderStyle Height="25px"></HeaderStyle>
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lbRoleName" ForeColor='black' Text='<%# DataBinder.Eval(Container.DataItem,"RoleName") %>' />
                                            </ItemTemplate>
                                            <ItemStyle HorizontalAlign="Left" />
                                        </asp:TemplateField>
                                        <asp:TemplateField>
                                            <ItemTemplate>
                                                <asp:LinkButton ID="lbEdit" CssClass="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" runat="server" Text="设置角色的用户" CommandName="EditRole"
                                                    CommandArgument='<%# DataBinder.Eval(Container.DataItem,"RoleName") %>' OnCommand="LinkButtonClick"
                                                    ForeColor="blue"></asp:LinkButton>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField>
                                            <ItemTemplate>
                                                <asp:LinkButton ID="lbDel" CssClass="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" runat="server" Text="删除" CommandName="DeleteRole" CommandArgument='<%# DataBinder.Eval(Container.DataItem,"RoleName") %>'
                                                    OnCommand="LinkButtonClick" ForeColor="blue" OnClientClick="return confirm('确定删除该角色吗？');"></asp:LinkButton>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField>
                                            <ItemTemplate>
                                                <asp:LinkButton ID="lbRolesFun" CssClass="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" runat="server" Text="角色授权" CommandName="RoleFun"
                                                    CommandArgument='<%# DataBinder.Eval(Container.DataItem,"RoleName") %>' OnCommand="LinkButtonClick"
                                                    ForeColor="blue"></asp:LinkButton>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                    </Columns>
                                </asp:SmartGridView>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 279px" align="center">
                                <asp:Label ID="lbMessage" runat="server" ForeColor="Red" Width="207px"></asp:Label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </cc1:TabOptionItem>
        <cc1:TabOptionItem ID="TabOptionItem2" runat="server" Tab_Name="角色授权" Tab_Visible="True"
            Visible="False">
            <table class="fromtable"><tr><td>
            <asp:Label ID="Label1" runat="server" Width="53px" Text="角色："></asp:Label>
            <asp:Label ID="LblRolesName" runat="server" Width="253px"></asp:Label>&nbsp;&nbsp;
            <input id="Button2" type="button" value="全部选中" onclick="SelectAll(true)" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" /><input
                id="Button3" type="button" value="全部取消" onclick="SelectAll(false)" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" /><br />
            </td></tr></table>
            <asp:TreeView ID="RolesTreeView" runat="server" AutoGenerateDataBindings="False"
                ShowCheckBoxes="All" SkinID="Folder" ExpandDepth="2"  >
            </asp:TreeView>
            &nbsp;
            <asp:Button ID="Button1" OnClick="Button1_Click" runat="server" Text="保存" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'"></asp:Button>&nbsp;&nbsp;
        
        </cc1:TabOptionItem>
        <cc1:TabOptionItem ID="TabOptionItem3" runat="server" Tab_Name="设置角色的用户" Visible="False">
        <table class="fromtable"><tr><td>
            <asp:Label ID="Label2" runat="server" Width="53px" Text="角色："></asp:Label><asp:Label
                ID="LblRolesName1" runat="server" Width="239px"></asp:Label>
            <asp:Label ID="lbMessage2" runat="server" ForeColor="red"></asp:Label>&nbsp;<br />
            部门：<asp:DropDownList ID="ddlDept" runat="server">
            </asp:DropDownList>
            姓名：<asp:TextBox ID="txtCnName" runat="server" Width="70px"></asp:TextBox>
            <asp:Button ID="btnSearch" runat="server" OnClick="btnSearch_Click" Text="查询" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" />
            <asp:Button ID="btnSelectAll" runat="server" OnClick="btnSelectAll_Click" Text="全部选中" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" />
            <asp:Button ID="btnCancelAll" runat="server" Text="全部取消" OnClick="btnCancelAll_Click" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" /><br />
          </td></tr></table><br />
            <asp:SmartGridView ID="gvUsers" runat="server" Width="100%" AutoGenerateColumns="False"
                GridLines="None" Font-Size="Small">
                <Columns>
                    <asp:TemplateField HeaderText="用户名">
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lbUserName" ForeColor='black' Text='<%#DataBinder.Eval(Container.DataItem,"UserName") %>' />
                        </ItemTemplate>
                        <HeaderStyle Height="25px" />
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="姓名">
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lbCnName" ForeColor='black' Text='<%#DataBinder.Eval(Container.DataItem,"CnName") %>' />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="是否属于角色">
                        <ItemTemplate>
                            <asp:CheckBox ID="cbUserInRole" runat="server" AutoPostBack="true" ForeColor="blue"
                                OnCheckedChanged="CheckBox_Click" ToolTip='<%#DataBinder.Eval(Container.DataItem,"UserName") %>' />
                        </ItemTemplate>
                        <HeaderStyle Height="25px" />
                    </asp:TemplateField>
                </Columns>
            </asp:SmartGridView>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
       
</asp:Content>


