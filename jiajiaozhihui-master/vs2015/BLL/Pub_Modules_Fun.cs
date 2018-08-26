using System.Data;
using SfSoft.DALFactory;
using SfSoft.IDAL;
namespace SfSoft.BLL
{
    /// <summary>
    /// 业务逻辑类Pub_Modules_Fun 的摘要说明。
    /// </summary>
    public class Pub_Modules_Fun
    {
        private readonly IPub_Modules_Fun dal = DataAccess.CreatePub_Modules_Fun();
        public Pub_Modules_Fun()
        { }
  

        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_Modules_Fun GetModel(string FunType, string MPath)
        {
            return dal.GetModel(FunType, MPath);
        }

    
        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            return dal.GetList(strWhere);
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetListByFunTypeAndMPath(string funType, string mPath)
        {
            return dal.GetListByFunTypeAndMPath(funType, mPath);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="funType"></param>
        /// <param name="FunID"></param>
        /// <returns></returns>
        public DataSet GetListByFunTypeAndModulesID(string funType, string ModulesID)
        {
            return dal.GetListByFunTypeAndModulesID(funType, ModulesID);
        }
        /// <summary>
        /// 获得数据列表
        /// </summary>
        //public DataSet GetList(int PageSize,int PageIndex,string strWhere)
        //{
        //return dal.GetList(PageSize,PageIndex,strWhere);
        //}
 
    }
}

