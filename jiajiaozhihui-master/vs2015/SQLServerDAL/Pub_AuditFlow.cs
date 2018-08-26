using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_AuditFlow。
    /// </summary>
    public class Pub_AuditFlow : IPub_AuditFlow
    {
        public Pub_AuditFlow()
        { }
        #region  成员方法
        /// <summary>
        /// 取的最大级别
        /// </summary>
        public int GetMaxClass(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select max(AuditClass) from Pub_AuditFlow");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }

            object obj = DbHelperSQL.GetSingle(strSql.ToString());
            if (obj == null)
            {
                return 0;
            }
            else
            {
                return int.Parse(obj.ToString());
            }
        }
 
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int AFID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_AuditFlow");
            strSql.Append(" where AFID=@AFID ");
            SqlParameter[] parameters = {
					new SqlParameter("@AFID", SqlDbType.Int,4)};
            parameters[0].Value = AFID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_AuditFlow model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_AuditFlow(");
            strSql.Append("MID,ByAuditDeptID,AuditUserID,AuditName,AuditDeptID,AuditClass,AuditMode,ACID,ConditionValue,AuditBound,AuditBoundValue,AuditTypeName,FilialeID,LogicName,FieldName)");
            strSql.Append(" values (");
            strSql.Append("@MID,@ByAuditDeptID,@AuditUserID,@AuditName,@AuditDeptID,@AuditClass,@AuditMode,@ACID,@ConditionValue,@AuditBound,@AuditBoundValue,@AuditTypeName,@FilialeID,@LogicName,@FieldName)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@MID", SqlDbType.NVarChar,80),
					new SqlParameter("@ByAuditDeptID", SqlDbType.Int,4),
					new SqlParameter("@AuditUserID", SqlDbType.Int,4),
					new SqlParameter("@AuditName", SqlDbType.NVarChar,20),
					new SqlParameter("@AuditDeptID", SqlDbType.Int,4),
					new SqlParameter("@AuditClass", SqlDbType.Int,4),
					new SqlParameter("@AuditMode", SqlDbType.NVarChar,5),
					new SqlParameter("@ACID", SqlDbType.Int,4),
					new SqlParameter("@ConditionValue", SqlDbType.NVarChar,150),
					new SqlParameter("@AuditBound", SqlDbType.NVarChar,5),
					new SqlParameter("@AuditBoundValue", SqlDbType.NVarChar,300),
					new SqlParameter("@AuditTypeName", SqlDbType.NVarChar,50),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,5),
					new SqlParameter("@LogicName", SqlDbType.NVarChar,3),
					new SqlParameter("@FieldName", SqlDbType.NVarChar,50)};
            parameters[0].Value = model.MID;
            parameters[1].Value = model.ByAuditDeptID;
            parameters[2].Value = model.AuditUserID;
            parameters[3].Value = model.AuditName;
            parameters[4].Value = model.AuditDeptID;
            parameters[5].Value = model.AuditClass;
            parameters[6].Value = model.AuditMode;
            parameters[7].Value = model.ACID;
            parameters[8].Value = model.ConditionValue;
            parameters[9].Value = model.AuditBound;
            parameters[10].Value = model.AuditBoundValue;
            parameters[11].Value = model.AuditTypeName;
            parameters[12].Value = model.FilialeID;
            parameters[13].Value = model.LogicName;
            parameters[14].Value = model.FieldName;

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
        public void Update(SfSoft.Model.Pub_AuditFlow model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_AuditFlow set ");
            strSql.Append("MID=@MID,");
            strSql.Append("ByAuditDeptID=@ByAuditDeptID,");
            strSql.Append("AuditUserID=@AuditUserID,");
            strSql.Append("AuditName=@AuditName,");
            strSql.Append("AuditDeptID=@AuditDeptID,");
            strSql.Append("AuditClass=@AuditClass,");
            strSql.Append("AuditMode=@AuditMode,");
            strSql.Append("ACID=@ACID,");
            strSql.Append("ConditionValue=@ConditionValue,");
            strSql.Append("AuditBound=@AuditBound,");
            strSql.Append("AuditBoundValue=@AuditBoundValue,");
            strSql.Append("AuditTypeName=@AuditTypeName,");
            strSql.Append("FilialeID=@FilialeID,");
            strSql.Append("LogicName=@LogicName,");
            strSql.Append("FieldName=@FieldName");
            strSql.Append(" where AFID=@AFID ");
            SqlParameter[] parameters = {
					new SqlParameter("@AFID", SqlDbType.Int,4),
					new SqlParameter("@MID", SqlDbType.NVarChar,80),
					new SqlParameter("@ByAuditDeptID", SqlDbType.Int,4),
					new SqlParameter("@AuditUserID", SqlDbType.Int,4),
					new SqlParameter("@AuditName", SqlDbType.NVarChar,20),
					new SqlParameter("@AuditDeptID", SqlDbType.Int,4),
					new SqlParameter("@AuditClass", SqlDbType.Int,4),
					new SqlParameter("@AuditMode", SqlDbType.NVarChar,5),
					new SqlParameter("@ACID", SqlDbType.Int,4),
					new SqlParameter("@ConditionValue", SqlDbType.NVarChar,150),
					new SqlParameter("@AuditBound", SqlDbType.NVarChar,5),
					new SqlParameter("@AuditBoundValue", SqlDbType.NVarChar,300),
					new SqlParameter("@AuditTypeName", SqlDbType.NVarChar,50),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,5),
					new SqlParameter("@LogicName", SqlDbType.NVarChar,3),
					new SqlParameter("@FieldName", SqlDbType.NVarChar,50)};
            parameters[0].Value = model.AFID;
            parameters[1].Value = model.MID;
            parameters[2].Value = model.ByAuditDeptID;
            parameters[3].Value = model.AuditUserID;
            parameters[4].Value = model.AuditName;
            parameters[5].Value = model.AuditDeptID;
            parameters[6].Value = model.AuditClass;
            parameters[7].Value = model.AuditMode;
            parameters[8].Value = model.ACID;
            parameters[9].Value = model.ConditionValue;
            parameters[10].Value = model.AuditBound;
            parameters[11].Value = model.AuditBoundValue;
            parameters[12].Value = model.AuditTypeName;
            parameters[13].Value = model.FilialeID;
            parameters[14].Value = model.LogicName;
            parameters[15].Value = model.FieldName;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int AFID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_AuditFlow ");
            strSql.Append(" where AFID=@AFID ");
            SqlParameter[] parameters = {
					new SqlParameter("@AFID", SqlDbType.Int,4)};
            parameters[0].Value = AFID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_AuditFlow GetModel(int AFID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select AFID,MID,ByAuditDeptID,AuditUserID,AuditName,AuditDeptID,AuditClass,AuditMode,ACID,ConditionValue,AuditBound,AuditBoundValue,AuditTypeName,FilialeID,LogicName,FieldName from Pub_AuditFlow ");
            strSql.Append(" where AFID=@AFID ");
            SqlParameter[] parameters = {
					new SqlParameter("@AFID", SqlDbType.Int,4)};
            parameters[0].Value = AFID;

            SfSoft.Model.Pub_AuditFlow model = new SfSoft.Model.Pub_AuditFlow();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["AFID"].ToString() != "")
                {
                    model.AFID = int.Parse(ds.Tables[0].Rows[0]["AFID"].ToString());
                }
                model.MID = ds.Tables[0].Rows[0]["MID"].ToString();
                if (ds.Tables[0].Rows[0]["ByAuditDeptID"].ToString() != "")
                {
                    model.ByAuditDeptID = int.Parse(ds.Tables[0].Rows[0]["ByAuditDeptID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["AuditUserID"].ToString() != "")
                {
                    model.AuditUserID = int.Parse(ds.Tables[0].Rows[0]["AuditUserID"].ToString());
                }
                model.AuditName = ds.Tables[0].Rows[0]["AuditName"].ToString();
                if (ds.Tables[0].Rows[0]["AuditDeptID"].ToString() != "")
                {
                    model.AuditDeptID = int.Parse(ds.Tables[0].Rows[0]["AuditDeptID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["AuditClass"].ToString() != "")
                {
                    model.AuditClass = int.Parse(ds.Tables[0].Rows[0]["AuditClass"].ToString());
                }
                model.AuditMode = ds.Tables[0].Rows[0]["AuditMode"].ToString();
                if (ds.Tables[0].Rows[0]["ACID"].ToString() != "")
                {
                    model.ACID = int.Parse(ds.Tables[0].Rows[0]["ACID"].ToString());
                }
                model.ConditionValue = ds.Tables[0].Rows[0]["ConditionValue"].ToString();
                model.AuditBound = ds.Tables[0].Rows[0]["AuditBound"].ToString();
                model.AuditBoundValue = ds.Tables[0].Rows[0]["AuditBoundValue"].ToString();
                model.AuditTypeName = ds.Tables[0].Rows[0]["AuditTypeName"].ToString();
                model.FilialeID = ds.Tables[0].Rows[0]["FilialeID"].ToString();
                model.LogicName = ds.Tables[0].Rows[0]["LogicName"].ToString();
                model.FieldName = ds.Tables[0].Rows[0]["FieldName"].ToString();
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
            strSql.Append("select AFID,MID,ByAuditDeptID,AuditUserID,AuditName,AuditDeptID,AuditClass,AuditMode,ACID,ConditionValue,AuditBound,AuditBoundValue,AuditTypeName,FilialeID,LogicName,FieldName ");
            strSql.Append(" FROM Pub_AuditFlow ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQL.Query(strSql.ToString());
        }

        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        
        public SfSoft.Model.Pub_AuditFlow GetModel(string MID,string AuditClass,string FilialeID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select AFID,MID,ByAuditDeptID,AuditUserID,AuditName,AuditDeptID,AuditClass,AuditMode,ACID,ConditionValue,AuditBound,AuditBoundValue,AuditTypeName,FilialeID,LogicName,FieldName from Pub_AuditFlow ");
            strSql.Append(" where AFID=@AFID ");
            SqlParameter[] parameters = {
					new SqlParameter("@MID", SqlDbType.NVarChar,50),
                    new SqlParameter("@AuditClass", SqlDbType.NVarChar,10),
                    new SqlParameter("@FilialeID", SqlDbType.NVarChar,5)
            };
            parameters[0].Value = MID;
            parameters[1].Value = AuditClass;
            parameters[2].Value = FilialeID;

            SfSoft.Model.Pub_AuditFlow model = new SfSoft.Model.Pub_AuditFlow();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["AFID"].ToString() != "")
                {
                    model.AFID = int.Parse(ds.Tables[0].Rows[0]["AFID"].ToString());
                }
                model.MID = ds.Tables[0].Rows[0]["MID"].ToString();
                if (ds.Tables[0].Rows[0]["ByAuditDeptID"].ToString() != "")
                {
                    model.ByAuditDeptID = int.Parse(ds.Tables[0].Rows[0]["ByAuditDeptID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["AuditUserID"].ToString() != "")
                {
                    model.AuditUserID = int.Parse(ds.Tables[0].Rows[0]["AuditUserID"].ToString());
                }
                model.AuditName = ds.Tables[0].Rows[0]["AuditName"].ToString();
                if (ds.Tables[0].Rows[0]["AuditDeptID"].ToString() != "")
                {
                    model.AuditDeptID = int.Parse(ds.Tables[0].Rows[0]["AuditDeptID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["AuditClass"].ToString() != "")
                {
                    model.AuditClass = int.Parse(ds.Tables[0].Rows[0]["AuditClass"].ToString());
                }
                model.AuditMode = ds.Tables[0].Rows[0]["AuditMode"].ToString();
                if (ds.Tables[0].Rows[0]["ACID"].ToString() != "")
                {
                    model.ACID = int.Parse(ds.Tables[0].Rows[0]["ACID"].ToString());
                }
                model.ConditionValue = ds.Tables[0].Rows[0]["ConditionValue"].ToString();
                model.AuditBound = ds.Tables[0].Rows[0]["AuditBound"].ToString();
                model.AuditBoundValue = ds.Tables[0].Rows[0]["AuditBoundValue"].ToString();
                model.AuditTypeName = ds.Tables[0].Rows[0]["AuditTypeName"].ToString();
                model.FilialeID = ds.Tables[0].Rows[0]["FilialeID"].ToString();
                model.LogicName = ds.Tables[0].Rows[0]["LogicName"].ToString();
                model.FieldName = ds.Tables[0].Rows[0]["FieldName"].ToString();
                return model;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 取的被审批单据信息
        /// </summary>
        /// <param name="DocID">单据ID</param>
        /// <param name="BoName">表名</param>
        /// <returns></returns>
        public DataSet GetBoInfo(string DocID, string BoName)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select UserID,DeptID,MID,FilialeID,SubmitDate,Remark,Status ");
            strSql.Append(" FROM " + BoName + "");
            strSql.Append(" where ID = '" + DocID + "'");
            return DbHelperSQL.Query(strSql.ToString());
        }
        /// <summary>
        /// 更新上级级别
        /// </summary>
        public void UpAuditClass(int AuditClass, string MID, string FilialeID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_AuditFlow set AuditClass=AuditClass+1 ");
            strSql.Append(" where AuditClass>=@AuditClass and MID=@MID and FilialeID=@FilialeID ");
            SqlParameter[] parameters = {
					new SqlParameter("@AuditClass", SqlDbType.Int,4),
                    new SqlParameter("@MID", SqlDbType.NVarChar,50),
                    new SqlParameter("@FilialeID", SqlDbType.NVarChar,10)
            };
            parameters[0].Value = AuditClass;
            parameters[1].Value = MID;
            parameters[2].Value = FilialeID;
            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 更新上级级别
        /// </summary>
        public void LwAuditClass(int AuditClass, string MID, string FilialeID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_AuditFlow set AuditClass=AuditClass-1 ");
            strSql.Append(" where AuditClass>@AuditClass and MID=@MID and FilialeID=@FilialeID ");
            SqlParameter[] parameters = {
					new SqlParameter("@AuditClass", SqlDbType.Int,4),
                    new SqlParameter("@MID", SqlDbType.NVarChar,50),
                    new SqlParameter("@FilialeID", SqlDbType.NVarChar,10)
            };
            parameters[0].Value = AuditClass;
            parameters[1].Value = MID;
            parameters[2].Value = FilialeID;
            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
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
            parameters[0].Value = "Pub_AuditFlow";
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

