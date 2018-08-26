<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.brainsexpert.library.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <link href="http://cdn.bootcss.com/bootstrap/2.2.1/css/bootstrap.css" rel="stylesheet">
    
    <style>
        .form-horizontal .control-label{ width:100px;}
        .form-horizontal .controls{ margin-left:120px;}
        .checkbox{ display:inline-block; line-height:20px; height:20px; }
        .toolbars{ height:30px; line-height:30px;}
        .editimg{ position:absolute; top:50px; right:20px; width:30%;}
    </style>
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="在线活动">
            <asp:Panel ID="Panel1" GroupingText="基本数据" style=" position:relative;" runat="server">
                <div class="container" style=" float:left;">
	                <div class="row">
		                <div class="span12">
			                <div class="form-horizontal">
				                <div class="control-group">
					                 <label class="control-label" for="inputEmail">试题</label>
					                <div class="controls">
                                        <asp:TextBox ID="txtTestQuestion" runat="server"></asp:TextBox>
                                        <asp:FileUpload ID="txtFileUpload" runat="server" />
                                        <asp:Label ID="labFilePath" runat="server" style=" color:#2828FF; font-size:14px; height:20px; line-height:20px;"></asp:Label>
					                </div>
				                </div>
				                <div class="control-group">
					                 <label class="control-label" for="txtAnswer1">答案一</label>
					                <div class="controls">
						                <asp:TextBox ID="txtAnswer1" runat="server"></asp:TextBox>
                                        <label class="checkbox"><asp:CheckBox ID="cbRightAnswer1" name="answer" 
                                            runat="server"  AutoPostBack="true" 
                                            oncheckedchanged="cbRightAnswer1_CheckedChanged"/>选择答案 </label> 
					                </div>
				                </div>
                                <div class="control-group">
					                 <label class="control-label" for="txtAnswer2">答案二</label>
					                <div class="controls">
						                <asp:TextBox ID="txtAnswer2" runat="server"></asp:TextBox>
                                        <label class="checkbox"><asp:CheckBox ID="cbRightAnswer2" name="answer" 
                                            runat="server"  AutoPostBack="true" 
                                            oncheckedchanged="cbRightAnswer2_CheckedChanged"/>选择答案 </label> 
					                </div>
				                </div>
                                <div class="control-group">
					                 <label class="control-label" for="txtAnswer3">答案三</label>
					                <div class="controls">
						                <asp:TextBox ID="txtAnswer3" runat="server"></asp:TextBox>
                                        <label class="checkbox"><asp:CheckBox ID="cbRightAnswer3" name="answer" 
                                            runat="server"  AutoPostBack="true" 
                                            oncheckedchanged="cbRightAnswer3_CheckedChanged"/>选择答案 </label> 
					                </div>
				                </div>
                                <div class="control-group">
					                 <label class="control-label" for="txtAnswer4">答案四</label>
					                <div class="controls">
						                <asp:TextBox ID="txtAnswer4" runat="server"></asp:TextBox>
                                        <label class="checkbox"><asp:CheckBox ID="cbRightAnswer4" name="answer" 
                                            runat="server"  AutoPostBack="true" 
                                            oncheckedchanged="cbRightAnswer4_CheckedChanged"/>选择答案 </label> 
					                </div>
				                </div>
                                <fieldset>
                                    <legend>题库类型/分类设置/难易度</legend>
                                    <div class="control-group">
					                     <label class="control-label" for="ddrQuestionType">题库类型</label>
					                    <div class="controls">
						                    <asp:DropDownList ID="ddrQuestionType" runat="server"></asp:DropDownList>
					                    </div>
				                    </div>
                                    <div class="control-group">
					                     <label class="control-label" for="ddrQuestionClass">题库分类</label>
					                    <div class="controls">
						                    <asp:DropDownList ID="ddrQuestionClass" runat="server"></asp:DropDownList>
					                    </div>
				                    </div>
                                    <div class="control-group">
					                     <label class="control-label" for="ddrQuestionClass">题库难易度</label>
					                    <div class="controls">
						                    <asp:DropDownList ID="ddrQuestionGrade" runat="server"></asp:DropDownList>
					                    </div>
				                    </div>
                                </fieldset>
                                
                                <fieldset>
                                    <legend>曲目设置</legend>
                                    <div class="control-group">
					                     <label class="control-label" for="txtTrack_V1">曲目更新前</label>
					                    <div class="controls">
						                    <asp:TextBox ID="txtTrack_V1" runat="server"></asp:TextBox>
					                    </div>
				                    </div>
                                    <div class="control-group">
					                     <label class="control-label" for="txtTrack_V2">曲目更新后</label>
					                    <div class="controls">
						                    <asp:TextBox ID="txtTrack_V2" runat="server"></asp:TextBox>
					                    </div>
				                    </div>
                                    <div class="control-group">
					                     <label class="control-label" for="txtTrack_V3">SR-8曲目</label>
					                    <div class="controls">
						                    <asp:TextBox ID="txtTrack_V3" runat="server"></asp:TextBox>
					                    </div>
				                    </div>
                                </fieldset>
			                </div>
		                </div>
	                </div>
                </div>
                <asp:Image ID="imgShow" CssClass="img-thumbnail editimg" runat="server" />
            </asp:Panel>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:HiddenField ID="hfMode" runat="server" />
    <asp:HiddenField ID="hfID" runat="server" />
    <asp:HiddenField ID="hfMID" runat="server" />
</asp:Content>
