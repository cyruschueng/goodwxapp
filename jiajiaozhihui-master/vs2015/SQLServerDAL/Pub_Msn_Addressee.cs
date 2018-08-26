using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_Msn_Addressee。
    /// </summary>
    public class Pub_Msn_Addressee : IPub_Msn_Addressee
    {
        public Pub_Msn_Addressee()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_Msn_Addressee");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_Msn_Addressee model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_Msn_Addressee(");
            strSql.Append("MsnID,AddresseeID,Addressee,isRead,ReadTime)");
            strSql.Append(" values (");
            strSql.Append("@MsnID,@AddresseeID,@Addressee,@isRead,@ReadTime)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@MsnID", SqlDbType.Int,4),
					new SqlParameter("@AddresseeID", SqlDbType.Int,4),
					new SqlParameter("@Addressee", SqlDbType.NVarChar,20),
					new SqlParameter("@isRead", SqlDbType.Int,4),
					new SqlParameter("@ReadTime", SqlDbType.DateTime)};
            parameters[0].Value = model.MsnID;
            parameters[1].Value = model.AddresseeID;
            parameters[2].Value = model.Addressee;
            parameters[3].Value = model.isRead;
            parameters[4].Value = model.ReadTime;

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
        public void Update(SfSoft.Model.Pub_Msn_Addressee model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_Msn_Addressee set ");
            strSql.Append("AddresseeID=@AddresseeID,");
            strSql.Append("Addressee=@Addressee,");
            strSql.Append("isRead=@isRead,");
            strSql.Append("ReadTime=@ReadTime");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@MsnID", SqlDbType.Int,4),
					new SqlParameter("@AddresseeID", SqlDbType.Int,4),
					new SqlParameter("@Addressee", SqlDbType.NVarChar,20),
					new SqlParameter("@isRead", SqlDbType.Int,4),
					new SqlParameter("@ReadTime", SqlDbType.DateTime)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.MsnID;
            parameters[2].Value = model.AddresseeID;
            parameters[3].Value = model.Addressee;
            parameters[4].Value = model.isRead;
            parameters[5].Value = model.ReadTime;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int AddresseeID, int MsnID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_Msn_Addressee ");
            if (AddresseeID != 0)
            {
                strSql.Append(" where AddresseeID=@AddresseeID and MsnID=@MsnID ");
                SqlParameter[] parameters = {
					new SqlParameter("@AddresseeID", SqlDbType.Int,4),
                    new SqlParameter("@MsnID", SqlDbType.Int,4)
                };
                parameters[0].Value = AddresseeID;
                parameters[1].Value = MsnID;
                DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
            }
            else
            {
                strSql.Append(" where MsnID=@MsnID ");
                SqlParameter[] parameters = {
					new SqlParameter("@MsnID", SqlDbType.Int,4)};
                parameters[0].Value = MsnID;
                DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
            }
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_Msn_Addressee GetModel(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,MsnID,AddresseeID,Addressee,isRead,ReadTime from Pub_Msn_Addressee ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_Msn_Addressee model = new SfSoft.Model.Pub_Msn_Addressee();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["MsnID"].ToString() != "")
                {
                    model.MsnID = int.Parse(ds.Tables[0].Rows[0]["MsnID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["AddresseeID"].ToString() != "")
                {
                    model.AddresseeID = int.Parse(ds.Tables[0].Rows[0]["AddresseeID"].ToString());
                }
                model.Addressee = ds.Tables[0].Rows[0]["Addressee"].ToString();
                if (ds.Tables[0].Rows[0]["isRead"].ToString() != "")
                {
                    model.isRead = int.Parse(ds.Tables[0].Rows[0]["isRead"].ToString());
                }
                if (ds.Tables[0].Rows[0]["ReadTime"].ToString() != "")
                {
                    model.ReadTime = DateTime.Parse(ds.Tables[0].Rows[0]["ReadTime"].ToString());
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
            strSql.Append("select ID,MsnID,AddresseeID,Addressee,isRead,ReadTime ");
            strSql.Append(" FROM Pub_Msn_Addressee ");
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
            parameters[0].Value = "Pub_Msn_Addressee";
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

