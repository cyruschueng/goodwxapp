using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_Modules。
    /// </summary>
    public class Pub_Modules : IPub_Modules
    {
        public Pub_Modules()
        { }
        #region  成员方法

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string ModulesID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_Modules");
            strSql.Append(" where ModulesID=@ModulesID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,50)};
            parameters[0].Value = ModulesID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public void Add(SfSoft.Model.Pub_Modules model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_Modules(");
            strSql.Append("AppID,AppName,ModulesID,ModulesName,ParentMID,MPath,Dpath,IsAcl,IsAclData,IsAuditFlow,Icon,OrderID,SnID)");
            strSql.Append(" values (");
            strSql.Append("@AppID,@AppName,@ModulesID,@ModulesName,@ParentMID,@MPath,@Dpath,@IsAcl,@IsAclData,@IsAuditFlow,@Icon,@OrderID,@SnID)");
            SqlParameter[] parameters = {
					new SqlParameter("@AppID", SqlDbType.NVarChar,10),
					new SqlParameter("@AppName", SqlDbType.NVarChar,20),
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,150),
					new SqlParameter("@ModulesName", SqlDbType.NVarChar,30),
					new SqlParameter("@ParentMID", SqlDbType.NVarChar,150),
					new SqlParameter("@MPath", SqlDbType.NVarChar,100),
					new SqlParameter("@Dpath", SqlDbType.NVarChar,100),
					new SqlParameter("@IsAcl", SqlDbType.Int,4),
					new SqlParameter("@IsAclData", SqlDbType.Int,4),
					new SqlParameter("@IsAuditFlow", SqlDbType.Int,4),
					new SqlParameter("@Icon", SqlDbType.NVarChar,100),
					new SqlParameter("@OrderID", SqlDbType.Int,4),
					new SqlParameter("@SnID", SqlDbType.Int,4)};
            parameters[0].Value = model.AppID;
            parameters[1].Value = model.AppName;
            parameters[2].Value = model.ModulesID;
            parameters[3].Value = model.ModulesName;
            parameters[4].Value = model.ParentMID;
            parameters[5].Value = model.MPath;
            parameters[6].Value = model.Dpath;
            parameters[7].Value = model.IsAcl;
            parameters[8].Value = model.IsAclData;
            parameters[9].Value = model.IsAuditFlow;
            parameters[10].Value = model.Icon;
            parameters[11].Value = model.OrderID;
            parameters[12].Value = model.SnID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public void Update(SfSoft.Model.Pub_Modules model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_Modules set ");
            strSql.Append("AppID=@AppID,");
            strSql.Append("AppName=@AppName,");
            strSql.Append("ModulesName=@ModulesName,");
            strSql.Append("ParentMID=@ParentMID,");
            strSql.Append("MPath=@MPath,");
            strSql.Append("Dpath=@Dpath,");
            strSql.Append("IsAcl=@IsAcl,");
            strSql.Append("IsAclData=@IsAclData,");
            strSql.Append("IsAuditFlow=@IsAuditFlow,");
            strSql.Append("Icon=@Icon,");
            strSql.Append("OrderID=@OrderID,");
            strSql.Append("SnID=@SnID");
            strSql.Append(" where ModulesID=@ModulesID ");
            SqlParameter[] parameters = {
					new SqlParameter("@AppID", SqlDbType.NVarChar,10),
					new SqlParameter("@AppName", SqlDbType.NVarChar,20),
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,150),
					new SqlParameter("@ModulesName", SqlDbType.NVarChar,30),
					new SqlParameter("@ParentMID", SqlDbType.NVarChar,150),
					new SqlParameter("@MPath", SqlDbType.NVarChar,100),
					new SqlParameter("@Dpath", SqlDbType.NVarChar,100),
					new SqlParameter("@IsAcl", SqlDbType.Int,4),
					new SqlParameter("@IsAclData", SqlDbType.Int,4),
					new SqlParameter("@IsAuditFlow", SqlDbType.Int,4),
					new SqlParameter("@Icon", SqlDbType.NVarChar,100),
					new SqlParameter("@OrderID", SqlDbType.Int,4),
					new SqlParameter("@SnID", SqlDbType.Int,4)};
            parameters[0].Value = model.AppID;
            parameters[1].Value = model.AppName;
            parameters[2].Value = model.ModulesID;
            parameters[3].Value = model.ModulesName;
            parameters[4].Value = model.ParentMID;
            parameters[5].Value = model.MPath;
            parameters[6].Value = model.Dpath;
            parameters[7].Value = model.IsAcl;
            parameters[8].Value = model.IsAclData;
            parameters[9].Value = model.IsAuditFlow;
            parameters[10].Value = model.Icon;
            parameters[11].Value = model.OrderID;
            parameters[12].Value = model.SnID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(string ModulesID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_Modules ");
            strSql.Append(" where ModulesID=@ModulesID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,50)};
            parameters[0].Value = ModulesID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_Modules GetModel(string ModulesID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select AppID,AppName,ModulesID,ModulesName,ParentMID,MPath,Dpath,IsAcl,IsAclData,IsAuditFlow,Icon,OrderID,SnID from Pub_Modules ");
            strSql.Append(" where ModulesID=@ModulesID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,50)};
            parameters[0].Value = ModulesID;

            SfSoft.Model.Pub_Modules model = new SfSoft.Model.Pub_Modules();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                model.AppID = ds.Tables[0].Rows[0]["AppID"].ToString();
                model.AppName = ds.Tables[0].Rows[0]["AppName"].ToString();
                model.ModulesID = ds.Tables[0].Rows[0]["ModulesID"].ToString();
                model.ModulesName = ds.Tables[0].Rows[0]["ModulesName"].ToString();
                model.ParentMID = ds.Tables[0].Rows[0]["ParentMID"].ToString();
                model.MPath = ds.Tables[0].Rows[0]["MPath"].ToString();
                model.Dpath = ds.Tables[0].Rows[0]["Dpath"].ToString();
                if (ds.Tables[0].Rows[0]["IsAcl"].ToString() != "")
                {
                    model.IsAcl = int.Parse(ds.Tables[0].Rows[0]["IsAcl"].ToString());
                }
                if (ds.Tables[0].Rows[0]["IsAclData"].ToString() != "")
                {
                    model.IsAclData = int.Parse(ds.Tables[0].Rows[0]["IsAclData"].ToString());
                }
                if (ds.Tables[0].Rows[0]["IsAuditFlow"].ToString() != "")
                {
                    model.IsAuditFlow = int.Parse(ds.Tables[0].Rows[0]["IsAuditFlow"].ToString());
                }
                model.Icon = ds.Tables[0].Rows[0]["Icon"].ToString();
                if (ds.Tables[0].Rows[0]["OrderID"].ToString() != "")
                {
                    model.OrderID = int.Parse(ds.Tables[0].Rows[0]["OrderID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["SnID"].ToString() != "")
                {
                    model.SnID = int.Parse(ds.Tables[0].Rows[0]["SnID"].ToString());
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
            strSql.Append("select AppID,AppName,ModulesID,ModulesName,ParentMID,MPath,Dpath,IsAcl,IsAclData,IsAuditFlow,Icon,OrderID,SnID ");
            strSql.Append(" FROM Pub_Modules ");
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
            parameters[0].Value = "Pub_Modules";
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

