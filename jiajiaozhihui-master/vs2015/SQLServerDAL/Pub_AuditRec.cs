using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_AuditRec。
    /// </summary>
    public class Pub_AuditRec : IPub_AuditRec
    {
        public Pub_AuditRec()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ARID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_AuditRec");
            strSql.Append(" where ARID=@ARID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ARID", SqlDbType.Int,4)};
            parameters[0].Value = ARID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }



        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_AuditRec model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_AuditRec(");
            strSql.Append("MID,ReqDeptID,ObjPriority,ObjName,ObjNo,UserID,CnName,ReqDate,LastAuditDate,ObjDate,ReqRemark,AuditName,AuditUserID,AuditDate,StatusFlag,UndoFlag,UndoDate,Contrl2,AuditClass,Remark,ConditionValue,AuditNameSign,AuditTypeName,FilialeID,BoName,PagePath)");
            strSql.Append(" values (");
            strSql.Append("@MID,@ReqDeptID,@ObjPriority,@ObjName,@ObjNo,@UserID,@CnName,@ReqDate,@LastAuditDate,@ObjDate,@ReqRemark,@AuditName,@AuditUserID,@AuditDate,@StatusFlag,@UndoFlag,@UndoDate,@Contrl2,@AuditClass,@Remark,@ConditionValue,@AuditNameSign,@AuditTypeName,@FilialeID,@BoName,@PagePath)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@MID", SqlDbType.NVarChar,80),
					new SqlParameter("@ReqDeptID", SqlDbType.Int,4),
					new SqlParameter("@ObjPriority", SqlDbType.NVarChar,5),
					new SqlParameter("@ObjName", SqlDbType.NVarChar,150),
					new SqlParameter("@ObjNo", SqlDbType.NVarChar,10),
					new SqlParameter("@UserID", SqlDbType.Int,4),
					new SqlParameter("@CnName", SqlDbType.NVarChar,20),
					new SqlParameter("@ReqDate", SqlDbType.DateTime),
					new SqlParameter("@LastAuditDate", SqlDbType.DateTime),
					new SqlParameter("@ObjDate", SqlDbType.DateTime),
					new SqlParameter("@ReqRemark", SqlDbType.NVarChar,500),
					new SqlParameter("@AuditName", SqlDbType.NVarChar,20),
					new SqlParameter("@AuditUserID", SqlDbType.Int,4),
					new SqlParameter("@AuditDate", SqlDbType.DateTime),
					new SqlParameter("@StatusFlag", SqlDbType.NVarChar,5),
					new SqlParameter("@UndoFlag", SqlDbType.NVarChar,5),
					new SqlParameter("@UndoDate", SqlDbType.DateTime),
					new SqlParameter("@Contrl2", SqlDbType.NVarChar,5),
					new SqlParameter("@AuditClass", SqlDbType.Int,4),
					new SqlParameter("@Remark", SqlDbType.NVarChar,500),
					new SqlParameter("@ConditionValue", SqlDbType.NVarChar,150),
					new SqlParameter("@AuditNameSign", SqlDbType.NVarChar,20),
					new SqlParameter("@AuditTypeName", SqlDbType.NVarChar,50),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,5),
					new SqlParameter("@BoName", SqlDbType.NVarChar,50),
					new SqlParameter("@PagePath", SqlDbType.NVarChar,120)};
            parameters[0].Value = model.MID;
            parameters[1].Value = model.ReqDeptID;
            parameters[2].Value = model.ObjPriority;
            parameters[3].Value = model.ObjName;
            parameters[4].Value = model.ObjNo;
            parameters[5].Value = model.UserID;
            parameters[6].Value = model.CnName;
            parameters[7].Value = model.ReqDate;
            parameters[8].Value = model.LastAuditDate;
            parameters[9].Value = model.ObjDate;
            parameters[10].Value = model.ReqRemark;
            parameters[11].Value = model.AuditName;
            parameters[12].Value = model.AuditUserID;
            parameters[13].Value = model.AuditDate;
            parameters[14].Value = model.StatusFlag;
            parameters[15].Value = model.UndoFlag;
            parameters[16].Value = model.UndoDate;
            parameters[17].Value = model.Contrl2;
            parameters[18].Value = model.AuditClass;
            parameters[19].Value = model.Remark;
            parameters[20].Value = model.ConditionValue;
            parameters[21].Value = model.AuditNameSign;
            parameters[22].Value = model.AuditTypeName;
            parameters[23].Value = model.FilialeID;
            parameters[24].Value = model.BoName;
            parameters[25].Value = model.PagePath;

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
        /// 更新一条数据
        /// </summary>
        public void Update(SfSoft.Model.Pub_AuditRec model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_AuditRec set ");
            strSql.Append("MID=@MID,");
            strSql.Append("ReqDeptID=@ReqDeptID,");
            strSql.Append("ObjPriority=@ObjPriority,");
            strSql.Append("ObjName=@ObjName,");
            strSql.Append("ObjNo=@ObjNo,");
            strSql.Append("UserID=@UserID,");
            strSql.Append("CnName=@CnName,");
            strSql.Append("ReqDate=@ReqDate,");
            strSql.Append("LastAuditDate=@LastAuditDate,");
            strSql.Append("ObjDate=@ObjDate,");
            strSql.Append("ReqRemark=@ReqRemark,");
            strSql.Append("AuditName=@AuditName,");
            strSql.Append("AuditUserID=@AuditUserID,");
            strSql.Append("AuditDate=@AuditDate,");
            strSql.Append("StatusFlag=@StatusFlag,");
            strSql.Append("UndoFlag=@UndoFlag,");
            strSql.Append("UndoDate=@UndoDate,");
            strSql.Append("Contrl2=@Contrl2,");
            strSql.Append("AuditClass=@AuditClass,");
            strSql.Append("Remark=@Remark,");
            strSql.Append("ConditionValue=@ConditionValue,");
            strSql.Append("AuditNameSign=@AuditNameSign,");
            strSql.Append("AuditTypeName=@AuditTypeName,");
            strSql.Append("FilialeID=@FilialeID,");
            strSql.Append("BoName=@BoName,");
            strSql.Append("PagePath=@PagePath");
            strSql.Append(" where ARID=@ARID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ARID", SqlDbType.Int,4),
					new SqlParameter("@MID", SqlDbType.NVarChar,80),
					new SqlParameter("@ReqDeptID", SqlDbType.Int,4),
					new SqlParameter("@ObjPriority", SqlDbType.NVarChar,5),
					new SqlParameter("@ObjName", SqlDbType.NVarChar,150),
					new SqlParameter("@ObjNo", SqlDbType.NVarChar,10),
					new SqlParameter("@UserID", SqlDbType.Int,4),
					new SqlParameter("@CnName", SqlDbType.NVarChar,20),
					new SqlParameter("@ReqDate", SqlDbType.DateTime),
					new SqlParameter("@LastAuditDate", SqlDbType.DateTime),
					new SqlParameter("@ObjDate", SqlDbType.DateTime),
					new SqlParameter("@ReqRemark", SqlDbType.NVarChar,500),
					new SqlParameter("@AuditName", SqlDbType.NVarChar,20),
					new SqlParameter("@AuditUserID", SqlDbType.Int,4),
					new SqlParameter("@AuditDate", SqlDbType.DateTime),
					new SqlParameter("@StatusFlag", SqlDbType.NVarChar,5),
					new SqlParameter("@UndoFlag", SqlDbType.NVarChar,5),
					new SqlParameter("@UndoDate", SqlDbType.DateTime),
					new SqlParameter("@Contrl2", SqlDbType.NVarChar,5),
					new SqlParameter("@AuditClass", SqlDbType.Int,4),
					new SqlParameter("@Remark", SqlDbType.NVarChar,500),
					new SqlParameter("@ConditionValue", SqlDbType.NVarChar,150),
					new SqlParameter("@AuditNameSign", SqlDbType.NVarChar,20),
					new SqlParameter("@AuditTypeName", SqlDbType.NVarChar,50),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,5),
					new SqlParameter("@BoName", SqlDbType.NVarChar,50),
					new SqlParameter("@PagePath", SqlDbType.NVarChar,120)};
            parameters[0].Value = model.ARID;
            parameters[1].Value = model.MID;
            parameters[2].Value = model.ReqDeptID;
            parameters[3].Value = model.ObjPriority;
            parameters[4].Value = model.ObjName;
            parameters[5].Value = model.ObjNo;
            parameters[6].Value = model.UserID;
            parameters[7].Value = model.CnName;
            parameters[8].Value = model.ReqDate;
            parameters[9].Value = model.LastAuditDate;
            parameters[10].Value = model.ObjDate;
            parameters[11].Value = model.ReqRemark;
            parameters[12].Value = model.AuditName;
            parameters[13].Value = model.AuditUserID;
            parameters[14].Value = model.AuditDate;
            parameters[15].Value = model.StatusFlag;
            parameters[16].Value = model.UndoFlag;
            parameters[17].Value = model.UndoDate;
            parameters[18].Value = model.Contrl2;
            parameters[19].Value = model.AuditClass;
            parameters[20].Value = model.Remark;
            parameters[21].Value = model.ConditionValue;
            parameters[22].Value = model.AuditNameSign;
            parameters[23].Value = model.AuditTypeName;
            parameters[24].Value = model.FilialeID;
            parameters[25].Value = model.BoName;
            parameters[26].Value = model.PagePath;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int ARID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_AuditRec ");
            strSql.Append(" where ARID=@ARID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ARID", SqlDbType.Int,4)};
            parameters[0].Value = ARID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_AuditRec GetModel(int ARID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ARID,MID,ReqDeptID,ObjPriority,ObjName,ObjNo,UserID,CnName,ReqDate,LastAuditDate,ObjDate,ReqRemark,AuditName,AuditUserID,AuditDate,StatusFlag,UndoFlag,UndoDate,Contrl2,AuditClass,Remark,ConditionValue,AuditNameSign,AuditTypeName,FilialeID,BoName,PagePath from Pub_AuditRec ");
            strSql.Append(" where ARID=@ARID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ARID", SqlDbType.Int,4)};
            parameters[0].Value = ARID;

            SfSoft.Model.Pub_AuditRec model = new SfSoft.Model.Pub_AuditRec();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ARID"].ToString() != "")
                {
                    model.ARID = int.Parse(ds.Tables[0].Rows[0]["ARID"].ToString());
                }
                model.MID = ds.Tables[0].Rows[0]["MID"].ToString();
                if (ds.Tables[0].Rows[0]["ReqDeptID"].ToString() != "")
                {
                    model.ReqDeptID = int.Parse(ds.Tables[0].Rows[0]["ReqDeptID"].ToString());
                }
                model.ObjPriority = ds.Tables[0].Rows[0]["ObjPriority"].ToString();
                model.ObjName = ds.Tables[0].Rows[0]["ObjName"].ToString();
                model.ObjNo = ds.Tables[0].Rows[0]["ObjNo"].ToString();
                if (ds.Tables[0].Rows[0]["UserID"].ToString() != "")
                {
                    model.UserID = int.Parse(ds.Tables[0].Rows[0]["UserID"].ToString());
                }
                model.CnName = ds.Tables[0].Rows[0]["CnName"].ToString();
                if (ds.Tables[0].Rows[0]["ReqDate"].ToString() != "")
                {
                    model.ReqDate = DateTime.Parse(ds.Tables[0].Rows[0]["ReqDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["LastAuditDate"].ToString() != "")
                {
                    model.LastAuditDate = DateTime.Parse(ds.Tables[0].Rows[0]["LastAuditDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["ObjDate"].ToString() != "")
                {
                    model.ObjDate = DateTime.Parse(ds.Tables[0].Rows[0]["ObjDate"].ToString());
                }
                model.ReqRemark = ds.Tables[0].Rows[0]["ReqRemark"].ToString();
                model.AuditName = ds.Tables[0].Rows[0]["AuditName"].ToString();
                if (ds.Tables[0].Rows[0]["AuditUserID"].ToString() != "")
                {
                    model.AuditUserID = int.Parse(ds.Tables[0].Rows[0]["AuditUserID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["AuditDate"].ToString() != "")
                {
                    model.AuditDate = DateTime.Parse(ds.Tables[0].Rows[0]["AuditDate"].ToString());
                }
                model.StatusFlag = ds.Tables[0].Rows[0]["StatusFlag"].ToString();
                model.UndoFlag = ds.Tables[0].Rows[0]["UndoFlag"].ToString();
                if (ds.Tables[0].Rows[0]["UndoDate"].ToString() != "")
                {
                    model.UndoDate = DateTime.Parse(ds.Tables[0].Rows[0]["UndoDate"].ToString());
                }
                model.Contrl2 = ds.Tables[0].Rows[0]["Contrl2"].ToString();
                if (ds.Tables[0].Rows[0]["AuditClass"].ToString() != "")
                {
                    model.AuditClass = int.Parse(ds.Tables[0].Rows[0]["AuditClass"].ToString());
                }
                model.Remark = ds.Tables[0].Rows[0]["Remark"].ToString();
                model.ConditionValue = ds.Tables[0].Rows[0]["ConditionValue"].ToString();
                model.AuditNameSign = ds.Tables[0].Rows[0]["AuditNameSign"].ToString();
                model.AuditTypeName = ds.Tables[0].Rows[0]["AuditTypeName"].ToString();
                model.FilialeID = ds.Tables[0].Rows[0]["FilialeID"].ToString();
                model.BoName = ds.Tables[0].Rows[0]["BoName"].ToString();
                model.PagePath = ds.Tables[0].Rows[0]["PagePath"].ToString();
                return model;
            }
            else
            {
                return null;
            }
        }
 /// <summary>
 /// 取的审批流中的信息
 /// </summary>
 /// <param name="MID">模块ID</param>
 /// <param name="DocID">单据ID</param>
 /// <returns></returns>
        public SfSoft.Model.Pub_AuditRec GetModel(string MID, string DocID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ARID,MID,ReqDeptID,ObjPriority,ObjName,ObjNo,UserID,CnName,ReqDate,LastAuditDate,ObjDate,ReqRemark,AuditName,AuditUserID,AuditDate,StatusFlag,UndoFlag,UndoDate,Contrl2,AuditClass,Remark,ConditionValue,AuditNameSign,AuditTypeName,FilialeID,BoName,PagePath  from Pub_AuditRec ");
            strSql.Append(" where MID=@MID and ObjNo=@DocID");
            SqlParameter[] parameters = {
					new SqlParameter("@MID", SqlDbType.NVarChar,50),
                    new SqlParameter("@DocID", SqlDbType.NVarChar,10)
            };
            parameters[0].Value = MID;
            parameters[1].Value = DocID;
            SfSoft.Model.Pub_AuditRec model = new SfSoft.Model.Pub_AuditRec();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ARID"].ToString() != "")
                {
                    model.ARID = int.Parse(ds.Tables[0].Rows[0]["ARID"].ToString());
                }
                model.MID = ds.Tables[0].Rows[0]["MID"].ToString();
                if (ds.Tables[0].Rows[0]["ReqDeptID"].ToString() != "")
                {
                    model.ReqDeptID = int.Parse(ds.Tables[0].Rows[0]["ReqDeptID"].ToString());
                }
                model.ObjPriority = ds.Tables[0].Rows[0]["ObjPriority"].ToString();
                model.ObjName = ds.Tables[0].Rows[0]["ObjName"].ToString();
                model.ObjNo = ds.Tables[0].Rows[0]["ObjNo"].ToString();
                if (ds.Tables[0].Rows[0]["UserID"].ToString() != "")
                {
                    model.UserID = int.Parse(ds.Tables[0].Rows[0]["UserID"].ToString());
                }
                model.CnName = ds.Tables[0].Rows[0]["CnName"].ToString();
                if (ds.Tables[0].Rows[0]["ReqDate"].ToString() != "")
                {
                    model.ReqDate = DateTime.Parse(ds.Tables[0].Rows[0]["ReqDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["LastAuditDate"].ToString() != "")
                {
                    model.LastAuditDate = DateTime.Parse(ds.Tables[0].Rows[0]["LastAuditDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["ObjDate"].ToString() != "")
                {
                    model.ObjDate = DateTime.Parse(ds.Tables[0].Rows[0]["ObjDate"].ToString());
                }
                model.ReqRemark = ds.Tables[0].Rows[0]["ReqRemark"].ToString();
                model.AuditName = ds.Tables[0].Rows[0]["AuditName"].ToString();
                if (ds.Tables[0].Rows[0]["AuditUserID"].ToString() != "")
                {
                    model.AuditUserID = int.Parse(ds.Tables[0].Rows[0]["AuditUserID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["AuditDate"].ToString() != "")
                {
                    model.AuditDate = DateTime.Parse(ds.Tables[0].Rows[0]["AuditDate"].ToString());
                }
                model.StatusFlag = ds.Tables[0].Rows[0]["StatusFlag"].ToString();
                model.UndoFlag = ds.Tables[0].Rows[0]["UndoFlag"].ToString();
                if (ds.Tables[0].Rows[0]["UndoDate"].ToString() != "")
                {
                    model.UndoDate = DateTime.Parse(ds.Tables[0].Rows[0]["UndoDate"].ToString());
                }
                model.Contrl2 = ds.Tables[0].Rows[0]["Contrl2"].ToString();
                if (ds.Tables[0].Rows[0]["AuditClass"].ToString() != "")
                {
                    model.AuditClass = int.Parse(ds.Tables[0].Rows[0]["AuditClass"].ToString());
                }
                model.Remark = ds.Tables[0].Rows[0]["Remark"].ToString();
                model.ConditionValue = ds.Tables[0].Rows[0]["ConditionValue"].ToString();
                model.AuditNameSign = ds.Tables[0].Rows[0]["AuditNameSign"].ToString();
                model.AuditTypeName = ds.Tables[0].Rows[0]["AuditTypeName"].ToString();
                model.FilialeID = ds.Tables[0].Rows[0]["FilialeID"].ToString();
                model.BoName = ds.Tables[0].Rows[0]["BoName"].ToString();
                model.PagePath = ds.Tables[0].Rows[0]["PagePath"].ToString();
                return model;
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ARID,MID,ReqDeptID,ObjPriority,ObjName,ObjNo,UserID,CnName,ReqDate,LastAuditDate,ObjDate,ReqRemark,AuditName,AuditUserID,AuditDate,StatusFlag,UndoFlag,UndoDate,Contrl2,AuditClass,Remark,ConditionValue,AuditNameSign,AuditTypeName,FilialeID,BoName,PagePath ");
            strSql.Append(" FROM Pub_AuditRec ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQL.Query(strSql.ToString());
        }

        /*
        /// <summary>
        /// 分页获取数据列表
        /// </summary>
        public DataSet GetList(int PageSize,int PageIndex,string strWhere)
        {
            SqlParameter[] parameters = {
                    new SqlParameter("@tblName", SqlDbType.VarChar, 255),
                    new SqlParameter("@fldName", SqlDbType.VarChar, 255),
                    new SqlParameter("@PageSize", SqlDbType.Int),
                    new SqlParameter("@PageIndex", SqlDbType.Int),
                    new SqlParameter("@IsReCount", SqlDbType.Bit),
                    new SqlParameter("@OrderType", SqlDbType.Bit),
                    new SqlParameter("@strWhere", SqlDbType.VarChar,1000),
                    };
            parameters[0].Value = "Pub_AuditRec";
            parameters[1].Value = "ID";
            parameters[2].Value = PageSize;
            parameters[3].Value = PageIndex;
            parameters[4].Value = 0;
            parameters[5].Value = 0;
            parameters[6].Value = strWhere;	
            return DbHelperSQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
        }*/

        #endregion  成员方法
    }
}

