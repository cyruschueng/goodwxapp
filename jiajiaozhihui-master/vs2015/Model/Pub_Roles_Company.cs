using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Pub_Roles_Company 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class Pub_Roles_Company
    {
        public Pub_Roles_Company()
        { }
        #region Model
        private Guid _roleid;
        private string _filialeid;
        /// <summary>
        /// 
        /// </summary>
        public Guid RoleId
        {
            set { _roleid = value; }
            get { return _roleid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FilialeID
        {
            set { _filialeid = value; }
            get { return _filialeid; }
        }
        #endregion Model

    }
}

