using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类Pub_Data_doc。
	/// </summary>
	public class Pub_Data_doc:IPub_Data_doc
	{
		public Pub_Data_doc()
		{}
		#region  成员方法

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("DataAclID", "Pub_Data_doc"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int DataAclID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from Pub_Data_doc");
			strSql.Append(" where DataAclID=@DataAclID ");
			SqlParameter[] parameters = {
					new SqlParameter("@DataAclID", SqlDbType.Int,4)};
			parameters[0].Value = DataAclID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.Pub_Data_doc model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into Pub_Data_doc(");
			strSql.Append("ModulesID,DataAclDesc,FilialeID)");
			strSql.Append(" values (");
			strSql.Append("@ModulesID,@DataAclDesc,@FilialeID)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,30),
					new SqlParameter("@DataAclDesc", SqlDbType.NVarChar,50),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,5)};
			parameters[0].Value = model.ModulesID;
			parameters[1].Value = model.DataAclDesc;
			parameters[2].Value = model.FilialeID;

			object obj = DbHelperSQL.GetSingle(strSql.ToString(),parameters);
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
		public void Update(SfSoft.Model.Pub_Data_doc model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update Pub_Data_doc set ");
			strSql.Append("ModulesID=@ModulesID,");
			strSql.Append("DataAclDesc=@DataAclDesc,");
			strSql.Append("FilialeID=@FilialeID");
			strSql.Append(" where DataAclID=@DataAclID ");
			SqlParameter[] parameters = {
					new SqlParameter("@DataAclID", SqlDbType.Int,4),
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,30),
					new SqlParameter("@DataAclDesc", SqlDbType.NVarChar,50),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,5)};
			parameters[0].Value = model.DataAclID;
			parameters[1].Value = model.ModulesID;
			parameters[2].Value = model.DataAclDesc;
			parameters[3].Value = model.FilialeID;

			DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
		}

		/// <summary>
		/// 删除一条数据
		/// </summary>
		public void Delete(int DataAclID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete Pub_Data_doc ");
			strSql.Append(" where DataAclID=@DataAclID ");
			SqlParameter[] parameters = {
					new SqlParameter("@DataAclID", SqlDbType.Int,4)};
			parameters[0].Value = DataAclID;

			DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.Pub_Data_doc GetModel(int DataAclID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select DataAclID,ModulesID,DataAclDesc,FilialeID from Pub_Data_doc ");
			strSql.Append(" where DataAclID=@DataAclID ");
			SqlParameter[] parameters = {
					new SqlParameter("@DataAclID", SqlDbType.Int,4)};
			parameters[0].Value = DataAclID;

			SfSoft.Model.Pub_Data_doc model=new SfSoft.Model.Pub_Data_doc();
			DataSet ds=DbHelperSQL.Query(strSql.ToString(),parameters);
			if(ds.Tables[0].Rows.Count>0)
			{
				if(ds.Tables[0].Rows[0]["DataAclID"].ToString()!="")
				{
					model.DataAclID=int.Parse(ds.Tables[0].Rows[0]["DataAclID"].ToString());
				}
				model.ModulesID=ds.Tables[0].Rows[0]["ModulesID"].ToString();
				model.DataAclDesc=ds.Tables[0].Rows[0]["DataAclDesc"].ToString();
				model.FilialeID=ds.Tables[0].Rows[0]["FilialeID"].ToString();
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
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select DataAclID,ModulesID,DataAclDesc,FilialeID ");
			strSql.Append(" FROM Pub_Data_doc ");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
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
			parameters[0].Value = "Pub_Data_doc";
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

