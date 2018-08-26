<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.QA.q.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    <script>
        function SelectExpert(){
            var ObjAssignID = "<%=txtExpert.ClientID %>";
            var ObjhfAssignID = "<%=hfExpert.ClientID %>";
            var Flag = "1";
            var url = "../../common/SelectExpert.aspx?ObjID=" + ObjAssignID + "&ObjhfID=" + ObjhfAssignID + "&Flag=" + Flag;
            ShowIframe('专家选择', url, '720', '600');
        }
        function firm(id) {
            console.log(id);
            if (confirm("你确定要删除吗？")) {
                $.ajax({
                    url: '../provide/helper.ashx',
                    type: 'get',
                    dataType:'JSON',
                    data: {id: id},
                    success: function () {
                        $("#c" + id).remove();
                    }
                })
            }
            else {
            }
        }  
    </script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="群信息">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <style>
                    .td{ width:80px;}
                </style>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td  ><strong><%=HtmlTitle %></strong> </td>
                    </tr>
                    <%=HtmlDetails%>
                    <tr >
                        <td >
                            <div style="margin-top:30px;">
                                <asp:TextBox  ID="txtExpert" runat="server"></asp:TextBox>
                                <input id="btnExpert" onclick="SelectExpert()" type="button" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" value="选择专家"   />
                            </div>
                            <div style="margin-top:10px;">
                                <asp:TextBox ID="txtComment" TextMode="MultiLine" Rows="3" Width="99%" style="width:100%;" runat="server"></asp:TextBox>
                            </div>
                            <div>
                                <asp:Button ID="btnReplay" Text="回复" class="btn"  
                                    onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" 
                                    runat="server" onclick="btnReplay_Click" />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <asp:CheckBox ID="cbMessage"  runat="server" />是否信息提醒
                            </div>
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
            <asp:HiddenField ID="hfExpert" runat="server" />
            <asp:HiddenField ID="hfOpenId" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
