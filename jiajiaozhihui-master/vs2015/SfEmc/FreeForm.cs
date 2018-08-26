using System;
using System.Text;
using System.Drawing;
using System.Data.SqlClient;
using System.Data;
using System.Collections;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using SfSoft.DBUtility;
using SfSoft.Common;
using GotAspx.WebControls.Calendar;
using FredCK.FCKeditorV2;
namespace SfSoft.SfEmc
{
    public class FreeForm
    {
        /// <summary>
        /// 建立表的基础数据
        /// </summary>
        /// <param name="tablename"></param>
        public static void CreateTableBaseField(string tablename)
        {
            string sql = "select * from emc_freeform_field where boName='sys' and FieldID<>'ID' ";
            DataSet ds = DbHelperSQL.Query(sql);
            if (ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    string fieldname = dr["FieldID"].ToString();
                    string fieldtype = dr["FieldType"].ToString();
                    string fieldlength = dr["FieldLength"].ToString();

                    DBTools.CreateField(tablename, fieldname, fieldtype, fieldlength);
                }

            }
        }

        #region 自动表单

        public static DataTable GetFieldList(string boName, string includeFd, string expFd, string flag)
        {

            string sql = " select * from emc_freeform_field where (boName='" + boName + "' or boName='sys') and FieldID<>'ID' ";
            if (flag != "")
            {
                sql += " and FIsShow='1' ";
            }

            string strWhereExpFd = "";
            string strWhereIncludeFd = "";

            if (boName == "")
            {
                return null;
            }

            if (expFd != "") //有排除字段
            {
                string[] arrExpFd = expFd.Split(',');
                for (int i = 0; i < arrExpFd.Length; i++)
                {
                    strWhereExpFd += "'" + arrExpFd[i].ToString() + "',";
                }
                if (strWhereExpFd != "")
                {
                    strWhereExpFd = strWhereExpFd.Substring(0, strWhereExpFd.Length - 1);
                    strWhereExpFd = " FieldID not in (" + strWhereExpFd + ")";
                    sql += " and " + strWhereExpFd;
                }
            }


            if (includeFd != "") //有包含字段
            {
                string[] arrIncludeFd = includeFd.Split(',');
                for (int i = 0; i < arrIncludeFd.Length; i++)
                {
                    strWhereIncludeFd += "'" + arrIncludeFd[i].ToString() + "',";
                }
                if (strWhereIncludeFd != "")
                {
                    strWhereIncludeFd = strWhereIncludeFd.Substring(0, strWhereIncludeFd.Length - 1);
                    strWhereIncludeFd = " FieldID  in (" + strWhereIncludeFd + ")";
                    sql += " and " + strWhereIncludeFd;
                }
            }

            sql = sql + " order by OrderID";
            DataSet ds = DbHelperSQL.Query(sql);
            return ds.Tables[0];

        }
        /// <summary>
        /// 组合增加字符串
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="flag"></param>
        /// <returns></returns>
        public static string GetAddStr(DataTable dt, string flag)
        {
            string addstr = "";
            foreach (DataRow dr in dt.Rows)
            {
                addstr += flag + dr["FieldID"].ToString() + ",";

            }
            if (addstr != "")
            {
                addstr = addstr.Substring(0, addstr.Length - 1);
            }
            return addstr;
        }
        /// <summary>
        /// 组合修改字符串
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static string GetUpdateStr(DataTable dt)
        {
            string updatestr = "";
            foreach (DataRow dr in dt.Rows)
            {
                updatestr += dr["FieldID"].ToString() + "=@" + dr["FieldID"].ToString() + ",";

            }
            if (updatestr != "")
            {
                updatestr = updatestr.Substring(0, updatestr.Length - 1);
                updatestr += " where ID=@ID ";
            }
            return updatestr;
        }
        /// <summary>
        /// 生成保存数据参数及值
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="mode"></param>
        /// <param name="hash"></param>
        /// <returns></returns>
        public static SqlParameter[] GetParameters(DataTable dt, string mode, Hashtable hash)
        {
            if (dt.Rows.Count < 1)
            {
                return null;
            }

            int count = dt.Rows.Count;
            //int i = 0;
            //if (mode == "update")
            //{

            //count = count + 1;
            int i = 1;
            //}
            SqlParameter[] parameters = null;
            SqlParameter sqlPara = new SqlParameter();
            if (mode == "update")
            {
                parameters = new SqlParameter[count+1];
                parameters[0] = new SqlParameter("@ID", SqlDbType.Int, 4);
                parameters[0].Value = hash["ID"].ToString();
            }
            else
            {
                //parameters[0] = new SqlParameter("@DealerID", SqlDbType.Int, 4);
                //parameters[0].Value = hash["DealerID"].ToString();
                parameters = new SqlParameter[count];
                i = 0;
            }
            foreach (DataRow dr in dt.Rows)
            {
                string FieldType = dr["FieldType"].ToString().ToLower();

                switch (FieldType)
                {
                    case "nvarchar":
                        {
                            int size1 = 50;
                            if (dr["FieldLength"].ToString() != "")
                            {
                                size1 = int.Parse(dr["FieldLength"].ToString());
                            }
                            sqlPara = new SqlParameter(dr["FieldID"].ToString(), SqlDbType.NVarChar, size1);
                            sqlPara.Value = hash[dr["FieldID"].ToString()].ToString();
                            break;
                        }
                    case "ntext":
                        {
                            sqlPara = new SqlParameter(dr["FieldID"].ToString(), SqlDbType.Text); 
                            sqlPara.Value = hash[dr["FieldID"].ToString()].ToString();
                            break;
                        }
                    case "datetime":
                        {
                            sqlPara = new SqlParameter(dr["FieldID"].ToString(), SqlDbType.DateTime);
                            if (hash[dr["FieldID"].ToString()].ToString() != "")
                            {
                                sqlPara.Value = DateTime.Parse(hash[dr["FieldID"].ToString()].ToString());
                            }
                            else
                            {
                                sqlPara.Value = null;
                            }
                            break;
                        }
                    case "float":
                        {
                            sqlPara = new SqlParameter(dr["FieldID"].ToString(), SqlDbType.Float);
                            if (hash[dr["FieldID"].ToString()].ToString() != "")
                            {
                                sqlPara.Value = float.Parse(hash[dr["FieldID"].ToString()].ToString());
                            }
                            else
                            {
                                sqlPara.Value = 0;
                            }

                            break;
                        }
                    case "int":
                        {
                            sqlPara = new SqlParameter(dr["FieldID"].ToString(), SqlDbType.Int);
                            if (hash[dr["FieldID"].ToString()].ToString() != "")
                            {
                                sqlPara.Value = int.Parse(hash[dr["FieldID"].ToString()].ToString());
                            }
                            else
                            {
                                sqlPara.Value = 0;
                            }
                            break;
                        }
                    default:

                        break;
                }
                parameters[i] = sqlPara;
                i += 1;
            }

            return parameters;
        }

        /// <summary>
        /// 新建保存
        /// </summary>
        /// <param name="boName">表名</param>
        /// <param name="includeFd">包含哪些字段，如果有数据，那么mid无效</param>
        /// <param name="expFd">排除哪些字段</param>
        /// <param name="hash">保存字段内容</param>
        /// <returns></returns>
        public static int NewSaveBo(string boName, string includeFd, string expFd, Hashtable hash)
        {
            DataTable fddt = GetFieldList(boName, includeFd, expFd, "");

            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into " + boName + "(");
            strSql.Append(GetAddStr(fddt, ""));
            strSql.Append(")");
            strSql.Append(" values (");
            strSql.Append(GetAddStr(fddt, "@"));
            strSql.Append(")");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = GetParameters(fddt, "add", hash);
            object obj = DbHelperSQL.GetSingle(strSql.ToString(), parameters);
            if (obj == null)
            {
                return 1;
            }
            else
            {
                return Convert.ToInt32(obj);
            }
        }


        /// <summary>
        /// 修改保存
        /// </summary>
        /// <param name="BoName">表名</param>
        /// <param name="includeFd">包含哪些字段，如果有数据，那么mid无效</param>
        /// <param name="expFd">排除哪些字段</param>
        /// <param name="hash">保存字段内容</param>
        /// <returns></returns>
        public static void UpdateSaveBo(string BoName, string includeFd, string expFd, Hashtable hash)
        {
            DataTable fddt = GetFieldList(BoName, includeFd, expFd, "");
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update " + BoName + " set ");
            strSql.Append(GetUpdateStr(fddt));
            SqlParameter[] parameters = GetParameters(fddt, "update", hash);
            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 建立表单控件
        /// </summary>
        /// <param name="phForm"></param>
        /// <param name="colnum"></param>
        /// <param name="mid"></param>
        /// <param name="includeFd"></param>
        /// <param name="expFd"></param>
        /// <param name="wh"></param>
        /// <param name="FilialeID"></param>
   
        public static void CreateAutoForm(PlaceHolder phForm, int colnum, string BoName, string includeFd, string expFd, string wh, string FilialeID,string mode)
        {
            DataTable fddt = GetFieldList(BoName, includeFd, expFd, "1");
            if (fddt == null)
            {
                return;
            }
            int recnum = fddt.Rows.Count;//字段数
            if (recnum < 1)
            {
                return;
            }

            Table tb = new Table();
            tb.ID = "tb_" + BoName;
            tb.CssClass = "fromtable";
            // tb.Attributes.Add("Class", "fromtable");
            int rown = 1;
            int RowTotalColNum = colnum * 2;//行可用总列数
            for (int j = 0; j < recnum; j++)
            {

                TableRow tr = new TableRow();
                tr.ID = "tb_" + BoName + "_tr_" + rown.ToString();
                int userColNum = 0;//已用列数
                for (int i = 0; i < colnum; i++)
                {
                    #region 字段信息
                    string FieldDesc = "";
                    string FieldID = "";
                    string FieldType = "";
                    string FieldLength = "";
                    string LblColLH = "";
                    string TxtColLH = "";
                    string TxtColHH = "";
                    string TxtColNum = "";
                    string ControlType = "";
                    string IsNotNull = "";
                    string IsReadonly = "";
                    string FDataSource = "";
                    string FieldDefault = "";
                    int ColNumSpan = 0;//合并列数
                    if (j >= recnum)
                    {
                        break;
                    }
                    DataRow datarow = fddt.Rows[j];
                    FieldDesc = datarow["FieldDesc"].ToString();
                    FieldID = datarow["FieldID"].ToString();
                    FieldType = datarow["FieldType"].ToString();
                    FieldLength = datarow["FieldLength"].ToString();
                    LblColLH = datarow["LblColLH"].ToString();
                    TxtColLH = datarow["TxtColLH"].ToString();
                    TxtColHH = datarow["TxtColHH"].ToString();
                    TxtColNum = datarow["TxtColNum"].ToString();
                    ControlType = datarow["ControlType"].ToString().ToLower();
                    IsNotNull = datarow["FIsNull"].ToString();
                    IsReadonly = datarow["FIsRead"].ToString();
                    FDataSource = datarow["FDataSource"].ToString();
                    FieldDefault = datarow["FieldDefault"].ToString();
                    Label lblNotNull = new Label();
                    bool enableBox = true;
                    lblNotNull.Text = "";
                    if (TxtColLH == "")
                    {
                        TxtColLH = "0";
                    }
                    if (FieldLength == "")
                    {
                        FieldLength = "0";
                    }
                    if (TxtColNum == "")
                    {
                        TxtColNum = "1";
                    }
                    ColNumSpan = int.Parse(TxtColNum);
                    if (TxtColHH == "")
                    {
                        TxtColHH = "25";
                    }
                    if (mode == "view")
                    {
                        IsReadonly = "1";
                        enableBox = false;
                    }
                    bool isRead = false;
                    string skinID = "";
                    if (IsReadonly == "1")
                    {
                        isRead = true;
                        skinID = "txtBoxRedonly";
                    }
                    if (IsNotNull == "0")
                    {
                        lblNotNull.Text = "*";
                        lblNotNull.ForeColor = Color.Red;
                    }
                    #endregion
                    if (ColNumSpan == 1) //如果为1 ，没有合并列数，占用2列
                    {
                        ColNumSpan = ColNumSpan * 2;
                    }
                    if (ControlType == "htmltextbox") //如果是html输入框，占用所有-1列
                    {
                        ColNumSpan = RowTotalColNum - 1;
                    }
                    bool isD = false;
                     //已用列数+现有列数小于行总列数,可以继续增加列
                    if (userColNum + ColNumSpan <= RowTotalColNum)
                    {

                        //列标题
                        TableCell tclbl = new TableCell();
                        tclbl.ID = "tb_" + BoName + "_tr_" + rown.ToString() + "_td_lbl_" + j.ToString();
                        //tclbl.Width = LblColLH;
                        Label myLabel = new Label();
                        myLabel.Text = FieldDesc;
                        myLabel.ID = "lbl_" + FieldID;
                        tclbl.Controls.Add(myLabel);
                        tr.Cells.Add(tclbl);
                        //列内容
                        TableCell tc = new TableCell();
                        tc.ID = "tb_" + BoName + "_tr_" + rown.ToString() + "_td_" + j.ToString();
                        #region 显示控件
                        switch (ControlType)
                        {
                            case "textbox":
                            case "textboxs":
                                {
                                    TextBox txtBox = new TextBox();
                                    txtBox.ID = "txt_" + FieldID;
                                    //txtBox.Width = TxtColLH;
                                    tc.Controls.Add(txtBox);
                                    if (FieldType.ToLower() == "float" || FieldType.ToLower() == "int")
                                    {
                                        txtBox.Attributes.Add("onkeyup", "javascript:permitFloat(this);");
                                    }

                                    txtBox.Width = Unit.Pixel(int.Parse(TxtColLH));//.Style..Add("style", "width:" + TxtColLH + "px");
                                    txtBox.SkinID = skinID;
                                    txtBox.ReadOnly = isRead;
                                    txtBox.Text = FieldDefault;
                                    if (ControlType == "textboxs")
                                    {
                                        txtBox.TextMode = TextBoxMode.MultiLine;
                                        txtBox.Rows = 2;
                                        txtBox.MaxLength = int.Parse(FieldLength);
                                        txtBox.Height = Unit.Pixel(int.Parse(TxtColHH));
                                    }
                                    
                                    tc.Controls.Add(txtBox);
                                    
                                    break;
                                }
                            case "calendartextbox":
                                {
                                    CalendarTextBox calendarTextBox = new CalendarTextBox();
                                    calendarTextBox.ID = "txt_" + FieldID;
                                    calendarTextBox.Width = Unit.Pixel(int.Parse(TxtColLH));
                                    //calendarTextBox.ReadOnly = isRead;
                                    //calendarTextBox.SkinID = skinID;
                                    calendarTextBox.Enabled = enableBox;
                                    tc.Controls.Add(calendarTextBox);
                                    break;
                                }
                            case "dropdownlist":
                                {
                                    DropDownList dropDownList = new DropDownList();
                                    dropDownList.ID = "ddl_" + FieldID;
                                    if (FDataSource == "basedata")
                                    {
                                        EmcCommon.SetBaseDataEptDropDownList(dropDownList, FieldID);
                                    }
                                    else if (FDataSource == "userlist")
                                    {
                                        EmcCommon.GetUsersIDDropDownList(dropDownList, FilialeID);
                                    }
                                    else if (FDataSource == "deptlist")
                                    {
                                        EmcCommon.GetDeptIDDropDownList(dropDownList, FilialeID);
                                    }
                                    dropDownList.Width = Unit.Pixel(int.Parse(TxtColLH));
                                    if (FieldDefault != "")
                                    {
                                        EmcCommon.ShowDropDownList(dropDownList, FieldDefault);
                                    }
                                    dropDownList.Enabled = enableBox;
                                    tc.Controls.Add(dropDownList);
                                    break;
                                }
                            case "checkboxlist":
                                {
                                    CheckBoxList checkBoxList = new CheckBoxList();
                                    checkBoxList.ID = "cbl_" + FieldID;
                                    checkBoxList.RepeatDirection = RepeatDirection.Horizontal;
                                    if (FDataSource == "basedata")
                                    {
                                        EmcCommon.SetBaseDataCheckBoxList(checkBoxList, FieldID);
                                    }
                                    if (FieldDefault != "")
                                    {
                                        EmcCommon.ShowCheckBoxList(checkBoxList, FieldDefault);
                                    }
                                    checkBoxList.Enabled = enableBox;
                                    tc.Controls.Add(checkBoxList);
                                    break;
                                }
                            case "radiobuttonlist":
                                {

                                    RadioButtonList radioBoxList = new RadioButtonList();
                                    radioBoxList.ID = "rbl_" + FieldID;
                                    radioBoxList.RepeatDirection = RepeatDirection.Horizontal;
                                    if (FDataSource == "basedata")
                                    {
                                        EmcCommon.SetBaseDataRadioButtonList(radioBoxList, FieldID);
                                    }
                                    if (FieldDefault != "")
                                    {
                                        EmcCommon.ShowRadioButtonList(radioBoxList, FieldDefault);
                                    }
                                    radioBoxList.Enabled = enableBox;
                                    tc.Controls.Add(radioBoxList);
                                    break;
                                }
                            case "fileupload":
                                {
                                    FileUpload fileUpload = new FileUpload();
                                    fileUpload.ID = "file_" + FieldID;
                                    fileUpload.Width = Unit.Pixel(int.Parse(TxtColLH));
                                    fileUpload.Enabled = enableBox;
                                    tc.Controls.Add(fileUpload);
                                    HyperLink hlBox = new HyperLink();
                                    hlBox.ID = "file_hl_" + FieldID;
                                    hlBox.Visible = false;
                                    tc.Controls.Add(hlBox);
                                    Button btnBox = new Button();
                                    btnBox.ID = "file_btn_" + FieldID;
                                    btnBox.Text = "删除";
                                    btnBox.CssClass = "btn";
                                    btnBox.Enabled = enableBox;
 
                                    btnBox.Visible = false;
                                    tc.Controls.Add(btnBox);
                                    break;
                                }
                            case "label":
                                {
                                    Label lbl = new Label();
                                    lbl.ID = "lblShow_" + FieldID;
                                    lbl.Width = Unit.Pixel(int.Parse(TxtColLH));
                                    lbl.Text = FieldDefault;
                                    tc.Controls.Add(lbl);
                                    break;
                                }
                            case "htmltextbox":
                                {
                                    if (mode == "view")
                                    {
                                        HtmlGenericControl div = new HtmlGenericControl();
                                        div.TagName = "div";
                                        div.ID = "htmldiv_" + FieldID;
                                        div.Attributes["class"] = "table-content";
                                        tc.Controls.Add(div);
                                    }
                                    else
                                    {
                                        FCKeditor fcKeditor = new FCKeditor();
                                        fcKeditor.ID = "html_" + FieldID;
                                        fcKeditor.Width = Unit.Pixel(int.Parse(TxtColLH));
                                        fcKeditor.Value = FieldDefault;
                                       
                                        tc.Controls.Add(fcKeditor);
                                    }
                                    break;
                                }
                            default:

                                break;
                        }
                        tc.Controls.Add(lblNotNull);
                        #endregion
                        if (ControlType == "htmltextbox")
                        {
                            tc.ColumnSpan = ColNumSpan;
                            ColNumSpan += 1;
                        }
                        else if (int.Parse(TxtColNum) > 1)
                        {
                            tc.ColumnSpan = int.Parse(TxtColNum);
                        }
                     
                        userColNum = userColNum + ColNumSpan; //已用列数
                        tr.Cells.Add(tc);
                        if (j+1 < recnum  )  //判断下一字段是否能在当前行中显示
                        {
                            DataRow datarow1 = fddt.Rows[j+1];
                            string  TxtColNum1 = datarow1["TxtColNum"].ToString();
                            if (TxtColNum1 == "")
                            {
                                TxtColNum1 = "1";
                            }
                            int intColNum1 = int.Parse(TxtColNum1);
                            string ControlType1 = datarow1["ControlType"].ToString().ToLower();
                            if (intColNum1 == 1)
                            {
                                intColNum1 = intColNum1 * 2;
                            }
                            if (ControlType1 == "htmltextbox")
                            {
                                intColNum1 = RowTotalColNum;
                            }

                            if (userColNum + intColNum1 <= RowTotalColNum)
                            {
                                j++;//下移一个字段
                            }
                            else
                            {
                                break;
                            }
                        }
                        else
                        {
                            break;
                        }
                    }
                 }
                tb.Rows.Add(tr);
                rown += 1;
            }

            phForm.Controls.Add(tb);

        }
 
        

        /// <summary>
        /// 显示数据
        /// </summary>
        /// <param name="phForm"></param>
        /// <param name="dt">表单数据值</param>
        /// <param name="mid"></param>
        /// <param name="includeFd"></param>
        /// <param name="expFd"></param>
        public static void SetFormValue(PlaceHolder phForm, DataTable dt, string boName, string includeFd, string expFd, string mode)
        {
            DataRow drv = null;
            string ID = "";
            if (dt.Rows.Count > 0)
            {
                drv = dt.Rows[0];
                ID = drv["ID"].ToString();
            }

            DataTable fddt = GetFieldList(boName, includeFd, expFd, "1");
            //if (phForm.FindControl("lblID") != null)
            //{
            //    Label lblID = (Label)phForm.FindControl("lblID");
            //    lblID.Text = ID;
            //}
            foreach (DataRow dr in fddt.Rows)
            {
                string FieldID = dr["FieldID"].ToString();
                string ControlType = dr["ControlType"].ToString().ToLower();

                string FieldValue = "";
                if (drv != null)
                {
                    FieldValue = drv[FieldID].ToString();
                }

                switch (ControlType)
                {
                    case "textbox":
                    case "textboxs":
                        {
                            if (phForm.FindControl("txt_" + FieldID) != null)
                            {
                                TextBox txtBox = (TextBox)phForm.FindControl("txt_" + FieldID);
                                txtBox.Text = FieldValue;
                            }
                            break;
                        }
                    case "calendartextbox":
                        {
                            if (phForm.FindControl("txt_" + FieldID) != null)
                            {
                                CalendarTextBox calendarTextBox = (CalendarTextBox)phForm.FindControl("txt_" + FieldID);
                                if (FieldValue != "")
                                {
                                    FieldValue = PageValidate.FormatSmallDate(FieldValue);
                                }
                                calendarTextBox.Text = FieldValue;
                            }
                            break;
                        }
                    case "dropdownlist":
                        {
                            if (phForm.FindControl("ddl_" + FieldID) != null)
                            {
                                DropDownList dropDownList = (DropDownList)phForm.FindControl("ddl_" + FieldID);

                                if (dropDownList.SelectedItem != null)
                                {
                                    dropDownList.SelectedItem.Selected = false;
                                }
                                if (dropDownList.Items.FindByText(FieldValue) != null)
                                {
                                    dropDownList.Items.FindByText(FieldValue).Selected = true;
                                }
                            }
                            break;
                        }
                    case "checkboxlist":
                        {

                            if (FieldValue != null)
                            {
                                if (phForm.FindControl("cbl_" + FieldID) != null)
                                {
                                    CheckBoxList checkBoxList = (CheckBoxList)phForm.FindControl("cbl_" + FieldID);
                                    string[] arrFv = FieldValue.Split(',');
                                    for (int i = 0; i < arrFv.Length; i++)
                                    {
                                        if (checkBoxList.Items.FindByText(arrFv[i].ToString().Trim()) != null)
                                        {
                                            checkBoxList.Items.FindByText(arrFv[i].ToString().Trim()).Selected = true;
                                        }
                                    }
                                }
                            }
                            break;
                        }
                    case "radiobuttonlist":
                        {
                            if (phForm.FindControl("rbl_" + FieldID) != null)
                            {
                                RadioButtonList radioButtonList = (RadioButtonList)phForm.FindControl("rbl_" + FieldID);

                                if (radioButtonList.SelectedItem != null)
                                {
                                    radioButtonList.SelectedItem.Selected = false;
                                }
                                if (radioButtonList.Items.FindByText(FieldValue) != null)
                                {
                                    radioButtonList.Items.FindByText(FieldValue).Selected = true;
                                }
                            }
                            break;
                        }
                    case "fileupload":
                        {

                            if (FieldValue != "" && phForm.FindControl("file_" + FieldID) != null)
                            {
                                FileUpload fileBox = (FileUpload)phForm.FindControl("file_" + FieldID);
                                fileBox.Visible = false;
                                HyperLink hlBox = (HyperLink)phForm.FindControl("file_hl_" + FieldID);
                                hlBox.Visible = true;
                                hlBox.Text = FieldValue;
                                hlBox.NavigateUrl = "FileDownload.aspx?FieldID=" + FieldID + "&DocID=" + ID;
                                Button btnBox = (Button)phForm.FindControl("file_btn_" + FieldID);
                                btnBox.OnClientClick = "return confirm('确定要删除吗?');";
                                btnBox.Visible = true;

                            }
                            break;
                        }
                    case "label":
                        {
                            if (phForm.FindControl("lblShow_" + FieldID) != null)
                            {
                                Label lblBox = (Label)phForm.FindControl("lblShow_" + FieldID);
                                lblBox.Text = FieldValue;
                            }
                            break;
                        }
                    case "htmltextbox":
                        {
                            if (mode == "view")
                            {
                            
            
                                if (phForm.FindControl("htmldiv_" + FieldID) != null)
                                {
                                    HtmlGenericControl div = (HtmlGenericControl)phForm.FindControl("htmldiv_" + FieldID);
                                    div.TagName = "div";
                                    div.InnerHtml = FieldValue;
                                }
                            }
                            else
                            {
                                if (phForm.FindControl("html_" + FieldID) != null)
                                {
                                    FCKeditor fckEditor = (FCKeditor)phForm.FindControl("html_" + FieldID);
                                    fckEditor.Value = FieldValue;
                                }
                            }
                            break;
                        }
                    default:

                        break;
                }
            }
        }
        
        //取的表单值 
        public static Hashtable GetFormValue(PlaceHolder phForm, string BoName, string includeFd, string expFd, string ID)
        {
            Hashtable hash = new Hashtable();
            hash.Add("ID", ID);
            DataTable fddt = GetFieldList(BoName, includeFd, expFd, "1");
            foreach (DataRow dr in fddt.Rows)
            {
                string FieldID = dr["FieldID"].ToString();
                string ControlType = dr["ControlType"].ToString().ToLower();
                string IsNotNull = dr["FIsNull"].ToString();
                string FieldDesc = dr["FieldDesc"].ToString();
                string IsSys = dr["BoName"].ToString();
                string FieldValue = "";
                switch (ControlType)
                {
                    case "textbox":
                    case "textboxs":
                        {
                            if (phForm.FindControl("txt_" + FieldID) != null)
                            {
                                TextBox txtBox = (TextBox)phForm.FindControl("txt_" + FieldID);
                                FieldValue = txtBox.Text;
                            }
                            break;
                        }
                    case "calendartextbox":
                        {
                            if (phForm.FindControl("txt_" + FieldID) != null)
                            {
                                CalendarTextBox calendarTextBox = (CalendarTextBox)phForm.FindControl("txt_" + FieldID);
                                FieldValue = calendarTextBox.Text;
                            }
                            break;
                        }
                    case "dropdownlist":
                        {
                            if (phForm.FindControl("ddl_" + FieldID) != null)
                            {
                                DropDownList dropDownList = (DropDownList)phForm.FindControl("ddl_" + FieldID);

                                if (dropDownList.SelectedItem != null)
                                {
                                    FieldValue = dropDownList.SelectedItem.Text;
                                }
                                if (FieldValue == "--未选择--")
                                {
                                    FieldValue = "";
                                }
                            }
                            break;
                        }
                    case "checkboxlist":
                        {
                            if (phForm.FindControl("cbl_" + FieldID) != null)
                            {
                                CheckBoxList checkBoxList = (CheckBoxList)phForm.FindControl("cbl_" + FieldID);
                                FieldValue = EmcCommon.GetCheckBoxListText(checkBoxList);

                            }

                            break;
                        }
                    case "radiobuttonlist":
                        {
                            if (phForm.FindControl("rbl_" + FieldID) != null)
                            {
                                RadioButtonList radioButtonList = (RadioButtonList)phForm.FindControl("rbl_" + FieldID);

                                if (radioButtonList.SelectedItem != null)
                                {
                                    FieldValue = radioButtonList.SelectedItem.Text;
                                }
                            }
                            break;
                        }
                    case "label":
                        {
                            if (phForm.FindControl("lblShow_" + FieldID) != null)
                            {
                                Label lblBox = (Label)phForm.FindControl("lblShow_" + FieldID);
                                FieldValue = lblBox.Text;
                            }
                            break;
                        }
                    case "htmltextbox":
                        {
                            if (phForm.FindControl("html_" + FieldID) != null)
                            {
                                FCKeditor fckBox = (FCKeditor)phForm.FindControl("html_" + FieldID);
                                FieldValue = fckBox.Value;
                            }
                            break;
                        }
                    case "fileupload":
                        {
                            if (phForm.FindControl("file_" + FieldID) != null)
                            {
                                string fname = "";
                                FileUpload fileBox = (FileUpload)phForm.FindControl("file_" + FieldID);
                                if (fileBox != null)
                                {
                                    fname = fileBox.FileName.Trim();

                                }
                                if (fname != "" && fileBox.Visible != false)
                                {
                                    EmcCommon.SaveFiles(ID, FieldID, "", "workflow/", fileBox, null, null, null, null);
                                    FieldValue = fname;
                                    fileBox.Visible = false;
                                    HyperLink hlBox = (HyperLink)phForm.FindControl("file_hl_" + FieldID);
                                    hlBox.Visible = true;
                                    hlBox.Text = FieldValue;
                                    hlBox.NavigateUrl = "FileDownload.aspx?FieldID=" + FieldID + "&DocID=" + ID;
                                    Button btnBox = (Button)phForm.FindControl("file_btn_" + FieldID);
                                    btnBox.OnClientClick = "return confirm('确定要删除吗?');";
                                    btnBox.Visible = true;
                                }
                            }
                            break;
                        }
                    default:

                        break;
                }
                if (IsNotNull == "0" && IsSys !="sys" && (FieldValue == "" || FieldValue == "--"))
                {
                    hash.Add("0", FieldDesc + "，不能为空！");
                    return hash;
                }
                else
                {

                    hash.Add(FieldID, FieldValue);
                }

            }
            hash.Add("0", "1");
            return hash;
        }



        #endregion


    }
}
