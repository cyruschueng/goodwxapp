<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.brainsexpert.activity.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <link href="http://cdn.bootcss.com/bootstrap/2.2.1/css/bootstrap.css" rel="stylesheet">
    <link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <style>
        .form-horizontal .control-label{ width:100px;}
        .form-horizontal .controls{ margin-left:120px;}
        .checkbox{ display:inline-block; line-height:20px; height:20px; }
        .toolbars{ height:30px; line-height:30px; }
        textarea{ width:80%; height:100px;}
    </style>
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="在线活动">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server" >
                <div class="container" style=" float:left;">
	                <div class="row">
		                <div class="span12">
			                <div class="form-horizontal">
                                <div class="control-group">
					                 <label class="control-label" for="txtActivityName">分类</label>
					                <div class="controls">
                                        <asp:DropDownList ID="ddlClass1" AutoPostBack="true" runat="server" 
                                            onselectedindexchanged="ddlClass1_SelectedIndexChanged"></asp:DropDownList>
                                        <span id="spanSelect2" runat="server" ><asp:DropDownList ID="ddlClass2" 
                                            AutoPostBack="true"  runat="server" 
                                            onselectedindexchanged="ddlClass2_SelectedIndexChanged"> </asp:DropDownList></span>
                                        <span id="spanSelect3" runat="server" ><asp:DropDownList ID="ddlClass3" runat="server" ></asp:DropDownList></span>
					                </div>
				                </div>
				                <div class="control-group">
					                 <label class="control-label" for="txtActivityName">活动名称</label>
					                <div class="controls">
                                        <asp:TextBox ID="txtActivityName" runat="server"></asp:TextBox>
					                </div>
				                </div>
				                <div class="control-group">
					                 <label class="control-label" for="ddlUsingData">题库分类</label>
					                <div class="controls">
						                <asp:DropDownList ID="ddlUsingData" AutoPostBack="true" runat="server" 
                                            onselectedindexchanged="ddlUsingData_SelectedIndexChanged"></asp:DropDownList>
                                        <asp:DropDownList ID="ddlUsingDetailData"   runat="server" > </asp:DropDownList>
					                </div>
				                </div>
                                <div class="control-group">
					                 <label class="control-label" for="ddlStatus">状态</label>
					                <div class="controls">
						                <asp:DropDownList ID="ddlStatus" runat="server"></asp:DropDownList>
					                </div>
				                </div>
                                <div class="control-group">
					                 <label class="control-label" for="txtAllocation">题目分配</label>
					                <div class="controls">
						                <asp:TextBox ID="txtAllocation" TextMode="MultiLine" Rows="3" runat="server" style=" width:50%;" >

                                        </asp:TextBox>
                                        <div style=" float:right;">
                                            格式：
                                            <p>易|5题|10分</p>
                                            <p>中|3题|15分</p>
                                            <p>难|2题|20分</p>
                                        </div>
					                </div>
				                </div>
                                <div class="control-group">
					                 <label class="control-label" for="txtAllocation">是否启用</label>
					                <div class="controls">
                                        <asp:CheckBox ID="cbIsAct" runat="server" />
					                </div>
				                </div>
                                <div class="control-group">
					                 <label class="control-label" for="txtSort">排序</label>
					                <div class="controls">
                                        <asp:TextBox ID="txtSort" runat="server"></asp:TextBox>
					                </div>
				                </div>
                                <div class="control-group">
					                 <label class="control-label" for="txtSort">初始参与数</label>
					                <div class="controls">
                                        <asp:TextBox ID="txtInitTakeIn" runat="server"></asp:TextBox>
					                </div>
				                </div>

                                <div class="control-group">
					                 <label class="control-label" for="txtSort">开始/结束日期</label>
					                <div class="controls">
                                        <asp:TextBox ID="txtStartDate"  onFocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd HH:mm:ss'})" runat="server"></asp:TextBox>
                                        &nbsp;
                                        /
                                        &nbsp;
                                        <asp:TextBox ID="txtEndDate" onFocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd HH:mm:ss'})" runat="server"></asp:TextBox>
					                </div>
				                </div>
			                </div>
		                </div>
	                </div>
                </div>
            </asp:Panel>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:HiddenField ID="hfMode" runat="server" />
    <asp:HiddenField ID="hfID" runat="server" />
    <asp:HiddenField ID="hfMID" runat="server" />
</asp:Content>
