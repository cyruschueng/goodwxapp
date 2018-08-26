using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:Pub_CallType
	/// </summary>
	public class Pub_CallType:IPub_CallType
	{
		public Pub_CallType()
		{}
		#region  Method

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "Pub_CallType"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from Pub_CallType");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_CallType model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_CallType(");
            strSql.Append("AppID,ModulesID,DocID,CallType,ReCallTime,CallTime)");
            strSql.Append(" values (");
            strSql.Append("@AppID,@ModulesID,@DocID,@CallType,@ReCallTime,@CallTime)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@AppID", SqlDbType.NVarChar,20),
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,40),
					new SqlParameter("@DocID", SqlDbType.NVarChar,40),
					new SqlParameter("@CallType", SqlDbType.Int,4),
					new SqlParameter("@ReCallTime", SqlDbType.Float,8),
					new SqlParameter("@CallTime", SqlDbType.Float,8)};
            parameters[0].Value = model.AppID;
            parameters[1].Value = model.ModulesID;
            parameters[2].Value = model.DocID;
            parameters[3].Value = model.CallType;
            parameters[4].Value = model.ReCallTime;
            parameters[5].Value = model.CallTime;

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
        public bool Update(SfSoft.Model.Pub_CallType model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_CallType set ");
            strSql.Append("AppID=@AppID,");
            strSql.Append("ModulesID=@ModulesID,");
            strSql.Append("DocID=@DocID,");
            strSql.Append("CallType=@CallType,");
            strSql.Append("ReCallTime=@ReCallTime,");
            strSql.Append("CallTime=@CallTime");
            strSql.Append(" where ID=@ID");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@AppID", SqlDbType.NVarChar,20),
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,40),
					new SqlParameter("@DocID", SqlDbType.NVarChar,40),
					new SqlParameter("@CallType", SqlDbType.Int,4),
					new SqlParameter("@ReCallTime", SqlDbType.Float,8),
					new SqlParameter("@CallTime", SqlDbType.Float,8)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.AppID;
            parameters[2].Value = model.ModulesID;
            parameters[3].Value = model.DocID;
            parameters[4].Value = model.CallType;
            parameters[5].Value = model.ReCallTime;
            parameters[6].Value = model.CallTime;

            int rows = DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
            if (rows > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public bool Delete(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from Pub_CallType ");
            strSql.Append(" where ID=@ID");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
};
            parameters[0].Value = ID;

            int rows = DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
            if (rows > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        /// <summary>
        /// 删除一条数据
        /// </summary>
        public bool DeleteList(string IDlist)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from Pub_CallType ");
            strSql.Append(" where ID in (" + IDlist + ")  ");
            int rows = DbHelperSQL.ExecuteSql(strSql.ToString());
            if (rows > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_CallType GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,AppID,ModulesID,DocID,CallType,ReCallTime,CallTime from Pub_CallType ");
            strSql.Append(" where ID=@ID");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_CallType model = new SfSoft.Model.Pub_CallType();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.AppID = ds.Tables[0].Rows[0]["AppID"].ToString();
                model.ModulesID = ds.Tables[0].Rows[0]["ModulesID"].ToString();
                model.DocID = ds.Tables[0].Rows[0]["DocID"].ToString();
                if (ds.Tables[0].Rows[0]["CallType"].ToString() != "")
                {
                    model.CallType = int.Parse(ds.Tables[0].Rows[0]["CallType"].ToString());
                }
                if (ds.Tables[0].Rows[0]["ReCallTime"].ToString() != "")
                {
                    model.ReCallTime = decimal.Parse(ds.Tables[0].Rows[0]["ReCallTime"].ToString());
                }
                if (ds.Tables[0].Rows[0]["CallTime"].ToString() != "")
                {
                    model.CallTime = decimal.Parse(ds.Tables[0].Rows[0]["CallTime"].ToString());
                }
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
            strSql.Append("select ID,AppID,ModulesID,DocID,CallType,ReCallTime,CallTime ");
            strSql.Append(" FROM Pub_CallType ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQL.Query(strSql.ToString());
        }

        /// <summary>
        /// 获得前几行数据
        /// </summary>
        public DataSet GetList(int Top, string strWhere, string filedOrder)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ");
            if (Top > 0)
            {
                strSql.Append(" top " + Top.ToString());
            }
            strSql.Append(" ID,AppID,ModulesID,DocID,CallType,ReCallTime,CallTime ");
            strSql.Append(" FROM Pub_CallType ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            strSql.Append(" order by " + filedOrder);
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
            parameters[0].Value = "Pub_CallType";
            parameters[1].Value = "";
            parameters[2].Value = PageSize;
            parameters[3].Value = PageIndex;
            parameters[4].Value = 0;
            parameters[5].Value = 0;
            parameters[6].Value = strWhere;	
            return DbHelperSQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
        }*/

        #endregion  Method
	}
}

