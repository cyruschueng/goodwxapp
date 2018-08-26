<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/MasterPage/PageTemplate.Master"  CodeBehind="Like.aspx.cs" Inherits="SfSoft.web.emc.common.Like" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true" />
    <asp:Panel ID="Panel1" runat="server" GroupingText="点赞" Height="130px" Width="100%">
        <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
            <tr>
                <td>最大点赞数</td>
                <td><asp:TextBox ID="txtLikeNumber" TextMode="Number" runat="server"></asp:TextBox> </td>
            </tr>
            <tr>
                <td>开始日期</td>
                <td><asp:TextBox ID="txtStartDate" onFocus="WdatePicker({isShowClear:true,readOnly:true})" runat="server"></asp:TextBox> </td>
            </tr>
            <tr>
                <td>结束日期</td>
                <td><asp:TextBox ID="txtEndDate" onFocus="WdatePicker({isShowClear:true,readOnly:true})" runat="server"></asp:TextBox> </td>
            </tr>
            <tr>
                <td colspan="2"></td>
            </tr>
            <tr>
                <td colspan="2" style=" text-align:center;">
                    <asp:Button ID="btnLike" runat="server" Text="点赞" class="btn" OnClientClick=" return checkLike();" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" OnClick="btnLike_Click" />
                </td>
            </tr>
        </table>
    </asp:Panel>
    <script src="../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script>
        function checkLike() {
            var $likeNumber = $("#<%=txtLikeNumber.ClientID %>");
            var $startDate = $("#<%=txtStartDate.ClientID %>");
            var $endDate = $("#<%=txtEndDate.ClientID %>");
            var result = "";
            if ($likeNumber.val()=="" || isNaN($likeNumber.val()) || parseInt($likeNumber.val()) < 1) {
                result += "最大点赞数不能为空，要是数字，且不能小于1 \n";
            }
            if ($startDate.val() == "") {
                result += "开始日期不能为空 \n";
            }
            if ($endDate.val() == "") {
                result += "结束日期不能为空 \n";
            }
            if (result != "") {
                alert(result);
                return false;
            }
            return true;
        }
    </script>
</asp:Content>
