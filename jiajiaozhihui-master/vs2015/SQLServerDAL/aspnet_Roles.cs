using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类aspnet_Roles。
    /// </summary>
    public class aspnet_Roles : Iaspnet_Roles
    {
        public aspnet_Roles()
        { }
        #region  成员方法

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(Guid RoleId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from aspnet_Roles");
            strSql.Append(" where RoleId=@RoleId");
            SqlParameter[] parameters = {
					new SqlParameter("@RoleId", SqlDbType.UniqueIdentifier),
            };
            parameters[0].Value = RoleId;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public void Add(SfSoft.Model.aspnet_Roles model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into aspnet_Roles(");
            strSql.Append("ApplicationId,RoleId,RoleName,LoweredRoleName,Description)");
            strSql.Append(" values (");
            strSql.Append("@ApplicationId,@RoleId,@RoleName,@LoweredRoleName,@Description)");
            SqlParameter[] parameters = {
					new SqlParameter("@ApplicationId", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@RoleId", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@RoleName", SqlDbType.NVarChar,256),
					new SqlParameter("@LoweredRoleName", SqlDbType.NVarChar,256),
					new SqlParameter("@Description", SqlDbType.NVarChar,256)};
            parameters[0].Value = model.ApplicationId;
            parameters[1].Value = model.RoleId;
            parameters[2].Value = model.RoleName;
            parameters[3].Value = model.LoweredRoleName;
            parameters[4].Value = model.Description;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public void Update(SfSoft.Model.aspnet_Roles model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update aspnet_Roles set ");
            strSql.Append("RoleName=@RoleName,");
            strSql.Append("Description=@Description");
            strSql.Append(" where RoleId=@RoleId");
            SqlParameter[] parameters = {
					new SqlParameter("@ApplicationId", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@RoleId", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@RoleName", SqlDbType.NVarChar,256),
					new SqlParameter("@LoweredRoleName", SqlDbType.NVarChar,256),
					new SqlParameter("@Description", SqlDbType.NVarChar,256)};
            parameters[0].Value = model.ApplicationId;
            parameters[1].Value = model.RoleId;
            parameters[2].Value = model.RoleName;
            parameters[3].Value = model.LoweredRoleName;
            parameters[4].Value = model.Description;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(Guid RoleId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete aspnet_Roles ");
            strSql.Append(" where ApplicationId=@ApplicationId and RoleId=@RoleId and LoweredRoleName=@LoweredRoleName ");
            SqlParameter[] parameters = {
					new SqlParameter("@RoleId", SqlDbType.UniqueIdentifier),
                    };
            parameters[0].Value = RoleId;
            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.aspnet_Roles GetModel(Guid RoleId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ApplicationId,RoleId,RoleName,LoweredRoleName,Description from aspnet_Roles ");
            strSql.Append(" where RoleId=@RoleId");
            SqlParameter[] parameters = {
					new SqlParameter("@RoleId", SqlDbType.UniqueIdentifier),
					};
            parameters[0].Value = RoleId;

            SfSoft.Model.aspnet_Roles model = new SfSoft.Model.aspnet_Roles();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ApplicationId"].ToString() != "")
                {
                    model.ApplicationId = new Guid(ds.Tables[0].Rows[0]["ApplicationId"].ToString());
                }
                if (ds.Tables[0].Rows[0]["RoleId"].ToString() != "")
                {
                    model.RoleId = new Guid(ds.Tables[0].Rows[0]["RoleId"].ToString());
                }
                model.RoleName = ds.Tables[0].Rows[0]["RoleName"].ToString();
                model.LoweredRoleName = ds.Tables[0].Rows[0]["LoweredRoleName"].ToString();
                model.Description = ds.Tables[0].Rows[0]["Description"].ToString();
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
            strSql.Append("select ApplicationId,RoleId,RoleName,LoweredRoleName,Description ");
            strSql.Append(" FROM aspnet_Roles ");
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
            parameters[0].Value = "aspnet_Roles";
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

