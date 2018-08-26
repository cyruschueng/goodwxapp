using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类aspnet_Roles 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class aspnet_Roles
    {
        public aspnet_Roles()
        { }
        #region Model
        private Guid _applicationid;
        private Guid _roleid;
        private string _rolename;
        private string _loweredrolename;
        private string _description;
        /// <summary>
        /// 
        /// </summary>
        public Guid ApplicationId
        {
            set { _applicationid = value; }
            get { return _applicationid; }
        }
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
        public string RoleName
        {
            set { _rolename = value; }
            get { return _rolename; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string LoweredRoleName
        {
            set { _loweredrolename = value; }
            get { return _loweredrolename; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Description
        {
            set { _description = value; }
            get { return _description; }
        }
        #endregion Model

    }
}

