using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_FunDef。
    /// </summary>
    public class Pub_FunDef : IPub_FunDef
    {
        public Pub_FunDef()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_FunDef");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }



        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_FunDef model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_FunDef(");
            strSql.Append("FunID,FunName,FunType,IsAct,OrderID,ParentID,Flag,IsApprove,BoName,PagePath,FilialeID,FormType,FormCol,FormDesc,ParentBo,IsMaster,Creator,CreateDate,CallType)");
            strSql.Append(" values (");
            strSql.Append("@FunID,@FunName,@FunType,@IsAct,@OrderID,@ParentID,@Flag,@IsApprove,@BoName,@PagePath,@FilialeID,@FormType,@FormCol,@FormDesc,@ParentBo,@IsMaster,@Creator,@CreateDate,@CallType)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@FunID", SqlDbType.NVarChar,30),
					new SqlParameter("@FunName", SqlDbType.NVarChar,80),
					new SqlParameter("@FunType", SqlDbType.NVarChar,10),
					new SqlParameter("@IsAct", SqlDbType.NVarChar,5),
					new SqlParameter("@OrderID", SqlDbType.Int,4),
					new SqlParameter("@ParentID", SqlDbType.Int,4),
					new SqlParameter("@Flag", SqlDbType.NVarChar,5),
					new SqlParameter("@IsApprove", SqlDbType.NVarChar,5),
					new SqlParameter("@BoName", SqlDbType.NVarChar,50),
					new SqlParameter("@PagePath", SqlDbType.NVarChar,120),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,10),
					new SqlParameter("@FormType", SqlDbType.VarChar,20),
					new SqlParameter("@FormCol", SqlDbType.Int,4),
					new SqlParameter("@FormDesc", SqlDbType.VarChar,200),
					new SqlParameter("@ParentBo", SqlDbType.VarChar,40),
					new SqlParameter("@IsMaster", SqlDbType.VarChar,4),
					new SqlParameter("@Creator", SqlDbType.VarChar,20),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@CallType", SqlDbType.NVarChar,20)};
            parameters[0].Value = model.FunID;
            parameters[1].Value = model.FunName;
            parameters[2].Value = model.FunType;
            parameters[3].Value = model.IsAct;
            parameters[4].Value = model.OrderID;
            parameters[5].Value = model.ParentID;
            parameters[6].Value = model.Flag;
            parameters[7].Value = model.IsApprove;
            parameters[8].Value = model.BoName;
            parameters[9].Value = model.PagePath;
            parameters[10].Value = model.FilialeID;
            parameters[11].Value = model.FormType;
            parameters[12].Value = model.FormCol;
            parameters[13].Value = model.FormDesc;
            parameters[14].Value = model.ParentBo;
            parameters[15].Value = model.IsMaster;
            parameters[16].Value = model.Creator;
            parameters[17].Value = model.CreateDate;
            parameters[18].Value = model.CallType;

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
        public void Update(SfSoft.Model.Pub_FunDef model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_FunDef set ");
            strSql.Append("FunID=@FunID,");
            strSql.Append("FunName=@FunName,");
            strSql.Append("FunType=@FunType,");
            strSql.Append("IsAct=@IsAct,");
            strSql.Append("OrderID=@OrderID,");
            strSql.Append("ParentID=@ParentID,");
            strSql.Append("Flag=@Flag,");
            strSql.Append("IsApprove=@IsApprove,");
            strSql.Append("BoName=@BoName,");
            strSql.Append("PagePath=@PagePath,");
            strSql.Append("FilialeID=@FilialeID,");
            strSql.Append("FormType=@FormType,");
            strSql.Append("FormCol=@FormCol,");
            strSql.Append("FormDesc=@FormDesc,");
            strSql.Append("ParentBo=@ParentBo,");
            strSql.Append("IsMaster=@IsMaster,");
            strSql.Append("Creator=@Creator,");
            strSql.Append("CreateDate=@CreateDate,");
            strSql.Append("CallType=@CallType");
            strSql.Append(" where ID=@ID");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@FunID", SqlDbType.NVarChar,30),
					new SqlParameter("@FunName", SqlDbType.NVarChar,80),
					new SqlParameter("@FunType", SqlDbType.NVarChar,10),
					new SqlParameter("@IsAct", SqlDbType.NVarChar,5),
					new SqlParameter("@OrderID", SqlDbType.Int,4),
					new SqlParameter("@ParentID", SqlDbType.Int,4),
					new SqlParameter("@Flag", SqlDbType.NVarChar,5),
					new SqlParameter("@IsApprove", SqlDbType.NVarChar,5),
					new SqlParameter("@BoName", SqlDbType.NVarChar,50),
					new SqlParameter("@PagePath", SqlDbType.NVarChar,120),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,10),
					new SqlParameter("@FormType", SqlDbType.VarChar,20),
					new SqlParameter("@FormCol", SqlDbType.Int,4),
					new SqlParameter("@FormDesc", SqlDbType.VarChar,200),
					new SqlParameter("@ParentBo", SqlDbType.VarChar,40),
					new SqlParameter("@IsMaster", SqlDbType.VarChar,4),
					new SqlParameter("@Creator", SqlDbType.VarChar,20),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@CallType", SqlDbType.NVarChar,20)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.FunID;
            parameters[2].Value = model.FunName;
            parameters[3].Value = model.FunType;
            parameters[4].Value = model.IsAct;
            parameters[5].Value = model.OrderID;
            parameters[6].Value = model.ParentID;
            parameters[7].Value = model.Flag;
            parameters[8].Value = model.IsApprove;
            parameters[9].Value = model.BoName;
            parameters[10].Value = model.PagePath;
            parameters[11].Value = model.FilialeID;
            parameters[12].Value = model.FormType;
            parameters[13].Value = model.FormCol;
            parameters[14].Value = model.FormDesc;
            parameters[15].Value = model.ParentBo;
            parameters[16].Value = model.IsMaster;
            parameters[17].Value = model.Creator;
            parameters[18].Value = model.CreateDate;
            parameters[19].Value = model.CallType;

            int rows = DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
 
        }


        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_FunDef ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }




        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_FunDef GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,FunID,FunName,FunType,IsAct,OrderID,ParentID,Flag,IsApprove,BoName,PagePath,FilialeID,FormType,FormCol,FormDesc,ParentBo,IsMaster,Creator,CreateDate,CallType from Pub_FunDef ");
            strSql.Append(" where ID=@ID");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_FunDef model = new SfSoft.Model.Pub_FunDef();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.FunID = ds.Tables[0].Rows[0]["FunID"].ToString();
                model.FunName = ds.Tables[0].Rows[0]["FunName"].ToString();
                model.FunType = ds.Tables[0].Rows[0]["FunType"].ToString();
                model.IsAct = ds.Tables[0].Rows[0]["IsAct"].ToString();
                if (ds.Tables[0].Rows[0]["OrderID"].ToString() != "")
                {
                    model.OrderID = int.Parse(ds.Tables[0].Rows[0]["OrderID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["ParentID"].ToString() != "")
                {
                    model.ParentID = int.Parse(ds.Tables[0].Rows[0]["ParentID"].ToString());
                }
                model.Flag = ds.Tables[0].Rows[0]["Flag"].ToString();
                model.IsApprove = ds.Tables[0].Rows[0]["IsApprove"].ToString();
                model.BoName = ds.Tables[0].Rows[0]["BoName"].ToString();
                model.PagePath = ds.Tables[0].Rows[0]["PagePath"].ToString();
                model.FilialeID = ds.Tables[0].Rows[0]["FilialeID"].ToString();
                model.FormType = ds.Tables[0].Rows[0]["FormType"].ToString();
                if (ds.Tables[0].Rows[0]["FormCol"].ToString() != "")
                {
                    model.FormCol = int.Parse(ds.Tables[0].Rows[0]["FormCol"].ToString());
                }
                model.FormDesc = ds.Tables[0].Rows[0]["FormDesc"].ToString();
                model.ParentBo = ds.Tables[0].Rows[0]["ParentBo"].ToString();
                model.IsMaster = ds.Tables[0].Rows[0]["IsMaster"].ToString();
                model.Creator = ds.Tables[0].Rows[0]["Creator"].ToString();
                if (ds.Tables[0].Rows[0]["CreateDate"].ToString() != "")
                {
                    model.CreateDate = DateTime.Parse(ds.Tables[0].Rows[0]["CreateDate"].ToString());
                }
                model.CallType = ds.Tables[0].Rows[0]["CallType"].ToString();
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
            strSql.Append("select ID,FunID,FunName,FunType,IsAct,OrderID,ParentID,Flag,IsApprove,BoName,PagePath,FilialeID,FormType,FormCol,FormDesc,ParentBo,IsMaster,Creator,CreateDate,CallType ");
            strSql.Append(" FROM Pub_FunDef ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQL.Query(strSql.ToString());
        }
        /// <summary>
        /// 更新是否需要审批字段
        /// </summary>
        public void UpdateIsApprove(string FunID, string FunType, string IsApprove)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_FunDef set ");
            strSql.Append("IsApprove=@IsApprove");
            strSql.Append(" where FunID=@FunID and  FunType=@FunType");
            SqlParameter[] parameters = {
					new SqlParameter("@FunID", SqlDbType.NVarChar,30),
					new SqlParameter("@FunType", SqlDbType.NVarChar,10),
					new SqlParameter("@IsApprove", SqlDbType.NVarChar,5)};
            parameters[0].Value = FunID;
            parameters[1].Value = FunType;
            parameters[2].Value = IsApprove;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
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
            parameters[0].Value = "Pub_FunDef";
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

