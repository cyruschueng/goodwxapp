using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类Pub_Help。
	/// </summary>
	public class Pub_Help:IPub_Help
	{
		public Pub_Help()
		{}
		#region  成员方法

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "Pub_Help"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from Pub_Help");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.Pub_Help model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into Pub_Help(");
			strSql.Append("ModulesID,ModulesName,Content,NoteInfo,Mpath,CaseInfo,FlowInfo,AppInfo,Others)");
			strSql.Append(" values (");
			strSql.Append("@ModulesID,@ModulesName,@Content,@NoteInfo,@Mpath,@CaseInfo,@FlowInfo,@AppInfo,@Others)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,30),
					new SqlParameter("@ModulesName", SqlDbType.NVarChar,30),
					new SqlParameter("@Content", SqlDbType.Text),
					new SqlParameter("@NoteInfo", SqlDbType.NVarChar,200),
					new SqlParameter("@Mpath", SqlDbType.NVarChar,150),
					new SqlParameter("@CaseInfo", SqlDbType.Text),
					new SqlParameter("@FlowInfo", SqlDbType.Text),
					new SqlParameter("@AppInfo", SqlDbType.Text),
					new SqlParameter("@Others", SqlDbType.Text)};
			parameters[0].Value = model.ModulesID;
			parameters[1].Value = model.ModulesName;
			parameters[2].Value = model.Content;
			parameters[3].Value = model.NoteInfo;
			parameters[4].Value = model.Mpath;
			parameters[5].Value = model.CaseInfo;
			parameters[6].Value = model.FlowInfo;
			parameters[7].Value = model.AppInfo;
			parameters[8].Value = model.Others;

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
		public void Update(SfSoft.Model.Pub_Help model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update Pub_Help set ");
			strSql.Append("ModulesID=@ModulesID,");
			strSql.Append("ModulesName=@ModulesName,");
			strSql.Append("Content=@Content,");
			strSql.Append("NoteInfo=@NoteInfo,");
			strSql.Append("Mpath=@Mpath,");
			strSql.Append("CaseInfo=@CaseInfo,");
			strSql.Append("FlowInfo=@FlowInfo,");
			strSql.Append("AppInfo=@AppInfo,");
			strSql.Append("Others=@Others");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,30),
					new SqlParameter("@ModulesName", SqlDbType.NVarChar,30),
					new SqlParameter("@Content", SqlDbType.Text),
					new SqlParameter("@NoteInfo", SqlDbType.NVarChar,200),
					new SqlParameter("@Mpath", SqlDbType.NVarChar,150),
					new SqlParameter("@CaseInfo", SqlDbType.Text),
					new SqlParameter("@FlowInfo", SqlDbType.Text),
					new SqlParameter("@AppInfo", SqlDbType.Text),
					new SqlParameter("@Others", SqlDbType.Text)};
			parameters[0].Value = model.ID;
			parameters[1].Value = model.ModulesID;
			parameters[2].Value = model.ModulesName;
			parameters[3].Value = model.Content;
			parameters[4].Value = model.NoteInfo;
			parameters[5].Value = model.Mpath;
			parameters[6].Value = model.CaseInfo;
			parameters[7].Value = model.FlowInfo;
			parameters[8].Value = model.AppInfo;
			parameters[9].Value = model.Others;

			DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
		}

		/// <summary>
		/// 删除一条数据
		/// </summary>
		public void Delete(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete Pub_Help ");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.Pub_Help GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 ID,ModulesID,ModulesName,Content,NoteInfo,Mpath,CaseInfo,FlowInfo,AppInfo,Others from Pub_Help ");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			SfSoft.Model.Pub_Help model=new SfSoft.Model.Pub_Help();
			DataSet ds=DbHelperSQL.Query(strSql.ToString(),parameters);
			if(ds.Tables[0].Rows.Count>0)
			{
				if(ds.Tables[0].Rows[0]["ID"].ToString()!="")
				{
					model.ID=int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
				}
				model.ModulesID=ds.Tables[0].Rows[0]["ModulesID"].ToString();
				model.ModulesName=ds.Tables[0].Rows[0]["ModulesName"].ToString();
				model.Content=ds.Tables[0].Rows[0]["Content"].ToString();
				model.NoteInfo=ds.Tables[0].Rows[0]["NoteInfo"].ToString();
				model.Mpath=ds.Tables[0].Rows[0]["Mpath"].ToString();
				model.CaseInfo=ds.Tables[0].Rows[0]["CaseInfo"].ToString();
				model.FlowInfo=ds.Tables[0].Rows[0]["FlowInfo"].ToString();
				model.AppInfo=ds.Tables[0].Rows[0]["AppInfo"].ToString();
				model.Others=ds.Tables[0].Rows[0]["Others"].ToString();
				return model;
			}
			else
			{
				return null;
			}
		}
        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_Help GetModel(string  HelpID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,ModulesID,ModulesName,Content,NoteInfo,Mpath,CaseInfo,FlowInfo,AppInfo,Others from Pub_Help ");
            strSql.Append(" where ModulesID=@HelpID ");
            SqlParameter[] parameters = {
					new SqlParameter("@HelpID", SqlDbType.NVarChar ,50)};
            parameters[0].Value = HelpID;

            SfSoft.Model.Pub_Help model = new SfSoft.Model.Pub_Help();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.ModulesID = ds.Tables[0].Rows[0]["ModulesID"].ToString();
                model.ModulesName = ds.Tables[0].Rows[0]["ModulesName"].ToString();
                model.Content = ds.Tables[0].Rows[0]["Content"].ToString();
                model.NoteInfo = ds.Tables[0].Rows[0]["NoteInfo"].ToString();
                model.Mpath = ds.Tables[0].Rows[0]["Mpath"].ToString();
                model.CaseInfo = ds.Tables[0].Rows[0]["CaseInfo"].ToString();
                model.FlowInfo = ds.Tables[0].Rows[0]["FlowInfo"].ToString();
                model.AppInfo = ds.Tables[0].Rows[0]["AppInfo"].ToString();
                model.Others = ds.Tables[0].Rows[0]["Others"].ToString();
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
			strSql.Append("select ID,ModulesID,ModulesName,Content,NoteInfo,Mpath,CaseInfo,FlowInfo,AppInfo,Others ");
			strSql.Append(" FROM Pub_Help ");
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
			parameters[0].Value = "Pub_Help";
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

