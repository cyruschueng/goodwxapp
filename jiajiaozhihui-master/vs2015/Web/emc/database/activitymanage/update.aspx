<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.database.activitymanage.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="在线活动">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <style>
                    .fromtable td{padding: 8px; line-height: 30px; vertical-align: top; border-top: 1px solid #DDD; font-size:14px;}
                    .fromtable td .text { width:380px; height: 30px; border-radius: 4px; line-height:30px; padding: 4px 6px; }
                    .fromtable td textarea{ height:80px; width:90%; padding: 4px 6px; border-radius: 4px; }
                    .fromtable td .address{ width:90%; height: 30px; border-radius: 4px; line-height:30px; padding: 4px 6px; }
                    .fromtable td select { width:380px; height: 30px; border-radius: 4px; line-height:30px; padding: 4px 6px; }
                    .fromtable .cbl input,.fromtable .cbl td{ border:none;}
                    #selectparts,#editnum{ position:fixed; top:0px; left:0px; width:100%; height:100%; background:rgba(200,200,200,0.5); display:none; z-index:99999 }
                    #selectparts .grid{ position:absolute;  margin:0px auto; width:1000px; height:400px; left:50%; top:50%; margin-left:-500px; margin-top:-200px;}
                    .borderright{ border:1px solid #ccc;    }
                    #editnum div{ width:450px; height:300px; position:absolute; left:50%; top:50%; margin-left:-225px; margin-top:-150px;}
                    .fromtable td .width{ width:100px;}
                    .request{ color:#f00; padding-left:10px;}
                </style>
                <table class="fromtable">
                    <thead>
                        <tr>
                            <td width="100"></td>
                            <td></td>
                            <td width="100"></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tr>
                        <td>活动名称</td>
                        <td colspan="3"><asp:TextBox ID="txtActivityName" runat="server" CssClass="text" ></asp:TextBox><span class="request">*</span></td>
                    </tr>
                    <tr>
                        <td>开始时间</td>
                        <td colspan="3"><asp:TextBox ID="txtStartDate" runat="server" CssClass="text" onFocus="WdatePicker({isShowClear:true,readOnly:true,dateFmt:'yyyy-MM-dd HH:mm:ss'})" ></asp:TextBox><span class="request">*</span></td>
                    </tr>
                    <tr>
                        <td>结束时间</td>
                        <td colspan="3" class="cbl"><asp:TextBox ID="txtEndDate" runat="server" CssClass="text" onFocus="WdatePicker({isShowClear:true,readOnly:true,dateFmt:'yyyy-MM-dd  HH:mm:ss'})" ></asp:TextBox><span class="request">*</span></td>
                    </tr>
                    <tr>
                        <td>是否有效</td>
                        <td colspan="3">
                            <asp:RadioButtonList ID="ddlIsAct" runat="server" RepeatDirection="Horizontal">
                                <asp:ListItem Text="有效" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="无效" Value="0"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>阅读数</td>
                        <td colspan="3"><asp:Label ID="lblReadNumber" runat="server" CssClass="text"></asp:Label></td>
                    </tr>
                    <tr>
                        <td>点赞数</td>
                        <td colspan="3"><asp:Label ID="lblLikeNumber" runat="server" CssClass="text"></asp:Label></td>
                    </tr>
                    <tr>
                        <td>分享数</td>
                        <td colspan="3"><asp:Label ID="lblShareNumber" runat="server" CssClass="text"></asp:Label></td>
                    </tr>
                    <tr>
                        <td>创建时间</td>
                        <td colspan="3" class="cbl"><asp:Label ID="lblCreateDate" runat="server" CssClass="text"></asp:Label></td>
                    </tr>
                </table>
            </asp:Panel>
            
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
