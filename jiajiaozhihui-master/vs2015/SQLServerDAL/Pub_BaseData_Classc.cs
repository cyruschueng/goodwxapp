using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_BaseData_Classc。
    /// </summary>
    public class Pub_BaseData_Classc : IPub_BaseData_Classc
    {
        public Pub_BaseData_Classc()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_BaseData_Classc");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_BaseData_Classc model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_BaseData_Classc(");
            strSql.Append("ClassID,ParentCID,ClassName,ClassType,IsSystem)");
            strSql.Append(" values (");
            strSql.Append("@ClassID,@ParentCID,@ClassName,@ClassType,@IsSystem)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@ClassID", SqlDbType.NVarChar,50),
					new SqlParameter("@ParentCID", SqlDbType.NVarChar,50),
					new SqlParameter("@ClassName", SqlDbType.NVarChar,50),
					new SqlParameter("@ClassType", SqlDbType.NVarChar,5),
                    new SqlParameter("@IsSystem", SqlDbType.Int,4)};
            parameters[0].Value = model.ClassID;
            parameters[1].Value = model.ParentCID;
            parameters[2].Value = model.ClassName;
            parameters[3].Value = model.ClassType;
            parameters[4].Value = model.IsSystem;

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
        public void Update(SfSoft.Model.Pub_BaseData_Classc model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_BaseData_Classc set ");
            strSql.Append("ParentCID=@ParentCID,");
            strSql.Append("ClassName=@ClassName,");
            strSql.Append("ClassType=@ClassType,");
            strSql.Append("IsSystem=@IsSystem");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@ClassID", SqlDbType.NVarChar,50),
					new SqlParameter("@ParentCID", SqlDbType.NVarChar,50),
					new SqlParameter("@ClassName", SqlDbType.NVarChar,50),
					new SqlParameter("@ClassType", SqlDbType.NVarChar,5),
                    new SqlParameter("@IsSystem", SqlDbType.Int,4)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.ClassID;
            parameters[2].Value = model.ParentCID;
            parameters[3].Value = model.ClassName;
            parameters[4].Value = model.ClassType;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_BaseData_Classc ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_BaseData_Classc GetModel(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,ClassID,ParentCID,ClassName,ClassType,IsSystem from Pub_BaseData_Classc ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_BaseData_Classc model = new SfSoft.Model.Pub_BaseData_Classc();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.ClassID = ds.Tables[0].Rows[0]["ClassID"].ToString();
                model.ParentCID = ds.Tables[0].Rows[0]["ParentCID"].ToString();
                model.ClassName = ds.Tables[0].Rows[0]["ClassName"].ToString();
                model.ClassType = ds.Tables[0].Rows[0]["ClassType"].ToString();
                if (ds.Tables[0].Rows[0]["IsSystem"].ToString() != "" && ds.Tables[0].Rows[0]["IsSystem"] != null) {
                    model.IsSystem = int.Parse(ds.Tables[0].Rows[0]["IsSystem"].ToString());
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
            strSql.Append("select ID,ClassID,ParentCID,ClassName,ClassType,IsSystem ");
            strSql.Append(" FROM Pub_BaseData_Classc ");
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
            parameters[0].Value = "Pub_BaseData_Classc";
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

