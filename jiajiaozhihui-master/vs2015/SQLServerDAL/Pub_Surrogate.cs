using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类Pub_Surrogate。
	/// </summary>
	public class Pub_Surrogate:IPub_Surrogate
	{
		public Pub_Surrogate()
		{}
		#region  成员方法

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "Pub_Surrogate"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from Pub_Surrogate");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_Surrogate model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_Surrogate(");
            strSql.Append("AuditMan,AuditManID,SurMan,SurManID,MID,IsLimit,StartDate,EndDate,ctime,mtime,conflictCtrlID,owner,creator,FilialeID)");
            strSql.Append(" values (");
            strSql.Append("@AuditMan,@AuditManID,@SurMan,@SurManID,@MID,@IsLimit,@StartDate,@EndDate,@ctime,@mtime,@conflictCtrlID,@owner,@creator,@FilialeID)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@AuditMan", SqlDbType.NVarChar,20),
					new SqlParameter("@AuditManID", SqlDbType.Int,4),
					new SqlParameter("@SurMan", SqlDbType.NVarChar,20),
					new SqlParameter("@SurManID", SqlDbType.Int,4),
					new SqlParameter("@MID", SqlDbType.NVarChar,50),
					new SqlParameter("@IsLimit", SqlDbType.NVarChar,5),
					new SqlParameter("@StartDate", SqlDbType.DateTime),
					new SqlParameter("@EndDate", SqlDbType.DateTime),
					new SqlParameter("@ctime", SqlDbType.DateTime),
					new SqlParameter("@mtime", SqlDbType.DateTime),
					new SqlParameter("@conflictCtrlID", SqlDbType.NVarChar,10),
					new SqlParameter("@owner", SqlDbType.Int,4),
					new SqlParameter("@creator", SqlDbType.Int,4),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,10)};
            parameters[0].Value = model.AuditMan;
            parameters[1].Value = model.AuditManID;
            parameters[2].Value = model.SurMan;
            parameters[3].Value = model.SurManID;
            parameters[4].Value = model.MID;
            parameters[5].Value = model.IsLimit;
            parameters[6].Value = model.StartDate;
            parameters[7].Value = model.EndDate;
            parameters[8].Value = model.ctime;
            parameters[9].Value = model.mtime;
            parameters[10].Value = model.conflictCtrlID;
            parameters[11].Value = model.owner;
            parameters[12].Value = model.creator;
            parameters[13].Value = model.FilialeID;

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
        public void Update(SfSoft.Model.Pub_Surrogate model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_Surrogate set ");
            strSql.Append("AuditMan=@AuditMan,");
            strSql.Append("AuditManID=@AuditManID,");
            strSql.Append("SurMan=@SurMan,");
            strSql.Append("SurManID=@SurManID,");
            strSql.Append("MID=@MID,");
            strSql.Append("IsLimit=@IsLimit,");
            strSql.Append("StartDate=@StartDate,");
            strSql.Append("EndDate=@EndDate,");
            strSql.Append("ctime=@ctime,");
            strSql.Append("mtime=@mtime,");
            strSql.Append("conflictCtrlID=@conflictCtrlID,");
            strSql.Append("owner=@owner,");
            strSql.Append("creator=@creator,");
            strSql.Append("FilialeID=@FilialeID");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@AuditMan", SqlDbType.NVarChar,20),
					new SqlParameter("@AuditManID", SqlDbType.Int,4),
					new SqlParameter("@SurMan", SqlDbType.NVarChar,20),
					new SqlParameter("@SurManID", SqlDbType.Int,4),
					new SqlParameter("@MID", SqlDbType.NVarChar,50),
					new SqlParameter("@IsLimit", SqlDbType.NVarChar,5),
					new SqlParameter("@StartDate", SqlDbType.DateTime),
					new SqlParameter("@EndDate", SqlDbType.DateTime),
					new SqlParameter("@ctime", SqlDbType.DateTime),
					new SqlParameter("@mtime", SqlDbType.DateTime),
					new SqlParameter("@conflictCtrlID", SqlDbType.NVarChar,10),
					new SqlParameter("@owner", SqlDbType.Int,4),
					new SqlParameter("@creator", SqlDbType.Int,4),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,10)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.AuditMan;
            parameters[2].Value = model.AuditManID;
            parameters[3].Value = model.SurMan;
            parameters[4].Value = model.SurManID;
            parameters[5].Value = model.MID;
            parameters[6].Value = model.IsLimit;
            parameters[7].Value = model.StartDate;
            parameters[8].Value = model.EndDate;
            parameters[9].Value = model.ctime;
            parameters[10].Value = model.mtime;
            parameters[11].Value = model.conflictCtrlID;
            parameters[12].Value = model.owner;
            parameters[13].Value = model.creator;
            parameters[14].Value = model.FilialeID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_Surrogate ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int AuditManID, string FilialeID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_Surrogate ");
            strSql.Append(" where AuditManID=@AuditManID and FilialeID=@FilialeID");
            SqlParameter[] parameters = {
					new SqlParameter("@AuditManID", SqlDbType.Int,4),
                    new SqlParameter("@FilialeID", SqlDbType.NVarChar,10)
            };
            parameters[0].Value = AuditManID;
            parameters[1].Value = FilialeID;
            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_Surrogate GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,AuditMan,AuditManID,SurMan,SurManID,MID,IsLimit,StartDate,EndDate,ctime,mtime,conflictCtrlID,owner,creator,FilialeID from Pub_Surrogate ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_Surrogate model = new SfSoft.Model.Pub_Surrogate();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.AuditMan = ds.Tables[0].Rows[0]["AuditMan"].ToString();
                if (ds.Tables[0].Rows[0]["AuditManID"].ToString() != "")
                {
                    model.AuditManID = int.Parse(ds.Tables[0].Rows[0]["AuditManID"].ToString());
                }
                model.SurMan = ds.Tables[0].Rows[0]["SurMan"].ToString();
                if (ds.Tables[0].Rows[0]["SurManID"].ToString() != "")
                {
                    model.SurManID = int.Parse(ds.Tables[0].Rows[0]["SurManID"].ToString());
                }
                model.MID = ds.Tables[0].Rows[0]["MID"].ToString();
                model.IsLimit = ds.Tables[0].Rows[0]["IsLimit"].ToString();
                if (ds.Tables[0].Rows[0]["StartDate"].ToString() != "")
                {
                    model.StartDate = DateTime.Parse(ds.Tables[0].Rows[0]["StartDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["EndDate"].ToString() != "")
                {
                    model.EndDate = DateTime.Parse(ds.Tables[0].Rows[0]["EndDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["ctime"].ToString() != "")
                {
                    model.ctime = DateTime.Parse(ds.Tables[0].Rows[0]["ctime"].ToString());
                }
                if (ds.Tables[0].Rows[0]["mtime"].ToString() != "")
                {
                    model.mtime = DateTime.Parse(ds.Tables[0].Rows[0]["mtime"].ToString());
                }
                model.conflictCtrlID = ds.Tables[0].Rows[0]["conflictCtrlID"].ToString();
                if (ds.Tables[0].Rows[0]["owner"].ToString() != "")
                {
                    model.owner = int.Parse(ds.Tables[0].Rows[0]["owner"].ToString());
                }
                if (ds.Tables[0].Rows[0]["creator"].ToString() != "")
                {
                    model.creator = int.Parse(ds.Tables[0].Rows[0]["creator"].ToString());
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
            strSql.Append("select ID,AuditMan,AuditManID,SurMan,SurManID,MID,IsLimit,StartDate,EndDate,ctime,mtime,conflictCtrlID,owner,creator,FilialeID ");
            strSql.Append(" FROM Pub_Surrogate ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQL.Query(strSql.ToString());
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetSurrogateList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" select a.FunID,a.FunName,b.ID,b.AuditMan,b.AuditManID,b.SurMan,b.SurManID,b.IsLimit,b.StartDate,b.EndDate from Pub_FunDef as a left join  ");
            strSql.Append("Pub_Surrogate as b on a.FunID=b.MID ");


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
			parameters[0].Value = "Pub_Surrogate";
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

