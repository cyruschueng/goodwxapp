<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.sm.s2.update" Title="用户管理" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script language="javascript" src="/js/emccommon.js"></script>
        <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server" SelectIndex="0">
            <cc1:TabOptionItem ID="TabOptionItem2" runat="server" Tab_Name="基本信息">
                <table cellspacing="2" cellpadding="0" width="100%" border="0" class="fromtable">
                    <tbody>
                        <tr>
                            <td style="width: 12%" align="right" height="25">
                                用户名</td>
                            <td align="left" width="*" height="25">
                                <asp:TextBox ID="txtUserName" runat="server" Width="200px" ReadOnly ="true" SkinID ="txtBoxRedonly" ></asp:TextBox>
                            </td>
                            <td align="right" width="*" height="25">
                                员工号</td>
                            <td align="left" width="*" height="25">
                                <asp:TextBox ID="txtEmpID" runat="server" Width="200px" ReadOnly ="true" SkinID ="txtBoxRedonly" ></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 12%" align="right" height="25">
                                姓名</td>
                            <td align="left" width="*" height="25">
                                <asp:TextBox ID="txtCnName" runat="server" Width="200px" ReadOnly ="true" SkinID ="txtBoxRedonly" ></asp:TextBox>
                            </td>
                            <td align="right" width="*" height="25">
                                英文名</td>
                            <td align="left" width="*" height="25">
                                <asp:TextBox ID="txtEnName" runat="server" Width="200px" ReadOnly ="true" SkinID ="txtBoxRedonly" ></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 12%" align="right" height="25">
                                部门
                            </td>
                            <td align="left" width="*" height="25">
                                <asp:TextBox ID="txtDeptName" runat="server" Width="200px"  SkinID="txtBoxRedonly" ReadOnly="True" ></asp:TextBox>
                            </td>
                            <td align="right" width="*" height="25">
                                岗位</td>
                            <td align="left" width="*" height="25">
                                <asp:TextBox ID="txtPositions" runat="server" Width="200px"  ReadOnly ="true" SkinID ="txtBoxRedonly" ></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 12%" align="right" height="25">
                                性别</td>
                            <td align="left" width="*" height="25">
                                 <asp:RadioButtonList ID="txtSex" runat="server" Width="114px" Height="25px" TextAlign="Left"
                                    RepeatDirection="Horizontal">
                                    <asp:ListItem Value="男">男</asp:ListItem>
                                    <asp:ListItem Value="女">女</asp:ListItem>
                                </asp:RadioButtonList></td>
                            <td align="right" width="*" height="25">
                                身份证号</td>
                            <td align="left" width="*" height="25">
                                <asp:TextBox ID="txtIDCard" runat="server" Width="200px"  ReadOnly ="true" SkinID ="txtBoxRedonly" ></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 12%" align="right" height="25">
                                国家</td>
                            <td align="left" width="*" height="25">
                                <asp:TextBox ID="txtNationality" runat="server" Width="200px"  ReadOnly ="true" SkinID ="txtBoxRedonly" ></asp:TextBox>
                            </td>
                            <td align="right" width="*" height="25">
                                地址</td>
                            <td align="left" width="*" height="25">
                                <asp:TextBox ID="txtAddr" runat="server" Width="200px"  ReadOnly ="true" SkinID ="txtBoxRedonly" ></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 12%; height: 25px" align="right">
                                移动电话</td>
                            <td style="height: 25px" align="left" width="*">
                                <asp:TextBox ID="txtMobile" runat="server" Width="200px"  ReadOnly ="true" SkinID ="txtBoxRedonly" ></asp:TextBox>
                            </td>
                            <td style="height: 25px" align="right" width="*">
                                固定电话</td>
                            <td style="height: 25px" align="left" width="*">
                                <asp:TextBox ID="txtTel" runat="server" Width="200px"  ReadOnly ="true" SkinID ="txtBoxRedonly" ></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 12%" align="right" height="25">
                                Email
                            </td>
                            <td align="left" width="*" height="25">
                                <asp:TextBox ID="txtEmail" runat="server" Width="200px"  ReadOnly ="true" SkinID ="txtBoxRedonly" ></asp:TextBox>
                            </td>
                            <td align="right" width="*" height="25">
                                传真</td>
                            <td align="left" width="*" height="25">
                                <asp:TextBox ID="txtFax" runat="server" Width="200px" ReadOnly ="true" SkinID ="txtBoxRedonly" ></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td colspan="4" height="25">
                                <div align="center">
                                    <asp:HiddenField ID="txtDeptID" runat="server"></asp:HiddenField>
                                    <asp:HiddenField ID="txtPositionsID" runat="server"></asp:HiddenField>
                                    <asp:HiddenField ID="HF_Mode" runat="server"></asp:HiddenField>
                                    <asp:HiddenField ID="HF_UserID" runat="server"></asp:HiddenField>
 
                                    <asp:Label ID="Lbl_Message" runat="server" Width="230px" ForeColor="Red"></asp:Label></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </cc1:TabOptionItem>
             <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="帐号信息">
  
                <table cellspacing="0" cellpadding="0" width="100%" border="0" class="fromtable">
                        <tbody>
                            <tr>
                                <td style="width: 20%; height: 22px">
                                    用户名：</td>
                                <td style="width: 332px; height: 22px">
                                    <asp:Label ID="Lbl_UserName" runat="server" Width="154px"></asp:Label></td>
                            </tr>
                            <tr>
                                <td>
                                    E-Mail:</td>
                                <td style="width: 332px; height: 22px">
                                    <asp:TextBox ID="txt_Email" runat="server" Width="150px" ReadOnly ="true" SkinID ="txtBoxRedonly" ></asp:TextBox></td>
                            </tr>
                            <tr>
                                <td>
                                    备注：</td>
                                <td style="width: 99%; height: 22px">
                                    <asp:TextBox ID="txt_Comment" runat="server" Height="16px" Width="85%" TextMode="MultiLine" ReadOnly ="true" SkinID ="txtBoxRedonly" ></asp:TextBox></td>
                            </tr>
                           
                            <tr>
                                <td>
                                    创建时间：</td>
                                <td style="width: 332px; height: 20px">
                                    <asp:Label ID="lbl_CreationDate" runat="server" Text=""></asp:Label></td>
                            </tr>
                            <tr>
                                <td>
                                    最后登陆时间：</td>
                                <td>
                                    <asp:Label ID="lbl_LastLoginDate" runat="server" Text=""></asp:Label></td>
                            </tr>
                            <tr>
                                <td>
                                    最后在线时间：</td>
                                <td>
                                    <asp:Label ID="lbl_LastActivityDate" runat="server" Text=""></asp:Label></td>
                            </tr>
                            <tr>
                                <td>
                                    最后密码更改时间：
                                </td>
                                <td>
                                    <asp:Label ID="lbl_LastPasswordChangedDate" runat="server" Text=""></asp:Label>
                                </td>
                            </tr>

                        </tbody>
                    </table>
              
                <asp:Panel runat="server" GroupingText ="帐号管理 ">
                <table cellspacing="0" cellpadding="0" width="100%" border="0" class="fromtable">
   
                    <tr>
                        <td>
                            员工状态：</td>
                        <td>
                            <asp:CheckBox ID="chk_IsApproved" runat="server" Text="有效"></asp:CheckBox><asp:CheckBox
                                ID="chk_IsOnline" runat="server" Text="在线" Enabled="False"></asp:CheckBox>
                            <asp:Button ID="btn_IsLockOut" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" OnClick="btn_IsLockOut_Click" runat="server" Text="未锁定"
                                Enabled="False" CausesValidation="False"></asp:Button>
                            <asp:Button ID="btnLock" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" runat="server" CausesValidation="False" OnClick="btnLock_Click"
                                Text="锁定用户" /></td>
                    </tr>                        
                    <tr>
                        <td>
                            原用户名：</td>
                        <td>
                            <asp:TextBox ID="txtOldUserName" runat="server" SkinID="txtBoxRedonly" ReadOnly="True"  Width="150px"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>
                            新用户名：</td>
                        <td>
                            <asp:TextBox ID="txtNewUserName" runat="server" Width="150px" onbeforepaste= "clipboardData.setData('text',clipboardData.getData('text').replace(/'/, '')) "   onkeyup= "value=value.replace(/'/, '')"></asp:TextBox>
                            <asp:Button ID="btnUpdateUserName" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" runat="server" CausesValidation="False" OnClick="btnUpdateUserName_Click"
                                Text="强制修改用户名" Width="110px" />
                            <asp:Label ID="lblUpuserInfo" runat="server" ForeColor="Red" Width="101px"></asp:Label></td>
                    </tr>
                    <tr>
                        <td>
                            管理员重设密码:</td>
                        <td>
                            <asp:TextBox ID="txt_ForceNewPassword" runat="server" Width="150px"></asp:TextBox>
                            <asp:Button ID="btn_ForceResetPwd" OnClick="btn_ForceResetPwd_Click" runat="server"
                                CausesValidation="false" Text="强制修改密码" Width="110px" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'"></asp:Button>
                        </td>
                    </tr>    
                    <tr>
                        <td>
                            <font color="#00BB00">操作提示：</font></td>
                        <td>
                            <asp:Label ID="lbl_Tips" runat="server" ForeColor="Red"></asp:Label>
                        </td>
                    </tr>                                                    
                </table> 
            
         
                <table cellspacing="0" cellpadding="0" width="100%" border="0" style ="display :none ">
                        <tbody>
                            <tr>
                                <td style="width: 180px; height: 22px">
                                    原密码：</td>
                                <td style="width: 332px; height: 22px">
                                    <asp:TextBox ID="txt_OldPassword" runat="server" TextMode="Password"></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="RequiredFieldValidator"
                                        ControlToValidate="txt_OldPassword">必须输入原密码</asp:RequiredFieldValidator></td>
                            </tr>
                            <tr>
                                <td style="width: 180px; height: 22px">
                                    新密码：</td>
                                <td style="width: 332px; height: 22px">
                                    <asp:TextBox ID="txt_NewPassword" runat="server" TextMode="Password"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 180px; height: 21px">
                                </td>
                                <td style="width: 332px; height: 21px">
                                    <asp:Button ID="btn_SecUpdate" OnClick="btn_SecUpdate_Click" runat="server" Text="更新密码">
                                    </asp:Button>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 180px; height: 22px">
                                </td>
                                <td style="width: 332px; height: 22px">
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 180px; height: 22px">
                                    密码提示问题：</td>
                                <td style="width: 332px; height: 22px">
                                    <asp:TextBox ID="txt_PasswordQuestion" runat="server"></asp:TextBox></td>
                            </tr>
                            <tr>
                                <td style="width: 180px; height: 22px">
                                    密码提示答案：</td>
                                <td style="width: 332px; height: 22px">
                                    <asp:TextBox ID="txt_PasswordAnswer" runat="server"></asp:TextBox></td>
                            </tr>
                            <tr>
                                <td style="width: 180px; height: 21px">
                                    根据问题和答案重设密码：</td>
                                <td style="width: 332px; height: 21px">
                                    <asp:Button ID="btn_GenPassword" OnClick="btn_GenPassword_Click" runat="server" Text="生成随机密码">
                                    </asp:Button>
                                    <asp:Label ID="lbl_GenPassword" runat="server"></asp:Label></td>
                            </tr>
                            <tr>
                                <td style="width: 180px; height: 22px">
                                    根据原密码重设问题和答案：</td>
                                <td style="width: 332px; height: 22px">
                                    <asp:Button ID="btn_UpdateQA" OnClick="btn_UpdateQA_Click" runat="server" Text="重设问题答案">
                                    </asp:Button></td>
                            </tr>


                        </tbody>
                    </table>
                </asp:Panel>
             </cc1:TabOptionItem>
                          <cc1:TabOptionItem ID="TabOptionItem3" runat="server" Tab_Name="权限信息">
       
                <table width="100%" border="0" cellspacing="0" cellpadding="1" class="fromtable1">
                <tr>
  
                    <td width="100%"  >
                        <table width="100%">
                            <tr>
                                <td style="height: 20px" class ="toolbars">
                                    已有角色：</td>
                                <td align="center" style="width: 78px; height: 20px" class ="toolbars">
                                    操作</td>
                                <td style="height: 20px" class ="toolbars">
                                    可选角色：</td>
                                <td style="height: 20px" class ="toolbars" width="*">
                                    详细权限：</td>                                    
                            </tr>
                            <tr>
                                <td style="height: 220px" class ="tableRow" valign="top" >
                                    <asp:ListBox ID="lbRoles" runat="server" Rows="16" Width="186px"></asp:ListBox></td>
                                <td style="width: 13px;text-align:center ; height: 120px" class ="fromtable1" valign="top" >
                              <br /><br /><br /><br />
                                    <asp:Button ID="btnAddRoles" runat="server"  CausesValidation="false"  Text="<<增加" OnClick="btnAddRoles_Click" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" />
                                    <asp:Button ID="btnDelRoles" runat="server"  CausesValidation="false"  Text=">>删除" OnClick="btnDelRoles_Click" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" />
                                    <asp:Button ID="btnAddRolesAll" runat="server"  CausesValidation="false"  Text="<<所有" OnClick="btnAddRolesAll_Click" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" />
                                    <asp:Button ID="btnDelRolesAll" runat="server"  CausesValidation="false"  Text=">>所有" OnClick="btnDelRolesAll_Click" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" /></td>
                                <td style="height:220px" class ="tableRow" valign="top" >
                                    <asp:ListBox ID="lbBySelectRoles" runat="server" Rows="16" Width="186px"></asp:ListBox></td>
                                <td style="height:220px" class ="fromtable1" valign="top" >
                                  <asp:Panel ID ="panelid" runat ="server" Height ="245px" ScrollBars="Auto">
                                    <asp:TreeView Width ="230px" ID="RolesTreeView" runat ="server"    SkinID ="Folder"  AutoGenerateDataBindings="False" ExpandDepth="FullyExpand"></asp:TreeView>                                  
                                    </asp:Panel>
                                    </td>  
                            </tr>
                        </table>
                    </td>
                </tr>
                </table>
    
                            </cc1:TabOptionItem> 
        </cc1:TabOptionWebControls>
 
</asp:Content>
