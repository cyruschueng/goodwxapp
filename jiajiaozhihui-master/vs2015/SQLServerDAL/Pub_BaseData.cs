using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_BaseData。
    /// </summary>
    public class Pub_BaseData : IPub_BaseData
    {
        public Pub_BaseData()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int RefID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_BaseData");
            strSql.Append(" where RefID=@RefID ");
            SqlParameter[] parameters = {
					new SqlParameter("@RefID", SqlDbType.Int,4)};
            parameters[0].Value = RefID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_BaseData model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_BaseData(");
            strSql.Append("RefPID,RefObj,RefValueCode,RefValue_e,RefValue,IsSystem,IsAct,OrderID,FilialeID)");
            strSql.Append(" values (");
            strSql.Append("@RefPID,@RefObj,@RefValueCode,@RefValue_e,@RefValue,@IsSystem,@IsAct,@OrderID,@FilialeID)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@RefPID", SqlDbType.Int,4),
					new SqlParameter("@RefObj", SqlDbType.NVarChar,50),
					new SqlParameter("@RefValueCode", SqlDbType.NVarChar,50),
					new SqlParameter("@RefValue_e", SqlDbType.NVarChar,50),
					new SqlParameter("@RefValue", SqlDbType.NVarChar,50),
					new SqlParameter("@IsSystem", SqlDbType.NVarChar,5),
					new SqlParameter("@IsAct", SqlDbType.NVarChar,5),
					new SqlParameter("@OrderID", SqlDbType.Int,4),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,5)};
            parameters[0].Value = model.RefPID;
            parameters[1].Value = model.RefObj;
            parameters[2].Value = model.RefValueCode;
            parameters[3].Value = model.RefValue_e;
            parameters[4].Value = model.RefValue;
            parameters[5].Value = model.IsSystem;
            parameters[6].Value = model.IsAct;
            parameters[7].Value = model.OrderID;
            parameters[8].Value = model.FilialeID;

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
        public void Update(SfSoft.Model.Pub_BaseData model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_BaseData set ");
            strSql.Append("RefPID=@RefPID,");
            strSql.Append("RefObj=@RefObj,");
            strSql.Append("RefValueCode=@RefValueCode,");
            strSql.Append("RefValue_e=@RefValue_e,");
            strSql.Append("RefValue=@RefValue,");
            strSql.Append("IsSystem=@IsSystem,");
            strSql.Append("IsAct=@IsAct,");
            strSql.Append("OrderID=@OrderID,");
            strSql.Append("FilialeID=@FilialeID");
            strSql.Append(" where RefID=@RefID ");
            SqlParameter[] parameters = {
					new SqlParameter("@RefID", SqlDbType.Int,4),
					new SqlParameter("@RefPID", SqlDbType.Int,4),
					new SqlParameter("@RefObj", SqlDbType.NVarChar,50),
					new SqlParameter("@RefValueCode", SqlDbType.NVarChar,50),
					new SqlParameter("@RefValue_e", SqlDbType.NVarChar,50),
					new SqlParameter("@RefValue", SqlDbType.NVarChar,50),
					new SqlParameter("@IsSystem", SqlDbType.NVarChar,5),
					new SqlParameter("@IsAct", SqlDbType.NVarChar,5),
					new SqlParameter("@OrderID", SqlDbType.Int,4),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,5)};
            parameters[0].Value = model.RefID;
            parameters[1].Value = model.RefPID;
            parameters[2].Value = model.RefObj;
            parameters[3].Value = model.RefValueCode;
            parameters[4].Value = model.RefValue_e;
            parameters[5].Value = model.RefValue;
            parameters[6].Value = model.IsSystem;
            parameters[7].Value = model.IsAct;
            parameters[8].Value = model.OrderID;
            parameters[9].Value = model.FilialeID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int RefID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_BaseData ");
            strSql.Append(" where RefID=@RefID ");
            SqlParameter[] parameters = {
					new SqlParameter("@RefID", SqlDbType.Int,4)};
            parameters[0].Value = RefID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_BaseData GetModel(int RefID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select RefID,RefPID,RefObj,RefValueCode,RefValue_e,RefValue,IsSystem,IsAct,OrderID,FilialeID from Pub_BaseData ");
            strSql.Append(" where RefID=@RefID ");
            SqlParameter[] parameters = {
					new SqlParameter("@RefID", SqlDbType.Int,4)};
            parameters[0].Value = RefID;

            SfSoft.Model.Pub_BaseData model = new SfSoft.Model.Pub_BaseData();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["RefID"].ToString() != "")
                {
                    model.RefID = int.Parse(ds.Tables[0].Rows[0]["RefID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["RefPID"].ToString() != "")
                {
                    model.RefPID = int.Parse(ds.Tables[0].Rows[0]["RefPID"].ToString());
                }
                model.RefObj = ds.Tables[0].Rows[0]["RefObj"].ToString();
                model.RefValueCode = ds.Tables[0].Rows[0]["RefValueCode"].ToString();
                model.RefValue_e = ds.Tables[0].Rows[0]["RefValue_e"].ToString();
                model.RefValue = ds.Tables[0].Rows[0]["RefValue"].ToString();
                model.IsSystem = ds.Tables[0].Rows[0]["IsSystem"].ToString();
                model.IsAct = ds.Tables[0].Rows[0]["IsAct"].ToString();
                if (ds.Tables[0].Rows[0]["OrderID"].ToString() != "")
                {
                    model.OrderID = int.Parse(ds.Tables[0].Rows[0]["OrderID"].ToString());
                }
                model.FilialeID = ds.Tables[0].Rows[0]["FilialeID"].ToString();
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
            strSql.Append("select RefID,RefPID,RefObj,RefValueCode,RefValue_e,RefValue,IsSystem,IsAct,OrderID,FilialeID ");
            strSql.Append(" FROM Pub_BaseData ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            strSql.Append(" order by  OrderID, RefValueCode");
            return DbHelperSQL.Query(strSql.ToString());
        }


        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList( int top, string strWhere,string orderBy)
        {
            StringBuilder strSql = new StringBuilder();
            if (top > 0)
            {
                strSql.Append("select top " + top.ToString() + " RefID,RefPID,RefObj,RefValueCode,RefValue_e,RefValue,IsSystem,IsAct,OrderID,FilialeID ");
            }
            else {
                strSql.Append("select RefID,RefPID,RefObj,RefValueCode,RefValue_e,RefValue,IsSystem,IsAct,OrderID,FilialeID ");
            }
            strSql.Append(" FROM Pub_BaseData ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            if (orderBy != "")
            {
                strSql.Append(" order by  "+orderBy);
            }
            else {
                strSql.Append(" order by  OrderID, RefValueCode");
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
            parameters[0].Value = "Pub_BaseData";
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

