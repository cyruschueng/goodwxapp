<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.sm.msg.update" %>


<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server" SelectIndex="0" TabImagesPath="../../../images/Menu/">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="保障卡信息" Tab_Visible="True">
            <table border="0" cellpadding="1" cellspacing="0" width="100%" class="fromtable">
              <tr>
                    <td align="right" style="width: 15%; height: 25px" class="formlbl">
                        帐号参数名</td>
                    <td style="width: 35%; height: 25px"  >
                        <asp:TextBox ID="txtplname" runat="server" MaxLength="200" Width="176px"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server" ForeColor="Red" Text="*"></asp:Label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:CheckBox ID="cbxdefault" runat="server" Text="默认接口" />
                        &nbsp;<asp:CheckBox ID="cbxlist" runat="server" Text="手机号码列表" />
                       </td> 
                       <td>帐号参数值</td>
                       <td><asp:TextBox ID="txtvlname" runat="server" MaxLength="100" Width="176px" 
                              ></asp:TextBox>
                           <asp:Label ID="Label10" runat="server" ForeColor="Red" Text="*"></asp:Label>
                       </td>
                </tr>
                   <tr>
                    <td align="right" style="width: 15%; height: 25px" class="formlbl">
                        密码参数名</td>
                    <td style="width: 35%; height: 25px"  >
                        <asp:TextBox ID="txtppwd" runat="server" MaxLength="50" Width="176px"></asp:TextBox>
                        <asp:Label ID="Label6" runat="server" ForeColor="Red" Text="*"></asp:Label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       </td>                        
                       <td>密码参数值</td>
                       <td><asp:TextBox ID="txtvpwd" runat="server" MaxLength="100" Width="176px" 
                              ></asp:TextBox>
                           <asp:Label ID="Label11" runat="server" ForeColor="Red" Text="*"></asp:Label>
                       </td>
                </tr>
                 <tr>
                         <td align="right" height="25" style="width: 15%" class="formlbl">
                        内容参数名</td>
                    <td height="25" style="width: 35%">
                        <asp:TextBox ID="txtpcontent" runat="server" MaxLength="100"  
                              Width="176px"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server" ForeColor="Red" Text="*"></asp:Label>
                    </td>
                 
                       <td align="right" height="25" style="width: 15%" class="formlbl">
                           短信长度</td>
                    <td align="left" height="25" width="*"> 
                        <asp:TextBox ID="txtlength" runat="server" MaxLength="100" Width="176px" 
                              >70</asp:TextBox>
                        <asp:Label ID="Label12" runat="server" ForeColor="Red" Text="*"></asp:Label>
                    </td>
                
                </tr> 
                 <tr>
                    <td align="right" height="25" style="width: 15%" class="formlbl">
                        手机参数名</td>
                    <td height="25" style="width: 35%">
                        <asp:TextBox ID="txtptel" runat="server" MaxLength="100"  
                              Width="176px"></asp:TextBox>
                        <asp:Label ID="Label14" runat="server" ForeColor="Red" Text="*"></asp:Label>
                    </td>
                        <td align="right" height="25" style="width: 15%" class="formlbl">
                        最大发送量</td>
                    <td align="left" height="25" width="*">
                        <asp:TextBox ID="txtmaxcnt" runat="server" MaxLength="100" Width="176px" 
                              >100</asp:TextBox>
                        <asp:Label ID="Label13" runat="server" ForeColor="Red" Text="*"></asp:Label>
                    </td>
                </tr> 
                <tr><td align="right" height="25" style="width: 15%" class="formlbl">
                        企业id参数名</td>
               
                    <td height="25" style="width: 35%">
                        <asp:TextBox ID="txtpid" runat="server" MaxLength="100" Width="176px" 
                              ></asp:TextBox>
                    </td> 
                       <td>企业id参数值</td>
                       <td><asp:TextBox ID="txtvid" runat="server" MaxLength="100" Width="176px" 
                              ></asp:TextBox></td>
                </tr> 
                <tr>
                    <td align="right" style="width: 15%; height: 25px" class="formlbl" >
                        发送请求地址</td>
                    <td style="width: 35%; height: 25px" >
                        <asp:TextBox ID="txtsendurl" runat="server" MaxLength="200" Height="60px"  Width="378px" TextMode="MultiLine" ></asp:TextBox>
                        <asp:Label ID="Label1" runat="server" ForeColor="Red" Text="*"></asp:Label>
                    </td> 
                    <td>发送备注</td>
                    <td> 
                        <asp:TextBox ID="txtsendmark" runat="server" MaxLength="200" Height="60px" Width="378px"  TextMode="MultiLine" ></asp:TextBox>
                    </td>
                </tr>
                  <tr>
                    <td align="right" style="width: 15%; height: 25px" class="formlbl">
                        密码请求地址</td>
                    <td style="width: 35%; height: 25px"  >
                        <asp:TextBox ID="txtpwdurl" runat="server" MaxLength="200" Width="378px" Height="60px" TextMode="MultiLine" ></asp:TextBox>
                        <asp:Label ID="Label8" runat="server" ForeColor="Red" Text="*"></asp:Label>
                      </td> 
                    <td>密码备注</td>
                    <td> 
                        <asp:TextBox ID="txtpwdmark" runat="server" MaxLength="200" Width="378px" Height="60px"  TextMode="MultiLine" ></asp:TextBox>
                      </td>
                </tr>
                    <tr>
                    <td align="right" style="width: 15%; height: 25px" class="formlbl">
                        余额请求地址</td>
                    <td style="width: 35%; height: 25px" >
                        <asp:TextBox ID="txtblaurl" runat="server" MaxLength="200" Width="378px" Height="60px"  TextMode="MultiLine" ></asp:TextBox>
                        <asp:Label ID="Label9" runat="server" ForeColor="Red" Text="*"></asp:Label>
                        </td> 
                    <td>余额备注</td>
                    <td> 
                        <asp:TextBox ID="txtblamark" runat="server" MaxLength="200" Width="378px" Height="60px"  TextMode="MultiLine" ></asp:TextBox>
                        </td>
                </tr>
                <tr>
                       <td>通道连接状态地址</td><td>
                       <asp:TextBox ID="txtreturnmark" runat="server" MaxLength="200" Width="378px"  Height="60px" TextMode="MultiLine" ></asp:TextBox>
                       </td>
                       <td>状态值说明</td><td>
                       <asp:TextBox ID="txtstatusmark" runat="server" MaxLength="200" Width="378px" Height="60px"  TextMode="MultiLine" ></asp:TextBox>
                       </td></tr>
                 
               
                 
                </table>
                
                <table class="fromtable1">
                <tr>
                    <td colspan="4" height="25">
                        <div align="center">
                            <asp:HiddenField ID="hfMode" runat="server" /> 
                            <asp:HiddenField ID="hfID" runat="server" /> 
                          </div>
                    </td>
                </tr>
            </table>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
