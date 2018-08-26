<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/MasterPage/PageTemplate.Master" CodeBehind="SelectProduct.aspx.cs" Inherits="SfSoft.web.emc.common.SelectProduct" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOption1" runat="server">
        <cc1:TabOptionItem ID="Tab1" runat="server" Tab_Name="选择产品">
            <asp:Panel ID="Panel2" runat="server" Height="410px" Width="100%" ScrollBars="Auto">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>
                            <button type="button" id="btnOk" class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'"  >确认</button>
                        </td>
                    </tr>
                </table>
                <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="ID" MouseOverCssClass="OverRow" SkinID="sgv1" >
                    <Columns>
                        <asp:TemplateField ItemStyle-Width="20px">
                            <HeaderTemplate>
                                <asp:CheckBox ID="all" runat="server" />
                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:CheckBox ID="item" name="item" runat="server" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="ID" HeaderText="编号" ReadOnly="true" />
                        <asp:BoundField DataField="GoodName" HeaderText="产品" ReadOnly="true" />
                    </Columns>
                    <CascadeCheckboxes>
                        <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                    </CascadeCheckboxes>
                    <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                </asp:SmartGridView>
            </asp:Panel>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:HiddenField ID="hfIDBags" runat="server" />
    <script src="../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script>
        $(function () {
            var idbags = "<%=hfIDBags.ClientID %>";
            var grid = "<%=GridView1.ClientID %>";
            $("#btnOk").click(function () {
                var ids = "";
                var data = $("#" + grid + " tr:gt(0)");
                $.each(data, function (index, context) {
                    var ele = data.find("td");
                    var checkbox = ele.find("span input");
                    if (checkbox.attr("checked")) {
                        ids += ele.eq(1).text() + ",";
                    }
                });
                alert(ids);
                var id = $("#" + idbags).val();
                $("#" + id, parent).val(ids);
                console.log($("#" + id, parent).val());
                alert("ok");
            });
        })
    </script>
</asp:Content>

