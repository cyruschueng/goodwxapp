using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Pub_Modules_Fun 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class Pub_Modules_Fun
    {
        public Pub_Modules_Fun()
        { }
        #region Model
        private string _modulesid;
        private string _funid;
        private string _funname;
        private string _funtype;
        private string _mpath;
        private int _orderid;
        private int _isacl;
        private string _icon;
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
        public string FunID
        {
            set { _funid = value; }
            get { return _funid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FunName
        {
            set { _funname = value; }
            get { return _funname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FunType
        {
            set { _funtype = value; }
            get { return _funtype; }
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
        public int OrderID
        {
            set { _orderid = value; }
            get { return _orderid; }
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
        public string Icon
        {
            set { _icon = value; }
            get { return _icon; }
        }
        #endregion Model

    }
}

