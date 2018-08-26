<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true" CodeBehind="message.aspx.cs" Inherits="SfSoft.web.emc.message" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
<cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="系统提醒">
       <table width="96%" border="0" height="300" cellpadding="0" cellspacing="0">
          <tr> 
            <td valign="top" align="center"> 
              <table width="322" border="0" cellpadding="0" cellspacing="0" height="188"  bordercolorlight="#C9DCF3" bordercolordark="#C9DCF3" background="../images/s_back.gif" >
                <tr bgcolor="#C9DCF3"> 
                  <td width="3" align="center" valign="top" height="3"></td>
                  <td width="134" align="center" valign="top" height="3" colspan="3"></td>
                  <td height="3" align="center" valign="top" width="3"></td>
                </tr>
                <tr> 
                  <td width="3" align="center" valign="top" bgcolor="#C9DCF3"></td>
                  <td width="176" align="center" valign="top" height="182"> 
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" height="182">
                      <tr> 
                        <td width="12"><img src="../images/none.gif" width="12" height="10"></td>
                        <td height="57" width="164"><font size="4" face="楷体_GB2312"></font></td>
                      </tr>
                      <tr> 
                        <td width="12" height="10"><img src="../images/none.gif" width="12" height="10"></td>
                        <td height="10"><img src="../images/none.gif" width="164" height="9"></td>
                      </tr>
                      <tr> 
                        <td width="12" height="80">&nbsp;</td>
                        <td height="100" valign="top"> 
                          <p><%=msg %></p>
                        </td>
                      </tr>
                      <tr> 
                        <td width="12" height="15"></td>
                        <td height="15"></td>
                      </tr>
                    </table>
                  </td>
                  <td width="10" align="center" valign="top" height="182"><img src="../images/none.gif" width="10" height="10"></td>
                  <td width="130" align="right" valign="bottom" height="182"><img src="../images/s_boy.gif" width="130" height="182"></td>
                  <td width="3" align="center" valign="top" bgcolor="#C9DCF3"></td>
                </tr>
                <tr bgcolor="#C9DCF3"> 
                  <td width="3" align="center" valign="top" height="3"></td>
                  <td width="134" align="center" valign="top" height="3" colspan="3"></td>
                  <td width="3" align="center" valign="top" height="3"></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
</cc1:TabOptionItem>
</cc1:TabOptionWebControls>
</asp:Content>

