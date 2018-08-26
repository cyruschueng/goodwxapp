<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.brainsexpert.grade.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link href="/emc/css/emccss.css" type="text/css" rel="stylesheet" />
    <style>
        .container .row{ margin:5px 0px;}
        .toolbars{ height:30px; line-height:30px;}
    </style>
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="在线活动">
            <asp:Panel ID="Panel1"  runat="server">
                <div class="container" style=" float:left;">
                    <div class="row">
                        <div class="col-md-1"><label class="control-label">等级名称</label></div>
                        <div class="col-md-11"><asp:TextBox CssClass="form-control" ID="txtGradeName"  runat="server"></asp:TextBox></div>
                    </div>
                    <div class="row">
                        <div class="col-md-1"><label class="control-label">等级</label></div>
                        <div class="col-md-11">
                            <asp:DropDownList CssClass="form-control" ID="ddlGrade" runat="server">
                            <asp:ListItem Value="" Text="---请选择---"></asp:ListItem>
                            <asp:ListItem Value="1" Text="1级"></asp:ListItem>
                            <asp:ListItem Value="2" Text="2级"></asp:ListItem>
                            <asp:ListItem Value="3" Text="3级"></asp:ListItem>
                            <asp:ListItem Value="4" Text="4级"></asp:ListItem>
                            <asp:ListItem Value="5" Text="5级"></asp:ListItem>
                            <asp:ListItem Value="6" Text="6级"></asp:ListItem>
                            <asp:ListItem Value="7" Text="7级"></asp:ListItem>
                            <asp:ListItem Value="8" Text="8级"></asp:ListItem>
                            <asp:ListItem Value="9" Text="9级"></asp:ListItem>
                            <asp:ListItem Value="10" Text="10级"></asp:ListItem>
                            <asp:ListItem Value="11" Text="11级"></asp:ListItem>
                            <asp:ListItem Value="12" Text="12级"></asp:ListItem>
                            <asp:ListItem Value="13" Text="13级"></asp:ListItem>
                            <asp:ListItem Value="14" Text="14级"></asp:ListItem>
                            <asp:ListItem Value="15" Text="15级"></asp:ListItem>
                            <asp:ListItem Value="16" Text="16级"></asp:ListItem>
                            <asp:ListItem Value="17" Text="17级"></asp:ListItem>
                            <asp:ListItem Value="18" Text="18级"></asp:ListItem>
                            <asp:ListItem Value="19" Text="19级"></asp:ListItem>
                            <asp:ListItem Value="20" Text="20级"></asp:ListItem>
                            <asp:ListItem Value="21" Text="21级"></asp:ListItem>
                            <asp:ListItem Value="22" Text="22级"></asp:ListItem>
                            <asp:ListItem Value="23" Text="23级"></asp:ListItem>
                            <asp:ListItem Value="24" Text="24级"></asp:ListItem>
                            <asp:ListItem Value="25" Text="25级"></asp:ListItem>
                            <asp:ListItem Value="26" Text="26级"></asp:ListItem>
                            <asp:ListItem Value="27" Text="27级"></asp:ListItem>
                            <asp:ListItem Value="28" Text="28级"></asp:ListItem>
                            <asp:ListItem Value="29" Text="29级"></asp:ListItem>
                            <asp:ListItem Value="30" Text="30级"></asp:ListItem>
                        </asp:DropDownList>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-1"><label class="control-label">下限</label></div>
                        <div class="col-md-11"><asp:TextBox CssClass="form-control" ID="txtLowerLimit"  runat="server"></asp:TextBox></div>
                    </div>
                    <div class="row">
                        <div class="col-md-1"><label class="control-label">上限</label></div>
                        <div class="col-md-11"><asp:TextBox CssClass="form-control" ID="txtUpperLimit"  runat="server"></asp:TextBox></div>
                    </div>
                </div>
                
            </asp:Panel>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:HiddenField ID="hfMode" runat="server" />
    <asp:HiddenField ID="hfID" runat="server" />
    <asp:HiddenField ID="hfMID" runat="server" />
</asp:Content>
