using System;
using System.Collections.Generic;
using System.Data;
using System.Configuration;
using System.Web.UI.WebControls;
using System.Text;
using System.Collections;
using SfSoft.Common;
using SfSoft.DBUtility;
namespace SfSoft.SfEmc
{
    public class AppFlow
    {
        public static BLL.Pub_AuditFlow bllPAF = new SfSoft.BLL.Pub_AuditFlow();
        public static BLL.Pub_AuditRec bllPAR = new SfSoft.BLL.Pub_AuditRec();
        public static BLL.Pub_FunDef bllpf = new SfSoft.BLL.Pub_FunDef();
        //审批状态


        public static Hashtable CreateAuditStatus()
        {
            Hashtable hash = new Hashtable();
            hash.Add("NS", "不需要审批");
            hash.Add("SN", "未提交");
            hash.Add("S", "待审");
            hash.Add("UP", "审批中");
            hash.Add("Y", "审批同意");
            hash.Add("N", "审批不同意");
            hash.Add("UN", "撤消");
            hash.Add("UNS", "撤消申请");
            hash.Add("YUNS", "同意撤消");
            hash.Add("NUNS", "不同意撤消");
            return hash;
        }
        //取的审批状态值


        public static string GetStatus(string status)
        {
            if (status == null || status == "" || status.Trim() == "&nbsp;")
            {
                return "";
            }
            else
            {
                
                Hashtable ht = CreateAuditStatus();
                return ht[status].ToString();
            }
        }
        /// <summary>
        /// 设置审批状态文本框内容
        /// </summary>
        /// <param name="status">状态ID</param>
        /// <param name="txtBox">审批状态文本框</param>
        public static void SetStatusName(string status, TextBox txtBox)
        {
            txtBox.Text = GetStatus(status);
        }
        
        /// <summary>
        /// 取的第一级审批人,无条件单据使用


        /// </summary>
        /// <param name="MID">功能ID</param>
        /// <param name="UserID">用户ID</param>
        /// <param name="AuditUserID">审批人ID</param>
        /// <param name="DeptID">部门ID</param>
        /// <param name="FilialeID">公司ID</param>
        /// <param name="AuditClass">审批级别</param>
        /// <param name="ConditionValue">条件值，在第一级判断条件时无效，如果有条件用GetAuditUserIDCondigion方法</param>
        /// <returns></returns>
        public static Hashtable GetAuditUserID(string MID, string UserID, string AuditUserID, string DeptID, string FilialeID, string AuditClass, string ConditionValue)
        {
            Hashtable hashAd = new Hashtable();
            //取的第一级审批信息


            string strWhereA = " AuditClass = '" + AuditClass + "' and FilialeID ='" + FilialeID + "'  and MID='" + MID + "' ";
            StringBuilder strWhere = new StringBuilder();

            strWhere.Append(" ( AuditMode='P' and  AuditBound='PT' and AFID in (select AFID from Pub_AuditFlow_Dept ");
            strWhere.Append(" where DeptID='" + DeptID + "' and MID='" + MID + "')");
            strWhere.Append(" and " + strWhereA + ")");
            strWhere.Append(" or (AuditMode='P' and AuditBound='DF' and " + strWhereA + ")");
            strWhere.Append(" or ( AuditMode='U' and " + strWhereA + ")");

            DataSet ds = bllPAF.GetList(strWhere.ToString());
            string IsAuditMan = "N";
            string AuditUserID1 = "";
            string AuditName1 = "";
            string AuditClass1 = "";
            string AuditMode1 = "";
            string ConditionValue1 = "";
            string LogicName1 = "";
            string FieldName1 = "";
            string AuditBound1 = "";
            string AuditTypeName1 = "";
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {

                AuditUserID1 = ds.Tables[0].Rows[0]["AuditUserID"].ToString();
                AuditName1 = ds.Tables[0].Rows[0]["AuditName"].ToString();
                AuditClass1 = ds.Tables[0].Rows[0]["AuditClass"].ToString();
                AuditMode1 = ds.Tables[0].Rows[0]["AuditMode"].ToString();
                ConditionValue1 = ds.Tables[0].Rows[0]["ConditionValue"].ToString();
                LogicName1 = ds.Tables[0].Rows[0]["LogicName"].ToString();
                FieldName1 = ds.Tables[0].Rows[0]["FieldName"].ToString();
                AuditBound1 = ds.Tables[0].Rows[0]["AuditBound"].ToString();
                AuditTypeName1 = ds.Tables[0].Rows[0]["AuditTypeName"].ToString();
                if (FieldName1 != "N") //有条件审批
                {
                    
                    //取的单据条件值


                    if (CheckCondtion(ConditionValue1, LogicName1, ConditionValue) == true)
                    {
                        IsAuditMan = "Y";

                    }
                    else
                    {
                        //返回无审批人
                        int ac = int.Parse(AuditClass) + 1;
                        AuditClass = ac.ToString();
                        hashAd = GetAuditUserID(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, ConditionValue);
                       
 
                        return hashAd;
                    }
                }
                //条件满足
                if (AuditMode1 == "P") //指定审批
                {
                    //审批人是否为自已
                    if (UserID == AuditUserID1)
                    {
                        //如果是自已取上级审批人


                        int ac = int.Parse(AuditClass) + 1;
                        AuditClass = ac.ToString();
                        hashAd = GetAuditUserID(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, ConditionValue);
                        return hashAd;
                    }
                    else
                    {
                        hashAd.Add("AuditClass1", AuditClass1);
                        hashAd.Add("AuditUserID", AuditUserID1);
                        hashAd.Add("AuditName", AuditName1);
                        hashAd.Add("AuditTypeName", AuditTypeName1);
                        hashAd.Add("IsAuditMan", "Y");
                        return hashAd;
                    }
                }
                else
                {//上级审批
                    //取部审批人


                    Hashtable hastp = GetDeptAuditMan(DeptID, UserID, 0, "", FilialeID);
                    if (hastp["IsAuditMan"].ToString() == "Y")
                    {
                        string AuditUserID2 = hastp["AuditUserID2"].ToString();
                        //审批人是否为自已
                        if (UserID == AuditUserID2)
                        {
                            //如果是自已取上级审批人


                            int ac = int.Parse(AuditClass) + 1;
                            AuditClass = ac.ToString();
                            hashAd = GetAuditUserID(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, ConditionValue);
                            return hashAd;
                        }
                        else
                        {
                            hashAd.Add("AuditClass1", AuditClass1);
                            hashAd.Add("AuditUserID", hastp["AuditUserID2"].ToString());
                            hashAd.Add("AuditName", hastp["AuditName2"].ToString());
                            hashAd.Add("AuditTypeName", AuditTypeName1);
                            hashAd.Add("IsAuditMan", "Y");
                        }
                    }
                    else
                    {
                        hashAd.Add("AuditClass1", AuditClass1);
                        hashAd.Add("IsAuditMan", "N");
                        hashAd.Add("AuditUserID", "0");
                        hashAd.Add("AuditName", "");
                        hashAd.Add("AuditTypeName", "");
                    }
                    return hashAd;
                }

            }
            else //审批人


            {
                //是否还有上一级审批，跳过当前级别审批
                int ac = int.Parse(AuditClass) + 1;
                AuditClass = ac.ToString();
                if (DoAppFlow.CheckUpAuditClass(AuditClass, MID, FilialeID))
                {
                    hashAd = GetAuditUserID(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, ConditionValue);
                }
                else
                {
                    if (int.Parse(AuditClass) > 1) //最后审批人是自已


                    {
                        hashAd.Add("AuditClass1", ac - 1);
                        hashAd.Add("IsAuditMan", "Y");
                        hashAd.Add("AuditUserID", UserID);
                        hashAd.Add("AuditName", "");
                        hashAd.Add("AuditTypeName", "特殊审批");
                    }
                    else //无任审批人


                    {
                        hashAd.Add("AuditClass1", ac - 1);
                        hashAd.Add("IsAuditMan", "N");
                        hashAd.Add("AuditUserID", "0");
                        hashAd.Add("AuditName", "");
                        hashAd.Add("AuditTypeName", "");
                    }
                }
                return hashAd;
            }
            //  return hashAd;
        }
        /// <summary>
        /// 取的第一级审批人，有条件单据使用
        /// </summary>
        /// <param name="MID">功能ID</param>
        /// <param name="UserID">用户ID</param>
        /// <param name="AuditUserID">审批人ID</param>
        /// <param name="DeptID">部门ID</param>
        /// <param name="FilialeID">公司ID</param>
        /// <param name="AuditClass">审批级别</param>
        /// <param name="DocID">单据ID</param>
        /// <returns></returns>
        public static Hashtable GetAuditUserIDApp(string MID, string UserID, string AuditUserID, string DeptID, string FilialeID, string AuditClass, string DocID)
        {
            Hashtable hashAd = new Hashtable();
            //取的第一级审批信息


            string strWhereA = " AuditClass = '" + AuditClass + "' and FilialeID ='" + FilialeID + "'  and MID='" + MID + "' ";
            StringBuilder strWhere = new StringBuilder();

            strWhere.Append(" ( AuditMode='P' and  AuditBound='PT' and AFID in (select AFID from Pub_AuditFlow_Dept ");
            strWhere.Append(" where DeptID='" + DeptID + "' and MID='" + MID + "')");
            strWhere.Append(" and " + strWhereA + ")");
            strWhere.Append(" or (AuditMode='P' and AuditBound='DF' and " + strWhereA + ")");
            strWhere.Append(" or ( AuditMode='U' and " + strWhereA + ")");

            DataSet ds = bllPAF.GetList(strWhere.ToString());
            string IsAuditMan = "N";
            string AuditUserID1 = "";
            string AuditName1 = "";
            string AuditClass1 = "";
            string AuditMode1 = "";
            string ConditionValue1 = "";
            string LogicName1 = "";
            string FieldName1 = "";
            string AuditBound1 = "";
            string AuditTypeName1 = "";
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                bool CkCdValue = false;
                bool IsCd = false;
                foreach (DataRow drad in ds.Tables[0].Rows)
                {
                    AuditUserID1 = drad["AuditUserID"].ToString();
                    AuditName1 = drad["AuditName"].ToString();
                    AuditClass1 = drad["AuditClass"].ToString();
                    AuditMode1 = drad["AuditMode"].ToString();
                    ConditionValue1 = drad["ConditionValue"].ToString();
                    LogicName1 = drad["LogicName"].ToString();
                    FieldName1 = drad["FieldName"].ToString();
                    AuditBound1 = drad["AuditBound"].ToString();
                    AuditTypeName1 = drad["AuditTypeName"].ToString();
                    if (FieldName1 != "N") //有条件审批


                    {
                        string ConditionValue = GetConditionValue(MID, DocID, FieldName1);
                        //取的单据条件值


                        if (CheckCondtion(ConditionValue1, LogicName1, ConditionValue) == true)
                        {
                            IsAuditMan = "Y";
                            CkCdValue = true;
                            break;
                        }
                    }
                    else
                    {
                        IsAuditMan = "Y";
                        IsCd = true;
                    }
                }

                //有条件，所有条件不成立,没有无条件审批


                if (CkCdValue != true && IsCd != true)
                {

                    //返回无审批人
                    int ac = int.Parse(AuditClass) + 1;
                    AuditClass = ac.ToString();
                    hashAd = GetAuditUserIDApp(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, DocID);
                    return hashAd;

                }

                //条件满足
                if (AuditMode1 == "P") //指定审批
                {
                    //审批人是否为自已
                    if (UserID == AuditUserID1)
                    {
                        //如果是自已取上级审批人


                        int ac = int.Parse(AuditClass) + 1;
                        AuditClass = ac.ToString();
                        hashAd = GetAuditUserIDApp(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, DocID);
                        return hashAd;
                    }
                    else
                    {
                        hashAd.Add("AuditClass1", AuditClass1);
                        hashAd.Add("AuditUserID", AuditUserID1);
                        hashAd.Add("AuditName", AuditName1);
                        hashAd.Add("AuditTypeName", AuditTypeName1);
                        hashAd.Add("IsAuditMan", "Y");
                        return hashAd;
                    }
                }
                else
                {//上级审批
                    //取部审批人


                    Hashtable hastp = GetDeptAuditMan(DeptID, UserID, 0, "", FilialeID);
                    if (hastp["IsAuditMan"].ToString() == "Y")
                    {
                        string AuditUserID2 = hastp["AuditUserID2"].ToString();
                        //审批人是否为自已
                        if (UserID == AuditUserID2)
                        {
                            //如果是自已取上级审批人


                            int ac = int.Parse(AuditClass) + 1;
                            AuditClass = ac.ToString();
                            hashAd = GetAuditUserIDApp(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, DocID);
                            return hashAd;
                        }
                        else
                        {
                            hashAd.Add("AuditClass1", AuditClass1);
                            hashAd.Add("AuditUserID", hastp["AuditUserID2"].ToString());
                            hashAd.Add("AuditName", hastp["AuditName2"].ToString());
                            hashAd.Add("AuditTypeName", AuditTypeName1);
                            hashAd.Add("IsAuditMan", "Y");
                        }
                    }
                    else
                    {
                        hashAd.Add("AuditClass1", AuditClass1);
                        hashAd.Add("IsAuditMan", "N");
                        hashAd.Add("AuditUserID", "0");
                        hashAd.Add("AuditName", "");
                        hashAd.Add("AuditTypeName", "");
                    }
                    return hashAd;
                }

            }
            else //审批人


            {
                //是否还有上一级审批，跳过当前级别审批
                int ac = int.Parse(AuditClass) + 1;
                AuditClass = ac.ToString();
                if (DoAppFlow.CheckUpAuditClass(AuditClass, MID, FilialeID))
                {
                    hashAd = GetAuditUserIDApp(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, DocID);
                }
                else
                {
                    if (int.Parse(AuditClass) > 1) //最后审批人是自已


                    {
                        hashAd.Add("AuditClass1", ac - 1);
                        hashAd.Add("IsAuditMan", "Y");
                        hashAd.Add("AuditUserID", UserID);
                        hashAd.Add("AuditName", "");
                        hashAd.Add("AuditTypeName", "特殊审批");
                    }
                    else //无任审批人


                    {
                        hashAd.Add("AuditClass1", ac - 1);
                        hashAd.Add("IsAuditMan", "N");
                        hashAd.Add("AuditUserID", "0");
                        hashAd.Add("AuditName", "");
                        hashAd.Add("AuditTypeName", "");
                    }
                }
                return hashAd;
            }
            //  return hashAd;
        }
        /// <summary>
        /// 取的第一级审批人,有条件
        /// </summary>
        /// <param name="MID">功能ID</param>
        /// <param name="UserID">用户ID</param>
        /// <param name="AuditUserID">审批人ID</param>
        /// <param name="DeptID">部门ID</param>
        /// <param name="FilialeID">公司ID</param>
        /// <param name="AuditClass">审批级别</param>
        /// <param name="ConditionValue">条件值,hashtable类型</param>
        /// <returns></returns>
        public static Hashtable GetAuditUserIDCondition(string MID, string UserID, string AuditUserID, string DeptID, string FilialeID, string AuditClass, Hashtable  HashConditionValue)
        {
            Hashtable hashAd = new Hashtable();
            //取的第一级审批信息


            string strWhereA = " AuditClass = '" + AuditClass + "' and FilialeID ='" + FilialeID + "'  and MID='" + MID + "' ";
            StringBuilder strWhere = new StringBuilder();

            strWhere.Append(" ( AuditMode='P' and  AuditBound='PT' and AFID in (select AFID from Pub_AuditFlow_Dept ");
            strWhere.Append(" where DeptID='" + DeptID + "' and MID='" + MID + "')");
            strWhere.Append(" and " + strWhereA + ")");
            strWhere.Append(" or (AuditMode='P' and AuditBound='DF' and " + strWhereA + ")");
            strWhere.Append(" or ( AuditMode='U' and " + strWhereA + ")");
            strWhere.Append("  order by ConditionValue desc ");
            DataSet ds = bllPAF.GetList(strWhere.ToString());
            string IsAuditMan = "N";
            string AuditUserID1 = "";
            string AuditName1 = "";
            string AuditClass1 = "";
            string AuditMode1 = "";
            string ConditionValue1 = "";
            string LogicName1 = "";
            string FieldName1 = "";
            string AuditBound1 = "";
            string AuditTypeName1 = "";
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                bool CkCdValue = false;
                bool IsCd = false;
                foreach (DataRow drad in ds.Tables[0].Rows)
                {
                    AuditUserID1 = drad["AuditUserID"].ToString();
                    AuditName1 = drad["AuditName"].ToString();
                    AuditClass1 = drad["AuditClass"].ToString();
                    AuditMode1 = drad["AuditMode"].ToString();
                    ConditionValue1 = drad["ConditionValue"].ToString();
                    LogicName1 = drad["LogicName"].ToString();
                    FieldName1 = drad["FieldName"].ToString();
                    AuditBound1 = drad["AuditBound"].ToString();
                    AuditTypeName1 = drad["AuditTypeName"].ToString();
                    if (FieldName1 != "N") //有条件审批


                    {
                        string ConditionValue = HashConditionValue[FieldName1].ToString().Trim();
                        //取的单据条件值


                        if (CheckCondtion(ConditionValue1, LogicName1, ConditionValue) == true)
                        {
                            IsAuditMan = "Y";
                            CkCdValue = true;
                            break;
                        }
                     }
                    else
                    {
                        IsAuditMan = "Y";
                        IsCd = true;
                    }
                }
                //有条件，所有条件不成立,没有无条件审批


                if (CkCdValue != true && IsCd != true)
                {

                    //返回无审批人
                    int ac = int.Parse(AuditClass) + 1;
                    AuditClass = ac.ToString();
                    hashAd = GetAuditUserIDCondition(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, HashConditionValue);
                    return hashAd;

                }
                //条件满足
                if (AuditMode1 == "P") //指定审批
                {
                    //审批人是否为自已
                    if (UserID == AuditUserID1)
                    {
                        //如果是自已取上级审批人
                        int ac = int.Parse(AuditClass) + 1;
                        AuditClass = ac.ToString();
                        hashAd = GetAuditUserIDCondition(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, HashConditionValue);
                        return hashAd;
                    }
                    else
                    {
                        hashAd.Add("AuditClass1", AuditClass1);
                        hashAd.Add("AuditUserID", AuditUserID1);
                        hashAd.Add("AuditName", AuditName1);
                        hashAd.Add("AuditTypeName", AuditTypeName1);
                        hashAd.Add("IsAuditMan", "Y");
                        return hashAd;
                    }
                }
                else
                {//上级审批
                    //取部审批人


                    Hashtable hastp = GetDeptAuditMan(DeptID, UserID, 0, "", FilialeID);
                    if (hastp["IsAuditMan"].ToString() == "Y")
                    {
                        string AuditUserID2 = hastp["AuditUserID2"].ToString();
                        //审批人是否为自已
                        if (UserID == AuditUserID2)
                        {
                            //如果是自已取上级审批人


                            int ac = int.Parse(AuditClass) + 1;
                            AuditClass = ac.ToString();
                            hashAd = GetAuditUserIDCondition(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, HashConditionValue);
                            return hashAd;
                        }
                        else
                        {
                            hashAd.Add("AuditClass1", AuditClass1);
                            hashAd.Add("AuditUserID", hastp["AuditUserID2"].ToString());
                            hashAd.Add("AuditName", hastp["AuditName2"].ToString());
                            hashAd.Add("AuditTypeName", AuditTypeName1);
                            hashAd.Add("IsAuditMan", "Y");
                        }
                    }
                    else
                    {
                        hashAd.Add("AuditClass1", AuditClass1);
                        hashAd.Add("IsAuditMan", "N");
                        hashAd.Add("AuditUserID", "0");
                        hashAd.Add("AuditName", "");
                        hashAd.Add("AuditTypeName", "");
                    }
                    return hashAd;
                }

            }
            else //审批人


            {
                //是否还有上一级审批，跳过当前级别审批
                int ac = int.Parse(AuditClass) + 1;
                AuditClass = ac.ToString();
                if (DoAppFlow.CheckUpAuditClass(AuditClass, MID, FilialeID))
                {
                    hashAd = GetAuditUserIDCondition(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, HashConditionValue);
                }
                else
                {
                    if (int.Parse(AuditClass) > 2) //最后审批人是自已


                    {
                        hashAd.Add("AuditClass1", ac - 1);
                        hashAd.Add("IsAuditMan", "Y");
                        hashAd.Add("AuditUserID", UserID);
                        hashAd.Add("AuditName", "");
                        hashAd.Add("AuditTypeName", "特殊审批");
                    }
                    else //无任审批人


                    {
                        hashAd.Add("AuditClass1", ac - 1);
                        hashAd.Add("IsAuditMan", "N");
                        hashAd.Add("AuditUserID", "0");
                        hashAd.Add("AuditName", "");
                        hashAd.Add("AuditTypeName", "");
                    }
                }
                return hashAd;
            }
            //  return hashAd;
        }

        public static string GetConditionValue(string MID,string DocID,string CdField)
        {
            DataSet dsfd = EmcCommon.GetBoInfo("FunID='"+MID+"' and FunType='App'", "Pub_FunDef");
            string BoName = "";
            string CdValue = "0";
            if (dsfd.Tables[0].Rows.Count > 0)
            {
                BoName = dsfd.Tables[0].Rows[0]["BoName"].ToString();
            }
            if (BoName != "")
            {
                DataSet dscd = EmcCommon.GetBoInfo("ID='" + DocID + "'", BoName);
                if (dscd.Tables[0].Rows.Count > 0)
                {
                    CdValue = dscd.Tables[0].Rows[0][CdField].ToString();
                }
            }

            return CdValue;
        }
        //判断审批条件
        //ConditionValue1:审批设置值，ConditionValue单据值


        public static bool CheckCondtion(string ConditionValue1, string LogicName1, string ConditionValue)
        {
            if (ConditionValue==null || ConditionValue == "")
            {
                return false ;
            }
            //是否为数字型
            if ((PageValidate.IsNumber(ConditionValue)) && (PageValidate.IsNumber(ConditionValue1)))
            {


                if (LogicName1 == ">")
                {
                    if (PageValidate.StringToDecimal(ConditionValue) > PageValidate.StringToDecimal(ConditionValue1))
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else if (LogicName1 == ">=")
                {
                    if (PageValidate.StringToDecimal(ConditionValue) >= PageValidate.StringToDecimal(ConditionValue1))
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else if (LogicName1 == "=")
                {
                    if (PageValidate.StringToDecimal(ConditionValue) == PageValidate.StringToDecimal(ConditionValue1))
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return true;
                }
            }
            else
            {
                //字符处理
                string ConditionValue2 = ","+ ConditionValue + ",";
                string ConditionValue11 = "," + ConditionValue1 + ",";
                if (ConditionValue11.IndexOf(ConditionValue2) >= 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        //部门第一级取上级审批人


        public static Hashtable GetDeptAuditMan(string DeptID, string UserID, int level, string AuditName, string FilialeID)
        {

            Hashtable hashdam = new Hashtable();
            BLL.Pub_Dept bllpd = new SfSoft.BLL.Pub_Dept();
            string strWhere1 = " DeptID = '" + DeptID + "' and FilialeID='" + FilialeID + "' and AuditID<>'0' ";
            DataSet dspd = bllpd.GetList(strWhere1);
            if (dspd != null && dspd.Tables[0].Rows.Count > 0)
            {
                string AuditUserID2 = dspd.Tables[0].Rows[0]["AuditID"].ToString();
                string AuditName2 = dspd.Tables[0].Rows[0]["AuditName"].ToString();

                hashdam.Add("IsAuditMan", "Y");
                hashdam.Add("AuditUserID2", AuditUserID2);
                hashdam.Add("AuditName2", AuditName2);
                return hashdam;

            }
            else //无审批人
            {

                hashdam.Add("IsAuditMan", "N");

                return hashdam;
            }
        }



        //是否需要审批


        public static string GetIsApprove(string MID)
        {

            string strWhere = " FunID ='" + MID + "' and FunType='App'";
            DataSet dspf = bllpf.GetList(strWhere);
            string isApprove = "Y";
            if (dspf != null && dspf.Tables[0].Rows.Count > 0)
            {
                isApprove = dspf.Tables[0].Rows[0]["IsApprove"].ToString();

            }
            return isApprove;
        }

        //取的审批条件


        //加入审批流程

        //设置审批按扭
        public static void SetButton(string Status, Button btnSave, Button btnSubmit, Button btnCancel, Button btnSubCancel)
        {

            switch (Status.Trim())
            {
                case "NS":
                    btnSave.Visible = true;
                    break;
                case "SN":
                    btnSave.Visible = true;
                    btnSubmit.Visible = true;
                    break;
                case "S":
                    btnSubmit.Visible = true;
                    btnCancel.Visible = true;
                    break;
                case "UP":
                    btnCancel.Visible = true;
                    break;
                case "Y":
                    btnSubCancel.Visible = true;
                    break;
                case "N":
                    btnSave.Visible = true;
                    btnSubmit.Visible = true;
                    break;
                case "UN":
                    btnSave.Visible = true;
                    btnSubmit.Visible = true;
                    break;

            }

        }
        //重写单据信息 审批状态，撤消状态，撤消时间
        public static void UpdateBoAppInfo(string NewStatus, string UndoFlag, string UnDoDate, string DocID, string BoName)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" update " + BoName.Trim() + " set ");
            strSql.Append(" status='" + NewStatus.Trim() + "',");
            strSql.Append(" StatusName='" + GetStatus(NewStatus.Trim()).Trim() + "',");
            strSql.Append(" UndoFlag='" + UndoFlag.Trim() + "',");
            strSql.Append(" UnDoDate='" + UnDoDate.Trim() + "'");
            strSql.Append(" where ID='" + DocID.Trim() + "'");
            DbHelperSQL.ExecuteSql(strSql.ToString());
        }

        /// <summary>
        /// 取得单据审批信息
        /// </summary>
        /// <param name="DocID">单据ID</param>
        /// <param name="BoName">表名</param>
        /// <param name="ConditionFiled">条件字段</param>
        /// <returns></returns>
        public static Hashtable GetDocAppInfo(string DocID, String BoName)
        {
            Hashtable hash = new Hashtable();
            string strWhere = " ID = '" + DocID + "'";
            string UserID = "";
            string DeptID = "";
            string Status = "";
            string SubmitDate = "";
            string Remark = "";
            string StatusName = "";
            string UndoFlag = "";
            string UndoDate = "";
            string FilialeID = "";
 
            string Signs = "";
            string ObjPriority = "";
            DataSet ds = EmcCommon.GetBoInfo(strWhere, BoName);
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                UserID = ds.Tables[0].Rows[0]["UserID"].ToString();
                DeptID = ds.Tables[0].Rows[0]["DeptID"].ToString();
                Status = ds.Tables[0].Rows[0]["Status"].ToString();
                SubmitDate = ds.Tables[0].Rows[0]["SubmitDate"].ToString();
                Remark = ds.Tables[0].Rows[0]["Remark"].ToString();
                StatusName = ds.Tables[0].Rows[0]["StatusName"].ToString();
                UndoFlag = ds.Tables[0].Rows[0]["UndoFlag"].ToString();
                UndoDate = ds.Tables[0].Rows[0]["UndoDate"].ToString();
                FilialeID = ds.Tables[0].Rows[0]["FilialeID"].ToString();
                Signs = ds.Tables[0].Rows[0]["Signs"].ToString();
                ObjPriority = ds.Tables[0].Rows[0]["ObjPriority"].ToString();
                
            }
            hash.Add("UserID", UserID);
            hash.Add("DeptID", DeptID);
            hash.Add("Status", Status);
            hash.Add("SubmitDate", SubmitDate);
            hash.Add("Remark", Remark);
            hash.Add("StatusName", StatusName);
            hash.Add("UndoFlag", UndoFlag);
            hash.Add("UndoDate", UndoDate);
            hash.Add("FilialeID", FilialeID);
 
            hash.Add("Signs", Signs);
            hash.Add("ObjPriority", ObjPriority);

            return hash;
        }

        public static Hashtable GetConditionHash(string ID,string BoName)
        {
            Hashtable hash = new Hashtable();
            //取的审批条件字段
            string sql = "select FieldID from emc_freeform_field where BoName='" + BoName + "' and FIsAppCd='1'";
            DataSet ds = DbHelperSQL.Query(sql);
            //取的字段值
            string sql1 = "select * from " + BoName + " where id='" + ID + "'";
            DataSet ds1 = DbHelperSQL.Query(sql1);
            string FieldValue="";
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                if (ds1.Tables [0].Rows .Count >0) {
                    FieldValue=ds1.Tables [0].Rows [0][dr["FieldID"].ToString ()].ToString ();
                }
                hash.Add(dr["FieldID"].ToString(), FieldValue);
            }
            return hash;

        }


        /// <summary>
        /// 审批业务
        /// </summary>
        /// <param name="DocID">单据ID</param>
        /// <param name="MID">功能ID</param>
        /// <param name="DoStatus">审批状态</param>
        public static void DoAppBo(string DocID, string MID, string DoStatus)
        {
            //取的表名
            string BoName = EmcCommon.GetFunDefValue("BoName", MID);
            string PagePath = EmcCommon.GetFunDefValue("PagePath", MID);
            Model.Pub_AuditRec modelPAR = new SfSoft.Model.Pub_AuditRec();
            //取的审批流中的记录
            modelPAR = bllPAR.GetModel(MID, DocID);
            //取审批条件字段
           // string ConditionField = GetConditionField(MID);
            //取的单据信息
            Hashtable hash = AppFlow.GetDocAppInfo(DocID, BoName);
            int ARID = 0;
            string UserID = hash["UserID"].ToString();
            string DeptID = hash["DeptID"].ToString();
            string FilialeID = hash["FilialeID"].ToString();
 
            string Status = hash["Status"].ToString();
            string NewStatus = "";
            string UndoFlag = hash["UndoFlag"].ToString();
            string UnDoDate = hash["UndoDate"].ToString();
            string SubmitDate = hash["SubmitDate"].ToString();
            string Remark = hash["Remark"].ToString();
            string Signs = hash["Signs"].ToString();
            string ObjPriority = hash["ObjPriority"].ToString();
            string AuditClass = "1";
            string AuditUserID = "";
            string AuditName = "";
            string AuditTypeName = "";
            string Msg = "";//提标消息
            string ObjName = EmcCommon.GetModulesName(MID);
            if (DoStatus == "S") //提交
            {
                NewStatus = "S";
                //取的审批人


                Hashtable hashad = new Hashtable();
                hashad = GetAuditUserIDApp(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, DocID);
                AuditUserID = hashad["AuditUserID"].ToString();
                AuditTypeName = hashad["AuditTypeName"].ToString();
                string AuditClass1 = hashad["AuditClass1"].ToString();


                //审批人=自已，特殊审批


                if (AuditUserID == UserID)
                {
                    AuditName = EmcCommon.getUserCnNameByID(AuditUserID);
                    NewStatus = "Y";
                }
                else
                {
                    //检查代理审批 
                    string SurManID = CheckSurrogate(AuditUserID, MID, SubmitDate, FilialeID);
                    if (SurManID == "")
                    {

                        AuditName = hashad["AuditName"].ToString();

                    }
                    else
                    {
                        AuditUserID = SurManID;
                        AuditName = EmcCommon.getUserCnNameByID(AuditUserID) + "代理";
                    }
                }
                if (modelPAR == null)//新建审批记录
                {
                    modelPAR = new SfSoft.Model.Pub_AuditRec();
                    modelPAR.MID = MID;
                    modelPAR.ReqDeptID = PageValidate.StringToInt(DeptID);
                    modelPAR.ObjPriority = ObjPriority;
                    modelPAR.ObjName = ObjName;
                    modelPAR.ObjNo = DocID;
                    modelPAR.UserID = PageValidate.StringToInt(UserID);
                    modelPAR.CnName = Signs;
                    modelPAR.ReqDate = PageValidate.StringToDatetime(SubmitDate);
                    //modelPAR.LastAuditDate = LastAuditDate;
                    //modelPAR.ObjDate = ObjDate;
                    modelPAR.ReqRemark = Remark;
                    modelPAR.AuditName = AuditName;
                    modelPAR.AuditUserID = PageValidate.StringToInt(AuditUserID);
                    //modelPAR.AuditDate = AuditDate;
                    modelPAR.StatusFlag = NewStatus;
                    modelPAR.UndoFlag = "N";
                    // modelPAR.UndoDate = UndoDate;
                    //modelPAR.Contrl2 = Contrl2;
                    modelPAR.AuditClass = PageValidate.StringToInt(AuditClass1);
                    // modelPAR.Remark = Remark;
                   // modelPAR.ConditionValue = ConditionValue;
                    //modelPAR.AuditNameSign = AuditNameSign;
                    modelPAR.AuditTypeName = AuditTypeName;
                    modelPAR.FilialeID = FilialeID;
                    modelPAR.BoName = BoName;
                    modelPAR.PagePath = PagePath;
                    ARID = bllPAR.Add(modelPAR);
                    Msg = "提交" + ObjName + "申请";
                }
                else //修改审批记录
                {
                    modelPAR.StatusFlag = NewStatus;
                    modelPAR.ReqDeptID = PageValidate.StringToInt(DeptID);
                    modelPAR.ReqRemark = Remark;
                    modelPAR.AuditUserID = PageValidate.StringToInt(AuditUserID);
                    modelPAR.AuditName = AuditName;
                    modelPAR.ReqDate = PageValidate.StringToDatetime(SubmitDate);
                    modelPAR.AuditTypeName = AuditTypeName;
                    modelPAR.ObjPriority = ObjPriority;
                   // modelPAR.ConditionValue = ConditionValue;
                    modelPAR.AuditClass = PageValidate.StringToInt(AuditClass1);
                    modelPAR.UndoFlag = "N";
                    bllPAR.Update(modelPAR);
                    ARID = modelPAR.ARID;
                    Msg = "重新提交" + ObjName + "申请";
                }
                if (NewStatus == "Y")
                {
                    DoAppFlow.SaveAuditResult(ARID, "1", AuditName, SubmitDate, "", "Y", AuditTypeName, AuditUserID, "", MID);
                }
            }
            else if (DoStatus == "UN") //撤消
            {

                NewStatus = "UN";
                modelPAR.StatusFlag = NewStatus;
                modelPAR.UndoDate = DateTime.Now;
                modelPAR.AuditName = "";
                modelPAR.AuditUserID = null;
                modelPAR.AuditDate = null;
                bllPAR.Update(modelPAR);
                AuditName = modelPAR.AuditName;
                AuditUserID = modelPAR.AuditUserID.ToString();
                Msg = "撤消" + ObjName + "申请";

            }
            else if (DoStatus == "UNS")//申请撤消
            {
                //更改审批流中的状态


                modelPAR.StatusFlag = "S";
                modelPAR.UndoFlag = "UNS";
                NewStatus = Status;
                UndoFlag = "UNS";
                bllPAR.Update(modelPAR);
                AuditName = modelPAR.AuditName;
                AuditUserID = modelPAR.AuditUserID.ToString();
                Msg = "提交" + ObjName + "撤消申请";
            }

            //重写单据信息 审批状态，撤消状态，撤消时间
            AppFlow.UpdateBoAppInfo(NewStatus, UndoFlag, UnDoDate, DocID, BoName);

            if (ObjPriority == "")
            {
                ObjPriority = "正常";
            }
            string StatusName = GetStatus(NewStatus);
            //发送消息


            SendAppMsn(Msg, ObjName, DocID, SubmitDate, StatusName, Signs, UserID, AuditName, AuditUserID, ObjPriority, Remark,MID);

        }

        //取审批条件字段
        public static string GetConditionField(string MID)
        {
            string ConditionField = "";

            BLL.Pub_ACFlow bllACF = new SfSoft.BLL.Pub_ACFlow();
            string strWhere = " MID ='" + MID + "'";
            DataSet dsACF = bllACF.GetList(strWhere);
            if (dsACF != null && dsACF.Tables[0].Rows.Count > 0)
            {
                ConditionField = dsACF.Tables[0].Rows[0]["FieldName"].ToString();

            }
            return ConditionField;
        }

        //检查是否有代理审批
        public static string CheckSurrogate(string AuditUserID, string MID, string SubDt, string FilialeID)
        {
            BLL.Pub_Surrogate bllSur = new SfSoft.BLL.Pub_Surrogate();
            string SurManID = "";
            string strWhere1 = "FilialeID='" + FilialeID + "' and  MID='" + MID + "' and AuditManID='" + AuditUserID + "'";
            strWhere1 += " and  (IsLimit='无' or (IsLimit = '有' and StartDate<='" + SubDt + "' and EndDate>='" + SubDt + "'))";
            DataSet dsck = bllSur.GetList(strWhere1);
            if (dsck.Tables[0].Rows.Count > 0)
            {
                SurManID = dsck.Tables[0].Rows[0]["SurManID"].ToString();
            }
            return SurManID;
        }

        //取上级审批信息
        /// <summary>
        ///  发送申请审批消息
        /// </summary>
        /// <param name="msg">提示内容</param>
        /// <param name="ObjName">功能名</param>
        /// <param name="ObjNo">单据号</param>
        /// <param name="ReqDate">提交日期</param>
        /// <param name="StatusName">状态名</param>
        /// <param name="CnName">申请人</param>
        /// <param name="UserID">申请人ID</param>
        /// <param name="AuditName">审批人</param>
        /// <param name="AuditUserID">审批人ID</param>
        /// <param name="ObjPriority">重要性</param>
        /// <param name="Remark">申请备注</param>
        public static void SendAppMsn(string msg, string ObjName, string ObjNo, string ReqDate, string StatusName, string CnName, string UserID, string AuditName, string AuditUserID, string ObjPriority, string Remark,string MID)
        {
            string sql="select CallType from Pub_FunDef  where FunID='" + MID  + "' and FunType='App'";
            DataSet ds = DBTools.GetList(sql);
            string CallType = "0";
            if (ds.Tables[0].Rows.Count > 0)
            {
                CallType = ds.Tables[0].Rows[0]["CallType"].ToString();
            }
            StringBuilder strMsn = new StringBuilder();
            strMsn.Append("--------EMC审批流程：消息提醒--------------<br>");
            strMsn.Append("『" + msg + "』<br>");
            strMsn.Append("类型:" + ObjName + "<br>");
            strMsn.Append("编号:" + ObjNo + "<br>");
            strMsn.Append("申请时间:" + ReqDate + "<br>");
            strMsn.Append("申请状态:" + StatusName + "<br>");
            strMsn.Append("申请人:" + CnName + "<br>");
            strMsn.Append("审批人:" + AuditName + "<br>");
            strMsn.Append("紧迫性:" + ObjPriority + "<br>");
            strMsn.Append("备注:" + Remark + "<br>");
            strMsn.Append("---------------------------------");
            string smsmsg = "EMC审批流程：短信提醒，『" + msg + "』类型：" + ObjName + "，编号：" + ObjNo + "，状态：" + StatusName + "";
            string UserIds = "";
            if (UserID != "")
            {
                UserIds = UserID+",";
 
            }
            if (AuditUserID != "")
            {
                UserIds += AuditUserID + ",";
            }

            if (UserIds != "")
            {
                UserIds = UserIds.Substring(0, UserIds.Length - 1);
            }
            else
            {
                return;
            }
            //发送消息

            string SendUserID = UserID;
            string SendCnName = CnName;
            string Flag = "0";
            string AppID = "emc";
            string ModulesID = MID ;
            string DocID = ObjNo;
            EmcCommon.SendMsg(strMsn.ToString(), smsmsg, UserIds, CallType, SendUserID, SendCnName, Flag, AppID, ModulesID, DocID,"-1");
 
        }

        /// <summary>
        ///  发送审批消息
        /// </summary>
        /// <param name="msg">提示内容</param>
        /// <param name="ObjName">功能名</param>
        /// <param name="ObjNo">单据号</param>
        /// <param name="AuditDate">审批日期</param>
        /// <param name="StatusName">状态名</param>
        /// <param name="CnName">申请人</param>
        /// <param name="UserID">申请人ID</param>
        /// <param name="AuditName">审批人</param>
        /// <param name="AuditUserID">审批人ID</param>
        /// <param name="ObjPriority">重要性</param>
        /// <param name="Remark">申请备注</param>
        public static void SendDoAppMsn(string msg, string ObjName, string ObjNo, string ReqDate, string StatusName, string CnName, string UserID, string AuditName, string AuditUserID, string ObjPriority, string Remark,string MID)
        {

            string sql = "select CallType from Pub_FunDef  where FunID='" + MID + "' and FunType='App'";
            DataSet ds = DBTools.GetList(sql);
            string CallType = "0";
            if (ds.Tables[0].Rows.Count > 0)
            {
                CallType = ds.Tables[0].Rows[0]["CallType"].ToString();
            }

            StringBuilder strMsn = new StringBuilder();
            strMsn.Append("--------消息提醒--------------<br>");
            strMsn.Append("『" + msg + "』<br>");
            strMsn.Append("类型:" + ObjName + "<br>");
            strMsn.Append("编号:" + ObjNo + "<br>");
            strMsn.Append("申请时间:" + ReqDate + "<br>");
            strMsn.Append("申请状态:" + StatusName + "<br>");
            strMsn.Append("申请人:" + CnName + "<br>");
            strMsn.Append("审批人:" + AuditName + "<br>");
            strMsn.Append("紧迫性:" + ObjPriority + "<br>");
            strMsn.Append("备注:" + Remark + "<br>");
            strMsn.Append("---------------------------------");
            string smsmsg = "EMC审批流程：短信提醒，『" + msg + "』类型：" + ObjName + "，编号：" + ObjNo + "，状态：" + StatusName + "";

            string UserIds = "";
            //发送消息
            if (UserID != "")
            {
                UserIds = UserID + ",";

            }
            if (AuditUserID != "")
            {
                UserIds += AuditUserID + ",";
            }

            if (UserIds != "")
            {
                UserIds = UserIds.Substring(0, UserIds.Length - 1);
            }
            else
            {
                return;
            }
            //发送消息

            string SendUserID = AuditUserID;
            string SendCnName = AuditName;
            string Flag = "0";
            string AppID = "emc";
            string ModulesID = MID;
            string DocID = ObjNo;
            EmcCommon.SendMsg(strMsn.ToString(), smsmsg, UserIds, CallType, SendUserID, SendCnName, Flag, AppID, ModulesID, DocID, "-1");

        }
    }
}
