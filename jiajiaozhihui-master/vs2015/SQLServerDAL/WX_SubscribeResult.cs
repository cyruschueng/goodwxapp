using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_SubscribeResult
	/// </summary>
	public partial class WX_SubscribeResult:IWX_SubscribeResult
	{
		public WX_SubscribeResult()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_SubscribeResult"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_SubscribeResult");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.WX_SubscribeResult model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_SubscribeResult(");
			strSql.Append("ShareID,Number)");
			strSql.Append(" values (");
			strSql.Append("@ShareID,@Number)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@ShareID", SqlDbType.NVarChar,50),
					new SqlParameter("@Number", SqlDbType.Int,4)};
			parameters[0].Value = model.ShareID;
			parameters[1].Value = model.Number;

			object obj = DbHelperSQL.GetSingle(strSql.ToString(),parameters);
			if (obj == null)
			{
				return 0;
			}
			else
			{
				return Convert.ToInt32(obj);
			}
		}
		/// <summary>
		/// 更新一条数据
		/// </summary>
		public bool Update(SfSoft.Model.WX_SubscribeResult model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_SubscribeResult set ");
			strSql.Append("ShareID=@ShareID,");
			strSql.Append("Number=@Number");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ShareID", SqlDbType.NVarChar,50),
					new SqlParameter("@Number", SqlDbType.Int,4),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.ShareID;
			parameters[1].Value = model.Number;
			parameters[2].Value = model.ID;

			int rows=DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
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
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_SubscribeResult ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			int rows=DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
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
		/// 批量删除数据
		/// </summary>
		public bool DeleteList(string IDlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_SubscribeResult ");
			strSql.Append(" where ID in ("+IDlist + ")  ");
			int rows=DbHelperSQL.ExecuteSql(strSql.ToString());
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
		public SfSoft.Model.WX_SubscribeResult GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 ID,ShareID,Number from WX_SubscribeResult ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_SubscribeResult model=new SfSoft.Model.WX_SubscribeResult();
			DataSet ds=DbHelperSQL.Query(strSql.ToString(),parameters);
			if(ds.Tables[0].Rows.Count>0)
			{
				return DataRowToModel(ds.Tables[0].Rows[0]);
			}
			else
			{
				return null;
			}
		}


		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.WX_SubscribeResult DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_SubscribeResult model=new SfSoft.Model.WX_SubscribeResult();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["ShareID"]!=null)
				{
					model.ShareID=row["ShareID"].ToString();
				}
				if(row["Number"]!=null && row["Number"].ToString()!="")
				{
					model.Number=int.Parse(row["Number"].ToString());
				}
			}
			return model;
		}

		/// <summary>
		/// 获得数据列表
		/// </summary>
		public DataSet GetList(string strWhere)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select ID,ShareID,Number ");
			strSql.Append(" FROM WX_SubscribeResult ");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
			}
			return DbHelperSQL.Query(strSql.ToString());
		}

		/// <summary>
		/// 获得前几行数据
		/// </summary>
		public DataSet GetList(int Top,string strWhere,string filedOrder)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select ");
			if(Top>0)
			{
				strSql.Append(" top "+Top.ToString());
			}
			strSql.Append(" ID,ShareID,Number ");
			strSql.Append(" FROM WX_SubscribeResult ");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
			}
			strSql.Append(" order by " + filedOrder);
			return DbHelperSQL.Query(strSql.ToString());
		}

		/// <summary>
		/// 获取记录总数
		/// </summary>
		public int GetRecordCount(string strWhere)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) FROM WX_SubscribeResult ");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
			}
			object obj = DbHelperSQL.GetSingle(strSql.ToString());
			if (obj == null)
			{
				return 0;
			}
			else
			{
				return Convert.ToInt32(obj);
			}
		}
		/// <summary>
		/// 分页获取数据列表
		/// </summary>
		public DataSet GetListByPage(string strWhere, string orderby, int startIndex, int endIndex)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("SELECT * FROM ( ");
			strSql.Append(" SELECT ROW_NUMBER() OVER (");
			if (!string.IsNullOrEmpty(orderby.Trim()))
			{
				strSql.Append("order by T." + orderby );
			}
			else
			{
				strSql.Append("order by T.ID desc");
			}
			strSql.Append(")AS Row, T.*  from WX_SubscribeResult T ");
			if (!string.IsNullOrEmpty(strWhere.Trim()))
			{
				strSql.Append(" WHERE " + strWhere);
			}
			strSql.Append(" ) TT");
			strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
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
			parameters[0].Value = "WX_SubscribeResult";
			parameters[1].Value = "ID";
			parameters[2].Value = PageSize;
			parameters[3].Value = PageIndex;
			parameters[4].Value = 0;
			parameters[5].Value = 0;
			parameters[6].Value = strWhere;	
			return DbHelperSQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
		}*/

		#endregion  BasicMethod
		#region  ExtensionMethod

		#endregion  ExtensionMethod

        /// <summary>
        /// 关注成功加1个粉丝
        /// 
        /// </summary>
        /// <param name="openid">相对服务号的ID</param>
        /// <returns></returns>
        public int AddFans(string openid)
        {
            WX_SubscribeActivity bll = new WX_SubscribeActivity();
            Model.WX_SubscribeActivity model = bll.GetModel(openid);
            string shareid = model.ShareID;
            string id = model.ID.ToString();

            int number = 0;
            if (Exists(shareid))
            {
                string sql = "update WX_SubscribeResult set Number=isnull(Number,0)+1 where ShareID='" + shareid + "'";
                DbHelperSQL.ExecuteSql(sql);
                sql = "select Number from WX_SubscribeResult where ShareID='" + shareid + "'";
                number = (int)DbHelperSQL.ExecuteSqlGet(sql, "Number");
            }
            else {
                Model.WX_SubscribeResult modelResult = new Model.WX_SubscribeResult();
                modelResult.ShareID = shareid;
                modelResult.Number = 1;
                Add(modelResult);
                number = 1;
            }
            return number;
        }
        public int AddFansByOpenid(string openid)
        {
            int number = 0;
            if (Exists(openid))
            {
                string sql = "update WX_SubscribeResult set Number=isnull(Number,0)+1 where ShareID='" + openid + "'";
                DbHelperSQL.ExecuteSql(sql);
                sql = "select Number from WX_SubscribeResult where ShareID='" + openid + "'";
                number = (int)DbHelperSQL.ExecuteSqlGet(sql, "Number");
            }
            else {
                Model.WX_SubscribeResult modelResult = new Model.WX_SubscribeResult();
                modelResult.ShareID = openid;
                modelResult.Number = 1;
                Add(modelResult);
                number = 1;
            }
            return number;
        }
        /// <summary>
        /// 用粉丝换取礼物
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="number"></param>
        /// <returns></returns>
        public int SubtractFans(string openid, int number)
        {
            string sql = "update WX_SubscribeResult set Number=isnull(Number,0)-" + number + "where ShareID='" + openid + "'";
            DbHelperSQL.ExecuteSql(sql);
            sql = "select Number from WX_SubscribeResult where ShareID='" + openid + "'";
            int c = (int)DbHelperSQL.ExecuteSqlGet(sql, "Number");
            return c;
        }


        public Model.WX_SubscribeResult GetModel(string openid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,ShareID,Number from WX_SubscribeResult ");
            strSql.Append(" where ShareID=@ShareID");
            SqlParameter[] parameters = {
					new SqlParameter("@ShareID", SqlDbType.VarChar,50)
			};
            parameters[0].Value = openid;

            SfSoft.Model.WX_SubscribeResult model = new SfSoft.Model.WX_SubscribeResult();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return DataRowToModel(ds.Tables[0].Rows[0]);
            }
            else
            {
                return null;
            }
        }


        public bool Exists(string openid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from WX_SubscribeResult");
            strSql.Append(" where ShareID=@ShareID");
            SqlParameter[] parameters = {
					new SqlParameter("@ShareID", SqlDbType.NVarChar,50)
			};
            parameters[0].Value = openid;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }
    }
}

