using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Doublenovember_Award
	/// </summary>
	public partial class WX_Doublenovember_Award:IWX_Doublenovember_Award
	{
		public WX_Doublenovember_Award()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_Doublenovember_Award"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Doublenovember_Award");
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
		public int Add(SfSoft.Model.WX_Doublenovember_Award model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Doublenovember_Award(");
            strSql.Append("OpenId,IntegralEarn,IntegralWasting,GoldEarn,GoldWasting,IsInit,DiamondEarn,DiamondWasting)");
			strSql.Append(" values (");
            strSql.Append("@OpenId,@IntegralEarn,@IntegralWasting,@GoldEarn,@GoldWasting,@IsInit,@DiamondEarn,@DiamondWasting)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.VarChar,50),
					new SqlParameter("@IntegralEarn", SqlDbType.Int,4),
					new SqlParameter("@IntegralWasting", SqlDbType.Int,4),
					new SqlParameter("@GoldEarn", SqlDbType.Int,4),
					new SqlParameter("@GoldWasting", SqlDbType.Int,4),
                    new SqlParameter("@IsInit", SqlDbType.Int,4),
                    new SqlParameter("@DiamondEarn", SqlDbType.Int,4),
                    new SqlParameter("@DiamondWasting", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenId;
			parameters[1].Value = model.IntegralEarn;
			parameters[2].Value = model.IntegralWasting;
			parameters[3].Value = model.GoldEarn;
			parameters[4].Value = model.GoldWasting;
            parameters[5].Value = model.IsInit;
            parameters[6].Value = model.DiamondEarn;
            parameters[7].Value = model.DiamondWasting;

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
		public bool Update(SfSoft.Model.WX_Doublenovember_Award model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Doublenovember_Award set ");
			strSql.Append("OpenId=@OpenId,");
			strSql.Append("IntegralEarn=@IntegralEarn,");
			strSql.Append("IntegralWasting=@IntegralWasting,");
			strSql.Append("GoldEarn=@GoldEarn,");
			strSql.Append("GoldWasting=@GoldWasting,");
            strSql.Append("IsInit=@IsInit,");
            strSql.Append("DiamondEarn=@DiamondEarn,");
            strSql.Append("DiamondWasting=@DiamondWasting");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.VarChar,50),
					new SqlParameter("@IntegralEarn", SqlDbType.Int,4),
					new SqlParameter("@IntegralWasting", SqlDbType.Int,4),
					new SqlParameter("@GoldEarn", SqlDbType.Int,4),
					new SqlParameter("@GoldWasting", SqlDbType.Int,4),
                    new SqlParameter("@IsInit", SqlDbType.Int,4),
                    new SqlParameter("@DiamondEarn", SqlDbType.Int,4),
                    new SqlParameter("@DiamondWasting", SqlDbType.Int,4),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenId;
			parameters[1].Value = model.IntegralEarn;
			parameters[2].Value = model.IntegralWasting;
			parameters[3].Value = model.GoldEarn;
			parameters[4].Value = model.GoldWasting;
            parameters[5].Value = model.IsInit;
            parameters[6].Value = model.DiamondEarn;
            parameters[7].Value = model.DiamondWasting;
			parameters[8].Value = model.ID;

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
			strSql.Append("delete from WX_Doublenovember_Award ");
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
			strSql.Append("delete from WX_Doublenovember_Award ");
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
		public SfSoft.Model.WX_Doublenovember_Award GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,OpenId,IntegralEarn,IntegralWasting,GoldEarn,GoldWasting,IsInit,DiamondEarn,DiamondWasting from WX_Doublenovember_Award ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_Doublenovember_Award model=new SfSoft.Model.WX_Doublenovember_Award();
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
		public SfSoft.Model.WX_Doublenovember_Award DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Doublenovember_Award model=new SfSoft.Model.WX_Doublenovember_Award();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["OpenId"]!=null)
				{
					model.OpenId=row["OpenId"].ToString();
				}
				if(row["IntegralEarn"]!=null && row["IntegralEarn"].ToString()!="")
				{
					model.IntegralEarn=int.Parse(row["IntegralEarn"].ToString());
				}
				if(row["IntegralWasting"]!=null && row["IntegralWasting"].ToString()!="")
				{
					model.IntegralWasting=int.Parse(row["IntegralWasting"].ToString());
				}
				if(row["GoldEarn"]!=null && row["GoldEarn"].ToString()!="")
				{
					model.GoldEarn=int.Parse(row["GoldEarn"].ToString());
				}
				if(row["GoldWasting"]!=null && row["GoldWasting"].ToString()!="")
				{
					model.GoldWasting=int.Parse(row["GoldWasting"].ToString());
				}
                if (row["IsInit"] != null && row["IsInit"].ToString() != "")
                {
                    model.IsInit = int.Parse(row["IsInit"].ToString());
                }
                if (row["DiamondEarn"] != null && row["DiamondEarn"].ToString() != "")
                {
                    model.DiamondEarn = int.Parse(row["DiamondEarn"].ToString());
                }
                if (row["DiamondWasting"] != null && row["DiamondWasting"].ToString() != "")
                {
                    model.DiamondWasting = int.Parse(row["DiamondWasting"].ToString());
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
            strSql.Append("select ID,OpenId,IntegralEarn,IntegralWasting,GoldEarn,GoldWasting,IsInit,DiamondEarn,DiamondWasting ");
			strSql.Append(" FROM WX_Doublenovember_Award ");
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
            strSql.Append(" ID,OpenId,IntegralEarn,IntegralWasting,GoldEarn,GoldWasting,IsInit,DiamondEarn,DiamondWasting ");
			strSql.Append(" FROM WX_Doublenovember_Award ");
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
			strSql.Append("select count(1) FROM WX_Doublenovember_Award ");
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
			strSql.Append(")AS Row, T.*  from WX_Doublenovember_Award T ");
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
			parameters[0].Value = "WX_Doublenovember_Award";
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


        public Model.WX_Doublenovember_Award GetModel(string openid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,OpenId,IntegralEarn,IntegralWasting,GoldEarn,GoldWasting,IsInit,DiamondEarn,DiamondWasting from WX_Doublenovember_Award ");
            strSql.Append(" where OpenId=@OpenId");
            SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,50)
			};
            parameters[0].Value = openid;

            SfSoft.Model.WX_Doublenovember_Award model = new SfSoft.Model.WX_Doublenovember_Award();
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
    }
}

