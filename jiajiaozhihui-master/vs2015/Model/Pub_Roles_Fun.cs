using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Pub_Roles_Fun 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class Pub_Roles_Fun
    {
        public Pub_Roles_Fun()
        { }
        #region Model
        private Guid _rolesid;
        private string _funid;
        /// <summary>
        /// 
        /// </summary>
        public Guid RolesID
        {
            set { _rolesid = value; }
            get { return _rolesid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FunID
        {
            set { _funid = value; }
            get { return _funid; }
        }
        #endregion Model

    }
}

