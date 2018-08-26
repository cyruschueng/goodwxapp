using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Pub_Modules 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class Pub_Modules
    {
        public Pub_Modules()
        { }
        #region Model
        private string _appid;
        private string _appname;
        private string _modulesid;
        private string _modulesname;
        private string _parentmid;
        private string _mpath;
        private string _dpath;
        private int _isacl;
        private int _isacldata;
        private int _isauditflow;
        private string _icon;
        private int _orderid;
        private int _snid;
        /// <summary>
        /// 
        /// </summary>
        public string AppID
        {
            set { _appid = value; }
            get { return _appid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string AppName
        {
            set { _appname = value; }
            get { return _appname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ModulesID
        {
            set { _modulesid = value; }
            get { return _modulesid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ModulesName
        {
            set { _modulesname = value; }
            get { return _modulesname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ParentMID
        {
            set { _parentmid = value; }
            get { return _parentmid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string MPath
        {
            set { _mpath = value; }
            get { return _mpath; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Dpath
        {
            set { _dpath = value; }
            get { return _dpath; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int IsAcl
        {
            set { _isacl = value; }
            get { return _isacl; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int IsAclData
        {
            set { _isacldata = value; }
            get { return _isacldata; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int IsAuditFlow
        {
            set { _isauditflow = value; }
            get { return _isauditflow; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Icon
        {
            set { _icon = value; }
            get { return _icon; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int OrderID
        {
            set { _orderid = value; }
            get { return _orderid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int SnID
        {
            set { _snid = value; }
            get { return _snid; }
        }
        #endregion Model

    }
}

