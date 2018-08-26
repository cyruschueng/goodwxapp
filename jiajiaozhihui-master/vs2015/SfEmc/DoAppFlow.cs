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

    public class DoAppFlow
    {
        public static BLL.Pub_AuditFlow bllPAF = new SfSoft.BLL.Pub_AuditFlow();
        public static BLL.Pub_AuditRec bllPAR = new SfSoft.BLL.Pub_AuditRec();
        public static BLL.Pub_FunDef bllpf = new SfSoft.BLL.Pub_FunDef();

        
        /// <summary>
        /// 验证是否当前审批人
        /// </summary>
        /// <param name="DocID">单据ID</param>
        /// <param name="MID">模块ID</param>
        /// <param name="UserID">用户ID</param>
        /// <returns>是当前审批人 true</returns>
        public static bool CheckCurApproval(string DocID, string MID, string UserID)
        {
            Model.Pub_AuditRec model = new SfSoft.Model.Pub_AuditRec();
            model = bllPAR.GetModel(MID, DocID);
            if (model == null)
            {
                return false;
            }
            string ARID = model.ARID.ToString();
            string AuditUserID = model.AuditUserID.ToString();
            if (AuditUserID == UserID)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static string GetAuditRecID(string DocID, string MID)
        {
            Model.Pub_AuditRec model = new SfSoft.Model.Pub_AuditRec();
            model = bllPAR.GetModel(MID, DocID);
            if (model == null)
            {
                return "";
            }
            else
            {
                return  model.ARID.ToString();
            }
        }

        public static string SetAppInfo(DataView UserAcldv, string DocID, string MID, string CnName, string UserID, Button btnApprove, Button btnSave, Label lblUnDoFlag, TextBox txtAuditName, TextBox txtAuditdate, Panel panelApp)
        {
            Model.Pub_AuditRec model = new SfSoft.Model.Pub_AuditRec();
            model = bllPAR.GetModel(MID, DocID);
            string ARID = model.ARID.ToString();
            string UndoFlag = "";
            string UndoDate = "";
            string Status = "";
            string AuditName = "";
            string AuditUserID = "";

            //验证权限
            DataSet dsrc = GetAuditRecInfo(UserID, ARID);//是否为当前审批人或历史审批人
            //是否为审批管理员
            bool IsAppMgt = SfEmc.UserAcl.checkMenuAcl(UserAcldv, "emc.rcm.todo.mgt");//是否为审批管理员
            //无权限
            if (dsrc == null && IsAppMgt == false)
            {

                return "N";
            }
            else
            {
                UndoFlag = model.UndoFlag;
                UndoDate = model.UndoDate.ToString();
                Status = model.StatusFlag;
                AuditName = model.AuditName;
                AuditUserID = model.AuditUserID.ToString();
            }
            //设置按扭
            if (AuditUserID != UserID)
            {
                btnApprove.Visible = false;
                btnSave.Visible = false;
                panelApp.Visible = false;
            }
            else
            {
                if (Status == "Y" || Status == "N" || Status == "UN")
                {
                    btnApprove.Visible = false;
                    btnSave.Visible = false;
                    panelApp.Visible = false;
                }
                else
                {
                    txtAuditdate.Text = Common.Common.formatDate(DateTime.Now);
                    txtAuditName.Text = CnName;
                }
            }
            //设置提示信息
            if (UndoFlag == "UNS")
            {
                lblUnDoFlag.Text = AppFlow.GetStatus(UndoFlag);
            }
            return "Y";

        }
        private static DataSet GetAuditRecInfo(string UserID, string ARID)
        {
            StringBuilder strWhere = new StringBuilder();


            strWhere.Append("  ( AuditUserID = '" + UserID + "' and ARID='" + ARID + "')");
            strWhere.Append(" or   ARID in ( select ARID from Pub_AuditResult where AuditUserID= '" + UserID + "' and ARID='" + ARID + "' )");

            DataSet ds = bllPAR.GetList(strWhere.ToString());

            return ds;
        }
        //审批人审批
        public static Hashtable AuditDoApp(string DocID, string MID, string   AuditSign, string Contral, string AuditorCmnt)
        {
            Hashtable hash = new Hashtable();
            hash.Add("AuditSign", "");
            //hash（AuditSign）确定返回审批结论用于单据审批后的处理
            if (AuditSign == "")
            {
                //没有审批结论
                hash["AuditSign"] = "NoSign";
                return hash;
            }
          
            
            //取的审批记录信息
            Model.Pub_AuditRec modelPAR = new SfSoft.Model.Pub_AuditRec();
            //取的审批流中的记录
            modelPAR = bllPAR.GetModel(MID, DocID);
            int ARID = modelPAR.ARID;
            //取的表名
            string BoName = EmcCommon.GetFunDefValue("BoName", MID);
            //取的被审单据信息

            hash = AppFlow.GetDocAppInfo(DocID, BoName);
            string UserID = hash["UserID"].ToString();
            string DeptID = hash["DeptID"].ToString();
            string FilialeID = hash["FilialeID"].ToString();
            // string ConditionValue = hash["ConditionValue"].ToString();
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
            string Msg = "";
            string AuditClass2 = "";
            string BoStatus = "";
            //BoName = modelPAR.BoName;
            int? AuditClass1 = modelPAR.AuditClass;
            int? AuditUserID1 = modelPAR.AuditUserID;
            AuditTypeName = modelPAR.AuditTypeName;
            AuditUserID = modelPAR.AuditUserID.ToString();
            AuditName = modelPAR.AuditName;
            AuditClass = modelPAR.AuditClass.ToString();

            string ObjName = modelPAR.ObjName;
            string TempAuditUserID = AuditUserID;
            string TempAuditName = AuditName;
            string TempAuditClass = AuditClass;
            string TempAuditTypeName = modelPAR.AuditTypeName;

            //审批不同意
            if (AuditSign == "N")
            {
                //如果是申请撤消
                if (UndoFlag == "UNS")
                {
                    //重写单据信息
                    BoStatus=UpdateBoInfoAudit(DocID, BoName, "NUNS");//不同意撤消
                    //重写审批记录
                    NewStatus = "Y";
                    UnDoDate = "";
                    UndoFlag = "N";

                    hash["AuditSign"] = "NUNS";
                    //增加审批结果
                    Msg = ObjName + "撤消申请审批不同意";
                }
                else//不是申请撤消
                {
                    //重写单据信息
                    BoStatus = UpdateBoInfoAudit(DocID, BoName, "N");//审批不同意
                    //重写审批记录
                    NewStatus = "N";
                    UnDoDate = "";
                    UndoFlag = "N";
                    //增加审批结果
                    hash["AuditSign"] = "N";
                    Msg = ObjName + "审批不同意";
                }
            }
            else//审批同意
            {
                //如果是申请撤消
                if (UndoFlag == "UNS")
                {
                    //重写单据信息
                    BoStatus = UpdateBoInfoAudit(DocID, BoName, "YUNS");//同意撤消
                    Msg = BoName + "撤消申请审批同意";
                    hash["AuditSign"] = "YUNS";
                    NewStatus = "UN";
                    UnDoDate = Common.Common.formatDate(DateTime.Now);
                    UndoFlag = "YUNS";
                    Msg = ObjName + "撤消申请审批同意";

                }
                else//不是申请撤消
                {
                    //取的上级审批人
                    //上级审批及审批结论
                    Hashtable hashad = new Hashtable();
                    AuditClass1 += 1;
                    hashad = GetAuditUserID(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass1.ToString(), DocID);
                    string IsAuditMan = hashad["IsAuditMan"].ToString();
                    AuditClass2 = hashad["AuditClass1"].ToString();


                    if (IsAuditMan == "Y")//有上级审批
                    {
                        int? AuditUserID2 = PageValidate.StringToInt(hashad["AuditUserID"].ToString());

                        //检查代理审批 
                        NewStatus = "UP"; //上级审批

                        string SurManID = AppFlow.CheckSurrogate(AuditUserID2.ToString(), MID, SubmitDate, FilialeID);
                        if (SurManID == "")
                        {
                            AuditUserID = AuditUserID2.ToString();
                            AuditName = hashad["AuditName"].ToString();
                        }
                        else
                        {
                            AuditUserID = SurManID;
                            AuditName = EmcCommon.getUserCnNameByID(AuditUserID) + "代理";
                        }
                        AuditTypeName = hashad["AuditTypeName"].ToString();

                    }
                    else
                    {
                        NewStatus = "Y";
                    }
                    UndoFlag = "N";

                    //重写单据信息
                   BoStatus = UpdateBoInfoAudit(DocID, BoName, NewStatus);//审批同意



                    hash["AuditSign"] = "Y";
                    Msg = ObjName + "审批同意";
                }

            }
            DateTime? AuditDate = DateTime.Now;
            //重写审批记录
            modelPAR.StatusFlag = NewStatus;
            modelPAR.UndoDate = AuditDate;
            modelPAR.UndoFlag = UndoFlag;
            modelPAR.AuditDate = AuditDate;
            if (NewStatus == "UP")
            {

                modelPAR.AuditUserID = PageValidate.StringToInt(AuditUserID);
                modelPAR.AuditTypeName = AuditTypeName;
                modelPAR.AuditName = AuditName;
                modelPAR.AuditClass = PageValidate.StringToInt(AuditClass2);
                AuditClass = AuditClass2.ToString();
            }

            bllPAR.Update(modelPAR);
            //增加审批结果
            string StatusName = AppFlow.GetStatus(NewStatus);
            //保存审批记录
            SaveAuditResult(ARID, TempAuditClass, TempAuditName, AuditDate.ToString(), AuditorCmnt, hash["AuditSign"].ToString(), TempAuditTypeName, TempAuditUserID, Contral, MID);
            //发送审批信息给申请人
            AppFlow.SendDoAppMsn(Msg, ObjName, DocID, SubmitDate, StatusName, Signs, UserID, TempAuditName, TempAuditUserID, ObjPriority, Contral,MID);
            if (NewStatus == "UP")//如果是有上级审批人
            {
                //发信息给上级审批人
                Msg = ObjName + "申请审批";
                AppFlow.SendAppMsn(Msg, ObjName, DocID, SubmitDate, StatusName, Signs, UserID, AuditName, AuditUserID, ObjPriority, AuditorCmnt,MID);
            }
            hash["status"]=BoStatus ;
            return hash;

        }
        


        //审批人审批
        public static Hashtable AuditDoApp(string DocID, string MID, RadioButtonList rblAuditSign, TextBox txtContral, TextBox txtAuditorCmnt, TextBox txtAuditName, TextBox txtAuditdate)
        {
            Hashtable hash = new Hashtable();
            hash.Add("AuditSign", "");
            //hash（AuditSign）确定返回审批结论用于单据审批后的处理
            if (rblAuditSign.SelectedItem == null)
            {
                //没有审批结论
                hash["AuditSign"] = "NoSign";
                return hash;
            }
            //审批结论
            string AuditSign = rblAuditSign.SelectedItem.Value;
            //取的审批记录信息
            Model.Pub_AuditRec modelPAR = new SfSoft.Model.Pub_AuditRec();
            //取的审批流中的记录
            modelPAR = bllPAR.GetModel(MID, DocID);
            int ARID = modelPAR.ARID;
            //取的表名
            string BoName = EmcCommon.GetFunDefValue("BoName", MID);
            //取的被审单据信息
 
            hash = AppFlow.GetDocAppInfo(DocID, BoName);
            string UserID = hash["UserID"].ToString();
            string DeptID = hash["DeptID"].ToString();
            string FilialeID = hash["FilialeID"].ToString();
           // string ConditionValue = hash["ConditionValue"].ToString();
            string NewStatus = "";
            string UndoFlag = hash["UndoFlag"].ToString();
            string UnDoDate = hash["UndoDate"].ToString();
            string SubmitDate = hash["SubmitDate"].ToString();
            string Remark = hash["Remark"].ToString();
            string Signs = hash["Signs"].ToString();
            string ObjPriority = hash["ObjPriority"].ToString();
            string BoStatus = "";
            string AuditClass = "1";
            string AuditUserID = "";
            string AuditName = "";
            string AuditTypeName = "";
            string Msg = "";
            string AuditClass2 = "";
            //BoName = modelPAR.BoName;
            int? AuditClass1 = modelPAR.AuditClass;
            int? AuditUserID1 = modelPAR.AuditUserID;
            AuditTypeName = modelPAR.AuditTypeName;
            AuditUserID = modelPAR.AuditUserID.ToString();
            AuditName = modelPAR.AuditName;
            AuditClass = modelPAR.AuditClass.ToString();

            string ObjName = modelPAR.ObjName;
            string TempAuditUserID = AuditUserID;
            string TempAuditName = AuditName;
            string TempAuditClass = AuditClass;
            string TempAuditTypeName = modelPAR.AuditTypeName;

            //审批不同意
            if (AuditSign == "N")
            {
                //如果是申请撤消
                if (UndoFlag == "UNS")
                {
                    //重写单据信息
                    BoStatus = UpdateBoInfoAudit(DocID, BoName, "NUNS");//不同意撤消
                    //重写审批记录
                    NewStatus = "Y";
                    UnDoDate = "";
                    UndoFlag = "N";

                    hash["AuditSign"] = "NUNS";
                    //增加审批结果
                    Msg = ObjName + "撤消申请审批不同意";
                }
                else//不是申请撤消
                {
                    //重写单据信息
                    BoStatus = UpdateBoInfoAudit(DocID, BoName, "N");//审批不同意
                    //重写审批记录
                    NewStatus = "N";
                    UnDoDate = "";
                    UndoFlag = "N";
                    //增加审批结果
                    hash["AuditSign"] = "N";
                    Msg = ObjName + "审批不同意";
                }
            }
            else//审批同意
            {
                //如果是申请撤消
                if (UndoFlag == "UNS")
                {
                    //重写单据信息
                    BoStatus = UpdateBoInfoAudit(DocID, BoName, "YUNS");//同意撤消
                    Msg = BoName + "撤消申请审批同意";
                    hash["AuditSign"] = "YUNS";
                    NewStatus = "UN";
                    UnDoDate = Common.Common.formatDate(DateTime.Now);
                    UndoFlag = "YUNS";
                    Msg = ObjName + "撤消申请审批同意";

                }
                else//不是申请撤消
                {
                    //取的上级审批人
                    //上级审批及审批结论
                    Hashtable hashad = new Hashtable();
                    AuditClass1 += 1;
                    hashad = GetAuditUserID(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass1.ToString(), DocID);
                    string IsAuditMan = hashad["IsAuditMan"].ToString();
                    AuditClass2 = hashad["AuditClass1"].ToString();


                    if (IsAuditMan == "Y")//有上级审批
                    {
                        int? AuditUserID2 = PageValidate.StringToInt(hashad["AuditUserID"].ToString());

                        //检查代理审批 
                        NewStatus = "UP"; //上级审批

                        string SurManID = AppFlow.CheckSurrogate(AuditUserID2.ToString (), MID, SubmitDate, FilialeID);
                        if (SurManID == "")
                        {
                            AuditUserID = AuditUserID2.ToString();
                            AuditName = hashad["AuditName"].ToString();
                        }
                        else
                        {
                            AuditUserID = SurManID;
                            AuditName = EmcCommon.getUserCnNameByID(AuditUserID) + "代理";
                        }
                        AuditTypeName = hashad["AuditTypeName"].ToString();

                    }
                    else
                    {
                        NewStatus = "Y";
                    }
                    UndoFlag = "N";

                    //重写单据信息
                    BoStatus = UpdateBoInfoAudit(DocID, BoName, NewStatus);//审批同意



                    hash["AuditSign"] = "Y";
                    Msg = ObjName + "审批同意";
                }

            }
            DateTime? AuditDate = DateTime.Now;
            //重写审批记录
            modelPAR.StatusFlag = NewStatus;
            modelPAR.UndoDate = AuditDate;
            modelPAR.UndoFlag = UndoFlag;
            modelPAR.AuditDate = AuditDate;
            if (NewStatus == "UP")
            {

                modelPAR.AuditUserID = PageValidate.StringToInt(AuditUserID);
                modelPAR.AuditTypeName = AuditTypeName;
                modelPAR.AuditName = AuditName;
                modelPAR.AuditClass = PageValidate.StringToInt(AuditClass2);
                AuditClass = AuditClass2.ToString();
            }

            bllPAR.Update(modelPAR);
            //增加审批结果
            string AuditorCmnt = txtAuditorCmnt.Text;
            string Contral = txtContral.Text;
            string StatusName = AppFlow.GetStatus(NewStatus);
            //保存审批记录
            SaveAuditResult(ARID, TempAuditClass, TempAuditName, AuditDate.ToString(), AuditorCmnt, hash["AuditSign"].ToString(), TempAuditTypeName, TempAuditUserID, Contral, MID);
            //发送审批信息给申请人
            AppFlow.SendDoAppMsn(Msg, ObjName, DocID, SubmitDate, StatusName, Signs, UserID, TempAuditName, TempAuditUserID, ObjPriority, Contral,MID);
            if (NewStatus == "UP")//如果是有上级审批人
            {
                //发信息给上级审批人
                Msg = ObjName + "申请审批";
                AppFlow.SendAppMsn(Msg, ObjName, DocID, SubmitDate, StatusName, Signs, UserID, AuditName, AuditUserID, ObjPriority, AuditorCmnt,MID);
            }
            return hash;

        }
        
        
        //取的上级审批人
        public static Hashtable GetAuditUserID(string MID, string UserID, string AuditUserID, string DeptID, string FilialeID, string AuditClass, string DocID)
        {
            Hashtable hashAd = new Hashtable();

            string strWhereA = " AuditClass = '" + AuditClass + "' and FilialeID ='" + FilialeID + "'  and MID='" + MID + "' ";
            StringBuilder strWhere = new StringBuilder();

            strWhere.Append(" ( AuditMode='P' and  AuditBound='PT' and AFID in (select AFID from Pub_AuditFlow_Dept ");
            strWhere.Append(" where DeptID='" + DeptID + "' and MID='" + MID + "')");
            strWhere.Append(" and " + strWhereA + ")");
            strWhere.Append(" or (AuditMode='P' and AuditBound='DF' and " + strWhereA + ")");
            strWhere.Append(" or ( AuditMode='U' and " + strWhereA + ")");
            strWhere.Append("  order by ConditionValue desc ");
            DataSet ds = bllPAF.GetList(strWhere.ToString());
            // string IsAuditMan = "N";
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
                        
                        string ConditionValue = AppFlow.GetConditionValue(MID, DocID, FieldName1);
                        //取的单据条件值
                        if (AppFlow.CheckCondtion(ConditionValue1, LogicName1, ConditionValue) == true)
                        {
                            CkCdValue = true;

                            break;
                        }

                    }
                    else
                    {
                        IsCd = true;
                    }

 
                }
                //有条件，所有条件不成立,没有无条件审批
                if (CkCdValue != true && IsCd != true)
                {
                    //返回无审批人，审批结束
                    // hashAd.Add("IsAuditMan", "N");
                    // return hashAd;
                    int ac = int.Parse(AuditClass) + 1;
                    AuditClass = ac.ToString();
                    hashAd = GetAuditUserID(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, DocID);

                    return hashAd;

                }
                //条件满足
                if (AuditMode1 == "P") //指定审批
                {
                    //审批人是否为自已,或审批人是否等于当前审批人
                    if (UserID == AuditUserID1 || AuditUserID == AuditUserID1)
                    {
                        //如果是申请人自已或审批人自已,取上级审批人,
                        int ac = int.Parse(AuditClass) + 1;
                        AuditClass = ac.ToString();
                        hashAd = GetAuditUserID(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, DocID);
                        return hashAd;
                    }
                    else//有上级审批人
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
                    //取现在是第几个上级审批
                    int UpAuditNum = GetUpAuditNum(MID, AuditClass, FilialeID);
                    //取出当前开始审批的部门
                    if (UpAuditNum > 0)
                    {
                        string CurDeptID = GetCurAuditDept(UpAuditNum, DeptID, 0, FilialeID);
                        DeptID = CurDeptID;
                    }

                    Hashtable hastp = GetDeptAuditMan(DeptID, UserID, 0, "", FilialeID, AuditUserID);
                    if (hastp["IsAuditMan"].ToString() == "Y")
                    {
                        string AuditUserID2 = hastp["AuditUserID2"].ToString();
                        //审批人是否为自已
                        if (UserID == AuditUserID2)
                        {
                            //如果是自已取上级审批人,向上一级审批流中找审批人
                            int ac = int.Parse(AuditClass) + 1;
                            AuditClass = ac.ToString();
                            hashAd = GetAuditUserID(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, DocID);
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
            else //没有上级审人,审批结束
            {
                //是否还有上一级审批，跳过当前级别审批
                int ac = int.Parse(AuditClass) + 1;
                AuditClass = ac.ToString();
                if (CheckUpAuditClass(AuditClass, MID, FilialeID))
                {
                    hashAd = GetAuditUserID(MID, UserID, AuditUserID, DeptID, FilialeID, AuditClass, DocID);
                }
                else
                {
  
                        hashAd.Add("AuditClass1", ac - 1);
                        hashAd.Add("IsAuditMan", "N");
  
                }
                return hashAd;
            }


            //  return hashAd;
        }

        public static bool CheckUpAuditClass(string AuditClass,string MID,string FilialeID)
        {
            string strWhere = " AuditClass = '" + AuditClass + "' and FilialeID ='" + FilialeID + "'  and MID='" + MID + "' ";
            DataSet ds = bllPAF.GetList(strWhere.ToString());
            if (ds.Tables[0].Rows.Count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        //部门取上级审批人
        public static Hashtable GetDeptAuditMan(string DeptID, string UserID, int level, string AuditName, string FilialeID, string AuditUserID)
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
            else //无审批人,审批结束
            {

                hashdam.Add("IsAuditMan", "N");

                return hashdam;
            }
        }

        /// <summary>
        /// 取当前审批部门ID
        /// </summary>
        /// <param name="UpAuditNum">递增数量</param>
        /// <param name="DeptID">申请人部门ID</param>
        /// <param name="level">计数器</param>
        /// <param name="FilialeID">公司ID</param>
        /// <returns></returns>
        public static string GetCurAuditDept(int UpAuditNum, string DeptID, int level, string FilialeID)
        {

            if (UpAuditNum == level)
            {
                return DeptID;
            }
            else
            {
                BLL.Pub_Dept blldp = new SfSoft.BLL.Pub_Dept();
                string strWhereDept = " FilialeID='" + FilialeID + "' and DeptID='" + DeptID + "'";
                DataSet dsdp = blldp.GetList(strWhereDept);
                if (dsdp != null && dsdp.Tables[0].Rows.Count > 0)
                {
                    string curPDeptID = dsdp.Tables[0].Rows[0]["ParentAuditID"].ToString();
                    level += 1;
                    return GetCurAuditDept(UpAuditNum, curPDeptID, level, FilialeID);
                }
                else
                {
                    return DeptID;
                }
            }
        }
        //处理单据信息
        public static string  UpdateBoInfoAudit(string DocID, string BoName, string AuditSign)
        {
            string NewStatus2 = "";
            string UndoFlag2 = "";
            string UnDoDate2 = "";
            if (AuditSign == "NUNS") //不同意撤消
            {
                NewStatus2 = "Y";
                UndoFlag2 = "NUNS";

            }
            else if (AuditSign == "N")//审批不同意
            {
                NewStatus2 = "N";
                UndoFlag2 = "N";
            }
            else if (AuditSign == "YUNS") //同意撤消
            {
                NewStatus2 = "UN";
                UndoFlag2 = "YUNS";

            }
            else if (AuditSign == "Y")//审批同意
            {
                NewStatus2 = "Y";
                UndoFlag2 = "N";
                UnDoDate2 = Common.Common.formatDate(DateTime.Now);
            }
            else if (AuditSign == "UP")
            {
                NewStatus2 = "UP";
                UndoFlag2 = "N";
            }
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" update " + BoName.Trim() + " set ");
            strSql.Append(" status='" + NewStatus2.Trim() + "',");
            strSql.Append(" StatusName='" + AppFlow.GetStatus(NewStatus2.Trim()).Trim() + "',");
            strSql.Append(" UndoFlag='" + UndoFlag2.Trim() + "'");
            if (UnDoDate2 != "")
            {
                strSql.Append(", UnDoDate='" + UnDoDate2.Trim() + "'");
            }
            strSql.Append(" where ID='" + DocID.Trim() + "'");
            DbHelperSQL.ExecuteSql(strSql.ToString());
            return NewStatus2;
        }

        //审批结论增加
        public static void SaveAuditResult(int ARID, string AuditClass, string AuditName, string Auditdate, string AuditorCmnt, string AuditSign, string AuditTypeName, string AuditUserID, string Contral, string MID)
        {
            Model.Pub_AuditResult modelR = new SfSoft.Model.Pub_AuditResult();
            BLL.Pub_AuditResult bllR = new SfSoft.BLL.Pub_AuditResult();
            modelR.ARID = ARID;
            modelR.AuditClass = PageValidate.StringToInt(AuditClass);
            modelR.AuditName = AuditName;
            modelR.Auditdate = PageValidate.StringToDatetime(Auditdate);
            modelR.AuditorCmnt = AuditorCmnt;
            modelR.AuditSign = AuditSign;
            modelR.AuditTypeName = AuditTypeName;
            modelR.AuditUserID = PageValidate.StringToInt(AuditUserID);
            modelR.Contral = Contral;
            modelR.MID = MID;
            bllR.Add(modelR);
        }


        //确定当前级别下有几个上级审批
        public static int GetUpAuditNum(string MID, string AuditClass, string FilialeID)
        {
            string strWhere = " MID = '" + MID + "' and AuditClass < '" + AuditClass + "' and  FilialeID='" + FilialeID + "' and AuditMode='U'";
            DataSet ds = bllPAF.GetList(strWhere);
            int AuditNum = 0;
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                AuditNum = ds.Tables[0].Rows.Count;
            }
            return AuditNum;
        }

        //取审批结论
        public static void GetAppResult(string MID, string DocID, string Flag, PlaceHolder phAppResult)
        {
            Model.Pub_AuditRec model = bllPAR.GetModel(MID, DocID);
            if (model == null)
            {
                phAppResult.Visible = false;
                return;
            }
            string ARID = model.ARID.ToString();
            BLL.Pub_AuditResult bllar = new SfSoft.BLL.Pub_AuditResult();
            string strWhere = " ARID = '" + ARID + "' order by ARSID";
            DataSet ds = bllar.GetList(strWhere);
            if (ds.Tables[0].Rows.Count < 1)
            {
                phAppResult.Visible = false;
                return;
            }
            Table tb = new Table();
            TableRow tr = new TableRow();
            TableCell tc = null;
            tb.Attributes.Add("style", "width:100%;");


            tr.Attributes.Add("style", "background-color:#8caae7");
            tc = new TableCell();
            tc.Attributes.Add("style", "height: 22px");
            tc.Text = "级别";
            tr.Cells.Add(tc);
            tc = new TableCell();
            tc.Text = "审批人";
            tr.Cells.Add(tc);
            tc = new TableCell();
            tc.Text = "审批结论";
            tr.Cells.Add(tc);
            tc = new TableCell();
            tc.Text = "审批时间";
            tr.Cells.Add(tc);
            tc = new TableCell();
            tc.Text = "审批意见";
            tr.Cells.Add(tc);
            if (Flag == "App")
            {
                tc = new TableCell();
                tc.Text = "审批备注";
                tr.Cells.Add(tc);
            }
            tb.Rows.Add(tr);
            string AuditClass = "";
            string Auditdate = "";
            string AuditSign = "";
            string AuditName = "";
            string AuditorCmnt = "";
            string Contral = "";
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                Auditdate = dr["Auditdate"].ToString();
                AuditSign = dr["AuditSign"].ToString();
                AuditSign = AppFlow.GetStatus(AuditSign);
                AuditName = dr["AuditName"].ToString();
                AuditorCmnt = dr["AuditorCmnt"].ToString();
                Contral = dr["Contral"].ToString();
                AuditClass = dr["AuditClass"].ToString();
                TableRow tr1 = new TableRow();
                TableCell tc1 = null;
                //tr1.BackColor = "#8caae7";
                tc1 = new TableCell();
                tc1.Attributes.Add("style", "height: 22px");
                tc1.Text = AuditClass;
                tr1.Cells.Add(tc1);
                tc1 = new TableCell();
                tc1.Text = AuditName;
                tr1.Cells.Add(tc1);
                tc1 = new TableCell();
                tc1.Text = AuditSign;
                tr1.Cells.Add(tc1);
                tc1 = new TableCell();
                tc1.Text = Auditdate;
                tr1.Cells.Add(tc1);
                tc1 = new TableCell();
                tc1.Text = Contral;
                tr1.Cells.Add(tc1);
                if (Flag == "App")
                {
                    tc1 = new TableCell();
                    tc1.Text = AuditorCmnt;
                    tr1.Cells.Add(tc1);
                }
                tb.Rows.Add(tr1);
            }
            phAppResult.Controls.Add(tb);

        }
    }
}
