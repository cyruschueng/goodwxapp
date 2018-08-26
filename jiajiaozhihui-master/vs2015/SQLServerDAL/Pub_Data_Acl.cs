using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_Data_Acl。
    /// </summary>
    public class Pub_Data_Acl : IPub_Data_Acl
    {
        public Pub_Data_Acl()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_Data_Acl");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_Data_Acl model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_Data_Acl(");
            strSql.Append("DataAclID,ModulesID,FieldName,Operator,FieldValue,FieldText)");
            strSql.Append(" values (");
            strSql.Append("@DataAclID,@ModulesID,@FieldName,@Operator,@FieldValue,@FieldText)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@DataAclID", SqlDbType.Int,4),
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,30),
					new SqlParameter("@FieldName", SqlDbType.NVarChar,30),
					new SqlParameter("@Operator", SqlDbType.NVarChar,10),
					new SqlParameter("@FieldValue", SqlDbType.NVarChar,50),
					new SqlParameter("@FieldText", SqlDbType.NVarChar,80)};
            parameters[0].Value = model.DataAclID;
            parameters[1].Value = model.ModulesID;
            parameters[2].Value = model.FieldName;
            parameters[3].Value = model.Operator;
            parameters[4].Value = model.FieldValue;
            parameters[5].Value = model.FieldText;

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
        public void Update(SfSoft.Model.Pub_Data_Acl model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_Data_Acl set ");
            strSql.Append("DataAclID=@DataAclID,");
            strSql.Append("ModulesID=@ModulesID,");
            strSql.Append("FieldName=@FieldName,");
            strSql.Append("Operator=@Operator,");
            strSql.Append("FieldValue=@FieldValue,");
            strSql.Append("FieldText=@FieldText");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@DataAclID", SqlDbType.Int,4),
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,30),
					new SqlParameter("@FieldName", SqlDbType.NVarChar,30),
					new SqlParameter("@Operator", SqlDbType.NVarChar,10),
					new SqlParameter("@FieldValue", SqlDbType.NVarChar,50),
					new SqlParameter("@FieldText", SqlDbType.NVarChar,80)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.DataAclID;
            parameters[2].Value = model.ModulesID;
            parameters[3].Value = model.FieldName;
            parameters[4].Value = model.Operator;
            parameters[5].Value = model.FieldValue;
            parameters[6].Value = model.FieldText;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_Data_Acl ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 删除多条数据
        /// </summary>
        public void Deletes(int DataAclID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_Data_Acl ");
            strSql.Append(" where DataAclID=@DataAclID ");
            SqlParameter[] parameters = {
					new SqlParameter("@DataAclID", SqlDbType.Int,4)};
            parameters[0].Value = DataAclID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_Data_Acl GetModel(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,DataAclID,ModulesID,FieldName,Operator,FieldValue,FieldText from Pub_Data_Acl ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_Data_Acl model = new SfSoft.Model.Pub_Data_Acl();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["DataAclID"].ToString() != "")
                {
                    model.DataAclID = int.Parse(ds.Tables[0].Rows[0]["DataAclID"].ToString());
                }
                model.ModulesID = ds.Tables[0].Rows[0]["ModulesID"].ToString();
                model.FieldName = ds.Tables[0].Rows[0]["FieldName"].ToString();
                model.Operator = ds.Tables[0].Rows[0]["Operator"].ToString();
                model.FieldValue = ds.Tables[0].Rows[0]["FieldValue"].ToString();
                model.FieldText = ds.Tables[0].Rows[0]["FieldText"].ToString();
                return model;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 增加全部数据权限部门
        /// </summary>
        public void AddAllDept(string sFilialeID, string sActId, string sModulesID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" insert into Pub_Data_Acl(DataAclID,ModulesID,FieldName,Operator,FieldValue,FieldText) ");
            strSql.Append(" select '" + sActId + "' as DataAclID , '" + sModulesID + "' as ModulesID ,'D' as FieldName,'=' as Operator, deptId as FieldValue,DeptName as FieldText ");
            strSql.Append(" FROM Pub_Dept ");
            strSql.Append(" where  IsFiliale='2' and  FilialeID=" + sFilialeID + " and   deptId not in (select FieldValue from Pub_Data_Acl where DataAclID ='" + sActId + "' and ModulesID='" + sModulesID + "' ) ");
            DbHelperSQL.ExecuteSql(strSql.ToString());
        }

        /// <summary>
        /// 增加全部数据权限部门
        /// </summary>
        public void DelAllDept(string sFilialeID, string sActId, string sModulesID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" delete from Pub_Data_Acl where  DataAclID ='" + sActId + "' and ModulesID='" + sModulesID + 
                "' and FieldValue in ( select deptId from Pub_Dept where IsFiliale='2' and   FilialeID=" + sFilialeID + ") ");
            DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,DataAclID,ModulesID,FieldName,Operator,FieldValue,FieldText ");
            strSql.Append(" FROM Pub_Data_Acl ");
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
            parameters[0].Value = "Pub_Data_Acl";
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

