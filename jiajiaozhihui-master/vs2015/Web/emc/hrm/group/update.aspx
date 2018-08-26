<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.hrm.group.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script language="javascript" src="/js/emccommon.js"  charset="gb2312"></script>
<script >
function opengroup() {
var ObjDept = document.getElementById("<%= hfDeptID.ClientID %>");
var DeptID=ObjDept.value;
  // window.open('changegroup.aspx?DeptID='+DeptID,'','width=400 height=300 left=300 top=200');
ShowIframe('部门调整', 'changegroup.aspx?DeptID=' + DeptID, '600', '350')
}
function SelectJoinMans() {
    var ObjAssignID = "<%=txtManagerName.ClientID %>";
    var ObjhfAssignID = "<%=hfManagerID.ClientID %>";
    var Flag = "1";
    var url = "../../common/SelectSingle.aspx?ObjID=" + ObjAssignID + "&ObjhfID=" + ObjhfAssignID + "&Flag=" + Flag;
    //    window.open(url, "", "width=760 height=420 left=100 top=100");
    ShowIframe('人员选择', url, '720', '600');

}
function SelectJoinMans1() {
    var ObjAssignID = "<%=txtAuditName.ClientID %>";
    var ObjhfAssignID = "<%=hfAuditID.ClientID %>";
    var Flag = "1";
    var url = "../../common/SelectSingle.aspx?ObjID=" + ObjAssignID + "&ObjhfID=" + ObjhfAssignID + "&Flag=" + Flag;
    //    window.open(url, "", "width=760 height=420 left=100 top=100");
    ShowIframe('人员选择', url, '720', '600');

}
</script>
     <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="部门信息"  >
            <table
        border="0" cellpadding="0" cellspacing="0" style="height:500px" width="100%" class="fromtable">
                <tr>
                    <td align="right" height="25" style="width: 20%">
                        上级部门：</td>
                    <td align="left" height="25" width="*">
                        <asp:Label ID="LblParentDept" runat="server" Width="309px"></asp:Label>
                        </td>
                </tr>
        <tr>
            <td align="right" height="25" style="width: 20%">
                部门编码：</td>
            <td align="left" height="25" width="*">
                <asp:TextBox ID="txtDeptNo" runat="server" ReadOnly="True" SkinID="txtBoxRedonly" Width="150px" Visible="False"></asp:TextBox>
                <asp:DropDownList ID="DeptIDDropDownList" runat="server" >
                </asp:DropDownList></td>
        </tr>
        <tr>
            <td align="right" height="25" style="width: 20%">
                部门名称：</td>
            <td align="left" height="25" width="*">
                <asp:TextBox ID="txtDeptName" runat="server" Width="311px"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td align="right" height="25" style="width: 20%">
                部门名称(英文)：</td>
            <td align="left" height="25" width="*">
                <asp:TextBox ID="txtDeptName_e" runat="server" Width="312px"></asp:TextBox></td>
        </tr>
        <tr>
            <td align="right" style="width: 20%; height: 25px">
                部门经理&nbsp;：</td>
            <td align="left" width="*" style="height: 25px">
            <asp:TextBox ID="txtManagerName" runat="server" onchange="return false" Rows="2" ReadOnly="true"  SkinID="txtBoxRedonly"></asp:TextBox>
                        <img id="IMG1" alt="人员选择" height="18" onclick="SelectJoinMans()" src="../../../images/ICON/select.png"
                            style="cursor: hand" width="50" /><asp:HiddenField ID="hfJoinMansID"
                                runat="server" />
            </td>
        </tr>
                <tr>
                    <td align="right" style="width: 20%; height: 25px">
                        部门审批人 ：</td>
                    <td align="left" width="*" style="height: 25px">
                      <asp:TextBox ID="txtAuditName" runat="server" onchange="return false" Rows="2" ReadOnly="true"  SkinID="txtBoxRedonly"></asp:TextBox>
                        <img id="IMG2" alt="人员选择" height="18" onclick="SelectJoinMans1()" src="../../../images/ICON/select.png"
                            style="cursor: hand" width="50" /><asp:HiddenField ID="hfJoinMansID1"
                                runat="server" />
                    </td>
                </tr>
        <tr style ="display :none">
            <td align="right" height="25" style="width: 20%">
                上级部门：</td>
            <td align="left" height="25" width="*">

               <asp:TextBox ID="txtParentAuditName" runat="server" onchange="return false" Rows="2" ReadOnly="true"  SkinID="txtBoxRedonly"></asp:TextBox>
                <%--        <img id="IMG3" alt="人员选择" height="18" onclick="SelectJoinMans()" src="../../../images/ICON/select.png"
                            style="cursor: hand" width="50" /><asp:HiddenField ID="hfJoinMansID2"
                                runat="server" />--%>
                                </td>
        </tr>
                <tr>
                    <td align="right" style="width: 20%; height: 25px">
                        公司类型：</td>
                    <td align="left" style="height: 25px" width="*">
                        <asp:Label ID="LblFiliale" runat="server" Width="206px"></asp:Label></td>
                </tr>
        <tr>
            <td align="right" style="height: 25px; width: 20%;">
                联系信息：</td>
            <td align="left" style="height: 25px" width="*">
                <asp:TextBox ID="txtContactInfo" runat="server" Rows="3" TextMode="MultiLine" Height="57px" Width="312px"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td colspan="2" height="25">
                <div align="center">
                    <asp:HiddenField ID="hfAuditID" runat="server" /><asp:HiddenField ID="hfParentID" runat="server" Visible="False" />
                    <asp:HiddenField ID="State" runat="server" />
                    <asp:HiddenField ID="hfParentAuditID" runat="server" />
                    <asp:HiddenField ID="hfManagerID" runat="server" /><asp:HiddenField ID="hfDeptID" runat="server" />
                    <asp:HiddenField ID="hfIsFiliale" runat="server" />
                    <asp:Label ID="LblMessage" runat="server" ForeColor="Red" Width="130px"></asp:Label></div>
            </td>
        </tr>
    </table>
        </cc1:TabOptionItem>
        <cc1:TabOptionItem ID="TabOItem1" runat="server" Tab_Name="部门员工">
    
             <asp:SmartGridView ID="HrGV" runat="server" AllowPaging="True" AutoGenerateColumns="False"   Width="98%" 
                OnPageIndexChanging="HrGV_PageIndexChanging" DataKeyNames="ID" MouseOverCssClass="OverRow" SkinID="sgv2" PageSize="10">
                <Columns>
                    <asp:BoundField DataField="UserName" HeaderText="用户名" />
                    <asp:BoundField DataField="CnName" SortExpression="CnName" HeaderText="姓名"></asp:BoundField>
                    <asp:BoundField DataField="DeptName" SortExpression="DeptName" HeaderText="部门"></asp:BoundField>
                    <asp:BoundField DataField="Positions" SortExpression="Positions" HeaderText="职位"></asp:BoundField>
                    <asp:BoundField DataField="Email" SortExpression="Email" HeaderText="Email"></asp:BoundField>
                    <asp:BoundField DataField="Tel" SortExpression="Tel" HeaderText="电话"></asp:BoundField>
                    <asp:BoundField DataField="Mobile" SortExpression="Mobile" HeaderText="移动电话"></asp:BoundField>
                </Columns>
                <PagerSettings Position="Top"/>
                <HeaderStyle CssClass="Freezing" />
            </asp:SmartGridView>
 
        </cc1:TabOptionItem>        
       
    </cc1:TabOptionWebControls><!--******************************修改页面代码********************************-->
</asp:Content>
