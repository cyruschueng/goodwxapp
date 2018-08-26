<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.hrm.arc.update" Title="员工信息" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">

    <script language="javascript" src="/js/emccommon.js"></script>
  
        <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server" SelectIndex="0">
            <cc1:TabOptionItem ID="TabOptionItem2" runat="server" Tab_Name="基本信息">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tbody>
                        <tr>
                            <td  style="width:150px">
                                用户名
                            </td>
                            <td >
                                <asp:TextBox ID="txtUserName" runat="server" Width="177px"></asp:TextBox><font color="red">*</font>
                            </td>
                            <td style=" width:140px" height="25">
                                员工号
                            </td>
                            <td  height="25">
                                <asp:TextBox ID="txtEmpID" runat="server" Width="122px"></asp:TextBox>
                            </td>
                            <td align="center" style="text-align:center" colspan="2" rowspan="7">
                                <asp:Image ID="ImagePhoto" runat="server" />
                            </td>
                        </tr>
                        <tr>
                            <td  style="width: 129px; height: 23px">
                                姓名
                            </td>
                            <td  style="width: 254px; height: 23px" width="*">
                                <asp:TextBox ID="txtCnName" runat="server" MaxLength="25" Width="177px"></asp:TextBox><font color="red">*</font>
                            </td>
                            <td  style="width: 136px; height: 23px; " width="*">
                                英文名
                            </td>
                            <td  style="width: 219px; height: 23px" width="*">
                                <asp:TextBox ID="txtEnName" runat="server" Width="123px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  >
                                岗位
                            </td>
                            <td  style="width: 254px; height: 25px" width="*">
                                <asp:DropDownList ID="ddlPositions" runat="server" Width="184px">
                                </asp:DropDownList>
                            </td>
                            <td  style="width: 136px; height: 25px; " width="*">
                                职务
                            </td>
                            <td  style="width: 219px; height: 25px" width="*">
                                <asp:TextBox ID="txtTitle" runat="server" Width="123px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  >
                                部门
                            </td>
                            <td  style="width: 254px; height: 25px" width="*">
                                <asp:DropDownList ID="ddlDept" runat="server" Width="184px">
                                </asp:DropDownList><font color="red">*</font>
                            </td>
                            <td  style="width: 136px; height: 25px; " width="*">
                                级别
                            </td>
                            <td  style="width: 219px; height: 25px" width="*">
                                <asp:DropDownList ID="ddlGrade" runat="server" Width="130px">
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td  >
                              保险状态             
                            </td>
                            <td  style="width: 254px; height: 25px" width="*">
                               <asp:DropDownList ID="ddlCBArea" runat ="server" ></asp:DropDownList> 
                            </td>
                            <td  style="width: 136px; height: 25px; " width="*">
                                在职状态
                            </td>
                            <td  style="width: 219px; height: 25px" width="*">

                                                               <asp:DropDownList ID="ddlZZState" runat="server" Width="130px">
                                    <asp:ListItem>在职</asp:ListItem>
                                    <asp:ListItem>离职</asp:ListItem>
                                    <asp:ListItem>停职</asp:ListItem>
                                </asp:DropDownList>                                
                            </td>
                        </tr>
                        <tr>
                            <td  >
                                  身份证号码  
                            </td>
                            <td  style="width: 254px; height: 25px" width="*">
                                 <asp:TextBox ID="txtIDCard" runat="server" Width="177px"></asp:TextBox><font color="red">*</font>
                            </td>
                            <td  style="width: 136px; height: 25px; " width="*">
                              系统用户
                            </td>
                            <td  style="width: 219px; height: 25px" width="*">
                                  <asp:CheckBox ID="ckIsSysUser" runat="server" Text="是"  />(指可以登录EMC的用户)
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                               到岗日期
                            </td>
                            <td  height="25" style="width: 254px" width="*">
                                <asp:calendartextbox id="txtDGDate" runat="server" width="177px"></asp:calendartextbox>
                            </td>
                            <td  height="25" style="width: 136px; ">
                                   聘用状态
                            </td>
                            <td  height="25" style="width: 219px" width="*">
                                 <asp:DropDownList ID="ddlPYState" runat="server" Width="130px">
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td  >
                                试用期(天)
                            </td>
                            <td  style="width: 254px; height: 25px" width="*">
                                <asp:TextBox ID="txtTryDays" runat="server" Width="177px"></asp:TextBox>
                            </td>
                            <td  style="width: 136px; height: 25px; ">
                              合同期限
                            </td>
                            <td  style="width: 219px; height: 25px" width="*">
                                <asp:calendartextbox id="txtContractDate" runat="server" width="123px" />
                            </td>
                            <td  style="height: 25px; " width="*">
                                照片
                            </td>
                            <td style="height: 25px"; width="*";text-align:center;>
                                <asp:FileUpload ID="txtPhoto" runat="server" Width="139px" />
                            </td>
                        </tr>
                        <tr>
                        <td> 转正日期</td>
                        <td> <asp:calendartextbox id="txtZZDate" runat="server" width="177px" /></td>
                        <td>离职日期</td>
                        <td><asp:calendartextbox id="txtLeaveDate" runat="server" width="123px" /></td>
                        <td></td>
                        <td></td>                        
                        </tr>
                        <tr>
                            <td  >
                                排列顺序
                            </td>
                            <td  style="width: 254px; height: 25px" width="*">
                                <asp:TextBox ID="txtOrderID" runat="server" Width="177px"></asp:TextBox>
                            </td>
                            <td  style="width: 136px; height: 25px; ">
                                服务年限
                            </td>
                            <td  style="width: 219px; height: 25px" width="*">
                                <asp:TextBox ID="txtSerYear" runat="server" Width="123px"></asp:TextBox>
                            </td>
                            <td  style="height: 25px" width="*">
                            </td>
                            <td  style="height: 25px" width="*">
                            </td>
                        </tr>
                        <tr>
                            <td  >
                                移动电话
                            </td>
                            <td  style="width: 254px; height: 25px" width="*">
                                <asp:TextBox ID="txtMobile" runat="server" MaxLength="26" Width="177px"></asp:TextBox>
                            </td>
                            <td  style="width: 136px; height: 25px; " width="*">
                                固定电话
                            </td>
                            <td  style="width: 219px; height: 25px" width="*">
                                <asp:TextBox ID="txtTel" runat="server" Width="123px"></asp:TextBox>
                            </td>
                            <td  style="height: 25px; " width="*">
                                分机
                            </td>
                            <td  style="height: 25px" width="*">
                                <asp:TextBox ID="txtPhoneExt" runat="server" Width="108px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                Email
                            </td>
                            <td  height="25" style="width: 254px" width="*">
                                <asp:TextBox ID="txtEmail" runat="server" Width="177px"></asp:TextBox>
                            </td>
                            <td  height="25" style="width: 136px; " width="*">
                                MSN
                            </td>
                            <td  height="25" style="width: 219px" width="*">
                                <asp:TextBox ID="txtMSN" runat="server" Width="123px"></asp:TextBox>
                            </td>
                            <td  height="25" style="" width="*">
                                QQ
                            </td>
                            <td  height="25" width="*">
                                <asp:TextBox ID="txtQQ" runat="server" Width="108px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  height="25">
                                临时住址
                            </td>
                            <td  colspan="2" height="25" width="*">
                                <asp:TextBox ID="txtTemAddr" runat="server" Width="177px"></asp:TextBox>
                            </td>
                            <td  colspan="2" height="25" style="width: 219px; " width="*">
                                临时住址电话
                            </td>
                            <td  height="25" width="*">
                                <asp:TextBox ID="txtTemTel" runat="server" Width="108px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                永久住址
                            </td>
                            <td  colspan="2" height="25" width="*">
                                <asp:TextBox ID="txtAddr" runat="server" Width="177px"></asp:TextBox>
                            </td>
                            <td  height="25" colspan="2" style="width: 219px; " width="*">
                                永久住址电话
                            </td>
                            <td   height="25" width="*">
                                <asp:TextBox ID="txtAddrTel" runat="server" Width="108px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                其它联系人
                            </td>
                            <td  height="25" style="width: 254px" width="*">
                                <asp:TextBox ID="txtOthersContact" runat="server" Width="177px"></asp:TextBox>
                            </td>
                            <td  height="25" style="width: 136px; ">
                                关系
                            </td>
                            <td  height="25" style="width: 219px" width="*">
                                <asp:TextBox ID="txtOthersRel" runat="server" Width="118px"></asp:TextBox>
                            </td>
                            <td  height="25" style="" width="*">
                                电话
                            </td>
                            <td  height="25" width="*">
                                <asp:TextBox ID="txtOthersPhone" runat="server" Width="106px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  >
                                出生日期
                            </td>
                            <td  style="width: 254px; height: 25px" width="*">
                                <asp:calendartextbox id="txtBirthDay" runat="server" width="177px" />
                            </td>
                            <td  style="width: 136px; height: 25px; " width="*">
                                年龄
                            </td>
                            <td  style="width: 219px; height: 25px" width="*">
                                <asp:TextBox ID="txtAge" runat="server" Width="117px"></asp:TextBox>
                            </td>
                            <td  style="height: 25px; " width="*">
                                身高
                            </td>
                            <td  style="height: 25px" width="*">
                                <asp:TextBox ID="txtHeight" runat="server" Width="106px"></asp:TextBox>CM
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                银行帐号
                            </td>
                            <td  height="25" style="width: 254px" width="*">
                                <asp:TextBox ID="txtAccount" runat="server" Width="177px"></asp:TextBox>
                            </td>
                            <td  height="25" style="width: 136px; " width="*">
                                婚姻状况
                            </td>
                            <td  height="25" style="width: 219px" width="*">
                                &nbsp;<asp:DropDownList ID="ddlMarriage" runat="server" Width="120px">
                                    <asp:ListItem>未婚</asp:ListItem>
                                    <asp:ListItem>已婚</asp:ListItem>
                                </asp:DropDownList>
                            </td>
                            <td >
                                性别
                            </td>
                            <td  height="25" width="*">
                                <asp:DropDownList ID="ddlSex" runat="server" Width="113px">
                                    <asp:ListItem>男</asp:ListItem>
                                    <asp:ListItem>女</asp:ListItem>
                                </asp:DropDownList>
                            </td>
                        </tr>
 
                        <tr>
                            <td  >
                                国籍
                            </td>
                            <td  style="width: 254px; height: 25px" width="*">
                                <asp:TextBox ID="txtNationality" runat="server" Width="177px"></asp:TextBox>
                            </td>
                            <td  style="width: 136px; height: 25px; " width="*">
                                籍贯
                            </td>
                            <td  style="width: 219px; height: 25px" width="*">
                                <asp:TextBox ID="txtNativePlace" runat="server" Width="118px"></asp:TextBox>
                            </td>
                            <td  style="height: 25px; " width="*">
                                民族
                            </td>
                            <td  style="height: 25px" width="*">
                                <asp:TextBox ID="txtNation" runat="server" Width="109px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                户口所在地
                            </td>
                            <td  height="25" style="width: 254px" width="*">
                                <asp:TextBox ID="txtHKPlace" runat="server" Width="176px"></asp:TextBox>
                            </td>
                            <td  height="25" style="width: 136px; " width="*">
                                档案地点
                            </td>
                            <td  height="25" style="width: 219px" width="*">
                                <asp:TextBox ID="txtArcPlace" runat="server" Width="118px"></asp:TextBox>
                            </td>
                            <td style=" height:25px;">
                                驾照 
                            </td>
                            <td  height="25" width="*">
                              <asp:TextBox ID="txtDriveCharter" runat="server" Width="109px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  >
                                资料提交
                            </td>
                            <td  style="width: 254px; height: 25px" width="*">
                                <asp:DropDownList ID="ddlDocSubmit" runat="server">
                                    <asp:ListItem>待补</asp:ListItem>
                                    <asp:ListItem>完整</asp:ListItem>
                                </asp:DropDownList>
                            </td>
                            <td  style="width: 136px; height: 25px" width="*">
                            工作地区
                            </td>
                            <td  style="width: 219px; height: 25px" width="*">
                               <asp:TextBox ID="txtWorkPlace" runat="server" Width="177px"></asp:TextBox>
                            </td>
                            <td  style="height: 25px" width="*">
                            </td>
                            <td  style="height: 25px" width="*">
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                已提交资料
                            </td>
                            <td  colspan="5" height="25" width="*">
                                <asp:CheckBoxList ID="cblHaveDoc" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow">
                                </asp:CheckBoxList>
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                最高学历
                            </td>
                            <td  height="25" style="width: 254px" width="*">
                                <asp:TextBox ID="txtBestXL" runat="server" Width="177px"></asp:TextBox>
                            </td>
                            <td  height="25" style="width: 136px; " width="*">
                                计算机能力
                            </td>
                            <td  height="25" style="width: 219px" width="*">
                                <asp:DropDownList ID="ddlComputerLevel" runat="server" Width="120px">
                                </asp:DropDownList>
                            </td>
                            <td  height="25" style="" width="*">
                                职称
                            </td>
                            <td  height="25" width="*">
                                <asp:TextBox ID="txtZC" runat="server" Width="108px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                外语语种
                            </td>
                            <td  height="25" style="width: 254px" width="*">
                                <asp:TextBox ID="txtFLKind" runat="server" Width="177px"></asp:TextBox>
                            </td>
                            <td  height="25" style="width: 136px; " width="*">
                                外语水平
                            </td>
                            <td  height="25" style="width: 219px" width="*">
                                <asp:DropDownList ID="ddlEnLevel" runat="server" Width="120px">
                                </asp:DropDownList>
                            </td>
                            <td  height="25" width="*">
                            </td>
                            <td  height="25" width="*">
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                第一毕业院校
                            </td>
                            <td  colspan="2" height="25" width="*">
                                <asp:TextBox ID="txtFirstSchool" runat="server" Width="274px"></asp:TextBox>
                            </td>
                            <td  height="25" style="width: 219px; ">
                                
                            </td>
                            <td nowrap="nowrap">第一专业</td>
                            <td  height="25" width="*">
                                <asp:TextBox ID="txtFirstSpecialty" runat="server" Width="108px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                第二毕业院校
                            </td>
                            <td  colspan="2" height="25" width="*">
                                <asp:TextBox ID="txtSecSchool" runat="server" Width="274px"></asp:TextBox>
                            </td>
                            <td  height="25" style="width: 219px; ">
                                
                            </td>
                            <td nowrap="nowrap">第二专业</td>
                            <td  height="25" width="*">
                                <asp:TextBox ID="txtSecSpecialty" runat="server" Width="108px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                专业技术能力
                            </td>
                            <td  colspan="5" height="25" width="*">
                                <asp:TextBox ID="txtTec" runat="server" Rows="4" TextMode="MultiLine" Width="580px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                曾受聘单位
                            </td>
                            <td  colspan="5" height="25" width="*">
                                <asp:TextBox ID="txtWorkCompanys" runat="server" Rows="4" TextMode="MultiLine" Width="580px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                个人专长
                            </td>
                            <td  colspan="5" height="25" width="*">
                                <asp:TextBox ID="txtMySpec" runat="server" Rows="4" TextMode="MultiLine" Width="580px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                个人爱好
                            </td>
                            <td  colspan="5" height="25" width="*">
                                <asp:TextBox ID="txtMyLove" runat="server" Rows="4" TextMode="MultiLine" Width="580px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                本人曾受过何种奖励和处分
                            </td>
                            <td  colspan="5" height="25" width="*">
                                <asp:TextBox ID="txtPrisePunsh" runat="server" Rows="4" TextMode="MultiLine" Width="580px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                资历简述
                            </td>
                            <td  colspan="5" height="25" width="*">
                                <asp:TextBox ID="txtResume" runat="server" Rows="4" TextMode="MultiLine" Width="580px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                           参保日期
                            </td>
                            <td  height="25" style="width: 254px" width="*">
                        <asp:calendartextbox id="txtCBStartDate" runat="server" width="119px" />
                            </td>
                            <td  height="25" style="width: 136px;" width="*">
                               金额
                            </td>
                            <td  height="25" style="width: 219px" width="*">
                               <asp:TextBox ID="txtCBAmt" runat="server" Width="108px"></asp:TextBox>
                            </td>
                            <td  height="25" style="" width="*">
                                
                            </td>
                            <td  height="25" width="*">
                              
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" style="width: 129px">
                                备注说明
                            </td>
                            <td  colspan="3" height="25" width="*">
                                <asp:TextBox ID="txtCBRemark" runat="server" Width="97%"></asp:TextBox>
                            </td>
                            <td  height="25" style="" width="*">
                                停保日期
                            </td>
                            <td  height="25" width="*">
                                <asp:calendartextbox id="txtCBEndDate" runat="server" width="108px" />
                            </td>
                        </tr>
                        <tr>
                            <td  height="25" >
                                假期
                            </td>
                            <td  colspan="3" height="25" width="*">
                                <asp:TextBox ID="txtHolidayYear" runat="server" Width="129px"></asp:TextBox>
                                年* (在假期管理中修改数据）
                            </td>
                            <td  height="25" width="*">
                            </td>
                            <td  height="25" width="*">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="1" height="25" >
                            </td>
                            <td colspan="5">
                          
                                    <asp:PlaceHolder ID="phHoliday" runat="server"></asp:PlaceHolder>
                  
                            </td>
                        </tr>
                        <tr>
                            <td  colspan="1" height="25" >
                                附件
                            </td>
                            <td colspan="5" style="background-color: lightyellow">
                                <table id="Table2" width="100%">
                                    <tr>
                                        <td valign="top">
                                            <asp:SmartGridView ID="sgvFilelist" runat="server" AutoGenerateColumns="False" DataKeyNames="ID"
                                                OnRowDeleting="sgvFilelist_RowDeleting" Width="100%">
                                                <Columns>
                                                    <asp:BoundField DataField="FileName" HeaderText="文件名" />
                                                    <asp:TemplateField ShowHeader="False">
                                                        <ItemStyle Width="70px" />
                                                        <ItemTemplate>
                                                            <asp:HyperLink ID="HL_Update" runat="server" NavigateUrl='<%# @"~/emc/common/FileDownload.aspx?FileID=" + Eval("ID")  %>'>查看</asp:HyperLink>
                                                            <asp:LinkButton ID="LinkButton1" runat="server" CausesValidation="False" CommandName="Delete"
                                                                Text="删除"></asp:LinkButton>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                </Columns>
                                            </asp:SmartGridView>
                                        </td>
                                        <td style="width: 42%" valign="top">
                                            资料1：<asp:FileUpload ID="FileUpload1" runat="server" Width="172px" /><br />
                                            资料2：<asp:FileUpload ID="FileUpload2" runat="server" Width="172px" /><br />
                                            资料3：<asp:FileUpload ID="FileUpload3" runat="server" Width="172px" /><br />
                                            资料4：<asp:FileUpload ID="FileUpload4" runat="server" Width="172px" /><br />
                                            资料5：<asp:FileUpload ID="FileUpload5" runat="server" Width="172px" /><br />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table width="99%">
                    <tr>
                        <td align="center" style="height: 21px" width="99%">
 
                            <asp:Label ID="Lbl_Message" runat="server" Width="230px" ForeColor="Red"></asp:Label>
                        </td>
                    </tr>
                </table>
             
                <asp:HiddenField ID="hfUserName" runat="server"></asp:HiddenField>
                <asp:HiddenField ID="txtPositionsID" runat="server"></asp:HiddenField>
                <asp:HiddenField ID="HF_Mode" runat="server"></asp:HiddenField>
                <asp:HiddenField ID="HF_UserID" runat="server"></asp:HiddenField>
                <asp:HiddenField ID="hfPhoto" runat="server"></asp:HiddenField>
                <asp:HiddenField ID="hfHoliday" runat="server"></asp:HiddenField>
                <asp:HiddenField ID="hfMID" runat="server" />
                &nbsp; &nbsp;&nbsp;<br />
            </cc1:TabOptionItem>
       
        </cc1:TabOptionWebControls>
 
</asp:Content>
