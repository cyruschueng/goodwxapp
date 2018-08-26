<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.activity.testquestion.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <style>
        .editrow{ height:40px; line-height:40px; position:relative; margin-bottom:10px;}
        .editrow label{ width:80px; height:30px; line-height:30px; display:inline-block; text-align:justify;}
        .editrow .txt{ width:500px; height:30px; line-height:30px; display:inline-block; position:absolute; left:80px; top:0px;}
        .editrow .cb{ display:inline-block; position:absolute; left:600px; top:0px;}
        .editrow .sel{ width:100px; height:30px; }
        
    </style>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="在线活动">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <div class="editrow">
                    <label>试题</label>
                    <asp:TextBox ID="txtTestQuestion" runat="server" CssClass="txt"></asp:TextBox>
                </div>
                <div class="editrow">
                    <label>答案一</label>
                    <asp:TextBox ID="txtAnswer1" runat="server" CssClass="txt"></asp:TextBox>
                    <asp:CheckBox ID="cbRightAnswer1" name="answer" runat="server" CssClass="cb" AutoPostBack="true"
                        oncheckedchanged="cbRightAnswer1_CheckedChanged" />
                </div>
                <div class="editrow">
                    <label>答案二</label>
                    <asp:TextBox ID="txtAnswer2" runat="server" CssClass="txt"></asp:TextBox>
                    <asp:CheckBox ID="cbRightAnswer2" name="answer"  runat="server" CssClass="cb"  AutoPostBack="true"
                        oncheckedchanged="cbRightAnswer2_CheckedChanged" />
                </div>
                <div class="editrow">
                    <label>答案三</label>
                    <asp:TextBox ID="txtAnswer3" runat="server" CssClass="txt"></asp:TextBox>
                    <asp:CheckBox ID="cbRightAnswer3" name="answer"  runat="server" CssClass="cb" AutoPostBack="true"
                        oncheckedchanged="cbRightAnswer3_CheckedChanged" />
                </div>
                <div class="editrow">
                    <label>答案四</label>
                    <asp:TextBox ID="txtAnswer4" runat="server" CssClass="txt"></asp:TextBox>
                    <asp:CheckBox ID="cbRightAnswer4" name="answer"  runat="server" CssClass="cb" AutoPostBack="true"
                        oncheckedchanged="cbRightAnswer4_CheckedChanged" />
                </div>
                <div class="editrow">
                    <label>试题类型</label>
                    <asp:DropDownList ID="ddlQuestionType" runat="server" CssClass="sel"></asp:DropDownList>
                    <label style="margin-left:20px;" >试题等级</label>
                    <asp:DropDownList ID="ddlGrade" runat="server" CssClass="sel"></asp:DropDownList>
                </div>
                <div class="editrow">
                    <asp:CheckBox ID="cbAct" runat="server"  />是否启用
                </div>
            </asp:Panel>
            

            
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    
</asp:Content>
