using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类Pub_Data_Acl_Users。
	/// </summary>
	public class Pub_Data_Acl_Users:IPub_Data_Acl_Users
	{
		public Pub_Data_Acl_Users()
		{}
		#region  成员方法

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "Pub_Data_Acl_Users"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from Pub_Data_Acl_Users");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.Pub_Data_Acl_Users model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into Pub_Data_Acl_Users(");
			strSql.Append("DataAclID,UID)");
			strSql.Append(" values (");
			strSql.Append("@DataAclID,@UID)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@DataAclID", SqlDbType.Int,4),
					new SqlParameter("@UID", SqlDbType.Int,4)};
			parameters[0].Value = model.DataAclID;
			parameters[1].Value = model.UID;

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
		public void Update(SfSoft.Model.Pub_Data_Acl_Users model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update Pub_Data_Acl_Users set ");
			strSql.Append("DataAclID=@DataAclID,");
			strSql.Append("UID=@UID");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@DataAclID", SqlDbType.Int,4),
					new SqlParameter("@UID", SqlDbType.Int,4)};
			parameters[0].Value = model.ID;
			parameters[1].Value = model.DataAclID;
			parameters[2].Value = model.UID;

			DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
		}

		/// <summary>
		/// 删除一条数据
		/// </summary>
		public void Delete(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete Pub_Data_Acl_Users ");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
		}
        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Deletes(int DataAclID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_Data_Acl_Users ");
            strSql.Append(" where DataAclID=@DataAclID ");
            SqlParameter[] parameters = {
					new SqlParameter("@DataAclID", SqlDbType.Int,4)};
            parameters[0].Value = DataAclID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.Pub_Data_Acl_Users GetModel(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select ID,DataAclID,UID from Pub_Data_Acl_Users ");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			SfSoft.Model.Pub_Data_Acl_Users model=new SfSoft.Model.Pub_Data_Acl_Users();
			DataSet ds=DbHelperSQL.Query(strSql.ToString(),parameters);
			if(ds.Tables[0].Rows.Count>0)
			{
				if(ds.Tables[0].Rows[0]["ID"].ToString()!="")
				{
					model.ID=int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
				}
				if(ds.Tables[0].Rows[0]["DataAclID"].ToString()!="")
				{
					model.DataAclID=int.Parse(ds.Tables[0].Rows[0]["DataAclID"].ToString());
				}
				if(ds.Tables[0].Rows[0]["UID"].ToString()!="")
				{
					model.UID=int.Parse(ds.Tables[0].Rows[0]["UID"].ToString());
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
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select a.ID,a.DataAclID,a.UID,b.CnName ");
            strSql.Append(" FROM Pub_Data_Acl_Users as a left join  Pub_EmpInfo as b on a.UID=b.ID");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
			}
            strSql.Append(" order by b.CnName  ");
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
			parameters[0].Value = "Pub_Data_Acl_Users";
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

