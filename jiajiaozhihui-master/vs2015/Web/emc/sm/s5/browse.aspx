<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.sm.s5.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">

    <script type="text/javascript" language="javascript" src="/js/comm.js"></script>

    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="公司信息">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="fromtable">
                <tr>
                    <td align="right" height="25" style="width: 30%">
                        编码：
                    </td>
                    <td align="left" height="25" width="*">
                        <asp:Label ID="lblID" runat="server" Width="94px"></asp:Label>
                    </td>
                    <td align="left" height="25" width="*">
                    </td>
                    <td align="left" height="25" width="*">
                    </td>
                </tr>
                <tr>
                    <td align="right" height="25" style="width: 30%">
                        公司名称：
                    </td>
                    <td align="left" height="25" width="*" colspan="3">
                        <asp:TextBox ID="txtCompanyName" runat="server" Width="419px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td align="right" height="25" style="width: 30%">
                        公司名称（英文）：
                    </td>
                    <td align="left" height="25" width="*" colspan="3">
                        <asp:TextBox ID="txtCompanyName_e" runat="server" Width="419px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td align="right" style="width: 30%; height: 25px">
                        Email ：
                    </td>
                    <td align="left" colspan="3" style="height: 25px" width="*">
                        <asp:TextBox ID="txtEmail" runat="server" Width="419px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td align="right" style="width: 30%; height: 25px">
                        地址：
                    </td>
                    <td align="left" colspan="3" style="height: 25px" width="*">
                        <asp:TextBox ID="txtAddr" runat="server" Width="418px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td align="right" style="width: 30%; height: 25px">
                        电话：
                    </td>
                    <td align="left" style="height: 25px" width="*">
                        <asp:TextBox ID="txtPhone" runat="server" Width="200px"></asp:TextBox>
                    </td>
                    <td align="left" style="height: 25px" width="*">
                        传真：
                    </td>
                    <td align="left" style="height: 25px" width="*">
                        <asp:TextBox ID="txtFax" runat="server" Width="200px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td align="left" valign="top" style="width: 30%; height: 22px;">
                        Logo ：
                    </td>
                    <td align="left" width="*" style="height: 22px" colspan="3"><asp:FileUpload ID="txtLogo" runat="server" /><br />
                        <asp:Image ID="ImageLogo" runat="server" Visible="False"   />
                        &nbsp;
                    </td>
                </tr>
                <tr>
                    <td colspan="4" style="height: 22px">
                        <div align="center">
                            &nbsp;<asp:Button ID="btnAdd" runat="server" OnClick="btnAdd_Click" Text="· 提交 ·" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" />
                            <asp:HiddenField ID="hfLogo" runat="server" />
                            &nbsp;
                            <asp:Label ID="LblMessage" runat="server" ForeColor="Red" Width="140px"></asp:Label></div>
                    </td>
                </tr>
            </table>
        </cc1:TabOptionItem>
        <cc1:TabOptionItem ID="TabOptionItem2" runat="server" Tab_Name="公司及子公司设置">
        <div class ="toolbars" >
            授权可建立的公司数量：<asp:Label ID="LblCompanyNum" runat="server" Width="67px"></asp:Label>&nbsp;
            已建数量：<asp:Label ID="LblCNum" runat="server" Width="71px"></asp:Label>
            可建数量：<asp:Label ID="LblBNum" runat="server" Width="48px"></asp:Label>
            <asp:Button ID="btnNew" runat="server" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" Text="新增公司" OnClick="btnNew_Click" /><br />
           </div>
            <table width="99%" class="fromtable1">
                <tr>
                    <td valign="top" width="99%" style="background-color: aliceblue">
                        <asp:SmartGridView ID="DeptGridView" Width="100%" runat="server" AutoGenerateColumns="False" OnRowDataBound="DeptGridView_RowDataBound">
                            <Columns>
                                <asp:BoundField DataField="DeptID" HeaderText="ID" />
                                <asp:BoundField DataField="DeptNo" HeaderText="公司编码" />
                                <asp:BoundField DataField="DeptName" HeaderText="公司名称" />
                                <asp:BoundField DataField="IsFiliale" HeaderText="公司类型" />
                                <asp:TemplateField HeaderText="操作">
                                    <ItemTemplate>
                                        <asp:LinkButton ID="Lbt_Update" CssClass="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" runat="server" CommandName="UpdateDept" OnCommand="LinkButtonClick"
                                            CommandArgument=' <%# Eval("DeptID") %>'>编辑</asp:LinkButton>
                                        <asp:LinkButton ID="Lbt_Delete" CssClass="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" runat="server" CommandName="DeleteDept" OnCommand="LinkButtonClick" OnClientClick="return confirm('确定删除该用户吗？');" CommandArgument=' <%# Eval("DeptID") %>'>删除</asp:LinkButton>
                                    </ItemTemplate><ItemStyle Width="90px" />
                                </asp:TemplateField>
                            </Columns>
                        </asp:SmartGridView>
                    </td>
                    </tr>
                    <tr>
                    <td valign="top" width="100%">
                        <asp:Panel ID="Panel1" runat="server"  Width="100%" Visible="False"
                            GroupingText="基本信息">
                            
                            <table width="100%" class ="fromtable">
                                <tr>
                                    <td style="width: 60px">
                                        <asp:Label ID="Label1" runat="server" Text="公司编码：" Width="60px"></asp:Label>
                                    </td>
                                    <td style="width:60px">
                                        <asp:TextBox ID="txtDeptNo" runat="server" ReadOnly="True" Visible="False" Width="60px"></asp:TextBox>
                                        <asp:DropDownList ID="DeptIDDropDownList" runat="server">
                                        </asp:DropDownList>
                                        
                                    </td>
 
                                    <td style="width: 60px">
                                        <asp:Label ID="Label2" runat="server" Text="公司名称：" Width="60px"></asp:Label>
                                    </td>
                                    <td style="width: 180px">
                                        <asp:TextBox ID="txtDeptName" runat="server" Width="180px"></asp:TextBox>
                                    </td>
      
                                    <td style="width: 60px;">
                                        <asp:Label ID="Label3" runat="server" Text="公司类型：" Width="60px"></asp:Label>
                                    </td>
                                    <td  >
                                        <asp:RadioButtonList ID="rblIsFiliale" runat="server" RepeatDirection="Horizontal"
                                            EnableViewState="False">
                                            <asp:ListItem Value="0">公司总部</asp:ListItem>
                                            <asp:ListItem Value="1">子公司</asp:ListItem>
                                        </asp:RadioButtonList>
                                    </td>
                                </tr>
                            </table>
                            <asp:HiddenField ID="hfDeptID" runat="server" />
                            <asp:HiddenField ID="hfMode" runat="server" />
                            &nbsp;
                            <asp:Button ID="btnSave" runat="server" Text="保 存" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" Width="91px" OnClick="btnSave_Click" />
                            <asp:Button ID="btnSetAdmin" runat="server" OnClick="btnSetAdmin_Click" Text="初始化管理员" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'"
                                Visible="False" /> &nbsp;&nbsp;
                            <asp:Label ID="lblAdmin" runat="server" ForeColor="Red" Width="140px"></asp:Label></asp:Panel>
                        
                     </td>
                     </tr> 
                     <tr>   
                     <td>
                     
                        <table ><tr><td valign ="top" >
                        <asp:Panel ID="PanelJob" runat="server" GroupingText="上班时间信息" Visible="False" Width="100%">
                            <table width="250" class="fromtable">
                                <tr>
                                    <td style="width: 85px">
                                        上午上班时间
                                    </td>
                                    <td style="width: 165px">
                                        <asp:TextBox ID="txtSysStartTimeAm" runat="server" Width="59px" MaxLength="5"></asp:TextBox>
                                        (格式：08:30)
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        上午下班时间
                                    </td>
                                    <td >
                                        <asp:TextBox ID="txtSysEndTimeAm" runat="server" Width="59px" MaxLength="5"></asp:TextBox>(格式：08:30)
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        下午上班时间
                                    </td>
                                    <td >
                                        <asp:TextBox ID="txtSysStartTimePm" runat="server" Width="59px" MaxLength="5"></asp:TextBox>(格式：08:30)
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        下午下班时间
                                    </td>
                                    <td >
                                        <asp:TextBox ID="txtSysEndTimePm" runat="server" Width="59px" MaxLength="5"></asp:TextBox>(格式：08:30)
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        是否周六休息
                                    </td>
                                    <td >
                                        <asp:CheckBox ID="cbSysWeekRest0" runat="server" Text="是" />
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        是否周日休息
                                    </td>
                                    <td >
                                        <asp:CheckBox ID="cbSysWeekRest6" runat="server" Text="是" />
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        中午休息时间
                                    </td>
                                    <td >
                                        <asp:TextBox ID="txtSysDaySiesta" runat="server" Width="29px" onkeyup="javascript:permitFloat(this);"></asp:TextBox>(小时)
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        每天上班时间
                                    </td>
                                    <td >
                                        <asp:TextBox ID="txtSysTotalHours" runat="server" Width="30px" onkeyup="javascript:permitFloat(this);"></asp:TextBox>(小时)
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        考勤补卡截止日
                                    </td>
                                    <td >
                                        <asp:TextBox ID="txtCheckInEndDay" runat="server" Width="30px" onkeyup="javascript:permitInt(this);"></asp:TextBox>日，为0时无截止日期
                                    </td>
                                </tr>
                            </table>
                            <asp:Button ID="btnSaveJobTime" runat="server" OnClick="btnSaveJobTime_Click" Text="保存" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'"
                                Width="98px" />
                            <asp:Label ID="lblJobTime" runat="server" ForeColor="Red" Width="188px"></asp:Label>
                          </asp:Panel>
                      
                        </td>
                         <td valign ="top" >
                         <asp:Panel ID="PanelEmail" runat="server" GroupingText="邮件服务器" Visible="False" Width="100%">
                            <table width="250px" class="fromtable">
                                <tr>
                                    <td style="width: 60px">
                                         邮箱帐号
                                    </td>
                                    <td style="width: 165px">
                                        <asp:TextBox ID="txtPopEmail" runat="server" Width="150px" MaxLength="80" ></asp:TextBox>
                                      
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        密码
                                    </td>
                                    <td >
                                        <asp:TextBox ID="txtEmailPassword" runat="server" Width="150px" MaxLength="20" ></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        SMTP服务器 
                                    </td>
                                    <td >
                                        <asp:TextBox ID="txtPop3Server" runat="server" Width="150px" MaxLength="80"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        端口号
                                    </td>
                                    <td >
                                        <asp:TextBox ID="txtPop3Port" runat="server" Width="150px" MaxLength="10" Text ="110" ToolTip ="默认:110"></asp:TextBox>
                                    </td>
                                </tr>
     
                            </table>
                            <asp:Button ID="btnEmail" runat="server" OnClick="btnSaveJobTime_Click" Text="保存" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'"
                                Width="60px" />
                            <asp:Label ID="lblEmail" runat="server" ForeColor="Red" Width="188px"></asp:Label>
                          </asp:Panel>    
                        </td>
                        <td valign ="top" >
                         <asp:Panel ID="PanelSms" runat="server" GroupingText="短信帐号" Visible="False" Width="100%">
                            <table width="250px" class="fromtable">
                                <tr style ="display:none ">
                                    <td style="width: 85px">
                                         短信服务地址
                                    </td>
                                    <td style="width: 215px">
                                        <asp:TextBox ID="txtSMSServer" runat="server" Width="150px" MaxLength="80" ></asp:TextBox>
                                      
                                    </td>
                                </tr>
                                <tr>
                                    <td  >
                                         用户名
                                    </td>
                                    <td  >
                                        <asp:TextBox ID="txtSMSUserName" runat="server" Width="150px" MaxLength="20" ></asp:TextBox>
                                      
                                    </td>
                                </tr>                                
                                <tr>
                                    <td >
                                        密码
                                    </td>
                                    <td >
                                        <asp:TextBox ID="txtSMSPassword" runat="server" Width="150px" MaxLength="20"  ></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        短信单价 
                                    </td>
                                    <td >
                                        <asp:TextBox ID="txtSMSPrice" runat="server" Width="150px"   SkinID="txtBoxRedonly" ReadOnly ="true"  onkeyup="javascript:permitFloat(this);"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        传真单价
                                    </td>
                                    <td >
                                        <asp:TextBox ID="txtFAXPrice" runat="server" Width="150px" MaxLength="10"   SkinID="txtBoxRedonly" ReadOnly ="true"   onkeyup="javascript:permitFloat(this);"></asp:TextBox>
                                    </td>
                                </tr>
                                     <tr>
                                    <td >
                                        短信余额
                                    </td>
                                    <td >
                                        <asp:TextBox ID="txtSmsBalance" runat="server" Width="150px" MaxLength="10" SkinID="txtBoxRedonly" ReadOnly ="true"    onkeyup="javascript:permitFloat(this);"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                            <asp:Button ID="btnSms" runat="server" OnClick="btnSaveJobTime_Click" Text="保存" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'"
                                Width="98px" />
                            <asp:Label ID="lblSms" runat="server" ForeColor="Red" Width="188px"></asp:Label>
                          </asp:Panel>    
                      
                        </td></tr></table>
                    </td>
                </tr>

            </table>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
