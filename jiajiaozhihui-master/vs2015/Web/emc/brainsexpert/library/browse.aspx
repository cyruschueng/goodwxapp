<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.brainsexpert.library.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <link href="../css/style.css" rel="stylesheet" type="text/css" />
    <script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
    

<div>
    <!--题库-->
    <div class="tree_content">
        <div >
            <style>
                table select{ width:100px;}
            </style>
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                   <tr>
                        <td style="width:300px;" >
                            <asp:DropDownList ID="ddlClass1" AutoPostBack="true" runat="server"  CssClass="questionclass"
                                onselectedindexchanged="ddlClass1_SelectedIndexChanged"></asp:DropDownList>
                            &nbsp;&nbsp;&nbsp;
                            <asp:DropDownList ID="ddlClass2" AutoPostBack="true" runat="server"  CssClass="questionclass"
                                onselectedindexchanged="ddlClass2_SelectedIndexChanged"></asp:DropDownList>
                          </td>
                          <td style="width:250px;">
                            <asp:CheckBoxList ID="cblType" RepeatDirection="Horizontal" AutoPostBack="true" 
                                runat="server" onselectedindexchanged="cblType_SelectedIndexChanged"></asp:CheckBoxList>

                          </td>
                          <td style="width:250px;">
                            <asp:CheckBoxList ID="cblGrade" RepeatDirection="Horizontal" AutoPostBack="true" 
                                  runat="server" onselectedindexchanged="cblGrade_SelectedIndexChanged" >
                                <asp:ListItem Text="易" Value="1"></asp:ListItem>
                                <asp:ListItem Text="中" Value="2"></asp:ListItem>
                                <asp:ListItem Text="难" Value="3"></asp:ListItem>
                            </asp:CheckBoxList>
                          </td>
                          <td colspan="2">  
                          <asp:FileUpload ID="FileUpload1" runat="server" style=" float:left;" />
                          <asp:CheckBoxList ID="cblAll" RepeatDirection="Horizontal" style=" float:left;" runat="server" >
                                <asp:ListItem Text="重新导入" Value="1"></asp:ListItem>
                                <asp:ListItem Text="追加导入" Value="2"></asp:ListItem>
                            </asp:CheckBoxList>
                            
                            <asp:Button ID="btnInport" runat="server" Text="导入"  onclick="btnInport_Click" class="btn" style=" display:inline-table" />
                        </td>
                    </tr>
                </table>
        </div>
        <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
            <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="公益品">
                <asp:Panel ID="Panel1" GroupingText="题库" runat="server">
                    <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                        Width="99%"  DataKeyNames="ID" MouseOverCssClass="OverRow"  SkinID="sgv1" 
                        onrowdatabound="GridView1_RowDataBound" >
                        <Columns>
                            <asp:TemplateField ItemStyle-Width="20px" HeaderStyle-Width="20px">
                                <HeaderTemplate>
                                    <asp:CheckBox ID="all" runat="server" />
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:CheckBox ID="item" runat="server" />
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:BoundField DataField="ID" HeaderText="编号" ReadOnly="true" ItemStyle-Width="50px" HeaderStyle-Width="50px" />
                            <asp:TemplateField HeaderText="试题" ItemStyle-Width="300px" HeaderStyle-Width="300px" HeaderStyle-HorizontalAlign="Center" >
                                <ItemTemplate>
                                    <a href='update.aspx?ID=<%# Eval("ID") %>&mode=update'><font color=#2828FF><%# Eval("TestQuestion")%></font></a>
                                    <asp:Image ID="imgShow" ImageUrl='<%# Eval("AccessoryUrl") %>' style=" width:16px; height:16px;" runat="server" />
                                    <asp:HiddenField ID="hfType" Value='<%# Eval("QuestionType") %>' runat="server" />
                                </ItemTemplate>
                            </asp:TemplateField>

                            <asp:TemplateField HeaderText="答案"  HeaderStyle-HorizontalAlign="Center" ItemStyle-CssClass="" >
                                <ItemTemplate>
                                    <label title="<%# "A："+ Eval("Answer1").ToString().Replace("/a","") +" B："+ Eval("Answer2").ToString().Replace("/b","") +" C："+ Eval("Answer3").ToString().Replace("/c","") +" D："+ Eval("Answer4").ToString().Replace("/d","") %>"><%# "A：" + Eval("Answer1").ToString().Replace("/a", "") + " B：" + Eval("Answer2").ToString().Replace("/b", "") + " C：" + Eval("Answer3").ToString().Replace("/c", "") + " D：" + Eval("Answer4").ToString().Replace("/d", "")%></label>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:BoundField DataField="RightAnswer" HeaderText="正确答案"  ReadOnly="true" ItemStyle-Width="80px" HeaderStyle-Width="80px" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center" />

                            <asp:BoundField DataField="QuestionType" HeaderText="题库类型"  ReadOnly="true" ItemStyle-Width="100px" HeaderStyle-Width="100px" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center"  />
                            <asp:BoundField DataField="ClassID" HeaderText="题库分类"  ReadOnly="true" ItemStyle-Width="120px" HeaderStyle-Width="120px" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center"  />
                            <asp:BoundField DataField="Grade" HeaderText="易中难"  ReadOnly="true" ItemStyle-Width="120px" HeaderStyle-Width="120px" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center"  />
                            <asp:BoundField DataField="CreateDate" HeaderText="创建日期" DataFormatString="{0:yyyy-MM-dd}" ReadOnly="true" ItemStyle-Width="100px" HeaderStyle-Width="100px" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center"  />
                            
                        </Columns>
                        <CascadeCheckboxes>
                            <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                        </CascadeCheckboxes>
                        <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                        <PagerSettings Position="Bottom"></PagerSettings>
                    </asp:SmartGridView>
                </asp:Panel>
            </cc1:TabOptionItem>
        </cc1:TabOptionWebControls>
        <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
    </div>
</div>

</asp:Content>
