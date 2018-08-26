<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="newtopic.aspx.cs" Inherits="SfSoft.web.emc.family.topic.newtopic" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageHead" runat="server">
    <link href="../../../css/family.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageBody" runat="server">
    <div class="main">
        <p class="plm" style="margin-top: 10px !important;">发帖</p>
        <div class="sendBorder">
            <textarea class="sInput"></textarea>
        </div>
        <div class="sendOperate ">
            <div style=" float:left;">
                <a id="photoSelect" href="javascript:;">图片</a>
                <a id="videoSelectBtn"  href="javascript:;">视屏</a>
                <a id="expreSelect" href="javascript:;">表情</a>
            </div>
        </div>
    </div>
    
</asp:Content>
