<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" EnableEventValidation = "false"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.activity.publicgoodsorder.browse" Title="无标题页" %>  
    

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="公益品">
            <style>
                .fromtable select {width:95%}
            </style>
            <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
            <script>
                $(function () {
                    $("#<%=btnSend.ClientID %>").click(function () {
                        var time = $("#<%=txtDate.ClientID %>").val();
                        if (time == "") {
                            alert("请选择日期");
                            return false;
                        }
                    });
                    $("#<%=btnVoid.ClientID %>").click(function () {
                        var time = $("#<%=txtDate.ClientID %>").val();
                        if (time == "") {
                            alert("请选择日期");
                            return false;
                        }
                    });
                    $("#<%=btnWebPrint.ClientID %>").click(function () {
                        var goodid = $("#<%=txtGoodsName.ClientID %>").val();
                        var issend = $("#<%=ddlIsSend.ClientID %>").val();
                        var senddate = $("#<%=txtSendDate.ClientID %>").val();
                        var name = $("#<%=txtName.ClientID %>").val();
                        var tel = $("#<%=txtTelephone.ClientID %>").val();
                        var province = $("#<%=ddlProvince.ClientID %>").val();
                        var city = $("#<%=ddlCity.ClientID %>").val();
                        var orderdate = $("#<%=txtOrderDate.ClientID %>").val();

                        window.open("webreport.aspx?goodid="+goodid+"&issend="+issend+"&senddate="+senddate+"&name="+name+"&tel="+tel+"&province="+province+"&city="+city+"&orderdate="+orderdate);
                    });
                    

                    $("#<%=btnFinancePrint.ClientID %>").click(function () {
                        var goodid = $("#<%=txtGoodsName.ClientID %>").val();
                        var issend = $("#<%=ddlIsSend.ClientID %>").val();
                        var senddate = $("#<%=txtSendDate.ClientID %>").val();
                        var name = $("#<%=txtName.ClientID %>").val();
                        var tel = $("#<%=txtTelephone.ClientID %>").val();
                        var province = $("#<%=ddlProvince.ClientID %>").val();
                        var city = $("#<%=ddlCity.ClientID %>").val();
                        var orderdate = $("#<%=txtOrderDate.ClientID %>").val();

                        window.open("financereport.aspx?goodid=" + goodid + "&issend=" + issend + "&senddate=" + senddate + "&name=" + name + "&tel=" + tel + "&province=" + province + "&city=" + city + "&orderdate=" + orderdate);
                    });
                })
            </script>
            <table class="fromtable">
                <tr style=" display:none;">
                    <td style="width:10%"></td>
                    <td style="width:15%"></td>
                    <td style="width:10%"></td>
                    <td style="width:15%"></td>
                    <td style="width:10%"></td>
                    <td style="width:15%"></td>
                    <td style="width:10%"></td>
                    <td style="width:15%"></td>
                </tr>
                <tr>
                    <td >公益品名称：</td>
                    <td colspan="3">
                        <asp:TextBox ID="txtGoodsName" runat="server" Width="95%"></asp:TextBox>
                    </td>
                    <td >是否已发货：</td>
                    <td>
                        <asp:DropDownList ID="ddlIsSend" runat="server" CssClass=".select" >
                            <asp:ListItem Value="1" Text="已发送"></asp:ListItem>
                            <asp:ListItem Value="0" Text="未发送" Selected="True"></asp:ListItem>
                            <asp:ListItem Value="-1" Text="无效" ></asp:ListItem>
                            <asp:ListItem Value=""  Text="所有"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td >发货日期</td>
                    <td ><asp:CalendarTextBox ID="txtSendDate" runat="server" Width="95%"></asp:CalendarTextBox></td>
                </tr>
                <tr>
                    <td >订购人</td>
                    <td ><asp:TextBox ID="txtName" runat="server" Width="95%"></asp:TextBox></td>
                    <td >联系电话</td>
                    <td ><asp:TextBox ID="txtTelephone" runat="server" Width="95%"></asp:TextBox></td>
                    <td >省份</td>
                    <td><asp:DropDownList ID="ddlProvince" AutoPostBack="true" runat="server" 
                            onselectedindexchanged="ddlProvince_SelectedIndexChanged"></asp:DropDownList></td>
                    <td >市</td>
                    <td><asp:DropDownList ID="ddlCity" runat="server"></asp:DropDownList></td>
                </tr>
                
                <tr>
                    <td >订购日期</td>
                    <td ><asp:CalendarTextBox ID="txtOrderDate" runat="server" Width="95%"></asp:CalendarTextBox></td>
                    <td >支付方式</td>
                    <td ><asp:DropDownList ID="ddlPaymode" runat="server"></asp:DropDownList></td>
                    <td colspan="4" >
                        <asp:Button ID="btnSearch" runat="server" class="btn" 
                            onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" 
                            Text="查询" onclick="btnSearch_Click"  />&nbsp;&nbsp;

                            <asp:CalendarTextBox ID="txtDate" runat="server"  Width="150px"></asp:CalendarTextBox>
                            &nbsp;&nbsp;
                            <asp:Button ID="btnSend" runat="server" class="btn" 
                            onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" 
                            Text="标记已发货" onclick="btnSend_Click"   />&nbsp;&nbsp;

                            <asp:Button ID="btnVoid" runat="server" class="btn" 
                            onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" 
                            Text="标记无效" onclick="btnVoid_Click"    />&nbsp;&nbsp;

                            <asp:Button ID="btnWebPrint" runat="server" class="btn"   target="_blank"
                                 onmouseout="this.className='btn'" 
                                onmouseover="this.className='btn_mouseover'" Text="Web打印" onclick="btnWebPrint_Click" 
                             />
                             &nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:Button ID="btnFinancePrint" runat="server" class="btn"   target="_blank"
                                 onmouseout="this.className='btn'" 
                                onmouseover="this.className='btn_mouseover'" Text="财务打印" onclick="btnFinancePrint_Click" 
                             />
                             &nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:Button ID="btn_export" runat="server" class="btn" 
                                OnClick="btn_export_Click" onmouseout="this.className='btn'" 
                                onmouseover="this.className='btn_mouseover'" Text="导出" />
                    </td>
                </tr>
             </table>
            <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                Width="99%"  DataKeyNames="ID"
                 OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                SkinID="sgv1" onrowcancelingedit="GridView1_RowCancelingEdit" 
                onrowediting="GridView1_RowEditing" onrowupdating="GridView1_RowUpdating">
                <Columns>
                    <asp:TemplateField ItemStyle-Width="20px">
                        <HeaderTemplate>
                            <asp:CheckBox ID="all" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="item" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="ID" HeaderText="编号" ReadOnly="true" ItemStyle-Width="30px" />
                    <asp:BoundField DataField="goodname" HeaderText="产品名称" ReadOnly="true" ItemStyle-Width="150px" />
                    <asp:BoundField DataField="Name" HeaderText="订购人" ReadOnly="true" ItemStyle-Width="80px" />
                    <asp:BoundField DataField="TelePhone" HeaderText="联系电话" ReadOnly="true" ItemStyle-Width="100px" />
                    <asp:BoundField DataField="PayNumber" HeaderText="订购数量" ReadOnly="true" ItemStyle-Width="60px" />
                    <asp:BoundField DataField="provincename" HeaderText="省" ReadOnly="true"  ItemStyle-Width="80px" />
                    <asp:BoundField DataField="cityname" HeaderText="市" ReadOnly="true"  ItemStyle-Width="80px" />
                    <asp:BoundField DataField="Address" HeaderText="详细地址" ReadOnly="true"  ItemStyle-Width="300px" />
                    <asp:TemplateField HeaderText="邮寄方式" ItemStyle-Width="80px">
                        <ItemTemplate>
                            <%# Eval("PostName")%>
                        </ItemTemplate>
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Center" />
                        <EditItemTemplate>
                            <asp:Label ID="lblPost" runat="server" Text='<%# Eval("Post")%>' Style="display: none;"></asp:Label>
                            <asp:DropDownList ID="ddlPost" runat="server" Width="65px">
                            </asp:DropDownList>
                        </EditItemTemplate>
                    </asp:TemplateField>

                    <asp:TemplateField HeaderText="物流公司" ItemStyle-Width="100px">
                        <ItemTemplate>
                            <%# Eval("LogisticsName")%>
                        </ItemTemplate>
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Center" />
                        <EditItemTemplate>
                            <asp:Label ID="lblLogistics" runat="server" Text='<%# Eval("Logistics")%>' Style="display: none;"></asp:Label>
                            <asp:DropDownList ID="ddlLogistics" runat="server" Width="65px">
                            </asp:DropDownList>
                        </EditItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="物流单号" ItemStyle-Width="120px">
                        <ItemTemplate>
                            <%# Eval("OddNumber")%>
                        </ItemTemplate>
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Center" />
                        <EditItemTemplate>
                            <asp:TextBox  ID="txtOddNumber" runat="server" Text='<%# Eval("OddNumber")%>' ></asp:TextBox>
                        </EditItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="代货款" ItemStyle-Width="100px">
                        <ItemTemplate> 
                            <%# Eval("Payment")%>
                        </ItemTemplate>
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Center" />
                        <EditItemTemplate>
                            <asp:TextBox ID="txtPayment" runat="server" Text='<%# Eval("Payment")%>' ></asp:TextBox>
                        </EditItemTemplate>
                    </asp:TemplateField>

                    <asp:BoundField DataField="Remark" HeaderText="备注" ItemStyle-Width="60px" ReadOnly="true" />

                    <asp:BoundField DataField="OrderDate" HeaderText="订购日期" DataFormatString="{0:yyyy-MM-dd}" ReadOnly="true" ItemStyle-Width="100px" />

                    <asp:CommandField ShowEditButton="True" HeaderText="操作" EditText="编辑" >
                            <ItemStyle Width="70px" HorizontalAlign="Center" />
                            <HeaderStyle  HorizontalAlign="Center"/>
                    </asp:CommandField>
                </Columns>
                <CascadeCheckboxes>
                    <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                </CascadeCheckboxes>
                <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                <PagerSettings Position="Bottom"></PagerSettings>
            </asp:SmartGridView>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
</asp:Content>
